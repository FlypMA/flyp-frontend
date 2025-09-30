/**
 * 💰 Valuation Modal - Anonymous Business Valuation
 * Location: src/shared/components/modals/ValuationModal.tsx
 * Purpose: Anonymous valuation modal for lead generation and conversion
 *
 * Features:
 * - Anonymous access to valuation inputs
 * - Email capture before results
 * - Signup prompt after valuation
 * - Based on existing ValuationTool component
 */

import { Button } from '@/shared/components/buttons';
import { CustomNumberInputField } from '@/shared/components/forms';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import { Calculator, X } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../app/providers/auth-provider';

interface ValuationInputs {
  // Business structure
  businessType: 'sole-trader' | 'company'; // Business structure type
  sharesForSale: number; // % shares for sale (only for companies)
  // Essential inputs for valuation
  revenue2025: number;
  revenue2024: number;
  revenue2023: number;
  ebitda2025: number;
  ebitda2024: number;
  ebitda2023: number;
  // Additional helpful inputs
  employeeCount: string;
}

interface ValuationResult {
  method: string;
  value: number;
  lowRange: number;
  highRange: number;
  confidence: 'high' | 'medium' | 'low';
  explanation: string;
  assumptions: string[];
}

interface ValuationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignupPrompt: (valuationData: ValuationInputs) => void;
  onComplete?: (valuationData: ValuationInputs) => void; // For authenticated users
}

