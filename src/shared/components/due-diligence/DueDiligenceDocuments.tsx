/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Due Diligence Documents
 * Location: src/shared/components/due-diligence/DueDiligenceDocuments.tsx
 * Purpose: Document management for due diligence process
 */

import { Button } from '@/shared/components/buttons';
import { CustomFileInput } from '@/shared/components/forms';
import { DueDiligenceDocument } from '@/shared/types/due-diligence';
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

interface DueDiligenceDocumentsProps {
  processId: string;
  userRole: 'buyer' | 'seller' | 'advisor';
}

const DueDiligenceDocuments: React.FC<DueDiligenceDocumentsProps> = ({ processId, userRole }) => {
  const [documents, setDocuments] = useState<DueDiligenceDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDocument, setSelectedDocument] = useState<DueDiligenceDocument | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const categories = [
    { value: 'all', label: 'All Documents' },
    { value: 'financial', label: 'Financial' },
    { value: 'legal', label: 'Legal' },
    { value: 'operational', label: 'Operational' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'technical', label: 'Technical' },
    { value: 'hr', label: 'HR' },
    { value: 'other', label: 'Other' },
  ];

  useEffect(() => {
    loadDocuments();
  }, [processId]);

  const loadDocuments = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await dueDiligenceService.getDocuments(processId);
      // setDocuments(response.data);

      // Mock data for now
      const mockDocuments: DueDiligenceDocument[] = [
        {
          id: 'doc-1',
          processId,
          name: 'Financial Statements 2023.pdf',
          description: 'Audited financial statements for the year 2023',
          category: 'financial',
          type: 'financial',
          fileType: 'pdf',
          size: 2457600, // 2.4 MB
          uploadedBy: 'seller-1',
          uploadedAt: '2024-01-15T10:30:00Z',
          status: 'approved',
          version: 1,
          isLatest: true,
          downloadUrl: '/api/documents/doc-1/download',
          previewUrl: '/api/documents/doc-1/preview',
          tags: ['audited', '2023', 'statements'],
          comments: [],
          accessLevel: 'both',
        },
        {
          id: 'doc-2',
          processId,
          name: 'Customer Contracts.pdf',
          description: 'Key customer contracts and agreements',
          category: 'legal',
          type: 'legal',
          fileType: 'pdf',
          size: 1843200, // 1.8 MB
          uploadedBy: 'seller-1',
          uploadedAt: '2024-01-14T14:15:00Z',
          status: 'reviewed',
          version: 1,
          isLatest: true,
          downloadUrl: '/api/documents/doc-2/download',
          previewUrl: '/api/documents/doc-2/preview',
          tags: ['contracts', 'customers'],
          comments: [],
          accessLevel: 'both',
        },
        {
          id: 'doc-3',
          processId,
          name: 'Cash Flow Analysis.xlsx',
          description: 'Monthly cash flow analysis and projections',
          category: 'financial',
          type: 'financial',
          fileType: 'xlsx',
          size: 512000, // 512 KB
          uploadedBy: 'seller-1',
          uploadedAt: '2024-01-16T09:45:00Z',
          status: 'pending',
          version: 1,
          isLatest: true,
          downloadUrl: '/api/documents/doc-3/download',
          tags: ['cash-flow', 'analysis', 'projections'],
          comments: [],
          accessLevel: 'buyer',
        },
        {
          id: 'doc-4',
          processId,
          name: 'Organization Chart.pdf',
          description: 'Current organizational structure and reporting lines',
          category: 'operational',
          type: 'operational',
          fileType: 'pdf',
          size: 256000, // 256 KB
          uploadedBy: 'seller-1',
          uploadedAt: '2024-01-17T11:20:00Z',
          status: 'reviewed',
          version: 1,
          isLatest: true,
          downloadUrl: '/api/documents/doc-4/download',
          previewUrl: '/api/documents/doc-4/preview',
          tags: ['organization', 'structure'],
          comments: [],
          accessLevel: 'both',
        },
      ];

      setDocuments(mockDocuments);
    } catch (error) {
      // TODO: Add proper error handling
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file: File, category: string, description?: string) => {
    setUploading(true);
    try {
      // TODO: Replace with actual API call
      // await dueDiligenceService.uploadDocument(processId, file, category, description);

      // Mock upload success
      const newDocument: DueDiligenceDocument = {
        id: `doc-${Date.now()}`,
        processId,
        name: file.name,
        description: description || '',
        category,
        type: category as any,
        fileType: file.name.split('.').pop() || '',
        size: file.size,
        uploadedBy: userRole === 'buyer' ? 'buyer-1' : 'seller-1',
        uploadedAt: new Date().toISOString(),
        status: 'pending',
        version: 1,
        isLatest: true,
        downloadUrl: `/api/documents/doc-${Date.now()}/download`,
        tags: [],
        comments: [],
        accessLevel: userRole === 'buyer' ? 'buyer' : 'both',
      };

      setDocuments(prev => [newDocument, ...prev]);
      setIsUploadModalOpen(false);
    } catch (error) {
      // TODO: Add proper error handling
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (doc: DueDiligenceDocument) => {
    try {
      // TODO: Replace with actual API call
      // await dueDiligenceService.downloadDocument(doc.id);

      // Mock download
      const link = document.createElement('a');
      link.href = doc.downloadUrl;
      link.download = doc.name;
      link.click();
    } catch (error) {
      // TODO: Add proper error handling
    }
  };

  const handleView = (doc: DueDiligenceDocument) => {
    setSelectedDocument(doc);
    setIsViewModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'reviewed':
        return 'primary';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'danger';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return '✓';
      case 'reviewed':
        return '👁';
      case 'pending':
        return '⏳';
      case 'rejected':
        return '✗';
      default:
        return '?';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Documents ({documents.length})</h3>
          <p className="text-sm text-gray-600">Manage and review due diligence documents</p>
        </div>
        <Button
          variant="primary"
          onPress={() => setIsUploadModalOpen(true)}
          startContent={<Upload className="w-4 h-4" />}
        >
          Upload Document
        </Button>
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
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="md:w-48">
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Documents List */}
      <Card>
        <CardBody>
          <div className="space-y-3">
            {filteredDocuments.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No documents found</h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery || selectedCategory !== 'all'
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Upload your first document to get started.'}
                </p>
                {!searchQuery && selectedCategory === 'all' && (
                  <Button
                    variant="primary"
                    onPress={() => setIsUploadModalOpen(true)}
                    startContent={<Upload className="w-4 h-4" />}
                  >
                    Upload Document
                  </Button>
                )}
              </div>
            ) : (
              filteredDocuments.map(doc => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <FileText className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">{doc.name}</h4>
                        {doc.isLatest && (
                          <Chip size="sm" color="primary" variant="flat">
                            Latest
                          </Chip>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        {doc.description || 'No description provided'}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{formatFileSize(doc.size)}</span>
                        <span>•</span>
                        <span>{doc.category}</span>
                        <span>•</span>
                        <span>Uploaded by {doc.uploadedBy}</span>
                        <span>•</span>
                        <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Chip
                      size="sm"
                      color={getStatusColor(doc.status)}
                      variant="flat"
                      startContent={getStatusIcon(doc.status)}
                    >
                      {doc.status}
                    </Chip>
                    <div className="flex items-center gap-1">
                      {doc.previewUrl && (
                        <Button
                          size="sm"
                          variant="secondary"
                          isIconOnly
                          onPress={() => handleView(doc)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="secondary"
                        isIconOnly
                        onPress={() => handleDownload(doc)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary" isIconOnly>
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardBody>
      </Card>

      {/* Upload Modal */}
      <Modal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} size="2xl">
        <ModalContent>
          <ModalHeader>
            <h3 className="text-lg font-semibold">Upload Document</h3>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <CustomFileInput
                label="Select File"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png"
                onChange={file => {
                  if (file) {
                    // Handle file selection
                  }
                }}
                name="document"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  {categories.slice(1).map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={3}
                  placeholder="Brief description of the document..."
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
              isLoading={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* View Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} size="4xl">
        <ModalContent>
          <ModalHeader>
            <div className="flex items-center justify-between w-full">
              <h3 className="text-lg font-semibold">{selectedDocument?.name}</h3>
              <Button variant="secondary" isIconOnly onPress={() => setIsViewModalOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </ModalHeader>
          <ModalBody>
            {selectedDocument && (
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">
                    {selectedDocument.description || 'No description provided'}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{formatFileSize(selectedDocument.size)}</span>
                    <span>•</span>
                    <span>{selectedDocument.category}</span>
                    <span>•</span>
                    <span>Version {selectedDocument.version}</span>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-8 text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    Document preview not available for this file type.
                  </p>
                  <Button
                    variant="primary"
                    onPress={() => handleDownload(selectedDocument)}
                    startContent={<Download className="w-4 h-4" />}
                  >
                    Download Document
                  </Button>
                </div>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DueDiligenceDocuments;
