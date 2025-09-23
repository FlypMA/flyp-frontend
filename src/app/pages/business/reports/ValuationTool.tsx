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
import { Card, CardBody } from '@heroui/react';
import { Calculator, TrendingUp } from 'lucide-react';
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

  console.log('ValuationTool rendering with reports:', valuationReports.length);

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
          // Empty State
          <Card className="border border-gray-200 shadow-sm">
            <CardBody className="p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  No Valuation Reports Yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Get your first professional business valuation to track your company's value over
                  time.
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  startContent={<Calculator className="w-5 h-5" />}
                  onPress={handleOpenValuationModal}
                  className="px-8"
                >
                  Get My First Valuation
                </Button>
              </div>
            </CardBody>
          </Card>
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
                onView={() => console.log('View report:', report.id)}
                onDownload={() => console.log('Download report:', report.id)}
                onShare={() => console.log('Share report:', report.id)}
                onUpdate={() => console.log('Update report:', report.id)}
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
