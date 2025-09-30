/**
 * Offer Negotiation
 * Location: src/shared/components/offer-management/OfferNegotiation.tsx
 * Purpose: Handle offer negotiations and counter-offers
 */

import { Button } from '@/shared/components/buttons';
import { AnimatedTextarea, CustomNumberInputField } from '@/shared/components/forms';
import { CounterOfferRequest, Offer } from '@/shared/types/offer-management';
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/react';
import { ArrowRight, MessageSquare, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface OfferNegotiationProps {
  listingId?: string;
  userRole: 'buyer' | 'seller' | 'advisor';
  userId: string;
}

const OfferNegotiation: React.FC<OfferNegotiationProps> = ({ listingId, userRole, userId }) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [isCounterModalOpen, setIsCounterModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [counterOfferData, setCounterOfferData] = useState<Partial<CounterOfferRequest>>({
    reason: '',
  });

  useEffect(() => {
    loadOffers();
  }, [listingId, userId]);

  const loadOffers = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await offerService.getOffersForNegotiation(userId, listingId);
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
          negotiationHistory: [
            {
              id: 'hist-1',
              type: 'offer_submitted',
              timestamp: '2024-01-15T10:30:00Z',
              userId: 'buyer-1',
              userName: 'Jane Buyer',
              description: 'Initial offer submitted for €850,000',
            },
          ],
          comments: [
            {
              id: 'comment-1',
              authorId: 'seller-1',
              authorName: 'John Seller',
              content:
                'Thank you for your offer. We are reviewing the terms and will respond within the deadline.',
              timestamp: '2024-01-16T09:15:00Z',
              isPrivate: false,
            },
          ],
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

  const handleCounterOffer = async () => {
    if (!selectedOffer || !counterOfferData.reason) return;

    try {
      // TODO: Replace with actual API call
      // await offerService.createCounterOffer(selectedOffer.id, counterOfferData as CounterOfferRequest);

      // Mock counter offer creation
      const newCounterOffer: Offer = {
        ...selectedOffer,
        id: `counter-${Date.now()}`,
        parentOfferId: selectedOffer.id,
        type: 'counter',
        offerPrice: counterOfferData.offerPrice || selectedOffer.offerPrice,
        paymentStructure: counterOfferData.paymentStructure || selectedOffer.paymentStructure,
        conditions: counterOfferData.conditions || selectedOffer.conditions,
        contingencies: counterOfferData.contingencies || selectedOffer.contingencies,
        timeline: counterOfferData.timeline || selectedOffer.timeline,
        additionalTerms: counterOfferData.additionalTerms || selectedOffer.additionalTerms,
        specialRequests: counterOfferData.specialRequests || selectedOffer.specialRequests,
        submittedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        lastModifiedAt: new Date().toISOString(),
        createdBy: userId,
        version: selectedOffer.version + 1,
        status: 'submitted',
        negotiationHistory: [
          ...selectedOffer.negotiationHistory,
          {
            id: `hist-${Date.now()}`,
            type: 'counter_offer',
            timestamp: new Date().toISOString(),
            userId: userId,
            userName: userRole === 'buyer' ? 'Jane Buyer' : 'John Seller',
            description: `Counter-offer submitted for €${counterOfferData.offerPrice?.toLocaleString() || selectedOffer.offerPrice.toLocaleString()}`,
            changes: [
              {
                field: 'offerPrice',
                oldValue: selectedOffer.offerPrice,
                newValue: counterOfferData.offerPrice || selectedOffer.offerPrice,
                reason: counterOfferData.reason,
              },
            ],
          },
        ],
      };

      setOffers(prev => [newCounterOffer, ...prev]);
      setIsCounterModalOpen(false);
      setCounterOfferData({ reason: '' });
    } catch (error) {
      // TODO: Add proper error handling
    }
  };

  const handleAcceptOffer = async (offer: Offer) => {
    try {
      // TODO: Replace with actual API call
      // await offerService.acceptOffer(offer.id);

      // Mock acceptance
      setOffers(prev =>
        prev.map(o => (o.id === offer.id ? { ...o, status: 'accepted' as const } : o))
      );
    } catch (error) {
      // TODO: Add proper error handling
    }
  };

  const handleRejectOffer = async (offer: Offer) => {
    try {
      // TODO: Replace with actual API call
      // await offerService.rejectOffer(offer.id, 'Offer rejected');

      // Mock rejection
      setOffers(prev =>
        prev.map(o => (o.id === offer.id ? { ...o, status: 'rejected' as const } : o))
      );
    } catch (error) {
      // TODO: Add proper error handling
    }
  };

  const canNegotiate = (offer: Offer) => {
    return offer.status === 'under_review' || offer.status === 'countered';
  };

  const canRespond = (offer: Offer) => {
    return (
      (userRole === 'seller' && offer.buyerId !== userId) ||
      (userRole === 'buyer' && offer.sellerId !== userId)
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading negotiations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Active Negotiations ({offers.length})</h3>
          <p className="text-sm text-gray-600">Manage offer negotiations and counter-offers</p>
        </div>
      </div>

      {/* Offers List */}
      <div className="space-y-4">
        {offers.length === 0 ? (
          <Card>
            <CardBody>
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No active negotiations</h3>
                <p className="text-gray-600">Offers available for negotiation will appear here.</p>
              </div>
            </CardBody>
          </Card>
        ) : (
          offers.map(offer => (
            <Card key={offer.id} className="border border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {offer.type === 'counter' && <ArrowRight className="w-4 h-4 text-primary-600" />}
                      <MessageSquare className="w-5 h-5 text-primary-600" />
                    </div>
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
                        •{offer.parentOfferId ? 'Response to previous offer' : 'New negotiation'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Chip
                      color={offer.status === 'under_review' ? 'warning' : 'primary'}
                      variant="flat"
                    >
                      {offer.status.replace('_', ' ')}
                    </Chip>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {/* Negotiation History */}
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">Negotiation Timeline</h5>
                    <div className="space-y-3">
                      {offer.negotiationHistory.map((event, index) => (
                        <div key={event.id} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                            <MessageSquare className="w-4 h-4 text-primary-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{event.description}</p>
                            <p className="text-xs text-gray-600">
                              by {event.userName} • {new Date(event.timestamp).toLocaleString()}
                            </p>
                            {event.changes && event.changes.length > 0 && (
                              <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-600 mb-1">Changes made:</p>
                                {event.changes.map((change, changeIndex) => (
                                  <div key={changeIndex} className="text-xs text-gray-700">
                                    <span className="font-medium">{change.field}:</span>{' '}
                                    {String(change.oldValue)} → {String(change.newValue)}
                                    {change.reason && (
                                      <span className="text-gray-500"> ({change.reason})</span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Comments */}
                  {offer.comments.length > 0 && (
                    <div>
                      <h5 className="font-medium text-gray-900 mb-3">Comments</h5>
                      <div className="space-y-3">
                        {offer.comments.map(comment => (
                          <div
                            key={comment.id}
                            className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                              <MessageSquare className="w-4 h-4 text-gray-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-900">{comment.content}</p>
                              <p className="text-xs text-gray-600 mt-1">
                                by {comment.authorName} •{' '}
                                {new Date(comment.timestamp).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {canRespond(offer) && canNegotiate(offer) && (
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                      <Button
                        variant="primary"
                        onPress={() => {
                          setSelectedOffer(offer);
                          setIsCounterModalOpen(true);
                        }}
                        startContent={<ArrowRight className="w-4 h-4" />}
                      >
                        Make Counter Offer
                      </Button>
                      <Button variant="success" onPress={() => handleAcceptOffer(offer)}>
                        Accept Offer
                      </Button>
                      <Button variant="danger" onPress={() => handleRejectOffer(offer)}>
                        Reject Offer
                      </Button>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          ))
        )}
      </div>

      {/* Counter Offer Modal */}
      <Modal isOpen={isCounterModalOpen} onClose={() => setIsCounterModalOpen(false)} size="2xl">
        <ModalContent>
          <ModalHeader>
            <div className="flex items-center justify-between w-full">
              <h3 className="text-lg font-semibold">Make Counter Offer</h3>
              <Button variant="secondary" isIconOnly onPress={() => setIsCounterModalOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </ModalHeader>
          <ModalBody>
            {selectedOffer && (
              <div className="space-y-4">
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Current Offer</h4>
                  <p className="text-primary-800">
                    {selectedOffer.currency} {selectedOffer.offerPrice.toLocaleString()} •
                    {selectedOffer.paymentStructure.type.replace('_', ' ')} • Closing:{' '}
                    {new Date(selectedOffer.timeline.closingDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CustomNumberInputField
                    label="Counter Offer Price"
                    placeholder={selectedOffer.offerPrice.toString()}
                    value={
                      counterOfferData.offerPrice?.toString() || selectedOffer.offerPrice.toString()
                    }
                    onChange={e =>
                      setCounterOfferData(prev => ({
                        ...prev,
                        offerPrice: parseFloat(e.target.value) || selectedOffer.offerPrice,
                      }))
                    }
                    onBlur={() => {}}
                    name="counterPrice"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Structure
                    </label>
                    <select
                      value={
                        counterOfferData.paymentStructure?.type ||
                        selectedOffer.paymentStructure.type
                      }
                      onChange={e =>
                        setCounterOfferData(prev => ({
                          ...prev,
                          paymentStructure: {
                            ...(prev.paymentStructure || selectedOffer.paymentStructure),
                            type: e.target.value as any,
                          },
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="cash">All Cash</option>
                      <option value="financed">Financed</option>
                      <option value="mixed">Mixed (Cash + Financing)</option>
                      <option value="earnout">Earnout Structure</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Closing Date
                  </label>
                  <input
                    type="date"
                    value={
                      counterOfferData.timeline?.closingDate || selectedOffer.timeline.closingDate
                    }
                    onChange={e =>
                      setCounterOfferData(prev => ({
                        ...prev,
                        timeline: {
                          ...(prev.timeline || selectedOffer.timeline),
                          closingDate: e.target.value,
                        },
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <AnimatedTextarea
                  label="Reason for Counter Offer"
                  placeholder="Explain why you're making this counter offer and what changes you're proposing..."
                  value={counterOfferData.reason || ''}
                  onChange={e =>
                    setCounterOfferData(prev => ({
                      ...prev,
                      reason: e.target.value,
                    }))
                  }
                  onBlur={() => {}}
                  name="reason"
                  minRows={3}
                  required
                />
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onPress={() => setIsCounterModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onPress={handleCounterOffer}
              isDisabled={!counterOfferData.reason}
            >
              Submit Counter Offer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export { OfferNegotiation };
