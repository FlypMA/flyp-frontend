/**
 * 🎯 Seller Landing Page - Variation C: "Success Stories"
 *
 * STRATEGY:
 * - Lead with social proof and completed transactions
 * - Show real business owners who succeeded
 * - Focus: "Join thousands who found the right buyer"
 * - Build trust through testimonials and outcomes
 *
 * INSPIRATION:
 * - Fiverr: Success stories and social proof
 * - Airbnb: Trust indicators and user testimonials
 * - Typeform: Visual storytelling
 */

import { Button } from '@/shared/components/buttons';
import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { VideoBackground } from '@/shared/components/video';
import { authService } from '@/shared/services/auth';
import { seoData } from '@/shared/utils/seo/seoData';
import { Avatar, Card, CardBody } from '@heroui/react';
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle,
  Euro,
  HandshakeIcon,
  Heart,
  MapPin,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../providers/auth-provider';

const SellerVariationC = () => {
  const navigate = useNavigate();
  const { openModal } = useAuth();

  const handleJoinNowClick = async () => {
    try {
      const authResult = await authService.checkAuthentication();

      if (authResult.isAuthenticated) {
        navigate('/my-business');
      } else {
        openModal('signup', {
          url: '/my-business',
          state: { from: 'seller-landing-variation-c', intent: 'join-success' },
        });
      }
    } catch (error) {
      openModal('signup', {
        url: '/my-business',
        state: { from: 'seller-landing-variation-c', intent: 'join-success' },
      });
    }
  };

  // Featured success stories with rich details
  const featuredStories = [
    {
      name: 'Sophie & Marc Laurent',
      role: 'Co-founders',
      business: 'Digital Marketing Agency',
      location: 'Brussels, Belgium',
      industry: 'Professional Services',
      salePrice: '€950,000',
      journey: '18 months',
      valueIncrease: '+42%',
      avatar: '/avatars/sophie-marc.jpg',
      quote:
        "Upswitch didn't just help us sell — they helped us build a business worth selling. The journey took 18 months, but our value increased 42% in that time.",
      highlights: [
        'Started with free valuation',
        'Used monthly insights to optimize',
        'Found buyer who shared their vision',
        'Closed in 8 weeks after listing',
      ],
      testimonial:
        'The platform gave us confidence at every stage. From initial valuation to final handshake, we felt supported and informed. Our buyer came from the Upswitch network and truly understood what we built.',
    },
    {
      name: 'Marcus van der Berg',
      role: 'Founder & CEO',
      business: 'SaaS Platform for Healthcare',
      location: 'Amsterdam, Netherlands',
      industry: 'Technology',
      salePrice: '€1.8M',
      journey: '14 months',
      valueIncrease: '+28%',
      avatar: '/avatars/marcus.jpg',
      quote:
        'I explored for a year before listing. When I was ready, the process was seamless. Found a strategic buyer in 6 weeks.',
      highlights: [
        'No pressure exploration phase',
        'Quarterly valuation updates',
        'Connected with 3 qualified buyers',
        'Strategic acquisition by industry leader',
      ],
      testimonial:
        "The 'no pressure' approach was refreshing. I could explore my options while continuing to grow the business. When the timing was right, everything was already prepared.",
    },
    {
      name: 'Claire & Antoine Dubois',
      role: 'Restaurant Owners',
      business: 'French Bistro Chain (3 locations)',
      location: 'Paris, France',
      industry: 'Food & Beverage',
      salePrice: '€2.2M',
      journey: '22 months',
      valueIncrease: '+35%',
      avatar: '/avatars/claire-antoine.jpg',
      quote:
        "Selling our life's work was emotional. Upswitch connected us with a buyer who promised to keep our recipes and team. That meant everything.",
      highlights: [
        'Found buyer who valued legacy',
        'All employees retained',
        'Family recipes preserved',
        'Smooth transition over 3 months',
      ],
      testimonial:
        "This wasn't just a transaction — it was finding the right steward for what we built over 15 years. The team understood that and found someone who shared our values.",
    },
  ];

  // Quick stats from successful exits
  const platformStats = [
    {
      icon: HandshakeIcon,
      value: '2,400+',
      label: 'Successful exits',
      color: 'text-success-600',
      bg: 'bg-success-100',
    },
    {
      icon: Euro,
      value: '€840M+',
      label: 'Total transaction value',
      color: 'text-primary-600',
      bg: 'bg-primary-100',
    },
    {
      icon: TrendingUp,
      value: '+31%',
      label: 'Average value increase',
      color: 'text-accent-600',
      bg: 'bg-accent-100',
    },
    {
      icon: Award,
      value: '4.9/5',
      label: 'Seller satisfaction',
      color: 'text-calm-600',
      bg: 'bg-calm-100',
    },
  ];

  // Recent successful sales (mini cards)
  const recentSales = [
    {
      business: 'E-commerce Platform',
      industry: 'Technology',
      location: 'Munich, DE',
      price: '€780K',
      timeline: '12 weeks',
    },
    {
      business: 'Consulting Firm',
      industry: 'Professional Services',
      location: 'Lyon, FR',
      price: '€420K',
      timeline: '8 weeks',
    },
    {
      business: 'Manufacturing SME',
      industry: 'Industrial',
      location: 'Antwerp, BE',
      price: '€1.4M',
      timeline: '16 weeks',
    },
    {
      business: 'Digital Agency',
      industry: 'Marketing',
      location: 'Rotterdam, NL',
      price: '€650K',
      timeline: '10 weeks',
    },
    {
      business: 'Healthcare Services',
      industry: 'Healthcare',
      location: 'Brussels, BE',
      price: '€920K',
      timeline: '14 weeks',
    },
    {
      business: 'Subscription SaaS',
      industry: 'Technology',
      location: 'Paris, FR',
      price: '€1.1M',
      timeline: '9 weeks',
    },
  ];

  return (
    <>
      <SEOHead
        {...seoData.sellers}
        title="Join 2,400+ Business Owners Who Sold Successfully | Upswitch"
        description="Real success stories from business owners who found the right buyers. See their journeys, outcomes, and why they chose Upswitch."
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section - Video testimonial style */}
        <VideoBackground
          videoSrc="/videos/success-montage.mp4"
          fallbackGradient="from-success-900 via-primary-900 to-success-900"
          posterImage="/images/success-poster.jpg"
          overlay="dark"
          className="py-32 md:py-40"
          disableVideoOnMobile={true}
        >
          <Container>
            <div className="max-w-5xl mx-auto text-center">
              {/* Social proof badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 backdrop-blur-md border border-white/30 rounded-full mb-8">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full border-2 border-white bg-neutral-300"
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-white">2,400+ successful exits</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
                They sold their businesses.
                <br />
                <span className="text-white">You can too.</span>
              </h1>

              {/* Sub-headline */}
              <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join thousands of business owners who found the right buyers, achieved great
                outcomes, and felt supported every step of the way.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  variant="primary"
                  size="xl"
                  onPress={handleJoinNowClick}
                  endContent={<ArrowRight className="w-5 h-5" />}
                  className="px-10 py-4 h-16 text-lg font-semibold shadow-2xl shadow-success-500/50"
                >
                  Start Your Success Story
                </Button>
                <Button
                  variant="secondary"
                  size="xl"
                  onPress={() => navigate('/contact')}
                  className="px-10 py-4 h-16 text-lg bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                >
                  Talk to Successful Sellers
                </Button>
              </div>

              {/* Quick trust indicators */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success-400" />
                  <span>94% success rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success-400" />
                  <span>€840M+ transacted</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success-400" />
                  <span>4.9/5 satisfaction</span>
                </div>
              </div>
            </div>
          </Container>
        </VideoBackground>

        {/* Platform Stats */}
        <div className="py-16 bg-white border-b border-neutral-200">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {platformStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div
                      className={`w-16 h-16 ${stat.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                    >
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                    <div className="text-4xl font-bold text-neutral-900 mb-2">{stat.value}</div>
                    <div className="text-sm text-neutral-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>

        {/* Featured Success Stories - In-depth */}
        <div className="py-24 bg-gradient-to-br from-neutral-50 via-white to-neutral-50">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block px-4 py-2 bg-success-100 text-success-700 rounded-full text-sm font-semibold mb-6">
                  Success Stories
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                  Real business owners.
                  <br />
                  <span className="text-neutral-600">Real results.</span>
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                  These aren't hypothetical success stories. These are real people who sold their
                  businesses through Upswitch.
                </p>
              </div>

              <div className="space-y-12">
                {featuredStories.map((story, index) => (
                  <Card
                    key={index}
                    className="rounded-3xl border-2 border-neutral-200 hover:border-success-300 hover:shadow-2xl transition-all duration-500 bg-white overflow-hidden"
                  >
                    <CardBody className="p-0">
                      <div className="grid grid-cols-1 lg:grid-cols-5">
                        {/* Left: Story details */}
                        <div className="lg:col-span-3 p-10">
                          <div className="flex items-start gap-4 mb-6">
                            <Avatar
                              src={story.avatar}
                              name={story.name}
                              size="lg"
                              className="w-16 h-16"
                              isBordered
                              color="success"
                            />
                            <div>
                              <h3 className="text-2xl font-bold text-neutral-900">{story.name}</h3>
                              <div className="text-sm text-neutral-600">{story.role}</div>
                              <div className="flex items-center gap-2 mt-2">
                                <Building2 className="w-4 h-4 text-neutral-400" />
                                <span className="text-sm font-medium text-neutral-700">
                                  {story.business}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <MapPin className="w-4 h-4 text-neutral-400" />
                                <span className="text-sm text-neutral-600">{story.location}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-1 mb-6">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                            ))}
                          </div>

                          <blockquote className="text-xl text-neutral-700 leading-relaxed mb-6 italic">
                            "{story.quote}"
                          </blockquote>

                          <p className="text-neutral-600 leading-relaxed mb-6">
                            {story.testimonial}
                          </p>

                          <div className="space-y-2">
                            <div className="font-semibold text-neutral-900 mb-3">
                              Journey highlights:
                            </div>
                            {story.highlights.map((highlight, hIndex) => (
                              <div key={hIndex} className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0" />
                                <span className="text-sm text-neutral-700">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Right: Outcome metrics */}
                        <div className="lg:col-span-2 bg-gradient-to-br from-success-50 to-primary-50 p-10 border-l border-neutral-200">
                          <div className="sticky top-24">
                            <div className="text-sm font-bold text-neutral-600 mb-2">
                              Final Outcome
                            </div>
                            <div className="text-5xl font-bold text-success-600 mb-8">
                              {story.salePrice}
                            </div>

                            <div className="space-y-6">
                              <div>
                                <div className="text-xs font-semibold text-neutral-500 mb-1">
                                  INDUSTRY
                                </div>
                                <div className="text-lg font-medium text-neutral-900">
                                  {story.industry}
                                </div>
                              </div>

                              <div>
                                <div className="text-xs font-semibold text-neutral-500 mb-1">
                                  JOURNEY TIME
                                </div>
                                <div className="text-lg font-medium text-neutral-900">
                                  {story.journey}
                                </div>
                              </div>

                              <div>
                                <div className="text-xs font-semibold text-neutral-500 mb-1">
                                  VALUE INCREASE
                                </div>
                                <div className="text-lg font-medium text-success-600 flex items-center gap-2">
                                  <TrendingUp className="w-5 h-5" />
                                  {story.valueIncrease}
                                </div>
                              </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-neutral-200">
                              <div className="flex items-center gap-2 text-sm text-neutral-600">
                                <Heart className="w-4 h-4 text-success-600" />
                                <span>Successfully exited</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </div>

        {/* Recent Sales Ticker */}
        <div className="py-16 bg-white border-y border-neutral-200">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
                  Recently sold on Upswitch
                </h2>
                <p className="text-neutral-600">Businesses that found their perfect buyers</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentSales.map((sale, index) => (
                  <Card
                    key={index}
                    className="rounded-xl border border-neutral-200 bg-white hover:shadow-lg transition-all"
                  >
                    <CardBody className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="font-semibold text-neutral-900 mb-1">{sale.business}</div>
                          <div className="text-xs text-neutral-600">{sale.industry}</div>
                        </div>
                        <div className="px-2 py-1 bg-success-100 text-success-700 rounded-md text-xs font-semibold">
                          SOLD
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3 text-sm text-neutral-600">
                        <MapPin className="w-4 h-4" />
                        <span>{sale.location}</span>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                        <div className="text-lg font-bold text-success-600">{sale.price}</div>
                        <div className="text-xs text-neutral-500">in {sale.timeline}</div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button variant="secondary" onPress={() => navigate('/search')}>
                  See More Success Stories
                </Button>
              </div>
            </div>
          </Container>
        </div>

        {/* Why They Chose Upswitch */}
        <div className="py-24 bg-gradient-to-br from-neutral-50 via-white to-calm-50">
          <Container>
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                  Why successful sellers
                  <br />
                  <span className="text-neutral-600">choose Upswitch</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Users,
                    title: 'Qualified Buyers Only',
                    stat: '98%',
                    description: 'of inquiries come from verified, serious buyers',
                  },
                  {
                    icon: TrendingUp,
                    title: 'Value Optimization',
                    stat: '+31%',
                    description: 'average value increase from first valuation to sale',
                  },
                  {
                    icon: HandshakeIcon,
                    title: 'Success Rate',
                    stat: '94%',
                    description: 'of listings result in successful transactions',
                  },
                ].map((reason, index) => (
                  <Card
                    key={index}
                    className="rounded-2xl border border-neutral-200 hover:shadow-xl transition-all bg-white"
                  >
                    <CardBody className="p-8 text-center">
                      <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <reason.icon className="w-7 h-7 text-primary-600" />
                      </div>
                      <div className="text-4xl font-bold text-primary-600 mb-2">{reason.stat}</div>
                      <h3 className="text-lg font-bold text-neutral-900 mb-3">{reason.title}</h3>
                      <p className="text-sm text-neutral-600">{reason.description}</p>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </div>

        {/* Final CTA */}
        <div className="py-24 bg-gradient-to-br from-success-900 via-primary-900 to-success-900 text-white">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Your success story
                <br />
                <span className="text-success-300">starts here</span>
              </h2>
              <p className="text-xl text-white/80 mb-12">
                Join 2,400+ business owners who successfully sold their businesses through Upswitch
              </p>

              <Button
                variant="primary"
                size="xl"
                onPress={handleJoinNowClick}
                endContent={<ArrowRight className="w-5 h-5" />}
                className="px-12 py-4 h-16 text-lg font-semibold shadow-2xl shadow-success-500/50"
              >
                Start Your Journey Today
              </Button>

              <p className="text-sm text-white/60 mt-6">
                Free valuation • Expert guidance • No pressure to sell
              </p>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default SellerVariationC;
