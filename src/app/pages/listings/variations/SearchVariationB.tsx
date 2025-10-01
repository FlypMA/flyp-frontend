/**
 * 🔍 Search Page - Variation B: "Pinterest-Style Masonry"
 *
 * STRATEGY:
 * - Pinterest-style masonry layout
 * - Visual discovery and inspiration
 * - Card-based browsing with varied heights
 * - Focus: "Discover businesses that inspire you"
 *
 * INSPIRATION:
 * - Pinterest: Masonry layout, visual discovery
 * - Instagram: Card-based browsing
 * - Modern design: Clean, spacious, visual-first
 */

import { Button } from '@/shared/components/buttons';
import SaveSearchModal from '@/shared/components/buyer/SaveSearchModal';
import { SearchComponent } from '@/shared/components/filters';
import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { seoData } from '@/shared/utils/seo/seoData';
import { Card, CardBody, Pagination, Select, SelectItem } from '@heroui/react';
import { Bell, Building2, Filter, Heart, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// Mock data for demonstration
const mockListings = [
  {
    id: '1',
    title: 'Tech Startup - SaaS Platform',
    description: 'Profitable SaaS business with 10,000+ users and recurring revenue model.',
    image: '/images/business-1.jpg',
    price: 2500000,
    revenue: { min: 800000, max: 1200000 },
    profit_margin: 35,
    location: 'Amsterdam, Netherlands',
    industry: 'Technology',
    employees: 12,
    years_operating: 4,
    views: 1247,
    featured: true,
    requires_nda: false,
    emoji: '💻',
    gradient: 'from-blue-500 to-purple-600',
  },
  {
    id: '2',
    title: 'Restaurant Chain',
    description: 'Popular restaurant chain with 3 locations and strong brand recognition.',
    image: '/images/business-2.jpg',
    price: 1800000,
    revenue: { min: 1200000, max: 1500000 },
    profit_margin: 18,
    location: 'Brussels, Belgium',
    industry: 'Food & Beverage',
    employees: 45,
    years_operating: 8,
    views: 892,
    featured: false,
    requires_nda: true,
    emoji: '🍴',
    gradient: 'from-orange-500 to-red-600',
  },
  {
    id: '3',
    title: 'Manufacturing Company',
    description: 'Established manufacturing business with modern facilities and skilled workforce.',
    image: '/images/business-3.jpg',
    price: 4200000,
    revenue: { min: 2500000, max: 3000000 },
    profit_margin: 22,
    location: 'Munich, Germany',
    industry: 'Manufacturing',
    employees: 78,
    years_operating: 15,
    views: 634,
    featured: true,
    requires_nda: false,
    emoji: '🏭',
    gradient: 'from-gray-600 to-blue-700',
  },
  {
    id: '4',
    title: 'E-commerce Store',
    description:
      'Successful online retail business with strong digital presence and customer base.',
    image: '/images/business-4.jpg',
    price: 950000,
    revenue: { min: 600000, max: 800000 },
    profit_margin: 28,
    location: 'Copenhagen, Denmark',
    industry: 'E-commerce',
    employees: 8,
    years_operating: 3,
    views: 1156,
    featured: false,
    requires_nda: false,
    emoji: '🛒',
    gradient: 'from-green-500 to-teal-600',
  },
  {
    id: '5',
    title: 'Healthcare Services',
    description: 'Medical practice with established patient base and modern equipment.',
    image: '/images/business-5.jpg',
    price: 3200000,
    revenue: { min: 1800000, max: 2200000 },
    profit_margin: 25,
    location: 'Vienna, Austria',
    industry: 'Healthcare',
    employees: 24,
    years_operating: 12,
    views: 743,
    featured: true,
    requires_nda: true,
    emoji: '🏥',
    gradient: 'from-emerald-500 to-blue-600',
  },
  {
    id: '6',
    title: 'Digital Agency',
    description: 'Creative digital agency with diverse client portfolio and talented team.',
    image: '/images/business-6.jpg',
    price: 1500000,
    revenue: { min: 900000, max: 1100000 },
    profit_margin: 30,
    location: 'Stockholm, Sweden',
    industry: 'Professional Services',
    employees: 15,
    years_operating: 6,
    views: 987,
    featured: false,
    requires_nda: false,
    emoji: '🎨',
    gradient: 'from-pink-500 to-purple-600',
  },
];

const SearchVariationB = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState({
    industry: '',
    country: '',
    priceRange: [0, 10000000],
    searchQuery: searchQuery,
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSaveSearchOpen, setIsSaveSearchOpen] = useState(false);

  // Filter and sort listings
  const filteredListings = mockListings.filter(listing => {
    if (
      filters.searchQuery &&
      !listing.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
    ) {
      return false;
    }
    if (filters.industry && listing.industry !== filters.industry) {
      return false;
    }
    if (filters.country && !listing.location.includes(filters.country)) {
      return false;
    }
    if (listing.price < filters.priceRange[0] || listing.price > filters.priceRange[1]) {
      return false;
    }
    return true;
  });

  const totalResults = filteredListings.length;
  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedListings = filteredListings.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = () => {
    setFilters(prev => ({ ...prev, searchQuery }));
    setCurrentPage(1);
  };

  const handleSaveSearch = async (searchData: unknown) => {
    console.log('Saving search:', searchData);
    setIsSaveSearchOpen(false);
  };

  const getCurrentSearchCriteria = () => {
    return {
      query: searchQuery,
      filters: filters,
      sortBy: sortBy,
    };
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Generate random heights for masonry effect
  const getRandomHeight = () => {
    const heights = ['h-64', 'h-72', 'h-80', 'h-96'];
    return heights[Math.floor(Math.random() * heights.length)];
  };

  return (
    <>
      <SEOHead
        {...seoData.search}
        title="Discover Businesses | Upswitch - Variation B"
        description="Browse thousands of profitable businesses for sale across Europe. Discover opportunities that inspire you."
      />

      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-accent-600 text-white py-20">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Discover Businesses That
                <br />
                <span className="bg-gradient-to-r from-accent-300 to-primary-300 bg-clip-text text-transparent">
                  Inspire You
                </span>
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Browse thousands of profitable businesses for sale across Europe. From restaurants
                to tech startups.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-8">
                <SearchComponent
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onSearch={handleSearch}
                  placeholder="e.g. Restaurant in Brussels, Tech company"
                  size="large"
                  buttonText="Search"
                />
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-8 text-white/80">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">2,400+</div>
                  <div className="text-sm">Businesses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">15</div>
                  <div className="text-sm">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">€180M+</div>
                  <div className="text-sm">Total Value</div>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Filters and Results */}
        <Container className="py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 sticky top-8">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="w-5 h-5 text-primary-600" />
                  <h3 className="font-semibold text-gray-900">Filters</h3>
                </div>

                <div className="space-y-6">
                  {/* Industry Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                    <Select
                      placeholder="All Industries"
                      selectedKeys={filters.industry ? [filters.industry] : []}
                      onSelectionChange={keys => {
                        const value = Array.from(keys)[0] as string;
                        setFilters(prev => ({ ...prev, industry: value || '' }));
                      }}
                    >
                      <SelectItem key="Technology">Technology</SelectItem>
                      <SelectItem key="Food & Beverage">Food & Beverage</SelectItem>
                      <SelectItem key="Manufacturing">Manufacturing</SelectItem>
                      <SelectItem key="E-commerce">E-commerce</SelectItem>
                      <SelectItem key="Healthcare">Healthcare</SelectItem>
                      <SelectItem key="Professional Services">Professional Services</SelectItem>
                    </Select>
                  </div>

                  {/* Country Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <Select
                      placeholder="All Countries"
                      selectedKeys={filters.country ? [filters.country] : []}
                      onSelectionChange={keys => {
                        const value = Array.from(keys)[0] as string;
                        setFilters(prev => ({ ...prev, country: value || '' }));
                      }}
                    >
                      <SelectItem key="Netherlands">Netherlands</SelectItem>
                      <SelectItem key="Belgium">Belgium</SelectItem>
                      <SelectItem key="Germany">Germany</SelectItem>
                      <SelectItem key="Denmark">Denmark</SelectItem>
                      <SelectItem key="Austria">Austria</SelectItem>
                      <SelectItem key="Sweden">Sweden</SelectItem>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range
                    </label>
                    <div className="text-sm text-gray-600">
                      {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-neutral-900">{totalResults} Businesses</h2>
                  <p className="text-neutral-600">
                    {filters.searchQuery && `Results for "${filters.searchQuery}"`}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <Select
                    placeholder="Sort by"
                    selectedKeys={[sortBy]}
                    onSelectionChange={keys => setSortBy(Array.from(keys)[0] as string)}
                    className="w-48"
                  >
                    <SelectItem key="relevance">Relevance</SelectItem>
                    <SelectItem key="price-low">Price: Low to High</SelectItem>
                    <SelectItem key="price-high">Price: High to Low</SelectItem>
                    <SelectItem key="revenue">Revenue</SelectItem>
                    <SelectItem key="newest">Newest First</SelectItem>
                  </Select>

                  <Button
                    variant="secondary"
                    size="sm"
                    onPress={() => setIsSaveSearchOpen(true)}
                    startContent={<Bell className="w-4 h-4" />}
                  >
                    Save Search
                  </Button>
                </div>
              </div>

              {/* Masonry Grid */}
              {paginatedListings.length > 0 ? (
                <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                  {paginatedListings.map(listing => (
                    <Card
                      key={listing.id}
                      className="break-inside-avoid mb-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                      isPressable
                      onPress={() => navigate(`/listings/${listing.id}`)}
                    >
                      <CardBody className="p-0">
                        {/* Image */}
                        <div className={`relative ${getRandomHeight()} overflow-hidden`}>
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${listing.gradient} opacity-90`}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-6xl">{listing.emoji}</div>
                          </div>

                          {/* Badges */}
                          <div className="absolute top-4 left-4 flex flex-col gap-2">
                            {listing.featured && (
                              <span className="px-3 py-1 bg-yellow-500 text-white text-sm font-semibold rounded-full shadow-lg">
                                ⭐ Featured
                              </span>
                            )}
                            {listing.requires_nda && (
                              <span className="px-3 py-1 bg-primary-600 text-white text-sm font-semibold rounded-full shadow-lg">
                                🔒 NDA Required
                              </span>
                            )}
                          </div>

                          {/* Heart Icon */}
                          <div className="absolute top-4 right-4">
                            <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                              <Heart className="w-5 h-5 text-white" />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                              <div className="text-2xl font-bold text-gray-900">
                                {formatPrice(listing.price)}
                              </div>
                              <div className="text-sm text-gray-600">
                                {listing.industry} • {listing.location}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                            {listing.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {listing.description}
                          </p>

                          {/* Stats */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="text-gray-500">Revenue</div>
                              <div className="font-semibold text-gray-900">
                                {formatPrice(listing.revenue.min)} -{' '}
                                {formatPrice(listing.revenue.max)}
                              </div>
                            </div>
                            <div>
                              <div className="text-gray-500">Profit Margin</div>
                              <div className="font-semibold text-gray-900">
                                {listing.profit_margin}%
                              </div>
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-1 text-gray-500 text-sm">
                              <TrendingUp className="w-4 h-4" />
                              <span>{listing.views} views</span>
                            </div>
                            <div className="text-gray-500 text-sm">
                              {listing.employees} employees
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No businesses found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search criteria or filters to find more businesses.
                  </p>
                  <Button
                    variant="primary"
                    onPress={() => {
                      setFilters({
                        industry: '',
                        country: '',
                        priceRange: [0, 10000000],
                        searchQuery: '',
                      });
                      setSearchQuery('');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <Pagination
                    total={totalPages}
                    page={currentPage}
                    onChange={setCurrentPage}
                    showControls
                    showShadow
                    color="primary"
                  />
                </div>
              )}
            </div>
          </div>
        </Container>

        {/* Save Search Modal */}
        <SaveSearchModal
          isOpen={isSaveSearchOpen}
          onClose={() => setIsSaveSearchOpen(false)}
          onSave={handleSaveSearch}
          mode="create"
        />
      </div>
    </>
  );
};

export default SearchVariationB;
