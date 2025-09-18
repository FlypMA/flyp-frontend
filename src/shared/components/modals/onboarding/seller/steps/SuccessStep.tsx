/**
 * 🎉 Success Step - Seller Onboarding
 * Location: src/shared/components/modals/sellerOnboarding/steps/SuccessStep.tsx
 * Purpose: Success completion step
 */

import { CheckCircle, Heart, Sparkles, Target } from 'lucide-react';
import React, { useEffect } from 'react';
import { triggerConfetti } from '../utils';

const SuccessStep: React.FC = () => {
  useEffect(() => {
    // Trigger confetti celebration
    triggerConfetti();
  }, []);

  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-4">Congratulations! 🎉</h2>

      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        Your business listing has been created successfully! We're now working to find qualified
        buyers who are perfect for your business.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Finding Buyers</h3>
          <p className="text-sm text-gray-600">
            We're matching your business with qualified buyers in our network
          </p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Professional Listing</h3>
          <p className="text-sm text-gray-600">
            Your listing is now live and attracting serious buyers
          </p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Expert Support</h3>
          <p className="text-sm text-gray-600">
            Our team is here to guide you through the selling process
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
        <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
        <ul className="text-sm text-blue-700 space-y-1 text-left">
          <li>• We'll review your listing and may reach out for additional information</li>
          <li>• Qualified buyers will be able to view your business details</li>
          <li>• You'll receive notifications when buyers express interest</li>
          <li>• Our team will facilitate introductions and negotiations</li>
        </ul>
      </div>
    </div>
  );
};

export default SuccessStep;
