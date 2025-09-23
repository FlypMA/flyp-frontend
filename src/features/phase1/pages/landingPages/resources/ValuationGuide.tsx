import { useAuth } from '@/app/providers/auth-provider';
import { Button } from '@/shared/components/buttons';
import Container from '@/shared/components/layout/container/Container';
import ValuationModal from '@/shared/components/modals/ValuationModal';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { Card, CardBody, CardHeader, Chip } from '@heroui/react';
import {
  AlertTriangle,
  BarChart,
  Calculator,
  CheckCircle,
  DollarSign,
  Heart,
  MessageSquare,
  Shield,
  Target,
  TrendingUp,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ValuationGuide = () => {
  const navigate = useNavigate();
  const { openModal } = useAuth();
  const [isValuationModalOpen, setIsValuationModalOpen] = useState(false);

  const handleOpenValuationModal = () => {
    setIsValuationModalOpen(true);
  };

  const handleSignupPrompt = (valuationData: unknown) => {
    // Open signup modal with valuation intent
    openModal('signup', {
      url: '/my-business/valuations',
      state: {
        source: 'valuation-guide',
        intent: 'valuation',
        valuationData: valuationData,
      },
    });
  };

  return (
    <>
      <SEOHead
        title="What's Your Business Really Worth? | flyp Business Valuation Guide"
        description="Discover your business's true value and why selling is better than liquidating. A caring guide for business owners ready to understand their life's work."
        keywords="business valuation, business worth, sell vs liquidate, business value, SME valuation, business owner guide, exit strategy"
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section - Caregiver Approach for Business Owners */}
        <div className="bg-gradient-to-br from-neutral-100 via-white to-calm-50 py-20">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-calm-100 rounded-full">
                  <Heart className="w-12 h-12 text-calm-600" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6">
                What's Your Business
                <span className="block text-calm-600 text-3xl md:text-4xl mt-2">Really Worth?</span>
              </h1>
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                After years of building your business, you deserve to know its true value. We'll
                help you understand why your life's work is worth more than you might think — and
                why selling is almost always better than liquidating.
              </p>

              {/* Hero CTA */}
              <div className="mb-8">
                <Button
                  variant="primary"
                  size="lg"
                  className="px-8 py-4 text-lg"
                  onPress={handleOpenValuationModal}
                  startContent={<Calculator className="w-6 h-6" />}
                >
                  Get My Free Valuation Now
                </Button>
                <p className="text-sm text-neutral-500 mt-3">
                  Takes 3 minutes • No signup required • Instant results
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Chip className="text-lg px-6 py-2 rounded-full bg-calm-100 text-calm-800 border border-calm-200">
                  Free • For business owners
                </Chip>
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <CheckCircle className="w-4 h-4 text-success-600" />
                  <span>Written with care by M&A experts</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Why This Matters - Emotional Connection */}
        <Container>
          <div className="py-20">
            <div className="max-w-4xl mx-auto">
              {/* Emotional Hook - Liquidation vs Sale */}
              <Card className="border border-accent-200 bg-accent-50 mb-12 rounded-xl">
                <CardBody className="p-8">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-8 h-8 text-accent-600 mt-1 flex-shrink-0" />
                    <div>
                      <h2 className="text-2xl font-bold text-accent-900 mb-4">
                        Don't Let Your Life's Work Go for Pennies
                      </h2>
                      <p className="text-accent-800 text-lg mb-4">
                        We've seen too many business owners think their only option is to liquidate
                        — selling equipment, closing doors, and walking away with a fraction of what
                        their business is actually worth.
                      </p>
                      <p className="text-accent-800 text-lg">
                        <strong>Your business is worth more than its parts.</strong> Much more. And
                        we're here to show you exactly how much.
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Table of Contents - Reframed for Business Owners */}
              <Card className="border border-neutral-200 mb-12 rounded-xl">
                <CardHeader>
                  <h2 className="text-2xl font-bold text-neutral-900">What We'll Cover Together</h2>
                  <p className="text-neutral-600 mt-2">
                    A step-by-step guide to understanding your business value
                  </p>
                </CardHeader>
                <CardBody>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: '1. Why Your Business Has Hidden Value', icon: Heart },
                      { title: '2. The Real Cost of Liquidation', icon: AlertTriangle },
                      { title: '3. How We Value Your Business', icon: Calculator },
                      { title: '4. Revenue-Based Valuation', icon: TrendingUp },
                      { title: '5. Profit-Based Valuation (EBITDA)', icon: BarChart },
                      { title: '6. What Makes Your Business Special', icon: Target },
                      { title: '7. Getting the Right Valuation', icon: Shield },
                      { title: '8. Your Next Steps', icon: CheckCircle },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-calm-600" />
                        <span className="text-neutral-700">{item.title}</span>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              {/* Section 1: Hidden Value */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  1. Why Your Business Has Hidden Value
                </h2>
                <div className="prose prose-lg max-w-none text-neutral-700">
                  <p className="mb-6">
                    You've spent years building something special. Your business has customers who
                    trust you, systems that work, and a reputation in your community. That's not
                    just "stuff" — that's real, valuable assets that someone would pay good money
                    for.
                  </p>

                  <Card className="border border-calm-200 bg-calm-50 mb-6 rounded-xl">
                    <CardBody className="p-6">
                      <div className="flex items-start gap-3">
                        <Heart className="w-6 h-6 text-calm-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-calm-900 mb-2">
                            Your Business is More Than Equipment
                          </h4>
                          <p className="text-calm-800">
                            When you liquidate, you're only selling the physical stuff. When you
                            sell your business, you're selling the relationships, the systems, the
                            brand, and the future income. That's where the real value is.
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                    What Makes Your Business Valuable
                  </h3>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Your Customer Relationships:</strong> People know and trust your
                        business
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Your Systems & Processes:</strong> You've figured out how to make
                        money consistently
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Your Team & Knowledge:</strong> The expertise you've built over the
                        years
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Your Future Income:</strong> The money your business will make for
                        years to come
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 2: The Real Cost of Liquidation */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  2. The Real Cost of Liquidation
                </h2>
                <div className="prose prose-lg max-w-none text-neutral-700">
                  <p className="mb-6">
                    We understand why liquidation might seem like the easier option. It feels
                    simple: sell the equipment, close the doors, done. But let's talk about what
                    you're really giving up.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Card className="border border-error-200 bg-error-50 rounded-xl">
                      <CardHeader>
                        <h3 className="text-lg font-semibold text-error-900 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5" />
                          Liquidation Reality
                        </h3>
                      </CardHeader>
                      <CardBody>
                        <ul className="space-y-2 text-error-800">
                          <li>• Equipment sells for 10-30% of original value</li>
                          <li>• Inventory often sold at deep discounts</li>
                          <li>• Customer relationships lost forever</li>
                          <li>• Years of goodwill worth nothing</li>
                          <li>• Future income stream = €0</li>
                        </ul>
                      </CardBody>
                    </Card>

                    <Card className="border border-success-200 bg-success-50 rounded-xl">
                      <CardHeader>
                        <h3 className="text-lg font-semibold text-success-900 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          Selling Your Business
                        </h3>
                      </CardHeader>
                      <CardBody>
                        <ul className="space-y-2 text-success-800">
                          <li>• Get paid for future profits (2-6x annual profit)</li>
                          <li>• Customer relationships have value</li>
                          <li>• Brand and reputation worth money</li>
                          <li>• Systems and processes valued</li>
                          <li>• Your legacy continues</li>
                        </ul>
                      </CardBody>
                    </Card>
                  </div>

                  <Card className="border border-accent-200 bg-accent-50 mb-6 rounded-xl">
                    <CardBody className="p-6">
                      <div className="flex items-start gap-3">
                        <DollarSign className="w-6 h-6 text-accent-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-accent-900 mb-2">Real Example</h4>
                          <p className="text-accent-800 mb-3">
                            A printing business with €500K in annual profit: Liquidation might get
                            you €100K for equipment. Selling the business could get you €1.5-3M
                            (3-6x profit multiple).
                            <strong> That's a €1.4-2.9M difference.</strong>
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>

              {/* Section 3: How We Value Your Business */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  3. How We Value Your Business
                </h2>
                <div className="prose prose-lg max-w-none text-neutral-700">
                  <p className="mb-6">
                    Don't worry — you don't need to become a valuation expert. But it helps to
                    understand the basics of how we determine what your business is worth. We use
                    proven methods that buyers and sellers trust.
                  </p>

                  <Card className="border border-calm-200 bg-calm-50 mb-6 rounded-xl">
                    <CardBody className="p-6">
                      <div className="flex items-start gap-3">
                        <Shield className="w-6 h-6 text-calm-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-calm-900 mb-2">
                            Why Proper Valuation Matters
                          </h4>
                          <p className="text-calm-800">
                            A proper valuation protects you from selling too low and helps buyers
                            feel confident they're paying a fair price. It's the foundation of any
                            successful business sale.
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                    The Two Main Ways We Value Businesses
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Card className="border border-neutral-200 rounded-xl">
                      <CardHeader>
                        <h4 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-primary-600" />
                          Revenue-Based
                        </h4>
                      </CardHeader>
                      <CardBody>
                        <p className="text-neutral-700 mb-3">
                          We look at how much money your business brings in each year and multiply
                          it by what similar businesses sell for.
                        </p>
                        <div className="bg-neutral-100 p-3 rounded-lg text-center">
                          <code className="text-sm font-mono">
                            Your Annual Revenue × Industry Multiple
                          </code>
                        </div>
                      </CardBody>
                    </Card>

                    <Card className="border border-neutral-200 rounded-xl">
                      <CardHeader>
                        <h4 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                          <BarChart className="w-5 h-5 text-success-600" />
                          Profit-Based
                        </h4>
                      </CardHeader>
                      <CardBody>
                        <p className="text-neutral-700 mb-3">
                          We look at how much profit your business makes and multiply it by what
                          buyers typically pay for that level of profit.
                        </p>
                        <div className="bg-neutral-100 p-3 rounded-lg text-center">
                          <code className="text-sm font-mono">
                            Your Annual Profit × Profit Multiple
                          </code>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Section 4: Revenue-Based Valuation */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  4. Revenue-Based Valuation: What Your Sales Are Worth
                </h2>
                <div className="prose prose-lg max-w-none text-neutral-700">
                  <p className="mb-6">
                    This method is simple: we take your annual revenue (all the money coming in) and
                    multiply it by what businesses like yours typically sell for.
                  </p>

                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                    What Different Types of Businesses Are Worth
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <Card className="border border-neutral-200 rounded-xl">
                      <CardBody className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Service Businesses</span>
                          <span className="text-primary-600 font-bold">1-3x Revenue</span>
                        </div>
                        <p className="text-sm text-neutral-600">
                          Consulting, agencies, professional services
                        </p>
                      </CardBody>
                    </Card>
                    <Card className="border border-neutral-200 rounded-xl">
                      <CardBody className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Retail Businesses</span>
                          <span className="text-primary-600 font-bold">0.5-1.5x Revenue</span>
                        </div>
                        <p className="text-sm text-neutral-600">Shops, restaurants, e-commerce</p>
                      </CardBody>
                    </Card>
                    <Card className="border border-neutral-200 rounded-xl">
                      <CardBody className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Manufacturing</span>
                          <span className="text-primary-600 font-bold">0.5-2x Revenue</span>
                        </div>
                        <p className="text-sm text-neutral-600">
                          Production, distribution, logistics
                        </p>
                      </CardBody>
                    </Card>
                    <Card className="border border-neutral-200 rounded-xl">
                      <CardBody className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Technology</span>
                          <span className="text-primary-600 font-bold">2-6x Revenue</span>
                        </div>
                        <p className="text-sm text-neutral-600">Software, SaaS, tech services</p>
                      </CardBody>
                    </Card>
                  </div>

                  <Card className="border border-primary-200 bg-primary-50 mb-6 rounded-xl">
                    <CardBody className="p-6">
                      <h4 className="font-semibold text-primary-900 mb-3">Quick Example</h4>
                      <p className="text-primary-800 mb-3">
                        Let's say you own a marketing agency that brings in €800,000 per year.
                        Service businesses typically sell for 1-3x revenue.
                      </p>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-primary-900">
                          <strong>Conservative estimate:</strong> €800,000 × 1.5 ={' '}
                          <span className="text-success-600 font-bold">€1.2M</span>
                          <br />
                          <strong>Strong business:</strong> €800,000 × 2.5 ={' '}
                          <span className="text-success-600 font-bold">€2M</span>
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>

              {/* Section 5: Profit-Based Valuation (EBITDA) */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  5. Profit-Based Valuation: What Your Profits Are Worth
                </h2>
                <div className="prose prose-lg max-w-none text-neutral-700">
                  <p className="mb-6">
                    This is often the most accurate way to value your business. We look at your
                    actual profit (the money you keep after all expenses) and multiply it by what
                    buyers typically pay for that level of profitability.
                  </p>

                  <Card className="border border-calm-200 bg-calm-50 mb-6 rounded-xl">
                    <CardBody className="p-6">
                      <div className="flex items-start gap-3">
                        <BarChart className="w-6 h-6 text-calm-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-calm-900 mb-2">
                            Why Profit Matters Most
                          </h4>
                          <p className="text-calm-800">
                            Revenue is nice, but profit is what buyers really care about. It shows
                            them how much money they'll actually make from your business. Higher
                            profits = higher value.
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                    What Your Profit Level Is Worth
                  </h3>
                  <div className="space-y-4 mb-6">
                    <Card className="border border-neutral-200 rounded-xl">
                      <CardBody className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Small Profit (€50K-200K/year)</span>
                          <span className="text-primary-600 font-bold">2-4x Profit</span>
                        </div>
                        <div className="text-sm text-neutral-600">
                          Usually owner-operated, buyer takes over your role
                        </div>
                      </CardBody>
                    </Card>
                    <Card className="border border-neutral-200 rounded-xl">
                      <CardBody className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Good Profit (€200K-500K/year)</span>
                          <span className="text-primary-600 font-bold">3-5x Profit</span>
                        </div>
                        <div className="text-sm text-neutral-600">
                          Solid business with some systems in place
                        </div>
                      </CardBody>
                    </Card>
                    <Card className="border border-neutral-200 rounded-xl">
                      <CardBody className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Strong Profit (€500K-1M/year)</span>
                          <span className="text-primary-600 font-bold">4-6x Profit</span>
                        </div>
                        <div className="text-sm text-neutral-600">
                          Well-run business with management team
                        </div>
                      </CardBody>
                    </Card>
                    <Card className="border border-neutral-200 rounded-xl">
                      <CardBody className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Excellent Profit (€1M+/year)</span>
                          <span className="text-primary-600 font-bold">5-8x Profit</span>
                        </div>
                        <div className="text-sm text-neutral-600">
                          Premium business with strong market position
                        </div>
                      </CardBody>
                    </Card>
                  </div>

                  <Card className="border border-success-200 bg-success-50 mb-6 rounded-xl">
                    <CardBody className="p-6">
                      <h4 className="font-semibold text-success-900 mb-3">Real Example</h4>
                      <p className="text-success-800 mb-3">
                        Your construction company makes €400,000 profit per year. That puts you in
                        the "good profit" category (3-5x multiple).
                      </p>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-success-900">
                          <strong>Conservative:</strong> €400,000 × 3 ={' '}
                          <span className="text-primary-600 font-bold">€1.2M</span>
                          <br />
                          <strong>Strong business:</strong> €400,000 × 5 ={' '}
                          <span className="text-primary-600 font-bold">€2M</span>
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>

              {/* Section 6: What Makes Your Business Special */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  6. What Makes Your Business Special
                </h2>
                <div className="prose prose-lg max-w-none text-neutral-700">
                  <p className="mb-6">
                    Not all businesses are the same, even if they make similar profits. Some things
                    about your business can make it worth more (or less) than the standard
                    multiples. Here's what buyers look for:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Card className="border border-success-200 bg-success-50 rounded-xl">
                      <CardHeader>
                        <h3 className="text-lg font-semibold text-success-900 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          What Increases Your Value
                        </h3>
                      </CardHeader>
                      <CardBody>
                        <ul className="space-y-3 text-success-800">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-success-600 mt-1 flex-shrink-0" />
                            <div>
                              <strong>Loyal customers</strong> who keep coming back
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-success-600 mt-1 flex-shrink-0" />
                            <div>
                              <strong>Good team</strong> that can run things without you
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-success-600 mt-1 flex-shrink-0" />
                            <div>
                              <strong>Growing market</strong> with room to expand
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-success-600 mt-1 flex-shrink-0" />
                            <div>
                              <strong>Unique advantages</strong> competitors can't copy
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-success-600 mt-1 flex-shrink-0" />
                            <div>
                              <strong>Steady income</strong> you can predict
                            </div>
                          </li>
                        </ul>
                      </CardBody>
                    </Card>

                    <Card className="border border-error-200 bg-error-50 rounded-xl">
                      <CardHeader>
                        <h3 className="text-lg font-semibold text-error-900 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5" />
                          What Decreases Your Value
                        </h3>
                      </CardHeader>
                      <CardBody>
                        <ul className="space-y-3 text-error-800">
                          <li className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-error-600 mt-1 flex-shrink-0" />
                            <div>
                              <strong>Too dependent on you</strong> — business stops without you
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-error-600 mt-1 flex-shrink-0" />
                            <div>
                              <strong>Few big customers</strong> — losing one hurts badly
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-error-600 mt-1 flex-shrink-0" />
                            <div>
                              <strong>Declining industry</strong> — market getting smaller
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-error-600 mt-1 flex-shrink-0" />
                            <div>
                              <strong>Old equipment</strong> — needs major investment
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-error-600 mt-1 flex-shrink-0" />
                            <div>
                              <strong>Legal problems</strong> — lawsuits or compliance issues
                            </div>
                          </li>
                        </ul>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Section 7: Getting the Right Valuation */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  7. Getting the Right Valuation
                </h2>
                <div className="prose prose-lg max-w-none text-neutral-700">
                  <p className="mb-6">
                    Here's the thing: you can't just pick a number and hope for the best. A proper
                    valuation needs to be done right, or buyers won't take you seriously.
                  </p>

                  <Card className="border border-calm-200 bg-calm-50 mb-6 rounded-xl">
                    <CardBody className="p-6">
                      <div className="flex items-start gap-3">
                        <Shield className="w-6 h-6 text-calm-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-calm-900 mb-2">
                            Why Professional Valuation Matters
                          </h4>
                          <p className="text-calm-800 mb-3">
                            A professional valuation gives you credibility with buyers and protects
                            you from selling too low. It's like getting your house appraised before
                            selling — you need to know what it's really worth.
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                    What a Good Valuation Includes
                  </h3>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Analysis of your financials</strong> — making sure the numbers are
                        clean and accurate
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Comparison to similar businesses</strong> — what others like yours
                        have sold for
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Market conditions</strong> — is it a good time to sell in your
                        industry?
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Risk assessment</strong> — what could affect your business value?
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 8: Your Next Steps */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">8. Your Next Steps</h2>
                <div className="prose prose-lg max-w-none text-neutral-700">
                  <p className="mb-6">
                    Now you understand why your business is worth more than just liquidating it. The
                    question is: what do you do next?
                  </p>

                  <Card className="border border-accent-200 bg-accent-50 mb-6 rounded-xl">
                    <CardBody className="p-6">
                      <div className="flex items-start gap-3">
                        <MessageSquare className="w-6 h-6 text-accent-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-accent-900 mb-2">We're Here to Help</h4>
                          <p className="text-accent-800 mb-3">
                            Every business is different, and yours has its own story. We'd love to
                            help you understand exactly what your business is worth and guide you
                            through the process of selling it properly.
                          </p>
                          <p className="text-accent-800">
                            <strong>No pressure, no obligation.</strong> Just honest guidance from
                            people who care about getting you the value you deserve.
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>

              {/* CTA Section - Caregiver Approach */}
              <Card className="border border-calm-200 bg-gradient-to-br from-calm-50 via-white to-neutral-100 rounded-xl">
                <CardBody className="p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="p-3 bg-calm-100 rounded-full">
                      <Heart className="w-8 h-8 text-calm-600" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                    Ready to Discover Your Business's True Worth?
                  </h2>
                  <p className="text-neutral-700 mb-6 max-w-2xl mx-auto">
                    Don't let your life's work go for pennies. Get a free, no-obligation valuation
                    and see what your business is really worth. We'll guide you through every step.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="primary"
                      size="lg"
                      className="px-8 py-3"
                      onPress={handleOpenValuationModal}
                    >
                      Get My Free Valuation
                    </Button>
                    <Button
                      variant="secondary"
                      size="lg"
                      className="px-8 py-3"
                      onPress={() => navigate('/contact')}
                    >
                      Talk to Our Team
                    </Button>
                  </div>
                  <p className="text-sm text-neutral-500 mt-4">
                    Free consultation • No pressure • Just honest guidance
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
        </Container>
      </div>

      {/* Valuation Modal */}
      <ValuationModal
        isOpen={isValuationModalOpen}
        onClose={() => setIsValuationModalOpen(false)}
        onSignupPrompt={handleSignupPrompt}
      />
    </>
  );
};

export default ValuationGuide;
