import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, Pagination } from '@heroui/react';
import { Search, Building2, Shield, MessageSquare, Bell } from 'lucide-react';
// import { PriceRangeSlider } from '../../../shared/components';
// TODO: Create SearchComponent, ListingCard, SaveSearchModal components
// import SearchComponent from '../../../shared/components/ui/SearchComponent';
// import ListingCard from '../components/ListingCard';
// import SaveSearchModal from '../components/SaveSearchModal';

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
  revenue_range?:
    | string
    | {
        min?: number;
        max?: number;
      };
  ebitda_range?:
    | string
    | {
        min?: number;
        max?: number;
      };
  highlights?: string[];
  images?: {
    id: string;
    storage_url: string;
    thumbnail_url: string;
    is_primary: boolean;
    alt_text?: string;
  }[];
}

const ListingSearch = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [listings, setListings] = useState<Listing[]>([]);
  // Loading states removed for smooth UX
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
    // Instant data loading - no loading state
    try {
      // TODO: Replace with actual API call to backend
      // For now, using mock data
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay

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
              alt_text: 'Premium restaurant interior with elegant dining setup',
            },
            {
              id: '2',
              storage_url:
                'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&h=500&fit=crop&crop=center&auto=format&q=80',
              thumbnail_url:
                'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
              is_primary: false,
              alt_text: 'Restaurant exterior view',
            },
          ],
          views: 245,
          inquiries: 12,
          published_at: '2024-01-15',
          featured: true,
          anonymous: false,
          requires_nda: true,
          years_in_business: 8,
          revenue_range: '€2M - €5M',
        },
        {
          id: '2',
          title: 'Software Development Company',
          sector: 'Technology',
          country: 'BE',
          region: 'Antwerp',
          asking_price: 1800000,
          currency: 'EUR',
          summary:
            'Growing SaaS company specializing in enterprise solutions. 15 employees, recurring revenue model, and expanding European client base.',
          images: [
            {
              id: '3',
              storage_url:
                'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop&crop=center&auto=format&q=80',
              thumbnail_url:
                'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
              is_primary: true,
              alt_text: 'Modern tech office workspace',
            },
          ],
          views: 189,
          inquiries: 8,
          published_at: '2024-01-18',
          featured: false,
          anonymous: true,
          requires_nda: true,
          years_in_business: 5,
          revenue_range: '€1M - €2M',
        },
        {
          id: '3',
          title: 'Manufacturing Business - Antwerp',
          sector: 'Manufacturing',
          country: 'BE',
          region: 'Antwerp',
          asking_price: 3200000,
          currency: 'EUR',
          summary:
            'Specialized manufacturing company with modern equipment, established supply chains, and strong export capabilities.',
          views: 156,
          inquiries: 6,
          published_at: '2024-01-20',
          featured: false,
          anonymous: false,
          requires_nda: true,
          years_in_business: 12,
          revenue_range: '€5M - €10M',
          images: [
            {
              id: '3',
              storage_url:
                'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
              thumbnail_url:
                'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
              is_primary: true,
              alt_text: 'Manufacturing facility',
            },
          ],
        },
        {
          id: '4',
          title: 'Digital Marketing Agency',
          sector: 'Professional Services',
          country: 'NL',
          region: 'Amsterdam',
          asking_price: 950000,
          currency: 'EUR',
          summary:
            'Full-service digital marketing agency with 20+ clients, strong team, and proven track record in B2B marketing.',
          images: [
            {
              id: '4',
              storage_url:
                'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
              thumbnail_url:
                'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
              is_primary: true,
              alt_text: 'Creative office space',
            },
          ],
          views: 98,
          inquiries: 4,
          published_at: '2024-01-22',
          featured: false,
          anonymous: true,
          requires_nda: false,
          years_in_business: 6,
          revenue_range: '€500K - €1M',
        },
        {
          id: '5',
          title: 'E-commerce Retail Platform',
          sector: 'Retail',
          country: 'FR',
          region: 'Paris',
          asking_price: 1200000,
          currency: 'EUR',
          summary:
            'Successful e-commerce platform specializing in sustainable products. Growing customer base and strong online presence.',
          images: [
            {
              id: '5',
              storage_url:
                'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop&crop=center&auto=format&q=80',
              thumbnail_url:
                'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
              is_primary: true,
              alt_text: 'Modern retail warehouse and fulfillment center',
            },
          ],
          views: 134,
          inquiries: 9,
          published_at: '2024-01-19',
          featured: true,
          anonymous: false,
          requires_nda: true,
          years_in_business: 4,
          revenue_range: '€1M - €2M',
        },
      ];

      // Apply basic filtering (in a real app, this would be done server-side)
      let filteredListings = mockListings;

      if (filters.searchQuery) {
        filteredListings = filteredListings.filter(
          listing =>
            listing.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
            listing.summary.toLowerCase().includes(filters.searchQuery.toLowerCase())
        );
      }

      if (filters.sector) {
        filteredListings = filteredListings.filter(listing => listing.sector === filters.sector);
      }

      if (filters.country) {
        filteredListings = filteredListings.filter(listing => listing.country === filters.country);
      }

      setListings(filteredListings);
      setTotalResults(filteredListings.length);
    } catch (error) {
      console.error('Error loading listings:', error);
    } finally {
      // No loading state to manage
    }
  };

  const updateSearchParams = () => {
    const params = new URLSearchParams();
    if (filters.searchQuery) params.set('q', filters.searchQuery);
    if (filters.sector) params.set('sector', filters.sector);
    if (filters.country) params.set('country', filters.country);
    if (filters.priceRange[0] > 0) params.set('priceMin', filters.priceRange[0].toString());
    if (filters.priceRange[1] < 10000000) params.set('priceMax', filters.priceRange[1].toString());
    if (filters.anonymous) params.set('anonymous', filters.anonymous);
    if (filters.requiresNda) params.set('requiresNda', filters.requiresNda);

    setSearchParams(params);
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
    updateSearchParams();
    setCurrentPage(1);
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSearch = async (searchData: any) => {
    try {
      // TODO: Replace with actual API call
      console.log('Saving search:', searchData);
      // await searchService.saveSearch(searchData);

      // Show success notification
      // toast.success('Search saved successfully!');
    } catch (error) {
      console.error('Error saving search:', error);
      // toast.error('Failed to save search');
    }
  };

  const getCurrentSearchCriteria = () => {
    const criteria: any = {};

    if (filters.searchQuery) criteria.searchQuery = filters.searchQuery;
    if (filters.sector) criteria.sector = filters.sector;
    if (filters.country) criteria.country = filters.country;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000000) {
      criteria.priceRange = filters.priceRange;
    }
    if (filters.revenueRange[0] > 0 || filters.revenueRange[1] < 50000000) {
      criteria.revenueRange = filters.revenueRange;
    }
    if (filters.anonymous) criteria.anonymous = true;
    if (filters.requiresNda) criteria.requiresNda = true;

    return criteria;
  };

  const hasActiveFilters = () => {
    return (
      filters.searchQuery ||
      filters.sector ||
      filters.country ||
      filters.priceRange[0] > 0 ||
      filters.priceRange[1] < 10000000 ||
      filters.revenueRange[0] > 0 ||
      filters.revenueRange[1] < 50000000 ||
      filters.anonymous ||
      filters.requiresNda
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Find Your Next Business
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover quality SME acquisition opportunities in Belgium. Verified businesses ready for
            acquisition.
          </p>
        </div>

        {/* Enhanced Search Bar - Clean Component */}
        <div className="max-w-5xl mx-auto mb-12">
          <SearchComponent
            value={filters.searchQuery}
            onChange={value => handleFilterChange('searchQuery', value)}
            onSearch={handleSearch}
            placeholder="Search businesses, sectors, locations..."
            size="large"
            buttonText="Search"
          />
        </div>

        {/* Redesigned Filter Section */}
        <Card className="mb-12 shadow-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 rounded-3xl">
          <CardBody className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Industry Sector Dropdown */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 block">
                  Industry Sector
                </label>
                <div className="relative">
                  <select
                    value={filters.sector || ''}
                    onChange={e => handleFilterChange('sector', e.target.value)}
                    className="clean-select w-full h-12 px-4 pr-10 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-900 font-medium appearance-none cursor-pointer"
                  >
                    <option value="" className="text-slate-500">
                      Select sector
                    </option>
                    <option value="Technology" className="text-slate-900">
                      Technology
                    </option>
                    <option value="Food & Beverage" className="text-slate-900">
                      Food & Beverage
                    </option>
                    <option value="Manufacturing" className="text-slate-900">
                      Manufacturing
                    </option>
                    <option value="Retail" className="text-slate-900">
                      Retail
                    </option>
                    <option value="Healthcare" className="text-slate-900">
                      Healthcare
                    </option>
                    <option value="Professional Services" className="text-slate-900">
                      Professional Services
                    </option>
                    <option value="Construction" className="text-slate-900">
                      Construction
                    </option>
                    <option value="Transportation" className="text-slate-900">
                      Transportation
                    </option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-slate-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Location Dropdown */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 block">Location</label>
                <div className="relative">
                  <select
                    value={filters.country || ''}
                    onChange={e => handleFilterChange('country', e.target.value)}
                    className="clean-select w-full h-12 px-4 pr-10 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-900 font-medium appearance-none cursor-pointer"
                  >
                    <option value="" className="text-slate-500">
                      Select region
                    </option>
                    <option value="BE" className="text-slate-900">
                      Belgium
                    </option>
                    <option value="Brussels" className="text-slate-900">
                      Brussels Capital
                    </option>
                    <option value="Flanders" className="text-slate-900">
                      Flanders
                    </option>
                    <option value="Wallonia" className="text-slate-900">
                      Wallonia
                    </option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-slate-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 block">Price Range</label>
                <PriceRangeSlider
                  min={0}
                  max={5000000}
                  step={100000}
                  value={filters.priceRange}
                  onChange={value => handleFilterChange('priceRange', value)}
                  currency="€"
                  showValueLabels={true}
                />
              </div>
            </div>

            {/* Filter Actions */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="flex flex-wrap gap-2">
                  {filters.sector && (
                    <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium">
                      <span>{filters.sector}</span>
                      <button
                        onClick={() => handleFilterChange('sector', '')}
                        className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                  {filters.country && (
                    <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm font-medium">
                      <span>{filters.country === 'BE' ? 'Belgium' : filters.country}</span>
                      <button
                        onClick={() => handleFilterChange('country', '')}
                        className="hover:bg-green-200 rounded-full p-0.5 transition-colors"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                  {(filters.priceRange[0] > 0 || filters.priceRange[1] < 5000000) && (
                    <div className="flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full text-sm font-medium">
                      <span>
                        {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
                      </span>
                      <button
                        onClick={() => handleFilterChange('priceRange', [0, 5000000])}
                        className="hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="flat"
                    color="default"
                    onPress={() => {
                      setFilters({
                        searchQuery: '',
                        sector: '',
                        country: '',
                        priceRange: [0, 5000000],
                        revenueRange: [0, 50000000],
                        anonymous: '',
                        requiresNda: '',
                        sortBy: 'published_at',
                      });
                    }}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-6"
                  >
                    Clear All
                  </Button>
                  <Button
                    color="primary"
                    onPress={handleSearch}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-neutral-900">
              {`${totalResults} businesses found`}
            </h2>
            {filters.searchQuery && (
              <p className="text-neutral-600 mt-1">Results for "{filters.searchQuery}"</p>
            )}
          </div>

          {/* Save Search Button */}
          {hasActiveFilters() && totalResults > 0 && (
            <div className="flex items-center gap-3">
              <Button
                variant="bordered"
                startContent={<Bell className="w-4 h-4" />}
                onPress={() => setShowSaveSearchModal(true)}
                className="border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                Save Search Alert
              </Button>
            </div>
          )}
        </div>

        {/* Results */}
        {/* Loading screens removed for smooth UX */}
        {listings.length === 0 ? (
          <Card>
            <CardBody className="text-center py-12">
              <Building2
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                style={{ stroke: 'currentColor', fill: 'none' }}
              />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No businesses found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
              <Button
                onPress={() => {
                  setFilters({
                    searchQuery: '',
                    sector: '',
                    country: '',
                    priceRange: [0, 10000000],
                    revenueRange: [0, 50000000],
                    anonymous: '',
                    requiresNda: '',
                    sortBy: 'published_at',
                  });
                  setSearchParams(new URLSearchParams());
                }}
              >
                Clear all filters
              </Button>
            </CardBody>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {listings.map(listing => {
                // Transform listing to match ListingCard interface
                const transformedListing = {
                  ...listing,
                  status: 'active',
                  highlights:
                    listing.requires_nda || listing.anonymous || listing.years_in_business
                      ? [
                          ...(listing.requires_nda ? ['NDA Required'] : []),
                          ...(listing.anonymous ? ['Confidential'] : []),
                        ]
                      : undefined,
                  business_age: listing.years_in_business,
                  revenue_range:
                    typeof listing.revenue_range === 'string'
                      ? { min: 0, max: 1000000 }
                      : listing.revenue_range,
                  ebitda_range:
                    typeof listing.ebitda_range === 'string'
                      ? { min: 0, max: 200000 }
                      : listing.ebitda_range,
                };

                return (
                  <ListingCard
                    key={listing.id}
                    listing={transformedListing}
                    currentUserRole="buyer"
                    viewMode="card"
                    onSave={listingId => {
                      // TODO: Implement save functionality
                      console.log('Save listing:', listingId);
                    }}
                    onInquiry={async (listingId, inquiryData) => {
                      // TODO: Implement inquiry functionality
                      console.log('Inquiry for listing:', listingId, inquiryData);
                    }}
                  />
                );
              })}
            </div>

            {/* Pagination */}
            {totalResults > 20 && (
              <div className="flex justify-center">
                <Pagination
                  total={Math.ceil(totalResults / 20)}
                  page={currentPage}
                  onChange={setCurrentPage}
                  showControls
                  color="primary"
                />
              </div>
            )}

            {/* M&A Funnel Progress Indicator */}
            <div className="mt-12 bg-neutral-50 rounded-2xl p-6 border border-neutral-200">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4 text-center">
                Your M&A Journey
              </h3>
              <div className="flex items-center justify-between max-w-4xl mx-auto">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center mb-2">
                    <Search
                      className="w-5 h-5 text-white"
                      style={{ stroke: 'currentColor', fill: 'none' }}
                    />
                  </div>
                  <span className="text-sm font-medium text-primary-600">Search</span>
                  <span className="text-xs text-neutral-500">Find opportunities</span>
                </div>
                <div className="flex-1 h-0.5 bg-neutral-300 mx-4"></div>
                <div className="flex flex-col items-center opacity-50">
                  <div className="w-10 h-10 bg-neutral-300 rounded-full flex items-center justify-center mb-2">
                    <MessageSquare
                      className="w-5 h-5 text-neutral-600"
                      style={{ stroke: 'currentColor', fill: 'none' }}
                    />
                  </div>
                  <span className="text-sm font-medium text-neutral-600">Inquire</span>
                  <span className="text-xs text-neutral-500">Submit interest</span>
                </div>
                <div className="flex-1 h-0.5 bg-neutral-300 mx-4"></div>
                <div className="flex flex-col items-center opacity-50">
                  <div className="w-10 h-10 bg-neutral-300 rounded-full flex items-center justify-center mb-2">
                    <Shield
                      className="w-5 h-5 text-neutral-600"
                      style={{ stroke: 'currentColor', fill: 'none' }}
                    />
                  </div>
                  <span className="text-sm font-medium text-neutral-600">NDA</span>
                  <span className="text-xs text-neutral-500">Sign agreement</span>
                </div>
                <div className="flex-1 h-0.5 bg-neutral-300 mx-4"></div>
                <div className="flex flex-col items-center opacity-50">
                  <div className="w-10 h-10 bg-neutral-300 rounded-full flex items-center justify-center mb-2">
                    <Building2
                      className="w-5 h-5 text-neutral-600"
                      style={{ stroke: 'currentColor', fill: 'none' }}
                    />
                  </div>
                  <span className="text-sm font-medium text-neutral-600">Close</span>
                  <span className="text-xs text-neutral-500">Complete deal</span>
                </div>
              </div>
              <p className="text-center text-sm text-neutral-600 mt-4">
                Click on any business to start your acquisition journey
              </p>
            </div>
          </>
        )}
      </div>

      {/* Save Search Modal */}
      <SaveSearchModal
        isOpen={showSaveSearchModal}
        onClose={() => setShowSaveSearchModal(false)}
        onSave={handleSaveSearch}
        initialCriteria={getCurrentSearchCriteria()}
        mode="create"
      />
    </div>
  );
};

export default ListingSearch;
