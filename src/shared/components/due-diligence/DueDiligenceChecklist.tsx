/**
 * Due Diligence Checklist
 * Location: src/shared/components/due-diligence/DueDiligenceChecklist.tsx
 * Purpose: Interactive checklist for due diligence items
 */

import { Button } from '@/shared/components/buttons';
import { CustomCheckbox } from '@/shared/components/forms';
import {
  DueDiligenceChecklist as DueDiligenceChecklistType,
  DueDiligenceItem,
} from '@/shared/types/due-diligence';
import { logger } from '@/shared/utils/logger';
import { Card, CardBody, CardHeader, Chip, Progress } from '@heroui/react';
import {
  Building2,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  DollarSign,
  FileText,
  Scale,
  Shield,
  TrendingUp,
  Users,
  XCircle,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface DueDiligenceChecklistProps {
  processId: string;
  userRole: 'buyer' | 'seller' | 'advisor';
}

const DueDiligenceChecklist: React.FC<DueDiligenceChecklistProps> = ({ processId, userRole }) => {
  const [checklist, setChecklist] = useState<DueDiligenceChecklistType | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadChecklist();
  }, [processId]);

  const loadChecklist = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await dueDiligenceService.getChecklist(processId);
      // setChecklist(response.data);

      // Mock data for now
      const mockChecklist: DueDiligenceChecklistType = {
        id: 'checklist-1',
        processId,
        categories: [
          {
            id: 'financial',
            name: 'Financial Due Diligence',
            description: 'Review financial statements, cash flow, and financial health',
            icon: 'DollarSign',
            color: 'text-green-600',
            progress: 80,
            priority: 'high',
            status: 'in_progress',
            items: [
              {
                id: 'fin-1',
                categoryId: 'financial',
                title: 'Audited Financial Statements',
                description: 'Review audited financial statements for past 3-5 years',
                status: 'completed',
                assignedTo: 'buyer-1',
                dueDate: '2024-01-20',
                completedDate: '2024-01-18',
                priority: 'high',
                documents: ['doc-1', 'doc-2'],
                comments: [],
                verificationRequired: true,
                verificationStatus: 'verified',
              },
              {
                id: 'fin-2',
                categoryId: 'financial',
                title: 'Cash Flow Analysis',
                description: 'Analyze cash flow statements and projections',
                status: 'in_progress',
                assignedTo: 'buyer-1',
                dueDate: '2024-01-25',
                priority: 'high',
                documents: ['doc-3'],
                comments: [],
                verificationRequired: true,
                verificationStatus: 'pending',
              },
              {
                id: 'fin-3',
                categoryId: 'financial',
                title: 'Debt Schedule Review',
                description: 'Review all outstanding debts and loan agreements',
                status: 'pending',
                assignedTo: 'buyer-1',
                dueDate: '2024-01-30',
                priority: 'medium',
                documents: [],
                comments: [],
                verificationRequired: false,
              },
            ],
          },
          {
            id: 'legal',
            name: 'Legal Due Diligence',
            description: 'Review legal documents, contracts, and compliance',
            icon: 'Scale',
            color: 'text-blue-600',
            progress: 60,
            priority: 'high',
            status: 'in_progress',
            items: [
              {
                id: 'leg-1',
                categoryId: 'legal',
                title: 'Corporate Structure Review',
                description: 'Review corporate structure and ownership documents',
                status: 'completed',
                assignedTo: 'advisor-1',
                dueDate: '2024-01-22',
                completedDate: '2024-01-20',
                priority: 'high',
                documents: ['doc-4'],
                comments: [],
                verificationRequired: true,
                verificationStatus: 'verified',
              },
              {
                id: 'leg-2',
                categoryId: 'legal',
                title: 'Material Contracts',
                description: 'Review all material contracts and agreements',
                status: 'in_progress',
                assignedTo: 'advisor-1',
                dueDate: '2024-01-28',
                priority: 'high',
                documents: ['doc-5', 'doc-6'],
                comments: [],
                verificationRequired: true,
                verificationStatus: 'pending',
              },
            ],
          },
          {
            id: 'operational',
            name: 'Operational Due Diligence',
            description: 'Review business operations, processes, and key personnel',
            icon: 'Building2',
            color: 'text-purple-600',
            progress: 45,
            priority: 'medium',
            status: 'in_progress',
            items: [
              {
                id: 'ops-1',
                categoryId: 'operational',
                title: 'Organization Chart Review',
                description: 'Review organizational structure and key personnel',
                status: 'pending',
                assignedTo: 'buyer-1',
                dueDate: '2024-02-05',
                priority: 'medium',
                documents: [],
                comments: [],
                verificationRequired: false,
              },
            ],
          },
        ],
        overallProgress: 65,
        lastUpdated: '2024-01-20',
      };

      setChecklist(mockChecklist);
    } catch (error) {
      logger.error("Error occurred", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const updateItemStatus = async (itemId: string, status: DueDiligenceItem['status']) => {
    try {
      // TODO: Replace with actual API call
      // await dueDiligenceService.updateItemStatus(processId, itemId, status);

      // Update local state
      setChecklist(prev => {
        if (!prev) return prev;

        const updatedCategories = prev.categories.map(category => ({
          ...category,
          items: category.items.map(item => (item.id === itemId ? { ...item, status } : item)),
        }));

        // Recalculate category progress
        const updatedCategoriesWithProgress = updatedCategories.map(category => {
          const completedItems = category.items.filter(item => item.status === 'completed').length;
          const totalItems = category.items.length;
          const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

          return { ...category, progress };
        });

        // Recalculate overall progress
        const totalCompletedItems = updatedCategoriesWithProgress.reduce(
          (sum, category) =>
            sum + category.items.filter(item => item.status === 'completed').length,
          0
        );
        const totalItems = updatedCategoriesWithProgress.reduce(
          (sum, category) => sum + category.items.length,
          0
        );
        const overallProgress = totalItems > 0 ? (totalCompletedItems / totalItems) * 100 : 0;

        return {
          ...prev,
          categories: updatedCategoriesWithProgress,
          overallProgress,
        };
      });
    } catch (error) {
      logger.error("Error occurred", error);
    }
  };

  const getStatusIcon = (status: DueDiligenceItem['status']) => {
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

  const getStatusColor = (status: DueDiligenceItem['status']) => {
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
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'DollarSign':
        return <DollarSign className="w-5 h-5" />;
      case 'Scale':
        return <Scale className="w-5 h-5" />;
      case 'Building2':
        return <Building2 className="w-5 h-5" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5" />;
      case 'FileText':
        return <FileText className="w-5 h-5" />;
      case 'Users':
        return <Users className="w-5 h-5" />;
      default:
        return <Shield className="w-5 h-5" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checklist...</p>
        </div>
      </div>
    );
  }

  if (!checklist) {
    return (
      <div className="text-center py-8">
        <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No checklist found</h3>
        <p className="text-gray-600">Unable to load the due diligence checklist.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-lg font-semibold">Overall Progress</h3>
            <Chip color="primary" variant="flat">
              {checklist.overallProgress.toFixed(0)}% Complete
            </Chip>
          </div>
        </CardHeader>
        <CardBody>
          <Progress value={checklist.overallProgress} className="mb-4" color="primary" size="lg" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-semibold text-gray-900">
                {checklist.categories.reduce(
                  (sum, cat) => sum + cat.items.filter(item => item.status === 'completed').length,
                  0
                )}
              </div>
              <div className="text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">
                {checklist.categories.reduce(
                  (sum, cat) =>
                    sum + cat.items.filter(item => item.status === 'in_progress').length,
                  0
                )}
              </div>
              <div className="text-gray-600">In Progress</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">
                {checklist.categories.reduce(
                  (sum, cat) => sum + cat.items.filter(item => item.status === 'pending').length,
                  0
                )}
              </div>
              <div className="text-gray-600">Pending</div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Categories */}
      <div className="space-y-4">
        {checklist.categories.map(category => {
          const isExpanded = expandedCategories.has(category.id);
          const completedItems = category.items.filter(item => item.status === 'completed').length;
          const totalItems = category.items.length;

          return (
            <Card key={category.id} className="border border-gray-200">
              <CardBody className="p-0">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-inset"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 bg-gray-100 rounded-xl flex-shrink-0`}>
                        {getCategoryIcon(category.icon)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                          <Chip
                            size="sm"
                            color={getPriorityColor(category.priority)}
                            variant="flat"
                          >
                            {category.priority}
                          </Chip>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-gray-500">
                            {completedItems}/{totalItems} items completed
                          </div>
                          <div className="flex-1 max-w-32">
                            <Progress value={category.progress} size="sm" color="primary" />
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
                      {category.items.map(item => (
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
                                  {item.verificationRequired && (
                                    <>
                                      <span>•</span>
                                      <span>
                                        Verification: {item.verificationStatus || 'pending'}
                                      </span>
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

                            {/* Action Buttons */}
                            {userRole === 'buyer' && item.assignedTo === 'buyer-1' && (
                              <div className="flex items-center gap-2">
                                <CustomCheckbox
                                  label="Mark as completed"
                                  checked={item.status === 'completed'}
                                  onChange={() => {
                                    updateItemStatus(
                                      item.id,
                                      item.status === 'completed' ? 'pending' : 'completed'
                                    );
                                  }}
                                  name={`item-${item.id}`}
                                />
                                {item.status === 'completed' && (
                                  <Button
                                    size="sm"
                                    variant="secondary"
                                    onPress={() => updateItemStatus(item.id, 'in_progress')}
                                  >
                                    Reopen
                                  </Button>
                                )}
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

export default DueDiligenceChecklist;
