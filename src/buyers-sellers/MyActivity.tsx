import { useState } from 'react';
import { ArrowLeft, Store, ShoppingBag, Package, Calendar, Heart, Edit, Trash2 } from 'lucide-react';
import type { User } from '../BuyersAndSellers';

type MyActivityProps = {
  currentUser: User;
  onNavigate: (screen: any) => void;
  cartCount: number;
};

export function MyActivity({ currentUser, onNavigate, cartCount }: MyActivityProps) {
  const [activeTab, setActiveTab] = useState<'listings' | 'bookings' | 'favorites'>('listings');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('marketplace')}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-sm">
                <Store className="w-4 h-4" />
              </div>
              <h1 className="font-semibold tracking-tight text-slate-800">My Activity</h1>
            </div>
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
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
          <div className="flex items-center gap-6 mb-6">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-24 h-24 rounded-full border-4 border-slate-100 object-cover"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-slate-900 mb-1">{currentUser.name}</h2>
              <p className="text-slate-500 mb-3">{currentUser.department}</p>
              <div className="flex gap-6">
                <div>
                  <p className="text-2xl font-bold text-slate-900">12</p>
                  <p className="text-xs text-slate-500">Active Listings</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">5</p>
                  <p className="text-xs text-slate-500">Bookings</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">8</p>
                  <p className="text-xs text-slate-500">Favorites</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-4 py-3 font-medium transition-colors relative ${
              activeTab === 'listings'
                ? 'text-slate-900'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Package className="w-4 h-4 inline-block mr-2" />
            My Listings
            {activeTab === 'listings' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-3 font-medium transition-colors relative ${
              activeTab === 'bookings'
                ? 'text-slate-900'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Calendar className="w-4 h-4 inline-block mr-2" />
            My Bookings
            {activeTab === 'bookings' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-4 py-3 font-medium transition-colors relative ${
              activeTab === 'favorites'
                ? 'text-slate-900'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Heart className="w-4 h-4 inline-block mr-2" />
            Favorites
            {activeTab === 'favorites' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900"></div>
            )}
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {activeTab === 'listings' && (
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 hover:border-slate-300 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-lg bg-slate-100 flex-shrink-0"></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900 mb-1">Sample Listing {i}</h4>
                      <p className="text-sm text-slate-500 mb-2">Listed 3 days ago • 12 views</p>
                      <span className="inline-block px-2 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-medium">
                        Active
                      </span>
                    </div>
                    <div className="text-right mr-4">
                      <p className="font-semibold text-slate-900">${45 + i * 10}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-rose-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-rose-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab === 'bookings' && (
            <>
              {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-lg bg-indigo-100 flex-shrink-0"></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900 mb-1">Workshop Booking {i}</h4>
                      <p className="text-sm text-slate-500 mb-2">Sat, Oct 24 • 10:00 AM</p>
                      <span className="inline-block px-2 py-1 rounded bg-indigo-50 text-indigo-700 text-xs font-medium">
                        Confirmed
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900">${25 + i * 10}</p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab === 'favorites' && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all">
                  <div className="aspect-square bg-slate-100 rounded-t-xl"></div>
                  <div className="p-3">
                    <h4 className="font-medium text-slate-900 text-sm mb-1">Favorite Item {i}</h4>
                    <p className="font-semibold text-slate-900">${35 + i * 15}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
