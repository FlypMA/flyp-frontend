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
import { seoData } from '@/shared/utils/seo/seoData';
import { Avatar, Card, CardBody, Chip } from '@heroui/react';
import {
  ArrowRight,
  CheckCircle,
  Euro,
  HandshakeIcon,
  Heart,
  MessageCircle,
  Quote,
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

  const testimonials = [
    {
      quote:
        "I wasn't sure about selling, but Upswitch helped me understand my business value without any pressure. The monthly insights showed me exactly how to increase my value, and when I was ready, the right buyer was there.",
      author: 'Elena Martinez',
      role: 'Former Owner, Tech Startup',
      location: 'Amsterdam',
      image: '/images/testimonial-1.jpg',
      salePrice: '€2.4M',
    },
    {
      quote:
        "Finding the right business to buy felt overwhelming. Upswitch's team guided me through every step, from initial search to final closing. I found a business that perfectly matched my goals.",
      author: 'Thomas Schmidt',
      role: 'Business Buyer',
      location: 'Berlin',
      image: '/images/testimonial-2.jpg',
      business: 'Digital Agency',
    },
    {
      quote:
        "The valuation tool gave me clarity I never had. I spent 18 months optimizing based on Upswitch's insights before listing. The result? 40% higher sale price than my initial valuation.",
      author: 'Sophie Dubois',
      role: 'Former Owner, Restaurant Chain',
      location: 'Paris',
      image: '/images/testimonial-3.jpg',
      salePrice: '€3.8M',
    },
  ];

  const journeySteps = [
    {
      phase: 'Explore',
      icon: Sparkles,
      title: 'Discover Your Options',
      description:
        "No pressure, no commitment. Just insights. Get a free valuation and see what's possible.",
      color: 'primary',
    },
    {
      phase: 'Optimize',
      icon: TrendingUp,
      title: 'Build Your Value',
      description:
        'Monthly reports show exactly how to increase your business value. Small changes, big impact.',
      color: 'success',
    },
    {
      phase: 'Connect',
      icon: Users,
      title: 'Find the Right Match',
      description:
        "When you're ready, we connect you with qualified buyers who value what you've built.",
      color: 'calm',
    },
    {
      phase: 'Complete',
      icon: HandshakeIcon,
      title: 'Close with Confidence',
      description:
        "Expert support through due diligence, negotiations, and closing. We're with you every step.",
      color: 'accent',
    },
  ];

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
                {/* Trust Badge - Minimal */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8">
                  <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse" />
                  <span className="text-white text-sm font-medium">
                    Europe's Leading M&A Platform
                  </span>
                </div>

                {/* Main Headline - Caregiver Value Prop */}
                <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  Understand your business value —
                  <br />
                  <span className="bg-gradient-to-r from-accent-300 to-primary-300 bg-clip-text text-transparent">
                    then choose your next chapter
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                  From valuation to closing, we handle everything.
                  <br className="hidden md:block" />
                  No pressure, no stress — just expert support when you need it.
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
                              Understand my business value
                            </h3>
                            <p
                              className={`text-sm md:text-base mb-4 ${
                                userIntent === 'seller' ? 'text-neutral-600' : 'text-white/80'
                              }`}
                            >
                              Free valuation • No pressure, no obligations • Build value on your
                              timeline
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
                              Free forever
                            </Chip>
                            <Chip
                              size="sm"
                              variant="flat"
                              className={`${
                                userIntent === 'seller'
                                  ? 'bg-primary-100 text-primary-700'
                                  : 'bg-white/20 text-white'
                              }`}
                            >
                              12-36 month journey
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
                          <div className="w-14 h-14 bg-calm-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <Search className="w-7 h-7 text-calm-600" />
                          </div>
                          <div className="text-left flex-1">
                            <h3
                              className={`text-xl md:text-2xl font-bold mb-2 ${
                                userIntent === 'buyer' ? 'text-neutral-900' : 'text-white'
                              }`}
                            >
                              Browse businesses to buy
                            </h3>
                            <p
                              className={`text-sm md:text-base mb-4 ${
                                userIntent === 'buyer' ? 'text-neutral-600' : 'text-white/80'
                              }`}
                            >
                              2,400+ verified businesses • All industries • Europe-wide
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
                                  ? 'bg-calm-100 text-calm-700'
                                  : 'bg-white/20 text-white'
                              }`}
                            >
                              Data rooms
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

                {/* Trust Indicators - Minimal */}
                <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-white/80 pt-8">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success-400" />
                    <span>€840M+ Transacted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-success-400" />
                    <span>100% Confidential</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-success-400" />
                    <span>12,000+ Users</span>
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
                Our Promise
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
                    icon: Heart,
                    title: 'No Pressure',
                    description:
                      'Explore at your own pace. No sales calls, no pressure. Just insights and support when you need it.',
                  },
                  {
                    icon: Shield,
                    title: 'Your Privacy',
                    description:
                      'Complete confidentiality. Your business information is protected at every step.',
                  },
                  {
                    icon: MessageCircle,
                    title: 'Expert Guidance',
                    description:
                      'Human support when you need it. Real people who understand your journey.',
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

        {/* Journey Section */}
        <div className="py-24 bg-white">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                  Your Journey with Upswitch
                </h2>
                <p className="text-xl text-neutral-600">
                  From exploration to completion, we're with you every step
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {journeySteps.map((step, index) => (
                  <div key={index} className="relative">
                    <Card className="rounded-2xl border-2 border-neutral-200 hover:border-primary-300 hover:shadow-xl transition-all bg-white h-full">
                      <CardBody className="p-8">
                        <div className="mb-4">
                          <div className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-bold rounded-full mb-4">
                            {step.phase}
                          </div>
                          <div
                            className={`w-14 h-14 bg-${step.color}-100 rounded-2xl flex items-center justify-center`}
                          >
                            <step.icon className={`w-7 h-7 text-${step.color}-600`} />
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-3">{step.title}</h3>
                        <p className="text-neutral-600 leading-relaxed">{step.description}</p>
                      </CardBody>
                    </Card>
                    {/* Connection line */}
                    {index < journeySteps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-neutral-200 z-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>

        {/* Testimonials Section */}
        <div className="py-24 bg-gradient-to-br from-calm-50 via-white to-primary-50">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                  Stories from Our Community
                </h2>
                <p className="text-xl text-neutral-600">
                  Real journeys, real results, real support
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <Card
                    key={index}
                    className="rounded-3xl border-2 border-neutral-200 hover:shadow-2xl transition-all bg-white"
                  >
                    <CardBody className="p-8">
                      <Quote className="w-10 h-10 text-primary-200 mb-4" />
                      <p className="text-neutral-700 leading-relaxed mb-6 italic">
                        "{testimonial.quote}"
                      </p>

                      <div className="flex items-center gap-4 pt-6 border-t border-neutral-200">
                        <Avatar
                          src={testimonial.image}
                          name={testimonial.author}
                          className="w-12 h-12"
                        />
                        <div>
                          <div className="font-bold text-neutral-900">{testimonial.author}</div>
                          <div className="text-sm text-neutral-600">{testimonial.role}</div>
                          <div className="text-xs text-neutral-500">{testimonial.location}</div>
                        </div>
                      </div>

                      {testimonial.salePrice && (
                        <div className="mt-4 p-3 bg-success-50 rounded-xl border border-success-200">
                          <div className="text-xs text-success-700 mb-1">Sale Price</div>
                          <div className="text-xl font-bold text-success-600">
                            {testimonial.salePrice}
                          </div>
                        </div>
                      )}
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </div>

        {/* Stats Section */}
        <div className="py-20 bg-white border-y border-neutral-200">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4">Impact That Matters</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { icon: Euro, value: '€840M+', label: 'Total Transactions', color: 'primary' },
                  {
                    icon: HandshakeIcon,
                    value: '2,400+',
                    label: 'Successful Exits',
                    color: 'success',
                  },
                  { icon: Users, value: '12,000+', label: 'Happy Users', color: 'calm' },
                  { icon: TrendingUp, value: '+28%', label: 'Avg Value Increase', color: 'accent' },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div
                      className={`w-14 h-14 bg-${stat.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-4`}
                    >
                      <stat.icon className={`w-7 h-7 text-${stat.color}-600`} />
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
