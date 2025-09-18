import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { seoData } from '@/shared/utils/seo/seoData';
import { Button, Card, CardBody } from '@heroui/react';
import { Building2, CheckCircle, Clock, Euro, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/shared/services/auth';
import { useAuth } from '../../../providers/auth-provider';

const SellersLandingPage = () => {
  const navigate = useNavigate();
  const { openModal } = useAuth();

  // Handle Sell Your Business button click - Smart routing based on authentication
  const handleListBusinessClick = async () => {
    try {
      const authResult = await authService.checkAuthentication();

      if (authResult.isAuthenticated && authResult.user) {
        // User is logged in - check their role
        const userRole = authResult.user.role;

        if (userRole === 'seller' || userRole === 'both' || userRole === 'admin') {
          // User has seller permissions - redirect to seller dashboard
          navigate('/my-business');
        } else {
          // User is buyer - redirect to listing creation with role upgrade prompt
          navigate('/seller/listings/new');
        }
      } else {
        // User is not logged in, show signup modal with seller intent
        openModal('signup', {
          url: '/my-business',
          state: { from: 'seller-landing', intent: 'seller' },
        });
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      // On error, default to showing signup modal
      openModal('signup', {
        url: '/my-business',
        state: { from: 'seller-landing', intent: 'seller' },
      });
    }
  };

  const howItWorks = [
    {
      step: '1',
      title: "Let's talk first",
      description:
        'We start with a free, confidential conversation about your goals and timeline. No pressure, just understanding.',
    },
    {
      step: '2',
      title: 'We help you prepare',
      description:
        "Together, we'll create a compelling listing that showcases your business's true value and attracts the right buyers.",
    },
    {
      step: '3',
      title: 'We guide you through',
      description:
        "From first inquiries to final handshake, we're with you every step to ensure a smooth, successful transition.",
    },
  ];

  return (
    <>
      <SEOHead {...seoData.sellers} />
      <div className="min-h-screen bg-white">
        {/* Hero Section - Caregiver Approach */}
        <div className="bg-gradient-to-br from-neutral-100 via-white to-calm-50 py-24">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-8 leading-tight">
                Ready to sell your business?
                <span className="block text-calm-600 mt-2">We're here to guide you</span>
              </h1>

              <p className="text-xl md:text-2xl text-neutral-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Selling your life's work doesn't have to be overwhelming. We'll walk you through
                every step, connect you with the right buyers, and ensure your business finds the
                perfect new owner.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-12 py-4 h-16 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onPress={handleListBusinessClick}
                  startContent={<Building2 className="w-6 h-6" />}
                >
                  Get started — we'll help you
                </Button>
                <Button
                  variant="bordered"
                  size="lg"
                  className="border-2 border-calm-600 text-calm-600 hover:bg-calm-600 hover:text-white font-semibold px-12 py-4 h-16 text-lg rounded-xl transition-all duration-300"
                  onPress={() => navigate('/contact')}
                >
                  Talk to our team first
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-neutral-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success-600" />
                  <span>Free confidential consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success-600" />
                  <span>No pressure, just guidance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success-600" />
                  <span>Verified buyers only</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Value Proposition - Caregiver Benefits */}
        <div className="py-20 bg-white">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                  Why Business Owners Choose Us
                </h2>
                <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                  We understand this is more than a transaction — it's your legacy. That's why we
                  provide the care and expertise you deserve.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-center">
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="p-4 bg-calm-100 rounded-2xl">
                      <Users className="w-8 h-8 text-calm-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">
                    We find the right buyers
                  </h3>
                  <p className="text-neutral-600">
                    Not just any buyer — we connect you with people who will respect and continue
                    what you've built with care.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="p-4 bg-success-100 rounded-2xl">
                      <Euro className="w-8 h-8 text-success-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">
                    Fair, transparent pricing
                  </h3>
                  <p className="text-neutral-600">
                    No hidden fees or surprises. You keep what your business is worth, and we're
                    upfront about all costs.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="p-4 bg-accent-100 rounded-2xl">
                      <Clock className="w-8 h-8 text-accent-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">Support every step</h3>
                  <p className="text-neutral-600">
                    From your first question to closing day, we're with you. No pressure, just
                    guidance when you need it.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* How it Works Section - Caregiver Process */}
        <div className="py-20 bg-neutral-100">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                  How We Help You Sell
                </h2>
                <p className="text-lg text-neutral-600">
                  A caring, step-by-step approach designed to make selling your business as smooth
                  and stress-free as possible.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {howItWorks.map((item, index) => (
                  <Card
                    key={index}
                    className="rounded-2xl border border-neutral-200 hover:shadow-lg transition-all duration-300 bg-white"
                  >
                    <CardBody className="p-8 text-center">
                      <div className="w-16 h-16 bg-calm-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-2xl font-bold text-calm-600">{item.step}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900 mb-4">{item.title}</h3>
                      <p className="text-neutral-600 leading-relaxed">{item.description}</p>
                    </CardBody>
                  </Card>
                ))}
              </div>

              {/* Reassuring CTA */}
              <div className="text-center mt-16">
                <Button
                  size="lg"
                  className="bg-calm-600 hover:bg-calm-700 text-white font-semibold px-8 py-3 h-14 text-base rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                  onPress={() => navigate('/contact')}
                >
                  Start with a free conversation
                </Button>
                <p className="text-sm text-neutral-500 mt-3">
                  No commitment required • Completely confidential • Expert guidance
                </p>
              </div>
            </div>
          </Container>
        </div>

        {/* Pricing Section */}
        <div className="py-20 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Simple pricing</h2>
              <p className="text-lg text-slate-600 mb-12">
                One flat fee, no commission, no hidden costs
              </p>

              <Card className="max-w-md mx-auto rounded-2xl border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg">
                <CardBody className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Business Listing</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-blue-600">€299</span>
                    <span className="text-slate-600 ml-2">one-time</span>
                  </div>

                  <ul className="space-y-3 mb-8 text-left">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-700">3 months visibility</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-700">Professional listing page</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-700">Direct buyer inquiries</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-700">Email support</span>
                    </li>
                  </ul>

                  <Button
                    color="primary"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl"
                    size="lg"
                    onPress={handleListBusinessClick}
                  >
                    Start Listing
                  </Button>
                </CardBody>
              </Card>
            </div>
          </Container>
        </div>

        {/* Sell in 5 Steps Section */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  Sell a business in 5 steps
                </h2>
                <p className="text-lg text-slate-600">
                  Your complete guide to a successful business sale
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-blue-600">1</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Orient</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Explore options and understand the market before you sell.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-blue-600">2</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Find</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Find the ideal buyer who shares your vision.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-blue-600">3</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Connect</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Meet interested parties and build relationships.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-blue-600">4</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Validate</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Validate offers and negotiate with qualified buyers.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-blue-600">5</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Close</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Complete the transaction and transfer ownership successfully.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* FAQ Section */}
        <div className="py-20 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-slate-600">
                  Get answers to common questions about selling your business
                </p>
              </div>

              <div className="space-y-8">
                <Card className="rounded-2xl border border-slate-200">
                  <CardBody className="p-8">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">
                      How long does it take to sell a business?
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      The timeline varies depending on your business type, price, and market
                      conditions. Most businesses sell within 3-9 months of listing.
                    </p>
                  </CardBody>
                </Card>

                <Card className="rounded-2xl border border-slate-200">
                  <CardBody className="p-8">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">
                      What information do I need to provide?
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      You'll need basic business information, financial details, and a description
                      of your operations. We'll guide you through each step of creating your
                      listing.
                    </p>
                  </CardBody>
                </Card>

                <Card className="rounded-2xl border border-slate-200">
                  <CardBody className="p-8">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">
                      Is my information kept confidential?
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      Yes, we protect your business information. Sensitive details are only shared
                      with serious, qualified buyers who sign confidentiality agreements.
                    </p>
                  </CardBody>
                </Card>

                <Card className="rounded-2xl border border-slate-200">
                  <CardBody className="p-8">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">
                      What if I need help during the sale process?
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      Our support team is here to help you throughout the process. You can also
                      connect with professional advisors and brokers through our platform.
                    </p>
                  </CardBody>
                </Card>

                <Card className="rounded-2xl border border-slate-200">
                  <CardBody className="p-8">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">
                      Can I edit my listing after it's published?
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      Yes, you can update your listing at any time to add new information, photos,
                      or adjust your asking price based on market feedback.
                    </p>
                  </CardBody>
                </Card>
              </div>

              {/* CTA at bottom of FAQ */}
              <div className="text-center mt-16">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Ready to get started?</h3>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-12 py-4 h-16 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onPress={handleListBusinessClick}
                  startContent={<Building2 className="w-6 h-6" />}
                >
                  List Your Business Now
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default SellersLandingPage;
