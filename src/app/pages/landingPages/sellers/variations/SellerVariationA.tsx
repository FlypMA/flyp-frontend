/**
 * 🎯 Seller Landing Page - Variation A: "Business Intelligence First"
 * 
 * STRATEGY:
 * - Lead with valuation & business health (not selling)
 * - De-emphasize "selling" until user is ready
 * - Focus: "Get smarter about your business"
 * - Position as 12-36 month exploration journey
 * 
 * INSPIRATION:
 * - Airbnb: Trust-building, clean design, video background
 * - Typeform: Conversational, friendly tone
 * - Epidemic Sound: Bold typography, professional warmth
 */

import { Button } from '@/shared/components/buttons';
import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { VideoBackground } from '@/shared/components/video';
import { authService } from '@/shared/services/auth';
import { seoData } from '@/shared/utils/seo/seoData';
import { Card, CardBody } from '@heroui/react';
import {
  BarChart3,
  Brain,
  CheckCircle,
  LineChart,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../providers/auth-provider';

const SellerVariationA = () => {
  const navigate = useNavigate();
  const { openModal } = useAuth();

  // Primary CTA: Get Free Valuation (not "sell")
  const handleGetValuationClick = async () => {
    try {
      const authResult = await authService.checkAuthentication();

      if (authResult.isAuthenticated) {
        navigate('/my-business/valuation');
      } else {
        openModal('signup', {
          url: '/my-business/valuation',
          state: { from: 'seller-landing-variation-a', intent: 'valuation' },
        });
      }
    } catch (error) {
      openModal('signup', {
        url: '/my-business/valuation',
        state: { from: 'seller-landing-variation-a', intent: 'valuation' },
      });
    }
  };

  const handleExploreToolsClick = async () => {
    try {
      const authResult = await authService.checkAuthentication();

      if (authResult.isAuthenticated) {
        navigate('/my-business');
      } else {
        openModal('signup', {
          url: '/my-business',
          state: { from: 'seller-landing-variation-a', intent: 'explore' },
        });
      }
    } catch (error) {
      openModal('signup', {
        url: '/my-business',
        state: { from: 'seller-landing-variation-a', intent: 'explore' },
      });
    }
  };

  const intelligenceFeatures = [
    {
      icon: BarChart3,
      title: 'Real-time Business Valuation',
      description:
        'Get instant, professional valuations based on 3 proven methodologies. Know what your business is worth today.',
      color: 'bg-primary-100 text-primary-600',
    },
    {
      icon: LineChart,
      title: 'Financial Health Scoring',
      description:
        'Track your business health with monthly insights. See trends, identify opportunities, and make smarter decisions.',
      color: 'bg-success-100 text-success-600',
    },
    {
      icon: TrendingUp,
      title: 'Growth Recommendations',
      description:
        'AI-powered insights show you exactly where to improve your valuation before you even think about selling.',
      color: 'bg-accent-100 text-accent-600',
    },
    {
      icon: Shield,
      title: 'Bank-Grade Security',
      description:
        'Your financial data is encrypted and protected. Share insights only when you decide to explore selling.',
      color: 'bg-calm-100 text-calm-600',
    },
  ];

  const journeySteps = [
    {
      phase: 'Month 1-3',
      title: 'Understand Your Worth',
      description: 'Get free valuations, explore what drives value, no commitment required.',
      icon: Brain,
    },
    {
      phase: 'Month 3-12',
      title: 'Optimize & Grow',
      description: 'Use monthly insights to improve your business metrics and increase value.',
      icon: TrendingUp,
    },
    {
      phase: 'Month 12-24',
      title: 'Consider Your Options',
      description: 'When ready, explore listing options. Or keep using our tools indefinitely.',
      icon: Zap,
    },
    {
      phase: 'When You Decide',
      title: 'List & Sell Confidently',
      description: 'Your data is ready. List in minutes with all insights prepared.',
      icon: Users,
    },
  ];

  return (
    <>
      <SEOHead
        {...seoData.sellers}
        title="Business Intelligence Platform for SME Owners | Flyp"
        description="Get smarter about your business. Free valuations, monthly insights, and growth recommendations. No pressure to sell — explore for 12-36 months."
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section with Video Background - Epidemic Sound inspired */}
        <VideoBackground
          videoSrc="/videos/business-owner-working.mp4"
          fallbackGradient="from-neutral-900 via-neutral-800 to-neutral-900"
          posterImage="/images/hero-poster.jpg"
          overlay="dark"
          className="py-32 md:py-40"
          disableVideoOnMobile={true}
        >
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              {/* Pre-headline */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8">
                <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-white">
                  Join 12,000+ business owners getting smarter
                </span>
              </div>

              {/* Main Headline - Bold, Typeform style */}
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
                Know what your business
                <span className="block bg-gradient-to-r from-primary-400 to-calm-400 bg-clip-text text-transparent">
                  is really worth
                </span>
              </h1>

              {/* Sub-headline - Conversational */}
              <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                Get professional valuations, monthly insights, and smart recommendations.{' '}
                <span className="text-white font-semibold">No pressure to sell.</span> Just smarter
                business intelligence.
              </p>

              {/* Primary CTA - NOT about selling */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  variant="primary"
                  size="xl"
                  onPress={handleGetValuationClick}
                  className="px-10 py-4 h-16 text-lg font-semibold shadow-2xl shadow-primary-500/50"
                >
                  Get Your Free Valuation
                </Button>
                <Button
                  variant="secondary"
                  size="xl"
                  onPress={handleExploreToolsClick}
                  className="px-10 py-4 h-16 text-lg bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                >
                  Explore Intelligence Tools
                </Button>
              </div>

              {/* Trust signals - Airbnb style */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success-400" />
                  <span>Free forever</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success-400" />
                  <span>No credit card</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success-400" />
                  <span>No selling pressure</span>
                </div>
              </div>
            </div>
          </Container>
        </VideoBackground>

        {/* Intelligence Features - What You Get */}
        <div className="py-24 bg-white">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-20">
                <div className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-6">
                  Business Intelligence Platform
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                  Tools that make you smarter
                  <br />
                  <span className="text-neutral-600">not just sales-ready</span>
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                  Most platforms want you to list immediately. We help you understand and optimize
                  your business first. Selling is optional.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {intelligenceFeatures.map((feature, index) => (
                  <Card
                    key={index}
                    className="group rounded-3xl border border-neutral-200 hover:border-primary-300 hover:shadow-2xl hover:shadow-primary-100/50 transition-all duration-500 bg-white overflow-hidden"
                  >
                    <CardBody className="p-10">
                      <div
                        className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <feature.icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-lg text-neutral-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </div>

        {/* No-Pressure Journey Timeline - Visual */}
        <div className="py-24 bg-gradient-to-br from-neutral-100 via-white to-calm-50">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-20">
                <div className="inline-block px-4 py-2 bg-calm-100 text-calm-700 rounded-full text-sm font-semibold mb-6">
                  12-36 Month Journey
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                  Take your time.
                  <br />
                  <span className="text-neutral-600">We're here when you need us.</span>
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                  Most business owners explore for 12-36 months before listing. Our platform
                  supports that natural journey.
                </p>
              </div>

              {/* Timeline visualization */}
              <div className="relative">
                {/* Timeline line - desktop */}
                <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-calm-200 to-success-200" />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
                  {journeySteps.map((step, index) => (
                    <div key={index} className="relative">
                      {/* Timeline dot */}
                      <div className="hidden md:flex absolute -top-2 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white border-4 border-primary-500 rounded-full items-center justify-center z-10">
                        <div className="w-3 h-3 bg-primary-500 rounded-full" />
                      </div>

                      <Card className="mt-16 md:mt-20 rounded-2xl border-2 border-neutral-200 hover:border-primary-300 hover:shadow-xl transition-all duration-300 bg-white">
                        <CardBody className="p-6 text-center">
                          <div className="mb-4 md:hidden">
                            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto">
                              <step.icon className="w-6 h-6 text-primary-600" />
                            </div>
                          </div>
                          <div className="text-sm font-bold text-primary-600 mb-2">
                            {step.phase}
                          </div>
                          <h3 className="text-lg font-bold text-neutral-900 mb-3">
                            {step.title}
                          </h3>
                          <p className="text-sm text-neutral-600 leading-relaxed">
                            {step.description}
                          </p>
                        </CardBody>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="text-center mt-20">
                <p className="text-lg text-neutral-600 mb-6">
                  Start exploring today. No commitment, no credit card, no selling pressure.
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  onPress={handleGetValuationClick}
                  className="px-10 py-4 h-14 text-lg font-semibold shadow-xl shadow-primary-500/30"
                >
                  Get Your Free Valuation Now
                </Button>
                <p className="text-sm text-neutral-500 mt-4">
                  ✨ Takes 10 minutes • Results in seconds • Always free
                </p>
              </div>
            </div>
          </Container>
        </div>

        {/* Social Proof Section - De-emphasize selling */}
        <div className="py-24 bg-white">
          <Container>
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                  Trusted by smart business owners
                </h2>
                <p className="text-lg text-neutral-600">
                  Join thousands who use Flyp to understand and optimize their businesses
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    quote:
                      "I wasn't ready to sell, but the valuation showed me exactly where to improve. 18 months later, my business value increased 40%.",
                    name: 'Sophie Laurent',
                    business: 'Digital Marketing Agency',
                    location: 'Brussels, BE',
                  },
                  {
                    quote:
                      'The monthly insights are gold. I use them for board meetings, investor updates, and strategic planning. Selling is just one option now.',
                    name: 'Marcus van der Berg',
                    business: 'SaaS Platform',
                    location: 'Amsterdam, NL',
                  },
                  {
                    quote:
                      'Finally, a platform that treats business owners like partners, not transactions. The intelligence tools paid for themselves in savings.',
                    name: 'Claire Dubois',
                    business: 'Restaurant Chain',
                    location: 'Paris, FR',
                  },
                ].map((testimonial, index) => (
                  <Card
                    key={index}
                    className="rounded-2xl border border-neutral-200 hover:shadow-xl transition-all duration-300 bg-white"
                  >
                    <CardBody className="p-8">
                      <div className="mb-6">
                        <div className="flex gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-5 h-5 text-amber-400">
                              ⭐
                            </div>
                          ))}
                        </div>
                        <p className="text-neutral-700 leading-relaxed italic">
                          "{testimonial.quote}"
                        </p>
                      </div>
                      <div className="border-t border-neutral-200 pt-4">
                        <div className="font-semibold text-neutral-900">{testimonial.name}</div>
                        <div className="text-sm text-neutral-600">{testimonial.business}</div>
                        <div className="text-xs text-neutral-500 mt-1">{testimonial.location}</div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </div>

        {/* Final CTA - Emphasis on intelligence, not selling */}
        <div className="py-24 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Get smarter about your business
                <br />
                <span className="text-primary-400">starting today</span>
              </h2>
              <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
                Join 12,000+ business owners using Flyp's intelligence platform to understand,
                optimize, and (when ready) sell their businesses.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
                <Button
                  variant="primary"
                  size="xl"
                  onPress={handleGetValuationClick}
                  className="px-12 py-4 h-16 text-lg font-semibold shadow-2xl shadow-primary-500/50"
                >
                  Get Your Free Valuation
                </Button>
                <Button
                  variant="secondary"
                  size="xl"
                  onPress={() => navigate('/contact')}
                  className="px-12 py-4 h-16 text-lg bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                >
                  Talk to Our Team
                </Button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success-400" />
                  <span>Free forever</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success-400" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success-400" />
                  <span>No selling pressure</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success-400" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default SellerVariationA;
