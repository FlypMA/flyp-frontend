import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader, Button, Badge } from '@heroui/react';
import { 
  Check, 
  Star, 
  Crown, 
  Zap, 
  Building2, 
  Users, 
  Shield, 
  Headphones,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { UrlGenerator } from '../../../shared/services/urls/urlGenerator';

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  currency: string;
  features: string[];
  popular?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  recommended?: boolean;
}

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for small businesses getting started',
      price: {
        monthly: 29,
        yearly: 290,
      },
      currency: 'EUR',
      features: [
        'Up to 3 business listings',
        'Basic analytics dashboard',
        'Email support',
        'Standard listing visibility',
        'Basic valuation tools',
        'Mobile app access',
      ],
      icon: Zap,
      color: 'blue',
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Advanced features for growing businesses',
      price: {
        monthly: 99,
        yearly: 990,
      },
      currency: 'EUR',
      features: [
        'Everything in Starter',
        'Unlimited business listings',
        'Advanced analytics & insights',
        'Priority support',
        'Enhanced listing visibility',
        'Advanced valuation tools',
        'Document management',
        'Lead tracking',
        'Custom branding',
      ],
      icon: Star,
      color: 'purple',
      popular: true,
      recommended: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Full-scale solution for large organizations',
      price: {
        monthly: 299,
        yearly: 2990,
      },
      currency: 'EUR',
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        'White-label solutions',
        'API access',
        'Custom integrations',
        'Advanced security features',
        'SLA guarantee',
        'Training & onboarding',
        'Custom reporting',
      ],
      icon: Crown,
      color: 'gold',
    },
  ];

  const handleSelectPlan = (planId: string) => {
    navigate(UrlGenerator.checkout(), {
      state: {
        plan: planId,
        billing: billingCycle,
      },
    });
  };

  const getSavings = (plan: PricingPlan) => {
    const monthlyTotal = plan.price.monthly * 12;
    const yearlyTotal = plan.price.yearly;
    return monthlyTotal - yearlyTotal;
  };

  const getPrice = (plan: PricingPlan) => {
    return billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly;
  };

  const getBillingText = (plan: PricingPlan) => {
    if (billingCycle === 'yearly') {
      return `€${(plan.price.yearly / 12).toFixed(0)}/month billed annually`;
    }
    return `€${plan.price.monthly}/month`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Select the perfect plan for your business needs. All plans include our core features with no hidden fees.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                billingCycle === 'yearly' ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <Badge color="success" size="sm">
                Save up to 20%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const savings = getSavings(plan);
            const price = getPrice(plan);
            const billingText = getBillingText(plan);

            return (
              <Card
                key={plan.id}
                className={`relative border-2 transition-all duration-300 hover:shadow-xl ${
                  plan.popular
                    ? 'border-purple-500 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge
                      color="primary"
                      size="lg"
                      startContent={<Sparkles className="w-3 h-3" />}
                    >
                      Recommended
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <div className="text-center w-full">
                    <div className={`inline-flex p-3 rounded-full mb-4 ${
                      plan.color === 'blue' ? 'bg-blue-100' :
                      plan.color === 'purple' ? 'bg-purple-100' :
                      'bg-yellow-100'
                    }`}>
                      <Icon className={`w-8 h-8 ${
                        plan.color === 'blue' ? 'text-blue-600' :
                        plan.color === 'purple' ? 'text-purple-600' :
                        'text-yellow-600'
                      }`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">€{price}</span>
                      <span className="text-gray-600 ml-2">
                        {billingCycle === 'yearly' ? '/year' : '/month'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{billingText}</p>
                    {billingCycle === 'yearly' && savings > 0 && (
                      <p className="text-sm text-green-600 font-medium">
                        Save €{savings} per year
                      </p>
                    )}
                  </div>
                </CardHeader>

                <CardBody className="pt-0">
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                    size="lg"
                    onPress={() => handleSelectPlan(plan.id)}
                    endContent={<ArrowRight className="w-4 h-4" />}
                  >
                    Choose {plan.name}
                  </Button>
                </CardBody>
              </Card>
            );
          })}
        </div>

        {/* Features Comparison */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Compare All Features
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Features</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Starter</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Professional</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">Business Listings</td>
                  <td className="text-center py-4 px-6">Up to 3</td>
                  <td className="text-center py-4 px-6">Unlimited</td>
                  <td className="text-center py-4 px-6">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">Analytics Dashboard</td>
                  <td className="text-center py-4 px-6">Basic</td>
                  <td className="text-center py-4 px-6">Advanced</td>
                  <td className="text-center py-4 px-6">Advanced</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">Support</td>
                  <td className="text-center py-4 px-6">Email</td>
                  <td className="text-center py-4 px-6">Priority</td>
                  <td className="text-center py-4 px-6">Dedicated Manager</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">API Access</td>
                  <td className="text-center py-4 px-6">-</td>
                  <td className="text-center py-4 px-6">-</td>
                  <td className="text-center py-4 px-6">✓</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">White-label</td>
                  <td className="text-center py-4 px-6">-</td>
                  <td className="text-center py-4 px-6">-</td>
                  <td className="text-center py-4 px-6">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I change my plan later?
              </h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-600">
                Yes, all plans come with a 14-day free trial. No credit card required to start.
              </p>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, and bank transfers for annual plans.
              </p>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I cancel anytime?
              </h3>
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time. No cancellation fees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
