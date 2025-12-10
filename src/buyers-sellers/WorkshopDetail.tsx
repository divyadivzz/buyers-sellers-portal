import { useState } from 'react';
import { 
  ArrowLeft, Store, ShoppingBag, Heart, Share2, 
  Calendar, MapPin, Users, Clock, Award
} from 'lucide-react';
import type { User, Workshop } from '../BuyersAndSellers';

type WorkshopDetailProps = {
  workshop: Workshop;
  currentUser: User;
  onNavigate: (screen: any) => void;
  onAddToCart: (workshop: Workshop) => void;
  cartCount: number;
};

export function WorkshopDetail({ 
  workshop, 
  currentUser, 
  onNavigate, 
  onAddToCart,
  cartCount 
}: WorkshopDetailProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [localBooked, setLocalBooked] = useState(workshop.bookedSeats || 0);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollError, setEnrollError] = useState('');

  const handleJoinWorkshop = async () => {
    setEnrollError('');
    if ((workshop.maxSeats || 0) - (localBooked || 0) <= 0) {
      setEnrollError('No seats available');
      return;
    }
    setEnrolling(true);
    try {
      const res = await fetch('http://localhost:4000/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workshopId: workshop.id, userId: currentUser.id })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to enroll');
      }
      // update local booked seats
      setLocalBooked(data.bookedSeats || (localBooked + 1));
      // add to cart for checkout
      onAddToCart(workshop);
      setShowBookingModal(true);
    } catch (err) {
      setEnrollError(err instanceof Error ? err.message : 'Enrollment failed');
    } finally {
      setEnrolling(false);
    }
  };

  const seatsLeft = (workshop.maxSeats || 0) - (localBooked || workshop.bookedSeats || 0);
  const fillPercentage = ((localBooked || workshop.bookedSeats || 0) / (workshop.maxSeats || 1)) * 100;

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

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Workshop Image */}
            <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200">
              <img
                src={workshop.images[0]}
                alt={workshop.title}
                className="w-full aspect-video object-cover"
              />
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`} />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm font-medium">
                  Workshop
                </span>
              </div>
            </div>

            {/* Workshop Details */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <span className="inline-block px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-medium mb-4">
                {workshop.category}
              </span>
              <h1 className="text-3xl font-semibold text-slate-900 mb-4">{workshop.title}</h1>
              <p className="text-slate-600 leading-relaxed mb-6">{workshop.description}</p>

              {/* Schedule & Location */}
              <div className="grid sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Date</p>
                    <p className="text-sm font-medium text-slate-900">{workshop.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                    <Clock className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Time</p>
                    <p className="text-sm font-medium text-slate-900">{workshop.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Location</p>
                    <p className="text-sm font-medium text-slate-900">{workshop.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                    <Users className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Seats</p>
                    <p className="text-sm font-medium text-slate-900">{seatsLeft} left</p>
                  </div>
                </div>
              </div>

              {/* What You'll Learn */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">What You&apos;ll Learn</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-slate-600">
                    <Award className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span>Fundamentals and practical hands-on experience</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <Award className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span>Best practices from an expert in the field</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <Award className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span>Interactive Q&A and networking opportunities</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Host Info */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <p className="text-xs text-slate-500 mb-4">Hosted by</p>
              <div className="flex items-center gap-4">
                <img
                  src={workshop.host.avatar}
                  alt={workshop.host.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100"
                />
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">{workshop.host.name}</p>
                  <p className="text-sm text-slate-500">{workshop.host.department}</p>
                  <p className="text-xs text-indigo-600 mt-1">Expert • 15 workshops hosted</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Booking Card (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="mb-6">
                  <p className="text-3xl font-bold text-slate-900 mb-1">
                    ${workshop.price}
                    <span className="text-sm text-slate-400 font-normal">/person</span>
                  </p>
                  <p className="text-sm text-slate-500">One-time payment</p>
                </div>

                {/* Seats Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-600">{workshop.bookedSeats} / {workshop.maxSeats} seats booked</span>
                    <span className={`font-medium ${seatsLeft <= 3 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {seatsLeft} left
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all ${seatsLeft <= 3 ? 'bg-rose-500' : 'bg-indigo-500'}`}
                      style={{ width: `${fillPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <button
                  onClick={handleJoinWorkshop}
                  disabled={seatsLeft === 0 || enrolling}
                  className="w-full px-6 py-4 rounded-xl bg-indigo-600 text-white font-medium shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition-all disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed"
                >
                  {enrolling ? 'Enrolling...' : seatsLeft === 0 ? 'Fully Booked' : 'Join Workshop'}
                </button>
                {enrollError && (
                  <p className="text-sm text-rose-600 mt-2">{enrollError}</p>
                )}

                <button className="w-full mt-3 px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share with Friends
                </button>
              </div>

              {/* Trust Badge */}
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                <p className="text-sm font-medium text-indigo-900 mb-2">100% Satisfaction Guarantee</p>
                <p className="text-xs text-indigo-700 leading-relaxed">
                  If you&apos;re not satisfied, we&apos;ll refund your full payment within 24 hours of the workshop.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Booking Confirmation Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Added to Cart!</h3>
              <p className="text-slate-600">
                Workshop has been added to your cart. Complete checkout to confirm your seat.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-600">Workshop</span>
                <span className="font-medium text-slate-900">{workshop.title}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Price</span>
                <span className="font-semibold text-slate-900">${workshop.price}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => {
                  setShowBookingModal(false);
                  onNavigate('cart');
                }}
                className="flex-1 px-4 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
