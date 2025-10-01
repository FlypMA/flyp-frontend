/**
 * 🎯 Homepage - Variation C: "Smart Router" (Growth Marketing Optimized)
 *
 * AARRR STRATEGY:
 * - Primary Goal: Route sellers to /valuation (70% of traffic)
 * - Secondary Goal: Route buyers to /search (30% of traffic)
 * - Approach: Clear binary choice → Fast routing → High activation
 *
 * FUNNEL MECHANICS:
 * - Hero: Binary choice (Seller vs Buyer) - reduces decision paralysis
 * - Primary CTA: "Get Free Valuation" (seller-focused, intelligence-first)
 * - Secondary CTA: "Browse Businesses" (buyer-focused, search-first)
 * - NO mixed messaging, NO overwhelming content
 *
 * INSPIRATION:
 * - Typeform: Clean, minimal, choice-driven
 * - Fiverr: Clear dual audience (adapted for seller priority)
 * - AARRR best practices: Reduce friction, increase clarity
 */

import { Button } from '@/shared/components/buttons';
import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { VideoBackground } from '@/shared/components/video';
import { UrlGenerator } from '@/shared/services';
import { seoData } from '@/shared/utils/seo/seoData';
import { Card, CardBody } from '@heroui/react';
import {
  ArrowRight,
  Calculator,
  Check,
  CheckCircle,
  Database,
  HandshakeIcon,
  Heart,
  Search,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  X,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeVariationC = () => {
  const navigate = useNavigate();

  // Role-based content personalization (defaults to business owner - our primary audience)
  const [selectedRole, setSelectedRole] = useState<'business-owner' | 'buyer-investor'>(
    'business-owner'
  );

  return (
    <>
      <SEOHead {...seoData.home} />

      <div className="min-h-screen bg-white">
        {/* Hero Section - Smart Router (Growth Marketing Optimized) */}
        <VideoBackground
          videoSrc="/videos/smart-router-hero.mp4"
          fallbackGradient="from-neutral-900 via-primary-900 to-calm-900"
          posterImage="/images/smart-router-poster.jpg"
          overlay="gradient"
          className="py-20 md:py-32"
        >
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center">
                {/* Role Selector Toggle - Above Headline */}
                <div className="flex justify-center mb-8">
                  <div className="inline-flex bg-white/10 backdrop-blur-md border border-white/30 rounded-full p-1.5 sm:p-2">
                    <button
                      onClick={() => setSelectedRole('business-owner')}
                      className={`px-4 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-xs sm:text-base transition-all duration-200 ${
                        selectedRole === 'business-owner'
                          ? 'bg-white text-primary-900 shadow-lg'
                          : 'text-white hover:text-white/80'
                      }`}
                    >
                      <span className="hidden sm:inline">I'm a Business Owner</span>
                      <span className="sm:hidden">Owner</span>
                    </button>
                    <button
                      onClick={() => setSelectedRole('buyer-investor')}
                      className={`px-4 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-xs sm:text-base transition-all duration-200 ${
                        selectedRole === 'buyer-investor'
                          ? 'bg-white text-primary-900 shadow-lg'
                          : 'text-white hover:text-white/80'
                      }`}
                    >
                      <span className="hidden sm:inline">I'm a Buyer/Investor</span>
                      <span className="sm:hidden">Buyer</span>
                    </button>
                  </div>
                </div>

                {/* Dynamic Headline based on role */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  {selectedRole === 'business-owner' ? (
                    <span className="whitespace-normal md:whitespace-nowrap">
                      Know what your business is worth
                    </span>
                  ) : (
                    <>
                      Discover verified businesses
                      <br />
                      <span>ready for acquisition</span>
                    </>
                  )}
                </h1>

                {/* Dynamic Subheadline based on role */}
                <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                  {selectedRole === 'business-owner' ? (
                    <>
                      From valuation to closing, we take care of everything, so you don't have to.
                      No upfront fees. No pressure. Just 2.5% when you succeed. Because we're here
                      to help you exit on your terms.
                    </>
                  ) : (
                    <>
                      Access transparent valuations, complete financials, and expert support
                      throughout your acquisition journey.
                      <br className="hidden md:block" />
                      <br className="hidden md:block" />
                      No buyer fees. Ever.
                    </>
                  )}
                </p>

                {/* CTA Buttons based on role */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  {selectedRole === 'business-owner' ? (
                    <>
                      <Button
                        variant="tertiary"
                        size="xl"
                        onPress={() => navigate('/valuation')}
                        endContent={<ArrowRight className="w-6 h-6 text-white" />}
                        className="px-10 h-16 text-lg !bg-primary-500 !text-white !border-0 hover:!bg-white/90 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto font-semibold"
                      >
                        Get Free Valuation
                      </Button>
                      <Button
                        variant="link"
                        size="xl"
                        onPress={() => navigate('/search')}
                        className="px-10 h-16 text-lg !bg-white/10 backdrop-blur-sm !border !border-white/30 !text-white hover:!bg-white/20 transition-all w-full sm:w-auto"
                      >
                        Or browse businesses
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="tertiary"
                        size="xl"
                        onPress={() => navigate('/search')}
                        endContent={<ArrowRight className="w-6 h-6 text-white" />}
                        className="px-10 h-16 text-lg !bg-primary-500 !text-white !border-0 hover:!bg-white/90 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto font-semibold"
                      >
                        Browse Businesses
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </VideoBackground>

        {/* Story Section - Business Owners Only */}
        {selectedRole === 'business-owner' && (
          <div className="py-24 bg-gradient-to-br from-primary-50 via-white to-calm-50">
            <Container>
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-6">
                  <Heart className="w-4 h-4" />
                  Our promise to business owners
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
                  We understand what your business means to you
                </h2>

                <p className="text-xl text-neutral-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                  You've poured years of your life into building something meaningful. Whether
                  you're exploring options or ready to move forward, you deserve a partner who
                  understands the weight of this decision.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      icon: Sparkles,
                      title: 'State-of-the-Art Valuation',
                      description:
                        'Transparent, accurate valuations using cutting-edge technology. Know your true business value with confidence.',
                    },
                    {
                      icon: Heart,
                      title: 'Perfect Match Guarantee',
                      description:
                        "When you're ready to sell, our AI-powered matching ensures the best fit with qualified buyers. The right match, every time.",
                    },
                    {
                      icon: Shield,
                      title: 'No Risk, No Hidden Fees',
                      description:
                        'Free to list, free to explore. We only charge a small fee when both you and the buyer are happy with the deal.',
                    },
                  ].map((value, index) => (
                    <Card
                      key={index}
                      className="rounded-2xl border border-neutral-200 bg-white hover:shadow-xl transition-all"
                    >
                      <CardBody className="p-8 text-center">
                        <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <value.icon className="w-7 h-7 text-primary-600" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-3">{value.title}</h3>
                        <p className="text-neutral-600 leading-relaxed">{value.description}</p>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>
            </Container>
          </div>
        )}

        {/* Promise to Buyers/Investors Section - Buyers Only */}
        {selectedRole === 'buyer-investor' && (
          <div className="py-24 bg-gradient-to-br from-primary-50 via-white to-calm-50">
            <Container>
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-6">
                  <Users className="w-4 h-4" />
                  Our promise to buyers/investors
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
                  Your next opportunity starts here
                </h2>

                <p className="text-xl text-neutral-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                  Finding the right business to acquire is a significant decision. We're here to
                  ensure you have access to verified opportunities, transparent information, and
                  expert support throughout your acquisition journey.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      icon: CheckCircle,
                      title: 'Verified Listings',
                      description:
                        'Every business is thoroughly verified. Access complete financials, operational data, and growth metrics.',
                    },
                    {
                      icon: TrendingUp,
                      title: 'Transparent Valuations',
                      description:
                        'Accurate, honest valuations with no overvaluation. We ensure you see the true value and potential of every business.',
                    },
                    {
                      icon: HandshakeIcon,
                      title: 'Perfect Match',
                      description:
                        'Our AI-powered matching connects you with the right business. Expert support through negotiations, due diligence, and closing.',
                    },
                  ].map((value, index) => (
                    <Card
                      key={index}
                      className="rounded-2xl border border-neutral-200 bg-white hover:shadow-xl transition-all"
                    >
                      <CardBody className="p-8 text-center">
                        <div className="w-14 h-14 bg-calm-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <value.icon className="w-7 h-7 text-calm-600" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-3">{value.title}</h3>
                        <p className="text-neutral-600 leading-relaxed">{value.description}</p>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>
            </Container>
          </div>
        )}

        {/* Why Our Valuations Are Different Section */}
        <div className="py-24 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-6">
                  <Shield className="w-4 h-4" />
                  Honest Valuations, Real Results
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                  Others overpromise. We keep it real.
                </h2>

                <p className="text-xl text-neutral-600 leading-relaxed">
                  Our free valuation is grounded in data, not guesswork — so you can plan your next
                  step with confidence.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Competitor Approach */}
                <Card className="rounded-2xl border-2 border-red-200 bg-red-50/50">
                  <CardBody className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <XCircle className="w-8 h-8 text-red-600" />
                      <h3 className="text-xl font-bold text-neutral-900">Traditional Platforms</h3>
                    </div>
                    <ul className="space-y-3">
                      {[
                        'Inflated valuations to attract listings',
                        'Generic online calculators',
                        'No methodology transparency',
                        '80% of listings never sell',
                        'Overpriced = wasted time',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-neutral-700">
                          <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardBody>
                </Card>

                {/* UpSwitch Approach */}
                <Card className="rounded-2xl border-2 border-success-300 bg-gradient-to-br from-success-50 to-primary-50">
                  <CardBody className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle className="w-8 h-8 text-success-600" />
                      <h3 className="text-xl font-bold text-neutral-900">
                        The UpSwitch Difference
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {[
                        'Realistic valuations that lead to sales',
                        'State-of-the-art AI valuation engine',
                        'Full methodology transparency',
                        'Market-validated accuracy',
                        'Honest = faster, better deals',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-neutral-700">
                          <Check className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
                          <span className="font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardBody>
                </Card>
              </div>

              {/* Methodology Preview */}
              <div className="mt-12 p-8 bg-gradient-to-r from-neutral-900 to-primary-900 rounded-2xl text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="w-6 h-6 text-success-400" />
                  <h3 className="text-xl font-bold">Our Valuation Methodology</h3>
                </div>
                <p className="text-white/90 mb-6">
                  We combine multiple proven valuation methods with real-time market data to give
                  you the most accurate estimate:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {
                      icon: TrendingUp,
                      title: 'Market Multiples',
                      desc: 'Real transaction data from similar businesses',
                    },
                    {
                      icon: Calculator,
                      title: 'DCF Analysis',
                      desc: 'Cash flow projections & growth potential',
                    },
                    {
                      icon: Target,
                      title: 'Industry Benchmarks',
                      desc: 'Sector-specific adjustments & factors',
                    },
                  ].map((method, i) => (
                    <div
                      key={i}
                      className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                    >
                      <method.icon className="w-6 h-6 text-success-400 mb-2" />
                      <div className="font-semibold mb-1">{method.title}</div>
                      <div className="text-sm text-white/70">{method.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* How It Works Teaser Section */}
        <div className="py-24 bg-gradient-to-br from-neutral-50 to-white">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
                A seamless journey for both sides
              </h2>
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                Whether you're a business owner exploring your options or a buyer searching for the
                perfect opportunity, we guide you through every step with transparency and expert
                support.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {/* Seller Journey */}
                <Card className="rounded-2xl border-2 border-primary-200 bg-gradient-to-br from-primary-50 to-white hover:shadow-xl transition-all">
                  <CardBody className="p-8">
                    <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mb-4">
                      <TrendingUp className="w-7 h-7 text-primary-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                      For Business Owners
                    </h3>
                    <p className="text-neutral-600 leading-relaxed mb-4">
                      From free valuation to finding the perfect buyer and closing the deal
                    </p>
                    <Button
                      variant="link"
                      size="sm"
                      onPress={() => navigate(UrlGenerator.howItWorksSeller())}
                      endContent={<ArrowRight className="w-4 h-4" />}
                      className="text-primary-600"
                    >
                      See seller journey
                    </Button>
                  </CardBody>
                </Card>

                {/* Buyer Journey */}
                <Card className="rounded-2xl border-2 border-calm-200 bg-gradient-to-br from-primary-50 to-white hover:shadow-xl transition-all">
                  <CardBody className="p-8">
                    <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mb-4">
                      <Search className="w-7 h-7 text-primary-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                      For Buyers/Investors
                    </h3>
                    <p className="text-neutral-600 leading-relaxed mb-4">
                      From discovering opportunities to due diligence and successful acquisition
                    </p>
                    <Button
                      variant="link"
                      size="sm"
                      onPress={() => navigate(UrlGenerator.howItWorksBuyer())}
                      endContent={<ArrowRight className="w-4 h-4" />}
                      className="text-calm-600"
                    >
                      See buyer journey
                    </Button>
                  </CardBody>
                </Card>
              </div>

              <Button
                variant="primary"
                size="xl"
                onPress={() => navigate('/how-it-works')}
                endContent={<ArrowRight className="w-6 h-6" />}
                className="px-10 h-16 text-lg"
              >
                Explore How It Works
              </Button>
            </div>
          </Container>
        </div>

        {/* Final CTA - Business Owners Only */}
        {selectedRole === 'business-owner' && (
          <div className="py-32 bg-gradient-to-br from-neutral-900 via-primary-900 to-calm-900 text-white">
            <Container>
              <div className="max-w-4xl mx-auto text-center">
                <Heart className="w-16 h-16 text-success-400 mx-auto mb-8" />

                <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                  Ready to explore what's possible?
                </h2>
                <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
                  Start with a free valuation. No commitment, no pressure. Just insights to help you
                  make the right decision for your future.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Button
                    variant="primary"
                    size="xl"
                    onPress={() => navigate('/valuation')}
                    endContent={<ArrowRight className="w-6 h-6" />}
                    className="px-10 h-16 text-lg"
                  >
                    Get Your Free Valuation
                  </Button>
                  <Button
                    variant="secondary"
                    size="xl"
                    onPress={() => navigate('/search')}
                    className="px-10 h-16 text-lg bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                  >
                    Explore Opportunities
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-6 text-sm text-white/70">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-success-400" />
                    <span>Free forever</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-success-400" />
                    <span>100% confidential</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-success-400" />
                    <span>No pressure</span>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        )}
      </div>
    </>
  );
};

export default HomeVariationC;
