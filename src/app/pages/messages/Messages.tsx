import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Button, Avatar, Badge, Chip, Divider } from '@heroui/react';
import { CleanInput } from '../../components/ui';
import { 
  Search, 
  MessageCircle, 
  Send, 
  MoreVertical, 
  Phone, 
  Video, 
  Paperclip,
  Smile,
  Filter,
  Archive,
  Pin,
  Star,
  Clock,
  CheckCheck,
  Building2,
  User,
  Euro,
  MapPin
} from 'lucide-react';
import { authService } from '../../services/users/authenticationService';
import { User as UserType } from '../../types/api/users/user';
import UnifiedNavigation from '../../components/navigation/UnifiedNavigation';

interface Conversation {
  id: string;
  participant: {
    name: string;
    avatar: string;
    role: 'buyer' | 'seller';
    company?: string;
  };
  lastMessage: {
    content: string;
    timestamp: Date;
    isRead: boolean;
    senderId: string;
  };
  businessContext?: {
    title: string;
    price: number;
    currency: string;
    location: string;
  };
  unreadCount: number;
  isPinned: boolean;
  isArchived: boolean;
  status: 'active' | 'negotiating' | 'closed';
}

interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: Date;
  isRead: boolean;
  type: 'text' | 'system' | 'offer';
  offerDetails?: {
    amount: number;
    currency: string;
    terms?: string;
  };
}

