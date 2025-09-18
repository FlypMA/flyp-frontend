/**
 * 🏷️ Business Name Step - Seller Onboarding
 * Location: src/shared/components/modals/sellerOnboarding/steps/BusinessNameStep.tsx
 * Purpose: Business name input step
 */

import { Building2, Star } from 'lucide-react';
import React from 'react';
import { Input } from '../../../../forms';
import { OnboardingStepProps } from '../types';

const BusinessNameStep: React.FC<OnboardingStepProps> = ({ formData, updateFormData }) => {
  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Building2 className="w-8 h-8 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What's your business called?</h2>
        <p className="text-gray-600">This is how your business will appear to potential buyers</p>
      </div>

      <div className="space-y-6">
        <div>
          <Input
            label="Business Name"
            placeholder="Enter your business name"
            value={formData.businessName}
            onChange={e => updateFormData({ businessName: e.target.value })}
            required
            className="text-lg"
          />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Star className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Pro Tip</h4>
              <p className="text-sm text-blue-700">
                Use your official business name as it appears on legal documents. This helps build
                trust with potential buyers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessNameStep;
