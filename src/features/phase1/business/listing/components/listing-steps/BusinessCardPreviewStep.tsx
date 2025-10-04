/* eslint-disable @typescript-eslint/no-unused-vars */
// 🏢 Business Card Preview Step
// Location: src/features/phase1/business/listing/components/listing-steps/BusinessCardPreviewStep.tsx
// Purpose: Read-only preview of business card data (Step 1 of listing creation)

import React from 'react';

interface BusinessCardPreviewStepProps {
  businessCard: any;
  onNext: () => void;
}

const BusinessCardPreviewStep: React.FC<BusinessCardPreviewStepProps> = ({
  businessCard,
  onNext,
}) => {
  // Get business type icon
  const getBusinessIcon = (industry: string): string => {
    const iconMap: Record<string, string> = {
      catering: '🍽️',
      photography: '📸',
      hairstyling: '💇‍♀️',
      chef: '👨‍🍳',
      meals: '🍱',
      makeup: '💄',
      massage: '💆‍♀️',
      nailcare: '💅',
      personaltraining: '💪',
      wellness: '🧘‍♀️',
      cleaning: '🧹',
      consulting: '💼',
    };
    return iconMap[industry?.toLowerCase()] || '🏢';
  };

  // Get business type display name
  const getBusinessTypeName = (industry: string): string => {
    const nameMap: Record<string, string> = {
      catering: 'Catering',
      photography: 'Photography',
      hairstyling: 'Hairstyling',
      chef: 'Chef Services',
      meals: 'Meal Services',
      makeup: 'Make-up',
      massage: 'Massage',
      nailcare: 'Nail Care',
      personaltraining: 'Personal Training',
      wellness: 'Wellness Treatments',
      cleaning: 'Cleaning Services',
      consulting: 'Business Consulting',
    };
    return nameMap[industry?.toLowerCase()] || industry;
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Info Banner */}
        <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">✅</div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-emerald-900 mb-1">
                Business Card Data Prefilled
              </h3>
              <p className="text-sm text-emerald-700">
                This information is automatically pulled from your business card. You can edit your
                business card anytime from your dashboard.
              </p>
            </div>
          </div>
        </div>

        {/* Business Card Preview - Matching Dashboard Design */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-12 shadow-xl">
          <div className="text-center">
            {/* Icon */}
            <div className="text-8xl mb-6">{getBusinessIcon(businessCard.type)}</div>

            {/* Business Name */}
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{businessCard.name}</h2>

            {/* Business Type */}
            <p className="text-lg text-gray-600 mb-8">
              {getBusinessTypeName(businessCard.type)}
            </p>

            {/* Description */}
            <p className="text-base text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
              {businessCard.description}
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {businessCard.foundedYear}
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">Founded</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {businessCard.teamSize}
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">Team Size</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {businessCard.isRemote ? 'Remote' : businessCard.location}
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">Location</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {businessCard.yearsInBusiness} {businessCard.yearsInBusiness === 1 ? 'year' : 'years'}
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">In Business</div>
              </div>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="mt-8 p-4 bg-primary-50 border border-primary-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">ℹ️</div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">What's Next?</h3>
              <p className="text-sm text-primary-700">
                Next, we'll review your profile and valuation data (also prefilled), then you'll
                add the story behind your business and sale details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCardPreviewStep;
