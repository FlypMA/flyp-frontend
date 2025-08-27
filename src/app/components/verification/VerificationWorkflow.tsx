import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  Button,
  Progress,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@heroui/react';
import {
  Upload,
  CheckCircle,
  AlertTriangle,
  X,
  FileText,
  Clock,
  Shield,
  Eye,
  Trash2,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';
import verificationService, {
  VerificationDocument,
  VerificationSubmission,
} from '../../services/verification/verificationService';

interface VerificationWorkflowProps {
  organizationId: string;
  onVerificationComplete?: () => void;
  onSkip?: () => void;
}

const VerificationWorkflow: React.FC<VerificationWorkflowProps> = ({
  organizationId,
  onVerificationComplete,
  onSkip,
}) => {
  const [verificationStatus, setVerificationStatus] = useState<VerificationSubmission | null>(null);
  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewModal, setPreviewModal] = useState<{
    isOpen: boolean;
    document?: VerificationDocument;
  }>({
    isOpen: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  const requiredDocuments = verificationService.getRequiredDocuments();

  useEffect(() => {
    loadVerificationStatus();
  }, [organizationId]);

  const loadVerificationStatus = async () => {
    setIsLoading(true);
    try {
      const status = await verificationService.getVerificationStatus(organizationId);
      setVerificationStatus(status);
    } catch (error) {
      console.error('Error loading verification status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file: File, documentType: VerificationDocument['type']) => {
    // Validate file
    const validation = verificationService.validateFile(file, documentType);
    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    const uploadId = `${documentType}_${Date.now()}`;
    setUploadingFiles(prev => new Set([...prev, uploadId]));
    setUploadProgress(prev => ({ ...prev, [uploadId]: 0 }));

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => ({
          ...prev,
          [uploadId]: Math.min((prev[uploadId] || 0) + 10, 90),
        }));
      }, 200);

      const response = await verificationService.uploadDocument(file, documentType, organizationId);

      clearInterval(progressInterval);
      setUploadProgress(prev => ({ ...prev, [uploadId]: 100 }));

      if (response.success) {
        // Refresh verification status
        await loadVerificationStatus();

        setTimeout(() => {
          setUploadingFiles(prev => {
            const newSet = new Set(prev);
            newSet.delete(uploadId);
            return newSet;
          });
          setUploadProgress(prev => {
            const newProgress = { ...prev };
            delete newProgress[uploadId];
            return newProgress;
          });
        }, 1000);
      } else {
        throw new Error(response.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');

      setUploadingFiles(prev => {
        const newSet = new Set(prev);
        newSet.delete(uploadId);
        return newSet;
      });
      setUploadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[uploadId];
        return newProgress;
      });
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    if (!confirm('Are you sure you want to delete this document?')) {
      return;
    }

    try {
      const response = await verificationService.deleteDocument(documentId);
      if (response.success) {
        await loadVerificationStatus();
      } else {
        alert(response.error || 'Delete failed');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Delete failed. Please try again.');
    }
  };

  const handleSubmitForVerification = async () => {
    setIsSubmitting(true);
    try {
      const response = await verificationService.submitForVerification(organizationId);
      if (response.success) {
        await loadVerificationStatus();
        if (onVerificationComplete) {
          onVerificationComplete();
        }
      } else {
        alert(response.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: VerificationSubmission['status']) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'danger';
      case 'under_review':
        return 'warning';
      case 'submitted':
        return 'primary';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (
    status: VerificationSubmission['status'] | VerificationDocument['status']
  ) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'rejected':
        return <X className="w-4 h-4" />;
      case 'under_review':
        return <Clock className="w-4 h-4" />;
      case 'submitted':
        return <Clock className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'requires_resubmission':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getDocumentStatus = (
    documentType: VerificationDocument['type']
  ): VerificationDocument | null => {
    return verificationStatus?.documents.find(doc => doc.type === documentType) || null;
  };

  const getCompletionPercentage = () => {
    const requiredDocs = requiredDocuments.filter(doc => doc.required);
    const uploadedRequiredDocs = requiredDocs.filter(doc => getDocumentStatus(doc.type));
    return Math.round((uploadedRequiredDocs.length / requiredDocs.length) * 100);
  };

  const canSubmitForVerification = () => {
    const requiredDocs = requiredDocuments.filter(doc => doc.required);
    return (
      requiredDocs.every(doc => getDocumentStatus(doc.type)) &&
      verificationStatus?.status === 'draft'
    );
  };

  const FileUploadCard = ({
    documentRequirement,
    uploadedDocument,
  }: {
    documentRequirement: ReturnType<typeof verificationService.getRequiredDocuments>[0];
    uploadedDocument: VerificationDocument | null;
  }) => {
    const uploadId = `${documentRequirement.type}_upload`;
    const isUploading = uploadingFiles.has(uploadId);
    const progress = uploadProgress[uploadId] || 0;

    return (
      <Card className="border border-neutral-200">
        <CardBody className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary-100 rounded-lg flex-shrink-0">
              <FileText className="w-6 h-6 text-primary-600" />
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-neutral-900 flex items-center gap-2">
                    {documentRequirement.name}
                    {documentRequirement.required && <span className="text-danger-500">*</span>}
                  </h4>
                  <p className="text-sm text-neutral-600 mb-3">{documentRequirement.description}</p>
                  <div className="text-xs text-neutral-500 space-y-1">
                    <div>Max size: {documentRequirement.maxSize}MB</div>
                    <div>Formats: {documentRequirement.acceptedFormats.join(', ')}</div>
                  </div>
                </div>

                {uploadedDocument && (
                  <Chip
                    color={
                      uploadedDocument.status === 'approved'
                        ? 'success'
                        : uploadedDocument.status === 'rejected'
                          ? 'danger'
                          : 'warning'
                    }
                    variant="flat"
                    size="sm"
                    startContent={getStatusIcon(uploadedDocument.status)}
                  >
                    {uploadedDocument.status.replace('_', ' ')}
                  </Chip>
                )}
              </div>

              {uploadedDocument ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-neutral-600" />
                      <div>
                        <div className="font-medium text-sm">{uploadedDocument.name}</div>
                        <div className="text-xs text-neutral-500">
                          Uploaded {new Date(uploadedDocument.uploadedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="light"
                        onPress={() =>
                          setPreviewModal({ isOpen: true, document: uploadedDocument })
                        }
                        startContent={<Eye className="w-3 h-3" />}
                      >
                        View
                      </Button>
                      {verificationStatus?.status === 'draft' && (
                        <Button
                          size="sm"
                          variant="light"
                          color="danger"
                          onPress={() => handleDeleteDocument(uploadedDocument.id)}
                          startContent={<Trash2 className="w-3 h-3" />}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </div>

                  {uploadedDocument.status === 'rejected' && uploadedDocument.reviewNotes && (
                    <div className="p-3 bg-danger-50 border border-danger-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-danger-600 mt-0.5" />
                        <div>
                          <div className="font-medium text-danger-900 text-sm">
                            Resubmission Required
                          </div>
                          <div className="text-sm text-danger-800">
                            {uploadedDocument.reviewNotes}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {isUploading ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} size="sm" />
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        id={`upload-${documentRequirement.type}`}
                        accept={documentRequirement.acceptedFormats.join(',')}
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileUpload(file, documentRequirement.type);
                          }
                        }}
                        className="hidden"
                        disabled={verificationStatus?.status !== 'draft'}
                      />
                      <label
                        htmlFor={`upload-${documentRequirement.type}`}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                          verificationStatus?.status === 'draft'
                            ? 'bg-primary-600 text-white hover:bg-primary-700'
                            : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                        }`}
                      >
                        <Upload className="w-4 h-4" />
                        Upload Document
                      </label>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-neutral-600">Loading verification status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status Header */}
      <Card className="border border-neutral-200">
        <CardBody className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-primary-600" />
              <h2 className="text-xl font-semibold text-neutral-900">Business Verification</h2>
            </div>

            {verificationStatus && (
              <Chip
                color={getStatusColor(verificationStatus.status)}
                variant="flat"
                startContent={getStatusIcon(verificationStatus.status)}
              >
                {verificationStatus.status.replace('_', ' ').toUpperCase()}
              </Chip>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-700">Completion Progress</span>
                <span className="text-sm text-neutral-600">{getCompletionPercentage()}%</span>
              </div>
              <Progress value={getCompletionPercentage()} size="sm" />
            </div>

            {verificationStatus?.status === 'approved' && (
              <div className="p-4 bg-success-50 border border-success-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-success-900">Verification Complete</div>
                    <div className="text-sm text-success-800">
                      Your business has been successfully verified. You can now create listings with
                      full credibility.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {verificationStatus?.status === 'rejected' && verificationStatus.reviewNotes && (
              <div className="p-4 bg-danger-50 border border-danger-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-danger-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-danger-900">Verification Issues</div>
                    <div className="text-sm text-danger-800">{verificationStatus.reviewNotes}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Document Upload Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-900">Required Documents</h3>

        {requiredDocuments.map(docReq => (
          <FileUploadCard
            key={docReq.type}
            documentRequirement={docReq}
            uploadedDocument={getDocumentStatus(docReq.type)}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-neutral-200">
        <Button variant="bordered" onPress={onSkip}>
          Skip for Now
        </Button>

        <div className="flex gap-3">
          <Button
            variant="bordered"
            onPress={loadVerificationStatus}
            startContent={<RefreshCw className="w-4 h-4" />}
          >
            Refresh Status
          </Button>

          {canSubmitForVerification() && (
            <Button color="primary" onPress={handleSubmitForVerification} isLoading={isSubmitting}>
              Submit for Verification
            </Button>
          )}
        </div>
      </div>

      {/* Document Preview Modal */}
      <Modal
        isOpen={previewModal.isOpen}
        onClose={() => setPreviewModal({ isOpen: false })}
        size="2xl"
      >
        <ModalContent>
          <ModalHeader>Document Preview</ModalHeader>
          <ModalBody>
            {previewModal.document && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-neutral-600" />
                  <div>
                    <div className="font-medium">{previewModal.document.name}</div>
                    <div className="text-sm text-neutral-500">
                      Uploaded {new Date(previewModal.document.uploadedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {previewModal.document.url ? (
                  <div className="border border-neutral-200 rounded-lg p-4">
                    <iframe
                      src={previewModal.document.url}
                      className="w-full h-96"
                      title="Document Preview"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-96 border border-neutral-200 rounded-lg bg-neutral-50">
                    <div className="text-center">
                      <FileText className="w-12 h-12 text-neutral-400 mx-auto mb-2" />
                      <p className="text-neutral-600">Preview not available</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="bordered" onPress={() => setPreviewModal({ isOpen: false })}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default VerificationWorkflow;
