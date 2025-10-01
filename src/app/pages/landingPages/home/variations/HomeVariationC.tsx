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
import { Card, CardBody, Chip } from '@heroui/react';
import {
  ArrowRight,
  CheckCircle,
  HandshakeIcon,
  Heart,
  Search,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../providers/auth-provider';

const HomeVariationC = () => {
  const navigate = useNavigate();
  const { openModal } = useAuth();
  const [userIntent, setUserIntent] = useState<'seller' | 'buyer' | null>(null);

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
                {/* Main Headline - Caregiver Value Prop */}
                <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  Get to know your business value
                  <br />
                  <span className="bg-gradient-to-r from-accent-300 to-primary-300 bg-clip-text text-transparent">
                    then choose your next chapter
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                  From business valuation to closing, we handle everything.
                  <br className="hidden md:block" />
                  No hidden fees — we're here to guide you every step of the way.
                </p>

                {/* Binary Choice - Smart Router */}
                <div className="mb-8">
                  <p className="text-white/80 text-sm mb-4 font-medium">I want to:</p>
                  <div className="flex flex-col md:flex-row gap-4 justify-center max-w-4xl mx-auto">
                    {/* Seller Path (Primary - 70% of traffic) */}
                    <Card
                      isPressable
                      onPress={() => {
                        setUserIntent('seller');
                        navigate('/valuation');
                      }}
                      className={`flex-1 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                        userIntent === 'seller'
                          ? 'border-primary-400 bg-white shadow-2xl'
                          : 'border-white/30 bg-white/10 backdrop-blur-sm hover:border-white/50 hover:bg-white/15'
                      }`}
                    >
                      <CardBody className="p-6 md:p-8">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <TrendingUp className="w-7 h-7 text-primary-600" />
                          </div>
                          <div className="text-left flex-1">
                            <h3
                              className={`text-xl md:text-2xl font-bold mb-2 ${
                                userIntent === 'seller' ? 'text-neutral-900' : 'text-white'
                              }`}
                            >
                              Get a free valuation
                            </h3>
                            <p
                              className={`text-sm md:text-base mb-4 ${
                                userIntent === 'seller' ? 'text-neutral-600' : 'text-white/80'
                              }`}
                            >
                              Free valuation • No pressure, no obligations • Free forever
                            </p>
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-sm font-semibold ${
                                  userIntent === 'seller' ? 'text-primary-600' : 'text-white'
                                }`}
                              >
                                Get Your Free Valuation
                              </span>
                              <ArrowRight
                                className={`w-5 h-5 ${
                                  userIntent === 'seller' ? 'text-primary-600' : 'text-white'
                                }`}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Seller-specific trust signals */}
                        <div className="mt-4 pt-4 border-t border-white/20">
                          <div className="flex flex-wrap gap-2">
                            <Chip
                              size="sm"
                              variant="flat"
                              className={`${
                                userIntent === 'seller'
                                  ? 'bg-success-100 text-success-700'
                                  : 'bg-white/20 text-white'
                              }`}
                            >
                              Your business, your privacy
                            </Chip>
                            <Chip
                              size="sm"
                              variant="flat"
                              className={`${
                                userIntent === 'seller'
                                  ? 'bg-calm-100 text-calm-700'
                                  : 'bg-white/20 text-white'
                              }`}
                            >
                              Confidential
                            </Chip>
                          </div>
                        </div>
                      </CardBody>
                    </Card>

                    {/* Buyer Path (Secondary - 30% of traffic) */}
                    <Card
                      isPressable
                      onPress={() => {
                        setUserIntent('buyer');
                        navigate('/search');
                      }}
                      className={`flex-1 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                        userIntent === 'buyer'
                          ? 'border-calm-400 bg-white shadow-2xl'
                          : 'border-white/30 bg-white/10 backdrop-blur-sm hover:border-white/50 hover:bg-white/15'
                      }`}
                    >
                      <CardBody className="p-6 md:p-8">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <Search className="w-7 h-7 text-primary-600" />
                          </div>
                          <div className="text-left flex-1">
                            <h3
                              className={`text-xl md:text-2xl font-bold mb-2 ${
                                userIntent === 'buyer' ? 'text-neutral-900' : 'text-white'
                              }`}
                            >
                              Browse businesses
                            </h3>
                            <p
                              className={`text-sm md:text-base mb-4 ${
                                userIntent === 'buyer' ? 'text-neutral-600' : 'text-white/80'
                              }`}
                            >
                              Verified businesses • All industries • Europe-wide
                            </p>
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-sm font-semibold ${
                                  userIntent === 'buyer' ? 'text-calm-600' : 'text-white'
                                }`}
                              >
                                Start Browsing
                              </span>
                              <ArrowRight
                                className={`w-5 h-5 ${
                                  userIntent === 'buyer' ? 'text-calm-600' : 'text-white'
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                        {/* Buyer-specific trust signals */}
                        <div className="mt-4 pt-4 border-t border-white/20">
                          <div className="flex flex-wrap gap-2">
                            <Chip
                              size="sm"
                              variant="flat"
                              className={`${
                                userIntent === 'buyer'
                                  ? 'bg-success-100 text-success-700'
                                  : 'bg-white/20 text-white'
                              }`}
                            >
                              Verified listings
                            </Chip>
                            <Chip
                              size="sm"
                              variant="flat"
                              className={`${
                                userIntent === 'buyer'
                                  ? 'bg-primary-100 text-primary-700'
                                  : 'bg-white/20 text-white'
                              }`}
                            >
                              Expert support
                            </Chip>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </VideoBackground>

        {/* Story Section */}
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
                You've poured years of your life into building something meaningful. Whether you're
                exploring options or ready to move forward, you deserve a partner who understands
                the weight of this decision.
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

        {/* Promise to Buyers/Investors Section */}
        <div className="py-24 bg-white">
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

        {/* How It Works Teaser Section */}
        <div className="py-24 bg-white">
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
                <Card className="rounded-2xl border-2 border-calm-200 bg-gradient-to-br from-calm-50 to-white hover:shadow-xl transition-all">
                  <CardBody className="p-8">
                    <div className="w-14 h-14 bg-calm-100 rounded-2xl flex items-center justify-center mb-4">
                      <Search className="w-7 h-7 text-calm-600" />
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

        {/* Final CTA */}
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
                  onPress={() => navigate('/for-sellers')}
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
      </div>
    </>
  );
};

export default HomeVariationC;
