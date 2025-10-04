/* eslint-disable @typescript-eslint/no-unused-vars */
import { ValuationDashboard, type ValuationReport } from '@/features/phase1/business/valuation';
import ListingNudgeModal from '@/shared/components/modals/domains/business/ListingNudgeModal';
import ValuationModal from '@/shared/components/modals/ValuationModal';
import { AuthenticationService } from '@/shared/services/auth';
import { User } from '@/shared/types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Navigation and sidebar are provided by DashboardLayout

// Types are now imported from business-dashboard features

const BusinessValuation = () => {
  const navigate = useNavigate();
  const authService = new AuthenticationService();
  const [user, setUser] = useState<User | null>(null);
  const [businessValuation, setBusinessValuation] = useState<ValuationReport | null>(null);
  const [historicalValuations, setHistoricalValuations] = useState<ValuationReport[]>([]);
  const [isValuationModalOpen, setIsValuationModalOpen] = useState<boolean>(false);
  const [isListingNudgeModalOpen, setIsListingNudgeModalOpen] = useState<boolean>(false);
  // const [currentValuationData, setCurrentValuationData] = useState<any>(null);
  const [currentBusinessValue, setCurrentBusinessValue] = useState<number>(0);

  // Use business valuation hook
  // const {
  //   inputs,
  //   results,
  //   isLoading: valuationLoading,
  //   calculateValuation,
  //   updateInputs,
  //   saveValuation,
  //   exportValuation,
  // } = useBusinessValuation();
  // Loading states removed for smooth UX

  useEffect(() => {
    const initializePage = async () => {
      // Instant data loading - no loading state
      try {
        // Get authenticated user
        const authResult = await authService.checkAuthentication();
        if (authResult.isAuthenticated && authResult.user) {
          setUser(authResult.user);

          // Load valuation reports from localStorage
          const hasValuationFlag = localStorage.getItem('hasValuationReports');
          if (hasValuationFlag === 'true') {
            const reportsDataString = localStorage.getItem('valuationReports');
            console.log('💰 Loading valuation reports from localStorage:', reportsDataString);
            if (reportsDataString) {
              try {
                const reports = JSON.parse(reportsDataString);
                console.log('✅ Parsed valuation reports:', reports);

                // Set latest report as current valuation
                if (reports.length > 0) {
                  const latest = reports.reduce((prev: any, current: any) => {
                    return new Date(current.date) > new Date(prev.date) ? current : prev;
                  });

                  // Convert to ValuationReport format
                  setBusinessValuation({
                    id: latest.id,
                    estimated_value: latest.businessValue,
                    currency: 'EUR',
                    valuation_date: latest.date,
                    confidence_level: latest.confidence,
                    methodology: latest.method,
                    status: 'completed',
                    last_updated: latest.date,
                    revenue_multiple: latest.revenueMultiple,
                    ebitda_multiple: latest.ebitdaMultiple,
                    industry_average: latest.industryAverage,
                    market_conditions: 'favorable',
                    key_drivers: [],
                    risk_factors: [],
                    next_review_date: new Date(
                      new Date(latest.date).getTime() +
                        latest.monthsValid * 30 * 24 * 60 * 60 * 1000
                    )
                      .toISOString()
                      .split('T')[0],
                  });

                  // Set historical valuations (all except latest)
                  const historical = reports
                    .filter((r: any) => r.id !== latest.id)
                    .map((r: any) => ({
                      id: r.id,
                      estimated_value: r.businessValue,
                      currency: 'EUR',
                      valuation_date: r.date,
                      confidence_level: r.confidence,
                      methodology: r.method,
                      status: 'completed',
                      last_updated: r.date,
                      revenue_multiple: r.revenueMultiple,
                      ebitda_multiple: r.ebitdaMultiple,
                      industry_average: r.industryAverage,
                      market_conditions: 'favorable',
                      key_drivers: [],
                      risk_factors: [],
                      next_review_date: new Date(
                        new Date(r.date).getTime() + r.monthsValid * 30 * 24 * 60 * 60 * 1000
                      )
                        .toISOString()
                        .split('T')[0],
                    }));
                  setHistoricalValuations(historical);
                  console.log('📊 Set current and historical valuations');
                }
              } catch (error) {
                console.error('❌ Failed to parse valuation reports:', error);
              }
            }
          }

          // Fallback: Mock valuation data if no localStorage data (for demo)
          if (!hasValuationFlag || hasValuationFlag !== 'true') {
            console.log('ℹ️ No valuation reports in localStorage, using mock data');
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

            // Mock historical valuations data
            setHistoricalValuations([
              {
                id: 'valuation-hist-1',
                estimated_value: 780000,
                currency: 'EUR',
                valuation_date: '2023-07-10',
                confidence_level: 'medium',
                methodology: 'Comparable Sales Analysis',
                status: 'completed',
                last_updated: '2023-07-15',
                revenue_multiple: 3.0,
                ebitda_multiple: 7.8,
                industry_average: 7.2,
                market_conditions: 'stable',
                key_drivers: [
                  'Steady revenue growth',
                  'Good location',
                  'Established customer base',
                ],
                risk_factors: ['Market competition', 'Economic uncertainty'],
                next_review_date: '2024-01-10',
              },
              {
                id: 'valuation-hist-2',
                estimated_value: 720000,
                currency: 'EUR',
                valuation_date: '2023-01-10',
                confidence_level: 'low',
                methodology: 'Asset-Based Valuation',
                status: 'completed',
                last_updated: '2023-01-15',
                revenue_multiple: 2.8,
                ebitda_multiple: 7.2,
                industry_average: 7.2,
                market_conditions: 'challenging',
                key_drivers: ['Asset value', 'Basic operations'],
                risk_factors: ['Market volatility', 'Limited growth prospects'],
                next_review_date: '2023-07-10',
              },
            ]);
          }
        } else {
          // Redirect to login if not authenticated
          navigate('/');
        }
      } catch (error) {
        navigate('/');
      } finally {
        // No loading state to manage
      }
    };

    initializePage();
  }, [navigate, authService]);

  // Handler functions for Caregiver nudge system
  const handleCreateValuation = () => {
    setIsValuationModalOpen(true);
  };

  const handleListingNudge = (valuationData: unknown, businessValue: number) => {
    // setCurrentValuationData(valuationData);
    setCurrentBusinessValue(businessValue);
    setIsListingNudgeModalOpen(true);
  };

  const handleCreateListingFromNudge = () => {
    setIsListingNudgeModalOpen(false);
    navigate('/my-business');
  };

  // Loading screens removed for smooth UX

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">Please log in to access your valuation.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex-1 px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Business Valuation</h1>
          <p className="mt-2 text-gray-600">
            Get professional business valuations and track your business value over time.
          </p>
        </div>

        {/* Valuation Dashboard */}
        <ValuationDashboard
          currentValuation={businessValuation}
          historicalValuations={historicalValuations}
          onCreateValuation={handleCreateValuation}
          onCreateListing={() => handleListingNudge(null, businessValuation?.estimated_value || 0)}
          onUpdateValuation={() => {
            // TODO: Navigate to valuation update wizard
          }}
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
          businessName={user?.company_name || 'Your Business'}
          industry={user?.industry || 'your industry'}
        />
      </div>
    </div>
  );
};

export default BusinessValuation;
