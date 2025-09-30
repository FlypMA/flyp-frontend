// 🏢 Sale Details Step - Airbnb-Inspired Design
// Location: src/features/phase1/business/listing/steps/SaleDetailsStep.tsx
// Purpose: Sale preferences and transition details

import React from 'react';
import { StepComponentProps } from '../types/ListingCreationTypes';

const SaleDetailsStep: React.FC<StepComponentProps> = ({ data, onDataChange }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🤝</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sale Details</h2>
        <p className="text-gray-600 mb-8">
          How would you like to sell your business? Let us know your preferences for timeline,
          transition support, and what's included.
        </p>
        <div className="bg-purple-50 rounded-lg p-6">
          <p className="text-purple-800">
            <strong>Coming Soon:</strong> We're designing a flexible sale configuration experience
            that adapts to different business types and seller preferences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SaleDetailsStep;
