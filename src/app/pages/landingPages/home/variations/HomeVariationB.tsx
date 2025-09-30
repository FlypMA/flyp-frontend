/**
 * 🎯 Homepage - Variation B: "Search-First (Airbnb-style)"
 *
 * STRATEGY:
 * - Dominant search bar in hero
 * - Immediate action for buyers
 * - Search is the primary CTA
 * - Focus: "Find businesses now"
 *
 * INSPIRATION:
 * - Airbnb: Dominant search hero
 * - Booking.com: Action-first design
 * - Google: Clean, search-focused
 */

import { Button } from '@/shared/components/buttons';
import { SearchComponent } from '@/shared/components/filters';
import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { VideoBackground } from '@/shared/components/video';
import { seoData } from '@/shared/utils/seo/seoData';
import { Card, CardBody } from '@heroui/react';
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle,
  Euro,
  Filter,
  HandshakeIcon,
  Heart,
  MapPin,
  Search,
  Shield,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../providers/auth-provider';

const HomeVariationB = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { openModal } = useAuth();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim());
    }
    navigate(`/search?${params.toString()}`);
  };

  const popularSearches = [
    { label: 'Tech Companies', value: 'technology', icon: '💻' },
    { label: 'Restaurants', value: 'food', icon: '🍽️' },
    { label: 'E-commerce', value: 'ecommerce', icon: '🛍️' },
    { label: 'Services', value: 'services', icon: '🤝' },
  ];

  const featuredListings = [
    {
      title: 'SaaS Platform',
      location: 'Amsterdam, NL',
      revenue: '€800K',
      ebitda: '€240K',
      price: '€2.4M',
      category: 'Technology',
    },
    {
      title: 'Restaurant Chain',
      location: 'Brussels, BE',
      revenue: '€1.2M',
      ebitda: '€360K',
      price: '€3.6M',
      category: 'Food & Beverage',
    },
    {
      title: 'Digital Agency',
      location: 'Paris, FR',
      revenue: '€600K',
      ebitda: '€180K',
      price: '€1.8M',
      category: 'Services',
    },
  ];

  return (
    <>
      <SEOHead {...seoData.home} />

      <div className="min-h-screen bg-white">
        {/* Hero Section - Search-First */}
        <VideoBackground
          videoSrc="/videos/search-hero.mp4"
          fallbackGradient="from-primary-900 via-calm-800 to-primary-900"
          posterImage="/images/search-poster.jpg"
          overlay="gradient"
          className="py-32 md:py-40"
        >
          <Container>
            <div className="max-w-4xl mx-auto">
              {/* Main Headline */}
              <div className="text-center mb-12">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  Find your next
                  <br />
                  <span className="bg-gradient-to-r from-primary-300 to-success-300 bg-clip-text text-transparent">
                    business opportunity
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
                  Discover verified businesses across Europe. From tech startups to established
                  brands.
                </p>
              </div>

              {/* Dominant Search Bar - Airbnb style */}
              <div className="max-w-3xl mx-auto mb-12">
                <Card className="rounded-3xl shadow-2xl border-2 border-white/20 bg-white/95 backdrop-blur-xl">
                  <CardBody className="p-4">
                    <SearchComponent
                      value={searchQuery}
                      onChange={setSearchQuery}
                      onSearch={handleSearch}
                      placeholder="Search for restaurants, tech companies, services..."
                      size="large"
                      buttonText="Search"
                    />
                  </CardBody>
                </Card>

                {/* Popular Searches */}
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <span className="text-sm text-white/70">Popular:</span>
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchQuery(search.value);
                        handleSearch();
                      }}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white transition-all"
                    >
                      {search.icon} {search.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success-400" />
                  <span>2,400+ verified listings</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-success-400" />
                  <span>100% confidential</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-success-400" />
                  <span>4.9/5 rating</span>
                </div>
              </div>
            </div>
          </Container>
        </VideoBackground>

        {/* Quick Filters */}
        <div className="py-12 bg-neutral-50 border-b border-neutral-200">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <Filter className="w-5 h-5 text-neutral-600" />
                <h2 className="text-lg font-semibold text-neutral-900">Browse by Category</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[
                  { icon: '💻', label: 'Technology', count: '320+' },
                  { icon: '🍽️', label: 'Restaurants', count: '450+' },
                  { icon: '🛍️', label: 'Retail', count: '210+' },
                  { icon: '🤝', label: 'Services', count: '340+' },
                  { icon: '🏭', label: 'Manufacturing', count: '280+' },
                  { icon: '⚕️', label: 'Healthcare', count: '120+' },
                ].map((category, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(`/search?category=${category.label.toLowerCase()}`)}
                    className="p-4 bg-white rounded-xl border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all text-center group"
                  >
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <div className="font-medium text-neutral-900 text-sm mb-1">
                      {category.label}
                    </div>
                    <div className="text-xs text-neutral-500">{category.count}</div>
                  </button>
                ))}
              </div>
            </div>
          </Container>
        </div>

        {/* Featured Listings */}
        <div className="py-24 bg-white">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl font-bold text-neutral-900 mb-2">
                    Featured Opportunities
                  </h2>
                  <p className="text-lg text-neutral-600">
                    Handpicked businesses ready for new owners
                  </p>
                </div>
                <Button variant="secondary" onPress={() => navigate('/search')}>
                  View All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredListings.map((listing, index) => (
                  <Card
                    key={index}
                    isPressable
                    onPress={() => navigate('/search')}
                    className="rounded-2xl border border-neutral-200 hover:border-primary-300 hover:shadow-2xl transition-all duration-300 bg-white"
                  >
                    <CardBody className="p-0">
                      <div className="h-48 bg-gradient-to-br from-primary-100 to-calm-100 rounded-t-2xl" />
                      <div className="p-6">
                        <div className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full inline-block mb-3">
                          {listing.category}
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-2">{listing.title}</h3>
                        <div className="flex items-center gap-2 text-neutral-600 text-sm mb-4">
                          <MapPin className="w-4 h-4" />
                          {listing.location}
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="p-3 bg-neutral-50 rounded-lg">
                            <div className="text-xs text-neutral-500 mb-1">Revenue</div>
                            <div className="font-bold text-neutral-900">{listing.revenue}</div>
                          </div>
                          <div className="p-3 bg-neutral-50 rounded-lg">
                            <div className="text-xs text-neutral-500 mb-1">EBITDA</div>
                            <div className="font-bold text-neutral-900">{listing.ebitda}</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                          <div className="text-2xl font-bold text-primary-600">{listing.price}</div>
                          <Button variant="secondary" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </div>

        {/* For Sellers CTA */}
        <div className="py-20 bg-gradient-to-br from-primary-50 to-calm-50">
          <Container>
            <div className="max-w-4xl mx-auto">
              <Card className="rounded-3xl border-2 border-primary-200 shadow-xl bg-white overflow-hidden">
                <CardBody className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-10">
                      <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mb-6">
                        <Building2 className="w-7 h-7 text-primary-600" />
                      </div>
                      <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                        Selling Your Business?
                      </h2>
                      <p className="text-lg text-neutral-600 mb-6">
                        Get a free valuation and explore your options. No pressure, just insights.
                      </p>

                      <div className="space-y-3 mb-8">
                        {[
                          'Free business valuation',
                          'Monthly value insights',
                          'Qualified buyer network',
                          'Expert support',
                        ].map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-success-600" />
                            <span className="text-neutral-700">{item}</span>
                          </div>
                        ))}
                      </div>

                      <Button
                        variant="primary"
                        size="lg"
                        onPress={() => navigate('/for-sellers')}
                        endContent={<ArrowRight className="w-5 h-5" />}
                      >
                        Get Free Valuation
                      </Button>
                    </div>

                    <div className="bg-gradient-to-br from-primary-500 to-calm-500 p-10 flex items-center justify-center">
                      <div className="text-center text-white">
                        <BarChart3 className="w-20 h-20 mx-auto mb-6 opacity-80" />
                        <div className="text-4xl font-bold mb-2">12,000+</div>
                        <div className="text-white/80">Business owners trust Upswitch</div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Container>
        </div>

        {/* Stats */}
        <div className="py-20 bg-white">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                  Why Business Owners Choose Upswitch
                </h2>
                <p className="text-lg text-neutral-600">The trusted platform for European M&A</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { icon: Euro, value: '€840M+', label: 'Total Transactions' },
                  { icon: HandshakeIcon, value: '2,400+', label: 'Successful Exits' },
                  { icon: Users, value: '12,000+', label: 'Active Users' },
                  { icon: TrendingUp, value: '+28%', label: 'Avg Value Increase' },
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

        {/* Final CTA */}
        <div className="py-24 bg-gradient-to-br from-neutral-900 via-primary-900 to-calm-900 text-white">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Start your search today</h2>
              <p className="text-xl text-white/80 mb-12">
                Discover verified businesses across Europe
              </p>

              <Button
                variant="primary"
                size="xl"
                onPress={() => navigate('/search')}
                endContent={<Search className="w-6 h-6" />}
                className="px-12 h-16 text-lg"
              >
                Browse All Businesses
              </Button>

              <p className="text-sm text-white/60 mt-8 flex items-center justify-center gap-2">
                <Heart className="w-4 h-4 text-success-400" />
                Join 12,000+ users on Europe's M&A platform
              </p>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default HomeVariationB;
