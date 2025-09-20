import { Button } from '@/shared/components/buttons';
import { authService } from '@/shared/services/auth';
import { logger } from '@/shared/utils/logger';
import { Badge, Card, CardBody, CardHeader, Divider } from '@heroui/react';
import {
    AlertTriangle,
    Calendar,
    CheckCircle,
    CreditCard,
    Download,
    Plus,
    Receipt,
    Settings,
} from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UrlGenerator } from '../../../../shared/services/urls/urlGenerator';
import { User as UserType } from '../../../../shared/types';

interface Subscription {
  id: string;
  plan: string;
  status: 'active' | 'cancelled' | 'expired' | 'trial';
  startDate: string;
  endDate: string;
  amount: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly';
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

interface Invoice {
  id: string;
  date: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed';
  description: string;
  downloadUrl: string;
}

const UserBilling: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const loadUserData = useCallback(async () => {
    try {
      const authResult = await authService.checkAuth();
      if (authResult.isAuthenticated && authResult.user) {
        setUser(authResult.user);
      } else {
        navigate(UrlGenerator.login());
      }
    } catch (error) {
      logger.error('Failed to load user data:', error);
      navigate(UrlGenerator.login());
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadUserData();
    loadBillingData();
  }, [loadUserData]);

  const loadBillingData = async () => {
    try {
      // TODO: Implement billing data API calls
      // const [subscriptionData, paymentMethodsData, invoicesData] = await Promise.all([
      //   AuthenticationService.getSubscription(),
      //   AuthenticationService.getPaymentMethods(),
      //   AuthenticationService.getInvoices(),
      // ]);

      // Mock data for now
      const mockSubscription: Subscription = {
        id: 'sub_123',
        plan: 'Professional',
        status: 'active',
        startDate: '2024-01-01',
        endDate: '2024-02-01',
        amount: 99,
        currency: 'EUR',
        billingCycle: 'monthly',
      };

      const mockPaymentMethods: PaymentMethod[] = [
        {
          id: 'pm_123',
          type: 'card',
          last4: '4242',
          brand: 'Visa',
          expiryMonth: 12,
          expiryYear: 2025,
          isDefault: true,
        },
        {
          id: 'pm_456',
          type: 'card',
          last4: '5555',
          brand: 'Mastercard',
          expiryMonth: 8,
          expiryYear: 2026,
          isDefault: false,
        },
      ];

      const mockInvoices: Invoice[] = [
        {
          id: 'inv_001',
          date: '2024-01-01',
          amount: 99,
          currency: 'EUR',
          status: 'paid',
          description: 'Professional Plan - Monthly',
          downloadUrl: '/invoices/inv_001.pdf',
        },
        {
          id: 'inv_002',
          date: '2023-12-01',
          amount: 99,
          currency: 'EUR',
          status: 'paid',
          description: 'Professional Plan - Monthly',
          downloadUrl: '/invoices/inv_002.pdf',
        },
        {
          id: 'inv_003',
          date: '2023-11-01',
          amount: 99,
          currency: 'EUR',
          status: 'paid',
          description: 'Professional Plan - Monthly',
          downloadUrl: '/invoices/inv_003.pdf',
        },
      ];

      setSubscription(mockSubscription);
      setPaymentMethods(mockPaymentMethods);
      setInvoices(mockInvoices);
    } catch (error) {
      logger.error('Failed to load billing data:', error);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      // TODO: Implement cancel subscription API call
      // await AuthenticationService.cancelSubscription();

      logger.info('Subscription cancelled');
      // Update subscription status
      if (subscription) {
        setSubscription({ ...subscription, status: 'cancelled' });
      }
    } catch (error) {
      logger.error('Failed to cancel subscription:', error);
    }
  };

  const handleUpdatePaymentMethod = () => {
    // TODO: Implement payment method update
    logger.info('Update payment method');
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    // TODO: Implement invoice download
    logger.info('Download invoice:', invoiceId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'cancelled':
        return 'danger';
      case 'expired':
        return 'warning';
      case 'trial':
        return 'primary';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <AlertTriangle className="w-4 h-4" />;
      case 'expired':
        return <AlertTriangle className="w-4 h-4" />;
      case 'trial':
        return <Calendar className="w-4 h-4" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading billing information...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please log in to view your billing information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Billing & Subscription</h1>
          <p className="text-gray-600 mt-2">Manage your subscription and payment methods</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Subscription */}
          <div className="lg:col-span-2">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Current Subscription</h3>
                    <p className="text-gray-600 text-sm">Your active subscription details</p>
                  </div>
                  {subscription && (
                    <div className="flex items-center gap-2">
                      {getStatusIcon(subscription.status)}
                      <Badge color={getStatusColor(subscription.status)}>
                        {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                {subscription ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900">{subscription.plan}</h4>
                        <p className="text-gray-600">Current plan</p>
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900">
                          {subscription.currency} {subscription.amount}
                        </h4>
                        <p className="text-gray-600">per {subscription.billingCycle}</p>
                      </div>
                    </div>

                    <Divider />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Start Date</p>
                        <p className="text-gray-900">
                          {new Date(subscription.startDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Next Billing Date</p>
                        <p className="text-gray-900">
                          {new Date(subscription.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        variant="primary"
                        onPress={() => navigate('/pricing')}
                        startContent={<Settings className="w-4 h-4" />}
                      >
                        Change Plan
                      </Button>
                      {subscription.status === 'active' && (
                        <Button
                          variant="danger"
                          onPress={handleCancelSubscription}
                        >
                          Cancel Subscription
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No Active Subscription
                    </h3>
                    <p className="text-gray-600 mb-4">Choose a plan to get started</p>
                    <Button
                      variant="primary"
                      onPress={() => navigate('/pricing')}
                      startContent={<Plus className="w-4 h-4" />}
                    >
                      Choose Plan
                    </Button>
                  </div>
                )}
              </CardBody>
            </Card>

            {/* Payment Methods */}
            <Card className="border border-gray-200 shadow-sm mt-8">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
                    <p className="text-gray-600 text-sm">Manage your payment methods</p>
                  </div>
                  <Button
                    variant="tertiary"
                    onPress={handleUpdatePaymentMethod}
                    startContent={<Plus className="w-4 h-4" />}
                  >
                    Add Payment Method
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                {paymentMethods.length > 0 ? (
                  <div className="space-y-4">
                    {paymentMethods.map(method => (
                      <div
                        key={method.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <CreditCard className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900">
                              {method.brand} •••• {method.last4}
                            </p>
                            <p className="text-sm text-gray-600">
                              Expires {method.expiryMonth}/{method.expiryYear}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {method.isDefault && (
                            <Badge variant="solid" color="success" size="sm">
                              Default
                            </Badge>
                          )}
                          <Button
                            size="sm"
                            variant="tertiary"
                            onPress={() => logger.info('Edit payment method')}
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Payment Methods</h3>
                    <p className="text-gray-600 mb-4">
                      Add a payment method to manage your subscription
                    </p>
                    <Button
                      variant="primary"
                      onPress={handleUpdatePaymentMethod}
                      startContent={<Plus className="w-4 h-4" />}
                    >
                      Add Payment Method
                    </Button>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>

          {/* Billing History */}
          <div className="lg:col-span-1">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <h3 className="text-lg font-semibold text-gray-900">Billing History</h3>
              </CardHeader>
              <CardBody className="pt-0">
                {invoices.length > 0 ? (
                  <div className="space-y-4">
                    {invoices.map(invoice => (
                      <div
                        key={invoice.id}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {invoice.currency} {invoice.amount}
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(invoice.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            color={invoice.status === 'paid' ? 'success' : 'warning'}
                            size="sm"
                          >
                            {invoice.status}
                          </Badge>
                          <Button
                            size="sm"
                            variant="tertiary"
                            onPress={() => handleDownloadInvoice(invoice.id)}
                            startContent={<Download className="w-3 h-3" />}
                          >
                            PDF
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Receipt className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Billing History</h3>
                    <p className="text-gray-600">Your invoices will appear here</p>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBilling;
