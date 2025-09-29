/**
 * 👤 Profile Edit Fullscreen Modal
 *
 * Full-screen modal for editing user profile, inspired by Airbnb's profile edit design
 */

import { Button } from '@/shared/components/buttons';
import { CustomDropdown, CustomInputField, CustomTextarea } from '@/shared/components/forms';
import { FullscreenModal } from '@/shared/components/modals/foundations/FullscreenModal';
import { Avatar, Divider } from '@heroui/react';
import { Briefcase, Building2, Camera, MapPin, User } from 'lucide-react';
import React, { useState } from 'react';
import { useLinkedIn } from '../hooks/useLinkedIn';
import { Profile } from '../types/profile.types';
import { getProfileDisplayName, getProfileLocationDisplayName } from '../utils/profileHelpers';

// =============================================================================
// COMPONENT INTERFACE
// =============================================================================

interface ProfileEditFullscreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
  onSave: (_updatedProfile: Partial<Profile>) => void;
  onImageUpload?: (_file: File) => void;
  onImageDelete?: () => void;
}

// =============================================================================
// PROFILE EDIT FULLSCREEN MODAL COMPONENT
// =============================================================================

export const ProfileEditFullscreenModal: React.FC<ProfileEditFullscreenModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
  onImageUpload,
  onImageDelete,
}) => {
  const [editedProfile, setEditedProfile] = useState<Partial<Profile>>(profile);
  const [showImageMenu, setShowImageMenu] = useState(false);

  // LinkedIn integration
  const {
    connectLinkedIn,
    isLoading: linkedInLoading,
    importProfile,
  } = useLinkedIn({
    onSuccess: linkedInData => {
      // Merge LinkedIn data with current form data
      setEditedProfile(prev => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          ...linkedInData.personalInfo,
        },
        businessOwnerData: linkedInData.businessData
          ? {
              ...prev.businessOwnerData,
              ...linkedInData.businessData,
            }
          : prev.businessOwnerData,
        investorData: linkedInData.investorData
          ? {
              ...prev.investorData,
              ...linkedInData.investorData,
            }
          : prev.investorData,
      }));
    },
    onError: error => {
      // TODO: Show error notification
      // LinkedIn import failed: error
    },
  });

  // =============================================================================
  // EVENT HANDLERS
  // =============================================================================

  const handleInputChange = (field: string, value: string | boolean) => {
    setEditedProfile(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onImageUpload) {
      onImageUpload(file);
    }
  };

  const handleSave = () => {
    onSave(editedProfile);
    onClose();
  };

  // =============================================================================
  // RENDER HELPERS
  // =============================================================================

  const renderProfileSection = (title: string, children: React.ReactNode) => (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      {children}
    </div>
  );

  const renderEditableField = (
    label: string,
    value: string,
    field: string,
    type: 'text' | 'textarea' | 'select' | 'number' = 'text',
    options?: { value: string; label: string }[],
    icon?: React.ReactNode,
    placeholder?: string
  ) => (
    <div className="mb-6">
      {type === 'textarea' ? (
        <CustomTextarea
          label={label}
          value={value}
          onChange={e => handleInputChange(field, e.target.value)}
          onBlur={() => {}}
          name={field}
          placeholder={placeholder || `Add ${label.toLowerCase()}`}
          className="w-full"
          rows={3}
        />
      ) : type === 'select' && options ? (
        <CustomDropdown
          label={label}
          value={value}
          onChange={value => handleInputChange(field, value)}
          options={options}
          placeholder={placeholder || `Select ${label.toLowerCase()}`}
          className="w-full"
        />
      ) : type === 'number' ? (
        <CustomInputField
          label={label}
          type="number"
          value={value}
          onChange={e => handleInputChange(field, e.target.value)}
          placeholder={placeholder || `Enter ${label.toLowerCase()}`}
          className="w-full"
        />
      ) : (
        <CustomInputField
          label={label}
          type="text"
          value={value}
          onChange={e => handleInputChange(field, e.target.value)}
          placeholder={placeholder || `Add ${label.toLowerCase()}`}
          className="w-full"
        />
      )}
    </div>
  );

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <FullscreenModal
      isOpen={isOpen}
      onClose={onClose}
      title="Mijn profiel"
      className="profile-edit-modal"
    >
      <div className="h-full overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6">
          {/* Profile Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-6 mb-6">
              <div className="relative group">
                <Avatar
                  src={profile.personalInfo.avatarUrl}
                  name={getProfileDisplayName(profile)}
                  size="lg"
                  className="w-24 h-24 cursor-pointer"
                  onClick={() => setShowImageMenu(!showImageMenu)}
                />

                {showImageMenu && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="py-1">
                      <label className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                        <Camera className="w-4 h-4 mr-2" />
                        Upload Photo
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
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                        >
                          Remove Photo
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {getProfileDisplayName(profile)}
                </h1>
                <p className="text-gray-600">{getProfileLocationDisplayName(profile)}</p>
              </div>
            </div>

            <p className="text-sm text-gray-600">
              Business owners and prospectors can see your profile and it can show up when needed to
              build trust and credibility within the platform and our community.
              <a href="#" className="text-blue-600 hover:underline ml-1">
                Learn more
              </a>
            </p>
          </div>

          <Divider className="my-8" />

          {/* LinkedIn Import Section */}
          <div className="mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Import your professional information from LinkedIn
                  </h3>
                  <p className="text-sm text-gray-600">
                    Automatically populate your profile with your LinkedIn data including work
                    experience, education, and professional details.
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={connectLinkedIn}
                  disabled={linkedInLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 whitespace-nowrap"
                >
                  {linkedInLoading ? 'Importing...' : 'Import from LinkedIn'}
                </Button>
              </div>
            </div>
          </div>

          <Divider className="my-8" />

          {/* Personal Information Section */}
          {renderProfileSection(
            'Personal Information',
            <div className="space-y-6">
              {renderEditableField(
                'Full Name',
                getProfileDisplayName(profile),
                'fullName',
                'text',
                undefined,
                <User className="w-4 h-4" />,
                'Your full name as it appears on your profile'
              )}

              {renderEditableField(
                'Where you live',
                getProfileLocationDisplayName(profile),
                'location',
                'text',
                undefined,
                <MapPin className="w-4 h-4" />,
                'City, Country'
              )}

              {renderEditableField(
                'Timezone',
                profile.personalInfo.timezone || '',
                'timezone',
                'select',
                [
                  { value: 'Europe/Amsterdam', label: 'Europe/Amsterdam' },
                  { value: 'Europe/London', label: 'Europe/London' },
                  { value: 'America/New_York', label: 'America/New York' },
                  { value: 'America/Los_Angeles', label: 'America/Los Angeles' },
                  { value: 'Asia/Tokyo', label: 'Asia/Tokyo' },
                ]
              )}
            </div>
          )}

          <Divider className="my-8" />

          {/* About Section */}
          {renderProfileSection(
            'About Me',
            <div>
              <p className="text-sm text-gray-600 mb-4">
                Tell others about yourself, your background, and what makes you trustworthy in
                business.
              </p>
              {renderEditableField(
                'Bio',
                profile.personalInfo.bio || '',
                'bio',
                'textarea',
                undefined,
                undefined,
                'Share your story, experience, and what drives you in business...'
              )}
            </div>
          )}

          <Divider className="my-8" />

          {/* Work & Education Section */}
          {renderProfileSection(
            'Work & Education',
            <div>
              <p className="text-sm text-gray-600 mb-4">
                Add your work and education information manually or use the LinkedIn import above.
              </p>

              {/* Current Work */}
              {renderEditableField(
                'What do you do for work?',
                profile.personalInfo.professionalTitle || '',
                'professionalTitle',
                'text',
                undefined,
                <Briefcase className="w-4 h-4" />,
                'Your current job title or role'
              )}

              {/* Company */}
              {renderEditableField(
                'Company',
                profile.personalInfo.company || '',
                'company',
                'text',
                undefined,
                <Building2 className="w-4 h-4" />,
                'Where do you currently work?'
              )}

              {/* Industry */}
              {renderEditableField(
                'Industry',
                profile.personalInfo.industry || '',
                'industry',
                'text',
                undefined,
                <Briefcase className="w-4 h-4" />,
                'What industry do you work in?'
              )}

              {/* Education */}
              {renderEditableField(
                'Education',
                profile.personalInfo.professionalSummary || '',
                'education',
                'textarea',
                undefined,
                undefined,
                'Your educational background (university, degree, etc.)'
              )}

              {/* Key Achievements */}
              {renderEditableField(
                'Key Achievements',
                profile.businessOwnerData?.keyAchievements?.map(a => a.title).join(', ') || '',
                'keyAchievements',
                'textarea',
                undefined,
                undefined,
                'Notable accomplishments in your career'
              )}
            </div>
          )}

          <Divider className="my-8" />

          {/* My Businesses Section (for sellers) */}
          {(profile.role === 'seller' || profile.role === 'both') &&
            renderProfileSection(
              'My Businesses',
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  Track your business portfolio. These metrics are automatically tracked by the
                  platform but can be edited here.
                </p>

                {/* Owned Businesses Count */}
                {renderEditableField(
                  'Owned Businesses',
                  profile.businessOwnerData?.previousVentures?.length?.toString() || '0',
                  'ownedBusinesses',
                  'number',
                  undefined,
                  undefined,
                  'Number of businesses you currently own or have owned'
                )}

                {/* Exits Count */}
                {renderEditableField(
                  'Exits',
                  profile.businessOwnerData?.previousVentures
                    ?.filter(
                      venture =>
                        venture.outcome &&
                        (venture.outcome.includes('Exit') || venture.outcome.includes('Sold'))
                    )
                    .length?.toString() || '0',
                  'exits',
                  'number',
                  undefined,
                  undefined,
                  'Number of successful business exits you have completed'
                )}

                {/* Business Portfolio Notes */}
                {renderEditableField(
                  'Business Portfolio Notes',
                  profile.businessOwnerData?.reasonForSelling || '',
                  'businessNotes',
                  'textarea',
                  undefined,
                  undefined,
                  'Additional notes about your business experience and portfolio'
                )}
              </div>
            )}

          {(profile.role === 'seller' || profile.role === 'both') && <Divider className="my-8" />}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <Button variant="tertiary" onClick={onClose} className="px-6">
              Cancel
            </Button>
            <Button onClick={handleSave} className="px-6 bg-blue-600 hover:bg-blue-700 text-white">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </FullscreenModal>
  );
};

export default ProfileEditFullscreenModal;
