/**
 * Offer Tracking
 * Location: src/shared/components/offer-management/OfferTracking.tsx
 * Purpose: Track and monitor offer status and progress
 */

import { Button } from '@/shared/components/buttons';
import { Offer } from '@/shared/types/offer-management';
import { Card, CardBody, CardHeader, Chip, Progress } from '@heroui/react';
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  FileText,
  MessageSquare,
  X,
  XCircle,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface OfferTrackingProps {
  listingId?: string;
  userRole: 'buyer' | 'seller' | 'advisor';
  userId: string;
}

const OfferTracking: React.FC<OfferTrackingProps> = ({ listingId, userRole, userId }) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  useEffect(() => {
    loadOffers();
  }, [listingId, userId]);

  const loadOffers = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await offerService.getOffers(userId, listingId);
      // setOffers(response.data);

      // Mock data for now
      const mockOffers: Offer[] = [
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
          conditions: [
            {
              id: 'cond-1',
              type: 'due_diligence',
              description: 'Satisfactory completion of due diligence',
              isRequired: true,
              status: 'pending',
            },
            {
              id: 'cond-2',
              type: 'financing',
              description: 'Obtain financing approval',
              isRequired: true,
              status: 'pending',
            },
          ],
          contingencies: [
            {
              id: 'cont-1',
              type: 'inspection',
              description: 'Property inspection',
              deadline: '2024-02-15',
              responsibleParty: 'buyer',
              status: 'pending',
            },
          ],
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
          negotiationHistory: [
            {
              id: 'hist-1',
              type: 'offer_submitted',
              timestamp: '2024-01-15T10:30:00Z',
              userId: 'buyer-1',
              userName: 'Jane Buyer',
              description: 'Initial offer submitted',
            },
          ],
          comments: [],
          attachments: [],
          approvals: [],
          requiresApproval: false,
        },
        {
          id: 'offer-2',
          listingId: listingId || 'listing-1',
          buyerId: 'buyer-2',
          sellerId: 'seller-1',
          status: 'countered',
          type: 'counter',
          parentOfferId: 'offer-1',
          offerPrice: 900000,
          currency: 'EUR',
          paymentStructure: {
            type: 'cash',
            cashAmount: 900000,
          },
          conditions: [],
          contingencies: [],
          timeline: {
            dueDiligencePeriod: 30,
            financingPeriod: 45,
            closingDate: '2024-03-20',
            responseDeadline: '2024-01-30',
          },
          additionalTerms: '',
          specialRequests: [],
          submittedAt: '2024-01-20T14:15:00Z',
          expiresAt: '2024-01-30T23:59:59Z',
          lastModifiedAt: '2024-01-20T14:15:00Z',
          createdBy: 'seller-1',
          version: 1,
          negotiationHistory: [],
          comments: [],
          attachments: [],
          approvals: [],
          requiresApproval: false,
        },
      ];

      setOffers(mockOffers);
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
      case 'countered':
        return 'primary';
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
      case 'countered':
        return <MessageSquare className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'expired':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getProgressPercentage = (offer: Offer) => {
    const now = new Date();
    const submitted = new Date(offer.submittedAt);
    const expires = new Date(offer.expiresAt);
    const total = expires.getTime() - submitted.getTime();
    const elapsed = now.getTime() - submitted.getTime();
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  };

  const isOverdue = (deadline: string) => {
    return new Date(deadline) < new Date();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading offers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Active Offers ({offers.length})</h3>
          <p className="text-sm text-gray-600">Track the status of your offers</p>
        </div>
      </div>

      {/* Offers List */}
      <div className="space-y-4">
        {offers.length === 0 ? (
          <Card>
            <CardBody>
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No offers yet</h3>
                <p className="text-gray-600">Create your first offer to get started.</p>
              </div>
            </CardBody>
          </Card>
        ) : (
          offers.map(offer => (
            <Card key={offer.id} className="border border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        {offer.currency} {offer.offerPrice.toLocaleString()}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {offer.type === 'initial'
                          ? 'Initial Offer'
                          : offer.type === 'counter'
                            ? 'Counter Offer'
                            : 'Final Offer'}{' '}
                        • Submitted {new Date(offer.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Chip
                      color={getStatusColor(offer.status)}
                      variant="flat"
                      startContent={getStatusIcon(offer.status)}
                    >
                      {offer.status.replace('_', ' ')}
                    </Chip>
                    <Button
                      size="sm"
                      variant="secondary"
                      onPress={() => setSelectedOffer(offer)}
                      startContent={<Eye className="w-4 h-4" />}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Time Remaining</span>
                      <span>
                        {isOverdue(offer.expiresAt)
                          ? 'Overdue'
                          : `${Math.ceil((new Date(offer.expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left`}
                      </span>
                    </div>
                    <Progress
                      value={getProgressPercentage(offer)}
                      color={isOverdue(offer.expiresAt) ? 'danger' : 'primary'}
                      className="mb-2"
                    />
                  </div>

                  {/* Key Information */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-1">Payment Structure</h5>
                      <p className="text-sm text-gray-600 capitalize">
                        {offer.paymentStructure.type.replace('_', ' ')}
                      </p>
                      {offer.paymentStructure.type === 'mixed' && (
                        <p className="text-xs text-gray-500">
                          Cash: {offer.currency}{' '}
                          {offer.paymentStructure.cashAmount?.toLocaleString()} • Financed:{' '}
                          {offer.currency} {offer.paymentStructure.financedAmount?.toLocaleString()}
                        </p>
                      )}
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-1">Closing Date</h5>
                      <p className="text-sm text-gray-600">
                        {new Date(offer.timeline.closingDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-1">Response Deadline</h5>
                      <p
                        className={`text-sm ${isOverdue(offer.timeline.responseDeadline) ? 'text-red-600' : 'text-gray-600'}`}
                      >
                        {new Date(offer.timeline.responseDeadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Conditions Status */}
                  {offer.conditions.length > 0 && (
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Conditions</h5>
                      <div className="space-y-2">
                        {offer.conditions.map(condition => (
                          <div key={condition.id} className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                condition.status === 'satisfied'
                                  ? 'bg-green-500'
                                  : condition.status === 'failed'
                                    ? 'bg-red-500'
                                    : 'bg-yellow-500'
                              }`}
                            />
                            <span className="text-sm text-gray-700">{condition.description}</span>
                            <Chip
                              size="sm"
                              color={
                                condition.status === 'satisfied'
                                  ? 'success'
                                  : condition.status === 'failed'
                                    ? 'danger'
                                    : 'warning'
                              }
                              variant="flat"
                            >
                              {condition.status}
                            </Chip>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contingencies Status */}
                  {offer.contingencies.length > 0 && (
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Contingencies</h5>
                      <div className="space-y-2">
                        {offer.contingencies.map(contingency => (
                          <div key={contingency.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  contingency.status === 'satisfied'
                                    ? 'bg-green-500'
                                    : contingency.status === 'failed'
                                      ? 'bg-red-500'
                                      : 'bg-yellow-500'
                                }`}
                              />
                              <span className="text-sm text-gray-700">
                                {contingency.description}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">
                                Due: {new Date(contingency.deadline).toLocaleDateString()}
                              </span>
                              <Chip
                                size="sm"
                                color={
                                  contingency.status === 'satisfied'
                                    ? 'success'
                                    : contingency.status === 'failed'
                                      ? 'danger'
                                      : 'warning'
                                }
                                variant="flat"
                              >
                                {contingency.status}
                              </Chip>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Special Requests */}
                  {offer.specialRequests.length > 0 && (
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Special Requests</h5>
                      <div className="flex flex-wrap gap-2">
                        {offer.specialRequests.map((request, index) => (
                          <Chip key={index} size="sm" variant="flat" color="default">
                            {request}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Additional Terms */}
                  {offer.additionalTerms && (
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Additional Terms</h5>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                        {offer.additionalTerms}
                      </p>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          ))
        )}
      </div>

      {/* Offer Details Modal */}
      {selectedOffer && (
        <Card className="fixed inset-4 z-50 bg-white shadow-2xl overflow-y-auto">
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <h3 className="text-lg font-semibold">Offer Details</h3>
              <Button variant="secondary" isIconOnly onPress={() => setSelectedOffer(null)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-6">
              {/* Offer Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Financial Terms</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Offer Price:</span>
                      <span className="font-medium">
                        {selectedOffer.currency} {selectedOffer.offerPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Type:</span>
                      <span className="font-medium capitalize">
                        {selectedOffer.paymentStructure.type.replace('_', ' ')}
                      </span>
                    </div>
                    {selectedOffer.paymentStructure.cashAmount && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cash Amount:</span>
                        <span className="font-medium">
                          {selectedOffer.currency}{' '}
                          {selectedOffer.paymentStructure.cashAmount.toLocaleString()}
                        </span>
                      </div>
                    )}
                    {selectedOffer.paymentStructure.financedAmount && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Financed Amount:</span>
                        <span className="font-medium">
                          {selectedOffer.currency}{' '}
                          {selectedOffer.paymentStructure.financedAmount.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Timeline</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Closing Date:</span>
                      <span className="font-medium">
                        {new Date(selectedOffer.timeline.closingDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Response Deadline:</span>
                      <span className="font-medium">
                        {new Date(selectedOffer.timeline.responseDeadline).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Due Diligence:</span>
                      <span className="font-medium">
                        {selectedOffer.timeline.dueDiligencePeriod} days
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Financing:</span>
                      <span className="font-medium">
                        {selectedOffer.timeline.financingPeriod} days
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Negotiation History */}
              {selectedOffer.negotiationHistory.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Negotiation History</h4>
                  <div className="space-y-3">
                    {selectedOffer.negotiationHistory.map(event => (
                      <div
                        key={event.id}
                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <MessageSquare className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{event.description}</p>
                          <p className="text-xs text-gray-600">
                            by {event.userName} • {new Date(event.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export { OfferTracking };
