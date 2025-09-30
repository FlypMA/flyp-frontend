// import { useBusinessMetrics } from '@/features/business/hooks';
import { ListingWizardModal } from '@/features/phase1/business/listing';
import { BusinessProfileCard, ValuationCard } from '@/shared/components/business';
import { Button } from '@/shared/components/buttons';
import { EmptyStateCard } from '@/shared/components/cards';
import ListingNudgeModal from '@/shared/components/modals/domains/business/ListingNudgeModal';
import { BusinessProfileModal } from '@/shared/components/modals/domains/business/management/BusinessProfileModal';
import ValuationModal from '@/shared/components/modals/ValuationModal';
import { AuthenticationService } from '@/shared/services/auth';
import { User } from '@/shared/types';
import { Calculator, Store } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Navigation and sidebar are provided by DashboardLayout

// Types are now imported from business-dashboard features

interface BusinessInfo {
  name: string;
  industry: string;
  description: string;
  foundedYear: number;
  teamSize: string;
  revenue: number;
  location: string;
  isRemote: boolean;
  status?: 'active' | 'inactive' | 'draft';
}

const BusinessOverview = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);
  const [hasValuationReports] = useState<boolean>(false);
  const [hasActiveListing, setHasActiveListing] = useState<boolean>(false);
  const [isBusinessProfileModalOpen, setIsBusinessProfileModalOpen] = useState<boolean>(false);
  const [isListingWizardModalOpen, setIsListingWizardModalOpen] = useState<boolean>(false);
  const [isValuationModalOpen, setIsValuationModalOpen] = useState<boolean>(false);
  const [isListingNudgeModalOpen, setIsListingNudgeModalOpen] = useState<boolean>(false);
  // const [currentValuationData] = useState<unknown>(null);
  const [currentBusinessValue, setCurrentBusinessValue] = useState<number>(0);
  // const [businessProfile, setBusinessProfile] = useState<BusinessProfile | null>(null);
  // const [businessValuation, setBusinessValuation] = useState<ValuationReport | null>(null);
  // const [businessListing, setBusinessListing] = useState<Listing | null>(null);
  // Use business dashboard hooks
  // const { metrics, isLoading: metricsLoading } = useBusinessMetrics();
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

          // Mock business profile data - Set to null to show empty state, or uncomment to show filled state
          // setBusinessInfo({
          //   name: 'Café Delice Brussels',
          //   industry: 'Food & Beverage',
          //   description: 'Charming French bistro in the heart of Brussels with loyal customer base and prime location.',
          //   foundedYear: 2008,
          //   teamSize: '6-10',
          //   revenue: 450000,
          //   location: 'Brussels',
          //   status: 'active',
          // });

          // Mock valuation data (completed valuation)
          // setBusinessValuation({
          //   id: 'valuation-1',
          //   estimated_value: 850000,
          //   currency: 'EUR',
          //   valuation_date: '2024-01-10',
          //   confidence_level: 'high',
          //   methodology: 'Comparable Sales & DCF Analysis',
          //   status: 'completed',
          //   last_updated: '2024-01-15',
          //   revenue_multiple: 3.2,
          //   ebitda_multiple: 8.5,
          //   industry_average: 7.2,
          //   market_conditions: 'favorable',
          //   key_drivers: [
          //     'Strong recurring revenue base',
          //     'Prime location with long-term lease',
          //     'Experienced management team',
          //     'Growing market demand',
          //     'Proprietary business processes',
          //   ],
          //   risk_factors: [
          //     'Key person dependency',
          //     'Market competition increasing',
          //     'Economic uncertainty',
          //     'Regulatory changes possible',
          //     'Customer concentration risk',
          //   ],
          //   next_review_date: '2024-07-10',
          // });

          // Mock listing data (active listing)
          // setBusinessListing({
          //   id: 'listing-1',
          //   title: 'Established French Bistro - Brussels Center',
          //   status: 'published',
          //   views: 245,
          //   inquiries: 12,
          //   created_at: '2024-01-15',
          //   asking_price: 895000,
          //   currency: 'EUR',
          //   sector: 'Food & Beverage',
          //   country: 'BE',
          // });
        } else {
          // Redirect to login if not authenticated
          navigate('/');
        }
      } catch (error) {
        // Error initializing dashboard - handled silently for UX
        navigate('/');
        // No loading state to manage
      }
    };

    initializeDashboard();

    // Listen for custom event from dropdown to open listing wizard modal
    const handleOpenListingWizard = () => {
      setIsListingWizardModalOpen(true);
    };

    window.addEventListener('open-listing-wizard', handleOpenListingWizard);

    // Cleanup event listener
    return () => {
      window.removeEventListener('open-listing-wizard', handleOpenListingWizard);
    };
  }, [navigate]);

  const handleAddBusinessInfo = () => {
    setIsBusinessProfileModalOpen(true);
  };

  const handleEditBusinessInfo = () => {
    setIsBusinessProfileModalOpen(true);
  };

  const handleSaveBusinessInfo = (data: BusinessInfo) => {
    setBusinessInfo(data);
  };

  const handleCreateValuation = () => {
    setIsValuationModalOpen(true);
  };

  const handleListingComplete = () => {
    setHasActiveListing(true);
    setIsListingWizardModalOpen(false);
  };

  const handleListingNudge = (valuationData: unknown, businessValue: number) => {
    setCurrentBusinessValue(businessValue);
    setIsListingNudgeModalOpen(true);
  };

  const handleCreateListingFromNudge = () => {
    setIsListingNudgeModalOpen(false);
    setIsListingWizardModalOpen(true);
  };

  // Loading screens removed for smooth user experience

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">Please log in to access your dashboard.</p>
          <Button variant="primary" onPress={() => navigate('/')}>
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content Area - Navigation and sidebar provided by DashboardLayout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My business</h1>
          <p className="text-lg text-gray-600">
            Manage your business profile, listings, and reports
          </p>
        </div>

        {/* Business Profile Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Business Profile</h2>
          </div>
          <BusinessProfileCard
            businessInfo={businessInfo}
            onEdit={handleEditBusinessInfo}
            onAddInfo={handleAddBusinessInfo}
          />
        </div>

        {/* Reports Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Reports</h2>
          </div>
          {hasValuationReports ? (
            <>
              {/* Sample Valuation Report */}
              <ValuationCard
                id="sample-1"
                date="2024-01-14"
                businessValue={850000}
                method="Comparable Sales & DCF Analysis"
                confidence="high"
                lowRange={680000}
                highRange={1020000}
                revenueMultiple={3.2}
                ebitdaMultiple={8.5}
                industryAverage={7.2}
                monthsValid={-13}
                onView={() => navigate('/my-business/valuations')}
                onUpdate={() => navigate('/my-business/valuations')}
                onCreateListing={() => handleListingNudge(null, 850000)}
              />
              {/* Additional sample reports could go here */}
            </>
          ) : (
            <EmptyStateCard
              icon={Calculator}
              title="Create Your Business Valuation"
              description="Get a professional valuation of your business to understand its market worth."
              buttonText="Get Valuation"
              onButtonClick={handleCreateValuation}
            />
          )}
        </div>

        {/* Business Listings Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Listings</h2>
          </div>
          {hasActiveListing ? (
            <>
              {/* Enhanced Active Listing Card - Airbnb Style */}
              <div className="relative w-full h-full bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300">
                {/* Background visual element */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-30"></div>

                {/* Content container */}
                <div className="relative w-full h-full flex flex-col p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">
                        {businessInfo?.name || 'Your Business'} - Confidential Listing
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Created on {new Date().toLocaleDateString()} • Asking Price: €1,200,000
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                      Active
                    </span>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900">24</div>
                      <div className="text-xs text-gray-600">Views</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900">3</div>
                      <div className="text-xs text-gray-600">Inquiries</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900">2</div>
                      <div className="text-xs text-gray-600">NDAs Signed</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center transition-all duration-200 ease-in-out focus:outline-none focus:ring-3 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed border-0 outline-none cursor-pointer relative overflow-hidden bg-primary-500 text-white font-semibold hover:bg-primary-600 focus:ring-primary-500/30 shadow-sm hover:shadow-md active:scale-[0.98] px-4 py-2 text-sm h-9 rounded-lg"
                    >
                      View Public Listing
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center transition-all duration-200 ease-in-out focus:outline-none focus:ring-3 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 outline-none cursor-pointer relative overflow-hidden bg-white text-gray-700 font-medium hover:bg-gray-50 focus:ring-gray-500/30 shadow-sm hover:shadow-md active:scale-[0.98] px-3 py-2 text-sm h-8 rounded-lg"
                    >
                      Edit Details
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center transition-all duration-200 ease-in-out focus:outline-none focus:ring-3 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 outline-none cursor-pointer relative overflow-hidden bg-white text-gray-700 font-medium hover:bg-gray-50 focus:ring-gray-500/30 shadow-sm hover:shadow-md active:scale-[0.98] px-3 py-2 text-sm h-8 rounded-lg"
                    >
                      View Inquiries
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center transition-all duration-200 ease-in-out focus:outline-none focus:ring-3 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 outline-none cursor-pointer relative overflow-hidden bg-white text-gray-700 font-medium hover:bg-gray-50 focus:ring-gray-500/30 shadow-sm hover:shadow-md active:scale-[0.98] px-3 py-2 text-sm h-8 rounded-lg"
                    >
                      Analytics
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center transition-all duration-200 ease-in-out focus:outline-none focus:ring-3 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 outline-none cursor-pointer relative overflow-hidden bg-white text-gray-700 font-medium hover:bg-gray-50 focus:ring-gray-500/30 shadow-sm hover:shadow-md active:scale-[0.98] px-3 py-2 text-sm h-8 rounded-lg"
                    >
                      Share Listing
                    </button>
                  </div>
                </div>
              </div>
              {/* Additional listing cards could go here */}
            </>
          ) : (
            <EmptyStateCard
              icon={Store}
              title="Create Your Business Listing"
              description="Ready to explore selling opportunities? Create a confidential listing to see what interest your business generates."
              buttonText="Create Listing"
              onButtonClick={() => setIsListingWizardModalOpen(true)}
            />
          )}
        </div>
      </div>

      {/* Business Profile Modal */}
      <BusinessProfileModal
        isOpen={isBusinessProfileModalOpen}
        onClose={() => setIsBusinessProfileModalOpen(false)}
        onSave={handleSaveBusinessInfo}
        initialData={businessInfo || undefined}
      />

      {/* Listing Wizard Modal */}
      <ListingWizardModal
        isOpen={isListingWizardModalOpen}
        onClose={() => setIsListingWizardModalOpen(false)}
        onComplete={handleListingComplete}
        businessInfo={businessInfo}
      />

      {/* Valuation Modal */}
      <ValuationModal
        isOpen={isValuationModalOpen}
        onClose={() => setIsValuationModalOpen(false)}
        onSignupPrompt={() => {}} // Not used for authenticated users
        onComplete={() => {}} // Fallback
      />

      {/* Listing Nudge Modal */}
      <ListingNudgeModal
        isOpen={isListingNudgeModalOpen}
        onClose={() => setIsListingNudgeModalOpen(false)}
        onCreateListing={handleCreateListingFromNudge}
        businessValue={currentBusinessValue}
        businessName={businessInfo?.name || 'Your Business'}
        industry={businessInfo?.industry || 'your industry'}
      />
    </div>
  );
};

export default BusinessOverview;
