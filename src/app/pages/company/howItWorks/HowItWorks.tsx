/**
 * 🎯 How It Works Page
 *
 * Comprehensive guide explaining the platform for both buyers and sellers
 * - Buyer journey: Browse → Inquire → NDA → Due Diligence → Offer → Close
 * - Seller journey: 12-36 month exploration → Valuation → Track → Optimize → List → Match → Close
 */

import { Button } from '@/shared/components/buttons';
import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { UrlGenerator } from '@/shared/services';
import { seoData } from '@/shared/utils/seo/seoData';
import { Card, CardBody } from '@heroui/react';
import {
  ArrowRight,
  BarChart3,
  Building2,
  Calculator,
  CheckCircle,
  Clock,
  FileText,
  HandshakeIcon,
  LineChart,
  Lock,
  MessageSquare,
  Search,
  Shield,
  Sparkles,
  TrendingUp,
  Upload,
  Users,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../providers/auth-provider';

const HowItWorks = () => {
  const navigate = useNavigate();
  const { tab } = useParams<{ tab?: 'buyer' | 'seller' }>();
  const { openModal, user } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'buyer' | 'seller'>('buyer');

  // Set selected tab based on URL parameter
  useEffect(() => {
    if (tab === 'buyer' || tab === 'seller') {
      setSelectedTab(tab);
    }
  }, [tab]);

  const buyerSteps = [
    {
      number: 1,
      title: 'Browse & Discover',
      icon: Search,
      description: 'Explore thousands of businesses for sale across Europe',
      features: [
        'Advanced search filters (industry, location, price)',
        'Detailed business profiles with financials',
        'Save businesses to watchlist',
        'Compare multiple opportunities',
      ],
      color: 'primary',
      dashboard: '/search',
    },
    {
      number: 2,
      title: 'Request Information',
      icon: MessageSquare,
      description: 'Connect with sellers and request more details',
      features: [
        'Send confidential inquiries',
        'Ask questions directly',
        'Review financial summaries',
        'Schedule calls with sellers',
      ],
      color: 'calm',
      dashboard: '/messages',
    },
    {
      number: 3,
      title: 'Sign NDA & Review',
      icon: Lock,
      description: 'Access confidential information and full data room',
      features: [
        'Secure NDA process',
        'Full financial statements access',
        'Document vault review',
        'Legal & tax information',
      ],
      color: 'success',
      dashboard: '/listings/:id/private',
    },
    {
      number: 4,
      title: 'Due Diligence',
      icon: FileText,
      description: 'Conduct thorough analysis with our platform support',
      features: [
        'Guided due diligence checklist',
        'Financial analysis tools',
        'Legal review support',
        'Expert advisor access',
      ],
      color: 'accent',
      dashboard: '/due-diligence/:processId/:listingId',
    },
    {
      number: 5,
      title: 'Make an Offer',
      icon: HandshakeIcon,
      description: 'Submit and negotiate your offer',
      features: [
        'Structured offer submission',
        'Negotiation platform',
        'Legal document templates',
        'Escrow service integration',
      ],
      color: 'primary',
      dashboard: '/offers/:listingId',
    },
    {
      number: 6,
      title: 'Close the Deal',
      icon: CheckCircle,
      description: 'Complete the transaction with full support',
      features: [
        'Transaction coordination',
        'Payment processing',
        'Legal completion support',
        'Post-acquisition assistance',
      ],
      color: 'success',
      dashboard: '/transactions/:transactionId',
    },
  ];

  const sellerSteps = [
    {
      number: 1,
      title: 'Get Free Valuation',
      icon: Calculator,
      description: 'Understand your business value with no commitment',
      features: [
        'Instant valuation calculator',
        'Industry-specific multiples',
        'Detailed valuation report',
        'No obligation to sell',
      ],
      color: 'primary',
      dashboard: '/valuation',
      cta: 'Get Valued',
    },
    {
      number: 2,
      title: 'Track Value (12-36 months)',
      icon: LineChart,
      description: 'Monitor your business value over time',
      features: [
        'Monthly valuation updates',
        'Performance insights',
        'Optimization recommendations',
        'Market trend analysis',
      ],
      color: 'success',
      dashboard: '/my-business/valuations',
      cta: 'View Dashboard',
    },
    {
      number: 3,
      title: 'Build Your Data Room',
      icon: Upload,
      description: 'Prepare your business information progressively',
      features: [
        'Secure document storage',
        'Business card creation',
        'Profile completion (175+ data points)',
        'Financial document upload',
      ],
      color: 'calm',
      dashboard: '/my-business/documents',
      cta: 'Manage Documents',
    },
    {
      number: 4,
      title: 'Optimize & Improve',
      icon: TrendingUp,
      description: 'Increase your business value before listing',
      features: [
        'Value improvement roadmap',
        'Financial health scoring',
        'Market positioning advice',
        'Expert consultation',
      ],
      color: 'accent',
      dashboard: '/my-business/performance',
      cta: 'View Performance',
    },
    {
      number: 5,
      title: 'Create Your Listing',
      icon: Building2,
      description: "List when you're ready (data pre-filled)",
      features: [
        'Auto-populated from data room',
        'Professional listing creation',
        'Marketing materials',
        'Confidential or public listing',
      ],
      color: 'primary',
      dashboard: '/my-business/listings/create',
      cta: 'Create Listing',
    },
    {
      number: 6,
      title: 'Match with Buyers',
      icon: Users,
      description: 'Connect with qualified, verified buyers',
      features: [
        'Qualified buyer inquiries',
        'NDA-protected information',
        'Negotiation platform',
        'Full transaction support',
      ],
      color: 'success',
      dashboard: '/my-business/listings',
      cta: 'View Inquiries',
    },
  ];

  const dashboardFeatures = {
    buyer: [
      {
        title: 'Search & Discovery',
        description: 'Advanced filters, saved searches, and AI-powered recommendations',
        icon: Search,
      },
      {
        title: 'Watchlist & Tracking',
        description: 'Monitor businesses, receive alerts, and compare opportunities',
        icon: BarChart3,
      },
      {
        title: 'Secure Messaging',
        description: 'Direct communication with sellers, inquiry management, and document sharing',
        icon: MessageSquare,
      },
      {
        title: 'Due Diligence Tools',
        description: 'Checklists, financial analysis, and expert support throughout the process',
        icon: FileText,
      },
    ],
    seller: [
      {
        title: 'Business Dashboard',
        description: 'Real-time performance metrics, valuation tracking, and listing analytics',
        icon: BarChart3,
        route: '/my-business',
      },
      {
        title: 'Valuation Center',
        description: 'Monthly valuations, historical trends, and improvement recommendations',
        icon: TrendingUp,
        route: '/my-business/valuations',
      },
      {
        title: 'Document Vault',
        description: 'Secure storage, version control, and buyer access management',
        icon: Lock,
        route: '/my-business/documents',
      },
      {
        title: 'Listing Management',
        description: 'Inquiry handling, performance tracking, and buyer engagement analytics',
        icon: Building2,
        route: '/my-business/listings',
      },
    ],
  };

  const handleGetStarted = () => {
    if (user) {
      if (selectedTab === 'buyer') {
        navigate(UrlGenerator.search());
      } else {
        navigate(UrlGenerator.myBusiness());
      }
    } else {
      openModal('signup');
    }
  };

  return (
    <>
      <SEOHead
        {...seoData.home}
        title="How It Works | Upswitch - European M&A Platform"
        description="Learn how Upswitch works for buyers and sellers. From business valuation to closing the deal, we guide you through every step of the M&A process."
      />

      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-calm-50">
        {/* Hero Section */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary-900 via-calm-900 to-success-900 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat"></div>
          </div>

          <Container>
            <div className="max-w-5xl mx-auto text-center relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8">
                <Sparkles className="w-5 h-5 text-success-400" />
                <span className="text-white font-medium">Complete Guide to M&A on Upswitch</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                How Upswitch
                <br />
                <span className="bg-gradient-to-r from-success-300 to-primary-300 bg-clip-text text-transparent">
                  Works
                </span>
              </h1>

              <p className="text-2xl md:text-3xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                Whether you're buying or selling a business, we guide you through every step with
                transparency, security, and expert support.
              </p>

              {/* Journey Selector - Tab Style */}
              <div className="flex justify-center mb-8">
                <div className="inline-flex bg-white/10 backdrop-blur-md border border-white/30 rounded-full p-2">
                  <button
                    onClick={() => setSelectedTab('buyer')}
                    className={`px-8 py-3 rounded-full font-semibold text-base transition-all duration-200 ${
                      selectedTab === 'buyer'
                        ? 'bg-white text-primary-900 shadow-lg'
                        : 'text-white hover:text-white/80'
                    }`}
                  >
                    👤 For Buyers
                  </button>
                  <button
                    onClick={() => setSelectedTab('seller')}
                    className={`px-8 py-3 rounded-full font-semibold text-base transition-all duration-200 ${
                      selectedTab === 'seller'
                        ? 'bg-white text-primary-900 shadow-lg'
                        : 'text-white hover:text-white/80'
                    }`}
                  >
                    💼 For Sellers
                  </button>
                </div>
              </div>

              {/* Instruction */}
              <p className="text-center text-white/70 text-sm mb-8">
                👆 Click to switch between buyer and seller journeys
              </p>
            </div>
          </Container>
        </section>

        {/* Journey Steps */}
        <section className="py-24">
          <Container>
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                  {selectedTab === 'buyer' ? 'The Buyer Journey' : 'The Seller Journey'}
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                  {selectedTab === 'buyer'
                    ? 'From discovering the perfect business to closing the deal, we support you every step of the way.'
                    : 'From understanding your value to finding the right buyer, take 12-36 months to explore at your own pace.'}
                </p>
              </div>

              {/* Steps Grid */}
              <div className="space-y-8">
                {(selectedTab === 'buyer' ? buyerSteps : sellerSteps).map((step, index) => {
                  const Icon = step.icon;
                  const isEven = index % 2 === 0;

                  return (
                    <Card
                      key={index}
                      className={`rounded-3xl border-2 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${
                        step.color === 'primary'
                          ? 'border-primary-200 hover:border-primary-400'
                          : step.color === 'success'
                            ? 'border-success-200 hover:border-success-400'
                            : step.color === 'calm'
                              ? 'border-calm-200 hover:border-calm-400'
                              : 'border-accent-200 hover:border-accent-400'
                      }`}
                    >
                      <CardBody className="p-8 md:p-12">
                        <div
                          className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                            isEven ? '' : 'md:flex-row-reverse'
                          }`}
                        >
                          {/* Left Side - Content */}
                          <div className={isEven ? '' : 'md:order-2'}>
                            <div className="flex items-center gap-4 mb-6">
                              <div
                                className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                                  step.color === 'primary'
                                    ? 'bg-primary-100'
                                    : step.color === 'success'
                                      ? 'bg-success-100'
                                      : step.color === 'calm'
                                        ? 'bg-calm-100'
                                        : 'bg-accent-100'
                                }`}
                              >
                                <Icon
                                  className={`w-8 h-8 ${
                                    step.color === 'primary'
                                      ? 'text-primary-600'
                                      : step.color === 'success'
                                        ? 'text-success-600'
                                        : step.color === 'calm'
                                          ? 'text-calm-600'
                                          : 'text-accent-600'
                                  }`}
                                />
                              </div>
                              <div>
                                <div
                                  className={`text-sm font-bold mb-1 ${
                                    step.color === 'primary'
                                      ? 'text-primary-600'
                                      : step.color === 'success'
                                        ? 'text-success-600'
                                        : step.color === 'calm'
                                          ? 'text-calm-600'
                                          : 'text-accent-600'
                                  }`}
                                >
                                  STEP {step.number}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-neutral-900">
                                  {step.title}
                                </h3>
                              </div>
                            </div>

                            <p className="text-lg text-neutral-600 mb-6">{step.description}</p>

                            <ul className="space-y-3">
                              {step.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                  <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-neutral-700">{feature}</span>
                                </li>
                              ))}
                            </ul>

                            {'cta' in step && step.cta && (
                              <div className="mt-6">
                                <Button
                                  variant="primary"
                                  size="lg"
                                  onPress={() => navigate(step.dashboard)}
                                  endContent={<ArrowRight className="w-5 h-5" />}
                                >
                                  {step.cta as string}
                                </Button>
                              </div>
                            )}
                          </div>

                          {/* Right Side - Visual */}
                          <div className={isEven ? '' : 'md:order-1'}>
                            <div
                              className={`rounded-2xl p-8 ${
                                step.color === 'primary'
                                  ? 'bg-gradient-to-br from-primary-50 to-primary-100'
                                  : step.color === 'success'
                                    ? 'bg-gradient-to-br from-success-50 to-success-100'
                                    : step.color === 'calm'
                                      ? 'bg-gradient-to-br from-calm-50 to-calm-100'
                                      : 'bg-gradient-to-br from-accent-50 to-accent-100'
                              }`}
                            >
                              <div className="aspect-video bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center border-2 border-white/50">
                                <div className="text-center">
                                  <Icon className="w-16 h-16 text-neutral-400 mx-auto mb-3" />
                                  <p className="text-sm text-neutral-500 font-medium">
                                    Dashboard Preview
                                  </p>
                                  <p className="text-xs text-neutral-400 mt-1">{step.dashboard}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>

        {/* Dashboard Features */}
        <section className="py-24 bg-white">
          <Container>
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                  {selectedTab === 'buyer'
                    ? 'Buyer Dashboard Features'
                    : 'Seller Dashboard Features'}
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                  {selectedTab === 'buyer'
                    ? 'Everything you need to find, evaluate, and acquire the perfect business.'
                    : 'Track your value, manage documents, and connect with qualified buyers — all in one place.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {dashboardFeatures[selectedTab].map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <Card
                      key={index}
                      className="rounded-2xl border-2 border-neutral-200 hover:border-primary-300 hover:shadow-xl transition-all"
                    >
                      <CardBody className="p-8">
                        <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mb-4">
                          <Icon className="w-7 h-7 text-primary-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-neutral-600 leading-relaxed mb-4">
                          {feature.description}
                        </p>
                        {feature.route && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onPress={() => navigate(feature.route)}
                            endContent={<ArrowRight className="w-4 h-4" />}
                          >
                            View Dashboard
                          </Button>
                        )}
                      </CardBody>
                    </Card>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>

        {/* Why Upswitch */}
        <section className="py-24 bg-gradient-to-br from-neutral-50 to-white">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                  Why Choose Upswitch?
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                  Europe's leading M&A platform built for transparency, security, and success.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Shield,
                    title: 'Secure & Confidential',
                    description:
                      'Bank-level encryption, NDA protection, and complete confidentiality throughout the process.',
                  },
                  {
                    icon: Users,
                    title: 'Verified Users',
                    description:
                      'All buyers and sellers are verified. Connect with serious, qualified counterparts only.',
                  },
                  {
                    icon: Zap,
                    title: 'Expert Support',
                    description:
                      'Dedicated M&A advisors, legal support, and transaction coordination at every step.',
                  },
                  {
                    icon: Clock,
                    title: 'No Pressure',
                    description:
                      'For sellers: explore for 12-36 months. For buyers: take your time to find the right fit.',
                  },
                  {
                    icon: BarChart3,
                    title: 'Data-Driven',
                    description:
                      'Advanced analytics, market insights, and valuation tools to make informed decisions.',
                  },
                  {
                    icon: CheckCircle,
                    title: 'Proven Success',
                    description:
                      '1,200+ successful transactions. €2.4B in total deal value. Average 90-day close time.',
                  },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Card
                      key={index}
                      className="rounded-2xl border-2 border-neutral-200 hover:border-success-300 hover:shadow-xl transition-all"
                    >
                      <CardBody className="p-8 text-center">
                        <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-8 h-8 text-success-600" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-3">{item.title}</h3>
                        <p className="text-neutral-600 leading-relaxed">{item.description}</p>
                      </CardBody>
                    </Card>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-gradient-to-br from-primary-900 via-success-900 to-calm-900 text-white">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                {selectedTab === 'buyer' ? 'Ready to Find Your Business?' : 'Ready to Get Started?'}
              </h2>
              <p className="text-xl text-white/90 mb-12">
                {selectedTab === 'buyer'
                  ? 'Join thousands of buyers exploring opportunities across Europe. Start your search today.'
                  : 'Join 12,000+ business owners tracking their value with Upswitch. Get your free valuation now.'}
              </p>

              <button
                onClick={handleGetStarted}
                className="inline-flex items-center justify-center gap-3 px-12 h-16 text-lg font-semibold bg-white text-primary-900 hover:bg-neutral-100 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-[0.98]"
              >
                {selectedTab === 'buyer' ? 'Browse Businesses' : 'Get Free Valuation'}
                <ArrowRight className="w-6 h-6" />
              </button>

              <p className="text-sm text-white/60 mt-6">
                {user
                  ? 'Continue to your dashboard'
                  : 'Free account • No credit card required • 2 minutes to sign up'}
              </p>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
};

export default HowItWorks;
