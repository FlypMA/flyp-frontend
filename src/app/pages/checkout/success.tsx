import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams, Link } from 'react-router-dom';
import { Button, Card, CardBody } from '@heroui/react';
import {
  CheckCircle,
  ArrowRight,
  Mail,
  Calendar,
  Loader,
  AlertCircle,
  CreditCard,
  Shield,
} from 'lucide-react';
import Container from '../../components/main_UI/containers/container_default';
import stripeService from '../../services/payments/stripeService';

interface SubscriptionData {
  id: string;
  status: string;
  current_period_start: number;
  current_period_end: number;
  trial_end?: number;
  customer: {
    email: string;
    name: string;
  };
  items: {
    data: Array<{
      price: {
        id: string;
        nickname?: string;
        unit_amount: number;
        currency: string;
        recurring: {
          interval: string;
        };
      };
    }>;
  };
}

const CheckoutSuccess = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);

  // Get data from URL parameters (Stripe redirect) or location state (demo)
  const sessionId = searchParams.get('session_id');
  const planFromUrl = searchParams.get('plan');
  const isDemo = searchParams.get('demo') === 'true';
  const { subscriptionId, plan } = location.state || {};

  // Determine plan details
  const getPlanDetails = (planName: string) => {
    const plans = {
      starter: {
        name: 'Starter',
        color: 'zinc',
        features: [
          'Real-time trend dashboards',
          'Hashtag monitoring',
          'Basic cultural insights',
          'Email support',
          'Up to 3 team members',
        ],
      },
      pro: {
        name: 'Pro',
        color: 'blue',
        features: [
          'Everything in Starter',
          'Multi-platform analytics',
          'Sentiment analysis',
          'Priority support',
          'Up to 15 team members',
          'Custom reporting',
        ],
      },
      enterprise: {
        name: 'Enterprise',
        color: 'purple',
        features: [
          'Everything in Pro',
          'Dedicated analyst support',
          'White-label solutions',
          'Unlimited team members',
          'SLA guarantee',
          '24/7 phone support',
        ],
      },
    };
    return plans[planName as keyof typeof plans] || plans.pro;
  };

  const currentPlan = getPlanDetails(planFromUrl || plan?.name?.toLowerCase() || 'pro');

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      if (!sessionId && !subscriptionId) {
        setError('No session or subscription ID found');
        setLoading(false);
        return;
      }

      try {
        // In a real app, you'd fetch the subscription data from your backend using the session_id
        // For demo purposes, we'll simulate this
        if (isDemo || !sessionId) {
          // Demo mode - use mock data
          setSubscriptionData({
            id: subscriptionId || 'demo_subscription_123',
            status: 'trialing',
            current_period_start: Date.now() / 1000,
            current_period_end: Date.now() / 1000 + 30 * 24 * 60 * 60,
            trial_end: Date.now() / 1000 + 14 * 24 * 60 * 60,
            customer: {
              email: 'demo@example.com',
              name: 'Demo User',
            },
            items: {
              data: [
                {
                  price: {
                    id: `price_${planFromUrl || 'pro'}_monthly`,
                    nickname: `${currentPlan.name} Plan`,
                    unit_amount:
                      planFromUrl === 'starter'
                        ? 9900
                        : planFromUrl === 'enterprise'
                          ? 200000
                          : 49900,
                    currency: 'usd',
                    recurring: { interval: 'month' },
                  },
                },
              ],
            },
          });
        } else {
          // Real Stripe session - fetch subscription data
          const subscription = await stripeService.getSubscription(sessionId);
          if (subscription) {
            setSubscriptionData(subscription);
          } else {
            setError('Failed to retrieve subscription details');
          }
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load subscription details');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionData();
  }, [sessionId, subscriptionId, isDemo, planFromUrl, currentPlan.name]);

  if (loading) {
    return (
      <Container>
        <div className="py-16 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-center mb-8">
              <Loader className="w-16 h-16 text-blue-400 animate-spin" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Processing your subscription...</h1>
            <p className="text-zinc-300">Please wait while we set up your account.</p>
          </div>
        </div>
      </Container>
    );
  }

  if (error || !subscriptionData) {
    return (
      <Container>
        <div className="py-16 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-red-600/20 rounded-full">
                <AlertCircle className="w-16 h-16 text-red-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Something went wrong</h1>
            <p className="text-zinc-300 mb-8">
              {error || 'Unable to retrieve your subscription details.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                as={Link}
                to="/pricing"
                variant="bordered"
                size="lg"
                className="border-zinc-600 text-zinc-300 hover:border-blue-500"
              >
                Return to Pricing
              </Button>
              <Button as={Link} to="/contact" size="lg" color="primary">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const price = subscriptionData.items.data[0]?.price;
  const isTrialing = subscriptionData.status === 'trialing';

  return (
    <Container>
      <div className="py-16 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-green-600/20 rounded-full">
              <CheckCircle className="w-16 h-16 text-green-400" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to Ilara {currentPlan.name}!
          </h1>
          <p className="text-xl text-zinc-300 mb-8">
            {isTrialing
              ? 'Your subscription has been activated and your 14-day free trial has started.'
              : 'Your subscription is now active and ready to use.'}
          </p>

          {/* Subscription Details Card */}
          <Card className="bg-zinc-900/80 border-zinc-700/40 mb-8">
            <CardBody className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="w-4 h-4 text-blue-400" />
                    <span className="font-semibold text-white">Plan & Billing</span>
                  </div>
                  <p className="text-zinc-300 font-medium">
                    {price?.nickname || `${currentPlan.name} Plan`}
                  </p>
                  <p className="text-zinc-400 text-sm">
                    {formatAmount(price?.unit_amount || 0, price?.currency || 'usd')}/
                    {price?.recurring?.interval}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <span className="font-semibold text-white">
                      {isTrialing ? 'Trial Period' : 'Current Period'}
                    </span>
                  </div>
                  <p className="text-zinc-300 font-medium">
                    {isTrialing
                      ? `${Math.ceil(((subscriptionData.trial_end || 0) * 1000 - Date.now()) / (1000 * 60 * 60 * 24))} days remaining`
                      : 'Active'}
                  </p>
                  <p className="text-zinc-400 text-sm">
                    {isTrialing
                      ? `Ends ${formatDate(subscriptionData.trial_end || 0)}`
                      : `Until ${formatDate(subscriptionData.current_period_end)}`}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-green-400" />
                    <span className="font-semibold text-white">Account</span>
                  </div>
                  <p className="text-zinc-300 font-medium">{subscriptionData.customer.email}</p>
                  <p className="text-zinc-400 text-sm">Check inbox for details</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span className="font-semibold text-white">Status</span>
                  </div>
                  <p className="text-green-300 font-medium capitalize">{subscriptionData.status}</p>
                  <p className="text-zinc-400 text-sm">Ready to use</p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Plan Features */}
          <Card className="bg-zinc-900/80 border-zinc-700/40 mb-8">
            <CardBody className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                What&apos;s included in your plan:
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 text-left">
                {currentPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-8 border border-purple-500/30 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">Get Started in 4 Easy Steps</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Access Your Dashboard</h4>
                  <p className="text-zinc-400 text-sm">
                    Log in to explore your analytics dashboard and start monitoring trends
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Connect Data Sources</h4>
                  <p className="text-zinc-400 text-sm">
                    Link your social media accounts and configure data feeds
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Invite Your Team</h4>
                  <p className="text-zinc-400 text-sm">
                    Add team members and set up permissions for collaborative work
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Schedule Onboarding</h4>
                  <p className="text-zinc-400 text-sm">
                    Book a personalized training session with our experts
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/reports/new"
              className="bg-white hover:bg-zinc-100 text-black px-8 py-3 rounded-lg text-lg font-semibold transition-all flex items-center justify-center gap-2"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="bg-zinc-900 hover:bg-zinc-800 text-white border border-white/20 hover:border-white/30 px-8 py-3 rounded-lg text-lg font-semibold transition-all"
            >
              Schedule Onboarding
            </Link>
          </div>

          {/* Support Info */}
          <div className="text-center">
            <p className="text-zinc-400 text-sm mb-4">
              Need help getting started? Our team is here to support you every step of the way.
            </p>
            <div className="flex justify-center gap-6 text-sm flex-wrap">
              <a
                href="mailto:support@ilara.com"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                📧 Email Support
              </a>
              <a href="/help" className="text-blue-400 hover:text-blue-300 transition-colors">
                📚 Help Center
              </a>
              <a href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors">
                📞 Schedule Call
              </a>
              <a
                href="/account/settings"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                ⚙️ Account Settings
              </a>
            </div>
          </div>

          {/* Subscription Reference */}
          {(subscriptionData.id || sessionId) && (
            <div className="mt-8 p-4 bg-zinc-800/40 rounded-lg">
              <p className="text-xs text-zinc-500">
                Reference: {subscriptionData.id}{' '}
                {sessionId && sessionId !== subscriptionData.id && `• Session: ${sessionId}`}
                {isDemo && ' • Demo Mode'}
              </p>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default CheckoutSuccess;
