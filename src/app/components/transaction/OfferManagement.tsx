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
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Send,
  Calendar,
  Users,
  FileText,
  BarChart3,
  AlertTriangle,
  Shield,
  Euro,
  Percent,
  ArrowRight,
  ArrowLeft,
  History,
} from 'lucide-react';
import { AnimatedInput, AnimatedTextarea } from '../forms';

interface Offer {
  id: string;
  buyerId: string;
  sellerId: string;
  listingId: string;
  amount: number;
  currency: string;
  offerType: 'cash' | 'stock' | 'mixed';
  paymentTerms: string;
  closingDate: string;
  conditions: string[];
  status: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected' | 'counter_offered';
  submittedAt: string;
  reviewedAt?: string;
  expiresAt: string;
  counterOffer?: Offer;
  notes: string;
}

interface Transaction {
  id: string;
  offerId: string;
  listingId: string;
  buyerId: string;
  sellerId: string;
  finalAmount: number;
  currency: string;
  closingDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  successFee: number;
  successFeePercentage: number;
  documents: string[];
  milestones: Milestone[];
  createdAt: string;
  completedAt?: string;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  assignedTo: string;
  amount?: number;
}

interface OfferManagementProps {
  listingId: string;
  buyerId: string;
  sellerId: string;
}

