const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const DB_PATH = path.join(__dirname, 'db.json');

function readDb() {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read DB:', err);
    return { users: [], listings: [], cart: [], messages: [] };
  }
}

function writeDb(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
}

const app = express();
app.use(cors());
app.use(express.json());

// Simple endpoints
app.get('/api/listings', (req, res) => {
  const db = readDb();
  res.json(db.listings || []);
});

app.get('/api/listings/:id', (req, res) => {
  const db = readDb();
  const item = (db.listings || []).find(l => l.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

app.post('/api/listings', (req, res) => {
  const db = readDb();
  const { title, description, price, images, ownerId, type, category, date, time } = req.body;

  // Validation: Check for duplicate thrift items
  if (type === 'thrift') {
    const duplicate = (db.listings || []).find(
      l => l.type === 'thrift' && l.title.toLowerCase() === title.toLowerCase() && l.ownerId === ownerId
    );
    if (duplicate) {
      return res.status(400).json({ error: 'You already have a listing with this title' });
    }
  }

  // Validation: Check for duplicate workshops (same user, date, and time)
  if (type === 'workshop') {
    const duplicate = (db.listings || []).find(
      l => l.type === 'workshop' && l.ownerId === ownerId && l.date === date && l.time === time
    );
    if (duplicate) {
      return res.status(400).json({ error: 'You already have a workshop scheduled at this date and time' });
    }
  }

  const id = (type === 'workshop' ? 'w' : 'l') + (Date.now()).toString(36);
  const listing = {
    id,
    title,
    description,
    price: price || 0,
    images: images || [],
    category: category || 'Misc',
    type: type || 'thrift',
    ownerId: ownerId || null,
    date: date || null,
    time: time || null,
    createdAt: new Date().toISOString()
  };
  db.listings = db.listings || [];
  db.listings.push(listing);
  writeDb(db);
  res.status(201).json(listing);
});

app.get('/api/users', (req, res) => {
  const db = readDb();
  res.json(db.users || []);
});

app.post('/api/auth/login', (req, res) => {
  const db = readDb();
  const { email, password } = req.body;
  const user = (db.users || []).find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  // very simple token for demo purposes
  const token = 'demo-token-' + user.id;
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

app.get('/api/cart', (req, res) => {
  const db = readDb();
  res.json(db.cart || []);
});

app.post('/api/cart', (req, res) => {
  const db = readDb();
  const { listingId, quantity } = req.body;
  db.cart = db.cart || [];
  const id = 'c' + (Date.now()).toString(36);
  const entry = { id, listingId, quantity: quantity || 1 };
  db.cart.push(entry);
  writeDb(db);
  res.status(201).json(entry);
});

app.get('/api/messages', (req, res) => {
  const db = readDb();
  res.json(db.messages || []);
});

app.post('/api/messages', (req, res) => {
  const db = readDb();
  const { from, to, text } = req.body;
  db.messages = db.messages || [];
  const id = 'm' + (Date.now()).toString(36);
  const msg = { id, from, to, text, createdAt: new Date().toISOString() };
  db.messages.push(msg);
  writeDb(db);
  res.status(201).json(msg);
});

// Enroll in a workshop
app.post('/api/enroll', (req, res) => {
  const db = readDb();
  const { workshopId, userId } = req.body;
  if (!workshopId || !userId) return res.status(400).json({ error: 'workshopId and userId required' });

  const listing = (db.listings || []).find(l => l.id === workshopId && l.type === 'workshop');
  if (!listing) return res.status(404).json({ error: 'Workshop not found' });

  db.enrollments = db.enrollments || [];
  // prevent duplicate enrollment
  const already = db.enrollments.find(e => e.workshopId === workshopId && e.userId === userId);
  if (already) return res.status(400).json({ error: 'User already enrolled' });

  // check seats
  listing.bookedSeats = listing.bookedSeats || 0;
  listing.maxSeats = listing.maxSeats || 0;
  if (listing.bookedSeats >= listing.maxSeats) return res.status(400).json({ error: 'No seats available' });

  listing.bookedSeats += 1;
  const id = 'e' + (Date.now()).toString(36);
  db.enrollments.push({ id, workshopId, userId, createdAt: new Date().toISOString() });
  writeDb(db);
  res.json({ ok: true, bookedSeats: listing.bookedSeats });
});

// Delete a listing
app.delete('/api/listings/:id', (req, res) => {
  const db = readDb();
  const id = req.params.id;
  const before = db.listings || [];
  const idx = before.findIndex(l => l.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Listing not found' });
  const [removed] = before.splice(idx, 1);
  db.listings = before;

  // remove related enrollments and cart entries
  if (db.enrollments) db.enrollments = db.enrollments.filter(e => e.workshopId !== id);
  if (db.cart) db.cart = db.cart.filter(c => c.listingId !== id);

  writeDb(db);
  res.json({ ok: true, removed });
});

// Purchase a listing (simple demo flow)
app.post('/api/purchase', (req, res) => {
  const db = readDb();
  const { listingId, buyerId, quantity } = req.body;
  if (!listingId || !buyerId) return res.status(400).json({ error: 'listingId and buyerId required' });

  const listing = (db.listings || []).find(l => l.id === listingId);
  if (!listing) return res.status(404).json({ error: 'Listing not found' });

  db.orders = db.orders || [];

  // simple single-item sale: if already sold, prevent duplicate purchase
  if (listing.sold) return res.status(400).json({ error: 'Listing already sold' });

  // mark as sold
  listing.sold = true;

  const id = 'o' + (Date.now()).toString(36);
  const order = {
    id,
    listingId,
    buyerId,
    quantity: quantity || 1,
    createdAt: new Date().toISOString(),
  };
  db.orders.push(order);

  // remove from cart if present
  if (db.cart) db.cart = db.cart.filter(c => c.listingId !== listingId);

  writeDb(db);
  res.status(201).json(order);
});

// basic health
app.get('/api/health', (req, res) => res.json({ ok: true }));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Backend server running on port', port);
});
