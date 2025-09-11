import React, { useState } from 'react';
import { Button } from '@heroui/react';
import { Building2, Save } from 'lucide-react';
// import { CleanInput, CleanSelect, CleanTextarea } from '../../ui'; // TODO: Fix import

// Simple placeholder components
const CleanInput = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  size,
  helpText,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  size?: string;
  helpText?: string;
}) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {helpText && <p className="text-xs text-gray-500">{helpText}</p>}
  </div>
);

const CleanSelect = ({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const CleanTextarea = ({
  label,
  placeholder,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      rows={rows}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

interface SimpleBusinessSettingsProps {
  onSave: (data: any) => Promise<any>;
}

export const BusinessSettings: React.FC<SimpleBusinessSettingsProps> = ({ onSave }) => {
  const [saving, setSaving] = useState(false);
  const [businessData, setBusinessData] = useState({
    companyName: '',
    businessType: '',
    description: '',
  });

  const businessTypes = [
    { value: 'retail', label: 'Retail Business' },
    { value: 'service', label: 'Service Business' },
    { value: 'tech', label: 'Technology' },
    { value: 'restaurant', label: 'Restaurant/Food' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'other', label: 'Other' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setBusinessData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(businessData);
    } catch (error) {
      console.error('Failed to save business settings:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-2xl">
          <Building2 className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Business</h1>
        <p className="text-gray-600">Basic information about your business</p>
      </div>

      {/* Business Information */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-300 ring-1 ring-gray-100">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Business Information</h2>

          <CleanInput
            label="Company Name"
            placeholder="e.g., Premium Restaurant Brussels"
            value={businessData.companyName}
            onChange={value => handleInputChange('companyName', value)}
          />

          <CleanSelect
            label="Business Type"
            placeholder="Select your business type"
            value={businessData.businessType}
            onChange={value => handleInputChange('businessType', value)}
            options={businessTypes}
          />

          <CleanTextarea
            label="Brief Description"
            placeholder="Tell potential buyers about your business..."
            value={businessData.description}
            onChange={value => handleInputChange('description', value)}
            maxLength={200}
            rows={4}
            helpText="Keep it concise - focus on what makes your business unique"
          />

          <Button
            onPress={handleSave}
            disabled={saving || !businessData.companyName.trim()}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>Save Business Info</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SimpleBusinessSettings;
