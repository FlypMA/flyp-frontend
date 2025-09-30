/**
 * Transaction Completion Dashboard
 * Location: src/shared/components/transaction-completion/TransactionCompletionDashboard.tsx
 * Purpose: Main dashboard for managing transaction completion and closing
 */

import { Button } from '@/shared/components/buttons';
import { TransactionDashboard } from '@/shared/types/transaction-completion';
import { Card, CardBody, CardHeader, Chip, Progress } from '@heroui/react';
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  MessageSquare,
  TrendingUp,
  Users,
  XCircle,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { ClosingChecklist } from './ClosingChecklist';
import { DocumentManagement } from './DocumentManagement';
import { PaymentProcessing } from './PaymentProcessing';
import { PostClosingManagement } from './PostClosingManagement';
import { TransactionTimeline } from './TransactionTimeline';

interface TransactionCompletionDashboardProps {
  transactionId: string;
  userRole: 'buyer' | 'seller' | 'advisor';
  userId: string;
}

const TransactionCompletionDashboard: React.FC<TransactionCompletionDashboardProps> = ({
  transactionId,
  userRole,
  userId,
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboard, setDashboard] = useState<TransactionDashboard | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, [transactionId]);

  const loadDashboard = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await transactionService.getDashboard(transactionId);
      // setDashboard(response.data);

      // Mock data for now
      const mockDashboard: TransactionDashboard = {
        transaction: {
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
              name: 'Due Diligence Complete',
              date: '2024-02-15',
              type: 'milestone',
              status: 'upcoming',
              responsibleParty: 'buyer-1',
              isCritical: true,
            },
            {
              id: 'date-2',
              name: 'Financing Approval',
              date: '2024-02-28',
              type: 'deadline',
              status: 'upcoming',
              responsibleParty: 'buyer-1',
              isCritical: true,
            },
            {
              id: 'date-3',
              name: 'Closing Date',
              date: '2024-03-15',
              type: 'closing',
              status: 'upcoming',
              responsibleParty: 'both',
              isCritical: true,
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
        },
        progress: {
          overallProgress: 65,
          categoryProgress: {
            legal: 80,
            financial: 60,
            operational: 45,
            regulatory: 70,
            closing: 30,
          },
          tasksCompleted: 13,
          tasksTotal: 20,
          documentsCompleted: 8,
          documentsTotal: 12,
          paymentsCompleted: 1,
          paymentsTotal: 3,
          daysToClosing: 25,
          onTrack: true,
          riskLevel: 'medium',
        },
        upcomingDeadlines: [
          {
            id: 'deadline-1',
            name: 'Due Diligence Complete',
            date: '2024-02-15',
            type: 'milestone',
            status: 'upcoming',
            responsibleParty: 'buyer-1',
            isCritical: true,
          },
          {
            id: 'deadline-2',
            name: 'Financing Approval',
            date: '2024-02-28',
            type: 'deadline',
            status: 'upcoming',
            responsibleParty: 'buyer-1',
            isCritical: true,
          },
        ],
        recentActivity: [
          {
            id: 'activity-1',
            type: 'document_uploaded',
            description: 'Purchase agreement uploaded',
            timestamp: '2024-01-20T10:30:00Z',
            userId: 'lawyer-1',
            userName: 'Legal Team',
          },
          {
            id: 'activity-2',
            type: 'task_completed',
            description: 'Financial statements reviewed',
            timestamp: '2024-01-19T15:45:00Z',
            userId: 'buyer-1',
            userName: 'Jane Buyer',
          },
        ],
        teamStatus: [
          {
            userId: 'buyer-1',
            name: 'Jane Buyer',
            role: 'Buyer',
            isOnline: true,
            lastActive: '2024-01-20T14:30:00Z',
            pendingTasks: 3,
            completedTasks: 8,
            overdueItems: 0,
          },
          {
            userId: 'seller-1',
            name: 'John Seller',
            role: 'Seller',
            isOnline: false,
            lastActive: '2024-01-20T12:15:00Z',
            pendingTasks: 2,
            completedTasks: 5,
            overdueItems: 1,
          },
        ],
        financialSummary: {
          totalValue: 875000,
          paidAmount: 100000,
          pendingAmount: 775000,
          overdueAmount: 0,
          nextPayment: {
            id: 'payment-1',
            type: 'down_payment',
            amount: 200000,
            currency: 'EUR',
            dueDate: '2024-02-15',
            status: 'pending',
            paymentMethod: 'wire_transfer',
            fromParty: 'buyer-1',
            toParty: 'seller-1',
            description: 'Down payment',
          },
          escrowAmount: 100000,
        },
      };

      setDashboard(mockDashboard);
    } catch (error) {
      // TODO: Add proper error handling
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'closed':
        return 'success';
      case 'in_progress':
        return 'warning';
      case 'ready_to_close':
        return 'primary';
      case 'cancelled':
        return 'danger';
      case 'disputed':
        return 'danger';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'closed':
        return <CheckCircle className="w-4 h-4" />;
      case 'in_progress':
        return <Clock className="w-4 h-4" />;
      case 'ready_to_close':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      case 'disputed':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return 'success';
      case 'medium':
        return 'warning';
      case 'high':
        return 'danger';
      case 'critical':
        return 'danger';
      default:
        return 'default';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading transaction dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="text-center py-8">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to load dashboard</h3>
        <p className="text-gray-600 mb-4">
          There was an error loading the transaction completion dashboard.
        </p>
        <Button variant="primary" onPress={loadDashboard}>
          Try Again
        </Button>
      </div>
    );
  }

  const { transaction, progress, upcomingDeadlines, recentActivity, teamStatus, financialSummary } =
    dashboard;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <h2 className="text-2xl font-bold">Transaction Completion</h2>
                <p className="text-gray-600">
                  {transaction.currency} {transaction.totalValue.toLocaleString()} • Closing:{' '}
                  {new Date(transaction.closingDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Chip
                variant="flat"
                color={getStatusColor(transaction.status)}
                startContent={getStatusIcon(transaction.status)}
              >
                {transaction.status.replace('_', ' ')}
              </Chip>
              <Chip variant="flat" color={getRiskColor(progress.riskLevel)}>
                {progress.riskLevel} Risk
              </Chip>
              <Chip variant="flat" color="primary">
                <Users className="w-3 h-3 mr-1" />
                {teamStatus.length} Team Members
              </Chip>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <Progress value={progress.overallProgress} className="mb-4" color="primary" size="lg" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-1">
                  {progress.overallProgress}%
                </div>
                <div className="text-sm text-gray-600">Overall Progress</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {progress.tasksCompleted}/{progress.tasksTotal}
                </div>
                <div className="text-sm text-gray-600">Tasks Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-1">
                  {progress.documentsCompleted}/{progress.documentsTotal}
                </div>
                <div className="text-sm text-gray-600">Documents</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">
                  {progress.daysToClosing}
                </div>
                <div className="text-sm text-gray-600">Days to Closing</div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: <TrendingUp className="w-4 h-4" /> },
          {
            id: 'checklist',
            label: 'Closing Checklist',
            icon: <CheckCircle className="w-4 h-4" />,
          },
          { id: 'documents', label: 'Documents', icon: <FileText className="w-4 h-4" /> },
          { id: 'payments', label: 'Payments', icon: <DollarSign className="w-4 h-4" /> },
          { id: 'timeline', label: 'Timeline', icon: <Calendar className="w-4 h-4" /> },
          {
            id: 'post-closing',
            label: 'Post-Closing',
            icon: <MessageSquare className="w-4 h-4" />,
          },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Upcoming Deadlines
                </h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-3">
                  {upcomingDeadlines.map(deadline => (
                    <div
                      key={deadline.id}
                      className={`p-3 rounded-lg border ${
                        deadline.isCritical
                          ? 'border-red-200 bg-red-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{deadline.name}</h4>
                          <p className="text-sm text-gray-600">
                            Due: {new Date(deadline.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {deadline.isCritical && (
                            <Chip size="sm" color="danger" variant="flat">
                              Critical
                            </Chip>
                          )}
                          <Chip size="sm" color="primary" variant="flat">
                            {deadline.type}
                          </Chip>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Financial Summary */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Financial Summary
                </h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {transaction.currency} {financialSummary.paidAmount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Paid</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-600">
                        {transaction.currency} {financialSummary.pendingAmount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Pending</div>
                    </div>
                  </div>
                  {financialSummary.nextPayment && (
                    <div className="p-3 bg-primary-50 border border-primary-200 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-1">Next Payment</h5>
                      <p className="text-sm text-primary-800">
                        {transaction.currency}{' '}
                        {financialSummary.nextPayment.amount.toLocaleString()} due{' '}
                        {new Date(financialSummary.nextPayment.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {financialSummary.escrowAmount && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <h5 className="font-medium text-green-900 mb-1">Escrow</h5>
                      <p className="text-sm text-green-800">
                        {transaction.currency} {financialSummary.escrowAmount.toLocaleString()} in
                        escrow
                      </p>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>

            {/* Team Status */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Team Status
                </h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-3">
                  {teamStatus.map(member => (
                    <div
                      key={member.userId}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            member.isOnline ? 'bg-green-500' : 'bg-gray-400'
                          }`}
                        />
                        <div>
                          <h4 className="font-medium text-gray-900">{member.name}</h4>
                          <p className="text-sm text-gray-600">{member.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {member.completedTasks} completed
                        </div>
                        <div className="text-xs text-gray-600">
                          {member.pendingTasks} pending
                          {member.overdueItems > 0 && (
                            <span className="text-red-600 ml-1">
                              • {member.overdueItems} overdue
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Recent Activity
                </h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-3">
                  {recentActivity.map(activity => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                        <p className="text-xs text-gray-600">
                          by {activity.userName} • {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        {activeTab === 'checklist' && (
          <ClosingChecklist transactionId={transactionId} userRole={userRole} userId={userId} />
        )}

        {activeTab === 'documents' && (
          <DocumentManagement transactionId={transactionId} userRole={userRole} userId={userId} />
        )}

        {activeTab === 'payments' && (
          <PaymentProcessing transactionId={transactionId} userRole={userRole} userId={userId} />
        )}

        {activeTab === 'timeline' && (
          <TransactionTimeline transactionId={transactionId} userRole={userRole} userId={userId} />
        )}

        {activeTab === 'post-closing' && (
          <PostClosingManagement
            transactionId={transactionId}
            userRole={userRole}
            userId={userId}
          />
        )}
      </div>
    </div>
  );
};

export default TransactionCompletionDashboard;
