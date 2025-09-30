// 🏢 Privacy & Visibility Step - Implementation
// Location: src/features/phase1/business/listing/steps/PrivacyVisibilityStep.tsx
// Purpose: Privacy controls and listing visibility settings (Step 4 of streamlined flow)

import React, { useState } from 'react';
import { StepComponentProps } from '../types/ListingCreationTypes';

const PrivacyVisibilityStep: React.FC<StepComponentProps> = ({ data, onDataChange }) => {
  const [formData, setFormData] = useState({
    anonymousListing: data.privacyVisibility?.anonymousListing ?? true,
    requiresNda: data.privacyVisibility?.requiresNda ?? true,
    hideFinancials: data.privacyVisibility?.hideFinancials ?? false,
    hideLocation: data.privacyVisibility?.hideLocation ?? false,
    hideIndustryDetails: data.privacyVisibility?.hideIndustryDetails ?? false,
    teaserDescription: data.privacyVisibility?.teaserDescription || '',
  });

  const handleToggle = (field: string, value: boolean) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onDataChange({
      privacyVisibility: updatedData,
    });
  };

  const handleTextChange = (value: string) => {
    const updatedData = { ...formData, teaserDescription: value };
    setFormData(updatedData);
    onDataChange({
      privacyVisibility: updatedData,
    });
  };

  const getCharacterCount = (text: string, max: number) => {
    return `${text.length}/${max}`;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Page Title */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Privacy & Visibility</h2>
        <p className="text-gray-600">Control who sees what information about your business</p>
      </div>

      {/* Anonymous Listing Toggle */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-gray-900">Anonymous Listing</h3>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                Recommended
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Your business name and specific identifying details will be hidden until buyers sign
              an NDA. Only general information will be visible.
            </p>
          </div>
          <button
            onClick={() => handleToggle('anonymousListing', !formData.anonymousListing)}
            className={`
              ml-4 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${formData.anonymousListing ? 'bg-blue-600' : 'bg-gray-200'}
            `}
            role="switch"
            aria-checked={formData.anonymousListing}
          >
            <span
              className={`
                pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                ${formData.anonymousListing ? 'translate-x-5' : 'translate-x-0'}
              `}
            />
          </button>
        </div>
      </div>

      {/* NDA Requirement Toggle */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-gray-900">Require NDA</h3>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">
                Highly Recommended
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Buyers must sign a Non-Disclosure Agreement before viewing full details. This protects
              your confidential business information.
            </p>
          </div>
          <button
            onClick={() => handleToggle('requiresNda', !formData.requiresNda)}
            className={`
              ml-4 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
              ${formData.requiresNda ? 'bg-emerald-600' : 'bg-gray-200'}
            `}
            role="switch"
            aria-checked={formData.requiresNda}
          >
            <span
              className={`
                pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                ${formData.requiresNda ? 'translate-x-5' : 'translate-x-0'}
              `}
            />
          </button>
        </div>
      </div>

      {/* Additional Privacy Controls */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Additional Privacy Controls
        </label>

        <div className="space-y-4">
          {/* Hide Financials */}
          <div className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-1">Hide Financial Details</h4>
              <p className="text-sm text-gray-600">
                Keep revenue and profit figures hidden until after NDA
              </p>
            </div>
            <button
              onClick={() => handleToggle('hideFinancials', !formData.hideFinancials)}
              className={`
                ml-4 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${formData.hideFinancials ? 'bg-blue-600' : 'bg-gray-200'}
              `}
              role="switch"
              aria-checked={formData.hideFinancials}
            >
              <span
                className={`
                  pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                  ${formData.hideFinancials ? 'translate-x-5' : 'translate-x-0'}
                `}
              />
            </button>
          </div>

          {/* Hide Location */}
          <div className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-1">Hide Specific Location</h4>
              <p className="text-sm text-gray-600">Show only region/city, not exact address</p>
            </div>
            <button
              onClick={() => handleToggle('hideLocation', !formData.hideLocation)}
              className={`
                ml-4 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${formData.hideLocation ? 'bg-blue-600' : 'bg-gray-200'}
              `}
              role="switch"
              aria-checked={formData.hideLocation}
            >
              <span
                className={`
                  pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                  ${formData.hideLocation ? 'translate-x-5' : 'translate-x-0'}
                `}
              />
            </button>
          </div>

          {/* Hide Industry Details */}
          <div className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-1">Hide Industry-Specific Details</h4>
              <p className="text-sm text-gray-600">Keep certain industry details confidential</p>
            </div>
            <button
              onClick={() => handleToggle('hideIndustryDetails', !formData.hideIndustryDetails)}
              className={`
                ml-4 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${formData.hideIndustryDetails ? 'bg-blue-600' : 'bg-gray-200'}
              `}
              role="switch"
              aria-checked={formData.hideIndustryDetails}
            >
              <span
                className={`
                  pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                  ${formData.hideIndustryDetails ? 'translate-x-5' : 'translate-x-0'}
                `}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Teaser Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Public Teaser Description *
        </label>
        <textarea
          value={formData.teaserDescription}
          onChange={e => handleTextChange(e.target.value)}
          placeholder="Write a compelling teaser that attracts buyers without revealing confidential details..."
          rows={4}
          maxLength={300}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
        />
        <div className="flex justify-between mt-1">
          <p className="text-sm text-gray-500">
            This will be visible to all users browsing listings
          </p>
          <span className="text-xs text-gray-400">
            {getCharacterCount(formData.teaserDescription, 300)}
          </span>
        </div>

        {/* Teaser Example */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs font-medium text-gray-700 mb-2">✨ Good Example:</p>
          <p className="text-sm text-gray-600 italic">
            "Established service business in prime European location. Strong recurring revenue,
            loyal customer base, and significant growth potential. Ideal for buyer looking to expand
            in the {data.basicInfo?.industry || 'service'} sector."
          </p>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-blue-50 rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-blue-600"
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
            <h3 className="font-medium text-gray-900 mb-2">Privacy Best Practices</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• We recommend keeping your listing anonymous and requiring NDAs</li>
              <li>• Your teaser should be enticing but not reveal confidential information</li>
              <li>• Serious buyers will sign NDAs to view full details</li>
              <li>• You can always adjust privacy settings after publishing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyVisibilityStep;
