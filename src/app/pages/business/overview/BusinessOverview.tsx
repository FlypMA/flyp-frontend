// import { useBusinessMetrics } from '@/features/business/hooks';
import { BusinessCardFlow } from '@/features/phase1/business/card';
// import { ListingWizardModal } from '@/features/phase1/business/listing'; // Legacy, using StreamlinedListingModal via navigation now
import { BusinessProfileCard } from '@/shared/components/business';
import { Button } from '@/shared/components/buttons';
import { EmptyStateCard } from '@/shared/components/cards';
import { BusinessProfileModal } from '@/shared/components/modals/domains/business/management/BusinessProfileModal';
import ValuationModal from '@/shared/components/modals/ValuationModal';
import { AuthenticationService } from '@/shared/services/auth';
import { User } from '@/shared/types';
import { Store } from 'lucide-react';
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
  const [hasValuationReports, setHasValuationReports] = useState<boolean>(false);
  const [valuationReports, setValuationReports] = useState<any[]>([]);
  const [hasActiveListing, setHasActiveListing] = useState<boolean>(false);
  const [isBusinessProfileModalOpen, setIsBusinessProfileModalOpen] = useState<boolean>(false);
  const [isListingWizardModalOpen, setIsListingWizardModalOpen] = useState<boolean>(false);
  const [isValuationModalOpen, setIsValuationModalOpen] = useState<boolean>(false);
  // const [businessProfile, setBusinessProfile] = useState<BusinessProfile | null>(null);
  // const [businessValuation, setBusinessValuation] = useState<ValuationReport | null>(null);
  // const [businessListing, setBusinessListing] = useState<Listing | null>(null);
  // Use business dashboard hooks
  // const { metrics, isLoading: metricsLoading } = useBusinessMetrics();
  // Loading states removed for smooth UX

  // NEW: Progressive onboarding state
  const [hasBusinessCard, setHasBusinessCard] = useState<boolean>(false);
  const [hasProfileCard, setHasProfileCard] = useState<boolean>(false);
  const [isEditingBusinessCard, setIsEditingBusinessCard] = useState<boolean>(false);
  const [businessCardData, setBusinessCardData] = useState<any>(null);
  const [profileCardData, setProfileCardData] = useState<any>(null);
  const [latestValuationReport, setLatestValuationReport] = useState<any>(null);

  useEffect(() => {
    const initializeDashboard = async () => {
      // Instant data loading - no loading state
      try {
        // Get authenticated user
        const authService = new AuthenticationService();
        const authResult = await authService.checkAuthentication();
        if (authResult.isAuthenticated && authResult.user) {
          setUser(authResult.user);

          // NEW: Check for business card and profile card completion
          const hasBusinessCardFlag = localStorage.getItem('hasBusinessCard');
          const hasProfileCardFlag = localStorage.getItem('hasProfileCard');
          setHasBusinessCard(hasBusinessCardFlag === 'true');
          setHasProfileCard(hasProfileCardFlag === 'true');

          // Load business card data if it exists
          if (hasBusinessCardFlag === 'true') {
            const businessCardDataString = localStorage.getItem('businessCard');
            console.log('📋 Loading business card from localStorage:', businessCardDataString);
            if (businessCardDataString) {
              try {
                const businessCard = JSON.parse(businessCardDataString);
                console.log('✅ Parsed business card:', businessCard);

                // Store the raw business card data for editing
                setBusinessCardData(businessCard);

                // Convert business card to BusinessInfo format
                const businessInfoData = {
                  name: businessCard.name,
                  industry: businessCard.type, // Using business type as industry for now
                  description: businessCard.description,
                  foundedYear: businessCard.foundedYear,
                  teamSize: businessCard.teamSize,
                  revenue: 0, // Not collected in business card
                  location: businessCard.location,
                  isRemote: businessCard.isRemote,
                  status: 'active' as const,
                };
                console.log('🎴 Setting businessInfo:', businessInfoData);
                setBusinessInfo(businessInfoData);
              } catch (error) {
                console.error('❌ Failed to parse business card data:', error);
              }
            } else {
              console.log('⚠️ No business card data found in localStorage');
            }
          } else {
            console.log('⚠️ hasBusinessCard flag is not true:', hasBusinessCardFlag);
          }

          // Load valuation reports if they exist
          const hasValuationFlag = localStorage.getItem('hasValuationReports');
          if (hasValuationFlag === 'true') {
            const reportsDataString = localStorage.getItem('valuationReports');
            console.log('💰 Loading valuation reports from localStorage:', reportsDataString);
            if (reportsDataString) {
              try {
                const reports = JSON.parse(reportsDataString);
                console.log('✅ Parsed valuation reports:', reports);

                // Transform reports to ensure correct format
                // Handle both new format (from ValuationModal) and old format (legacy)
                const transformedReports = reports.map((report: any) => ({
                  id: report.id || Date.now().toString(),
                  date:
                    report.date || report.generated_date
                      ? new Date(report.date || report.generated_date).toISOString().split('T')[0]
                      : new Date().toISOString().split('T')[0],
                  businessValue: report.businessValue || report.estimated_value || 0,
                  method: report.method || report.methodology || 'Combined Analysis',
                  confidence: report.confidence || report.confidence_level || 'medium',
                  lowRange: report.lowRange || report.value_range_low || 0,
                  highRange: report.highRange || report.value_range_high || 0,
                  revenueMultiple: report.revenueMultiple || report.revenue_multiple || 0,
                  ebitdaMultiple: report.ebitdaMultiple || report.ebitda_multiple || 0,
                  industryAverage: report.industryAverage || report.industry_benchmark || 0,
                  monthsValid: report.monthsValid || 6,
                  inputs: report.inputs || {},
                }));

                setValuationReports(transformedReports);
                setHasValuationReports(true);

                // Set latest valuation report (most recent)
                if (transformedReports.length > 0) {
                  const latest = transformedReports.reduce((prev: any, current: any) => {
                    return new Date(current.date) > new Date(prev.date) ? current : prev;
                  });
                  setLatestValuationReport(latest);
                  console.log('📊 Latest valuation report:', latest);
                }
              } catch (error) {
                console.error('❌ Failed to parse valuation reports:', error);
              }
            }
          } else {
            console.log('⚠️ No valuation reports found');
          }

          // Load profile card data if it exists (TODO: implement profile card creation)
          const hasProfileFlag = localStorage.getItem('hasProfileCard');
          if (hasProfileFlag === 'true') {
            const profileDataString = localStorage.getItem('profileCard');
            if (profileDataString) {
              try {
                const profile = JSON.parse(profileDataString);
                setProfileCardData(profile);
                console.log('👤 Loaded profile card:', profile);
              } catch (error) {
                console.error('❌ Failed to parse profile card:', error);
              }
            }
          }

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
    console.log('✏️ Opening business card edit mode with data:', businessCardData);
    setIsEditingBusinessCard(true);
  };

  const handleSaveBusinessInfo = (data: BusinessInfo) => {
    setBusinessInfo(data);
  };

  const handleCreateValuation = () => {
    setIsValuationModalOpen(true);
  };

  const handleValuationComplete = () => {
    console.log('📊 Valuation completed, reloading valuation data...');
    // Reload valuation reports from localStorage
    const hasValuationFlag = localStorage.getItem('hasValuationReports');
    if (hasValuationFlag === 'true') {
      const reportsDataString = localStorage.getItem('valuationReports');
      if (reportsDataString) {
        try {
          const reports = JSON.parse(reportsDataString);
          console.log('✅ Reloaded valuation reports:', reports);

          // Transform reports (same logic as in useEffect)
          const transformedReports = reports.map((report: any) => ({
            id: report.id || Date.now().toString(),
            date:
              report.date || report.generated_date
                ? new Date(report.date || report.generated_date).toISOString().split('T')[0]
                : new Date().toISOString().split('T')[0],
            businessValue: report.businessValue || report.estimated_value || 0,
            method: report.method || report.methodology || 'Combined Analysis',
            confidence: report.confidence || report.confidence_level || 'medium',
            lowRange: report.lowRange || report.value_range_low || 0,
            highRange: report.highRange || report.value_range_high || 0,
            revenueMultiple: report.revenueMultiple || report.revenue_multiple || 0,
            ebitdaMultiple: report.ebitdaMultiple || report.ebitda_multiple || 0,
            industryAverage: report.industryAverage || report.industry_benchmark || 0,
            monthsValid: report.monthsValid || 6,
            inputs: report.inputs || {},
          }));

          setValuationReports(transformedReports);
          setHasValuationReports(transformedReports.length > 0);

          // Set latest valuation report
          if (transformedReports.length > 0) {
            const latest = transformedReports.reduce((prev: any, current: any) => {
              return new Date(current.date) > new Date(prev.date) ? current : prev;
            });
            setLatestValuationReport(latest);
            console.log('📊 Latest valuation report updated:', latest);
          }
        } catch (error) {
          console.error('❌ Failed to reload valuation reports:', error);
        }
      }
    }
    setIsValuationModalOpen(false);
  };

  const handleListingComplete = () => {
    setHasActiveListing(true);
    setIsListingWizardModalOpen(false);
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
        </div>

        {/* Business Card Section */}
        <div className="mb-12">
          {/* NEW: Progressive Onboarding Flow */}
          {!hasBusinessCard ? (
            <EmptyStateCard
              icon={Store}
              title="Tell us about your business"
              description="Share a few details about your business. This helps us create your profile and show you what your business is worth as you grow on the platform."
              buttonText="Add Your Business"
              onButtonClick={() => navigate('/my-business/card/create')}
            />
          ) : (
            <BusinessProfileCard
              businessInfo={businessInfo}
              onEdit={handleEditBusinessInfo}
              onAddInfo={handleAddBusinessInfo}
              profileCardData={profileCardData}
              hasValuationReports={hasValuationReports}
              latestValuationReport={latestValuationReport}
              valuationReports={valuationReports}
              hasActiveListing={hasActiveListing}
              onCreateValuation={() => setIsValuationModalOpen(true)}
            />
          )}
        </div>

        {/* Business Listings Section */}
        <div className="mb-12">
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
          ) : hasBusinessCard && hasProfileCard && hasValuationReports ? (
            <EmptyStateCard
              icon={Store}
              title="Ready to explore selling opportunities?"
              description="Create a confidential listing to test buyer interest. There are no upfront fees—you only pay when you successfully sell your business."
              buttonText="Create Listing"
              onButtonClick={() => {
                console.log('🚀 Navigating to listing creation with data:', {
                  businessCard: businessCardData,
                  profileCard: profileCardData,
                  valuation: latestValuationReport,
                });
                navigate('/my-business/listings/create');
              }}
            />
          ) : null}
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
      {/* Legacy ListingWizardModal removed - now using navigation to /my-business/listings/create */}

      {/* Valuation Modal */}
      <ValuationModal
        isOpen={isValuationModalOpen}
        onClose={handleValuationComplete}
        onSignupPrompt={() => {}} // Not used for authenticated users
        onComplete={handleValuationComplete}
      />

      {/* Business Card Edit Modal */}
      {isEditingBusinessCard && businessCardData && (
        <BusinessCardFlow
          isOpen={isEditingBusinessCard}
          onClose={() => setIsEditingBusinessCard(false)}
          onComplete={updatedCard => {
            console.log('✅ Business card updated:', updatedCard);
            setBusinessCardData(updatedCard);
            // Convert back to BusinessInfo format
            const updatedBusinessInfo = {
              name: updatedCard.name,
              industry: updatedCard.type,
              description: updatedCard.description,
              foundedYear: updatedCard.foundedYear,
              teamSize: updatedCard.teamSize,
              revenue: 0,
              location: updatedCard.location,
              isRemote: updatedCard.isRemote,
              status: 'active' as const,
            };
            setBusinessInfo(updatedBusinessInfo);
            setIsEditingBusinessCard(false);
          }}
          initialData={businessCardData}
          isEditing={true}
        />
      )}
    </div>
  );
};

export default BusinessOverview;
