/**
 * 🎯 Simplified Role-Based Profile Page
 *
 * Clean, minimalistic profile page with preview cards instead of complex tabs
 * Focuses on essential information with click-to-expand functionality
 */

import { Button } from '@/shared/components/buttons';
import { Avatar } from '@heroui/react';
import { Building2, Camera, Edit3 } from 'lucide-react';
import React, { useState } from 'react';
import { Profile } from '../types/profile.types';
import { getProfileDisplayName, getProfileLocationDisplayName } from '../utils/profileHelpers';
import { ProfessionalBackgroundModal } from './ProfessionalBackgroundModal';
import { ProfileEditFullscreenModal } from './ProfileEditFullscreenModal';

// =============================================================================
// COMPONENT INTERFACE
// =============================================================================

interface RoleBasedProfilePageProps {
  profile: Profile;
  isOwnProfile?: boolean;
  onProfileUpdate?: () => void;
  className?: string;
}

// =============================================================================
// SIMPLIFIED ROLE-BASED PROFILE PAGE COMPONENT
// =============================================================================

export const RoleBasedProfilePage: React.FC<RoleBasedProfilePageProps> = ({
  profile,
  isOwnProfile = false,
  onProfileUpdate,
  className = '',
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showProfessionalModal, setShowProfessionalModal] = useState(false);

  // Debug: Log modal state changes
  React.useEffect(() => {
    console.log('Edit Modal State:', showEditModal);
  }, [showEditModal]);

  React.useEffect(() => {
    console.log('Professional Modal State:', showProfessionalModal);
  }, [showProfessionalModal]);

  // =============================================================================
  // EVENT HANDLERS
  // =============================================================================

  const handleProfileUpdate = async () => {
    try {
      onProfileUpdate?.();
      setShowEditModal(false);
    } catch {
      // TODO: Add error notification
      // Error handling for profile update
    }
  };

  // =============================================================================
  // RENDER HELPERS
  // =============================================================================

  const renderBusinessesSection = () => {
    const businesses = profile.businessOwnerData?.previousVentures || [];

    if (businesses.length === 0) {
      return null;
    }

    return (
      <div className="mb-8 sm:mb-12">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">My Businesses</h2>
        </div>

        {/* Business Cards Grid - Mobile Optimized */}
        <div className="relative">
          {/* Business Cards Grid - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {businesses.slice(0, 4).map((business, index) => (
              <div
                key={business.id || index}
                className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer"
              >
                {/* Minimalistic Business Icon */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-50 rounded-lg mb-3 sm:mb-4 flex items-center justify-center">
                  <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                </div>

                {/* Business Info - Clean Layout */}
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900 text-sm sm:text-base leading-tight">
                    {business.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">{business.industry}</p>
                  <p className="text-xs text-gray-400">{business.duration}</p>
                  {business.outcome && (
                    <div className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700 mt-2">
                      {business.outcome}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // =============================================================================
  // MAIN RENDER
  // =============================================================================

  return (
    <div className={`max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 ${className}`}>
      {/* About Me Section - Full Profile Card */}
      <div className="mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">About Me</h2>
          {isOwnProfile && (
            <Button
              variant="secondary"
              size="sm"
              startContent={<Edit3 className="w-4 h-4" />}
              onClick={() => setShowEditModal(true)}
              className="self-start sm:self-auto"
            >
              Edit Profile
            </Button>
          )}
        </div>
        <div className="max-w-md">
          <div
            className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-8 cursor-pointer hover:shadow-lg transition-all duration-200"
            onClick={() => setShowProfessionalModal(true)}
          >
            {/* Avatar Section - Responsive Layout */}
            <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
              <div className="relative self-center sm:self-start">
                <div className="relative group">
                  <Avatar
                    src={profile.personalInfo.avatarUrl}
                    name={getProfileDisplayName(profile)}
                    size="lg"
                    className="w-20 h-20 sm:w-24 sm:h-24 cursor-pointer"
                  />
                  {isOwnProfile && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                  )}
                </div>
                {/* Verification Badge */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              {/* Profile Info - Centered on mobile, left on desktop */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                  {getProfileDisplayName(profile)}
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                  {getProfileLocationDisplayName(profile)}
                </p>
              </div>
            </div>

            {/* Stats Section - Vertical Layout */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Owned businesses</span>
                <span className="font-semibold text-gray-900">
                  {profile.businessOwnerData?.previousVentures?.length || 0}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Exits</span>
                <span className="font-semibold text-gray-900">
                  {profile.businessOwnerData?.previousVentures?.filter(
                    venture =>
                      venture.outcome &&
                      (venture.outcome.includes('Exit') || venture.outcome.includes('Sold'))
                  ).length || 0}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Years on UpSwitch</span>
                <span className="font-semibold text-gray-900">
                  {new Date().getFullYear() -
                    new Date(profile.sharedData.platformActivity.memberSince).getFullYear()}
                </span>
              </div>
            </div>

            {/* Bio Section - Left Aligned */}
            {profile.personalInfo.bio && (
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                  {profile.personalInfo.bio}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* My Businesses Section - Airbnb Style */}
      {(profile.role === 'seller' || profile.role === 'both') && renderBusinessesSection()}

      {/* Professional Background Modal */}
      <ProfessionalBackgroundModal
        isOpen={showProfessionalModal}
        onClose={() => setShowProfessionalModal(false)}
        profile={profile}
      />

      {/* Debug: Simple test modal */}
      {showProfessionalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Test Modal</h2>
            <p className="mb-4">This is a test modal to check if modals work at all.</p>
            <button
              onClick={() => setShowProfessionalModal(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Profile Edit Fullscreen Modal */}
      {isOwnProfile && (
        <ProfileEditFullscreenModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          profile={profile}
          onSave={handleProfileUpdate}
        />
      )}

      {/* Debug: Simple test modal for edit */}
      {isOwnProfile && showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Edit Profile Test Modal</h2>
            <p className="mb-4">This is a test modal for the edit profile functionality.</p>
            <button
              onClick={() => setShowEditModal(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleBasedProfilePage;
