/**
 * Offer Management Dashboard
 * Location: src/shared/components/offer-management/OfferManagementDashboard.tsx
 * Purpose: Main dashboard for managing offers and negotiations
 */

import { Button } from '@/shared/components/buttons';
import { OfferDashboard } from '@/shared/types/offer-management';
import { Card, CardBody, CardHeader, Chip } from '@heroui/react';
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  MessageSquare,
  Plus,
  TrendingUp,
  XCircle,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { OfferComparison } from './OfferComparison';
import { OfferCreationModal } from './OfferCreationModal';
import { OfferHistory } from './OfferHistory';
import { OfferNegotiation } from './OfferNegotiation';
import { OfferTracking } from './OfferTracking';

interface OfferManagementDashboardProps {
  listingId?: string;
  userRole: 'buyer' | 'seller' | 'advisor';
  userId: string;
}

const OfferManagementDashboard: React.FC<OfferManagementDashboardProps> = ({
  listingId,
  userRole,
  userId,
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboard, setDashboard] = useState<OfferDashboard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, [listingId, userId]);

  const loadDashboard = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await offerService.getDashboard(userId, listingId);
      // setDashboard(response.data);

      // Mock data for now
      const mockDashboard: OfferDashboard = {
        activeOffers: [
          {
            id: 'offer-1',
            listingId: listingId || 'listing-1',
            buyerId: 'buyer-1',
            sellerId: 'seller-1',
            status: 'under_review',
            type: 'initial',
            offerPrice: 850000,
            currency: 'EUR',
            paymentStructure: {
              type: 'mixed',
              cashAmount: 500000,
              financedAmount: 350000,
            },
            conditions: [],
            contingencies: [],
            timeline: {
              dueDiligencePeriod: 30,
              financingPeriod: 45,
              closingDate: '2024-03-15',
              responseDeadline: '2024-01-25',
            },
            additionalTerms: 'Requesting 30-day transition period',
            specialRequests: ['Inventory audit', 'Customer introductions'],
            submittedAt: '2024-01-15T10:30:00Z',
            expiresAt: '2024-01-25T23:59:59Z',
            lastModifiedAt: '2024-01-15T10:30:00Z',
            createdBy: 'buyer-1',
            version: 1,
            negotiationHistory: [],
            comments: [],
            attachments: [],
            approvals: [],
            requiresApproval: false,
          },
        ],
        pendingOffers: [],
        completedOffers: [],
        statistics: {
          totalOffers: 3,
          activeOffers: 1,
          acceptedOffers: 1,
          rejectedOffers: 1,
          averageOfferValue: 750000,
          averageNegotiationTime: 14,
          successRate: 50,
        },
        recentActivity: [
          {
            id: 'activity-1',
            type: 'offer_submitted',
            timestamp: '2024-01-15T10:30:00Z',
            userId: 'buyer-1',
            userName: 'Jane Buyer',
            description: 'New offer submitted for €850,000',
            metadata: { offerId: 'offer-1', amount: 850000 },
          },
          {
            id: 'activity-2',
            type: 'counter_offer',
            timestamp: '2024-01-10T14:15:00Z',
            userId: 'seller-1',
            userName: 'John Seller',
            description: 'Counter-offer submitted for €900,000',
            metadata: { offerId: 'offer-2', amount: 900000 },
          },
        ],
        upcomingDeadlines: [
          {
            id: 'deadline-1',
            offerId: 'offer-1',
            title: 'Response Deadline',
            deadline: '2024-01-25',
            type: 'response',
            priority: 'high',
            isOverdue: false,
          },
          {
            id: 'deadline-2',
            offerId: 'offer-1',
            title: 'Due Diligence Period',
            deadline: '2024-02-15',
            type: 'due_diligence',
            priority: 'medium',
            isOverdue: false,
          },
        ],
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
      case 'accepted':
        return 'success';
      case 'under_review':
        return 'warning';
      case 'rejected':
        return 'danger';
      case 'expired':
        return 'default';
      case 'withdrawn':
        return 'default';
      default:
        return 'primary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="w-4 h-4" />;
      case 'under_review':
        return <Clock className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'expired':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading offer dashboard...</p>
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
          There was an error loading the offer management dashboard.
        </p>
        <Button variant="primary" onPress={loadDashboard}>
          Try Again
        </Button>
      </div>
    );
  }

  const { statistics, upcomingDeadlines, recentActivity } = dashboard;

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
                <p className="text-gray-600">
                  {userRole === 'buyer'
                    ? 'Manage your business offers'
                    : userRole === 'seller'
                      ? 'Review incoming offers'
                      : 'Oversee offer negotiations'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Chip variant="flat" color="success">
                <TrendingUp className="w-3 h-3 mr-1" />
                {statistics.successRate}% Success Rate
              </Chip>
              <Button
                variant="primary"
                onPress={() => setIsCreateModalOpen(true)}
                startContent={<Plus className="w-4 h-4" />}
              >
                {userRole === 'buyer' ? 'Make Offer' : 'Create Template'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-1">
                {statistics.totalOffers}
              </div>
              <div className="text-sm text-gray-600">Total Offers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {statistics.activeOffers}
              </div>
              <div className="text-sm text-gray-600">Active Offers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-1">
                €{statistics.averageOfferValue.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Avg. Offer Value</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {statistics.averageNegotiationTime}
              </div>
              <div className="text-sm text-gray-600">Avg. Days to Close</div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: <TrendingUp className="w-4 h-4" /> },
          { id: 'tracking', label: 'Offer Tracking', icon: <Clock className="w-4 h-4" /> },
          { id: 'negotiation', label: 'Negotiation', icon: <MessageSquare className="w-4 h-4" /> },
          { id: 'comparison', label: 'Comparison', icon: <FileText className="w-4 h-4" /> },
          { id: 'history', label: 'History', icon: <Calendar className="w-4 h-4" /> },
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
                          : deadline.priority === 'high'
                            ? 'border-orange-200 bg-orange-50'
                            : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{deadline.title}</h4>
                          <p className="text-sm text-gray-600">
                            Due: {new Date(deadline.deadline).toLocaleDateString()}
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

        {activeTab === 'tracking' && (
          <OfferTracking listingId={listingId} userRole={userRole} userId={userId} />
        )}

        {activeTab === 'negotiation' && (
          <OfferNegotiation listingId={listingId} userRole={userRole} userId={userId} />
        )}

        {activeTab === 'comparison' && (
          <OfferComparison listingId={listingId} userRole={userRole} userId={userId} />
        )}

        {activeTab === 'history' && (
          <OfferHistory listingId={listingId} userRole={userRole} userId={userId} />
        )}
      </div>

      {/* Create Offer Modal */}
      <OfferCreationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        listingId={listingId}
        userRole={userRole}
        userId={userId}
        onOfferCreated={() => {
          setIsCreateModalOpen(false);
          loadDashboard();
        }}
      />
    </div>
  );
};

export default OfferManagementDashboard;
