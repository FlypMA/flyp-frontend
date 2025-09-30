// 👤 Profile Card Preview Step
// Location: src/features/phase1/business/listing/components/listing-steps/ProfileCardPreviewStep.tsx
// Purpose: Read-only preview of profile card data (Step 2 of listing creation)

import React from 'react';

interface ProfileCardPreviewStepProps {
  profileCard?: any;
  onNext: () => void;
}

const ProfileCardPreviewStep: React.FC<ProfileCardPreviewStepProps> = ({
  profileCard,
  onNext,
}) => {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Info Banner */}
        <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">✅</div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-emerald-900 mb-1">
                Profile Data Prefilled
              </h3>
              <p className="text-sm text-emerald-700">
                Your profile information is automatically included. This helps build trust with
                potential buyers.
              </p>
            </div>
          </div>
        </div>

        {/* Profile Preview */}
        {profileCard ? (
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-12 shadow-xl">
            <div className="text-center mb-8">
              {/* Profile Image Placeholder */}
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-5xl">
                👤
              </div>

              {/* Name */}
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {profileCard.firstName} {profileCard.lastName}
              </h2>

              {/* Title */}
              {profileCard.title && (
                <p className="text-lg text-gray-600 mb-6">{profileCard.title}</p>
              )}
            </div>

            {/* Profile Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-200">
              {profileCard.location && (
                <div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                    Location
                  </div>
                  <div className="text-base font-medium text-gray-900">{profileCard.location}</div>
                </div>
              )}

              {profileCard.experience && (
                <div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                    Experience
                  </div>
                  <div className="text-base font-medium text-gray-900">
                    {profileCard.experience}
                  </div>
                </div>
              )}

              {profileCard.expertise && (
                <div className="md:col-span-2">
                  <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                    Expertise
                  </div>
                  <div className="text-base font-medium text-gray-900">{profileCard.expertise}</div>
                </div>
              )}

              {profileCard.bio && (
                <div className="md:col-span-2">
                  <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">About</div>
                  <div className="text-base text-gray-700 leading-relaxed">{profileCard.bio}</div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-12 shadow-xl">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">👤</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No Profile Data</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                You haven't completed your profile yet. You can continue with the listing and add
                your profile later to build more trust with buyers.
              </p>
            </div>
          </div>
        )}

        {/* What's Next */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">ℹ️</div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-blue-900 mb-1">What's Next?</h3>
              <p className="text-sm text-blue-700">
                Next, we'll review your valuation data (if available), then you'll tell the story
                of your business and why you're selling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardPreviewStep;
