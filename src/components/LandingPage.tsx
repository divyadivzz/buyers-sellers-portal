import { Store, Tag, CalendarPlus, Search, ShoppingBag, Shirt, Presentation, Calendar, MapPin, Heart } from 'lucide-react';
import { Button } from './Button';
import { Badge } from './Badge';
import { Avatar } from './Avatar';
import type { User, Item } from '../App';

type LandingPageProps = {
  currentUser: User | null;
  onNavigate: (screen: any) => void;
  featuredItems?: Item[];
};

export function LandingPage({ currentUser, onNavigate, featuredItems = [] }: LandingPageProps) {
  // Mock workshop data
  const featuredWorkshop = {
    id: '1',
    title: 'Analog Photography 101',
    host: 'Marc L.',
    attendees: 14,
    date: 'Sat, Oct 24',
    time: '10:00 AM',
    location: 'Community Studio B',
    price: 25,
    images: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    ]
  };

  // Mock recent activity
  const recentActivity = [
    {
      id: '1',
      user: {
        name: 'Maya R.',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400'
      },
      action: 'is interested in',
      item: 'Vintage Lamp',
      message: 'Hi! Is this still available? I can pick it up tomorrow afternoon...',
      time: '2m ago',
      type: 'inquiry' as const,
      online: true
    },
    {
      id: '2',
      user: {
        name: 'John D.',
        avatar: null
      },
      action: 'booked',
      item: 'Advanced JS Workshop',
      message: 'Ticket confirmed. 1 Seat reserved.',
      time: '1h ago',
      type: 'booking' as const,
      amount: 45
    }
  ];

  // Default featured items if none provided
  const defaultFeaturedItems = [
    {
      id: '1',
      title: 'Nike Air Max 97',
      description: 'Size 10 • Gently Used',
      price: 85,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'
    },
    {
      id: '2',
      title: 'Vintage Vase',
      description: 'Handmade • 1980s',
      price: 30,
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400'
    },
    {
      id: '3',
      title: 'Espresso Machine',
      description: 'Like New • Box included',
      price: 120,
      image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400'
    }
  ];

  const displayItems = featuredItems.length > 0 
    ? featuredItems.slice(0, 3) 
    : defaultFeaturedItems;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center text-white shadow-sm">
              <Store className="w-4 h-4" />
            </div>
            <h1 className="font-semibold tracking-tight text-gray-800">Community Marketplace</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => onNavigate('marketplace')}
              className="text-sm font-medium text-gray-800 hover:text-teal-600 transition-colors"
            >
              Shop
            </button>
            <button className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
              Workshops
            </button>
            <button className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
              Community
            </button>
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block group">
              <input 
                type="text" 
                placeholder="Search items or skills..." 
                className="pl-9 pr-4 py-2 text-sm bg-gray-100 border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-teal-100 focus:border-teal-200 transition-all w-48 focus:w-64 outline-none placeholder:text-gray-400 text-gray-700"
              />
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
            </div>
            
            {currentUser ? (
              <>
                <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <ShoppingBag className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-400 rounded-full border border-white"></span>
                </button>
                
                <div className="flex items-center gap-2 pl-2 border-l border-gray-200 ml-2">
                  <button onClick={() => onNavigate('dashboard')}>
                    <Avatar src={currentUser.avatar} name={currentUser.name} size="sm" />
                  </button>
                </div>
              </>
            ) : (
              <Button 
                onClick={() => onNavigate('login')}
                variant="primary"
                size="sm"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="pt-28 pb-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-12 md:py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center px-3 py-1 mb-8 rounded-full bg-gray-100 border border-gray-200 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
              <p className="text-gray-600 text-xs font-medium tracking-wide">New: Host paid workshops</p>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6 text-gray-900 leading-tight">
              Share. Trade.<br />
              <span className="bg-gradient-to-r from-teal-600 to-violet-600 bg-clip-text text-transparent">Grow Together.</span>
            </h2>
            
            <p className="text-gray-500 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
              A curated community marketplace. Buy and sell pre-loved items, or host workshops to teach what you love.
            </p>
            
            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button
                onClick={() => currentUser ? onNavigate('marketplace') : onNavigate('login')}
                variant="primary"
                size="lg"
                icon={<Tag className="w-4 h-4" />}
                className="w-full sm:w-auto shadow-lg hover:shadow-xl"
              >
                Start Shopping
              </Button>
              <Button
                onClick={() => currentUser ? onNavigate('create') : onNavigate('login')}
                variant="secondary"
                size="lg"
                icon={<CalendarPlus className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Create Listing
              </Button>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="warning" className="cursor-pointer hover:shadow-md transition-shadow">
                Vintage Clothing
              </Badge>
              <Badge variant="success" className="cursor-pointer hover:shadow-md transition-shadow">
                Home Decor
              </Badge>
              <Badge variant="info" className="cursor-pointer hover:shadow-md transition-shadow">
                Pottery Workshop
              </Badge>
              <Badge variant="default" className="cursor-pointer hover:shadow-md transition-shadow">
                Tech & Gadgets
              </Badge>
            </div>
          </div>
        </section>

        {/* Bento Grid Section */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Create Listing (Action Center) */}
            <div className="md:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-8 hover:border-gray-300 transition-all relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-gray-900">What are you offering today?</h3>
                    <p className="text-gray-500 text-sm mt-1">Create a listing for a product or schedule a learning session.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Option A: Sell Item */}
                  <button
                    onClick={() => currentUser ? onNavigate('create') : onNavigate('login')}
                    className="group/card text-left p-4 rounded-xl border border-gray-100 bg-white hover:border-rose-200 hover:shadow-md hover:shadow-rose-100/50 transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center mb-3 group-hover/card:scale-110 transition-transform">
                      <Shirt className="w-5 h-5 text-rose-500" />
                    </div>
                    <h4 className="font-medium text-gray-900 mb-1">List an Item</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">Sell clothes, furniture, or gadgets. Give them a second life.</p>
                  </button>

                  {/* Option B: Host Workshop */}
                  <button
                    onClick={() => currentUser ? onNavigate('create') : onNavigate('login')}
                    className="group/card text-left p-4 rounded-xl border border-gray-100 bg-white hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-100/50 transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center mb-3 group-hover/card:scale-110 transition-transform">
                      <Presentation className="w-5 h-5 text-indigo-500" />
                    </div>
                    <h4 className="font-medium text-gray-900 mb-1">Host Workshop</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">Share your expertise. Photography, coding, cooking, or crafts.</p>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2: Featured Workshop */}
            <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl border border-indigo-100 shadow-sm p-6 hover:shadow-lg hover:shadow-indigo-100/40 transition-all relative group overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <Badge variant="info" className="text-xs">Popular Now</Badge>
                <div className="flex -space-x-2">
                  {featuredWorkshop.images.map((img, i) => (
                    <img 
                      key={i}
                      src={img} 
                      className="w-6 h-6 rounded-full border-2 border-white object-cover" 
                      alt="" 
                    />
                  ))}
                  <div className="w-6 h-6 rounded-full bg-indigo-200 border-2 border-white flex items-center justify-center text-[8px] font-bold text-indigo-800">
                    +{featuredWorkshop.attendees - 2}
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-1">{featuredWorkshop.title}</h3>
                <p className="text-xs text-gray-500">Hosted by <span className="text-gray-800 font-medium">{featuredWorkshop.host}</span></p>
              </div>

              <div className="bg-white rounded-xl p-3 border border-indigo-100 mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-600">{featuredWorkshop.date} • {featuredWorkshop.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-600">{featuredWorkshop.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <span className="font-semibold text-gray-900">
                  ${featuredWorkshop.price}
                  <span className="text-xs text-gray-400 font-normal">/person</span>
                </span>
                <Button
                  onClick={() => currentUser ? onNavigate('marketplace') : onNavigate('login')}
                  variant="primary"
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Join
                </Button>
              </div>
            </div>

            {/* Card 3: Thrifting Spotlight */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:border-gray-300 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900">Fresh Thrift Finds</h3>
                <button 
                  onClick={() => currentUser ? onNavigate('marketplace') : onNavigate('login')}
                  className="text-xs text-teal-600 hover:text-teal-700 font-medium"
                >
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {displayItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => currentUser ? onNavigate('marketplace') : onNavigate('login')}
                    className="w-full flex items-center gap-3 group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden relative flex-shrink-0">
                      <img 
                        src={item.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        alt={item.title}
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="text-sm font-medium text-gray-800">{item.title}</h4>
                      <p className="text-[10px] text-gray-500">{item.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">${item.price}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Card 4: Recent Activity */}
            <div className="md:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-8 hover:border-gray-300 transition-all">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold tracking-tight text-gray-900">Recent Activity</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg text-xs font-medium">
                    All
                  </button>
                  <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors">
                    Messages
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div 
                    key={activity.id}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gray-50/50 border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="relative flex-shrink-0">
                      {activity.user.avatar ? (
                        <img 
                          src={activity.user.avatar} 
                          className="w-10 h-10 rounded-full object-cover" 
                          alt={activity.user.name}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">
                          {activity.user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                      {activity.online && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.user.name} <span className="text-gray-400 font-normal">{activity.action}</span> {activity.item}
                        </p>
                        <span className="text-[10px] text-gray-400 flex-shrink-0">{activity.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-1">{activity.message}</p>
                    </div>
                    {activity.type === 'inquiry' ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          currentUser ? onNavigate('messages') : onNavigate('login');
                        }}
                      >
                        Reply
                      </Button>
                    ) : (
                      <Badge variant="success" className="flex-shrink-0 text-xs">
                        Paid ${activity.amount}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="max-w-7xl mx-auto px-6 py-16 mt-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-semibold text-gray-900 mb-4">Why Choose Our Marketplace?</h3>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Built for communities that care about sustainability, skill-sharing, and meaningful connections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-teal-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Sustainable Living</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Give items a second life and reduce waste. Every purchase supports a circular economy.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-100 to-violet-200 flex items-center justify-center mx-auto mb-4">
                <Presentation className="w-8 h-8 text-violet-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Learn & Teach</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Host workshops and share your skills. From coding to cooking, there&apos;s always something new.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center mx-auto mb-4">
                <Store className="w-8 h-8 text-rose-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Trusted Community</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Buy and sell within your organization. Safe, secure, and built on trust.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gray-900 flex items-center justify-center text-white text-xs shadow-sm">
              <Store className="w-3 h-3" />
            </div>
            <span className="text-sm font-semibold text-gray-900">Community Marketplace</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            <button className="text-xs text-gray-500 hover:text-gray-900 transition-colors">Safety Guidelines</button>
            <button className="text-xs text-gray-500 hover:text-gray-900 transition-colors">Seller Fees</button>
            <button className="text-xs text-gray-500 hover:text-gray-900 transition-colors">Workshop Policy</button>
            <button className="text-xs text-gray-500 hover:text-gray-900 transition-colors">Help Center</button>
          </div>
          
          <p className="text-xs text-gray-400">© 2024 Community Marketplace Inc.</p>
        </div>
      </footer>
    </div>
  );
}
