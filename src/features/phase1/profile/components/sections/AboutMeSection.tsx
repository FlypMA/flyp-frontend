/**
 * 👤 About Me Section
 *
 * Comprehensive "About Me" section for profile management
 * Displays and allows editing of personal and professional information
 *
 * @author Senior CTO
 * @version 1.0.0
 */

import { Button } from '@/shared/components/buttons';
import { Avatar } from '@heroui/react';
import { Building2, Camera, CheckCircle, PenLine } from 'lucide-react';
import React, { useState } from 'react';

import { useAuth } from '@/app/providers/auth-provider';
import { useProfile } from '../../hooks/useProfile';
import { ProfessionalBackgroundModal } from '../ProfessionalBackgroundModal';
import ProfileEditFullscreenModal from '../ProfileEditFullscreenModal';

// =============================================================================
// ABOUT ME SECTION COMPONENT
// =============================================================================

export const AboutMeSection: React.FC = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isProfessionalModalOpen, setIsProfessionalModalOpen] = useState(false);

  // =============================================================================
  // EVENT HANDLERS
  // =============================================================================

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const handleSaveProfile = (_updatedProfile: Partial<Record<string, unknown>>) => {
    // TODO: Implement profile update logic
    // Profile update logic will be implemented here
    setIsEditModalOpen(false);
  };

  // =============================================================================
  // RENDER HELPERS
  // =============================================================================

  const renderAboutMeCard = () => (
    <div className="max-w-md">
      <div
        className="bg-white border border-gray-200 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all duration-200"
        onClick={() => setIsProfessionalModalOpen(true)}
      >
        {/* Profile Header */}
        <div className="flex items-start space-x-4 mb-6">
          <div className="relative">
            <div className="relative group">
              <Avatar
                src={
                  profile?.personalInfo?.avatarUrl ||
                  user?.avatar ||
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
                }
                name={profile?.personalInfo?.firstName || user?.name || 'John Doe'}
                size="lg"
                className="w-24 h-24 cursor-pointer"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <CheckCircle className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {profile?.personalInfo?.firstName && profile?.personalInfo?.lastName
                ? `${profile.personalInfo.firstName} ${profile.personalInfo.lastName}`
                : user?.name || 'John Doe'}
            </h1>
            <p className="text-gray-600">
              {profile?.personalInfo?.city && profile?.personalInfo?.country
                ? `${profile.personalInfo.city}, ${profile.personalInfo.country}`
                : 'Amsterdam, Netherlands'}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Owned businesses</span>
            <span className="font-semibold text-gray-900">
              {profile?.businessOwnerData?.previousVentures?.length || 1}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Exits</span>
            <span className="font-semibold text-gray-900">
              {profile?.businessOwnerData?.previousVentures?.filter(
                venture =>
                  venture.outcome &&
                  (venture.outcome.includes('Exit') || venture.outcome.includes('Sold'))
              ).length || 0}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Years on UpSwitch</span>
            <span className="font-semibold text-gray-900">5</span>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
            {profile?.personalInfo?.bio ||
              'Experienced entrepreneur with a passion for technology and innovation.'}
          </p>
        </div>
      </div>
    </div>
  );

  const renderMyBusinesses = () => (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">My Businesses</h2>
      </div>
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer">
            <div className="w-12 h-12 bg-gray-50 rounded-lg mb-4 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-gray-500" />
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900 text-sm leading-tight">
                {profile?.businessOwnerData?.previousVentures?.[0]?.name || 'Digital Solutions Ltd'}
              </h3>
              <p className="text-xs text-gray-500">
                {profile?.personalInfo?.industry || 'Technology'}
              </p>
              <p className="text-xs text-gray-400">2015-2018</p>
              <div className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700 mt-2">
                {profile?.businessOwnerData?.previousVentures?.[0]?.outcome ||
                  'Acquired by larger company'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // =============================================================================
  // MAIN RENDER
  // =============================================================================

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* About Me Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-semibold text-gray-900">About Me</h2>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleEditProfile}
            leftIcon={<PenLine className="w-4 h-4" />}
          >
            Edit Profile
          </Button>
        </div>
        {renderAboutMeCard()}
      </div>

      {/* My Businesses Section */}
      {renderMyBusinesses()}

      {/* Edit Profile Modal */}
      {profile && (
        <ProfileEditFullscreenModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          profile={profile}
          onSave={handleSaveProfile}
        />
      )}

      {/* Professional Background Modal */}
      {profile && (
        <ProfessionalBackgroundModal
          isOpen={isProfessionalModalOpen}
          onClose={() => setIsProfessionalModalOpen(false)}
          profile={profile}
        />
      )}
    </div>
  );
};

export default AboutMeSection;
