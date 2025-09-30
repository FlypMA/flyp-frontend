/**
 * 🎯 Get Free Valuation - Variation B: "Airbnb-style All-in-One Form"
 *
 * STRATEGY:
 * - Clean, simple form with all fields visible
 * - Email capture UPFRONT (required to start)
 * - Minimal friction, fast completion
 * - Instant results preview
 * - Trust signals throughout
 *
 * INSPIRATION:
 * - Airbnb: Clean, all-in-one forms
 * - Fiverr: Clear value prop, simple inputs
 * - Minimal design, maximum clarity
 */

import { Button } from '@/shared/components/buttons';
import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { VideoBackground } from '@/shared/components/video';
import { seoData } from '@/shared/utils/seo/seoData';
import { Card, CardBody, Input, Select, SelectItem } from '@heroui/react';
import {
  BarChart3,
  Building2,
  CheckCircle,
  Euro,
  FileText,
  Heart,
  Lock,
  Mail,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import React, { useState } from 'react';

const ValuationVariationB = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    industry: '',
    yearsInBusiness: '',
    revenue2024: '',
    ebitda: '',
    teamSize: '',
  });
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const industries = [
    { value: 'technology', label: 'Technology & SaaS' },
    { value: 'retail', label: 'Retail & E-commerce' },
    { value: 'food', label: 'Food & Beverage' },
    { value: 'services', label: 'Professional Services' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'other', label: 'Other' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowResults(true);
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const isFormValid = () => {
    return (
      formData.email &&
      formData.firstName &&
      formData.industry &&
      formData.yearsInBusiness &&
      formData.revenue2024
    );
  };

  const calculateValue = () => {
    const revenue = parseFloat(formData.revenue2024) || 0;
    const multiple = 3.5;
    return Math.round(revenue * multiple);
  };

  if (showResults) {
    const estimatedValue = calculateValue();

    return (
      <>
        <SEOHead
          {...seoData.home}
          title="Your Business Valuation | Upswitch"
          description="See your estimated business value"
        />

        <VideoBackground
          fallbackGradient="from-primary-900 via-calm-800 to-primary-900"
          overlay="dark"
          className="min-h-screen flex items-center justify-center py-20"
        >
          <Container>
            <div className="max-w-4xl mx-auto">
              <Card className="rounded-3xl shadow-2xl bg-white overflow-hidden">
                <CardBody className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Left: Results */}
                    <div className="p-12 bg-gradient-to-br from-success-50 to-primary-50">
                      <div className="mb-8">
                        <div className="w-16 h-16 bg-success-100 rounded-2xl flex items-center justify-center mb-6">
                          <Sparkles className="w-8 h-8 text-success-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-neutral-900 mb-4">
                          Hi {formData.firstName}!
                        </h1>
                        <p className="text-lg text-neutral-600">
                          Based on your {formData.industry} business with {formData.yearsInBusiness}{' '}
                          years of experience:
                        </p>
                      </div>

                      <div className="mb-8">
                        <div className="text-sm font-semibold text-neutral-600 mb-2">
                          Estimated Value
                        </div>
                        <div className="text-5xl font-bold text-success-600 mb-4">
                          €{estimatedValue.toLocaleString()}
                        </div>
                        <div className="text-sm text-neutral-600">
                          Range: €{Math.round(estimatedValue * 0.85).toLocaleString()} - €
                          {Math.round(estimatedValue * 1.15).toLocaleString()}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                          <BarChart3 className="w-5 h-5 text-primary-600" />
                          <div>
                            <div className="text-xs text-neutral-500">Valuation Method</div>
                            <div className="font-semibold text-neutral-900">Revenue Multiple</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                          <TrendingUp className="w-5 h-5 text-calm-600" />
                          <div>
                            <div className="text-xs text-neutral-500">Confidence Level</div>
                            <div className="font-semibold text-neutral-900">High</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Next Steps */}
                    <div className="p-12">
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">What's next?</h2>
                        <p className="text-neutral-600">
                          We've sent a detailed PDF report to <strong>{formData.email}</strong>
                        </p>
                      </div>

                      <div className="space-y-4 mb-8">
                        {[
                          {
                            icon: FileText,
                            title: 'Detailed Report',
                            desc: 'Full valuation breakdown and methodology',
                          },
                          {
                            icon: BarChart3,
                            title: 'Industry Comparison',
                            desc: 'See how you compare to similar businesses',
                          },
                          {
                            icon: Zap,
                            title: 'Growth Tips',
                            desc: 'Recommendations to increase your value',
                          },
                          {
                            icon: Heart,
                            title: 'Expert Support',
                            desc: 'Connect with M&A advisors',
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-3 bg-neutral-50 rounded-xl"
                          >
                            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <item.icon className="w-5 h-5 text-primary-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-neutral-900">{item.title}</div>
                              <div className="text-sm text-neutral-600">{item.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-3">
                        <Button variant="primary" className="w-full" size="lg">
                          Create Free Account
                        </Button>
                        <Button variant="secondary" className="w-full">
                          Talk to an Expert
                        </Button>
                      </div>

                      <p className="text-xs text-neutral-500 text-center mt-6">
                        Join 12,000+ business owners on Upswitch
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Container>
        </VideoBackground>
      </>
    );
  }

  return (
    <>
      <SEOHead
        {...seoData.home}
        title="Get Free Business Valuation | Upswitch"
        description="Discover your business value in 90 seconds. Free, accurate, and confidential."
      />

      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50">
        {/* Hero Section */}
        <div className="py-20 border-b border-neutral-200">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-8">
                <Zap className="w-4 h-4" />
                Takes 90 seconds
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
                What's your business worth?
              </h1>
              <p className="text-xl md:text-2xl text-neutral-600 mb-12 max-w-2xl mx-auto">
                Get an instant, professional valuation. No credit card, no sales calls, just
                insights.
              </p>

              {/* Trust signals */}
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-neutral-600">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary-600" />
                  <span>Bank-grade security</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary-600" />
                  <span>12,000+ valuations completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-600" />
                  <span>Free detailed report</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Form Section */}
        <div className="py-20">
          <Container>
            <div className="max-w-4xl mx-auto">
              <Card className="rounded-3xl shadow-2xl border-2 border-neutral-200 bg-white overflow-hidden">
                <CardBody className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-3">
                    {/* Left: Why Trust Us */}
                    <div className="p-10 bg-gradient-to-br from-primary-50 to-calm-50 border-r border-neutral-200">
                      <h3 className="text-xl font-bold text-neutral-900 mb-6">Why Upswitch?</h3>

                      <div className="space-y-6">
                        {[
                          {
                            icon: BarChart3,
                            title: 'Professional Grade',
                            desc: 'Same methods used by M&A advisors',
                          },
                          {
                            icon: Lock,
                            title: '100% Confidential',
                            desc: 'Your data is encrypted and never shared',
                          },
                          {
                            icon: Zap,
                            title: 'Instant Results',
                            desc: 'Get your valuation in seconds',
                          },
                          {
                            icon: FileText,
                            title: 'Detailed Report',
                            desc: 'PDF with full breakdown & insights',
                          },
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                              <item.icon className="w-5 h-5 text-primary-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-neutral-900 mb-1">
                                {item.title}
                              </div>
                              <div className="text-sm text-neutral-600">{item.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 p-4 bg-white rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="text-amber-400">
                              ⭐
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-neutral-600 italic">
                          "Fast, accurate, and completely free. Best valuation tool I've used."
                        </p>
                        <p className="text-xs text-neutral-500 mt-2">— Marc D., Tech Founder</p>
                      </div>
                    </div>

                    {/* Right: Form */}
                    <div className="lg:col-span-2 p-10">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Contact Info */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                            <Mail className="w-5 h-5 text-primary-600" />
                            Contact Information
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                              type="text"
                              label="First Name"
                              placeholder="John"
                              value={formData.firstName}
                              onChange={e => handleChange('firstName', e.target.value)}
                              isRequired
                              classNames={{
                                inputWrapper: 'border-2 border-neutral-200',
                              }}
                            />
                            <Input
                              type="email"
                              label="Email Address"
                              placeholder="john@company.com"
                              value={formData.email}
                              onChange={e => handleChange('email', e.target.value)}
                              isRequired
                              description="We'll send your report here"
                              classNames={{
                                inputWrapper: 'border-2 border-neutral-200',
                              }}
                            />
                          </div>
                        </div>

                        {/* Business Info */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-primary-600" />
                            Business Information
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Select
                              label="Industry"
                              placeholder="Select industry"
                              value={formData.industry}
                              onChange={e => handleChange('industry', e.target.value)}
                              isRequired
                              classNames={{
                                trigger: 'border-2 border-neutral-200',
                              }}
                            >
                              {industries.map(industry => (
                                <SelectItem key={industry.value}>{industry.label}</SelectItem>
                              ))}
                            </Select>

                            <Input
                              type="number"
                              label="Years in Business"
                              placeholder="5"
                              value={formData.yearsInBusiness}
                              onChange={e => handleChange('yearsInBusiness', e.target.value)}
                              isRequired
                              classNames={{
                                inputWrapper: 'border-2 border-neutral-200',
                              }}
                            />
                          </div>
                        </div>

                        {/* Financial Info */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                            <Euro className="w-5 h-5 text-primary-600" />
                            Financial Details
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                              type="number"
                              label="Annual Revenue (2024)"
                              placeholder="500000"
                              value={formData.revenue2024}
                              onChange={e => handleChange('revenue2024', e.target.value)}
                              startContent={<Euro className="w-4 h-4" />}
                              isRequired
                              description="Best estimate is fine"
                              classNames={{
                                inputWrapper: 'border-2 border-neutral-200',
                              }}
                            />

                            <Input
                              type="number"
                              label="Team Size (optional)"
                              placeholder="10"
                              value={formData.teamSize}
                              onChange={e => handleChange('teamSize', e.target.value)}
                              startContent={<Users className="w-4 h-4" />}
                              description="Including yourself"
                              classNames={{
                                inputWrapper: 'border-2 border-neutral-200',
                              }}
                            />
                          </div>
                        </div>

                        {/* Privacy Notice */}
                        <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                          <div className="flex items-start gap-3">
                            <Shield className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-neutral-600">
                              <strong className="text-neutral-900">Your privacy matters.</strong>{' '}
                              We'll never sell your data or spam you. Your information is encrypted
                              and only used to generate your valuation report.
                            </div>
                          </div>
                        </div>

                        {/* Submit */}
                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          className="w-full"
                          isLoading={isSubmitting}
                          isDisabled={!isFormValid()}
                        >
                          {isSubmitting ? 'Calculating...' : 'Get My Free Valuation'}
                        </Button>

                        <p className="text-xs text-neutral-500 text-center">
                          By continuing, you agree to our Terms of Service and Privacy Policy
                        </p>
                      </form>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default ValuationVariationB;
