// 🎯 Deal Preferences Step Component
// Location: src/features/authentication/components/wizard-steps/StepDealPreferences.tsx
// Purpose: Step 3 of buyer onboarding - Deal size and structure preferences

import React from 'react';
import { Card, CardBody, Select, SelectItem, Chip } from '@heroui/react';
import { Building2, Users, Calendar, TrendingUp } from 'lucide-react';
import type { BuyerData } from '../../types/buyerTypes';
import {
  REVENUE_RANGES,
  EMPLOYEE_RANGES,
  TIMELINE_OPTIONS,
  DEAL_STRUCTURE,
} from '../../constants/buyerOptions';

interface StepDealPreferencesProps {
  data: BuyerData;
  onUpdate: (data: Partial<BuyerData>) => void;
  errors: string[];
}

export const StepDealPreferences: React.FC<StepDealPreferencesProps> = ({
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
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Deal Preferences</h2>
            <p className="text-gray-600">Define your preferred deal size and structure</p>
          </div>

          {/* Revenue Ranges */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Target Revenue Ranges * (Select multiple)
            </label>
            <Select
              placeholder="Select revenue ranges you're targeting"
              value=""
              onChange={value => {
                if (!data.revenueRanges.includes(value)) {
                  handleMultiSelectChange('revenueRanges', [...data.revenueRanges, value]);
                }
              }}
              variant="bordered"
              size="lg"
              isInvalid={hasError('revenue')}
              startContent={<TrendingUp className="w-4 h-4 text-gray-400" />}
            >
              {REVENUE_RANGES.filter(range => !data.revenueRanges.includes(range)).map(range => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </Select>

            {/* Selected Revenue Ranges */}
            {data.revenueRanges.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {data.revenueRanges.map(range => (
                  <Chip
                    key={range}
                    variant="flat"
                    color="success"
                    onClose={() => handleChipRemove('revenueRanges', range)}
                  >
                    {range}
                  </Chip>
                ))}
              </div>
            )}
          </div>

          {/* Employee Ranges */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Target Employee Ranges * (Select multiple)
            </label>
            <Select
              placeholder="Select employee ranges you're targeting"
              value=""
              onChange={value => {
                if (!data.employeeRanges.includes(value)) {
                  handleMultiSelectChange('employeeRanges', [...data.employeeRanges, value]);
                }
              }}
              variant="bordered"
              size="lg"
              isInvalid={hasError('employee')}
              startContent={<Users className="w-4 h-4 text-gray-400" />}
            >
              {EMPLOYEE_RANGES.filter(range => !data.employeeRanges.includes(range)).map(range => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </Select>

            {/* Selected Employee Ranges */}
            {data.employeeRanges.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {data.employeeRanges.map(range => (
                  <Chip
                    key={range}
                    variant="flat"
                    color="primary"
                    onClose={() => handleChipRemove('employeeRanges', range)}
                  >
                    {range}
                  </Chip>
                ))}
              </div>
            )}
          </div>

          {/* Timeline */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Investment Timeline *</label>
            <Select
              placeholder="When are you looking to complete an acquisition?"
              value={data.timeline}
              onChange={value => handleSelectChange('timeline', value)}
              variant="bordered"
              size="lg"
              isInvalid={hasError('timeline')}
              startContent={<Calendar className="w-4 h-4 text-gray-400" />}
            >
              {TIMELINE_OPTIONS.map(timeline => (
                <SelectItem key={timeline} value={timeline}>
                  {timeline}
                </SelectItem>
              ))}
            </Select>
          </div>

          {/* Deal Structure */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Preferred Deal Structures (Optional)
            </label>
            <Select
              placeholder="Select deal structures you prefer"
              value=""
              onChange={value => {
                if (!data.dealStructure.includes(value)) {
                  handleMultiSelectChange('dealStructure', [...data.dealStructure, value]);
                }
              }}
              variant="bordered"
              size="lg"
            >
              {DEAL_STRUCTURE.filter(structure => !data.dealStructure.includes(structure)).map(
                structure => (
                  <SelectItem key={structure} value={structure}>
                    {structure}
                  </SelectItem>
                )
              )}
            </Select>

            {/* Selected Deal Structures */}
            {data.dealStructure.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {data.dealStructure.map(structure => (
                  <Chip
                    key={structure}
                    variant="flat"
                    color="warning"
                    onClose={() => handleChipRemove('dealStructure', structure)}
                  >
                    {structure}
                  </Chip>
                ))}
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-xs font-bold">i</span>
                </div>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-blue-800">Deal Structure Guide</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Not sure about deal structures? Our advisors can help you choose the best approach
                  based on your goals and the specific opportunity.
                </p>
              </div>
            </div>
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
