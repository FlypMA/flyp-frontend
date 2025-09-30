/**
 * 🎯 Homepage - Variation C: "Trust & Storytelling"
 *
 * STRATEGY:
 * - Emotional narrative approach
 * - Caregiver brand storytelling
 * - Trust-building through empathy
 * - Focus: "We're here for your journey"
 *
 * INSPIRATION:
 * - Typeform: Conversational, warm
 * - Caregiver archetype: Empathy, support
 * - Epidemic Sound: Bold storytelling
 */

import { Button } from '@/shared/components/buttons';
import { SearchComponent } from '@/shared/components/filters';
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
  MessageCircle,
  Quote,
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
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (searchQuery.trim()) {
      searchParams.set('q', searchQuery.trim());
    }
    navigate(`/search?${searchParams.toString()}`);
  };

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
        {/* Hero Section - Emotional Storytelling */}
        <VideoBackground
          videoSrc="/videos/story-hero.mp4"
          fallbackGradient="from-neutral-800 via-primary-900 to-calm-900"
          posterImage="/images/story-poster.jpg"
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
                  Whether you're exploring your options or ready to sell, buy or invest, we're here
                  to guide you every step of the way.
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

                {/* Divider */}
                <div className="flex items-center gap-4 max-w-2xl mx-auto mb-8">
                  <div className="flex-1 h-px bg-white/20"></div>
                  <span className="text-white/70 text-sm font-medium">
                    or browse businesses for sale
                  </span>
                  <div className="flex-1 h-px bg-white/20"></div>
                </div>

                {/* Search Component */}
                <div className="max-w-3xl mx-auto">
                  <SearchComponent
                    value={searchQuery}
                    onChange={setSearchQuery}
                    onSearch={handleSearch}
                    placeholder="e.g. Restaurant in Brussels, Tech company"
                    size="large"
                    buttonText="Search"
                  />

                  {/* Popular Searches */}
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    <span className="text-sm text-white/70">Popular:</span>
                    {['Restaurants', 'Tech Companies', 'Manufacturing', 'Retail', 'Healthcare'].map(
                      term => (
                        <button
                          key={term}
                          onClick={() => setSearchQuery(term.toLowerCase())}
                          className="text-sm text-success-300 hover:text-success-200 underline underline-offset-2"
                        >
                          {term}
                        </button>
                      )
                    )}
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
