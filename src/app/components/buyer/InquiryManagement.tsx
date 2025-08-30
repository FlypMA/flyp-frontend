import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Button, Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tabs, Tab } from '@heroui/react';
import {
  MessageSquare,
  Send,
  Eye,
  Clock,
  Building2,
  MapPin,
  Euro,
  MoreVertical,
  FileText,
  CheckCircle,
  AlertCircle,
  User,
  Calendar,
  Filter,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Inquiry {
  id: string;
  listing_id: string;
  listing_title: string;
  listing_sector: string;
  listing_country: string;
  listing_asking_price?: number;
  listing_currency: string;
  seller_name: string;
  status: 'sent' | 'viewed' | 'replied' | 'nda_required' | 'nda_signed' | 'active' | 'negotiating' | 'closed';
  sent_date: string;
  last_activity: string;
  initial_message: string;
  message_count: number;
  unread_messages: number;
  nda_status?: 'none' | 'required' | 'sent' | 'signed';
  buyer_background?: string;
  investment_timeline?: string;
  financing_confirmed?: boolean;
}

interface Message {
  id: string;
  inquiry_id: string;
  sender_type: 'buyer' | 'seller';
  sender_name: string;
  content: string;
  timestamp: string;
  is_read: boolean;
  attachments?: string[];
}

interface InquiryManagementProps {}

const InquiryManagement: React.FC<InquiryManagementProps> = () => {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [newMessage, setNewMessage] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  useEffect(() => {
    loadInquiries();
  }, []);

  useEffect(() => {
    if (selectedInquiry) {
      loadMessages(selectedInquiry.id);
    }
  }, [selectedInquiry]);

  const loadInquiries = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await inquiryService.getInquiries();
      
      // Mock data for now
      const mockInquiries: Inquiry[] = [
        {
          id: 'inq_1',
          listing_id: '1',
          listing_title: 'Premium Restaurant Chain - Brussels',
          listing_sector: 'Food & Beverage',
          listing_country: 'Belgium',
          listing_asking_price: 2500000,
          listing_currency: 'EUR',
          seller_name: 'Marie Dupont',
          status: 'active',
          sent_date: '2024-01-18T10:30:00Z',
          last_activity: '2024-01-22T14:15:00Z',
          initial_message: 'I am very interested in your restaurant chain. I have experience in the hospitality industry and would like to discuss the opportunity further.',
          message_count: 8,
          unread_messages: 2,
          nda_status: 'signed',
          buyer_background: 'Restaurant industry veteran with 15 years experience',
          investment_timeline: '3-6 months',
          financing_confirmed: true,
        },
        {
          id: 'inq_2',
          listing_id: '2',
          listing_title: 'Enterprise SaaS Platform - Ghent',
          listing_sector: 'Technology',
          listing_country: 'Belgium',
          listing_asking_price: 1800000,
          listing_currency: 'EUR',
          seller_name: 'Johan Van Der Berg',
          status: 'nda_required',
          sent_date: '2024-01-20T09:15:00Z',
          last_activity: '2024-01-20T16:45:00Z',
          initial_message: 'Your SaaS platform looks very promising. I would like to learn more about the technical architecture and customer base.',
          message_count: 3,
          unread_messages: 1,
          nda_status: 'required',
          buyer_background: 'Tech entrepreneur and software investor',
          investment_timeline: '6-12 months',
          financing_confirmed: true,
        },
        {
          id: 'inq_3',
          listing_id: '4',
          listing_title: 'Digital Marketing Agency - Amsterdam',
          listing_sector: 'Professional Services',
          listing_country: 'Netherlands',
          listing_asking_price: 950000,
          listing_currency: 'EUR',
          seller_name: 'Lisa Schmidt',
          status: 'replied',
          sent_date: '2024-01-19T14:20:00Z',
          last_activity: '2024-01-21T11:30:00Z',
          initial_message: 'I am interested in acquiring a marketing agency to expand my business portfolio. Your client base looks impressive.',
          message_count: 5,
          unread_messages: 0,
          nda_status: 'none',
          buyer_background: 'Serial entrepreneur with multiple acquisitions',
          investment_timeline: '2-4 months',
          financing_confirmed: false,
        },
        {
          id: 'inq_4',
          listing_id: '3',
          listing_title: 'Precision Manufacturing - Antwerp',
          listing_sector: 'Manufacturing',
          listing_country: 'Belgium',
          listing_asking_price: 3200000,
          listing_currency: 'EUR',
          seller_name: 'Peter Janssen',
          status: 'closed',
          sent_date: '2024-01-10T11:45:00Z',
          last_activity: '2024-01-15T09:20:00Z',
          initial_message: 'I represent a manufacturing group looking to expand in Belgium. Your precision manufacturing capabilities align with our strategic goals.',
          message_count: 12,
          unread_messages: 0,
          nda_status: 'signed',
          buyer_background: 'Manufacturing industry professional',
          investment_timeline: '6-12 months',
          financing_confirmed: true,
        },
      ];

      setInquiries(mockInquiries);
    } catch (error) {
      console.error('Error loading inquiries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMessages = async (inquiryId: string) => {
    try {
      // TODO: Replace with actual API call
      // const response = await messageService.getMessages(inquiryId);
      
      // Mock messages
      const mockMessages: Message[] = [
        {
          id: 'msg_1',
          inquiry_id: inquiryId,
          sender_type: 'buyer',
          sender_name: 'You',
          content: 'I am very interested in your restaurant chain. I have experience in the hospitality industry and would like to discuss the opportunity further.',
          timestamp: '2024-01-18T10:30:00Z',
          is_read: true,
        },
        {
          id: 'msg_2',
          inquiry_id: inquiryId,
          sender_type: 'seller',
          sender_name: 'Marie Dupont',
          content: 'Thank you for your interest! I would be happy to discuss the opportunity. Could you tell me more about your background in hospitality?',
          timestamp: '2024-01-18T15:20:00Z',
          is_read: true,
        },
        {
          id: 'msg_3',
          inquiry_id: inquiryId,
          sender_type: 'buyer',
          sender_name: 'You',
          content: 'I have been in the restaurant industry for 15 years, having owned and operated 2 successful restaurants in Ghent. I am now looking to expand into Brussels with an established brand.',
          timestamp: '2024-01-19T09:10:00Z',
          is_read: true,
        },
        {
          id: 'msg_4',
          inquiry_id: inquiryId,
          sender_type: 'seller',
          sender_name: 'Marie Dupont',
          content: 'That sounds excellent! Your experience would be perfect for our chain. I would like to schedule a call to discuss the details. Are you available this week?',
          timestamp: '2024-01-22T14:15:00Z',
          is_read: false,
        },
      ];

      setMessages(mockMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedInquiry) return;

    setIsSendingMessage(true);
    try {
      // TODO: Replace with actual API call
      // await messageService.sendMessage(selectedInquiry.id, newMessage);
      
      const newMsg: Message = {
        id: `msg_${Date.now()}`,
        inquiry_id: selectedInquiry.id,
        sender_type: 'buyer',
        sender_name: 'You',
        content: newMessage,
        timestamp: new Date().toISOString(),
        is_read: true,
      };

      setMessages(prev => [...prev, newMsg]);
      setNewMessage('');
      
      // Update inquiry status
      setInquiries(prev => 
        prev.map(inq => 
          inq.id === selectedInquiry.id 
            ? { ...inq, message_count: inq.message_count + 1, last_activity: new Date().toISOString() }
            : inq
        )
      );
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSendingMessage(false);
    }
  };

  const formatPrice = (price?: number, currency = 'EUR') => {
    if (!price) return 'Price on request';
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: price >= 1000000 ? 'compact' : 'standard',
    }).format(price);
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'default';
      case 'viewed':
        return 'primary';
      case 'replied':
        return 'success';
      case 'nda_required':
        return 'warning';
      case 'nda_signed':
        return 'success';
      case 'active':
        return 'success';
      case 'negotiating':
        return 'warning';
      case 'closed':
        return 'danger';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return Send;
      case 'viewed':
        return Eye;
      case 'replied':
      case 'active':
        return MessageSquare;
      case 'nda_required':
        return AlertCircle;
      case 'nda_signed':
        return CheckCircle;
      case 'negotiating':
        return FileText;
      case 'closed':
        return CheckCircle;
      default:
        return MessageSquare;
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return ['replied', 'active', 'negotiating'].includes(inquiry.status);
    if (activeTab === 'pending') return ['sent', 'viewed', 'nda_required'].includes(inquiry.status);
    if (activeTab === 'closed') return inquiry.status === 'closed';
    return true;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inquiry Management</h1>
          <p className="text-gray-600">
            {inquiries.length} total inquiries • {inquiries.filter(i => i.unread_messages > 0).length} with unread messages
          </p>
        </div>

        <Button
          color="primary"
          onPress={() => navigate('/search')}
          startContent={<MessageSquare className="w-4 h-4" />}
        >
          Send New Inquiry
        </Button>
      </div>

      {/* Tabs */}
      <Tabs
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key as string)}
        classNames={{
          tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-primary-500",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-primary-500"
        }}
      >
        <Tab key="all" title={`All (${inquiries.length})`} />
        <Tab key="active" title={`Active (${inquiries.filter(i => ['replied', 'active', 'negotiating'].includes(i.status)).length})`} />
        <Tab key="pending" title={`Pending (${inquiries.filter(i => ['sent', 'viewed', 'nda_required'].includes(i.status)).length})`} />
        <Tab key="closed" title={`Closed (${inquiries.filter(i => i.status === 'closed').length})`} />
      </Tabs>

      {/* Inquiries Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inquiry List */}
        <div className="lg:col-span-1 space-y-3 max-h-[700px] overflow-y-auto">
          {filteredInquiries.map(inquiry => {
            const StatusIcon = getStatusIcon(inquiry.status);
            return (
              <Card
                key={inquiry.id}
                className={`border transition-all cursor-pointer hover:shadow-md ${
                  selectedInquiry?.id === inquiry.id
                    ? 'border-primary-300 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-200'
                }`}
                onPress={() => setSelectedInquiry(inquiry)}
              >
                <CardBody className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate">{inquiry.listing_title}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <Building2 className="w-3 h-3" />
                        <span className="truncate">{inquiry.listing_sector}</span>
                      </div>
                    </div>
                    {inquiry.unread_messages > 0 && (
                      <div className="w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {inquiry.unread_messages}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <Chip size="sm" color={getStatusColor(inquiry.status)} variant="flat">
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {inquiry.status.replace('_', ' ')}
                    </Chip>
                    <div className="text-xs text-gray-500">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {getTimeAgo(inquiry.last_activity)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{inquiry.seller_name}</span>
                    <div className="flex items-center gap-2 text-gray-500">
                      <MessageSquare className="w-3 h-3" />
                      <span>{inquiry.message_count}</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}

          {filteredInquiries.length === 0 && (
            <Card className="border border-gray-200">
              <CardBody className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">No inquiries found</h4>
                <p className="text-gray-600 text-sm">
                  {activeTab === 'all'
                    ? 'Start browsing businesses and send your first inquiry'
                    : `No ${activeTab} inquiries at the moment`}
                </p>
                <Button
                  size="sm"
                  color="primary"
                  className="mt-3"
                  onPress={() => navigate('/search')}
                >
                  Browse Businesses
                </Button>
              </CardBody>
            </Card>
          )}
        </div>

        {/* Conversation View */}
        <div className="lg:col-span-2">
          {selectedInquiry ? (
            <Card className="border border-gray-200 h-[700px] flex flex-col">
              {/* Conversation Header */}
              <CardHeader className="border-b border-gray-200 pb-4">
                <div className="flex items-start justify-between w-full">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{selectedInquiry.listing_title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        <span>{selectedInquiry.listing_sector}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedInquiry.listing_country}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Euro className="w-4 h-4" />
                        <span>{formatPrice(selectedInquiry.listing_asking_price, selectedInquiry.listing_currency)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Chip size="sm" color={getStatusColor(selectedInquiry.status)} variant="flat">
                        {selectedInquiry.status.replace('_', ' ')}
                      </Chip>
                      <span className="text-sm text-gray-600">with {selectedInquiry.seller_name}</span>
                    </div>
                  </div>

                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly variant="light">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem key="view" onPress={() => navigate(`/listings/${selectedInquiry.listing_id}`)}>
                        View Listing
                      </DropdownItem>
                      <DropdownItem key="info">
                        Inquiry Details
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardBody className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map(message => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender_type === 'buyer' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender_type === 'buyer'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium">
                            {message.sender_name}
                          </span>
                          <span className={`text-xs ${message.sender_type === 'buyer' ? 'text-primary-100' : 'text-gray-500'}`}>
                            {getTimeAgo(message.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>

              {/* Message Input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex gap-2">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={3}
                    disabled={selectedInquiry.status === 'closed'}
                  />
                  <Button
                    isIconOnly
                    color="primary"
                    isLoading={isSendingMessage}
                    isDisabled={!newMessage.trim() || selectedInquiry.status === 'closed'}
                    onPress={sendMessage}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                {selectedInquiry.status === 'closed' && (
                  <p className="text-xs text-gray-500 mt-2">This inquiry has been closed</p>
                )}
              </div>
            </Card>
          ) : (
            <Card className="border border-gray-200 h-[700px]">
              <CardBody className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Select an inquiry</h4>
                  <p className="text-gray-600">
                    Choose an inquiry from the list to view the conversation
                  </p>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default InquiryManagement;
