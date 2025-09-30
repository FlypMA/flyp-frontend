// 🏢 Business Story Step - Implementation
// Location: src/features/phase1/business/listing/steps/BusinessStoryStep.tsx
// Purpose: Business story and unique value proposition (Step 1 of streamlined flow)

import React, { useState } from 'react';
import { StepComponentProps } from '../types/ListingCreationTypes';

const BusinessStoryStep: React.FC<StepComponentProps> = ({ data, onDataChange }) => {
  const [formData, setFormData] = useState({
    whatMakesSpecial: data.businessStory?.whatMakesSpecial || '',
    targetCustomers: data.businessStory?.targetCustomers || '',
  });

  const handleInputChange = (field: string, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    const newBusinessStory = {
      ...data.businessStory,
      ...updatedData,
    };
    console.log('📝 Business Story - updating:', { field, value, newBusinessStory });
    onDataChange({
      businessStory: newBusinessStory,
    });
  };

  const getCharacterCount = (text: string, max: number) => {
    return `${text.length}/${max}`;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Page Title */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">✨</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell Your Business Story</h2>
        <p className="text-gray-600">
          Help potential buyers understand what makes your business unique and valuable
        </p>
      </div>

      {/* What Makes Your Business Special */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What makes your business special? *
        </label>
        <textarea
          value={formData.whatMakesSpecial}
          onChange={e => handleInputChange('whatMakesSpecial', e.target.value)}
          placeholder="Describe what sets your business apart from competitors..."
          rows={4}
          maxLength={500}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
        />
        <div className="flex justify-between mt-1">
          <p className="text-sm text-gray-500">
            Think about unique features, awards, or customer loyalty
          </p>
          <span className="text-xs text-gray-400">
            {getCharacterCount(formData.whatMakesSpecial, 500)}
          </span>
        </div>
      </div>

      {/* Target Customers */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Who are your target customers? *
        </label>
        <textarea
          value={formData.targetCustomers}
          onChange={e => handleInputChange('targetCustomers', e.target.value)}
          placeholder="Describe your ideal customer base and demographics..."
          rows={3}
          maxLength={300}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
        />
        <div className="flex justify-between mt-1">
          <p className="text-sm text-gray-500">
            E.g., "Small businesses in tech sector" or "Families with young children"
          </p>
          <span className="text-xs text-gray-400">
            {getCharacterCount(formData.targetCustomers, 300)}
          </span>
        </div>
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
              <li>• Be specific and authentic - buyers appreciate honesty</li>
              <li>• Focus on what makes you different from competitors</li>
              <li>• Describe your ideal customer clearly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessStoryStep;
