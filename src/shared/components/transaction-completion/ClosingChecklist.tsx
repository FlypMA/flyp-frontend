/**
 * Closing Checklist
 * Location: src/shared/components/transaction-completion/ClosingChecklist.tsx
 * Purpose: Manage closing checklist items and tasks
 */

import { CustomCheckbox } from '@/shared/components/forms';
import { ClosingChecklistItem, Transaction } from '@/shared/types/transaction-completion';
import { Card, CardBody, CardHeader, Chip, Progress } from '@heroui/react';
import {
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  FileText,
  Scale,
  Shield,
  TrendingUp,
  Users,
  XCircle,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface ClosingChecklistProps {
  transactionId: string;
  userRole: 'buyer' | 'seller' | 'advisor';
  userId: string;
}

const ClosingChecklist: React.FC<ClosingChecklistProps> = ({ transactionId, userRole, userId }) => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
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
        keyDates: [],
        parties: [],
        documents: [],
        closingChecklist: [
          {
            id: 'checklist-1',
            category: 'legal',
            title: 'Purchase Agreement Signed',
            description: 'All parties have signed the purchase agreement',
            status: 'completed',
            priority: 'critical',
            assignedTo: 'lawyer-1',
            dueDate: '2024-02-01',
            completedDate: '2024-01-25',
            dependencies: [],
            documents: ['doc-1'],
            comments: [],
            isRequired: true,
          },
          {
            id: 'checklist-2',
            category: 'legal',
            title: 'Due Diligence Complete',
            description: 'All due diligence items have been completed and approved',
            status: 'in_progress',
            priority: 'high',
            assignedTo: 'buyer-1',
            dueDate: '2024-02-15',
            dependencies: ['checklist-1'],
            documents: ['doc-2', 'doc-3'],
            comments: [],
            isRequired: true,
          },
          {
            id: 'checklist-3',
            category: 'financial',
            title: 'Financing Approval',
            description: 'Obtain final financing approval from lender',
            status: 'pending',
            priority: 'critical',
            assignedTo: 'buyer-1',
            dueDate: '2024-02-28',
            dependencies: ['checklist-2'],
            documents: ['doc-4'],
            comments: [],
            isRequired: true,
          },
          {
            id: 'checklist-4',
            category: 'financial',
            title: 'Down Payment Made',
            description: 'Initial down payment has been transferred',
            status: 'pending',
            priority: 'high',
            assignedTo: 'buyer-1',
            dueDate: '2024-03-01',
            dependencies: ['checklist-3'],
            documents: [],
            comments: [],
            isRequired: true,
          },
          {
            id: 'checklist-5',
            category: 'operational',
            title: 'Asset Transfer',
            description: 'Physical assets have been transferred to buyer',
            status: 'pending',
            priority: 'medium',
            assignedTo: 'seller-1',
            dueDate: '2024-03-10',
            dependencies: ['checklist-4'],
            documents: ['doc-5'],
            comments: [],
            isRequired: true,
          },
          {
            id: 'checklist-6',
            category: 'regulatory',
            title: 'Regulatory Approvals',
            description: 'All required regulatory approvals obtained',
            status: 'completed',
            priority: 'high',
            assignedTo: 'lawyer-1',
            dueDate: '2024-02-20',
            completedDate: '2024-02-18',
            dependencies: [],
            documents: ['doc-6'],
            comments: [],
            isRequired: true,
          },
          {
            id: 'checklist-7',
            category: 'closing',
            title: 'Closing Documents Prepared',
            description: 'All closing documents are prepared and ready',
            status: 'pending',
            priority: 'critical',
            assignedTo: 'lawyer-1',
            dueDate: '2024-03-12',
            dependencies: ['checklist-2', 'checklist-3'],
            documents: ['doc-7', 'doc-8'],
            comments: [],
            isRequired: true,
          },
          {
            id: 'checklist-8',
            category: 'closing',
            title: 'Final Walkthrough',
            description: 'Final inspection and walkthrough completed',
            status: 'pending',
            priority: 'medium',
            assignedTo: 'buyer-1',
            dueDate: '2024-03-14',
            dependencies: ['checklist-5'],
            documents: [],
            comments: [],
            isRequired: true,
          },
        ],
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

  const updateChecklistItem = async (itemId: string, status: ClosingChecklistItem['status']) => {
    try {
      // TODO: Replace with actual API call
      // await transactionService.updateChecklistItem(transactionId, itemId, status);

      // Update local state
      setTransaction(prev => {
        if (!prev) return prev;

        const updatedChecklist = prev.closingChecklist.map(item =>
          item.id === itemId
            ? {
                ...item,
                status,
                completedDate: status === 'completed' ? new Date().toISOString() : undefined,
              }
            : item
        );

        return { ...prev, closingChecklist: updatedChecklist };
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
      case 'blocked':
        return <XCircle className="w-4 h-4 text-red-600" />;
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
      case 'blocked':
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'legal':
        return <Scale className="w-5 h-5" />;
      case 'financial':
        return <TrendingUp className="w-5 h-5" />;
      case 'operational':
        return <Users className="w-5 h-5" />;
      case 'regulatory':
        return <Shield className="w-5 h-5" />;
      case 'closing':
        return <CheckCircle className="w-5 h-5" />;
      case 'post_closing':
        return <FileText className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'legal':
        return 'text-blue-600 bg-blue-100';
      case 'financial':
        return 'text-green-600 bg-green-100';
      case 'operational':
        return 'text-purple-600 bg-purple-100';
      case 'regulatory':
        return 'text-orange-600 bg-orange-100';
      case 'closing':
        return 'text-red-600 bg-red-100';
      case 'post_closing':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading closing checklist...</p>
        </div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="text-center py-8">
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No transaction found</h3>
        <p className="text-gray-600">Unable to load the closing checklist.</p>
      </div>
    );
  }

  // Group checklist items by category
  const categories = transaction.closingChecklist.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, ClosingChecklistItem[]>
  );

  const categoryProgress = Object.entries(categories).map(([category, items]) => {
    const completed = items.filter(item => item.status === 'completed').length;
    const total = items.length;
    const progress = total > 0 ? (completed / total) * 100 : 0;
    return { category, progress, completed, total };
  });

  const overallProgress =
    transaction.closingChecklist.length > 0
      ? (transaction.closingChecklist.filter(item => item.status === 'completed').length /
          transaction.closingChecklist.length) *
        100
      : 0;

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-lg font-semibold">Closing Checklist Progress</h3>
            <Chip color="primary" variant="flat">
              {overallProgress.toFixed(0)}% Complete
            </Chip>
          </div>
        </CardHeader>
        <CardBody>
          <Progress value={overallProgress} className="mb-4" color="primary" size="lg" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-semibold text-gray-900">
                {transaction.closingChecklist.filter(item => item.status === 'completed').length}
              </div>
              <div className="text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">
                {transaction.closingChecklist.filter(item => item.status === 'in_progress').length}
              </div>
              <div className="text-gray-600">In Progress</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">
                {transaction.closingChecklist.filter(item => item.status === 'pending').length}
              </div>
              <div className="text-gray-600">Pending</div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Category Progress */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Progress by Category</h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryProgress.map(({ category, progress, completed, total }) => (
              <div key={category} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${getCategoryColor(category)}`}>
                    {getCategoryIcon(category)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 capitalize">
                      {category.replace('_', ' ')}
                    </h4>
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

      {/* Checklist Items by Category */}
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
                      <div className={`p-3 rounded-xl ${getCategoryColor(category)}`}>
                        {getCategoryIcon(category)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900 capitalize">
                            {category.replace('_', ' ')}
                          </h3>
                          <Chip size="sm" color="primary" variant="flat">
                            {completedItems}/{totalItems}
                          </Chip>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{items.length} checklist items</p>
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
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
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
                                  {item.isRequired && (
                                    <>
                                      <span>•</span>
                                      <span className="text-red-600">Required</span>
                                    </>
                                  )}
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

                            {/* Documents */}
                            {item.documents.length > 0 && (
                              <div className="mb-2">
                                <p className="text-xs text-gray-500 mb-1">Documents:</p>
                                <div className="flex flex-wrap gap-1">
                                  {item.documents.map(docId => (
                                    <Chip key={docId} size="sm" variant="flat" color="primary">
                                      {docId}
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
                                    updateChecklistItem(
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
    </div>
  );
};

export { ClosingChecklist };
