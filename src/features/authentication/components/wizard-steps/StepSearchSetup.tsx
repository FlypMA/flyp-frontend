// 🎯 Search Setup Step Component
// Location: src/features/authentication/components/wizard-steps/StepSearchSetup.tsx
// Purpose: Step 4 of buyer onboarding - Configure alerts and matching

import React from 'react';
import { Card, CardBody, Input, Select, SelectItem, Chip } from '@heroui/react';
import { Search, Bell, Mail, Clock } from 'lucide-react';
import type { BuyerData } from '../../types/buyerTypes';
import { ALERT_TYPES, COMMUNICATION_PREFS, SEARCH_FREQUENCY } from '../../constants/buyerOptions';

interface StepSearchSetupProps {
  data: BuyerData;
  onUpdate: (data: Partial<BuyerData>) => void;
  errors: string[];
}

export const StepSearchSetup: React.FC<StepSearchSetupProps> = ({ data, onUpdate, errors }) => {
  const handleInputChange = (field: keyof BuyerData, value: string) => {
    onUpdate({ [field]: value });
  };

  const handleMultiSelectChange = (field: keyof BuyerData, values: string[]) => {
    onUpdate({ [field]: values });
  };

  const handleChipRemove = (field: keyof BuyerData, valueToRemove: string) => {
    const currentValues = data[field] as string[];
    const updatedValues = currentValues.filter(value => value !== valueToRemove);
    onUpdate({ [field]: updatedValues });
  };

  const hasError = (field: string) =>
    errors.some(error => error.toLowerCase().includes(field.toLowerCase()));

  return (
    <Card className="border border-gray-200">
      <CardBody className="p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Search Setup</h2>
            <p className="text-gray-600">Configure your alerts and matching preferences</p>
          </div>

          {/* Saved Search Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Save This Search As *</label>
            <Input
              placeholder="e.g., 'Tech Companies €1-5M Belgium'"
              value={data.savedSearchName}
              onChange={e => handleInputChange('savedSearchName', e.target.value)}
              variant="bordered"
              size="lg"
              isInvalid={hasError('search')}
              errorMessage={hasError('search') ? 'Search name is required' : ''}
              startContent={<Search className="w-4 h-4 text-gray-400" />}
            />
            <p className="text-xs text-gray-500">
              Give your search criteria a memorable name for easy reference
            </p>
          </div>

          {/* Alert Types */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Alert Types * (Select multiple)
            </label>
            <Select
              placeholder="Choose what you want to be notified about"
              value=""
              onChange={value => {
                if (!data.alertTypes.includes(value)) {
                  handleMultiSelectChange('alertTypes', [...data.alertTypes, value]);
                }
              }}
              variant="bordered"
              size="lg"
              isInvalid={hasError('alert')}
              startContent={<Bell className="w-4 h-4 text-gray-400" />}
            >
              {ALERT_TYPES.filter(type => !data.alertTypes.includes(type)).map(type => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </Select>

            {/* Selected Alert Types */}
            {data.alertTypes.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {data.alertTypes.map(type => (
                  <Chip
                    key={type}
                    variant="flat"
                    color="primary"
                    onClose={() => handleChipRemove('alertTypes', type)}
                  >
                    {type}
                  </Chip>
                ))}
              </div>
            )}
          </div>

          {/* Communication Preferences */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Communication Preferences (Optional)
            </label>
            <Select
              placeholder="How would you like to receive updates?"
              value=""
              onChange={value => {
                if (!data.communicationPrefs.includes(value)) {
                  handleMultiSelectChange('communicationPrefs', [
                    ...data.communicationPrefs,
                    value,
                  ]);
                }
              }}
              variant="bordered"
              size="lg"
              startContent={<Mail className="w-4 h-4 text-gray-400" />}
            >
              {COMMUNICATION_PREFS.filter(pref => !data.communicationPrefs.includes(pref)).map(
                pref => (
                  <SelectItem key={pref} value={pref}>
                    {pref}
                  </SelectItem>
                )
              )}
            </Select>

            {/* Selected Communication Preferences */}
            {data.communicationPrefs.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {data.communicationPrefs.map(pref => (
                  <Chip
                    key={pref}
                    variant="flat"
                    color="success"
                    onClose={() => handleChipRemove('communicationPrefs', pref)}
                  >
                    {pref}
                  </Chip>
                ))}
              </div>
            )}
          </div>

          {/* Search Frequency */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Search Frequency *</label>
            <Select
              placeholder="How often should we search for matches?"
              value={data.searchFrequency}
              onChange={value => handleInputChange('searchFrequency', value)}
              variant="bordered"
              size="lg"
              isInvalid={hasError('frequency')}
              startContent={<Clock className="w-4 h-4 text-gray-400" />}
            >
              {SEARCH_FREQUENCY.map(freq => (
                <SelectItem key={freq} value={freq}>
                  {freq}
                </SelectItem>
              ))}
            </Select>
          </div>

          {/* Preview Box */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-xs font-bold">✓</span>
                </div>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-green-800">Almost Done!</h4>
                <p className="text-sm text-green-700 mt-1">
                  Once you complete this step, we'll start matching you with relevant business
                  opportunities based on your criteria.
                </p>
              </div>
            </div>
          </div>

          {/* Search Summary */}
          {data.savedSearchName && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Search Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Search Name:</span>
                  <div className="text-gray-600">{data.savedSearchName}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Frequency:</span>
                  <div className="text-gray-600">{data.searchFrequency || 'Not set'}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Alert Types:</span>
                  <div className="text-gray-600">{data.alertTypes.length || 0} selected</div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Communications:</span>
                  <div className="text-gray-600">
                    {data.communicationPrefs.length || 0} selected
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-red-800 mb-2">
                Please fix the following errors:
              </h4>
              <ul className="text-sm text-red-700 space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
