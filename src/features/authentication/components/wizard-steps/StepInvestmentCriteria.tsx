// 🎯 Investment Criteria Step Component
// Location: src/features/authentication/components/wizard-steps/StepInvestmentCriteria.tsx
// Purpose: Step 2 of buyer onboarding - Investment preferences

import React from 'react';
import { Card, CardBody, Select, SelectItem, Chip } from '@heroui/react';
import { Target, Euro, MapPin, Building2 } from 'lucide-react';
import type { BuyerData } from '../../types/buyerTypes';
import {
  BUDGET_RANGES,
  INDUSTRIES,
  COUNTRIES,
  BUSINESS_MODELS,
} from '../../constants/buyerOptions';

interface StepInvestmentCriteriaProps {
  data: BuyerData;
  onUpdate: (data: Partial<BuyerData>) => void;
  errors: string[];
}

export const StepInvestmentCriteria: React.FC<StepInvestmentCriteriaProps> = ({
  data,
  onUpdate,
  errors,
}) => {
  const handleSelectChange = (field: keyof BuyerData, value: string) => {
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
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Investment Criteria</h2>
            <p className="text-gray-600">Define your investment preferences and targets</p>
          </div>

          {/* Budget Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Minimum Budget *</label>
              <Select
                placeholder="Select minimum budget"
                value={data.budgetMin}
                onChange={value => handleSelectChange('budgetMin', value)}
                variant="bordered"
                size="lg"
                isInvalid={hasError('budget')}
                startContent={<Euro className="w-4 h-4 text-gray-400" />}
              >
                {BUDGET_RANGES.map(range => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Maximum Budget *</label>
              <Select
                placeholder="Select maximum budget"
                value={data.budgetMax}
                onChange={value => handleSelectChange('budgetMax', value)}
                variant="bordered"
                size="lg"
                isInvalid={hasError('budget')}
                startContent={<Euro className="w-4 h-4 text-gray-400" />}
              >
                {BUDGET_RANGES.map(range => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          {/* Preferred Industries */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Preferred Industries * (Select multiple)
            </label>
            <Select
              placeholder="Select industries you're interested in"
              value=""
              onChange={value => {
                if (!data.preferredIndustries.includes(value)) {
                  handleMultiSelectChange('preferredIndustries', [
                    ...data.preferredIndustries,
                    value,
                  ]);
                }
              }}
              variant="bordered"
              size="lg"
              isInvalid={hasError('industry')}
              startContent={<Building2 className="w-4 h-4 text-gray-400" />}
            >
              {INDUSTRIES.filter(industry => !data.preferredIndustries.includes(industry)).map(
                industry => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                )
              )}
            </Select>

            {/* Selected Industries */}
            {data.preferredIndustries.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {data.preferredIndustries.map(industry => (
                  <Chip
                    key={industry}
                    variant="flat"
                    color="primary"
                    onClose={() => handleChipRemove('preferredIndustries', industry)}
                  >
                    {industry}
                  </Chip>
                ))}
              </div>
            )}
          </div>

          {/* Preferred Countries */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Preferred Countries * (Select multiple)
            </label>
            <Select
              placeholder="Select countries you're targeting"
              value=""
              onChange={value => {
                if (!data.preferredCountries.includes(value)) {
                  handleMultiSelectChange('preferredCountries', [
                    ...data.preferredCountries,
                    value,
                  ]);
                }
              }}
              variant="bordered"
              size="lg"
              isInvalid={hasError('country')}
              startContent={<MapPin className="w-4 h-4 text-gray-400" />}
            >
              {COUNTRIES.filter(country => !data.preferredCountries.includes(country)).map(
                country => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                )
              )}
            </Select>

            {/* Selected Countries */}
            {data.preferredCountries.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {data.preferredCountries.map(country => (
                  <Chip
                    key={country}
                    variant="flat"
                    color="success"
                    onClose={() => handleChipRemove('preferredCountries', country)}
                  >
                    {country}
                  </Chip>
                ))}
              </div>
            )}
          </div>

          {/* Business Models */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Preferred Business Models (Optional)
            </label>
            <Select
              placeholder="Select business models you prefer"
              value=""
              onChange={value => {
                if (!data.businessModels.includes(value)) {
                  handleMultiSelectChange('businessModels', [...data.businessModels, value]);
                }
              }}
              variant="bordered"
              size="lg"
            >
              {BUSINESS_MODELS.filter(model => !data.businessModels.includes(model)).map(model => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </Select>

            {/* Selected Business Models */}
            {data.businessModels.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {data.businessModels.map(model => (
                  <Chip
                    key={model}
                    variant="flat"
                    color="secondary"
                    onClose={() => handleChipRemove('businessModels', model)}
                  >
                    {model}
                  </Chip>
                ))}
              </div>
            )}
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