const OfferManagement: React.FC<OfferManagementProps> = ({ listingId, buyerId, sellerId }) => {
  const [activeTab, setActiveTab] = useState('offers');
  const [offers, setOffers] = useState<Offer[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [currentUser, setCurrentUser] = useState('buyer'); // 'buyer' or 'seller'

  const [newOffer, setNewOffer] = useState({
    amount: '',
    currency: 'EUR',
    offerType: 'cash' as const,
    paymentTerms: '',
    closingDate: '',
    conditions: [] as string[],
    notes: '',
  });

  const [counterOffer, setCounterOffer] = useState({
    amount: '',
    currency: 'EUR',
    offerType: 'cash' as const,
    paymentTerms: '',
    closingDate: '',
    conditions: [] as string[],
    notes: '',
  });

  const offerConditions = [
    'Due diligence completion',
    'Financing approval',
    'Regulatory approval',
    'Board approval',
    'Shareholder approval',
    'Asset transfer completion',
    'Employee retention',
    'Customer contract transfer',
  ];

  // Mock data initialization
  useEffect(() => {
    setOffers([
      {
        id: '1',
        buyerId,
        sellerId,
        listingId,
        amount: 2500000,
        currency: 'EUR',
        offerType: 'cash',
        paymentTerms: '50% at closing, 50% in 12 months',
        closingDate: '2024-06-15',
        conditions: ['Due diligence completion', 'Financing approval'],
        status: 'under_review',
        submittedAt: '2024-01-15T10:00:00Z',
        expiresAt: '2024-02-15T10:00:00Z',
        notes: 'Strong offer based on financial analysis and market position.',
      },
      {
        id: '2',
        buyerId,
        sellerId,
        listingId,
        amount: 2200000,
        currency: 'EUR',
        offerType: 'mixed',
        paymentTerms: '70% cash, 30% stock',
        closingDate: '2024-05-30',
        conditions: ['Due diligence completion', 'Board approval'],
        status: 'rejected',
        submittedAt: '2024-01-10T14:30:00Z',
        reviewedAt: '2024-01-12T09:15:00Z',
        expiresAt: '2024-02-10T14:30:00Z',
        notes: 'Offer below market value, rejected by seller.',
      },
    ]);

    setTransactions([
      {
        id: '1',
        offerId: '1',
        listingId,
        buyerId,
        sellerId,
        finalAmount: 2500000,
        currency: 'EUR',
        closingDate: '2024-06-15',
        status: 'in_progress',
        successFee: 12500,
        successFeePercentage: 0.5,
        documents: ['Purchase Agreement', 'Asset Transfer Documents'],
        milestones: [
          {
            id: '1',
            title: 'Due Diligence Completion',
            description: 'Complete all due diligence requirements',
            dueDate: '2024-03-15',
            status: 'completed',
            assignedTo: 'Buyer',
          },
          {
            id: '2',
            title: 'Purchase Agreement Signing',
            description: 'Execute final purchase agreement',
            dueDate: '2024-04-15',
            status: 'pending',
            assignedTo: 'Both Parties',
          },
          {
            id: '3',
            title: 'Closing and Payment',
            description: 'Complete transaction and transfer funds',
            dueDate: '2024-06-15',
            status: 'pending',
            assignedTo: 'Both Parties',
            amount: 2500000,
          },
        ],
        createdAt: '2024-01-15T10:00:00Z',
      },
    ]);
  }, [buyerId, sellerId, listingId]);

  const handleSubmitOffer = () => {
    const offer: Offer = {
      id: Date.now().toString(),
      buyerId,
      sellerId,
      listingId,
      amount: parseFloat(newOffer.amount),
      currency: newOffer.currency,
      offerType: newOffer.offerType,
      paymentTerms: newOffer.paymentTerms,
      closingDate: newOffer.closingDate,
      conditions: newOffer.conditions,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      notes: newOffer.notes,
    };

    setOffers(prev => [...prev, offer]);
    setShowOfferModal(false);
    setNewOffer({
      amount: '',
      currency: 'EUR',
      offerType: 'cash',
      paymentTerms: '',
      closingDate: '',
      conditions: [],
      notes: '',
    });
  };

  const handleCounterOffer = () => {
    if (!selectedOffer) return;

    const counter: Offer = {
      id: Date.now().toString(),
      buyerId: selectedOffer.sellerId,
      sellerId: selectedOffer.buyerId,
      listingId: selectedOffer.listingId,
      amount: parseFloat(counterOffer.amount),
      currency: counterOffer.currency,
      offerType: counterOffer.offerType,
      paymentTerms: counterOffer.paymentTerms,
      closingDate: counterOffer.closingDate,
      conditions: counterOffer.conditions,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      notes: counterOffer.notes,
    };

    // Update original offer status
    setOffers(prev =>
      prev.map(offer =>
        offer.id === selectedOffer.id
          ? { ...offer, status: 'counter_offered', counterOffer: counter }
          : offer
      )
    );

    // Add counter offer
    setOffers(prev => [...prev, counter]);
    setShowCounterModal(false);
    setCounterOffer({
      amount: '',
      currency: 'EUR',
      offerType: 'cash',
      paymentTerms: '',
      closingDate: '',
      conditions: [],
      notes: '',
    });
  };

  const handleOfferAction = (offerId: string, action: 'accept' | 'reject') => {
    setOffers(prev =>
      prev.map(offer =>
        offer.id === offerId
          ? {
              ...offer,
              status: action === 'accept' ? 'accepted' : 'rejected',
              reviewedAt: new Date().toISOString(),
            }
          : offer
      )
    );

    if (action === 'accept') {
      // Create transaction
      const offer = offers.find(o => o.id === offerId);
      if (offer) {
        const transaction: Transaction = {
          id: Date.now().toString(),
          offerId,
          listingId: offer.listingId,
          buyerId: offer.buyerId,
          sellerId: offer.sellerId,
          finalAmount: offer.amount,
          currency: offer.currency,
          closingDate: offer.closingDate,
          status: 'pending',
          successFee: offer.amount * 0.005, // 0.5%
          successFeePercentage: 0.5,
          documents: [],
          milestones: [
            {
              id: '1',
              title: 'Due Diligence Completion',
              description: 'Complete all due diligence requirements',
              dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 60 days
              status: 'pending',
              assignedTo: 'Buyer',
            },
            {
              id: '2',
              title: 'Purchase Agreement Signing',
              description: 'Execute final purchase agreement',
              dueDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 90 days
              status: 'pending',
              assignedTo: 'Both Parties',
            },
            {
              id: '3',
              title: 'Closing and Payment',
              description: 'Complete transaction and transfer funds',
              dueDate: offer.closingDate,
              status: 'pending',
              assignedTo: 'Both Parties',
              amount: offer.amount,
            },
          ],
          createdAt: new Date().toISOString(),
        };
        setTransactions(prev => [...prev, transaction]);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'success';
      case 'rejected':
        return 'danger';
      case 'under_review':
        return 'warning';
      case 'submitted':
        return 'primary';
      case 'counter_offered':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getTransactionStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'warning';
      case 'pending':
        return 'primary';
      case 'cancelled':
        return 'danger';
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Offer Management</h1>
          <p className="text-neutral-600">
            Manage offers, negotiations, and transaction completion
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Chip color="primary" variant="flat">
            <Shield className="w-4 h-4 mr-1" />
            Secure Negotiation
          </Chip>
          {currentUser === 'buyer' && (
            <Button
              color="primary"
              onPress={() => setShowOfferModal(true)}
              startContent={<Send className="w-4 h-4" />}
            >
              Submit New Offer
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <Tabs
        selectedKey={activeTab}
        onSelectionChange={key => setActiveTab(key as string)}
        className="w-full"
      >
        <Tab key="offers" title="Offers">
          <Card>
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-neutral-900">Offer History</h2>
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-neutral-500" />
                  <span className="text-sm text-neutral-600">
                    {offers.length} offers • {offers.filter(o => o.status === 'accepted').length}{' '}
                    accepted
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {offers.map(offer => (
                  <Card key={offer.id} className="border border-neutral-200">
                    <CardBody className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-neutral-900">
                            {formatCurrency(offer.amount, offer.currency)}
                          </h3>
                          <Chip color={getStatusColor(offer.status)}>
                            {offer.status.replace('_', ' ')}
                          </Chip>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-neutral-500">
                            Submitted: {new Date(offer.submittedAt).toLocaleDateString()}
                          </span>
                          {offer.expiresAt && (
                            <span className="text-sm text-neutral-500">
                              Expires: {new Date(offer.expiresAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="font-medium text-neutral-700">Offer Type:</span>
                          <p className="text-neutral-900 capitalize">{offer.offerType}</p>
                        </div>
                        <div>
                          <span className="font-medium text-neutral-700">Payment Terms:</span>
                          <p className="text-neutral-900">{offer.paymentTerms}</p>
                        </div>
                        <div>
                          <span className="font-medium text-neutral-700">Closing Date:</span>
                          <p className="text-neutral-900">{offer.closingDate}</p>
                        </div>
                      </div>

                      {offer.conditions.length > 0 && (
                        <div className="mb-4">
                          <span className="font-medium text-neutral-700">Conditions:</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {offer.conditions.map((condition, index) => (
                              <Chip key={index} size="sm" variant="flat">
                                {condition}
                              </Chip>
                            ))}
                          </div>
                        </div>
                      )}

                      {offer.notes && (
                        <div className="mb-4">
                          <span className="font-medium text-neutral-700">Notes:</span>
                          <p className="text-neutral-900 mt-1">{offer.notes}</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="bordered"
                            startContent={<Edit className="w-4 h-4" />}
                            onPress={() => {
                              setSelectedOffer(offer);
                              setShowOfferModal(true);
                            }}
                          >
                            View Details
                          </Button>
                          {offer.status === 'under_review' && currentUser === 'seller' && (
                            <>
                              <Button
                                size="sm"
                                color="success"
                                startContent={<CheckCircle className="w-4 h-4" />}
                                onPress={() => handleOfferAction(offer.id, 'accept')}
                              >
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                color="danger"
                                startContent={<XCircle className="w-4 h-4" />}
                                onPress={() => handleOfferAction(offer.id, 'reject')}
                              >
                                Reject
                              </Button>
                              <Button
                                size="sm"
                                variant="bordered"
                                startContent={<ArrowRight className="w-4 h-4" />}
                                onPress={() => {
                                  setSelectedOffer(offer);
                                  setShowCounterModal(true);
                                }}
                              >
                                Counter Offer
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </CardBody>
          </Card>
        </Tab>

        <Tab key="transactions" title="Transactions">
          <Card>
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-neutral-900">Transaction Management</h2>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-neutral-500" />
                  <span className="text-sm text-neutral-600">
                    {transactions.length} transactions •{' '}
                    {transactions.filter(t => t.status === 'completed').length} completed
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                {transactions.map(transaction => (
                  <Card key={transaction.id} className="border border-neutral-200">
                    <CardBody className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-neutral-900">
                            {formatCurrency(transaction.finalAmount, transaction.currency)}
                          </h3>
                          <Chip color={getTransactionStatusColor(transaction.status)}>
                            {transaction.status.replace('_', ' ')}
                          </Chip>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-neutral-600">Success Fee</p>
                          <p className="text-lg font-semibold text-primary-600">
                            {formatCurrency(transaction.successFee, transaction.currency)}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                          <span className="font-medium text-neutral-700">Closing Date:</span>
                          <p className="text-neutral-900">{transaction.closingDate}</p>
                        </div>
                        <div>
                          <span className="font-medium text-neutral-700">Success Fee Rate:</span>
                          <p className="text-neutral-900">{transaction.successFeePercentage}%</p>
                        </div>
                        <div>
                          <span className="font-medium text-neutral-700">Created:</span>
                          <p className="text-neutral-900">
                            {new Date(transaction.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-neutral-900 mb-3">
                          Transaction Milestones
                        </h4>
                        <div className="space-y-3">
                          {transaction.milestones.map(milestone => (
                            <div
                              key={milestone.id}
                              className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                  <h5 className="font-medium text-neutral-900">
                                    {milestone.title}
                                  </h5>
                                  <Chip size="sm" color={getStatusColor(milestone.status)}>
                                    {milestone.status}
                                  </Chip>
                                </div>
                                <p className="text-sm text-neutral-600">{milestone.description}</p>
                                <div className="flex items-center gap-4 text-xs text-neutral-500 mt-1">
                                  <span>Assigned to: {milestone.assignedTo}</span>
                                  <span>Due: {milestone.dueDate}</span>
                                  {milestone.amount && (
                                    <span>
                                      Amount:{' '}
                                      {formatCurrency(milestone.amount, transaction.currency)}
                                    </span>
                                  )}
                                </div>
                              </div>
                              {milestone.status === 'pending' && (
                                <Button size="sm" color="primary">
                                  Mark Complete
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {transaction.documents.length > 0 && (
                        <div className="mt-6">
                          <h4 className="font-medium text-neutral-900 mb-3">
                            Transaction Documents
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {transaction.documents.map((doc, index) => (
                              <Chip
                                key={index}
                                size="sm"
                                variant="flat"
                                startContent={<FileText className="w-3 h-3" />}
                              >
                                {doc}
                              </Chip>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardBody>
                  </Card>
                ))}
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>

      {/* Submit Offer Modal */}
      <Modal isOpen={showOfferModal} onClose={() => setShowOfferModal(false)} size="2xl">
        <ModalContent>
          <ModalHeader>Submit New Offer</ModalHeader>
          <ModalBody>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatedInput
                  label="Offer Amount"
                  placeholder="Enter offer amount"
                  type="number"
                  value={newOffer.amount}
                  onChange={value => setNewOffer({ ...newOffer, amount: value })}
                  startContent={<span className="text-foreground-400">€</span>}
                  name="amount"
                  required
                />

                <Select
                  label="Currency"
                  value={newOffer.currency}
                  onSelectionChange={keys =>
                    setNewOffer({ ...newOffer, currency: Array.from(keys)[0] as string })
                  }
                >
                  <SelectItem key="EUR">EUR</SelectItem>
                  <SelectItem key="USD">USD</SelectItem>
                  <SelectItem key="GBP">GBP</SelectItem>
                </Select>

                <Select
                  label="Offer Type"
                  value={newOffer.offerType}
                  onChange={value => setNewOffer({ ...newOffer, offerType: value as any })}
                >
                  <SelectItem key="cash">Cash</SelectItem>
                  <SelectItem key="stock">Stock</SelectItem>
                  <SelectItem key="mixed">Mixed</SelectItem>
                </Select>

                <AnimatedInput
                  label="Closing Date"
                  placeholder="Select closing date"
                  type="date"
                  value={newOffer.closingDate}
                  onChange={value => setNewOffer({ ...newOffer, closingDate: value })}
                  name="closingDate"
                  required
                />
              </div>

              <AnimatedInput
                label="Payment Terms"
                placeholder="Describe payment terms and schedule"
                value={newOffer.paymentTerms}
                onChange={value => setNewOffer({ ...newOffer, paymentTerms: value })}
                name="paymentTerms"
                required
              />

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Conditions
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {offerConditions.map(condition => (
                    <label key={condition} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newOffer.conditions.includes(condition)}
                        onChange={e => {
                          if (e.target.checked) {
                            setNewOffer({
                              ...newOffer,
                              conditions: [...newOffer.conditions, condition],
                            });
                          } else {
                            setNewOffer({
                              ...newOffer,
                              conditions: newOffer.conditions.filter(c => c !== condition),
                            });
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-sm text-neutral-700">{condition}</span>
                    </label>
                  ))}
                </div>
              </div>

              <AnimatedTextarea
                variant="standalone"
                label="Additional Notes"
                placeholder="Add any additional notes or comments about your offer"
                value={newOffer.notes}
                onChange={value => setNewOffer({ ...newOffer, notes: value })}
                name="notes"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="bordered" onPress={() => setShowOfferModal(false)}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleSubmitOffer}>
              Submit Offer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Counter Offer Modal */}
      <Modal isOpen={showCounterModal} onClose={() => setShowCounterModal(false)} size="2xl">
        <ModalContent>
          <ModalHeader>Submit Counter Offer</ModalHeader>
          <ModalBody>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatedInput
                  label="Counter Offer Amount"
                  placeholder="Enter counter offer amount"
                  type="number"
                  value={counterOffer.amount}
                  onChange={value => setCounterOffer({ ...counterOffer, amount: value })}
                  startContent={<span className="text-foreground-400">€</span>}
                  name="amount"
                  required
                />

                <Select
                  label="Currency"
                  value={counterOffer.currency}
                  onSelectionChange={keys =>
                    setCounterOffer({ ...counterOffer, currency: Array.from(keys)[0] as string })
                  }
                >
                  <SelectItem key="EUR">EUR</SelectItem>
                  <SelectItem key="USD">USD</SelectItem>
                  <SelectItem key="GBP">GBP</SelectItem>
                </Select>

                <Select
                  label="Offer Type"
                  value={counterOffer.offerType}
                  onChange={value => setCounterOffer({ ...counterOffer, offerType: value as any })}
                >
                  <SelectItem key="cash">Cash</SelectItem>
                  <SelectItem key="stock">Stock</SelectItem>
                  <SelectItem key="mixed">Mixed</SelectItem>
                </Select>

                <AnimatedInput
                  label="Closing Date"
                  placeholder="Select closing date"
                  type="date"
                  value={counterOffer.closingDate}
                  onChange={value => setCounterOffer({ ...counterOffer, closingDate: value })}
                  name="closingDate"
                  required
                />
              </div>

              <AnimatedInput
                label="Payment Terms"
                placeholder="Describe payment terms and schedule"
                value={counterOffer.paymentTerms}
                onChange={value => setCounterOffer({ ...counterOffer, paymentTerms: value })}
                name="paymentTerms"
                required
              />

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Conditions
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {offerConditions.map(condition => (
                    <label key={condition} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={counterOffer.conditions.includes(condition)}
                        onChange={e => {
                          if (e.target.checked) {
                            setCounterOffer({
                              ...counterOffer,
                              conditions: [...counterOffer.conditions, condition],
                            });
                          } else {
                            setCounterOffer({
                              ...counterOffer,
                              conditions: counterOffer.conditions.filter(c => c !== condition),
                            });
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-sm text-neutral-700">{condition}</span>
                    </label>
                  ))}
                </div>
              </div>

              <AnimatedTextarea
                variant="standalone"
                label="Counter Offer Notes"
                placeholder="Explain the reasoning behind your counter offer"
                value={counterOffer.notes}
                onChange={value => setCounterOffer({ ...counterOffer, notes: value })}
                name="notes"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="bordered" onPress={() => setShowCounterModal(false)}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleCounterOffer}>
              Submit Counter Offer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default OfferManagement;
