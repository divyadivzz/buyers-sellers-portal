import { useState, useEffect } from 'react';
import { Search, Filter, Plus, Bell } from 'lucide-react';
import { Navigation } from './Navigation';
import { ItemCard } from './ItemCard';
import { Input } from './Input';
import { Button } from './Button';
import type { User, Item } from '../App';

type MarketplaceDashboardProps = {
  currentUser: User;
  onNavigate: (screen: any) => void;
  onViewItem: (item: Item) => void;
  items: Item[];
  onToggleWishlist: (itemId: string) => void;
};

// Mock data for initial items
const MOCK_ITEMS: Item[] = [
  {
    id: '1',
    title: 'Ergonomic Office Chair',
    description: 'Herman Miller Aeron chair, barely used. Moving to standing desk setup.',
    category: 'Furniture',
    price: 450,
    isFree: false,
    condition: 'Like New',
    images: ['https://images.unsplash.com/photo-1688578735427-994ecdea3ea4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBjaGFpcnxlbnwxfHx8fDE3NjUxODc5MDF8MA&ixlib=rb-4.1.0&q=80&w=1080'],
    seller: {
      id: '2',
      name: 'Michael Torres',
      email: 'michael.torres@company.com',
      department: 'Design',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    expiresIn: 10,
  },
  {
    id: '2',
    title: 'Vintage Film Camera',
    description: 'Canon AE-1 with 50mm lens. Perfect working condition. Film photography enthusiasts welcome!',
    category: 'Electronics',
    price: 180,
    isFree: false,
    condition: 'Good',
    images: ['https://images.unsplash.com/photo-1495121553079-4c61bcce1894?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2FtZXJhfGVufDF8fHx8MTc2NTIyNTcwNHww&ixlib=rb-4.1.0&q=80&w=1080'],
    seller: {
      id: '3',
      name: 'Emma Johnson',
      email: 'emma.johnson@company.com',
      department: 'Marketing',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    },
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: '3',
    title: 'MacBook Pro Stand',
    description: 'Aluminum laptop stand, elevates screen to eye level. Great for ergonomics.',
    category: 'Accessories',
    price: 0,
    isFree: true,
    condition: 'Good',
    images: ['https://images.unsplash.com/photo-1623679072629-3aaa0192a391?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBkZXNrfGVufDF8fHx8MTc2NTEzMzMyOXww&ixlib=rb-4.1.0&q=80&w=1080'],
    seller: {
      id: '4',
      name: 'James Kim',
      email: 'james.kim@company.com',
      department: 'Engineering',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    },
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    expiresIn: 5,
  },
  {
    id: '4',
    title: 'Indoor Plant Collection',
    description: 'Moving out of state. 3 beautiful potted plants - monstera, pothos, and snake plant.',
    category: 'Home & Garden',
    price: 0,
    isFree: true,
    condition: 'Excellent',
    images: ['https://images.unsplash.com/photo-1562351757-66f3589f30cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZXBsYW50JTIwcG90dGVkfGVufDF8fHx8MTc2NTIyNTcwNXww&ixlib=rb-4.1.0&q=80&w=1080'],
    seller: {
      id: '5',
      name: 'Lisa Anderson',
      email: 'lisa.anderson@company.com',
      department: 'HR',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
    },
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
  {
    id: '5',
    title: 'Programming Books Bundle',
    description: 'Clean Code, Design Patterns, and 5 other technical books. All in great condition.',
    category: 'Books',
    price: 45,
    isFree: false,
    condition: 'Good',
    images: ['https://images.unsplash.com/photo-1508060793788-7d5f1c40c4ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMHNoZWxmfGVufDF8fHx8MTc2NTEyODYwNnww&ixlib=rb-4.1.0&q=80&w=1080'],
    seller: {
      id: '6',
      name: 'David Park',
      email: 'david.park@company.com',
      department: 'Engineering',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    },
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: '6',
    title: 'Sony WH-1000XM4 Headphones',
    description: 'Noise cancelling headphones, barely used. Upgraded to newer model.',
    category: 'Electronics',
    price: 200,
    isFree: false,
    condition: 'Like New',
    images: ['https://images.unsplash.com/photo-1624896386637-c267401a1781?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBoZWFkcGhvbmVzfGVufDF8fHx8MTc2NTIyNTcwNnww&ixlib=rb-4.1.0&q=80&w=1080'],
    seller: {
      id: '7',
      name: 'Rachel Green',
      email: 'rachel.green@company.com',
      department: 'Sales',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    expiresIn: 7,
  },
];

export function MarketplaceDashboard({
  currentUser,
  onNavigate,
  onViewItem,
  items,
  onToggleWishlist,
}: MarketplaceDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [priceFilter, setPriceFilter] = useState('All');
  const [displayItems, setDisplayItems] = useState<Item[]>([]);
  const [showCategoryAlert, setShowCategoryAlert] = useState(false);
  const [alertCategory, setAlertCategory] = useState('');

  useEffect(() => {
    // Initialize with mock items if no items exist
    if (items.length === 0) {
      setDisplayItems(MOCK_ITEMS);
    } else {
      setDisplayItems([...items, ...MOCK_ITEMS]);
    }
  }, [items]);

  const categories = ['All Categories', 'Furniture', 'Electronics', 'Accessories', 'Home & Garden', 'Books', 'Other'];

  const filteredItems = displayItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
    const matchesPrice = priceFilter === 'All' ||
                        (priceFilter === 'Free' && item.isFree) ||
                        (priceFilter === 'Paid' && !item.isFree);
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handleSetAlert = (category: string) => {
    setAlertCategory(category);
    setShowCategoryAlert(true);
    setTimeout(() => setShowCategoryAlert(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        currentUser={currentUser}
        onNavigate={onNavigate}
        onCreateNew={() => onNavigate('create')}
        activeScreen="marketplace"
      />

      {/* Category Alert Toast */}
      {showCategoryAlert && (
        <div className="fixed top-20 right-6 z-50 bg-white border-2 border-teal-200 rounded-2xl shadow-xl p-4 animate-in slide-in-from-top-5">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-teal-600" />
            <div>
              <p className="text-sm">Alert set for {alertCategory}</p>
              <p className="text-xs text-gray-500">You{"'"}ll be notified of new items</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="mb-2">Discover Items</h2>
          <p className="text-gray-600">Browse items shared by your colleagues</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <Input
                placeholder="Search by title, category, or price..."
                value={searchQuery}
                onChange={setSearchQuery}
                icon={<Search className="w-5 h-5" />}
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              >
                <option value="All">All Prices</option>
                <option value="Free">Free Only</option>
                <option value="Paid">Paid Only</option>
              </select>
            </div>
          </div>

          {/* Category Alerts */}
          {selectedCategory !== 'All Categories' && (
            <div className="mt-4 flex items-center justify-between bg-gradient-to-r from-teal-50 to-violet-50 rounded-xl p-4">
              <p className="text-sm text-gray-700">
                Want to be notified when new <strong>{selectedCategory}</strong> items are posted?
              </p>
              <Button
                onClick={() => handleSetAlert(selectedCategory)}
                variant="primary"
                size="sm"
                icon={<Bell className="w-4 h-4" />}
              >
                Set Alert
              </Button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
          </p>
          <select className="px-4 py-2 bg-white border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-500">
            <option>Newest First</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="mb-2">No items found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
            <Button onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Categories');
              setPriceFilter('All');
            }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onViewItem={onViewItem}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button - Mobile */}
      <button
        onClick={() => onNavigate('create')}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center z-30"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
