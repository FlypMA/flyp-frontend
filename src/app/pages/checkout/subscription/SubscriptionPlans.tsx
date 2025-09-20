import { Button } from '@/shared/components/buttons';
import { Badge, Card, CardBody, CardHeader, Switch } from '@heroui/react';
import {
    ArrowRight,
    Check,
    Crown,
    Sparkles,
    Star,
    Zap
} from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UrlGenerator } from '../../../../shared/services/urls/urlGenerator';

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
  buttonText: string;
  buttonVariant: 'primary' | 'secondary' | 'tertiary';
}

const SubscriptionPlans: React.FC = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for individual business owners',
      price: {
        monthly: 29,
        yearly: 290,
      },
      currency: 'EUR',
      features: [
        'List 1 business for sale',
        'Basic business valuation',
        'Email support',
        'Standard listing visibility',
        'Basic analytics',
        'Document upload (up to 10MB)',
      ],
      icon: Zap,
      color: 'blue',
      buttonText: 'Get Started',
      buttonVariant: 'secondary',
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Ideal for growing businesses',
      price: {
        monthly: 79,
        yearly: 790,
      },
      currency: 'EUR',
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
      popular: true,
      icon: Star,
      color: 'purple',
      buttonText: 'Most Popular',
      buttonVariant: 'primary',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large businesses and brokers',
      price: {
        monthly: 199,
        yearly: 1990,
      },
      currency: 'EUR',
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
      icon: Crown,
      color: 'gold',
      buttonText: 'Contact Sales',
      buttonVariant: 'secondary',
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

  const handleContactSales = () => {
    navigate(UrlGenerator.contact());
  };

  const getPrice = (plan: PricingPlan) => {
    const price = billingCycle === 'yearly' ? plan.price.yearly : plan.price.monthly;
    const monthlyPrice =
      billingCycle === 'yearly' ? Math.round(plan.price.yearly / 12) : plan.price.monthly;

    return {
      display: price,
      monthly: monthlyPrice,
      savings:
        billingCycle === 'yearly'
          ? Math.round(
              ((plan.price.monthly * 12 - plan.price.yearly) / (plan.price.monthly * 12)) * 100
            )
          : 0,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600 mb-8">
            Select the perfect plan for your business selling needs
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span
              className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}
            >
              Monthly
            </span>
            <Switch
              isSelected={billingCycle === 'yearly'}
              onValueChange={value => setBillingCycle(value ? 'yearly' : 'monthly')}
              size="lg"
            />
            <span
              className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}
            >
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <Badge variant="solid" color="success" size="sm">
                Save up to 20%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map(plan => {
            const Icon = plan.icon;
            const priceInfo = getPrice(plan);

            return (
              <Card
                key={plan.id}
                className={`relative border-2 transition-all hover:shadow-lg ${
                  plan.popular
                    ? 'border-purple-500 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge variant="solid" color="primary" size="lg" className="px-4 py-1">
                      <Sparkles className="w-4 h-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <div className="text-center w-full">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-${plan.color}-100 mb-4`}
                    >
                      <Icon className={`w-6 h-6 text-${plan.color}-600`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>

                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">
                        {plan.currency} {priceInfo.display}
                      </span>
                      <span className="text-gray-600 ml-2">
                        /{billingCycle === 'yearly' ? 'year' : 'month'}
                      </span>
                    </div>

                    {billingCycle === 'yearly' && priceInfo.savings > 0 && (
                      <div className="mb-4">
                        <Badge variant="solid" color="success" size="sm">
                          Save {priceInfo.savings}%
                        </Badge>
                        <p className="text-sm text-gray-500 mt-1">
                          {plan.currency} {priceInfo.monthly}/month billed annually
                        </p>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardBody className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    variant={plan.buttonVariant}
                    size="lg"
                    onPress={() => {
                      if (plan.id === 'enterprise') {
                        handleContactSales();
                      } else {
                        handleSelectPlan(plan.id);
                      }
                    }}
                    endContent={<ArrowRight className="w-4 h-4" />}
                  >
                    {plan.buttonText}
                  </Button>
                </CardBody>
              </Card>
            );
          })}
        </div>

        {/* Features Comparison */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Compare All Features
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Features</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Starter</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">
                    Professional
                  </th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">Business Listings</td>
                  <td className="text-center py-4 px-6 text-gray-600">1</td>
                  <td className="text-center py-4 px-6 text-gray-600">3</td>
                  <td className="text-center py-4 px-6 text-gray-600">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">Business Valuation</td>
                  <td className="text-center py-4 px-6 text-gray-600">Basic</td>
                  <td className="text-center py-4 px-6 text-gray-600">Advanced</td>
                  <td className="text-center py-4 px-6 text-gray-600">Premium</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">Support</td>
                  <td className="text-center py-4 px-6 text-gray-600">Email</td>
                  <td className="text-center py-4 px-6 text-gray-600">Priority</td>
                  <td className="text-center py-4 px-6 text-gray-600">Dedicated Manager</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">Analytics</td>
                  <td className="text-center py-4 px-6 text-gray-600">Basic</td>
                  <td className="text-center py-4 px-6 text-gray-600">Advanced</td>
                  <td className="text-center py-4 px-6 text-gray-600">Advanced + Reporting</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">Document Upload</td>
                  <td className="text-center py-4 px-6 text-gray-600">10MB</td>
                  <td className="text-center py-4 px-6 text-gray-600">100MB</td>
                  <td className="text-center py-4 px-6 text-gray-600">Unlimited</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 mb-2">Can I change my plan later?</h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time from your account settings.
              </p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h3>
              <p className="text-gray-600">
                We offer a 14-day free trial for all plans. No credit card required.
              </p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, and bank transfers for annual plans.
              </p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 mb-2">Can I cancel anytime?</h3>
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

export default SubscriptionPlans;
