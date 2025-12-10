import { useState } from 'react';
import { LandingLogin } from './buyers-sellers/LandingLogin';
import { MainMarketplace } from './buyers-sellers/MainMarketplace';
import { WorkshopDetail } from './buyers-sellers/WorkshopDetail';
import { ProductDetail } from './buyers-sellers/ProductDetail';
import { CreateListing } from './buyers-sellers/CreateListing';
import { MyActivity } from './buyers-sellers/MyActivity';
import { Cart } from './buyers-sellers/Cart';

export type User = {
  id: string;
  name: string;
  email: string;
  department: string;
  avatar: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  condition: string;
  images: string[];
  seller: User;
  createdAt: Date;
  type: 'thrift';
};

export type Workshop = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  host: User;
  date: string;
  time: string;
  location: string;
  maxSeats: number;
  bookedSeats: number;
  images: string[];
  type: 'workshop';
};

export type CartItem = {
  id: string;
  item: Product | Workshop;
  quantity: number;
};

export default function BuyersAndSellers() {
  const [currentScreen, setCurrentScreen] = useState<
    'landing' | 'marketplace' | 'product' | 'workshop' | 'create' | 'activity' | 'cart'
  >('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentScreen('marketplace');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentScreen('landing');
    setCartItems([]);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('product');
  };

  const handleViewWorkshop = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
    setCurrentScreen('workshop');
  };

  const handleAddToCart = (item: Product | Workshop) => {
    const existingItem = cartItems.find(ci => ci.item.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(ci => 
        ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
      ));
    } else {
      setCartItems([...cartItems, { id: item.id, item, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCartItems(cartItems.filter(ci => ci.item.id !== itemId));
  };

  const handleUpdateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveFromCart(itemId);
    } else {
      setCartItems(cartItems.map(ci => 
        ci.item.id === itemId ? { ...ci, quantity } : ci
      ));
    }
  };

  if (currentScreen === 'landing') {
    return <LandingLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen">
      {currentScreen === 'marketplace' && (
        <MainMarketplace
          currentUser={currentUser!}
          onNavigate={setCurrentScreen}
          onViewProduct={handleViewProduct}
          onViewWorkshop={handleViewWorkshop}
          onLogout={handleLogout}
          cartCount={cartItems.length}
        />
      )}
      {currentScreen === 'product' && selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          currentUser={currentUser!}
          onNavigate={setCurrentScreen}
          onAddToCart={handleAddToCart}
          cartCount={cartItems.length}
        />
      )}
      {currentScreen === 'workshop' && selectedWorkshop && (
        <WorkshopDetail
          workshop={selectedWorkshop}
          currentUser={currentUser!}
          onNavigate={setCurrentScreen}
          onAddToCart={handleAddToCart}
          cartCount={cartItems.length}
        />
      )}
      {currentScreen === 'create' && (
        <CreateListing
          currentUser={currentUser!}
          onNavigate={setCurrentScreen}
          cartCount={cartItems.length}
        />
      )}
      {currentScreen === 'activity' && (
        <MyActivity
          currentUser={currentUser!}
          onNavigate={setCurrentScreen}
          cartCount={cartItems.length}
        />
      )}
      {currentScreen === 'cart' && (
        <Cart
          currentUser={currentUser!}
          onNavigate={setCurrentScreen}
          cartItems={cartItems}
          onRemoveItem={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateCartQuantity}
        />
      )}
    </div>
  );
}
