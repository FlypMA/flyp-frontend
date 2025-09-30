import { Button } from '@/shared/components/buttons';
import { Card, CardBody } from '@heroui/react';
import { ArrowLeft, CreditCard, RefreshCw, XCircle } from 'lucide-react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { UrlGenerator } from '../../../shared/services/urls/urlGenerator';

const CheckoutCancel: React.FC = () => {
  const navigate = useNavigate();

  const handleTryAgain = () => {
    navigate(UrlGenerator.checkout());
  };

  const handleGoToPricing = () => {
    navigate(UrlGenerator.subscriptionPlans());
  };

  const handleGoHome = () => {
    navigate(UrlGenerator.root());
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <CardBody className="p-8 text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Checkout Cancelled</h2>
          <p className="text-gray-600 mb-6">
            Your checkout process was cancelled. No charges have been made to your account.
          </p>

          <div className="space-y-3">
            <Button
              variant="primary"
              className="w-full"
              onPress={handleTryAgain}
              startContent={<RefreshCw className="w-4 h-4" />}
            >
              Try Again
            </Button>
            <Button
              variant="tertiary"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
              onPress={handleGoToPricing}
              startContent={<CreditCard className="w-4 h-4" />}
            >
              View Plans
            </Button>
            <Button
              variant="tertiary"
              className="w-full text-gray-600 hover:underline"
              onPress={handleGoHome}
              startContent={<ArrowLeft className="w-4 h-4" />}
            >
              Back to Home
            </Button>
          </div>

          <div className="mt-6 p-4 bg-primary-50 rounded-lg">
            <p className="text-sm text-primary-800">
              Need help? Contact our support team for assistance with your subscription.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default CheckoutCancel;
