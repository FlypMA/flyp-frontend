// 🎭 ListingNudgeModal - Caregiver-Aligned Post-Valuation Nudge
// Location: src/shared/components/modals/domains/business/ListingNudgeModal.tsx
// Purpose: Gentle, supportive nudge to explore listing options after valuation completion

import { Button } from '@/shared/components/buttons';
import { CenteredModal } from '@/shared/components/modals/foundations/CenteredModal';
import { CheckCircle, Heart, Rocket, Shield, Star } from 'lucide-react';
import React from 'react';

interface ListingNudgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateListing: () => void;
  businessValue: number;
  businessName?: string;
  industry?: string;
}

const ListingNudgeModal: React.FC<ListingNudgeModalProps> = ({
  isOpen,
  onClose,
  onCreateListing,
  businessValue,
  businessName = 'Your Business',
  industry = 'your industry',
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <CenteredModal isOpen={isOpen} onClose={onClose} title="" size="2xl" showCloseButton={true}>
      <div className="space-y-6">
        {/* Celebration Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Congratulations! 🎉</h2>
          <p className="text-lg text-gray-700">
            <span className="font-semibold text-green-600">{businessName}</span> is valued at{' '}
            <span className="font-bold text-primary-600">{formatCurrency(businessValue)}</span> —
            that's fantastic!
          </p>
        </div>

        {/* Gentle Suggestion */}
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-start gap-3">
            <Heart className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                Many business owners at this stage are curious...
              </h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                After seeing their business valuation, they often wonder: "What would potential
                buyers think? How much interest would my business generate?" It's completely natural
                to be curious about the market's response.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 text-center">
            Here's what you could discover:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Market Interest</h4>
                <p className="text-sm text-gray-600">
                  See how many qualified buyers are interested in {industry} businesses
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <Rocket className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Growth Potential</h4>
                <p className="text-sm text-gray-600">
                  Discover what buyers value most about businesses like yours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Reassurance */}
        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-green-900 mb-2">Your privacy is our priority</h3>
              <p className="text-green-800 text-sm leading-relaxed">
                <strong>No pressure, no commitment.</strong> We'll handle everything confidentially.
                You can create a listing anonymously, and we'll only share details with serious,
                pre-qualified buyers who sign NDAs.
              </p>
            </div>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3 text-center">What happens next?</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-semibold text-primary-600">1</span>
              </div>
              <p className="text-sm text-gray-700">
                We'll help you create a confidential listing (takes 5 minutes)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-semibold text-primary-600">2</span>
              </div>
              <p className="text-sm text-gray-700">
                Qualified buyers can express interest (you see who they are)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-semibold text-primary-600">3</span>
              </div>
              <p className="text-sm text-gray-700">
                You decide if and when to engage (you're always in control)
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            variant="primary"
            size="lg"
            onPress={onCreateListing}
            className="flex-1"
            startContent={<Rocket className="w-5 h-5" />}
          >
            Explore Listing Options
          </Button>
          <Button variant="tertiary" size="lg" onPress={onClose} className="flex-1">
            Maybe Later
          </Button>
        </div>

        {/* Supportive Footer */}
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            <Heart className="w-4 h-4 inline mr-1" />
            We're here to help at every step. No pressure, just support.
          </p>
        </div>
      </div>
    </CenteredModal>
  );
};

export default ListingNudgeModal;
