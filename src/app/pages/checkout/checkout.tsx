import { Button } from '@/shared/components/buttons';
import { CustomDropdown, CustomInputField } from '@/shared/components/forms';
import Container from '@/shared/components/layout/container/Container';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { AlertCircle, ArrowLeft, Check, CreditCard, Lock, Shield, TrendingUp } from 'lucide-react';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createCheckoutSessionAPI } from '../../../shared/services/payments';

const planDetails = {
  starter: {
    name: 'Starter',
    description: 'Perfect for individual business owners',
    features: [
      'List 1 business for sale',
      'Basic business valuation',
      'Email support',
      'Standard listing visibility',
      'Basic analytics',
      'Document upload (up to 10MB)',
    ],
  },
  professional: {
    name: 'Professional',
    description: 'Ideal for growing businesses',
    features: [
      'List up to 3 businesses',
      'Advanced business valuation',
      'Priority support',
      'Enhanced listing visibility',
      'Advanced analytics & insights',
      'Document upload (up to 100MB)',
      'Lead management tools',
      'Custom listing templates',
    ],
  },
  enterprise: {
    name: 'Enterprise',
    description: 'For large businesses and brokers',
    features: [
      'Unlimited business listings',
      'Premium business valuation',
      'Dedicated account manager',
      'Maximum listing visibility',
      'Advanced analytics & reporting',
      'Unlimited document upload',
      'Advanced lead management',
      'White-label options',
      'API access',
      'Custom integrations',
    ],
  },
};

