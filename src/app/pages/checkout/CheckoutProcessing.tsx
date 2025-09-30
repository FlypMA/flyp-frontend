import { Button } from '@/shared/components/buttons';
import { Card, CardBody, Progress } from '@heroui/react';
import { ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UrlGenerator } from '../../../shared/services/urls/urlGenerator';

const CheckoutProcessing: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const sessionId = searchParams.get('session_id');
  const orderId = searchParams.get('order_id');

  const processingSteps = [
    'Validating payment information',
    'Processing payment',
    'Creating your subscription',
    'Setting up your account',
    'Finalizing setup',
  ];

  useEffect(() => {
    // Simulate processing steps
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Redirect to success page after completion
          setTimeout(() => {
            navigate(UrlGenerator.checkoutSuccess());
          }, 2000);
          return 100;
        }
        return prev + 20;
      });
    }, 2000);

    // Update current step
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= processingSteps.length - 1) {
          clearInterval(stepInterval);
          return processingSteps.length - 1;
        }
        return prev + 1;
      });
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, [navigate, processingSteps.length]);

  const handleGoHome = () => {
    navigate(UrlGenerator.root());
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <CardBody className="p-8 text-center">
          <Loader2 className="w-16 h-16 text-primary-500 mx-auto mb-4 animate-spin" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Processing Your Order</h2>
          <p className="text-gray-600 mb-6">
            Please wait while we process your subscription. This may take a few moments.
          </p>

          <div className="mb-6">
            <Progress value={progress} className="mb-4" color="primary" />
            <p className="text-sm text-gray-500">{progress}% complete</p>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Current Step:</h3>
            <div className="space-y-2">
              {processingSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 text-sm ${
                    index <= currentStep ? 'text-green-600' : 'text-gray-400'
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : index === currentStep ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                  )}
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {sessionId && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Session ID:</strong> {sessionId}
              </p>
              {orderId && (
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Order ID:</strong> {orderId}
                </p>
              )}
            </div>
          )}

          <Button
            variant="tertiary"
            className="w-full text-gray-600 hover:underline"
            onPress={handleGoHome}
            startContent={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Home
          </Button>

          <div className="mt-6 p-4 bg-primary-50 rounded-lg">
            <p className="text-sm text-primary-800">
              Do not close this window or navigate away while processing is in progress.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default CheckoutProcessing;
