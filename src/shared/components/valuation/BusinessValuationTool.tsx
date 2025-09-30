import {
    Card,
    CardBody,
    CardHeader,
    Chip,
    Divider,
    Progress,
    Select,
    SelectItem,
    Slider
} from '@heroui/react';
import {
    AlertTriangle,
    BarChart3,
    Building2,
    Calculator,
    Clock,
    DollarSign,
    Info,
    TrendingUp,
    Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../buttons/Button';
import { Input } from '../forms';

interface ValuationInputs {
  sector: string;
  annualRevenue: number;
  ebitda: number;
  ebitdaMargin: number;
  yearsInBusiness: number;
  employees: number;
  growthRate: number;
  marketPosition: string;
  assets: number;
  debt: number;
  recurring_revenue_percentage: number;
}

interface ValuationResult {
  low: number;
  mid: number;
  high: number;
  multiple: number;
  method: string;
  confidence: 'Low' | 'Medium' | 'High';
  factors: string[];
}

const BusinessValuationTool = () => {
  const [inputs, setInputs] = useState<ValuationInputs>({
    sector: '',
    annualRevenue: 0,
    ebitda: 0,
    ebitdaMargin: 0,
    yearsInBusiness: 0,
    employees: 0,
    growthRate: 0,
    marketPosition: '',
    assets: 0,
    debt: 0,
    recurring_revenue_percentage: 0,
  });

  const [valuation, setValuation] = useState<ValuationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Sector multiples (based on market data) - Uitbreiding sectoren voor multiples
  const sectorMultiples: Record<
    string,
    {
      min: number;
      max: number;
      avg: number;
      description?: string;
      adjustmentFactors?: string[];
    }
  > = {
    Technology: {
      min: 3.5,
      max: 8.0,
      avg: 5.5,
      description: 'Technology companies benefit from scalability and IP value',
      adjustmentFactors: ['R&D investment', 'Patent portfolio', 'Market disruption potential'],
    },
    Software: {
      min: 4.0,
      max: 12.0,
      avg: 7.0,
      description: 'Software companies with recurring revenue models command premium multiples',
      adjustmentFactors: ['Subscription model', 'Customer retention', 'Scalability'],
    },
    SaaS: {
      min: 6.0,
      max: 15.0,
      avg: 9.0,
      description: 'SaaS companies often have higher multiples due to predictable revenue streams',
      adjustmentFactors: [
        'Monthly recurring revenue (MRR)',
        'Customer churn rate',
        'Customer acquisition cost (CAC)',
        'Lifetime value (LTV)',
        'Net revenue retention',
      ],
    },
    FinTech: {
      min: 4.5,
      max: 10.0,
      avg: 6.5,
      description: 'Financial technology companies with regulatory compliance and innovation',
      adjustmentFactors: ['Regulatory compliance', 'Transaction volume', 'User growth'],
    },
    'E-commerce': {
      min: 2.5,
      max: 6.0,
      avg: 4.0,
      description: 'E-commerce platforms valued on market share and logistics capabilities',
      adjustmentFactors: ['Market penetration', 'Logistics network', 'Customer base'],
    },
    Healthcare: {
      min: 2.5,
      max: 6.0,
      avg: 4.0,
      description: 'Healthcare companies with stable demand but regulatory considerations',
      adjustmentFactors: ['Regulatory compliance', 'Patient base', 'Insurance coverage'],
    },
    Manufacturing: {
      min: 2.0,
      max: 4.5,
      avg: 3.0,
      description: 'Manufacturing businesses with asset-heavy models and cyclical demand',
      adjustmentFactors: ['Asset efficiency', 'Market cycles', 'Automation level'],
    },
    Retail: {
      min: 1.5,
      max: 3.5,
      avg: 2.5,
      description: 'Retail businesses face margin pressure and digital transformation needs',
      adjustmentFactors: ['Location quality', 'Brand strength', 'Digital presence'],
    },
    'Food & Beverage': {
      min: 2.0,
      max: 4.0,
      avg: 3.0,
      description: 'Food & beverage companies with brand value and distribution networks',
      adjustmentFactors: ['Brand recognition', 'Distribution channels', 'Product differentiation'],
    },
    'Professional Services': {
      min: 2.5,
      max: 5.0,
      avg: 3.5,
      description: 'Service businesses valued on expertise and client relationships',
      adjustmentFactors: ['Client retention', 'Expertise depth', 'Scalability potential'],
    },
    Construction: {
      min: 1.8,
      max: 3.5,
      avg: 2.5,
      description: 'Construction companies with project-based revenue and cyclical markets',
      adjustmentFactors: ['Project backlog', 'Market cycles', 'Specialization'],
    },
    Transportation: {
      min: 2.0,
      max: 4.0,
      avg: 3.0,
      description: 'Transportation businesses with infrastructure and operational efficiency',
      adjustmentFactors: ['Fleet condition', 'Route optimization', 'Fuel efficiency'],
    },
    Education: {
      min: 2.5,
      max: 5.0,
      avg: 3.5,
      description: 'Education companies with stable demand and technology integration',
      adjustmentFactors: ['Student retention', 'Technology adoption', 'Accreditation'],
    },
  };

  useEffect(() => {
    // Auto-calculate EBITDA margin when revenue and EBITDA change
    if (inputs.annualRevenue > 0 && inputs.ebitda > 0) {
      const margin = (inputs.ebitda / inputs.annualRevenue) * 100;
      setInputs(prev => ({ ...prev, ebitdaMargin: Math.round(margin * 100) / 100 }));
    }
  }, [inputs.annualRevenue, inputs.ebitda]);

  const calculateValuation = () => {
    setIsCalculating(true);

    // Simulate calculation delay
    setTimeout(() => {
      const result = performValuation();
      setValuation(result);
      setIsCalculating(false);
    }, 1500);
  };

  const performValuation = (): ValuationResult => {
    const {
      sector,
      ebitda,
      growthRate,
      marketPosition,
      yearsInBusiness,
      recurring_revenue_percentage,
    } = inputs;

    if (!sector || ebitda <= 0) {
      return {
        low: 0,
        mid: 0,
        high: 0,
        multiple: 0,
        method: 'Insufficient data',
        confidence: 'Low',
        factors: ['Please provide sector and positive EBITDA'],
      };
    }

    const sectorData = sectorMultiples[sector] || { min: 2.0, max: 4.0, avg: 3.0 };
    let baseMultiple = sectorData.avg;

    // Adjustment factors
    const factors: string[] = [];

    // Growth rate adjustment
    if (growthRate > 20) {
      baseMultiple *= 1.3;
      factors.push('High growth rate (+30%)');
    } else if (growthRate > 10) {
      baseMultiple *= 1.15;
      factors.push('Good growth rate (+15%)');
    } else if (growthRate < 0) {
      baseMultiple *= 0.8;
      factors.push('Negative growth (-20%)');
    }

    // Market position adjustment
    if (marketPosition === 'market_leader') {
      baseMultiple *= 1.2;
      factors.push('Market leader position (+20%)');
    } else if (marketPosition === 'strong_competitor') {
      baseMultiple *= 1.1;
      factors.push('Strong competitive position (+10%)');
    } else if (marketPosition === 'struggling') {
      baseMultiple *= 0.8;
      factors.push('Struggling market position (-20%)');
    }

    // Business maturity adjustment
    if (yearsInBusiness > 15) {
      baseMultiple *= 1.1;
      factors.push('Established business (+10%)');
    } else if (yearsInBusiness < 3) {
      baseMultiple *= 0.9;
      factors.push('Young business (-10%)');
    }

    // Recurring revenue adjustment
    if (recurring_revenue_percentage > 70) {
      baseMultiple *= 1.25;
      factors.push('High recurring revenue (+25%)');
    } else if (recurring_revenue_percentage > 40) {
      baseMultiple *= 1.15;
      factors.push('Good recurring revenue (+15%)');
    }

    // EBITDA margin adjustment
    if (inputs.ebitdaMargin > 25) {
      baseMultiple *= 1.1;
      factors.push('High profitability (+10%)');
    } else if (inputs.ebitdaMargin < 10) {
      baseMultiple *= 0.9;
      factors.push('Low profitability (-10%)');
    }

    const midValuation = ebitda * baseMultiple;
    const lowValuation = ebitda * (baseMultiple * 0.8);
    const highValuation = ebitda * (baseMultiple * 1.2);

    // Determine confidence level
    let confidence: 'Low' | 'Medium' | 'High' = 'Medium';
    if (yearsInBusiness < 2 || inputs.ebitdaMargin < 5) {
      confidence = 'Low';
    } else if (yearsInBusiness > 10 && inputs.ebitdaMargin > 15 && growthRate > 0) {
      confidence = 'High';
    }

    return {
      low: Math.round(lowValuation),
      mid: Math.round(midValuation),
      high: Math.round(highValuation),
      multiple: Math.round(baseMultiple * 100) / 100,
      method: 'EBITDA Multiple',
      confidence,
      factors,
    };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'High':
        return 'success';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'danger';
      default:
        return 'default';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Calculator className="w-6 h-6 text-primary-600" />
            <div>
              <h2 className="text-2xl font-bold">Business Valuation Tool</h2>
              <p className="text-gray-600">
                Get an estimated valuation range using industry-standard EBITDA multiples
              </p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-primary-50 rounded-lg">
            <h4 className="font-semibold text-primary-800 mb-2">📊 What are Multiples?</h4>
            <p className="text-sm text-primary-700">
              <strong>
                Multiples are financial ratios used to determine company value by comparing to
                similar companies or transactions.
              </strong>
              A common multiple is the EBITDA multiple, where enterprise value is divided by EBITDA
              (earnings before interest, taxes, depreciation and amortization). Different sectors
              have different typical multiples due to varying growth rates, profitability, and
              market dynamics.
            </p>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Business Basics */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Business Information
              </h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <Select
                label="Business Sector *"
                placeholder="Select your business sector"
                selectedKeys={inputs.sector ? [inputs.sector] : []}
                onSelectionChange={keys => {
                  const sector = Array.from(keys)[0] as string;
                  setInputs(prev => ({ ...prev, sector }));
                }}
              >
                {Object.keys(sectorMultiples).map(sector => (
                  <SelectItem key={sector}>{sector}</SelectItem>
                ))}
              </Select>

              {/* Sector-specific information */}
              {inputs.sector && sectorMultiples[inputs.sector] && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    {inputs.sector} Sector Analysis
                  </h4>
                  <p className="text-sm text-amber-700 mb-3">
                    {sectorMultiples[inputs.sector].description}
                  </p>
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center">
                      <div className="text-lg font-bold text-amber-800">
                        {sectorMultiples[inputs.sector].min}x
                      </div>
                      <div className="text-xs text-amber-600">Min Multiple</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-amber-800">
                        {sectorMultiples[inputs.sector].avg}x
                      </div>
                      <div className="text-xs text-amber-600">Avg Multiple</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-amber-800">
                        {sectorMultiples[inputs.sector].max}x
                      </div>
                      <div className="text-xs text-amber-600">Max Multiple</div>
                    </div>
                  </div>
                  {sectorMultiples[inputs.sector].adjustmentFactors && (
                    <div>
                      <div className="text-xs font-medium text-amber-800 mb-1">
                        Key Valuation Factors:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {sectorMultiples[inputs.sector].adjustmentFactors?.map((factor, index) => (
                          <Chip key={index} size="sm" variant="flat" color="warning">
                            {factor}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="number"
                  label="Annual Revenue *"
                  placeholder="1000000"
                  description="Total revenue - foundation for EBITDA calculation"
                  value={inputs.annualRevenue.toString()}
                  onChange={e =>
                    setInputs(prev => ({
                      ...prev,
                      annualRevenue: parseInt(e.target.value) || 0,
                    }))
                  }
                  leftIcon={<DollarSign className="w-4 h-4 text-gray-400" />}
                  rightIcon={<span className="text-gray-500">EUR</span>}
                />

                <Input
                  type="number"
                  label="EBITDA *"
                  placeholder="200000"
                  description="Earnings before Interest, Taxes, Depreciation & Amortization"
                  value={inputs.ebitda.toString()}
                  onChange={e =>
                    setInputs(prev => ({
                      ...prev,
                      ebitda: parseInt(e.target.value) || 0,
                    }))
                  }
                  leftIcon={<TrendingUp className="w-4 h-4 text-gray-400" />}
                  rightIcon={<span className="text-gray-500">EUR</span>}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  type="number"
                  label="EBITDA Margin"
                  value={inputs.ebitdaMargin.toString()}
                  disabled
                  rightIcon={<span className="text-gray-500">%</span>}
                  description="Auto-calculated"
                />

                <Input
                  type="number"
                  label="Years in Business"
                  placeholder="5"
                  value={inputs.yearsInBusiness.toString()}
                  onChange={e =>
                    setInputs(prev => ({
                      ...prev,
                      yearsInBusiness: parseInt(e.target.value) || 0,
                    }))
                  }
                  leftIcon={<Clock className="w-4 h-4 text-gray-400" />}
                />

                <Input
                  type="number"
                  label="Number of Employees"
                  placeholder="15"
                  value={inputs.employees.toString()}
                  onChange={e =>
                    setInputs(prev => ({
                      ...prev,
                      employees: parseInt(e.target.value) || 0,
                    }))
                  }
                  leftIcon={<Users className="w-4 h-4 text-gray-400" />}
                />
              </div>
            </CardBody>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Performance & Position
              </h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Annual Growth Rate</label>
                  <span className="text-sm text-gray-600">{inputs.growthRate}%</span>
                </div>
                <Slider
                  step={1}
                  minValue={-20}
                  maxValue={50}
                  value={inputs.growthRate}
                  onChange={value => setInputs(prev => ({ ...prev, growthRate: value as number }))}
                  className="max-w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Recurring Revenue %</label>
                  <span className="text-sm text-gray-600">
                    {inputs.recurring_revenue_percentage}%
                  </span>
                </div>
                <Slider
                  step={5}
                  minValue={0}
                  maxValue={100}
                  value={inputs.recurring_revenue_percentage}
                  onChange={value =>
                    setInputs(prev => ({ ...prev, recurring_revenue_percentage: value as number }))
                  }
                  className="max-w-full"
                />
              </div>

              <Select
                label="Market Position"
                placeholder="Select market position"
                selectedKeys={inputs.marketPosition ? [inputs.marketPosition] : []}
                onSelectionChange={keys => {
                  const position = Array.from(keys)[0] as string;
                  setInputs(prev => ({ ...prev, marketPosition: position }));
                }}
              >
                <SelectItem key="market_leader">Market Leader</SelectItem>
                <SelectItem key="strong_competitor">Strong Competitor</SelectItem>
                <SelectItem key="average_player">Average Player</SelectItem>
                <SelectItem key="niche_player">Niche Player</SelectItem>
                <SelectItem key="struggling">Struggling</SelectItem>
              </Select>
            </CardBody>
          </Card>

          {/* Calculate Button */}
          <Button
            variant="primary"
            size="lg"
            onPress={calculateValuation}
            isLoading={isCalculating}
            isDisabled={!inputs.sector || inputs.ebitda <= 0}
            className="w-full"
            startContent={<Calculator className="w-5 h-5" />}
          >
            {isCalculating ? 'Calculating...' : 'Calculate Valuation'}
          </Button>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          {valuation ? (
            <>
              {/* Valuation Range */}
              <Card className="border-primary-200">
                <CardHeader>
                  <h3 className="text-lg font-semibold text-primary-800">Valuation Estimate</h3>
                </CardHeader>
                <CardBody className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2">
                      {formatCurrency(valuation.mid)}
                    </div>
                    <p className="text-sm text-gray-600">Estimated Value</p>

                    <div className="flex justify-between text-sm text-gray-600 mt-4">
                      <span>Low: {formatCurrency(valuation.low)}</span>
                      <span>High: {formatCurrency(valuation.high)}</span>
                    </div>

                    <Progress
                      value={50}
                      color="primary"
                      className="mt-2"
                      aria-label="Valuation range"
                    />
                  </div>

                  <Divider />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Multiple Used:</span>
                      <span className="font-medium">{valuation.multiple}x EBITDA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Method:</span>
                      <span className="font-medium">{valuation.method}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Confidence:</span>
                      <Chip
                        size="sm"
                        color={getConfidenceColor(valuation.confidence)}
                        variant="flat"
                      >
                        {valuation.confidence}
                      </Chip>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Adjustment Factors */}
              {valuation.factors.length > 0 && (
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Valuation Factors</h3>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-2">
                      {valuation.factors.map((factor, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                          <span>{factor}</span>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              )}

              {/* Disclaimer */}
              <Card className="border-yellow-200 bg-yellow-50">
                <CardBody>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-medium mb-1">Disclaimer</p>
                      <p>
                        This is an estimated valuation based on standard industry multiples and
                        should not be considered as professional advice. Actual valuations may vary
                        significantly based on market conditions, detailed due diligence, and other
                        factors.
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </>
          ) : (
            <Card>
              <CardBody className="text-center py-12">
                <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Calculate</h3>
                <p className="text-gray-600 text-sm">
                  Fill in your business information and click calculate to get an estimated
                  valuation range.
                </p>
              </CardBody>
            </Card>
          )}

          {/* Help Card */}
          <Card className="border-gray-200">
            <CardHeader>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Info className="w-5 h-5" />
                About This Tool
              </h3>
            </CardHeader>
            <CardBody className="text-sm text-gray-600 space-y-2">
              <p>
                This valuation tool uses industry-standard EBITDA multiples adjusted for your
                business characteristics.
              </p>
              <p>Factors considered include:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Industry sector multiples</li>
                <li>Growth rate and profitability</li>
                <li>Market position and maturity</li>
                <li>Revenue quality and predictability</li>
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BusinessValuationTool;
