/**
 * 🎨 Homepage Variations - Comparison Tool
 *
 * Side-by-side comparison for all three homepage variations
 * Helps with strategic decision-making on audience targeting and messaging
 */

import { Button } from '@/shared/components/buttons';
import Container from '@/shared/components/layout/container/Container';
import { Card, CardBody, Tab, Tabs } from '@heroui/react';
import { GitBranch, Heart, Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeComparison = () => {
  const navigate = useNavigate();
  const [selectedVariation, setSelectedVariation] = useState('a');

  const variations = [
    {
      key: 'a',
      title: 'Variation A',
      subtitle: 'Dual Audience Split',
      icon: GitBranch,
      description: 'Clear split for buyers vs sellers from entry',
      focus: '"Choose your journey"',
      path: '/home/variation-a',
      color: 'primary',
      audienceFocus: 'Equal (50% Buyers / 50% Sellers)',
      heroCTA: 'Dual CTAs (Get Valuation / Explore Businesses)',
      strengths: [
        'Serves both audiences equally',
        'Clear value propositions for each persona',
        'Reduces confusion about purpose',
        'Works for all user types',
        'Professional, balanced approach',
      ],
      considerations: [
        'May feel indecisive',
        'Requires users to choose path',
        'Longer scroll to see both paths',
        'Dilutes focused messaging',
      ],
      bestFor: 'Balanced traffic sources, unclear audience intent',
      conversionExpectation: 'Moderate (65%), but high path clarity',
    },
    {
      key: 'b',
      title: 'Variation B',
      subtitle: 'Search-First',
      icon: Search,
      description: 'Dominant search bar, immediate action for buyers',
      focus: '"Find businesses now"',
      path: '/home/variation-b',
      color: 'calm',
      audienceFocus: 'Buyer-first (70% Buyers / 30% Sellers)',
      heroCTA: 'Search bar (primary), Sellers CTA (secondary)',
      strengths: [
        'Immediate action for buyers',
        'Familiar pattern (Airbnb, Booking.com)',
        'Search drives engagement',
        'Clear purpose on entry',
        'High buyer conversion potential',
      ],
      considerations: [
        'Sellers less emphasized',
        'May alienate seller traffic',
        'Assumes user knows what they want',
        'Requires strong search UX',
      ],
      bestFor: 'Buyer-heavy traffic, search-intent users, SEO-driven visitors',
      conversionExpectation: 'High buyer engagement (80%), lower seller capture',
    },
    {
      key: 'c',
      title: 'Variation C',
      subtitle: 'Trust & Storytelling',
      icon: Heart,
      description: 'Emotional narrative, caregiver brand storytelling',
      focus: '"We\'re here for your journey"',
      path: '/home/variation-c',
      color: 'success',
      audienceFocus: 'Seller-first (60% Sellers / 40% Buyers)',
      heroCTA: 'Get Free Valuation (primary), Explore (secondary)',
      strengths: [
        'Builds deep trust and empathy',
        'Aligns with Caregiver brand',
        'Emotional connection',
        'Differentiated from competitors',
        'Memorable experience',
      ],
      considerations: [
        'May feel too "soft" for some buyers',
        'Longer engagement time needed',
        'Risk of appearing sales-y',
        'Requires authentic delivery',
      ],
      bestFor: 'First-time sellers, uncertain prospects, brand-building',
      conversionExpectation: 'High engagement & trust, moderate immediate conversion',
    },
  ];

  const currentVariation = variations.find(v => v.key === selectedVariation);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-50 py-12">
      <Container>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-6">
              Homepage Variations
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Homepage Design Variations
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
              Three strategic approaches to audience targeting, messaging, and CTAs. Each optimizes
              for different traffic sources and user intent.
            </p>

            <div className="flex gap-4 justify-center">
              <Button variant="secondary" onPress={() => navigate('/')}>
                View Current Production Homepage
              </Button>
            </div>
          </div>

          {/* Variation Tabs */}
          <div className="mb-8">
            <Tabs
              selectedKey={selectedVariation}
              onSelectionChange={key => setSelectedVariation(key as string)}
              variant="bordered"
              size="lg"
              classNames={{
                tabList: 'w-full',
                tab: 'h-auto py-4',
              }}
            >
              {variations.map(variation => (
                <Tab
                  key={variation.key}
                  title={
                    <div className="flex items-center gap-3">
                      <variation.icon className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-bold">{variation.title}</div>
                        <div className="text-xs text-neutral-500">{variation.subtitle}</div>
                      </div>
                    </div>
                  }
                />
              ))}
            </Tabs>
          </div>

          {/* Selected Variation Details */}
          {currentVariation && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Overview Card */}
              <Card className="lg:col-span-2 rounded-2xl border border-neutral-200 shadow-lg">
                <CardBody className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className={`w-14 h-14 bg-${currentVariation.color}-100 rounded-2xl flex items-center justify-center`}
                    >
                      <currentVariation.icon
                        className={`w-7 h-7 text-${currentVariation.color}-600`}
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                        {currentVariation.title}: {currentVariation.subtitle}
                      </h2>
                      <p className="text-neutral-600">{currentVariation.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-neutral-50 rounded-xl">
                      <div className="text-xs font-semibold text-neutral-600 mb-1">
                        Audience Focus
                      </div>
                      <div className="font-bold text-neutral-900 text-sm">
                        {currentVariation.audienceFocus}
                      </div>
                    </div>
                    <div className="p-4 bg-neutral-50 rounded-xl">
                      <div className="text-xs font-semibold text-neutral-600 mb-1">Hero CTA</div>
                      <div className="font-bold text-neutral-900 text-sm">
                        {currentVariation.heroCTA}
                      </div>
                    </div>
                  </div>

                  <div className="mb-6 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                    <div className="text-sm font-semibold text-neutral-600 mb-2">Primary Focus</div>
                    <div className={`text-xl font-bold text-${currentVariation.color}-600`}>
                      {currentVariation.focus}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-neutral-900 mb-3">✅ Strengths</h3>
                      <ul className="space-y-2">
                        {currentVariation.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-success-500 rounded-full mt-2" />
                            <span className="text-neutral-700">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-bold text-neutral-900 mb-3">⚠️ Considerations</h3>
                      <ul className="space-y-2">
                        {currentVariation.considerations.map((consideration, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2" />
                            <span className="text-neutral-700">{consideration}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-neutral-200 space-y-3">
                    <div>
                      <div className="text-sm font-semibold text-neutral-600 mb-1">Best For</div>
                      <p className="text-neutral-700">{currentVariation.bestFor}</p>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-neutral-600 mb-1">
                        Expected Conversion
                      </div>
                      <p className="text-neutral-700">{currentVariation.conversionExpectation}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Action Card */}
              <Card className="rounded-2xl border border-neutral-200 shadow-lg bg-gradient-to-br from-neutral-50 to-white">
                <CardBody className="p-8">
                  <h3 className="text-lg font-bold text-neutral-900 mb-6">View This Variation</h3>

                  <div className="space-y-4">
                    <Button
                      variant="primary"
                      className="w-full"
                      onPress={() => window.open(currentVariation.path, '_blank')}
                    >
                      Open in New Tab
                    </Button>

                    <Button
                      variant="secondary"
                      className="w-full"
                      onPress={() => navigate(currentVariation.path)}
                    >
                      Navigate to Page
                    </Button>
                  </div>

                  <div className="mt-8 p-4 bg-white rounded-xl border border-neutral-200">
                    <div className="text-xs font-semibold text-neutral-600 mb-2">
                      Target Audience
                    </div>
                    <div className="text-lg font-bold text-primary-600">
                      {currentVariation.audienceFocus.split('(')[0].trim()}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          )}

          {/* Quick Comparison Table */}
          <Card className="rounded-2xl border border-neutral-200 shadow-lg mb-12">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">Quick Comparison</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-neutral-200">
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">
                        Feature
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-primary-700">
                        Variation A
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-calm-700">
                        Variation B
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-success-700">
                        Variation C
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 px-4 font-medium text-neutral-700">Audience Focus</td>
                      <td className="py-3 px-4 text-neutral-600">50/50 Split</td>
                      <td className="py-3 px-4 text-neutral-600">70% Buyers</td>
                      <td className="py-3 px-4 text-neutral-600">60% Sellers</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 px-4 font-medium text-neutral-700">Primary CTA</td>
                      <td className="py-3 px-4 text-neutral-600">Dual CTAs</td>
                      <td className="py-3 px-4 text-neutral-600">Search Bar</td>
                      <td className="py-3 px-4 text-neutral-600">Get Valuation</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 px-4 font-medium text-neutral-700">Hero Style</td>
                      <td className="py-3 px-4 text-neutral-600">Split Cards</td>
                      <td className="py-3 px-4 text-neutral-600">Search-First</td>
                      <td className="py-3 px-4 text-neutral-600">Storytelling</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 px-4 font-medium text-neutral-700">Brand Tone</td>
                      <td className="py-3 px-4 text-neutral-600">Professional</td>
                      <td className="py-3 px-4 text-neutral-600">Action-oriented</td>
                      <td className="py-3 px-4 text-neutral-600">Empathetic</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 px-4 font-medium text-neutral-700">Best For</td>
                      <td className="py-3 px-4 text-neutral-600 text-sm">Balanced traffic</td>
                      <td className="py-3 px-4 text-neutral-600 text-sm">SEO/Search intent</td>
                      <td className="py-3 px-4 text-neutral-600 text-sm">Brand building</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>

          {/* CTO Recommendation */}
          <Card className="rounded-2xl border-2 border-primary-200 bg-gradient-to-br from-primary-50 to-calm-50">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">CTO Recommendation</h2>
              <div className="space-y-4 text-neutral-700">
                <p>
                  <strong>For initial launch:</strong> Start with{' '}
                  <strong>Variation A (Dual Audience Split)</strong> as it serves both audiences
                  equally and provides clear pathways. This reduces risk and lets data guide future
                  decisions.
                </p>
                <p>
                  <strong>For SEO/organic traffic:</strong> Use{' '}
                  <strong>Variation B (Search-First)</strong> for users coming from search engines
                  with buyer intent. Optimize search bar for business categories.
                </p>
                <p>
                  <strong>For brand campaigns:</strong> Use{' '}
                  <strong>Variation C (Trust & Storytelling)</strong> for social media, content
                  marketing, and brand awareness campaigns. Best for warm traffic.
                </p>
                <p>
                  <strong>A/B Testing Strategy:</strong> Test Variation A vs C with current traffic.
                  Measure: bounce rate, time on page, CTA clicks, path selection. Run for minimum 2
                  weeks with 5,000+ visitors per variation.
                </p>
                <p>
                  <strong>Segmentation:</strong> Consider serving different variations based on
                  traffic source (e.g., B for SEO, C for social, A for direct).
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default HomeComparison;
