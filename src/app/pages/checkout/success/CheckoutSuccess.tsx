/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@/shared/components/buttons';
import { Card, CardBody } from '@heroui/react';
import { ArrowRight, Check, Crown, Sparkles } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // Loading states removed for smooth UX

  const sessionId = searchParams.get('session_id');
  const planName = searchParams.get('plan') || 'Business Pro';
  const isDemo = searchParams.get('demo') === 'true';

  useEffect(() => {
    // Simulate verification delay
    const timer = setTimeout(() => {
      // No loading state to manage
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleGoToDashboard = () => {
    navigate('/my-business');
  };

  const handleGoToSettings = () => {
    navigate('/users/profile?tab=subscription');
  };

  const handleGoToReports = () => {
    navigate('/reports/new');
  };

  const handleManageBilling = () => {
    navigate('/account/settings');
  };

  useEffect(() => {
    // Auto-redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate('/reports/new');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  // Loading state removed for smooth UX

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-green-500/30 shadow-2xl">
          <CardBody className="p-8 md:p-12 text-center">
            <div className="space-y-8">
              {/* Success Icon */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="p-6 bg-green-600/20 rounded-full border-2 border-green-500/30">
                    <Check className="w-12 h-12 text-green-400" />
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <div className="p-2 bg-purple-600/20 rounded-full border border-purple-500/30">
                      <Crown className="w-6 h-6 text-purple-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Success Message */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Welcome to {planName}!
                </h1>
                <p className="text-zinc-300 text-lg leading-relaxed">
                  {isDemo
                    ? 'Your demo subscription has been activated. You now have full access to our AI-powered market intelligence platform.'
                    : 'Your subscription has been successfully activated! Your 30-day free trial has started, and you now have full access to our AI-powered market intelligence platform.'}
                </p>
              </div>

              {/* Features Highlight */}
              <div className="bg-zinc-900/60 rounded-xl p-6 border border-zinc-700/30">
                <div className="flex items-center gap-2 justify-center mb-4">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <span className="text-white font-semibold">What you get:</span>
                </div>

                <div className="grid md:grid-cols-2 gap-3 text-left">
                  {[
                    'Real-time cultural trend monitoring',
                    'Multi-platform analytics dashboard',
                    'Content performance tracking',
                    'Basic sentiment analysis',
                    'Campaign reports',
                    'Email support',
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Steps */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Ready to get started?</h3>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={handleGoToReports}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold flex items-center gap-2"
                    size="lg"
                  >
                    Start Exploring
                    <ArrowRight className="w-5 h-5" />
                  </Button>

                  <Button
                    onClick={handleManageBilling}
                    variant="tertiary"
                    className="border-zinc-600 hover:border-purple-500 text-zinc-300 hover:text-white px-6 py-3"
                    size="lg"
                  >
                    Manage Subscription
                  </Button>
                </div>
              </div>

              {/* Trial Info */}
              {!isDemo && (
                <div className="bg-yellow-600/10 border border-yellow-600/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 justify-center text-yellow-400 text-sm">
                    <Crown className="w-4 h-4" />
                    <span className="font-medium">
                      Your 30-day free trial is now active • No charges until{' '}
                      {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}

              {/* Session Info for Debug */}
              {sessionId && (
                <div className="text-xs text-zinc-500 border-t border-zinc-700/30 pt-4">
                  Session ID: {sessionId}
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
