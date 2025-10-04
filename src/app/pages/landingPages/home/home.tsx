/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@/shared/components/buttons';
import { SearchComponent } from '@/shared/components/filters';
import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { authService } from '@/shared/services/auth';
import { seoData } from '@/shared/utils/seo/seoData';
import { Card, CardBody } from '@heroui/react';
import {
  AlertCircle,
  Calculator,
  Car,
  CheckCircle,
  Coffee,
  Database,
  Factory,
  HeartHandshake,
  Hotel,
  Laptop,
  Shield,
  ShoppingCart,
  TrendingUp,
  Wrench,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../providers/auth-provider';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchType] = useState('businesses'); // 'businesses' or 'franchises'
  // const [_email, _setEmail] = useState('');

  // Role-based content personalization (defaults to business owner - our primary audience)
  const [selectedRole, setSelectedRole] = useState<'business-owner' | 'buyer-investor'>(
    'business-owner'
  );

  const navigate = useNavigate();
  const { openModal } = useAuth();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const authResult = await authService.checkAuthentication();
      setIsAuthenticated(authResult.isAuthenticated);
    } catch (error) {
      // TODO: Add proper error handling for auth check
    }
  };

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (searchQuery.trim()) {
      searchParams.set('q', searchQuery.trim());
    }
    navigate(`/search?${searchParams.toString()}`);
  };

  // const _handleGetStarted = () => {
  //   if (isAuthenticated) {
  //     navigate('/account');
  //   } else {
  //     openModal('signup');
  //   }
  // };

  return (
    <>
      <SEOHead {...seoData.home} />

      <div className="min-h-screen bg-white">
        {/* Hero Section - Caregiver Style */}
        <div className="relative bg-gradient-to-br from-neutral-100 via-white to-calm-50 py-12 sm:py-16 lg:py-24 xl:py-32">
          <Container>
            <div className="max-w-7xl mx-auto">
              {/* Main Hero Content */}
              <div className="text-center mb-12">
                {/* Role Selector Toggle - Above Headline */}
                <div className="flex justify-center mb-8">
                  <div className="inline-flex bg-neutral-900/10 backdrop-blur-md border border-neutral-300 rounded-full p-1.5 sm:p-2">
                    <button
                      onClick={() => setSelectedRole('business-owner')}
                      className={`px-4 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-xs sm:text-base transition-all duration-200 ${
                        selectedRole === 'business-owner'
                          ? 'bg-white text-primary-900 shadow-lg'
                          : 'text-neutral-700 hover:text-neutral-900'
                      }`}
                    >
                      <span className="hidden sm:inline">I'm a Business Owner</span>
                      <span className="sm:hidden">Owner</span>
                    </button>
                    <button
                      onClick={() => setSelectedRole('buyer-investor')}
                      className={`px-4 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-xs sm:text-base transition-all duration-200 ${
                        selectedRole === 'buyer-investor'
                          ? 'bg-white text-primary-900 shadow-lg'
                          : 'text-neutral-700 hover:text-neutral-900'
                      }`}
                    >
                      <span className="hidden sm:inline">I'm a Buyer/Investor</span>
                      <span className="sm:hidden">Buyer</span>
                    </button>
                  </div>
                </div>

                {/* Dynamic Headline based on role */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-tight tracking-tight">
                  {selectedRole === 'business-owner' ? (
                    <>
                      <span className="text-primary-600 whitespace-normal md:whitespace-nowrap">
                        Know what your business is worth
                      </span>
                    </>
                  ) : (
                    <>
                      Discover verified businesses
                      <span className="block text-primary-600">ready for acquisition</span>
                    </>
                  )}
                </h1>

                {/* Dynamic Subheadline based on role */}
                <p className="text-lg md:text-xl text-neutral-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                  {selectedRole === 'business-owner' ? (
                    <>
                      Then choose your next chapter with confidence. From valuation to closing, we
                      take care of everything, so you don't have to. No upfront fees. No pressure.
                      Just 2.5% when you succeed. Because we're here to help you exit on your terms.
                    </>
                  ) : (
                    <>
                      Access transparent valuations, complete financials, and expert support
                      throughout your acquisition journey.
                      <br className="hidden md:block" />
                      <br className="hidden md:block" />
                      No buyer fees. Ever.
                    </>
                  )}
                </p>

                {/* Enhanced Search Bar */}
                <div className="max-w-3xl mx-auto mb-10">
                  <SearchComponent
                    value={searchQuery}
                    onChange={setSearchQuery}
                    onSearch={handleSearch}
                    placeholder={
                      selectedRole === 'business-owner'
                        ? 'See what similar businesses sold for...'
                        : 'e.g. Restaurant in Brussels, Tech company, SaaS business'
                    }
                    size="large"
                    buttonText="Search"
                  />

                  {/* Popular Searches */}
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    <span className="text-sm text-neutral-500">Popular:</span>
                    {['Restaurants', 'Tech Companies', 'Manufacturing', 'Retail', 'Healthcare'].map(
                      term => (
                        <button
                          key={term}
                          onClick={() => setSearchQuery(term.toLowerCase())}
                          className="text-sm text-primary-600 hover:text-primary-700 underline underline-offset-2"
                        >
                          {term}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Valuation USP Section - Only show for business owners */}
        {selectedRole === 'business-owner' && (
          <div className="py-12 md:py-16 lg:py-20 xl:py-24 bg-white">
            <Container>
              <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-6">
                    <Calculator className="w-4 h-4" />
                    Our Methodology
                  </div>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                    Others overpromise. We keep it real.
                  </h2>

                  <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                    Get a free, honest valuation — not inflated numbers.
                    <br />
                    Our method goes beyond online averages to give you a realistic, data-backed
                    estimate you can trust.
                  </p>
                </div>

                {/* Three-Column Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
                  <Card className="rounded-2xl border border-neutral-200 bg-white hover:shadow-xl transition-all">
                    <CardBody className="p-6 md:p-8">
                      <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mb-4">
                        <Calculator className="w-7 h-7 text-primary-600" />
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-3">
                        Multi-Method Valuation
                      </h3>
                      <p className="text-neutral-600 leading-relaxed">
                        We use 3 proven methods: Revenue Multiples, EBITDA Analysis, and Trend-Based
                        Growth to give you the most accurate picture.
                      </p>
                    </CardBody>
                  </Card>

                  <Card className="rounded-2xl border border-neutral-200 bg-white hover:shadow-xl transition-all">
                    <CardBody className="p-6 md:p-8">
                      <div className="w-14 h-14 bg-calm-100 rounded-2xl flex items-center justify-center mb-4">
                        <Database className="w-7 h-7 text-calm-600" />
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-3">Real Market Data</h3>
                      <p className="text-neutral-600 leading-relaxed">
                        Industry-specific multiples and actual transaction data — not inflated
                        online averages that set false expectations.
                      </p>
                    </CardBody>
                  </Card>

                  <Card className="rounded-2xl border border-neutral-200 bg-white hover:shadow-xl transition-all">
                    <CardBody className="p-6 md:p-8">
                      <div className="w-14 h-14 bg-success-100 rounded-2xl flex items-center justify-center mb-4">
                        <Shield className="w-7 h-7 text-success-600" />
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-3">
                        Transparent Methodology
                      </h3>
                      <p className="text-neutral-600 leading-relaxed">
                        See exactly how we calculate your value. Every assumption, every data
                        source, clearly explained.
                      </p>
                    </CardBody>
                  </Card>
                </div>

                {/* Comparison Table */}
                <div className="bg-gradient-to-br from-neutral-50 to-primary-50 rounded-2xl p-6 md:p-8">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
                    How we compare
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl p-6 border-2 border-neutral-200">
                      <div className="text-sm font-semibold text-neutral-500 mb-2">
                        Online Calculators
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="w-5 h-5 text-warning-600" />
                        <span className="text-xs font-semibold text-warning-700 bg-warning-100 px-2 py-1 rounded">
                          Unrealistic
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600">
                        Generic formulas ignore industry nuances
                      </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 border-2 border-neutral-200">
                      <div className="text-sm font-semibold text-neutral-500 mb-2">
                        Traditional Brokers
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-5 h-5 text-danger-600" />
                        <span className="text-xs font-semibold text-danger-700 bg-danger-100 px-2 py-1 rounded">
                          Overpriced
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600">
                        Inflate values to win your business
                      </p>
                    </div>

                    <div className="bg-primary-50 rounded-xl p-6 border-2 border-primary-400 shadow-lg">
                      <div className="text-sm font-semibold text-primary-900 mb-2">UpSwitch</div>
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="w-5 h-5 text-success-600" />
                        <span className="text-xs font-semibold text-success-700 bg-success-100 px-2 py-1 rounded">
                          Honest
                        </span>
                      </div>
                      <p className="text-sm text-neutral-700 font-medium">
                        Data-backed estimates you can trust
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        )}

        {/* Popular Categories Section */}
        <div className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-neutral-100">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                  We Help Owners in Every Sector
                </h2>
                <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                  From restaurants to tech companies — we understand your industry and connect you
                  with the right buyers who value what you've created.
                </p>
              </div>

              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6">
                {[
                  {
                    icon: Coffee,
                    label: 'Restaurants',
                    count: '450+',
                    color: 'bg-orange-100 text-orange-600',
                  },
                  {
                    icon: Laptop,
                    label: 'Technology',
                    count: '320+',
                    color: 'bg-primary-100 text-primary-600',
                  },
                  {
                    icon: Factory,
                    label: 'Manufacturing',
                    count: '280+',
                    color: 'bg-gray-100 text-gray-600',
                  },
                  {
                    icon: ShoppingCart,
                    label: 'Retail',
                    count: '210+',
                    color: 'bg-green-100 text-green-600',
                  },
                  {
                    icon: Hotel,
                    label: 'Hospitality',
                    count: '180+',
                    color: 'bg-purple-100 text-purple-600',
                  },
                  {
                    icon: Car,
                    label: 'Automotive',
                    count: '150+',
                    color: 'bg-red-100 text-red-600',
                  },
                  {
                    icon: Wrench,
                    label: 'Services',
                    count: '340+',
                    color: 'bg-yellow-100 text-yellow-600',
                  },
                  {
                    icon: HeartHandshake,
                    label: 'Healthcare',
                    count: '120+',
                    color: 'bg-pink-100 text-pink-600',
                  },
                ].map((category, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(`/search?sector=${category.label.toLowerCase()}`)}
                    className="group p-4 sm:p-6 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 text-center transform hover:-translate-y-1"
                  >
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 ${category.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
                    >
                      <category.icon
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        style={{ stroke: 'currentColor', fill: 'none' }}
                      />
                    </div>
                    <div className="font-medium text-neutral-900 text-xs sm:text-sm mb-1">
                      {category.label}
                    </div>
                    <div className="text-xs text-neutral-500">{category.count}</div>
                  </button>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button variant="secondary" onPress={() => navigate('/search')}>
                  View All Categories
                </Button>
              </div>
            </div>
          </Container>
        </div>

        {/* Main CTA Section - Caregiver Approach */}
        <div className="py-12 md:py-16 lg:py-20 bg-neutral-100">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-8 leading-tight">
                {selectedRole === 'business-owner' ? (
                  <>
                    Ready to explore your options?
                    <br />
                    <span className="text-calm-600">Start with a free valuation</span>
                  </>
                ) : (
                  <>
                    Ready to find your next opportunity?
                    <br />
                    <span className="text-calm-600">Browse verified businesses</span>
                  </>
                )}
              </h2>
              <p className="text-lg md:text-xl text-neutral-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                {selectedRole === 'business-owner' ? (
                  <>
                    Get a realistic, data-backed valuation of your business in minutes. No pressure,
                    no obligations — just honest insights to help you plan your next chapter. Join
                    thousands of business owners who trust Upswitch with their most important
                    decisions.
                  </>
                ) : (
                  <>
                    Explore thousands of verified businesses across Europe. Access transparent
                    valuations, complete financials, and expert support throughout your acquisition
                    journey. Find your perfect match with confidence.
                  </>
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {selectedRole === 'business-owner' ? (
                  <>
                    <Button
                      variant="primary"
                      size="lg"
                      onPress={() => navigate('/valuation')}
                      className="!bg-primary-600 !text-white hover:!bg-primary-700 shadow-md hover:shadow-lg transition-all w-full sm:w-auto"
                    >
                      Get Free Valuation
                    </Button>
                    <Button
                      variant="tertiary"
                      size="lg"
                      onPress={() => navigate('/search')}
                      className="!bg-white !text-primary-900 !border-2 !border-neutral-300 hover:!bg-neutral-50 transition-all w-full sm:w-auto"
                    >
                      Or browse businesses
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="primary"
                      size="lg"
                      onPress={() => navigate('/search')}
                      className="!bg-primary-600 !text-white hover:!bg-primary-700 shadow-md hover:shadow-lg transition-all w-full sm:w-auto"
                    >
                      Browse Businesses
                    </Button>
                    <Button
                      variant="tertiary"
                      size="lg"
                      onPress={() => navigate('/valuation')}
                      className="!bg-white !text-primary-900 !border-2 !border-neutral-300 hover:!bg-neutral-50 transition-all w-full sm:w-auto"
                    >
                      Or get a valuation
                    </Button>
                  </>
                )}
              </div>

              {/* Trust indicators */}
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-neutral-500">
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 text-calm-600" />
                  <span>Personal guidance every step</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-success-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-success-600 rounded-full"></div>
                  </div>
                  <span>Verified buyers & sellers only</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  </div>
                  <span>Free confidential valuations</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Recent Sold Businesses Section */}
        <div className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-neutral-100 to-success-50">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                  Success Stories That Matter
                </h2>
                <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                  Real business owners who trusted us with their life's work — and found the perfect
                  new owners to carry their legacy forward.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    name: 'Digital Marketing Agency',
                    location: 'Brussels, BE',
                    price: '€950,000',
                    sector: 'Professional Services',
                  },
                  {
                    name: 'Restaurant Chain',
                    location: 'Amsterdam, NL',
                    price: '€2,200,000',
                    sector: 'Food & Beverage',
                  },
                  {
                    name: 'E-commerce Platform',
                    location: 'Paris, FR',
                    price: '€1,200,000',
                    sector: 'Technology',
                  },
                  {
                    name: 'Manufacturing Company',
                    location: 'Munich, DE',
                    price: '€3,800,000',
                    sector: 'Manufacturing',
                  },
                ].map((business, index) => (
                  <Card
                    key={index}
                    className="border border-neutral-200 rounded-2xl bg-white shadow-sm hover:shadow-lg hover:shadow-neutral-200/50 hover:border-neutral-300 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <CardBody className="p-6">
                      <div className="bg-success-100 text-success-700 text-xs font-semibold px-3 py-1.5 rounded-full inline-block mb-4 shadow-sm">
                        ✓ SUCCESSFULLY SOLD
                      </div>
                      <h4 className="font-semibold text-neutral-900 text-sm mb-2">
                        {business.name}
                      </h4>
                      <div className="text-xs text-neutral-600 mb-2">{business.location}</div>
                      <div className="text-xs text-neutral-600 mb-3">{business.sector}</div>
                      <div className="font-bold text-success-600">{business.price}</div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </div>

        {/* About Us Section - Caregiver Story */}
        <div className="py-12 md:py-16 lg:py-20 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                  Why We Do What We Do
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                  We understand that selling a business isn't just a transaction — it's one of
                  life's biggest decisions. That's why we created Upswitch: to be the caring guide
                  that business owners need during this important journey.
                </p>
                <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                  Every business represents years of hard work, dreams, and dedication. We honor
                  that by providing the personal attention, expert guidance, and genuine care that
                  every business owner deserves when it's time to move on.
                </p>
                <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                  From family restaurants in Brussels to innovative startups in Antwerp, we're here
                  to ensure your business finds the right new owner — someone who will respect and
                  continue the legacy you've built.
                </p>

                {/* Supportive CTA */}
                <div className="mt-12">
                  <Button
                    variant="primary"
                    size="lg"
                    onPress={() => openModal('signup')}
                    className="px-8 py-3 h-14 text-base"
                  >
                    Talk to our team — we're here to help
                  </Button>
                  <p className="text-sm text-neutral-500 mt-3">
                    Free consultation • No pressure • Just honest guidance
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Home;
