// 📋 Due Diligence Request Modal
// Location: src/features/phase1/conversations/components/modals/DueDiligenceRequestModal.tsx
// Purpose: Modal for requesting due diligence items within conversation context

import { Button } from '@/shared/components/buttons';
import {
  CustomCheckbox,
  CustomDropdown,
  CustomInputField,
  CustomTextarea,
} from '@/shared/components/forms';
import { CenteredModal } from '@/shared/components/modals/foundations';
import { Calendar, FileText, X } from 'lucide-react';
import React, { useState } from 'react';
import { CreateDueDiligenceRequest, DueDiligenceRequestModalProps } from '../../types';

interface DueDiligenceData {
  category: string;
  itemId: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  deadline: string;
  message: string;
  specificDocuments: string[];
  isUrgent: boolean;
  requiresResponse: boolean;
  isConfidential: boolean;
}

const dueDiligenceCategories = [
  {
    value: 'financial',
    label: 'Financial Statements',
    description: 'P&L, Balance Sheet, Cash Flow',
  },
  { value: 'legal', label: 'Legal Documents', description: 'Contracts, Licenses, Litigation' },
  { value: 'operational', label: 'Operations', description: 'Processes, Systems, Procedures' },
  { value: 'commercial', label: 'Commercial', description: 'Customers, Suppliers, Market' },
  { value: 'technical', label: 'Technical', description: 'IT Systems, Infrastructure' },
  { value: 'hr', label: 'Human Resources', description: 'Staff, Benefits, Policies' },
  { value: 'environmental', label: 'Environmental', description: 'Compliance, Risks, Assessments' },
  { value: 'other', label: 'Other', description: 'Custom requests' },
];

const priorityOptions = [
  { value: 'low', label: 'Low Priority' },
  { value: 'medium', label: 'Medium Priority' },
  { value: 'high', label: 'High Priority' },
  { value: 'urgent', label: 'Urgent' },
];

const commonDocuments = {
  financial: [
    'Audited Financial Statements (3 years)',
    'Management Accounts (YTD)',
    'Cash Flow Projections',
    'Tax Returns',
    'Bank Statements',
  ],
  legal: [
    'Articles of Incorporation',
    'Shareholder Agreements',
    'Key Contracts',
    'Insurance Policies',
    'Litigation History',
  ],
  operational: [
    'Organizational Chart',
    'Standard Operating Procedures',
    'Quality Certifications',
    'Equipment List',
    'Facility Information',
  ],
  commercial: [
    'Customer List',
    'Supplier Agreements',
    'Market Analysis',
    'Competitive Analysis',
    'Sales Pipeline',
  ],
};

