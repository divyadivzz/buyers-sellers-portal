import { Store, ShoppingBag, Users, Award, ArrowRight, Sparkles } from 'lucide-react';
import type { User } from '../BuyersAndSellers';
import { useState } from 'react';

type LandingLoginProps = {
  onLogin: (user: User) => void;
};

export function LandingLogin({ onLogin }: LandingLoginProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email) {
      setError('Please enter your corporate email.');
      return;
    }
    if (!email.endsWith('@soprasteria.com')) {
      setError('Only @soprasteria.com emails are allowed.');
      return;
    }
    setError('');
    const mockUser: User = {
      id: '1',
      name: 'Priya Krishnan',
      email,
      department: 'Engineering',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    };
    onLogin(mockUser);
  };

  const features = [
    {
      icon: ShoppingBag,
      title: 'Thrift & Save',
      description: 'Buy and sell pre-loved items. Save money while being sustainable.',
      color: 'from-rose-100 to-rose-200',
      iconColor: 'text-rose-600'
    },
    {
      icon: Users,
      title: 'Host Workshops',
      description: 'Share your skills. Earn by teaching what you love to colleagues.',
      color: 'from-indigo-100 to-indigo-200',
      iconColor: 'text-indigo-600'
    },
    {
      icon: Award,
      title: 'Trusted Community',
      description: 'Safe transactions within your organization. Built on trust.',
      color: 'from-emerald-100 to-emerald-200',
      iconColor: 'text-emerald-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
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
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
            {/* Left: Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 shadow-sm">
                <Sparkles className="w-3 h-3 text-emerald-500" />
                <span className="text-slate-600 text-xs font-medium tracking-wide">
                  New: Host paid workshops
                </span>
              </div>

              <div className="space-y-6">
                <h2 className="text-5xl md:text-6xl font-semibold tracking-tight text-slate-900 leading-[1.1]">
                  Thrift goods.<br />
                  <span className="text-slate-400">Share skills.</span>
                </h2>

                <p className="text-slate-500 text-lg md:text-xl font-light leading-relaxed max-w-xl">
                  A curated community marketplace. Buy and sell pre-loved items, or host workshops to teach what you love.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid gap-4 pt-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div 
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-all group"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 mb-1">{feature.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Login Box */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="w-full max-w-md">
                <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-200 p-8 space-y-6">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center mx-auto mb-4">
                      <Store className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-slate-900">Welcome Back</h3>
                    <p className="text-slate-500">Sign in to access the marketplace</p>
                  </div>

                  <div className="space-y-4">
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Enter your corporate email"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-400 focus:outline-none text-sm mb-2"
                    />
                    {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
                    <button
                      onClick={handleLogin}
                      className="w-full px-6 py-3.5 rounded-xl bg-slate-900 text-white font-medium shadow-lg shadow-slate-200 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-200 transition-all transform active:scale-95 flex items-center justify-center gap-2"
                    >
                      Sign in with Corporate SSO
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200"></div>
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="px-2 bg-white text-slate-400">or continue with</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-300 transition-all text-sm" onClick={() => alert('Google login not configured.')}>
                        Google
                      </button>
                      <button className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-300 transition-all text-sm" onClick={() => alert('Microsoft login not configured.')}> 
                        Microsoft
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-400 text-center leading-relaxed">
                      By signing in, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </div>
                </div>

                {/* Stats Below Login */}
                <div className="mt-6 grid grid-cols-3 gap-4 px-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">50+</div>
                    <div className="text-xs text-slate-500">Active Items</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">5+</div>
                    <div className="text-xs text-slate-500">Workshops</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">10+</div>
                    <div className="text-xs text-slate-500">Happy Users</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-slate-900 flex items-center justify-center text-white">
                <Store className="w-3 h-3" />
              </div>
              <span className="site-brand flex items-center gap-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                <span className="text-[1.5rem] font-bold">Buyers</span>
                <span className="text-[5rem] font-bold -mt-2 text-rose-600">&</span>
                <span className="text-[1.5rem] font-bold">Sellers</span>
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <button className="text-xs text-slate-500 hover:text-slate-900 transition-colors">
                Safety Guidelines
              </button>
              <button className="text-xs text-slate-500 hover:text-slate-900 transition-colors">
                Seller Fees
              </button>
              <button className="text-xs text-slate-500 hover:text-slate-900 transition-colors">
                Workshop Policy
              </button>
              <button className="text-xs text-slate-500 hover:text-slate-900 transition-colors">
                Help Center
              </button>
            </div>

            <p className="text-xs text-slate-400">© 2024 Buyers&Sellers Inc.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
