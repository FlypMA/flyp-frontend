import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Chip, Divider, Progress } from '@heroui/react';
import {
  Plus,
  Building2,
  MessageSquare,
  TrendingUp,
  FileText,
  Settings,
  AlertCircle,
  CheckCircle,
  Clock,
  Search,
  Eye,
  Calculator,
  Target,
  Users,
  DollarSign,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { authService } from '../../../services/users/authenticationService';
import { UserProfile } from '../../../../types/api';
import UnifiedNavigation from '../../../components/navigation/UnifiedNavigation';
import SellerSidebar from '../../../components/navigation/SellerSidebar';
import ValuationDashboard from '../../../components/valuation/ValuationDashboard';
import ValuationReportCard from '../../../components/valuation/ValuationReportCard';

interface Listing {
  id: string;
  title: string;
  status: 'draft' | 'under_review' | 'published' | 'archived';
  views: number;
  inquiries: number;
  created_at: string;
  asking_price?: number;
  currency?: string;
  sector: string;
  country: string;
}

interface BusinessValuation {
  id: string;
  estimated_value: number;
  currency: string;
  valuation_date: string;
  confidence_level: 'high' | 'medium' | 'low';
  methodology: string;
  status: 'completed' | 'in_progress' | 'draft' | 'expired';
  last_updated?: string;
  revenue_multiple?: number;
  ebitda_multiple?: number;
  industry_average?: number;
  market_conditions?: string;
  key_drivers?: string[];
  risk_factors?: string[];
  next_review_date?: string;
}

interface BusinessProfile {
  id: string;
  name: string;
  sector: string;
  founded_year: number;
  employee_count: string;
  annual_revenue?: number;
  description?: string;
  location: string;
  is_complete: boolean;
}

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile | null>(null);
  const [businessValuation, setBusinessValuation] = useState<BusinessValuation | null>(null);
  const [businessListing, setBusinessListing] = useState<Listing | null>(null);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeDashboard = async () => {
      setIsLoading(true);
      try {
        // Get authenticated user
        const authResult = await authService.checkAuthentication();
        if (authResult.isAuthenticated && authResult.user) {
          setUser(authResult.user);

          // TODO: Replace with actual API calls once backend is fully implemented
          // Mock data showing single business journey stages

          // Mock business profile data
          setBusinessProfile({
            id: 'business-1',
            name: 'Café Delice Brussels',
            sector: 'Food & Beverage',
            founded_year: 2008,
            employee_count: '6-10',
            annual_revenue: 450000,
            description:
              'Charming French bistro in the heart of Brussels with loyal customer base and prime location.',
            location: 'Brussels, Belgium',
            is_complete: true,
          });

          // Mock valuation data (completed valuation)
          setBusinessValuation({
            id: 'valuation-1',
            estimated_value: 850000,
            currency: 'EUR',
            valuation_date: '2024-01-10',
            confidence_level: 'high',
            methodology: 'Comparable Sales & DCF Analysis',
            status: 'completed',
            last_updated: '2024-01-15',
            revenue_multiple: 3.2,
            ebitda_multiple: 8.5,
            industry_average: 7.2,
            market_conditions: 'favorable',
            key_drivers: [
              'Strong recurring revenue base',
              'Prime location with long-term lease',
              'Experienced management team',
              'Growing market demand',
              'Proprietary business processes',
            ],
            risk_factors: [
              'Key person dependency',
              'Market competition increasing',
              'Economic uncertainty',
              'Regulatory changes possible',
              'Customer concentration risk',
            ],
            next_review_date: '2024-07-10',
          });

          // Mock listing data (active listing)
          setBusinessListing({
            id: 'listing-1',
            title: 'Established French Bistro - Brussels Center',
            status: 'published',
            views: 245,
            inquiries: 12,
            created_at: '2024-01-15',
            asking_price: 895000,
            currency: 'EUR',
            sector: 'Food & Beverage',
            country: 'BE',
          });
        } else {
          // Redirect to login if not authenticated
          navigate('/');
        }
      } catch (error) {
        console.error('Error initializing dashboard:', error);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    initializeDashboard();
  }, [navigate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'success';
      case 'under_review':
        return 'warning';
      case 'draft':
        return 'default';
      case 'archived':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="w-4 h-4" />;
      case 'under_review':
        return <Clock className="w-4 h-4" />;
      case 'draft':
        return <FileText className="w-4 h-4" />;
      case 'archived':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const formatPrice = (price?: number, currency?: string) => {
    if (!price) return 'Price not set';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'EUR',
    }).format(price);
  };

  const getJourneyProgress = () => {
    let progress = 0;
    if (businessProfile?.is_complete) progress += 33;
    if (businessValuation?.status === 'completed') progress += 33;
    if (businessListing?.status === 'published') progress += 34;
    return progress;
  };

  const getNextSteps = () => {
    const steps = [];

    if (!businessProfile?.is_complete) {
      steps.push({
        title: 'Complete Business Profile',
        description: 'Add your business information to get started with valuation and listing.',
        icon: Building2,
        actionText: 'Complete Profile',
        action: () => navigate('/account/settings'),
      });
    }

    if (businessProfile?.is_complete && !businessValuation) {
      steps.push({
        title: 'Get Free Business Valuation',
        description: 'Discover what your business is worth with our professional valuation tool.',
        icon: Calculator,
        actionText: 'Start Valuation',
        action: () => setSelectedTab('valuation'),
      });
    }

    if (businessValuation?.status === 'completed' && !businessListing) {
      steps.push({
        title: 'Create Your Business Listing',
        description: 'List your business for sale and start attracting qualified buyers.',
        icon: Target,
        actionText: 'Create Listing',
        action: () => navigate('/seller/listings/new'),
      });
    }

    if (businessListing?.status === 'published' && businessListing.inquiries > 0) {
      steps.push({
        title: 'Review Buyer Inquiries',
        description: `You have ${businessListing.inquiries} inquiries waiting for your response.`,
        icon: MessageSquare,
        actionText: 'View Messages',
        action: () => navigate('/messages'),
      });
    }

    if (businessListing?.status === 'published' && businessListing.views < 50) {
      steps.push({
        title: 'Optimize Your Listing',
        description: 'Improve your listing visibility and attract more qualified buyers.',
        icon: TrendingUp,
        actionText: 'Optimize Listing',
        action: () => setSelectedTab('listing'),
      });
    }

    // Default action if all steps are completed
    if (steps.length === 0) {
      steps.push({
        title: 'Monitor Your Listing Performance',
        description: 'Track views, inquiries, and engagement on your business listing.',
        icon: TrendingUp,
        actionText: 'View Analytics',
        action: () => setSelectedTab('listing'),
      });
    }

    return steps;
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">Please log in to access your dashboard.</p>
          <Button color="primary" onPress={() => navigate('/')}>
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <UnifiedNavigation />

      {/* Main Layout with Sidebar */}
      <div className="flex">
        {/* Left Sidebar */}
        <SellerSidebar selectedTab={selectedTab} />

        {/* Main Content Area */}
        <div className="flex-1 px-8 py-8">
          <div className="max-w-6xl space-y-6">
            {/* Overview Tab Content */}
            {selectedTab === 'overview' && (
              <div className="space-y-8">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Welcome back, {user?.full_name?.split(' ')[0] || 'Business Owner'}! 👋
                      </h1>
                      <p className="text-blue-700">
                        Your business intelligence dashboard is ready with valuable insights.
                      </p>
                    </div>
                    <div className="ml-6">
                      <Building2 className="w-16 h-16 text-blue-600" />
                    </div>
                  </div>
                </div>

                {/* Main Business Overview Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Business Hero Card - Left Side (2/3) */}
                  <div className="lg:col-span-2">
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-white via-gray-50 to-blue-50">
                      <CardBody className="p-8">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-white" />
                              </div>
                              {businessProfile && (
                                <div>
                                  <h2 className="text-2xl font-bold text-gray-900">
                                    {businessProfile.name}
                                  </h2>
                                  <p className="text-gray-600 font-medium">
                                    {businessProfile.sector}
                                  </p>
                                </div>
                              )}
                            </div>

                            {businessProfile && (
                              <div className="space-y-4">
                                <p className="text-gray-700 leading-relaxed">
                                  {businessProfile.description}
                                </p>

                                {/* Business Key Facts */}
                                <div className="flex flex-wrap gap-4">
                                  <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-200">
                                    <div className="text-sm text-gray-600">Founded</div>
                                    <div className="font-semibold text-gray-900">
                                      {businessProfile.founded_year}
                                    </div>
                                  </div>
                                  <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-200">
                                    <div className="text-sm text-gray-600">Team</div>
                                    <div className="font-semibold text-gray-900">
                                      {businessProfile.employee_count}
                                    </div>
                                  </div>
                                  <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-200">
                                    <div className="text-sm text-gray-600">Location</div>
                                    <div className="font-semibold text-gray-900">
                                      {businessProfile.location}
                                    </div>
                                  </div>
                                  <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-200">
                                    <div className="text-sm text-gray-600">Revenue</div>
                                    <div className="font-semibold text-gray-900">
                                      €{businessProfile.annual_revenue?.toLocaleString()}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Market Performance Indicators */}
                        {businessListing && (
                          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                            <div className="text-center">
                              <div className="flex items-center justify-center space-x-2 mb-2">
                                <Eye className="w-5 h-5 text-blue-600" />
                                <span className="text-2xl font-bold text-gray-900">
                                  {businessListing.views}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">Total Views</p>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center justify-center space-x-2 mb-2">
                                <MessageSquare className="w-5 h-5 text-green-600" />
                                <span className="text-2xl font-bold text-gray-900">
                                  {businessListing.inquiries}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">Buyer Inquiries</p>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center justify-center space-x-2 mb-2">
                                <TrendingUp className="w-5 h-5 text-purple-600" />
                                <span className="text-2xl font-bold text-gray-900">
                                  {businessListing.views > 0
                                    ? (
                                        (businessListing.inquiries / businessListing.views) *
                                        100
                                      ).toFixed(1)
                                    : 0}
                                  %
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">Interest Rate</p>
                            </div>
                          </div>
                        )}
                      </CardBody>
                    </Card>
                  </div>

                  {/* Ready to Sell CTA - Right Side (1/3) */}
                  <div>
                    <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-600 to-purple-700">
                      <CardBody className="p-6 text-center text-white">
                        <div className="mb-4">
                          <Sparkles className="w-12 h-12 mx-auto mb-4 text-blue-200" />
                          <h3 className="text-xl font-bold mb-2">Ready to Sell?</h3>
                          <p className="text-blue-100 text-sm leading-relaxed">
                            Your business is validated and attracting buyer interest. Take the next
                            step in your entrepreneurial journey.
                          </p>
                        </div>

                        <div className="space-y-3">
                          <Button
                            className="w-full bg-white text-blue-700 font-semibold hover:bg-blue-50"
                            size="lg"
                            endContent={<ArrowRight className="w-4 h-4" />}
                            onPress={() => navigate('/messages')}
                          >
                            Review Buyer Messages
                          </Button>
                          <Button
                            variant="bordered"
                            className="w-full border-white text-white hover:bg-white hover:text-blue-700"
                            endContent={<FileText className="w-4 h-4" />}
                            onPress={() => setSelectedTab('listings')}
                          >
                            Manage Listing
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </div>

                {/* Reports Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
                  </div>

                  {/* Business Valuation Report */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <ValuationReportCard
                      valuation={businessValuation}
                      onRequestValuation={() => setSelectedTab('valuation')}
                      onUpdateValuation={() => setSelectedTab('valuation')}
                      onCreateListing={() => navigate('/seller/listings/new')}
                      className="max-w-none"
                    />

                    {/* Placeholder for future reports */}
                    <Card className="border border-dashed border-gray-300 bg-gray-50">
                      <CardBody className="p-6 text-center">
                        <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <Plus className="w-6 h-6 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                          More Reports Coming Soon
                        </h3>
                        <p className="text-gray-500 text-sm">
                          Additional business intelligence reports will be available here.
                        </p>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* Valuation Tab Content */}
            {selectedTab === 'valuation' && (
              <ValuationDashboard
                currentValuation={businessValuation}
                historicalValuations={[]} // TODO: Add historical data when available
                onCreateValuation={() => {
                  // TODO: Navigate to valuation wizard or open modal
                  console.log('Create valuation');
                }}
                onUpdateValuation={() => {
                  // TODO: Navigate to valuation update wizard
                  console.log('Update valuation');
                }}
                onCreateListing={() => navigate('/seller/listings/new')}
              />
            )}

            {/* Listing Management Tab Content */}
            {selectedTab === 'listing' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Listing Management</h2>
                  <p className="text-gray-600">
                    Manage your business listing and track performance
                  </p>
                </div>

                {businessListing ? (
                  <div className="space-y-6">
                    {/* Listing Status Card */}
                    <Card className="border border-gray-200">
                      <CardHeader>
                        <div className="flex items-center justify-between w-full">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Your Business Listing
                          </h3>
                          <Chip
                            color={getStatusColor(businessListing.status)}
                            variant="flat"
                            startContent={getStatusIcon(businessListing.status)}
                          >
                            {businessListing.status.replace('_', ' ').toUpperCase()}
                          </Chip>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                              {businessListing.title}
                            </h4>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                              <span>{businessListing.sector}</span>
                              <span>•</span>
                              <span>{businessListing.country}</span>
                              <span>•</span>
                              <span>
                                {formatPrice(
                                  businessListing.asking_price,
                                  businessListing.currency
                                )}
                              </span>
                              <span>•</span>
                              <span>
                                Listed {new Date(businessListing.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <Button
                              color="primary"
                              variant="flat"
                              onPress={() => navigate(`/listings/${businessListing.id}`)}
                            >
                              View Public Listing
                            </Button>
                            <Button
                              variant="bordered"
                              startContent={<Settings className="w-4 h-4" />}
                              onPress={() =>
                                navigate(`/seller/listings/edit?id=${businessListing.id}`)
                              }
                            >
                              Edit Listing
                            </Button>
                            {businessListing.inquiries > 0 && (
                              <Button
                                color="success"
                                variant="flat"
                                startContent={<MessageSquare className="w-4 h-4" />}
                                onPress={() => navigate('/messages')}
                              >
                                View Inquiries ({businessListing.inquiries})
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardBody>
                    </Card>

                    {/* Performance Metrics */}
                    <div className="grid md:grid-cols-3 gap-6">
                      <Card>
                        <CardBody className="text-center">
                          <Eye className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-gray-900">
                            {businessListing.views}
                          </div>
                          <p className="text-sm text-gray-600">Total Views</p>
                        </CardBody>
                      </Card>
                      <Card>
                        <CardBody className="text-center">
                          <MessageSquare className="w-8 h-8 text-green-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-gray-900">
                            {businessListing.inquiries}
                          </div>
                          <p className="text-sm text-gray-600">Inquiries Received</p>
                        </CardBody>
                      </Card>
                      <Card>
                        <CardBody className="text-center">
                          <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-gray-900">
                            {businessListing.views > 0
                              ? ((businessListing.inquiries / businessListing.views) * 100).toFixed(
                                  1
                                )
                              : 0}
                            %
                          </div>
                          <p className="text-sm text-gray-600">Conversion Rate</p>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                ) : (
                  <Card>
                    <CardBody className="text-center py-12">
                      <Target className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Create Your Business Listing
                      </h3>
                      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        List your business for sale and start attracting qualified buyers.
                        {businessValuation &&
                          ' Based on your valuation, we recommend an asking price range.'}
                      </p>
                      <Button
                        color="primary"
                        size="lg"
                        onPress={() => navigate('/seller/listings/new')}
                      >
                        Create Business Listing
                      </Button>
                      {!businessValuation && (
                        <p className="text-sm text-gray-500 mt-4">
                          Tip: Complete your business valuation first for better pricing guidance
                        </p>
                      )}
                    </CardBody>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
