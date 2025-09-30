/**
 * Offer History
 * Location: src/shared/components/offer-management/OfferHistory.tsx
 * Purpose: View historical offers and completed transactions
 */

import { Button } from '@/shared/components/buttons';
import { Offer } from '@/shared/types/offer-management';
import { Card, CardBody, CardHeader, Chip } from '@heroui/react';
import { Calendar, CheckCircle, Clock, DollarSign, FileText, Search, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface OfferHistoryProps {
  listingId?: string;
  userRole: 'buyer' | 'seller' | 'advisor';
  userId: string;
}

const OfferHistory: React.FC<OfferHistoryProps> = ({ listingId, userRole, userId }) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');

  useEffect(() => {
    loadOfferHistory();
  }, [listingId, userId]);

  const loadOfferHistory = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await offerService.getOfferHistory(userId, listingId);
      // setOffers(response.data);

      // Mock data for now
      const mockOffers: Offer[] = [
        {
          id: 'offer-hist-1',
          listingId: listingId || 'listing-1',
          buyerId: 'buyer-1',
          sellerId: 'seller-1',
          status: 'accepted',
          type: 'final',
          offerPrice: 875000,
          currency: 'EUR',
          paymentStructure: {
            type: 'mixed',
            cashAmount: 600000,
            financedAmount: 275000,
          },
          conditions: [],
          contingencies: [],
          timeline: {
            dueDiligencePeriod: 30,
            financingPeriod: 45,
            closingDate: '2024-01-15',
            responseDeadline: '2023-12-20',
          },
          additionalTerms: 'Successfully closed transaction',
          specialRequests: [],
          submittedAt: '2023-11-15T10:30:00Z',
          expiresAt: '2023-12-20T23:59:59Z',
          lastModifiedAt: '2024-01-15T14:30:00Z',
          createdBy: 'buyer-1',
          version: 3,
          negotiationHistory: [
            {
              id: 'hist-1',
              type: 'offer_submitted',
              timestamp: '2023-11-15T10:30:00Z',
              userId: 'buyer-1',
              userName: 'Jane Buyer',
              description: 'Initial offer submitted for €800,000',
            },
            {
              id: 'hist-2',
              type: 'counter_offer',
              timestamp: '2023-11-20T14:15:00Z',
              userId: 'seller-1',
              userName: 'John Seller',
              description: 'Counter-offer submitted for €900,000',
            },
            {
              id: 'hist-3',
              type: 'acceptance',
              timestamp: '2023-12-15T16:45:00Z',
              userId: 'buyer-1',
              userName: 'Jane Buyer',
              description: 'Final offer accepted at €875,000',
            },
          ],
          comments: [],
          attachments: [],
          approvals: [],
          requiresApproval: false,
        },
        {
          id: 'offer-hist-2',
          listingId: listingId || 'listing-2',
          buyerId: 'buyer-1',
          sellerId: 'seller-2',
          status: 'rejected',
          type: 'initial',
          offerPrice: 650000,
          currency: 'EUR',
          paymentStructure: {
            type: 'cash',
            cashAmount: 650000,
          },
          conditions: [],
          contingencies: [],
          timeline: {
            dueDiligencePeriod: 30,
            financingPeriod: 45,
            closingDate: '2023-10-15',
            responseDeadline: '2023-09-20',
          },
          additionalTerms: 'Offer was below seller expectations',
          specialRequests: [],
          submittedAt: '2023-09-10T09:15:00Z',
          expiresAt: '2023-09-20T23:59:59Z',
          lastModifiedAt: '2023-09-18T11:30:00Z',
          createdBy: 'buyer-1',
          version: 1,
          negotiationHistory: [
            {
              id: 'hist-4',
              type: 'offer_submitted',
              timestamp: '2023-09-10T09:15:00Z',
              userId: 'buyer-1',
              userName: 'Jane Buyer',
              description: 'Initial offer submitted for €650,000',
            },
            {
              id: 'hist-5',
              type: 'rejection',
              timestamp: '2023-09-18T11:30:00Z',
              userId: 'seller-2',
              userName: 'Mike Seller',
              description: 'Offer rejected - below asking price',
            },
          ],
          comments: [],
          attachments: [],
          approvals: [],
          requiresApproval: false,
        },
        {
          id: 'offer-hist-3',
          listingId: listingId || 'listing-3',
          buyerId: 'buyer-2',
          sellerId: 'seller-1',
          status: 'expired',
          type: 'initial',
          offerPrice: 750000,
          currency: 'EUR',
          paymentStructure: {
            type: 'financed',
            financedAmount: 750000,
          },
          conditions: [],
          contingencies: [],
          timeline: {
            dueDiligencePeriod: 30,
            financingPeriod: 45,
            closingDate: '2023-08-15',
            responseDeadline: '2023-07-20',
          },
          additionalTerms: 'Offer expired without response',
          specialRequests: [],
          submittedAt: '2023-07-10T14:20:00Z',
          expiresAt: '2023-07-20T23:59:59Z',
          lastModifiedAt: '2023-07-20T23:59:59Z',
          createdBy: 'buyer-2',
          version: 1,
          negotiationHistory: [
            {
              id: 'hist-6',
              type: 'offer_submitted',
              timestamp: '2023-07-10T14:20:00Z',
              userId: 'buyer-2',
              userName: 'Bob Buyer',
              description: 'Initial offer submitted for €750,000',
            },
            {
              id: 'hist-7',
              type: 'expiration',
              timestamp: '2023-07-20T23:59:59Z',
              userId: 'system',
              userName: 'System',
              description: 'Offer expired without response',
            },
          ],
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
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'expired':
        return <Clock className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const formatPaymentStructure = (paymentStructure: any) => {
    switch (paymentStructure.type) {
      case 'cash':
        return `All Cash (€${paymentStructure.cashAmount?.toLocaleString()})`;
      case 'mixed':
        return `Mixed (Cash: €${paymentStructure.cashAmount?.toLocaleString()}, Financed: €${paymentStructure.financedAmount?.toLocaleString()})`;
      case 'financed':
        return `Financed (€${paymentStructure.financedAmount?.toLocaleString()})`;
      case 'earnout':
        return `Earnout (€${paymentStructure.earnoutDetails?.totalAmount?.toLocaleString()} over ${paymentStructure.earnoutDetails?.duration} months)`;
      default:
        return paymentStructure.type;
    }
  };

  const filteredOffers = offers.filter(offer => {
    const matchesSearch =
      offer.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.additionalTerms?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || offer.status === statusFilter;

    let matchesDate = true;
    if (dateFilter !== 'all') {
      const offerDate = new Date(offer.submittedAt);
      const now = new Date();
      const daysDiff = Math.floor((now.getTime() - offerDate.getTime()) / (1000 * 60 * 60 * 24));

      switch (dateFilter) {
        case 'last-30-days':
          matchesDate = daysDiff <= 30;
          break;
        case 'last-90-days':
          matchesDate = daysDiff <= 90;
          break;
        case 'last-year':
          matchesDate = daysDiff <= 365;
          break;
      }
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading offer history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Offer History ({filteredOffers.length})</h3>
          <p className="text-sm text-gray-600">View all your past offers and transactions</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardBody>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search offers..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="md:w-48">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
                <option value="expired">Expired</option>
                <option value="withdrawn">Withdrawn</option>
              </select>
            </div>
            <div className="md:w-48">
              <select
                value={dateFilter}
                onChange={e => setDateFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="last-30-days">Last 30 Days</option>
                <option value="last-90-days">Last 90 Days</option>
                <option value="last-year">Last Year</option>
              </select>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Offers List */}
      <div className="space-y-4">
        {filteredOffers.length === 0 ? (
          <Card>
            <CardBody>
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No offers found</h3>
                <p className="text-gray-600">
                  {searchQuery || statusFilter !== 'all' || dateFilter !== 'all'
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Your offer history will appear here once you start making offers.'}
                </p>
              </div>
            </CardBody>
          </Card>
        ) : (
          filteredOffers.map(offer => (
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
                      {offer.status}
                    </Chip>
                    <Button
                      size="sm"
                      variant="secondary"
                      startContent={<FileText className="w-4 h-4" />}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {/* Key Information */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-1">Payment Structure</h5>
                      <p className="text-sm text-gray-600">
                        {formatPaymentStructure(offer.paymentStructure)}
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-1">Closing Date</h5>
                      <p className="text-sm text-gray-600">
                        {new Date(offer.timeline.closingDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-1">Final Status</h5>
                      <p className="text-sm text-gray-600">
                        {offer.status === 'accepted'
                          ? 'Successfully closed'
                          : offer.status === 'rejected'
                            ? 'Offer was rejected'
                            : offer.status === 'expired'
                              ? 'Offer expired'
                              : 'Offer was withdrawn'}
                      </p>
                    </div>
                  </div>

                  {/* Negotiation Summary */}
                  {offer.negotiationHistory.length > 0 && (
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Negotiation Summary</h5>
                      <div className="space-y-2">
                        {offer.negotiationHistory.slice(0, 3).map(event => (
                          <div
                            key={event.id}
                            className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                          >
                            <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                              <Calendar className="w-3 h-3 text-primary-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-900">{event.description}</p>
                              <p className="text-xs text-gray-600">
                                {new Date(event.timestamp).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                        {offer.negotiationHistory.length > 3 && (
                          <p className="text-xs text-gray-500 text-center">
                            +{offer.negotiationHistory.length - 3} more events
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Additional Terms */}
                  {offer.additionalTerms && (
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Notes</h5>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                        {offer.additionalTerms}
                      </p>
                    </div>
                  )}

                  {/* Outcome Summary */}
                  <div
                    className={`p-3 rounded-lg ${
                      offer.status === 'accepted'
                        ? 'bg-green-50 border border-green-200'
                        : offer.status === 'rejected'
                          ? 'bg-red-50 border border-red-200'
                          : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {offer.status === 'accepted' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : offer.status === 'rejected' ? (
                        <XCircle className="w-4 h-4 text-red-600" />
                      ) : (
                        <Clock className="w-4 h-4 text-gray-600" />
                      )}
                      <h6
                        className={`font-medium ${
                          offer.status === 'accepted'
                            ? 'text-green-900'
                            : offer.status === 'rejected'
                              ? 'text-red-900'
                              : 'text-gray-900'
                        }`}
                      >
                        {offer.status === 'accepted'
                          ? 'Transaction Completed'
                          : offer.status === 'rejected'
                            ? 'Offer Rejected'
                            : offer.status === 'expired'
                              ? 'Offer Expired'
                              : 'Offer Withdrawn'}
                      </h6>
                    </div>
                    <p
                      className={`text-sm ${
                        offer.status === 'accepted'
                          ? 'text-green-800'
                          : offer.status === 'rejected'
                            ? 'text-red-800'
                            : 'text-gray-700'
                      }`}
                    >
                      {offer.status === 'accepted'
                        ? `Successfully closed on ${new Date(offer.lastModifiedAt).toLocaleDateString()} for ${offer.currency} ${offer.offerPrice.toLocaleString()}`
                        : offer.status === 'rejected'
                          ? `Offer was rejected on ${new Date(offer.lastModifiedAt).toLocaleDateString()}`
                          : offer.status === 'expired'
                            ? `Offer expired on ${new Date(offer.expiresAt).toLocaleDateString()}`
                            : `Offer was withdrawn on ${new Date(offer.lastModifiedAt).toLocaleDateString()}`}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export { OfferHistory };
