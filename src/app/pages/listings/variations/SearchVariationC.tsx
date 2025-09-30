/**
 * 🎯 Search Variation C - Business Card Inspired
 *
 * STRATEGY:
 * - Square business cards with emoji icons and gradient backgrounds
 * - Inspired by BusinessProfileCardV4 design
 * - Visual-first approach with minimal text
 * - Focus: "Visual discovery and quick scanning"
 *
 * INSPIRATION:
 * - BusinessProfileCardV4: Square cards, emojis, gradients
 * - Instagram: Visual grid, minimal text
 * - Pinterest: Visual discovery
 */

import { Button } from '@/shared/components/buttons';
import SaveSearchModal from '@/shared/components/buyer/SaveSearchModal';
import { SearchComponent } from '@/shared/components/filters';
import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { VideoBackground } from '@/shared/components/video';
import { seoData } from '@/shared/utils/seo/seoData';
import { Pagination, Select, SelectItem } from '@heroui/react';
import { Bell, Filter, Heart } from 'lucide-react';
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

const SearchVariationC = () => {
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
          title: 'Premium Restaurant Chain',
          sector: 'restaurant',
          country: 'BE',
          region: 'Brussels',
          asking_price: 2500000,
          currency: 'EUR',
          summary:
            'Established restaurant chain with 3 locations in prime Brussels areas. Strong customer base, excellent reputation, and significant growth potential.',
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
          sector: 'saas',
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
          title: 'Manufacturing Company',
          sector: 'manufacturing',
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
        {
          id: '4',
          title: 'Beauty Salon Chain',
          sector: 'makeup',
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
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=500&fit=crop&crop=center&auto=format&q=80',
              thumbnail_url:
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
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
          sector: 'ecommerce',
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
                'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop&crop=center&auto=format&q=80',
              thumbnail_url:
                'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
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
          title: 'Healthcare Clinic',
          sector: 'healthcare',
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
                'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=500&fit=crop&crop=center&auto=format&q=80',
              thumbnail_url:
                'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
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

  // Get business icon based on sector
  const getBusinessIcon = (sector: string): string => {
    const iconMap: Record<string, string> = {
      restaurant: '🍴',
      saas: '💻',
      manufacturing: '🏭',
      makeup: '💄',
      ecommerce: '🛒',
      healthcare: '⚕️',
      catering: '🍽️',
      chef: '👨‍🍳',
      meals: '🍱',
      hairstyling: '💇‍♀️',
      massage: '💆‍♀️',
      nailcare: '💅',
      wellness: '🧘‍♀️',
      personaltraining: '💪',
      gym: '🏋️',
      photography: '📸',
      videography: '🎥',
      design: '🎨',
      marketing: '📱',
      software: '⚙️',
      webdev: '🌐',
      itsupport: '🖥️',
      retail: '🏪',
      subscription: '📦',
      cleaning: '🧹',
      realestate: '🏡',
      construction: '🔨',
      landscaping: '🌳',
      consulting: '💼',
      legal: '⚖️',
      accounting: '📊',
      hr: '👥',
      education: '📚',
      coaching: '🎯',
      logistics: '🚚',
      automotive: '🚗',
      events: '🎉',
      entertainment: '🎭',
    };
    return iconMap[sector.toLowerCase()] || '🏢';
  };

  // Get gradient background based on sector
  const getGradientBackground = (sector: string): string => {
    const gradientMap: Record<string, string> = {
      restaurant: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', // Amber
      saas: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)', // Blue
      manufacturing: 'linear-gradient(135deg, #6B7280 0%, #374151 100%)', // Gray
      makeup: 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)', // Pink
      ecommerce: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', // Emerald
      healthcare: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)', // Violet
      catering: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      chef: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      meals: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      hairstyling: 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)',
      massage: 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)',
      nailcare: 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)',
      wellness: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      personaltraining: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      gym: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      photography: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
      videography: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
      design: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
      marketing: 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)',
      software: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
      webdev: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
      itsupport: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
      retail: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      subscription: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
      cleaning: 'linear-gradient(135deg, #6B7280 0%, #374151 100%)',
      realestate: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      construction: 'linear-gradient(135deg, #6B7280 0%, #374151 100%)',
      landscaping: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      consulting: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
      legal: 'linear-gradient(135deg, #6B7280 0%, #374151 100%)',
      accounting: 'linear-gradient(135deg, #6B7280 0%, #374151 100%)',
      hr: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
      education: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
      coaching: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      logistics: 'linear-gradient(135deg, #6B7280 0%, #374151 100%)',
      automotive: 'linear-gradient(135deg, #6B7280 0%, #374151 100%)',
      events: 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)',
      entertainment: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    };
    return gradientMap[sector.toLowerCase()] || 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)';
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
        title="Discover Businesses | Upswitch - Visual Search"
        description="Browse businesses for sale with our visual discovery interface. Find opportunities through emoji icons and beautiful cards."
      />

      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
        {/* Hero Search Section with Video Background */}
        <VideoBackground
          videoSrc="/videos/business-search-hero.mp4"
          posterImage="/images/business-search-poster.jpg"
          fallbackGradient="from-primary-600 via-primary-700 to-accent-600"
          overlay="gradient"
          className="min-h-[70vh] flex items-center justify-center"
          disableVideoOnMobile={true}
        >
          <div className="w-full max-w-4xl mx-auto text-center py-20 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Find Your Next
              <span className="block bg-gradient-to-r from-accent-300 to-primary-300 bg-clip-text text-transparent">
                Business Adventure
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Discover unique businesses for sale across Europe. Each opportunity tells a story.
            </p>

            {/* Search Bar */}
            <div className="w-full max-w-3xl mx-auto mb-8">
              <SearchComponent
                value={filters.searchQuery}
                onChange={value => handleFilterChange('searchQuery', value)}
                onSearch={handleSearch}
                placeholder="Search by industry, location, or keywords..."
                size="large"
                buttonText="Search"
              />
            </div>

            {/* Quick Stats */}
            <div className="w-full max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">2,400+</div>
                  <div className="text-white/80 text-sm">Businesses</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">15</div>
                  <div className="text-white/80 text-sm">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">€180M+</div>
                  <div className="text-white/80 text-sm">Total Value</div>
                </div>
              </div>
            </div>
          </div>
        </VideoBackground>

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
                      variant="tertiary"
                      size="md"
                      onPress={() => setShowFilters(!showFilters)}
                      startContent={<Filter className="w-4 h-4" />}
                    >
                      Filters
                    </Button>

                    <Select
                      size="md"
                      placeholder="Industry"
                      selectedKeys={filters.sector ? [filters.sector] : []}
                      onSelectionChange={keys => {
                        const selected = Array.from(keys)[0] as string;
                        handleFilterChange('sector', selected || '');
                      }}
                      className="w-48"
                      classNames={{
                        trigger:
                          'h-10 bg-white border-2 border-neutral-200 hover:border-primary-300',
                        value: 'text-neutral-700',
                      }}
                    >
                      <SelectItem key="restaurant">🍴 Restaurant</SelectItem>
                      <SelectItem key="saas">💻 SaaS</SelectItem>
                      <SelectItem key="manufacturing">🏭 Manufacturing</SelectItem>
                      <SelectItem key="makeup">💄 Beauty</SelectItem>
                      <SelectItem key="ecommerce">🛒 E-commerce</SelectItem>
                      <SelectItem key="healthcare">⚕️ Healthcare</SelectItem>
                    </Select>

                    <Select
                      size="md"
                      placeholder="Country"
                      selectedKeys={filters.country ? [filters.country] : []}
                      onSelectionChange={keys => {
                        const selected = Array.from(keys)[0] as string;
                        handleFilterChange('country', selected || '');
                      }}
                      className="w-44"
                      classNames={{
                        trigger:
                          'h-10 bg-white border-2 border-neutral-200 hover:border-primary-300',
                        value: 'text-neutral-700',
                      }}
                    >
                      <SelectItem key="BE">🇧🇪 Belgium</SelectItem>
                      <SelectItem key="NL">🇳🇱 Netherlands</SelectItem>
                      <SelectItem key="DE">🇩🇪 Germany</SelectItem>
                      <SelectItem key="FR">🇫🇷 France</SelectItem>
                      <SelectItem key="IT">🇮🇹 Italy</SelectItem>
                      <SelectItem key="ES">🇪🇸 Spain</SelectItem>
                    </Select>
                  </div>
                </div>

                {/* Right: Sort & Actions */}
                <div className="flex items-center gap-4">
                  <Select
                    size="md"
                    placeholder="Sort by"
                    selectedKeys={[filters.sortBy]}
                    onSelectionChange={keys => {
                      const selected = Array.from(keys)[0] as string;
                      handleFilterChange('sortBy', selected);
                    }}
                    className="w-48"
                    classNames={{
                      trigger: 'h-10 bg-white border-2 border-neutral-200 hover:border-primary-300',
                      value: 'text-neutral-700',
                    }}
                  >
                    <SelectItem key="published_at">Newest First</SelectItem>
                    <SelectItem key="price_asc">Price: Low to High</SelectItem>
                    <SelectItem key="price_desc">Price: High to Low</SelectItem>
                    <SelectItem key="views">Most Popular</SelectItem>
                  </Select>

                  <Button
                    variant="tertiary"
                    size="md"
                    onPress={() => setShowSaveSearchModal(true)}
                    startContent={<Bell className="w-4 h-4" />}
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

              {/* Business Card Grid - Square Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-12">
                {listings.map(listing => (
                  <div key={listing.id} className="w-full max-w-sm">
                    <div
                      className="relative group cursor-pointer"
                      onClick={() => navigate(`/listings/${listing.id}`)}
                    >
                      {/* Square Card with Gradient Background */}
                      <div
                        className="relative aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                        style={{
                          background: getGradientBackground(listing.sector),
                        }}
                      >
                        {/* Save Button - Bottom Right (on hover) */}
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            // Handle favorite logic here
                          }}
                          className="absolute bottom-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 hover:bg-white"
                        >
                          <Heart className="w-4 h-4 text-gray-700" />
                        </button>

                        {/* Badge Overlays - Top Left */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                          <div className="relative">
                            <button
                              onClick={e => e.stopPropagation()}
                              className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center shadow-lg"
                            >
                              <span className="text-xl">💰</span>
                            </button>
                          </div>
                        </div>

                        {/* Anonymous Badge - Top Right */}
                        {listing.anonymous && (
                          <div className="absolute top-3 right-3 z-10">
                            <div className="relative">
                              <button
                                onClick={e => e.stopPropagation()}
                                className="w-10 h-10 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 border-2 border-primary-500"
                              >
                                <span className="text-xl">👤</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Large Emoji Icon - Center */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-9xl mb-4 drop-shadow-lg">
                              {getBusinessIcon(listing.sector)}
                            </div>
                          </div>
                        </div>

                        {/* Bottom Info Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-16 pb-5 px-5">
                          <div className="text-center">
                            <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">
                              {listing.title}
                            </h3>
                            <p className="text-sm text-white/90">
                              {formatPrice(listing.asking_price, listing.currency)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer Info */}
                      <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                        <span>📅 {listing.years_in_business} years</span>
                        <span>📍 {listing.region}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalResults > 0 && (
                <div className="flex justify-center">
                  <Pagination
                    total={Math.ceil(totalResults / 20)}
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

export default SearchVariationC;
