import { useState } from 'react';
import { Shield, AlertTriangle, Check, X, Eye } from 'lucide-react';
import { Navigation } from './Navigation';
import api from '../api';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { Button } from './Button';
import type { User, Item } from '../App';

type AdminPanelProps = {
  currentUser: User;
  onNavigate: (screen: any) => void;
  items: Item[];
};

type FlaggedItem = {
  id: string;
  item: Item;
  reportedBy: User;
  reason: string;
  reportedAt: Date;
  status: 'pending' | 'approved' | 'removed';
};

export function AdminPanel({ currentUser, onNavigate, items }: AdminPanelProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'resolved'>('all');
  const [selectedItem, setSelectedItem] = useState<FlaggedItem | null>(null);

  // Mock flagged items
  const [flaggedItems, setFlaggedItems] = useState<FlaggedItem[]>([
    {
      id: 'flag-1',
      item: {
        id: '1',
        title: 'Ergonomic Office Chair',
        description: 'Herman Miller Aeron chair, barely used.',
        category: 'Furniture',
        price: 450,
        isFree: false,
        condition: 'Like New',
        images: ['https://images.unsplash.com/photo-1688578735427-994ecdea3ea4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBjaGFpcnxlbnwxfHx8fDE3NjUxODc5MDF8MA&ixlib=rb-4.1.0&q=80&w=1080'],
        seller: {
          id: '2',
          name: 'Michael Torres',
          email: 'michael.torres@company.com',
          department: 'Design',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        },
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      reportedBy: {
        id: '10',
        name: 'Emily Clark',
        email: 'emily.clark@company.com',
        department: 'Operations',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      },
      reason: 'Misleading information',
      reportedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      status: 'pending',
    },
    {
      id: 'flag-2',
      item: {
        id: '2',
        title: 'Vintage Film Camera',
        description: 'Canon AE-1 with 50mm lens.',
        category: 'Electronics',
        price: 180,
        isFree: false,
        condition: 'Good',
        images: ['https://images.unsplash.com/photo-1495121553079-4c61bcce1894?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2FtZXJhfGVufDF8fHx8MTc2NTIyNTcwNHww&ixlib=rb-4.1.0&q=80&w=1080'],
        seller: {
          id: '3',
          name: 'Emma Johnson',
          email: 'emma.johnson@company.com',
          department: 'Marketing',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        },
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      },
      reportedBy: {
        id: '11',
        name: 'Robert Smith',
        email: 'robert.smith@company.com',
        department: 'Sales',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      },
      reason: 'Item already sold',
      reportedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: 'pending',
    },
    {
      id: 'flag-3',
      item: {
        id: '3',
        title: 'Programming Books Bundle',
        description: 'Clean Code and other technical books.',
        category: 'Books',
        price: 45,
        isFree: false,
        condition: 'Good',
        images: ['https://images.unsplash.com/photo-1508060793788-7d5f1c40c4ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMHNoZWxmfGVufDF8fHx8MTc2NTEyODYwNnww&ixlib=rb-4.1.0&q=80&w=1080'],
        seller: {
          id: '6',
          name: 'David Park',
          email: 'david.park@company.com',
          department: 'Engineering',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        },
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      reportedBy: {
        id: '12',
        name: 'Nicole Brown',
        email: 'nicole.brown@company.com',
        department: 'HR',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      },
      reason: 'Inappropriate content',
      reportedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'approved',
    },
  ]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  const handleApprove = (id: string) => {
    setFlaggedItems(
      flaggedItems.map((item) =>
        item.id === id ? { ...item, status: 'approved' as const } : item
      )
    );
    setSelectedItem(null);
  };

  const handleRemove = async (id: string) => {
    const flagged = flaggedItems.find(f => f.id === id);
    if (!flagged) return;
    const listingId = flagged.item.id;
    try {
      await api.deleteListing(listingId);
      setFlaggedItems(
        flaggedItems.map((item) =>
          item.id === id ? { ...item, status: 'removed' as const } : item
        )
      );
      setSelectedItem(null);
    } catch (err: any) {
      // If delete fails, mark as pending still and show an alert
      // In the app you may prefer a toast; using alert for simplicity
      alert(err?.message || 'Failed to delete listing');
    }
  };

  const filteredItems = flaggedItems.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'pending') return item.status === 'pending';
    if (filter === 'resolved') return item.status !== 'pending';
    return true;
  });

  const pendingCount = flaggedItems.filter((item) => item.status === 'pending').length;
  const resolvedCount = flaggedItems.filter((item) => item.status !== 'pending').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        currentUser={currentUser}
        onNavigate={onNavigate}
        activeScreen="admin"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2>Moderation Panel</h2>
              <p className="text-gray-600">Review and manage flagged listings</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Reports</p>
                  <p className="text-3xl">{flaggedItems.length}</p>
                </div>
                <AlertTriangle className="w-10 h-10 text-orange-500" />
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending Review</p>
                  <p className="text-3xl">{pendingCount}</p>
                </div>
                <AlertTriangle className="w-10 h-10 text-yellow-500" />
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Resolved</p>
                  <p className="text-3xl">{resolvedCount}</p>
                </div>
                <Check className="w-10 h-10 text-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl transition-all ${
                filter === 'all'
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All ({flaggedItems.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-xl transition-all ${
                filter === 'pending'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => setFilter('resolved')}
              className={`px-4 py-2 rounded-xl transition-all ${
                filter === 'resolved'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Resolved ({resolvedCount})
            </button>
          </div>
        </div>

        {/* Flagged Items List */}
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="mb-2">No items to review</h3>
              <p className="text-gray-600">All reports have been processed</p>
            </div>
          ) : (
            <>
              {filteredItems.map((flaggedItem) => (
                <div
                  key={flaggedItem.id}
                  className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex gap-6">
                    <img
                      src={flaggedItem.item.images[0]}
                      alt={flaggedItem.item.title}
                      className="w-32 h-32 rounded-xl object-cover"
                    />

                    <div className="flex-1 space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h4>{flaggedItem.item.title}</h4>
                            {flaggedItem.status === 'pending' && (
                              <Badge variant="warning">Pending Review</Badge>
                            )}
                            {flaggedItem.status === 'approved' && (
                              <Badge variant="success">Approved</Badge>
                            )}
                            {flaggedItem.status === 'removed' && (
                              <Badge variant="error">Removed</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="gray">{flaggedItem.item.category}</Badge>
                            <span className="text-sm text-gray-500">
                              ${flaggedItem.item.price}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Report Details */}
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm mb-1">
                              <strong>Reason:</strong> {flaggedItem.reason}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span>Reported by</span>
                              <Avatar
                                src={flaggedItem.reportedBy.avatar}
                                name={flaggedItem.reportedBy.name}
                                size="sm"
                              />
                              <span>{flaggedItem.reportedBy.name}</span>
                              <span>•</span>
                              <span>{formatDate(flaggedItem.reportedAt)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Seller Info */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Seller:</span>
                        <Avatar
                          src={flaggedItem.item.seller.avatar}
                          name={flaggedItem.item.seller.name}
                          size="sm"
                        />
                        <span className="text-sm">{flaggedItem.item.seller.name}</span>
                        <span className="text-sm text-gray-500">
                          ({flaggedItem.item.seller.department})
                        </span>
                      </div>

                      {/* Actions */}
                      {flaggedItem.status === 'pending' && (
                        <div className="flex gap-3 pt-2">
                          <Button
                            onClick={() => setSelectedItem(flaggedItem)}
                            variant="secondary"
                            size="sm"
                            icon={<Eye className="w-4 h-4" />}
                          >
                            View Details
                          </Button>
                          <Button
                            onClick={() => handleApprove(flaggedItem.id)}
                            variant="primary"
                            size="sm"
                            icon={<Check className="w-4 h-4" />}
                          >
                            Approve Listing
                          </Button>
                          <Button
                            onClick={() => handleRemove(flaggedItem.id)}
                            variant="danger"
                            size="sm"
                            icon={<X className="w-4 h-4" />}
                          >
                            Remove Listing
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                <h3>Review Listing</h3>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Item Image */}
              <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden">
                <img
                  src={selectedItem.item.images[0]}
                  alt={selectedItem.item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Item Details */}
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2">{selectedItem.item.title}</h4>
                  <div className="flex gap-2">
                    <Badge variant="primary">{selectedItem.item.category}</Badge>
                    <Badge variant="gray">{selectedItem.item.condition}</Badge>
                  </div>
                </div>

                <div>
                  <h5 className="mb-2">Description</h5>
                  <p className="text-gray-700">{selectedItem.item.description}</p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <h5 className="mb-2 text-red-700">Report Details</h5>
                  <p className="text-sm mb-2">
                    <strong>Reason:</strong> {selectedItem.reason}
                  </p>
                  <p className="text-sm">
                    <strong>Reported by:</strong> {selectedItem.reportedBy.name} (
                    {selectedItem.reportedBy.department})
                  </p>
                  <p className="text-sm">
                    <strong>Date:</strong> {formatDate(selectedItem.reportedAt)}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button
                  onClick={() => handleApprove(selectedItem.id)}
                  variant="primary"
                  fullWidth
                  icon={<Check className="w-5 h-5" />}
                >
                  Approve Listing
                </Button>
                <Button
                  onClick={() => handleRemove(selectedItem.id)}
                  variant="danger"
                  fullWidth
                  icon={<X className="w-5 h-5" />}
                >
                  Remove Listing
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
