/**
 * 🎯 Homepage - Variation B: "Smart Router"
 *
 * STRATEGY:
 * - Clear path selection (seller vs buyer)
 * - Fast routing to specialized pages
 * - Dual CTA hero (seller primary, buyer secondary)
 * - Visual journey paths
 * - Focus: "Get users to the right place fast"
 *
 * ALIGNED WITH AARRR:
 * - Homepage = Traffic router (not converter)
 * - Route sellers to /valuation (40% email capture there)
 * - Route buyers to /search (12% sign-up there)
 * - Success metric: >60% routing success, <35% bounce
 */

import { Button } from '@/shared/components/buttons';
import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { VideoBackground } from '@/shared/components/video';
import { UrlGenerator } from '@/shared/services/urls/urlGenerator';
import { seoData } from '@/shared/utils/seo/seoData';
import { Card, CardBody } from '@heroui/react';
import {
  ArrowRight,
  BarChart3,
  Brain,
  Building2,
  Euro,
  HandshakeIcon,
  Search,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomeVariationB = () => {
  const navigate = useNavigate();

  const quickValueProps = [
    {
      icon: TrendingUp,
      title: 'Understand Your Value',
      subtitle: 'For Business Owners',
      description: 'Free valuation. Monthly insights. No pressure, no obligations — ever.',
      cta: 'Get Your Free Valuation',
      action: () => navigate('/valuation'),
      color: 'primary',
    },
    {
      icon: Search,
      title: 'Find the Right Match',
      subtitle: 'For Buyers',
      description: '2,400+ verified businesses. Expert vetting. We help you find your perfect fit.',
      cta: 'Browse Opportunities',
      action: () => navigate('/search'),
      color: 'calm',
    },
    {
      icon: Brain,
      title: 'Build Value on Your Timeline',
      subtitle: 'Intelligence First',
      description: 'Track your business value over 12-36 months. Decide when you are ready.',
      cta: 'Learn How It Works',
      action: () => navigate(UrlGenerator.howItWorks()),
      color: 'success',
    },
    {
      icon: Users,
      title: 'We Are With You Every Step',
      subtitle: 'Expert Guidance',
      description: 'From valuation to closing, our team supports you. Human help when you need it.',
      cta: 'See Our Approach',
      action: () => navigate(UrlGenerator.howItWorks()),
      color: 'accent',
    },
  ];

  const sellerJourney = [
    {
      step: 1,
      icon: Sparkles,
      phase: 'Get Valued',
      description: 'Free valuation in minutes',
      action: 'Start Here',
    },
    {
      step: 2,
      icon: TrendingUp,
      phase: 'Build Value',
      description: '12-36 month insights',
      action: null,
    },
    {
      step: 3,
      icon: Shield,
      phase: 'Prepare',
      description: 'Build your data room',
      action: null,
    },
    {
      step: 4,
      icon: HandshakeIcon,
      phase: 'Find Buyer',
      description: 'Expert matching',
      action: 'When Ready',
    },
  ];

  const buyerJourney = [
    {
      step: 1,
      icon: Search,
      phase: 'Browse',
      description: 'Verified listings',
      action: 'Explore Now',
    },
    {
      step: 2,
      icon: BarChart3,
      phase: 'Evaluate',
      description: 'Data room access',
      action: null,
    },
    {
      step: 3,
      icon: Users,
      phase: 'Connect',
      description: 'Expert support',
      action: null,
    },
    {
      step: 4,
      icon: Target,
      phase: 'Transact',
      description: 'Secure closing',
      action: 'Complete',
    },
  ];

  return (
    <>
      <SEOHead
        {...seoData.home}
        title="Buy or Sell a Business with Care — We're Here to Guide You | Upswitch"
        description="Europe's most trusted M&A platform for SMEs. From valuation to closing, we support you every step of the way. No pressure, just expert guidance."
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section - Dual CTA */}
        <VideoBackground
          videoSrc="/videos/dual-journey.mp4"
          fallbackGradient="from-neutral-900 via-primary-900 to-calm-900"
          posterImage="/images/dual-journey-poster.jpg"
          overlay="gradient"
          className="py-32 md:py-40"
        >
          <Container>
            <div className="max-w-5xl mx-auto text-center">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8">
                <Sparkles className="w-5 h-5 text-success-400" />
                <span className="text-white font-medium">
                  Trusted by 12,000+ business owners • €840M+ transacted
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                Buy or sell a business with care —
                <br />
                <span className="bg-gradient-to-r from-success-300 to-primary-300 bg-clip-text text-transparent">
                  we're here to guide you
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                From valuation to closing, we handle everything. No pressure, no stress — just
                expert support when you need it.
              </p>

              {/* Dual CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
                <Button
                  variant="primary"
                  size="xl"
                  onPress={() => navigate('/valuation')}
                  endContent={<ArrowRight className="w-5 h-5" />}
                  className="w-full sm:w-auto px-12 bg-primary-600 text-white hover:bg-primary-700 shadow-2xl"
                >
                  Understand Your Value — Free
                </Button>
                <Button
                  variant="secondary"
                  size="xl"
                  onPress={() => navigate('/search')}
                  endContent={<ArrowRight className="w-5 h-5" />}
                  className="w-full sm:w-auto px-12 bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white/20"
                >
                  Browse Businesses
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-8 mt-16 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-white" />
                  <span>Bank-grade security</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-white" />
                  <span>2,400+ successful exits</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>94% success rate</span>
                </div>
              </div>
            </div>
          </Container>
        </VideoBackground>

        {/* Quick Value Props - 4 Cards */}
        <div className="py-20 bg-gradient-to-b from-neutral-50 to-white">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                  Everything you need, in one place
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                  From valuation to closing, we've got you covered
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickValueProps.map((prop, index) => (
                  <Card
                    key={index}
                    isPressable
                    onPress={prop.action}
                    className={`rounded-2xl border-2 border-${prop.color}-200 hover:border-${prop.color}-400 hover:shadow-2xl transition-all duration-300 cursor-pointer group bg-white`}
                  >
                    <CardBody className="p-6">
                      <div
                        className={`w-14 h-14 bg-${prop.color}-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                      >
                        <prop.icon className={`w-7 h-7 text-${prop.color}-600`} />
                      </div>
                      <div className="text-xs font-semibold text-neutral-500 mb-1 uppercase tracking-wide">
                        {prop.subtitle}
                      </div>
                      <h3 className="text-lg font-bold text-neutral-900 mb-2">{prop.title}</h3>
                      <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
                        {prop.description}
                      </p>
                      <div
                        className={`inline-flex items-center gap-2 text-sm font-semibold text-${prop.color}-600 group-hover:gap-3 transition-all`}
                      >
                        {prop.cta}
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </div>

        {/* Path Showcase - Choose Your Journey */}
        <div className="py-24 bg-white">
          <Container>
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                  Choose Your Journey
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                  Different paths, same level of support and expertise
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Seller Journey */}
                <Card className="rounded-3xl border-2 border-primary-200 shadow-xl overflow-hidden">
                  <CardBody className="p-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-neutral-900">Seller Journey</h3>
                        <p className="text-neutral-600">From valuation to successful exit</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {sellerJourney.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-4 relative">
                          {idx < sellerJourney.length - 1 && (
                            <div className="absolute left-6 top-14 w-0.5 h-12 bg-primary-200" />
                          )}
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                              <step.icon className="w-6 h-6 text-primary-600" />
                            </div>
                          </div>
                          <div className="flex-1 pt-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-neutral-900">
                                {step.step}. {step.phase}
                              </h4>
                              {step.action && (
                                <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                                  {step.action}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-neutral-600 mt-1">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full mt-8"
                      onPress={() => navigate('/valuation')}
                      endContent={<ArrowRight className="w-5 h-5" />}
                    >
                      Start Your Journey
                    </Button>
                  </CardBody>
                </Card>

                {/* Buyer Journey */}
                <Card className="rounded-3xl border-2 border-calm-200 shadow-xl overflow-hidden">
                  <CardBody className="p-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 bg-calm-100 rounded-2xl flex items-center justify-center">
                        <Search className="w-8 h-8 text-calm-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-neutral-900">Buyer Journey</h3>
                        <p className="text-neutral-600">From search to successful acquisition</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {buyerJourney.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-4 relative">
                          {idx < buyerJourney.length - 1 && (
                            <div className="absolute left-6 top-14 w-0.5 h-12 bg-calm-200" />
                          )}
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-calm-100 rounded-xl flex items-center justify-center">
                              <step.icon className="w-6 h-6 text-calm-600" />
                            </div>
                          </div>
                          <div className="flex-1 pt-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-neutral-900">
                                {step.step}. {step.phase}
                              </h4>
                              {step.action && (
                                <span className="text-xs font-semibold text-calm-600 bg-calm-50 px-3 py-1 rounded-full">
                                  {step.action}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-neutral-600 mt-1">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full mt-8 bg-calm-600 hover:bg-calm-700"
                      onPress={() => navigate('/search')}
                      endContent={<ArrowRight className="w-5 h-5" />}
                    >
                      Explore Opportunities
                    </Button>
                  </CardBody>
                </Card>
              </div>
            </div>
          </Container>
        </div>

        {/* Social Proof Stats */}
        <div className="py-20 bg-gradient-to-br from-neutral-50 to-white border-y border-neutral-200">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { value: '€840M+', label: 'Transacted', icon: Euro },
                  { value: '2,400+', label: 'Successful Exits', icon: HandshakeIcon },
                  { value: '12,000+', label: 'Business Owners', icon: Users },
                  { value: '95%', label: 'Seller Satisfaction', icon: Sparkles },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="w-7 h-7 text-primary-600" />
                    </div>
                    <div className="text-4xl font-bold text-neutral-900 mb-2">{stat.value}</div>
                    <div className="text-sm text-neutral-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>

        {/* Final CTA - Routing Reinforcement */}
        <div className="py-20 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                Ready to get started?
              </h2>
              <p className="text-xl text-neutral-600 mb-12">
                Choose your path and we'll guide you from here
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="primary"
                  size="xl"
                  onPress={() => navigate('/valuation')}
                  endContent={<ArrowRight className="w-5 h-5" />}
                  className="px-12"
                >
                  See What Your Business is Worth
                </Button>
                <Button
                  variant="secondary"
                  size="xl"
                  onPress={() => navigate('/search')}
                  endContent={<ArrowRight className="w-5 h-5" />}
                  className="px-12"
                >
                  Explore Opportunities
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default HomeVariationB;
