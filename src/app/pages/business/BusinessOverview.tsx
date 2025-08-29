import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody } from '@heroui/react';
import {
  Plus,
  Building2,
  MessageSquare,
  TrendingUp,
  FileText,
  Eye,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { authService } from '../../services/users/authenticationService';
import { User as UserType } from '../../types/api/users/user';
import UnifiedNavigation from '../../components/navigation/UnifiedNavigation';
import SellerSidebar from '../../components/navigation/SellerSidebar';
import ValuationReportCard from '../../components/valuation/ValuationReportCard';

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

const BusinessOverview = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile | null>(null);
  const [businessValuation, setBusinessValuation] = useState<BusinessValuation | null>(null);
  const [businessListing, setBusinessListing] = useState<Listing | null>(null);
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
              'Proprietary business processes'
            ],
            risk_factors: [
              'Key person dependency',
              'Market competition increasing',
              'Economic uncertainty',
              'Regulatory changes possible',
              'Customer concentration risk'
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
        <SellerSidebar selectedTab="overview" />

        {/* Main Content Area */}
        <div className="flex-1 px-8 py-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Overview</h1>
              <p className="text-lg text-gray-600">Manage your business profile, listings, and reports</p>
            </div>

            {/* Main Grid Layout */}
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              
              {/* Left: Café Delice Brussels Card (2/3 width) */}
              <div className="lg:col-span-2">
                <Card className="overflow-hidden border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-300">
                  <CardBody className="p-0">
                    {/* Hero Section with Background */}
                    <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 p-8 text-white">
                      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
                      <div className="relative">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                              <Building2 className="w-8 h-8 text-white" />
                            </div>
                            <div>
                              <h2 className="text-3xl font-bold mb-1">Café Delice Brussels</h2>
                              <p className="text-blue-100 text-lg font-medium">Food & Beverage</p>
                            </div>
                          </div>
                          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                            <span className="text-sm font-semibold">ACTIVE LISTING</span>
                          </div>
                        </div>
                        
                        <p className="text-blue-100 text-lg leading-relaxed mb-6 max-w-2xl">
                          Charming French bistro in the heart of Brussels with loyal customer base and prime location.
                        </p>
                      </div>
                    </div>

                    {/* Business Details Section */}
                    <div className="p-8">
                      {/* Key Facts Grid */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                          <div className="text-2xl font-bold text-gray-900 mb-1">2008</div>
                          <div className="text-sm text-gray-600 font-medium">Founded</div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                          <div className="text-2xl font-bold text-gray-900 mb-1">6-10</div>
                          <div className="text-sm text-gray-600 font-medium">Team Size</div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                          <div className="text-2xl font-bold text-gray-900 mb-1">€450K</div>
                          <div className="text-sm text-gray-600 font-medium">Revenue</div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                          <div className="text-2xl font-bold text-gray-900 mb-1">Brussels</div>
                          <div className="text-sm text-gray-600 font-medium">Location</div>
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      <div className="border-t border-gray-100 pt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Performance</h3>
                        <div className="grid grid-cols-3 gap-6">
                          <div className="text-center">
                            <div className="flex items-center justify-center space-x-2 mb-2">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <Eye className="w-5 h-5 text-blue-600" />
                              </div>
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-1">245</div>
                            <div className="text-sm text-gray-600 font-medium">Total Views</div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center space-x-2 mb-2">
                              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <MessageSquare className="w-5 h-5 text-green-600" />
                              </div>
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
                            <div className="text-sm text-gray-600 font-medium">Buyer Inquiries</div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center space-x-2 mb-2">
                              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-purple-600" />
                              </div>
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-1">4.9%</div>
                            <div className="text-sm text-gray-600 font-medium">Interest Rate</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
              
              {/* Right: Ready to Sell CTA (1/3 width) */}
              <div>
                <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-emerald-500 to-teal-600 hover:shadow-2xl transition-all duration-300">
                  <CardBody className="p-8 text-white text-center">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
                        <Sparkles className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">Ready to Sell?</h3>
                      <p className="text-emerald-100 leading-relaxed">
                        Your business is validated and attracting buyer interest. 
                        Take the next step in your entrepreneurial journey.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <Button
                        className="w-full bg-white text-emerald-700 font-semibold hover:bg-emerald-50 shadow-lg"
                        size="lg"
                        endContent={<ArrowRight className="w-5 h-5" />}
                        onPress={() => navigate('/messages')}
                      >
                        Review Buyer Messages
                      </Button>
                      <Button
                        variant="bordered"
                        className="w-full border-white/60 text-white hover:bg-white/10 backdrop-blur-sm"
                        size="lg"
                        endContent={<FileText className="w-5 h-5" />}
                        onPress={() => navigate('/business/listings')}
                      >
                        Manage Listing
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>

            {/* Reports Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
                <Button
                  variant="bordered"
                  className="text-gray-600 border-gray-300"
                  endContent={<Plus className="w-4 h-4" />}
                  onPress={() => navigate('/business/valuation')}
                >
                  New Report
                </Button>
              </div>

              <div className="grid lg:grid-cols-1 gap-8">
                {/* Business Valuation Report - Full Width */}
                <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-2xl transition-all duration-300">
                  <CardBody className="p-8">
                    {/* Report Header */}
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <path d="m9 11 3 3L22 4"></path>
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-1">Business Valuation Report</h3>
                          <p className="text-gray-600">Comparable Sales & DCF Analysis • Updated January 14, 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                          COMPLETED
                        </span>
                        <span className="inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                          HIGH CONFIDENCE
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Left: Valuation Summary */}
                      <div>
                        {/* Main Valuation */}
                        <div className="text-center mb-8 p-6 bg-white rounded-2xl shadow-sm border border-green-100">
                          <div className="flex items-center justify-center space-x-3 mb-3">
                            <div className="w-10 h-10 text-green-600">
                              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" x2="12" y1="2" y2="22"></line>
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                              </svg>
                            </div>
                            <span className="text-5xl font-bold text-gray-900">€850,000</span>
                          </div>
                          <p className="text-xl text-gray-600 font-medium mb-4">Estimated Market Value</p>
                          
                          {/* Valuation Range */}
                          <div className="max-w-sm mx-auto">
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                              <span className="font-medium">Conservative</span>
                              <span className="font-medium">Market</span>
                              <span className="font-medium">Optimistic</span>
                            </div>
                            <div className="relative h-3 bg-gray-200 rounded-full">
                              <div className="absolute h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full" style={{width: '60%', left: '20%'}}></div>
                              <div className="absolute w-5 h-5 bg-green-600 rounded-full border-3 border-white shadow-lg" style={{left: 'calc(50% - 10px)', top: '-4px'}}></div>
                            </div>
                            <div className="flex justify-between text-sm text-gray-500 mt-2 font-medium">
                              <span>€680,000</span>
                              <span>€1,020,000</span>
                            </div>
                          </div>
                        </div>

                        {/* Key Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-green-100">
                            <div className="text-2xl font-bold text-gray-900 mb-1">3.2x</div>
                            <div className="text-sm text-gray-600 font-medium">Revenue Multiple</div>
                          </div>
                          <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-green-100">
                            <div className="text-2xl font-bold text-gray-900 mb-1">8.5x</div>
                            <div className="text-sm text-gray-600 font-medium">EBITDA Multiple</div>
                          </div>
                          <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-green-100">
                            <div className="text-2xl font-bold text-gray-900 mb-1">7.2x</div>
                            <div className="text-sm text-gray-600 font-medium">Industry Avg</div>
                          </div>
                          <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-orange-100">
                            <div className="flex items-center justify-center space-x-1 mb-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M8 2v4"></path>
                                <path d="M16 2v4"></path>
                                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                                <path d="M3 10h18"></path>
                              </svg>
                              <div className="text-2xl font-bold text-orange-600">-13</div>
                            </div>
                            <div className="text-sm text-gray-600 font-medium">Months Valid</div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Actions & Alerts */}
                      <div className="space-y-6">
                        {/* Expiration Alert */}
                        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 text-orange-600 mt-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" x2="12" y1="8" y2="12"></line>
                                <line x1="12" x2="12.01" y1="16" y2="16"></line>
                              </svg>
                            </div>
                            <div>
                              <p className="font-semibold text-orange-800 mb-1">Valuation expires in -13 months</p>
                              <p className="text-sm text-orange-700">Consider updating your valuation to reflect current market conditions.</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="space-y-3">
                          <Button 
                            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold shadow-lg"
                            size="lg"
                            startContent={<Building2 className="w-5 h-5" />}
                            onPress={() => navigate('/seller/listings/new')}
                          >
                            Create Listing
                          </Button>
                          <div className="grid grid-cols-2 gap-3">
                            <Button 
                              variant="bordered" 
                              className="border-gray-300 text-gray-700 hover:bg-gray-50"
                              size="md"
                            >
                              Download Report
                            </Button>
                            <Button 
                              variant="bordered" 
                              className="border-blue-300 text-blue-700 hover:bg-blue-50"
                              size="md"
                              onPress={() => navigate('/business/valuation')}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>

                        {/* Secondary Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <Button 
                            variant="light" 
                            className="text-gray-600 hover:text-gray-800 font-medium"
                            onPress={() => navigate('/business/valuation')}
                          >
                            Update Valuation
                          </Button>
                          <div className="flex items-center space-x-3">
                            <Button 
                              variant="light" 
                              className="text-gray-600 hover:text-gray-800"
                              size="sm"
                            >
                              Share
                            </Button>
                            <Button 
                              variant="light" 
                              className="text-gray-600 hover:text-gray-800"
                              size="sm"
                            >
                              Guide
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessOverview;