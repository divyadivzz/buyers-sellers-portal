# Community Marketplace Portal

A modern, enterprise-grade internal marketplace application for employees to buy, sell, and exchange items within an organization. Built with React, TypeScript, and Tailwind CSS.

## 🎨 Design System

### Color Palette

**Primary (Teal)**
- Used for primary actions, links, and interactive elements
- Gradient: `from-teal-500 to-teal-600`

**Accent (Violet)**
- Secondary accent color for highlights
- Used in gradients and special UI elements

**Neutrals (Gray)**
- Complete gray scale from 50-900
- Used for text, borders, backgrounds

**Semantic Colors**
- Success: Green (#10b981)
- Error: Red (#ef4444)
- Warning: Orange (#f59e0b)
- Info: Blue (#3b82f6)

### Typography

- **H1**: 2.5rem, bold, -0.025em letter-spacing
- **H2**: 2rem, bold, -0.02em letter-spacing
- **H3**: 1.5rem, semibold
- **H4**: 1.25rem, semibold
- **H5**: 1.125rem, semibold
- **Body**: 1rem, line-height 1.6
- **Small**: 0.875rem
- **Caption**: 0.75rem

### Components

#### Buttons
- **Primary**: Gradient teal background, white text
- **Secondary**: White background, bordered, teal on hover
- **Ghost**: Transparent, gray on hover
- **Danger**: Red background, white text

#### Form Elements
- Rounded corners (12px)
- 2px border on focus with ring
- Consistent padding and spacing
- Error states with red border and message

#### Cards
- Rounded corners (16-24px)
- Soft shadows (hover: larger shadow)
- White background
- Consistent padding (24px)

#### Badges
- Rounded full
- Small padding
- Color-coded by variant
- Consistent sizing

#### Avatars
- Circular
- Gradient background when no image
- Initials fallback
- Multiple sizes (sm, md, lg, xl)

## 📱 Pages & Features

### 0. Landing Page (NEW)
- Modern hero section with gradient text
- Category badges for quick browsing
- Bento grid layout showcasing features
- Featured workshop card
- Fresh thrift finds sidebar
- Recent activity feed
- Why choose us section
- Full footer with navigation

**Features:**
- Clean, professional landing experience
- Quick action buttons (Shop/Create)
- Category quick filters
- Featured workshop display
- Recent marketplace activity
- Mobile responsive hero
- Smooth navigation to all sections
- Works for both logged-in and guest users

### 1. Login / SSO Screen
- Corporate SSO authentication
- Large banner with employees exchanging items
- Company logo placeholder
- Clean welcome message
- Three feature highlights

**Features:**
- Mock SSO login (click to enter)
- Responsive design
- Gradient background
- Trust indicators

### 2. Home / Marketplace Dashboard
- Global navigation bar
- Search functionality
- Filters (Category, Price, Sort)
- Item grid with cards
- Wishlist toggle
- Category alerts
- Floating "New Listing" button

**Features:**
- Real-time search
- Multiple filters
- Set alerts for categories
- Wishlist management
- Responsive grid (1-3 columns)
- Empty states
- Item count display

### 3. Create Listing Page
- Multi-section form layout
- Live preview panel
- Image upload (drag & drop simulation)
- Free toggle switch
- Category and condition dropdowns
- Character count and validation

**Features:**
- Form validation
- Live preview
- Free/Paid toggle
- Multiple categories
- Condition selection
- Auto-expiry notice (30 days)
- Cancel confirmation

### 4. Item Detail Page
- Large image carousel
- Image thumbnails
- Price display (FREE badge for free items)
- Seller information card
- Contact seller button
- Wishlist toggle
- Report functionality
- Similar items carousel
- Expiry countdown

**Features:**
- Image navigation
- Wishlist management
- Report modal
- Seller contact flow
- Similar items recommendations
- Full item description
- Condition badges
- Category tags

### 5. Messages / Chat Interface
- Conversation list sidebar
- Chat window with bubbles
- Search conversations
- Message timestamps
- Attachment button
- Real-time message display
- Mobile-responsive layout

**Features:**
- Conversation search
- Message bubbles (buyer/seller colors)
- Timestamp formatting
- Attachment support (UI)
- Mobile: Back button to list
- Empty state when no selection
- Unread indicators

### 6. User Dashboard
- Profile header with stats
- Three tabs: Listings, Inquiries, Wishlist
- Edit/Delete listing actions
- View counts and inquiry counts
- Quick actions for each section

**Tabs:**
- **My Listings**: All user's active listings
- **Inquiries**: Conversations about items
- **Wishlist**: Saved favorite items

**Features:**
- Stats display (active listings, conversations, wishlist count)
- Edit/Delete/View actions
- Empty states for each tab
- Quick navigation to messages
- Item expiry tracking

### 7. Admin Moderation Panel
- Flagged items list
- Report details
- Approve/Remove actions
- Filter by status (All, Pending, Resolved)
- Statistics dashboard
- Detail modal for review

**Features:**
- Report reason display
- Reporter information
- Seller information
- Quick actions
- Status badges
- Filtering system
- Statistics cards
- Bulk review capability

## ✨ Innovative Features

### Wishlist System
- Heart icon on item cards
- Toggle on/off with animation
- View all wishlist items in dashboard
- Remove from wishlist
- Visual feedback with toast

### Item Expiry
- Auto-expire in 30 days
- Countdown badge on cards
- Warning badge style
- Configurable per item

### Category Alerts
- Set notifications for specific categories
- Toast confirmation
- Filter by category to enable
- UI indicator when alert is set

### Toast Notifications
- Success and error states
- Auto-dismiss after 3 seconds
- Slide-in animation
- Color-coded icons
- Fixed position (top-right)

### Mobile Responsive
- Collapsible navigation
- Bottom navigation bar on mobile
- Floating action button
- Responsive grids
- Mobile-optimized chat interface
- Touch-friendly buttons

## 🧩 Component Architecture

```
/App.tsx                      - Main app with routing logic
/components/
  ├── LandingPage.tsx         - Landing/home page (NEW)
  ├── LoginScreen.tsx         - SSO login page
  ├── MarketplaceDashboard.tsx - Home with item grid
  ├── CreateListing.tsx       - Create/edit listing form
  ├── ItemDetail.tsx          - Full item detail view
  ├── Messages.tsx            - Chat interface
  ├── UserDashboard.tsx       - User profile & listings
  ├── AdminPanel.tsx          - Moderation interface
  ├── Navigation.tsx          - Global nav bar
  ├── ItemCard.tsx            - Item display card
  ├── Button.tsx              - Button component
  ├── Input.tsx               - Form input component
  ├── Badge.tsx               - Badge/tag component
  ├── Avatar.tsx              - User avatar component
  └── Toast.tsx               - Notification toast
/styles/
  └── globals.css             - Design system tokens & typography
```

## 🚀 Usage

### First Visit
The app now opens with a beautiful landing page showcasing the marketplace features. You can browse as a guest or sign in to access full features.

### Navigation Flow:
0. **Landing** → See overview, featured items, workshops, and activity
1. **Sign In** → Click "Sign In" or any protected action to login
2. **Marketplace** → Browse items, search, filter, add to wishlist
3. **Create Listing** → Add new items with images and details
4. **Item Detail** → View full details, contact seller, report
5. **Messages** → Chat with buyers/sellers
6. **Dashboard** → Manage your listings, inquiries, wishlist
7. **Admin Panel** → Review flagged content (admin role)

### Key Interactions:
- **Heart icon**: Add/remove from wishlist
- **View Item**: See full details
- **Contact Seller**: Open chat
- **Set Alert**: Get notified of new items in category
- **Report**: Flag inappropriate content
- **Create Listing**: Add new item to marketplace

## 📐 Design Guidelines

### Spacing
- Use 4px base unit
- Consistent padding: 24px for cards, 16px for smaller elements
- Gap between elements: 12px, 16px, 24px

### Shadows
- sm: Subtle elevation
- md: Cards at rest
- lg: Cards on hover
- xl: Modals and overlays

### Border Radius
- sm: 6px (badges, tags)
- md: 8px (buttons)
- lg: 12px (inputs)
- xl: 16px (small cards)
- 2xl: 24px (large cards)
- full: Pills and avatars

### Animations
- Use transition-all for hover states
- Duration: 200-300ms
- Easing: ease or ease-in-out
- Toast: slide-in-from-top
- Scale on hover: 1.05 for images

## 🎯 Best Practices

1. **Accessibility**: All interactive elements have clear focus states
2. **Performance**: Images loaded via Unsplash, lazy loading ready
3. **Responsive**: Mobile-first approach with breakpoints
4. **UX**: Clear feedback for all actions via toasts
5. **Consistency**: All components follow design system
6. **Safety**: Report mechanism for inappropriate content
7. **Community**: Free items encouraged, goodwill messaging

## 🔮 Future Enhancements

- Real backend integration (Supabase)
- User authentication (SSO)
- Real-time chat (WebSocket)
- Image upload to cloud storage
- Email notifications for alerts
- Advanced search (Elasticsearch)
- User ratings and reviews
- Transaction history
- Analytics dashboard
- Mobile app (React Native)

---

Built with ❤️ for internal corporate hackathons and demos.