const CheckoutForm = ({
  selectedPlan,
  priceId,
  billing,
}: {
  selectedPlan: string;
  priceId: string;
  billing: string;
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    name: '',
    company: '',
    country: 'US',
  });

  // Form validation
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!customerInfo.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!customerInfo.name.trim()) {
      errors.name = 'Full name is required';
    }

    if (!customerInfo.country) {
      errors.country = 'Country is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create checkout session
      const result = await createCheckoutSessionAPI(priceId);

      if (!result.sessionId || !result.url) {
        setError('Failed to create checkout session');
        setLoading(false);
        return;
      }

      // The Stripe service should handle the redirect
      // If we reach here, something went wrong
      setError('Failed to redirect to payment. Please try again.');
      setLoading(false);
    } catch (err: unknown) {
      setError((err as Error).message || 'An unexpected error occurred');
      setLoading(false);
    }
  };

  const countries = [
    { key: 'US', label: 'United States' },
    { key: 'CA', label: 'Canada' },
    { key: 'GB', label: 'United Kingdom' },
    { key: 'AU', label: 'Australia' },
    { key: 'DE', label: 'Germany' },
    { key: 'FR', label: 'France' },
    { key: 'ES', label: 'Spain' },
    { key: 'IT', label: 'Italy' },
    { key: 'NL', label: 'Netherlands' },
    { key: 'SE', label: 'Sweden' },
    { key: 'NO', label: 'Norway' },
    { key: 'DK', label: 'Denmark' },
    { key: 'FI', label: 'Finland' },
    { key: 'CH', label: 'Switzerland' },
    { key: 'AT', label: 'Austria' },
    { key: 'BE', label: 'Belgium' },
    { key: 'IE', label: 'Ireland' },
    { key: 'PT', label: 'Portugal' },
    { key: 'LU', label: 'Luxembourg' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information */}
      <Card className="bg-zinc-900/80 border-zinc-700/40">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Contact Information</h3>
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <CustomInputField
                label="Full Name"
                type="text"
                placeholder="John Doe"
                value={customerInfo.name}
                onChange={e => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                onBlur={() => {}}
                name="name"
                required
                error={validationErrors.name}
                className="[&_input]:bg-zinc-800 [&_input]:text-white [&_label]:text-zinc-400 [&_.error]:text-red-400"
              />
            </div>
            <div>
              <CustomInputField
                label="Work Email"
                type="email"
                placeholder="john@agency.com"
                value={customerInfo.email}
                onChange={e => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                onBlur={() => {}}
                name="email"
                required
                error={validationErrors.email}
                className="[&_input]:bg-zinc-800 [&_input]:text-white [&_label]:text-zinc-400 [&_.error]:text-red-400"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <CustomInputField
                label="Company Name"
                type="text"
                placeholder="Your Agency"
                value={customerInfo.company}
                onChange={e => setCustomerInfo({ ...customerInfo, company: e.target.value })}
                onBlur={() => {}}
                name="company"
                className="[&_input]:bg-zinc-800 [&_input]:text-white [&_label]:text-zinc-400"
              />
            </div>
            <div>
              <CustomDropdown
                label="Country"
                placeholder="Select your country"
                options={countries.map(country => ({
                  value: country.key,
                  label: country.label,
                }))}
                value={customerInfo.country}
                onChange={value => setCustomerInfo({ ...customerInfo, country: value })}
                error={validationErrors.country}
                touched={!!validationErrors.country}
                required={true}
                name="country"
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Payment Information */}
      <Card className="bg-zinc-900/80 border-zinc-700/40">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-semibold text-white">Payment & Security</h3>
          </div>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-700/30">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <Shield className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-blue-200 font-medium mb-1">Secure Stripe Checkout</h4>
                  <p className="text-blue-300 text-sm leading-relaxed">
                    You&apos;ll be redirected to Stripe&apos;s secure payment page to complete your
                    purchase. Your payment information is encrypted and never stored on our servers.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="text-center p-3 bg-zinc-800/50 rounded-lg">
                <div className="text-xs text-zinc-400 mb-1">Accepted Cards</div>
                <div className="text-sm text-white font-medium">Visa, Mastercard</div>
              </div>
              <div className="text-center p-3 bg-zinc-800/50 rounded-lg">
                <div className="text-xs text-zinc-400 mb-1">Security</div>
                <div className="text-sm text-white font-medium">256-bit SSL</div>
              </div>
              <div className="text-center p-3 bg-zinc-800/50 rounded-lg">
                <div className="text-xs text-zinc-400 mb-1">Free Trial</div>
                <div className="text-sm text-white font-medium">14 Days</div>
              </div>
              <div className="text-center p-3 bg-zinc-800/50 rounded-lg">
                <div className="text-xs text-zinc-400 mb-1">Cancel</div>
                <div className="text-sm text-white font-medium">Anytime</div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="bg-red-900/40 border-red-700/40">
          <CardBody>
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <div>
                <p className="text-red-200 font-medium">Payment Error</p>
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={!validateForm() || loading}
        className="w-full"
      >
        {loading ? 'Processing...' : 'Complete Purchase'}
      </Button>

      {/* Terms and Security Notice */}
      <div className="space-y-3">
        <div className="flex items-center justify-center space-x-2 text-sm text-zinc-400">
          <Lock className="h-4 w-4" />
          <span>Secured by 256-bit SSL encryption</span>
        </div>
        <p className="text-xs text-zinc-500 text-center leading-relaxed">
          By clicking &quot;Complete Purchase&quot;, you agree to our{' '}
          <a href="/terms" className="text-purple-400 hover:text-purple-300 underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-purple-400 hover:text-purple-300 underline">
            Privacy Policy
          </a>
          . You can cancel your subscription at any time.
        </p>
      </div>
    </form>
  );
};

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const selectedPlan = searchParams.get('plan') || 'pro';
  const billing = searchParams.get('billing') || 'monthly';

  // Price mapping for demo
  const priceMapping = {
    starter: {
      monthly: 'price_starter_monthly',
      yearly: 'price_starter_yearly',
    },
    pro: {
      monthly: 'price_pro_monthly',
      yearly: 'price_pro_yearly',
    },
    enterprise: {
      monthly: 'price_enterprise_monthly',
      yearly: 'price_enterprise_yearly',
    },
  };

  const priceId =
    priceMapping[selectedPlan as keyof typeof priceMapping]?.[billing as 'monthly' | 'yearly'] ||
    priceMapping.pro.monthly;

  const planConfig =
    planDetails[selectedPlan as keyof typeof planDetails] || planDetails.professional;

  // Price calculation for display
  const basePrices = {
    starter: 99,
    pro: 499,
    enterprise: 2000,
  };

  const basePrice = basePrices[selectedPlan as keyof typeof basePrices] || 499;
  const monthlyPrice = basePrice;
  const yearlyPrice = Math.floor(basePrice * 10); // 10 months price for yearly
  const currentPrice = billing === 'yearly' ? yearlyPrice : monthlyPrice;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <Container>
        <div className="py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <Button
              variant="tertiary"
              startContent={<ArrowLeft className="h-4 w-4" />}
              onClick={() => navigate('/pricing')}
              className="mb-6 text-zinc-400 hover:text-white"
            >
              Back to Pricing
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Complete Your Order</h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Start your 14-day free trial with the {planConfig.name} plan
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="bg-zinc-900/80 border-zinc-700/40 overflow-hidden">
                <CardHeader className="px-6 pt-6 pb-4">
                  <h2 className="text-xl font-semibold text-white">Order Summary</h2>
                </CardHeader>
                <CardBody className="px-6 pb-6">
                  <div className="space-y-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-blue-600/20 rounded-lg flex-shrink-0">
                            <TrendingUp className="w-4 h-4 text-blue-400" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-semibold text-white truncate">
                              {planConfig.name} Plan
                            </h3>
                          </div>
                        </div>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                          {planConfig.description}
                        </p>
                        <p className="text-xs text-zinc-500 mt-1">
                          Billed {billing === 'yearly' ? 'annually' : 'monthly'}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-2xl font-bold text-white">
                          $
                          {billing === 'yearly'
                            ? yearlyPrice.toLocaleString()
                            : monthlyPrice.toLocaleString()}
                        </p>
                        <p className="text-sm text-zinc-400">
                          per {billing === 'yearly' ? 'year' : 'month'}
                        </p>
                        {billing === 'yearly' && (
                          <p className="text-xs text-green-400 font-medium">Save 2 months!</p>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-zinc-700 pt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-400">Subtotal</span>
                        <span className="text-white font-medium">
                          ${currentPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-400">14-day free trial</span>
                        <span className="text-green-400 font-medium">
                          -${currentPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-lg font-semibold border-t border-zinc-700 pt-3">
                        <span className="text-white">Due today</span>
                        <span className="text-white">$0</span>
                      </div>
                    </div>

                    <div className="bg-zinc-800/50 rounded-lg p-4">
                      <h4 className="font-medium text-white mb-3">What&apos;s included:</h4>
                      <ul className="space-y-2">
                        {planConfig.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="flex-shrink-0 mt-0.5">
                              <Check className="h-3 w-3 text-green-400" />
                            </div>
                            <span className="text-xs text-zinc-300 leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Checkout Form */}
            <div>
              <CheckoutForm selectedPlan={selectedPlan} priceId={priceId} billing={billing} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Checkout;
