/**
 * 🎨 Get Free Valuation Variations - Comparison Tool
 *
 * Side-by-side comparison for all three valuation page variations
 * Helps with strategic decision-making on email capture timing and form design
 */

import { Button } from '@/shared/components/buttons';
import Container from '@/shared/components/layout/container/Container';
import { Card, CardBody, Tab, Tabs } from '@heroui/react';
import { Calculator, FormInput, Zap } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ValuationComparison = () => {
  const navigate = useNavigate();
  const [selectedVariation, setSelectedVariation] = useState('a');

  const variations = [
    {
      key: 'a',
      title: 'Variation A',
      subtitle: 'Conversational Flow',
      icon: Zap,
      description: 'One question at a time, email capture at the END',
      focus: '"Build rapport before asking for email"',
      path: '/valuation/variation-a',
      color: 'primary',
      emailTiming: 'End (Question 7 of 7)',
      formStyle: 'Progressive (1 question per screen)',
      completionTime: '2-3 minutes',
      strengths: [
        'Lowest psychological friction',
        'Builds trust before email ask',
        'Beautiful, engaging experience',
        'High completion rate',
        'Mobile-friendly one-question format',
      ],
      considerations: [
        'Longer time to email capture',
        'Users can abandon before email',
        'More complex state management',
        'Requires excellent UX design',
      ],
      bestFor: 'Users who are uncertain or cautious about sharing email upfront',
      conversionExpectation: 'High completion (70%+), Medium email capture (60%)',
    },
    {
      key: 'b',
      title: 'Variation B',
      subtitle: 'All-in-One Form',
      icon: FormInput,
      description: 'Clean simple form, email capture UPFRONT',
      focus: '"Give value immediately, collect email first"',
      path: '/valuation/variation-b',
      color: 'calm',
      emailTiming: 'Beginning (First field)',
      formStyle: 'All-in-one (All fields visible)',
      completionTime: '90 seconds',
      strengths: [
        'Fastest email capture',
        'Traditional, familiar format',
        'All information visible upfront',
        'Easy to implement',
        'Clear progress indication',
      ],
      considerations: [
        'Higher upfront friction',
        'May deter some users',
        'Requires trust signals',
        'Standard/expected format',
      ],
      bestFor: 'Users ready to engage, familiar with forms, value clarity',
      conversionExpectation: 'Medium completion (55%), High email quality (80%)',
    },
    {
      key: 'c',
      title: 'Variation C',
      subtitle: 'Interactive Calculator',
      icon: Calculator,
      description: 'Real-time calculator, email capture MID-FLOW',
      focus: '"Show value first, capture email when engaged"',
      path: '/valuation/variation-c',
      color: 'success',
      emailTiming: 'Mid-flow (After 3 seconds of interaction)',
      formStyle: 'Interactive (Sliders + real-time)',
      completionTime: '1-2 minutes',
      strengths: [
        'Immediate gratification (live results)',
        'High engagement and fun',
        'Email ask feels natural',
        'Users see value before email',
        'Unique, memorable experience',
      ],
      considerations: [
        'Complex implementation',
        'May feel "too playful" for some',
        'Requires real-time calculation',
        'Mobile slider UX challenges',
      ],
      bestFor: 'Engaged users who want to explore and experiment with inputs',
      conversionExpectation: 'High engagement (85%), High email capture (75%)',
    },
    {
      key: 'd',
      title: 'Variation D',
      subtitle: 'Calculator + Comparison',
      icon: Calculator,
      description: 'Interactive calculator + Strategic Sale vs. Liquidation comparison',
      focus: '"Show full value story: track over time + preserve intangible value"',
      path: '/valuation/variation-d',
      color: 'primary',
      emailTiming: 'After engagement (Post-calculation)',
      formStyle: 'Interactive sliders + visual comparison',
      completionTime: '2-3 minutes',
      strengths: [
        'Educational - shows WHY strategic sale matters',
        'Compelling visual comparison (Ilara-inspired)',
        'Builds case for long-term tracking',
        'Preserves intangible value narrative',
        'Aligns with 12-36 month journey',
      ],
      considerations: [
        'Longer page - more scrolling',
        'More content to consume',
        'Requires user engagement time',
        'Complex implementation',
      ],
      bestFor:
        'Business owners exploring long-term exit strategy, need education on value preservation',
      conversionExpectation:
        'High engagement (80%), High understanding (90%), Medium completion (65%)',
    },
  ];

  const currentVariation = variations.find(v => v.key === selectedVariation);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-50 py-12">
      <Container>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-calm-100 text-calm-700 rounded-full text-sm font-semibold mb-6">
              Valuation Page Variations
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Get Free Valuation - Design Variations
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
              Four strategic approaches to form simplicity, trust signals, and email capture timing.
              Each optimizes for different user psychology and journey stage.
            </p>

            <div className="flex gap-4 justify-center">
              <Button variant="secondary" onPress={() => navigate('/my-business/valuation')}>
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

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-neutral-50 rounded-xl">
                      <div className="text-xs font-semibold text-neutral-600 mb-1">
                        Email Timing
                      </div>
                      <div className="font-bold text-neutral-900">
                        {currentVariation.emailTiming}
                      </div>
                    </div>
                    <div className="p-4 bg-neutral-50 rounded-xl">
                      <div className="text-xs font-semibold text-neutral-600 mb-1">Form Style</div>
                      <div className="font-bold text-neutral-900">{currentVariation.formStyle}</div>
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
                      Completion Time
                    </div>
                    <div className="text-2xl font-bold text-primary-600">
                      {currentVariation.completionTime}
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
                      <td className="py-3 px-4 font-medium text-neutral-700">Email Timing</td>
                      <td className="py-3 px-4 text-neutral-600">End of flow</td>
                      <td className="py-3 px-4 text-neutral-600">Beginning</td>
                      <td className="py-3 px-4 text-neutral-600">Mid-flow (3s delay)</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 px-4 font-medium text-neutral-700">Form Type</td>
                      <td className="py-3 px-4 text-neutral-600">Progressive</td>
                      <td className="py-3 px-4 text-neutral-600">All-in-one</td>
                      <td className="py-3 px-4 text-neutral-600">Interactive</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 px-4 font-medium text-neutral-700">Time to Complete</td>
                      <td className="py-3 px-4 text-neutral-600">2-3 min</td>
                      <td className="py-3 px-4 text-neutral-600">90 sec</td>
                      <td className="py-3 px-4 text-neutral-600">1-2 min</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 px-4 font-medium text-neutral-700">
                        Expected Completion
                      </td>
                      <td className="py-3 px-4 text-success-600 font-semibold">70%+</td>
                      <td className="py-3 px-4 text-neutral-600">55%</td>
                      <td className="py-3 px-4 text-success-600 font-semibold">85%+</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 px-4 font-medium text-neutral-700">Email Capture</td>
                      <td className="py-3 px-4 text-neutral-600">60%</td>
                      <td className="py-3 px-4 text-success-600 font-semibold">80%</td>
                      <td className="py-3 px-4 text-success-600 font-semibold">75%</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-neutral-700">Implementation</td>
                      <td className="py-3 px-4 text-neutral-600">Complex</td>
                      <td className="py-3 px-4 text-success-600 font-semibold">Simple</td>
                      <td className="py-3 px-4 text-accent-600">Very Complex</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>

          {/* CTO Recommendation */}
          <Card className="rounded-2xl border-2 border-calm-200 bg-gradient-to-br from-calm-50 to-primary-50">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">CTO Recommendation</h2>
              <div className="space-y-4 text-neutral-700">
                <p>
                  <strong>For initial launch:</strong> Start with{' '}
                  <strong>Variation B (All-in-One Form)</strong> as it offers fastest email capture
                  with familiar UX patterns. Implement trust signals prominently.
                </p>
                <p>
                  <strong>For A/B testing:</strong> Test <strong>Variation A vs Variation C</strong>{' '}
                  to determine if conversational flow or interactive calculator generates more
                  qualified leads.
                </p>
                <p>
                  <strong>For mobile:</strong> <strong>Variation A (Conversational)</strong>{' '}
                  performs best on mobile devices due to one-question-at-a-time format.
                </p>
                <p>
                  <strong>For engagement:</strong> <strong>Variation C (Calculator)</strong> creates
                  highest engagement and time on page, ideal for building brand affinity.
                </p>
                <p>
                  <strong>Next steps:</strong> Implement Variation B first, add analytics, then A/B
                  test Variation C for users who return to page multiple times.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default ValuationComparison;
