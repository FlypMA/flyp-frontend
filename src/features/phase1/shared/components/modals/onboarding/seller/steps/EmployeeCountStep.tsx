/**
 * 👥 Employee Count Step - Seller Onboarding
 * Location: src/shared/components/modals/sellerOnboarding/steps/EmployeeCountStep.tsx
 * Purpose: Employee count input step
 */

import { Shield, TrendingUp, Users } from 'lucide-react';
import React from 'react';
import { OnboardingStepProps } from '../types';

const EmployeeCountStep: React.FC<OnboardingStepProps> = ({ formData, updateFormData }) => {
  const employeeRanges = [
    { value: '1', label: 'Just me (Solo)', description: 'Owner-operated business' },
    { value: '2-5', label: '2-5 employees', description: 'Small team' },
    { value: '6-10', label: '6-10 employees', description: 'Growing team' },
    { value: '11-25', label: '11-25 employees', description: 'Established team' },
    { value: '26-50', label: '26-50 employees', description: 'Medium business' },
    { value: '50+', label: '50+ employees', description: 'Large business' },
  ];

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Users className="w-8 h-8 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How many people work at your business?
        </h2>
        <p className="text-gray-600">
          Team size helps buyers understand the business structure and operational complexity
        </p>
      </div>

      <div className="space-y-4">
        {employeeRanges.map(range => (
          <button
            key={range.value}
            onClick={() => updateFormData({ employeeCount: range.value })}
            className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
              formData.employeeCount === range.value
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{range.label}</h3>
                <p className="text-sm text-gray-600 mt-1">{range.description}</p>
              </div>
              {formData.employeeCount === range.value && (
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Scalability</h4>
              <p className="text-sm text-blue-700">
                Larger teams often indicate better systems and processes, making the business more
                attractive to buyers.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-green-900 mb-1">Risk Distribution</h4>
              <p className="text-sm text-green-700">
                Businesses with multiple employees are less dependent on the owner, reducing buyer
                risk.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCountStep;
