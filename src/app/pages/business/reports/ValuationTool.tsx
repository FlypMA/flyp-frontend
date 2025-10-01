/**
 * 💰 Business Valuation Tool - Dashboard Version
 * Location: src/app/pages/business/reports/ValuationTool.tsx
 * Purpose: Professional business valuation tool for authenticated users
 *
 * Features:
 * - Empty state with valuation modal integration
 * - Display existing valuation reports with dates
 * - Professional reporting
 * - Data persistence
 */

import { ValuationCard } from '@/shared/components/business';
import { Button } from '@/shared/components/buttons';
import ValuationModal from '@/shared/components/modals/ValuationModal';
import { Calculator } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../providers/auth-provider';

interface ValuationReport {
  id: string;
  date: string;
  businessValue: number;
  method: string;
  confidence: 'high' | 'medium' | 'low';
  lowRange: number;
  highRange: number;
  revenueMultiple: number;
  ebitdaMultiple: number;
  industryAverage: number;
  monthsValid: number;
  inputs: {
    businessType: string;
    sharesForSale: number;
    revenue2025: number;
    revenue2024: number;
    revenue2023: number;
    ebitda2025: number;
    ebitda2024: number;
    ebitda2023: number;
    marketMultiplier: number;
  };
}

const ValuationTool: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isValuationModalOpen, setIsValuationModalOpen] = useState(false);
  const [valuationReports, setValuationReports] = useState<ValuationReport[]>([]);

  // Load existing valuation reports from localStorage
  useEffect(() => {
    console.log('📊 Loading valuation reports from localStorage...');

    const valuationReportsRaw = localStorage.getItem('valuationReports');
    if (valuationReportsRaw) {
      try {
        const reports = JSON.parse(valuationReportsRaw);
        console.log('✅ Valuation reports loaded:', reports);

        // Transform the reports to match the expected format
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
          inputs: report.inputs || {
            businessType: report.business_type || '',
            sharesForSale: report.shares_for_sale || 100,
            revenue2025: report.revenue_trend?.[2] || 0,
            revenue2024: report.revenue_trend?.[1] || 0,
            revenue2023: report.revenue_trend?.[0] || 0,
            ebitda2025: report.ebitda_trend?.[2] || 0,
            ebitda2024: report.ebitda_trend?.[1] || 0,
            ebitda2023: report.ebitda_trend?.[0] || 0,
            marketMultiplier: 1,
          },
        }));

        setValuationReports(transformedReports);
      } catch (error) {
        console.error('❌ Error parsing valuation reports:', error);
        setValuationReports([]);
      }
    } else {
      console.log('📭 No valuation reports found in localStorage');
      setValuationReports([]);
    }
  }, []);

  const handleOpenValuationModal = () => {
    setIsValuationModalOpen(true);
  };

  const handleCloseValuationModal = () => {
    setIsValuationModalOpen(false);
  };

  const handleValuationComplete = (valuationReport: any) => {
    console.log('✅ Valuation completed:', valuationReport);

    // The ValuationModal already saves to localStorage,
    // so we just need to reload the reports from localStorage
    const valuationReportsRaw = localStorage.getItem('valuationReports');
    if (valuationReportsRaw) {
      try {
        const reports = JSON.parse(valuationReportsRaw);

        // Transform the reports to match the expected format
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
          inputs: report.inputs || {
            businessType: report.business_type || '',
            sharesForSale: report.shares_for_sale || 100,
            revenue2025: report.revenue_trend?.[2] || 0,
            revenue2024: report.revenue_trend?.[1] || 0,
            revenue2023: report.revenue_trend?.[0] || 0,
            ebitda2025: report.ebitda_trend?.[2] || 0,
            ebitda2024: report.ebitda_trend?.[1] || 0,
            ebitda2023: report.ebitda_trend?.[0] || 0,
            marketMultiplier: 1,
          },
        }));

        setValuationReports(transformedReports);
      } catch (error) {
        console.error('❌ Error reloading valuation reports:', error);
      }
    }

    setIsValuationModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header - Mobile Responsive */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Business Valuation Reports
              </h1>
              <p className="text-base sm:text-lg text-gray-600">
                Track your business value over time with professional valuations
              </p>
            </div>
            <Button
              variant="primary"
              startContent={<Calculator className="w-4 h-4" />}
              onPress={handleOpenValuationModal}
              className="w-full sm:w-auto flex-shrink-0"
            >
              New Valuation
            </Button>
          </div>
        </div>

        {/* Content */}
        {valuationReports.length === 0 ? (
          // Empty State - Airbnb Style
          <div className="relative w-full h-full bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300">
            {/* Background visual element */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 opacity-50"></div>

            {/* Content container */}
            <div className="relative w-full h-full flex flex-col p-6">
              {/* Spacer for visual balance */}
              <div className="flex-1"></div>

              {/* Main content area */}
              <div className="text-center flex-1 flex flex-col justify-center">
                {/* Icon container */}
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calculator className="w-6 h-6 text-primary-600" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Create Your Business Valuation
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-4 text-sm flex-1">
                  Get a professional valuation of your business to understand its market worth.
                </p>

                {/* CTA Button - Airbnb style */}
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleOpenValuationModal}
                    className="inline-flex items-center justify-center transition-all duration-200 ease-in-out focus:outline-none focus:ring-3 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed border-0 outline-none cursor-pointer relative overflow-hidden bg-primary-500 text-white font-semibold hover:bg-primary-600 focus:ring-primary-500/30 shadow-sm hover:shadow-md active:scale-[0.98] px-4 py-3 sm:py-2 text-sm min-h-[44px] sm:h-9 rounded-lg"
                    style={
                      {
                        '--dls-button-or-anchor-width-px': '166.9375',
                        '--dls-button-or-anchor-height-px': '40',
                      } as React.CSSProperties
                    }
                  >
                    <span className="flex items-center justify-center opacity-100">
                      <span className="mr-2">
                        <Calculator className="w-4 h-4" />
                      </span>
                      Get Valuation
                    </span>
                  </button>
                </div>
              </div>

              {/* Bottom spacer */}
              <div className="flex-1"></div>
            </div>
          </div>
        ) : (
          // Valuation Reports List
          <div className="space-y-4">
            {valuationReports.map(report => (
              <ValuationCard
                key={report.id}
                id={report.id}
                date={report.date}
                businessValue={report.businessValue}
                method={report.method}
                confidence={report.confidence}
                lowRange={report.lowRange}
                highRange={report.highRange}
                revenueMultiple={report.revenueMultiple}
                ebitdaMultiple={report.ebitdaMultiple}
                industryAverage={report.industryAverage}
                monthsValid={report.monthsValid}
              />
            ))}
          </div>
        )}

        {/* Valuation Modal */}
        <ValuationModal
          isOpen={isValuationModalOpen}
          onClose={handleCloseValuationModal}
          onSignupPrompt={handleValuationComplete}
          onComplete={handleValuationComplete}
        />
      </div>
    </div>
  );
};

export default ValuationTool;
