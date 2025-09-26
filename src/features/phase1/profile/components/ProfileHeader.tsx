/**
 * 👤 Profile Header Component
 *
 * Header component for profile display with Airbnb-inspired design
 */

import { Button } from '@/shared/components/buttons';
import { Avatar, Card, CardBody } from '@heroui/react';
import { Camera, Edit3, Globe, Shield } from 'lucide-react';
import React, { useState } from 'react';
import { Profile } from '../types/profile.types';
import {
  getProfileDisplayName,
  getProfileLocationDisplayName,
  getProfileRoleDisplayName,
} from '../utils/profileHelpers';

// =============================================================================
// COMPONENT INTERFACE
// =============================================================================

interface ProfileHeaderProps {
  profile: Profile;
  isOwnProfile?: boolean;
  isEditing?: boolean;
  onEditToggle?: () => void;
  onEditProfile?: () => void;
  onImageUpload?: (file: File) => void;
  onImageDelete?: () => void;
  onVisibilityUpdate?: (visibility: string) => void;
  className?: string;
}

// =============================================================================
// PROFILE HEADER COMPONENT
// =============================================================================

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  isOwnProfile = false,
  isEditing = false,
  onEditToggle,
  onEditProfile,
  onImageUpload,
  onImageDelete,
  onVisibilityUpdate,
  className = '',
}) => {
  const [showImageMenu, setShowImageMenu] = useState(false);

  // =============================================================================
  // EVENT HANDLERS
  // =============================================================================

  const handleImageClick = () => {
    if (isOwnProfile) {
      setShowImageMenu(!showImageMenu);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onImageUpload) {
      onImageUpload(file);
    }
  };

  const handleVisibilityChange = (visibility: string) => {
    if (onVisibilityUpdate) {
      onVisibilityUpdate(visibility);
    }
  };

  // =============================================================================
  // RENDER HELPERS
  // =============================================================================

  // Verification system removed from MVP

  const renderProfileStats = () => {
    const stats = [
      {
        label: 'Profile Views',
        value: profile.sharedData.platformActivity.profileViews.toLocaleString(),
      },
      {
        label: 'Response Rate',
        value: `${Math.round(profile.sharedData.platformActivity.averageResponseTime)}h`,
      },
      {
        label: 'Member Since',
        value: new Date(profile.sharedData.platformActivity.memberSince).getFullYear().toString(),
      },
    ];

    return (
      <div className="flex space-x-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-lg font-semibold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderVisibilityIndicator = () => {
    const visibility = profile.sharedData.privacy.profileVisibility;
    const visibilityConfig = {
      public: { icon: Globe, color: 'text-green-600', label: 'Public' },
      'verified-only': { icon: Shield, color: 'text-blue-600', label: 'Verified only' },
      private: { icon: Shield, color: 'text-gray-600', label: 'Private' },
    };

    const config = visibilityConfig[visibility] || visibilityConfig.public;
    const Icon = config.icon;

    return (
      <div className={`flex items-center space-x-1 ${config.color}`}>
        <Icon className="w-4 h-4" />
        <span className="text-sm font-medium">{config.label}</span>
      </div>
    );
  };

  // =============================================================================
  // MAIN RENDER
  // =============================================================================

  return (
    <Card className={`border border-gray-200 shadow-sm ${className}`}>
      <CardBody className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-0">
            <div className="relative group">
              <Avatar
                src={profile.personalInfo.avatarUrl}
                name={getProfileDisplayName(profile)}
                size="lg"
                className="w-24 h-24 lg:w-32 lg:h-32 cursor-pointer"
                onClick={handleImageClick}
              />

              {/* Image Upload Overlay */}
              {isOwnProfile && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              )}

              {/* Image Menu */}
              {showImageMenu && isOwnProfile && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="py-1">
                    <label className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                      <Camera className="w-4 h-4 mr-2" />
                      Upload new photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    {profile.personalInfo.avatarUrl && (
                      <button
                        onClick={() => {
                          onImageDelete?.();
                          setShowImageMenu(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Remove photo
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Completion */}
            {isOwnProfile && (
              <div className="mt-4 text-center lg:text-left">
                <div className="text-sm text-gray-600 mb-1">Profile completion</div>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${profile.completion.overallPercentage}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {profile.completion.overallPercentage}% complete
                </div>
              </div>
            )}
          </div>

          {/* Profile Information Section */}
          <div className="flex-1">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {getProfileDisplayName(profile)}
                </h1>

                <div className="flex items-center space-x-4 mb-3">
                  <span className="text-lg text-gray-600">
                    {getProfileRoleDisplayName(profile.role)}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-lg text-gray-600">
                    {getProfileLocationDisplayName(profile)}
                  </span>
                </div>

                {/* Verification system removed from MVP */}

                {/* Bio */}
                {profile.personalInfo.bio && (
                  <p className="text-gray-700 leading-relaxed mb-4 max-w-2xl">
                    {profile.personalInfo.bio}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                {isOwnProfile && (
                  <>
                    {renderVisibilityIndicator()}
                    <Button
                      variant="secondary"
                      color="default"
                      onPress={onEditProfile}
                      startContent={<Edit3 className="w-4 h-4" />}
                    >
                      Edit profile
                    </Button>
                  </>
                )}

                {!isOwnProfile && (
                  <Button
                    variant="primary"
                    color="primary"
                    startContent={<Edit3 className="w-4 h-4" />}
                  >
                    Contact
                  </Button>
                )}
              </div>
            </div>

            {/* Profile Stats */}
            {!isOwnProfile && (
              <div className="border-t border-gray-200 pt-4">{renderProfileStats()}</div>
            )}

            {/* Professional Summary */}
            {profile.personalInfo.professionalSummary && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Professional Summary</h3>
                <p className="text-gray-700 leading-relaxed">
                  {profile.personalInfo.professionalSummary}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProfileHeader;
