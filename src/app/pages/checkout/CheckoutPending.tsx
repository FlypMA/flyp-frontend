import { Button } from '@/shared/components/buttons';
import { Card, CardBody, Progress } from '@heroui/react';
import { AlertTriangle, ArrowLeft, CheckCircle, Clock } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UrlGenerator } from '../../../shared/services/urls/urlGenerator';

const CheckoutPending: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'pending' | 'processing' | 'completed' | 'failed'>(
    'pending'
  );

  const sessionId = searchParams.get('session_id');
  const orderId = searchParams.get('order_id');

  useEffect(() => {
    // Simulate payment processing
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setStatus('completed');
          clearInterval(interval);
          // Redirect to success page after completion
          setTimeout(() => {
            navigate(UrlGenerator.checkoutSuccess());
          }, 2000);
          return 100;
        }
        return prev + 10;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  const handleGoHome = () => {
    navigate(UrlGenerator.root());
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'pending':
        return <Clock className="w-16 h-16 text-yellow-500 mx-auto mb-4" />;
      case 'processing':
        return <Clock className="w-16 h-16 text-primary-500 mx-auto mb-4 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />;
      case 'failed':
        return <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />;
      default:
        return <Clock className="w-16 h-16 text-yellow-500 mx-auto mb-4" />;
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'pending':
        return 'Payment Pending';
      case 'processing':
        return 'Processing Payment';
      case 'completed':
        return 'Payment Successful';
      case 'failed':
        return 'Payment Failed';
      default:
        return 'Payment Pending';
    }
  };

  const getStatusDescription = () => {
    switch (status) {
      case 'pending':
        return 'Your payment is being processed. Please wait while we confirm your transaction.';
      case 'processing':
        return 'We are processing your payment. This may take a few moments.';
      case 'completed':
        return 'Your payment has been successfully processed. Redirecting to your dashboard...';
      case 'failed':
        return 'There was an issue processing your payment. Please try again.';
      default:
        return 'Your payment is being processed. Please wait while we confirm your transaction.';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <CardBody className="p-8 text-center">
          {getStatusIcon()}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{getStatusMessage()}</h2>
          <p className="text-gray-600 mb-6">{getStatusDescription()}</p>

          {status === 'pending' || status === 'processing' ? (
            <div className="mb-6">
              <Progress value={progress} className="mb-2" color="primary" />
              <p className="text-sm text-gray-500">{progress}% complete</p>
            </div>
          ) : null}

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

          {status === 'failed' && (
            <div className="space-y-3 mb-6">
              <Button
                variant="primary"
                className="w-full"
                onPress={() => navigate(UrlGenerator.checkout())}
              >
                Try Again
              </Button>
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
              If you continue to experience issues, please contact our support team.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default CheckoutPending;
