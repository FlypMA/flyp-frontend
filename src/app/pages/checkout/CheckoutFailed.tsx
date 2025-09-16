import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader, Button } from '@heroui/react';
import { AlertTriangle, ArrowLeft, RefreshCw, CreditCard, Mail } from 'lucide-react';
import { UrlGenerator } from '../../../shared/services/urls/urlGenerator';

const CheckoutFailed: React.FC = () => {
  const navigate = useNavigate();

  const handleTryAgain = () => {
    navigate(UrlGenerator.checkout());
  };

  const handleGoToPricing = () => {
    navigate(UrlGenerator.subscriptionPlans());
  };

  const handleContactSupport = () => {
    navigate(UrlGenerator.contact());
  };

  const handleGoHome = () => {
    navigate(UrlGenerator.root());
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <CardBody className="p-8 text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Failed</h2>
          <p className="text-gray-600 mb-6">
            We encountered an issue processing your payment. Please try again or contact support if the problem persists.
          </p>
          
          <div className="space-y-3">
            <Button
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
              onPress={handleTryAgain}
              startContent={<RefreshCw className="w-4 h-4" />}
            >
              Try Again
            </Button>
            <Button
              variant="bordered"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
              onPress={handleGoToPricing}
              startContent={<CreditCard className="w-4 h-4" />}
            >
              View Plans
            </Button>
            <Button
              variant="bordered"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
              onPress={handleContactSupport}
              startContent={<Mail className="w-4 h-4" />}
            >
              Contact Support
            </Button>
            <Button
              variant="light"
              className="w-full text-gray-600 hover:underline"
              onPress={handleGoHome}
              startContent={<ArrowLeft className="w-4 h-4" />}
            >
              Back to Home
            </Button>
          </div>

          <div className="mt-6 p-4 bg-red-50 rounded-lg">
            <h3 className="text-sm font-medium text-red-800 mb-2">Common Issues:</h3>
            <ul className="text-sm text-red-700 text-left space-y-1">
              <li>• Insufficient funds in your account</li>
              <li>• Card expired or invalid</li>
              <li>• Bank declined the transaction</li>
              <li>• Network connectivity issues</li>
            </ul>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default CheckoutFailed;
