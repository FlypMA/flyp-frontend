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
import { CustomDropdown, CustomNumberInputField } from '@/shared/components/forms';
import {
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Slider,
  Tab,
  Tabs,
} from '@heroui/react';
import { ArrowRight, Calculator, TrendingUp, X } from 'lucide-react';
import React, { useState } from 'react';

interface ValuationInputs {
  // Essential inputs for valuation
  sharesForSale: number; // % shares for sale
  revenue2023: number;
  revenue2022: number;
  revenue2021: number;
  ebitda2023: number;
  ebitda2022: number;
  ebitda2021: number;
  industry: string;
  // Additional helpful inputs
  yearsInBusiness: number;
  employeeCount: string;
  marketMultiplier: number;
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
}

const ValuationModal: React.FC<ValuationModalProps> = ({ isOpen, onClose, onSignupPrompt }) => {
  const [activeTab, setActiveTab] = useState('input');
  const [isCalculating, setIsCalculating] = useState(false);
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);

  const [inputs, setInputs] = useState<ValuationInputs>({
    sharesForSale: 100, // 100% of shares
    revenue2023: 450000,
    revenue2022: 420000,
    revenue2021: 380000,
    ebitda2023: 135000,
    ebitda2022: 125000,
    ebitda2021: 110000,
    industry: 'food-beverage',
    yearsInBusiness: 16,
    employeeCount: '6-10',
    marketMultiplier: 1.0,
  });

  const [valuationResults, setValuationResults] = useState<ValuationResult[]>([]);
  const [averageValuation, setAverageValuation] = useState<number>(0);

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
      const industryData = industryMultiples[inputs.industry as keyof typeof industryMultiples];

      // 1. Revenue Multiple Method (using latest year)
      const revenueMultipleValuation =
        inputs.revenue2023 * industryData.revenueMultiple.avg * inputs.marketMultiplier;
      results.push({
        method: 'Revenue Multiple',
        value: revenueMultipleValuation,
        lowRange: inputs.revenue2023 * industryData.revenueMultiple.low,
        highRange: inputs.revenue2023 * industryData.revenueMultiple.high,
        confidence: inputs.revenue2023 > 100000 ? 'high' : 'medium',
        explanation: `Based on ${industryData.revenueMultiple.avg}x revenue multiple for ${industryData.description}`,
        assumptions: [
          `Industry average: ${industryData.revenueMultiple.avg}x revenue`,
          `Market conditions: ${inputs.marketMultiplier === 1 ? 'neutral' : inputs.marketMultiplier > 1 ? 'favorable' : 'challenging'}`,
          `Revenue trend analysis: ${inputs.revenue2021} → ${inputs.revenue2022} → ${inputs.revenue2023}`,
        ],
      });

      // 2. EBITDA Multiple Method (using latest year)
      if (inputs.ebitda2023 > 0) {
        const ebitdaMultipleValuation =
          inputs.ebitda2023 * industryData.ebitdaMultiple.avg * inputs.marketMultiplier;
        results.push({
          method: 'EBITDA Multiple',
          value: ebitdaMultipleValuation,
          lowRange: inputs.ebitda2023 * industryData.ebitdaMultiple.low,
          highRange: inputs.ebitda2023 * industryData.ebitdaMultiple.high,
          confidence: inputs.ebitda2023 > 50000 ? 'high' : 'medium',
          explanation: `Based on ${industryData.ebitdaMultiple.avg}x EBITDA multiple for established businesses`,
          assumptions: [
            `Industry EBITDA multiple: ${industryData.ebitdaMultiple.avg}x`,
            `EBITDA trend analysis: ${inputs.ebitda2021} → ${inputs.ebitda2022} → ${inputs.ebitda2023}`,
            `Profitability sustainability assessed`,
          ],
        });
      }

      // 3. Trend-Based Valuation (Revenue Growth Analysis)
      const revenueGrowthRate =
        ((inputs.revenue2023 - inputs.revenue2021) / inputs.revenue2021) * 100;
      const ebitdaGrowthRate = ((inputs.ebitda2023 - inputs.ebitda2021) / inputs.ebitda2021) * 100;

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
        ((revenueMultipleValuation + inputs.ebitda2023 * industryData.ebitdaMultiple.avg) / 2) *
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

      setValuationResults(results);

      // Calculate weighted average (focus on revenue and EBITDA methods)
      const weights = [0.4, 0.4, 0.2]; // Revenue, EBITDA, Trend Analysis
      const weightedSum = results.reduce(
        (sum, result, index) => sum + result.value * weights[index],
        0
      );

      // Apply shares percentage to get actual valuation
      const finalValuation = weightedSum * (inputs.sharesForSale / 100);
      setAverageValuation(finalValuation);

      // Show signup prompt after calculation
      setShowSignupPrompt(true);
      setActiveTab('results');
    } catch {
      // console.error('Error calculating valuation:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleInputChange = (field: keyof ValuationInputs, value: string | number) => {
    setInputs(prev => ({
      ...prev,
      [field]:
        typeof value === 'string' && field !== 'industry' && field !== 'employeeCount'
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const handleSignup = () => {
    onSignupPrompt(inputs);
    onClose();
  };

  const handleClose = () => {
    setActiveTab('input');
    setShowSignupPrompt(false);
    setValuationResults([]);
    setAverageValuation(0);
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
      classNames={{
        base: 'max-h-[90vh]',
        body: 'py-6',
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
          <Tabs
            selectedKey={activeTab}
            onSelectionChange={key => setActiveTab(key as string)}
            className="mb-8"
            variant="underlined"
          >
            <Tab key="input" title="Business Data">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Essential Financial Information */}
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Essential Financial Data
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      The most important inputs for accurate business valuation
                    </p>
                  </CardHeader>
                  <CardBody className="space-y-6">
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

                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Revenue (Last 3 Years)</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <CustomNumberInputField
                          label="2021 Revenue (€)"
                          placeholder="380,000"
                          value={inputs.revenue2021.toString()}
                          onChange={e => handleInputChange('revenue2021', e.target.value)}
                          onBlur={() => {}}
                          name="revenue2021"
                          prefix="€"
                          formatAsCurrency={true}
                          min={0}
                        />
                        <CustomNumberInputField
                          label="2022 Revenue (€)"
                          placeholder="420,000"
                          value={inputs.revenue2022.toString()}
                          onChange={e => handleInputChange('revenue2022', e.target.value)}
                          onBlur={() => {}}
                          name="revenue2022"
                          prefix="€"
                          formatAsCurrency={true}
                          min={0}
                        />
                        <CustomNumberInputField
                          label="2023 Revenue (€)"
                          placeholder="450,000"
                          value={inputs.revenue2023.toString()}
                          onChange={e => handleInputChange('revenue2023', e.target.value)}
                          onBlur={() => {}}
                          name="revenue2023"
                          prefix="€"
                          formatAsCurrency={true}
                          min={0}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">EBITDA (Last 3 Years)</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <CustomNumberInputField
                          label="2021 EBITDA (€)"
                          placeholder="110,000"
                          value={inputs.ebitda2021.toString()}
                          onChange={e => handleInputChange('ebitda2021', e.target.value)}
                          onBlur={() => {}}
                          name="ebitda2021"
                          prefix="€"
                          formatAsCurrency={true}
                          min={0}
                        />
                        <CustomNumberInputField
                          label="2022 EBITDA (€)"
                          placeholder="125,000"
                          value={inputs.ebitda2022.toString()}
                          onChange={e => handleInputChange('ebitda2022', e.target.value)}
                          onBlur={() => {}}
                          name="ebitda2022"
                          prefix="€"
                          formatAsCurrency={true}
                          min={0}
                        />
                        <CustomNumberInputField
                          label="2023 EBITDA (€)"
                          placeholder="135,000"
                          value={inputs.ebitda2023.toString()}
                          onChange={e => handleInputChange('ebitda2023', e.target.value)}
                          onBlur={() => {}}
                          name="ebitda2023"
                          prefix="€"
                          formatAsCurrency={true}
                          min={0}
                        />
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Business Details */}
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader>
                    <h3 className="text-xl font-semibold text-gray-900">Business Profile</h3>
                  </CardHeader>
                  <CardBody className="space-y-6">
                    <CustomDropdown
                      label="Industry"
                      placeholder="Select your industry"
                      options={Object.entries(industryMultiples).map(([key, value]) => ({
                        value: key,
                        label: value.description,
                      }))}
                      value={inputs.industry}
                      onChange={value => handleInputChange('industry', value)}
                      name="industry"
                    />
                    <CustomNumberInputField
                      label="Years in Business"
                      placeholder="16"
                      value={inputs.yearsInBusiness.toString()}
                      onChange={e => handleInputChange('yearsInBusiness', e.target.value)}
                      onBlur={() => {}}
                      name="yearsInBusiness"
                      min={1}
                      max={100}
                      step={1}
                      allowDecimals={false}
                    />
                    <div className="space-y-4">
                      <label className="text-sm font-medium text-gray-700">
                        Market Conditions Multiplier: {inputs.marketMultiplier}x
                      </label>
                      <Slider
                        size="md"
                        step={0.1}
                        minValue={0.5}
                        maxValue={1.5}
                        value={inputs.marketMultiplier}
                        onChange={value =>
                          handleInputChange(
                            'marketMultiplier',
                            Array.isArray(value) ? value[0] : value
                          )
                        }
                        className="max-w-md"
                        color="primary"
                      />
                      <p className="text-xs text-gray-500">
                        Adjust based on current market conditions (0.5 = challenging, 1.0 = normal,
                        1.5 = favorable)
                      </p>
                    </div>
                  </CardBody>
                </Card>
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
            </Tab>

            <Tab key="results" title="Valuation Results">
              {valuationResults.length === 0 ? (
                <div className="text-center py-16">
                  <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Valuation Yet</h3>
                  <p className="text-gray-600 mb-6">
                    Enter your business data and run the valuation to see results
                  </p>
                  <Button
                    variant="primary"
                    onPress={() => setActiveTab('input')}
                    endContent={<ArrowRight className="w-4 h-4" />}
                  >
                    Go to Business Data
                  </Button>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Summary Card */}
                  <Card className="border border-gray-200 shadow-sm">
                    <CardBody className="p-8 text-center">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Estimated Business Value
                      </h2>
                      <div className="flex items-center justify-center space-x-3 mb-4">
                        <TrendingUp className="w-8 h-8 text-gray-600" />
                        <span className="text-5xl font-bold text-gray-900">
                          €{averageValuation.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-lg text-gray-600 mb-6">
                        Weighted average of {valuationResults.length} valuation methods
                      </p>

                      {showSignupPrompt ? (
                        <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-6">
                          <h3 className="text-lg font-semibold text-primary-900 mb-2">
                            Get Your Detailed Report
                          </h3>
                          <p className="text-primary-800 mb-4">
                            Create a free account to download your professional valuation report and
                            access additional business tools.
                          </p>
                          <Button
                            variant="primary"
                            size="lg"
                            onPress={handleSignup}
                            className="px-8"
                          >
                            Create Account & Get Report
                          </Button>
                        </div>
                      ) : (
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Sign Up for Full Report
                          </h3>
                          <p className="text-gray-700 mb-4">
                            To download your detailed valuation report and access additional
                            business tools, please create a free account.
                          </p>
                          <Button
                            variant="primary"
                            size="lg"
                            onPress={handleSignup}
                            className="px-8"
                          >
                            Create Account & Get Report
                          </Button>
                        </div>
                      )}
                    </CardBody>
                  </Card>

                  {/* Individual Methods */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    {valuationResults.map((result, index) => (
                      <Card key={index} className="border border-gray-200 shadow-sm">
                        <CardHeader>
                          <div className="flex items-center justify-between w-full">
                            <h3 className="text-lg font-semibold text-gray-900">{result.method}</h3>
                            <span
                              className={`text-sm font-medium px-2 py-1 rounded-full bg-gray-100 ${
                                result.confidence === 'high'
                                  ? 'text-green-600'
                                  : result.confidence === 'medium'
                                    ? 'text-gray-600'
                                    : 'text-red-600'
                              }`}
                            >
                              {result.confidence.toUpperCase()}
                            </span>
                          </div>
                        </CardHeader>
                        <CardBody>
                          <div className="mb-4">
                            <div className="text-3xl font-bold text-gray-900 mb-1">
                              €{result.value.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600">
                              Range: €{result.lowRange.toLocaleString()} - €
                              {result.highRange.toLocaleString()}
                            </div>
                          </div>
                          <p className="text-gray-700 mb-4">{result.explanation}</p>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Key Assumptions:</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {result.assumptions.map((assumption, idx) => (
                                <li key={idx} className="flex items-start space-x-2">
                                  <span className="text-gray-400 mt-1">•</span>
                                  <span>{assumption}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </Tab>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ValuationModal;
