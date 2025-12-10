import { useState, useRef } from 'react';
import { ArrowLeft, Store, ShoppingBag, Upload, Tag, Presentation, X } from 'lucide-react';
import type { User } from '../BuyersAndSellers';

type CreateListingProps = {
  currentUser: User;
  onNavigate: (screen: any) => void;
  cartCount: number;
};

export function CreateListing({ currentUser, onNavigate, cartCount }: CreateListingProps) {
  const [listingType, setListingType] = useState<'thrift' | 'workshop'>('thrift');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImages(prev => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !price.trim() || !category.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (listingType === 'workshop' && (!date.trim() || !time.trim())) {
      setError('Please set date and time for the workshop');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const images = uploadedImages.length > 0 ? uploadedImages : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'];
      
      const payload = {
        title,
        description,
        price: parseFloat(price),
        category,
        type: listingType,
        images,
        ownerId: currentUser.id,
        ownerName: currentUser.name,
        ...(listingType === 'workshop' && { date, time })
      };

      const response = await fetch('http://localhost:4000/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create listing');
      }
      
      // Success - reset form and navigate
      setTitle('');
      setDescription('');
      setPrice('');
      setCategory('');
      setDate('');
      setTime('');
      setUploadedImages([]);
      onNavigate('marketplace');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create listing');
    } finally {
      setLoading(false);
    }
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
              <h1 className="font-semibold tracking-tight text-slate-800">Create New Listing</h1>
            </div>
          </div>

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
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Listing Type Selection */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => setListingType('thrift')}
            className={`p-6 rounded-2xl border-2 transition-all text-left ${
              listingType === 'thrift'
                ? 'border-rose-300 bg-rose-50'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
              listingType === 'thrift' ? 'bg-rose-100' : 'bg-slate-100'
            }`}>
              <Tag className={`w-6 h-6 ${listingType === 'thrift' ? 'text-rose-600' : 'text-slate-600'}`} />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Thrift Item</h3>
            <p className="text-sm text-slate-600">Sell pre-loved items to colleagues</p>
          </button>

          <button
            onClick={() => setListingType('workshop')}
            className={`p-6 rounded-2xl border-2 transition-all text-left ${
              listingType === 'workshop'
                ? 'border-indigo-300 bg-indigo-50'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
              listingType === 'workshop' ? 'bg-indigo-100' : 'bg-slate-100'
            }`}>
              <Presentation className={`w-6 h-6 ${listingType === 'workshop' ? 'text-indigo-600' : 'text-slate-600'}`} />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Host Workshop</h3>
            <p className="text-sm text-slate-600">Teach skills and share knowledge</p>
          </button>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-6">
          {error && (
            <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              {listingType === 'thrift' ? 'Item Title' : 'Workshop Title'}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a clear, descriptive title"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-slate-200 focus:border-slate-300 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide details about your listing"
              rows={5}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-slate-200 focus:border-slate-300 outline-none transition-all resize-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">Price ($)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-slate-200 focus:border-slate-300 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-slate-200 focus:border-slate-300 outline-none transition-all"
              >
                <option value="">Select category</option>
                {listingType === 'thrift' ? (
                  <>
                    <option value="Fashion">Fashion</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Home Decor">Home Decor</option>
                    <option value="Books">Books</option>
                  </>
                ) : (
                  <>
                    <option value="Photography">Photography</option>
                    <option value="Coding">Coding</option>
                    <option value="Crafts">Crafts</option>
                    <option value="Cooking">Cooking</option>
                  </>
                )}
              </select>
            </div>

            {/* Date and Time for Workshops */}
            {listingType === 'workshop' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-slate-200 focus:border-slate-300 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">Time</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-slate-200 focus:border-slate-300 outline-none transition-all"
                  />
                </div>
              </>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Images</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:border-slate-400 transition-colors cursor-pointer"
            >
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 mb-1">Click to upload or drag and drop</p>
              <p className="text-sm text-slate-400">PNG, JPG up to 10MB</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            
            {/* Image Previews */}
            {uploadedImages.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-medium text-slate-900 mb-3">{uploadedImages.length} image(s) selected</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {uploadedImages.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img 
                        src={img} 
                        alt={`preview-${idx}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => onNavigate('marketplace')}
              disabled={loading}
              className="flex-1 px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 px-6 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Listing'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
