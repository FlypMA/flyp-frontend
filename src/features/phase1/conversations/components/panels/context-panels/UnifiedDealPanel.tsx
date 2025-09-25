// 🎯 Unified Deal Panel Component
// Location: src/features/phase1/conversations/components/panels/context-panels/UnifiedDealPanel.tsx
// Purpose: Sophisticated yet simple unified deal command center

import { Button } from '@/shared/components/buttons';
import { Chip, Progress } from '@heroui/react';
import {
  Building2,
  Download,
  FileText,
  Handshake,
  MapPin,
  MessageSquare,
  Upload,
} from 'lucide-react';
import React from 'react';
import { Conversation } from '../../../types';

// =============================================================================
// TYPES
// =============================================================================

// Extended business context type for photos
interface BusinessContextWithPhotos {
  title: string;
  price: number;
  currency: string;
  location: string;
  photos?: Array<{
    url: string;
    caption?: string;
  }>;
}

// =============================================================================
// COMPONENT PROPS
// =============================================================================

interface UnifiedDealPanelProps {
  conversation: Conversation | null;
  onQuickAction: (_actionId: string) => void;
  className?: string;
}

// =============================================================================
// UNIFIED DEAL PANEL COMPONENT
// =============================================================================

const UnifiedDealPanel: React.FC<UnifiedDealPanelProps> = ({
  conversation,
  onQuickAction,
  className = '',
}) => {
  if (!conversation) {
    return (
      <div className={`unified-deal-panel p-4 ${className}`}>
        <div className="flex flex-col items-center justify-center h-full text-center">
          <Building2 className="w-12 h-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Deal Selected</h3>
          <p className="text-gray-600 text-sm">
            Select a conversation to view deal details and actions.
          </p>
        </div>
      </div>
    );
  }

  const businessContext = conversation.businessContext || conversation.context?.businessContext;

  // Mock deal data - would come from API
  const dealData = {
    status: 'negotiation',
    progress: 65,
    currentStage: 'due_diligence',
    lastActivity: '2 hours ago',
    nextDeadline: 'Jan 25, 2024',
    totalValue: businessContext?.price || 2500000,
    currency: 'EUR',
  };

  const activeTasks = [
    {
      id: '1',
      type: 'due_diligence',
      title: 'Review Financial Statements',
      status: 'pending',
      priority: 'high',
      dueDate: 'Jan 25',
    },
    {
      id: '2',
      type: 'offer',
      title: 'Respond to Counter Offer',
      status: 'pending',
      priority: 'medium',
      dueDate: 'Jan 27',
    },
    {
      id: '3',
      type: 'document',
      title: 'Share Business Plan',
      status: 'in_progress',
      priority: 'low',
      dueDate: 'Jan 30',
    },
  ];

  const recentDocuments = [
    {
      id: '1',
      name: 'Financial Statements 2023.pdf',
      type: 'pdf',
      uploadedAt: '2 hours ago',
      accessLevel: 'due_diligence',
    },
    {
      id: '2',
      name: 'Business Plan.docx',
      type: 'docx',
      uploadedAt: '1 day ago',
      accessLevel: 'public',
    },
    {
      id: '3',
      name: 'Market Analysis.xlsx',
      type: 'xlsx',
      uploadedAt: '2 days ago',
      accessLevel: 'nda_required',
    },
  ];

  const formatCurrency = (amount: number, currency: string = 'EUR') => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'warning';
      case 'pending':
        return 'default';
      case 'overdue':
        return 'danger';
      default:
        return 'default';
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'due_diligence':
        return <FileText className="w-4 h-4" />;
      case 'offer':
        return <Handshake className="w-4 h-4" />;
      case 'document':
        return <Upload className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <div className={`unified-deal-panel flex flex-col h-full ${className}`}>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {/* Business Photos */}
          {businessContext &&
          (businessContext as BusinessContextWithPhotos).photos &&
          (businessContext as BusinessContextWithPhotos).photos!.length > 0 ? (
            <div className="grid grid-cols-2 gap-1 h-32 rounded-lg overflow-hidden">
              <div className="relative">
                <img
                  src={(businessContext as BusinessContextWithPhotos).photos![0].url}
                  alt={
                    (businessContext as BusinessContextWithPhotos).photos![0].caption ||
                    businessContext.title
                  }
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative">
                <img
                  src={
                    (businessContext as BusinessContextWithPhotos).photos![1]?.url ||
                    (businessContext as BusinessContextWithPhotos).photos![0].url
                  }
                  alt={
                    (businessContext as BusinessContextWithPhotos).photos![1]?.caption ||
                    businessContext.title
                  }
                  className="w-full h-full object-cover"
                />
                {(businessContext as BusinessContextWithPhotos).photos!.length > 2 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      +{(businessContext as BusinessContextWithPhotos).photos!.length - 2}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Building2 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No photos available</p>
              </div>
            </div>
          )}

          {/* Business Info */}
          {businessContext && (
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{businessContext.title}</h3>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{businessContext.location}</span>
                </div>
              </div>

              {/* Deal Value */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Deal Value</p>
                    <p className="text-xl font-bold text-gray-900">
                      {formatCurrency(dealData.totalValue, dealData.currency)}
                    </p>
                  </div>
                  <div className="text-right">
                    <Chip size="sm" color="success" variant="flat">
                      {dealData.progress}% Complete
                    </Chip>
                  </div>
                </div>
                <div className="mt-2">
                  <Progress value={dealData.progress} color="success" className="h-2" />
                </div>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="pt-4 border-t border-gray-200">
            <div className="mb-3">
              <h4 className="text-sm font-semibold text-gray-900">Next Steps</h4>
            </div>
            <div className="space-y-2">
              {activeTasks.map(task => (
                <div
                  key={task.id}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-200 border border-transparent hover:border-gray-200 hover:shadow-sm"
                  onClick={() => onQuickAction(`task_${task.id}`)}
                >
                  {getTaskIcon(task.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors">
                      {task.title}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Chip size="sm" color={getStatusColor(task.status)} variant="flat">
                        {task.status}
                      </Chip>
                      <span className="text-xs text-gray-500">Due {task.dueDate}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Quick Actions</h4>

            <div className="grid grid-cols-1 gap-3">
              <Button
                className="w-full h-auto p-4 rounded-lg hover:shadow-md transition-all duration-200 justify-start"
                variant="secondary"
                onPress={() => onQuickAction('create_offer')}
              >
                <div className="flex flex-col items-start w-full">
                  <div className="font-semibold text-white text-sm">Make Offer</div>
                  <div className="text-xs text-gray-300 mt-1 text-left">
                    Create a new business offer
                  </div>
                </div>
              </Button>

              <Button
                className="w-full h-auto p-4 rounded-lg hover:shadow-md transition-all duration-200 justify-start"
                variant="secondary"
                onPress={() => onQuickAction('request_documents')}
              >
                <div className="flex flex-col items-start w-full">
                  <div className="font-semibold text-white text-sm">Request Documents</div>
                  <div className="text-xs text-gray-300 mt-1 text-left">
                    Ask for due diligence items
                  </div>
                </div>
              </Button>

              <Button
                className="w-full h-auto p-4 rounded-lg hover:shadow-md transition-all duration-200 justify-start"
                variant="secondary"
                onPress={() => onQuickAction('share_document')}
              >
                <div className="flex flex-col items-start w-full">
                  <div className="font-semibold text-white text-sm">Share Document</div>
                  <div className="text-xs text-gray-300 mt-1 text-left">Upload and share files</div>
                </div>
              </Button>

              <Button
                className="w-full h-auto p-4 rounded-lg hover:shadow-md transition-all duration-200 justify-start"
                variant="secondary"
                onPress={() => onQuickAction('schedule_meeting')}
              >
                <div className="flex flex-col items-start w-full">
                  <div className="font-semibold text-white text-sm">Schedule Meeting</div>
                  <div className="text-xs text-gray-300 mt-1 text-left">Book a call or meeting</div>
                </div>
              </Button>
            </div>
          </div>

          {/* Deal Timeline */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Deal Timeline</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Initial Contact</p>
                  <p className="text-xs text-gray-500">Jan 15, 2024</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">First Offer Made</p>
                  <p className="text-xs text-gray-500">Jan 18, 2024</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Due Diligence Started</p>
                  <p className="text-xs text-gray-500">Jan 20, 2024</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Final Negotiation</p>
                  <p className="text-xs text-gray-400">Pending</p>
                </div>
              </div>
            </div>
          </div>

          {/* Shared Files */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-gray-900">Shared Files</h4>
              <Button
                size="sm"
                variant="tertiary"
                onPress={() => onQuickAction('upload_document')}
                startContent={<Upload className="w-3 h-3" />}
              >
                Upload
              </Button>
            </div>
            <div className="space-y-2">
              {recentDocuments.map(doc => (
                <div
                  key={doc.id}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                >
                  <FileText className="w-4 h-4 text-gray-400" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                    <p className="text-xs text-gray-500">{doc.uploadedAt}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="tertiary"
                    isIconOnly
                    onPress={() => onQuickAction(`download_${doc.id}`)}
                  >
                    <Download className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedDealPanel;
