/**
 * 👤 Personal Information Step
 * Step 1 of Profile Card Creation
 * Comprehensive personal info with LinkedIn import and avatar upload
 */

import { CustomInputField } from '@/shared/components/forms';
import { Avatar } from '@heroui/react';
import { Camera, Linkedin } from 'lucide-react';
import React, { ChangeEvent, useRef, useState } from 'react';
import { ProfileCardStepProps } from '../types/ProfileCardTypes';

export const PersonalInfoStep: React.FC<ProfileCardStepProps> = ({
  data,
  onDataChange,
  onNext,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const formData = {
    fullName: data.fullName || '',
    location: data.location || '',
    timezone: data.timezone || 'Europe/Amsterdam',
    profileImage: data.profileImage || '',
  };

  const handleInputChange = (field: string, value: string) => {
    onDataChange({ ...data, [field]: value });
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      handleInputChange('profileImage', base64String);
      setIsUploading(false);
    };
    reader.onerror = () => {
      alert('Failed to upload image');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleLinkedInImport = () => {
    // TODO: Implement LinkedIn OAuth import
    alert('LinkedIn import will be implemented in the next phase');
  };

  const timezones = [
    'Europe/Amsterdam',
    'Europe/London',
    'America/New_York',
    'America/Los_Angeles',
    'Asia/Tokyo',
    'Asia/Singapore',
    'Australia/Sydney',
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Header with Avatar */}
        <div className="mb-8">
          <div className="flex items-center space-x-6 mb-6">
            <div className="relative group">
              <Avatar
                src={formData.profileImage || undefined}
                name={formData.fullName || 'User'}
                size="lg"
                className="w-24 h-24 cursor-pointer"
                onClick={handleImageClick}
              />
              <div
                className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                onClick={handleImageClick}
              >
                <Camera className="w-5 h-5 text-white" />
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {formData.fullName || 'Your Name'}
              </h1>
              <p className="text-gray-600">{formData.location || 'Your Location'}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Business owners and prospectors can see your profile and it can show up when needed to
            build trust and credibility within the platform and our community.
            <a href="#" className="text-primary-600 hover:underline ml-1">
              Learn more
            </a>
          </p>
        </div>

        <hr className="shrink-0 bg-divider border-none w-full h-divider my-8" role="separator" />

        {/* LinkedIn Import */}
        <div className="mb-8">
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
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
              <button
                type="button"
                onClick={handleLinkedInImport}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold whitespace-nowrap flex items-center space-x-2 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span>Import from LinkedIn</span>
              </button>
            </div>
          </div>
        </div>

        <hr className="shrink-0 bg-divider border-none w-full h-divider my-8" role="separator" />

        {/* Personal Information */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
          <div className="space-y-6">
            {/* Full Name */}
            <CustomInputField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={e => handleInputChange('fullName', e.target.value)}
              placeholder=" "
              required
            />

            {/* Location */}
            <CustomInputField
              label="Where you live"
              name="location"
              value={formData.location}
              onChange={e => handleInputChange('location', e.target.value)}
              placeholder=" "
              required
            />

            {/* Timezone */}
            <div className="mb-6">
              <div className="relative w-full">
                <select
                  value={formData.timezone}
                  onChange={e => handleInputChange('timezone', e.target.value)}
                  className="w-full h-16 px-4 pt-6 pb-2 text-base text-gray-900 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900 focus:ring-opacity-20 transition-all duration-200 hover:border-gray-400"
                >
                  {timezones.map(tz => (
                    <option key={tz} value={tz}>
                      {tz}
                    </option>
                  ))}
                </select>
                <label className="absolute left-4 top-2 text-xs text-gray-600 font-medium pointer-events-none">
                  Timezone
                </label>
              </div>
            </div>
          </div>
        </div>

        {isUploading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6">
              <p className="text-gray-900">Uploading image...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoStep;
