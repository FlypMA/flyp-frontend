/**
 * 🎨 Business Card Design Variations
 * Compare 3 different design approaches
 */

import BusinessProfileCardV1 from '@/shared/components/business/BusinessProfileCardV1';
import BusinessProfileCardV2 from '@/shared/components/business/BusinessProfileCardV2';
import BusinessProfileCardV3 from '@/shared/components/business/BusinessProfileCardV3';
import BusinessProfileCardV4 from '@/shared/components/business/BusinessProfileCardV4';
import { useState } from 'react';

const BusinessCardVariations = () => {
  const [selectedVariation, setSelectedVariation] = useState<1 | 2 | 3 | 4 | 'all'>('all');

  // Mock data for all 4 stages
  const mockBusinessInfo = {
    name: 'Hoppy Floppy',
    industry: 'massage',
    description: 'Premium massage therapy services for wellness and relaxation.',
    foundedYear: 2024,
    teamSize: '1-5',
    revenue: 150000,
    location: 'Gent',
    isRemote: false,
    status: 'active' as const,
  };

  const mockProfileData = {
    fullName: 'Jane Doe',
    location: 'Gent, Belgium',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
  };

  const mockValuationReport = {
    businessValue: 1976000,
    method: 'Comparable Sales & DCF Analysis',
    confidence: 'high',
    date: '2025-09-29',
  };

  const mockValuationReports = [mockValuationReport];

  const variations = [
    {
      id: 1,
      name: 'Compact Horizontal',
      description: 'Clean layout with horizontal stage sections',
      component: BusinessProfileCardV1,
    },
    {
      id: 2,
      name: 'Sidebar Layout',
      description: 'Split view with stages in sidebar',
      component: BusinessProfileCardV2,
    },
    {
      id: 3,
      name: 'Minimal Badges',
      description: 'Ultra-compact with inline badges',
      component: BusinessProfileCardV3,
    },
    {
      id: 4,
      name: 'Card Style (Airbnb)',
      description: 'Visual square card with icon overlays',
      component: BusinessProfileCardV4,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Card Design Variations</h1>
          <p className="text-gray-600 mb-6">
            Compare 4 different layouts showing all journey stages
          </p>

          {/* Variation Selector */}
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => setSelectedVariation('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedVariation === 'all'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              View All
            </button>
            {variations.map(v => (
              <button
                key={v.id}
                onClick={() => setSelectedVariation(v.id as 1 | 2 | 3 | 4)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedVariation === v.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                V{v.id}
              </button>
            ))}
          </div>
        </div>

        {/* Variations Grid */}
        {selectedVariation === 'all' ? (
          <div className="space-y-8">
            {variations.map((v, index) => {
              const Component = v.component;
              return (
                <div key={v.id} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          Variation {v.id}: {v.name}
                        </h2>
                        <p className="text-sm text-gray-600">{v.description}</p>
                      </div>
                      <button
                        onClick={() => setSelectedVariation(v.id as 1 | 2 | 3)}
                        className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg text-sm font-medium hover:bg-primary-200"
                      >
                        Focus
                      </button>
                    </div>
                  </div>
                  <Component
                    businessInfo={mockBusinessInfo}
                    profileCardData={mockProfileData}
                    hasValuationReports={true}
                    latestValuationReport={mockValuationReport}
                    valuationReports={mockValuationReports}
                    hasActiveListing={true}
                    onEdit={() => alert('Edit clicked')}
                    onCreateValuation={() => alert('Create valuation clicked')}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {variations
              .filter(v => v.id === selectedVariation)
              .map(v => {
                const Component = v.component;
                return (
                  <div key={v.id} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Variation {v.id}: {v.name}
                      </h2>
                      <p className="text-gray-600">{v.description}</p>
                    </div>
                    <Component
                      businessInfo={mockBusinessInfo}
                      profileCardData={mockProfileData}
                      hasValuationReports={true}
                      latestValuationReport={mockValuationReport}
                      valuationReports={mockValuationReports}
                      hasActiveListing={true}
                      onEdit={() => alert('Edit clicked')}
                      onCreateValuation={() => alert('Create valuation clicked')}
                    />
                  </div>
                );
              })}
          </div>
        )}

        {/* Stage Examples */}
        <div className="mt-12 bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">View Different Journey Stages</h3>
          <p className="text-sm text-gray-600 mb-4">
            See how each variation handles different stages of the journey:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stage 1: Business Card Only */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Stage 1: Business Card (No valuation)
              </h4>
              {selectedVariation === 'all' || selectedVariation === 1 ? (
                <BusinessProfileCardV1
                  businessInfo={mockBusinessInfo}
                  hasValuationReports={false}
                  onCreateValuation={() => {}}
                />
              ) : selectedVariation === 2 ? (
                <BusinessProfileCardV2
                  businessInfo={mockBusinessInfo}
                  hasValuationReports={false}
                  onCreateValuation={() => {}}
                />
              ) : selectedVariation === 3 ? (
                <BusinessProfileCardV3
                  businessInfo={mockBusinessInfo}
                  hasValuationReports={false}
                  onCreateValuation={() => {}}
                />
              ) : (
                <BusinessProfileCardV4
                  businessInfo={mockBusinessInfo}
                  hasValuationReports={false}
                  onCreateValuation={() => {}}
                />
              )}
            </div>

            {/* Stage 2: With Valuation, No Profile */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Stage 2: With Valuation (No profile)
              </h4>
              {selectedVariation === 'all' || selectedVariation === 1 ? (
                <BusinessProfileCardV1
                  businessInfo={mockBusinessInfo}
                  hasValuationReports={true}
                  latestValuationReport={mockValuationReport}
                  valuationReports={mockValuationReports}
                  profileCardData={null}
                />
              ) : selectedVariation === 2 ? (
                <BusinessProfileCardV2
                  businessInfo={mockBusinessInfo}
                  hasValuationReports={true}
                  latestValuationReport={mockValuationReport}
                  valuationReports={mockValuationReports}
                  profileCardData={null}
                />
              ) : selectedVariation === 3 ? (
                <BusinessProfileCardV3
                  businessInfo={mockBusinessInfo}
                  hasValuationReports={true}
                  latestValuationReport={mockValuationReport}
                  valuationReports={mockValuationReports}
                  profileCardData={null}
                />
              ) : (
                <BusinessProfileCardV4
                  businessInfo={mockBusinessInfo}
                  hasValuationReports={true}
                  latestValuationReport={mockValuationReport}
                  valuationReports={mockValuationReports}
                  profileCardData={null}
                />
              )}
            </div>
          </div>
        </div>

        {/* Pros/Cons */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-3">V1: Compact Horizontal</h4>
            <div className="space-y-2 text-sm">
              <p className="text-green-700">✅ Clear visual hierarchy</p>
              <p className="text-green-700">✅ Good for desktop</p>
              <p className="text-green-700">✅ Easy to scan</p>
              <p className="text-red-700">❌ Medium height</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-3">V2: Sidebar Layout</h4>
            <div className="space-y-2 text-sm">
              <p className="text-green-700">✅ Most space-efficient</p>
              <p className="text-green-700">✅ Clean separation</p>
              <p className="text-green-700">✅ Progress visible</p>
              <p className="text-red-700">❌ Complex on mobile</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-3">V3: Minimal Badges</h4>
            <div className="space-y-2 text-sm">
              <p className="text-green-700">✅ Ultra-compact</p>
              <p className="text-green-700">✅ Modern look</p>
              <p className="text-green-700">✅ Great for mobile</p>
              <p className="text-red-700">❌ Less visual hierarchy</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-3">V4: Card Style</h4>
            <div className="space-y-2 text-sm">
              <p className="text-green-700">✅ Most visual appeal</p>
              <p className="text-green-700">✅ Interactive tooltips</p>
              <p className="text-green-700">✅ Square format</p>
              <p className="text-red-700">❌ Fixed aspect ratio</p>
            </div>
          </div>
        </div>

        {/* Recommendation Banner */}
        <div className="mt-12 bg-gradient-to-r from-primary-50 to-primary-100 border-2 border-primary-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">🎯 Our Recommendation</h3>
              <p className="text-gray-700 mb-4">
                Based on your use case, here&apos;s what we recommend for different contexts:
              </p>

              {/* Primary Recommendation */}
              <div className="mb-4 p-4 bg-white rounded-lg border border-primary-300">
                <h4 className="font-bold text-gray-900 mb-2">
                  For <span className="text-primary-600">/my-business</span> Dashboard: V2 (Sidebar
                  Layout)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mb-3">
                  <div className="flex items-center gap-2 text-success-700">
                    <span className="font-semibold">✅</span>
                    <span>Most space-efficient (280px height)</span>
                  </div>
                  <div className="flex items-center gap-2 text-success-700">
                    <span className="font-semibold">✅</span>
                    <span>Clear information hierarchy</span>
                  </div>
                  <div className="flex items-center gap-2 text-success-700">
                    <span className="font-semibold">✅</span>
                    <span>Professional desktop design</span>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-primary-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-900 mb-1">💡 Quick Switch:</p>
                  <code className="text-xs text-primary-700 bg-white px-2 py-1 rounded">
                    import BusinessProfileCard from
                    &apos;@/shared/components/business/BusinessProfileCardV2&apos;
                  </code>
                </div>
              </div>

              {/* Alternative Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">📱</span>
                    <h5 className="font-bold text-gray-900">Mobile-First?</h5>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Use <span className="font-semibold text-purple-700">V3 (Minimal Badges)</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Ultra-compact at 200px height. Perfect for mobile scrolling and modern
                    badge-based UI.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🎨</span>
                    <h5 className="font-bold text-gray-900">Marketplace?</h5>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Use <span className="font-semibold text-primary-700">V4 (Card Style)</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Most visually appealing with Airbnb-style interactivity. Great for public
                    discovery.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">💼</span>
                    <h5 className="font-bold text-gray-900">Maximum Clarity?</h5>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Use{' '}
                    <span className="font-semibold text-success-700">V1 (Compact Horizontal)</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Clear visual hierarchy with horizontal layout. Best for information-dense
                    interfaces.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCardVariations;
