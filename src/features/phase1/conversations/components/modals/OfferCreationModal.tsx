// 💰 Offer Creation Modal
// Location: src/features/phase1/conversations/components/modals/OfferCreationModal.tsx
// Purpose: Modal for creating offers within conversation context

import { Button } from '@/shared/components/buttons';
import {
  CustomCheckbox,
  CustomDropdown,
  CustomInputField,
  CustomNumberInputField,
  CustomTextarea,
} from '@/shared/components/forms';
import { CenteredModal } from '@/shared/components/modals/foundations';
import { Calendar, Euro, Plus, X } from 'lucide-react';
import React, { useState } from 'react';
import { CreateOfferRequest, OfferCreationModalProps } from '../../types';

interface OfferData {
  amount: number;
  currency: string;
  terms: string;
  conditions: string[];
  expirationDate: string;
  additionalMessage: string;
  isSubjectToDueDiligence: boolean;
  isSubjectToFinancing: boolean;
  isSubjectToLegalReview: boolean;
}

const currencyOptions = [
  { value: 'EUR', label: 'EUR', symbol: '€' },
  { value: 'USD', label: 'USD', symbol: '$' },
  { value: 'GBP', label: 'GBP', symbol: '£' },
];

const OfferCreationModal: React.FC<OfferCreationModalProps> = ({
  isOpen,
  onClose,
  conversationId,
  listingId: _listingId,
  initialOffer,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<OfferData>({
    amount: initialOffer?.amount || 0,
    currency: 'EUR', // Default currency since initialOffer doesn't have currency
    terms: initialOffer?.terms || '',
    conditions: initialOffer?.conditions || [],
    expirationDate: '',
    additionalMessage: '',
    isSubjectToDueDiligence: true,
    isSubjectToFinancing: false,
    isSubjectToLegalReview: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    field: keyof OfferData,
    value: string | number | boolean | string[]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const addCondition = () => {
    setFormData(prev => ({ ...prev, conditions: [...prev.conditions, ''] }));
  };

  const updateCondition = (index: number, value: string) => {
    const newConditions = [...formData.conditions];
    newConditions[index] = value;
    setFormData(prev => ({ ...prev, conditions: newConditions }));
  };

  const removeCondition = (index: number) => {
    if (formData.conditions.length > 1) {
      setFormData(prev => ({
        ...prev,
        conditions: prev.conditions.filter((_, i) => i !== index),
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Please enter a valid offer amount';
    }

    if (!formData.terms.trim()) {
      newErrors.terms = 'Please describe the terms of your offer';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const offerRequest: CreateOfferRequest = {
        conversationId,
        amount: formData.amount,
        currency: formData.currency,
        terms: formData.terms,
        conditions: formData.conditions.length > 0 ? formData.conditions : undefined,
        expirationDate: formData.expirationDate || undefined,
        message: formData.additionalMessage || undefined,
      };

      // TODO: Replace with actual API call
      // await conversationService.createOffer(offerRequest);

      // Mock success
      onSuccess?.(offerRequest);
      onClose();
    } catch (error) {
      // Handle error
      alert('Failed to create offer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCurrency = currencyOptions.find(c => c.value === formData.currency);

  return (
    <CenteredModal
      isOpen={isOpen}
      onClose={onClose}
      title="Make an Offer"
      size="2xl"
      footer={
        <div className="flex items-center justify-between">
          <Button variant="tertiary" onPress={onClose} size="md" isDisabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onPress={handleSubmit}
            size="md"
            startContent={<Euro className="w-4 h-4" />}
            isLoading={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Offer'}
          </Button>
        </div>
      }
    >
      <div className="p-4">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Euro className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Make an Offer</h3>
          <p className="text-gray-600 text-sm">
            Submit a formal offer for this business opportunity
          </p>
        </div>

        <div className="space-y-6">
          {/* Offer Amount */}
          <div className="space-y-2">
            <CustomNumberInputField
              label="Offer Amount"
              placeholder="Enter amount"
              value={formData.amount.toString()}
              onChange={e => handleInputChange('amount', parseFloat(e.target.value) || 0)}
              onBlur={() => {}}
              name="amount"
              error={errors.amount}
              required
              min={0}
              allowDecimals={true}
              prefix={selectedCurrency?.symbol}
            />
          </div>

          {/* Currency Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Currency</label>
            <div className="flex space-x-2">
              {currencyOptions.map(currency => (
                <button
                  key={currency.value}
                  type="button"
                  onClick={() => handleInputChange('currency', currency.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
                    formData.currency === currency.value
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {currency.symbol} {currency.label}
                </button>
              ))}
            </div>
          </div>

          {/* Offer Terms */}
          <div className="space-y-2">
            <CustomTextarea
              label="Offer Terms"
              placeholder="Describe the terms of your offer (e.g., payment structure, closing timeline, etc.)"
              value={formData.terms}
              onChange={e => handleInputChange('terms', e.target.value)}
              onBlur={() => {}}
              name="terms"
              error={errors.terms}
              required
              rows={3}
            />
          </div>

          {/* Standard Conditions */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Standard Conditions</label>
            <div className="space-y-2">
              <CustomCheckbox
                label="Subject to due diligence"
                checked={formData.isSubjectToDueDiligence}
                onChange={() =>
                  handleInputChange('isSubjectToDueDiligence', !formData.isSubjectToDueDiligence)
                }
                name="isSubjectToDueDiligence"
              />
              <CustomCheckbox
                label="Subject to financing approval"
                checked={formData.isSubjectToFinancing}
                onChange={() =>
                  handleInputChange('isSubjectToFinancing', !formData.isSubjectToFinancing)
                }
                name="isSubjectToFinancing"
              />
              <CustomCheckbox
                label="Subject to legal review"
                checked={formData.isSubjectToLegalReview}
                onChange={() =>
                  handleInputChange('isSubjectToLegalReview', !formData.isSubjectToLegalReview)
                }
                name="isSubjectToLegalReview"
              />
            </div>
          </div>

          {/* Additional Conditions */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Additional Conditions</label>
            <div className="space-y-2">
              {formData.conditions.map((condition, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="flex-1">
                    <CustomInputField
                      placeholder="Add a custom condition"
                      value={condition}
                      onChange={e => updateCondition(index, e.target.value)}
                      onBlur={() => {}}
                      name={`condition-${index}`}
                    />
                  </div>
                  {formData.conditions.length > 1 && (
                    <Button
                      variant="tertiary"
                      isIconOnly
                      onPress={() => removeCondition(index)}
                      className="text-red-500 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="tertiary"
                onPress={addCondition}
                startContent={<Plus className="w-4 h-4" />}
                className="text-primary hover:text-primary-600"
              >
                Add Condition
              </Button>
            </div>
          </div>

          {/* Expiration Date */}
          <div className="space-y-2">
            <CustomDropdown
              label="Offer Expiration (Optional)"
              placeholder="Select expiration timeframe"
              options={[
                { value: '', label: 'No expiration' },
                { value: '1', label: '1 day' },
                { value: '3', label: '3 days' },
                { value: '7', label: '1 week' },
                { value: '14', label: '2 weeks' },
                { value: '30', label: '1 month' },
                { value: 'custom', label: 'Custom date' },
              ]}
              value={formData.expirationDate}
              onChange={value => handleInputChange('expirationDate', value)}
              name="expirationDate"
            />
            {formData.expirationDate === 'custom' && (
              <CustomInputField
                label="Custom Expiration Date"
                type="date"
                value={formData.expirationDate}
                onChange={e => handleInputChange('expirationDate', e.target.value)}
                onBlur={() => {}}
                name="customExpirationDate"
                leftIcon={<Calendar className="w-4 h-4 text-gray-400" />}
              />
            )}
          </div>

          {/* Additional Message */}
          <div className="space-y-2">
            <CustomTextarea
              label="Additional Message"
              placeholder="Add any additional context or message to accompany your offer"
              value={formData.additionalMessage}
              onChange={e => handleInputChange('additionalMessage', e.target.value)}
              onBlur={() => {}}
              name="additionalMessage"
              rows={2}
            />
          </div>
        </div>
      </div>
    </CenteredModal>
  );
};

export default OfferCreationModal;
