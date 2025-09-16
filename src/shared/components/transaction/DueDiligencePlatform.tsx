import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Progress,
  Chip,
  Textarea,
  Select,
  SelectItem,
} from '@heroui/react';
import { Button } from '../buttons/Button';
import Tabs from '../tabs/Tabs';
import {
  FileText,
  MessageSquare,
  CheckCircle,
  Clock,
  Upload,
  Download,
  Eye,
  EyeOff,
  Send,
  Calendar,
  Users,
  AlertTriangle,
  Shield,
  BarChart3,
} from 'lucide-react';
import { Input } from '../forms/Input';
import AnimatedTextarea from '../forms/AnimatedTextarea';

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

  // Define tabs for the new Tabs component
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
      badge: checklist.filter((item: any) => item.completed).length > 0
        ? `${checklist.filter((item: any) => item.completed).length}/${checklist.length}`
        : undefined,
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: <MessageSquare className="w-4 h-4" />,
      badge: messages.length > 0 ? messages.length.toString() : undefined,
    },
  ];

  // Mock data for demonstration
  useEffect(() => {
    // Mock documents
    setDocuments([
      {
        id: '1',
        name: 'Financial Statements 2023.pdf',
        category: 'Financial',
        uploadedBy: 'Seller',
        uploadedAt: '2024-01-15',
        size: '2.4 MB',
        status: 'reviewed',
        comments: [],
      },
      {
        id: '2',
        name: 'Customer Contracts.pdf',
        category: 'Legal',
        uploadedBy: 'Seller',
        uploadedAt: '2024-01-14',
        size: '1.8 MB',
        status: 'pending',
        comments: [],
      },
    ]);

    // Mock checklist
    setChecklist([
      {
        id: '1',
        category: 'Financial',
        title: 'Review Financial Statements',
        description: 'Analyze P&L, Balance Sheet, and Cash Flow statements',
        status: 'completed',
        assignedTo: 'Buyer',
        dueDate: '2024-01-20',
        priority: 'high',
      },
      {
        id: '2',
        category: 'Legal',
        title: 'Review Legal Documents',
        description: 'Check contracts, licenses, and legal compliance',
        status: 'in_progress',
        assignedTo: 'Buyer',
        dueDate: '2024-01-25',
        priority: 'high',
      },
    ]);

    // Mock messages
    setMessages([
      {
        id: '1',
        author: 'Buyer',
        content: 'I have reviewed the financial statements. Everything looks good.',
        timestamp: '2024-01-16T10:30:00Z',
      },
      {
        id: '2',
        author: 'Seller',
        content: 'Thank you for the feedback. I will upload the missing contracts today.',
        timestamp: '2024-01-16T14:15:00Z',
      },
    ]);
  }, []);

  const handleFileUpload = () => {
    setUploading(true);
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
    }, 2000);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Comment = {
        id: Date.now().toString(),
        author: 'Current User',
        content: newMessage,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'warning';
      case 'pending':
        return 'default';
      case 'rejected':
        return 'danger';
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
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-blue-600" />
              <div>
                <h2 className="text-2xl font-bold">Due Diligence Platform</h2>
                <p className="text-gray-600">Secure document sharing and collaboration</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Chip color="success" variant="flat">
                <Shield className="w-3 h-3 mr-1" />
                Secure
              </Chip>
              <Chip color="primary" variant="flat">
                <Users className="w-3 h-3 mr-1" />
                Private
              </Chip>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content Tabs */}
      <Tabs
        tabs={dueDiligenceTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        variant="pills"
        size="md"
        className="w-full"
      >
        <div className="mt-6">
          <Tabs.Content tabId="documents">
            <div className="space-y-6">
              {/* Upload Section */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Upload Documents
                  </h3>
                </CardHeader>
                <CardBody>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Drag and drop files here or click to browse</p>
                    <Button
                      color="primary"
                      onPress={handleFileUpload}
                      isLoading={uploading}
                      startContent={<Upload className="w-4 h-4" />}
                    >
                      {uploading ? 'Uploading...' : 'Choose Files'}
                    </Button>
                  </div>
                </CardBody>
              </Card>

              {/* Documents List */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Documents ({documents.length})</h3>
                </CardHeader>
                <CardBody>
                  <div className="space-y-3">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <div>
                            <h4 className="font-medium">{doc.name}</h4>
                            <p className="text-sm text-gray-600">
                              {doc.category} • {doc.size} • Uploaded by {doc.uploadedBy}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Chip
                            size="sm"
                            color={getStatusColor(doc.status)}
                            variant="flat"
                          >
                            {doc.status}
                          </Chip>
                          <Button size="sm" variant="light" startContent={<Eye className="w-4 h-4" />}>
                            View
                          </Button>
                          <Button size="sm" variant="light" startContent={<Download className="w-4 h-4" />}>
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>
          </Tabs.Content>

          <Tabs.Content tabId="checklist">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Due Diligence Checklist</h3>
                </CardHeader>
                <CardBody>
                  <div className="space-y-4">
                    {checklist.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Chip
                                size="sm"
                                color={getPriorityColor(item.priority)}
                                variant="flat"
                              >
                                {item.priority}
                              </Chip>
                              <span className="text-xs text-gray-500">
                                Due: {new Date(item.dueDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Chip
                            size="sm"
                            color={getStatusColor(item.status)}
                            variant="flat"
                          >
                            {item.status}
                          </Chip>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>
          </Tabs.Content>

          <Tabs.Content tabId="messages">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Messages ({messages.length})</h3>
                </CardHeader>
                <CardBody>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className="flex items-start gap-3 p-3 border rounded-lg"
                      >
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <MessageSquare className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{message.author}</span>
                            <span className="text-xs text-gray-500">
                              {new Date(message.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{message.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Send Message</h3>
                </CardHeader>
                <CardBody>
                  <div className="space-y-4">
                    <AnimatedTextarea
                      label="Message"
                      placeholder="Type your message here..."
                      value={newMessage}
                      onChange={(value) => setNewMessage(value)}
                      minRows={3}
                    />
                    <Button
                      color="primary"
                      onPress={handleSendMessage}
                      isDisabled={!newMessage.trim()}
                      startContent={<Send className="w-4 h-4" />}
                    >
                      Send Message
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Tabs.Content>
        </div>
      </Tabs>
    </div>
  );
};

export default DueDiligencePlatform;
