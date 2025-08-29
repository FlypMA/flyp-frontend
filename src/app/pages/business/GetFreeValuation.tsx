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

const GetFreeValuation = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [businessValuation, setBusinessValuation] = useState<BusinessValuation | null>(null);
  const [historicalValuations, setHistoricalValuations] = useState<BusinessValuation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializePage = async () => {
      setIsLoading(true);
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
        setIsLoading(false);
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
    navigate('/business/listing');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading valuation data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UnifiedNavigation />
      
      <div className="flex">
        <SellerSidebar selectedTab="valuation" onTabChange={(tab) => navigate(`/business/${tab}`)} />
        
        <div className="flex-1 px-8 py-8">
          <div className="max-w-6xl">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Get Free Valuation</h1>
              <p className="text-gray-600">Discover your business value with our professional valuation tools</p>
            </div>

            <ValuationDashboard
              currentValuation={businessValuation}
              historicalValuations={historicalValuations}
              onCreateValuation={handleCreateValuation}
              onUpdateValuation={handleUpdateValuation}
              onCreateListing={handleCreateListing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetFreeValuation;
