import { DashboardStats } from '@/features/business';
import { useBusinessMetrics } from '@/features/business/hooks';
import type { Listing, ValuationReport } from '@/features/business/types';
import { AuthenticationService } from '@/shared/services/auth/Auth';
import { User } from '@/shared/types';
import { Button, Card, CardBody } from '@heroui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Navigation and sidebar are provided by DashboardLayout

// Types are now imported from business-dashboard features

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
  const [user, setUser] = useState<User | null>(null);
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile | null>(null);
  const [businessValuation, setBusinessValuation] = useState<ValuationReport | null>(null);
  const [businessListing, setBusinessListing] = useState<Listing | null>(null);

  // Use business dashboard hooks
  const { metrics, isLoading: metricsLoading } = useBusinessMetrics();
  // Loading states removed for smooth UX

  useEffect(() => {
    const initializeDashboard = async () => {
      // Instant data loading - no loading state
      try {
        // Get authenticated user
        const authService = new AuthenticationService();
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
      } catch {
        // Error initializing dashboard - handled silently for UX
        navigate('/');
        // No loading state to manage
      }
    };

    initializeDashboard();
  }, [navigate]);

  // Loading screens removed for smooth user experience

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
      {/* Main Content Area - Navigation and sidebar provided by DashboardLayout */}
      <div className="flex-1 px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Overview</h1>
          <p className="text-lg text-gray-600">
            Manage your business profile, listings, and reports
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Left: Café Delice Brussels Card (2/3 width) */}
          <div className="lg:col-span-2">
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardBody className="p-8">
                {/* Business Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                      Café Delice Brussels
                    </h2>
                    <p className="text-gray-500 text-base">Food & Beverage</p>
                  </div>
                  <div className="px-3 py-1 bg-gray-100 rounded-full">
                    <span className="text-xs font-medium text-gray-700">ACTIVE LISTING</span>
                  </div>
                </div>

                <p className="text-gray-600 text-base leading-relaxed mb-8">
                  Charming French bistro in the heart of Brussels with loyal customer base and prime
                  location.
                </p>

                {/* Key Facts Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-gray-900 mb-1">2008</div>
                    <div className="text-sm text-gray-500">Founded</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-gray-900 mb-1">6-10</div>
                    <div className="text-sm text-gray-500">Team Size</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-gray-900 mb-1">€450K</div>
                    <div className="text-sm text-gray-500">Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-gray-900 mb-1">Brussels</div>
                    <div className="text-sm text-gray-500">Location</div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="border-t border-gray-100 pt-8">
                  <h3 className="text-base font-medium text-gray-900 mb-6">Market Performance</h3>
                  {metrics && (
                    <DashboardStats
                      performanceData={{
                        totalViews: metrics.listings.views,
                        totalInquiries: metrics.inquiries.total,
                        conversionRate: metrics.inquiries.responseRate,
                        avgTimeOnListing: '3m 24s',
                        uniqueVisitors: Math.round(metrics.listings.views * 0.7),
                        returnVisitors: Math.round(metrics.listings.views * 0.3),
                        topCountries: [
                          { country: 'Belgium', views: Math.round(metrics.listings.views * 0.4) },
                          {
                            country: 'Netherlands',
                            views: Math.round(metrics.listings.views * 0.3),
                          },
                          { country: 'Germany', views: Math.round(metrics.listings.views * 0.2) },
                        ],
                        weeklyViews: [45, 52, 48, 61, 55, 67, 58],
                        weeklyInquiries: [2, 3, 1, 4, 2, 5, 3],
                      }}
                      isLoading={metricsLoading}
                    />
                  )}
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Right: Ready to Sell CTA (1/3 width) */}
          <div>
            <Card className="border border-gray-200 shadow-sm">
              <CardBody className="p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Ready to Sell?</h3>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Your business is validated and attracting buyer interest. Take the next step in
                  your entrepreneurial journey.
                </p>

                <div className="space-y-3">
                  <Button
                    className="w-full bg-blue-600 text-white hover:bg-blue-700"
                    size="lg"
                    onPress={() => navigate('/messages')}
                  >
                    Review Buyer Messages
                  </Button>
                  <Button
                    variant="bordered"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                    size="lg"
                    onPress={() => navigate('/my-business/listings')}
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
            <h2 className="text-xl font-semibold text-gray-900">Reports</h2>
            <Button
              variant="bordered"
              className="text-gray-600 border-gray-300 hover:bg-gray-50"
              size="sm"
              onPress={() => navigate('/my-business/valuation')}
            >
              View All Reports
            </Button>
          </div>

          <div className="grid lg:grid-cols-1 gap-8">
            {/* Business Valuation Report - Full Width */}
            <Card className="border border-gray-200 shadow-sm">
              <CardBody className="p-8">
                {/* Report Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Business Valuation Report
                    </h3>
                    <p className="text-gray-500">
                      Comparable Sales & DCF Analysis • Updated January 14, 2024
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
                      COMPLETED
                    </span>
                    <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
                      HIGH CONFIDENCE
                    </span>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Left: Valuation Summary */}
                  <div>
                    {/* Main Valuation */}
                    <div className="text-center mb-8 p-6 border border-gray-100 rounded-lg">
                      <div className="text-4xl font-semibold text-gray-900 mb-2">€850,000</div>
                      <p className="text-base text-gray-600 mb-6">Estimated Market Value</p>

                      {/* Valuation Range */}
                      <div className="max-w-sm mx-auto">
                        <div className="flex justify-between text-sm text-gray-500 mb-2">
                          <span>Conservative</span>
                          <span>Market</span>
                          <span>Optimistic</span>
                        </div>
                        <div className="relative h-2 bg-gray-200 rounded-full">
                          <div
                            className="absolute h-full bg-gray-900 rounded-full"
                            style={{ width: '60%', left: '20%' }}
                          ></div>
                          <div
                            className="absolute w-3 h-3 bg-gray-900 rounded-full"
                            style={{ left: 'calc(50% - 6px)', top: '-2px' }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                          <span>€680,000</span>
                          <span>€1,020,000</span>
                        </div>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 border border-gray-100 rounded-lg">
                        <div className="text-xl font-semibold text-gray-900 mb-1">3.2x</div>
                        <div className="text-sm text-gray-500">Revenue Multiple</div>
                      </div>
                      <div className="text-center p-4 border border-gray-100 rounded-lg">
                        <div className="text-xl font-semibold text-gray-900 mb-1">8.5x</div>
                        <div className="text-sm text-gray-500">EBITDA Multiple</div>
                      </div>
                      <div className="text-center p-4 border border-gray-100 rounded-lg">
                        <div className="text-xl font-semibold text-gray-900 mb-1">7.2x</div>
                        <div className="text-sm text-gray-500">Industry Avg</div>
                      </div>
                      <div className="text-center p-4 border border-gray-100 rounded-lg">
                        <div className="text-xl font-semibold text-gray-900 mb-1">-13</div>
                        <div className="text-sm text-gray-500">Months Valid</div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions & Info */}
                  <div className="space-y-6">
                    {/* Expiration Notice */}
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        Valuation expires in -13 months
                      </p>
                      <p className="text-sm text-gray-600">
                        Consider updating your valuation to reflect current market conditions.
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button
                        className="bg-blue-600 text-white hover:bg-blue-700"
                        size="lg"
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
                          className="border-gray-300 text-gray-700 hover:bg-gray-50"
                          size="md"
                          onPress={() => navigate('/my-business/valuation')}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>

                    {/* Secondary Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <Button
                        variant="light"
                        className="text-gray-600 hover:text-gray-900"
                        size="sm"
                        onPress={() => navigate('/my-business/valuation')}
                      >
                        Update Valuation
                      </Button>
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="light"
                          className="text-gray-600 hover:text-gray-900"
                          size="sm"
                        >
                          Share
                        </Button>
                        <Button
                          variant="light"
                          className="text-gray-600 hover:text-gray-900"
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
  );
};

export default BusinessOverview;
