/**
 * 📧 Contact Email Step - Seller Onboarding
 * Location: src/shared/components/modals/sellerOnboarding/steps/ContactEmailStep.tsx
 * Purpose: Contact email input step
 */

import { Mail, Shield, Users } from 'lucide-react';
import React from 'react';
import { Input } from '../../../../forms';
import { OnboardingStepProps } from '../types';

const ContactEmailStep: React.FC<OnboardingStepProps> = ({ formData, updateFormData }) => {
  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How can buyers contact you?</h2>
        <p className="text-gray-600">We'll use this email to connect you with interested buyers</p>
      </div>

      <div className="space-y-6">
        <div>
          <Input
            label="Contact Email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.contactEmail}
            onChange={e => updateFormData({ contactEmail: e.target.value })}
            onBlur={() => {}}
            name="contactEmail"
            required
            className="text-lg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Privacy Protected</h4>
                <p className="text-sm text-blue-700">
                  Your email is never shared publicly. We'll only connect you with verified, serious
                  buyers.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Users className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-green-900 mb-1">Quality Matches</h4>
                <p className="text-sm text-green-700">
                  We pre-screen all buyers to ensure they're qualified and serious about purchasing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactEmailStep;
