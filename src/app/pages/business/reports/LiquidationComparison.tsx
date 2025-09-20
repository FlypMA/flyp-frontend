import { Button } from '@/shared/components/buttons';
import { authService } from '@/shared/services/auth';
import { User as UserType } from '@/shared/types';
import { Card, CardBody, CardHeader, Progress } from '@heroui/react';
import { AlertTriangle, ArrowRight, Calculator, CheckCircle, Clock, Target, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Navigation and sidebar are provided by DashboardLayout
import FinancialDisclaimer from '@/shared/components/disclaimers/FinancialDisclaimer';

interface LiquidationAnalysis {
  strategicSaleValue: number; // Current valuation from business overview
  liquidationValue: number; // Asset disposal estimate
  valueLoss: number; // Difference in euros
  valueLossPercentage: number; // Percentage destroyed
  employeeSeveranceCost: number; // Severance obligations
  netLiquidationProceeds: number; // After all costs
  dailyValueLoss: number; // Value lost per day of delay
  timeToLiquidate: number; // Months to complete liquidation
}

interface SuccessStory {
  businessName: string;
  sector: string;
  strategicSale: number;
  potentialLiquidation: number;
  timeframe: string;
  keyFactor: string;
}

const LiquidationComparison = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [liquidationData, setLiquidationData] = useState<LiquidationAnalysis | null>(null);
  const [daysSinceValuation, setDaysSinceValuation] = useState(0);
  const [_showCalculator, _setShowCalculator] = useState(false);

  useEffect(() => {
    const initializePage = async () => {
      setIsLoading(true);
      try {
        const authResult = await authService.checkAuthentication();
        if (authResult.isAuthenticated && authResult.user) {
          setUser(authResult.user);

          // TODO: Replace with actual API calls
          // Mock data for Café Delice Brussels
          const mockAnalysis = calculateLiquidationAnalysis({
            currentValuation: 850000, // €850K from valuation
            assetValue: 320000, // €320K in tangible assets
            inventory: 25000, // €25K inventory
            equipment: 180000, // €180K equipment
            employeeCount: 8, // 8 employees
            averageSalary: 35000, // €35K average salary
            monthsOfSeverance: 3, // 3 months severance
            liquidationCosts: 45000, // Legal, auction, administrative costs
            sector: 'Food & Beverage',
          });

          setLiquidationData(mockAnalysis);

          // Calculate days since last valuation (mock)
          const valuationDate = new Date('2024-01-14');
          const today = new Date();
          const diffTime = Math.abs(today.getTime() - valuationDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          setDaysSinceValuation(diffDays);
        } else {
          navigate('/');
        }
      } catch (error) {
        // console.error('Error initializing page:', error);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    initializePage();
  }, [navigate]);

  const calculateLiquidationAnalysis = (data: {
    currentValuation: number;
    assetValue: number;
    inventory: number;
    equipment: number;
    employeeCount: number;
    averageSalary: number;
    monthsOfSeverance: number;
    liquidationCosts: number;
    sector: string;
  }): LiquidationAnalysis => {
    // Liquidation typically recovers 15-25% of assets due to fire sale conditions
    const assetRecoveryRate = 0.2; // 20% recovery
    const inventoryRecoveryRate = 0.1; // 10% for perishable/restaurant inventory
    const equipmentRecoveryRate = 0.25; // 25% for used restaurant equipment

    const assetRecovery = data.assetValue * assetRecoveryRate;
    const inventoryRecovery = data.inventory * inventoryRecoveryRate;
    const equipmentRecovery = data.equipment * equipmentRecoveryRate;

    const totalAssetRecovery = assetRecovery + inventoryRecovery + equipmentRecovery;

    // Calculate severance costs
    const severanceCost = data.employeeCount * (data.averageSalary / 12) * data.monthsOfSeverance;

    // Net liquidation proceeds after costs
    const netProceeds = totalAssetRecovery - severanceCost - data.liquidationCosts;

    // Value loss calculations
    const valueLoss = data.currentValuation - Math.max(0, netProceeds);
    const valueLossPercentage = (valueLoss / data.currentValuation) * 100;

    // Daily value loss (assumes declining business value over time)
    const dailyValueLoss = data.currentValuation * 0.002; // 0.2% per day

    return {
      strategicSaleValue: data.currentValuation,
      liquidationValue: Math.max(0, netProceeds),
      valueLoss,
      valueLossPercentage,
      employeeSeveranceCost: severanceCost,
      netLiquidationProceeds: Math.max(0, netProceeds),
      dailyValueLoss,
      timeToLiquidate: 6, // 6 months typical liquidation time
    };
  };

  const successStories: SuccessStory[] = [
    {
      businessName: 'Café Milano',
      sector: 'Italian Restaurant',
      strategicSale: 1200000,
      potentialLiquidation: 180000,
      timeframe: '4 months',
      keyFactor: 'Loyal customer base and prime location',
    },
    {
      businessName: 'TechStart Solutions',
      sector: 'Software Development',
      strategicSale: 2800000,
      potentialLiquidation: 320000,
      timeframe: '6 months',
      keyFactor: 'Intellectual property and recurring revenue',
    },
    {
      businessName: 'Green Gardens Nursery',
      sector: 'Garden Center',
      strategicSale: 650000,
      potentialLiquidation: 95000,
      timeframe: '8 months',
      keyFactor: 'Established supplier relationships and customer loyalty',
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading liquidation analysis...</p>
        </div>
      </div>
    );
  }

  if (!user || !liquidationData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">Please log in to access liquidation analysis.</p>
        </div>
      </div>
    );
  }

  const cumulativeValueLoss = liquidationData.dailyValueLoss * daysSinceValuation;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation and sidebar provided by DashboardLayout */}
      <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        {/* Header with Urgency */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-900">Liquidation vs Strategic Sale</h1>
          </div>
          <p className="text-gray-600 text-lg">
            See the shocking difference between strategic sale and liquidation value
          </p>
        </div>

        {/* Critical Disclaimer */}
        <FinancialDisclaimer type="liquidation" variant="banner" className="mb-8" />

        {/* Shocking Value Comparison */}
        <Card className="border border-gray-200 shadow-sm">
          <CardBody className="p-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Your Business Value Comparison
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Strategic Sale */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Strategic Sale</h3>
                  <div className="text-5xl font-bold text-gray-900 mb-4">
                    €{liquidationData.strategicSaleValue.toLocaleString()}
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2 text-left">
                    <li>✅ Full business value realized</li>
                    <li>✅ Buyer values customer relationships</li>
                    <li>✅ Equipment sold at fair market value</li>
                    <li>✅ Goodwill and brand value included</li>
                    <li>✅ Orderly transition process</li>
                    <li>✅ Employees often retained</li>
                  </ul>
                </div>
              </div>

              {/* Liquidation */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="text-center">
                  <X className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Forced Liquidation</h3>
                  <div className="text-5xl font-bold text-gray-900 mb-4">
                    €{liquidationData.netLiquidationProceeds.toLocaleString()}
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2 text-left">
                    <li>❌ Fire sale prices (15-25% of value)</li>
                    <li>❌ Customer relationships lost</li>
                    <li>❌ Equipment sold at auction prices</li>
                    <li>❌ No goodwill or intangible value</li>
                    <li>❌ Rushed, distressed sale process</li>
                    <li>❌ All employees terminated</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Dramatic Loss Visualization */}
            <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Value Destruction</h3>
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <span className="text-4xl font-bold text-red-600">
                    -€{liquidationData.valueLoss.toLocaleString()}
                  </span>
                  <span className="text-2xl text-gray-600">
                    ({liquidationData.valueLossPercentage.toFixed(0)}% lost!)
                  </span>
                </div>
                <Progress
                  value={liquidationData.valueLossPercentage}
                  color="danger"
                  className="w-full max-w-lg mx-auto"
                  size="lg"
                />
                <p className="text-gray-600 mt-4">
                  Liquidation destroys{' '}
                  <strong>{liquidationData.valueLossPercentage.toFixed(0)}%</strong> of your
                  business value
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Daily Value Loss Counter */}
        <Card className="border border-gray-200 shadow-sm">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <Clock className="w-6 h-6 text-gray-600" />
                  <h3 className="text-xl font-bold text-gray-900">Time is Money</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Every day without strategic planning costs your business value
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-600">Daily Value Loss</div>
                    <div className="text-2xl font-bold text-gray-900">
                      €{liquidationData.dailyValueLoss.toLocaleString()}/day
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">
                      Lost Since Last Valuation ({daysSinceValuation} days ago)
                    </div>
                    <div className="text-2xl font-bold text-red-600">
                      €{Math.round(cumulativeValueLoss).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button
                  variant="primary"
                  size="lg"
                  onPress={() => navigate('/business/valuation')}
                  className="px-8"
                  endContent={<ArrowRight className="w-5 h-5" />}
                >
                  Update Your Valuation
                </Button>
                <p className="text-xs text-gray-500 mt-2">Start strategic planning today</p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Liquidation Cost Breakdown */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Cost Breakdown */}
          <Card className="border border-gray-200">
            <CardHeader>
              <h3 className="text-xl font-semibold text-gray-900">Liquidation Cost Breakdown</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-gray-700">Asset Recovery (20% of value)</span>
                  <span className="font-semibold text-green-600">
                    +€{(liquidationData.strategicSaleValue * 0.4 * 0.2).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-gray-700">Employee Severance</span>
                  <span className="font-semibold text-red-600">
                    -€{liquidationData.employeeSeveranceCost.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-gray-700">Legal & Administrative Costs</span>
                  <span className="font-semibold text-red-600">-€45,000</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-gray-700">Auction & Marketing Fees</span>
                  <span className="font-semibold text-red-600">-€15,000</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Net Liquidation Proceeds</span>
                    <span className="text-red-600">
                      €{liquidationData.netLiquidationProceeds.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Timeline Comparison */}
          <Card className="border border-gray-200">
            <CardHeader>
              <h3 className="text-xl font-semibold text-gray-900">Process Comparison</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-green-700 mb-3">Strategic Sale Process</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Preparation & Marketing</span>
                      <span className="text-green-600">2-3 months</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Due Diligence</span>
                      <span className="text-green-600">1-2 months</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Negotiation & Closing</span>
                      <span className="text-green-600">1 month</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total Timeline</span>
                      <span className="text-green-600">4-6 months</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-red-700 mb-3">Liquidation Process</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Legal Proceedings</span>
                      <span className="text-red-600">1-2 months</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Asset Inventory & Appraisal</span>
                      <span className="text-red-600">2-3 months</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Auction & Asset Sales</span>
                      <span className="text-red-600">2-3 months</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total Timeline</span>
                      <span className="text-red-600">5-8 months</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Success Stories */}
        <Card className="border border-gray-200">
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-900">
              Success Stories: Strategic Sales vs Potential Liquidations
            </h3>
          </CardHeader>
          <CardBody>
            <div className="grid md:grid-cols-3 gap-6">
              {successStories.map((story, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">{story.businessName}</h4>
                  <p className="text-sm text-gray-600 mb-3">{story.sector}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-green-700">Strategic Sale:</span>
                      <span className="font-semibold text-green-700">
                        €{story.strategicSale.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-red-700">Liquidation Est:</span>
                      <span className="font-semibold text-red-700">
                        €{story.potentialLiquidation.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-sm font-medium">Value Saved:</span>
                      <span className="font-bold text-green-600">
                        €{(story.strategicSale - story.potentialLiquidation).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-600">
                    <p>
                      <strong>Timeline:</strong> {story.timeframe}
                    </p>
                    <p>
                      <strong>Key Factor:</strong> {story.keyFactor}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Call to Action */}
        <Card className="border border-gray-200 shadow-sm">
          <CardBody className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Don't Let Your Life's Work Be Sold for Scrap
            </h3>
            <p className="text-gray-700 text-lg mb-6 max-w-3xl mx-auto">
              Every successful business deserves a strategic exit. Start planning today to preserve
              and maximize the value you've built over years of hard work.
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                variant="primary"
                size="lg"
                onPress={() => navigate('/business/valuation')}
                className="px-8"
                endContent={<Calculator className="w-5 h-5" />}
              >
                Get Strategic Valuation
              </Button>
              <Button
                variant="tertiary"
                size="lg"
                onPress={() => navigate('/business/listings')}
                className="px-8"
                endContent={<Target className="w-5 h-5" />}
              >
                Plan Your Exit Strategy
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default LiquidationComparison;
