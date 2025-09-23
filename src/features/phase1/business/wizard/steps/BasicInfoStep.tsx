// 🏢 Basic Info Step - Listing Wizard
// Location: src/features/phase1/business/wizard/steps/BasicInfoStep.tsx
// Purpose: Step 1 - Basic business information

import {
  AnimatedTextarea,
  CustomCheckbox,
  CustomDropdown,
  CustomInputField,
  CustomNumberInputField,
} from '@/shared/components/forms';
import { Building2 } from 'lucide-react';
import React from 'react';
import { BasicInfo, StepComponentProps } from '../types';

const BasicInfoStep: React.FC<StepComponentProps> = ({ data, onDataChange }) => {
  const basicInfo = data.basicInfo || ({} as BasicInfo);

  const handleInputChange = (field: keyof BasicInfo, value: any) => {
    onDataChange({
      basicInfo: {
        ...basicInfo,
        [field]: value,
      },
    });
  };

  const industryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance & Banking' },
    { value: 'retail', label: 'Retail & E-commerce' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'education', label: 'Education' },
    { value: 'food-beverage', label: 'Food & Beverage' },
    { value: 'transportation', label: 'Transportation & Logistics' },
    { value: 'energy', label: 'Energy & Utilities' },
    { value: 'media', label: 'Media & Entertainment' },
    { value: 'other', label: 'Other' },
  ];

  const teamSizeOptions = [
    { value: '1-5 employees', label: '1-5 employees' },
    { value: '6-10 employees', label: '6-10 employees' },
    { value: '11-25 employees', label: '11-25 employees' },
    { value: '26-50 employees', label: '26-50 employees' },
    { value: '51-100 employees', label: '51-100 employees' },
    { value: '100+ employees', label: '100+ employees' },
  ];

  // Check if we have business profile data
  const hasBusinessProfile = basicInfo.name && basicInfo.description && basicInfo.industry;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Building2 className="w-12 h-12 text-primary-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
          {hasBusinessProfile ? 'Business Information' : 'Basic Information'}
        </h2>
        <p className="text-neutral-600">
          {hasBusinessProfile
            ? 'Review and update your business information'
            : 'Tell us about your business'}
        </p>
      </div>

      {hasBusinessProfile && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Building2 className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Business profile information loaded from your profile
              </p>
              <p className="text-sm text-green-700">You can edit any fields below if needed</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <CustomInputField
          label="Business Name"
          placeholder="e.g., TechStart Solutions"
          value={basicInfo.name || ''}
          onChange={e => handleInputChange('name', e.target.value)}
          required
          onBlur={() => {}}
          name="name"
        />

        <AnimatedTextarea
          label="Business Description"
          placeholder="Describe what your business does, its mission, and key value propositions..."
          value={basicInfo.description || ''}
          onChange={e => handleInputChange('description', e.target.value)}
          required
          minRows={4}
          onBlur={() => {}}
          name="description"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomDropdown
            label="Industry"
            placeholder="Select your industry"
            value={basicInfo.industry || ''}
            onChange={value => handleInputChange('industry', value)}
            options={industryOptions}
            required
            name="industry"
          />

          <CustomInputField
            label="Location"
            placeholder="e.g., London, UK"
            value={basicInfo.location || ''}
            onChange={e => handleInputChange('location', e.target.value)}
            required
            onBlur={() => {}}
            name="location"
          />
        </div>

        <CustomCheckbox
          label="This is a remote/online business"
          checked={basicInfo.isRemote || false}
          onChange={() => handleInputChange('isRemote', !basicInfo.isRemote)}
          name="isRemote"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomDropdown
            label="Team Size"
            placeholder="Select team size"
            value={basicInfo.teamSize || ''}
            onChange={value => handleInputChange('teamSize', value)}
            options={teamSizeOptions}
            required
            name="teamSize"
          />

          <CustomNumberInputField
            label="Founded Year"
            placeholder="2020"
            value={basicInfo.foundedYear?.toString() || ''}
            onChange={e =>
              handleInputChange('foundedYear', parseInt(e.target.value) || new Date().getFullYear())
            }
            required
            onBlur={() => {}}
            name="foundedYear"
          />
        </div>

        <CustomInputField
          label="Website (Optional)"
          placeholder="https://yourbusiness.com"
          value={basicInfo.website || ''}
          onChange={e => handleInputChange('website', e.target.value)}
          type="url"
          onBlur={() => {}}
          name="website"
        />
      </div>
    </div>
  );
};

export default BasicInfoStep;
