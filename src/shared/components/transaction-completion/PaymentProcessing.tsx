/**
 * Payment Processing
 * Location: src/shared/components/transaction-completion/PaymentProcessing.tsx
 * Purpose: Manage transaction payments and escrow
 */

import { Button } from '@/shared/components/buttons';
import { CustomNumberInputField } from '@/shared/components/forms';
import { Transaction, TransactionPayment } from '@/shared/types/transaction-completion';
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
} from '@heroui/react';
import { AlertTriangle, CheckCircle, Clock, DollarSign, Eye, Lock, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface PaymentProcessingProps {
  transactionId: string;
  userRole: 'buyer' | 'seller' | 'advisor';
  userId: string;
}

const PaymentProcessing: React.FC<PaymentProcessingProps> = ({
  transactionId,
  userRole,
  userId,
}) => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState<TransactionPayment | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentData, setPaymentData] = useState<Partial<TransactionPayment>>({});

  useEffect(() => {
    loadTransaction();
  }, [transactionId]);

  const loadTransaction = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await transactionService.getTransaction(transactionId);
      // setTransaction(response.data);

      // Mock data for now
      const mockTransaction: Transaction = {
        id: transactionId,
        offerId: 'offer-1',
        listingId: 'listing-1',
        buyerId: 'buyer-1',
        sellerId: 'seller-1',
        status: 'in_progress',
        type: 'asset_purchase',
        totalValue: 875000,
        currency: 'EUR',
        paymentStructure: {
          type: 'mixed',
          cashAmount: 600000,
          financedAmount: 275000,
        },
        closingDate: '2024-03-15',
        createdDate: '2024-01-15T10:30:00Z',
        lastUpdated: '2024-01-20T14:30:00Z',
        keyDates: [],
        parties: [],
        documents: [],
        closingChecklist: [],
        payments: [
          {
            id: 'payment-1',
            type: 'down_payment',
            amount: 100000,
            currency: 'EUR',
            dueDate: '2024-02-01',
            paidDate: '2024-01-30',
            status: 'paid',
            paymentMethod: 'wire_transfer',
            reference: 'TXN-001',
            fromParty: 'buyer-1',
            toParty: 'seller-1',
            description: 'Initial down payment',
            confirmationNumber: 'CONF-001',
            bankDetails: {
              bankName: 'First National Bank',
              accountNumber: '****1234',
              routingNumber: '123456789',
              swiftCode: 'FNBKUS33',
              accountHolder: 'Jane Buyer',
            },
          },
          {
            id: 'payment-2',
            type: 'closing_payment',
            amount: 500000,
            currency: 'EUR',
            dueDate: '2024-03-15',
            status: 'pending',
            paymentMethod: 'wire_transfer',
            fromParty: 'buyer-1',
            toParty: 'seller-1',
            description: 'Main closing payment',
          },
          {
            id: 'payment-3',
            type: 'financing_payment',
            amount: 275000,
            currency: 'EUR',
            dueDate: '2024-03-15',
            status: 'pending',
            paymentMethod: 'wire_transfer',
            fromParty: 'bank-1',
            toParty: 'seller-1',
            description: 'Financed portion',
          },
        ],
        postClosingItems: [],
        communications: [],
        version: 1,
        createdBy: 'buyer-1',
        requiresApproval: false,
        approvals: [],
        escrowDetails: {
          escrowAgent: 'Escrow Services Inc.',
          escrowAccount: 'ESC-001',
          escrowAmount: 100000,
          releaseConditions: [
            {
              id: 'condition-1',
              description: 'All closing documents signed',
              status: 'pending',
              requiredBy: 'lawyer-1',
            },
            {
              id: 'condition-2',
              description: 'Asset transfer completed',
              status: 'pending',
              requiredBy: 'buyer-1',
            },
          ],
          status: 'active',
        },
      };

      setTransaction(mockTransaction);
    } catch (error) {
      // TODO: Add proper error handling
    } finally {
      setIsLoading(false);
    }
  };

  const processPayment = async (payment: TransactionPayment) => {
    try {
      // TODO: Replace with actual API call
      // await transactionService.processPayment(payment.id, paymentData);

      // Mock payment processing
      setTransaction(prev => {
        if (!prev) return prev;

        const updatedPayments = prev.payments.map(p =>
          p.id === payment.id
            ? {
                ...p,
                status: 'paid' as const,
                paidDate: new Date().toISOString(),
                confirmationNumber: paymentData.confirmationNumber || `CONF-${Date.now()}`,
                bankDetails: paymentData.bankDetails,
              }
            : p
        );

        return { ...prev, payments: updatedPayments };
      });

      setIsPaymentModalOpen(false);
      setPaymentData({});
    } catch (error) {
      // TODO: Add proper error handling
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'overdue':
        return 'danger';
      case 'cancelled':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'overdue':
        return <AlertTriangle className="w-4 h-4" />;
      case 'cancelled':
        return <X className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getPaymentTypeColor = (type: string) => {
    switch (type) {
      case 'down_payment':
        return 'text-blue-600 bg-blue-100';
      case 'closing_payment':
        return 'text-green-600 bg-green-100';
      case 'financing_payment':
        return 'text-purple-600 bg-purple-100';
      case 'earnout_payment':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatPaymentType = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payments...</p>
        </div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="text-center py-8">
        <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No transaction found</h3>
        <p className="text-gray-600">Unable to load payment information.</p>
      </div>
    );
  }

  const paymentStats = {
    total: transaction.payments.length,
    paid: transaction.payments.filter(p => p.status === 'paid').length,
    pending: transaction.payments.filter(p => p.status === 'pending').length,
    overdue: transaction.payments.filter(p => p.status === 'overdue').length,
  };

  const totalPaid = transaction.payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPending = transaction.payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Payment Processing</h3>
          <p className="text-sm text-gray-600">Manage transaction payments and escrow</p>
        </div>
      </div>

      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <h4 className="text-md font-semibold flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Payment Summary
          </h4>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-1">
                {transaction.currency} {transaction.totalValue.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Value</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {transaction.currency} {totalPaid.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Paid</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {transaction.currency} {totalPending.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {paymentStats.paid}/{paymentStats.total}
              </div>
              <div className="text-sm text-gray-600">Payments</div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Escrow Information */}
      {transaction.escrowDetails && (
        <Card>
          <CardHeader>
            <h4 className="text-md font-semibold flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Escrow Information
            </h4>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-gray-900 mb-3">Escrow Details</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Agent:</span>
                    <span className="font-medium">{transaction.escrowDetails.escrowAgent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account:</span>
                    <span className="font-medium">{transaction.escrowDetails.escrowAccount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">
                      {transaction.currency}{' '}
                      {transaction.escrowDetails.escrowAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <Chip
                      size="sm"
                      color={transaction.escrowDetails.status === 'active' ? 'warning' : 'success'}
                      variant="flat"
                    >
                      {transaction.escrowDetails.status}
                    </Chip>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-3">Release Conditions</h5>
                <div className="space-y-2">
                  {transaction.escrowDetails.releaseConditions.map(condition => (
                    <div
                      key={condition.id}
                      className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          condition.status === 'satisfied'
                            ? 'bg-green-500'
                            : condition.status === 'pending'
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{condition.description}</p>
                        <p className="text-xs text-gray-600">Required by: {condition.requiredBy}</p>
                      </div>
                      <Chip
                        size="sm"
                        color={
                          condition.status === 'satisfied'
                            ? 'success'
                            : condition.status === 'pending'
                              ? 'warning'
                              : 'danger'
                        }
                        variant="flat"
                      >
                        {condition.status}
                      </Chip>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Payments List */}
      <Card>
        <CardHeader>
          <h4 className="text-md font-semibold">Payment Schedule</h4>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {transaction.payments.map(payment => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${getPaymentTypeColor(payment.type)}`}>
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h5 className="text-lg font-semibold text-gray-900">
                        {transaction.currency} {payment.amount.toLocaleString()}
                      </h5>
                      <Chip
                        size="sm"
                        color={getStatusColor(payment.status)}
                        variant="flat"
                        startContent={getStatusIcon(payment.status)}
                      >
                        {payment.status}
                      </Chip>
                      <Chip size="sm" variant="flat" color="default">
                        {formatPaymentType(payment.type)}
                      </Chip>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{payment.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Due: {new Date(payment.dueDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>From: {payment.fromParty}</span>
                      <span>•</span>
                      <span>To: {payment.toParty}</span>
                      {payment.paidDate && (
                        <>
                          <span>•</span>
                          <span>Paid: {new Date(payment.paidDate).toLocaleDateString()}</span>
                        </>
                      )}
                    </div>
                    {payment.confirmationNumber && (
                      <div className="mt-2">
                        <span className="text-xs text-gray-500">Confirmation: </span>
                        <span className="text-xs font-medium text-gray-900">
                          {payment.confirmationNumber}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onPress={() => setSelectedPayment(payment)}
                    startContent={<Eye className="w-4 h-4" />}
                  >
                    View Details
                  </Button>
                  {payment.status === 'pending' &&
                    userRole === 'buyer' &&
                    payment.fromParty === 'buyer-1' && (
                      <Button
                        size="sm"
                        variant="primary"
                        onPress={() => {
                          setSelectedPayment(payment);
                          setIsPaymentModalOpen(true);
                        }}
                      >
                        Process Payment
                      </Button>
                    )}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Payment Details Modal */}
      {selectedPayment && (
        <Modal isOpen={!!selectedPayment} onClose={() => setSelectedPayment(null)} size="lg">
          <ModalContent>
            <ModalHeader>
              <div className="flex items-center justify-between w-full">
                <h3 className="text-lg font-semibold">Payment Details</h3>
                <Button variant="secondary" isIconOnly onPress={() => setSelectedPayment(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Payment Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-medium">
                          {selectedPayment.currency} {selectedPayment.amount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">
                          {formatPaymentType(selectedPayment.type)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <Chip
                          size="sm"
                          color={getStatusColor(selectedPayment.status)}
                          variant="flat"
                        >
                          {selectedPayment.status}
                        </Chip>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Method:</span>
                        <span className="font-medium capitalize">
                          {selectedPayment.paymentMethod.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Timeline</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Due Date:</span>
                        <span className="font-medium">
                          {new Date(selectedPayment.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                      {selectedPayment.paidDate && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Paid Date:</span>
                          <span className="font-medium">
                            {new Date(selectedPayment.paidDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">From:</span>
                        <span className="font-medium">{selectedPayment.fromParty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">To:</span>
                        <span className="font-medium">{selectedPayment.toParty}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedPayment.description && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {selectedPayment.description}
                    </p>
                  </div>
                )}

                {selectedPayment.bankDetails && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Bank Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Bank:</span>
                          <span className="font-medium">
                            {selectedPayment.bankDetails.bankName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Account:</span>
                          <span className="font-medium">
                            {selectedPayment.bankDetails.accountNumber}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Routing:</span>
                          <span className="font-medium">
                            {selectedPayment.bankDetails.routingNumber}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {selectedPayment.bankDetails.swiftCode && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">SWIFT:</span>
                            <span className="font-medium">
                              {selectedPayment.bankDetails.swiftCode}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Holder:</span>
                          <span className="font-medium">
                            {selectedPayment.bankDetails.accountHolder}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedPayment.confirmationNumber && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Confirmation</h4>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">
                        <strong>Confirmation Number:</strong> {selectedPayment.confirmationNumber}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="secondary" onPress={() => setSelectedPayment(null)}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* Process Payment Modal */}
      <Modal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} size="lg">
        <ModalContent>
          <ModalHeader>
            <div className="flex items-center justify-between w-full">
              <h3 className="text-lg font-semibold">Process Payment</h3>
              <Button variant="secondary" isIconOnly onPress={() => setIsPaymentModalOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </ModalHeader>
          <ModalBody>
            {selectedPayment && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Payment Details</h4>
                  <p className="text-blue-800">
                    {selectedPayment.currency} {selectedPayment.amount.toLocaleString()} •
                    {formatPaymentType(selectedPayment.type)} • Due:{' '}
                    {new Date(selectedPayment.dueDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CustomNumberInputField
                    label="Payment Amount"
                    placeholder={selectedPayment.amount.toString()}
                    value={paymentData.amount?.toString() || selectedPayment.amount.toString()}
                    onChange={e =>
                      setPaymentData(prev => ({
                        ...prev,
                        amount: parseFloat(e.target.value) || selectedPayment.amount,
                      }))
                    }
                    onBlur={() => {}}
                    name="amount"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Method
                    </label>
                    <select
                      value={paymentData.paymentMethod || selectedPayment.paymentMethod}
                      onChange={e =>
                        setPaymentData(prev => ({
                          ...prev,
                          paymentMethod: e.target.value as any,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="wire_transfer">Wire Transfer</option>
                      <option value="ach">ACH Transfer</option>
                      <option value="check">Check</option>
                      <option value="escrow">Escrow</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmation Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter confirmation number"
                    value={paymentData.confirmationNumber || ''}
                    onChange={e =>
                      setPaymentData(prev => ({
                        ...prev,
                        confirmationNumber: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reference</label>
                  <input
                    type="text"
                    placeholder="Enter payment reference"
                    value={paymentData.reference || ''}
                    onChange={e =>
                      setPaymentData(prev => ({
                        ...prev,
                        reference: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onPress={() => setIsPaymentModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onPress={() => selectedPayment && processPayment(selectedPayment)}
              isDisabled={!paymentData.confirmationNumber}
            >
              Process Payment
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export { PaymentProcessing };
