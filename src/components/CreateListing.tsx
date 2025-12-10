import { useState } from 'react';
import { Upload, X, Eye, ArrowLeft } from 'lucide-react';
import { Navigation } from './Navigation';
import { Input } from './Input';
import { Button } from './Button';
import { Badge } from './Badge';
import type { User, Item } from '../App';

type CreateListingProps = {
  currentUser: User;
  onNavigate: (screen: any) => void;
  onCreateListing: (listing: Partial<Item>) => void;
};

export function CreateListing({ currentUser, onNavigate, onCreateListing }: CreateListingProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [price, setPrice] = useState('');
  const [isFree, setIsFree] = useState(false);
  const [condition, setCondition] = useState('Good');
  const [images, setImages] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const categories = ['Electronics', 'Furniture', 'Accessories', 'Home & Garden', 'Books', 'Clothing', 'Sports', 'Other'];
  const conditions = ['Brand New', 'Like New', 'Good', 'Fair', 'For Parts'];

  const handleImageUpload = () => {
    // Simulate image upload - in real app, this would handle file selection
    const sampleImages = [
      'https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjUyMjA0OTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ];
    setImages([...images, ...sampleImages]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!title || !description || (!isFree && !price)) {
      return;
    }

    const listing: Partial<Item> = {
      title,
      description,
      category,
      price: isFree ? 0 : parseFloat(price),
      isFree,
      condition,
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjUyMjA0OTB8MA&ixlib=rb-4.1.0&q=80&w=1080'],
    };

    onCreateListing(listing);
  };

  const previewItem = {
    id: 'preview',
    title: title || 'Your Item Title',
    description: description || 'Your item description will appear here...',
    category,
    price: parseFloat(price) || 0,
    isFree,
    condition,
    images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjUyMjA0OTB8MA&ixlib=rb-4.1.0&q=80&w=1080'],
    seller: currentUser,
    createdAt: new Date(),
  } as Item;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        currentUser={currentUser}
        onNavigate={onNavigate}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Button
            onClick={() => onNavigate('marketplace')}
            variant="ghost"
            icon={<ArrowLeft className="w-5 h-5" />}
          >
            Back
          </Button>
          <div>
            <h2>Create New Listing</h2>
            <p className="text-gray-600">Share items with your colleagues</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
              <div>
                <h4 className="mb-4">Basic Information</h4>
                
                <div className="space-y-4">
                  <Input
                    label="Title"
                    placeholder="e.g. MacBook Pro 2021, Office Chair, etc."
                    value={title}
                    onChange={setTitle}
                  />

                  <Input
                    label="Description"
                    placeholder="Provide details about the item, condition, reason for selling..."
                    value={description}
                    onChange={setDescription}
                    multiline
                    rows={4}
                  />

                  <div>
                    <label className="block mb-2 text-gray-700">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-gray-700">
                      Condition
                    </label>
                    <select
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                    >
                      {conditions.map((cond) => (
                        <option key={cond} value={cond}>
                          {cond}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
              <h4>Pricing</h4>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <input
                  type="checkbox"
                  id="free-toggle"
                  checked={isFree}
                  onChange={(e) => setIsFree(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <label htmlFor="free-toggle" className="cursor-pointer">
                  This item is free
                </label>
              </div>

              {!isFree && (
                <Input
                  label="Price (USD)"
                  placeholder="0.00"
                  value={price}
                  onChange={setPrice}
                  type="number"
                />
              )}

              <div className="bg-gradient-to-r from-teal-50 to-violet-50 rounded-xl p-4">
                <p className="text-sm text-gray-700">
                  💡 Tip: Free items tend to get more interest and help build community goodwill!
                </p>
              </div>
            </div>

            {/* Images */}
            <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
              <h4>Photos</h4>

              <div className="space-y-4">
                {images.length > 0 && (
                  <div className="grid grid-cols-3 gap-3">
                    {images.map((img, index) => (
                      <div key={index} className="relative aspect-square rounded-xl overflow-hidden group">
                        <img src={img} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={handleImageUpload}
                  className="w-full border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-teal-500 hover:bg-teal-50 transition-all text-center"
                >
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Click to upload images</p>
                  <p className="text-sm text-gray-500 mt-1">Or drag and drop</p>
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h4>Preview</h4>
                <Button
                  onClick={() => setShowPreview(!showPreview)}
                  variant="ghost"
                  size="sm"
                  icon={<Eye className="w-4 h-4" />}
                >
                  {showPreview ? 'Hide' : 'Show'}
                </Button>
              </div>

              {showPreview && (
                <div className="space-y-4">
                  {/* Preview Card */}
                  <div className="border-2 border-gray-200 rounded-2xl overflow-hidden">
                    <div className="aspect-[4/3] bg-gray-100">
                      <img
                        src={previewItem.images[0]}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <h5 className="mb-1">{previewItem.title}</h5>
                        <Badge variant="gray" size="sm">{previewItem.category}</Badge>
                      </div>
                      {previewItem.isFree ? (
                        <p className="text-2xl text-green-600">FREE</p>
                      ) : (
                        <p className="text-2xl text-gray-900">
                          ${previewItem.price.toFixed(2)}
                        </p>
                      )}
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {previewItem.description}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-teal-50 to-violet-50 rounded-xl p-4">
                    <p className="text-sm text-gray-700">
                      This is how your listing will appear to others
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-6 space-y-3">
                <Button
                  onClick={handleSubmit}
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={!title || !description || (!isFree && !price)}
                >
                  Publish Listing
                </Button>
                <Button
                  onClick={() => onNavigate('marketplace')}
                  variant="ghost"
                  size="lg"
                  fullWidth
                >
                  Cancel
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  By publishing, you agree to our community guidelines. Items will auto-expire after 30 days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
