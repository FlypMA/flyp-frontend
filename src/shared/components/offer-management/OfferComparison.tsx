/**
 * Offer Comparison
 * Location: src/shared/components/offer-management/OfferComparison.tsx
 * Purpose: Compare multiple offers side by side
 */

import { OfferComparison as OfferComparisonType } from '@/shared/types/offer-management';
import { Card, CardBody, CardHeader, Chip } from '@heroui/react';
import { BarChart3, CheckCircle, FileText, TrendingUp, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface OfferComparisonProps {
  listingId?: string;
  userRole: 'buyer' | 'seller' | 'advisor';
  userId: string;
}

const OfferComparison: React.FC<OfferComparisonProps> = ({ listingId, userRole, userId }) => {
  const [comparison, setComparison] = useState<OfferComparisonType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOffers, setSelectedOffers] = useState<string[]>([]);

  useEffect(() => {
    loadComparison();
  }, [listingId, userId]);

  const loadComparison = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await offerService.getOfferComparison(userId, listingId);
      // setComparison(response.data);

      // Mock data for now
      const mockComparison: OfferComparisonType = {
        offers: [
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
            ],
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
          {
            id: 'offer-2',
            listingId: listingId || 'listing-1',
            buyerId: 'buyer-2',
            sellerId: 'seller-1',
            status: 'under_review',
            type: 'initial',
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
            submittedAt: '2024-01-18T14:15:00Z',
            expiresAt: '2024-01-30T23:59:59Z',
            lastModifiedAt: '2024-01-18T14:15:00Z',
            createdBy: 'buyer-2',
            version: 1,
            negotiationHistory: [],
            comments: [],
            attachments: [],
            approvals: [],
            requiresApproval: false,
          },
          {
            id: 'offer-3',
            listingId: listingId || 'listing-1',
            buyerId: 'buyer-3',
            sellerId: 'seller-1',
            status: 'under_review',
            type: 'initial',
            offerPrice: 800000,
            currency: 'EUR',
            paymentStructure: {
              type: 'earnout',
              earnoutDetails: {
                totalAmount: 200000,
                duration: 24,
                milestones: [
                  {
                    id: 'milestone-1',
                    description: 'Revenue target Year 1',
                    targetValue: 100000,
                    targetDate: '2025-01-01',
                    percentage: 50,
                  },
                  {
                    id: 'milestone-2',
                    description: 'Revenue target Year 2',
                    targetValue: 100000,
                    targetDate: '2026-01-01',
                    percentage: 50,
                  },
                ],
                performanceMetrics: ['Revenue growth', 'Customer retention'],
              },
            },
            conditions: [],
            contingencies: [],
            timeline: {
              dueDiligencePeriod: 30,
              financingPeriod: 45,
              closingDate: '2024-03-25',
              responseDeadline: '2024-02-05',
            },
            additionalTerms: 'Earnout structure with performance milestones',
            specialRequests: ['Management retention', 'Performance tracking'],
            submittedAt: '2024-01-20T09:45:00Z',
            expiresAt: '2024-02-05T23:59:59Z',
            lastModifiedAt: '2024-01-20T09:45:00Z',
            createdBy: 'buyer-3',
            version: 1,
            negotiationHistory: [],
            comments: [],
            attachments: [],
            approvals: [],
            requiresApproval: false,
          },
        ],
        comparisonFields: [
          'offerPrice',
          'paymentStructure',
          'closingDate',
          'conditions',
          'contingencies',
          'additionalTerms',
        ],
        summary: {
          highestOffer: 900000,
          lowestOffer: 800000,
          averageOffer: 850000,
          mostFavorableTerms: 'All cash offer with fastest closing',
        },
      };

      setComparison(mockComparison);
      setSelectedOffers(mockComparison.offers.map(offer => offer.id));
    } catch (error) {
      // TODO: Add proper error handling
    } finally {
      setIsLoading(false);
    }
  };

  const toggleOfferSelection = (offerId: string) => {
    setSelectedOffers(prev =>
      prev.includes(offerId) ? prev.filter(id => id !== offerId) : [...prev, offerId]
    );
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
      default:
        return 'primary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="w-4 h-4" />;
      case 'under_review':
        return <FileText className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const formatPaymentStructure = (paymentStructure: any) => {
    switch (paymentStructure.type) {
      case 'cash':
        return `All Cash (${paymentStructure.cashAmount?.toLocaleString()})`;
      case 'mixed':
        return `Mixed (Cash: ${paymentStructure.cashAmount?.toLocaleString()}, Financed: ${paymentStructure.financedAmount?.toLocaleString()})`;
      case 'financed':
        return `Financed (${paymentStructure.financedAmount?.toLocaleString()})`;
      case 'earnout':
        return `Earnout (${paymentStructure.earnoutDetails?.totalAmount?.toLocaleString()} over ${paymentStructure.earnoutDetails?.duration} months)`;
      default:
        return paymentStructure.type;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading offer comparison...</p>
        </div>
      </div>
    );
  }

  if (!comparison || comparison.offers.length === 0) {
    return (
      <Card>
        <CardBody>
          <div className="text-center py-8">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No offers to compare</h3>
            <p className="text-gray-600">Multiple offers are needed to enable comparison.</p>
          </div>
        </CardBody>
      </Card>
    );
  }

  const filteredOffers = comparison.offers.filter(offer => selectedOffers.includes(offer.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Offer Comparison</h3>
          <p className="text-sm text-gray-600">Compare offers side by side</p>
        </div>
        <div className="flex items-center gap-2">
          <Chip color="primary" variant="flat">
            {filteredOffers.length} Offers Selected
          </Chip>
        </div>
      </div>

      {/* Summary Statistics */}
      <Card>
        <CardHeader>
          <h4 className="text-md font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Comparison Summary
          </h4>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                €{comparison.summary.highestOffer.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Highest Offer</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 mb-1">
                €{comparison.summary.lowestOffer.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Lowest Offer</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 mb-1">
                €{comparison.summary.averageOffer.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Average Offer</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-purple-600 mb-1">
                €
                {(
                  comparison.summary.highestOffer - comparison.summary.lowestOffer
                ).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Price Range</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-primary-50 border border-primary-200 rounded-lg">
            <p className="text-sm text-primary-800">
              <strong>Most Favorable Terms:</strong> {comparison.summary.mostFavorableTerms}
            </p>
          </div>
        </CardBody>
      </Card>

      {/* Offer Selection */}
      <Card>
        <CardHeader>
          <h4 className="text-md font-semibold">Select Offers to Compare</h4>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {comparison.offers.map(offer => (
              <div
                key={offer.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedOffers.includes(offer.id)
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => toggleOfferSelection(offer.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedOffers.includes(offer.id)}
                      onChange={() => toggleOfferSelection(offer.id)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="font-medium text-gray-900">
                      €{offer.offerPrice.toLocaleString()}
                    </span>
                  </div>
                  <Chip
                    size="sm"
                    color={getStatusColor(offer.status)}
                    variant="flat"
                    startContent={getStatusIcon(offer.status)}
                  >
                    {offer.status.replace('_', ' ')}
                  </Chip>
                </div>
                <p className="text-sm text-gray-600">
                  {formatPaymentStructure(offer.paymentStructure)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Closing: {new Date(offer.timeline.closingDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Comparison Table */}
      {filteredOffers.length > 0 && (
        <Card>
          <CardHeader>
            <h4 className="text-md font-semibold">Detailed Comparison</h4>
          </CardHeader>
          <CardBody>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Criteria</th>
                    {filteredOffers.map(offer => (
                      <th
                        key={offer.id}
                        className="text-center py-3 px-4 font-medium text-gray-900"
                      >
                        <div className="flex flex-col items-center">
                          <span className="font-bold">€{offer.offerPrice.toLocaleString()}</span>
                          <span className="text-xs text-gray-600">
                            Offer #{offer.id.split('-')[1]}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">Offer Price</td>
                    {filteredOffers.map(offer => (
                      <td key={offer.id} className="py-3 px-4 text-center">
                        <span className="font-semibold">€{offer.offerPrice.toLocaleString()}</span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">Payment Structure</td>
                    {filteredOffers.map(offer => (
                      <td key={offer.id} className="py-3 px-4 text-center">
                        <span className="text-sm">
                          {formatPaymentStructure(offer.paymentStructure)}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">Closing Date</td>
                    {filteredOffers.map(offer => (
                      <td key={offer.id} className="py-3 px-4 text-center">
                        <span className="text-sm">
                          {new Date(offer.timeline.closingDate).toLocaleDateString()}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">Due Diligence Period</td>
                    {filteredOffers.map(offer => (
                      <td key={offer.id} className="py-3 px-4 text-center">
                        <span className="text-sm">{offer.timeline.dueDiligencePeriod} days</span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">Conditions</td>
                    {filteredOffers.map(offer => (
                      <td key={offer.id} className="py-3 px-4 text-center">
                        <span className="text-sm">{offer.conditions.length} conditions</span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">Contingencies</td>
                    {filteredOffers.map(offer => (
                      <td key={offer.id} className="py-3 px-4 text-center">
                        <span className="text-sm">{offer.contingencies.length} contingencies</span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">Special Requests</td>
                    {filteredOffers.map(offer => (
                      <td key={offer.id} className="py-3 px-4 text-center">
                        <span className="text-sm">{offer.specialRequests.length} requests</span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">Response Deadline</td>
                    {filteredOffers.map(offer => (
                      <td key={offer.id} className="py-3 px-4 text-center">
                        <span className="text-sm">
                          {new Date(offer.timeline.responseDeadline).toLocaleDateString()}
                        </span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Recommendations */}
      {filteredOffers.length > 1 && (
        <Card>
          <CardHeader>
            <h4 className="text-md font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Recommendations
            </h4>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h5 className="font-medium text-green-900 mb-2">💰 Best Financial Terms</h5>
                <p className="text-sm text-green-800">
                  Offer #
                  {
                    filteredOffers
                      .find(o => o.offerPrice === comparison.summary.highestOffer)
                      ?.id.split('-')[1]
                  }
                  provides the highest offer price at €
                  {comparison.summary.highestOffer.toLocaleString()}.
                </p>
              </div>

              <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">⚡ Fastest Closing</h5>
                <p className="text-sm text-primary-800">
                  {(() => {
                    const fastestOffer = filteredOffers.reduce((fastest, current) =>
                      new Date(current.timeline.closingDate) <
                      new Date(fastest.timeline.closingDate)
                        ? current
                        : fastest
                    );
                    return `Offer #${fastestOffer.id.split('-')[1]} has the earliest closing date of ${new Date(fastestOffer.timeline.closingDate).toLocaleDateString()}.`;
                  })()}
                </p>
              </div>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h5 className="font-medium text-purple-900 mb-2">🎯 Most Flexible Terms</h5>
                <p className="text-sm text-purple-800">
                  Consider the earnout structure offer which provides performance-based payments and
                  may offer better long-term value alignment.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export { OfferComparison };
