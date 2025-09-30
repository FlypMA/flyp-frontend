/**
 * 🎨 Seller Landing Page Variation Comparison
 *
 * Side-by-side comparison view for all three seller landing page variations
 * Useful for stakeholder review and design decision-making
 */

import { Button } from '@/shared/components/buttons';
import Container from '@/shared/components/layout/container/Container';
import { Card, CardBody, Tab, Tabs } from '@heroui/react';
import { BarChart3, MapPin, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VariationComparison = () => {
  const navigate = useNavigate();
  const [selectedVariation, setSelectedVariation] = useState('a');

  const variations = [
    {
      key: 'a',
      title: 'Variation A',
      subtitle: 'Business Intelligence First',
      icon: BarChart3,
      description: 'Lead with valuation & business health, de-emphasize selling until later',
      focus: '"Get smarter about your business"',
      path: '/for-sellers/variation-a',
      color: 'primary',
      strengths: [
        'Reduces pressure on business owners',
        'Positions platform as business intelligence tool first',
        'Supports 12-36 month exploration journey',
        'Higher initial engagement potential',
      ],
      considerations: [
        'May attract users not ready to sell',
        'Longer conversion funnel',
        'Need strong nurture campaign',
      ],
      bestFor: 'Business owners in early exploration phase, uncertain about selling timeline',
    },
    {
      key: 'b',
      title: 'Variation B',
      subtitle: 'Guided Journey',
      icon: MapPin,
      description: 'Show clear 4-stage progression with visual timeline',
      focus: '"We guide you every step"',
      path: '/for-sellers/variation-b',
      color: 'calm',
      strengths: [
        'Clear value proposition at each stage',
        'Visual progress indication builds confidence',
        'Emphasizes support and guidance',
        'Works for all seller maturity levels',
      ],
      considerations: [
        '4-stage journey may feel overwhelming',
        'Timeline (12-36 months) could deter urgent sellers',
        'Requires strong commitment to support',
      ],
      bestFor: 'Business owners who want clear roadmap and hand-holding throughout process',
    },
    {
      key: 'c',
      title: 'Variation C',
      subtitle: 'Success Stories',
      icon: TrendingUp,
      description: 'Lead with social proof and completed transactions',
      focus: '"Join thousands who found the right buyer"',
      path: '/for-sellers/variation-c',
      color: 'success',
      strengths: [
        'Strong social proof builds trust immediately',
        'Real outcomes create credibility',
        'Appeals to risk-averse sellers',
        'Shorter path to conversion',
      ],
      considerations: [
        'Requires actual testimonials and data',
        'May not differentiate from competitors',
        'Less educational, more transactional',
      ],
      bestFor: 'Business owners ready to sell now, looking for proven platform with track record',
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
              Design Variations
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Seller Landing Page Variations
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
              Compare three strategic approaches to converting business owners. Each variation
              optimizes for different user psychology and journey stages.
            </p>

            <div className="flex gap-4 justify-center">
              <Button variant="secondary" onPress={() => navigate('/for-sellers')}>
                View Current Production Version
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

                  <div className="mt-6 pt-6 border-t border-neutral-200">
                    <div className="text-sm font-semibold text-neutral-600 mb-2">Best For</div>
                    <p className="text-neutral-700">{currentVariation.bestFor}</p>
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

                  <div className="mt-8 pt-6 border-t border-neutral-200">
                    <h4 className="text-sm font-bold text-neutral-900 mb-3">
                      Implementation Status
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-success-500 rounded-full" />
                        <span className="text-neutral-700">Design Complete</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-success-500 rounded-full" />
                        <span className="text-neutral-700">Component Built</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-accent-500 rounded-full" />
                        <span className="text-neutral-700">Video assets needed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-accent-500 rounded-full" />
                        <span className="text-neutral-700">A/B testing pending</span>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          )}

          {/* Quick Comparison Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Quick Comparison</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {variations.map(variation => (
                <Card
                  key={variation.key}
                  isPressable
                  onPress={() => setSelectedVariation(variation.key)}
                  className={`rounded-2xl border-2 transition-all ${
                    selectedVariation === variation.key
                      ? `border-${variation.color}-500 shadow-xl shadow-${variation.color}-100`
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <CardBody className="p-6">
                    <div
                      className={`w-12 h-12 bg-${variation.color}-100 rounded-xl flex items-center justify-center mb-4`}
                    >
                      <variation.icon className={`w-6 h-6 text-${variation.color}-600`} />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-2">
                      {variation.subtitle}
                    </h3>
                    <p className="text-sm text-neutral-600 mb-4">{variation.description}</p>
                    <div className={`text-sm font-semibold text-${variation.color}-600`}>
                      {variation.focus}
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>

          {/* Recommendation */}
          <Card className="rounded-2xl border-2 border-primary-200 bg-gradient-to-br from-primary-50 to-calm-50">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">CTO Recommendation</h2>
              <div className="space-y-4 text-neutral-700">
                <p>
                  <strong>For initial launch:</strong> Start with Variation B (Guided Journey) as
                  primary landing page. It balances education, trust-building, and conversion
                  potential.
                </p>
                <p>
                  <strong>For A/B testing:</strong> Test Variation A vs Variation B with traffic
                  split to optimize for both exploration-phase and ready-to-sell segments.
                </p>
                <p>
                  <strong>For nurture campaigns:</strong> Use Variation C (Success Stories) in email
                  campaigns and retargeting to convert warm leads with social proof.
                </p>
                <p>
                  <strong>Next steps:</strong> Create video assets for hero sections, gather real
                  testimonials for Variation C, and set up analytics to track conversion funnels.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default VariationComparison;
