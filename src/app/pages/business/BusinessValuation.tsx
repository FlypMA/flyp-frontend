import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/users/authenticationService';
import { User as UserType } from '../../types/api/users/user';
import UnifiedNavigation from '../../components/navigation/UnifiedNavigation';
import SellerSidebar from '../../components/navigation/SellerSidebar';
import ValuationDashboard from '../../components/valuation/ValuationDashboard';

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

const BusinessValuation = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [businessValuation, setBusinessValuation] = useState<BusinessValuation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializePage = async () => {
      setIsLoading(true);
      try {
        // Get authenticated user
        const authResult = await authService.checkAuthentication();
        if (authResult.isAuthenticated && authResult.user) {
          setUser(authResult.user);

          // TODO: Replace with actual API calls once backend is fully implemented
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
        } else {
          // Redirect to login if not authenticated
          navigate('/');
        }
      } catch (error) {
        console.error('Error initializing page:', error);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    initializePage();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading valuation...</p>
        </div>
      </div>
    );
  }

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
      {/* Navigation Header */}
      <UnifiedNavigation />

      {/* Main Layout with Sidebar */}
      <div className="flex">
        {/* Left Sidebar */}
        <SellerSidebar selectedTab="valuation" />

        {/* Main Content Area */}
        <div className="flex-1 px-8 py-8">
          <div className="max-w-6xl space-y-6">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessValuation;
