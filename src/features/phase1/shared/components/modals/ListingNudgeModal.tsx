import { Button } from '@/features/phase1/shared/components/buttons';
import { CenteredModal } from '@/features/phase1/shared/components/modals/foundations/CenteredModal';
import { Card, CardBody } from '@heroui/react';
import { CheckCircle, Eye, Heart, Lock, Shield, Sparkles, TrendingUp, Users } from 'lucide-react';
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
  businessName = 'your business',
  industry = 'your industry',
}) => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleExploreOptions = () => {
    onCreateListing();
    onClose();
  };

  return (
    <CenteredModal isOpen={isOpen} onClose={onClose} title="" size="2xl" showCloseButton={true}>
      <div className="space-y-6">
        {/* Celebration Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Congratulations! 🎉</h2>
          <p className="text-lg text-gray-600 mb-4">
            {businessName} is valued at{' '}
            <span className="font-semibold text-green-600">{formatCurrency(businessValue)}</span>
          </p>
          <p className="text-sm text-gray-500">
            That's a fantastic achievement - you've built something truly valuable!
          </p>
        </div>

        {/* Context and Gentle Suggestion */}
        <Card className="border border-blue-100 bg-blue-50/50">
          <CardBody className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Many business owners at this stage are curious...
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  After discovering their business value, owners often wonder: "What kind of
                  interest might my business attract?" Some choose to explore their options by
                  creating a confidential listing to see what opportunities are out there.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Lock className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 text-sm">Completely Confidential</h4>
              <p className="text-gray-600 text-xs">
                Your identity stays private until you're ready to share it
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 text-sm">No Commitment Required</h4>
              <p className="text-gray-600 text-xs">
                You can change your mind anytime - you stay in control
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 text-sm">Qualified Buyers Only</h4>
              <p className="text-gray-600 text-xs">
                We pre-screen all buyers to ensure they're serious and qualified
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Eye className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 text-sm">Just Explore Options</h4>
              <p className="text-gray-600 text-xs">
                See what interest exists without any pressure to sell
              </p>
            </div>
          </div>
        </div>

        {/* Reassurance Message */}
        <Card className="border border-gray-200 bg-gray-50/50">
          <CardBody className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  <span className="font-medium">We're here to support you.</span> This is just about
                  exploring possibilities. There's no pressure, no commitment, and we'll handle
                  everything confidentially. You decide what to share and when.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* What Happens Next */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
            <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
            What happens if you explore listing options?
          </h4>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 font-medium">1.</span>
              <span>We'll pre-fill everything we know from your profile and valuation</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 font-medium">2.</span>
              <span>You review and adjust the information - we guide you through each step</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 font-medium">3.</span>
              <span>
                Your listing goes live privately - only qualified buyers with NDAs can see details
              </span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 font-medium">4.</span>
              <span>You get to see what interest exists, with no obligation to proceed</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button variant="secondary" onPress={onClose} className="flex-1 order-2 sm:order-1">
            Maybe Later
          </Button>
          <Button
            variant="primary"
            onPress={handleExploreOptions}
            className="flex-1 order-1 sm:order-2"
          >
            Explore Listing Options
          </Button>
        </div>

        {/* Small Print */}
        <p className="text-xs text-gray-500 text-center">
          No spam, no pressure. You can pause or remove your listing anytime with one click.
        </p>
      </div>
    </CenteredModal>
  );
};

export default ListingNudgeModal;
