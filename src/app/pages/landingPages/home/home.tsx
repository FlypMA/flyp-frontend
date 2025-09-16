import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, Chip, Switch } from '@heroui/react';
import {
  Building2,
  Globe,
  Shield,
  TrendingUp,
  Users,
  Award,
  ArrowRight,
  CheckCircle,
  Star,
  HandHeart,
  Briefcase,
  Target,
  Lock,
  Coffee,
  Laptop,
  Wrench,
  ShoppingCart,
  Car,
  Hotel,
  Factory,
  HeartHandshake,
  Euro,
  Eye,
  Calendar,
  Mail,
  FileText,
  MapPin,
} from 'lucide-react';
import Container from '@/shared/components/layout/container/Container';
import { useAuth } from '../../../providers/auth-provider';
import { authService } from '../../../services/users/authenticationService';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { seoData } from '@/shared/utils/seo/seoData';
import { SearchComponent } from '@/shared/components/filters';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchType, setSearchType] = useState('businesses'); // 'businesses' or 'franchises'
  const [email, setEmail] = useState('');
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
      console.error('Error checking authentication:', error);
    }
  };

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (searchQuery.trim()) {
      searchParams.set('q', searchQuery.trim());
    }
    navigate(`/search?${searchParams.toString()}`);
  };

  const handleGetStarted = () => {
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
        {/* Hero Section - Marketplace Style */}
        <div className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20 lg:py-32">
          <Container>
            <div className="max-w-7xl mx-auto">
              {/* Main Hero Content */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-tight tracking-tight">
                  Find verified businesses
                  <span className="block text-primary-600">for sale in Belgium</span>
                </h1>

                <p className="text-lg md:text-xl text-neutral-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                  Belgium's trusted platform for SME mergers & acquisitions. Connect with qualified
                  buyers and sellers.
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
        <div className="py-20 bg-gradient-to-b from-white to-slate-50">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  Popular Business Categories
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  Discover verified opportunities across Europe's most active sectors
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
                  variant="bordered"
                  className="border-2 border-neutral-300 hover:border-neutral-400"
                  onPress={() => navigate('/search')}
                >
                  View All Categories
                </Button>
              </div>
            </div>
          </Container>
        </div>

        {/* Main CTA Section */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                Buy or sell your
                <br />
                business online
              </h2>
              <p className="text-lg md:text-xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                With over 10,000 entrepreneurs & investors, betweendeals is the largest acquisition
                platform in Belgium. Thousands of entrepreneurs, buyers, investors and advisers
                visit the website every day. If you want to successfully sell a business or take
                over a business, sign up now.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  onPress={() => navigate('/search')}
                  className="font-medium px-8 py-3 h-14 text-base bg-white text-slate-700 hover:bg-gray-100 border border-slate-300 hover:border-slate-400 rounded-lg transition-all duration-200"
                >
                  I want to buy a business
                </Button>
                <Button
                  size="lg"
                  onPress={() => openModal('signup')}
                  className="font-medium px-8 py-3 h-14 text-base bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 hover:border-blue-700 rounded-lg transition-all duration-200"
                >
                  I want to sell a business
                </Button>
              </div>
            </div>
          </Container>
        </div>

        {/* Recent Sold Businesses Section */}
        <div className="py-20 bg-gradient-to-br from-slate-50 to-green-50">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  Recent Successful Sales
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  Real businesses sold through our platform with verified success stories
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
                    className="border border-slate-200 rounded-2xl bg-white shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-300 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <CardBody className="p-6">
                      <div className="bg-success-100 text-success-700 text-xs font-bold px-3 py-1.5 rounded-full inline-block mb-4 shadow-sm">
                        SOLD
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

        {/* About Us Section */}
        <div className="py-20 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                  About betweendeals
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                  Born from the need to modernize European M&A, betweendeals.com started as a
                  platform to connect serious business buyers and sellers across Europe. Since our
                  early days, our passion for facilitating successful business transactions has
                  grown exponentially.
                </p>
                <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                  We're building Belgium's most trusted SME M&A platform, connecting entrepreneurs,
                  investors, and business professionals with verified opportunities.
                </p>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  From cafes in Brussels to tech companies in Antwerp, we're focused on facilitating
                  successful business transactions across Belgium.
                </p>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Home;
