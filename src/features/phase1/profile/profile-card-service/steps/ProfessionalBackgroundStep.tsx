// 👤 Profile Card - Professional Background Step
// Location: src/features/phase1/profile/profile-card-service/steps/ProfessionalBackgroundStep.tsx
// Purpose: Collect professional background (bio, businesses owned, exits)

import { CustomNumberInputField, CustomTextarea } from '@/shared/components/forms';
import { Briefcase } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { ProfileCardStepProps } from '../types/ProfileCardTypes';

const ProfessionalBackgroundStep: React.FC<ProfileCardStepProps> = ({ data, onDataChange }) => {
  const [formData, setFormData] = useState({
    bio: data.bio || '',
    ownedBusinesses: data.ownedBusinesses || 1,
    exits: data.exits || 0,
    yearsOnPlatform: data.yearsOnPlatform || 0,
  });

  useEffect(() => {
    onDataChange(formData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl p-8">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
          <Briefcase className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Professional Background</h2>
          <p className="text-gray-600 text-sm">Share your entrepreneurial journey</p>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Bio */}
        <CustomTextarea
          label="Bio"
          name="bio"
          value={formData.bio}
          onChange={e => handleInputChange('bio', e.target.value)}
          onBlur={() => {}}
          placeholder="e.g., Experienced entrepreneur with a passion for technology and innovation. Founded 3 successful startups in the SaaS space..."
          rows={4}
          required
        />

        {/* Owned Businesses */}
        <CustomNumberInputField
          label="Businesses Owned"
          name="ownedBusinesses"
          value={formData.ownedBusinesses.toString()}
          onChange={e => handleInputChange('ownedBusinesses', parseInt(e.target.value) || 0)}
          onBlur={() => {}}
          placeholder="1"
          min={0}
          required
        />

        {/* Successful Exits */}
        <CustomNumberInputField
          label="Successful Exits"
          name="exits"
          value={formData.exits.toString()}
          onChange={e => handleInputChange('exits', parseInt(e.target.value) || 0)}
          onBlur={() => {}}
          placeholder="0"
          min={0}
        />

        {/* Years on Platform (auto-calculated, but editable for legacy users) */}
        <CustomNumberInputField
          label="Years on Platform"
          name="yearsOnPlatform"
          value={formData.yearsOnPlatform.toString()}
          onChange={e => handleInputChange('yearsOnPlatform', parseInt(e.target.value) || 0)}
          onBlur={() => {}}
          placeholder="0"
          min={0}
        />

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-sm text-purple-800">
            💡 <strong>Tip:</strong> Your professional background helps buyers understand your
            experience and credibility. Be honest and specific about your achievements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalBackgroundStep;
