import {
    Card,
    CardBody,
    CardHeader,
    Chip,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Progress,
    Select,
    SelectItem,
} from '@heroui/react';
import {
    AlertTriangle,
    Calendar,
    Clock,
    CreditCard,
    DollarSign,
    Download,
    Euro,
    Receipt,
    Shield,
    TrendingUp
} from 'lucide-react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button } from '../buttons/Button';
import { AnimatedTextarea } from '../forms';

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
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState<SuccessFee | null>(null);

  // Mock data
  useEffect(() => {
    setSuccessFees([
      {
        id: '1',
        transactionId: 'txn1',
        listingId: 'listing1',
        buyerId: 'buyer1',
        sellerId: 'seller1',
        transactionAmount: 2500000,
        currency: 'EUR',
        feePercentage: 5,
        feeAmount: 125000,
        status: 'invoiced',
        invoiceNumber: 'INV-2024-001',
        invoiceDate: '2024-01-15',
        dueDate: '2024-02-15',
        notes: 'Success fee for completed transaction',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
      },
      {
        id: '2',
        transactionId: 'txn2',
        listingId: 'listing2',
        buyerId: 'buyer2',
        sellerId: 'seller2',
        transactionAmount: 1800000,
        currency: 'EUR',
        feePercentage: 4.5,
        feeAmount: 81000,
        status: 'paid',
        invoiceNumber: 'INV-2024-002',
        invoiceDate: '2024-01-10',
        dueDate: '2024-02-10',
        paidDate: '2024-01-25',
        paymentMethod: 'bank_transfer',
        paymentReference: 'TXN-789456',
        notes: 'Success fee for completed transaction',
        createdAt: '2024-01-10T10:00:00Z',
        updatedAt: '2024-01-25T14:30:00Z',
      },
    ]);

    setRevenueMetrics({
      totalRevenue: 206000,
      monthlyRevenue: 81000,
      pendingFees: 125000,
      overdueFees: 0,
      averageFeeAmount: 103000,
      completionRate: 85,
      currency: 'EUR',
    });

    setPaymentMethods([
      {
        id: '1',
        type: 'bank_transfer',
        name: 'Bank Transfer',
        accountNumber: 'BE68 5390 0754 7034',
        isDefault: true,
      },
      {
        id: '2',
        type: 'stripe',
        name: 'Credit Card',
        isDefault: false,
      },
    ]);
  }, []);

  const formatCurrency = (amount: number, currency = 'EUR') => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'invoiced':
        return 'warning';
      case 'overdue':
        return 'danger';
      case 'pending':
        return 'default';
      case 'cancelled':
        return 'danger';
      default:
        return 'default';
    }
  };

  const handlePayment = (fee: SuccessFee) => {
    setSelectedFee(fee);
    setShowPaymentModal(true);
  };

  const handleDownloadInvoice = (fee: SuccessFee) => {
    // Mock download
    // console.log('Downloading invoice:', fee.invoiceNumber);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-green-600" />
              <div>
                <h2 className="text-2xl font-bold">Success Fee Collection</h2>
                <p className="text-gray-600">Manage and track success fees</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Chip variant="flat" color="success">
                <Shield className="w-3 h-3 mr-1" />
                Secure
              </Chip>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardBody className="text-center">
            <div className="p-3 bg-green-100 rounded-lg w-fit mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-green-600">
              {formatCurrency(revenueMetrics.totalRevenue)}
            </h3>
            <p className="text-sm text-gray-600">Total Revenue</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-3">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-blue-600">
              {formatCurrency(revenueMetrics.monthlyRevenue)}
            </h3>
            <p className="text-sm text-gray-600">This Month</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="p-3 bg-yellow-100 rounded-lg w-fit mx-auto mb-3">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-yellow-600">
              {formatCurrency(revenueMetrics.pendingFees)}
            </h3>
            <p className="text-sm text-gray-600">Pending Fees</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="p-3 bg-red-100 rounded-lg w-fit mx-auto mb-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-red-600">
              {formatCurrency(revenueMetrics.overdueFees)}
            </h3>
            <p className="text-sm text-gray-600">Overdue Fees</p>
          </CardBody>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'overview'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'fees'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('fees')}
        >
          Success Fees ({successFees.length})
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'payments'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('payments')}
        >
          Payment Methods
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Revenue Analytics</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Completion Rate</span>
                  <span className="text-sm text-gray-600">{revenueMetrics.completionRate}%</span>
                </div>
                <Progress value={revenueMetrics.completionRate} color="success" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Average Fee Amount</span>
                  <span className="text-sm text-gray-600">
                    {formatCurrency(revenueMetrics.averageFeeAmount)}
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Recent Activity</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                {successFees.slice(0, 3).map(fee => (
                  <div
                    key={fee.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Receipt className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          {formatCurrency(fee.feeAmount)} - {fee.invoiceNumber}
                        </p>
                        <p className="text-xs text-gray-600">
                          Transaction: {formatCurrency(fee.transactionAmount)}
                        </p>
                      </div>
                    </div>
                    <Chip size="sm" color={getStatusColor(fee.status)} variant="flat">
                      {fee.status}
                    </Chip>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Fees Tab */}
      {activeTab === 'fees' && (
        <div className="space-y-4">
          {successFees.map(fee => (
            <Card key={fee.id}>
              <CardBody>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Euro className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {formatCurrency(fee.feeAmount, fee.currency)}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {fee.feePercentage}% of {formatCurrency(fee.transactionAmount)} • Invoice:{' '}
                        {fee.invoiceNumber}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Chip size="sm" color={getStatusColor(fee.status)} variant="flat">
                          {fee.status}
                        </Chip>
                        <span className="text-xs text-gray-500">
                          Due: {new Date(fee.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {fee.status === 'invoiced' && (
                      <Button
                        size="sm"
                        variant="primary"
                        onPress={() => handlePayment(fee)}
                        startContent={<CreditCard className="w-4 h-4" />}
                      >
                        Pay Now
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="secondary"
                      onPress={() => handleDownloadInvoice(fee)}
                      startContent={<Download className="w-4 h-4" />}
                    >
                      Invoice
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {/* Payment Methods Tab */}
      {activeTab === 'payments' && (
        <div className="space-y-4">
          {paymentMethods.map(method => (
            <Card key={method.id}>
              <CardBody>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{method.name}</h3>
                      <p className="text-sm text-gray-600">{method.accountNumber || 'Connected'}</p>
                      {method.isDefault && (
                        <Chip size="sm" variant="flat" color="success">
                          Default
                        </Chip>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="secondary">
                      Edit
                    </Button>
                    {!method.isDefault && (
                      <Button size="sm" variant="danger">
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {/* Payment Modal */}
      <Modal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} size="lg">
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader>
                <h3 className="text-lg font-semibold">Process Payment</h3>
              </ModalHeader>
              <ModalBody>
                {selectedFee && (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Payment Details</h4>
                      <div className="space-y-1 text-sm">
                        <p>Amount: {formatCurrency(selectedFee.feeAmount, selectedFee.currency)}</p>
                        <p>Invoice: {selectedFee.invoiceNumber}</p>
                        <p>Due Date: {new Date(selectedFee.dueDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <Select label="Payment Method" placeholder="Select payment method">
                      {paymentMethods.map(method => (
                        <SelectItem key={method.id}>{method.name}</SelectItem>
                      ))}
                    </Select>

                    <AnimatedTextarea
                      label="Payment Notes"
                      placeholder="Optional notes..."
                      value=""
                      onChange={() => {}}
                      onBlur={() => {}}
                      name="paymentNotes"
                      minRows={2}
                    />
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onPress={onClose}>
                  Cancel
                </Button>
                <Button variant="primary" onPress={onClose}>
                  Process Payment
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SuccessFeeCollection;
