import { useState } from 'react';
import { Edit, Trash2, Eye, Heart, MessageSquare, Package } from 'lucide-react';
import { Navigation } from './Navigation';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { Button } from './Button';
import type { User, Item } from '../App';

type UserDashboardProps = {
  currentUser: User;
  onNavigate: (screen: any) => void;
  items: Item[];
  onViewItem: (item: Item) => void;
};

export function UserDashboard({ currentUser, onNavigate, items, onViewItem }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState<'listings' | 'inquiries' | 'wishlist'>('listings');

  // Mock user listings
  const userListings: Item[] = [
    {
      id: 'user-1',
      title: 'Vintage Camera Collection',
      description: 'Moving sale - various film cameras',
      category: 'Electronics',
      price: 250,
      isFree: false,
      condition: 'Good',
      images: ['https://images.unsplash.com/photo-1495121553079-4c61bcce1894?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2FtZXJhfGVufDF8fHx8MTc2NTIyNTcwNHww&ixlib=rb-4.1.0&q=80&w=1080'],
      seller: currentUser,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      expiresIn: 15,
    },
    {
      id: 'user-2',
      title: 'Office Desk Organizer',
      description: 'Wooden desk organizer with multiple compartments',
      category: 'Accessories',
      price: 0,
      isFree: true,
      condition: 'Like New',
      images: ['https://images.unsplash.com/photo-1623679072629-3aaa0192a391?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBkZXNrfGVufDF8fHx8MTc2NTEzMzMyOXww&ixlib=rb-4.1.0&q=80&w=1080'],
      seller: currentUser,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
  ];

  // Mock inquiries
  const inquiries = [
    {
      id: '1',
      itemTitle: 'Ergonomic Office Chair',
      itemImage: 'https://images.unsplash.com/photo-1688578735427-994ecdea3ea4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBjaGFpcnxlbnwxfHx8fDE3NjUxODc5MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      seller: {
        name: 'Michael Torres',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      },
      lastMessage: 'I can do tomorrow afternoon around 2pm',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      unread: false,
    },
    {
      id: '2',
      itemTitle: 'MacBook Pro Stand',
      itemImage: 'https://images.unsplash.com/photo-1623679072629-3aaa0192a391?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBkZXNrfGVufDF8fHx8MTc2NTEzMzMyOXww&ixlib=rb-4.1.0&q=80&w=1080',
      seller: {
        name: 'James Kim',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      },
      lastMessage: 'Yes! You can pick it up from my desk anytime',
      timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
      unread: true,
    },
  ];

  // Mock wishlist items
  const wishlistItems = items.filter((item) => item.isWishlisted);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        currentUser={currentUser}
        onNavigate={onNavigate}
        onCreateNew={() => onNavigate('create')}
        activeScreen="dashboard"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-teal-500 to-violet-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar src={currentUser.avatar} name={currentUser.name} size="xl" />
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-white mb-2">{currentUser.name}</h2>
              <p className="text-teal-100 mb-4">
                {currentUser.department} • {currentUser.email}
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                  <p className="text-2xl">{userListings.length}</p>
                  <p className="text-sm text-teal-100">Active Listings</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                  <p className="text-2xl">{inquiries.length}</p>
                  <p className="text-sm text-teal-100">Conversations</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                  <p className="text-2xl">{wishlistItems.length}</p>
                  <p className="text-sm text-teal-100">Wishlist Items</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-md mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('listings')}
              className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 transition-all ${
                activeTab === 'listings'
                  ? 'border-b-2 border-teal-500 text-teal-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Package className="w-5 h-5" />
              <span>My Listings</span>
              <Badge variant="gray" size="sm">{userListings.length}</Badge>
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 transition-all ${
                activeTab === 'inquiries'
                  ? 'border-b-2 border-teal-500 text-teal-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>Inquiries</span>
              <Badge variant="gray" size="sm">{inquiries.length}</Badge>
            </button>
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 transition-all ${
                activeTab === 'wishlist'
                  ? 'border-b-2 border-teal-500 text-teal-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Heart className="w-5 h-5" />
              <span>Wishlist</span>
              <Badge variant="gray" size="sm">{wishlistItems.length}</Badge>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {/* My Listings Tab */}
          {activeTab === 'listings' && (
            <div className="space-y-4">
              {userListings.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="mb-2">No listings yet</h3>
                  <p className="text-gray-600 mb-6">
                    Start sharing items with your colleagues
                  </p>
                  <Button onClick={() => onNavigate('create')} variant="primary">
                    Create Your First Listing
                  </Button>
                </div>
              ) : (
                <>
                  {userListings.map((listing) => (
                    <div
                      key={listing.id}
                      className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex gap-6">
                        <img
                          src={listing.images[0]}
                          alt={listing.title}
                          className="w-32 h-32 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="mb-1">{listing.title}</h4>
                              <div className="flex gap-2">
                                <Badge variant="primary">{listing.category}</Badge>
                                {listing.isFree ? (
                                  <Badge variant="success">FREE</Badge>
                                ) : (
                                  <Badge variant="gray">{formatPrice(listing.price)}</Badge>
                                )}
                                {listing.expiresIn && (
                                  <Badge variant="warning">Expires in {listing.expiresIn}d</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {listing.description}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>Listed {formatDate(listing.createdAt)}</span>
                            <span>•</span>
                            <span>12 views</span>
                            <span>•</span>
                            <span>3 inquiries</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            onClick={() => onViewItem(listing)}
                            variant="secondary"
                            size="sm"
                            icon={<Eye className="w-4 h-4" />}
                          >
                            View
                          </Button>
                          <Button
                            onClick={() => {}}
                            variant="ghost"
                            size="sm"
                            icon={<Edit className="w-4 h-4" />}
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => {}}
                            variant="ghost"
                            size="sm"
                            icon={<Trash2 className="w-4 h-4 text-red-500" />}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {/* Inquiries Tab */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              {inquiries.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="mb-2">No inquiries yet</h3>
                  <p className="text-gray-600">
                    Your conversations will appear here
                  </p>
                </div>
              ) : (
                <>
                  {inquiries.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => onNavigate('messages')}
                    >
                      <div className="flex gap-4">
                        <img
                          src={inquiry.itemImage}
                          alt={inquiry.itemTitle}
                          className="w-20 h-20 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h5 className="mb-1">{inquiry.itemTitle}</h5>
                              <div className="flex items-center gap-2">
                                <Avatar
                                  src={inquiry.seller.avatar}
                                  name={inquiry.seller.name}
                                  size="sm"
                                />
                                <p className="text-sm text-gray-600">{inquiry.seller.name}</p>
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">
                              {getTimeAgo(inquiry.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mt-2">{inquiry.lastMessage}</p>
                        </div>
                        {inquiry.unread && (
                          <div className="w-3 h-3 bg-teal-500 rounded-full" />
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div>
              {wishlistItems.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="mb-2">No wishlist items</h3>
                  <p className="text-gray-600 mb-6">
                    Save items you{"'"}re interested in to your wishlist
                  </p>
                  <Button onClick={() => onNavigate('marketplace')} variant="primary">
                    Browse Marketplace
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="aspect-[4/3] relative">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        {item.isFree && (
                          <Badge variant="success" className="absolute top-3 left-3">
                            FREE
                          </Badge>
                        )}
                      </div>
                      <div className="p-4">
                        <h5 className="mb-2">{item.title}</h5>
                        <p className="text-xl mb-3">
                          {item.isFree ? (
                            <span className="text-green-600">FREE</span>
                          ) : (
                            formatPrice(item.price)
                          )}
                        </p>
                        <Button
                          onClick={() => onViewItem(item)}
                          variant="secondary"
                          size="sm"
                          fullWidth
                        >
                          View Item
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
