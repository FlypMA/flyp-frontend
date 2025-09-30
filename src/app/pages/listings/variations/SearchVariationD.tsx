/**
 * 🎯 Search Variation D - Airbnb-Style Large Images
 *
 * STRATEGY:
 * - Large, prominent images with minimal text overlay
 * - Clean, spacious layout with focus on visual appeal
 * - Airbnb-inspired design with subtle animations
 * - Focus: "Visual storytelling and emotional connection"
 *
 * INSPIRATION:
 * - Airbnb: Large images, minimal text, clean layout
 * - Instagram: Visual-first, emotional connection
 * - Modern marketplaces: Spacious, premium feel
 */

import { Button } from '@/shared/components/buttons';
import SaveSearchModal from '@/shared/components/buyer/SaveSearchModal';
import { SearchComponent } from '@/shared/components/filters';
import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { seoData } from '@/shared/utils/seo/seoData';
import { Pagination, Select, SelectItem } from '@heroui/react';
import { Bell, Filter, Heart, MapPin, MessageSquare, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface Listing {
  id: string;
  title: string;
  sector: string;
  country: string;
  region?: string;
  asking_price?: number;
  currency: string;
  summary: string;
  views: number;
  inquiries: number;
  published_at: string;
  featured: boolean;
  anonymous: boolean;
  requires_nda: boolean;
  years_in_business?: number;
  business_age?: number;
  revenue_range?: string | { min?: number; max?: number };
  ebitda_range?: string | { min?: number; max?: number };
  highlights?: string[];
  images?: {
    id: string;
    storage_url: string;
    thumbnail_url: string;
    is_primary: boolean;
    alt_text?: string;
  }[];
}

const SearchVariationD = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [listings, setListings] = useState<Listing[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showSaveSearchModal, setShowSaveSearchModal] = useState(false);

  // Search filters state
  const [filters, setFilters] = useState({
    searchQuery: searchParams.get('q') || '',
    sector: searchParams.get('sector') || '',
    country: searchParams.get('country') || '',
    priceRange: [
      parseInt(searchParams.get('priceMin') || '0'),
      parseInt(searchParams.get('priceMax') || '10000000'),
    ] as [number, number],
    revenueRange: [0, 50000000] as [number, number],
    anonymous: searchParams.get('anonymous') || '',
    requiresNda: searchParams.get('requiresNda') || '',
    sortBy: 'published_at',
  });

  useEffect(() => {
    loadListings();
  }, [searchParams, currentPage]);

  const loadListings = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const mockListings: Listing[] = [
        {
          id: '1',
          title: 'Premium Restaurant Chain - Brussels',
          sector: 'Food & Beverage',
          country: 'BE',
          region: 'Brussels',
          asking_price: 2500000,
          currency: 'EUR',
          summary:
            'Established restaurant chain with 3 locations in prime Brussels areas. Strong customer base, excellent reputation, and significant growth potential in the Belgian market.',
          images: [
            {
              id: '1',
              storage_url:
                'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
              thumbnail_url:
                'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
              is_primary: true,
              alt_text: 'Restaurant interior',
            },
          ],
          views: 1247,
          inquiries: 23,
          published_at: '2024-01-15T10:00:00Z',
          featured: true,
          anonymous: false,
          requires_nda: true,
          years_in_business: 8,
          revenue_range: { min: 1200000, max: 1500000 },
          ebitda_range: { min: 300000, max: 400000 },
          highlights: ['Prime locations', 'Strong brand', 'Growth potential'],
        },
        {
          id: '2',
          title: 'Tech Startup - SaaS Platform',
          sector: 'Technology',
          country: 'NL',
          region: 'Amsterdam',
          asking_price: 1800000,
          currency: 'EUR',
          summary:
            'Profitable SaaS platform with 500+ enterprise clients. Recurring revenue model, strong growth trajectory, and experienced team.',
          images: [
            {
              id: '2',
              storage_url:
                'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
              thumbnail_url:
                'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
              is_primary: true,
              alt_text: 'Office workspace',
            },
          ],
          views: 892,
          inquiries: 15,
          published_at: '2024-01-12T14:30:00Z',
          featured: false,
          anonymous: true,
          requires_nda: true,
          years_in_business: 5,
          revenue_range: { min: 800000, max: 1000000 },
          ebitda_range: { min: 200000, max: 300000 },
          highlights: ['SaaS model', 'Enterprise clients', 'Recurring revenue'],
        },
        {
          id: '3',
          title: 'Manufacturing Company - Automotive Parts',
          sector: 'Manufacturing',
          country: 'DE',
          region: 'Munich',
          asking_price: 4200000,
          currency: 'EUR',
          summary:
            'Established automotive parts manufacturer with long-term contracts with major car brands. Modern facilities and skilled workforce.',
          images: [
            {
              id: '3',
              storage_url:
                'https://images.unsplash.com/photo-1565043589221-1a6fd9a9b518?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
              thumbnail_url:
                'https://images.unsplash.com/photo-1565043589221-1a6fd9a9b518?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
              is_primary: true,
              alt_text: 'Manufacturing facility',
            },
          ],
          views: 1567,
          inquiries: 31,
          published_at: '2024-01-10T09:15:00Z',
          featured: true,
          anonymous: false,
          requires_nda: false,
          years_in_business: 15,
          revenue_range: { min: 5000000, max: 6000000 },
          ebitda_range: { min: 800000, max: 1000000 },
          highlights: ['Long-term contracts', 'Modern facilities', 'Skilled workforce'],
        },
        {
          id: '4',
          title: 'Beauty Salon Chain - Paris',
          sector: 'Beauty & Wellness',
          country: 'FR',
          region: 'Paris',
          asking_price: 850000,
          currency: 'EUR',
          summary:
            'Premium beauty salon chain with 5 locations in Paris. High-end clientele, experienced staff, and strong brand recognition.',
          images: [
            {
              id: '4',
              storage_url:
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
              thumbnail_url:
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
              is_primary: true,
              alt_text: 'Beauty salon',
            },
          ],
          views: 634,
          inquiries: 12,
          published_at: '2024-01-08T16:45:00Z',
          featured: false,
          anonymous: false,
          requires_nda: false,
          years_in_business: 6,
          revenue_range: { min: 400000, max: 500000 },
          ebitda_range: { min: 120000, max: 150000 },
          highlights: ['Premium clientele', 'Multiple locations', 'Strong brand'],
        },
        {
          id: '5',
          title: 'E-commerce Fashion Brand',
          sector: 'E-commerce',
          country: 'IT',
          region: 'Milan',
          asking_price: 1200000,
          currency: 'EUR',
          summary:
            'Online fashion brand with strong social media presence and international shipping. Growing customer base and seasonal collections.',
          images: [
            {
              id: '5',
              storage_url:
                'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
              thumbnail_url:
                'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
              is_primary: true,
              alt_text: 'Fashion store',
            },
          ],
          views: 789,
          inquiries: 18,
          published_at: '2024-01-05T11:20:00Z',
          featured: true,
          anonymous: true,
          requires_nda: true,
          years_in_business: 4,
          revenue_range: { min: 600000, max: 800000 },
          ebitda_range: { min: 150000, max: 200000 },
          highlights: ['Online presence', 'International shipping', 'Growing brand'],
        },
        {
          id: '6',
          title: 'Healthcare Clinic - Barcelona',
          sector: 'Healthcare',
          country: 'ES',
          region: 'Barcelona',
          asking_price: 1950000,
          currency: 'EUR',
          summary:
            'Modern healthcare clinic specializing in preventive medicine. State-of-the-art equipment and experienced medical team.',
          images: [
            {
              id: '6',
              storage_url:
                'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
              thumbnail_url:
                'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
              is_primary: true,
              alt_text: 'Healthcare clinic',
            },
          ],
          views: 923,
          inquiries: 21,
          published_at: '2024-01-03T13:10:00Z',
          featured: false,
          anonymous: false,
          requires_nda: true,
          years_in_business: 10,
          revenue_range: { min: 900000, max: 1100000 },
          ebitda_range: { min: 250000, max: 300000 },
          highlights: ['Modern equipment', 'Experienced team', 'Preventive focus'],
        },
      ];

      setListings(mockListings);
      setTotalResults(mockListings.length);
    } catch (error) {
      console.error('Error loading listings:', error);
    }
  };

  const formatPrice = (price?: number, currency = 'EUR') => {
    if (!price) return 'Price on request';
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (filters.searchQuery) params.set('q', filters.searchQuery);
    if (filters.sector) params.set('sector', filters.sector);
    if (filters.country) params.set('country', filters.country);
    if (filters.priceRange[0] > 0) params.set('priceMin', filters.priceRange[0].toString());
    if (filters.priceRange[1] < 10000000) params.set('priceMax', filters.priceRange[1].toString());

    setSearchParams(params);
    setCurrentPage(1);
  };

  const handleFilterChange = (key: string, value: unknown) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getCurrentSearchCriteria = () => ({
    searchQuery: filters.searchQuery,
    sector: filters.sector,
    country: filters.country,
    priceRange: filters.priceRange,
  });

  const handleSaveSearch = async (searchData: unknown) => {
    try {
      // TODO: Replace with actual API call
      console.log('Saving search:', searchData);
    } catch (error) {
      console.error('Error saving search:', error);
    }
  };

  return (
    <>
      <SEOHead
        {...seoData.search}
        title="Explore Businesses | Upswitch - Visual Discovery"
        description="Discover businesses for sale through beautiful imagery and clean design. Find your perfect opportunity today."
      />

      <div className="min-h-screen bg-white">
        {/* Hero Search Section */}
        <section className="py-20 bg-gradient-to-br from-neutral-50 to-white">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">
                Find Your Next
                <span className="block bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                  Business Adventure
                </span>
              </h1>
              <p className="text-xl text-neutral-600 mb-12 max-w-2xl mx-auto">
                Discover unique businesses for sale across Europe. Each opportunity tells a story.
              </p>

              {/* Search Bar */}
              <div className="max-w-3xl mx-auto mb-12">
                <SearchComponent
                  value={filters.searchQuery}
                  onChange={value => handleFilterChange('searchQuery', value)}
                  onSearch={handleSearch}
                  placeholder="Search by location, industry, or keywords..."
                  size="large"
                  buttonText="Search"
                />
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-4xl font-bold text-neutral-900">2,400+</div>
                  <div className="text-neutral-600 text-sm">Unique Businesses</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-neutral-900">15</div>
                  <div className="text-neutral-600 text-sm">European Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-neutral-900">€180M+</div>
                  <div className="text-neutral-600 text-sm">Total Value</div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Filters & Results */}
        <section className="py-8">
          <Container>
            <div className="max-w-7xl mx-auto">
              {/* Filter Bar */}
              <div className="flex flex-col lg:flex-row gap-6 mb-12">
                {/* Left: Filters */}
                <div className="flex-1">
                  <div className="flex flex-wrap gap-4">
                    <Button
                      variant="secondary"
                      size="md"
                      onPress={() => setShowFilters(!showFilters)}
                      startContent={<Filter className="w-4 h-4" />}
                      className="bg-white border-2 border-neutral-200 hover:border-primary-300"
                    >
                      Filters
                    </Button>

                    <Select
                      size="sm"
                      placeholder="Industry"
                      selectedKeys={filters.sector ? [filters.sector] : []}
                      onSelectionChange={keys => {
                        const selected = Array.from(keys)[0] as string;
                        handleFilterChange('sector', selected || '');
                      }}
                      className="w-40"
                    >
                      <SelectItem key="food">Food & Beverage</SelectItem>
                      <SelectItem key="tech">Technology</SelectItem>
                      <SelectItem key="manufacturing">Manufacturing</SelectItem>
                      <SelectItem key="beauty">Beauty & Wellness</SelectItem>
                      <SelectItem key="ecommerce">E-commerce</SelectItem>
                      <SelectItem key="healthcare">Healthcare</SelectItem>
                    </Select>

                    <Select
                      size="sm"
                      placeholder="Country"
                      selectedKeys={filters.country ? [filters.country] : []}
                      onSelectionChange={keys => {
                        const selected = Array.from(keys)[0] as string;
                        handleFilterChange('country', selected || '');
                      }}
                      className="w-32"
                    >
                      <SelectItem key="BE">Belgium</SelectItem>
                      <SelectItem key="NL">Netherlands</SelectItem>
                      <SelectItem key="DE">Germany</SelectItem>
                      <SelectItem key="FR">France</SelectItem>
                      <SelectItem key="IT">Italy</SelectItem>
                      <SelectItem key="ES">Spain</SelectItem>
                    </Select>
                  </div>
                </div>

                {/* Right: Sort & Actions */}
                <div className="flex items-center gap-4">
                  <Select
                    size="sm"
                    placeholder="Sort by"
                    selectedKeys={[filters.sortBy]}
                    onSelectionChange={keys => {
                      const selected = Array.from(keys)[0] as string;
                      handleFilterChange('sortBy', selected);
                    }}
                    className="w-40"
                  >
                    <SelectItem key="published_at">Newest First</SelectItem>
                    <SelectItem key="price_asc">Price: Low to High</SelectItem>
                    <SelectItem key="price_desc">Price: High to Low</SelectItem>
                    <SelectItem key="views">Most Popular</SelectItem>
                  </Select>

                  <Button
                    variant="secondary"
                    size="md"
                    onPress={() => setShowSaveSearchModal(true)}
                    startContent={<Bell className="w-4 h-4" />}
                    className="bg-white border-2 border-neutral-200 hover:border-primary-300"
                  >
                    Save Search
                  </Button>
                </div>
              </div>

              {/* Results Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-neutral-900">{totalResults} Businesses</h2>
                  <p className="text-neutral-600">
                    {filters.searchQuery && `Results for "${filters.searchQuery}"`}
                  </p>
                </div>
              </div>

              {/* Airbnb-Style Grid - Large Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {listings.map(listing => (
                  <div
                    key={listing.id}
                    className="group cursor-pointer"
                    onClick={() => navigate(`/listings/${listing.id}`)}
                  >
                    {/* Large Image Card */}
                    <div className="relative overflow-hidden rounded-2xl mb-4">
                      {/* Main Image */}
                      <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                        {listing.images?.[0] ? (
                          <img
                            src={listing.images[0].storage_url}
                            alt={listing.images[0].alt_text || listing.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
                            <div className="text-6xl text-neutral-400">🏢</div>
                          </div>
                        )}
                      </div>

                      {/* Save Button - Top Right */}
                      <button
                        type="button"
                        className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
                        onClick={e => {
                          e.stopPropagation();
                          // Handle save
                        }}
                      >
                        <Heart className="w-5 h-5 text-neutral-700" />
                      </button>

                      {/* Featured Badge - Top Left */}
                      {listing.featured && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-amber-500 text-white text-sm font-semibold rounded-full shadow-lg">
                            ⭐ Featured
                          </span>
                        </div>
                      )}

                      {/* NDA Badge - Top Left (if featured) or Top Right */}
                      {listing.requires_nda && (
                        <div
                          className={`absolute ${listing.featured ? 'top-12 left-4' : 'top-4 left-4'}`}
                        >
                          <span className="px-3 py-1 bg-primary-600 text-white text-sm font-semibold rounded-full shadow-lg">
                            🔒 NDA Required
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content Below Image */}
                    <div className="space-y-2">
                      {/* Title & Location */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-neutral-900 mb-1 line-clamp-2">
                            {listing.title}
                          </h3>
                          <div className="flex items-center gap-1 text-neutral-600 text-sm">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">
                              {listing.region}, {listing.country}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-xl font-bold text-neutral-900">
                        {formatPrice(listing.asking_price, listing.currency)}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-sm text-neutral-500">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          {listing.views} views
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {listing.inquiries} inquiries
                        </span>
                        <span>{listing.years_in_business} years</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalResults > 0 && (
                <div className="flex justify-center">
                  <Pagination
                    total={Math.ceil(totalResults / 9)}
                    page={currentPage}
                    onChange={setCurrentPage}
                    showControls
                    showShadow
                  />
                </div>
              )}
            </div>
          </Container>
        </section>

        {/* Save Search Modal */}
        {showSaveSearchModal && (
          <SaveSearchModal
            isOpen={showSaveSearchModal}
            onClose={() => setShowSaveSearchModal(false)}
            onSave={handleSaveSearch}
            mode="create"
          />
        )}
      </div>
    </>
  );
};

export default SearchVariationD;
