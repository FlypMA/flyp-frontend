// 🏢 Privacy Settings Step - Listing Wizard
// Location: src/features/phase1/business/wizard/steps/PrivacySettingsStep.tsx
// Purpose: Step 5 - Privacy and visibility settings

import { AnimatedTextarea } from '@/shared/components/forms';
import { Switch } from '@heroui/react';
import { Shield } from 'lucide-react';
import React from 'react';
import { PrivacySettings } from '../types';

// NOTE: This is a legacy step that will be replaced. Using type assertions for compatibility.
const PrivacySettingsStep: React.FC<any> = ({ data, onDataChange }) => {
  const privacySettings = (data as any).privacySettings || ({} as PrivacySettings);

  const handleInputChange = (field: keyof PrivacySettings, value: boolean | string) => {
    onDataChange({
      privacySettings: {
        ...privacySettings,
        [field]: value,
      },
    } as any);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Shield className="w-12 h-12 text-primary-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Privacy & Visibility</h2>
        <p className="text-neutral-600">Control how your listing appears to potential buyers</p>
      </div>

      <div className="space-y-6">
        {/* Anonymous Listing */}
        <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
          <div>
            <h3 className="font-medium text-neutral-900">Anonymous Listing</h3>
            <p className="text-sm text-neutral-600">
              Hide your business name and personal details from public view
            </p>
          </div>
          <Switch
            isSelected={privacySettings.anonymous_listing || false}
            onValueChange={value => handleInputChange('anonymous_listing', value)}
          />
        </div>

        {/* Require NDA */}
        <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
          <div>
            <h3 className="font-medium text-neutral-900">Require NDA</h3>
            <p className="text-sm text-neutral-600">
              Require buyers to sign a non-disclosure agreement before viewing details
            </p>
          </div>
          <Switch
            isSelected={privacySettings.requires_nda || false}
            onValueChange={value => handleInputChange('requires_nda', value)}
          />
        </div>

        {/* Hide Financials */}
        <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
          <div>
            <h3 className="font-medium text-neutral-900">Hide Financials</h3>
            <p className="text-sm text-neutral-600">
              Hide detailed financial information from public view
            </p>
          </div>
          <Switch
            isSelected={privacySettings.hide_financials || false}
            onValueChange={value => handleInputChange('hide_financials', value)}
          />
        </div>

        {/* Hide Location */}
        <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
          <div>
            <h3 className="font-medium text-neutral-900">Hide Location</h3>
            <p className="text-sm text-neutral-600">
              Hide specific location details from public view
            </p>
          </div>
          <Switch
            isSelected={privacySettings.hide_location || false}
            onValueChange={value => handleInputChange('hide_location', value)}
          />
        </div>

        {/* Hide Industry Details */}
        <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
          <div>
            <h3 className="font-medium text-neutral-900">Hide Industry Details</h3>
            <p className="text-sm text-neutral-600">
              Hide specific industry and business model details
            </p>
          </div>
          <Switch
            isSelected={privacySettings.hide_industry_details || false}
            onValueChange={value => handleInputChange('hide_industry_details', value)}
          />
        </div>

        {/* Teaser Description */}
        <AnimatedTextarea
          label="Public Teaser Description"
          placeholder="Write a brief, attractive description that will be visible to all visitors. This should entice potential buyers to request more information without revealing sensitive details. For example: 'Profitable technology business with strong recurring revenue and growth potential. Established customer base and proven business model. Ideal for entrepreneurs looking to enter the tech sector.'"
          value={privacySettings.teaser_description || ''}
          onChange={e => handleInputChange('teaser_description', e.target.value)}
          required
          minRows={3}
          onBlur={() => {}}
          name="teaser_description"
        />

        {/* Privacy Information */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Privacy Protection</h3>
          <p className="text-sm text-primary-700">
            Your privacy is our priority. These settings help protect your business information
            while still attracting qualified buyers. You can always change these settings after your
            listing is published.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettingsStep;
