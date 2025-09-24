/**
 * Document Management
 * Location: src/shared/components/transaction-completion/DocumentManagement.tsx
 * Purpose: Manage transaction documents and signatures
 */

import { Button } from '@/shared/components/buttons';
import { CustomFileInput } from '@/shared/components/forms';
import { Transaction, TransactionDocument } from '@/shared/types/transaction-completion';
import {
  Card,
  CardBody,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/react';
import { Download, Eye, FileText, MoreHorizontal, Search, Upload, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface DocumentManagementProps {
  transactionId: string;
  userRole: 'buyer' | 'seller' | 'advisor';
  userId: string;
}

const DocumentManagement: React.FC<DocumentManagementProps> = ({
  transactionId,
  userRole,
  userId,
}) => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDocument, setSelectedDocument] = useState<TransactionDocument | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    loadTransaction();
  }, [transactionId]);

  const loadTransaction = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await transactionService.getTransaction(transactionId);
      // setTransaction(response.data);

      // Mock data for now
      const mockTransaction: Transaction = {
        id: transactionId,
        offerId: 'offer-1',
        listingId: 'listing-1',
        buyerId: 'buyer-1',
        sellerId: 'seller-1',
        status: 'in_progress',
        type: 'asset_purchase',
        totalValue: 875000,
        currency: 'EUR',
        paymentStructure: {
          type: 'mixed',
          cashAmount: 600000,
          financedAmount: 275000,
        },
        closingDate: '2024-03-15',
        createdDate: '2024-01-15T10:30:00Z',
        lastUpdated: '2024-01-20T14:30:00Z',
        keyDates: [],
        parties: [],
        documents: [
          {
            id: 'doc-1',
            name: 'Purchase Agreement',
            type: 'legal',
            category: 'Purchase Agreement',
            status: 'signed',
            requiredBy: 'lawyer-1',
            dueDate: '2024-02-01',
            uploadedBy: 'lawyer-1',
            uploadedDate: '2024-01-20T10:30:00Z',
            fileSize: 2048576,
            downloadUrl: '/documents/purchase-agreement.pdf',
            version: 2,
            isLatest: true,
            signatures: [
              {
                id: 'sig-1',
                signatoryId: 'buyer-1',
                signatoryName: 'Jane Buyer',
                signedDate: '2024-01-25T14:30:00Z',
                signatureMethod: 'electronic',
                ipAddress: '192.168.1.1',
                location: 'New York, NY',
              },
              {
                id: 'sig-2',
                signatoryId: 'seller-1',
                signatoryName: 'John Seller',
                signedDate: '2024-01-25T15:45:00Z',
                signatureMethod: 'electronic',
                ipAddress: '192.168.1.2',
                location: 'Los Angeles, CA',
              },
            ],
            comments: [],
          },
          {
            id: 'doc-2',
            name: 'Financial Statements',
            type: 'financial',
            category: 'Due Diligence',
            status: 'approved',
            requiredBy: 'buyer-1',
            dueDate: '2024-02-15',
            uploadedBy: 'seller-1',
            uploadedDate: '2024-01-18T09:15:00Z',
            fileSize: 1536000,
            downloadUrl: '/documents/financial-statements.pdf',
            version: 1,
            isLatest: true,
            signatures: [],
            comments: [
              {
                id: 'comment-1',
                authorId: 'buyer-1',
                authorName: 'Jane Buyer',
                content: 'Financial statements look good, approved for closing.',
                timestamp: '2024-01-19T11:30:00Z',
                isResolved: true,
              },
            ],
          },
          {
            id: 'doc-3',
            name: 'Asset Inventory',
            type: 'operational',
            category: 'Asset Transfer',
            status: 'review',
            requiredBy: 'buyer-1',
            dueDate: '2024-03-10',
            uploadedBy: 'seller-1',
            uploadedDate: '2024-01-22T16:20:00Z',
            fileSize: 1024000,
            downloadUrl: '/documents/asset-inventory.pdf',
            version: 1,
            isLatest: true,
            signatures: [],
            comments: [
              {
                id: 'comment-2',
                authorId: 'buyer-1',
                authorName: 'Jane Buyer',
                content: 'Need to verify condition of equipment listed in inventory.',
                timestamp: '2024-01-23T10:15:00Z',
                isResolved: false,
              },
            ],
          },
          {
            id: 'doc-4',
            name: 'Financing Agreement',
            type: 'financial',
            category: 'Financing',
            status: 'draft',
            requiredBy: 'buyer-1',
            dueDate: '2024-02-28',
            uploadedBy: 'banker-1',
            uploadedDate: '2024-01-24T13:45:00Z',
            fileSize: 3072000,
            downloadUrl: '/documents/financing-agreement.pdf',
            version: 1,
            isLatest: true,
            signatures: [],
            comments: [],
          },
          {
            id: 'doc-5',
            name: 'Regulatory Approvals',
            type: 'regulatory',
            category: 'Compliance',
            status: 'approved',
            requiredBy: 'lawyer-1',
            dueDate: '2024-02-20',
            uploadedBy: 'lawyer-1',
            uploadedDate: '2024-01-20T14:30:00Z',
            fileSize: 512000,
            downloadUrl: '/documents/regulatory-approvals.pdf',
            version: 1,
            isLatest: true,
            signatures: [],
            comments: [],
          },
        ],
        closingChecklist: [],
        payments: [],
        postClosingItems: [],
        communications: [],
        version: 1,
        createdBy: 'buyer-1',
        requiresApproval: false,
        approvals: [],
      };

      setTransaction(mockTransaction);
    } catch (error) {
      console.error('Error loading transaction:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (
    file: File,
    type: string,
    category: string,
    requiredBy: string,
    dueDate: string
  ) => {
    try {
      // TODO: Replace with actual API call
      // await transactionService.uploadDocument(transactionId, file, type, category, requiredBy, dueDate);

      // Mock upload
      const newDocument: TransactionDocument = {
        id: `doc-${Date.now()}`,
        name: file.name,
        type: type as any,
        category,
        status: 'draft',
        requiredBy,
        dueDate,
        uploadedBy: userId,
        uploadedDate: new Date().toISOString(),
        fileSize: file.size,
        downloadUrl: `/documents/${file.name}`,
        version: 1,
        isLatest: true,
        signatures: [],
        comments: [],
      };

      setTransaction(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          documents: [...prev.documents, newDocument],
        };
      });

      setIsUploadModalOpen(false);
    } catch (error) {
      console.error('Error loading transaction:', error);
    }
  };

  const handleDownload = async (doc: TransactionDocument) => {
    try {
      // TODO: Replace with actual API call
      // await transactionService.downloadDocument(doc.id);

      // Mock download
      const link = document.createElement('a');
      link.href = doc.downloadUrl || '#';
      link.download = doc.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error loading transaction:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'signed':
        return 'success';
      case 'approved':
        return 'success';
      case 'review':
        return 'warning';
      case 'draft':
        return 'default';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'signed':
        return <FileText className="w-4 h-4" />;
      case 'approved':
        return <FileText className="w-4 h-4" />;
      case 'review':
        return <Eye className="w-4 h-4" />;
      case 'draft':
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'legal':
        return 'text-blue-600 bg-blue-100';
      case 'financial':
        return 'text-green-600 bg-green-100';
      case 'operational':
        return 'text-purple-600 bg-purple-100';
      case 'regulatory':
        return 'text-orange-600 bg-orange-100';
      case 'closing':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading documents...</p>
        </div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="text-center py-8">
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No transaction found</h3>
        <p className="text-gray-600">Unable to load documents.</p>
      </div>
    );
  }

  const filteredDocuments = transaction.documents.filter(doc => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const documentStats = {
    total: transaction.documents.length,
    signed: transaction.documents.filter(doc => doc.status === 'signed').length,
    approved: transaction.documents.filter(doc => doc.status === 'approved').length,
    pending: transaction.documents.filter(doc => doc.status === 'draft' || doc.status === 'review')
      .length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Document Management</h3>
          <p className="text-sm text-gray-600">Manage transaction documents and signatures</p>
        </div>
        <Button
          variant="primary"
          onPress={() => setIsUploadModalOpen(true)}
          startContent={<Upload className="w-4 h-4" />}
        >
          Upload Document
        </Button>
      </div>

      {/* Document Statistics */}
      <Card>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-1">{documentStats.total}</div>
              <div className="text-sm text-gray-600">Total Documents</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">{documentStats.signed}</div>
              <div className="text-sm text-gray-600">Signed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">{documentStats.approved}</div>
              <div className="text-sm text-gray-600">Approved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-1">{documentStats.pending}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Filters */}
      <Card>
        <CardBody>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="md:w-48">
              <select
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="legal">Legal</option>
                <option value="financial">Financial</option>
                <option value="operational">Operational</option>
                <option value="regulatory">Regulatory</option>
                <option value="closing">Closing</option>
              </select>
            </div>
            <div className="md:w-48">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="signed">Signed</option>
                <option value="approved">Approved</option>
                <option value="review">Under Review</option>
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Documents List */}
      <div className="space-y-4">
        {filteredDocuments.length === 0 ? (
          <Card>
            <CardBody>
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No documents found</h3>
                <p className="text-gray-600">
                  {searchQuery || typeFilter !== 'all' || statusFilter !== 'all'
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Upload your first document to get started.'}
                </p>
              </div>
            </CardBody>
          </Card>
        ) : (
          filteredDocuments.map(doc => (
            <Card key={doc.id} className="border border-gray-200">
              <CardBody>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${getTypeColor(doc.type)}`}>
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-lg font-semibold text-gray-900">{doc.name}</h4>
                        <Chip
                          size="sm"
                          color={getStatusColor(doc.status)}
                          variant="flat"
                          startContent={getStatusIcon(doc.status)}
                        >
                          {doc.status}
                        </Chip>
                        {doc.version > 1 && (
                          <Chip size="sm" variant="flat" color="default">
                            v{doc.version}
                          </Chip>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {doc.category} • {formatFileSize(doc.fileSize || 0)} • Uploaded{' '}
                        {new Date(doc.uploadedDate || '').toLocaleDateString()}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Due: {new Date(doc.dueDate).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>Required by: {doc.requiredBy}</span>
                        {doc.signatures.length > 0 && (
                          <>
                            <span>•</span>
                            <span>{doc.signatures.length} signature(s)</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onPress={() => setSelectedDocument(doc)}
                      startContent={<Eye className="w-4 h-4" />}
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onPress={() => handleDownload(doc)}
                      startContent={<Download className="w-4 h-4" />}
                    >
                      Download
                    </Button>
                    <Button size="sm" variant="secondary" isIconOnly>
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Signatures */}
                {doc.signatures.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h5 className="font-medium text-gray-900 mb-2">Signatures</h5>
                    <div className="space-y-2">
                      {doc.signatures.map(signature => (
                        <div
                          key={signature.id}
                          className="flex items-center gap-3 p-2 bg-green-50 rounded-lg"
                        >
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <FileText className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {signature.signatoryName}
                            </p>
                            <p className="text-xs text-gray-600">
                              Signed {new Date(signature.signedDate).toLocaleString()} •
                              {signature.signatureMethod} • {signature.location}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Comments */}
                {doc.comments.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h5 className="font-medium text-gray-900 mb-2">Comments</h5>
                    <div className="space-y-2">
                      {doc.comments.map(comment => (
                        <div
                          key={comment.id}
                          className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <FileText className="w-4 h-4 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{comment.content}</p>
                            <p className="text-xs text-gray-600 mt-1">
                              by {comment.authorName} •{' '}
                              {new Date(comment.timestamp).toLocaleString()}
                              {comment.isResolved && (
                                <span className="ml-2 text-green-600">• Resolved</span>
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          ))
        )}
      </div>

      {/* Document Details Modal */}
      {selectedDocument && (
        <Modal isOpen={!!selectedDocument} onClose={() => setSelectedDocument(null)} size="2xl">
          <ModalContent>
            <ModalHeader>
              <div className="flex items-center justify-between w-full">
                <h3 className="text-lg font-semibold">{selectedDocument.name}</h3>
                <Button variant="secondary" isIconOnly onPress={() => setSelectedDocument(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Document Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium capitalize">{selectedDocument.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium">{selectedDocument.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="font-medium capitalize">{selectedDocument.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Size:</span>
                        <span className="font-medium">
                          {formatFileSize(selectedDocument.fileSize || 0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Version:</span>
                        <span className="font-medium">{selectedDocument.version}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Timeline</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Uploaded:</span>
                        <span className="font-medium">
                          {new Date(selectedDocument.uploadedDate || '').toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Due Date:</span>
                        <span className="font-medium">
                          {new Date(selectedDocument.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Required by:</span>
                        <span className="font-medium">{selectedDocument.requiredBy}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Signatures */}
                {selectedDocument.signatures.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Signatures</h4>
                    <div className="space-y-3">
                      {selectedDocument.signatures.map(signature => (
                        <div
                          key={signature.id}
                          className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg"
                        >
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <FileText className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{signature.signatoryName}</p>
                            <p className="text-sm text-gray-600">
                              {new Date(signature.signedDate).toLocaleString()} •
                              {signature.signatureMethod} • {signature.location}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Comments */}
                {selectedDocument.comments.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Comments</h4>
                    <div className="space-y-3">
                      {selectedDocument.comments.map(comment => (
                        <div
                          key={comment.id}
                          className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg"
                        >
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <FileText className="w-4 h-4 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{comment.content}</p>
                            <p className="text-xs text-gray-600 mt-1">
                              by {comment.authorName} •{' '}
                              {new Date(comment.timestamp).toLocaleString()}
                              {comment.isResolved && (
                                <span className="ml-2 text-green-600">• Resolved</span>
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="secondary" onPress={() => setSelectedDocument(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                onPress={() => handleDownload(selectedDocument)}
                startContent={<Download className="w-4 h-4" />}
              >
                Download
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* Upload Modal */}
      <Modal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} size="lg">
        <ModalContent>
          <ModalHeader>
            <div className="flex items-center justify-between w-full">
              <h3 className="text-lg font-semibold">Upload Document</h3>
              <Button variant="secondary" isIconOnly onPress={() => setIsUploadModalOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <CustomFileInput
                label="Select Document"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                onChange={file => {
                  if (file) {
                    // Handle file upload
                  }
                }}
                onBlur={() => {}}
                name="document"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option value="legal">Legal</option>
                  <option value="financial">Financial</option>
                  <option value="operational">Operational</option>
                  <option value="regulatory">Regulatory</option>
                  <option value="closing">Closing</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  placeholder="e.g., Purchase Agreement, Financial Statements"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Required by</label>
                <input
                  type="text"
                  placeholder="e.g., lawyer-1, buyer-1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onPress={() => setIsUploadModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onPress={() => {
                // Handle upload
                setIsUploadModalOpen(false);
              }}
            >
              Upload Document
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export { DocumentManagement };
