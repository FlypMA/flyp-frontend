import { Button } from '@/shared/components/buttons';
import { authService } from '@/shared/services/auth';
import { User as UserType } from '@/shared/types';
import { Card, CardBody } from '@heroui/react';
import { Download, Eye, FolderOpen, Lock, Plus, Trash2, Upload } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Navigation and sidebar are provided by DashboardLayout

interface DocumentFile {
  id: string;
  name: string;
  size: number;
  category: 'financial' | 'legal' | 'operations' | 'marketing' | 'other';
  uploadDate: Date;
  lastModified: Date;
  type: string;
  description?: string;
  tags: string[];
  isEncrypted: boolean;
  version: number;
  status: 'active' | 'archived' | 'draft';
}

const DocumentVault = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  // Loading states removed for smooth UX
  const [isUploading, setIsUploading] = useState(false);

  // Document management
  const [documents, setDocuments] = useState<DocumentFile[]>([]);

  // Categories configuration
  const documentCategories = {
    financial: {
      name: 'Financial',
      description: 'Financial statements, tax returns, bank statements',
      color: 'bg-green-100 text-green-800',
      icon: '💰',
    },
    legal: {
      name: 'Legal',
      description: 'Contracts, licenses, incorporation docs, leases',
      color: 'bg-primary-100 text-primary-800',
      icon: '⚖️',
    },
    operations: {
      name: 'Operations',
      description: 'Processes, SOPs, employee handbook, policies',
      color: 'bg-purple-100 text-purple-800',
      icon: '⚙️',
    },
    marketing: {
      name: 'Marketing',
      description: 'Brand assets, marketing materials, customer data',
      color: 'bg-pink-100 text-pink-800',
      icon: '📈',
    },
    other: {
      name: 'Other',
      description: 'Insurance, certifications, miscellaneous',
      color: 'bg-gray-100 text-gray-800',
      icon: '📁',
    },
  };

  useEffect(() => {
    const initializePage = async () => {
      // Instant data loading - no loading state
      try {
        const authResult = await authService.checkAuthentication();
        if (authResult.isAuthenticated && authResult.user) {
          setUser(authResult.user);

          // Load mock documents for demo
          loadMockDocuments();
        } else {
          navigate('/');
        }
      } catch (error) {
        // TODO: Add proper error handling
        navigate('/');
      } finally {
        // No loading state to manage
      }
    };

    initializePage();
  }, [navigate]);

  const loadMockDocuments = () => {
    const mockDocs: DocumentFile[] = [
      {
        id: '1',
        name: 'Financial_Statements_2023.pdf',
        size: 2.4 * 1024 * 1024, // 2.4MB
        category: 'financial',
        uploadDate: new Date('2024-01-15'),
        lastModified: new Date('2024-01-15'),
        type: 'application/pdf',
        description: 'Annual financial statements for 2023',
        tags: ['2023', 'annual', 'statements'],
        isEncrypted: true,
        version: 1,
        status: 'active',
      },
      {
        id: '2',
        name: 'Business_License.pdf',
        size: 890 * 1024, // 890KB
        category: 'legal',
        uploadDate: new Date('2024-01-10'),
        lastModified: new Date('2024-01-10'),
        type: 'application/pdf',
        description: 'Food service business license - expires 2025',
        tags: ['license', 'legal', '2025'],
        isEncrypted: true,
        version: 2,
        status: 'active',
      },
      {
        id: '3',
        name: 'Employee_Handbook_v2.docx',
        size: 1.1 * 1024 * 1024, // 1.1MB
        category: 'operations',
        uploadDate: new Date('2024-01-08'),
        lastModified: new Date('2024-01-12'),
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        description: 'Updated employee handbook with new policies',
        tags: ['employees', 'policies', 'handbook'],
        isEncrypted: false,
        version: 2,
        status: 'active',
      },
      {
        id: '4',
        name: 'Lease_Agreement_2024.pdf',
        size: 3.2 * 1024 * 1024, // 3.2MB
        category: 'legal',
        uploadDate: new Date('2024-01-05'),
        lastModified: new Date('2024-01-05'),
        type: 'application/pdf',
        description: '5-year lease renewal agreement',
        tags: ['lease', 'real-estate', '2024-2029'],
        isEncrypted: true,
        version: 1,
        status: 'active',
      },
      {
        id: '5',
        name: 'Tax_Returns_2022.pdf',
        size: 1.8 * 1024 * 1024, // 1.8MB
        category: 'financial',
        uploadDate: new Date('2023-12-20'),
        lastModified: new Date('2023-12-20'),
        type: 'application/pdf',
        description: 'Corporate tax returns for 2022',
        tags: ['taxes', '2022', 'corporate'],
        isEncrypted: true,
        version: 1,
        status: 'archived',
      },
      {
        id: '6',
        name: 'Brand_Guidelines.pdf',
        size: 4.5 * 1024 * 1024, // 4.5MB
        category: 'marketing',
        uploadDate: new Date('2023-11-15'),
        lastModified: new Date('2023-11-15'),
        type: 'application/pdf',
        description: 'Logo usage, colors, fonts, and brand standards',
        tags: ['brand', 'design', 'guidelines'],
        isEncrypted: false,
        version: 1,
        status: 'active',
      },
    ];

    setDocuments(mockDocs);
  };

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);

    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newDocuments: DocumentFile[] = Array.from(files).map(file => ({
        id: `${Date.now()}-${Math.random()}`,
        name: file.name,
        size: file.size,
        category: 'other', // Default category
        uploadDate: new Date(),
        lastModified: new Date(file.lastModified),
        type: file.type,
        description: `Uploaded ${file.name}`,
        tags: [],
        isEncrypted: true,
        version: 1,
        status: 'active' as const,
      }));

      setDocuments(prev => [...newDocuments, ...prev]);
    } catch (error) {
      // TODO: Add proper error handling
    } finally {
      setIsUploading(false);
      // Reset the input
      event.target.value = '';
    }
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string, category: string) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('word') || type.includes('document')) return '📝';
    if (type.includes('excel') || type.includes('spreadsheet')) return '📊';
    if (type.includes('image')) return '🖼️';
    return documentCategories[category as keyof typeof documentCategories]?.icon || '📁';
  };

  // Loading screens removed for smooth UX

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">Please log in to access your document vault.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">Document Vault</h1>
              <p className="text-lg text-gray-600">
                Store and organize your important business documents securely
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
              />
              <Button
                variant="primary"
                startContent={<Upload className="w-4 h-4" />}
                onPress={() => document.getElementById('file-upload')?.click()}
                isLoading={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Upload Documents'}
              </Button>
            </div>
          </div>
        </div>

        {/* Documents List */}
        {documents.length === 0 ? (
          <Card className="border border-gray-200 shadow-sm">
            <CardBody className="text-center py-16">
              <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Documents Yet</h3>
              <p className="text-gray-600 mb-6">
                Upload your first document to get started with your secure vault
              </p>
              <Button
                variant="primary"
                startContent={<Plus className="w-4 h-4" />}
                onPress={() => document.getElementById('file-upload')?.click()}
              >
                Upload First Document
              </Button>
            </CardBody>
          </Card>
        ) : (
          <div className="space-y-2">
            {documents.map(doc => (
              <div
                key={doc.id}
                className="border border-gray-200 rounded-lg hover:shadow-sm hover:border-gray-300 transition-all cursor-pointer p-4"
              >
                {/* List View */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="text-2xl">{getFileIcon(doc.type, doc.category)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-gray-900 truncate">{doc.name}</h3>
                        {doc.isEncrypted && <Lock className="w-4 h-4 text-gray-500" />}
                        {doc.version > 1 && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            v{doc.version}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 truncate">{doc.description}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-500">
                          {documentCategories[doc.category].name}
                        </span>
                        <span className="text-xs text-gray-500">{formatFileSize(doc.size)}</span>
                        <span className="text-xs text-gray-500">
                          {doc.uploadDate.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 ml-4">
                    <Button
                      variant="tertiary"
                      isIconOnly
                      size="sm"
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="tertiary"
                      isIconOnly
                      size="sm"
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="tertiary"
                      isIconOnly
                      size="sm"
                      className="text-gray-500 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentVault;
