// 🏢 Sale Details Step - Listing Wizard
// Location: src/features/phase1/business/wizard/steps/SaleDetailsStep.tsx
// Purpose: Step 4 - Sale journey and transition details

import { AnimatedTextarea } from '@/shared/components/forms';
import { Target } from 'lucide-react';
import React from 'react';
import { SaleDetails, StepComponentProps } from '../types';

const SaleDetailsStep: React.FC<StepComponentProps> = ({ data, onDataChange }) => {
  const saleDetails = data.saleDetails || ({} as SaleDetails);

  const handleInputChange = (field: keyof SaleDetails, value: string | string[]) => {
    onDataChange({
      saleDetails: {
        ...saleDetails,
        [field]: value,
      },
    });
  };

  const timelineOptions = [
    'Immediate (0-3 months)',
    'Short term (3-6 months)',
    'Medium term (6-12 months)',
    'Flexible (12+ months)',
    'No specific timeline',
  ];

  const assetOptions = [
    'Customer database and relationships',
    'Intellectual property and patents',
    'Brand and trademarks',
    'Website and digital assets',
    'Equipment and inventory',
    'Office lease and location',
    'Staff and key employees',
    'Supplier relationships',
    'Software licenses',
    'Financial records and systems',
  ];

  const handleAssetToggle = (asset: string, type: 'included' | 'excluded') => {
    const currentList =
      saleDetails[type === 'included' ? 'included_assets' : 'excluded_assets'] || [];
    const otherList =
      saleDetails[type === 'included' ? 'excluded_assets' : 'included_assets'] || [];

    // Remove from other list if present
    const updatedOtherList = otherList.filter(item => item !== asset);

    // Toggle in current list
    const updatedCurrentList = currentList.includes(asset)
      ? currentList.filter(item => item !== asset)
      : [...currentList, asset];

    handleInputChange(
      'included_assets',
      type === 'included' ? updatedCurrentList : updatedOtherList
    );
    handleInputChange(
      'excluded_assets',
      type === 'included' ? updatedOtherList : updatedCurrentList
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Target className="w-12 h-12 text-primary-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Your Sale Journey</h2>
        <p className="text-neutral-600">
          Help us understand your needs and preferences for a smooth transition
        </p>
      </div>

      {/* Empathetic guidance box */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <div className="text-2xl">🤝</div>
          <div>
            <h3 className="font-semibold text-green-900 mb-2">We're here to support you</h3>
            <p className="text-sm text-green-700">
              Selling a business is a significant decision. We understand this can be emotional and
              complex. Your honest answers help us find the right buyer and ensure a smooth
              transition for everyone involved.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <AnimatedTextarea
          label="What's driving your decision to sell? (Reason for Sale)"
          placeholder="Share your reasons for selling. For example: 'After 15 years of building this business, I'm ready to retire and spend more time with family. The business is in excellent condition with strong recurring revenue, but I no longer have the energy to pursue the growth opportunities I've identified. I want to find a buyer who can take it to the next level.'"
          value={saleDetails.reason_for_sale || ''}
          onChange={e => handleInputChange('reason_for_sale', e.target.value)}
          required
          minRows={4}
          onBlur={() => {}}
          name="reason_for_sale"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Sale Timeline
          </label>
          <select
            value={saleDetails.preferred_timeline || ''}
            onChange={e => handleInputChange('preferred_timeline', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required
          >
            <option value="">Select timeline</option>
            {timelineOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Timeline Tips */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-900 mb-2">Timeline Tips</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>
              • <strong>Immediate sales</strong> may require accepting lower offers
            </li>
            <li>
              • <strong>3-6 months</strong> allows for proper due diligence and better pricing
            </li>
            <li>
              • <strong>6-12 months</strong> gives time to optimize operations and financials
            </li>
            <li>
              • <strong>Flexible timelines</strong> often attract the best buyers and highest offers
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Assets Included/Excluded</h3>
          <p className="text-sm text-gray-600 mb-4">
            Select which assets are included in the sale and which you plan to keep.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-green-700 mb-3">✅ Included in Sale</h4>
              <div className="space-y-2">
                {assetOptions.map(asset => (
                  <label key={asset} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(saleDetails.included_assets || []).includes(asset)}
                      onChange={() => handleAssetToggle(asset, 'included')}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">{asset}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-red-700 mb-3">❌ Excluded from Sale</h4>
              <div className="space-y-2">
                {assetOptions.map(asset => (
                  <label key={asset} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(saleDetails.excluded_assets || []).includes(asset)}
                      onChange={() => handleAssetToggle(asset, 'excluded')}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">{asset}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <AnimatedTextarea
          label="How can you help with the transition? (Transition Support)"
          placeholder="Describe how you're willing to support the new owner. For example: 'I'm committed to a smooth transition and can provide 3 months of part-time consulting (10 hours/week) to train the new owner and ensure business continuity. I'm also willing to stay on as a consultant for up to 12 months for major decisions. All key employees have agreed to stay on during the transition period.'"
          value={saleDetails.transition_support || ''}
          onChange={e => handleInputChange('transition_support', e.target.value)}
          required
          minRows={4}
          onBlur={() => {}}
          name="transition_support"
        />

        <AnimatedTextarea
          label="What about your team? (Staff Retention)"
          placeholder="Share information about your team and their role in the transition. For example: 'Our team of 8 employees is highly skilled and committed to the business. The operations manager has been with us for 5 years and is ready to take on more responsibility. All employees have expressed interest in staying with the new owner. I'm willing to provide retention bonuses to key staff during the transition period.'"
          value={saleDetails.staff_retention || ''}
          onChange={e => handleInputChange('staff_retention', e.target.value)}
          required
          minRows={4}
          onBlur={() => {}}
          name="staff_retention"
        />
      </div>
    </div>
  );
};

export default SaleDetailsStep;
