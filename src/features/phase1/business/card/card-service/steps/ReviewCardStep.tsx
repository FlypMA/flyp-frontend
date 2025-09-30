// 🏢 Review Card Step - Card Service
// Location: src/features/phase1/business/card/card-service/steps/ReviewCardStep.tsx
// Purpose: Step 3 - Review your business card before saving

import React from 'react';
import { CardStepProps } from '../types/CardServiceTypes';

const businessTypeLabels: Record<string, string> = {
  catering: 'Catering',
  photography: 'Photography',
  hairstyling: 'Hairstyling',
  chef: 'Chef Services',
  meals: 'Meal Services',
  makeup: 'Make-up',
  massage: 'Massage',
  nailcare: 'Nail Care',
  personaltraining: 'Personal Training',
  wellness: 'Wellness Treatments',
  cleaning: 'Cleaning Services',
  consulting: 'Business Consulting',
};

const ReviewCardStep: React.FC<CardStepProps> = ({ data }) => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-emerald-600"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Information</h2>
        <p className="text-gray-600 text-sm">Please review your business profile before saving</p>
      </div>

      {/* Review Sections */}
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-gray-500">Name:</span>
              <span className="text-sm font-semibold text-gray-900 text-right max-w-[60%]">
                {data.name || 'Not provided'}
              </span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-gray-500">Business Type:</span>
              <span className="text-sm font-semibold text-gray-900 text-right">
                {data.type ? businessTypeLabels[data.type] : 'Not provided'}
              </span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-gray-500">Location:</span>
              <span className="text-sm font-semibold text-gray-900 text-right max-w-[60%]">
                {data.isRemote ? 'Remote/Online' : data.location || 'Not provided'}
              </span>
            </div>
          </div>
        </div>

        {/* Business Details */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-gray-500">Founded:</span>
              <span className="text-sm font-semibold text-gray-900 text-right">
                {data.foundedYear || 'Not provided'}
              </span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-gray-500">Team Size:</span>
              <span className="text-sm font-semibold text-gray-900 text-right">
                {data.teamSize ? `${data.teamSize} employees` : 'Not provided'}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        {data.description && (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
            <p className="text-sm text-gray-900 leading-relaxed">{data.description}</p>
          </div>
        )}
      </div>

      {/* Success Message */}
      <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-emerald-600"
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
            <h4 className="font-medium text-emerald-900 mb-1">Ready to save!</h4>
            <p className="text-sm text-emerald-800">
              Your business card is complete. Click "Complete" to save your profile and continue.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCardStep;
