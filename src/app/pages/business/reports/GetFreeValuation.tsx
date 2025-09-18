import { authService } from '@/shared/services/auth';
import { User as UserType } from '@/shared/types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Navigation and sidebar are provided by DashboardLayout

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

const GetFreeValuation = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [businessValuation, setBusinessValuation] = useState<BusinessValuation | null>(null);
  const [historicalValuations, setHistoricalValuations] = useState<BusinessValuation[]>([]);
  // Loading states removed for smooth UX

  useEffect(() => {
    const initializePage = async () => {
      // Instant data loading - no loading state
      try {
        const authResult = await authService.checkAuthentication();
        if (authResult.isAuthenticated && authResult.user) {
          setUser(authResult.user);

          // Mock valuation data
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

          // Mock historical valuations
          setHistoricalValuations([
            {
              id: 'valuation-2',
              estimated_value: 780000,
              currency: 'EUR',
              valuation_date: '2023-10-10',
              confidence_level: 'high',
              methodology: 'Comparable Sales Analysis',
              status: 'completed',
              last_updated: '2023-10-15',
              revenue_multiple: 2.8,
              ebitda_multiple: 7.8,
              industry_average: 7.0,
              market_conditions: 'stable',
            },
            {
              id: 'valuation-3',
              estimated_value: 720000,
              currency: 'EUR',
              valuation_date: '2023-07-10',
              confidence_level: 'medium',
              methodology: 'Asset-Based Valuation',
              status: 'completed',
              last_updated: '2023-07-15',
              revenue_multiple: 2.6,
              ebitda_multiple: 7.2,
              industry_average: 6.8,
              market_conditions: 'challenging',
            },
          ]);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error initializing page:', error);
        navigate('/');
      } finally {
        // No loading state to manage
      }
    };

    initializePage();
  }, [navigate]);

  const handleCreateValuation = () => {
    // TODO: Navigate to valuation wizard or open modal
    console.log('Create valuation');
  };

  const handleUpdateValuation = () => {
    // TODO: Navigate to valuation update wizard
    console.log('Update valuation');
  };

  const handleCreateListing = () => {
    navigate('/my-business/listings');
  };

  // Loading screens removed for smooth user experience

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation and sidebar provided by DashboardLayout */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Get Free Valuation</h1>
          <p className="text-gray-600">
            Discover your business value with our professional valuation tools
          </p>
        </div>

        <div className="space-y-6">
          {businessValuation ? (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Current Valuation</h3>
              <p className="text-2xl font-bold text-green-600">
                €{businessValuation.estimated_value.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Last updated: {new Date(businessValuation.valuation_date).toLocaleDateString()}
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No valuation available yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetFreeValuation;
