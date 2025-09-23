/**
 * 💰 Revenue Range Step - Seller Onboarding
 * Location: src/shared/components/modals/sellerOnboarding/steps/RevenueRangeStep.tsx
 * Purpose: Revenue range selection step
 */

import { BarChart3, Euro, TrendingUp } from 'lucide-react';
import React from 'react';
import { OnboardingStepProps } from '../types';

const RevenueRangeStep: React.FC<OnboardingStepProps> = ({ formData, updateFormData }) => {
  const revenueRanges = [
    { min: 0, max: 100000, label: 'Under €100K', description: 'Early stage business' },
    { min: 100000, max: 250000, label: '€100K - €250K', description: 'Growing business' },
    { min: 250000, max: 500000, label: '€250K - €500K', description: 'Established business' },
    { min: 500000, max: 1000000, label: '€500K - €1M', description: 'Mature business' },
    { min: 1000000, max: 2500000, label: '€1M - €2.5M', description: 'Large business' },
    { min: 2500000, max: 5000000, label: '€2.5M - €5M', description: 'Enterprise business' },
    { min: 5000000, max: 10000000, label: '€5M+', description: 'Major enterprise' },
  ];

  return (
    <div className="space-y-4">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Euro className="w-8 h-8 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">What's your annual revenue?</h2>
        <p className="text-gray-600">
          Revenue helps buyers understand the business scale and potential
        </p>
      </div>

      <div className="space-y-3">
        {revenueRanges.map(range => (
          <button
            key={`${range.min}-${range.max}`}
            onClick={() => updateFormData({ revenueRange: [range.min, range.max] })}
            className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
              formData.revenueRange[0] === range.min && formData.revenueRange[1] === range.max
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{range.label}</h3>
                <p className="text-sm text-gray-600 mt-1">{range.description}</p>
              </div>
              {formData.revenueRange[0] === range.min && formData.revenueRange[1] === range.max && (
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <BarChart3 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Valuation Impact</h4>
              <p className="text-sm text-blue-700">
                Revenue is a key factor in business valuation. Higher revenue typically leads to
                higher valuations.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <TrendingUp className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-green-900 mb-1">Buyer Interest</h4>
              <p className="text-sm text-green-700">
                Revenue range helps match your business with buyers looking for similar-sized
                opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueRangeStep;
