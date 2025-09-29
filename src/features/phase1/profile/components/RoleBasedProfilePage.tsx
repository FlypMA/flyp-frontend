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
import {
    getProfileDisplayName,
    getProfileLocationDisplayName,
} from '../utils/profileHelpers';
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

  // =============================================================================
  // EVENT HANDLERS
  // =============================================================================

  const handleProfileUpdate = async () => {
    try {
      onProfileUpdate?.();
      setShowEditModal(false);
    } catch (error) {
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
      <div className="mb-12">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-900">My Businesses</h2>
        </div>
        
        {/* Business Cards Grid */}
        <div className="relative">

          {/* Business Cards Grid - Minimalistic */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businesses.slice(0, 4).map((business, index) => (
              <div
                key={business.id || index}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer"
              >
                {/* Minimalistic Business Icon */}
                <div className="w-12 h-12 bg-gray-50 rounded-lg mb-4 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-gray-500" />
                </div>
                
                {/* Business Info - Clean Layout */}
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900 text-sm leading-tight">
                    {business.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {business.industry}
                  </p>
                  <p className="text-xs text-gray-400">
                    {business.duration}
                  </p>
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
        <div className={`max-w-4xl mx-auto p-8 ${className}`}>
          {/* About Me Section - Full Profile Card */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-semibold text-gray-900">About Me</h2>
          {isOwnProfile && (
            <Button
              variant="secondary"
              size="sm"
              startContent={<Edit3 className="w-4 h-4" />}
              onClick={() => setShowEditModal(true)}
            >
              Edit Profile
            </Button>
          )}
        </div>
        <div className="max-w-md">
          <div 
            className="bg-white border border-gray-200 rounded-2xl p-8 cursor-pointer hover:shadow-lg transition-all duration-200"
            onClick={() => setShowProfessionalModal(true)}
          >
            {/* Avatar Section - Left Aligned */}
            <div className="flex items-start space-x-4 mb-6">
              <div className="relative">
                <div className="relative group">
                  <Avatar
                    src={profile.personalInfo.avatarUrl}
                    name={getProfileDisplayName(profile)}
                    size="lg"
                    className="w-24 h-24 cursor-pointer"
                  />
                  {isOwnProfile && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Camera className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
                {/* Verification Badge */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              {/* Profile Info - Left Aligned */}
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  {getProfileDisplayName(profile)}
                </h1>
                <p className="text-gray-600">
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
                  {profile.businessOwnerData?.previousVentures?.filter(venture => 
                    venture.outcome && (venture.outcome.includes('Exit') || venture.outcome.includes('Sold'))
                  ).length || 0}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Years on UpSwitch</span>
                <span className="font-semibold text-gray-900">
                  {new Date().getFullYear() - new Date(profile.sharedData.platformActivity.memberSince).getFullYear()}
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

      {/* Profile Edit Fullscreen Modal */}
      {isOwnProfile && (
        <ProfileEditFullscreenModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          profile={profile}
          onSave={handleProfileUpdate}
        />
      )}
    </div>
  );
};

export default RoleBasedProfilePage;
