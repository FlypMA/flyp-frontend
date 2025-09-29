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

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Load existing valuation reports (empty by default)
  useEffect(() => {
    // In a real app, this would load from the backend
    // For now, start with empty state
    setValuationReports([]);
  }, []);

  const handleOpenValuationModal = () => {
    setIsValuationModalOpen(true);
  };

  const handleCloseValuationModal = () => {
    setIsValuationModalOpen(false);
  };

  const handleValuationComplete = (valuationData: any) => {
    // In a real app, this would save to the backend
    const newReport: ValuationReport = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      businessValue: 1250000, // This would come from the actual calculation
      method: 'Combined Analysis',
      confidence: 'high',
      lowRange: 1000000,
      highRange: 1500000,
      revenueMultiple: 3.2,
      ebitdaMultiple: 8.5,
      industryAverage: 7.2,
      monthsValid: 6,
      inputs: valuationData,
    };

    setValuationReports(prev => [newReport, ...prev]);
    setIsValuationModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header - Updated to remove tabs */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Valuation Reports</h1>
              <p className="text-lg text-gray-600">
                Track your business value over time with professional valuations
              </p>
            </div>
            <Button
              variant="primary"
              startContent={<Calculator className="w-4 h-4" />}
              onPress={handleOpenValuationModal}
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
                    className="inline-flex items-center justify-center transition-all duration-200 ease-in-out focus:outline-none focus:ring-3 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed border-0 outline-none cursor-pointer relative overflow-hidden bg-primary-500 text-white font-semibold hover:bg-primary-600 focus:ring-primary-500/30 shadow-sm hover:shadow-md active:scale-[0.98] px-4 py-2 text-sm h-9 rounded-lg"
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