const DueDiligenceRequestModal: React.FC<DueDiligenceRequestModalProps> = ({
  isOpen,
  onClose,
  conversationId,
  listingId: _listingId,
  processId: _processId,
  category,
  priority,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<DueDiligenceData>({
    category: category || '',
    itemId: '',
    priority: priority || 'medium',
    deadline: '',
    message: '',
    specificDocuments: [],
    isUrgent: false,
    requiresResponse: true,
    isConfidential: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    field: keyof DueDiligenceData,
    value: string | number | boolean | string[]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const addDocument = (document: string) => {
    if (document && !formData.specificDocuments.includes(document)) {
      setFormData(prev => ({
        ...prev,
        specificDocuments: [...prev.specificDocuments, document],
      }));
    }
  };

  const removeDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specificDocuments: prev.specificDocuments.filter((_, i) => i !== index),
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.category) {
      newErrors.category = 'Please select a due diligence category';
    }

    if (!formData.itemId.trim()) {
      newErrors.itemId = 'Please provide a request description';
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
      const ddRequest: CreateDueDiligenceRequest = {
        conversationId,
        category: formData.category,
        itemId: formData.itemId,
        priority: formData.priority,
        deadline: formData.deadline || undefined,
        message: formData.message || undefined,
      };

      // TODO: Replace with actual API call
      // await conversationService.createDueDiligenceRequest(ddRequest);

      // Mock success
      onSuccess?.(ddRequest);
      onClose();
    } catch (error) {
      // Handle error
      alert('Failed to create due diligence request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCategory = dueDiligenceCategories.find(c => c.value === formData.category);
  const availableDocuments = formData.category
    ? commonDocuments[formData.category as keyof typeof commonDocuments]
    : [];

  return (
    <CenteredModal
      isOpen={isOpen}
      onClose={onClose}
      title="Request Due Diligence"
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
            startContent={<FileText className="w-4 h-4" />}
            isLoading={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </Button>
        </div>
      }
    >
      <div className="p-4">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Request Due Diligence</h3>
          <p className="text-gray-600 text-sm">
            Request specific documents or information for due diligence
          </p>
        </div>

        <div className="space-y-6">
          {/* Category Selection */}
          <div className="space-y-2">
            <CustomDropdown
              label="Category"
              placeholder="Select a due diligence category"
              options={dueDiligenceCategories}
              value={formData.category}
              onChange={value => {
                handleInputChange('category', value);
                handleInputChange('specificDocuments', []); // Reset documents when category changes
              }}
              name="category"
              error={errors.category}
              required
            />
            {selectedCategory && (
              <p className="text-xs text-gray-500 mt-1">{selectedCategory.description}</p>
            )}
          </div>

          {/* Request Description */}
          <div className="space-y-2">
            <CustomTextarea
              label="Request Description"
              placeholder="Describe what specific information or documents you need"
              value={formData.itemId}
              onChange={e => handleInputChange('itemId', e.target.value)}
              onBlur={() => {}}
              name="itemId"
              error={errors.itemId}
              required
              rows={3}
            />
          </div>

          {/* Priority Selection */}
          <div className="space-y-2">
            <CustomDropdown
              label="Priority"
              placeholder="Select priority level"
              options={priorityOptions}
              value={formData.priority}
              onChange={value => handleInputChange('priority', value)}
              name="priority"
            />
          </div>

          {/* Request Options */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Request Options</label>
            <div className="space-y-2">
              <CustomCheckbox
                label="This is an urgent request"
                checked={formData.isUrgent}
                onChange={() => handleInputChange('isUrgent', !formData.isUrgent)}
                name="isUrgent"
              />
              <CustomCheckbox
                label="Requires written response"
                checked={formData.requiresResponse}
                onChange={() => handleInputChange('requiresResponse', !formData.requiresResponse)}
                name="requiresResponse"
              />
              <CustomCheckbox
                label="Contains confidential information"
                checked={formData.isConfidential}
                onChange={() => handleInputChange('isConfidential', !formData.isConfidential)}
                name="isConfidential"
              />
            </div>
          </div>

          {/* Common Documents for Selected Category */}
          {availableDocuments && availableDocuments.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Common Documents ({selectedCategory?.label})
              </label>
              <div className="grid grid-cols-1 gap-2">
                {availableDocuments.map(doc => (
                  <Button
                    key={doc}
                    variant="tertiary"
                    size="sm"
                    onPress={() => addDocument(doc)}
                    isDisabled={formData.specificDocuments.includes(doc)}
                    className="justify-start h-auto p-2 text-left"
                    startContent={<FileText className="w-3 h-3" />}
                  >
                    <span className="text-xs">{doc}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Selected Documents */}
          {formData.specificDocuments.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Selected Documents ({formData.specificDocuments.length})
              </label>
              <div className="space-y-2">
                {formData.specificDocuments.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="flex-1 text-sm text-blue-800">{doc}</span>
                    <Button
                      variant="tertiary"
                      isIconOnly
                      onPress={() => removeDocument(index)}
                      className="text-red-500 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deadline */}
          <div className="space-y-2">
            <CustomDropdown
              label="Deadline (Optional)"
              placeholder="Select deadline"
              options={[
                { value: '', label: 'No deadline' },
                { value: '1', label: '1 day' },
                { value: '3', label: '3 days' },
                { value: '7', label: '1 week' },
                { value: '14', label: '2 weeks' },
                { value: '30', label: '1 month' },
                { value: 'custom', label: 'Custom date' },
              ]}
              value={formData.deadline}
              onChange={value => handleInputChange('deadline', value)}
              name="deadline"
            />
            {formData.deadline === 'custom' && (
              <CustomInputField
                label="Custom Date"
                type="date"
                value={formData.deadline}
                onChange={e => handleInputChange('deadline', e.target.value)}
                onBlur={() => {}}
                name="customDeadline"
                leftIcon={<Calendar className="w-4 h-4 text-gray-400" />}
              />
            )}
          </div>

          {/* Additional Message */}
          <div className="space-y-2">
            <CustomTextarea
              label="Additional Message"
              placeholder="Add any additional context or specific requirements"
              value={formData.message}
              onChange={e => handleInputChange('message', e.target.value)}
              onBlur={() => {}}
              name="message"
              rows={2}
            />
          </div>
        </div>
      </div>
    </CenteredModal>
  );
};

export default DueDiligenceRequestModal;
