import { Store, MessageSquare, Heart, LayoutDashboard, Shield, Plus } from 'lucide-react';
import { Avatar } from './Avatar';
import type { User } from '../App';

type NavigationProps = {
  currentUser: User;
  onNavigate: (screen: 'landing' | 'marketplace' | 'messages' | 'dashboard' | 'admin') => void;
  onCreateNew?: () => void;
  activeScreen?: string;
};

export function Navigation({ currentUser, onNavigate, onCreateNew, activeScreen = 'marketplace' }: NavigationProps) {
  const navItems = [
    { id: 'marketplace', label: 'Marketplace', icon: Store },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'dashboard', label: 'My Dashboard', icon: LayoutDashboard },
  ];

  // Show admin panel for demo purposes
  const isAdmin = true;
  if (isAdmin) {
    navItems.push({ id: 'admin', label: 'Admin Panel', icon: Shield });
  }

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('landing')}
              className="w-10 h-10 bg-gradient-to-br from-teal-500 to-violet-600 rounded-xl flex items-center justify-center hover:shadow-lg transition-shadow"
            >
              <Store className="w-6 h-6 text-white" />
            </button>
            <div>
              <button onClick={() => onNavigate('landing')}>
                <h1 className="text-lg hover:text-teal-600 transition-colors">Community Marketplace</h1>
              </button>
            </div>
          </div>

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    isActive
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {onCreateNew && (
              <button
                onClick={onCreateNew}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New Listing</span>
              </button>
            )}
            <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
              <Avatar src={currentUser.avatar} name={currentUser.name} size="sm" />
              <div className="hidden lg:block">
                <p className="text-sm">{currentUser.name}</p>
                <p className="text-xs text-gray-500">{currentUser.department}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden border-t border-gray-200 bg-white">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as any)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg ${
                  isActive ? 'text-teal-600' : 'text-gray-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}