// 🎯 Conversation Panel Component
// Location: src/features/phase1/conversations/components/panels/ConversationPanel.tsx
// Purpose: Left panel for conversation list and management

import { Button } from '@/shared/components/buttons';
import { Input } from '@/shared/components/forms';
import { Avatar, Badge, Chip } from '@heroui/react';
import { Building2, MapPin, MessageCircle, MoreVertical, Pin, Search, User } from 'lucide-react';
import React from 'react';
import { Conversation } from '../../types';

// =============================================================================
// COMPONENT PROPS
// =============================================================================

interface ConversationPanelProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  searchQuery: string;
  filterType: 'all' | 'unread' | 'buyers' | 'sellers';
  onConversationSelect: (_conversationId: string) => void;
  onSearchChange: (_query: string) => void;
  onFilterChange: (_filter: 'all' | 'unread' | 'buyers' | 'sellers') => void;
  onNavigateToSearch: () => void;
  className?: string;
}

// =============================================================================
// CONVERSATION PANEL COMPONENT
// =============================================================================

const ConversationPanel: React.FC<ConversationPanelProps> = ({
  conversations,
  selectedConversationId,
  searchQuery,
  filterType,
  onConversationSelect,
  onSearchChange,
  onFilterChange,
  onNavigateToSearch,
  className = '',
}) => {
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

  const unreadCount = conversations.filter(c => c.unreadCount > 0).length;

  return (
    <div
      className={`conversation-panel bg-white border-r border-gray-200 flex flex-col ${className}`}
    >
      {/* Panel Header */}
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
            onChange={e => onSearchChange(e.target.value)}
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
              className="text-xs capitalize relative"
              onPress={() => onFilterChange(filter)}
            >
              {filter}
              {filter === 'unread' && unreadCount > 0 && (
                <Badge
                  content={unreadCount}
                  size="sm"
                  variant="solid"
                  color="danger"
                  className="absolute -top-1 -right-1"
                >
                  {unreadCount}
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
              onPress={onNavigateToSearch}
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
                  selectedConversationId === conversation.id
                    ? 'bg-primary-50 border border-primary-200'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => onConversationSelect(conversation.id)}
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
  );
};

export default ConversationPanel;
