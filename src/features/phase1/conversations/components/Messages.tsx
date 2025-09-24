// 💬 Messages Component
// Location: src/features/phase1/conversations/components/Messages.tsx
// Purpose: Enhanced messaging interface with transaction context integration

import { Button } from '@/shared/components/buttons';
import { Input } from '@/shared/components/forms';
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
  Smile,
  User,
  Video,
} from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User as UserType } from '../../../../types/user.consolidated';

// Import conversation components
import { useConversationContext } from '../hooks';
import { ConversationMessage } from '../types';
import {
  DocumentSharingModal,
  DueDiligenceRequestModal,
  OfferCreationModal,
  TransactionContextPanel,
  TransactionMessage,
} from './index';

const Messages: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'buyers' | 'sellers'>('all');

  // Modal states
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showDDModal, setShowDDModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);

  // Use conversation context hook
  const {
    conversations,
    selectedConversation,
    messages,
    selectConversation,
    addMessage,
    performQuickAction,
  } = useConversationContext();

  const loadUserData = useCallback(async () => {
    try {
      const authResult = await authService.checkAuthentication();
      if (authResult.isAuthenticated && authResult.user) {
        setUser(authResult.user);
        // Auto-select first conversation if available
        if (conversations.length > 0) {
          selectConversation(conversations[0].id);
        }
      } else {
        navigate('/login');
      }
    } catch {
      navigate('/login');
    }
  }, [navigate, conversations, selectConversation]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const newMessageObj: ConversationMessage = {
      id: `msg-${Date.now()}`,
      conversationId: selectedConversation.id,
      senderId: user?.id || 'current-user',
      recipientId: selectedConversation.participant.id,
      content: newMessage,
      sentAt: new Date().toISOString(),
      type: 'text',
      isRead: false,
    };

    addMessage(newMessageObj);
    setNewMessage('');
  };

  const handleQuickAction = (actionId: string) => {
    if (!selectedConversation) return;

    switch (actionId) {
      case 'create_offer':
        setShowOfferModal(true);
        break;
      case 'request_due_diligence':
        setShowDDModal(true);
        break;
      case 'share_document':
        setShowDocumentModal(true);
        break;
      default:
        performQuickAction(selectedConversation.id, actionId);
    }
  };

  const handleOfferSubmit = (offer: {
    amount: number;
    currency: string;
    terms: string;
    conditions: string[];
  }) => {
    if (!selectedConversation) return;

    const offerMessage: ConversationMessage = {
      id: `msg-${Date.now()}`,
      conversationId: selectedConversation.id,
      senderId: user?.id || 'current-user',
      recipientId: selectedConversation.participant.id,
      content: `I'd like to make an offer of ${offer.currency} ${(offer.amount / 1000000).toFixed(1)}M. ${offer.terms}`,
      sentAt: new Date().toISOString(),
      type: 'offer',
      isRead: false,
      offerDetails: {
        amount: offer.amount,
        currency: offer.currency,
        terms: offer.terms,
        status: 'pending',
        conditions: offer.conditions,
      },
    };

    addMessage(offerMessage);
    setShowOfferModal(false);
  };

  const handleDueDiligenceRequest = (request: {
    category: string;
    priority: string;
    deadline?: string;
    description: string;
    itemId: string;
    message: string;
    processId: string;
  }) => {
    if (!selectedConversation) return;

    const ddMessage: ConversationMessage = {
      id: `msg-${Date.now()}`,
      conversationId: selectedConversation.id,
      senderId: user?.id || 'current-user',
      recipientId: selectedConversation.participant.id,
      content: `I need to request ${request.itemId} for due diligence. ${request.message}`,
      sentAt: new Date().toISOString(),
      type: 'due_diligence',
      isRead: false,
      dueDiligenceDetails: {
        processId: request.processId,
        category: request.category,
        itemId: request.itemId,
        status: 'requested',
        deadline: request.deadline,
        priority: request.priority as 'low' | 'medium' | 'high' | 'urgent',
      },
    };

    addMessage(ddMessage);
    setShowDDModal(false);
  };

  const handleDocumentShare = (data: {
    message?: string;
    document?: {
      id: string;
      name: string;
      type: string;
      size: number;
      accessLevel: string;
      documentId: string;
    };
  }) => {
    if (!selectedConversation) return;

    const docMessage: ConversationMessage = {
      id: `msg-${Date.now()}`,
      conversationId: selectedConversation.id,
      senderId: user?.id || 'current-user',
      recipientId: selectedConversation.participant.id,
      content: data.message || `I've shared ${data.document?.name || 'a document'} with you.`,
      sentAt: new Date().toISOString(),
      type: 'document',
      isRead: false,
      documentDetails: {
        documentId: data.document?.documentId || 'doc-1',
        name: data.document?.name || 'Document',
        type: data.document?.type || 'pdf',
        size: data.document?.size || 0,
        accessLevel: (data.document?.accessLevel || 'public') as
          | 'public'
          | 'nda_required'
          | 'due_diligence',
      },
    };

    addMessage(docMessage);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-[calc(100vh-4rem)] flex">
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
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-4 h-4 text-gray-400" />}
                className="search-conversations"
                label=""
                type="text"
                onBlur={() => {}}
                name="search"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1">
              {(['all', 'unread', 'buyers', 'sellers'] as const).map(filter => (
                <Button
                  key={filter}
                  size="sm"
                  variant={filterType === filter ? 'primary' : 'secondary'}
                  className="text-xs capitalize"
                  onPress={() => setFilterType(filter)}
                >
                  {filter}
                  {filter === 'unread' &&
                    conversations.filter(c => c.unreadCount > 0).length > 0 && (
                      <Badge
                        content={conversations.filter(c => c.unreadCount > 0).length}
                        size="sm"
                        variant="solid"
                        color="danger"
                      >
                        {conversations.filter(c => c.unreadCount > 0).length}
                      </Badge>
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
                    onClick={() => selectConversation(conversation.id)}
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

              {/* Transaction Context Panel */}
              {selectedConversation && (
                <TransactionContextPanel
                  context={selectedConversation.context}
                  onQuickAction={handleQuickAction}
                />
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(message => (
                  <TransactionMessage
                    key={message.id}
                    message={message}
                    isCurrentUser={message.senderId === (user?.id || 'current-user')}
                    onAction={() => {
                      // Handle message-specific actions
                    }}
                  />
                ))}
              </div>

              {/* Modern Message Input */}
              <div className="px-4 py-3 bg-gray-50/80 backdrop-blur-sm border-t border-gray-200/50">
                <div className="flex items-end gap-3 max-w-4xl mx-auto">
                  {/* Attachment Button */}
                  <Button
                    isIconOnly
                    variant="tertiary"
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
                        onChange={e => setNewMessage(e.target.value)}
                        className="flex-1 px-5 py-3 bg-transparent text-gray-900 placeholder:text-gray-500 focus:outline-none text-base rounded-l-3xl"
                        onKeyPress={e => {
                          if (e.key === 'Enter' && !e.shiftKey && newMessage.trim()) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />

                      {/* Emoji Button */}
                      <Button
                        isIconOnly
                        variant="tertiary"
                        className="w-9 h-9 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 mr-2"
                      >
                        <Smile className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Send Button */}
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
                    <Send
                      className={`w-4 h-4 transition-transform duration-200 ${newMessage.trim() ? 'translate-x-0.5' : ''}`}
                    />
                  </Button>
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
            listingId={selectedConversation.context?.listingId}
            onSuccess={handleOfferSubmit}
          />

          <DueDiligenceRequestModal
            isOpen={showDDModal}
            onClose={() => setShowDDModal(false)}
            conversationId={selectedConversation.id}
            listingId={selectedConversation.context?.listingId}
            onSuccess={handleDueDiligenceRequest}
          />

          <DocumentSharingModal
            isOpen={showDocumentModal}
            onClose={() => setShowDocumentModal(false)}
            conversationId={selectedConversation.id}
            listingId={selectedConversation.context?.listingId}
            onSuccess={handleDocumentShare}
          />
        </>
      )}
    </div>
  );
};

export default Messages;
