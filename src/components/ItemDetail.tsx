import { useState } from 'react';
import { Heart, MessageSquare, Flag, ArrowLeft, ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react';
import { Navigation } from './Navigation';
import api from '../api';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { Button } from './Button';
import { ItemCard } from './ItemCard';
import type { User, Item } from '../App';

type ItemDetailProps = {
  item: Item;
  currentUser: User;
  onNavigate: (screen: any) => void;
  onToggleWishlist: (itemId: string) => void;
  showToast: (message: string, type: 'success' | 'error') => void;
};

export function ItemDetail({ item, currentUser, onNavigate, onToggleWishlist, showToast }: ItemDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showReportModal, setShowReportModal] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
  };

  const handleContactSeller = () => {
    showToast('Opening chat with seller...', 'success');
    setTimeout(() => onNavigate('messages'), 1000);
  };

  const handleWishlist = () => {
    onToggleWishlist(item.id);
    showToast(
      item.isWishlisted ? 'Removed from wishlist' : 'Added to wishlist',
      'success'
    );
  };

  // Mock similar items
  const similarItems: Item[] = [
    {
      id: 'similar-1',
      title: 'Wireless Keyboard',
      description: 'Mechanical keyboard',
      category: item.category,
      price: 75,
      isFree: false,
      condition: 'Good',
      images: ['https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjUyMjA0OTB8MA&ixlib=rb-4.1.0&q=80&w=1080'],
      seller: {
        id: 'seller-1',
        name: 'Alex Morgan',
        email: 'alex@company.com',
        department: 'Engineering',
        avatar: '',
      },
      createdAt: new Date(),
    },
    {
      id: 'similar-2',
      title: 'USB-C Hub',
      description: '7-in-1 hub',
      category: item.category,
      price: 0,
      isFree: true,
      condition: 'Like New',
      images: ['https://images.unsplash.com/photo-1623679072629-3aaa0192a391?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBkZXNrfGVufDF8fHx8MTc2NTEzMzMyOXww&ixlib=rb-4.1.0&q=80&w=1080'],
      seller: {
        id: 'seller-2',
        name: 'Jordan Lee',
        email: 'jordan@company.com',
        department: 'Design',
        avatar: '',
      },
      createdAt: new Date(),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        currentUser={currentUser}
        onNavigate={onNavigate}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            onClick={() => onNavigate('marketplace')}
            variant="ghost"
            icon={<ArrowLeft className="w-5 h-5" />}
          >
            Back to Marketplace
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="relative aspect-square bg-gray-100">
                <img
                  src={item.images[currentImageIndex]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

                {item.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {item.isFree && <Badge variant="success">FREE</Badge>}
                  {item.expiresIn && (
                    <Badge variant="warning">Expires in {item.expiresIn} days</Badge>
                  )}
                </div>

                {/* Image Counter */}
                {item.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {item.images.length}
                  </div>
                )}
              </div>

              {/* Thumbnail Strip */}
              {item.images.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {item.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? 'border-teal-500'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Title & Price */}
            <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="mb-2">{item.title}</h2>
                  <div className="flex gap-2">
                    <Badge variant="primary">{item.category}</Badge>
                    <Badge variant="gray">{item.condition}</Badge>
                  </div>
                </div>
                <button
                  onClick={handleWishlist}
                  className={`p-3 rounded-full transition-all ${
                    item.isWishlisted
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${item.isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div>
                {item.isFree ? (
                  <div className="flex items-baseline gap-2">
                    <p className="text-4xl text-green-600">FREE</p>
                    <Badge variant="success" size="sm">No charge</Badge>
                  </div>
                ) : (
                  <p className="text-4xl">{formatPrice(item.price)}</p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleContactSeller}
                  variant="primary"
                  size="lg"
                  fullWidth
                  icon={<MessageSquare className="w-5 h-5" />}
                >
                  Contact Seller
                </Button>
                {!item.isFree && !item.sold && (
                  <Button
                    onClick={async () => {
                      try {
                        await api.purchase({ listingId: item.id, buyerId: currentUser.id });
                        showToast('Purchase completed', 'success');
                        setTimeout(() => onNavigate('marketplace'), 800);
                      } catch (err: any) {
                        showToast(err?.message || 'Purchase failed', 'error');
                      }
                    }}
                    variant="secondary"
                    size="lg"
                    fullWidth
                  >
                    Buy Now
                  </Button>
                )}

                {currentUser?.id === item.seller.id && (
                  <Button
                    onClick={async () => {
                      if (!confirm('Delete this listing? This cannot be undone.')) return;
                      try {
                        await api.deleteListing(item.id);
                        showToast('Listing deleted', 'success');
                        setTimeout(() => onNavigate('marketplace'), 600);
                      } catch (err: any) {
                        showToast(err?.message || 'Delete failed', 'error');
                      }
                    }}
                    variant="danger"
                    size="lg"
                  >
                    Delete Listing
                  </Button>
                )}
                <Button
                  onClick={handleWishlist}
                  variant="secondary"
                  size="lg"
                >
                  <Heart className={`w-5 h-5 ${item.isWishlisted ? 'fill-current text-red-500' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Seller Information */}
            <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
              <h4>Seller Information</h4>
              
              <div className="flex items-center gap-4">
                <Avatar src={item.seller.avatar} name={item.seller.name} size="lg" />
                <div className="flex-1">
                  <h5>{item.seller.name}</h5>
                  <p className="text-sm text-gray-600">{item.seller.department}</p>
                  <p className="text-sm text-gray-500">{item.seller.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Listed {formatDate(item.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
              <h4>Description</h4>
              <p className="text-gray-700 whitespace-pre-wrap">{item.description}</p>
            </div>

            {/* Report */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <button
                onClick={() => setShowReportModal(true)}
                className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors"
              >
                <Flag className="w-4 h-4" />
                <span className="text-sm">Report this listing</span>
              </button>
            </div>
          </div>
        </div>

        {/* Similar Items */}
        <div className="mt-16">
          <div className="mb-6">
            <h3>Similar Items</h3>
            <p className="text-gray-600">You might also be interested in these</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarItems.map((similarItem) => (
              <ItemCard
                key={similarItem.id}
                item={similarItem}
                onViewItem={() => {}}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4">
            <h3>Report Listing</h3>
            <p className="text-gray-600">
              Help us maintain a safe marketplace. What{"'"}s wrong with this listing?
            </p>
            <div className="space-y-2">
              {['Inappropriate content', 'Misleading information', 'Scam or fraud', 'Item already sold', 'Other'].map((reason) => (
                <button
                  key={reason}
                  onClick={() => {
                    showToast('Report submitted. Thank you!', 'success');
                    setShowReportModal(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  {reason}
                </button>
              ))}
            </div>
            <Button onClick={() => setShowReportModal(false)} variant="ghost" fullWidth>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
