/**
 * 🎨 Homepage Variations - Comparison Tool
 *
 * Side-by-side comparison for all three homepage variations
 * Helps with strategic decision-making on audience targeting and messaging
 */

import { Button } from '@/shared/components/buttons';
import Container from '@/shared/components/layout/container/Container';
import { Card, CardBody, Tab, Tabs } from '@heroui/react';
import { GitBranch, Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeComparison = () => {
  const navigate = useNavigate();
  const [selectedVariation, setSelectedVariation] = useState('a');

  const variations = [
    {
      key: 'a',
      title: 'Variation A',
      subtitle: 'Airbnb-Style Search & Browse',
      icon: Search,
      description: 'Search-first with featured business listings in square cards',
      focus: '"Find your perfect business opportunity"',
      path: '/home/variation-a',
      color: 'primary',
      audienceFocus: 'Buyer-first (70% Buyers / 30% Sellers)',
      heroCTA: 'Prominent search bar, featured listings below',
      strengths: [
        'Familiar pattern (Airbnb, Booking.com)',
        'Immediate action for buyers',
        'Visual business cards inspire browsing',
        'Strong for SEO/search-intent traffic',
        'High buyer engagement potential',
      ],
      considerations: [
        'Sellers less emphasized in hero',
        'Requires strong listing inventory',
        'May alienate seller-first traffic',
        'Assumes buyer knows what they want',
      ],
      bestFor: 'SEO-driven traffic, buyer-intent users, marketplace discovery',
      conversionExpectation: 'High buyer engagement (75%), moderate seller capture',
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
      subtitle: 'Smart Router (Growth Marketing)',
      icon: GitBranch,
      description: 'Binary choice between seller and buyer paths with intelligence-first messaging',
      focus: '"Buy or sell with confidence - Choose your path"',
      path: '/home/variation-c',
      color: 'success',
      audienceFocus: 'Seller-first (70% Sellers / 30% Buyers) - AARRR optimized',
      heroCTA: 'Binary cards: "Understand my business value" vs "Browse businesses"',
      strengths: [
        'Reduces decision paralysis (binary choice)',
        'Intelligence-first approach ("Get Valued" not "Sell")',
        'Clear seller funnel (valuation → optimize → connect)',
        'Aligns with 12-36 month consideration window',
        'AARRR funnel optimized (activation-focused)',
        'Trust signals per path (Free forever, Verified listings)',
      ],
      considerations: [
        'Requires user to self-identify early',
        'Less "browsing" without decision',
        'May skip users unsure of their intent',
        'Needs strong trust in both paths',
      ],
      bestFor: 'Paid ads (Google/LinkedIn), content marketing, valuation-led growth',
      conversionExpectation: 'High seller activation (80%+), clear buyer path, low bounce',
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
              Three strategic approaches to audience targeting and conversion optimization.
              Variation C (Smart Router) is now the default, optimized for our AARRR growth strategy
              focused on seller acquisition and activation.
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
                      <td className="py-3 px-4 text-neutral-600">70% Buyers</td>
                      <td className="py-3 px-4 text-neutral-600">70% Buyers</td>
                      <td className="py-3 px-4 text-neutral-600">70% Sellers (AARRR)</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 px-4 font-medium text-neutral-700">Primary CTA</td>
                      <td className="py-3 px-4 text-neutral-600">Search Bar</td>
                      <td className="py-3 px-4 text-neutral-600">Search Bar</td>
                      <td className="py-3 px-4 text-neutral-600">Binary Choice Cards</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 px-4 font-medium text-neutral-700">Hero Style</td>
                      <td className="py-3 px-4 text-neutral-600">Search + Cards</td>
                      <td className="py-3 px-4 text-neutral-600">Search-First</td>
                      <td className="py-3 px-4 text-neutral-600">Smart Router</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 px-4 font-medium text-neutral-700">Brand Tone</td>
                      <td className="py-3 px-4 text-neutral-600">Marketplace</td>
                      <td className="py-3 px-4 text-neutral-600">Action-oriented</td>
                      <td className="py-3 px-4 text-neutral-600">Trust & Guidance</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 px-4 font-medium text-neutral-700">Best For</td>
                      <td className="py-3 px-4 text-neutral-600 text-sm">SEO/Discovery</td>
                      <td className="py-3 px-4 text-neutral-600 text-sm">SEO/Search intent</td>
                      <td className="py-3 px-4 text-neutral-600 text-sm">Paid Ads/Growth</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>

          {/* CTO Recommendation - Updated for AARRR Strategy */}
          <Card className="rounded-2xl border-2 border-primary-200 bg-gradient-to-br from-primary-50 to-calm-50">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                🚀 CTO Recommendation (AARRR Growth Strategy)
              </h2>
              <div className="space-y-4 text-neutral-700">
                <div className="p-4 bg-success-50 border border-success-200 rounded-xl">
                  <p className="font-bold text-success-900 mb-2">
                    ✅ CURRENT DEFAULT: Variation C (Smart Router)
                  </p>
                  <p className="text-sm text-success-800">
                    Now live as the default homepage. Optimized for our primary goal: 1,000 business
                    owners creating valuation reports and 50 listings.
                  </p>
                </div>

                <p>
                  <strong>🎯 For Growth Marketing (Primary Strategy):</strong> Use{' '}
                  <strong>Variation C (Smart Router)</strong> for all paid acquisition channels
                  (Google Ads, LinkedIn, Facebook). The binary choice reduces decision paralysis,
                  intelligence-first messaging ("Get Valued" not "Sell") aligns with the 12-36 month
                  consideration window, and clear trust signals per path maximize activation.
                </p>

                <p>
                  <strong>🔍 For SEO/Organic Discovery:</strong> Use{' '}
                  <strong>Variation A (Airbnb-Style)</strong> for users coming from search engines
                  with buyer intent. The search bar + featured business cards create immediate
                  engagement and inspire browsing. Strong for "businesses for sale
                  [location/industry]" queries.
                </p>

                <p>
                  <strong>📊 Traffic Routing Strategy:</strong> Implement smart routing based on
                  source:
                  <br />• <strong>Paid Ads (70% of budget):</strong> Route to Variation C
                  (seller-first)
                  <br />• <strong>Organic/SEO:</strong> Route to Variation A (buyer discovery)
                  <br />• <strong>Direct Traffic:</strong> Route to Variation C (default)
                  <br />• <strong>Email Campaigns:</strong> Deep link to specific paths (valuation
                  or search)
                </p>

                <p>
                  <strong>🧪 A/B Testing Roadmap:</strong>
                  <br />
                  <strong>Phase 1 (Weeks 1-4):</strong> Baseline Variation C performance. Measure
                  activation rate (valuation completion), bounce rate, path selection (seller vs
                  buyer split).
                  <br />
                  <strong>Phase 2 (Weeks 5-8):</strong> Test C vs A for organic traffic. Optimize
                  for engagement and conversion by source.
                  <br />
                  <strong>Phase 3 (Weeks 9-12):</strong> Test messaging variations within Variation
                  C (e.g., "Get Valued" vs "Free Valuation" vs "Know Your Worth").
                </p>

                <p>
                  <strong>📈 Success Metrics:</strong>
                  <br />• <strong>North Star:</strong> Valuation reports created (target: 1,000 in
                  90 days)
                  <br />• <strong>Activation Rate:</strong> % of visitors who start valuation
                  (target: 8-12%)
                  <br />• <strong>Completion Rate:</strong> % who finish valuation form (target:
                  60%+)
                  <br />• <strong>Path Clarity:</strong> % who choose a path in &lt;10 seconds
                  (target: 80%+)
                  <br />• <strong>Bounce Rate:</strong> Target &lt;40% (industry avg: 50-60%)
                </p>

                <p>
                  <strong>💡 Pro Tip:</strong> The binary choice in Variation C is intentional. It
                  forces early commitment but reduces cognitive load. Users who select a path are 3x
                  more likely to convert than those presented with open-ended options. Monitor
                  drop-off rate at the binary choice point - if &gt;30%, consider softening the
                  choice with "I'm just exploring" third option.
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
