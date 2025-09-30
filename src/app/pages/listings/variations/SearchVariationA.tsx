/**
 * 🎯 Search Variation A - Enhanced Traditional Grid
 *
 * STRATEGY:
 * - Traditional grid layout with enhanced visual design
 * - Improved card styling with better hierarchy
 * - Enhanced search experience with visual feedback
 * - Focus: "Professional marketplace browsing"
 *
 * INSPIRATION:
 * - LinkedIn: Professional, clean, structured
 * - Traditional marketplaces: Familiar patterns
 * - Enhanced visual hierarchy
 */

import { Button } from '@/shared/components/buttons';
import SaveSearchModal from '@/shared/components/buyer/SaveSearchModal';
import { SearchComponent } from '@/shared/components/filters';
import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { seoData } from '@/shared/utils/seo/seoData';
import { Card, CardBody, Pagination, Select, SelectItem } from '@heroui/react';
import { Bell, Building2, Filter, Heart, MapPin, MessageSquare, TrendingUp } from 'lucide-react';
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

const SearchVariationA = () => {
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
                'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop&crop=center&auto=format&q=80',
              thumbnail_url:
                'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
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
                'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop&crop=center&auto=format&q=80',
              thumbnail_url:
                'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
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
                'https://images.unsplash.com/photo-1565043589221-1a6fd9a9b518?w=800&h=500&fit=crop&crop=center&auto=format&q=80',
              thumbnail_url:
                'https://images.unsplash.com/photo-1565043589221-1a6fd9a9b518?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
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

  const handleSaveSearch = async (searchData: unknown) => {
    try {
      // TODO: Replace with actual API call
      console.log('Saving search:', searchData);
    } catch (error) {
      console.error('Error saving search:', error);
    }
  };

  const getCurrentSearchCriteria = () => ({
    searchQuery: filters.searchQuery,
    sector: filters.sector,
    country: filters.country,
    priceRange: filters.priceRange,
  });

  return (
    <>
      <SEOHead
        {...seoData.search}
        title="Find Businesses for Sale | Upswitch - Enhanced Search"
        description="Discover profitable businesses for sale across Europe. Advanced search with filters, detailed profiles, and expert support."
      />

      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
        {/* Hero Search Section */}
        <section className="py-16 bg-gradient-to-r from-primary-600 via-primary-700 to-accent-600 text-white">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Find Your Perfect
                <span className="block bg-gradient-to-r from-white to-primary-100 bg-clip-text text-transparent">
                  Business Opportunity
                </span>
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Browse thousands of profitable businesses for sale across Europe. From restaurants
                to tech startups.
              </p>

              {/* Enhanced Search Bar */}
              <div className="max-w-3xl mx-auto mb-6">
                <SearchComponent
                  value={filters.searchQuery}
                  onChange={value => handleFilterChange('searchQuery', value)}
                  onSearch={handleSearch}
                  placeholder="e.g. Restaurant in Brussels, Tech company, Manufacturing"
                  size="large"
                  buttonText="Search"
                />
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">2,400+</div>
                  <div className="text-white/80 text-sm">Businesses Listed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">€180M+</div>
                  <div className="text-white/80 text-sm">Total Value</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">15</div>
                  <div className="text-white/80 text-sm">Countries</div>
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
              <div className="flex flex-col lg:flex-row gap-6 mb-8">
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
                      <SelectItem key="retail">Retail</SelectItem>
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
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    {totalResults} Businesses Found
                  </h2>
                  <p className="text-neutral-600">
                    {filters.searchQuery && `Results for "${filters.searchQuery}"`}
                  </p>
                </div>
              </div>

              {/* Enhanced Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {listings.map(listing => (
                  <Card
                    key={listing.id}
                    className="group hover:shadow-2xl transition-all duration-300 border-2 border-neutral-100 hover:border-primary-200 overflow-hidden"
                  >
                    <CardBody className="p-0">
                      {/* Image Section */}
                      <div className="relative h-48 overflow-hidden">
                        {listing.images?.[0] ? (
                          <img
                            src={listing.images[0].storage_url}
                            alt={listing.images[0].alt_text || listing.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-success-100 flex items-center justify-center">
                            <Building2 className="w-16 h-16 text-primary-400" />
                          </div>
                        )}

                        {/* Overlay Badges */}
                        <div className="absolute top-3 left-3 flex gap-2">
                          {listing.featured && (
                            <span className="px-2 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
                              ⭐ Featured
                            </span>
                          )}
                          {listing.requires_nda && (
                            <span className="px-2 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
                              🔒 NDA Required
                            </span>
                          )}
                        </div>

                        {/* Save Button */}
                        <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <Heart className="w-4 h-4 text-neutral-600" />
                        </button>
                      </div>

                      {/* Content Section */}
                      <div className="p-6">
                        {/* Title & Location */}
                        <div className="mb-4">
                          <h3 className="text-lg font-bold text-neutral-900 mb-2 line-clamp-2">
                            {listing.title}
                          </h3>
                          <div className="flex items-center gap-1 text-neutral-600 text-sm">
                            <MapPin className="w-4 h-4" />
                            <span>
                              {listing.region}, {listing.country}
                            </span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="mb-4">
                          <div className="text-2xl font-bold text-primary-600">
                            {formatPrice(listing.asking_price, listing.currency)}
                          </div>
                          {listing.revenue_range && typeof listing.revenue_range === 'object' && (
                            <div className="text-sm text-neutral-600">
                              Revenue: {formatPrice(listing.revenue_range.min)} -{' '}
                              {formatPrice(listing.revenue_range.max)}
                            </div>
                          )}
                        </div>

                        {/* Summary */}
                        <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
                          {listing.summary}
                        </p>

                        {/* Highlights */}
                        {listing.highlights && listing.highlights.length > 0 && (
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-1">
                              {listing.highlights.slice(0, 3).map((highlight, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-success-100 text-success-700 text-xs rounded-full"
                                >
                                  {highlight}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Stats */}
                        <div className="flex items-center justify-between text-sm text-neutral-500 mb-4">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              {listing.views} views
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="w-4 h-4" />
                              {listing.inquiries} inquiries
                            </span>
                          </div>
                          <span>{listing.years_in_business} years</span>
                        </div>

                        {/* Action Button */}
                        <Button
                          variant="primary"
                          size="md"
                          onPress={() => navigate(`/listings/${listing.id}`)}
                          className="w-full"
                        >
                          View Details
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalResults > 0 && (
                <div className="flex justify-center">
                  <Pagination
                    total={Math.ceil(totalResults / 12)}
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

export default SearchVariationA;
