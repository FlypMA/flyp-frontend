/**
 * 📅 Founded Year Step - Seller Onboarding
 * Location: src/shared/components/modals/sellerOnboarding/steps/FoundedYearStep.tsx
 * Purpose: Business founded year input step
 */

import { Award, Calendar, TrendingUp } from 'lucide-react';
import React from 'react';
import { OnboardingStepProps } from '../types';

const FoundedYearStep: React.FC<OnboardingStepProps> = ({ formData, updateFormData }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Calendar className="w-8 h-8 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          When was your business established?
        </h2>
        <p className="text-gray-600">
          Business age shows stability and market presence to potential buyers
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Founded Year <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.foundedYear}
            onChange={e => updateFormData({ foundedYear: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Select year</option>
            {years.map(year => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {formData.foundedYear && (
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Award className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900 mb-1">
                  {currentYear - parseInt(formData.foundedYear)} Years of Experience
                </h4>
                <p className="text-sm text-primary-700">
                  {currentYear - parseInt(formData.foundedYear) >= 10
                    ? 'Established businesses like yours are highly valued by buyers for their proven track record and market presence.'
                    : 'Your business has built valuable experience and customer relationships that buyers will appreciate.'}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Market Value</span>
            </div>
            <p className="text-xs text-gray-600">
              Older businesses typically command higher valuations due to established customer base
              and market position.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Buyer Confidence</span>
            </div>
            <p className="text-xs text-gray-600">
              Proven longevity reduces buyer risk and increases their confidence in the investment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundedYearStep;
