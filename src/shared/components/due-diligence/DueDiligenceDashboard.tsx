/**
 * Due Diligence Dashboard
 * Location: src/shared/components/due-diligence/DueDiligenceDashboard.tsx
 * Purpose: Main dashboard for managing due diligence process
 */

import { Button } from '@/shared/components/buttons';
import { DueDiligenceDashboard as DueDiligenceDashboardType } from '@/shared/types/due-diligence';
import { Card, CardBody, CardHeader, Chip, Progress } from '@heroui/react';
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  MessageSquare,
  Shield,
  TrendingUp,
  Users,
  XCircle,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import DueDiligenceChecklist from './DueDiligenceChecklist';
import DueDiligenceDocuments from './DueDiligenceDocuments';
import DueDiligenceMessages from './DueDiligenceMessages';
import DueDiligenceReports from './DueDiligenceReports';
import DueDiligenceTimeline from './DueDiligenceTimeline';

interface DueDiligenceDashboardProps {
  processId: string;
  listingId: string;
  userRole: 'buyer' | 'seller' | 'advisor';
}

const DueDiligenceDashboard: React.FC<DueDiligenceDashboardProps> = ({
  processId,
  listingId,
  userRole,
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboard, setDashboard] = useState<DueDiligenceDashboardType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, [processId]);

  const loadDashboard = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await dueDiligenceService.getDashboard(processId);
      // setDashboard(response.data);

      // Mock data for now
      const mockDashboard: DueDiligenceDashboardType = {
        process: {
          id: processId,
          listingId,
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
        },
        recentActivity: [
          {
            id: '1',
            type: 'document_uploaded',
            description: 'Financial statements uploaded',
            timestamp: '2024-01-20T10:30:00Z',
            userId: 'seller-1',
            userName: 'John Seller',
          },
          {
            id: '2',
            type: 'item_completed',
            description: 'Financial review completed',
            timestamp: '2024-01-19T15:45:00Z',
            userId: 'buyer-1',
            userName: 'Jane Buyer',
          },
        ],
        upcomingDeadlines: [
          {
            id: '1',
            title: 'Legal document review',
            dueDate: '2024-01-25',
            type: 'item',
            priority: 'high',
            isOverdue: false,
            assignedTo: 'buyer-1',
          },
          {
            id: '2',
            title: 'Operational assessment',
            dueDate: '2024-01-30',
            type: 'item',
            priority: 'medium',
            isOverdue: false,
            assignedTo: 'advisor-1',
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
          },
          {
            userId: 'seller-1',
            name: 'John Seller',
            role: 'Seller',
            isOnline: false,
            lastActive: '2024-01-20T12:15:00Z',
            pendingTasks: 2,
            completedTasks: 5,
          },
        ],
        progressMetrics: {
          overallProgress: 65,
          categoryProgress: {
            financial: 80,
            legal: 60,
            operational: 45,
            commercial: 70,
            technical: 30,
            hr: 50,
          },
          itemsCompleted: 13,
          itemsTotal: 20,
          documentsUploaded: 8,
          documentsPending: 3,
          daysRemaining: 25,
          onTrack: true,
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'in_progress':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading due diligence dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="text-center py-8">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to load dashboard</h3>
        <p className="text-gray-600 mb-4">There was an error loading the due diligence process.</p>
        <Button variant="primary" onPress={loadDashboard}>
          Try Again
        </Button>
      </div>
    );
  }

  const { process, progressMetrics, upcomingDeadlines, teamStatus } = dashboard;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-blue-600" />
              <div>
                <h2 className="text-2xl font-bold">Due Diligence Process</h2>
                <p className="text-gray-600">Listing ID: {listingId}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Chip
                variant="flat"
                color={getStatusColor(process.status)}
                startContent={getStatusIcon(process.status)}
              >
                {process.status.replace('_', ' ')}
              </Chip>
              <Chip variant="flat" color="primary">
                <Users className="w-3 h-3 mr-1" />
                {teamStatus.length} Team Members
              </Chip>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-1">
                {progressMetrics.overallProgress}%
              </div>
              <div className="text-sm text-gray-600">Overall Progress</div>
              <Progress
                value={progressMetrics.overallProgress}
                className="mt-2"
                color="primary"
                size="sm"
              />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {progressMetrics.itemsCompleted}/{progressMetrics.itemsTotal}
              </div>
              <div className="text-sm text-gray-600">Items Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {progressMetrics.documentsUploaded}
              </div>
              <div className="text-sm text-gray-600">Documents Uploaded</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {progressMetrics.daysRemaining}
              </div>
              <div className="text-sm text-gray-600">Days Remaining</div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: <TrendingUp className="w-4 h-4" /> },
          { id: 'checklist', label: 'Checklist', icon: <CheckCircle className="w-4 h-4" /> },
          { id: 'documents', label: 'Documents', icon: <FileText className="w-4 h-4" /> },
          { id: 'messages', label: 'Messages', icon: <MessageSquare className="w-4 h-4" /> },
          { id: 'reports', label: 'Reports', icon: <FileText className="w-4 h-4" /> },
          { id: 'timeline', label: 'Timeline', icon: <Calendar className="w-4 h-4" /> },
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
                        deadline.isOverdue
                          ? 'border-red-200 bg-red-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{deadline.title}</h4>
                          <p className="text-sm text-gray-600">
                            Due: {new Date(deadline.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Chip
                          size="sm"
                          color={deadline.priority === 'high' ? 'danger' : 'warning'}
                          variant="flat"
                        >
                          {deadline.priority}
                        </Chip>
                      </div>
                    </div>
                  ))}
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
                        <div className="text-xs text-gray-600">{member.pendingTasks} pending</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        {activeTab === 'checklist' && (
          <DueDiligenceChecklist processId={processId} userRole={userRole} />
        )}

        {activeTab === 'documents' && (
          <DueDiligenceDocuments processId={processId} userRole={userRole} />
        )}

        {activeTab === 'messages' && (
          <DueDiligenceMessages processId={processId} userRole={userRole} />
        )}

        {activeTab === 'reports' && (
          <DueDiligenceReports processId={processId} userRole={userRole} />
        )}

        {activeTab === 'timeline' && (
          <DueDiligenceTimeline processId={processId} userRole={userRole} />
        )}
      </div>
    </div>
  );
};

export default DueDiligenceDashboard;
