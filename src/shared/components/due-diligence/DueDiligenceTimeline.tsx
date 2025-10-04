/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Due Diligence Timeline
 * Location: src/shared/components/due-diligence/DueDiligenceTimeline.tsx
 * Purpose: Timeline and progress tracking for due diligence process
 */

import { DueDiligenceActivity, DueDiligenceProcess } from '@/shared/types/due-diligence';
import { Card, CardBody, CardHeader, Chip, Progress } from '@heroui/react';
import {
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  MessageSquare,
  Upload,
  XCircle,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface DueDiligenceTimelineProps {
  processId: string;
  userRole: 'buyer' | 'seller' | 'advisor';
}

const DueDiligenceTimeline: React.FC<DueDiligenceTimelineProps> = ({ processId, userRole }) => {
  const [process, setProcess] = useState<DueDiligenceProcess | null>(null);
  const [activities, setActivities] = useState<DueDiligenceActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTimeline();
  }, [processId]);

  const loadTimeline = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await dueDiligenceService.getTimeline(processId);
      // setProcess(response.data.process);
      // setActivities(response.data.activities);

      // Mock data for now
      const mockProcess: DueDiligenceProcess = {
        id: processId,
        listingId: 'listing-1',
        buyerId: 'buyer-1',
        sellerId: 'seller-1',
        status: 'in_progress',
        startDate: '2024-01-15',
        estimatedCompletionDate: '2024-03-15',
        progress: 65,
        checklist: {
          id: 'checklist-1',
          processId,
          categories: [],
          overallProgress: 65,
          lastUpdated: '2024-01-20',
        },
        documents: [],
        communications: [],
        reports: [],
        team: [],
      };

      const mockActivities: DueDiligenceActivity[] = [
        {
          id: 'activity-1',
          type: 'status_changed',
          description: 'Due diligence process initiated',
          timestamp: '2024-01-15T09:00:00Z',
          userId: 'buyer-1',
          userName: 'Jane Buyer',
          metadata: { status: 'initiated' },
        },
        {
          id: 'activity-2',
          type: 'document_uploaded',
          description: 'Financial statements uploaded',
          timestamp: '2024-01-15T10:30:00Z',
          userId: 'seller-1',
          userName: 'John Seller',
          metadata: { documentName: 'Financial Statements 2023.pdf' },
        },
        {
          id: 'activity-3',
          type: 'item_completed',
          description: 'Financial review completed',
          timestamp: '2024-01-18T14:15:00Z',
          userId: 'buyer-1',
          userName: 'Jane Buyer',
          metadata: { itemName: 'Audited Financial Statements' },
        },
        {
          id: 'activity-4',
          type: 'document_uploaded',
          description: 'Customer contracts uploaded',
          timestamp: '2024-01-19T11:20:00Z',
          userId: 'seller-1',
          userName: 'John Seller',
          metadata: { documentName: 'Customer Contracts.pdf' },
        },
        {
          id: 'activity-5',
          type: 'message_sent',
          description: 'Message sent about legal documents',
          timestamp: '2024-01-19T16:45:00Z',
          userId: 'advisor-1',
          userName: 'Mike Advisor',
          metadata: { messageType: 'request' },
        },
        {
          id: 'activity-6',
          type: 'report_generated',
          description: 'Interim financial report generated',
          timestamp: '2024-01-20T15:30:00Z',
          userId: 'advisor-1',
          userName: 'Mike Advisor',
          metadata: {
            reportType: 'interim',
            reportTitle: 'Financial Due Diligence - Interim Report',
          },
        },
        {
          id: 'activity-7',
          type: 'item_completed',
          description: 'Legal document review completed',
          timestamp: '2024-01-21T09:30:00Z',
          userId: 'buyer-1',
          userName: 'Jane Buyer',
          metadata: { itemName: 'Corporate Structure Review' },
        },
        {
          id: 'activity-8',
          type: 'document_uploaded',
          description: 'Organization chart uploaded',
          timestamp: '2024-01-22T13:45:00Z',
          userId: 'seller-1',
          userName: 'John Seller',
          metadata: { documentName: 'Organization Chart.pdf' },
        },
      ];

      setProcess(mockProcess);
      setActivities(mockActivities);
    } catch (error) {
      // TODO: Add proper error handling
    } finally {
      setIsLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'document_uploaded':
        return <Upload className="w-4 h-4" />;
      case 'item_completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'message_sent':
        return <MessageSquare className="w-4 h-4" />;
      case 'report_generated':
        return <FileText className="w-4 h-4" />;
      case 'status_changed':
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'document_uploaded':
        return 'text-primary-600 bg-primary-100';
      case 'item_completed':
        return 'text-green-600 bg-green-100';
      case 'message_sent':
        return 'text-purple-600 bg-purple-100';
      case 'report_generated':
        return 'text-orange-600 bg-orange-100';
      case 'status_changed':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getActivityDescription = (activity: DueDiligenceActivity) => {
    switch (activity.type) {
      case 'document_uploaded':
        return `Uploaded document: ${activity.metadata?.documentName || 'Unknown document'}`;
      case 'item_completed':
        return `Completed: ${activity.metadata?.itemName || 'Unknown item'}`;
      case 'message_sent':
        return `Sent ${activity.metadata?.messageType || 'message'}`;
      case 'report_generated':
        return `Generated report: ${activity.metadata?.reportTitle || 'Unknown report'}`;
      case 'status_changed':
        return `Status changed to: ${activity.metadata?.status || 'Unknown status'}`;
      default:
        return activity.description;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - activityTime.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return activityTime.toLocaleDateString();
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

  if (!process) {
    return (
      <div className="text-center py-8">
        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No timeline found</h3>
        <p className="text-gray-600">Unable to load the due diligence timeline.</p>
      </div>
    );
  }

  const startDate = new Date(process.startDate);
  const endDate = new Date(process.estimatedCompletionDate);
  const today = new Date();
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const daysElapsed = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const daysRemaining = Math.max(0, totalDays - daysElapsed);

  return (
    <div className="space-y-6">
      {/* Process Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-primary-600" />
              <div>
                <h3 className="text-lg font-semibold">Process Timeline</h3>
                <p className="text-sm text-gray-600">
                  Started {startDate.toLocaleDateString()} • Est. completion{' '}
                  {endDate.toLocaleDateString()}
                </p>
              </div>
            </div>
            <Chip color="primary" variant="flat">
              {process.progress.toFixed(0)}% Complete
            </Chip>
          </div>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <Progress value={process.progress} className="mb-4" color="primary" size="lg" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{daysElapsed}</div>
                <div className="text-sm text-gray-600">Days Elapsed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{daysRemaining}</div>
                <div className="text-sm text-gray-600">Days Remaining</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">{totalDays}</div>
                <div className="text-sm text-gray-600">Total Duration</div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <h4 className="text-md font-semibold">Activity Timeline</h4>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {activities.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No activities yet</h3>
                <p className="text-gray-600">
                  Activities will appear here as the due diligence process progresses.
                </p>
              </div>
            ) : (
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                {activities.map((activity, index) => (
                  <div key={activity.id} className="relative flex items-start gap-4 pb-6">
                    {/* Timeline dot */}
                    <div
                      className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}
                    >
                      {getActivityIcon(activity.type)}
                    </div>

                    {/* Activity content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {getActivityDescription(activity)}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">by {activity.userName}</p>
                        </div>
                        <div className="flex-shrink-0 ml-4">
                          <span className="text-xs text-gray-500">
                            {formatTimeAgo(activity.timestamp)}
                          </span>
                        </div>
                      </div>

                      {/* Activity metadata */}
                      {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                        <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                          <div className="text-xs text-gray-600">
                            {Object.entries(activity.metadata).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="font-medium">{key}:</span>
                                <span>{String(value)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Milestones */}
      <Card>
        <CardHeader>
          <h4 className="text-md font-semibold">Key Milestones</h4>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {[
              {
                title: 'Process Initiated',
                date: '2024-01-15',
                status: 'completed',
                description: 'Due diligence process officially started',
              },
              {
                title: 'Financial Review Complete',
                date: '2024-01-25',
                status: 'in_progress',
                description: 'All financial documents reviewed and approved',
              },
              {
                title: 'Legal Review Complete',
                date: '2024-02-05',
                status: 'pending',
                description: 'Legal due diligence completed',
              },
              {
                title: 'Operational Review Complete',
                date: '2024-02-15',
                status: 'pending',
                description: 'Operational assessment finished',
              },
              {
                title: 'Final Report Ready',
                date: '2024-03-01',
                status: 'pending',
                description: 'Comprehensive due diligence report completed',
              },
              {
                title: 'Process Complete',
                date: '2024-03-15',
                status: 'pending',
                description: 'Due diligence process officially completed',
              },
            ].map((milestone, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    milestone.status === 'completed'
                      ? 'bg-green-100 text-green-600'
                      : milestone.status === 'in_progress'
                        ? 'bg-primary-100 text-primary-600'
                        : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {milestone.status === 'completed' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : milestone.status === 'in_progress' ? (
                    <Clock className="w-4 h-4" />
                  ) : (
                    <XCircle className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium text-gray-900">{milestone.title}</h5>
                    <span className="text-sm text-gray-500">
                      {new Date(milestone.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{milestone.description}</p>
                </div>
                <Chip
                  size="sm"
                  color={
                    milestone.status === 'completed'
                      ? 'success'
                      : milestone.status === 'in_progress'
                        ? 'primary'
                        : 'default'
                  }
                  variant="flat"
                >
                  {milestone.status.replace('_', ' ')}
                </Chip>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default DueDiligenceTimeline;
