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
import { User as UserType } from '../../../types/api/users/user';
import UnifiedNavigation from '../../../components/navigation/UnifiedNavigation';
import SellerSidebar from '../../../components/navigation/SellerSidebar';

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
  status: 'completed' | 'pending' | 'expired';
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
  const [user, setUser] = useState<UserType | null>(null);
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
            description: 'Charming French bistro in the heart of Brussels with loyal customer base and prime location.',
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
        action: () => navigate('/account/settings')
      });
    }
    
    if (businessProfile?.is_complete && !businessValuation) {
      steps.push({
        title: 'Get Free Business Valuation',
        description: 'Discover what your business is worth with our professional valuation tool.',
        icon: Calculator,
        actionText: 'Start Valuation',
        action: () => setSelectedTab('valuation')
      });
    }
    
    if (businessValuation?.status === 'completed' && !businessListing) {
      steps.push({
        title: 'Create Your Business Listing',
        description: 'List your business for sale and start attracting qualified buyers.',
        icon: Target,
        actionText: 'Create Listing',
        action: () => navigate('/seller/listings/new')
      });
    }
    
    if (businessListing?.status === 'published' && businessListing.inquiries > 0) {
      steps.push({
        title: 'Review Buyer Inquiries',
        description: `You have ${businessListing.inquiries} inquiries waiting for your response.`,
        icon: MessageSquare,
        actionText: 'View Messages',
        action: () => navigate('/messages')
      });
    }
    
    if (businessListing?.status === 'published' && businessListing.views < 50) {
      steps.push({
        title: 'Optimize Your Listing',
        description: 'Improve your listing visibility and attract more qualified buyers.',
        icon: TrendingUp,
        actionText: 'Optimize Listing',
        action: () => setSelectedTab('listing')
      });
    }
    
    // Default action if all steps are completed
    if (steps.length === 0) {
      steps.push({
        title: 'Monitor Your Listing Performance',
        description: 'Track views, inquiries, and engagement on your business listing.',
        icon: TrendingUp,
        actionText: 'View Analytics',
        action: () => setSelectedTab('listing')
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
        <SellerSidebar selectedTab={selectedTab} onTabChange={setSelectedTab} />

        {/* Main Content Area */}
        <div className="flex-1 px-8 py-8">
          <div className="max-w-6xl space-y-6">
            {/* Overview Tab Content */}
            {selectedTab === 'overview' && (
              <div className="space-y-8">
                {/* Welcome & Business Profile Header */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Welcome back, {user?.name?.split(' ')[0] || 'Business Owner'}! 👋
                      </h1>
                      {businessProfile ? (
                        <div className="space-y-2">
                          <h2 className="text-xl font-semibold text-blue-900">
                            {businessProfile.name}
                          </h2>
                          <div className="flex items-center space-x-4 text-sm text-blue-700">
                            <span>{businessProfile.sector}</span>
                            <span>•</span>
                            <span>{businessProfile.location}</span>
                            <span>•</span>
                            <span>Founded {businessProfile.founded_year}</span>
                            <span>•</span>
                            <span>{businessProfile.employee_count} employees</span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-blue-700">Let's get your business profile set up to begin your selling journey.</p>
                      )}
                    </div>
                    <div className="ml-6">
                      <Building2 className="w-16 h-16 text-blue-600" />
                    </div>
                  </div>
                </div>

                {/* Business Journey Progress */}
                <Card className="border border-gray-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Your Selling Journey</h3>
                      <div className="flex items-center space-x-2 text-sm text-blue-600">
                        <Sparkles className="w-4 h-4" />
                        <span>{getJourneyProgress()}% Complete</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-6">
                      {/* Progress Bar */}
                      <Progress value={getJourneyProgress()} className="w-full" color="primary" />
                      
                      {/* Journey Steps */}
                      <div className="grid md:grid-cols-3 gap-6">
                        {/* Step 1: Business Profile */}
                        <div className="flex items-start space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${businessProfile?.is_complete ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                            {businessProfile?.is_complete ? <CheckCircle className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">Business Profile</h4>
                            <p className="text-sm text-gray-600">Complete your business information</p>
                            {businessProfile?.is_complete && (
                              <p className="text-xs text-green-600 mt-1">✓ Completed</p>
                            )}
                          </div>
                        </div>

                        {/* Step 2: Valuation */}
                        <div className="flex items-start space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${businessValuation?.status === 'completed' ? 'bg-green-100 text-green-600' : businessValuation?.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-400'}`}>
                            {businessValuation?.status === 'completed' ? <CheckCircle className="w-5 h-5" /> : <Calculator className="w-5 h-5" />}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">Free Valuation</h4>
                            <p className="text-sm text-gray-600">Discover your business value</p>
                            {businessValuation?.status === 'completed' && (
                              <p className="text-xs text-green-600 mt-1">✓ Completed: €{businessValuation.estimated_value.toLocaleString()}</p>
                            )}
                          </div>
                        </div>

                        {/* Step 3: Create Listing */}
                        <div className="flex items-start space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${businessListing?.status === 'published' ? 'bg-green-100 text-green-600' : businessListing ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-400'}`}>
                            {businessListing?.status === 'published' ? <CheckCircle className="w-5 h-5" /> : <Target className="w-5 h-5" />}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">Create Listing</h4>
                            <p className="text-sm text-gray-600">List your business for sale</p>
                            {businessListing?.status === 'published' && (
                              <p className="text-xs text-green-600 mt-1">✓ Live: {businessListing.views} views, {businessListing.inquiries} inquiries</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Next Steps / Quick Actions */}
                <Card className="border border-gray-200">
                  <CardHeader className="pb-3">
                    <h3 className="text-lg font-semibold text-gray-900">Recommended Next Steps</h3>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-4">
                      {getNextSteps().map((step, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <step.icon className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-1">{step.title}</h4>
                            <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                            <Button 
                              size="sm" 
                              color="primary" 
                              variant="flat"
                              endContent={<ArrowRight className="w-4 h-4" />}
                              onPress={step.action}
                            >
                              {step.actionText}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>

                {/* Business Performance Summary */}
                {businessListing && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border border-gray-200">
                      <CardHeader className="pb-3">
                        <h3 className="text-lg font-semibold text-gray-900">Listing Performance</h3>
                      </CardHeader>
                      <CardBody>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Eye className="w-5 h-5 text-gray-400" />
                              <span className="text-sm text-gray-600">Total Views</span>
                            </div>
                            <span className="text-lg font-semibold text-gray-900">{businessListing.views}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <MessageSquare className="w-5 h-5 text-gray-400" />
                              <span className="text-sm text-gray-600">Inquiries</span>
                            </div>
                            <span className="text-lg font-semibold text-gray-900">{businessListing.inquiries}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <TrendingUp className="w-5 h-5 text-gray-400" />
                              <span className="text-sm text-gray-600">Conversion Rate</span>
                            </div>
                            <span className="text-lg font-semibold text-gray-900">
                              {businessListing.views > 0 ? ((businessListing.inquiries / businessListing.views) * 100).toFixed(1) : 0}%
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>

                    {businessValuation && (
                      <Card className="border border-gray-200">
                        <CardHeader className="pb-3">
                          <h3 className="text-lg font-semibold text-gray-900">Business Valuation</h3>
                        </CardHeader>
                        <CardBody>
                          <div className="space-y-4">
                            <div className="text-center">
                              <div className="text-3xl font-bold text-green-600 mb-1">
                                €{businessValuation.estimated_value.toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-600">Estimated Market Value</div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Confidence Level:</span>
                                <Chip size="sm" color={businessValuation.confidence_level === 'high' ? 'success' : 'warning'} variant="flat">
                                  {businessValuation.confidence_level.toUpperCase()}
                                </Chip>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Methodology:</span>
                                <span className="font-medium text-gray-900">{businessValuation.methodology}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Valuation Date:</span>
                                <span className="text-gray-900">{new Date(businessValuation.valuation_date).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Valuation Tab Content */}
            {selectedTab === 'valuation' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Valuation</h2>
                  <p className="text-gray-600">Get a professional estimate of your business value</p>
                </div>

                {businessValuation ? (
                  <div className="space-y-6">
                    <Card className="border border-green-200 bg-green-50">
                      <CardHeader>
                        <div className="flex items-center justify-between w-full">
                          <h3 className="text-lg font-semibold text-green-900">Valuation Completed</h3>
                          <Chip color="success" variant="flat" startContent={<CheckCircle className="w-4 h-4" />}>
                            {businessValuation.status.toUpperCase()}
                          </Chip>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <div className="text-center mb-6">
                          <div className="text-4xl font-bold text-green-700 mb-2">
                            €{businessValuation.estimated_value.toLocaleString()}
                          </div>
                          <p className="text-green-600">Estimated Market Value</p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Valuation Date:</span>
                              <span className="font-medium">{new Date(businessValuation.valuation_date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Confidence Level:</span>
                              <Chip size="sm" color={businessValuation.confidence_level === 'high' ? 'success' : 'warning'} variant="flat">
                                {businessValuation.confidence_level.toUpperCase()}
                              </Chip>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Methodology:</span>
                              <span className="font-medium">{businessValuation.methodology}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <Button 
                              color="primary" 
                              variant="flat" 
                              className="w-full"
                              onPress={() => navigate('/seller/listings/new')}
                            >
                              Create Listing Based on Valuation
                            </Button>
                            <Button 
                              variant="bordered" 
                              className="w-full"
                              onPress={() => {/* TODO: Download valuation report */}}
                            >
                              Download Report
                            </Button>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                ) : (
                  <Card>
                    <CardBody className="text-center py-12">
                      <Calculator className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Your Free Valuation</h3>
                      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        Our professional valuation tool uses industry data and financial metrics to provide 
                        an accurate estimate of your business value. This helps you set the right asking price 
                        and attract serious buyers.
                      </p>
                      <div className="space-y-4">
                        <Button color="primary" size="lg" onPress={() => {/* TODO: Start valuation wizard */}}>
                          Start Free Valuation
                        </Button>
                        <p className="text-sm text-gray-500">Takes 5-10 minutes • Completely confidential</p>
                      </div>
                    </CardBody>
                  </Card>
                )}
              </div>
            )}

            {/* Listing Management Tab Content */}
            {selectedTab === 'listing' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Listing Management</h2>
                  <p className="text-gray-600">Manage your business listing and track performance</p>
                </div>

                {businessListing ? (
                  <div className="space-y-6">
                    {/* Listing Status Card */}
                    <Card className="border border-gray-200">
                      <CardHeader>
                        <div className="flex items-center justify-between w-full">
                          <h3 className="text-lg font-semibold text-gray-900">Your Business Listing</h3>
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
                            <h4 className="font-semibold text-gray-900 mb-2">{businessListing.title}</h4>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                              <span>{businessListing.sector}</span>
                              <span>•</span>
                              <span>{businessListing.country}</span>
                              <span>•</span>
                              <span>{formatPrice(businessListing.asking_price, businessListing.currency)}</span>
                              <span>•</span>
                              <span>Listed {new Date(businessListing.created_at).toLocaleDateString()}</span>
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
                              onPress={() => navigate(`/seller/listings/edit?id=${businessListing.id}`)}
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
                          <div className="text-2xl font-bold text-gray-900">{businessListing.views}</div>
                          <p className="text-sm text-gray-600">Total Views</p>
                        </CardBody>
                      </Card>
                      <Card>
                        <CardBody className="text-center">
                          <MessageSquare className="w-8 h-8 text-green-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-gray-900">{businessListing.inquiries}</div>
                          <p className="text-sm text-gray-600">Inquiries Received</p>
                        </CardBody>
                      </Card>
                      <Card>
                        <CardBody className="text-center">
                          <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-gray-900">
                            {businessListing.views > 0 ? ((businessListing.inquiries / businessListing.views) * 100).toFixed(1) : 0}%
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
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Your Business Listing</h3>
                      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        List your business for sale and start attracting qualified buyers. 
                        {businessValuation && ' Based on your valuation, we recommend an asking price range.'}
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
