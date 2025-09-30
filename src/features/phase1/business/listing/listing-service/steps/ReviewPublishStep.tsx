// 🏢 Review & Publish Step - Airbnb-Inspired Design
// Location: src/features/phase1/business/listing/steps/ReviewPublishStep.tsx
// Purpose: Final review and listing publication

import React from 'react';
import { StepComponentProps } from '../types/ListingCreationTypes';

const ReviewPublishStep: React.FC<StepComponentProps> = ({ data, onDataChange }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🚀</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Review & Publish</h2>
        <p className="text-gray-600 mb-8">
          Review your listing details and publish it to start receiving interest from potential
          buyers.
        </p>
        <div className="bg-emerald-50 rounded-lg p-6">
          <p className="text-emerald-800">
            <strong>Coming Soon:</strong> We're building a comprehensive review experience that
            shows you exactly how your listing will appear to buyers before you publish.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewPublishStep;
