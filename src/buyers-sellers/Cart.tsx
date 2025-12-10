import { ArrowLeft, Store, Trash2, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';
import type { User, CartItem } from '../BuyersAndSellers';

type CartProps = {
  currentUser: User;
  onNavigate: (screen: any) => void;
  cartItems: CartItem[];
  onRemoveItem: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
};

export function Cart({ 
  currentUser, 
  onNavigate, 
  cartItems, 
  onRemoveItem,
  onUpdateQuantity 
}: CartProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

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
              <h1 className="font-semibold tracking-tight text-slate-800">Shopping Cart</h1>
            </div>
          </div>

          <img
            src={currentUser.avatar}
            className="w-8 h-8 rounded-full border border-slate-200 object-cover"
            alt={currentUser.name}
          />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Your cart is empty</h3>
            <p className="text-slate-500 mb-6">Add items to your cart to get started</p>
            <button
              onClick={() => onNavigate('marketplace')}
              className="px-6 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-900">
                  Cart Items ({cartItems.length})
                </h2>
                <button 
                  onClick={() => onNavigate('marketplace')}
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>

              {cartItems.map((cartItem) => (
                <div 
                  key={cartItem.id} 
                  className="bg-white rounded-xl border border-slate-200 p-4 hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                      <img
                        src={cartItem.item.images[0]}
                        alt={cartItem.item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-slate-900 mb-1">{cartItem.item.title}</h4>
                          <p className="text-sm text-slate-500">
                            {cartItem.item.type === 'workshop' 
                              ? `Workshop • ${cartItem.item.category}` 
                              : cartItem.item.category}
                          </p>
                        </div>
                        <button
                          onClick={() => onRemoveItem(cartItem.item.id)}
                          className="p-2 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-rose-600" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {cartItem.item.type === 'thrift' ? (
                            <>
                              <button
                                onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                              >
                                <Minus className="w-4 h-4 text-slate-600" />
                              </button>
                              <span className="text-sm font-medium text-slate-900 w-8 text-center">
                                {cartItem.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                              >
                                <Plus className="w-4 h-4 text-slate-600" />
                              </button>
                            </>
                          ) : (
                            <span className="text-sm text-slate-600">Qty: 1</span>
                          )}
                        </div>

                        <p className="font-semibold text-slate-900">
                          ${cartItem.item.price * cartItem.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
                <h3 className="font-semibold text-slate-900">Order Summary</h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="font-medium text-slate-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Tax (8%)</span>
                    <span className="font-medium text-slate-900">${tax.toFixed(2)}</span>
                  </div>
                  <div className="pt-3 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900">Total</span>
                      <span className="text-xl font-bold text-slate-900">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full px-6 py-4 rounded-xl bg-slate-900 text-white font-medium shadow-lg shadow-slate-200 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-200 transition-all flex items-center justify-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Proceed to Checkout
                </button>

                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Store className="w-4 h-4" />
                    <span>Secure checkout within your organization</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