const Messages: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'buyers' | 'sellers'>('all');

  // Mock conversations data - would come from API
  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      participant: {
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        role: 'buyer',
        company: 'Chen Investments'
      },
      lastMessage: {
        content: 'I\'m very interested in the restaurant chain. Could we schedule a call to discuss the details?',
        timestamp: new Date('2024-01-20T14:30:00'),
        isRead: false,
        senderId: 'buyer1'
      },
      businessContext: {
        title: 'Premium Restaurant Chain - Brussels',
        price: 2500000,
        currency: 'EUR',
        location: 'Brussels, Belgium'
      },
      unreadCount: 2,
      isPinned: true,
      isArchived: false,
      status: 'negotiating'
    },
    {
      id: '2',
      participant: {
        name: 'Sarah Williams',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b6ec1617?w=150&h=150&fit=crop&crop=face',
        role: 'buyer',
        company: 'Williams Capital'
      },
      lastMessage: {
        content: 'Thank you for the financial documents. Everything looks good so far.',
        timestamp: new Date('2024-01-20T11:15:00'),
        isRead: true,
        senderId: 'buyer2'
      },
      businessContext: {
        title: 'Software Development Company',
        price: 1800000,
        currency: 'EUR',
        location: 'Antwerp, Belgium'
      },
      unreadCount: 0,
      isPinned: false,
      isArchived: false,
      status: 'active'
    },
    {
      id: '3',
      participant: {
        name: 'David Thompson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        role: 'buyer',
        company: 'Thompson Group'
      },
      lastMessage: {
        content: 'Let me know if you have any other questions about the manufacturing business.',
        timestamp: new Date('2024-01-19T16:45:00'),
        isRead: true,
        senderId: 'current'
      },
      businessContext: {
        title: 'Manufacturing Business - Ghent',
        price: 950000,
        currency: 'EUR',
        location: 'Ghent, Belgium'
      },
      unreadCount: 0,
      isPinned: false,
      isArchived: false,
      status: 'active'
    }
  ]);

  // Mock messages for selected conversation
  const [messages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m interested in your restaurant chain listing. Could you provide more details about the current operations?',
      senderId: 'buyer1',
      timestamp: new Date('2024-01-20T10:00:00'),
      isRead: true,
      type: 'text'
    },
    {
      id: '2',
      content: 'Hi Michael! Thank you for your interest. The restaurant chain currently operates 5 locations across Brussels with strong revenue growth. I can share the detailed financials after we sign an NDA.',
      senderId: 'current',
      timestamp: new Date('2024-01-20T10:30:00'),
      isRead: true,
      type: 'text'
    },
    {
      id: '3',
      content: 'Michael Chen has made an offer',
      senderId: 'system',
      timestamp: new Date('2024-01-20T14:00:00'),
      isRead: true,
      type: 'system'
    },
    {
      id: '4',
      content: 'Based on my initial review, I\'d like to make a preliminary offer of €2.2M. This is subject to due diligence.',
      senderId: 'buyer1',
      timestamp: new Date('2024-01-20T14:15:00'),
      isRead: true,
      type: 'offer',
      offerDetails: {
        amount: 2200000,
        currency: 'EUR',
        terms: 'Subject to due diligence and final negotiations'
      }
    },
    {
      id: '5',
      content: 'I\'m very interested in the restaurant chain. Could we schedule a call to discuss the details?',
      senderId: 'buyer1',
      timestamp: new Date('2024-01-20T14:30:00'),
      isRead: false,
      type: 'text'
    }
  ]);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const authResult = await authService.checkAuthentication();
      if (authResult.isAuthenticated && authResult.user) {
        setUser(authResult.user);
        // Auto-select first conversation if available
        if (conversations.length > 0) {
          setSelectedConversationId(conversations[0].id);
        }
      } else {
        navigate('/login');
      }
    } catch (err) {
      console.error('Failed to load user data:', err);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add message logic would go here
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  const formatMessageTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return timestamp.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return timestamp.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return timestamp.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const filteredConversations = conversations.filter(conv => {
    if (filterType === 'unread' && conv.unreadCount === 0) return false;
    if (filterType === 'buyers' && conv.participant.role !== 'buyer') return false;
    if (filterType === 'sellers' && conv.participant.role !== 'seller') return false;
    if (searchQuery) {
      return conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             conv.businessContext?.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <div className="text-gray-600 font-medium">Loading messages...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UnifiedNavigation />
      
      <div className="h-[calc(100vh-4rem)] flex">
        {/* Conversations Sidebar */}
        <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
              <Button
                isIconOnly
                variant="ghost"
                className="text-gray-500 hover:text-gray-700"
              >
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>

            {/* Search */}
            <div className="mb-4">
              <CleanInput
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={setSearchQuery}
                startIcon={<Search className="w-4 h-4 text-gray-400" />}
                size="sm"
                className="search-conversations"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1">
              {(['all', 'unread', 'buyers', 'sellers'] as const).map(filter => (
                <Button
                  key={filter}
                  size="sm"
                  variant={filterType === filter ? "solid" : "light"}
                  color={filterType === filter ? "primary" : "default"}
                  className="text-xs capitalize"
                  onPress={() => setFilterType(filter)}
                >
                  {filter}
                  {filter === 'unread' && conversations.filter(c => c.unreadCount > 0).length > 0 && (
                    <Badge content={conversations.filter(c => c.unreadCount > 0).length} size="sm" color="danger" />
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No conversations</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {searchQuery ? 'No conversations match your search.' : 'Start connecting with buyers and sellers.'}
                </p>
                <Button
                  color="primary"
                  size="sm"
                  onPress={() => navigate('/search')}
                  startContent={<Search className="w-4 h-4" />}
                >
                  Browse Businesses
                </Button>
              </div>
            ) : (
              <div className="space-y-1 p-2">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 rounded-lg cursor-pointer transition-colors relative ${
                      selectedConversationId === conversation.id
                        ? 'bg-primary-50 border border-primary-200'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedConversationId(conversation.id)}
                  >
                    {conversation.isPinned && (
                      <Pin className="absolute top-2 right-2 w-3 h-3 text-gray-400" />
                    )}
                    
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <Avatar
                          src={conversation.participant.avatar}
                          alt={conversation.participant.name}
                          className="w-12 h-12"
                        />
                        {conversation.participant.role === 'buyer' && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <User className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`text-sm font-semibold truncate ${
                            conversation.unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {conversation.participant.name}
                          </h3>
                          <div className="flex items-center space-x-1">
                            {conversation.status === 'negotiating' && (
                              <Chip size="sm" color="warning" variant="flat" className="text-xs">
                                Negotiating
                              </Chip>
                            )}
                            {conversation.unreadCount > 0 && (
                              <Badge content={conversation.unreadCount} size="sm" color="danger" />
                            )}
                          </div>
                        </div>

                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <Building2 className="w-3 h-3 mr-1" />
                          <span className="truncate">{conversation.participant.company}</span>
                        </div>

                        {conversation.businessContext && (
                          <div className="text-xs text-gray-600 mb-2 p-2 bg-gray-50 rounded">
                            <div className="flex items-center justify-between">
                              <span className="font-medium truncate pr-2">
                                {conversation.businessContext.title}
                              </span>
                              <span className="text-green-600 font-semibold whitespace-nowrap">
                                €{(conversation.businessContext.price / 1000000).toFixed(1)}M
                              </span>
                            </div>
                            <div className="flex items-center mt-1 text-gray-500">
                              <MapPin className="w-3 h-3 mr-1" />
                              <span>{conversation.businessContext.location}</span>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <p className={`text-sm truncate pr-2 ${
                            conversation.unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-600'
                          }`}>
                            {conversation.lastMessage.content}
                          </p>
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {formatMessageTime(conversation.lastMessage.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar
                      src={selectedConversation.participant.avatar}
                      alt={selectedConversation.participant.name}
                      className="w-10 h-10"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        {selectedConversation.participant.name}
                      </h2>
                      <div className="flex items-center text-sm text-gray-600">
                        <span>{selectedConversation.participant.company}</span>
                        <Divider orientation="vertical" className="mx-2 h-4" />
                        <span className="capitalize">{selectedConversation.participant.role}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      isIconOnly
                      variant="ghost"
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Phone className="w-5 h-5" />
                    </Button>
                    <Button
                      isIconOnly
                      variant="ghost"
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Video className="w-5 h-5" />
                    </Button>
                    <Button
                      isIconOnly
                      variant="ghost"
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Business Context */}
                {selectedConversation.businessContext && (
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Building2 className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">
                          {selectedConversation.businessContext.title}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-blue-800">
                        <span className="font-semibold">
                          €{(selectedConversation.businessContext.price / 1000000).toFixed(1)}M
                        </span>
                        <span>{selectedConversation.businessContext.location}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id}>
                    {message.type === 'system' ? (
                      <div className="flex justify-center">
                        <div className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                          {message.content}
                        </div>
                      </div>
                    ) : (
                      <div className={`flex ${message.senderId === 'current' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md ${
                          message.senderId === 'current' 
                            ? 'bg-primary-300 text-white' 
                            : message.type === 'offer' 
                              ? 'bg-green-50 border border-green-200'
                              : 'bg-gray-100 text-gray-900'
                        } rounded-lg px-4 py-2`}>
                          {message.type === 'offer' && message.offerDetails ? (
                            <div>
                              <div className="flex items-center space-x-2 mb-2">
                                <Euro className="w-4 h-4 text-green-600" />
                                <span className="font-semibold text-green-800">
                                  Offer: €{(message.offerDetails.amount / 1000000).toFixed(1)}M
                                </span>
                              </div>
                              <p className="text-sm text-gray-700">{message.content}</p>
                              {message.offerDetails.terms && (
                                <p className="text-xs text-gray-600 mt-1 italic">
                                  {message.offerDetails.terms}
                                </p>
                              )}
                            </div>
                          ) : (
                            <p className="text-sm">{message.content}</p>
                          )}
                          
                          <div className={`flex items-center justify-end space-x-1 mt-1 ${
                            message.senderId === 'current' ? 'text-white/70' : 'text-gray-500'
                          }`}>
                            <span className="text-xs">
                              {message.timestamp.toLocaleTimeString('en-US', { 
                                hour: '2-digit', 
                                minute: '2-digit',
                                hour12: false 
                              })}
                            </span>
                            {message.senderId === 'current' && (
                              <CheckCheck className={`w-3 h-3 ${message.isRead ? 'text-blue-300' : 'text-white/50'}`} />
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Modern Message Input - Redesigned */}
              <div className="px-4 py-3 bg-gray-50/80 backdrop-blur-sm border-t border-gray-200/50">
                <div className="flex items-end gap-3 max-w-4xl mx-auto">
                  {/* Attachment Button */}
                  <Button
                    isIconOnly
                    variant="flat"
                    className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 border border-gray-200/50 shadow-sm text-gray-600 hover:text-gray-800 transition-all duration-200 hover:scale-105"
                  >
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  
                  {/* Message Input Container */}
                  <div className="flex-1 relative">
                    <div className="flex items-center bg-white rounded-3xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300/50 focus-within:border-primary-400 focus-within:shadow-md focus-within:ring-1 focus-within:ring-primary-100">
                      {/* Input Field */}
                      <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 px-5 py-3 bg-transparent text-gray-900 placeholder:text-gray-500 focus:outline-none text-base rounded-l-3xl"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey && newMessage.trim()) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      
                      {/* Emoji Button */}
                      <Button
                        isIconOnly
                        variant="light"
                        className="w-9 h-9 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 mr-2"
                      >
                        <Smile className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Send Button - Modern Circular Design */}
                  <Button
                    isIconOnly
                    onPress={handleSendMessage}
                    isDisabled={!newMessage.trim()}
                    className={`w-11 h-11 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 ${
                      newMessage.trim() 
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-primary-500/25' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-gray-200/50'
                    }`}
                  >
                    <Send className={`w-4 h-4 transition-transform duration-200 ${newMessage.trim() ? 'translate-x-0.5' : ''}`} />
                  </Button>
                </div>
                
                {/* Typing Indicator Placeholder */}
                <div className="flex items-center justify-center mt-2 opacity-0 transition-opacity duration-200">
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <span className="ml-2">Someone is typing...</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <MessageCircle className="w-10 h-10 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Messages</h2>
              <p className="text-gray-600 max-w-md mb-6">
                Connect with buyers and sellers to discuss business opportunities. 
                Your conversations about deals will appear here.
              </p>
              <div className="flex space-x-3">
                <Button
                  color="primary"
                  onPress={() => navigate('/search')}
                  startContent={<Search className="w-4 h-4" />}
                >
                  Browse Businesses
                </Button>
                <Button
                  variant="bordered"
                  onPress={() => navigate('/business/overview')}
                  startContent={<Building2 className="w-4 h-4" />}
                >
                  Manage Your Business
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;