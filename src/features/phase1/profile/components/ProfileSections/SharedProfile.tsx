/**
 * 🤝 Shared Profile Section
 *
 * Shared profile information section for all user types
 */

import { Button } from '@/shared/components/buttons';
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Switch,
  Textarea,
} from '@heroui/react';
import { Bell, Globe, MapPin, MessageCircle, User } from 'lucide-react';
import React, { useState } from 'react';
import { Profile, SharedProfileData } from '../../types/profile.types';

// =============================================================================
// COMPONENT INTERFACE
// =============================================================================

interface SharedProfileProps {
  profile: Profile;
  isEditing?: boolean;
  onUpdate?: (data: Partial<SharedProfileData>) => void;
  onFieldUpdate?: (field: string, value: any) => void;
  className?: string;
}

// =============================================================================
// SHARED PROFILE COMPONENT
// =============================================================================

export const SharedProfile: React.FC<SharedProfileProps> = ({
  profile,
  isEditing = false,
  onUpdate,
  onFieldUpdate,
  className = '',
}) => {
  const [localData, setLocalData] = useState<Partial<SharedProfileData>>(profile.sharedData || {});

  // =============================================================================
  // EVENT HANDLERS
  // =============================================================================

  const handleFieldChange = (field: string, value: any) => {
    const updatedData = { ...localData, [field]: value };
    setLocalData(updatedData);
    onFieldUpdate?.(field, value);
  };

  const handleSave = () => {
    onUpdate?.(localData);
  };

  // =============================================================================
  // RENDER HELPERS
  // =============================================================================

  const renderPersonalInfo = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          {isEditing ? (
            <Input
              value={profile.personalInfo.firstName}
              onChange={e => onFieldUpdate?.('firstName', e.target.value)}
              placeholder="Enter your first name"
              variant="bordered"
            />
          ) : (
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">{profile.personalInfo.firstName}</span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          {isEditing ? (
            <Input
              value={profile.personalInfo.lastName}
              onChange={e => onFieldUpdate?.('lastName', e.target.value)}
              placeholder="Enter your last name"
              variant="bordered"
            />
          ) : (
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">{profile.personalInfo.lastName}</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Professional Title</label>
          {isEditing ? (
            <Input
              value={profile.personalInfo.professionalTitle || ''}
              onChange={e => onFieldUpdate?.('professionalTitle', e.target.value)}
              placeholder="e.g., CEO, Managing Director"
              variant="bordered"
            />
          ) : (
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">
                {profile.personalInfo.professionalTitle || 'Not specified'}
              </span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
          {isEditing ? (
            <Input
              value={profile.personalInfo.company || ''}
              onChange={e => onFieldUpdate?.('company', e.target.value)}
              placeholder="Enter your company name"
              variant="bordered"
            />
          ) : (
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">
                {profile.personalInfo.company || 'Not specified'}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          {isEditing ? (
            <Input
              value={profile.personalInfo.city || ''}
              onChange={e => onFieldUpdate?.('city', e.target.value)}
              placeholder="Enter your city"
              variant="bordered"
            />
          ) : (
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">{profile.personalInfo.city || 'Not specified'}</span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
          {isEditing ? (
            <Select
              value={profile.personalInfo.country}
              onChange={value => onFieldUpdate?.('country', value)}
              placeholder="Select your country"
              variant="bordered"
            >
              <SelectItem key="BE">Belgium</SelectItem>
              <SelectItem key="NL">Netherlands</SelectItem>
              <SelectItem key="FR">France</SelectItem>
              <SelectItem key="DE">Germany</SelectItem>
              <SelectItem key="UK">United Kingdom</SelectItem>
              <SelectItem key="US">United States</SelectItem>
            </Select>
          ) : (
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">{profile.personalInfo.country}</span>
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
        {isEditing ? (
          <Textarea
            value={profile.personalInfo.bio || ''}
            onChange={e => onFieldUpdate?.('bio', e.target.value)}
            placeholder="Tell us about yourself and your professional background..."
            variant="bordered"
            minRows={4}
          />
        ) : (
          <div className="text-gray-900">{profile.personalInfo.bio || 'No bio provided'}</div>
        )}
      </div>
    </div>
  );

  const renderCommunicationPreferences = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Contact Method
          </label>
          {isEditing ? (
            <Select
              value={localData.communication?.preferredContactMethod || ''}
              onChange={value =>
                handleFieldChange('communication', {
                  ...localData.communication,
                  preferredContactMethod: value,
                })
              }
              placeholder="Select contact method"
              variant="bordered"
            >
              <SelectItem key="email">Email</SelectItem>
              <SelectItem key="phone">Phone</SelectItem>
              <SelectItem key="platform">Platform Messaging</SelectItem>
              <SelectItem key="any">Any Method</SelectItem>
            </Select>
          ) : (
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">
                {localData.communication?.preferredContactMethod || 'Not specified'}
              </span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Response Time Commitment
          </label>
          {isEditing ? (
            <Select
              value={localData.communication?.responseTimeCommitment || ''}
              onChange={value =>
                handleFieldChange('communication', {
                  ...localData.communication,
                  responseTimeCommitment: value,
                })
              }
              placeholder="Select response time"
              variant="bordered"
            >
              <SelectItem key="immediate">Immediate (within hours)</SelectItem>
              <SelectItem key="24-hours">Within 24 hours</SelectItem>
              <SelectItem key="48-hours">Within 48 hours</SelectItem>
              <SelectItem key="1-week">Within 1 week</SelectItem>
              <SelectItem key="flexible">Flexible</SelectItem>
            </Select>
          ) : (
            <div className="flex items-center space-x-2">
              <Bell className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">
                {localData.communication?.responseTimeCommitment || 'Not specified'}
              </span>
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Language Preferences</label>
        {isEditing ? (
          <Select
            value={localData.communication?.languagePreferences || []}
            onChange={value =>
              handleFieldChange('communication', {
                ...localData.communication,
                languagePreferences: value,
              })
            }
            placeholder="Select languages"
            variant="bordered"
            selectionMode="multiple"
          >
            <SelectItem key="en">English</SelectItem>
            <SelectItem key="nl">Dutch</SelectItem>
            <SelectItem key="fr">French</SelectItem>
            <SelectItem key="de">German</SelectItem>
            <SelectItem key="es">Spanish</SelectItem>
            <SelectItem key="it">Italian</SelectItem>
          </Select>
        ) : (
          <div className="flex flex-wrap gap-2">
            {localData.communication?.languagePreferences?.map(lang => (
              <span key={lang} className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                {lang.toUpperCase()}
              </span>
            )) || <span className="text-gray-500 text-sm">No languages specified</span>}
          </div>
        )}
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
        {isEditing ? (
          <Select
            value={localData.privacy?.profileVisibility || ''}
            onChange={value =>
              handleFieldChange('privacy', {
                ...localData.privacy,
                profileVisibility: value,
              })
            }
            placeholder="Select visibility"
            variant="bordered"
          >
            <SelectItem key="public">Public (everyone)</SelectItem>
            <SelectItem key="verified-only">Verified users only</SelectItem>
            <SelectItem key="private">Private (invite only)</SelectItem>
          </Select>
        ) : (
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900">
              {localData.privacy?.profileVisibility || 'Not specified'}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">Show Email Address</label>
            <p className="text-xs text-gray-500">Allow others to see your email</p>
          </div>
          <Switch
            isSelected={localData.privacy?.showEmail || false}
            onValueChange={value =>
              handleFieldChange('privacy', {
                ...localData.privacy,
                showEmail: value,
              })
            }
            isDisabled={!isEditing}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">Show Phone Number</label>
            <p className="text-xs text-gray-500">Allow others to see your phone</p>
          </div>
          <Switch
            isSelected={localData.privacy?.showPhone || false}
            onValueChange={value =>
              handleFieldChange('privacy', {
                ...localData.privacy,
                showPhone: value,
              })
            }
            isDisabled={!isEditing}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">Allow Direct Messages</label>
            <p className="text-xs text-gray-500">Let others send you messages</p>
          </div>
          <Switch
            isSelected={localData.privacy?.allowMessages || false}
            onValueChange={value =>
              handleFieldChange('privacy', {
                ...localData.privacy,
                allowMessages: value,
              })
            }
            isDisabled={!isEditing}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">Make Profile Searchable</label>
            <p className="text-xs text-gray-500">Allow your profile to appear in searches</p>
          </div>
          <Switch
            isSelected={localData.privacy?.searchable || false}
            onValueChange={value =>
              handleFieldChange('privacy', {
                ...localData.privacy,
                searchable: value,
              })
            }
            isDisabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );

  // =============================================================================
  // MAIN RENDER
  // =============================================================================

  return (
    <Card className={`border border-gray-200 shadow-sm ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-purple-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
              <p className="text-gray-600 text-sm">
                Your basic profile information and preferences
              </p>
            </div>
          </div>
          {isEditing && (
            <Button variant="primary" color="primary" size="sm" onPress={handleSave}>
              Save Changes
            </Button>
          )}
        </div>
      </CardHeader>
      <CardBody className="pt-0">
        <div className="space-y-8">
          {/* Personal Information */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">Basic Information</h4>
            {renderPersonalInfo()}
          </div>

          {/* Communication Preferences */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">Communication Preferences</h4>
            {renderCommunicationPreferences()}
          </div>

          {/* Privacy Settings */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">Privacy Settings</h4>
            {renderPrivacySettings()}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default SharedProfile;
