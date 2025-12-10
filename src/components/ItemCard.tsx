import { Heart, MapPin, Clock } from 'lucide-react';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { Button } from './Button';
import type { Item } from '../App';

type ItemCardProps = {
  item: Item;
  onViewItem: (item: Item) => void;
  onToggleWishlist?: (itemId: string) => void;
};

export function ItemCard({ item, onViewItem, onToggleWishlist }: ItemCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Wishlist Button */}
        {onToggleWishlist && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(item.id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${
              item.isWishlisted
                ? 'bg-red-500 text-white'
                : 'bg-white/90 text-gray-600 hover:bg-white'
            }`}
          >
            <Heart
              className={`w-4 h-4 ${item.isWishlisted ? 'fill-current' : ''}`}
            />
          </button>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {item.isFree && (
            <Badge variant="success">FREE</Badge>
          )}
          {item.expiresIn && (
            <Badge variant="warning">
              <Clock className="w-3 h-3 inline mr-1" />
              {item.expiresIn}d left
            </Badge>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Title & Category */}
        <div>
          <h4 className="line-clamp-1 mb-1">{item.title}</h4>
          <Badge variant="gray" size="sm">{item.category}</Badge>
        </div>

        {/* Price */}
        <div>
          {item.isFree ? (
            <p className="text-2xl text-green-600">FREE</p>
          ) : (
            <p className="text-2xl text-gray-900">{formatPrice(item.price)}</p>
          )}
        </div>

        {/* Seller Info */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <Avatar src={item.seller.avatar} name={item.seller.name} size="sm" />
            <div>
              <p className="text-sm">{item.seller.name}</p>
              <p className="text-xs text-gray-500">{getTimeAgo(item.createdAt)}</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
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
  );
}
