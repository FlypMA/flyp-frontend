/**
 * 💰 Pricing Page - "Success-Only" Model
 *
 * STRATEGY:
 * - Transparent, disruptive pricing (€0 upfront, 2.5% on success)
 * - Caregiver brand: "We only succeed when you succeed"
 * - Competitive comparison showing massive savings
 * - Trust building through transparency
 *
 * INSPIRATION:
 * - Clean, modern design from Ilara pricing
 * - Airbnb's trust-building approach
 * - Stripe's transparency
 */

import { Button } from '@/shared/components/buttons';
import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { seoData } from '@/shared/utils/seo/seoData';
import { Card, CardBody } from '@heroui/react';
import {
  ArrowRight,
  Check,
  Heart,
  Lock,
  MessageCircle,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../providers/auth-provider';

const Pricing = () => {
  const navigate = useNavigate();
  const { openModal, user } = useAuth();
  const [dealValue, setDealValue] = useState(500000); // €500K default

  // Calculate fees
  const flypFee = dealValue * 0.025; // 2.5% (seller only)
  const traditionalBrokerFee = dealValue * 0.08; // 8% average
  const onlineMarketplaceFee = dealValue * 0.1 + 299 * 12; // 10% + listing fees (up to 10% success fee + monthly listing)
  const savings = traditionalBrokerFee - flypFee;

  const handleGetStarted = () => {
    if (user) {
      navigate('/my-business/valuations');
    } else {
      openModal('signup', {
        url: '/my-business/valuations',
        state: { from: 'pricing', intent: 'get-valuation' },
      });
    }
  };

  return (
    <>
      <SEOHead
        {...seoData.home}
        title="Transparent Pricing | UpSwitch - We Only Succeed When You Succeed"
        description="No listing fees. No subscription fees. Just a small 2.5% success fee when your deal closes. Save 50-80% vs traditional brokers."
      />

      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-calm-50">
        {/* Hero Section */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary-900 via-success-900 to-primary-900 text-white relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat"></div>
          </div>

          <Container>
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-6">
                <Heart className="w-4 h-4" />
                <span>No Upfront Costs • No Hidden Fees</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Transparent Pricing.
                <br />
                <span className="text-success-300">No Surprises.</span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                We only succeed when you succeed. That's why everything is free until your deal
                successfully closes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleGetStarted}
                  className="inline-flex items-center justify-center gap-2 px-12 h-14 text-lg rounded-lg bg-white text-primary-900 hover:bg-neutral-100 font-semibold shadow-xl transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-3 focus:ring-primary-500/30"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </button>
                <Button
                  variant="secondary"
                  size="xl"
                  onPress={() => {
                    document.getElementById('comparison')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-12 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                >
                  See How We Compare
                </Button>
              </div>

              <p className="text-sm text-white/60 mt-6">
                Join 12,000+ business owners who trust UpSwitch
              </p>
            </div>
          </Container>
        </section>

        {/* Main Pricing Cards */}
        <section className="py-24 relative">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                  One Simple Fee. Only When You Succeed.
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                  No monthly fees. No listing fees. No hidden costs. Just 2.5% when your deal
                  successfully closes.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {/* Business Owners */}
                <Card className="rounded-3xl border-2 border-primary-300 shadow-2xl bg-gradient-to-br from-white to-primary-50 relative overflow-hidden">
                  {/* Recommended badge */}
                  <div className="absolute top-6 right-6 px-3 py-1 bg-success-500 text-white text-xs font-bold rounded-full shadow-lg">
                    MOST POPULAR
                  </div>

                  <CardBody className="p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center">
                        <TrendingUp className="w-7 h-7 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-neutral-900">For Business Owners</h3>
                        <p className="text-neutral-600">Sell your business risk-free</p>
                      </div>
                    </div>

                    <div className="mb-8">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-6xl font-bold text-primary-600">€0</span>
                        <span className="text-xl text-neutral-600">to start</span>
                      </div>
                      <p className="text-sm text-neutral-500">
                        Then only 2.5% when your deal successfully closes
                      </p>
                    </div>

                    <div className="space-y-3 mb-8">
                      <p className="text-sm font-semibold text-neutral-700 mb-4">
                        Everything included:
                      </p>
                      {[
                        'State-of-the-art business valuation',
                        'AI-powered matching with qualified buyers',
                        'Unlimited listing duration',
                        'Complete data room & document storage',
                        'Buyer inquiry management',
                        'Secure messaging platform',
                        'Deal progress tracking',
                        'Expert support & guidance',
                        'Marketing & promotion',
                      ].map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
                          <span className="text-neutral-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      size="xl"
                      onPress={handleGetStarted}
                      endContent={<ArrowRight className="w-5 h-5" />}
                      className="w-full bg-primary-600 text-white hover:bg-primary-700 font-semibold shadow-lg"
                    >
                      Get Free Valuation
                    </Button>
                  </CardBody>
                </Card>

                {/* Buyers */}
                <Card className="rounded-3xl border-2 border-calm-300 shadow-2xl bg-gradient-to-br from-white to-calm-50">
                  <CardBody className="p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-14 h-14 bg-calm-100 rounded-2xl flex items-center justify-center">
                        <Users className="w-7 h-7 text-calm-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-neutral-900">
                          For Buyers/Investors
                        </h3>
                        <p className="text-neutral-600">Find your perfect opportunity</p>
                      </div>
                    </div>

                    <div className="mb-8">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-6xl font-bold text-calm-600">€0</span>
                        <span className="text-xl text-neutral-600">forever</span>
                      </div>
                      <p className="text-sm text-neutral-500">
                        Completely free for buyers. No fees, no subscriptions, ever.
                      </p>
                    </div>

                    <div className="space-y-3 mb-8">
                      <p className="text-sm font-semibold text-neutral-700 mb-4">
                        Everything included:
                      </p>
                      {[
                        'Browse all verified listings',
                        'AI-powered matching with qualified sellers',
                        'Unlimited searches & filters',
                        'Contact any seller directly',
                        'Secure messaging platform',
                        'NDA management system',
                        'Complete data room access',
                        'Due diligence tools',
                        'Expert acquisition support',
                      ].map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
                          <span className="text-neutral-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="secondary"
                      size="xl"
                      onPress={() => navigate('/search')}
                      endContent={<ArrowRight className="w-5 h-5" />}
                      className="w-full"
                    >
                      Browse Businesses
                    </Button>
                  </CardBody>
                </Card>
              </div>

              {/* Trust Signals */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200">
                  <Shield className="w-6 h-6 text-success-600" />
                  <div>
                    <div className="font-semibold text-neutral-900 text-sm">No Hidden Fees</div>
                    <div className="text-xs text-neutral-600">100% transparent pricing</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200">
                  <Lock className="w-6 h-6 text-success-600" />
                  <div>
                    <div className="font-semibold text-neutral-900 text-sm">No Upfront Cost</div>
                    <div className="text-xs text-neutral-600">Zero risk to get started</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200">
                  <Heart className="w-6 h-6 text-success-600" />
                  <div>
                    <div className="font-semibold text-neutral-900 text-sm">Aligned Incentives</div>
                    <div className="text-xs text-neutral-600">We win when you win</div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Interactive Calculator */}
        <section className="py-24 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                  Calculate Your Savings
                </h2>
                <p className="text-xl text-neutral-600">
                  See how much you save compared to traditional options
                </p>
              </div>

              <Card className="rounded-3xl border-2 border-neutral-200 shadow-xl bg-gradient-to-br from-white to-neutral-50">
                <CardBody className="p-8 md:p-12">
                  {/* Deal Value Slider */}
                  <div className="mb-8">
                    <label className="text-sm font-semibold text-neutral-700 mb-3 block">
                      Your Business/Deal Value
                    </label>
                    <input
                      type="range"
                      min="50000"
                      max="10000000"
                      step="50000"
                      value={dealValue}
                      onChange={e => setDealValue(Number(e.target.value))}
                      className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                    />
                    <div className="flex justify-between mt-2 text-xs text-neutral-500">
                      <span>€50K</span>
                      <span className="text-2xl font-bold text-primary-600">
                        {dealValue >= 1000000
                          ? `€${(dealValue / 1000000).toFixed(1)}M`
                          : `€${(dealValue / 1000).toFixed(0)}K`}
                      </span>
                      <span>€10M</span>
                    </div>
                  </div>

                  {/* Fee Comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Traditional Broker */}
                    <div className="p-6 bg-red-50 rounded-xl border-2 border-red-200">
                      <div className="text-sm font-semibold text-red-700 mb-2">
                        Traditional Broker
                      </div>
                      <div className="text-3xl font-bold text-red-600 mb-1">
                        €{(traditionalBrokerFee / 1000).toFixed(0)}K
                      </div>
                      <div className="text-xs text-red-600">8% commission</div>
                    </div>

                    {/* Online Marketplace */}
                    <div className="p-6 bg-orange-50 rounded-xl border-2 border-orange-200">
                      <div className="text-sm font-semibold text-orange-700 mb-2">
                        Online Marketplace
                      </div>
                      <div className="text-3xl font-bold text-orange-600 mb-1">
                        €{(onlineMarketplaceFee / 1000).toFixed(0)}K
                      </div>
                      <div className="text-xs text-orange-600">Up to 10%</div>
                    </div>

                    {/* UpSwitch */}
                    <div className="p-6 bg-gradient-to-br from-success-50 to-primary-50 rounded-xl border-2 border-success-300 relative">
                      <div className="absolute top-2 right-2 px-2 py-1 bg-success-500 text-white text-xs font-bold rounded-full">
                        BEST VALUE
                      </div>
                      <div className="text-sm font-semibold text-success-700 mb-2">UpSwitch</div>
                      <div className="text-3xl font-bold text-success-700 mb-1">
                        €{(flypFee / 1000).toFixed(0)}K
                      </div>
                      <div className="text-xs text-success-600">2.5% success fee only</div>
                    </div>
                  </div>

                  {/* Savings Highlight */}
                  <div className="mt-6 p-6 bg-gradient-to-r from-success-100 to-primary-100 rounded-xl border-2 border-success-300 text-center">
                    <div className="text-sm font-semibold text-success-700 mb-2">
                      Your Savings with UpSwitch
                    </div>
                    <div className="text-4xl font-bold text-success-700">
                      €{(savings / 1000).toFixed(0)}K
                    </div>
                    <div className="text-sm text-success-600 mt-1">
                      {Math.round((savings / traditionalBrokerFee) * 100)}% cheaper than traditional
                      brokers
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Container>
        </section>

        {/* Competitive Comparison Table */}
        <section id="comparison" className="py-24 bg-gradient-to-br from-neutral-50 to-white">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                  How We Compare
                </h2>
                <p className="text-xl text-neutral-600">
                  See why business owners choose UpSwitch over traditional options
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="p-6 text-left text-sm font-semibold text-neutral-600">
                        Feature
                      </th>
                      <th className="p-6 text-center bg-red-50">
                        <div className="text-sm font-semibold text-neutral-900">
                          Traditional Brokers
                        </div>
                      </th>
                      <th className="p-6 text-center bg-orange-50">
                        <div className="text-sm font-semibold text-neutral-900">
                          Online Marketplaces
                        </div>
                      </th>
                      <th className="p-6 text-center bg-gradient-to-br from-success-50 to-primary-50">
                        <div className="text-sm font-semibold text-neutral-900 flex items-center justify-center gap-2">
                          <Sparkles className="w-4 h-4 text-success-600" />
                          UpSwitch
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        feature: 'Upfront Costs',
                        traditional: '€2,000-€10,000',
                        marketplace: '€99-€599/month',
                        flyp: '€0',
                      },
                      {
                        feature: 'Seller Success Fee',
                        traditional: '5-12%',
                        marketplace: 'Up to 10%',
                        flyp: '2.5%',
                      },
                      {
                        feature: 'Buyer Fees',
                        traditional: '€0',
                        marketplace: '€49-€299/month',
                        flyp: '€0',
                      },
                      {
                        feature: 'Free Valuation',
                        traditional: false,
                        marketplace: 'Basic',
                        flyp: true,
                      },
                      {
                        feature: 'Valuation Quality',
                        traditional: 'Manual estimate',
                        marketplace: 'Basic calculator',
                        flyp: 'State-of-the-art AI',
                      },
                      {
                        feature: 'Listing Duration',
                        traditional: '6-12 months',
                        marketplace: 'Pay per month',
                        flyp: 'Unlimited (free)',
                      },
                      {
                        feature: 'Data Room Included',
                        traditional: false,
                        marketplace: 'Extra fee',
                        flyp: true,
                      },
                      {
                        feature: 'Expert Support',
                        traditional: true,
                        marketplace: 'Extra fee',
                        flyp: true,
                      },
                      {
                        feature: 'Buyer Verification',
                        traditional: 'Manual',
                        marketplace: 'Basic',
                        flyp: 'State-of-the-art',
                      },
                      {
                        feature: 'Average Cost (€1M deal)',
                        traditional: '€50K-€120K',
                        marketplace: '€103K+ (10% + fees)',
                        flyp: '€25K',
                      },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="p-6 text-neutral-900 font-medium">{row.feature}</td>
                        <td className="p-6 text-center">
                          {typeof row.traditional === 'boolean' ? (
                            row.traditional ? (
                              <Check className="w-5 h-5 text-neutral-400 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-red-400 mx-auto" />
                            )
                          ) : (
                            <span className="text-neutral-600">{row.traditional}</span>
                          )}
                        </td>
                        <td className="p-6 text-center">
                          {typeof row.marketplace === 'boolean' ? (
                            row.marketplace ? (
                              <Check className="w-5 h-5 text-neutral-400 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-orange-400 mx-auto" />
                            )
                          ) : (
                            <span className="text-neutral-600">{row.marketplace}</span>
                          )}
                        </td>
                        <td className="p-6 text-center bg-success-50/30">
                          {typeof row.flyp === 'boolean' ? (
                            row.flyp ? (
                              <Check className="w-5 h-5 text-success-600 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-neutral-400 mx-auto" />
                            )
                          ) : (
                            <span className="text-success-700 font-semibold">{row.flyp}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Container>
        </section>

        {/* FAQs */}
        <section className="py-24 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-neutral-600">Everything you need to know</p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    q: 'When do I pay the success fee?',
                    a: "Only sellers pay a success fee - 2.5% deducted from the final sale proceeds when the deal closes. Buyers pay nothing. If your deal doesn't close, nobody pays anything.",
                  },
                  {
                    q: 'Do buyers pay any fees?',
                    a: 'No! Buyers use the platform completely free. No browsing fees, no subscription fees, no transaction fees. We only charge sellers 2.5% on successful deals because they receive the proceeds.',
                  },
                  {
                    q: 'Are there any hidden fees?',
                    a: 'Absolutely not. No setup fees, no monthly fees, no "premium feature" upsells, no hidden costs. Just 2.5% on success for sellers. That\'s our promise.',
                  },
                  {
                    q: 'Why is UpSwitch so much cheaper than brokers and other marketplaces?',
                    a: "Traditional brokers charge 5-12% (€50K-€120K on a €1M deal). Other online marketplaces charge monthly listing fees (€99-€599/month) PLUS success fees up to 10%—that's over €103K on a €1M deal! UpSwitch charges NO listing fees and only 2.5% on success (€25K total). You save €78K+ compared to other marketplaces.",
                  },
                  {
                    q: 'Can I list my business for free forever?',
                    a: 'Yes! Your listing stays active for as long as you want, completely free. Whether it takes 3 months or 3 years to find the right buyer, you never pay a listing fee.',
                  },
                  {
                    q: "What if the buyer doesn't pay their fee?",
                    a: "Buyer and seller fees are handled separately through our escrow system. Your success fee is deducted automatically at closing, regardless of the buyer's payment.",
                  },
                  {
                    q: 'Is the free valuation really free?',
                    a: 'Yes, 100% free. No credit card required, no strings attached. Get an accurate, transparent valuation using our state-of-the-art engine.',
                  },
                ].map((faq, i) => (
                  <Card
                    key={i}
                    className="rounded-xl border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all"
                  >
                    <CardBody className="p-6">
                      <div className="flex gap-4">
                        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <MessageCircle className="w-4 h-4 text-primary-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-neutral-900 mb-2">{faq.q}</h3>
                          <p className="text-neutral-600 leading-relaxed">{faq.a}</p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-gradient-to-br from-primary-900 via-success-900 to-primary-900 text-white">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <Sparkles className="w-16 h-16 text-success-400 mx-auto mb-8" />

              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Ready to get the best value?
              </h2>
              <p className="text-xl text-white/90 mb-12">
                Join other business owners who trust UpSwitch's transparent, success-only pricing.
                Get started free today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button
                  onClick={handleGetStarted}
                  className="inline-flex items-center justify-center gap-2 px-12 h-14 text-lg rounded-lg bg-white text-primary-900 hover:bg-neutral-100 font-semibold shadow-xl transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-3 focus:ring-primary-500/30"
                >
                  Get Free Valuation
                  <ArrowRight className="w-5 h-5" />
                </button>
                <Button
                  variant="secondary"
                  size="xl"
                  onPress={() => navigate('/search')}
                  className="px-12 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                >
                  Browse Businesses
                </Button>
              </div>

              <div className="flex items-center justify-center gap-6 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-success-400" />
                  <span>No upfront costs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-success-400" />
                  <span>No hidden fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-success-400" />
                  <span>We only succeed when you do</span>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
};

export default Pricing;
