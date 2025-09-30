// 🏢 Business Story Step - Airbnb-Inspired Design
// Location: src/features/phase1/business/listing/steps/BusinessStoryStep.tsx
// Purpose: Business story and unique value proposition

import React from 'react';
import { StepComponentProps } from '../types/ListingCreationTypes';

const BusinessStoryStep: React.FC<StepComponentProps> = ({ data, onDataChange }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center py-12">
        <div className="text-6xl mb-4">✨</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Business Story</h2>
        <p className="text-gray-600 mb-8">
          Tell the story of your business - what makes it special, who your customers are, and what
          growth opportunities exist.
        </p>
        <div className="bg-emerald-50 rounded-lg p-6">
          <p className="text-emerald-800">
            <strong>Coming Soon:</strong> We're creating a storytelling experience that helps you
            showcase your business's unique value proposition in an engaging way.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusinessStoryStep;
