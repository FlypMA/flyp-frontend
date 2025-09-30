// 🏢 Review & Publish Step - Implementation
// Location: src/features/phase1/business/listing/steps/ReviewPublishStep.tsx
// Purpose: Final review of all listing details before publishing (Step 5 of streamlined flow)

import React from 'react';
import { StepComponentProps } from '../types/ListingCreationTypes';

const ReviewPublishStep: React.FC<StepComponentProps> = ({ data }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-8">
      {/* Page Title */}
      <div className="text-center mb-6">
        <div className="text-5xl mb-4">🚀</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Listing</h2>
        <p className="text-gray-600">Review all details before publishing</p>
      </div>

      {/* Prefilled Data Summary */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">Pre-populated Information</h3>
            <p className="text-sm text-gray-600 mb-3">
              Your business details and financial data were automatically filled from your business card and valuation.
            </p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-emerald-700 font-medium">✓ Business Card</span>
                <p className="text-gray-600 text-xs">Type, years, basic info</p>
              </div>
              <div>
                <span className="text-emerald-700 font-medium">✓ Valuation Data</span>
                <p className="text-gray-600 text-xs">Financials, asking price</p>
              </div>
              <div>
                <span className="text-emerald-700 font-medium">✓ Your Input</span>
                <p className="text-gray-600 text-xs">Story, details, privacy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
          <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">From Business Card</span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase mb-1">Business Name</div>
            <div className="font-semibold text-gray-900">{data.basicInfo?.name || 'Not provided'}</div>
          </div>
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase mb-1">Industry</div>
            <div className="font-semibold text-gray-900 capitalize">{data.basicInfo?.industry?.replace('-', ' ') || 'Not provided'}</div>
          </div>
        </div>
      </div>

      {/* Financial Overview */}
      {data.financialOverview && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Financial Overview</h3>
            <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">From Valuation</span>
          </div>
          <div className="text-lg font-bold text-emerald-600">
            {data.financialOverview.askingPrice ? formatCurrency(Number(data.financialOverview.askingPrice)) : 'To be determined'}
          </div>
        </div>
      )}

      {/* Business Story */}
      {data.businessStory?.whatMakesSpecial && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Story</h3>
          <p className="text-sm text-gray-900">{data.businessStory.whatMakesSpecial}</p>
        </div>
      )}

      {/* Final Message */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
        <div className="text-4xl mb-4">🎉</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Publish!</h3>
        <p className="text-gray-600">Click "Publish Listing" to make it visible to qualified buyers.</p>
      </div>
    </div>
  );
};

export default ReviewPublishStep;
