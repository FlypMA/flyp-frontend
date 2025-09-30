/**
 * 🎉 Welcome Step - Seller Onboarding
 * Location: src/shared/components/modals/sellerOnboarding/steps/WelcomeStep.tsx
 * Purpose: Welcome step for seller onboarding modal
 */

import { Heart, Sparkles, Target } from 'lucide-react';
import React from 'react';
import { OnboardingStepProps } from '../types';

const WelcomeStep: React.FC<OnboardingStepProps> = ({ onNext }) => {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-8">
        <Heart className="w-10 h-10 text-primary-600" />
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to UpSwitch! 🎉</h2>

      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        We're excited to help you sell your business. Our guided process will create a professional
        listing that attracts qualified buyers.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Target className="w-6 h-6 text-primary-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Find the Right Buyer</h3>
          <p className="text-sm text-gray-600">
            Connect with serious, qualified buyers who understand your business value
          </p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Professional Listing</h3>
          <p className="text-sm text-gray-600">
            Create a compelling listing that showcases your business's true potential
          </p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Expert Support</h3>
          <p className="text-sm text-gray-600">
            Get guidance from our M&A experts throughout the selling process
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-8">
        This process takes about 10-15 minutes. You can save your progress and continue later.
      </p>
    </div>
  );
};

export default WelcomeStep;
