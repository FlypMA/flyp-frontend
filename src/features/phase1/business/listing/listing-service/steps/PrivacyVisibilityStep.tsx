// 🏢 Privacy & Visibility Step - Airbnb-Inspired Design
// Location: src/features/phase1/business/listing/steps/PrivacyVisibilityStep.tsx
// Purpose: Privacy controls and visibility settings

import React from 'react';
import { StepComponentProps } from '../types/ListingCreationTypes';

const PrivacyVisibilityStep: React.FC<StepComponentProps> = ({ data, onDataChange }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy & Visibility</h2>
        <p className="text-gray-600 mb-8">
          Control how your listing appears to potential buyers. Choose what information to show and
          what to keep private.
        </p>
        <div className="bg-gray-50 rounded-lg p-6">
          <p className="text-gray-800">
            <strong>Coming Soon:</strong> We're creating granular privacy controls that give you
            complete control over your listing's visibility while maintaining buyer interest.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyVisibilityStep;
