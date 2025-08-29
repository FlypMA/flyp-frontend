import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Select,
  SelectItem,
  Pagination,
} from '@heroui/react';
import {
  Search,
  Filter,
  MapPin,
  Eye,
  Heart,
  Building2,
  TrendingUp,
  Star,
  Shield,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';
import { SearchComponent, PriceRangeSlider } from '../../components/common';

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
  revenue_range?: string;
  ebitda_range?: string;
}

const ListingSearch = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

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
    setIsLoading(true);
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
      setIsLoading(false);
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
              {isLoading ? 'Searching...' : `${totalResults} businesses found`}
            </h2>
            {filters.searchQuery && (
              <p className="text-neutral-600 mt-1">Results for "{filters.searchQuery}"</p>
            )}
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardBody>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded mb-2 w-2/3"></div>
                  <div className="h-3 bg-gray-300 rounded mb-4 w-1/2"></div>
                  <div className="h-20 bg-gray-300 rounded"></div>
                </CardBody>
              </Card>
            ))}
          </div>
        ) : listings.length === 0 ? (
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
              {listings.map(listing => (
                <Card
                  key={listing.id}
                  className="group bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-slate-200/50 hover:border-slate-300 transition-all duration-500 cursor-pointer transform hover:-translate-y-2 hover:scale-[1.02]"
                  isPressable
                  onPress={() => navigate(`/listings/${listing.id}`)}
                >
                  <CardBody className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3"></div>
                        <h3 className="font-bold text-slate-900 text-xl line-clamp-2 group-hover:text-blue-600 transition-colors mb-3 leading-tight">
                          {listing.anonymous ? 'Confidential Business' : listing.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-slate-600 mb-4">
                          <div className="inline-flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full min-w-0 flex-shrink-0">
                            <Building2
                              className="w-3 h-3 flex-shrink-0"
                              style={{ stroke: 'currentColor', fill: 'none' }}
                            />
                            <span className="font-medium text-slate-700 truncate">
                              {listing.sector}
                            </span>
                          </div>
                          <div className="inline-flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full min-w-0 flex-shrink-0">
                            <MapPin
                              className="w-3 h-3 flex-shrink-0"
                              style={{ stroke: 'currentColor', fill: 'none' }}
                            />
                            <span className="text-slate-700 truncate whitespace-nowrap">
                              {listing.region
                                ? `${listing.region}, ${listing.country}`
                                : listing.country}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        isIconOnly
                        variant="light"
                        size="sm"
                        className="text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300 transform hover:scale-110"
                        onPress={() => {
                          // TODO: Implement save functionality
                        }}
                      >
                        <Heart
                          className="w-4 h-4"
                          style={{ stroke: 'currentColor', fill: 'none' }}
                        />
                      </Button>
                    </div>

                    <div className="space-y-6">
                      <p className="text-slate-700 line-clamp-3 leading-relaxed text-base">
                        {listing.summary}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {listing.requires_nda && (
                          <span className="inline-flex items-center gap-1.5 bg-gray-100 px-2.5 py-1.5 rounded-lg text-gray-700 text-xs font-medium whitespace-nowrap">
                            <Shield
                              className="w-3 h-3 flex-shrink-0"
                              style={{ stroke: 'currentColor', fill: 'none' }}
                            />
                            <span>NDA Required</span>
                          </span>
                        )}
                        {listing.anonymous && (
                          <span className="inline-flex items-center bg-gray-100 px-2.5 py-1.5 rounded-lg text-gray-700 text-xs font-medium whitespace-nowrap">
                            <span>Confidential</span>
                          </span>
                        )}
                        {listing.years_in_business && (
                          <span className="inline-flex items-center bg-gray-100 px-2.5 py-1.5 rounded-lg text-gray-700 text-xs font-medium whitespace-nowrap">
                            <span>{listing.years_in_business} years</span>
                          </span>
                        )}
                      </div>

                      <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-4 border border-slate-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-bold text-green-600 text-2xl">
                              {formatPrice(listing.asking_price, listing.currency)}
                            </p>
                            {listing.revenue_range && (
                              <p className="text-sm text-slate-600 mt-1">
                                Revenue: {listing.revenue_range}
                              </p>
                            )}
                            {listing.ebitda_range && (
                              <p className="text-sm text-slate-600 mt-1">
                                EBITDA: {listing.ebitda_range}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <div className="flex items-center gap-1">
                              <Eye
                                className="w-4 h-4"
                                style={{ stroke: 'currentColor', fill: 'none' }}
                              />
                              <span className="font-medium">{listing.views}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp
                                className="w-4 h-4"
                                style={{ stroke: 'currentColor', fill: 'none' }}
                              />
                              <span className="font-medium">{listing.inquiries}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
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
    </div>
  );
};

export default ListingSearch;
