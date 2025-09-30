// 👤 Profile Card - Basic Info Step
// Location: src/features/phase1/profile/profile-card-service/steps/BasicInfoStep.tsx
// Purpose: Collect basic profile information (name, location, photo)

import { CustomInputField } from '@/shared/components/forms';
import { User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { ProfileCardStepProps } from '../types/ProfileCardTypes';

const BasicInfoStep: React.FC<ProfileCardStepProps> = ({ data, onDataChange }) => {
  const [formData, setFormData] = useState({
    fullName: data.fullName || '',
    location: data.location || '',
    profileImage: data.profileImage || '',
  });

  useEffect(() => {
    onDataChange(formData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl p-8">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
          <p className="text-gray-600 text-sm">Tell us about yourself</p>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Full Name */}
        <CustomInputField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={e => handleInputChange('fullName', e.target.value)}
          onBlur={() => {}}
          placeholder="e.g., John Doe"
          required
        />

        {/* Location */}
        <CustomInputField
          label="Location"
          name="location"
          value={formData.location}
          onChange={e => handleInputChange('location', e.target.value)}
          onBlur={() => {}}
          placeholder="e.g., Amsterdam, Netherlands"
          required
        />

        {/* Profile Image URL (optional) */}
        <CustomInputField
          label="Profile Image URL (Optional)"
          name="profileImage"
          value={formData.profileImage}
          onChange={e => handleInputChange('profileImage', e.target.value)}
          onBlur={() => {}}
          placeholder="https://example.com/photo.jpg"
        />

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> A complete profile builds trust with potential buyers and
            increases your credibility on the platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoStep;