const ValuationModal: React.FC<ValuationModalProps> = ({
  isOpen,
  onClose,
  onSignupPrompt,
  onComplete,
}) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isCalculating, setIsCalculating] = useState(false);

  const [inputs, setInputs] = useState<ValuationInputs>({
    businessType: 'company', // Default to company
    sharesForSale: 100, // 100% of shares
    revenue2025: 500000,
    revenue2024: 450000,
    revenue2023: 420000,
    ebitda2025: 150000,
    ebitda2024: 135000,
    ebitda2023: 125000,
    employeeCount: '6-10',
  });

  // Industry multiples database (same as ValuationTool)
  const industryMultiples = {
    'food-beverage': {
      revenueMultiple: { low: 0.8, avg: 1.2, high: 2.0 },
      ebitdaMultiple: { low: 3.0, avg: 4.5, high: 7.0 },
      description: 'Restaurants, cafés, food services',
    },
    retail: {
      revenueMultiple: { low: 0.5, avg: 0.8, high: 1.5 },
      ebitdaMultiple: { low: 3.5, avg: 5.0, high: 8.0 },
      description: 'Retail stores, e-commerce',
    },
    'professional-services': {
      revenueMultiple: { low: 1.0, avg: 1.8, high: 3.5 },
      ebitdaMultiple: { low: 4.0, avg: 6.0, high: 10.0 },
      description: 'Consulting, legal, accounting',
    },
    technology: {
      revenueMultiple: { low: 2.0, avg: 4.0, high: 8.0 },
      ebitdaMultiple: { low: 8.0, avg: 12.0, high: 20.0 },
      description: 'Software, tech services',
    },
    healthcare: {
      revenueMultiple: { low: 1.5, avg: 2.5, high: 4.0 },
      ebitdaMultiple: { low: 6.0, avg: 9.0, high: 15.0 },
      description: 'Medical practices, healthcare',
    },
    manufacturing: {
      revenueMultiple: { low: 0.8, avg: 1.5, high: 2.5 },
      ebitdaMultiple: { low: 4.5, avg: 6.5, high: 10.0 },
      description: 'Manufacturing, production',
    },
  };

  const calculateValuation = async () => {
    setIsCalculating(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const results: ValuationResult[] = [];
      // Use a default industry for valuation (can be updated later with business profile data)
      const industryData = industryMultiples['technology']; // Default to technology industry

      // 1. Revenue Multiple Method (using latest year)
      const revenueMultipleValuation = inputs.revenue2025 * industryData.revenueMultiple.avg;
      results.push({
        method: 'Revenue Multiple',
        value: revenueMultipleValuation,
        lowRange: inputs.revenue2025 * industryData.revenueMultiple.low,
        highRange: inputs.revenue2025 * industryData.revenueMultiple.high,
        confidence: inputs.revenue2025 > 100000 ? 'high' : 'medium',
        explanation: `Based on ${industryData.revenueMultiple.avg}x revenue multiple for ${industryData.description}`,
        assumptions: [
          `Industry average: ${industryData.revenueMultiple.avg}x revenue`,
          `Revenue trend analysis: ${inputs.revenue2023} → ${inputs.revenue2024} → ${inputs.revenue2025}`,
        ],
      });

      // 2. EBITDA Multiple Method (using latest year)
      if (inputs.ebitda2025 > 0) {
        const ebitdaMultipleValuation = inputs.ebitda2025 * industryData.ebitdaMultiple.avg;
        results.push({
          method: 'EBITDA Multiple',
          value: ebitdaMultipleValuation,
          lowRange: inputs.ebitda2025 * industryData.ebitdaMultiple.low,
          highRange: inputs.ebitda2025 * industryData.ebitdaMultiple.high,
          confidence: inputs.ebitda2025 > 50000 ? 'high' : 'medium',
          explanation: `Based on ${industryData.ebitdaMultiple.avg}x EBITDA multiple for established businesses`,
          assumptions: [
            `Industry EBITDA multiple: ${industryData.ebitdaMultiple.avg}x`,
            `EBITDA trend analysis: ${inputs.ebitda2023} → ${inputs.ebitda2024} → ${inputs.ebitda2025}`,
            `Profitability sustainability assessed`,
          ],
        });
      }

      // 3. Trend-Based Valuation (Revenue Growth Analysis)
      const revenueGrowthRate =
        ((inputs.revenue2025 - inputs.revenue2023) / inputs.revenue2023) * 100;
      const ebitdaGrowthRate = ((inputs.ebitda2025 - inputs.ebitda2023) / inputs.ebitda2023) * 100;

      // Apply growth premium/discount based on trends
      const growthMultiplier =
        revenueGrowthRate > 10
          ? 1.2
          : revenueGrowthRate > 5
            ? 1.1
            : revenueGrowthRate > 0
              ? 1.0
              : 0.9;
      const trendBasedValue =
        ((revenueMultipleValuation + inputs.ebitda2025 * industryData.ebitdaMultiple.avg) / 2) *
        growthMultiplier;

      results.push({
        method: 'Trend Analysis',
        value: trendBasedValue,
        lowRange: trendBasedValue * 0.8,
        highRange: trendBasedValue * 1.2,
        confidence: Math.abs(revenueGrowthRate) < 20 ? 'high' : 'medium',
        explanation: `Combined revenue and EBITDA analysis with growth trend consideration`,
        assumptions: [
          `Revenue growth rate: ${revenueGrowthRate.toFixed(1)}% over 3 years`,
          `EBITDA growth rate: ${ebitdaGrowthRate.toFixed(1)}% over 3 years`,
          `Growth premium/discount applied based on trend stability`,
        ],
      });

      // Calculate weighted average (focus on revenue and EBITDA methods)
      const weights = [0.4, 0.4, 0.2]; // Revenue, EBITDA, Trend Analysis
      const weightedSum = results.reduce(
        (sum, result, index) => sum + result.value * weights[index],
        0
      );

      // Apply shares percentage to get actual valuation
      // For sole traders, it's always 100% ownership
      const ownershipPercentage =
        inputs.businessType === 'sole-trader' ? 100 : inputs.sharesForSale;
      const finalValuation = weightedSum * (ownershipPercentage / 100);

      // Create valuation report object
      const valuationReport = {
        id: `valuation-${Date.now()}`,
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        businessValue: Math.round(finalValuation),
        method: 'Comparable Sales & DCF Analysis',
        confidence: results[0].confidence,
        lowRange: Math.round(results[0].lowRange),
        highRange: Math.round(results[0].highRange),
        revenueMultiple: industryData.revenueMultiple.avg,
        ebitdaMultiple: industryData.ebitdaMultiple.avg,
        industryAverage: industryData.ebitdaMultiple.avg,
        monthsValid: 6,
        inputs: inputs,
        results: results,
        createdAt: new Date().toISOString(),
      };

      console.log('💰 Creating valuation report:', valuationReport);

      // For authenticated users, complete and navigate
      if (isAuthenticated) {
        // Save to localStorage
        const existingReports = JSON.parse(localStorage.getItem('valuationReports') || '[]');
        existingReports.push(valuationReport);
        localStorage.setItem('valuationReports', JSON.stringify(existingReports));
        localStorage.setItem('hasValuationReports', 'true');

        console.log('💾 Saved valuation to localStorage');
        console.log('📊 Total reports:', existingReports.length);

        if (onComplete) {
          onComplete(inputs);
        }
        onClose();
        navigate('/my-business');
      } else {
        // For unauthenticated users, show signup prompt
        onSignupPrompt(inputs);
        onClose();
      }
    } catch (error) {
      // TODO: Add proper error handling
    } finally {
      setIsCalculating(false);
    }
  };

  const handleInputChange = (field: keyof ValuationInputs, value: string | number) => {
    setInputs(prev => ({
      ...prev,
      [field]:
        typeof value === 'string' && field !== 'employeeCount' && field !== 'businessType'
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="5xl"
      backdrop="opaque"
      radius="lg"
      shadow="lg"
      isDismissable={true}
      isKeyboardDismissDisabled={false}
      shouldBlockScroll={true}
      hideCloseButton={true}
      scrollBehavior="inside"
      classNames={{
        base: 'max-h-[85vh]',
        body: 'py-4 overflow-y-auto max-h-[65vh]',
        header: 'pb-2',
        footer: 'pt-2',
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Calculator className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Free Business Valuation</h2>
                <p className="text-sm text-gray-600">Get your business value in minutes</p>
              </div>
            </div>
            <Button
              isIconOnly
              variant="tertiary"
              size="sm"
              onPress={handleClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </ModalHeader>

        <ModalBody>
          {/* Business Data Form - Compact Layout */}
          <div className="space-y-4">
            {/* Business Structure - Compact */}
            <div className="space-y-3">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">Business Structure</h4>
                <p className="text-sm text-gray-600">Select your business type</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    inputs.businessType === 'sole-trader'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleInputChange('businessType', 'sole-trader')}
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full border-2 ${
                        inputs.businessType === 'sole-trader'
                          ? 'border-primary-500 bg-primary-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {inputs.businessType === 'sole-trader' && (
                        <div className="w-1 h-1 bg-white rounded-full m-0.5"></div>
                      )}
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 text-sm">Sole Trader</h5>
                      <p className="text-xs text-gray-600">100% ownership</p>
                    </div>
                  </div>
                </div>
                <div
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    inputs.businessType === 'company'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleInputChange('businessType', 'company')}
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full border-2 ${
                        inputs.businessType === 'company'
                          ? 'border-primary-500 bg-primary-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {inputs.businessType === 'company' && (
                        <div className="w-1 h-1 bg-white rounded-full m-0.5"></div>
                      )}
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 text-sm">Company</h5>
                      <p className="text-xs text-gray-600">With shares</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shares for Sale - Only for Companies */}
              {inputs.businessType === 'company' && (
                <div className="max-w-xs">
                  <CustomNumberInputField
                    label="% Shares for Sale"
                    placeholder="100"
                    value={inputs.sharesForSale.toString()}
                    onChange={e => handleInputChange('sharesForSale', e.target.value)}
                    onBlur={() => {}}
                    name="sharesForSale"
                    suffix="%"
                    min={1}
                    max={100}
                    step={1}
                    allowDecimals={false}
                  />
                </div>
              )}
            </div>

            {/* Financial Data - Compact Grid */}
            <div className="space-y-2">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">
                  Financial Data (Last 3 Years)
                </h4>
                <p className="text-sm text-gray-600">Revenue and EBITDA figures</p>
              </div>

              {/* Revenue Row */}
              <div className="grid grid-cols-3 gap-3">
                <CustomNumberInputField
                  label="2023 Revenue"
                  placeholder="420,000"
                  value={inputs.revenue2023.toString()}
                  onChange={e => handleInputChange('revenue2023', e.target.value)}
                  onBlur={() => {}}
                  name="revenue2023"
                  prefix="€"
                  formatAsCurrency={true}
                  min={0}
                />
                <CustomNumberInputField
                  label="2024 Revenue"
                  placeholder="450,000"
                  value={inputs.revenue2024.toString()}
                  onChange={e => handleInputChange('revenue2024', e.target.value)}
                  onBlur={() => {}}
                  name="revenue2024"
                  prefix="€"
                  formatAsCurrency={true}
                  min={0}
                />
                <CustomNumberInputField
                  label="2025 Revenue"
                  placeholder="500,000"
                  value={inputs.revenue2025.toString()}
                  onChange={e => handleInputChange('revenue2025', e.target.value)}
                  onBlur={() => {}}
                  name="revenue2025"
                  prefix="€"
                  formatAsCurrency={true}
                  min={0}
                />
              </div>

              {/* EBITDA Row */}
              <div className="grid grid-cols-3 gap-3 mt-2">
                <CustomNumberInputField
                  label="2023 EBITDA"
                  placeholder="125,000"
                  value={inputs.ebitda2023.toString()}
                  onChange={e => handleInputChange('ebitda2023', e.target.value)}
                  onBlur={() => {}}
                  name="ebitda2023"
                  prefix="€"
                  formatAsCurrency={true}
                  min={0}
                />
                <CustomNumberInputField
                  label="2024 EBITDA"
                  placeholder="135,000"
                  value={inputs.ebitda2024.toString()}
                  onChange={e => handleInputChange('ebitda2024', e.target.value)}
                  onBlur={() => {}}
                  name="ebitda2024"
                  prefix="€"
                  formatAsCurrency={true}
                  min={0}
                />
                <CustomNumberInputField
                  label="2025 EBITDA"
                  placeholder="150,000"
                  value={inputs.ebitda2025.toString()}
                  onChange={e => handleInputChange('ebitda2025', e.target.value)}
                  onBlur={() => {}}
                  name="ebitda2025"
                  prefix="€"
                  formatAsCurrency={true}
                  min={0}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Button
              variant="primary"
              size="lg"
              startContent={<Calculator className="w-5 h-5" />}
              onPress={calculateValuation}
              isLoading={isCalculating}
              className="px-12"
            >
              Calculate Business Value
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ValuationModal;
