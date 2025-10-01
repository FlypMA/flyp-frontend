import { Button } from '@/shared/components/buttons';
import Container from '@/shared/components/layout/container/Container';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import {
  DueDiligencePlatform,
  OfferManagement,
  SuccessFeeCollection,
} from '@/shared/components/transaction';
import { seoData } from '@/shared/utils/seo/seoData';
import { Badge, Card, CardBody, Chip, Progress, Tab, Tabs } from '@heroui/react';
import {
  AlertTriangle,
  CheckCircle,
  DollarSign,
  FileText,
  Search,
  Shield,
  TrendingUp,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface TransactionStage {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending' | 'blocked';
  completedAt?: string;
  icon: React.ComponentType<any>;
  component?: React.ComponentType<any>;
}

interface Transaction {
  id: string;
  listingId: string;
  buyerId: string;
  sellerId: string;
  listingTitle: string;
  transactionAmount: number;
  currency: string;
  currentStage: string;
  stages: TransactionStage[];
  createdAt: string;
  estimatedCompletion: string;
  successFee: number;
  status: 'active' | 'completed' | 'cancelled';
}

const TransactionFlow: React.FC = () => {
  const { transactionId } = useParams<{ transactionId: string }>();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [activeStage, setActiveStage] = useState('overview');
  const [loading, setLoading] = useState(true);

  // Mock transaction data
  useEffect(() => {
    const mockTransaction: Transaction = {
      id: transactionId || 'txn_001',
      listingId: 'listing_001',
      buyerId: 'buyer_001',
      sellerId: 'seller_001',
      listingTitle: 'Profitable Technology Business - €2.5M Revenue',
      transactionAmount: 2500000,
      currency: 'EUR',
      currentStage: 'due_diligence',
      stages: [
        {
          id: 'search',
          name: 'Search & Discovery',
          description: 'Buyer discovers and evaluates the business opportunity',
          status: 'completed',
          completedAt: '2024-01-01T10:00:00Z',
          icon: Search,
        },
        {
          id: 'inquiry',
          name: 'Initial Inquiry',
          description: 'Buyer submits inquiry and signs NDA',
          status: 'completed',
          completedAt: '2024-01-05T14:30:00Z',
          icon: FileText,
        },
        {
          id: 'due_diligence',
          name: 'Due Diligence',
          description: 'Comprehensive business and financial review',
          status: 'in_progress',
          icon: Shield,
        },
        {
          id: 'offer_management',
          name: 'Offer & Negotiation',
          description: 'Offer submission, negotiation, and acceptance',
          status: 'pending',
          icon: DollarSign,
        },
        {
          id: 'closing',
          name: 'Transaction Closing',
          description: 'Final documentation and fund transfer',
          status: 'pending',
          icon: CheckCircle,
        },
        {
          id: 'success_fee',
          name: 'Success Fee Collection',
          description: 'Platform fee collection and revenue generation',
          status: 'pending',
          icon: TrendingUp,
        },
      ],
      createdAt: '2024-01-01T10:00:00Z',
      estimatedCompletion: '2024-06-15',
      successFee: 12500,
      status: 'active',
    };

    setTransaction(mockTransaction);
    setLoading(false);
  }, [transactionId]);

  const getStageStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'primary';
      case 'pending':
        return 'default';
      case 'blocked':
        return 'danger';
      default:
        return 'default';
    }
  };

  const getProgressPercentage = () => {
    if (!transaction) return 0;
    const completedStages = transaction.stages.filter(stage => stage.status === 'completed').length;
    return Math.round((completedStages / transaction.stages.length) * 100);
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const handleStageComplete = (stageId: string) => {
    if (!transaction) return;

    setTransaction(prev => {
      if (!prev) return prev;

      const updatedStages = prev.stages.map(stage =>
        stage.id === stageId
          ? { ...stage, status: 'completed' as const, completedAt: new Date().toISOString() }
          : stage
      );

      // Find next stage to activate
      const currentStageIndex = updatedStages.findIndex(stage => stage.id === stageId);
      const nextStage = updatedStages[currentStageIndex + 1];

      if (nextStage) {
        updatedStages[currentStageIndex + 1] = { ...nextStage, status: 'in_progress' as const };
      }

      return {
        ...prev,
        stages: updatedStages,
        currentStage: nextStage?.id || stageId,
      };
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading transaction...</p>
        </div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">Transaction Not Found</h2>
          <p className="text-neutral-600 mb-4">The requested transaction could not be found.</p>
          <Button variant="primary" onPress={() => navigate('/search')}>
            Back to Listings
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        {...seoData.transactionFlow}
        title={`Transaction ${transaction.id} | UpSwitch`}
        description={`Track the progress of transaction ${transaction.id} for ${transaction.listingTitle}`}
      />

      <div className="min-h-screen bg-neutral-50">
        <Container>
          <div className="max-w-7xl mx-auto py-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-neutral-900">Transaction Flow</h1>
                  <p className="text-lg text-neutral-600">
                    Complete transaction management from start to finish
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Chip variant="solid" color="primary">
                    <Shield className="w-4 h-4 mr-1" />
                    Secure Transaction
                  </Chip>
                  <Badge
                    content={transaction.status}
                    color={transaction.status === 'active' ? 'success' : 'default'}
                  >
                    <Button variant="tertiary" size="sm">
                      {transaction.id}
                    </Button>
                  </Badge>
                </div>
              </div>

              {/* Transaction Overview */}
              <Card className="border border-neutral-200 mb-6">
                <CardBody className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <h3 className="font-medium text-neutral-700 mb-2">Business</h3>
                      <p className="text-lg font-semibold text-neutral-900">
                        {transaction.listingTitle}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-700 mb-2">Transaction Value</h3>
                      <p className="text-lg font-semibold text-neutral-900">
                        {formatCurrency(transaction.transactionAmount, transaction.currency)}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-700 mb-2">Success Fee</h3>
                      <p className="text-lg font-semibold text-primary-600">
                        {formatCurrency(transaction.successFee, transaction.currency)}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-700 mb-2">Estimated Completion</h3>
                      <p className="text-lg font-semibold text-neutral-900">
                        {new Date(transaction.estimatedCompletion).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-neutral-700">Transaction Progress</span>
                  <span className="text-sm text-neutral-600">
                    {getProgressPercentage()}% Complete
                  </span>
                </div>
                <Progress
                  value={getProgressPercentage()}
                  color="primary"
                  className="w-full"
                  showValueLabel
                />
              </div>
            </div>

            {/* Transaction Stages */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Stage Timeline */}
              <div className="lg:col-span-1">
                <Card className="border border-neutral-200 sticky top-8">
                  <CardBody className="p-6">
                    <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                      Transaction Stages
                    </h2>
                    <div className="space-y-4">
                      {transaction.stages.map((stage, index) => {
                        const Icon = stage.icon;
                        return (
                          <div key={stage.id} className="relative">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  stage.status === 'completed'
                                    ? 'bg-green-100 text-green-600'
                                    : stage.status === 'in_progress'
                                      ? 'bg-primary-100 text-primary-600'
                                      : 'bg-neutral-100 text-neutral-400'
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1">
                                <h3
                                  className={`text-sm font-medium ${
                                    stage.status === 'completed'
                                      ? 'text-green-600'
                                      : stage.status === 'in_progress'
                                        ? 'text-primary-600'
                                        : 'text-neutral-500'
                                  }`}
                                >
                                  {stage.name}
                                </h3>
                                <p className="text-xs text-neutral-500">{stage.description}</p>
                              </div>
                              <Chip size="sm" color={getStageStatusColor(stage.status)}>
                                {stage.status.replace('_', ' ')}
                              </Chip>
                            </div>
                            {index < transaction.stages.length - 1 && (
                              <div className="absolute left-4 top-8 w-0.5 h-8 bg-neutral-200"></div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardBody>
                </Card>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <Tabs
                  selectedKey={activeStage}
                  onSelectionChange={key => setActiveStage(key as string)}
                  className="w-full"
                >
                  <Tab key="overview" title="Overview">
                    <Card className="border border-neutral-200">
                      <CardBody className="p-6">
                        <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                          Transaction Overview
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <Card className="border border-neutral-200">
                            <CardBody className="p-4">
                              <h3 className="font-medium text-neutral-900 mb-3">
                                Transaction Details
                              </h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-neutral-600">Transaction ID:</span>
                                  <span className="font-medium">{transaction.id}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-neutral-600">Created:</span>
                                  <span className="font-medium">
                                    {new Date(transaction.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-neutral-600">Status:</span>
                                  <span className="font-medium capitalize">
                                    {transaction.status}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-neutral-600">Current Stage:</span>
                                  <span className="font-medium capitalize">
                                    {transaction.currentStage.replace('_', ' ')}
                                  </span>
                                </div>
                              </div>
                            </CardBody>
                          </Card>

                          <Card className="border border-neutral-200">
                            <CardBody className="p-4">
                              <h3 className="font-medium text-neutral-900 mb-3">
                                Financial Summary
                              </h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-neutral-600">Transaction Value:</span>
                                  <span className="font-medium">
                                    {formatCurrency(
                                      transaction.transactionAmount,
                                      transaction.currency
                                    )}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-neutral-600">Success Fee:</span>
                                  <span className="font-medium text-primary-600">
                                    {formatCurrency(transaction.successFee, transaction.currency)}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-neutral-600">Fee Rate:</span>
                                  <span className="font-medium">0.5%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-neutral-600">Estimated Completion:</span>
                                  <span className="font-medium">
                                    {new Date(transaction.estimatedCompletion).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-neutral-900">
                            Recent Activity
                          </h3>
                          <div className="space-y-3">
                            {transaction.stages
                              .filter(stage => stage.completedAt)
                              .sort(
                                (a, b) =>
                                  new Date(b.completedAt!).getTime() -
                                  new Date(a.completedAt!).getTime()
                              )
                              .slice(0, 3)
                              .map(stage => (
                                <div
                                  key={stage.id}
                                  className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg"
                                >
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                  <span className="text-sm text-neutral-700">
                                    {stage.name} completed
                                  </span>
                                  <span className="text-xs text-neutral-500 ml-auto">
                                    {new Date(stage.completedAt!).toLocaleDateString()}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Tab>

                  <Tab key="due_diligence" title="Due Diligence">
                    <DueDiligencePlatform
                      listingId={transaction.listingId}
                      buyerId={transaction.buyerId}
                      sellerId={transaction.sellerId}
                    />
                  </Tab>

                  <Tab key="offer_management" title="Offer Management">
                    <OfferManagement
                      listingId={transaction.listingId}
                      buyerId={transaction.buyerId}
                      sellerId={transaction.sellerId}
                    />
                  </Tab>

                  <Tab key="success_fee" title="Success Fee">
                    <SuccessFeeCollection
                      listingId={transaction.listingId}
                      buyerId={transaction.buyerId}
                      sellerId={transaction.sellerId}
                    />
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default TransactionFlow;
