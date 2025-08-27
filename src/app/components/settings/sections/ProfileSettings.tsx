import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Button, Avatar, Badge } from '@heroui/react';
import {
  Camera,
  Upload,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  ExternalLink,
  Check,
  AlertCircle,
} from 'lucide-react';
import {
  CleanInput,
  CleanSelect,
  CleanTextarea,
} from '../../ui';
import { User as UserType } from '../../../types/api/users/user';

interface ProfileSettingsProps {
  user: UserType;
  onSave: (data: any) => Promise<void>;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user, onSave }) => {
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: '',
    company: '',
    position: '',
    bio: '',
    location: '',
    website: '',
    linkedin: '',
    timezone: 'Europe/Brussels',
    language: 'English',
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = e => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(profileData);
    } finally {
      setSaving(false);
    }
  };

  const getUserInitials = () => {
    const name = profileData.name || user.name || 'User';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const timezones = [
    'Europe/Brussels',
    'Europe/Amsterdam',
    'Europe/Paris',
    'Europe/Berlin',
    'Europe/London',
    'UTC',
  ];

  const languages = ['English', 'Dutch', 'French', 'German'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600 mt-2">
          Manage your personal information and how others see you on BetweenDeals
        </p>
      </div>

      {/* Profile Picture Section */}
      <Card className="border border-gray-200">
        <CardHeader>
          <h3 className="text-xl font-semibold text-gray-900">Profile Picture</h3>
        </CardHeader>
        <CardBody>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar
                src={previewImage || user.avatar}
                alt={profileData.name}
                className="w-24 h-24 text-lg"
                fallback={
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {getUserInitials()}
                  </div>
                }
              />
              <div className="absolute -bottom-2 -right-2">
                <Badge
                  color="success"
                  shape="circle"
                  size="lg"
                  content={<Check className="w-3 h-3" />}
                >
                  <div className="w-6 h-6" />
                </Badge>
              </div>
            </div>

            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">Upload New Picture</h4>
              <p className="text-sm text-gray-600 mb-4">
                JPG, GIF or PNG. Max size 5MB. Minimum 200x200px.
              </p>
              <div className="flex gap-3">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    as="span"
                    color="primary"
                    variant="flat"
                    size="sm"
                    startContent={<Upload className="w-4 h-4" />}
                  >
                    Upload Photo
                  </Button>
                </label>
                <Button variant="bordered" size="sm" startContent={<Camera className="w-4 h-4" />}>
                  Take Photo
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Personal Information */}
      <Card className="border border-gray-200">
        <CardHeader>
          <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AirbnbCleanInput
              label="Full Name"
              placeholder="Enter your full name"
              value={profileData.name}
              onChange={value => handleCleanInputChange('name', value)}
              id="name"
              required
              startIcon={<User className="w-4 h-4 text-gray-400" />}
              helpText="Your name as it appears to other users"
            />

            <AirbnbCleanInput
              label="Email Address"
              placeholder="your.email@company.com"
              type="email"
              value={profileData.email}
              onChange={value => handleCleanInputChange('email', value)}
              id="email"
              required
              startIcon={<Mail className="w-4 h-4 text-gray-400" />}
              helpText="Primary contact email"
            />

            <CleanInput
              label="Phone Number"
              placeholder="+32 123 456 789"
              type="tel"
              value={profileData.phone}
              onChange={value => handleCleanInputChange('phone', value)}
              id="phone"
              startIcon={<Phone className="w-4 h-4 text-gray-400" />}
              helpText="For important account notifications"
            />

            <CleanInput
              label="Location"
              placeholder="Brussels, Belgium"
              value={profileData.location}
              onChange={value => handleCleanInputChange('location', value)}
              id="location"
              startIcon={<MapPin className="w-4 h-4 text-gray-400" />}
              helpText="Your primary business location"
            />
          </div>

          <Textarea
            label="Professional Bio"
            placeholder="Tell other users about your background, expertise, and what you're looking for..."
            value={profileData.bio}
            onChange={value => handleCleanInputChange('bio', value)}
            id="bio"
            minRows={4}
            helpText="This appears on your public profile and helps build trust with other users"
            showCharCount
            maxLength={500}
          />
        </CardBody>
      </Card>

      {/* Professional Information */}
      <Card className="border border-gray-200">
        <CardHeader>
          <h3 className="text-xl font-semibold text-gray-900">Professional Information</h3>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CleanInput
              label="Company"
              placeholder="Your company name"
              value={profileData.company}
              onChange={value => handleCleanInputChange('company', value)}
              id="company"
              startIcon={<Building2 className="w-4 h-4 text-gray-400" />}
              helpText="Current company or organization"
            />

            <CleanInput
              label="Position"
              placeholder="CEO, Founder, Investment Manager"
              value={profileData.position}
              onChange={value => handleCleanInputChange('position', value)}
              id="position"
              helpText="Your role or title"
            />

            <CleanInput
              label="Website"
              placeholder="https://yourcompany.com"
              type="url"
              value={profileData.website}
              onChange={value => handleCleanInputChange('website', value)}
              id="website"
              startIcon={<ExternalLink className="w-4 h-4 text-gray-400" />}
              helpText="Company or personal website"
            />

            <CleanInput
              label="LinkedIn Profile"
              placeholder="https://linkedin.com/in/yourprofile"
              type="url"
              value={profileData.linkedin}
              onChange={value => handleCleanInputChange('linkedin', value)}
              id="linkedin"
              helpText="Professional networking profile"
            />
          </div>
        </CardBody>
      </Card>

      {/* Preferences */}
      <Card className="border border-gray-200">
        <CardHeader>
          <h3 className="text-xl font-semibold text-gray-900">Preferences</h3>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CleanSelect
              label="Timezone"
              placeholder="Select your timezone"
              value={profileData.timezone}
              onChange={value => handleInputChange('timezone', value)}
              options={timezones}
              helpText="Used for scheduling and notifications"
              id="timezone"
            />

            <CleanSelect
              label="Language"
              placeholder="Select your language"
              value={profileData.language}
              onChange={value => handleInputChange('language', value)}
              options={languages}
              helpText="Interface language preference"
              id="language"
            />
          </div>
        </CardBody>
      </Card>

      {/* Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FormTip
          title="Complete Your Profile"
          content="A complete profile with photo and bio increases trust and helps you connect with serious buyers and sellers."
          type="info"
        />
        <FormTip
          title="Professional Presence"
          content="Use a professional photo and clear description of your role to establish credibility in the M&A market."
          type="success"
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <div className="flex gap-3">
          <Button variant="bordered" size="lg">
            Cancel Changes
          </Button>
          <Button
            color="primary"
            size="lg"
            isLoading={saving}
            onPress={handleSave}
            className="bg-gradient-to-r from-primary-500 to-blue-600"
          >
            {saving ? 'Saving...' : 'Save Profile'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
