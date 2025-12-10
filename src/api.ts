const BASE = 'http://localhost:4000/api';

async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
}

export async function getListings() {
  return request('/listings');
}

export async function getListing(id: string) {
  return request(`/listings/${id}`);
}

export async function createListing(body: any) {
  return request('/listings', { method: 'POST', body: JSON.stringify(body) });
}

export async function login(email: string, password: string) {
  return request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
}

export async function getCart() {
  return request('/cart');
}

export async function addToCart(body: any) {
  return request('/cart', { method: 'POST', body: JSON.stringify(body) });
}

export async function getMessages() {
  return request('/messages');
}

export async function sendMessage(body: any) {
  return request('/messages', { method: 'POST', body: JSON.stringify(body) });
}

export async function deleteListing(id: string) {
  return request(`/listings/${id}`, { method: 'DELETE' });
}

export async function purchase(body: any) {
  return request('/purchase', { method: 'POST', body: JSON.stringify(body) });
}

export default { getListings, getListing, createListing, login, getCart, addToCart, getMessages, sendMessage, deleteListing, purchase };
