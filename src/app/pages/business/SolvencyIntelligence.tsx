import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Progress, Chip } from '@heroui/react';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Calculator,
  Bell,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Wallet,
  Building2,
  Info,
  Target,
} from 'lucide-react';
import { authService } from '../../services/users/authenticationService';
import { User as UserType } from '../../types/api/users/user';
import UnifiedNavigation from '../../components/navigation/UnifiedNavigation';
import SellerSidebar from '../../components/navigation/SellerSidebar';
import FinancialDisclaimer from '../../components/ui/FinancialDisclaimer';

interface SolvencyMetrics {
  currentRatio: number;        // Current Assets / Current Liabilities
  quickRatio: number;          // (Current Assets - Inventory) / Current Liabilities  
  debtToEquity: number;        // Total Debt / Total Equity
  workingCapital: number;      // Current Assets - Current Liabilities (in €)
  cashFlow: number;            // Monthly cash flow trend (in €)
  solvencyScore: number;       // 0-100 calculated score
  bankLoanEligibility: 'excellent' | 'good' | 'fair' | 'poor';
  industryRanking: number;     // Percentile vs industry (0-100)
}

interface BusinessFinancials {
  currentAssets: number;
  currentLiabilities: number;
  inventory: number;
  totalDebt: number;
  totalEquity: number;
  monthlyCashFlow: number;
  sector: string;
}

