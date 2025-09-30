// 🏢 Photos & Documents Step - Airbnb-Inspired Design
// Location: src/features/phase1/business/listing/steps/PhotosDocumentsStep.tsx
// Purpose: Visual content and document upload

import React from 'react';
import { StepComponentProps } from '../types/ListingCreationTypes';

const PhotosDocumentsStep: React.FC<StepComponentProps> = ({ data, onDataChange }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📸</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Photos & Documents</h2>
        <p className="text-gray-600 mb-8">
          Add visual appeal with business photos and upload key documents to support your listing
          with credibility.
        </p>
        <div className="bg-orange-50 rounded-lg p-6">
          <p className="text-orange-800">
            <strong>Coming Soon:</strong> We're building a drag-and-drop experience for photos and
            documents that makes it easy to showcase your business professionally.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhotosDocumentsStep;
