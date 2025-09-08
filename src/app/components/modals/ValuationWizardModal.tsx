import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Card,
  CardBody,
  Progress,
  Textarea,
} from '@heroui/react';
import {
  Building2,
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  MapPin,
  Calculator,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
} from 'lucide-react';
import FinancialDisclaimer from '../ui/FinancialDisclaimer';

interface BusinessData {
  // Company Information
  companyName: string;
  industry: string;
  foundedYear: number;
  location: string;
  employees: number;
  businessType: 'llc' | 'corporation' | 'partnership' | 'sole-proprietorship';

  // Financial Data
  annualRevenue: number;
  grossProfit: number;
  operatingExpenses: number;
  netIncome: number;
  ebitda: number;
  currentAssets: number;
  currentLiabilities: number;
  totalAssets: number;
  totalLiabilities: number;
  cashAndEquivalents: number;

  // Market Data
  revenueGrowthRate: number;
  marketPosition: 'leader' | 'strong' | 'average' | 'emerging';
  competitiveAdvantages: string[];
  customerBase: 'b2b' | 'b2c' | 'mixed';
  recurringRevenue: number;

  // Additional Context
  saleReason: string;
  keyAssets: string;
  challenges: string;
}

interface ValuationWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (valuation: any) => void;
  existingData?: Partial<BusinessData>;
  mode: 'create' | 'update';
}

