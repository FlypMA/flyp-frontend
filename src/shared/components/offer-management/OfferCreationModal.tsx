/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Offer Creation Modal
 * Location: src/shared/components/offer-management/OfferCreationModal.tsx
 * Purpose: Modal for creating and submitting offers
 */

import { Button } from '@/shared/components/buttons';
import {
  AnimatedTextarea,
  CustomCheckbox,
  CustomNumberInputField,
} from '@/shared/components/forms';
import { CreateOfferRequest } from '@/shared/types/offer-management';
import {
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Progress,
} from '@heroui/react';
import { Calendar, DollarSign, FileText, Plus, X } from 'lucide-react';
import React, { useState } from 'react';

interface OfferCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  listingId?: string;
  userRole: 'buyer' | 'seller' | 'advisor';
  userId: string;
  onOfferCreated: () => void;
}

const OfferCreationModal: React.FC<OfferCreationModalProps> = ({
  isOpen,
  onClose,
  listingId,
  userRole,
  userId,
  onOfferCreated,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [offerData, setOfferData] = useState<Partial<CreateOfferRequest>>({
    listingId: listingId || '',
    offerPrice: 0,
    currency: 'EUR',
    paymentStructure: {
      type: 'cash',
      cashAmount: 0,
    },
    conditions: [],
    contingencies: [],
    timeline: {
      dueDiligencePeriod: 30,
      financingPeriod: 45,
      closingDate: '',
      responseDeadline: '',
    },
    additionalTerms: '',
    specialRequests: [],
  });

  const totalSteps = 4;

  const handleInputChange = (field: string, value: any) => {
    setOfferData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePaymentStructureChange = (field: string, value: any) => {
    setOfferData(prev => ({
      ...prev,
      paymentStructure: {
        ...prev.paymentStructure!,
        [field]: value,
      },
    }));
  };

  const handleTimelineChange = (field: string, value: any) => {
    setOfferData(prev => ({
      ...prev,
      timeline: {
        ...prev.timeline!,
        [field]: value,
      },
    }));
  };

  const addCondition = () => {
    const newCondition = {
      type: 'custom' as const,
      description: '',
      isRequired: true,
    };
    setOfferData(prev => ({
      ...prev,
      conditions: [...(prev.conditions || []), newCondition],
    }));
  };

  const updateCondition = (index: number, field: string, value: any) => {
    setOfferData(prev => ({
      ...prev,
      conditions: prev.conditions?.map((condition, i) =>
        i === index ? { ...condition, [field]: value } : condition
      ),
    }));
  };

  const removeCondition = (index: number) => {
    setOfferData(prev => ({
      ...prev,
      conditions: prev.conditions?.filter((_, i) => i !== index),
    }));
  };

  const addSpecialRequest = () => {
    setOfferData(prev => ({
      ...prev,
      specialRequests: [...(prev.specialRequests || []), ''],
    }));
  };

  const updateSpecialRequest = (index: number, value: string) => {
    setOfferData(prev => ({
      ...prev,
      specialRequests: prev.specialRequests?.map((request, i) => (i === index ? value : request)),
    }));
  };

  const removeSpecialRequest = (index: number) => {
    setOfferData(prev => ({
      ...prev,
      specialRequests: prev.specialRequests?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // TODO: Replace with actual API call
      // await offerService.createOffer(offerData as CreateOfferRequest);

      // Mock submission

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      onOfferCreated();
    } catch (error) {
      // TODO: Add proper error handling
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return offerData.offerPrice && offerData.offerPrice > 0;
      case 2:
        return offerData.paymentStructure?.type;
      case 3:
        return offerData.timeline?.closingDate && offerData.timeline?.responseDeadline;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Offer Amount</h3>
              <p className="text-gray-600">Set your initial offer price and currency</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CustomNumberInputField
                label="Offer Price"
                placeholder="850000"
                value={offerData.offerPrice?.toString() || ''}
                onChange={e => handleInputChange('offerPrice', parseFloat(e.target.value) || 0)}
                required
                onBlur={() => {}}
                name="offerPrice"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select
                  value={offerData.currency || 'EUR'}
                  onChange={e => handleInputChange('currency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="EUR">EUR (€)</option>
                  <option value="USD">USD ($)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
            </div>

            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">💡 Offer Strategy Tips</h4>
              <ul className="text-sm text-primary-800 space-y-1">
                <li>• Research comparable business sales in your area</li>
                <li>• Consider the business's financial performance and growth potential</li>
                <li>• Factor in market conditions and industry trends</li>
                <li>• Leave room for negotiation while remaining competitive</li>
              </ul>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <FileText className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Structure</h3>
              <p className="text-gray-600">Define how you'll structure the payment</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Type</label>
              <select
                value={offerData.paymentStructure?.type || 'cash'}
                onChange={e => handlePaymentStructureChange('type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="cash">All Cash</option>
                <option value="financed">Financed</option>
                <option value="mixed">Mixed (Cash + Financing)</option>
                <option value="earnout">Earnout Structure</option>
                <option value="stock">Stock Exchange</option>
              </select>
            </div>

            {offerData.paymentStructure?.type === 'mixed' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CustomNumberInputField
                  label="Cash Amount"
                  placeholder="500000"
                  value={offerData.paymentStructure?.cashAmount?.toString() || ''}
                  onChange={e =>
                    handlePaymentStructureChange('cashAmount', parseFloat(e.target.value) || 0)
                  }
                  onBlur={() => {}}
                  name="cashAmount"
                />

                <CustomNumberInputField
                  label="Financed Amount"
                  placeholder="350000"
                  value={offerData.paymentStructure?.financedAmount?.toString() || ''}
                  onChange={e =>
                    handlePaymentStructureChange('financedAmount', parseFloat(e.target.value) || 0)
                  }
                  onBlur={() => {}}
                  name="financedAmount"
                />
              </div>
            )}

            {offerData.paymentStructure?.type === 'financed' && (
              <CustomNumberInputField
                label="Financed Amount"
                placeholder="850000"
                value={offerData.paymentStructure?.financedAmount?.toString() || ''}
                onChange={e =>
                  handlePaymentStructureChange('financedAmount', parseFloat(e.target.value) || 0)
                }
                onBlur={() => {}}
                name="financedAmount"
              />
            )}

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">💰 Payment Structure Benefits</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>
                  • <strong>All Cash:</strong> Fastest closing, most attractive to sellers
                </li>
                <li>
                  • <strong>Financed:</strong> Preserves your cash flow, may allow higher offers
                </li>
                <li>
                  • <strong>Mixed:</strong> Balances speed with cash preservation
                </li>
                <li>
                  • <strong>Earnout:</strong> Aligns interests, reduces upfront risk
                </li>
              </ul>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Calendar className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Timeline & Conditions</h3>
              <p className="text-gray-600">Set deadlines and key conditions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Closing Date</label>
                <input
                  type="date"
                  value={offerData.timeline?.closingDate || ''}
                  onChange={e => handleTimelineChange('closingDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Response Deadline
                </label>
                <input
                  type="date"
                  value={offerData.timeline?.responseDeadline || ''}
                  onChange={e => handleTimelineChange('responseDeadline', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CustomNumberInputField
                label="Due Diligence Period (days)"
                placeholder="30"
                value={offerData.timeline?.dueDiligencePeriod?.toString() || ''}
                onChange={e =>
                  handleTimelineChange('dueDiligencePeriod', parseInt(e.target.value) || 0)
                }
                onBlur={() => {}}
                name="dueDiligencePeriod"
              />

              <CustomNumberInputField
                label="Financing Period (days)"
                placeholder="45"
                value={offerData.timeline?.financingPeriod?.toString() || ''}
                onChange={e =>
                  handleTimelineChange('financingPeriod', parseInt(e.target.value) || 0)
                }
                onBlur={() => {}}
                name="financingPeriod"
              />
            </div>

            {/* Conditions */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900">Conditions</h4>
                <Button
                  size="sm"
                  variant="secondary"
                  onPress={addCondition}
                  startContent={<Plus className="w-4 h-4" />}
                >
                  Add Condition
                </Button>
              </div>
              <div className="space-y-3">
                {offerData.conditions?.map((condition, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg"
                  >
                    <CustomCheckbox
                      label=""
                      checked={condition.isRequired}
                      onChange={() => updateCondition(index, 'isRequired', !condition.isRequired)}
                      name={`condition-${index}`}
                    />
                    <input
                      type="text"
                      value={condition.description}
                      onChange={e => updateCondition(index, 'description', e.target.value)}
                      placeholder="Enter condition..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <Button
                      size="sm"
                      variant="secondary"
                      isIconOnly
                      onPress={() => removeCondition(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <FileText className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Additional Terms</h3>
              <p className="text-gray-600">Add any special requests or additional terms</p>
            </div>

            <AnimatedTextarea
              label="Additional Terms"
              placeholder="Any additional terms or conditions you'd like to include..."
              value={offerData.additionalTerms || ''}
              onChange={e => handleInputChange('additionalTerms', e.target.value)}
              onBlur={() => {}}
              name="additionalTerms"
              minRows={4}
            />

            {/* Special Requests */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900">Special Requests</h4>
                <Button
                  size="sm"
                  variant="secondary"
                  onPress={addSpecialRequest}
                  startContent={<Plus className="w-4 h-4" />}
                >
                  Add Request
                </Button>
              </div>
              <div className="space-y-3">
                {offerData.specialRequests?.map((request, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={request}
                      onChange={e => updateSpecialRequest(index, e.target.value)}
                      placeholder="Enter special request..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <Button
                      size="sm"
                      variant="secondary"
                      isIconOnly
                      onPress={() => removeSpecialRequest(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Review Summary */}
            <Card className="border border-gray-200">
              <CardHeader>
                <h4 className="font-semibold text-gray-900">Offer Summary</h4>
              </CardHeader>
              <CardBody>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Offer Price:</span>
                    <span className="font-medium">
                      {offerData.currency} {offerData.offerPrice?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Type:</span>
                    <span className="font-medium capitalize">
                      {offerData.paymentStructure?.type?.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Closing Date:</span>
                    <span className="font-medium">{offerData.timeline?.closingDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Response Deadline:</span>
                    <span className="font-medium">{offerData.timeline?.responseDeadline}</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalContent>
        <ModalHeader>
          <div className="flex items-center justify-between w-full">
            <div>
              <h3 className="text-lg font-semibold">Create New Offer</h3>
              <p className="text-sm text-gray-600">
                Step {currentStep} of {totalSteps}
              </p>
            </div>
            <Button variant="secondary" isIconOnly onPress={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </ModalHeader>
        <ModalBody>
          {/* Progress Bar */}
          <div className="mb-6">
            <Progress
              value={(currentStep / totalSteps) * 100}
              className="mb-2"
              color="primary"
              size="sm"
            />
            <div className="flex justify-between text-xs text-gray-600">
              <span>Amount</span>
              <span>Payment</span>
              <span>Timeline</span>
              <span>Terms</span>
            </div>
          </div>

          {renderStep()}
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-between w-full">
            <Button
              variant="secondary"
              onPress={() => setCurrentStep(Math.max(1, currentStep - 1))}
              isDisabled={currentStep === 1}
            >
              Previous
            </Button>
            <div className="flex gap-2">
              <Button variant="secondary" onPress={onClose}>
                Cancel
              </Button>
              {currentStep < totalSteps ? (
                <Button
                  variant="primary"
                  onPress={() => setCurrentStep(currentStep + 1)}
                  isDisabled={!canProceed()}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onPress={handleSubmit}
                  isLoading={isSubmitting}
                  isDisabled={!canProceed()}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Offer'}
                </Button>
              )}
            </div>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { OfferCreationModal };
