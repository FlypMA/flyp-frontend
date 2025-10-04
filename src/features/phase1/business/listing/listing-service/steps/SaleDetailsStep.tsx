// 🏢 Sale Details Step - Implementation
// Location: src/features/phase1/business/listing/steps/SaleDetailsStep.tsx
// Purpose: Sale preferences and transition details (Step 2 of streamlined flow)

import React, { useState } from 'react';
import { StepComponentProps } from '../types/ListingCreationTypes';

const SaleDetailsStep: React.FC<StepComponentProps> = ({ data, onDataChange }) => {
  const [formData, setFormData] = useState({
    reasonForSale: data.saleDetails?.reasonForSale || '',
    preferredTimeline: data.saleDetails?.preferredTimeline || '',
  });

  const handleInputChange = (field: string, value: any) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onDataChange({
      saleDetails: {
        ...data.saleDetails,
        ...updatedData,
      } as any,
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Page Title */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">🤝</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Sale Details</h2>
        <p className="text-gray-600">
          Help buyers understand your preferences for the sale and transition
        </p>
      </div>

      {/* Reason for Sale */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Why are you selling? *
        </label>
        <select
          value={formData.reasonForSale}
          onChange={e => handleInputChange('reasonForSale', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        >
          <option value="">Select a reason</option>
          <option value="retirement">Retirement</option>
          <option value="new-opportunity">Pursuing new opportunity</option>
          <option value="health">Health reasons</option>
          <option value="relocation">Relocation</option>
          <option value="financial">Financial reasons</option>
          <option value="market-timing">Market timing</option>
          <option value="lifestyle">Lifestyle change</option>
          <option value="other">Other</option>
        </select>
        <p className="text-sm text-gray-500 mt-1">
          Transparency builds trust with potential buyers
        </p>
      </div>

      {/* Preferred Timeline */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What's your preferred sale timeline? *
        </label>
        <select
          value={formData.preferredTimeline}
          onChange={e => handleInputChange('preferredTimeline', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        >
          <option value="">Select a timeline</option>
          <option value="immediate">Immediate (1-3 months)</option>
          <option value="short-term">Short-term (3-6 months)</option>
          <option value="medium-term">Medium-term (6-12 months)</option>
          <option value="flexible">Flexible (12+ months)</option>
          <option value="conditional">Conditional on right offer</option>
        </select>
      </div>

      {/* Help Section */}
      <div className="bg-primary-50 rounded-xl p-6 mt-8">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Quick Tips</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Transparency builds trust with potential buyers</li>
              <li>• Flexibility on timeline can attract more buyers</li>
              <li>• You can discuss detailed terms later in the process</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleDetailsStep;
