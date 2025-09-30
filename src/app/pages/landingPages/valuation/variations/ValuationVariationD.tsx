/**
 * 🎯 Valuation Variation D - Calculator + Comparison
 *
 * STRATEGY:
 * - Video background hero section
 * - Simplified interactive valuation calculator
 * - Compelling comparison: Strategic Sale vs. Liquidation
 * - No pressure to list immediately
 *
 * INSPIRATION:
 * - Ilara creators page (video background, comparison section, bold gradients)
 * - Interactive calculator from ValuationVariationC
 * - Typeform-style engagement
 * - Bold gradients and visual design
 */

import { Button } from '@/shared/components/buttons';
import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { VideoBackground } from '@/shared/components/video';
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
import { useAuth } from '../../../../providers/auth-provider';

const ValuationVariationD = () => {
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
        state: { from: 'valuation-variation-d', intent: 'get-valuation' },
      });
    }
  };

  return (
    <>
      <SEOHead
        {...seoData.home}
        title="Understand Your True Business Value | Upswitch - Variation D"
        description="Get a free valuation and discover what your business is really worth. See the dramatic difference between strategic sale and liquidation."
      />

      <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-primary-900 to-success-900">
        {/* Hero Section with Video Background */}
        <VideoBackground
          videoSrc="/videos/business-hero.mp4"
          posterImage="/images/business-hero-poster.jpg"
          fallbackGradient="from-neutral-900 via-primary-900 to-success-900"
          overlay="gradient"
          className="min-h-[85vh] flex items-center"
          disableVideoOnMobile={true}
        >
          <Container>
            <div className="max-w-5xl mx-auto text-center py-32 md:py-48">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8">
                <Sparkles className="w-5 h-5 text-success-400" />
                <span className="text-white font-medium">
                  Free Valuation • No Obligations • Instant Results
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                Discover What Your
                <br />
                <span className="bg-gradient-to-r from-success-300 via-primary-300 to-calm-300 bg-clip-text text-transparent">
                  Business is Really Worth
                </span>
              </h1>

              <p className="text-2xl md:text-3xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                See the dramatic difference between a strategic sale and liquidation. Your business
                is worth more than you think.
              </p>

              {/* Scroll indicator */}
              <div className="animate-bounce mt-8">
                <div className="mx-auto w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
                  <div className="w-1 h-3 bg-white/50 rounded-full"></div>
                </div>
              </div>
            </div>
          </Container>
        </VideoBackground>

        {/* Calculator Section */}
        <section className="py-24 bg-gradient-to-br from-white via-neutral-50 to-calm-50 relative">
          {/* Decorative gradient orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-success-300/20 rounded-full blur-3xl"></div>
          </div>

          <Container>
            <div className="max-w-7xl mx-auto relative z-10">
              {/* Section Header */}
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6">
                  Calculate Your
                  <span className="bg-gradient-to-r from-primary-600 to-success-600 bg-clip-text text-transparent">
                    {' '}
                    True Value
                  </span>
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                  Get an instant estimate based on industry multiples and your business metrics
                </p>
              </div>

              {/* Interactive Calculator */}
              <Card className="max-w-4xl mx-auto rounded-3xl border-2 border-primary-300 shadow-2xl bg-white/95 backdrop-blur-sm hover:shadow-primary-500/20 transition-all duration-300">
                <CardBody className="p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Calculator className="w-6 h-6 text-white" />
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
                    <div className="bg-gradient-to-br from-primary-100 via-success-50 to-calm-100 rounded-2xl p-8 border-2 border-primary-300 shadow-lg">
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
                          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm">
                            <div className="text-xs text-neutral-500 mb-1">Annual Profit</div>
                            <div className="text-xl font-bold text-neutral-900">
                              €{profit.toLocaleString()}
                            </div>
                          </div>
                          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm">
                            <div className="text-xs text-neutral-500 mb-1">Multiple Range</div>
                            <div className="text-xl font-bold text-neutral-900">
                              {industryMultipliers[industry].min.toFixed(1)}x -{' '}
                              {industryMultipliers[industry].max.toFixed(1)}x
                            </div>
                          </div>
                          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm">
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
                          Free • No credit card • Instant results
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
        <section className="py-24 bg-gradient-to-br from-neutral-900 via-primary-950 to-neutral-900 text-white relative overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/50 via-success-900/50 to-primary-900/50 animate-pulse"></div>

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-success-500/10 rounded-full blur-3xl"></div>
          </div>

          <Container>
            <div className="relative z-10">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                    Strategic Sale vs.
                    <span className="bg-gradient-to-r from-success-300 to-primary-300 bg-clip-text text-transparent">
                      {' '}
                      Liquidation
                    </span>
                  </h2>
                  <p className="text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                    The difference is staggering. Strategic selling preserves your intangible value.
                    Liquidation destroys it.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Liquidation (Left - Negative) */}
                  <div className="bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-md rounded-3xl p-8 border-2 border-neutral-700 relative overflow-hidden shadow-2xl">
                    <div className="relative z-10">
                      <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <AlertTriangle className="w-8 h-8 text-neutral-300" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">Liquidation</h3>
                        <p className="text-neutral-400 text-lg">Selling assets piece by piece</p>
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
                                ? 'bg-red-900/30 border-red-700'
                                : 'bg-neutral-800/50 border-neutral-700'
                            }`}
                          >
                            <item.icon
                              className={`w-5 h-5 mt-1 flex-shrink-0 ${
                                item.isNegative ? 'text-red-400' : 'text-neutral-400'
                              }`}
                            />
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-1">
                                <h4
                                  className={`font-semibold ${item.isNegative ? 'text-red-300' : 'text-white'}`}
                                >
                                  {item.item}
                                </h4>
                                <span
                                  className={`font-medium text-sm ${item.isNegative ? 'text-red-400' : 'text-neutral-300'}`}
                                >
                                  {item.amount}
                                </span>
                              </div>
                              <p className="text-neutral-400 text-sm">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 p-4 bg-neutral-800/50 rounded-xl border-2 border-neutral-700">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-white">
                            Total Liquidation Value:
                          </span>
                          <span className="text-xl font-bold text-neutral-300">
                            €{comparison.liquidation.total.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-red-400 font-semibold mt-2">
                          ⚠️ You lose {comparison.percentageLost}% of potential value
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Strategic Sale (Right - Positive) */}
                  <div className="bg-gradient-to-br from-success-900/40 to-primary-900/40 backdrop-blur-md rounded-3xl p-8 border-2 border-success-500 relative overflow-hidden shadow-2xl">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-success-500/10 to-primary-500/10 rounded-3xl"></div>

                    <div className="relative z-10">
                      <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-success-500 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <Award className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">Strategic Sale</h3>
                        <p className="text-success-300 font-semibold text-lg">
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
                                ? 'bg-gradient-to-r from-success-900/30 to-primary-900/30 border-success-500/50'
                                : 'bg-neutral-800/30 border-neutral-700'
                            }`}
                          >
                            <CheckCircle
                              className={`w-5 h-5 mt-1 flex-shrink-0 ${
                                item.isNew ? 'text-success-400' : 'text-neutral-400'
                              }`}
                            />
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-1">
                                <h4
                                  className={`font-semibold ${item.isNew ? 'text-success-200' : 'text-white'}`}
                                >
                                  {item.item}
                                  {item.isNew && (
                                    <span className="ml-2 text-xs bg-success-500 text-white px-2 py-1 rounded-full">
                                      PRESERVED
                                    </span>
                                  )}
                                </h4>
                                <span className="text-success-300 font-medium text-sm">
                                  {item.amount}
                                </span>
                              </div>
                              <p className="text-neutral-300 text-sm">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 p-4 bg-gradient-to-r from-success-800/40 to-primary-800/40 rounded-xl border-2 border-success-500">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-white">
                            Total Strategic Value:
                          </span>
                          <span className="text-xl font-bold text-transparent bg-gradient-to-r from-success-300 to-primary-300 bg-clip-text">
                            €{comparison.strategicSale.total.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-success-300 font-semibold mt-2">
                          ✅ You capture {100 - comparison.percentageLost}% MORE value
                        </p>
                      </div>

                      <div className="mt-6 text-center">
                        <Button
                          variant="primary"
                          size="lg"
                          onPress={handleGetStarted}
                          className="bg-gradient-to-r from-success-600 to-primary-600 hover:from-success-700 hover:to-primary-700"
                        >
                          Start Your Valuation Journey
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Difference Highlight */}
                <div className="mt-12 text-center bg-gradient-to-r from-success-500 to-primary-500 rounded-3xl p-12 border-2 border-success-400 shadow-2xl max-w-4xl mx-auto transform hover:scale-105 transition-all duration-300">
                  <h4 className="text-3xl font-bold text-white mb-6">💰 The Difference</h4>
                  <div className="text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
                    €{comparison.difference.toLocaleString()}
                  </div>
                  <p className="text-xl text-white/95 max-w-2xl mx-auto leading-relaxed">
                    By selling strategically through Upswitch, you preserve all the intangible value
                    you've built — brand, relationships, processes, and team knowledge. Liquidation
                    throws it all away.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Why Get Valued */}
        <section className="py-24 bg-gradient-to-br from-white via-calm-50 to-neutral-50">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                  Why Get
                  <span className="bg-gradient-to-r from-primary-600 to-success-600 bg-clip-text text-transparent">
                    {' '}
                    Valued?
                  </span>
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                  Understanding your true value opens doors to better decisions and opportunities.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="rounded-3xl border-2 border-primary-200 hover:border-primary-400 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-primary-50">
                  <CardBody className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-3">Improve Your Value</h3>
                    <p className="text-neutral-600 leading-relaxed text-lg">
                      Understand what drives your business value and make strategic improvements.
                      Many owners increase their valuation significantly before selling.
                    </p>
                  </CardBody>
                </Card>

                <Card className="rounded-3xl border-2 border-success-200 hover:border-success-400 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-success-50">
                  <CardBody className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-success-500 to-success-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-3">Know Your Position</h3>
                    <p className="text-neutral-600 leading-relaxed text-lg">
                      Understand where you stand in the market. Get clarity on your exit options and
                      timing based on current market conditions.
                    </p>
                  </CardBody>
                </Card>

                <Card className="rounded-3xl border-2 border-calm-200 hover:border-calm-400 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-calm-50">
                  <CardBody className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-calm-500 to-calm-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-3">Prepare for Sale</h3>
                    <p className="text-neutral-600 leading-relaxed text-lg">
                      Build your data room progressively. When you're ready to list, you'll have
                      everything prepared for a smooth, fast transaction.
                    </p>
                  </CardBody>
                </Card>
              </div>
            </div>
          </Container>
        </section>

        {/* Final CTA */}
        <section className="py-32 bg-gradient-to-br from-neutral-900 via-primary-900 to-success-900 text-white relative overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/50 via-success-900/50 to-primary-900/50 animate-pulse"></div>
          </div>

          <Container>
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8">
                <Sparkles className="w-5 h-5 text-success-400" />
                <span className="text-white font-medium">Join 12,000+ Business Owners</span>
              </div>

              <h2 className="text-5xl md:text-7xl font-bold mb-8">
                Get Your Free
                <br />
                <span className="bg-gradient-to-r from-success-300 to-primary-300 bg-clip-text text-transparent">
                  Valuation Now
                </span>
              </h2>
              <p className="text-2xl text-white/90 mb-12">
                Discover what your business is really worth. Free, instant, no obligations.
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

export default ValuationVariationD;
