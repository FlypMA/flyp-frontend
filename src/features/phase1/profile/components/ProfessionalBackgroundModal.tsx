/**
 * 📄 Professional Background Modal
 *
 * Detailed resume-style modal showing comprehensive professional information
 * Opens when user clicks on professional background preview card
 */

import { CenteredModal } from '@/shared/components/modals/foundations/CenteredModal';
import { Avatar } from '@heroui/react';
import React from 'react';
import { Profile } from '../types/profile.types';
import { getProfileDisplayName } from '../utils/profileHelpers';

// =============================================================================
// COMPONENT INTERFACE
// =============================================================================

interface ProfessionalBackgroundModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
}

// =============================================================================
// PROFESSIONAL BACKGROUND MODAL COMPONENT
// =============================================================================

export const ProfessionalBackgroundModal: React.FC<ProfessionalBackgroundModalProps> = ({
  isOpen,
  onClose,
  profile,
}) => {
  // =============================================================================
  // RENDER HELPERS
  // =============================================================================

      const renderPersonalInfo = () => (
        <div className="border border-gray-300 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-black mb-4 pb-2 border-b border-gray-200">
            Personal Information
          </h3>
          <div className="space-y-4">
            <div>
              <span className="font-medium text-black">Location</span>
              <p className="text-gray-700 mt-1">{profile.personalInfo.city}, {profile.personalInfo.country}</p>
            </div>
            <div>
              <span className="font-medium text-black">Timezone</span>
              <p className="text-gray-700 mt-1">{profile.personalInfo.timezone || 'Not specified'}</p>
            </div>
          </div>
        </div>
      );

  const renderWorkEducation = () => (
    <div className="border border-gray-300 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-black mb-4 pb-2 border-b border-gray-200">
        Work & Education
      </h3>
      <div className="space-y-4">
        <div>
          <span className="font-medium text-black">Current Role</span>
          <p className="text-gray-700 mt-1">{profile.personalInfo.professionalTitle || 'Not specified'}</p>
        </div>
        <div>
          <span className="font-medium text-black">Company</span>
          <p className="text-gray-700 mt-1">{profile.personalInfo.company || 'Not specified'}</p>
        </div>
        <div>
          <span className="font-medium text-black">Industry</span>
          <p className="text-gray-700 mt-1">{profile.personalInfo.industry || 'Not specified'}</p>
        </div>
        <div>
          <span className="font-medium text-black">Education</span>
          <p className="text-gray-700 mt-1 leading-relaxed">{profile.personalInfo.professionalSummary || 'Not specified'}</p>
        </div>
      </div>
    </div>
  );

  const renderBusinessMetrics = () => (
    <div className="border border-gray-300 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-black mb-4 pb-2 border-b border-gray-200">
        My Businesses
      </h3>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="text-2xl font-bold text-black mb-1">
              {profile.businessOwnerData?.previousVentures?.length || 0}
            </div>
            <div className="text-sm text-gray-600">Owned Businesses</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-black mb-1">
              {profile.businessOwnerData?.previousVentures?.filter(venture => 
                venture.outcome && (venture.outcome.includes('Exit') || venture.outcome.includes('Sold'))
              ).length || 0}
            </div>
            <div className="text-sm text-gray-600">Exits</div>
          </div>
        </div>
        <div className="pt-4 border-t border-gray-200">
          <div>
            <span className="font-medium text-black">Portfolio Notes</span>
            <p className="text-gray-700 mt-1 leading-relaxed">
              {profile.businessOwnerData?.reasonForSelling || 'No additional notes provided'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBio = () => (
    <div className="border border-gray-300 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-black mb-4 pb-2 border-b border-gray-200">
        About Me
      </h3>
      <div className="text-gray-700 leading-relaxed">
        {profile.personalInfo.bio || 'No bio provided yet.'}
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="border border-gray-300 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-black mb-4 pb-2 border-b border-gray-200">
        Key Achievements
      </h3>
      <div className="text-gray-700 leading-relaxed">
        {profile.businessOwnerData?.keyAchievements?.map(a => a.title).join(', ') || 
         'Experienced entrepreneur with a track record of building and scaling successful businesses in the technology sector.'}
      </div>
    </div>
  );



  // =============================================================================
  // MAIN RENDER
  // =============================================================================

  return (
        <CenteredModal
          isOpen={isOpen}
          onClose={onClose}
          size="4xl"
          title="About me"
          className="max-h-[90vh]"
        >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-gray-200">
          <Avatar
            src={profile.personalInfo.avatarUrl}
            name={getProfileDisplayName(profile)}
            size="lg"
            className="w-16 h-16 border border-gray-300"
          />
          <div>
            <h2 className="text-2xl font-bold text-black">
              {getProfileDisplayName(profile)}
            </h2>
            <p className="text-gray-700">
              {profile.personalInfo.professionalTitle || 'Professional'}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 max-h-[60vh] overflow-y-auto">
          {renderPersonalInfo()}
          {renderWorkEducation()}
          {renderBio()}
          {renderAchievements()}
          {(profile.role === 'seller' || profile.role === 'both') && renderBusinessMetrics()}
        </div>
      </div>
    </CenteredModal>
  );
};

export default ProfessionalBackgroundModal;
