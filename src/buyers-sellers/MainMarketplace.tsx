import { useEffect, useState } from 'react';
import { 
  Store, Search, ShoppingBag, User, Plus, LogOut, 
  Tag, Calendar, Shirt, Presentation, Filter, SlidersHorizontal 
} from 'lucide-react';
import type { User as UserType, Product, Workshop } from '../BuyersAndSellers';

type MainMarketplaceProps = {
  currentUser: UserType;
  onNavigate: (screen: any) => void;
  onViewProduct: (product: Product) => void;
  onViewWorkshop: (workshop: Workshop) => void;
  onLogout: () => void;
  cartCount: number;
};

export function MainMarketplace({ 
  currentUser, 
  onNavigate, 
  onViewProduct, 
  onViewWorkshop,
  onLogout,
  cartCount 
}: MainMarketplaceProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'thrift' | 'workshops'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [remoteItems, setRemoteItems] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  // Mock data with South Indian names (fallback)
  const mockProducts: Product[] = [
    {
      id: '1',
      title: 'Nike Air Max 97',
      description: 'Size 10, Gently Used. Perfect condition, barely worn.',
      category: 'Fashion',
      price: 85,
      condition: 'Gently Used',
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'],
      seller: {
        id: '2',
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@company.com',
        department: 'Design',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
      },
      createdAt: new Date(),
      type: 'thrift'
    },
    {
      id: '2',
      title: 'Vintage Ceramic Vase',
      description: 'Handmade ceramic vase from 1980s. Beautiful floral pattern.',
      category: 'Home Decor',
      price: 30,
      condition: 'Excellent',
      images: ['https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400'],
      seller: {
        id: '3',
        name: 'Lakshmi Iyer',
        email: 'lakshmi.iyer@company.com',
        department: 'Marketing',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400'
      },
      createdAt: new Date(),
      type: 'thrift'
    },
    {
      id: '3',
      title: 'Espresso Machine',
      description: 'Like new condition, comes with original box and accessories.',
      category: 'Electronics',
      price: 120,
      condition: 'Like New',
      images: ['https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400'],
      seller: {
        id: '4',
        name: 'Arun Menon',
        email: 'arun.menon@company.com',
        department: 'Engineering',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'
      },
      createdAt: new Date(),
      type: 'thrift'
    },
    {
      id: '4',
      title: 'Vintage Leather Jacket',
      description: 'Classic brown leather jacket, size M. Timeless style.',
      category: 'Fashion',
      price: 95,
      condition: 'Good',
      images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400'],
      seller: {
        id: '5',
        name: 'Deepa Nair',
        email: 'deepa.nair@company.com',
        department: 'Sales',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400'
      },
      createdAt: new Date(),
      type: 'thrift'
    }
  ];

  const mockWorkshops: Workshop[] = [
    {
      id: 'w1',
      title: 'Analog Photography 101',
      description: 'Learn the basics of film photography, from loading film to developing prints.',
      category: 'Photography',
      price: 25,
      host: {
        id: '6',
        name: 'Karthik Ramesh',
        email: 'karthik.ramesh@company.com',
        department: 'Creative',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'
      },
      date: 'Sat, Oct 24',
      time: '10:00 AM',
      location: 'Community Studio B',
      maxSeats: 15,
      bookedSeats: 12,
      images: ['https://images.unsplash.com/photo-1508185644026-3759baed1f69?w=400'],
      type: 'workshop'
    },
    {
      id: 'w2',
      title: 'Advanced JavaScript Workshop',
      description: 'Deep dive into modern JavaScript, async/await, promises, and more.',
      category: 'Coding',
      price: 45,
      host: {
        id: '7',
        name: 'Ananya Reddy',
        email: 'ananya.reddy@company.com',
        department: 'Engineering',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400'
      },
      date: 'Sun, Oct 25',
      time: '2:00 PM',
      location: 'Tech Lab 3',
      maxSeats: 20,
      bookedSeats: 8,
      images: ['https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400'],
      type: 'workshop'
    },
    {
      id: 'w3',
      title: 'Pottery & Ceramics',
      description: 'Hands-on pottery class. Create your own bowls and mugs.',
      category: 'Crafts',
      price: 35,
      host: {
        id: '8',
        name: 'Meera Krishnan',
        email: 'meera.krishnan@company.com',
        department: 'Design',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'
      },
      date: 'Sat, Oct 31',
      time: '3:00 PM',
      location: 'Art Studio A',
      maxSeats: 10,
      bookedSeats: 7,
      images: ['https://images.unsplash.com/photo-1676125105159-517d135a6cc3?w=400'],
      type: 'workshop'
    }
  ];

  const categories = ['all', 'Fashion', 'Home Decor', 'Electronics', 'Photography', 'Coding', 'Crafts'];

  const filteredItems = () => {
    let items: (Product | Workshop | any)[] = [];

    // Prefer remote items if available
    if (remoteItems) {
      // remoteItems is an array of listings from server
      const mapped = remoteItems.map(r => {
        const base = {
          id: r.id,
          title: r.title,
          description: r.description || r.title,
          category: r.category || 'Misc',
          price: r.price || 0,
          images: r.images && r.images.length ? r.images : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'],
          createdAt: new Date(r.createdAt || Date.now()),
          type: r.type || 'thrift'
        } as any;

        if ((r.type || 'thrift') === 'workshop') {
          const host = r.host || { id: r.ownerId || 'u1', name: r.ownerName || 'Seller', avatar: '' };
          return {
            ...base,
            host,
            date: r.date || r.date || null,
            time: r.time || null,
            location: r.location || 'TBD',
            maxSeats: r.maxSeats || 20,
            bookedSeats: r.bookedSeats || 0
          };
        }

        // thrift item uses seller
        return {
          ...base,
          seller: r.seller || { id: r.ownerId || 'u1', name: r.ownerName || 'Seller', avatar: '' }
        };
      });

      if (activeTab === 'all') items = mapped;
      else if (activeTab === 'thrift') items = mapped.filter(i => i.type === 'thrift');
      else items = mapped.filter(i => i.type === 'workshop');
    } else {
      if (activeTab === 'all') {
        items = [...mockProducts, ...mockWorkshops];
      } else if (activeTab === 'thrift') {
        items = mockProducts;
      } else {
        items = mockWorkshops;
      }
    }

    if (searchQuery) {
      items = items.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      items = items.filter(item => item.category === selectedCategory);
    }

    return items;
  };

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        // dynamic import to avoid SSR issues
        const api = await import('../api');
        const data = await api.getListings();
        if (mounted) setRemoteItems(data || []);
      } catch (err) {
        // ignore and keep mock data
        console.warn('Failed to fetch remote listings', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-sm">
              <Store className="w-4 h-4" />
            </div>
            <span className="site-brand flex items-center gap-1" style={{ fontFamily: 'Playfair Display, serif' }}>
              <span className="text-[1.5rem] font-bold">Buyers</span>
              <span className="text-[3rem] font-bold -mt-2 text-rose-600">&</span>
              <span className="text-[1.5rem] font-bold">Sellers</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => setActiveTab('all')}
              className={`text-sm font-medium transition-colors ${
                activeTab === 'all' ? 'text-slate-800' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Shop
            </button>
            <button 
              onClick={() => setActiveTab('thrift')}
              className={`text-sm font-medium transition-colors ${
                activeTab === 'thrift' ? 'text-slate-800' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Thrift
            </button>
            <button 
              onClick={() => setActiveTab('workshops')}
              className={`text-sm font-medium transition-colors ${
                activeTab === 'workshops' ? 'text-slate-800' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Workshops
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block group">
              <input
                type="text"
                placeholder="Search items or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm bg-slate-100 border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-slate-100 focus:border-slate-200 transition-all w-48 focus:w-64 outline-none placeholder:text-slate-400 text-slate-700"
              />
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
            </div>

            <button 
              onClick={() => onNavigate('cart')}
              className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-400 text-white text-xs rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <button onClick={() => onNavigate('activity')}>
                <img
                  src={currentUser.avatar}
                  className="w-8 h-8 rounded-full border border-slate-200 object-cover hover:ring-2 hover:ring-slate-300 transition-all"
                  alt={currentUser.name}
                />
              </button>
              <button
                onClick={onLogout}
                className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-12 pb-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-12 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center px-3 py-1 mb-6 rounded-full bg-slate-100 border border-slate-200 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
              <p className="text-slate-600 text-xs font-medium tracking-wide">New: Host paid workshops</p>
            </div>

            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-slate-900 leading-tight">
              Thrift goods.<br />
              <span className="text-slate-400">Share skills.</span>
            </h2>

            <p className="text-slate-500 text-lg mb-8 max-w-xl mx-auto font-light leading-relaxed">
              A curated community marketplace. Buy and sell pre-loved items, or host workshops to teach what you love.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <button 
                onClick={() => onNavigate('create')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-medium shadow-lg shadow-slate-200 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-200 transition-all transform active:scale-95 flex items-center justify-center gap-2"
              >
                <Tag className="w-4 h-4 text-slate-300" /> 
                Start Thrifting
              </button>
              <button 
                onClick={() => onNavigate('create')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-slate-400" /> 
                Host a Workshop
              </button>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white'
                      : cat === 'Fashion' ? 'bg-orange-50 text-orange-800 hover:bg-orange-100'
                      : cat === 'Home Decor' ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                      : cat === 'Photography' || cat === 'Crafts' ? 'bg-purple-50 text-purple-800 hover:bg-purple-100'
                      : cat === 'Coding' ? 'bg-blue-50 text-blue-800 hover:bg-blue-100'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'All Categories' : cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Items Grid */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-900">
                {activeTab === 'all' ? 'All Items' : activeTab === 'thrift' ? 'Thrift Items' : 'Workshops'}
              </h3>
              <p className="text-sm text-slate-500">{filteredItems().length} items available</p>
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-slate-500" />
              <span className="text-sm text-slate-700">Filters</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems().map((item) => (
              <button
                key={item.id}
                onClick={() => item.type === 'workshop' ? onViewWorkshop(item as Workshop) : onViewProduct(item as Product)}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group text-left"
              >
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    {item.type === 'workshop' ? (
                      <span className="px-2 py-1 rounded-lg bg-indigo-100 text-indigo-800 text-xs font-medium">
                        Workshop
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded-lg bg-rose-100 text-rose-800 text-xs font-medium">
                        Thrift
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <h4 className="font-medium text-slate-900 mb-1 truncate">{item.title}</h4>
                  <p className="text-xs text-slate-500 mb-3 line-clamp-2">{item.description}</p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">
                        ${item.price}
                        {item.type === 'workshop' && <span className="text-xs text-slate-400 font-normal">/person</span>}
                      </p>
                      {item.type === 'workshop' && (
                        <p className="text-xs text-slate-500 mt-0.5">
                          {(item as Workshop).maxSeats - (item as Workshop).bookedSeats} seats left
                        </p>
                      )}
                    </div>
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                      {item.type === 'workshop' ? (
                        <Presentation className="w-3 h-3 text-indigo-600" />
                      ) : (
                        <Shirt className="w-3 h-3 text-rose-600" />
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filteredItems().length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">No items found</h3>
              <p className="text-slate-500">Try adjusting your search or filters</p>
            </div>
          )}
        </section>
      </main>

      {/* Floating Create Button */}
      <button
        onClick={() => onNavigate('create')}
        className="fixed bottom-8 right-8 w-14 h-14 bg-slate-900 text-white rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
