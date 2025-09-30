/**
 * 📞 Contact Phone Step - Seller Onboarding
 * Location: src/shared/components/modals/sellerOnboarding/steps/ContactPhoneStep.tsx
 * Purpose: Contact phone input step
 */

import { Clock, Phone, Shield } from 'lucide-react';
import React from 'react';
import { Input } from '../../../../forms';
import { OnboardingStepProps } from '../types';

const ContactPhoneStep: React.FC<OnboardingStepProps> = ({ formData, updateFormData }) => {
  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Phone className="w-8 h-8 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What's your phone number?</h2>
        <p className="text-gray-600">This helps us connect you with serious buyers quickly</p>
      </div>

      <div className="space-y-6">
        <div>
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+32 123 456 789"
            value={formData.contactPhone}
            onChange={e => updateFormData({ contactPhone: e.target.value })}
            onBlur={() => {}}
            name="contactPhone"
            required
            className="text-lg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Secure Communication</h4>
                <p className="text-sm text-primary-700">
                  Your phone number is only shared with verified buyers after initial screening.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-green-900 mb-1">Faster Connections</h4>
                <p className="text-sm text-green-700">
                  Phone contact enables quicker responses and more personal conversations with
                  buyers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPhoneStep;
