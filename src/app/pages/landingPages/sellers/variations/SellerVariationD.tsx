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
import { Card, CardBody } from '@heroui/react';
import {
  ArrowRight,
  CheckCircle,
  HandshakeIcon,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SellerVariationD = () => {
  const navigate = useNavigate();

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
          className="py-16 md:py-20 lg:py-24 xl:py-32"
        >
          <Container>
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
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

                <p className="text-white/70 text-sm">Free • 2 minutes • No obligations</p>
              </div>
            </div>
          </Container>
        </VideoBackground>

        {/* Journey Steps */}
        <section className="py-12 md:py-16 lg:py-24 bg-white">
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

        {/* Why Choose Us */}
        <section className="py-12 md:py-16 lg:py-24 bg-white">
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
                  <CardBody className="p-6 sm:p-8 md:p-10">
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
                  <CardBody className="p-6 sm:p-8 md:p-10">
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
        <section className="py-16 md:py-20 lg:py-24 xl:py-32 bg-gradient-to-br from-primary-900 via-calm-900 to-neutral-900 text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-success-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-400 rounded-full blur-3xl"></div>
          </div>

          <Container>
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <h2 className="text-5xl md:text-6xl font-bold mb-8">Start your journey today</h2>

              <p className="text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
                Get a free valuation and discover what your business is really worth. No pressure,
                no obligations. Just insights.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => navigate('/valuation')}
                  className="inline-flex items-center justify-center transition-all duration-200 ease-in-out focus:outline-none focus:ring-3 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed border-0 outline-none cursor-pointer relative overflow-hidden bg-white text-primary-900 font-semibold hover:bg-neutral-100 shadow-xl active:scale-[0.98] px-12 h-16 text-lg rounded-lg"
                >
                  <span className="flex items-center justify-center">
                    Get Your Free Valuation
                    <span className="ml-2">
                      <ArrowRight className="w-6 h-6" />
                    </span>
                  </span>
                </button>
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
