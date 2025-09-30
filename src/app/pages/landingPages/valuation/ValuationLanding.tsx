/**
 * 🎯 Valuation Landing Page - Track Your Business Value
 *
 * STRATEGY:
 * - Simplified interactive valuation calculator
 * - Compelling comparison: Strategic Sale vs. Liquidation
 * - Based on 12-36 month exploration journey
 * - No pressure to list immediately
 *
 * INSPIRATION:
 * - Ilara creators page (comparison section)
 * - Interactive calculator from ValuationVariationC
 * - Typeform-style engagement
 */

import { Button } from '@/shared/components/buttons';
import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { seoData } from '@/shared/utils/seo/seoData';
import { Card, CardBody, Select, SelectItem, Slider } from '@heroui/react';
import {
  AlertTriangle,
  ArrowRight,
  Award,
  Building2,
  Calculator,
  CheckCircle,
  Sparkles,
  Target,
  TrendingUp,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../providers/auth-provider';

const ValuationLanding = () => {
  const navigate = useNavigate();
  const { openModal, user } = useAuth();

  // Calculator state
  const [revenue, setRevenue] = useState(500000);
  const [industry, setIndustry] = useState('technology');
  const [profitMargin, setProfitMargin] = useState(20);
  const [yearsOperating, setYearsOperating] = useState(5);

  // Industry multipliers (realistic SDE/EBITDA multiples for SMEs)
  const industryMultipliers: Record<string, { min: number; max: number; label: string }> = {
    technology: { min: 3.5, max: 6.0, label: 'Technology & SaaS' },
    professional: { min: 2.5, max: 4.5, label: 'Professional Services' },
    ecommerce: { min: 2.0, max: 4.0, label: 'E-commerce' },
    manufacturing: { min: 3.0, max: 5.0, label: 'Manufacturing' },
    healthcare: { min: 4.0, max: 6.5, label: 'Healthcare Services' },
    food: { min: 1.5, max: 3.5, label: 'Food & Beverage' },
    retail: { min: 1.5, max: 3.0, label: 'Retail' },
    consulting: { min: 2.0, max: 4.0, label: 'Consulting' },
  };

  // Calculate valuation
  const calculateValuation = () => {
    const profit = (revenue * profitMargin) / 100;
    const multiplier = industryMultipliers[industry];

    // Adjust multiplier based on years operating
    const maturityBonus = Math.min(yearsOperating / 10, 0.3); // Up to 30% bonus for mature businesses
    const adjustedMin = multiplier.min * (1 + maturityBonus);
    const adjustedMax = multiplier.max * (1 + maturityBonus);

    const valuationMin = Math.round(profit * adjustedMin);
    const valuationMax = Math.round(profit * adjustedMax);

    return { valuationMin, valuationMax, profit };
  };

  const { valuationMin, valuationMax, profit } = calculateValuation();

  // Calculate strategic sale vs liquidation comparison
  const calculateComparison = () => {
    // Strategic sale through Upswitch
    const strategicSale = {
      baseValue: valuationMax,
      goodwill: Math.round(valuationMax * 0.2), // Brand value
      customerRelationships: Math.round(valuationMax * 0.15), // Existing clients
      intellectualProperty: Math.round(valuationMax * 0.1), // IP, processes
      teamRetention: Math.round(valuationMax * 0.1), // Team stays
      marketPosition: Math.round(valuationMax * 0.05), // Market share
      total: 0, // Will be calculated below
    };

    strategicSale.total =
      strategicSale.baseValue +
      strategicSale.goodwill +
      strategicSale.customerRelationships +
      strategicSale.intellectualProperty +
      strategicSale.teamRetention +
      strategicSale.marketPosition;

    // Liquidation (assets only, discounted)
    const liquidation = {
      equipment: Math.round(valuationMax * 0.15), // Physical assets at 30% discount
      inventory: Math.round(valuationMax * 0.1), // Quick sale discount
      realEstate: Math.round(valuationMax * 0.05), // If applicable
      accountsReceivable: Math.round(valuationMax * 0.08), // Some won't collect
      lostValue: Math.round(valuationMax * 0.62), // Goodwill, IP, team, relationships LOST
      total: 0, // Will be calculated below
    };

    liquidation.total =
      liquidation.equipment +
      liquidation.inventory +
      liquidation.realEstate +
      liquidation.accountsReceivable;

    const difference = strategicSale.total - liquidation.total;
    const percentageLost = Math.round((difference / strategicSale.total) * 100);

    return { strategicSale, liquidation, difference, percentageLost };
  };

  const comparison = calculateComparison();

  const handleGetStarted = () => {
    if (user) {
      navigate('/my-business/valuations');
    } else {
      openModal('signup', {
        url: '/my-business/valuations',
        state: { from: 'valuation-landing', intent: 'get-valuation' },
      });
    }
  };

  return (
    <>
      <SEOHead
        {...seoData.home}
        title="Track Your Business Value Over Time | Upswitch"
        description="Get a free valuation and understand what your business is worth. Track value over 12-36 months with no pressure to sell."
      />

      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-calm-50">
        {/* Hero Section with Calculator */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-24">
          <Container>
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-6">
                  <Sparkles className="w-4 h-4" />
                  <span>Free • No Obligations • Track Over Time</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 mb-6 leading-tight">
                  Track Your Business Value
                  <br />
                  <span className="text-primary-600">Over 12-36 Months</span>
                </h1>

                <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                  Get a free valuation and explore your options. No pressure to sell — most business
                  owners track their value for years before making a decision.
                </p>
              </div>

              {/* Interactive Calculator */}
              <Card className="max-w-4xl mx-auto rounded-3xl border-2 border-primary-200 shadow-2xl bg-white">
                <CardBody className="p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center">
                      <Calculator className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-neutral-900">
                        Quick Valuation Calculator
                      </h2>
                      <p className="text-neutral-600">Get an instant estimate in 2 minutes</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {/* Annual Revenue Slider */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <label className="text-sm font-semibold text-neutral-700">
                          Annual Revenue
                        </label>
                        <span className="text-2xl font-bold text-primary-600">
                          €{revenue.toLocaleString()}
                        </span>
                      </div>
                      <Slider
                        size="lg"
                        step={50000}
                        minValue={100000}
                        maxValue={5000000}
                        value={revenue}
                        onChange={value => setRevenue(Array.isArray(value) ? value[0] : value)}
                        className="w-full"
                        classNames={{
                          track: 'h-2',
                          thumb: 'w-6 h-6 bg-primary-600',
                          filler: 'bg-primary-500',
                        }}
                      />
                      <div className="flex justify-between mt-2 text-xs text-neutral-500">
                        <span>€100K</span>
                        <span>€5M</span>
                      </div>
                    </div>

                    {/* Industry Selection */}
                    <div>
                      <label className="text-sm font-semibold text-neutral-700 mb-3 block">
                        Industry
                      </label>
                      <Select
                        size="lg"
                        selectedKeys={[industry]}
                        onSelectionChange={keys => {
                          const selected = Array.from(keys)[0] as string;
                          setIndustry(selected);
                        }}
                        classNames={{
                          trigger: 'h-14 border-2 border-neutral-200',
                        }}
                      >
                        {Object.entries(industryMultipliers).map(([key, { label }]) => (
                          <SelectItem key={key}>{label}</SelectItem>
                        ))}
                      </Select>
                    </div>

                    {/* Profit Margin Slider */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <label className="text-sm font-semibold text-neutral-700">
                          Profit Margin
                        </label>
                        <span className="text-lg font-bold text-neutral-900">{profitMargin}%</span>
                      </div>
                      <Slider
                        size="lg"
                        step={5}
                        minValue={0}
                        maxValue={50}
                        value={profitMargin}
                        onChange={value => setProfitMargin(Array.isArray(value) ? value[0] : value)}
                        className="w-full"
                        classNames={{
                          track: 'h-2',
                          thumb: 'w-6 h-6 bg-success-600',
                          filler: 'bg-success-500',
                        }}
                      />
                    </div>

                    {/* Years Operating Slider */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <label className="text-sm font-semibold text-neutral-700">
                          Years Operating
                        </label>
                        <span className="text-lg font-bold text-neutral-900">
                          {yearsOperating} years
                        </span>
                      </div>
                      <Slider
                        size="lg"
                        step={1}
                        minValue={1}
                        maxValue={30}
                        value={yearsOperating}
                        onChange={value =>
                          setYearsOperating(Array.isArray(value) ? value[0] : value)
                        }
                        className="w-full"
                        classNames={{
                          track: 'h-2',
                          thumb: 'w-6 h-6 bg-calm-600',
                          filler: 'bg-calm-500',
                        }}
                      />
                    </div>

                    {/* Estimated Valuation Result */}
                    <div className="bg-gradient-to-br from-primary-50 to-success-50 rounded-2xl p-8 border-2 border-primary-200">
                      <div className="text-center">
                        <div className="text-sm font-semibold text-neutral-600 mb-2">
                          Estimated Business Value
                        </div>
                        <div className="text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-primary-600 to-success-600 bg-clip-text mb-4">
                          €{valuationMin.toLocaleString()} - €{valuationMax.toLocaleString()}
                        </div>
                        <div className="flex items-center justify-center gap-2 text-sm text-neutral-600 mb-6">
                          <TrendingUp className="w-4 h-4" />
                          <span>Based on {industryMultipliers[industry].label}</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div className="bg-white/80 rounded-xl p-4">
                            <div className="text-xs text-neutral-500 mb-1">Annual Profit</div>
                            <div className="text-xl font-bold text-neutral-900">
                              €{profit.toLocaleString()}
                            </div>
                          </div>
                          <div className="bg-white/80 rounded-xl p-4">
                            <div className="text-xs text-neutral-500 mb-1">Multiple Range</div>
                            <div className="text-xl font-bold text-neutral-900">
                              {industryMultipliers[industry].min.toFixed(1)}x -{' '}
                              {industryMultipliers[industry].max.toFixed(1)}x
                            </div>
                          </div>
                          <div className="bg-white/80 rounded-xl p-4">
                            <div className="text-xs text-neutral-500 mb-1">Maturity Bonus</div>
                            <div className="text-xl font-bold text-success-600">
                              +{Math.round(Math.min(yearsOperating / 10, 0.3) * 100)}%
                            </div>
                          </div>
                        </div>

                        <Button
                          variant="primary"
                          size="xl"
                          onPress={handleGetStarted}
                          endContent={<ArrowRight className="w-5 h-5" />}
                          className="w-full md:w-auto px-12"
                        >
                          Get Detailed Valuation Report
                        </Button>

                        <p className="text-xs text-neutral-500 mt-4">
                          Free • No credit card • Track value over time
                        </p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Container>
        </section>

        {/* Comparison Section: Strategic Sale vs. Liquidation */}
        <section className="py-24 bg-white">
          <Container>
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                  Strategic Sale vs. Liquidation
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                  See the dramatic difference between selling your business strategically through
                  Upswitch versus liquidating assets piece by piece.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Liquidation (Left - Negative) */}
                <div className="bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-3xl p-8 border-2 border-neutral-300 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-neutral-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="w-8 h-8 text-neutral-700" />
                      </div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-2">Liquidation</h3>
                      <p className="text-neutral-600">Selling assets piece by piece</p>
                    </div>

                    <div className="space-y-4">
                      {[
                        {
                          item: 'Equipment & Assets',
                          amount: `€${comparison.liquidation.equipment.toLocaleString()}`,
                          desc: 'Fire sale pricing (30% discount)',
                          icon: XCircle,
                        },
                        {
                          item: 'Inventory',
                          amount: `€${comparison.liquidation.inventory.toLocaleString()}`,
                          desc: 'Clearance sale value',
                          icon: XCircle,
                        },
                        {
                          item: 'Real Estate / Lease',
                          amount: `€${comparison.liquidation.realEstate.toLocaleString()}`,
                          desc: 'If applicable, discounted',
                          icon: XCircle,
                        },
                        {
                          item: 'Accounts Receivable',
                          amount: `€${comparison.liquidation.accountsReceivable.toLocaleString()}`,
                          desc: "Some clients won't pay",
                          icon: XCircle,
                        },
                        {
                          item: 'Lost Value',
                          amount: `-€${comparison.liquidation.lostValue.toLocaleString()}`,
                          desc: 'Brand, IP, team, relationships — ALL LOST',
                          icon: XCircle,
                          isNegative: true,
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className={`flex items-start gap-4 p-4 rounded-xl border ${
                            item.isNegative
                              ? 'bg-red-100/50 border-red-300'
                              : 'bg-neutral-200/50 border-neutral-300'
                          }`}
                        >
                          <item.icon
                            className={`w-5 h-5 mt-1 flex-shrink-0 ${
                              item.isNegative ? 'text-red-600' : 'text-neutral-500'
                            }`}
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <h4
                                className={`font-semibold ${item.isNegative ? 'text-red-900' : 'text-neutral-900'}`}
                              >
                                {item.item}
                              </h4>
                              <span
                                className={`font-medium text-sm ${item.isNegative ? 'text-red-700' : 'text-neutral-700'}`}
                              >
                                {item.amount}
                              </span>
                            </div>
                            <p className="text-neutral-600 text-sm">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-neutral-300/50 rounded-xl border-2 border-neutral-400">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-neutral-900">
                          Total Liquidation Value:
                        </span>
                        <span className="text-xl font-bold text-neutral-700">
                          €{comparison.liquidation.total.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-red-700 font-semibold mt-2">
                        ⚠️ You lose {comparison.percentageLost}% of potential value
                      </p>
                    </div>
                  </div>
                </div>

                {/* Strategic Sale (Right - Positive) */}
                <div className="bg-gradient-to-br from-success-50 to-primary-50 rounded-3xl p-8 border-2 border-success-300 relative overflow-hidden">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-success-100/30 to-primary-100/30 rounded-3xl"></div>

                  <div className="relative z-10">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-success-500 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-2">Strategic Sale</h3>
                      <p className="text-success-700 font-semibold">
                        Through Upswitch — Full Value
                      </p>
                    </div>

                    <div className="space-y-4">
                      {[
                        {
                          item: 'Base Business Value',
                          amount: `€${comparison.strategicSale.baseValue.toLocaleString()}`,
                          desc: 'Core operations & cash flow',
                          isNew: false,
                        },
                        {
                          item: 'Brand & Goodwill',
                          amount: `+€${comparison.strategicSale.goodwill.toLocaleString()}`,
                          desc: 'Brand value, reputation, market position',
                          isNew: true,
                        },
                        {
                          item: 'Customer Relationships',
                          amount: `+€${comparison.strategicSale.customerRelationships.toLocaleString()}`,
                          desc: 'Existing clients, recurring revenue',
                          isNew: true,
                        },
                        {
                          item: 'Intellectual Property',
                          amount: `+€${comparison.strategicSale.intellectualProperty.toLocaleString()}`,
                          desc: 'Processes, systems, trade secrets',
                          isNew: true,
                        },
                        {
                          item: 'Team & Knowledge',
                          amount: `+€${comparison.strategicSale.teamRetention.toLocaleString()}`,
                          desc: 'Retained team, institutional knowledge',
                          isNew: true,
                        },
                        {
                          item: 'Market Position',
                          amount: `+€${comparison.strategicSale.marketPosition.toLocaleString()}`,
                          desc: 'Strategic buyer synergies',
                          isNew: true,
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className={`flex items-start gap-4 p-4 rounded-xl border ${
                            item.isNew
                              ? 'bg-gradient-to-r from-success-100/50 to-primary-100/50 border-success-400/50'
                              : 'bg-white/50 border-neutral-300'
                          }`}
                        >
                          <CheckCircle
                            className={`w-5 h-5 mt-1 flex-shrink-0 ${
                              item.isNew ? 'text-success-600' : 'text-neutral-500'
                            }`}
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <h4
                                className={`font-semibold ${item.isNew ? 'text-success-900' : 'text-neutral-900'}`}
                              >
                                {item.item}
                                {item.isNew && (
                                  <span className="ml-2 text-xs bg-success-200 text-success-800 px-2 py-1 rounded-full">
                                    PRESERVED
                                  </span>
                                )}
                              </h4>
                              <span className="text-success-700 font-medium text-sm">
                                {item.amount}
                              </span>
                            </div>
                            <p className="text-neutral-600 text-sm">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-success-200/50 to-primary-200/50 rounded-xl border-2 border-success-400">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-neutral-900">
                          Total Strategic Value:
                        </span>
                        <span className="text-xl font-bold text-transparent bg-gradient-to-r from-success-600 to-primary-600 bg-clip-text">
                          €{comparison.strategicSale.total.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-success-700 font-semibold mt-2">
                        ✅ You capture {100 - comparison.percentageLost}% MORE value
                      </p>
                    </div>

                    <div className="mt-6 text-center">
                      <Button
                        variant="primary"
                        size="lg"
                        onPress={handleGetStarted}
                        className="bg-gradient-to-r from-success-600 to-primary-600"
                      >
                        Start Your Valuation Journey
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Difference Highlight */}
              <div className="mt-12 text-center bg-gradient-to-r from-success-100 to-primary-100 rounded-2xl p-8 border-2 border-success-300 max-w-4xl mx-auto">
                <h4 className="text-2xl font-bold text-neutral-900 mb-4">The Difference</h4>
                <div className="text-5xl font-bold text-transparent bg-gradient-to-r from-success-600 to-primary-600 bg-clip-text mb-4">
                  €{comparison.difference.toLocaleString()}
                </div>
                <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
                  By selling strategically through Upswitch, you preserve all the intangible value
                  you've built — brand, relationships, processes, and team knowledge. Liquidation
                  throws it all away.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Why Track Value Over Time */}
        <section className="py-24 bg-gradient-to-br from-neutral-50 to-white">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                  Why Track Value for 12-36 Months?
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                  Most successful business owners explore for years before selling. Here's why.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="rounded-2xl border-2 border-neutral-200 hover:border-primary-300 hover:shadow-xl transition-all">
                  <CardBody className="p-8">
                    <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mb-4">
                      <TrendingUp className="w-7 h-7 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">
                      Watch Your Value Grow
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      Track how strategic improvements affect your business value. Many owners
                      increase their valuation by 30-50% over 2-3 years.
                    </p>
                  </CardBody>
                </Card>

                <Card className="rounded-2xl border-2 border-neutral-200 hover:border-success-300 hover:shadow-xl transition-all">
                  <CardBody className="p-8">
                    <div className="w-14 h-14 bg-success-100 rounded-2xl flex items-center justify-center mb-4">
                      <Target className="w-7 h-7 text-success-600" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">Know When to Sell</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      Multiple valuations help you identify the optimal exit timing based on market
                      conditions and your business lifecycle.
                    </p>
                  </CardBody>
                </Card>

                <Card className="rounded-2xl border-2 border-neutral-200 hover:border-calm-300 hover:shadow-xl transition-all">
                  <CardBody className="p-8">
                    <div className="w-14 h-14 bg-calm-100 rounded-2xl flex items-center justify-center mb-4">
                      <Building2 className="w-7 h-7 text-calm-600" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">
                      Build Your Data Room
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      Every valuation adds data points. When you're ready to list, you'll have 175+
                      data points making the process seamless.
                    </p>
                  </CardBody>
                </Card>
              </div>
            </div>
          </Container>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-gradient-to-br from-primary-900 via-success-900 to-primary-900 text-white">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Start Tracking Your Value Today
              </h2>
              <p className="text-xl text-white/90 mb-12">
                Join 12,000+ business owners who track their value with Upswitch. Free forever. No
                pressure to sell.
              </p>

              <Button
                variant="primary"
                size="xl"
                onPress={handleGetStarted}
                endContent={<ArrowRight className="w-5 h-5" />}
                className="px-12 bg-white text-primary-900 hover:bg-neutral-100"
              >
                Get Your Free Valuation
              </Button>

              <p className="text-sm text-white/60 mt-6">
                Free • 2 minutes • No credit card required
              </p>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
};

export default ValuationLanding;
