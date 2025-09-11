import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Progress,
  Chip,
} from '@heroui/react';
import {
  Upload,
  FileText,
  FolderOpen,
  Download,
  Trash2,
  Search,
  Filter,
  Lock,
  Shield,
  Eye,
  Calendar,
  FileCheck,
  AlertCircle,
  Plus,
  Grid3X3,
  List,
} from 'lucide-react';
import { authService } from '../../services/users/authenticationService';
import { User as UserType } from '../../../types/user.consolidated';
import Navigation from '../../../app/components/navigation/Navigation';
import SellerSidebar from '../../components/navigation/SellerSidebar';

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

interface StorageInfo {
  used: number;
  total: number;
  percentage: number;
  tier: 'basic' | 'professional' | 'premium';
}

const DocumentVault = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  // Loading states removed for smooth UX
  const [isUploading, setIsUploading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  // Document management
  const [documents, setDocuments] = useState<DocumentFile[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<DocumentFile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [storageInfo, setStorageInfo] = useState<StorageInfo>({
    used: 0,
    total: 5 * 1024 * 1024 * 1024, // 5GB in bytes
    percentage: 0,
    tier: 'professional',
  });

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
      color: 'bg-blue-100 text-blue-800',
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
        console.error('Error initializing page:', error);
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
    setFilteredDocuments(mockDocs);

    // Calculate storage usage
    const totalUsed = mockDocs.reduce((sum, doc) => sum + doc.size, 0);
    setStorageInfo(prev => ({
      ...prev,
      used: totalUsed,
      percentage: (totalUsed / prev.total) * 100,
    }));
  };

  // Filter documents based on category and search
  useEffect(() => {
    let filtered = documents;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(doc => doc.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        doc =>
          doc.name.toLowerCase().includes(query) ||
          doc.description?.toLowerCase().includes(query) ||
          doc.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setFilteredDocuments(filtered);
  }, [documents, selectedCategory, searchQuery]);

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

      // Update storage usage
      const additionalSize = newDocuments.reduce((sum, doc) => sum + doc.size, 0);
      setStorageInfo(prev => ({
        ...prev,
        used: prev.used + additionalSize,
        percentage: ((prev.used + additionalSize) / prev.total) * 100,
      }));
    } catch (error) {
      console.error('Upload failed:', error);
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
      <Navigation />

      <div className="flex">
        <SellerSidebar selectedTab="documents" userRole={user?.role as any} />

        <div className="flex-1 px-8 py-8">
          <div className="max-w-7xl mx-auto">
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
                  <div className="flex items-center space-x-1 border border-gray-300 rounded-lg p-1">
                    <Button
                      variant={viewMode === 'list' ? 'solid' : 'light'}
                      isIconOnly
                      size="sm"
                      onPress={() => setViewMode('list')}
                      className={
                        viewMode === 'list'
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }
                    >
                      <List className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'grid' ? 'solid' : 'light'}
                      isIconOnly
                      size="sm"
                      onPress={() => setViewMode('grid')}
                      className={
                        viewMode === 'grid'
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                  </div>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                  />
                  <Button
                    color="primary"
                    startContent={<Upload className="w-4 h-4" />}
                    onPress={() => document.getElementById('file-upload')?.click()}
                    isLoading={isUploading}
                  >
                    {isUploading ? 'Uploading...' : 'Upload Documents'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Storage Overview */}
            <Card className="mb-8 border border-gray-200 shadow-sm">
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Storage</h3>
                    <p className="text-sm text-gray-500">
                      Professional Plan • Bank-grade encryption
                    </p>
                  </div>
                  <div className="px-3 py-1 bg-gray-100 rounded-full">
                    <span className="text-xs font-medium text-gray-700">
                      {storageInfo.tier.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-3">
                    <span>{formatFileSize(storageInfo.used)} used</span>
                    <span>{formatFileSize(storageInfo.total)} total</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gray-900 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(storageInfo.percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {storageInfo.percentage > 80 && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <p className="text-sm text-gray-700">
                      Storage is {storageInfo.percentage.toFixed(0)}% full. Consider upgrading to
                      Premium for unlimited storage.
                    </p>
                  </div>
                )}
              </CardBody>
            </Card>

            {/* Search and Filters */}
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Left: Search */}
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search documents..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                {/* Right: Filters */}
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={e => setSelectedCategory(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Categories</option>
                      {Object.entries(documentCategories).map(([key, category]) => (
                        <option key={key} value={key}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>

                  <Button
                    variant="bordered"
                    className="border-gray-300 text-gray-600 hover:bg-gray-50"
                    startContent={<Calendar className="w-4 h-4" />}
                  >
                    Date Range
                  </Button>
                </div>
              </div>
            </div>

            {/* Category Overview */}
            <div className="grid md:grid-cols-5 gap-3 mb-8">
              {Object.entries(documentCategories).map(([key, category]) => {
                const count = documents.filter(doc => doc.category === key).length;
                const isSelected = selectedCategory === key;
                return (
                  <div
                    key={key}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm ${
                      isSelected
                        ? 'border-gray-900 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedCategory(selectedCategory === key ? 'all' : key)}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{category.icon}</div>
                      <h3 className="font-medium text-gray-900 mb-1">{category.name}</h3>
                      <p className="text-xs text-gray-500 mb-2">{category.description}</p>
                      <div className="text-sm text-gray-700 font-medium">
                        {count} file{count !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Documents List/Grid */}
            {filteredDocuments.length === 0 ? (
              <Card className="border border-gray-200 shadow-sm">
                <CardBody className="text-center py-16">
                  <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {documents.length === 0 ? 'No Documents Yet' : 'No Documents Found'}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {documents.length === 0
                      ? 'Upload your first document to get started with your secure vault'
                      : 'Try adjusting your search criteria or category filter'}
                  </p>
                  {documents.length === 0 && (
                    <Button
                      color="primary"
                      startContent={<Plus className="w-4 h-4" />}
                      onPress={() => document.getElementById('file-upload')?.click()}
                    >
                      Upload First Document
                    </Button>
                  )}
                </CardBody>
              </Card>
            ) : (
              <div
                className={
                  viewMode === 'grid' ? 'grid md:grid-cols-4 lg:grid-cols-5 gap-4' : 'space-y-2'
                }
              >
                {filteredDocuments.map(doc => (
                  <div
                    key={doc.id}
                    className={`border border-gray-200 rounded-lg hover:shadow-sm hover:border-gray-300 transition-all cursor-pointer ${
                      viewMode === 'grid' ? 'p-4 text-center' : 'p-4'
                    }`}
                  >
                    {viewMode === 'grid' ? (
                      // Grid View
                      <>
                        <div className="text-3xl mb-3">{getFileIcon(doc.type, doc.category)}</div>
                        <h3
                          className="font-medium text-sm text-gray-900 mb-2 truncate"
                          title={doc.name}
                        >
                          {doc.name}
                        </h3>
                        <div className="flex items-center justify-center space-x-1 mb-2">
                          <span className="text-xs text-gray-500">{formatFileSize(doc.size)}</span>
                          {doc.isEncrypted && <Lock className="w-3 h-3 text-gray-500" />}
                        </div>
                        <div className="text-xs text-gray-500">
                          {doc.uploadDate.toLocaleDateString()}
                        </div>
                      </>
                    ) : (
                      // List View
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
                              <span className="text-xs text-gray-500">
                                {formatFileSize(doc.size)}
                              </span>
                              <span className="text-xs text-gray-500">
                                {doc.uploadDate.toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 ml-4">
                          <Button
                            variant="light"
                            isIconOnly
                            size="sm"
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="light"
                            isIconOnly
                            size="sm"
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="light"
                            isIconOnly
                            size="sm"
                            className="text-gray-500 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Security Notice */}
            <Card className="mt-8 border border-gray-200 shadow-sm">
              <CardBody className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Enterprise-Grade Security
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-2">
                        <FileCheck className="w-4 h-4 text-gray-500" />
                        <span>256-bit AES encryption</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Lock className="w-4 h-4 text-gray-500" />
                        <span>EU data residency</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-gray-500" />
                        <span>SOC 2 compliant</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Your documents are encrypted before upload and stored on secure EU servers.
                      Access is logged and monitored for your protection.
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentVault;
