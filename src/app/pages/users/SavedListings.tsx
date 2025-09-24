// 💾 Saved Listings Page - MVP Version
// Location: src/app/pages/users/SavedListings.tsx
// Purpose: Display user's saved business listings with management capabilities

import { useAuth } from '@/app/providers/auth-provider';
import {
  Building2,
  Calendar,
  Euro,
  Eye,
  Filter,
  Heart,
  MapPin,
  MessageSquare,
  Search,
  Users,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from '../../../shared/components/buttons';
import { Card } from '../../../shared/components/cards';
import { CustomInputField } from '../../../shared/components/forms';

interface SavedListing {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  industry: string;
  employees: number;
  revenue: number;
  established: number;
  imageUrl?: string;
  savedAt: string;
  views: number;
  inquiries: number;
}

const SavedListings: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [savedListings, setSavedListings] = useState<SavedListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('');
  const [sortBy, setSortBy] = useState<'savedAt' | 'price' | 'title'>('savedAt');

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockSavedListings: SavedListing[] = [
      {
        id: '1',
        title: 'Thriving Coffee Shop in City Center',
        description:
          'Well-established coffee shop with loyal customer base and prime location. Perfect for entrepreneurs looking to enter the food service industry.',
        price: 125000,
        location: 'Amsterdam, Netherlands',
        industry: 'Food & Beverage',
        employees: 8,
        revenue: 180000,
        established: 2018,
        imageUrl: '/images/coffee-shop.jpg',
        savedAt: '2024-01-15',
        views: 45,
        inquiries: 3,
      },
      {
        id: '2',
        title: 'Digital Marketing Agency',
        description:
          'Growing digital marketing agency with established client base and strong recurring revenue. Great opportunity for experienced marketers.',
        price: 250000,
        location: 'Rotterdam, Netherlands',
        industry: 'Marketing & Advertising',
        employees: 12,
        revenue: 320000,
        established: 2020,
        imageUrl: '/images/marketing-agency.jpg',
        savedAt: '2024-01-10',
        views: 78,
        inquiries: 5,
      },
      {
        id: '3',
        title: 'Boutique Fitness Studio',
        description:
          'Modern fitness studio with premium equipment and dedicated clientele. Ideal for fitness enthusiasts or business investors.',
        price: 180000,
        location: 'Utrecht, Netherlands',
        industry: 'Health & Fitness',
        employees: 6,
        revenue: 220000,
        established: 2019,
        imageUrl: '/images/fitness-studio.jpg',
        savedAt: '2024-01-08',
        views: 32,
        inquiries: 2,
      },
    ];

    setTimeout(() => {
      setSavedListings(mockSavedListings);
      setLoading(false);
    }, 1000);
  }, []);

  const handleRemoveSaved = (listingId: string) => {
    setSavedListings(prev => prev.filter(listing => listing.id !== listingId));
  };

  const handleViewListing = (listingId: string) => {
    // Navigate to listing details
    window.location.href = `/listings/${listingId}`;
  };

  const handleSendInquiry = (listingId: string) => {
    // Open inquiry modal or navigate to inquiry form
  };

  const filteredListings = savedListings.filter(listing => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = !filterIndustry || listing.industry === filterIndustry;
    return matchesSearch && matchesIndustry;
  });

  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return b.price - a.price;
      case 'title':
        return a.title.localeCompare(b.title);
      case 'savedAt':
      default:
        return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
    }
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-NL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h1>
          <p className="text-gray-600 mb-6">Please log in to view your saved listings.</p>
          <Button variant="primary" onClick={() => (window.location.href = '/login')}>
            Log In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Saved Listings</h1>
          </div>
          <p className="text-gray-600">
            Manage your saved business listings and track your favorites.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <CustomInputField
                label="Search saved listings"
                type="text"
                placeholder="Search saved listings..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onBlur={() => {}}
                name="search"
                className="pl-10"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={filterIndustry}
                onChange={e => setFilterIndustry(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Industries</option>
                <option value="Food & Beverage">Food & Beverage</option>
                <option value="Marketing & Advertising">Marketing & Advertising</option>
                <option value="Health & Fitness">Health & Fitness</option>
                <option value="Technology">Technology</option>
                <option value="Retail">Retail</option>
                <option value="Services">Services</option>
              </select>
            </div>

            <div>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as 'savedAt' | 'price' | 'title')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="savedAt">Sort by Date Saved</option>
                <option value="price">Sort by Price</option>
                <option value="title">Sort by Title</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            {loading
              ? 'Loading...'
              : `${sortedListings.length} saved listing${sortedListings.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {/* Saved Listings Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse"
              >
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : sortedListings.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Saved Listings</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterIndustry
                ? 'No listings match your current filters.'
                : "Start saving listings you're interested in to see them here."}
            </p>
            <Button variant="primary" onClick={() => (window.location.href = '/search')}>
              Browse Listings
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedListings.map(listing => (
              <Card
                key={listing.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                {/* Listing Image */}
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  {listing.imageUrl ? (
                    <img
                      src={listing.imageUrl}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 text-center">
                      <Building2 className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-sm">No Image</p>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  {/* Title and Price */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {listing.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary-600">
                        {formatPrice(listing.price)}
                      </span>
                      <button
                        onClick={() => handleRemoveSaved(listing.id)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove from saved"
                      >
                        <Heart className="w-5 h-5 fill-current" />
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{listing.description}</p>

                  {/* Key Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-2" />
                      {listing.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-2" />
                      {listing.employees} employees
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Euro className="w-4 h-4 mr-2" />
                      {formatPrice(listing.revenue)} annual revenue
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      Established {listing.established}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {listing.views} views
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      {listing.inquiries} inquiries
                    </div>
                    <div className="text-xs text-gray-400">Saved {formatDate(listing.savedAt)}</div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      variant="tertiary"
                      size="sm"
                      onClick={() => handleViewListing(listing.id)}
                      className="flex-1"
                    >
                      View Details
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleSendInquiry(listing.id)}
                      className="flex-1"
                    >
                      Send Inquiry
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedListings;
