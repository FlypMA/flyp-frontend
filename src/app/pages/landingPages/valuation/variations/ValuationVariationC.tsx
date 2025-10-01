/**
 * 🎯 Get Free Valuation - Variation C: "Interactive Calculator"
 *
 * STRATEGY:
 * - Real-time calculation as you type
 * - Visual/animated results
 * - Email capture MID-FLOW (after they see initial value)
 * - Bold, engaging design
 * - Gamified experience
 *
 * INSPIRATION:
 * - Epidemic Sound: Bold visuals, interactive
 * - Calculator tools: Real-time feedback
 * - Gamification: Progress and rewards
 */

import { Button } from '@/shared/components/buttons';
import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { seoData } from '@/shared/utils/seo/seoData';
import { Card, CardBody, Input, Progress, Select, SelectItem, Slider } from '@heroui/react';
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle,
  Download,
  Euro,
  LineChart,
  Lock,
  Mail,
  Rocket,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const ValuationVariationC = () => {
  const [formData, setFormData] = useState({
    industry: '',
    revenue: 500000,
    growthRate: 15,
    profitMargin: 20,
    yearsInBusiness: 5,
    email: '',
  });
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [calculatedValue, setCalculatedValue] = useState(0);
  const [valueRange, setValueRange] = useState({ low: 0, high: 0 });

  const industries = [
    { value: 'technology', label: 'Technology & SaaS', multiple: 4.5 },
    { value: 'retail', label: 'Retail & E-commerce', multiple: 2.5 },
    { value: 'food', label: 'Food & Beverage', multiple: 3.0 },
    { value: 'services', label: 'Professional Services', multiple: 3.5 },
    { value: 'manufacturing', label: 'Manufacturing', multiple: 3.8 },
    { value: 'healthcare', label: 'Healthcare', multiple: 4.0 },
  ];

  // Real-time calculation
  useEffect(() => {
    const industry = industries.find(i => i.value === formData.industry);
    const baseMultiple = industry?.multiple || 3.5;

    // Growth bonus
    const growthBonus = formData.growthRate > 20 ? 0.5 : formData.growthRate > 10 ? 0.3 : 0;

    // Profit margin bonus
    const profitBonus = formData.profitMargin > 25 ? 0.4 : formData.profitMargin > 15 ? 0.2 : 0;

    // Experience bonus
    const experienceBonus =
      formData.yearsInBusiness > 10 ? 0.3 : formData.yearsInBusiness > 5 ? 0.15 : 0;

    const totalMultiple = baseMultiple + growthBonus + profitBonus + experienceBonus;
    const value = Math.round(formData.revenue * totalMultiple);

    setCalculatedValue(value);
    setValueRange({
      low: Math.round(value * 0.85),
      high: Math.round(value * 1.15),
    });

    // Show email capture after they've played with calculator
    if (formData.revenue > 0 && formData.industry && !showEmailCapture && !emailSubmitted) {
      setTimeout(() => setShowEmailCapture(true), 3000);
    }
  }, [formData, showEmailCapture, emailSubmitted]);

  const handleChange = (field: string, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleEmailSubmit = () => {
    if (formData.email) {
      setEmailSubmitted(true);
      setShowEmailCapture(false);
    }
  };

  const completionScore = () => {
    let score = 0;
    if (formData.industry) score += 20;
    if (formData.revenue > 0) score += 20;
    if (formData.growthRate > 0) score += 20;
    if (formData.profitMargin > 0) score += 20;
    if (formData.yearsInBusiness > 0) score += 20;
    return score;
  };

  return (
    <>
      <SEOHead
        {...seoData.home}
        title="Interactive Business Valuation Calculator | Upswitch"
        description="See your business value update in real-time as you adjust your inputs. Free instant calculator."
      />

      <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-primary-900 to-calm-900">
        {/* Header */}
        <div className="border-b border-white/10">
          <Container>
            <div className="py-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="text-white font-bold text-xl">Upswitch Calculator</div>
              </div>
              <div className="text-white/60 text-sm">
                <Zap className="w-4 h-4 inline mr-1" />
                Real-time valuation
              </div>
            </div>
          </Container>
        </div>

        {/* Main Content */}
        <div className="py-12">
          <Container>
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Left: Calculator Controls */}
                <div className="lg:col-span-3">
                  <Card className="rounded-3xl bg-white/95 backdrop-blur-xl border-2 border-white/20 shadow-2xl overflow-hidden">
                    <CardBody className="p-6 sm:p-8 md:p-10">
                      {/* Progress */}
                      <div className="mb-8">
                        <div className="flex items-center justify-between mb-3">
                          <h2 className="text-2xl font-bold text-neutral-900">
                            Build Your Valuation
                          </h2>
                          <div className="flex items-center gap-2">
                            <div className="text-sm font-semibold text-primary-600">
                              {completionScore()}%
                            </div>
                          </div>
                        </div>
                        <Progress
                          value={completionScore()}
                          className="h-2"
                          classNames={{
                            indicator: 'bg-gradient-to-r from-primary-500 to-success-500',
                          }}
                        />
                      </div>

                      {/* Inputs */}
                      <div className="space-y-6">
                        {/* Industry */}
                        <div>
                          <label className="text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-primary-600" />
                            Industry
                          </label>
                          <Select
                            placeholder="Select your industry"
                            value={formData.industry}
                            onChange={e => handleChange('industry', e.target.value)}
                            size="lg"
                            classNames={{
                              trigger: 'border-2 border-neutral-200 h-14',
                            }}
                          >
                            {industries.map(industry => (
                              <SelectItem key={industry.value}>{industry.label}</SelectItem>
                            ))}
                          </Select>
                        </div>

                        {/* Revenue Slider */}
                        <div>
                          <label className="text-sm font-semibold text-neutral-700 mb-3 flex items-center justify-between">
                            <span className="flex items-center gap-2">
                              <Euro className="w-4 h-4 text-primary-600" />
                              Annual Revenue
                            </span>
                            <span className="text-primary-600">
                              €{formData.revenue.toLocaleString()}
                            </span>
                          </label>
                          <Slider
                            value={formData.revenue}
                            onChange={value => handleChange('revenue', value as number)}
                            minValue={0}
                            maxValue={5000000}
                            step={50000}
                            className="mb-2"
                            classNames={{
                              track: 'h-2',
                              thumb: 'w-6 h-6 bg-primary-500',
                              filler: 'bg-gradient-to-r from-primary-500 to-calm-500',
                            }}
                          />
                          <div className="flex justify-between text-xs text-neutral-500">
                            <span>€0</span>
                            <span>€5M</span>
                          </div>
                        </div>

                        {/* Growth Rate Slider */}
                        <div>
                          <label className="text-sm font-semibold text-neutral-700 mb-3 flex items-center justify-between">
                            <span className="flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-success-600" />
                              Annual Growth Rate
                            </span>
                            <span className="text-success-600">{formData.growthRate}%</span>
                          </label>
                          <Slider
                            value={formData.growthRate}
                            onChange={value => handleChange('growthRate', value as number)}
                            minValue={-20}
                            maxValue={100}
                            step={5}
                            className="mb-2"
                            classNames={{
                              track: 'h-2',
                              thumb: 'w-6 h-6 bg-success-500',
                              filler: 'bg-gradient-to-r from-success-500 to-emerald-500',
                            }}
                          />
                          <div className="flex justify-between text-xs text-neutral-500">
                            <span>-20%</span>
                            <span>100%</span>
                          </div>
                        </div>

                        {/* Profit Margin Slider */}
                        <div>
                          <label className="text-sm font-semibold text-neutral-700 mb-3 flex items-center justify-between">
                            <span className="flex items-center gap-2">
                              <BarChart3 className="w-4 h-4 text-calm-600" />
                              Profit Margin
                            </span>
                            <span className="text-calm-600">{formData.profitMargin}%</span>
                          </label>
                          <Slider
                            value={formData.profitMargin}
                            onChange={value => handleChange('profitMargin', value as number)}
                            minValue={0}
                            maxValue={80}
                            step={5}
                            className="mb-2"
                            classNames={{
                              track: 'h-2',
                              thumb: 'w-6 h-6 bg-calm-500',
                              filler: 'bg-gradient-to-r from-calm-500 to-primary-500',
                            }}
                          />
                          <div className="flex justify-between text-xs text-neutral-500">
                            <span>0%</span>
                            <span>80%</span>
                          </div>
                        </div>

                        {/* Years in Business */}
                        <div>
                          <label className="text-sm font-semibold text-neutral-700 mb-3 flex items-center justify-between">
                            <span className="flex items-center gap-2">
                              <LineChart className="w-4 h-4 text-accent-600" />
                              Years in Business
                            </span>
                            <span className="text-accent-600">
                              {formData.yearsInBusiness} years
                            </span>
                          </label>
                          <Slider
                            value={formData.yearsInBusiness}
                            onChange={value => handleChange('yearsInBusiness', value as number)}
                            minValue={0}
                            maxValue={50}
                            step={1}
                            className="mb-2"
                            classNames={{
                              track: 'h-2',
                              thumb: 'w-6 h-6 bg-accent-500',
                              filler: 'bg-gradient-to-r from-accent-500 to-amber-500',
                            }}
                          />
                          <div className="flex justify-between text-xs text-neutral-500">
                            <span>0</span>
                            <span>50+</span>
                          </div>
                        </div>
                      </div>

                      {/* Trust signal */}
                      <div className="mt-8 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                        <div className="flex items-center gap-3 text-sm text-neutral-600">
                          <Lock className="w-5 h-5 text-primary-600" />
                          <span>
                            Your data is encrypted and secure. We'll never share your information.
                          </span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>

                {/* Right: Live Results */}
                <div className="lg:col-span-2">
                  <div className="sticky top-8 space-y-6">
                    {/* Main Value Card */}
                    <Card className="rounded-3xl bg-gradient-to-br from-success-500 via-primary-500 to-calm-500 shadow-2xl overflow-hidden border-2 border-white/20">
                      <CardBody className="p-8 text-white">
                        <div className="flex items-center gap-2 mb-4">
                          <Rocket className="w-6 h-6" />
                          <span className="font-semibold">Estimated Value</span>
                        </div>

                        <div className="text-6xl font-bold mb-4 animate-pulse">
                          €{calculatedValue.toLocaleString()}
                        </div>

                        <div className="text-white/80 mb-6">
                          Range: €{valueRange.low.toLocaleString()} - €
                          {valueRange.high.toLocaleString()}
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                            <span className="text-sm">Confidence Level</span>
                            <span className="font-bold">High</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                            <span className="text-sm">Valuation Method</span>
                            <span className="font-bold">Revenue Multiple</span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>

                    {/* Email Capture - Appears after interaction */}
                    {showEmailCapture && !emailSubmitted && (
                      <Card className="rounded-2xl bg-white shadow-xl border-2 border-primary-200 animate-slide-up">
                        <CardBody className="p-6">
                          <div className="flex items-start gap-3 mb-4">
                            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Mail className="w-6 h-6 text-primary-600" />
                            </div>
                            <div>
                              <h3 className="font-bold text-neutral-900 mb-1">
                                Get Your Detailed Report
                              </h3>
                              <p className="text-sm text-neutral-600">
                                Receive a full PDF breakdown via email
                              </p>
                            </div>
                          </div>

                          <Input
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={e => handleChange('email', e.target.value)}
                            endContent={
                              <Button
                                size="sm"
                                onPress={handleEmailSubmit}
                                isDisabled={!formData.email}
                              >
                                <ArrowRight className="w-4 h-4" />
                              </Button>
                            }
                            classNames={{
                              inputWrapper: 'border-2 border-neutral-200',
                            }}
                          />
                        </CardBody>
                      </Card>
                    )}

                    {/* Email Submitted */}
                    {emailSubmitted && (
                      <Card className="rounded-2xl bg-success-50 border-2 border-success-200">
                        <CardBody className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <CheckCircle className="w-8 h-8 text-success-600" />
                            <div>
                              <h3 className="font-bold text-success-900">Report Sent!</h3>
                              <p className="text-sm text-success-700">Check {formData.email}</p>
                            </div>
                          </div>

                          <Button variant="primary" className="w-full" size="lg">
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF Now
                          </Button>
                        </CardBody>
                      </Card>
                    )}

                    {/* What's Included */}
                    <Card className="rounded-2xl bg-white/95 backdrop-blur-xl border border-white/20">
                      <CardBody className="p-6">
                        <h3 className="font-bold text-neutral-900 mb-4">What's Included</h3>
                        <div className="space-y-3">
                          {[
                            'Detailed valuation breakdown',
                            'Industry comparisons',
                            'Growth recommendations',
                            'Competitive analysis',
                            'Next steps guide',
                          ].map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-success-600" />
                              <span className="text-sm text-neutral-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default ValuationVariationC;
