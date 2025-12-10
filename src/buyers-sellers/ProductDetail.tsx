import { useState } from 'react';
import { 
  ArrowLeft, Store, ShoppingBag, Heart, Share2, Flag,
  MapPin, Calendar, Package, ShieldCheck
} from 'lucide-react';
import type { User, Product } from '../BuyersAndSellers';

type ProductDetailProps = {
  product: Product;
  currentUser: User;
  onNavigate: (screen: any) => void;
  onAddToCart: (product: Product) => void;
  cartCount: number;
};

export function ProductDetail({ 
  product, 
  currentUser, 
  onNavigate, 
  onAddToCart,
  cartCount 
}: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    setShowContactModal(true);
  };

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
              <span className="site-brand">Buyers&Sellers</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
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

            <img
              src={currentUser.avatar}
              className="w-8 h-8 rounded-full border border-slate-200 object-cover"
              alt={currentUser.name}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.title}
                className="w-full aspect-square object-cover"
              />
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`} />
              </button>
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-slate-900' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img src={img} alt="" className="w-full aspect-square object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 rounded-lg bg-rose-50 text-rose-700 text-xs font-medium mb-3">
                    {product.category}
                  </span>
                  <h1 className="text-3xl font-semibold text-slate-900 mb-2">{product.title}</h1>
                  <p className="text-2xl font-bold text-slate-900">${product.price}</p>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Condition & Details */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                  <Package className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Condition</p>
                  <p className="text-sm font-medium text-slate-900">{product.condition}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Listed</p>
                  <p className="text-sm font-medium text-slate-900">2 days ago</p>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="p-4 bg-white border border-slate-200 rounded-xl">
              <p className="text-xs text-slate-500 mb-3">Sold by</p>
              <div className="flex items-center gap-3">
                <img
                  src={product.seller.avatar}
                  alt={product.seller.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-slate-200"
                />
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{product.seller.name}</p>
                  <p className="text-sm text-slate-500">{product.seller.department}</p>
                </div>
                <button className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition-colors">
                  View Profile
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full px-6 py-4 rounded-xl bg-slate-900 text-white font-medium shadow-lg shadow-slate-200 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-200 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button className="px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button className="px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                  <Flag className="w-4 h-4" />
                  Report
                </button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-emerald-900 mb-1">Safe Transaction Guaranteed</p>
                  <p className="text-sm text-emerald-700 leading-relaxed">
                    All transactions are within your organization. Meet in-person at company premises for added safety.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Items */}
        <section className="mt-16">
          <h3 className="text-xl font-semibold text-slate-900 mb-6">Similar Items</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all">
                <div className="aspect-square bg-slate-100 rounded-t-xl"></div>
                <div className="p-3">
                  <p className="font-medium text-slate-900 text-sm mb-1">Similar Item {i}</p>
                  <p className="text-slate-900 font-semibold">${45 + i * 10}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Added to Cart!</h3>
              <p className="text-slate-600">
                Item has been added to your cart. You can continue shopping or proceed to checkout.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowContactModal(false)}
                className="flex-1 px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => {
                  setShowContactModal(false);
                  onNavigate('cart');
                }}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors"
              >
                View Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
