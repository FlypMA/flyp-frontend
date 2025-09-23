/**
 * 🏢 Business Type & Industry Step - Seller Onboarding
 * Location: src/shared/components/modals/sellerOnboarding/steps/BusinessTypeStep.tsx
 * Purpose: Business type and industry selection step
 */

import { Building2, Heart, TrendingUp, Users } from 'lucide-react';
import React from 'react';
import { OnboardingStepProps } from '../types';

const BusinessTypeStep: React.FC<OnboardingStepProps> = ({ formData, updateFormData }) => {
  const businessTypes = [
    {
      value: 'service',
      label: 'Service Business',
      icon: Users,
      description: 'Consulting, agencies, professional services',
    },
    {
      value: 'retail',
      label: 'Retail Business',
      icon: Building2,
      description: 'Stores, shops, e-commerce',
    },
    {
      value: 'manufacturing',
      label: 'Manufacturing',
      icon: TrendingUp,
      description: 'Production, assembly, fabrication',
    },
    {
      value: 'restaurant',
      label: 'Restaurant & Food',
      icon: Heart,
      description: 'Restaurants, cafes, food services',
    },
  ];

  const industries = [
    'Technology',
    'Healthcare',
    'Professional Services',
    'Retail & E-commerce',
    'Manufacturing',
    'Restaurant & Food',
    'Real Estate',
    'Transportation',
    'Education',
    'Other',
  ];

  return (
    <div className="space-y-4">
      {/* Business Type Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          What type of business do you own?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {businessTypes.map(type => {
            const Icon = type.icon;
            return (
              <button
                key={type.value}
                onClick={() => updateFormData({ businessType: type.value })}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  formData.businessType === type.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <Icon
                    className={`w-6 h-6 mt-1 ${
                      formData.businessType === type.value ? 'text-primary-600' : 'text-gray-400'
                    }`}
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{type.label}</h4>
                    <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Industry Selection */}
      {formData.businessType && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            What industry is your business in?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {industries.map(industry => (
              <button
                key={industry}
                onClick={() => updateFormData({ industry })}
                className={`p-3 border rounded-lg text-center transition-all ${
                  formData.industry === industry
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessTypeStep;
