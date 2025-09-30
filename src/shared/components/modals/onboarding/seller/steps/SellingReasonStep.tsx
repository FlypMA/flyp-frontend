/**
 * 🤔 Selling Reason Step - Seller Onboarding
 * Location: src/shared/components/modals/sellerOnboarding/steps/SellingReasonStep.tsx
 * Purpose: Reason for selling input step
 */

import { Clock, Heart, Target, TrendingUp } from 'lucide-react';
import React from 'react';
import { AnimatedTextarea } from '../../../../forms';
import { OnboardingStepProps } from '../types';

const SellingReasonStep: React.FC<OnboardingStepProps> = ({ formData, updateFormData }) => {
  const commonReasons = [
    {
      value: 'retirement',
      label: 'Retirement',
      icon: Heart,
      description: 'Ready to enjoy life after work',
    },
    {
      value: 'new_opportunity',
      label: 'New Opportunity',
      icon: Target,
      description: 'Found a better business opportunity',
    },
    {
      value: 'health_reasons',
      label: 'Health Reasons',
      icon: Heart,
      description: 'Health or family circumstances',
    },
    { value: 'burnout', label: 'Burnout', icon: Clock, description: 'Ready for a change of pace' },
    {
      value: 'market_timing',
      label: 'Market Timing',
      icon: TrendingUp,
      description: 'Good time to sell in the market',
    },
    { value: 'other', label: 'Other', icon: Target, description: 'Different reason' },
  ];

  return (
    <div className="max-w-3xl mx-auto py-12">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="w-8 h-8 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Why are you selling your business?
        </h2>
        <p className="text-gray-600">
          Understanding your motivation helps us find the right buyers and timing
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {commonReasons.map(reason => {
            const Icon = reason.icon;
            return (
              <button
                key={reason.value}
                onClick={() => updateFormData({ sellingReason: reason.value })}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  formData.sellingReason === reason.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <Icon
                    className={`w-6 h-6 mt-1 ${
                      formData.sellingReason === reason.value ? 'text-primary-600' : 'text-gray-400'
                    }`}
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{reason.label}</h4>
                    <p className="text-sm text-gray-600 mt-1">{reason.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div>
          <AnimatedTextarea
            label="Additional Details (Optional)"
            placeholder="Tell us more about your situation and what you're looking for in a buyer..."
            value={formData.sellingReason}
            onChange={e => updateFormData({ sellingReason: e.target.value })}
            onBlur={() => {}}
            name="sellingReason"
            minRows={3}
            maxRows={6}
            autoResize={true}
            characterLimit={500}
            description="Help buyers understand your situation and what you value in a potential buyer."
          />
        </div>

        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Heart className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Your Story Matters</h4>
              <p className="text-sm text-primary-700">
                Buyers appreciate understanding your motivation. It helps them see the opportunity
                and ensures a good fit for both parties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellingReasonStep;
