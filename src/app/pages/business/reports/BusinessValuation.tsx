import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationService } from '@/shared/services/auth/Auth';
import { User } from '@/shared/types';
import { UrlGenerator } from '@/shared/services';
import { DashboardToolbar, ValuationReportCard } from '@/features/business';
import { useBusinessValuation } from '@/features/business/hooks';
import type { ValuationReport } from '@/features/business/types';
import { Navigation, DashboardSidebar } from '@/shared/components/layout/navigation';

// Types are now imported from business-dashboard features

const BusinessValuation = () => {
  const navigate = useNavigate();
  const authService = new AuthenticationService();
  const [user, setUser] = useState<User | null>(null);
  const [businessValuation, setBusinessValuation] = useState<ValuationReport | null>(null);
  
  // Use business valuation hook
  const { 
    inputs, 
    results, 
    isLoading: valuationLoading, 
    calculateValuation, 
    updateInputs,
    saveValuation,
    exportValuation 
  } = useBusinessValuation();
  // Loading states removed for smooth UX

  useEffect(() => {
    const initializePage = async () => {
      // Instant data loading - no loading state
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
        } else {
          // Redirect to login if not authenticated
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
      {/* Navigation Header */}
        <Navigation />

      {/* Main Layout with Sidebar */}
      <div className="flex">
        {/* Left Sidebar */}
        <DashboardSidebar user={user} />

        {/* Main Content Area */}
        <div className="flex-1 px-8 py-8">
          <div className="max-w-6xl space-y-6">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Business Valuation</h1>
              <p className="mt-2 text-gray-600">
                Get professional business valuations and track your business value over time.
              </p>
            </div>

            {/* Valuation Content */}
            <div className="space-y-6">
              {businessValuation ? (
                <ValuationReportCard
                  report={businessValuation}
                  onView={() => console.log('View valuation')}
                  onDownload={() => console.log('Download valuation')}
                  onShare={() => console.log('Share valuation')}
                  onEdit={() => console.log('Edit valuation')}
                />
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No valuation reports available yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessValuation;
