// Purpose: Enhanced messaging interface with transaction context integration
// Replaces the old Messages.tsx with conversation-centric architecture

import { Button } from '@/shared/components/buttons';
import { authService } from '@/shared/services/auth';
import { Avatar, Badge, Chip, Divider } from '@heroui/react';
import {
  Building2,
  MapPin,
  MessageCircle,
  MoreVertical,
  Paperclip,
  Phone,
  Pin,
  Search,
  Send,
  User,
  Video,
} from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User as UserType } from '../../../types/user.consolidated';

// Import transaction modals
import {
  DocumentSharingModal,
  DueDiligenceRequestModal,
  OfferCreationModal,
} from '@/features/phase1/conversations/components/modals';

// Simple interfaces for basic messaging
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
  const [, setUser] = useState<UserType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'buyers' | 'sellers'>('all');

  // Modal states for transaction features
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showDDModal, setShowDDModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);

  // Mock conversations data - would come from API
  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      participant: {
        name: 'Michael Chen',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        role: 'buyer',
        company: 'Chen Investments',
      },
      lastMessage: {
        content:
          "I'm very interested in the restaurant chain. Could we schedule a call to discuss the details?",
        timestamp: new Date('2024-01-20T14:30:00'),
        isRead: false,
        senderId: 'buyer1',
      },
      businessContext: {
        title: 'Premium Restaurant Chain - Brussels',
        price: 2500000,
        currency: 'EUR',
        location: 'Brussels, Belgium',
      },
      unreadCount: 2,
      isPinned: true,
      isArchived: false,
      status: 'negotiating',
    },
  ]);

  // Mock messages for selected conversation
  const [messages] = useState<Message[]>([
    {
      id: '1',
      content:
        "Hello! I'm interested in your restaurant chain listing. Could you provide more details about the current operations?",
      senderId: 'buyer1',
      timestamp: new Date('2024-01-20T10:00:00'),
      isRead: true,
      type: 'text',
    },
    {
      id: '2',
      content:
        'Hi Michael! Thank you for your interest. The restaurant chain currently operates 5 locations across Brussels with strong revenue growth. I can share the detailed financials after we sign an NDA.',
      senderId: 'current',
      timestamp: new Date('2024-01-20T10:30:00'),
      isRead: true,
      type: 'text',
    },
  ]);

  const loadUserData = useCallback(async () => {
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
    } catch {
      navigate('/login');
    }
  }, [navigate, conversations]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Add message logic would go here
    setNewMessage('');
  };

  // Modal handlers for transaction features
  const handleOfferSubmit = (data: unknown) => {
    // Handle offer submission
    setShowOfferModal(false);
  };

  const handleDueDiligenceRequest = (data: unknown) => {
    // Handle due diligence request
    setShowDDModal(false);
  };

  const handleDocumentShare = (data: unknown) => {
    // Handle document sharing
    setShowDocumentModal(false);
  };

  const formatMessageTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return timestamp.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return timestamp.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return timestamp.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const filteredConversations = conversations.filter(conv => {
    if (filterType === 'unread' && conv.unreadCount === 0) return false;
    if (filterType === 'buyers' && conv.participant.role !== 'buyer') return false;
    if (filterType === 'sellers' && conv.participant.role !== 'seller') return false;
    if (searchQuery) {
      return (
        conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.businessContext?.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);

  // Loading screens removed for smooth user experience

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Navigation provided by BuyerLayout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Conversations Sidebar */}
        <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
              <Button isIconOnly variant="tertiary" className="text-gray-500 hover:text-gray-700">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>

            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-900 transition-all duration-200"
                />
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              {(['all', 'unread', 'buyers', 'sellers'] as const).map(filter => {
                const isActive = filterType === filter;
                const unreadCount = conversations.filter(c => c.unreadCount > 0).length;

                return (
                  <button
                    key={filter}
                    onClick={() => setFilterType(filter)}
                    className={`relative flex-1 px-3 py-2 text-xs font-medium rounded-md transition-all duration-200 ${
                      isActive
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span className="capitalize">{filter}</span>
                    {filter === 'unread' && unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium z-50">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                );
              })}
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
                  {searchQuery
                    ? 'No conversations match your search.'
                    : 'Start connecting with buyers and sellers.'}
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onPress={() => navigate('/search')}
                  startContent={<Search className="w-4 h-4" />}
                >
                  Browse Businesses
                </Button>
              </div>
            ) : (
              <div className="space-y-1 p-2">
                {filteredConversations.map(conversation => (
                  <div
                    key={conversation.id}
                    className={`p-4 rounded-lg cursor-pointer transition-colors relative ${
                      selectedConversation?.id === conversation.id
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
                          <h3
                            className={`text-sm font-semibold truncate ${
                              conversation.unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'
                            }`}
                          >
                            {conversation.participant.name}
                          </h3>
                          <div className="flex items-center space-x-1">
                            {conversation.status === 'negotiating' && (
                              <Chip size="sm" color="warning" variant="solid" className="text-xs">
                                Negotiating
                              </Chip>
                            )}
                            {conversation.unreadCount > 0 && (
                              <Badge
                                content={conversation.unreadCount}
                                size="sm"
                                variant="solid"
                                color="danger"
                              >
                                {conversation.unreadCount}
                              </Badge>
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
                          <p
                            className={`text-sm truncate pr-2 ${
                              conversation.unreadCount > 0
                                ? 'text-gray-900 font-medium'
                                : 'text-gray-600'
                            }`}
                          >
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
        <div className="flex-1 flex flex-col bg-white min-h-0">
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
                    {/* Transaction Action Buttons */}
                    <Button
                      variant="secondary"
                      size="sm"
                      onPress={() => setShowOfferModal(true)}
                      className="text-xs"
                    >
                      Make Offer
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onPress={() => setShowDDModal(true)}
                      className="text-xs"
                    >
                      Due Diligence
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onPress={() => setShowDocumentModal(true)}
                      className="text-xs"
                    >
                      Share Docs
                    </Button>

                    {/* Communication Buttons */}
                    <Button
                      isIconOnly
                      variant="tertiary"
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Phone className="w-5 h-5" />
                    </Button>
                    <Button
                      isIconOnly
                      variant="tertiary"
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Video className="w-5 h-5" />
                    </Button>
                    <Button
                      isIconOnly
                      variant="tertiary"
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
              <div className="flex-1 overflow-y-auto p-4 pb-20 space-y-4 min-h-0">
                {messages.map(message => (
                  <div key={message.id}>
                    {message.type === 'system' ? (
                      <div className="flex justify-center">
                        <div className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                          {message.content}
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`flex ${message.senderId === 'current' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md ${
                            message.senderId === 'current'
                              ? 'bg-primary-300 text-white'
                              : message.type === 'offer'
                                ? 'bg-green-50 border border-green-200'
                                : 'bg-gray-100 text-gray-900'
                          } rounded-lg px-4 py-2`}
                        >
                          {message.type === 'offer' && message.offerDetails ? (
                            <div>
                              <div className="flex items-center space-x-2 mb-2">
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

                          <div
                            className={`flex items-center justify-end space-x-1 mt-1 ${
                              message.senderId === 'current' ? 'text-white/70' : 'text-gray-500'
                            }`}
                          >
                            <span className="text-xs">
                              {message.timestamp.toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Simple Message Input - Fixed to Bottom */}
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
                <div className="px-4 py-3 max-w-4xl mx-auto">
                  <div className="flex items-center gap-3">
                    {/* Attachment Button */}
                    <button
                      type="button"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                    >
                      <Paperclip className="w-4 h-4" />
                    </button>

                    {/* Message Input */}
                    <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500 transition-all duration-200">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        className="flex-1 bg-transparent text-gray-900 placeholder:text-gray-500 focus:outline-none text-sm border-0"
                        onKeyPress={e => {
                          if (e.key === 'Enter' && !e.shiftKey && newMessage.trim()) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                    </div>

                    {/* Send Button */}
                    <button
                      type="button"
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
                        newMessage.trim()
                          ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-md hover:shadow-lg'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Send className="w-4 h-4" />
                    </button>
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
                Connect with buyers and sellers to discuss business opportunities. Your
                conversations about deals will appear here.
              </p>
              <div className="flex space-x-3">
                <Button
                  variant="primary"
                  onPress={() => navigate('/search')}
                  startContent={<Search className="w-4 h-4" />}
                >
                  Browse Businesses
                </Button>
                <Button
                  variant="tertiary"
                  onPress={() => navigate('/my-business/overview')}
                  startContent={<Building2 className="w-4 h-4" />}
                >
                  Manage Your Business
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Transaction Modals */}
      {selectedConversation && (
        <>
          <OfferCreationModal
            isOpen={showOfferModal}
            onClose={() => setShowOfferModal(false)}
            conversationId={selectedConversation.id}
            listingId="listing-1"
            onSuccess={handleOfferSubmit}
          />

          <DueDiligenceRequestModal
            isOpen={showDDModal}
            onClose={() => setShowDDModal(false)}
            conversationId={selectedConversation.id}
            listingId="listing-1"
            onSuccess={handleDueDiligenceRequest}
          />

          <DocumentSharingModal
            isOpen={showDocumentModal}
            onClose={() => setShowDocumentModal(false)}
            conversationId={selectedConversation.id}
            listingId="listing-1"
            onSuccess={handleDocumentShare}
          />
        </>
      )}
    </div>
  );
};

export default Messages;
