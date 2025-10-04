/* eslint-disable @typescript-eslint/no-unused-vars */
// 📄 Document Sharing Modal
// Location: src/features/phase1/conversations/components/modals/DocumentSharingModal.tsx
// Purpose: Modal for sharing documents within conversation context

import { Button } from '@/shared/components/buttons';
import { CustomCheckbox, CustomDropdown, CustomTextarea } from '@/shared/components/forms';
import { CenteredModal } from '@/shared/components/modals/foundations';
import { Eye, FileText, Shield, Upload, UploadCloud, X } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { DocumentSharingModalProps, ShareDocumentRequest } from '../../types';

interface DocumentSharingData {
  documentType: 'financial' | 'legal' | 'operational' | 'marketing' | 'technical' | 'other';
  accessLevel: 'public' | 'nda_required' | 'due_diligence';
  message: string;
  selectedFiles: File[];
  isConfidential: boolean;
  requiresAcknowledgment: boolean;
  allowDownload: boolean;
}

const documentTypes = [
  {
    value: 'financial',
    label: 'Financial Documents',
    description: 'P&L, Balance Sheet, Cash Flow',
  },
  { value: 'legal', label: 'Legal Documents', description: 'Contracts, Licenses, Agreements' },
  {
    value: 'operational',
    label: 'Operational Documents',
    description: 'Processes, Procedures, Manuals',
  },
  {
    value: 'marketing',
    label: 'Marketing Materials',
    description: 'Brochures, Presentations, Branding',
  },
  {
    value: 'technical',
    label: 'Technical Documents',
    description: 'Specifications, Manuals, Diagrams',
  },
  { value: 'other', label: 'Other Documents', description: 'Custom document types' },
];

const accessLevels = [
  {
    value: 'public',
    label: 'Public Access',
    description: 'Visible to all conversation participants',
    icon: Eye,
    color: 'text-green-600',
  },
  {
    value: 'nda_required',
    label: 'NDA Required',
    description: 'Requires signed NDA to access',
    icon: Shield,
    color: 'text-yellow-600',
  },
  {
    value: 'due_diligence',
    label: 'Due Diligence Only',
    description: 'Only accessible during due diligence',
    icon: FileText,
    color: 'text-primary-600',
  },
];

const DocumentSharingModal: React.FC<DocumentSharingModalProps> = ({
  isOpen,
  onClose,
  conversationId,
  listingId: _listingId,
  documentType,
  accessLevel,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<DocumentSharingData>({
    documentType: documentType || 'other',
    accessLevel: accessLevel || 'nda_required',
    message: '',
    selectedFiles: [],
    isConfidential: false,
    requiresAcknowledgment: true,
    allowDownload: true,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    field: keyof DocumentSharingData,
    value: string | number | boolean | File[]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({
      ...prev,
      selectedFiles: [...prev.selectedFiles, ...files],
    }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      selectedFiles: prev.selectedFiles.filter((_, i) => i !== index),
    }));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'xls':
      case 'xlsx':
        return '📊';
      case 'ppt':
      case 'pptx':
        return '📈';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return '🖼️';
      case 'zip':
      case 'rar':
        return '📦';
      default:
        return '📄';
    }
  };

  const validateForm = (): boolean => {
    if (formData.selectedFiles.length === 0) {
      alert('Please select at least one file to share');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const uploadInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(uploadInterval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      // TODO: Replace with actual API call
      // const uploadPromises = formData.selectedFiles.map(file =>
      //   conversationService.uploadDocument(conversationId, file, formData.accessLevel)
      // );
      // await Promise.all(uploadPromises);

      // Mock success
      await new Promise(resolve => setTimeout(resolve, 2000));

      const shareRequest: ShareDocumentRequest = {
        conversationId,
        documentId: 'mock-document-id',
        accessLevel: formData.accessLevel,
        message: formData.message || undefined,
      };

      onSuccess?.(shareRequest);
      onClose();
    } catch (error) {
      // Handle error
      alert('Failed to share documents. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const selectedAccessLevel = accessLevels.find(l => l.value === formData.accessLevel);

  return (
    <CenteredModal
      isOpen={isOpen}
      onClose={onClose}
      title="Share Documents"
      size="2xl"
      footer={
        <div className="flex items-center justify-between">
          <Button variant="tertiary" onPress={onClose} size="md" isDisabled={isUploading}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onPress={handleSubmit}
            size="md"
            startContent={<Upload className="w-4 h-4" />}
            isLoading={isUploading}
            isDisabled={formData.selectedFiles.length === 0}
          >
            {isUploading ? 'Uploading...' : 'Share Documents'}
          </Button>
        </div>
      }
    >
      <div className="p-4">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Upload className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Share Documents</h3>
          <p className="text-gray-600 text-sm">
            Upload and share documents with conversation participants
          </p>
        </div>

        <div className="space-y-6">
          {/* Document Type */}
          <div className="space-y-2">
            <CustomDropdown
              label="Document Type"
              placeholder="Select document type"
              options={documentTypes}
              value={formData.documentType}
              onChange={value => handleInputChange('documentType', value)}
              name="documentType"
            />
          </div>

          {/* Access Level */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Access Level</label>
            <div className="space-y-2">
              {accessLevels.map(level => {
                const Icon = level.icon;
                return (
                  <div
                    key={level.value}
                    className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      formData.accessLevel === level.value
                        ? 'border-primary-300 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleInputChange('accessLevel', level.value)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={level.color}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{level.label}</span>
                          {formData.accessLevel === level.value && (
                            <span className="px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded-full">
                              Selected
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{level.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sharing Options */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Sharing Options</label>
            <div className="space-y-2">
              <CustomCheckbox
                label="Contains confidential information"
                checked={formData.isConfidential}
                onChange={() => handleInputChange('isConfidential', !formData.isConfidential)}
                name="isConfidential"
              />
              <CustomCheckbox
                label="Requires acknowledgment of receipt"
                checked={formData.requiresAcknowledgment}
                onChange={() =>
                  handleInputChange('requiresAcknowledgment', !formData.requiresAcknowledgment)
                }
                name="requiresAcknowledgment"
              />
              <CustomCheckbox
                label="Allow download of documents"
                checked={formData.allowDownload}
                onChange={() => handleInputChange('allowDownload', !formData.allowDownload)}
                name="allowDownload"
              />
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Select Files</label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadCloud className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Click to select files or drag and drop</p>
              <p className="text-xs text-gray-500">PDF, DOC, XLS, PPT, Images (Max 10MB each)</p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.zip,.rar"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>

          {/* Selected Files */}
          {formData.selectedFiles.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Selected Files ({formData.selectedFiles.length})
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {formData.selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border"
                  >
                    <span className="text-lg">{getFileIcon(file)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                    <Button
                      variant="tertiary"
                      isIconOnly
                      onPress={() => removeFile(index)}
                      className="text-red-500 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700">Uploading files...</span>
                <span className="text-gray-500">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Additional Message */}
          <div className="space-y-2">
            <CustomTextarea
              label="Message (Optional)"
              placeholder="Add a message to accompany the shared documents"
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

export default DocumentSharingModal;
