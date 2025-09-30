/**
 * 🎯 Homepage - Variation A: "Dual Audience Split"
 *
 * STRATEGY:
 * - Clear split for buyers vs sellers from entry
 * - Two distinct value propositions
 * - Equal emphasis on both audiences
 * - Focus: "Choose your journey"
 *
 * INSPIRATION:
 * - Airbnb: Clean split hero sections
 * - Fiverr: Dual audience targeting
 * - Modern SaaS: Clear persona paths
 */

import { Button } from '@/shared/components/buttons';
import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { VideoBackground } from '@/shared/components/video';
import { seoData } from '@/shared/utils/seo/seoData';
import { Card, CardBody } from '@heroui/react';
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle,
  Euro,
  HandshakeIcon,
  Heart,
  Lock,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../providers/auth-provider';

const HomeVariationA = () => {
  const navigate = useNavigate();
  const { openModal } = useAuth();

  const sellerBenefits = [
    {
      icon: BarChart3,
      title: 'Know Your Worth',
      description: 'Get a professional valuation in 10 minutes. Free, accurate, confidential.',
    },
    {
      icon: TrendingUp,
      title: 'Increase Value',
      description: 'Monthly insights show you exactly how to optimize your business value.',
    },
    {
      icon: Users,
      title: 'Find the Right Buyer',
      description: "Connect with qualified, verified buyers who value what you've built.",
    },
    {
      icon: ShieldCheck,
      title: 'Sell with Confidence',
      description: 'Expert support through every step. No pressure, just guidance.',
    },
  ];

  const buyerBenefits = [
    {
      icon: Search,
      title: 'Curated Opportunities',
      description: 'Access pre-vetted businesses with verified financials and documentation.',
    },
    {
      icon: Lock,
      title: 'Confidential Process',
      description: 'NDA-protected information sharing. Your interests stay private.',
    },
    {
      icon: HandshakeIcon,
      title: 'Transaction Support',
      description: 'Due diligence tools, offer management, and closing support included.',
    },
    {
      icon: Sparkles,
      title: 'Smart Matching',
      description: 'AI-powered recommendations based on your investment criteria.',
    },
  ];

  return (
    <>
      <SEOHead {...seoData.home} />

      <div className="min-h-screen bg-white">
        {/* Dual Hero Section with Video Background */}
        <VideoBackground
          videoSrc="/videos/dual-audience.mp4"
          fallbackGradient="from-neutral-900 via-primary-900 to-calm-900"
          posterImage="/images/dual-hero-poster.jpg"
          overlay="dark"
          className="py-20"
        >
          <Container>
            <div className="max-w-7xl mx-auto">
              {/* Pre-headline */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
                  <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-white">
                    Europe's M&A Platform for SMEs
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  Your journey starts here
                </h1>
                <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
                  Whether you're selling your business or looking to buy, we guide you every step of
                  the way
                </p>
              </div>

              {/* Dual Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {/* Seller Card */}
                <Card className="rounded-3xl border-2 border-primary-200 bg-white shadow-2xl hover:shadow-primary-500/20 transition-all duration-300 hover:scale-105">
                  <CardBody className="p-10">
                    <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6">
                      <Building2 className="w-8 h-8 text-primary-600" />
                    </div>

                    <h2 className="text-3xl font-bold text-neutral-900 mb-3">
                      Selling Your Business
                    </h2>
                    <p className="text-lg text-neutral-600 mb-8">
                      Get smarter about your business. Free valuation, monthly insights, and expert
                      guidance when you're ready to sell.
                    </p>

                    <div className="space-y-3 mb-8">
                      {[
                        'Free business valuation',
                        'Monthly value insights',
                        'No-pressure exploration',
                        'Expert support included',
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0" />
                          <span className="text-neutral-700">{item}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full"
                      onPress={() => navigate('/for-sellers')}
                      endContent={<ArrowRight className="w-5 h-5" />}
                    >
                      Get Free Valuation
                    </Button>

                    <p className="text-xs text-neutral-500 text-center mt-4">
                      12,000+ business owners trust Upswitch
                    </p>
                  </CardBody>
                </Card>

                {/* Buyer Card */}
                <Card className="rounded-3xl border-2 border-calm-200 bg-white shadow-2xl hover:shadow-calm-500/20 transition-all duration-300 hover:scale-105">
                  <CardBody className="p-10">
                    <div className="w-16 h-16 bg-calm-100 rounded-2xl flex items-center justify-center mb-6">
                      <Search className="w-8 h-8 text-calm-600" />
                    </div>

                    <h2 className="text-3xl font-bold text-neutral-900 mb-3">Buying a Business</h2>
                    <p className="text-lg text-neutral-600 mb-8">
                      Discover verified opportunities. Access detailed financials, connect with
                      sellers, and complete deals confidently.
                    </p>

                    <div className="space-y-3 mb-8">
                      {[
                        'Verified business listings',
                        'Detailed financial data',
                        'NDA-protected access',
                        'Transaction tools included',
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0" />
                          <span className="text-neutral-700">{item}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full bg-calm-600 hover:bg-calm-700"
                      onPress={() => navigate('/search')}
                      endContent={<ArrowRight className="w-5 h-5" />}
                    >
                      Explore Businesses
                    </Button>

                    <p className="text-xs text-neutral-500 text-center mt-4">
                      2,400+ successful transactions
                    </p>
                  </CardBody>
                </Card>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap justify-center items-center gap-8 mt-12 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-white" />
                  <span>Bank-grade security</span>
                </div>
                <div className="flex items-center gap-2">
                  <Euro className="w-5 h-5 text-white" />
                  <span>€840M+ transacted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-white" />
                  <span>12,000+ users</span>
                </div>
              </div>
            </div>
          </Container>
        </VideoBackground>

        {/* For Sellers Section */}
        <div className="py-24 bg-gradient-to-br from-primary-50 via-white to-calm-50">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-neutral-900 mb-4">For Business Owners</h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                  Join thousands of business owners who use Upswitch to understand and optimize their
                  business value
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {sellerBenefits.map((benefit, index) => (
                  <Card
                    key={index}
                    className="rounded-2xl border border-neutral-200 hover:border-primary-300 hover:shadow-xl transition-all duration-300 bg-white"
                  >
                    <CardBody className="p-8">
                      <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mb-4">
                        <benefit.icon className="w-7 h-7 text-primary-600" />
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-3">{benefit.title}</h3>
                      <p className="text-neutral-600 leading-relaxed">{benefit.description}</p>
                    </CardBody>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button
                  variant="primary"
                  size="lg"
                  onPress={() => navigate('/for-sellers')}
                  endContent={<ArrowRight className="w-5 h-5" />}
                >
                  Learn More for Sellers
                </Button>
              </div>
            </div>
          </Container>
        </div>

        {/* For Buyers Section */}
        <div className="py-24 bg-gradient-to-br from-calm-50 via-white to-primary-50">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-neutral-900 mb-4">For Buyers & Investors</h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                  Access verified opportunities and complete transactions with confidence
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {buyerBenefits.map((benefit, index) => (
                  <Card
                    key={index}
                    className="rounded-2xl border border-neutral-200 hover:border-calm-300 hover:shadow-xl transition-all duration-300 bg-white"
                  >
                    <CardBody className="p-8">
                      <div className="w-14 h-14 bg-calm-100 rounded-2xl flex items-center justify-center mb-4">
                        <benefit.icon className="w-7 h-7 text-calm-600" />
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-3">{benefit.title}</h3>
                      <p className="text-neutral-600 leading-relaxed">{benefit.description}</p>
                    </CardBody>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-calm-600 hover:bg-calm-700"
                  onPress={() => navigate('/search')}
                  endContent={<ArrowRight className="w-5 h-5" />}
                >
                  Browse Opportunities
                </Button>
              </div>
            </div>
          </Container>
        </div>

        {/* Stats Section */}
        <div className="py-20 bg-white border-y border-neutral-200">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { value: '€840M+', label: 'Total Transactions', icon: Euro },
                  { value: '2,400+', label: 'Successful Exits', icon: HandshakeIcon },
                  { value: '12,000+', label: 'Active Users', icon: Users },
                  { value: '94%', label: 'Success Rate', icon: Sparkles },
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

        {/* Final CTA */}
        <div className="py-24 bg-gradient-to-br from-neutral-900 via-primary-900 to-calm-900 text-white">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to start your journey?</h2>
              <p className="text-xl text-white/80 mb-12">
                Join thousands who trust Upswitch for their most important business decisions
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Button
                  variant="primary"
                  size="xl"
                  onPress={() => navigate('/for-sellers')}
                  className="h-16 text-lg"
                >
                  <Building2 className="w-6 h-6 mr-2" />
                  I'm Selling
                </Button>
                <Button
                  variant="secondary"
                  size="xl"
                  onPress={() => navigate('/search')}
                  className="h-16 text-lg bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                >
                  <Search className="w-6 h-6 mr-2" />
                  I'm Buying
                </Button>
              </div>

              <p className="text-sm text-white/60 mt-8 flex items-center justify-center gap-2">
                <Heart className="w-4 h-4 text-success-400" />
                Trusted by 12,000+ business owners across Europe
              </p>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default HomeVariationA;
