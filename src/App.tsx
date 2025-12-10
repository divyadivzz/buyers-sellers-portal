import { useState } from 'react';
import BuyersAndSellers from './BuyersAndSellers';
import { LandingPage } from './components/LandingPage';
import { LoginScreen } from './components/LoginScreen';
import { MarketplaceDashboard } from './components/MarketplaceDashboard';
import { CreateListing } from './components/CreateListing';
import { ItemDetail } from './components/ItemDetail';
import { Messages } from './components/Messages';
import { UserDashboard } from './components/UserDashboard';
import { AdminPanel } from './components/AdminPanel';
import { Toast } from './components/Toast';

export type User = {
  id: string;
  name: string;
  email: string;
  department: string;
  avatar: string;
};

export type Item = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  isFree: boolean;
  condition: string;
  images: string[];
  seller: User;
  createdAt: Date;
  expiresIn?: number;
  isWishlisted?: boolean;
};

export type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
};

export type Conversation = {
  id: string;
  itemId: string;
  itemTitle: string;
  otherUser: User;
  messages: Message[];
  lastMessage: string;
  lastMessageTime: Date;
};

export default function App() {
  // Use the new Buyers and Sellers marketplace
  return <BuyersAndSellers />;
  
  /* Original Community Marketplace Portal code - uncomment to use
  const [currentScreen, setCurrentScreen] = useState<
    'landing' | 'login' | 'marketplace' | 'create' | 'detail' | 'messages' | 'dashboard' | 'admin'
  >('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [items, setItems] = useState<Item[]>([]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentScreen('marketplace');
    showToast('Welcome back!', 'success');
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleViewItem = (item: Item) => {
    setSelectedItem(item);
    setCurrentScreen('detail');
  };

  const handleCreateListing = (listing: Partial<Item>) => {
    const newItem: Item = {
      id: Math.random().toString(),
      ...listing,
      seller: currentUser!,
      createdAt: new Date(),
      images: listing.images || [],
    } as Item;
    setItems([newItem, ...items]);
    setCurrentScreen('marketplace');
    showToast('Listing created successfully!', 'success');
  };

  const handleToggleWishlist = (itemId: string) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, isWishlisted: !item.isWishlisted } : item
    ));
  };

  if (currentScreen === 'landing') {
    return <LandingPage currentUser={currentUser} onNavigate={setCurrentScreen} featuredItems={items} />;
  }

  if (currentScreen === 'login') {
    return <LoginScreen onLogin={handleLogin} onBack={() => setCurrentScreen('landing')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentScreen === 'marketplace' && (
        <MarketplaceDashboard
          currentUser={currentUser!}
          onNavigate={setCurrentScreen}
          onViewItem={handleViewItem}
          items={items}
          onToggleWishlist={handleToggleWishlist}
        />
      )}
      {currentScreen === 'create' && (
        <CreateListing
          currentUser={currentUser!}
          onNavigate={setCurrentScreen}
          onCreateListing={handleCreateListing}
        />
      )}
      {currentScreen === 'detail' && selectedItem && (
        <ItemDetail
          item={selectedItem}
          currentUser={currentUser!}
          onNavigate={setCurrentScreen}
          onToggleWishlist={handleToggleWishlist}
          showToast={showToast}
        />
      )}
      {currentScreen === 'messages' && (
        <Messages currentUser={currentUser!} onNavigate={setCurrentScreen} />
      )}
      {currentScreen === 'dashboard' && (
        <UserDashboard
          currentUser={currentUser!}
          onNavigate={setCurrentScreen}
          items={items}
          onViewItem={handleViewItem}
        />
      )}
      {currentScreen === 'admin' && (
        <AdminPanel currentUser={currentUser!} onNavigate={setCurrentScreen} items={items} />
      )}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
  */
}