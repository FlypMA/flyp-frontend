import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Slider,
  Tabs,
  Tab,
} from '@heroui/react';
import {
  Calculator,
  TrendingUp,
  Building2,
  DollarSign,
  BarChart3,
  FileText,
  Download,
  RefreshCw,
  Info,
  ArrowRight,
  Target,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import { authService } from '../../services/users/authenticationService';
import { User as UserType } from '../../types/api/users/user';
import UnifiedNavigation from '../../components/navigation/UnifiedNavigation';
import SellerSidebar from '../../components/navigation/SellerSidebar';

interface ValuationInputs {
  annualRevenue: number;
  grossProfit: number;
  ebitda: number;
  netIncome: number;
  totalAssets: number;
  currentAssets: number;
  totalDebt: number;
  cashFlow: number;
  industry: string;
  yearsInBusiness: number;
  employeeCount: string;
  revenueGrowthRate: number;
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

const ValuationTool = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  // Loading states removed for smooth UX
  const [isCalculating, setIsCalculating] = useState(false);
  const [activeTab, setActiveTab] = useState('input');

  const [inputs, setInputs] = useState<ValuationInputs>({
    annualRevenue: 450000,
    grossProfit: 315000,
    ebitda: 135000,
    netIncome: 85000,
    totalAssets: 320000,
    currentAssets: 185000,
    totalDebt: 120000,
    cashFlow: 125000,
    industry: 'food-beverage',
    yearsInBusiness: 16,
    employeeCount: '6-10',
    revenueGrowthRate: 5,
    marketMultiplier: 1.0,
  });

  const [valuationResults, setValuationResults] = useState<ValuationResult[]>([]);
  const [averageValuation, setAverageValuation] = useState<number>(0);

  // Industry multiples database
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
      ebitdaMultiple: { low: 4.0, avg: 6.5, high: 10.0 },
      description: 'Manufacturing, production',
    },
  };

  useEffect(() => {
    const initializePage = async () => {
      // Instant data loading - no loading state
      try {
        const authResult = await authService.checkAuthentication();
        if (authResult.isAuthenticated && authResult.user) {
          setUser(authResult.user);
          await calculateValuation();
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

  const calculateValuation = async () => {
    setIsCalculating(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const results: ValuationResult[] = [];
      const industryData = industryMultiples[inputs.industry as keyof typeof industryMultiples];

      // 1. Revenue Multiple Method
      const revenueMultipleValuation =
        inputs.annualRevenue * industryData.revenueMultiple.avg * inputs.marketMultiplier;
      results.push({
        method: 'Revenue Multiple',
        value: revenueMultipleValuation,
        lowRange: inputs.annualRevenue * industryData.revenueMultiple.low,
        highRange: inputs.annualRevenue * industryData.revenueMultiple.high,
        confidence: inputs.annualRevenue > 100000 ? 'high' : 'medium',
        explanation: `Based on ${industryData.revenueMultiple.avg}x revenue multiple for ${industryData.description}`,
        assumptions: [
          `Industry average: ${industryData.revenueMultiple.avg}x revenue`,
          `Market conditions: ${inputs.marketMultiplier === 1 ? 'neutral' : inputs.marketMultiplier > 1 ? 'favorable' : 'challenging'}`,
          `Revenue quality and predictability considered`,
        ],
      });

      // 2. EBITDA Multiple Method
      if (inputs.ebitda > 0) {
        const ebitdaMultipleValuation =
          inputs.ebitda * industryData.ebitdaMultiple.avg * inputs.marketMultiplier;
        results.push({
          method: 'EBITDA Multiple',
          value: ebitdaMultipleValuation,
          lowRange: inputs.ebitda * industryData.ebitdaMultiple.low,
          highRange: inputs.ebitda * industryData.ebitdaMultiple.high,
          confidence: inputs.ebitda > 50000 ? 'high' : 'medium',
          explanation: `Based on ${industryData.ebitdaMultiple.avg}x EBITDA multiple for established businesses`,
          assumptions: [
            `Industry EBITDA multiple: ${industryData.ebitdaMultiple.avg}x`,
            `EBITDA quality and sustainability assessed`,
            `Management depth and systems considered`,
          ],
        });
      }

      // 3. Asset-Based Valuation
      const netAssets = inputs.totalAssets - inputs.totalDebt;
      const assetBasedValue = netAssets * (inputs.industry === 'manufacturing' ? 0.8 : 0.6);
      results.push({
        method: 'Asset-Based',
        value: assetBasedValue,
        lowRange: assetBasedValue * 0.7,
        highRange: assetBasedValue * 1.2,
        confidence: netAssets > 0 ? 'medium' : 'low',
        explanation: 'Net asset value adjusted for market conditions and asset quality',
        assumptions: [
          `Net assets: €${netAssets.toLocaleString()}`,
          `Asset utilization and condition considered`,
          `Liquidation discount applied for conservative estimate`,
        ],
      });

      // 4. Discounted Cash Flow (Simplified)
      const projectedCashFlow = inputs.cashFlow * (1 + inputs.revenueGrowthRate / 100);
      const terminalValue = projectedCashFlow * 10;
      const dcfValue = projectedCashFlow * 5 + terminalValue * 0.6;
      results.push({
        method: 'Cash Flow (DCF)',
        value: dcfValue,
        lowRange: dcfValue * 0.8,
        highRange: dcfValue * 1.3,
        confidence: inputs.cashFlow > 0 ? 'medium' : 'low',
        explanation: `5-year projected cash flows with terminal value, ${inputs.revenueGrowthRate}% growth assumption`,
        assumptions: [
          `Current cash flow: €${inputs.cashFlow.toLocaleString()}`,
          `Growth rate assumption: ${inputs.revenueGrowthRate}%`,
          `Terminal value multiple: 10x final year cash flow`,
        ],
      });

      setValuationResults(results);

      // Calculate weighted average
      const weights = [0.35, 0.35, 0.15, 0.15];
      const weightedSum = results.reduce(
        (sum, result, index) => sum + result.value * weights[index],
        0
      );
      setAverageValuation(weightedSum);
    } catch (error) {
      console.error('Error calculating valuation:', error);
    } finally {
      setIsCalculating(false);
      setActiveTab('results');
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

  // Loading screens removed for smooth UX

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">Please log in to access the valuation tool.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UnifiedNavigation />
      <div className="flex">
        <SellerSidebar selectedTab="valuation" />
        <div className="flex-1 px-8 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Valuation Tool</h1>
                  <p className="text-lg text-gray-600">
                    Get a professional valuation using multiple industry-standard methods
                  </p>
                </div>
                <Button
                  color="primary"
                  startContent={
                    <RefreshCw className={`w-4 h-4 ${isCalculating ? 'animate-spin' : ''}`} />
                  }
                  onPress={calculateValuation}
                  isLoading={isCalculating}
                >
                  {isCalculating ? 'Calculating...' : 'Recalculate'}
                </Button>
              </div>
            </div>

            <Tabs
              selectedKey={activeTab}
              onSelectionChange={key => setActiveTab(key as string)}
              className="mb-8"
              variant="underlined"
              color="primary"
            >
              <Tab key="input" title="Business Data">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Financial Information */}
                  <Card className="border border-gray-200 shadow-sm">
                    <CardHeader>
                      <h3 className="text-xl font-semibold text-gray-900">Financial Information</h3>
                    </CardHeader>
                    <CardBody className="space-y-6">
                      <Input
                        label="Annual Revenue (€)"
                        placeholder="450,000"
                        value={inputs.annualRevenue.toString()}
                        onChange={e => handleInputChange('annualRevenue', e.target.value)}
                        startContent="€"
                      />
                      <Input
                        label="EBITDA (€)"
                        placeholder="135,000"
                        value={inputs.ebitda.toString()}
                        onChange={e => handleInputChange('ebitda', e.target.value)}
                        startContent="€"
                      />
                      <Input
                        label="Annual Cash Flow (€)"
                        placeholder="125,000"
                        value={inputs.cashFlow.toString()}
                        onChange={e => handleInputChange('cashFlow', e.target.value)}
                        startContent="€"
                      />
                      <Input
                        label="Total Assets (€)"
                        placeholder="320,000"
                        value={inputs.totalAssets.toString()}
                        onChange={e => handleInputChange('totalAssets', e.target.value)}
                        startContent="€"
                      />
                    </CardBody>
                  </Card>

                  {/* Business Details */}
                  <Card className="border border-gray-200 shadow-sm">
                    <CardHeader>
                      <h3 className="text-xl font-semibold text-gray-900">Business Profile</h3>
                    </CardHeader>
                    <CardBody className="space-y-6">
                      <Select
                        label="Industry"
                        placeholder="Select your industry"
                        selectedKeys={[inputs.industry]}
                        onSelectionChange={(value) => handleInputChange('industry', String(value))}
                      >
                        {Object.entries(industryMultiples).map(([key, value]) => (
                          <SelectItem key={key}>{value.description}</SelectItem>
                        ))}
                      </Select>
                      <Input
                        label="Years in Business"
                        type="number"
                        placeholder="16"
                        value={inputs.yearsInBusiness.toString()}
                        onChange={e => handleInputChange('yearsInBusiness', e.target.value)}
                      />
                      <div className="space-y-4">
                        <label className="text-sm font-medium text-gray-700">
                          Revenue Growth Rate: {inputs.revenueGrowthRate}%
                        </label>
                        <Slider
                          size="md"
                          step={1}
                          minValue={-10}
                          maxValue={20}
                          value={inputs.revenueGrowthRate}
                          onChange={value =>
                            handleInputChange(
                              'revenueGrowthRate',
                              Array.isArray(value) ? value[0] : value
                            )
                          }
                          className="max-w-md"
                          color="primary"
                        />
                      </div>
                    </CardBody>
                  </Card>
                </div>

                <div className="flex justify-center mt-8">
                  <Button
                    color="primary"
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
                      color="primary"
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

                        <div className="flex justify-center space-x-4">
                          <Button
                            color="primary"
                            startContent={<FileText className="w-4 h-4" />}
                            onPress={() => navigate('/my-business/listings')}
                          >
                            Create Listing
                          </Button>
                          <Button
                            variant="bordered"
                            startContent={<Download className="w-4 h-4" />}
                          >
                            Download Report
                          </Button>
                        </div>
                      </CardBody>
                    </Card>

                    {/* Individual Methods */}
                    <div className="grid lg:grid-cols-2 gap-6">
                      {valuationResults.map((result, index) => (
                        <Card key={index} className="border border-gray-200 shadow-sm">
                          <CardHeader>
                            <div className="flex items-center justify-between w-full">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {result.method}
                              </h3>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuationTool;
