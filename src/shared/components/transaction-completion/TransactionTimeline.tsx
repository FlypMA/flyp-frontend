/**
 * Transaction Timeline
 * Location: src/shared/components/transaction-completion/TransactionTimeline.tsx
 * Purpose: Visualize transaction timeline and key milestones
 */

import { Transaction } from '@/shared/types/transaction-completion';
import { Card, CardBody, CardHeader, Chip, Progress } from '@heroui/react';
import { Calendar, CheckCircle, Clock, FileText, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface TransactionTimelineProps {
  transactionId: string;
  userRole: 'buyer' | 'seller' | 'advisor';
  userId: string;
}

const TransactionTimeline: React.FC<TransactionTimelineProps> = ({
  transactionId,
  userRole,
  userId,
}) => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
        keyDates: [
          {
            id: 'date-1',
            name: 'Offer Accepted',
            date: '2024-01-15',
            type: 'milestone',
            status: 'completed',
            responsibleParty: 'both',
            isCritical: true,
            description: 'Initial offer was accepted by seller',
          },
          {
            id: 'date-2',
            name: 'Purchase Agreement Signed',
            date: '2024-02-01',
            type: 'milestone',
            status: 'completed',
            responsibleParty: 'both',
            isCritical: true,
            description: 'All parties have signed the purchase agreement',
          },
          {
            id: 'date-3',
            name: 'Due Diligence Complete',
            date: '2024-02-15',
            type: 'milestone',
            status: 'upcoming',
            responsibleParty: 'buyer-1',
            isCritical: true,
            description: 'All due diligence items must be completed',
          },
          {
            id: 'date-4',
            name: 'Financing Approval',
            date: '2024-02-28',
            type: 'deadline',
            status: 'upcoming',
            responsibleParty: 'buyer-1',
            isCritical: true,
            description: 'Final financing approval must be obtained',
          },
          {
            id: 'date-5',
            name: 'Asset Transfer',
            date: '2024-03-10',
            type: 'deliverable',
            status: 'upcoming',
            responsibleParty: 'seller-1',
            isCritical: false,
            description: 'Physical assets must be transferred to buyer',
          },
          {
            id: 'date-6',
            name: 'Closing Date',
            date: '2024-03-15',
            type: 'closing',
            status: 'upcoming',
            responsibleParty: 'both',
            isCritical: true,
            description: 'Final closing and transaction completion',
          },
        ],
        parties: [],
        documents: [],
        closingChecklist: [],
        payments: [],
        postClosingItems: [],
        communications: [],
        version: 1,
        createdBy: 'buyer-1',
        requiresApproval: false,
        approvals: [],
      };

      setTransaction(mockTransaction);
    } catch (error) {
      console.error('Error loading transaction:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'upcoming':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'overdue':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-gray-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'upcoming':
        return 'primary';
      case 'overdue':
        return 'danger';
      case 'cancelled':
        return 'default';
      default:
        return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'milestone':
        return <CheckCircle className="w-4 h-4" />;
      case 'deadline':
        return <Clock className="w-4 h-4" />;
      case 'deliverable':
        return <FileText className="w-4 h-4" />;
      case 'payment':
        return <Calendar className="w-4 h-4" />;
      case 'closing':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'milestone':
        return 'text-blue-600 bg-blue-100';
      case 'deadline':
        return 'text-orange-600 bg-orange-100';
      case 'deliverable':
        return 'text-purple-600 bg-purple-100';
      case 'payment':
        return 'text-green-600 bg-green-100';
      case 'closing':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const calculateProgress = () => {
    if (!transaction) return 0;
    const completed = transaction.keyDates.filter(date => date.status === 'completed').length;
    const total = transaction.keyDates.length;
    return total > 0 ? (completed / total) * 100 : 0;
  };

  const getDaysUntilClosing = () => {
    if (!transaction) return 0;
    const closingDate = new Date(transaction.closingDate);
    const today = new Date();
    const diffTime = closingDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const isOverdue = (date: string) => {
    return new Date(date) < new Date();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading timeline...</p>
        </div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="text-center py-8">
        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No transaction found</h3>
        <p className="text-gray-600">Unable to load timeline information.</p>
      </div>
    );
  }

  const progress = calculateProgress();
  const daysUntilClosing = getDaysUntilClosing();
  const completedDates = transaction.keyDates.filter(date => date.status === 'completed').length;
  const upcomingDates = transaction.keyDates.filter(date => date.status === 'upcoming').length;
  const overdueDates = transaction.keyDates.filter(
    date => isOverdue(date.date) && date.status !== 'completed'
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Transaction Timeline</h3>
          <p className="text-sm text-gray-600">Track key milestones and deadlines</p>
        </div>
      </div>

      {/* Timeline Summary */}
      <Card>
        <CardHeader>
          <h4 className="text-md font-semibold flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Timeline Progress
          </h4>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Overall Progress</span>
              <span className="text-sm text-gray-600">{progress.toFixed(0)}%</span>
            </div>
            <Progress value={progress} className="mb-4" color="primary" size="lg" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">{completedDates}</div>
                <div className="text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{upcomingDates}</div>
                <div className="text-gray-600">Upcoming</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">{overdueDates}</div>
                <div className="text-gray-600">Overdue</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">{daysUntilClosing}</div>
                <div className="text-gray-600">Days to Closing</div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <h4 className="text-md font-semibold">Key Dates & Milestones</h4>
        </CardHeader>
        <CardBody>
          <div className="space-y-6">
            {transaction.keyDates.map((date, index) => {
              const isLast = index === transaction.keyDates.length - 1;
              const isOverdueDate = isOverdue(date.date) && date.status !== 'completed';

              return (
                <div key={date.id} className="relative">
                  {/* Timeline Line */}
                  {!isLast && <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>}

                  <div className="flex items-start gap-4">
                    {/* Timeline Icon */}
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                        date.status === 'completed'
                          ? 'bg-green-100'
                          : isOverdueDate
                            ? 'bg-red-100'
                            : 'bg-blue-100'
                      }`}
                    >
                      {getStatusIcon(date.status)}
                    </div>

                    {/* Timeline Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <h5 className="text-lg font-semibold text-gray-900">{date.name}</h5>
                          <Chip size="sm" color={getStatusColor(date.status)} variant="flat">
                            {date.status}
                          </Chip>
                          {date.isCritical && (
                            <Chip size="sm" color="danger" variant="flat">
                              Critical
                            </Chip>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Chip
                            size="sm"
                            variant="flat"
                            color="default"
                            startContent={getTypeIcon(date.type)}
                          >
                            {date.type}
                          </Chip>
                          <span className="text-sm text-gray-600">
                            {new Date(date.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {date.description && (
                        <p className="text-sm text-gray-600 mb-2">{date.description}</p>
                      )}

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Responsible: {date.responsibleParty}</span>
                        {isOverdueDate && (
                          <span className="text-red-600 font-medium">
                            Overdue by{' '}
                            {Math.abs(
                              Math.ceil(
                                (new Date(date.date).getTime() - new Date().getTime()) /
                                  (1000 * 60 * 60 * 24)
                              )
                            )}{' '}
                            days
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>

      {/* Critical Dates Alert */}
      {overdueDates > 0 && (
        <Card className="border border-red-200 bg-red-50">
          <CardBody>
            <div className="flex items-center gap-3">
              <XCircle className="w-6 h-6 text-red-600" />
              <div>
                <h4 className="font-medium text-red-900">Overdue Items</h4>
                <p className="text-sm text-red-800">
                  {overdueDates} critical date{overdueDates > 1 ? 's' : ''}{' '}
                  {overdueDates > 1 ? 'are' : 'is'} overdue. Please address these items immediately
                  to avoid delays.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Upcoming Deadlines */}
      {upcomingDates > 0 && (
        <Card>
          <CardHeader>
            <h4 className="text-md font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Upcoming Deadlines
            </h4>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {transaction.keyDates
                .filter(date => date.status === 'upcoming')
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .slice(0, 3)
                .map(date => (
                  <div
                    key={date.id}
                    className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg"
                  >
                    <div>
                      <h5 className="font-medium text-blue-900">{date.name}</h5>
                      <p className="text-sm text-blue-800">
                        Due: {new Date(date.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {date.isCritical && (
                        <Chip size="sm" color="danger" variant="flat">
                          Critical
                        </Chip>
                      )}
                      <Chip size="sm" color="primary" variant="flat">
                        {date.type}
                      </Chip>
                    </div>
                  </div>
                ))}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Closing Countdown */}
      {daysUntilClosing > 0 && (
        <Card className="border border-green-200 bg-green-50">
          <CardBody>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <h4 className="font-medium text-green-900">Closing Countdown</h4>
                <p className="text-sm text-green-800">
                  {daysUntilClosing} day{daysUntilClosing > 1 ? 's' : ''} until closing on{' '}
                  {new Date(transaction.closingDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export { TransactionTimeline };
