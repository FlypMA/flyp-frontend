// 👤 Profile Card - Review Step
// Location: src/features/phase1/profile/profile-card-service/steps/ReviewProfileStep.tsx
// Purpose: Review profile card before saving

import { CheckCircle } from 'lucide-react';
import React from 'react';
import { ProfileCardStepProps } from '../types/ProfileCardTypes';

const ReviewProfileStep: React.FC<ProfileCardStepProps> = ({ data }) => {
  return (
    <div className="flex flex-col h-full bg-white rounded-2xl p-8">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Review Your Profile</h2>
          <p className="text-gray-600 text-sm">Check everything looks good</p>
        </div>
      </div>

      {/* Profile Card Preview */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-xl">
        <div className="flex items-start space-x-4 mb-6">
          <div className="relative">
            {data.profileImage ? (
              <img
                src={data.profileImage}
                alt={data.fullName}
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-3xl font-bold border-2 border-gray-300">
                {data.fullName?.[0] || '?'}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <CheckCircle className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{data.fullName}</h1>
            <p className="text-gray-600">{data.location}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Owned businesses</span>
            <span className="font-semibold text-gray-900">{data.ownedBusinesses || 0}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Exits</span>
            <span className="font-semibold text-gray-900">{data.exits || 0}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Years on UpSwitch</span>
            <span className="font-semibold text-gray-900">{data.yearsOnPlatform || 0}</span>
          </div>
        </div>

        {data.bio && (
          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600 leading-relaxed">{data.bio}</p>
          </div>
        )}
      </div>

      {/* Success Message */}
      <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-green-800">
          ✅ <strong>Ready to save!</strong> Your profile card will be displayed on your dashboard
          and visible to potential buyers.
        </p>
      </div>
    </div>
  );
};

export default ReviewProfileStep;
