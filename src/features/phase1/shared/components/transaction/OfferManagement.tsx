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
  Select,
  SelectItem,
} from '@heroui/react';
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  DollarSign,
  Edit,
  Euro,
  FileText,
  XCircle,
} from 'lucide-react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button } from '../buttons/Button';
import { AnimatedTextarea, Input } from '../forms';

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

  // Mock data
  useEffect(() => {
    setOffers([
      {
        id: '1',
        buyerId: 'buyer1',
        sellerId: 'seller1',
        listingId: listingId,
        amount: 2500000,
        currency: 'EUR',
        offerType: 'cash',
        paymentTerms: '30 days',
        closingDate: '2024-03-15',
        conditions: ['Due diligence completion', 'Financing approval'],
        status: 'under_review',
        submittedAt: '2024-01-15T10:00:00Z',
        expiresAt: '2024-02-15T10:00:00Z',
        notes: 'Initial offer for the business',
      },
    ]);

    setTransactions([
      {
        id: '1',
        offerId: '1',
        listingId: listingId,
        buyerId: 'buyer1',
        sellerId: 'seller1',
        finalAmount: 2500000,
        currency: 'EUR',
        closingDate: '2024-03-15',
        status: 'in_progress',
        successFee: 125000,
        successFeePercentage: 5,
        documents: ['contract.pdf', 'financials.pdf'],
        milestones: [
          {
            id: '1',
            title: 'Due Diligence',
            description: 'Complete due diligence process',
            dueDate: '2024-02-15',
            status: 'pending',
            assignedTo: 'Buyer',
          },
          {
            id: '2',
            title: 'Contract Signing',
            description: 'Sign final purchase agreement',
            dueDate: '2024-03-01',
            status: 'pending',
            assignedTo: 'Both Parties',
          },
        ],
        createdAt: '2024-01-15T10:00:00Z',
      },
    ]);
  }, [listingId]);

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
      case 'accepted':
        return 'success';
      case 'under_review':
        return 'warning';
      case 'rejected':
        return 'danger';
      case 'draft':
        return 'default';
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
        return 'default';
      case 'cancelled':
        return 'danger';
      default:
        return 'default';
    }
  };

  const handleCreateOffer = () => {
    setShowOfferModal(true);
  };

  const handleCounterOffer = (offer: Offer) => {
    setSelectedOffer(offer);
    setShowCounterModal(true);
  };

  const handleAcceptOffer = (offer: Offer) => {
    // Update offer status
    setOffers(prev =>
      prev.map(o => (o.id === offer.id ? { ...o, status: 'accepted' as const } : o))
    );
  };

  const handleRejectOffer = (offer: Offer) => {
    // Update offer status
    setOffers(prev =>
      prev.map(o => (o.id === offer.id ? { ...o, status: 'rejected' as const } : o))
    );
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
                <h2 className="text-2xl font-bold">Offer Management</h2>
                <p className="text-gray-600">Manage offers and transactions</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                onPress={handleCreateOffer}
                startContent={<Edit className="w-4 h-4" />}
              >
                Create Offer
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'offers'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('offers')}
        >
          Offers ({offers.length})
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'transactions'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('transactions')}
        >
          Transactions ({transactions.length})
        </button>
      </div>

      {/* Offers Tab */}
      {activeTab === 'offers' && (
        <div className="space-y-4">
          {offers.map(offer => (
            <Card key={offer.id}>
              <CardBody>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Euro className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {formatCurrency(offer.amount, offer.currency)}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {offer.offerType} • {offer.paymentTerms} • Due{' '}
                        {new Date(offer.closingDate).toLocaleDateString()}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Chip size="sm" color={getStatusColor(offer.status)} variant="flat">
                          {offer.status.replace('_', ' ')}
                        </Chip>
                        <span className="text-xs text-gray-500">
                          Submitted {new Date(offer.submittedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {currentUser === 'seller' && offer.status === 'under_review' && (
                      <>
                        <Button
                          size="sm"
                          variant="success"
                          onPress={() => handleAcceptOffer(offer)}
                          startContent={<CheckCircle className="w-4 h-4" />}
                        >
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onPress={() => handleRejectOffer(offer)}
                          startContent={<XCircle className="w-4 h-4" />}
                        >
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onPress={() => handleCounterOffer(offer)}
                          startContent={<ArrowRight className="w-4 h-4" />}
                        >
                          Counter
                        </Button>
                      </>
                    )}
                    <Button
                      size="sm"
                      variant="secondary"
                      startContent={<FileText className="w-4 h-4" />}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {/* Transactions Tab */}
      {activeTab === 'transactions' && (
        <div className="space-y-4">
          {transactions.map(transaction => (
            <Card key={transaction.id}>
              <CardBody>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <BarChart3 className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Transaction #{transaction.id}</h3>
                        <p className="text-sm text-gray-600">
                          {formatCurrency(transaction.finalAmount, transaction.currency)} • Closing{' '}
                          {new Date(transaction.closingDate).toLocaleDateString()}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Chip
                            size="sm"
                            color={getTransactionStatusColor(transaction.status)}
                            variant="flat"
                          >
                            {transaction.status.replace('_', ' ')}
                          </Chip>
                          <span className="text-xs text-gray-500">
                            Success Fee: {formatCurrency(transaction.successFee)} (
                            {transaction.successFeePercentage}%)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Milestones */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-gray-700">Milestones</h4>
                    {transaction.milestones.map(milestone => (
                      <div
                        key={milestone.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <div>
                            <p className="font-medium text-sm">{milestone.title}</p>
                            <p className="text-xs text-gray-600">{milestone.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Chip
                            size="sm"
                            color={getTransactionStatusColor(milestone.status)}
                            variant="flat"
                          >
                            {milestone.status}
                          </Chip>
                          <span className="text-xs text-gray-500">
                            Due: {new Date(milestone.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {/* Create Offer Modal */}
      <Modal isOpen={showOfferModal} onClose={() => setShowOfferModal(false)} size="2xl">
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader>
                <h3 className="text-lg font-semibold">Create New Offer</h3>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <Input
                    label="Offer Amount"
                    type="number"
                    placeholder="2500000"
                    leftIcon={<Euro className="w-4 h-4" />}
                  />
                  <Select label="Offer Type" placeholder="Select offer type">
                    <SelectItem key="cash">Cash</SelectItem>
                    <SelectItem key="stock">Stock</SelectItem>
                    <SelectItem key="mixed">Mixed</SelectItem>
                  </Select>
                  <Input
                    label="Payment Terms"
                    type="text"
                    placeholder="30 days"
                    value=""
                    onChange={() => {}}
                    onBlur={() => {}}
                    name="paymentTerms"
                  />
                  <Input
                    label="Closing Date"
                    type="date"
                    placeholder=""
                    value=""
                    onChange={() => {}}
                    onBlur={() => {}}
                    name="closingDate"
                  />
                  <AnimatedTextarea
                    label="Conditions"
                    placeholder="List any conditions for this offer..."
                    value=""
                    onChange={() => {}}
                    onBlur={() => {}}
                    name="conditions"
                    minRows={3}
                  />
                  <AnimatedTextarea
                    label="Notes"
                    placeholder="Additional notes..."
                    value=""
                    onChange={() => {}}
                    onBlur={() => {}}
                    name="notes"
                    minRows={2}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onPress={onClose}>
                  Cancel
                </Button>
                <Button variant="primary" onPress={onClose}>
                  Submit Offer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Counter Offer Modal */}
      <Modal isOpen={showCounterModal} onClose={() => setShowCounterModal(false)} size="2xl">
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader>
                <h3 className="text-lg font-semibold">Make Counter Offer</h3>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Original Offer</h4>
                    <p className="text-sm text-gray-600">
                      {selectedOffer &&
                        formatCurrency(selectedOffer.amount, selectedOffer.currency)}
                    </p>
                  </div>
                  <Input
                    label="Counter Offer Amount"
                    type="number"
                    placeholder="2750000"
                    leftIcon={<Euro className="w-4 h-4" />}
                  />
                  <AnimatedTextarea
                    label="Counter Offer Notes"
                    placeholder="Explain your counter offer..."
                    value=""
                    onChange={() => {}}
                    onBlur={() => {}}
                    name="counterOfferNotes"
                    minRows={3}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onPress={onClose}>
                  Cancel
                </Button>
                <Button variant="primary" onPress={onClose}>
                  Submit Counter Offer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default OfferManagement;
