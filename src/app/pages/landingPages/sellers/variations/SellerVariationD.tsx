/**
 * 🎯 Seller Landing Page - Variation D: "Trust & Storytelling"
 *
 * STRATEGY:
 * - Emotional narrative approach (adapted from HomeVariationC)
 * - Seller-focused journey and messaging
 * - Trust-building through empathy
 * - Focus: "We're here for your business exit journey"
 *
 * INSPIRATION:
 * - HomeVariationC: Trust & storytelling approach
 * - Typeform: Conversational, warm
 * - Caregiver archetype: Empathy, support
 */

import { Button } from '@/shared/components/buttons';
import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { VideoBackground } from '@/shared/components/video';
import { seoData } from '@/shared/utils/seo/seoData';
import { Avatar, Card, CardBody } from '@heroui/react';
import {
  ArrowRight,
  CheckCircle,
  Euro,
  HandshakeIcon,
  Heart,
  Quote,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SellerVariationD = () => {
  const navigate = useNavigate();

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
        "The valuation tool gave me clarity I never had. I spent 18 months optimizing based on Upswitch's insights before listing. The result? 40% higher sale price than my initial valuation.",
      author: 'Sophie Dubois',
      role: 'Former Owner, Restaurant Chain',
      location: 'Paris',
      image: '/images/testimonial-3.jpg',
      salePrice: '€3.8M',
    },
    {
      quote:
        'After 25 years building my business, selling was emotional. Upswitch understood that. They gave me time to prepare, helped me maximize value, and found a buyer who truly valued my legacy.',
      author: 'Marcus Weber',
      role: 'Former Owner, Manufacturing',
      location: 'Munich',
      image: '/images/testimonial-4.jpg',
      salePrice: '€5.2M',
    },
  ];

  const journeySteps = [
    {
      phase: 'Explore',
      icon: Sparkles,
      title: 'Understand Your Value',
      description:
        "No pressure, no commitment. Just insights. Get a free valuation and see what's possible for your business.",
      color: 'primary',
    },
    {
      phase: 'Optimize',
      icon: TrendingUp,
      title: 'Build Your Value',
      description:
        'Monthly reports show exactly how to increase your business value. Small changes, big impact over 12-36 months.',
      color: 'success',
    },
    {
      phase: 'Prepare',
      icon: Shield,
      title: 'Get Ready to Sell',
      description:
        'Build your data room, prepare documentation, and increase your readiness score at your own pace.',
      color: 'calm',
    },
    {
      phase: 'Complete',
      icon: HandshakeIcon,
      title: 'Find the Right Buyer',
      description:
        "When you're ready, we connect you with qualified buyers who value what you've built. Expert support through closing.",
      color: 'accent',
    },
  ];

  const trustSignals = [
    {
      icon: Euro,
      stat: '€840M+',
      label: 'Total value transacted',
    },
    {
      icon: Users,
      stat: '2,400+',
      label: 'Successful exits',
    },
    {
      icon: Shield,
      stat: '95%',
      label: 'Seller satisfaction',
    },
    {
      icon: CheckCircle,
      stat: '18 months',
      label: 'Average preparation time',
    },
  ];

  return (
    <>
      <SEOHead
        {...seoData.sellers}
        title="Sell Your Business with Confidence | Upswitch - Trust & Storytelling"
        description="Your business journey deserves care. Get a free valuation, optimize your value over time, and find the right buyer when you're ready. No pressure, just support."
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section - Emotional Storytelling */}
        <VideoBackground
          videoSrc="/videos/seller-story-hero.mp4"
          fallbackGradient="from-neutral-800 via-primary-900 to-calm-900"
          posterImage="/images/seller-story-poster.jpg"
          overlay="gradient"
          className="py-32 md:py-32"
        >
          <Container>
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                {/* Trust badge */}
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8">
                  <Heart className="w-5 h-5 text-success-400" />
                  <span className="text-white font-medium">Trusted by 12,000+ business owners</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                  Your business journey
                  <br />
                  <span className="bg-gradient-to-r from-success-300 to-primary-300 bg-clip-text text-transparent">
                    deserves care
                  </span>
                </h1>

                <p className="text-2xl md:text-3xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                  Whether you're exploring your options or ready to sell, we're here to guide you
                  every step of the way.
                </p>

                {/* Primary CTA */}
                <div className="flex justify-center mb-8">
                  <Button
                    variant="primary"
                    size="xl"
                    onPress={() => navigate('/valuation')}
                    endContent={<ArrowRight className="w-6 h-6" />}
                    className="px-12 h-16 text-lg shadow-2xl"
                  >
                    Get Free Valuation
                  </Button>
                </div>

                <p className="text-white/70 text-sm">
                  Free • 2 minutes • No obligations • 12,000+ business owners trust us
                </p>
              </div>
            </div>
          </Container>
        </VideoBackground>

        {/* Trust Signals */}
        <section className="py-20 bg-gradient-to-b from-neutral-50 to-white">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {trustSignals.map((signal, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-success-100 rounded-2xl flex items-center justify-center">
                        <signal.icon className="w-8 h-8 text-primary-600" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-neutral-900 mb-2">{signal.stat}</div>
                    <div className="text-sm text-neutral-600">{signal.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Journey Steps */}
        <section className="py-24 bg-white">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                  Your journey, at your pace
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                  We understand that selling your business is one of the biggest decisions you'll
                  make. That's why we give you time, insights, and support every step of the way.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {journeySteps.map((step, index) => (
                  <Card
                    key={index}
                    className="border-2 border-neutral-200 hover:border-primary-300 transition-all duration-300 hover:shadow-xl"
                  >
                    <CardBody className="p-8">
                      <div className="flex flex-col items-start h-full">
                        {/* Phase number */}
                        <div className="text-sm font-semibold text-primary-600 mb-3">
                          {step.phase}
                        </div>

                        {/* Icon */}
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-success-100 rounded-xl flex items-center justify-center mb-4">
                          <step.icon className="w-6 h-6 text-primary-600" />
                        </div>

                        {/* Content */}
                        <h3 className="text-xl font-bold text-neutral-900 mb-3">{step.title}</h3>
                        <p className="text-neutral-600 leading-relaxed flex-grow">
                          {step.description}
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Testimonials - Emotional Stories */}
        <section className="py-24 bg-gradient-to-b from-white to-neutral-50">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                  Stories from business owners like you
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                  Real people, real businesses, real success. See how Upswitch helped business
                  owners maximize their value and find the perfect buyer.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <Card
                    key={index}
                    className="border border-neutral-200 hover:shadow-xl transition-all duration-300"
                  >
                    <CardBody className="p-8">
                      <Quote className="w-10 h-10 text-primary-300 mb-6" />

                      <p className="text-lg text-neutral-700 mb-6 leading-relaxed italic">
                        "{testimonial.quote}"
                      </p>

                      <div className="flex items-center gap-4">
                        <Avatar
                          src={testimonial.image}
                          name={testimonial.author}
                          size="lg"
                          className="flex-shrink-0"
                        />
                        <div className="flex-grow">
                          <div className="font-semibold text-neutral-900">{testimonial.author}</div>
                          <div className="text-sm text-neutral-600">{testimonial.role}</div>
                          <div className="text-sm text-neutral-500">{testimonial.location}</div>
                        </div>
                      </div>

                      {testimonial.salePrice && (
                        <div className="mt-6 pt-6 border-t border-neutral-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-neutral-600">Sale Price</span>
                            <span className="text-xl font-bold text-success-600">
                              {testimonial.salePrice}
                            </span>
                          </div>
                        </div>
                      )}
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 bg-white">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                  Why business owners choose Upswitch
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                  We're not just a platform. We're your partner in one of life's biggest
                  transitions.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2 border-primary-200 bg-gradient-to-br from-white to-primary-50">
                  <CardBody className="p-10">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                          No pressure, just preparation
                        </h3>
                        <p className="text-neutral-700 leading-relaxed">
                          Most business owners spend 12-36 months exploring before selling. We give
                          you tools to optimize your value during that time, not pressure to list
                          immediately.
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-neutral-700">
                        <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0" />
                        <span>Free valuation and monthly value tracking</span>
                      </li>
                      <li className="flex items-center gap-3 text-neutral-700">
                        <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0" />
                        <span>Insights on how to increase your business value</span>
                      </li>
                      <li className="flex items-center gap-3 text-neutral-700">
                        <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0" />
                        <span>List when YOU'RE ready, not when we need a deal</span>
                      </li>
                    </ul>
                  </CardBody>
                </Card>

                <Card className="border-2 border-success-200 bg-gradient-to-br from-white to-success-50">
                  <CardBody className="p-10">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-success-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                          The right buyer, not just any buyer
                        </h3>
                        <p className="text-neutral-700 leading-relaxed">
                          Your business is more than numbers. We match you with buyers who
                          understand and value your legacy, culture, and vision.
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-neutral-700">
                        <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0" />
                        <span>AI-powered matching with qualified buyers</span>
                      </li>
                      <li className="flex items-center gap-3 text-neutral-700">
                        <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0" />
                        <span>Verified buyer credentials and financing</span>
                      </li>
                      <li className="flex items-center gap-3 text-neutral-700">
                        <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0" />
                        <span>Expert support through negotiations and closing</span>
                      </li>
                    </ul>
                  </CardBody>
                </Card>
              </div>
            </div>
          </Container>
        </section>

        {/* Final CTA - Emotional Close */}
        <section className="py-32 bg-gradient-to-br from-primary-900 via-calm-900 to-neutral-900 text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-success-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-400 rounded-full blur-3xl"></div>
          </div>

          <Container>
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8">
                <Heart className="w-5 h-5 text-success-400" />
                <span className="text-white font-medium">Join 12,000+ business owners</span>
              </div>

              <h2 className="text-5xl md:text-6xl font-bold mb-8">Start your journey today</h2>

              <p className="text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
                Get a free valuation and discover what your business is really worth. No pressure,
                no obligations. Just insights.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  variant="primary"
                  size="xl"
                  onPress={() => navigate('/valuation')}
                  endContent={<ArrowRight className="w-6 h-6" />}
                  className="px-12 bg-white text-primary-900 hover:bg-neutral-100"
                >
                  Get Your Free Valuation
                </Button>
              </div>

              <p className="text-white/70 mt-8">
                Free • 2 minutes • No credit card required • Trusted by 12,000+ business owners
              </p>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
};

export default SellerVariationD;

