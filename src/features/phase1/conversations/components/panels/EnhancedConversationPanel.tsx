// 🎯 Enhanced Conversation Panel Component
// Location: src/features/phase1/conversations/components/panels/EnhancedConversationPanel.tsx
// Purpose: Left panel with enhanced messages header (Airbnb-style)

import { Button } from '@/shared/components/buttons';
import { Avatar } from '@heroui/react';
import { MessageCircle, Search } from 'lucide-react';
import React, { useState } from 'react';
import { Conversation } from '../../types';
import MessagesHeader, { MessageCategory, MessageStatus } from '../MessagesHeader';

// =============================================================================
// COMPONENT PROPS
// =============================================================================

interface EnhancedConversationPanelProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onConversationSelect: (_conversationId: string) => void;
  onNavigateToSearch: () => void;
  className?: string;
}

// =============================================================================
// ENHANCED CONVERSATION PANEL COMPONENT
// =============================================================================

const EnhancedConversationPanel: React.FC<EnhancedConversationPanelProps> = ({
  conversations,
  selectedConversationId,
  onConversationSelect,
  onNavigateToSearch,
  className = '',
}) => {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<MessageCategory>('all');
  const [statusFilter, setStatusFilter] = useState<MessageStatus>('all');

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
    // Category filter
    if (categoryFilter !== 'all') {
      if (categoryFilter === 'business' && !conv.businessContext) return false;
      if (categoryFilter === 'due_diligence' && conv.status !== 'negotiating') return false;
      if (categoryFilter === 'support' && conv.participant.role !== 'advisor') return false;
    }

    // Status filter
    if (statusFilter === 'unread' && conv.unreadCount === 0) return false;
    if (statusFilter === 'archived' && !conv.isArchived) return false;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        conv.participant.name.toLowerCase().includes(query) ||
        conv.participant.company?.toLowerCase().includes(query) ||
        conv.businessContext?.title.toLowerCase().includes(query) ||
        conv.businessContext?.location.toLowerCase().includes(query) ||
        conv.lastMessage.content.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const unreadCount = conversations.filter(c => c.unreadCount > 0).length;

  const handleSettingsClick = () => {
    // TODO: Implement settings modal
    // TODO: Add proper logging
  };

  return (
    <div
      className={`enhanced-conversation-panel bg-white border-r border-gray-200 flex flex-col ${className}`}
    >
      {/* Enhanced Messages Header */}
      <MessagesHeader
        searchQuery={searchQuery}
        categoryFilter={categoryFilter}
        statusFilter={statusFilter}
        unreadCount={unreadCount}
        onSearchChange={setSearchQuery}
        onCategoryChange={setCategoryFilter}
        onStatusChange={setStatusFilter}
        onSettingsClick={handleSettingsClick}
      />

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchQuery ? 'No conversations found' : 'No conversations'}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {searchQuery
                ? 'Try adjusting your search or filters.'
                : 'Start connecting buyers and sellers.'}
            </p>
            <Button
              variant="primary"
              size="sm"
              onPress={onNavigateToSearch}
              startContent={<Search className="w-4 h-4" />}
            >
              Browse Businesses
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredConversations.map(conversation => (
              <div
                key={conversation.id}
                className={`mx-2 p-4 rounded-lg cursor-pointer transition-colors relative border-0 ${
                  selectedConversationId === conversation.id
                    ? 'bg-gray-100'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => onConversationSelect(conversation.id)}
              >
                <div className="flex items-start space-x-3">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <Avatar
                      src={conversation.participant.avatar}
                      alt={conversation.participant.name}
                      className="w-10 h-10"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Name and Date */}
                    <div className="flex items-center justify-between mb-0.5">
                      <h3
                        className={`text-sm font-medium truncate ${
                          conversation.unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'
                        }`}
                      >
                        {conversation.participant.name}
                      </h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {formatMessageTime(conversation.lastMessage.timestamp)}
                      </span>
                    </div>

                    {/* Message Preview */}
                    <div className="mb-0.5">
                      <p
                        className={`text-sm truncate ${
                          conversation.unreadCount > 0
                            ? 'text-gray-900 font-medium'
                            : 'text-gray-600'
                        }`}
                      >
                        {conversation.lastMessage.content}
                      </p>
                    </div>

                    {/* Status */}
                    {conversation.status === 'closed' && (
                      <div>
                        <span className="text-xs text-gray-500">Closed</span>
                      </div>
                    )}
                    {conversation.status === 'negotiating' && (
                      <div>
                        <span className="text-xs text-orange-600">Negotiating</span>
                      </div>
                    )}
                    {conversation.status === 'active' && (
                      <div>
                        <span className="text-xs text-green-600">Active</span>
                      </div>
                    )}
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

export default EnhancedConversationPanel;
