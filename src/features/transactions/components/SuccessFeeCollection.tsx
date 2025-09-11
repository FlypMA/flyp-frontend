import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  Button,
  Progress,
  Chip,
  Select,
  SelectItem,
  Tabs,
  Tab,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@heroui/react';
import {
  DollarSign,
  CreditCard,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  Download,
  Send,
  Calendar,
  TrendingUp,
  BarChart3,
  Receipt,
  Euro,
  Percent,
  ArrowRight,
  History,
  Shield,
  Banknote,
  Zap,
} from 'lucide-react';
import { AnimatedInput, AnimatedTextarea } from '../forms';

interface SuccessFee {
  id: string;
  transactionId: string;
  listingId: string;
  buyerId: string;
  sellerId: string;
  transactionAmount: number;
  currency: string;
  feePercentage: number;
  feeAmount: number;
  status: 'pending' | 'invoiced' | 'paid' | 'overdue' | 'cancelled';
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  paidDate?: string;
  paymentMethod?: string;
  paymentReference?: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

interface RevenueMetrics {
  totalRevenue: number;
  monthlyRevenue: number;
  pendingFees: number;
  overdueFees: number;
  averageFeeAmount: number;
  completionRate: number;
  currency: string;
}

interface PaymentMethod {
  id: string;
  type: 'bank_transfer' | 'credit_card' | 'paypal' | 'stripe';
  name: string;
  accountNumber?: string;
  isDefault: boolean;
}

interface SuccessFeeCollectionProps {
  listingId?: string;
  buyerId?: string;
  sellerId?: string;
}

const SuccessFeeCollection: React.FC<SuccessFeeCollectionProps> = ({
  listingId,
  buyerId,
  sellerId,
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [successFees, setSuccessFees] = useState<SuccessFee[]>([]);
  const [revenueMetrics, setRevenueMetrics] = useState<RevenueMetrics>({
    totalRevenue: 0,
    monthlyRevenue: 0,
    pendingFees: 0,
    overdueFees: 0,
    averageFeeAmount: 0,
    completionRate: 0,
    currency: 'EUR',
  });
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedFee, setSelectedFee] = useState<SuccessFee | null>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentUser, setCurrentUser] = useState('admin'); // 'admin', 'buyer', 'seller'

  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    dueDate: '',
    notes: '',
  });

  const [paymentData, setPaymentData] = useState({
    paymentMethod: '',
    paymentReference: '',
    amount: '',
    notes: '',
  });

  // Mock data initialization
  useEffect(() => {
    setSuccessFees([
      {
        id: '1',
        transactionId: 'txn_001',
        listingId: 'listing_001',
        buyerId: 'buyer_001',
        sellerId: 'seller_001',
        transactionAmount: 2500000,
        currency: 'EUR',
        feePercentage: 0.5,
        feeAmount: 12500,
        status: 'paid',
        invoiceNumber: 'INV-2024-001',
        invoiceDate: '2024-01-15',
        dueDate: '2024-02-15',
        paidDate: '2024-01-20',
        paymentMethod: 'bank_transfer',
        paymentReference: 'REF-2024-001',
        notes: 'Success fee for completed transaction',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-20T14:30:00Z',
      },
      {
        id: '2',
        transactionId: 'txn_002',
        listingId: 'listing_002',
        buyerId: 'buyer_002',
        sellerId: 'seller_002',
        transactionAmount: 1800000,
        currency: 'EUR',
        feePercentage: 0.5,
        feeAmount: 9000,
        status: 'invoiced',
        invoiceNumber: 'INV-2024-002',
        invoiceDate: '2024-01-20',
        dueDate: '2024-02-20',
        notes: 'Success fee for technology business sale',
        createdAt: '2024-01-20T09:00:00Z',
        updatedAt: '2024-01-20T09:00:00Z',
      },
      {
        id: '3',
        transactionId: 'txn_003',
        listingId: 'listing_003',
        buyerId: 'buyer_003',
        sellerId: 'seller_003',
        transactionAmount: 3200000,
        currency: 'EUR',
        feePercentage: 0.5,
        feeAmount: 16000,
        status: 'overdue',
        invoiceNumber: 'INV-2024-003',
        invoiceDate: '2024-01-10',
        dueDate: '2024-02-10',
        notes: 'Success fee for manufacturing business',
        createdAt: '2024-01-10T11:00:00Z',
        updatedAt: '2024-01-10T11:00:00Z',
      },
    ]);

    setRevenueMetrics({
      totalRevenue: 37500,
      monthlyRevenue: 21500,
      pendingFees: 25000,
      overdueFees: 16000,
      averageFeeAmount: 12500,
      completionRate: 85,
      currency: 'EUR',
    });

    setPaymentMethods([
      {
        id: '1',
        type: 'bank_transfer',
        name: 'Bank Transfer',
        accountNumber: 'BE12 3456 7890 1234',
        isDefault: true,
      },
      {
        id: '2',
        type: 'credit_card',
        name: 'Credit Card',
        isDefault: false,
      },
      {
        id: '3',
        type: 'stripe',
        name: 'Stripe Payment',
        isDefault: false,
      },
    ]);
  }, []);

  const handleGenerateInvoice = () => {
    if (!selectedFee) return;

    const updatedFee: SuccessFee = {
      ...selectedFee,
      status: 'invoiced',
      invoiceNumber: invoiceData.invoiceNumber || `INV-${Date.now()}`,
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: invoiceData.dueDate,
      notes: invoiceData.notes,
      updatedAt: new Date().toISOString(),
    };

    setSuccessFees(prev => prev.map(fee => (fee.id === selectedFee.id ? updatedFee : fee)));

    setShowInvoiceModal(false);
    setInvoiceData({
      invoiceNumber: '',
      dueDate: '',
      notes: '',
    });
  };

  const handleRecordPayment = () => {
    if (!selectedFee) return;

    const updatedFee: SuccessFee = {
      ...selectedFee,
      status: 'paid',
      paidDate: new Date().toISOString().split('T')[0],
      paymentMethod: paymentData.paymentMethod,
      paymentReference: paymentData.paymentReference,
      notes: paymentData.notes,
      updatedAt: new Date().toISOString(),
    };

    setSuccessFees(prev => prev.map(fee => (fee.id === selectedFee.id ? updatedFee : fee)));

    // Update revenue metrics
    setRevenueMetrics(prev => ({
      ...prev,
      totalRevenue: prev.totalRevenue + selectedFee.feeAmount,
      monthlyRevenue: prev.monthlyRevenue + selectedFee.feeAmount,
      pendingFees: prev.pendingFees - selectedFee.feeAmount,
    }));

    setShowPaymentModal(false);
    setPaymentData({
      paymentMethod: '',
      paymentReference: '',
      amount: '',
      notes: '',
    });
  };

  const handleSendReminder = (feeId: string) => {
    // TODO: Implement reminder sending logic
    console.log('Sending reminder for fee:', feeId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'invoiced':
        return 'primary';
      case 'overdue':
        return 'danger';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const getDaysOverdue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = today.getTime() - due.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Success Fee Collection</h1>
          <p className="text-neutral-600">Manage transaction success fees and revenue collection</p>
        </div>
        <div className="flex items-center gap-4">
          <Chip color="primary" variant="flat">
            <Shield className="w-4 h-4 mr-1" />
            Secure Payments
          </Chip>
          <Button
            color="primary"
            variant="bordered"
            startContent={<Download className="w-4 h-4" />}
          >
            Export Report
          </Button>
        </div>
      </div>

      {/* Revenue Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border border-neutral-200">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Total Revenue</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {formatCurrency(revenueMetrics.totalRevenue, revenueMetrics.currency)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardBody>
        </Card>

        <Card className="border border-neutral-200">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {formatCurrency(revenueMetrics.monthlyRevenue, revenueMetrics.currency)}
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
          </CardBody>
        </Card>

        <Card className="border border-neutral-200">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Pending Fees</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {formatCurrency(revenueMetrics.pendingFees, revenueMetrics.currency)}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardBody>
        </Card>

        <Card className="border border-neutral-200">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Completion Rate</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {revenueMetrics.completionRate}%
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs
        selectedKey={activeTab}
        onSelectionChange={key => setActiveTab(key as string)}
        className="w-full"
      >
        <Tab key="overview" title="Overview">
          <Card>
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-neutral-900">Success Fee Overview</h2>
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-neutral-500" />
                  <span className="text-sm text-neutral-600">
                    {successFees.length} fees •{' '}
                    {successFees.filter(f => f.status === 'paid').length} paid
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {successFees.map(fee => (
                  <Card key={fee.id} className="border border-neutral-200">
                    <CardBody className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-neutral-900">
                            {formatCurrency(fee.feeAmount, fee.currency)}
                          </h3>
                          <Chip color={getStatusColor(fee.status)}>
                            {fee.status.replace('_', ' ')}
                          </Chip>
                          {fee.status === 'overdue' && (
                            <Chip color="danger" variant="flat">
                              {getDaysOverdue(fee.dueDate)} days overdue
                            </Chip>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-neutral-600">Transaction Value</p>
                          <p className="text-lg font-semibold text-neutral-900">
                            {formatCurrency(fee.transactionAmount, fee.currency)}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="font-medium text-neutral-700">Invoice #:</span>
                          <p className="text-neutral-900">{fee.invoiceNumber}</p>
                        </div>
                        <div>
                          <span className="font-medium text-neutral-700">Fee Rate:</span>
                          <p className="text-neutral-900">{fee.feePercentage}%</p>
                        </div>
                        <div>
                          <span className="font-medium text-neutral-700">Due Date:</span>
                          <p className="text-neutral-900">{fee.dueDate}</p>
                        </div>
                        <div>
                          <span className="font-medium text-neutral-700">Status:</span>
                          <p className="text-neutral-900 capitalize">{fee.status}</p>
                        </div>
                      </div>

                      {fee.notes && (
                        <div className="mb-4">
                          <span className="font-medium text-neutral-700">Notes:</span>
                          <p className="text-neutral-900 mt-1">{fee.notes}</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="bordered"
                            startContent={<FileText className="w-4 h-4" />}
                            onPress={() => {
                              setSelectedFee(fee);
                              setShowInvoiceModal(true);
                            }}
                          >
                            View Invoice
                          </Button>
                          {fee.status === 'pending' && (
                            <Button
                              size="sm"
                              color="primary"
                              startContent={<Send className="w-4 h-4" />}
                              onPress={() => {
                                setSelectedFee(fee);
                                setShowInvoiceModal(true);
                              }}
                            >
                              Generate Invoice
                            </Button>
                          )}
                          {fee.status === 'invoiced' && (
                            <Button
                              size="sm"
                              color="success"
                              startContent={<CheckCircle className="w-4 h-4" />}
                              onPress={() => {
                                setSelectedFee(fee);
                                setShowPaymentModal(true);
                              }}
                            >
                              Record Payment
                            </Button>
                          )}
                          {fee.status === 'overdue' && (
                            <Button
                              size="sm"
                              color="warning"
                              startContent={<AlertTriangle className="w-4 h-4" />}
                              onPress={() => handleSendReminder(fee.id)}
                            >
                              Send Reminder
                            </Button>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="bordered"
                            startContent={<Download className="w-4 h-4" />}
                          >
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </CardBody>
          </Card>
        </Tab>

        <Tab key="analytics" title="Analytics">
          <Card>
            <CardBody className="p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Revenue Analytics</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border border-neutral-200">
                  <CardBody className="p-6">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">Revenue Trends</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-600">This Month</span>
                        <span className="font-medium text-neutral-900">
                          {formatCurrency(revenueMetrics.monthlyRevenue, revenueMetrics.currency)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-600">Last Month</span>
                        <span className="font-medium text-neutral-900">
                          {formatCurrency(
                            revenueMetrics.monthlyRevenue * 0.8,
                            revenueMetrics.currency
                          )}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-600">Growth</span>
                        <span className="font-medium text-green-600">+25%</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                <Card className="border border-neutral-200">
                  <CardBody className="p-6">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">Payment Status</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-600">Paid</span>
                        <span className="font-medium text-green-600">
                          {successFees.filter(f => f.status === 'paid').length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-600">Pending</span>
                        <span className="font-medium text-yellow-600">
                          {successFees.filter(f => f.status === 'invoiced').length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-600">Overdue</span>
                        <span className="font-medium text-red-600">
                          {successFees.filter(f => f.status === 'overdue').length}
                        </span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-neutral-700">
                      Payment received for INV-2024-001
                    </span>
                    <span className="text-xs text-neutral-500 ml-auto">2 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-neutral-700">
                      Invoice generated for INV-2024-002
                    </span>
                    <span className="text-xs text-neutral-500 ml-auto">1 day ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-neutral-700">
                      Payment overdue for INV-2024-003
                    </span>
                    <span className="text-xs text-neutral-500 ml-auto">3 days ago</span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>

        <Tab key="settings" title="Settings">
          <Card>
            <CardBody className="p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Payment Settings</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                    Default Success Fee Rate
                  </h3>
                  <div className="flex items-center gap-4">
                    <AnimatedInput
                      label="Fee Percentage"
                      placeholder="0.5"
                      type="number"
                      value="0.5"
                      onChange={() => {}}
                      endContent={<span className="text-foreground-400">%</span>}
                      name="feeRate"
                    />
                    <Button color="primary">Update Rate</Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Payment Methods</h3>
                  <div className="space-y-3">
                    {paymentMethods.map(method => (
                      <div
                        key={method.id}
                        className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Banknote className="w-5 h-5 text-neutral-500" />
                          <div>
                            <p className="font-medium text-neutral-900">{method.name}</p>
                            {method.accountNumber && (
                              <p className="text-sm text-neutral-600">{method.accountNumber}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {method.isDefault && (
                            <Chip size="sm" color="primary">
                              Default
                            </Chip>
                          )}
                          <Button size="sm" variant="bordered">
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>

      {/* Generate Invoice Modal */}
      <Modal isOpen={showInvoiceModal} onClose={() => setShowInvoiceModal(false)} size="2xl">
        <ModalContent>
          <ModalHeader>Generate Invoice</ModalHeader>
          <ModalBody>
            {selectedFee && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-neutral-700">Transaction Amount:</span>
                    <p className="text-lg font-semibold text-neutral-900">
                      {formatCurrency(selectedFee.transactionAmount, selectedFee.currency)}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-neutral-700">Success Fee:</span>
                    <p className="text-lg font-semibold text-primary-600">
                      {formatCurrency(selectedFee.feeAmount, selectedFee.currency)}
                    </p>
                  </div>
                </div>

                <AnimatedInput
                  label="Invoice Number"
                  placeholder="Enter invoice number"
                  value={invoiceData.invoiceNumber}
                  onChange={value => setInvoiceData({ ...invoiceData, invoiceNumber: value })}
                  name="invoiceNumber"
                />

                <AnimatedInput
                  label="Due Date"
                  placeholder="Select due date"
                  type="date"
                  value={invoiceData.dueDate}
                  onChange={value => setInvoiceData({ ...invoiceData, dueDate: value })}
                  name="dueDate"
                />

                <AnimatedTextarea
                  variant="standalone"
                  label="Invoice Notes"
                  placeholder="Add any notes for the invoice"
                  value={invoiceData.notes}
                  onChange={value => setInvoiceData({ ...invoiceData, notes: value })}
                  name="notes"
                />
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="bordered" onPress={() => setShowInvoiceModal(false)}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleGenerateInvoice}>
              Generate Invoice
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Record Payment Modal */}
      <Modal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} size="2xl">
        <ModalContent>
          <ModalHeader>Record Payment</ModalHeader>
          <ModalBody>
            {selectedFee && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-neutral-700">Invoice Amount:</span>
                    <p className="text-lg font-semibold text-neutral-900">
                      {formatCurrency(selectedFee.feeAmount, selectedFee.currency)}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-neutral-700">Due Date:</span>
                    <p className="text-lg font-semibold text-neutral-900">{selectedFee.dueDate}</p>
                  </div>
                </div>

                <Select
                  label="Payment Method"
                  placeholder="Select payment method"
                  value={paymentData.paymentMethod}
                  onSelectionChange={keys =>
                    setPaymentData({ ...paymentData, paymentMethod: Array.from(keys)[0] as string })
                  }
                >
                  {paymentMethods.map(method => (
                    <SelectItem key={method.id}>{method.name}</SelectItem>
                  ))}
                </Select>

                <AnimatedInput
                  label="Payment Reference"
                  placeholder="Enter payment reference"
                  value={paymentData.paymentReference}
                  onChange={value => setPaymentData({ ...paymentData, paymentReference: value })}
                  name="paymentReference"
                />

                <AnimatedInput
                  label="Payment Amount"
                  placeholder="Enter payment amount"
                  type="number"
                  value={paymentData.amount}
                  onChange={value => setPaymentData({ ...paymentData, amount: value })}
                  startContent={<span className="text-foreground-400">€</span>}
                  name="amount"
                />

                <AnimatedTextarea
                  variant="standalone"
                  label="Payment Notes"
                  placeholder="Add any notes about the payment"
                  value={paymentData.notes}
                  onChange={value => setPaymentData({ ...paymentData, notes: value })}
                  name="notes"
                />
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="bordered" onPress={() => setShowPaymentModal(false)}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleRecordPayment}>
              Record Payment
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SuccessFeeCollection;
