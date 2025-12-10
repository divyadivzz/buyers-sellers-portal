import { LogIn, Store, ArrowLeft } from 'lucide-react';
import { Button } from './Button';
import type { User } from '../App';

type LoginScreenProps = {
  onLogin: (user: User) => void;
  onBack?: () => void;
};

export function LoginScreen({ onLogin, onBack }: LoginScreenProps) {
  const handleSSOLogin = () => {
    // Mock user login
    const mockUser: User = {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah.chen@company.com',
      department: 'Engineering',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    };
    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-violet-50 flex items-center justify-center p-4">
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Home</span>
        </button>
      )}
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding */}
        <div className="text-center md:text-left space-y-6">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-violet-600 rounded-xl flex items-center justify-center">
              <Store className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2>Community Marketplace</h2>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="bg-gradient-to-r from-teal-600 to-violet-600 bg-clip-text text-transparent">
              Welcome to the Employee Community Marketplace
            </h1>
            <p className="text-xl text-gray-600 max-w-lg">
              Buy, sell, and exchange items with your colleagues. Build connections while giving items a second life.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1637848982574-87b2970e24ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjBleGNoYW5naW5nJTIwaXRlbXN8ZW58MXx8fHwxNzY1MjE5NzgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Employees exchanging items"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex justify-center">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-md space-y-8">
            <div className="text-center space-y-2">
              <h3>Sign In</h3>
              <p className="text-gray-600">
                Use your corporate credentials to access the marketplace
              </p>
            </div>

            <div className="space-y-4">
              <Button
                onClick={handleSSOLogin}
                variant="primary"
                size="lg"
                fullWidth
                icon={<LogIn className="w-5 h-5" />}
              >
                Sign in with Corporate SSO
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-white text-sm text-gray-500">
                    Secure authentication
                  </span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-teal-50 to-violet-50 rounded-xl p-4">
                <p className="text-sm text-gray-700 text-center">
                  By signing in, you agree to our community guidelines and terms of service
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <p className="text-2xl mb-1">🛍️</p>
                <p className="text-xs text-gray-600">Browse Items</p>
              </div>
              <div className="text-center">
                <p className="text-2xl mb-1">💬</p>
                <p className="text-xs text-gray-600">Chat Safely</p>
              </div>
              <div className="text-center">
                <p className="text-2xl mb-1">🤝</p>
                <p className="text-xs text-gray-600">Connect</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}