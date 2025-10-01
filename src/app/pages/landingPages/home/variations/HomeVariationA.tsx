/**
 * 🎯 Homepage - Variation A: "Airbnb-Style Search & Browse"
 *
 * STRATEGY:
 * - Dominant search bar in hero (Airbnb-style)
 * - Featured listings directly on homepage
 * - Immediate buyer action focus
 * - Seller CTA in secondary position
 * - Focus: "Browse and discover opportunities"
 *
 * INSPIRATION:
 * - Airbnb: Prominent search, featured properties
 * - Booking.com: Immediate browsing
 * - Zillow: Search-first, listings visible
 */

import { Button } from '@/shared/components/buttons';
import { SearchComponent } from '@/shared/components/filters';
import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { VideoBackground } from '@/shared/components/video';
import { UrlGenerator } from '@/shared/services/urls/urlGenerator';
import { seoData } from '@/shared/utils/seo/seoData';
import { Card, CardBody, Chip } from '@heroui/react';
import { ArrowRight, Building2, Euro, Heart, Sparkles, Users } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeVariationA = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim());
    }
    navigate(`/search?${params.toString()}`);
  };

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const featuredListings = [
    {
      id: '1',
      title: 'Michelin Star Restaurant',
      sector: 'restaurant',
      region: 'Brussels',
      asking_price: 2500000,
      currency: 'EUR',
      anonymous: false,
      years_in_business: 12,
    },
    {
      id: '2',
      title: 'SaaS Analytics Platform',
      sector: 'saas',
      region: 'Amsterdam',
      asking_price: 3200000,
      currency: 'EUR',
      anonymous: true,
      years_in_business: 5,
    },
    {
      id: '3',
      title: 'Automotive Parts Manufacturing',
      sector: 'manufacturing',
      region: 'Munich',
      asking_price: 4800000,
      currency: 'EUR',
      anonymous: false,
      years_in_business: 18,
    },
    {
      id: '4',
      title: 'Luxury Beauty Salon',
      sector: 'makeup',
      region: 'Paris',
      asking_price: 950000,
      currency: 'EUR',
      anonymous: false,
      years_in_business: 6,
    },
    {
      id: '5',
      title: 'E-commerce Fashion Brand',
      sector: 'ecommerce',
      region: 'Milan',
      asking_price: 1200000,
      currency: 'EUR',
      anonymous: true,
      years_in_business: 4,
    },
    {
      id: '6',
      title: 'Healthcare Clinic',
      sector: 'healthcare',
      region: 'Barcelona',
      asking_price: 1950000,
      currency: 'EUR',
      anonymous: false,
      years_in_business: 10,
    },
  ];

  // Get business icon based on sector
  const getBusinessIcon = (sector: string): string => {
    const iconMap: Record<string, string> = {
      restaurant: '🍴',
      saas: '💻',
      manufacturing: '🏭',
      makeup: '💄',
      ecommerce: '🛒',
      healthcare: '⚕️',
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
    };
    return gradientMap[sector.toLowerCase()] || 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)';
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const quickCategories = [
    { label: 'Technology', icon: '💻', count: '240+', query: 'technology' },
    { label: 'E-commerce', icon: '🛍️', count: '180+', query: 'ecommerce' },
    { label: 'Services', icon: '🤝', count: '320+', query: 'services' },
    { label: 'Food & Beverage', icon: '🍽️', count: '150+', query: 'food' },
    { label: 'Healthcare', icon: '⚕️', count: '95+', query: 'healthcare' },
    { label: 'Manufacturing', icon: '🏭', count: '120+', query: 'manufacturing' },
  ];

  return (
    <>
      <SEOHead
        {...seoData.home}
        title="Find Your Next Business | Upswitch - Browse & Discover"
        description="Discover verified businesses for sale across Europe. Search 2,400+ opportunities in technology, e-commerce, services, and more. Start browsing now."
      />

      <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
        {/* Hero Section - Search-First (Airbnb Style) */}
        <VideoBackground
          videoSrc="/videos/search-hero.mp4"
          fallbackGradient="from-primary-900 via-calm-800 to-neutral-900"
          posterImage="/images/search-hero-poster.jpg"
          overlay="gradient"
          className="py-12 sm:py-16 lg:py-20"
        >
          <Container>
            <div className="max-w-7xl mx-auto">
              {/* Pre-headline */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
                  <Sparkles className="w-4 h-4 text-success-400" />
                  <span className="text-sm font-medium text-white">
                    2,400+ businesses ready to discover
                  </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  Find Your Next
                  <br />
                  <span className="bg-gradient-to-r from-accent-300 to-primary-300 bg-clip-text text-transparent">
                    Business Adventure
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12">
                  Browse verified opportunities across Europe. Start your search now.
                </p>
              </div>

              {/* Search Bar - Prominent */}
              <div className="max-w-4xl mx-auto mb-8">
                <SearchComponent
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onSearch={handleSearch}
                  placeholder="Search by industry, location, or keywords..."
                  size="large"
                  buttonText="Search Businesses"
                />
              </div>

              {/* Quick Category Pills */}
              <div className="flex flex-wrap justify-center gap-3">
                {quickCategories.map((category, index) => (
                  <Chip
                    key={index}
                    variant="flat"
                    onClick={() => navigate(`/search?q=${category.query}`)}
                    className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 cursor-pointer transition-all"
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.label} ({category.count})
                  </Chip>
                ))}
              </div>
            </div>
          </Container>
        </VideoBackground>

        {/* Featured Listings */}
        <div className="py-16 bg-white">
          <Container>
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-4xl font-bold text-neutral-900 mb-2">
                    Featured Opportunities
                  </h2>
                  <p className="text-xl text-neutral-600">
                    Hand-picked businesses ready for their next chapter
                  </p>
                </div>
                <Button
                  variant="tertiary"
                  size="md"
                  onPress={() => navigate('/search')}
                  endContent={<ArrowRight className="w-4 h-4" />}
                >
                  View All
                </Button>
              </div>

              {/* Business Card Grid - Square Cards (same as SearchVariationC) */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {featuredListings.map(listing => (
                  <div key={listing.id} className="w-full">
                    <div
                      className="relative group cursor-pointer"
                      onClick={() => navigate(UrlGenerator.listingById(listing.id))}
                    >
                      {/* Square Card Design - Same as SearchVariationC */}
                      <div
                        className="relative aspect-square rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300"
                        style={{
                          background: getGradientBackground(listing.sector),
                        }}
                      >
                        {/* Save Button - Bottom Right (on hover) */}
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            toggleFavorite(listing.id);
                          }}
                          className={`absolute bottom-3 right-3 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 ${
                            favorites.has(listing.id)
                              ? 'bg-red-100 text-red-500'
                              : 'bg-white/90 backdrop-blur-sm hover:bg-white'
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              favorites.has(listing.id)
                                ? 'fill-current text-red-500'
                                : 'text-gray-700'
                            }`}
                          />
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

              {/* View All CTA */}
              <div className="text-center mt-12">
                <Button
                  variant="primary"
                  size="xl"
                  onPress={() => navigate('/search')}
                  endContent={<ArrowRight className="w-5 h-5" />}
                >
                  Explore All 2,400+ Businesses
                </Button>
              </div>
            </div>
          </Container>
        </div>

        {/* Seller CTA Section (Secondary) */}
        <div className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-primary-50 to-calm-50">
          <Container>
            <div className="max-w-5xl mx-auto">
              <Card className="rounded-3xl border-2 border-primary-200 shadow-2xl overflow-hidden">
                <CardBody className="p-6 sm:p-8 md:p-12">
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                      <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6">
                        <Building2 className="w-8 h-8 text-primary-600" />
                      </div>
                      <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                        Selling Your Business?
                      </h2>
                      <p className="text-xl text-neutral-700 mb-6 leading-relaxed">
                        Get a free valuation and discover what your business is really worth. No
                        pressure, just insights.
                      </p>
                      <Button
                        variant="primary"
                        size="lg"
                        onPress={() => navigate('/valuation')}
                        endContent={<ArrowRight className="w-5 h-5" />}
                      >
                        Get Free Valuation
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {[
                        { icon: '📊', text: 'Free professional valuation in 10 minutes' },
                        { icon: '📈', text: 'Monthly insights to increase your value' },
                        { icon: '🤝', text: 'Connect with qualified buyers when ready' },
                        { icon: '🔒', text: 'Bank-grade security for your data' },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-4 p-4 bg-white rounded-xl border border-neutral-200"
                        >
                          <span className="text-3xl">{item.icon}</span>
                          <span className="text-neutral-700 font-medium">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Container>
        </div>

        {/* Stats Section */}
        <div className="py-16 bg-white border-y border-neutral-200">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { value: '€840M+', label: 'Total Transactions', icon: Euro },
                  { value: '2,400+', label: 'Successful Exits', icon: Building2 },
                  { value: '12,000+', label: 'Active Users', icon: Users },
                  { value: '94%', label: 'Success Rate', icon: Sparkles },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="w-7 h-7 text-primary-600" />
                    </div>
                    <div className="text-4xl font-bold text-neutral-900 mb-2">{stat.value}</div>
                    <div className="text-sm text-neutral-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default HomeVariationA;
