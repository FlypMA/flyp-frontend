/**
 * 💬 Communication Preferences Component
 *
 * Component for managing communication preferences and settings
 */

import { Button } from '@/shared/components/buttons';
import { Card, CardBody, CardHeader, Input, Select, SelectItem, Switch } from '@heroui/react';
import { Clock, MessageCircle, Settings } from 'lucide-react';
import React, { useState } from 'react';
import { CommunicationPreferences as CommunicationPreferencesType } from '../types/profile.types';

// =============================================================================
// COMPONENT INTERFACE
// =============================================================================

interface CommunicationPreferencesProps {
  preferences: CommunicationPreferencesType;
  // eslint-disable-next-line no-unused-vars
  onUpdate?: (preferences: Partial<CommunicationPreferencesType>) => void;
  className?: string;
}

// =============================================================================
// COMMUNICATION PREFERENCES COMPONENT
// =============================================================================

export const CommunicationPreferences: React.FC<CommunicationPreferencesProps> = ({
  preferences: _preferences,
  onUpdate,
  className = '',
}) => {
  const [localPreferences, setLocalPreferences] =
    useState<CommunicationPreferencesType>(_preferences);
  const [isEditing, setIsEditing] = useState(false);

  // =============================================================================
  // EVENT HANDLERS
  // =============================================================================

  const handleFieldChange = (field: string, value: unknown) => {
    const updatedPreferences = { ...localPreferences, [field]: value };
    setLocalPreferences(updatedPreferences);
  };

  const handleNestedFieldChange = (parentField: string, field: string, value: unknown) => {
    const parentValue = localPreferences[parentField as keyof CommunicationPreferencesType];
    const updatedPreferences = {
      ...localPreferences,
      [parentField]: {
        ...(parentValue && typeof parentValue === 'object' ? parentValue : {}),
        [field]: value,
      },
    };
    setLocalPreferences(updatedPreferences);
  };

  const handleSave = () => {
    onUpdate?.(localPreferences);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalPreferences(_preferences);
    setIsEditing(false);
  };

  // =============================================================================
  // RENDER HELPERS
  // =============================================================================

  const renderContactPreferences = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Contact Method
        </label>
        {isEditing ? (
          <Select
            value={localPreferences.preferredContactMethod}
            onChange={value => handleFieldChange('preferredContactMethod', value)}
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
            <span className="text-gray-900">{localPreferences.preferredContactMethod}</span>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Response Time Commitment
        </label>
        {isEditing ? (
          <Select
            value={localPreferences.responseTimeCommitment}
            onChange={value => handleFieldChange('responseTimeCommitment', value)}
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
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900">{localPreferences.responseTimeCommitment}</span>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Communication Style</label>
        {isEditing ? (
          <Select
            value={localPreferences.communicationStyle}
            onChange={value => handleFieldChange('communicationStyle', value)}
            placeholder="Select communication style"
            variant="bordered"
          >
            <SelectItem key="formal">Formal</SelectItem>
            <SelectItem key="professional">Professional</SelectItem>
            <SelectItem key="casual">Casual</SelectItem>
          </Select>
        ) : (
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900">{localPreferences.communicationStyle}</span>
          </div>
        )}
      </div>
    </div>
  );

  const renderLanguagePreferences = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Language Preferences</label>
        {isEditing ? (
          <Select
            value={localPreferences.languagePreferences}
            onChange={value => handleFieldChange('languagePreferences', value)}
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
            {localPreferences.languagePreferences.map(lang => (
              <span key={lang} className="px-2 py-1 bg-primary-100 text-primary-800 text-sm rounded">
                {lang.toUpperCase()}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderAvailabilitySchedule = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Working Hours Start
          </label>
          {isEditing ? (
            <Input
              type="time"
              value={localPreferences.availabilitySchedule.workingHours.start}
              onChange={e =>
                handleNestedFieldChange('availabilitySchedule', 'workingHours', {
                  ...localPreferences.availabilitySchedule.workingHours,
                  start: e.target.value,
                })
              }
              variant="bordered"
            />
          ) : (
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">
                {localPreferences.availabilitySchedule.workingHours.start}
              </span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Working Hours End</label>
          {isEditing ? (
            <Input
              type="time"
              value={localPreferences.availabilitySchedule.workingHours.end}
              onChange={e =>
                handleNestedFieldChange('availabilitySchedule', 'workingHours', {
                  ...localPreferences.availabilitySchedule.workingHours,
                  end: e.target.value,
                })
              }
              variant="bordered"
            />
          ) : (
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">
                {localPreferences.availabilitySchedule.workingHours.end}
              </span>
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Working Days</label>
        {isEditing ? (
          <Select
            value={localPreferences.availabilitySchedule.workingHours.days}
            onChange={value =>
              handleNestedFieldChange('availabilitySchedule', 'workingHours', {
                ...localPreferences.availabilitySchedule.workingHours,
                days: value,
              })
            }
            placeholder="Select working days"
            variant="bordered"
            selectionMode="multiple"
          >
            <SelectItem key="monday">Monday</SelectItem>
            <SelectItem key="tuesday">Tuesday</SelectItem>
            <SelectItem key="wednesday">Wednesday</SelectItem>
            <SelectItem key="thursday">Thursday</SelectItem>
            <SelectItem key="friday">Friday</SelectItem>
            <SelectItem key="saturday">Saturday</SelectItem>
            <SelectItem key="sunday">Sunday</SelectItem>
          </Select>
        ) : (
          <div className="flex flex-wrap gap-2">
            {localPreferences.availabilitySchedule.workingHours.days.map(day => (
              <span key={day} className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-700">Emergency Contact</label>
          <p className="text-xs text-gray-500">Allow emergency contact outside working hours</p>
        </div>
        <Switch
          isSelected={localPreferences.availabilitySchedule.emergencyContact}
          onValueChange={value =>
            handleNestedFieldChange('availabilitySchedule', 'emergencyContact', value)
          }
          isDisabled={!isEditing}
        />
      </div>
    </div>
  );

  const renderMeetingPreferences = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Meeting Format
        </label>
        {isEditing ? (
          <Select
            value={localPreferences.meetingPreferences.preferredFormat}
            onChange={value =>
              handleNestedFieldChange('meetingPreferences', 'preferredFormat', value)
            }
            placeholder="Select meeting format"
            variant="bordered"
            selectionMode="multiple"
          >
            <SelectItem key="video">Video Call</SelectItem>
            <SelectItem key="phone">Phone Call</SelectItem>
            <SelectItem key="in-person">In-Person</SelectItem>
          </Select>
        ) : (
          <div className="flex flex-wrap gap-2">
            {localPreferences.meetingPreferences.preferredFormat.map(format => (
              <span
                key={format}
                className="px-2 py-1 bg-purple-100 text-purple-800 text-sm rounded"
              >
                {format.charAt(0).toUpperCase() + format.slice(1)}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Meeting Times
          </label>
          {isEditing ? (
            <Select
              value={localPreferences.meetingPreferences.preferredTimes}
              onChange={value =>
                handleNestedFieldChange('meetingPreferences', 'preferredTimes', value)
              }
              placeholder="Select preferred times"
              variant="bordered"
              selectionMode="multiple"
            >
              <SelectItem key="morning">Morning</SelectItem>
              <SelectItem key="afternoon">Afternoon</SelectItem>
              <SelectItem key="evening">Evening</SelectItem>
            </Select>
          ) : (
            <div className="flex flex-wrap gap-2">
              {localPreferences.meetingPreferences.preferredTimes.map(time => (
                <span
                  key={time}
                  className="px-2 py-1 bg-orange-100 text-orange-800 text-sm rounded"
                >
                  {time.charAt(0).toUpperCase() + time.slice(1)}
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Duration</label>
          {isEditing ? (
            <Select
              value={localPreferences.meetingPreferences.meetingDuration}
              onChange={value =>
                handleNestedFieldChange('meetingPreferences', 'meetingDuration', value)
              }
              placeholder="Select duration"
              variant="bordered"
            >
              <SelectItem key="30">30 minutes</SelectItem>
              <SelectItem key="60">1 hour</SelectItem>
              <SelectItem key="90">1.5 hours</SelectItem>
              <SelectItem key="120">2 hours</SelectItem>
            </Select>
          ) : (
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">
                {localPreferences.meetingPreferences.meetingDuration} minutes
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-700">Calendar Integration</label>
          <p className="text-xs text-gray-500">Sync with your calendar for availability</p>
        </div>
        <Switch
          isSelected={localPreferences.meetingPreferences.calendarIntegration}
          onValueChange={value =>
            handleNestedFieldChange('meetingPreferences', 'calendarIntegration', value)
          }
          isDisabled={!isEditing}
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-700">Preparation Required</label>
          <p className="text-xs text-gray-500">Require preparation before meetings</p>
        </div>
        <Switch
          isSelected={localPreferences.meetingPreferences.preparationRequired}
          onValueChange={value =>
            handleNestedFieldChange('meetingPreferences', 'preparationRequired', value)
          }
          isDisabled={!isEditing}
        />
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Email Notifications</label>
              <p className="text-xs text-gray-500">Receive notifications via email</p>
            </div>
            <Switch
              isSelected={localPreferences.notificationSettings.emailNotifications}
              onValueChange={value =>
                handleNestedFieldChange('notificationSettings', 'emailNotifications', value)
              }
              isDisabled={!isEditing}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Push Notifications</label>
              <p className="text-xs text-gray-500">Receive push notifications</p>
            </div>
            <Switch
              isSelected={localPreferences.notificationSettings.pushNotifications}
              onValueChange={value =>
                handleNestedFieldChange('notificationSettings', 'pushNotifications', value)
              }
              isDisabled={!isEditing}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">SMS Notifications</label>
              <p className="text-xs text-gray-500">Receive SMS notifications</p>
            </div>
            <Switch
              isSelected={localPreferences.notificationSettings.smsNotifications}
              onValueChange={value =>
                handleNestedFieldChange('notificationSettings', 'smsNotifications', value)
              }
              isDisabled={!isEditing}
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Marketing Emails</label>
              <p className="text-xs text-gray-500">Receive marketing communications</p>
            </div>
            <Switch
              isSelected={localPreferences.notificationSettings.marketingEmails}
              onValueChange={value =>
                handleNestedFieldChange('notificationSettings', 'marketingEmails', value)
              }
              isDisabled={!isEditing}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Listing Updates</label>
              <p className="text-xs text-gray-500">Get notified about listing changes</p>
            </div>
            <Switch
              isSelected={localPreferences.notificationSettings.listingUpdates}
              onValueChange={value =>
                handleNestedFieldChange('notificationSettings', 'listingUpdates', value)
              }
              isDisabled={!isEditing}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Message Notifications</label>
              <p className="text-xs text-gray-500">Get notified about new messages</p>
            </div>
            <Switch
              isSelected={localPreferences.notificationSettings.messageNotifications}
              onValueChange={value =>
                handleNestedFieldChange('notificationSettings', 'messageNotifications', value)
              }
              isDisabled={!isEditing}
            />
          </div>
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
            <MessageCircle className="w-5 h-5 text-primary-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Communication Preferences</h3>
              <p className="text-gray-600 text-sm">
                Manage how you prefer to communicate and be contacted
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <Button variant="secondary" color="default" size="sm" onPress={handleCancel}>
                  Cancel
                </Button>
                <Button variant="primary" color="primary" size="sm" onPress={handleSave}>
                  Save Changes
                </Button>
              </>
            ) : (
              <Button
                variant="secondary"
                color="primary"
                size="sm"
                onPress={() => setIsEditing(true)}
                startContent={<Settings className="w-4 h-4" />}
              >
                Edit Preferences
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardBody className="pt-0">
        <div className="space-y-8">
          {/* Contact Preferences */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">Contact Preferences</h4>
            {renderContactPreferences()}
          </div>

          {/* Language Preferences */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">Language Preferences</h4>
            {renderLanguagePreferences()}
          </div>

          {/* Availability Schedule */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">Availability Schedule</h4>
            {renderAvailabilitySchedule()}
          </div>

          {/* Meeting Preferences */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">Meeting Preferences</h4>
            {renderMeetingPreferences()}
          </div>

          {/* Notification Settings */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">Notification Settings</h4>
            {renderNotificationSettings()}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CommunicationPreferences;
