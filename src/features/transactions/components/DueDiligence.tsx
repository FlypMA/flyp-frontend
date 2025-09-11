import { useState, useEffect } from 'react';
import { Card, CardBody, Button, Chip, Select, SelectItem, Tabs, Tab } from '@heroui/react';
// TODO: Create or import ModernTabs component
// import { ModernTabs, ModernTabContent } from '../../../shared/components/ui/Tabs';
import {
  FileText,
  MessageSquare,
  CheckCircle,
  Upload,
  Download,
  Eye,
  Send,
  Shield,
  BarChart3,
} from 'lucide-react';
// TODO: Create AnimatedInput, AnimatedTextarea components
// import { AnimatedInput, AnimatedTextarea } from '../../../shared/components/ui';

interface DueDiligenceDocument {
  id: string;
  name: string;
  category: string;
  uploadedBy: string;
  uploadedAt: string;
  size: string;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  comments: Comment[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  documentId?: string;
}

interface ChecklistItem {
  id: string;
  category: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'not_applicable';
  assignedTo: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

interface DueDiligencePlatformProps {
  listingId: string;
  buyerId: string;
  sellerId: string;
}

const DueDiligencePlatform: React.FC<DueDiligencePlatformProps> = ({
  listingId,
  buyerId,
  sellerId,
}) => {
  const [activeTab, setActiveTab] = useState('documents');
  const [documents, setDocuments] = useState<DueDiligenceDocument[]>([]);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [messages, setMessages] = useState<Comment[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<DueDiligenceDocument | null>(null);
  const [uploading, setUploading] = useState(false);

  // Define tabs for the new ModernTabs component
  const dueDiligenceTabs = [
    {
      id: 'documents',
      label: 'Documents',
      icon: <FileText className="w-4 h-4" />,
      badge: documents.length > 0 ? documents.length.toString() : undefined,
    },
    {
      id: 'checklist',
      label: 'Checklist',
      icon: <CheckCircle className="w-4 h-4" />,
      badge:
        checklist.filter((item: any) => item.completed).length > 0
          ? `${checklist.filter((item: any) => item.completed).length}/${checklist.length}`
          : undefined,
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: <MessageSquare className="w-4 h-4" />,
      badge: messages.length > 0 ? messages.length.toString() : undefined,
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 className="w-4 h-4" />,
    },
  ];

  const documentCategories = [
    'Financial',
    'Legal',
    'Operational',
    'Marketing',
    'HR',
    'Technology',
    'Other',
  ];

  const checklistCategories = [
    'Financial Due Diligence',
    'Legal Due Diligence',
    'Operational Due Diligence',
    'Commercial Due Diligence',
    'Technical Due Diligence',
    'HR Due Diligence',
  ];

  // Mock data initialization
  useEffect(() => {
    // Initialize with sample documents
    setDocuments([
      {
        id: '1',
        name: 'Financial Statements 2023.pdf',
        category: 'Financial',
        uploadedBy: 'Seller',
        uploadedAt: '2024-01-15',
        size: '2.3 MB',
        status: 'reviewed',
        comments: [],
      },
      {
        id: '2',
        name: 'Tax Returns 2022-2023.pdf',
        category: 'Financial',
        uploadedBy: 'Seller',
        uploadedAt: '2024-01-15',
        size: '1.8 MB',
        status: 'pending',
        comments: [],
      },
      {
        id: '3',
        name: 'Customer Contracts.pdf',
        category: 'Legal',
        uploadedBy: 'Seller',
        uploadedAt: '2024-01-16',
        size: '3.1 MB',
        status: 'approved',
        comments: [],
      },
    ]);

    // Initialize checklist
    setChecklist([
      {
        id: '1',
        category: 'Financial Due Diligence',
        title: 'Review Financial Statements',
        description: 'Analyze P&L, balance sheet, and cash flow statements',
        status: 'completed',
        assignedTo: 'Buyer',
        dueDate: '2024-01-20',
        priority: 'high',
      },
      {
        id: '2',
        category: 'Financial Due Diligence',
        title: 'Tax Compliance Review',
        description: 'Verify tax compliance and identify any issues',
        status: 'in_progress',
        assignedTo: 'Buyer',
        dueDate: '2024-01-25',
        priority: 'high',
      },
      {
        id: '3',
        category: 'Legal Due Diligence',
        title: 'Contract Review',
        description: 'Review all customer and vendor contracts',
        status: 'pending',
        assignedTo: 'Buyer',
        dueDate: '2024-01-30',
        priority: 'medium',
      },
    ]);

    // Initialize messages
    setMessages([
      {
        id: '1',
        author: 'Buyer',
        content:
          'Thank you for providing the financial statements. I have a few questions about the revenue recognition policies.',
        timestamp: '2024-01-15T10:30:00Z',
      },
      {
        id: '2',
        author: 'Seller',
        content:
          "I'll provide additional documentation on our revenue recognition policies by tomorrow.",
        timestamp: '2024-01-15T14:20:00Z',
      },
    ]);
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setUploading(true);
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newDocuments: DueDiligenceDocument[] = Array.from(files).map((file, index) => ({
        id: Date.now().toString() + index,
        name: file.name,
        category: 'Other',
        uploadedBy: 'Seller',
        uploadedAt: new Date().toISOString().split('T')[0],
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        status: 'pending',
        comments: [],
      }));

      setDocuments(prev => [...prev, ...newDocuments]);
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Comment = {
      id: Date.now().toString(),
      author: 'Buyer',
      content: newMessage,
      timestamp: new Date().toISOString(),
      documentId: selectedDocument?.id,
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const updateChecklistStatus = (itemId: string, status: ChecklistItem['status']) => {
    setChecklist(prev => prev.map(item => (item.id === itemId ? { ...item, status } : item)));
  };

  const getProgressPercentage = () => {
    const completed = checklist.filter(item => item.status === 'completed').length;
    return Math.round((completed / checklist.length) * 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'warning';
      case 'pending':
        return 'default';
      case 'not_applicable':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Due Diligence Platform</h1>
          <p className="text-neutral-600">
            Secure document sharing and collaboration for transaction completion
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Chip color="primary" variant="flat">
            <Shield className="w-4 h-4 mr-1" />
            Secure Environment
          </Chip>
          <Progress
            value={getProgressPercentage()}
            color="primary"
            className="w-32"
            showValueLabel
          />
        </div>
      </div>

      {/* Main Content - Modern Implementation */}
      <ModernTabs
        tabs={dueDiligenceTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        variant="pills"
        size="md"
        className="w-full"
      >
        <div className="mt-6">
          <ModernTabContent tabId="documents">
            <Card>
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-neutral-900">Document Room</h2>
                  <div className="flex gap-3">
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      id="document-upload"
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                    />
                    <label htmlFor="document-upload">
                      <Button
                        color="primary"
                        startContent={<Upload className="w-4 h-4" />}
                        isLoading={uploading}
                        className="cursor-pointer"
                      >
                        Upload Documents
                      </Button>
                    </label>
                  </div>
                </div>

                {/* Document Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {documentCategories.map(category => {
                    const categoryDocs = documents.filter(doc => doc.category === category);
                    return (
                      <Card key={category} className="border border-neutral-200">
                        <CardBody className="p-4">
                          <h3 className="font-medium text-neutral-900 mb-3">{category}</h3>
                          <div className="space-y-2">
                            {categoryDocs.map(doc => (
                              <div
                                key={doc.id}
                                className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-50 cursor-pointer"
                                onClick={() => setSelectedDocument(doc)}
                              >
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-neutral-900 truncate">
                                    {doc.name}
                                  </p>
                                  <p className="text-xs text-neutral-500">
                                    {doc.uploadedBy} • {doc.uploadedAt} • {doc.size}
                                  </p>
                                </div>
                                <Chip size="sm" color={getStatusColor(doc.status)}>
                                  {doc.status}
                                </Chip>
                              </div>
                            ))}
                            {categoryDocs.length === 0 && (
                              <p className="text-sm text-neutral-500 italic">No documents</p>
                            )}
                          </div>
                        </CardBody>
                      </Card>
                    );
                  })}
                </div>

                {/* Document Details Modal */}
                {selectedDocument && (
                  <Card className="mt-6 border border-neutral-200">
                    <CardBody className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-neutral-900">
                          {selectedDocument.name}
                        </h3>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="bordered"
                            startContent={<Eye className="w-4 h-4" />}
                          >
                            Preview
                          </Button>
                          <Button
                            size="sm"
                            variant="bordered"
                            startContent={<Download className="w-4 h-4" />}
                          >
                            Download
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                        <div>
                          <span className="font-medium text-neutral-700">Category:</span>
                          <p className="text-neutral-900">{selectedDocument.category}</p>
                        </div>
                        <div>
                          <span className="font-medium text-neutral-700">Uploaded by:</span>
                          <p className="text-neutral-900">{selectedDocument.uploadedBy}</p>
                        </div>
                        <div>
                          <span className="font-medium text-neutral-700">Date:</span>
                          <p className="text-neutral-900">{selectedDocument.uploadedAt}</p>
                        </div>
                        <div>
                          <span className="font-medium text-neutral-700">Size:</span>
                          <p className="text-neutral-900">{selectedDocument.size}</p>
                        </div>
                      </div>

                      {/* Document Comments */}
                      <div className="border-t border-neutral-200 pt-4">
                        <h4 className="font-medium text-neutral-900 mb-3">Comments</h4>
                        <div className="space-y-3 mb-4">
                          {selectedDocument.comments.map(comment => (
                            <div key={comment.id} className="bg-neutral-50 p-3 rounded-lg">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-sm text-neutral-900">
                                  {comment.author}
                                </span>
                                <span className="text-xs text-neutral-500">
                                  {comment.timestamp}
                                </span>
                              </div>
                              <p className="text-sm text-neutral-700">{comment.content}</p>
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <AnimatedInput
                            label="Add comment"
                            placeholder="Type your comment..."
                            value={newMessage}
                            onChange={value => setNewMessage(value)}
                            name="comment"
                            className="flex-1"
                          />
                          <Button
                            color="primary"
                            onPress={handleSendMessage}
                            startContent={<Send className="w-4 h-4" />}
                          >
                            Send
                          </Button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                )}
              </CardBody>
            </Card>
          </ModernTabContent>

          <ModernTabContent tabId="checklist">
            <Card>
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-neutral-900">
                    Due Diligence Checklist
                  </h2>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-neutral-600">
                      {checklist.filter(item => item.status === 'completed').length} of{' '}
                      {checklist.length} completed
                    </span>
                    <Progress
                      value={getProgressPercentage()}
                      color="primary"
                      className="w-32"
                      showValueLabel
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  {checklistCategories.map(category => {
                    const categoryItems = checklist.filter(item => item.category === category);
                    return (
                      <Card key={category} className="border border-neutral-200">
                        <CardBody className="p-6">
                          <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                            {category}
                          </h3>
                          <div className="space-y-4">
                            {categoryItems.map(item => (
                              <div
                                key={item.id}
                                className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg"
                              >
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <h4 className="font-medium text-neutral-900">{item.title}</h4>
                                    <Chip size="sm" color={getPriorityColor(item.priority)}>
                                      {item.priority}
                                    </Chip>
                                  </div>
                                  <p className="text-sm text-neutral-600 mb-2">
                                    {item.description}
                                  </p>
                                  <div className="flex items-center gap-4 text-xs text-neutral-500">
                                    <span>Assigned to: {item.assignedTo}</span>
                                    <span>Due: {item.dueDate}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Select
                                    size="sm"
                                    value={item.status}
                                    onSelectionChange={keys =>
                                      updateChecklistStatus(
                                        item.id,
                                        Array.from(keys)[0] as ChecklistItem['status']
                                      )
                                    }
                                    className="w-32"
                                  >
                                    <SelectItem key="pending">Pending</SelectItem>
                                    <SelectItem key="in_progress">In Progress</SelectItem>
                                    <SelectItem key="completed">Completed</SelectItem>
                                    <SelectItem key="not_applicable">N/A</SelectItem>
                                  </Select>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardBody>
                      </Card>
                    );
                  })}
                </div>
              </CardBody>
            </Card>
          </ModernTabContent>

          <ModernTabContent tabId="messages">
            <Card>
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-neutral-900">Communication</h2>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-neutral-500" />
                    <span className="text-sm text-neutral-600">Buyer • Seller</span>
                  </div>
                </div>

                {/* Messages */}
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {messages.map(message => (
                    <div key={message.id} className="flex gap-3">
                      <div
                        className={`flex-1 p-4 rounded-lg ${
                          message.author === 'Buyer'
                            ? 'bg-blue-50 border border-blue-200'
                            : 'bg-neutral-50 border border-neutral-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm text-neutral-900">
                            {message.author}
                          </span>
                          <span className="text-xs text-neutral-500">{message.timestamp}</span>
                        </div>
                        <p className="text-sm text-neutral-700">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* New Message */}
                <div className="flex gap-3">
                  <AnimatedTextarea
                    label="Type your message"
                    placeholder="Enter your message..."
                    value={newMessage}
                    onChange={value => setNewMessage(value)}
                    name="message"
                    className="flex-1"
                  />
                  <Button
                    color="primary"
                    onPress={handleSendMessage}
                    startContent={<Send className="w-4 h-4" />}
                    className="self-end"
                  >
                    Send
                  </Button>
                </div>
              </CardBody>
            </Card>
          </ModernTabContent>

          <ModernTabContent tabId="analytics">
            <Card>
              <CardBody className="p-6">
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                  Due Diligence Analytics
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border border-neutral-200">
                    <CardBody className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary-600 mb-2">
                        {documents.length}
                      </div>
                      <div className="text-sm text-neutral-600">Documents Uploaded</div>
                    </CardBody>
                  </Card>

                  <Card className="border border-neutral-200">
                    <CardBody className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600 mb-2">
                        {getProgressPercentage()}%
                      </div>
                      <div className="text-sm text-neutral-600">Checklist Complete</div>
                    </CardBody>
                  </Card>

                  <Card className="border border-neutral-200">
                    <CardBody className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{messages.length}</div>
                      <div className="text-sm text-neutral-600">Messages Exchanged</div>
                    </CardBody>
                  </Card>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                      <Upload className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-neutral-700">
                        Financial statements uploaded
                      </span>
                      <span className="text-xs text-neutral-500 ml-auto">2 hours ago</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-neutral-700">Financial review completed</span>
                      <span className="text-xs text-neutral-500 ml-auto">1 day ago</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                      <MessageSquare className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-neutral-700">New message from buyer</span>
                      <span className="text-xs text-neutral-500 ml-auto">2 days ago</span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </ModernTabContent>
        </div>
      </ModernTabs>
    </div>
  );
};

export default DueDiligencePlatform;
