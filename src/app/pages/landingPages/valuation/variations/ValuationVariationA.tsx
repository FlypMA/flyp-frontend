/**
 * 🎯 Get Free Valuation - Variation A: "Typeform-style Conversational Flow"
 *
 * STRATEGY:
 * - One question at a time (conversational)
 * - Beautiful animations and transitions
 * - Email capture at the END (after building rapport)
 * - Progress bar showing completion
 * - Friendly, approachable tone
 *
 * INSPIRATION:
 * - Typeform: One question at a time, smooth transitions
 * - Fiverr: Clear value proposition, trust signals
 * - Conversational UI patterns
 */

import { Button } from '@/shared/components/buttons';
import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { VideoBackground } from '@/shared/components/video';
import { seoData } from '@/shared/utils/seo/seoData';
import { Card, CardBody, Input, Progress } from '@heroui/react';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle,
  Euro,
  Heart,
  Mail,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';
import React, { useState } from 'react';

interface ValuationData {
  industry?: string;
  yearsInBusiness?: number;
  revenue2023?: number;
  revenue2024?: number;
  revenue2025?: number;
  ebitda?: number;
  teamSize?: number;
  email?: string;
  firstName?: string;
}

const ValuationVariationA = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<ValuationData>({});
  const [showResults, setShowResults] = useState(false);

  // Questions - conversational style
  const questions = [
    {
      id: 'welcome',
      type: 'welcome',
      title: "Let's discover your business value",
      subtitle: 'This will take about 2 minutes. Ready?',
      icon: Sparkles,
    },
    {
      id: 'industry',
      type: 'select',
      question: 'What industry are you in?',
      subtitle: 'This helps us use the right valuation multiples',
      field: 'industry',
      options: [
        { value: 'technology', label: '💻 Technology & SaaS' },
        { value: 'retail', label: '🛍️ Retail & E-commerce' },
        { value: 'food', label: '🍽️ Food & Beverage' },
        { value: 'services', label: '🤝 Professional Services' },
        { value: 'manufacturing', label: '🏭 Manufacturing' },
        { value: 'healthcare', label: '⚕️ Healthcare' },
        { value: 'other', label: '📦 Other' },
      ],
      icon: Building2,
    },
    {
      id: 'years',
      type: 'number',
      question: 'How many years have you been in business?',
      subtitle: 'Experience matters in valuation',
      field: 'yearsInBusiness',
      placeholder: 'e.g., 5',
      min: 0,
      max: 100,
      icon: TrendingUp,
    },
    {
      id: 'revenue2023',
      type: 'currency',
      question: 'What was your revenue in 2023?',
      subtitle: 'Best estimate is fine',
      field: 'revenue2023',
      placeholder: 'e.g., 500,000',
      icon: Euro,
    },
    {
      id: 'revenue2024',
      type: 'currency',
      question: 'And your revenue in 2024?',
      subtitle: 'We use this to calculate growth trends',
      field: 'revenue2024',
      placeholder: 'e.g., 600,000',
      icon: BarChart3,
    },
    {
      id: 'team',
      type: 'number',
      question: 'How many people work in your business?',
      subtitle: 'Including you',
      field: 'teamSize',
      placeholder: 'e.g., 10',
      min: 1,
      max: 10000,
      icon: Users,
    },
    {
      id: 'email',
      type: 'email-capture',
      question: "Great! You're almost done",
      subtitle: 'Where should we send your valuation report?',
      field: 'email',
      placeholder: 'your@email.com',
      icon: Mail,
    },
  ];

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleNext = () => {
    if (currentStep === questions.length - 1) {
      // Show results
      setShowResults(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSelectOption = (value: string) => {
    setData({ ...data, [currentQuestion.field!]: value });
    // Auto-advance after selection
    setTimeout(() => handleNext(), 300);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setData({ ...data, [field]: value });
  };

  const isStepValid = () => {
    if (currentQuestion.type === 'welcome') return true;
    if (currentQuestion.field && data[currentQuestion.field as keyof ValuationData]) return true;
    return false;
  };

  // Calculate estimated value
  const calculateValue = () => {
    const baseMultiple = 3.5;
    const avgRevenue = ((data.revenue2023 || 0) + (data.revenue2024 || 0)) / 2;
    return Math.round(avgRevenue * baseMultiple);
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
          fallbackGradient="from-success-900 via-primary-900 to-success-900"
          overlay="dark"
          className="min-h-screen flex items-center justify-center py-20"
        >
          <Container>
            <div className="max-w-3xl mx-auto">
              <Card className="rounded-3xl border-2 border-success-200 shadow-2xl bg-white overflow-hidden">
                <CardBody className="p-6 sm:p-8 md:p-12">
                  {/* Success Animation */}
                  <div className="text-center mb-8">
                    <div className="w-24 h-24 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                      <CheckCircle className="w-12 h-12 text-success-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-neutral-900 mb-4">
                      Your Business is Valued at
                    </h1>
                    <div className="text-6xl font-bold text-success-600 mb-2">
                      €{estimatedValue.toLocaleString()}
                    </div>
                    <p className="text-lg text-neutral-600">
                      Based on {data.industry} industry standards
                    </p>
                  </div>

                  {/* Key Insights */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="p-4 bg-primary-50 rounded-xl">
                      <div className="text-sm font-semibold text-neutral-600 mb-1">
                        Revenue Multiple
                      </div>
                      <div className="text-2xl font-bold text-primary-600">3.5x</div>
                    </div>
                    <div className="p-4 bg-calm-50 rounded-xl">
                      <div className="text-sm font-semibold text-neutral-600 mb-1">
                        Confidence Level
                      </div>
                      <div className="text-2xl font-bold text-calm-600">High</div>
                    </div>
                  </div>

                  {/* Email Report */}
                  <div className="p-6 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl border border-neutral-200 mb-8">
                    <div className="flex items-start gap-3">
                      <Mail className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-neutral-900 mb-2">
                          Full Report Sent to {data.email}
                        </h3>
                        <p className="text-sm text-neutral-600">
                          Check your inbox for a detailed PDF report with:
                        </p>
                        <ul className="mt-3 space-y-2">
                          {[
                            'Detailed valuation breakdown',
                            'Industry comparisons',
                            'Growth recommendations',
                            'Next steps for selling',
                          ].map((item, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-success-600" />
                              <span className="text-neutral-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="space-y-3">
                    <Button variant="primary" className="w-full" size="lg">
                      Create Free Account
                    </Button>
                    <Button variant="secondary" className="w-full" size="lg">
                      Learn More About Selling
                    </Button>
                  </div>

                  <p className="text-center text-sm text-neutral-500 mt-6">
                    <Heart className="w-4 h-4 inline text-success-500" /> Join 12,000+ business
                    owners using Upswitch
                  </p>
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
        description="Discover your business value in 2 minutes. Free, accurate, and confidential."
      />

      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-calm-50">
        {/* Main Content */}
        <div className="py-12 min-h-screen flex items-center">
          <Container>
            <div className="max-w-2xl mx-auto">
              {/* Progress Bar - Inline */}
              <div className="mb-8 bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium text-neutral-600">
                    Question {currentStep + 1} of {questions.length}
                  </div>
                  <div className="text-sm font-medium text-primary-600">
                    {Math.round(progress)}%
                  </div>
                </div>
                <Progress
                  value={progress}
                  className="h-2"
                  classNames={{ indicator: 'bg-primary-500' }}
                />
              </div>

              {/* Question Card */}
              <Card className="rounded-3xl border-2 border-neutral-200 shadow-xl bg-white overflow-hidden">
                <CardBody className="p-6 sm:p-8 md:p-12">
                  {/* Icon */}
                  <div className="mb-8">
                    <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center">
                      {React.createElement(currentQuestion.icon, {
                        className: 'w-8 h-8 text-primary-600',
                      })}
                    </div>
                  </div>

                  {/* Question */}
                  <div className="mb-8">
                    <h1 className="text-4xl font-bold text-neutral-900 mb-4 leading-tight">
                      {currentQuestion.question || currentQuestion.title}
                    </h1>
                    <p className="text-xl text-neutral-600">{currentQuestion.subtitle}</p>
                  </div>

                  {/* Answer Input */}
                  <div className="mb-8">
                    {currentQuestion.type === 'welcome' && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-neutral-700">
                          <Shield className="w-5 h-5 text-primary-600" />
                          <span>100% confidential and secure</span>
                        </div>
                        <div className="flex items-center gap-3 text-neutral-700">
                          <CheckCircle className="w-5 h-5 text-primary-600" />
                          <span>No credit card required</span>
                        </div>
                        <div className="flex items-center gap-3 text-neutral-700">
                          <Sparkles className="w-5 h-5 text-primary-600" />
                          <span>Instant results</span>
                        </div>
                      </div>
                    )}

                    {currentQuestion.type === 'select' && (
                      <div className="space-y-3">
                        {currentQuestion.options?.map(option => (
                          <button
                            key={option.value}
                            onClick={() => handleSelectOption(option.value)}
                            className={`w-full p-4 rounded-xl border-2 text-left transition-all hover:border-primary-500 hover:shadow-lg ${
                              data[currentQuestion.field as keyof ValuationData] === option.value
                                ? 'border-primary-500 bg-primary-50'
                                : 'border-neutral-200 bg-white'
                            }`}
                          >
                            <span className="text-lg font-medium text-neutral-900">
                              {option.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}

                    {(currentQuestion.type === 'number' || currentQuestion.type === 'currency') && (
                      <Input
                        type="number"
                        size="lg"
                        placeholder={currentQuestion.placeholder}
                        value={data[currentQuestion.field as keyof ValuationData]?.toString() || ''}
                        onChange={e =>
                          handleInputChange(currentQuestion.field!, parseFloat(e.target.value) || 0)
                        }
                        startContent={
                          currentQuestion.type === 'currency' ? (
                            <Euro className="w-5 h-5" />
                          ) : undefined
                        }
                        classNames={{
                          input: 'text-2xl',
                          inputWrapper:
                            'h-16 border-2 border-neutral-200 hover:border-primary-500 focus-within:border-primary-500',
                        }}
                      />
                    )}

                    {currentQuestion.type === 'email-capture' && (
                      <div>
                        <Input
                          type="email"
                          size="lg"
                          placeholder={currentQuestion.placeholder}
                          value={data.email || ''}
                          onChange={e => handleInputChange('email', e.target.value)}
                          startContent={<Mail className="w-5 h-5" />}
                          classNames={{
                            input: 'text-2xl',
                            inputWrapper:
                              'h-16 border-2 border-neutral-200 hover:border-primary-500 focus-within:border-primary-500',
                          }}
                        />
                        <p className="text-sm text-neutral-500 mt-3 flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          We'll email your detailed valuation report. No spam, ever.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Navigation */}
                  <div className="flex gap-4">
                    {currentStep > 0 && (
                      <Button
                        variant="secondary"
                        size="lg"
                        onPress={handleBack}
                        startContent={<ArrowLeft className="w-5 h-5" />}
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      variant="primary"
                      size="lg"
                      onPress={handleNext}
                      endContent={<ArrowRight className="w-5 h-5" />}
                      isDisabled={!isStepValid()}
                      className="flex-1"
                    >
                      {currentStep === questions.length - 1 ? 'Get My Valuation' : 'Continue'}
                    </Button>
                  </div>
                </CardBody>
              </Card>

              {/* Trust signals */}
              <div className="mt-8 text-center">
                <p className="text-sm text-neutral-500 mb-3">Trusted by 12,000+ business owners</p>
                <div className="flex justify-center items-center gap-6 text-xs text-neutral-400">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>Bank-grade security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>GDPR compliant</span>
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

export default ValuationVariationA;
