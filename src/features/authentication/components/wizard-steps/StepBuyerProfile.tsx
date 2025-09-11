// 🎯 Buyer Profile Step Component
// Location: src/features/authentication/components/wizard-steps/StepBuyerProfile.tsx
// Purpose: Step 1 of buyer onboarding - Profile information

import React from 'react';
import { Card, CardBody, Input, Select, SelectItem } from '@heroui/react';
import { User, Briefcase, TrendingUp, Euro, Clock } from 'lucide-react';
import type { BuyerData } from '../../types/buyerTypes';
import {
  EXPERIENCE_LEVELS,
  INVESTMENT_TYPES,
  FINANCING_STATUS,
} from '../../constants/buyerOptions';

interface StepBuyerProfileProps {
  data: BuyerData;
  onUpdate: (data: Partial<BuyerData>) => void;
  errors: string[];
}

export const StepBuyerProfile: React.FC<StepBuyerProfileProps> = ({ data, onUpdate, errors }) => {
  const handleInputChange = (field: keyof BuyerData, value: string) => {
    onUpdate({ [field]: value });
  };

  const hasError = (field: string) =>
    errors.some(error => error.toLowerCase().includes(field.toLowerCase()));

  return (
    <Card className="border border-gray-200">
      <CardBody className="p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Profile</h2>
            <p className="text-gray-600">Tell us about your background and experience</p>
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Full Name *</label>
            <Input
              placeholder="Enter your full name"
              value={data.fullName}
              onChange={e => handleInputChange('fullName', e.target.value)}
              variant="bordered"
              size="lg"
              isInvalid={hasError('name')}
              errorMessage={hasError('name') ? 'Full name is required' : ''}
            />
          </div>

          {/* Background */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Professional Background *
            </label>
            <Select
              placeholder="Select your background"
              value={data.background}
              onChange={value => handleInputChange('background', value)}
              variant="bordered"
              size="lg"
              isInvalid={hasError('background')}
              startContent={<Briefcase className="w-4 h-4 text-gray-400" />}
            >
              <SelectItem key="corporate" value="corporate">
                Corporate Executive
              </SelectItem>
              <SelectItem key="entrepreneur" value="entrepreneur">
                Entrepreneur
              </SelectItem>
              <SelectItem key="consultant" value="consultant">
                Management Consultant
              </SelectItem>
              <SelectItem key="finance" value="finance">
                Finance Professional
              </SelectItem>
              <SelectItem key="investment" value="investment">
                Investment Professional
              </SelectItem>
              <SelectItem key="legal" value="legal">
                Legal/Advisory
              </SelectItem>
              <SelectItem key="other" value="other">
                Other
              </SelectItem>
            </Select>
          </div>

          {/* Experience Level */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              M&A Experience Level *
            </label>
            <Select
              placeholder="Select your experience level"
              value={data.experience}
              onChange={value => handleInputChange('experience', value)}
              variant="bordered"
              size="lg"
              isInvalid={hasError('experience')}
              startContent={<TrendingUp className="w-4 h-4 text-gray-400" />}
            >
              {EXPERIENCE_LEVELS.map((level, index) => (
                <SelectItem key={index} value={level}>
                  {level}
                </SelectItem>
              ))}
            </Select>
          </div>

          {/* Investment Type */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Investment Type *</label>
            <Select
              placeholder="Select your investment type"
              value={data.investmentType}
              onChange={value => handleInputChange('investmentType', value)}
              variant="bordered"
              size="lg"
              isInvalid={hasError('investment')}
              startContent={<Euro className="w-4 h-4 text-gray-400" />}
            >
              {INVESTMENT_TYPES.map((type, index) => (
                <SelectItem key={index} value={type}>
                  {type}
                </SelectItem>
              ))}
            </Select>
          </div>

          {/* Financing Status */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Financing Status *</label>
            <Select
              placeholder="Select your financing status"
              value={data.financingStatus}
              onChange={value => handleInputChange('financingStatus', value)}
              variant="bordered"
              size="lg"
              isInvalid={hasError('financing')}
              startContent={<Clock className="w-4 h-4 text-gray-400" />}
            >
              {FINANCING_STATUS.map((status, index) => (
                <SelectItem key={index} value={status}>
                  {status}
                </SelectItem>
              ))}
            </Select>
          </div>

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