const ValuationWizardModal: React.FC<ValuationWizardModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  existingData,
  mode = 'create',
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [businessData, setBusinessData] = useState<BusinessData>({
    companyName: existingData?.companyName || '',
    industry: existingData?.industry || '',
    foundedYear: existingData?.foundedYear || new Date().getFullYear() - 5,
    location: existingData?.location || '',
    employees: existingData?.employees || 1,
    businessType: existingData?.businessType || 'llc',
    annualRevenue: existingData?.annualRevenue || 0,
    grossProfit: existingData?.grossProfit || 0,
    operatingExpenses: existingData?.operatingExpenses || 0,
    netIncome: existingData?.netIncome || 0,
    ebitda: existingData?.ebitda || 0,
    currentAssets: existingData?.currentAssets || 0,
    currentLiabilities: existingData?.currentLiabilities || 0,
    totalAssets: existingData?.totalAssets || 0,
    totalLiabilities: existingData?.totalLiabilities || 0,
    cashAndEquivalents: existingData?.cashAndEquivalents || 0,
    revenueGrowthRate: existingData?.revenueGrowthRate || 0,
    marketPosition: existingData?.marketPosition || 'average',
    competitiveAdvantages: existingData?.competitiveAdvantages || [],
    customerBase: existingData?.customerBase || 'mixed',
    recurringRevenue: existingData?.recurringRevenue || 0,
    saleReason: existingData?.saleReason || '',
    keyAssets: existingData?.keyAssets || '',
    challenges: existingData?.challenges || '',
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const totalSteps = 4;

  const industries = [
    'Technology',
    'Healthcare',
    'Financial Services',
    'Real Estate',
    'Manufacturing',
    'Retail',
    'Food & Beverage',
    'Consulting',
    'Marketing & Advertising',
    'Transportation',
    'Construction',
    'Other',
  ];

  const updateBusinessData = (field: keyof BusinessData, value: any) => {
    setBusinessData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateValuation = (data: BusinessData) => {
    // Simplified valuation calculation for MVP
    // In production, this would call a proper valuation API

    // Revenue Multiple Method (Primary)
    const industryMultiples: Record<string, number> = {
      Technology: 4.5,
      Healthcare: 3.2,
      'Financial Services': 2.8,
      'Real Estate': 2.5,
      Manufacturing: 2.2,
      Retail: 1.8,
      'Food & Beverage': 2.5,
      Consulting: 3.0,
      'Marketing & Advertising': 3.5,
      Transportation: 2.0,
      Construction: 1.9,
      Other: 2.5,
    };

    const baseMultiple = industryMultiples[data.industry] || 2.5;

    // Adjust multiple based on business characteristics
    let adjustedMultiple = baseMultiple;

    // Growth rate adjustment
    if (data.revenueGrowthRate > 20) adjustedMultiple *= 1.3;
    else if (data.revenueGrowthRate > 10) adjustedMultiple *= 1.15;
    else if (data.revenueGrowthRate < -5) adjustedMultiple *= 0.8;

    // Market position adjustment
    const positionAdjustments = {
      leader: 1.2,
      strong: 1.1,
      average: 1.0,
      emerging: 0.9,
    };
    adjustedMultiple *= positionAdjustments[data.marketPosition];

    // Profitability adjustment (EBITDA margin)
    const ebitdaMargin = data.ebitda / data.annualRevenue;
    if (ebitdaMargin > 0.25) adjustedMultiple *= 1.15;
    else if (ebitdaMargin < 0.1) adjustedMultiple *= 0.9;

    // Recurring revenue bonus
    const recurringPercentage = data.recurringRevenue / data.annualRevenue;
    if (recurringPercentage > 0.5) adjustedMultiple *= 1.2;
    else if (recurringPercentage > 0.3) adjustedMultiple *= 1.1;

    const revenueValuation = data.annualRevenue * adjustedMultiple;

    // EBITDA Multiple Method (Secondary)
    const ebitdaMultiple = baseMultiple * 3; // Rough conversion
    const ebitdaValuation = data.ebitda * ebitdaMultiple;

    // Asset-based approach (minimum value)
    const netAssets = data.totalAssets - data.totalLiabilities;

    // Take weighted average, favoring revenue method
    const finalValuation = Math.max(
      revenueValuation * 0.7 + ebitdaValuation * 0.3,
      netAssets * 0.8 // Ensure it's above liquidation value
    );

    // Calculate confidence based on data completeness and business metrics
    let confidence: 'high' | 'medium' | 'low' = 'medium';

    if (data.annualRevenue > 500000 && data.ebitda > 0 && data.revenueGrowthRate > 0) {
      confidence = 'high';
    } else if (data.annualRevenue < 100000 || data.ebitda < 0) {
      confidence = 'low';
    }

    return {
      id: `valuation-${Date.now()}`,
      estimated_value: Math.round(finalValuation),
      currency: 'EUR',
      valuation_date: new Date().toISOString().split('T')[0],
      confidence_level: confidence,
      methodology: 'Revenue Multiple & EBITDA Analysis',
      status: 'completed',
      revenue_multiple: adjustedMultiple,
      ebitda_multiple: ebitdaMultiple,
      industry_average: baseMultiple,
      conservative_value: Math.round(finalValuation * 0.8),
      optimistic_value: Math.round(finalValuation * 1.2),
      market_conditions: 'current',
      key_drivers: [
        `${data.industry} industry multiple: ${baseMultiple}x`,
        `Revenue growth rate: ${data.revenueGrowthRate}%`,
        `Market position: ${data.marketPosition}`,
        `EBITDA margin: ${(ebitdaMargin * 100).toFixed(1)}%`,
        `Recurring revenue: ${(recurringPercentage * 100).toFixed(1)}%`,
      ],
    };
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerateValuation = async () => {
    setIsGenerating(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate the valuation
      const valuation = calculateValuation(businessData);

      // Pass the result back to parent
      onComplete(valuation);

      // Close modal
      onClose();
    } catch (error) {
      console.error('Error generating valuation:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return businessData.companyName && businessData.industry && businessData.location;
      case 2:
        return businessData.annualRevenue > 0 && businessData.ebitda !== null;
      case 3:
        return true; // Optional data
      case 4:
        return true; // Review step
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <Building2 className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Company Information</h3>
            </div>

            <Input
              label="Company Name"
              placeholder="Enter your business name"
              value={businessData.companyName}
              onChange={e => updateBusinessData('companyName', e.target.value)}
              isRequired
            />

            <Select
              label="Industry"
              placeholder="Select your industry"
              selectedKeys={businessData.industry ? [businessData.industry] : []}
              onSelectionChange={keys => updateBusinessData('industry', Array.from(keys)[0])}
              isRequired
            >
              {industries.map(industry => (
                <SelectItem key={industry}>{industry}</SelectItem>
              ))}
            </Select>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Founded Year"
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                value={businessData.foundedYear.toString()}
                onChange={e => updateBusinessData('foundedYear', parseInt(e.target.value))}
              />

              <Input
                label="Number of Employees"
                type="number"
                min="1"
                value={businessData.employees.toString()}
                onChange={e => updateBusinessData('employees', parseInt(e.target.value))}
              />
            </div>

            <Input
              label="Location"
              placeholder="City, Country"
              value={businessData.location}
              onChange={e => updateBusinessData('location', e.target.value)}
              isRequired
            />

            <Select
              label="Business Type"
              selectedKeys={[businessData.businessType]}
              onSelectionChange={keys => updateBusinessData('businessType', Array.from(keys)[0])}
            >
              <SelectItem key="llc">LLC</SelectItem>
              <SelectItem key="corporation">Corporation</SelectItem>
              <SelectItem key="partnership">Partnership</SelectItem>
              <SelectItem key="sole-proprietorship">Sole Proprietorship</SelectItem>
            </Select>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <DollarSign className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Financial Information</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Annual Revenue (€)"
                type="number"
                min="0"
                value={businessData.annualRevenue.toString()}
                onChange={e => updateBusinessData('annualRevenue', parseFloat(e.target.value) || 0)}
                isRequired
                description="Last 12 months revenue"
              />

              <Input
                label="EBITDA (€)"
                type="number"
                value={businessData.ebitda.toString()}
                onChange={e => updateBusinessData('ebitda', parseFloat(e.target.value) || 0)}
                isRequired
                description="Earnings before interest, taxes, depreciation, and amortization"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Current Assets (€)"
                type="number"
                min="0"
                value={businessData.currentAssets.toString()}
                onChange={e => updateBusinessData('currentAssets', parseFloat(e.target.value) || 0)}
                description="Cash, inventory, receivables"
              />

              <Input
                label="Current Liabilities (€)"
                type="number"
                min="0"
                value={businessData.currentLiabilities.toString()}
                onChange={e =>
                  updateBusinessData('currentLiabilities', parseFloat(e.target.value) || 0)
                }
                description="Short-term debts and obligations"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Total Assets (€)"
                type="number"
                min="0"
                value={businessData.totalAssets.toString()}
                onChange={e => updateBusinessData('totalAssets', parseFloat(e.target.value) || 0)}
                description="All assets including equipment, property"
              />

              <Input
                label="Total Liabilities (€)"
                type="number"
                min="0"
                value={businessData.totalLiabilities.toString()}
                onChange={e =>
                  updateBusinessData('totalLiabilities', parseFloat(e.target.value) || 0)
                }
                description="All debts and obligations"
              />
            </div>

            <Input
              label="Cash & Cash Equivalents (€)"
              type="number"
              min="0"
              value={businessData.cashAndEquivalents.toString()}
              onChange={e =>
                updateBusinessData('cashAndEquivalents', parseFloat(e.target.value) || 0)
              }
              description="Available cash and liquid assets"
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Market & Growth Data</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Revenue Growth Rate (%)"
                type="number"
                value={businessData.revenueGrowthRate.toString()}
                onChange={e =>
                  updateBusinessData('revenueGrowthRate', parseFloat(e.target.value) || 0)
                }
                description="Year-over-year growth"
              />

              <Input
                label="Recurring Revenue (€)"
                type="number"
                min="0"
                value={businessData.recurringRevenue.toString()}
                onChange={e =>
                  updateBusinessData('recurringRevenue', parseFloat(e.target.value) || 0)
                }
                description="Predictable monthly/annual revenue"
              />
            </div>

            <Select
              label="Market Position"
              selectedKeys={[businessData.marketPosition]}
              onSelectionChange={keys => updateBusinessData('marketPosition', Array.from(keys)[0])}
            >
              <SelectItem key="leader">Market Leader</SelectItem>
              <SelectItem key="strong">Strong Position</SelectItem>
              <SelectItem key="average">Average Position</SelectItem>
              <SelectItem key="emerging">Emerging Player</SelectItem>
            </Select>

            <Select
              label="Customer Base"
              selectedKeys={[businessData.customerBase]}
              onSelectionChange={keys => updateBusinessData('customerBase', Array.from(keys)[0])}
            >
              <SelectItem key="b2b">B2B (Business to Business)</SelectItem>
              <SelectItem key="b2c">B2C (Business to Consumer)</SelectItem>
              <SelectItem key="mixed">Mixed (B2B and B2C)</SelectItem>
            </Select>

            <Textarea
              label="Key Competitive Advantages"
              placeholder="Describe what makes your business unique..."
              value={businessData.keyAssets}
              onChange={e => updateBusinessData('keyAssets', e.target.value)}
              minRows={3}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Review & Generate</h3>
            </div>

            <Card>
              <CardBody className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Business Overview</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Company:</strong> {businessData.companyName}
                      </div>
                      <div>
                        <strong>Industry:</strong> {businessData.industry}
                      </div>
                      <div>
                        <strong>Location:</strong> {businessData.location}
                      </div>
                      <div>
                        <strong>Founded:</strong> {businessData.foundedYear}
                      </div>
                      <div>
                        <strong>Employees:</strong> {businessData.employees}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Financial Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Revenue:</strong> €{businessData.annualRevenue.toLocaleString()}
                      </div>
                      <div>
                        <strong>EBITDA:</strong> €{businessData.ebitda.toLocaleString()}
                      </div>
                      <div>
                        <strong>Growth Rate:</strong> {businessData.revenueGrowthRate}%
                      </div>
                      <div>
                        <strong>Market Position:</strong> {businessData.marketPosition}
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            <FinancialDisclaimer type="valuation" variant="modal" className="mt-4" />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      scrollBehavior="inside"
      isDismissable={false}
      hideCloseButton
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-xl font-bold">
            {mode === 'create' ? 'Business Valuation Wizard' : 'Update Business Valuation'}
          </h2>
          <div className="flex items-center space-x-4 mt-2">
            <Progress
              value={(currentStep / totalSteps) * 100}
              className="flex-1"
              color="primary"
              size="sm"
            />
            <span className="text-sm text-gray-500">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
        </ModalHeader>

        <ModalBody>{renderStepContent()}</ModalBody>

        <ModalFooter>
          <div className="flex justify-between w-full">
            <div>
              {currentStep > 1 && (
                <Button
                  variant="bordered"
                  onPress={handleBack}
                  startContent={<ArrowLeft className="w-4 h-4" />}
                >
                  Back
                </Button>
              )}
            </div>

            <div className="flex space-x-3">
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  color="primary"
                  onPress={handleNext}
                  isDisabled={!isStepValid()}
                  endContent={<ArrowRight className="w-4 h-4" />}
                >
                  Next
                </Button>
              ) : (
                <Button
                  color="primary"
                  onPress={handleGenerateValuation}
                  isLoading={isGenerating}
                  startContent={!isGenerating ? <Calculator className="w-4 h-4" /> : null}
                >
                  {isGenerating ? 'Generating Valuation...' : 'Generate Valuation'}
                </Button>
              )}
            </div>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ValuationWizardModal;
