/**
 * 📝 Business Description Step - Seller Onboarding
 * Location: src/shared/components/modals/sellerOnboarding/steps/BusinessDescriptionStep.tsx
 * Purpose: Business description input step
 */

import { FileText, Star, Target } from 'lucide-react';
import React from 'react';
import { AnimatedTextarea } from '../../../../forms';
import { OnboardingStepProps } from '../types';

const BusinessDescriptionStep: React.FC<OnboardingStepProps> = ({ formData, updateFormData }) => {
  const descriptionLength = formData.description.length;
  const minLength = 50;

  return (
    <div className="max-w-3xl mx-auto py-12">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileText className="w-8 h-8 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tell us about your business</h2>
        <p className="text-gray-600">
          A compelling description helps buyers understand your business's value and potential
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <AnimatedTextarea
            label="Business Description"
            placeholder="Describe your business, what you do, your unique value proposition, target customers, and what makes you special..."
            value={formData.description}
            onChange={e => updateFormData({ description: e.target.value })}
            minRows={6}
            maxRows={12}
            autoResize={true}
            characterLimit={1000}
            description="Minimum 50 characters. Be specific about your services, customers, and competitive advantages."
            required
            onBlur={() => {}}
            name="description"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Star className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">What to Include</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• What products/services you offer</li>
                  <li>• Your target customers</li>
                  <li>• Unique competitive advantages</li>
                  <li>• Key business metrics</li>
                  <li>• Growth opportunities</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Target className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-green-900 mb-1">Pro Tips</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Use specific numbers and facts</li>
                  <li>• Highlight recurring revenue</li>
                  <li>• Mention key partnerships</li>
                  <li>• Show market opportunity</li>
                  <li>• Be honest and transparent</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {descriptionLength > 0 && (
          <div
            className={`text-sm ${descriptionLength >= minLength ? 'text-green-600' : 'text-orange-600'}`}
          >
            {descriptionLength >= minLength ? (
              <span className="flex items-center space-x-1">
                <Star className="w-4 h-4" />
                <span>Great! Your description is detailed enough to attract serious buyers.</span>
              </span>
            ) : (
              <span>
                Add {minLength - descriptionLength} more characters to meet the minimum requirement.
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessDescriptionStep;
