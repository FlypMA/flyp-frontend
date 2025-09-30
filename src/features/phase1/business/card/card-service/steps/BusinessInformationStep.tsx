// 🏢 Business Information Step - Card Service
// Location: src/features/phase1/business/card/card-service/steps/BusinessInformationStep.tsx
// Purpose: Step 2 - Business basic information (from BusinessProfileModal style)

import {
  CustomCheckbox,
  CustomDropdown,
  CustomInputField,
  CustomTextarea,
} from '@/shared/components/forms';
import React, { useEffect, useState } from 'react';
import { CardStepProps } from '../types/CardServiceTypes';

const teamSizeOptions = [
  { value: '1-5', label: '1-5 employees' },
  { value: '6-10', label: '6-10 employees' },
  { value: '11-25', label: '11-25 employees' },
  { value: '26-50', label: '26-50 employees' },
  { value: '51-100', label: '51-100 employees' },
  { value: '100+', label: '100+ employees' },
];

const BusinessInformationStep: React.FC<CardStepProps> = ({ data, onDataChange }) => {
  const [formData, setFormData] = useState({
    name: data.name || '',
    location: data.location || '',
    isRemote: data.isRemote || false,
    description: data.description || '',
    teamSize: data.teamSize || '1-5',
  });

  useEffect(() => {
    console.log('📝 Business Information Step - updating data:', formData);
    onDataChange(formData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-primary-600"
          >
            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
            <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
            <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
            <path d="M10 6h4" />
            <path d="M10 10h4" />
            <path d="M10 14h4" />
            <path d="M10 18h4" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Information</h2>
        <p className="text-gray-600 text-sm">Tell us about your business basics</p>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Business Name */}
        <CustomInputField
          label="Business Name"
          name="name"
          value={formData.name}
          onChange={e => handleInputChange('name', e.target.value)}
          placeholder=" "
          required
        />

        {/* Remote Checkbox */}
        <CustomCheckbox
          name="isRemote"
          label="This is a remote/online business"
          checked={formData.isRemote}
          onChange={() => handleInputChange('isRemote', !formData.isRemote)}
        />

        {/* Location */}
        <CustomInputField
          label="Location"
          name="location"
          value={formData.location}
          onChange={e => handleInputChange('location', e.target.value)}
          placeholder=" "
          required={!formData.isRemote}
          disabled={formData.isRemote}
        />

        {/* Business Description */}
        <CustomTextarea
          label="Business Description"
          name="description"
          value={formData.description}
          onChange={e => handleInputChange('description', e.target.value)}
          onBlur={() => {}}
          placeholder="Describe your business in a few sentences..."
          rows={4}
        />

        {/* Team Size */}
        <CustomDropdown
          label="Team Size"
          name="teamSize"
          value={formData.teamSize}
          onChange={e => handleInputChange('teamSize', e)}
          options={teamSizeOptions}
          placeholder="Select team size"
        />
      </div>
    </div>
  );
};

export default BusinessInformationStep;
