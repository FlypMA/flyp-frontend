/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Post Closing Management
 * Location: src/shared/components/transaction-completion/PostClosingManagement.tsx
 * Purpose: Manage post-closing activities and handover
 */

import { CustomCheckbox } from '@/shared/components/forms';
import { PostClosingItem, Transaction } from '@/shared/types/transaction-completion';
import { Card, CardBody, CardHeader, Chip, Progress } from '@heroui/react';
import {
  CheckCircle,
  Clock,
  FileText,
  MessageSquare,
  Plus,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface PostClosingManagementProps {
  transactionId: string;
  userRole: 'buyer' | 'seller' | 'advisor';
  userId: string;
}

const PostClosingManagement: React.FC<PostClosingManagementProps> = ({
  transactionId,
  userRole,
  userId,
}) => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

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
        payments: [],
        postClosingItems: [
          {
            id: 'post-1',
            title: 'Employee Transition',
            description: 'Facilitate smooth transition of key employees to new ownership',
            type: 'transition',
            status: 'pending',
            priority: 'high',
            assignedTo: 'buyer-1',
            dueDate: '2024-03-30',
            responsibleParty: 'both',
            estimatedDuration: 30,
            dependencies: [],
            deliverables: ['Employee contracts', 'Benefits transfer', 'Training schedule'],
            comments: [],
          },
          {
            id: 'post-2',
            title: 'System Integration',
            description: "Integrate business systems and processes with buyer's infrastructure",
            type: 'integration',
            status: 'pending',
            priority: 'high',
            assignedTo: 'buyer-1',
            dueDate: '2024-04-15',
            responsibleParty: 'buyer',
            estimatedDuration: 45,
            dependencies: ['post-1'],
            deliverables: ['System migration', 'Data transfer', 'User training'],
            comments: [],
          },
          {
            id: 'post-3',
            title: 'Customer Communication',
            description: 'Notify customers of ownership change and maintain relationships',
            type: 'transition',
            status: 'pending',
            priority: 'medium',
            assignedTo: 'seller-1',
            dueDate: '2024-03-25',
            responsibleParty: 'seller',
            estimatedDuration: 14,
            dependencies: [],
            deliverables: ['Customer letters', 'Contact updates', 'Service continuity plan'],
            comments: [],
          },
          {
            id: 'post-4',
            title: 'Regulatory Filings',
            description: 'Complete all required regulatory filings and notifications',
            type: 'compliance',
            status: 'pending',
            priority: 'high',
            assignedTo: 'lawyer-1',
            dueDate: '2024-04-01',
            responsibleParty: 'buyer',
            estimatedDuration: 7,
            dependencies: [],
            deliverables: ['Regulatory forms', 'License transfers', 'Compliance documentation'],
            comments: [],
          },
          {
            id: 'post-5',
            title: 'Financial Reconciliation',
            description: 'Complete final financial reconciliation and reporting',
            type: 'reporting',
            status: 'pending',
            priority: 'medium',
            assignedTo: 'accountant-1',
            dueDate: '2024-04-30',
            responsibleParty: 'both',
            estimatedDuration: 21,
            dependencies: ['post-2'],
            deliverables: ['Final financial statements', 'Tax filings', 'Audit reports'],
            comments: [],
          },
          {
            id: 'post-6',
            title: 'Vendor Transition',
            description: 'Transfer vendor relationships and contracts to new ownership',
            type: 'transition',
            status: 'pending',
            priority: 'medium',
            assignedTo: 'buyer-1',
            dueDate: '2024-04-10',
            responsibleParty: 'buyer',
            estimatedDuration: 21,
            dependencies: ['post-1'],
            deliverables: ['Vendor contracts', 'Payment terms', 'Service agreements'],
            comments: [],
          },
        ],
        communications: [],
        version: 1,
        createdBy: 'buyer-1',
        requiresApproval: false,
        approvals: [],
      };

      setTransaction(mockTransaction);
    } catch (error) {
      // TODO: Add proper error handling
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const updatePostClosingItem = async (itemId: string, status: PostClosingItem['status']) => {
    try {
      // TODO: Replace with actual API call
      // await transactionService.updatePostClosingItem(transactionId, itemId, status);

      // Update local state
      setTransaction(prev => {
        if (!prev) return prev;

        const updatedItems = prev.postClosingItems.map(item =>
          item.id === itemId
            ? {
                ...item,
                status,
                completedDate: status === 'completed' ? new Date().toISOString() : undefined,
              }
            : item
        );

        return { ...prev, postClosingItems: updatedItems };
      });
    } catch (error) {
      // TODO: Add proper error handling
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'cancelled':
        return <X className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'warning';
      case 'cancelled':
        return 'danger';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'danger';
      case 'high':
        return 'warning';
      case 'medium':
        return 'primary';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'transition':
        return <Users className="w-5 h-5" />;
      case 'integration':
        return <TrendingUp className="w-5 h-5" />;
      case 'compliance':
        return <FileText className="w-5 h-5" />;
      case 'reporting':
        return <MessageSquare className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'transition':
        return 'text-primary-600 bg-primary-100';
      case 'integration':
        return 'text-green-600 bg-green-100';
      case 'compliance':
        return 'text-orange-600 bg-orange-100';
      case 'reporting':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post-closing items...</p>
        </div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="text-center py-8">
        <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No transaction found</h3>
        <p className="text-gray-600">Unable to load post-closing information.</p>
      </div>
    );
  }

  // Group post-closing items by type
  const categories = transaction.postClosingItems.reduce(
    (acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type].push(item);
      return acc;
    },
    {} as Record<string, PostClosingItem[]>
  );

  const categoryProgress = Object.entries(categories).map(([category, items]) => {
    const completed = items.filter(item => item.status === 'completed').length;
    const total = items.length;
    const progress = total > 0 ? (completed / total) * 100 : 0;
    return { category, progress, completed, total };
  });

  const overallProgress =
    transaction.postClosingItems.length > 0
      ? (transaction.postClosingItems.filter(item => item.status === 'completed').length /
          transaction.postClosingItems.length) *
        100
      : 0;

  const completedItems = transaction.postClosingItems.filter(
    item => item.status === 'completed'
  ).length;
  const inProgressItems = transaction.postClosingItems.filter(
    item => item.status === 'in_progress'
  ).length;
  const pendingItems = transaction.postClosingItems.filter(
    item => item.status === 'pending'
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Post-Closing Management</h3>
          <p className="text-sm text-gray-600">Manage post-closing activities and handover</p>
        </div>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <h4 className="text-md font-semibold">Post-Closing Progress</h4>
            <Chip color="primary" variant="flat">
              {overallProgress.toFixed(0)}% Complete
            </Chip>
          </div>
        </CardHeader>
        <CardBody>
          <Progress value={overallProgress} className="mb-4" color="primary" size="lg" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-semibold text-gray-900">{completedItems}</div>
              <div className="text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">{inProgressItems}</div>
              <div className="text-gray-600">In Progress</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">{pendingItems}</div>
              <div className="text-gray-600">Pending</div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Category Progress */}
      <Card>
        <CardHeader>
          <h4 className="text-md font-semibold">Progress by Category</h4>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryProgress.map(({ category, progress, completed, total }) => (
              <div key={category} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${getTypeColor(category)}`}>
                    {getTypeIcon(category)}
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 capitalize">{category}</h5>
                    <p className="text-sm text-gray-600">
                      {completed}/{total} items
                    </p>
                  </div>
                </div>
                <Progress value={progress} size="sm" color="primary" />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Post-Closing Items by Category */}
      <div className="space-y-4">
        {Object.entries(categories).map(([category, items]) => {
          const isExpanded = expandedCategories.has(category);
          const completedItems = items.filter(item => item.status === 'completed').length;
          const totalItems = items.length;

          return (
            <Card key={category} className="border border-gray-200">
              <CardBody className="p-0">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-inset"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${getTypeColor(category)}`}>
                        {getTypeIcon(category)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900 capitalize">
                            {category}
                          </h3>
                          <Chip size="sm" color="primary" variant="flat">
                            {completedItems}/{totalItems}
                          </Chip>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {items.length} post-closing items
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-gray-500">
                            {completedItems}/{totalItems} completed
                          </div>
                          <div className="flex-1 max-w-32">
                            <Progress
                              value={(completedItems / totalItems) * 100}
                              size="sm"
                              color="primary"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      {isExpanded ? (
                        <X className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Plus className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Category Items */}
                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <div className="pt-4 space-y-3">
                      {items.map(item => (
                        <div
                          key={item.id}
                          className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex-shrink-0 mt-1">{getStatusIcon(item.status)}</div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
                                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <span>Due: {new Date(item.dueDate).toLocaleDateString()}</span>
                                  <span>•</span>
                                  <span>Assigned to: {item.assignedTo}</span>
                                  <span>•</span>
                                  <span>Duration: {item.estimatedDuration} days</span>
                                  <span>•</span>
                                  <span>Responsible: {item.responsibleParty}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Chip
                                  size="sm"
                                  color={getPriorityColor(item.priority)}
                                  variant="flat"
                                >
                                  {item.priority}
                                </Chip>
                                <Chip size="sm" color={getStatusColor(item.status)} variant="flat">
                                  {item.status.replace('_', ' ')}
                                </Chip>
                              </div>
                            </div>

                            {/* Dependencies */}
                            {item.dependencies.length > 0 && (
                              <div className="mb-2">
                                <p className="text-xs text-gray-500 mb-1">Dependencies:</p>
                                <div className="flex flex-wrap gap-1">
                                  {item.dependencies.map(depId => (
                                    <Chip key={depId} size="sm" variant="flat" color="default">
                                      {depId}
                                    </Chip>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Deliverables */}
                            {item.deliverables.length > 0 && (
                              <div className="mb-2">
                                <p className="text-xs text-gray-500 mb-1">Deliverables:</p>
                                <div className="flex flex-wrap gap-1">
                                  {item.deliverables.map((deliverable, index) => (
                                    <Chip key={index} size="sm" variant="flat" color="primary">
                                      {deliverable}
                                    </Chip>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Action Buttons */}
                            {userRole === 'buyer' && item.assignedTo === 'buyer-1' && (
                              <div className="flex items-center gap-2">
                                <CustomCheckbox
                                  label=""
                                  checked={item.status === 'completed'}
                                  onChange={() => {
                                    updatePostClosingItem(
                                      item.id,
                                      item.status === 'completed' ? 'pending' : 'completed'
                                    );
                                  }}
                                  name={`item-${item.id}`}
                                />
                                <span className="text-sm text-gray-600">
                                  Mark as {item.status === 'completed' ? 'pending' : 'completed'}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* Post-Closing Summary */}
      <Card>
        <CardHeader>
          <h4 className="text-md font-semibold">Post-Closing Summary</h4>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Key Activities</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Items:</span>
                  <span className="font-medium">{transaction.postClosingItems.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed:</span>
                  <span className="font-medium text-green-600">{completedItems}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">In Progress:</span>
                  <span className="font-medium text-yellow-600">{inProgressItems}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pending:</span>
                  <span className="font-medium text-gray-600">{pendingItems}</span>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Timeline</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Closing Date:</span>
                  <span className="font-medium">
                    {new Date(transaction.closingDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg. Duration:</span>
                  <span className="font-medium">
                    {Math.round(
                      transaction.postClosingItems.reduce(
                        (sum, item) => sum + item.estimatedDuration,
                        0
                      ) / transaction.postClosingItems.length
                    )}{' '}
                    days
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Latest Due Date:</span>
                  <span className="font-medium">
                    {new Date(
                      Math.max(
                        ...transaction.postClosingItems.map(item =>
                          new Date(item.dueDate).getTime()
                        )
                      )
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export { PostClosingManagement };