const SolvencyIntelligence = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [solvencyData, setSolvencyData] = useState<SolvencyMetrics | null>(null);
  const [maxLoanAmount, setMaxLoanAmount] = useState<number>(0);
  const [showLoanCalculator, setShowLoanCalculator] = useState(false);

  useEffect(() => {
    const initializePage = async () => {
      setIsLoading(true);
      try {
        const authResult = await authService.checkAuthentication();
        if (authResult.isAuthenticated && authResult.user) {
          setUser(authResult.user);

          // TODO: Replace with actual API calls
          // Mock financial data for Café Delice Brussels
          const mockFinancials: BusinessFinancials = {
            currentAssets: 185000,      // €185K in current assets
            currentLiabilities: 95000,   // €95K in current liabilities  
            inventory: 25000,           // €25K inventory
            totalDebt: 120000,          // €120K total debt
            totalEquity: 280000,        // €280K equity
            monthlyCashFlow: 12500,     // €12.5K monthly positive cash flow
            sector: 'Food & Beverage'
          };

          // Calculate solvency metrics
          const metrics = calculateSolvencyMetrics(mockFinancials);
          setSolvencyData(metrics);
          
          // Calculate max loan amount based on solvency
          const loanAmount = calculateMaxLoanAmount(metrics, mockFinancials);
          setMaxLoanAmount(loanAmount);
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

  const calculateSolvencyMetrics = (financials: BusinessFinancials): SolvencyMetrics => {
    const currentRatio = financials.currentAssets / financials.currentLiabilities;
    const quickRatio = (financials.currentAssets - financials.inventory) / financials.currentLiabilities;
    const debtToEquity = financials.totalDebt / financials.totalEquity;
    const workingCapital = financials.currentAssets - financials.currentLiabilities;
    
    // Calculate overall solvency score (0-100)
    let score = 0;
    
    // Current ratio scoring (25 points max)
    if (currentRatio >= 2.0) score += 25;
    else if (currentRatio >= 1.5) score += 20;
    else if (currentRatio >= 1.2) score += 15;
    else if (currentRatio >= 1.0) score += 10;
    
    // Quick ratio scoring (25 points max)
    if (quickRatio >= 1.5) score += 25;
    else if (quickRatio >= 1.0) score += 20;
    else if (quickRatio >= 0.8) score += 15;
    else if (quickRatio >= 0.6) score += 10;
    
    // Debt-to-equity scoring (25 points max) - lower is better
    if (debtToEquity <= 0.3) score += 25;
    else if (debtToEquity <= 0.4) score += 20;
    else if (debtToEquity <= 0.6) score += 15;
    else if (debtToEquity <= 1.0) score += 10;
    
    // Cash flow scoring (25 points max)
    if (financials.monthlyCashFlow > 10000) score += 25;
    else if (financials.monthlyCashFlow > 5000) score += 20;
    else if (financials.monthlyCashFlow > 1000) score += 15;
    else if (financials.monthlyCashFlow > 0) score += 10;

    // Bank loan eligibility
    let eligibility: 'excellent' | 'good' | 'fair' | 'poor' = 'poor';
    if (score >= 80) eligibility = 'excellent';
    else if (score >= 65) eligibility = 'good';
    else if (score >= 50) eligibility = 'fair';

    // Mock industry ranking (better than X% of businesses)
    const industryRanking = Math.min(95, score + Math.random() * 10);

    return {
      currentRatio,
      quickRatio,
      debtToEquity,
      workingCapital,
      cashFlow: financials.monthlyCashFlow,
      solvencyScore: score,
      bankLoanEligibility: eligibility,
      industryRanking
    };
  };

  const calculateMaxLoanAmount = (metrics: SolvencyMetrics, financials: BusinessFinancials): number => {
    // Conservative loan calculation based on working capital and cash flow
    const workingCapitalLoan = metrics.workingCapital * 0.7; // 70% of working capital
    const cashFlowLoan = financials.monthlyCashFlow * 24; // 24 months of cash flow
    
    // Take the lower of the two for conservative estimate
    const baseLoan = Math.min(workingCapitalLoan, cashFlowLoan);
    
    // Adjust based on solvency score
    const multiplier = metrics.solvencyScore / 100;
    return Math.round(baseLoan * multiplier);
  };

  const getSolvencyColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 65) return 'text-gray-900';
    if (score >= 50) return 'text-gray-700';
    return 'text-red-600';
  };

  const getSolvencyBgColor = (score: number) => {
    if (score >= 80) return 'bg-gray-50 border-gray-300';
    if (score >= 65) return 'bg-gray-50 border-gray-300';
    if (score >= 50) return 'bg-gray-50 border-gray-300';
    return 'bg-gray-50 border-gray-300';
  };

  const isInSweetSpot = (ratio: number, type: 'current' | 'quick' | 'debt') => {
    if (type === 'current') return ratio >= 1.2 && ratio <= 2.5;
    if (type === 'quick') return ratio >= 1.0 && ratio <= 2.0;
    if (type === 'debt') return ratio >= 0.25 && ratio <= 0.45;
    return false;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading solvency analysis...</p>
        </div>
      </div>
    );
  }

  if (!user || !solvencyData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">Please log in to access solvency intelligence.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UnifiedNavigation />

      <div className="flex">
        <SellerSidebar selectedTab="solvency" userRole={user?.userType as 'seller' | 'buyer' | 'admin' || 'seller'} />

        <div className="flex-1 px-8 py-8">
          <div className="max-w-7xl space-y-8">
            
            {/* Header */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Solvency Intelligence Hub</h1>
              <p className="text-gray-600">Monitor your business financial health and bank loan eligibility</p>
            </div>

            {/* Financial Analysis Disclaimer */}
            <FinancialDisclaimer 
              type="solvency" 
              variant="banner"
              isCollapsible={true}
              className="mb-6"
            />

            {/* Overall Score Card */}
            <Card className={`border-2 ${getSolvencyBgColor(solvencyData.solvencyScore)}`}>
              <CardBody className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Overall Solvency Score</h2>
                    <div className="flex items-center space-x-4">
                      <span className={`text-5xl font-bold ${getSolvencyColor(solvencyData.solvencyScore)}`}>
                        {solvencyData.solvencyScore}/100
                      </span>
                      <div>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full bg-gray-100 ${
                          solvencyData.bankLoanEligibility === 'excellent' ? 'text-green-600' : 
                          solvencyData.bankLoanEligibility === 'good' ? 'text-gray-900' : 
                          solvencyData.bankLoanEligibility === 'fair' ? 'text-gray-700' : 'text-red-600'
                        }`}>
                          {solvencyData.bankLoanEligibility.toUpperCase()} RATING
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <BarChart3 className="w-5 h-5 text-gray-600" />
                      <span className="text-lg font-semibold text-gray-900">
                        Better than {Math.round(solvencyData.industryRanking)}% of {user.businessType || 'Food & Beverage'} businesses
                      </span>
                    </div>
                    <div className="w-64">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gray-900 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(solvencyData.industryRanking, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Key Ratios Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Current Ratio */}
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between w-full">
                    <h3 className="font-semibold text-gray-900">Current Ratio</h3>
                    {isInSweetSpot(solvencyData.currentRatio, 'current') && (
                      <Target className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {solvencyData.currentRatio.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      Current Assets ÷ Current Liabilities
                    </div>
                    {isInSweetSpot(solvencyData.currentRatio, 'current') && (
                      <div className="bg-gray-100 text-green-600 text-xs font-medium px-3 py-1 rounded-full">
                        🎯 Bank Loan Sweet Spot (1.2-2.5)
                      </div>
                    )}
                    <div className="mt-3 text-xs text-gray-500">
                      Working Capital: €{solvencyData.workingCapital.toLocaleString()}
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Quick Ratio */}
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between w-full">
                    <h3 className="font-semibold text-gray-900">Quick Ratio</h3>
                    {isInSweetSpot(solvencyData.quickRatio, 'quick') && (
                      <Target className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {solvencyData.quickRatio.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      (Current Assets - Inventory) ÷ Current Liabilities
                    </div>
                    {isInSweetSpot(solvencyData.quickRatio, 'quick') && (
                      <div className="bg-gray-100 text-green-600 text-xs font-medium px-3 py-1 rounded-full">
                        🎯 Bank Loan Sweet Spot (1.0-2.0)
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>

              {/* Debt-to-Equity */}
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between w-full">
                    <h3 className="font-semibold text-gray-900">Debt-to-Equity</h3>
                    {isInSweetSpot(solvencyData.debtToEquity, 'debt') && (
                      <Target className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {(solvencyData.debtToEquity * 100).toFixed(0)}%
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      Total Debt ÷ Total Equity
                    </div>
                    {isInSweetSpot(solvencyData.debtToEquity, 'debt') && (
                      <div className="bg-gray-100 text-green-600 text-xs font-medium px-3 py-1 rounded-full">
                        🎯 Healthy Range (25-45%)
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Bank Loan Eligibility */}
            <Card className="border border-gray-200 shadow-sm">
              <CardBody className="p-8">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <Wallet className="w-8 h-8 text-gray-600" />
                      <h3 className="text-2xl font-bold text-gray-900">Bank Loan Calculator</h3>
                    </div>
                    <p className="text-gray-700 mb-6">
                      Based on your current solvency ratios, you can qualify for:
                    </p>
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-gray-900 mb-2">
                          €{maxLoanAmount.toLocaleString()}
                        </div>
                        <div className="text-gray-600 font-medium mb-4">Maximum Loan Amount</div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Interest Rate Range:</span>
                            <div className="font-semibold">
                              {solvencyData.bankLoanEligibility === 'excellent' ? '2.5% - 4.5%' :
                               solvencyData.bankLoanEligibility === 'good' ? '4.5% - 6.5%' :
                               solvencyData.bankLoanEligibility === 'fair' ? '6.5% - 9.5%' : '9.5%+'}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-600">Approval Probability:</span>
                            <div className={`font-semibold ${
                              solvencyData.bankLoanEligibility === 'excellent' ? 'text-green-600' : 'text-gray-900'
                            }`}>
                              {solvencyData.bankLoanEligibility === 'excellent' ? '85-95%' :
                               solvencyData.bankLoanEligibility === 'good' ? '70-85%' :
                               solvencyData.bankLoanEligibility === 'fair' ? '45-70%' : '15-45%'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-8">
                    <Button
                      color="primary"
                      size="lg"
                      onPress={() => setShowLoanCalculator(true)}
                      className="px-8"
                      startContent={<Calculator className="w-5 h-5" />}
                    >
                      Get Pre-Qualification
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Monthly Alerts */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Bell className="w-6 h-6 text-gray-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Smart Alerts & Monitoring</h3>
                </div>
              </CardHeader>
              <CardBody>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Recent Alerts</h4>
                    
                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Current ratio improved to {solvencyData.currentRatio.toFixed(2)} 
                        </p>
                        <p className="text-xs text-green-600">
                          Your ratio is now in the bank loan sweet spot! 2 days ago
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Cash flow increased by €2,400 last month
                        </p>
                        <p className="text-xs text-green-600">
                          This improves your loan eligibility • 1 week ago
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <Info className="w-5 h-5 text-gray-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Industry benchmark update available
                        </p>
                        <p className="text-xs text-gray-600">
                          See how you compare to other Food & Beverage businesses • 3 days ago
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Improvement Recommendations</h4>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-2">Quick Wins</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Reduce inventory by €5K to improve quick ratio</li>
                        <li>• Pay down €10K of current debt to boost score</li>
                        <li>• Maintain current cash flow trend</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h5 className="font-medium text-gray-900 mb-2">Strategic Actions</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Consider equipment financing vs cash purchase</li>
                        <li>• Optimize payment terms with suppliers</li>
                        <li>• Schedule quarterly solvency reviews</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolvencyIntelligence;
