import { Button } from '@/shared/components/buttons';
import { SearchComponent } from '@/shared/components/filters';
import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { authService } from '@/shared/services/auth';
import { seoData } from '@/shared/utils/seo/seoData';
import { Card, CardBody } from '@heroui/react';
import {
    Car,
    Coffee,
    Factory,
    HeartHandshake,
    Hotel,
    Laptop,
    ShoppingCart,
    Wrench,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../providers/auth-provider';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchType, setSearchType] = useState('businesses'); // 'businesses' or 'franchises'
  const [_email, _setEmail] = useState('');
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
      // console.error('Error checking authentication:', error);
    }
  };

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (searchQuery.trim()) {
      searchParams.set('q', searchQuery.trim());
    }
    navigate(`/search?${searchParams.toString()}`);
  };

  const _handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/account');
    } else {
      openModal('signup');
    }
  };

  return (
    <>
      <SEOHead {...seoData.home} />

      <div className="min-h-screen bg-white">
        {/* Hero Section - Caregiver Style */}
        <div className="relative bg-gradient-to-br from-neutral-100 via-white to-calm-50 py-20 lg:py-32">
          <Container>
            <div className="max-w-7xl mx-auto">
              {/* Main Hero Content */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-tight tracking-tight">
                  Selling your business?
                  <span className="block text-primary-600">We've got you covered</span>
                </h1>

                <p className="text-lg md:text-xl text-neutral-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                  From stress to success — we guide business owners through every step of selling,
                  with care, transparency, and the expertise to protect what you've built.
                </p>

                {/* Enhanced Search Bar */}
                <div className="max-w-3xl mx-auto mb-10">
                  <SearchComponent
                    value={searchQuery}
                    onChange={setSearchQuery}
                    onSearch={handleSearch}
                    placeholder={
                      searchType === 'businesses'
                        ? 'e.g. Restaurant in Brussels, Tech company'
                        : 'e.g. Food franchise, Service franchise'
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

        {/* Popular Categories Section */}
        <div className="py-20 bg-gradient-to-b from-white to-neutral-100">
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

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
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
                    color: 'bg-blue-100 text-blue-600',
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
                    className="group p-6 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 text-center transform hover:-translate-y-1"
                  >
                    <div
                      className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
                    >
                      <category.icon
                        className="w-6 h-6"
                        style={{ stroke: 'currentColor', fill: 'none' }}
                      />
                    </div>
                    <div className="font-medium text-neutral-900 text-sm mb-1">
                      {category.label}
                    </div>
                    <div className="text-xs text-neutral-500">{category.count}</div>
                  </button>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button
                  variant="secondary"
                  onPress={() => navigate('/search')}
                >
                  View All Categories
                </Button>
              </div>
            </div>
          </Container>
        </div>

        {/* Main CTA Section - Caregiver Approach */}
        <div className="py-20 bg-neutral-100">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-8 leading-tight">
                Ready to take the next step?
                <br />
                <span className="text-calm-600">We're here to help</span>
              </h2>
              <p className="text-lg md:text-xl text-neutral-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                Whether you're ready to sell your life's work or looking to acquire your first
                business, we provide the guidance, support, and expertise to make it happen safely
                and successfully. Join thousands of business owners who trust flyp with their most
                important decisions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  variant="primary"
                  size="lg"
                  onPress={() => navigate('/search')}
                >
                  Explore businesses for sale
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onPress={() => openModal('signup')}
                >
                  Get help selling my business
                </Button>
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
        <div className="py-20 bg-gradient-to-br from-neutral-100 to-success-50">
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
        <div className="py-20 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                  Why We Do What We Do
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                  We understand that selling a business isn't just a transaction — it's one of
                  life's biggest decisions. That's why we created flyp: to be the caring guide that
                  business owners need during this important journey.
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
