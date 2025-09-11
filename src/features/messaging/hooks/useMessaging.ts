// 💬 Messaging Hook
// Location: src/features/messaging/hooks/useMessaging.ts
// Purpose: Handle messaging, conversations, and real-time communication

import { useState, useEffect, useCallback, useRef } from 'react';

// Types
interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  recipientId: string;
  content: string;
  type: 'text' | 'image' | 'document' | 'system';
  timestamp: Date;
  read: boolean;
  edited: boolean;
  attachments: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
  }>;
}

interface Conversation {
  id: string;
  participants: Array<{
    id: string;
    name: string;
    avatar: string;
    role: 'buyer' | 'seller' | 'broker';
    online: boolean;
    lastSeen: Date;
  }>;
  lastMessage: Message | null;
  unreadCount: number;
  listingId?: string;
  listingTitle?: string;
  createdAt: Date;
  updatedAt: Date;
  archived: boolean;
  priority: 'normal' | 'high' | 'urgent';
}

interface UseMessagingReturn {
  // Conversations
  conversations: Conversation[];
  currentConversation: Conversation | null;
  isLoadingConversations: boolean;

  // Messages
  messages: Message[];
  isLoadingMessages: boolean;
  isSendingMessage: boolean;

  // Actions
  selectConversation: (conversationId: string) => Promise<void>;
  sendMessage: (content: string, type?: Message['type']) => Promise<void>;
  editMessage: (messageId: string, newContent: string) => Promise<void>;
  deleteMessage: (messageId: string) => Promise<void>;
  markAsRead: (conversationId: string) => Promise<void>;

  // File handling
  sendFile: (file: File, description?: string) => Promise<void>;

  // Conversation management
  createConversation: (participantId: string, listingId?: string) => Promise<string>;
  archiveConversation: (conversationId: string) => Promise<void>;
  deleteConversation: (conversationId: string) => Promise<void>;

  // Search and filters
  searchConversations: (query: string) => Conversation[];
  filterByStatus: (status: 'all' | 'unread' | 'archived') => Conversation[];

  // Real-time status
  isTyping: boolean;
  participantTyping: string | null;
  connectionStatus: 'connected' | 'connecting' | 'disconnected';

  // Quick actions
  quickReply: (template: string) => Promise<void>;
  shareListing: (listingId: string) => Promise<void>;
  requestDocuments: (documents: string[]) => Promise<void>;

  // Statistics
  totalUnreadMessages: number;
  activeConversations: number;
  avgResponseTime: number;
}

const QUICK_REPLY_TEMPLATES = {
  greeting: 'Hello! Thank you for your interest in this business opportunity.',
  info_request: "I'd be happy to provide more information about this listing.",
  meeting: 'Would you like to schedule a call to discuss this opportunity further?',
  documents: 'I can provide additional financial documents upon signing an NDA.',
  pricing: 'The price is negotiable based on due diligence findings.',
  timeline: "We're looking to complete the sale within 3-6 months.",
};

export const useMessaging = (): UseMessagingReturn => {
  // State
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingConversations, setIsLoadingConversations] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [participantTyping, setParticipantTyping] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    'connected' | 'connecting' | 'disconnected'
  >('connected');

  const wsRef = useRef<WebSocket | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load conversations
  const loadConversations = useCallback(async () => {
    setIsLoadingConversations(true);

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock conversations
      const mockConversations: Conversation[] = [
        {
          id: 'conv-1',
          participants: [
            {
              id: 'user-1',
              name: 'John Buyer',
              avatar: '/api/placeholder/40/40?user=1',
              role: 'buyer',
              online: true,
              lastSeen: new Date(),
            },
            {
              id: 'user-2',
              name: 'Sarah Seller',
              avatar: '/api/placeholder/40/40?user=2',
              role: 'seller',
              online: false,
              lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
            },
          ],
          lastMessage: {
            id: 'msg-1',
            conversationId: 'conv-1',
            senderId: 'user-1',
            recipientId: 'user-2',
            content: "I'm interested in learning more about the financial performance.",
            type: 'text',
            timestamp: new Date(Date.now() - 30 * 60 * 1000),
            read: false,
            edited: false,
            attachments: [],
          },
          unreadCount: 2,
          listingId: 'listing-1',
          listingTitle: 'Tech Startup for Sale',
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - 30 * 60 * 1000),
          archived: false,
          priority: 'high',
        },
        {
          id: 'conv-2',
          participants: [
            {
              id: 'user-3',
              name: 'Mike Broker',
              avatar: '/api/placeholder/40/40?user=3',
              role: 'broker',
              online: true,
              lastSeen: new Date(),
            },
          ],
          lastMessage: {
            id: 'msg-2',
            conversationId: 'conv-2',
            senderId: 'user-3',
            recipientId: 'current-user',
            content: 'I have a client who might be interested in this opportunity.',
            type: 'text',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            read: true,
            edited: false,
            attachments: [],
          },
          unreadCount: 0,
          createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
          archived: false,
          priority: 'normal',
        },
      ];

      setConversations(mockConversations);
    } catch (error) {
      console.error('Failed to load conversations:', error);
    } finally {
      setIsLoadingConversations(false);
    }
  }, []);

  // Select conversation and load messages
  const selectConversation = useCallback(
    async (conversationId: string) => {
      const conversation = conversations.find(c => c.id === conversationId);
      if (!conversation) return;

      setCurrentConversation(conversation);
      setIsLoadingMessages(true);

      try {
        // TODO: Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 800));

        // Mock messages for the conversation
        const mockMessages: Message[] = [
          {
            id: 'msg-1',
            conversationId,
            senderId: conversation.participants[0].id,
            recipientId: 'current-user',
            content: "Hello! I saw your business listing and I'm very interested.",
            type: 'text',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
            read: true,
            edited: false,
            attachments: [],
          },
          {
            id: 'msg-2',
            conversationId,
            senderId: 'current-user',
            recipientId: conversation.participants[0].id,
            content: "Thank you for your interest! I'd be happy to provide more details.",
            type: 'text',
            timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000),
            read: true,
            edited: false,
            attachments: [],
          },
          {
            id: 'msg-3',
            conversationId,
            senderId: conversation.participants[0].id,
            recipientId: 'current-user',
            content: 'Could you share the financial statements for the last 3 years?',
            type: 'text',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            read: true,
            edited: false,
            attachments: [],
          },
        ];

        setMessages(mockMessages);

        // Mark as read
        await markAsRead(conversationId);
      } catch (error) {
        console.error('Failed to load messages:', error);
      } finally {
        setIsLoadingMessages(false);
      }
    },
    [conversations]
  );

  // Send message
  const sendMessage = useCallback(
    async (content: string, type: Message['type'] = 'text') => {
      if (!currentConversation || !content.trim()) return;

      setIsSendingMessage(true);

      try {
        // TODO: Replace with actual API call
        const newMessage: Message = {
          id: `msg-${Date.now()}`,
          conversationId: currentConversation.id,
          senderId: 'current-user',
          recipientId: currentConversation.participants[0].id,
          content: content.trim(),
          type,
          timestamp: new Date(),
          read: false,
          edited: false,
          attachments: [],
        };

        // Optimistically add message
        setMessages(prev => [...prev, newMessage]);

        // Update conversation
        setConversations(prev =>
          prev.map(conv =>
            conv.id === currentConversation.id
              ? {
                  ...conv,
                  lastMessage: newMessage,
                  updatedAt: new Date(),
                }
              : conv
          )
        );

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error('Failed to send message:', error);
        // Remove optimistic message on error
        setMessages(prev => prev.filter(msg => msg.id !== `msg-${Date.now()}`));
      } finally {
        setIsSendingMessage(false);
      }
    },
    [currentConversation]
  );

  // Edit message
  const editMessage = useCallback(async (messageId: string, newContent: string) => {
    if (!newContent.trim()) return;

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 300));

      setMessages(prev =>
        prev.map(msg =>
          msg.id === messageId
            ? {
                ...msg,
                content: newContent.trim(),
                edited: true,
              }
            : msg
        )
      );
    } catch (error) {
      console.error('Failed to edit message:', error);
      throw error;
    }
  }, []);

  // Delete message
  const deleteMessage = useCallback(async (messageId: string) => {
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 300));

      setMessages(prev => prev.filter(msg => msg.id !== messageId));
    } catch (error) {
      console.error('Failed to delete message:', error);
      throw error;
    }
  }, []);

  // Mark as read
  const markAsRead = useCallback(async (conversationId: string) => {
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 200));

      setConversations(prev =>
        prev.map(conv => (conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv))
      );

      setMessages(prev =>
        prev.map(msg => (msg.conversationId === conversationId ? { ...msg, read: true } : msg))
      );
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  }, []);

  // Send file
  const sendFile = useCallback(
    async (file: File, description?: string) => {
      if (!currentConversation) return;

      setIsSendingMessage(true);

      try {
        // TODO: Implement actual file upload
        await new Promise(resolve => setTimeout(resolve, 2000));

        const attachment = {
          id: `attachment-${Date.now()}`,
          name: file.name,
          url: `/api/placeholder/document?file=${encodeURIComponent(file.name)}`,
          type: file.type,
          size: file.size,
        };

        const fileMessage: Message = {
          id: `msg-file-${Date.now()}`,
          conversationId: currentConversation.id,
          senderId: 'current-user',
          recipientId: currentConversation.participants[0].id,
          content: description || `Shared file: ${file.name}`,
          type: file.type.startsWith('image/') ? 'image' : 'document',
          timestamp: new Date(),
          read: false,
          edited: false,
          attachments: [attachment],
        };

        setMessages(prev => [...prev, fileMessage]);
      } catch (error) {
        console.error('Failed to send file:', error);
        throw error;
      } finally {
        setIsSendingMessage(false);
      }
    },
    [currentConversation]
  );

  // Create conversation
  const createConversation = useCallback(
    async (participantId: string, listingId?: string): Promise<string> => {
      try {
        // TODO: Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 800));

        const newConversation: Conversation = {
          id: `conv-${Date.now()}`,
          participants: [
            {
              id: participantId,
              name: 'New Contact',
              avatar: '/api/placeholder/40/40?new',
              role: 'buyer',
              online: false,
              lastSeen: new Date(),
            },
          ],
          lastMessage: null,
          unreadCount: 0,
          listingId,
          listingTitle: listingId ? 'Selected Listing' : undefined,
          createdAt: new Date(),
          updatedAt: new Date(),
          archived: false,
          priority: 'normal',
        };

        setConversations(prev => [newConversation, ...prev]);

        return newConversation.id;
      } catch (error) {
        console.error('Failed to create conversation:', error);
        throw error;
      }
    },
    []
  );

  // Archive conversation
  const archiveConversation = useCallback(async (conversationId: string) => {
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 300));

      setConversations(prev =>
        prev.map(conv => (conv.id === conversationId ? { ...conv, archived: true } : conv))
      );
    } catch (error) {
      console.error('Failed to archive conversation:', error);
      throw error;
    }
  }, []);

  // Delete conversation
  const deleteConversation = useCallback(
    async (conversationId: string) => {
      try {
        // TODO: Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 500));

        setConversations(prev => prev.filter(conv => conv.id !== conversationId));

        if (currentConversation?.id === conversationId) {
          setCurrentConversation(null);
          setMessages([]);
        }
      } catch (error) {
        console.error('Failed to delete conversation:', error);
        throw error;
      }
    },
    [currentConversation]
  );

  // Search conversations
  const searchConversations = useCallback(
    (query: string) => {
      if (!query.trim()) return conversations;

      return conversations.filter(conv => {
        const participantNames = conv.participants.map(p => p.name.toLowerCase()).join(' ');
        const listingTitle = conv.listingTitle?.toLowerCase() || '';
        const lastMessageContent = conv.lastMessage?.content.toLowerCase() || '';

        const searchText = `${participantNames} ${listingTitle} ${lastMessageContent}`;
        return searchText.includes(query.toLowerCase());
      });
    },
    [conversations]
  );

  // Filter by status
  const filterByStatus = useCallback(
    (status: 'all' | 'unread' | 'archived') => {
      switch (status) {
        case 'unread':
          return conversations.filter(conv => conv.unreadCount > 0);
        case 'archived':
          return conversations.filter(conv => conv.archived);
        default:
          return conversations.filter(conv => !conv.archived);
      }
    },
    [conversations]
  );

  // Quick reply
  const quickReply = useCallback(
    async (template: string) => {
      const message = QUICK_REPLY_TEMPLATES[template as keyof typeof QUICK_REPLY_TEMPLATES];
      if (message) {
        await sendMessage(message);
      }
    },
    [sendMessage]
  );

  // Share listing
  const shareListing = useCallback(
    async (listingId: string) => {
      await sendMessage(`I'd like to share this listing with you: [Listing ${listingId}]`, 'text');
    },
    [sendMessage]
  );

  // Request documents
  const requestDocuments = useCallback(
    async (documents: string[]) => {
      const documentList = documents.join(', ');
      await sendMessage(
        `Could you please provide the following documents: ${documentList}`,
        'text'
      );
    },
    [sendMessage]
  );

  // Computed values
  const totalUnreadMessages = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);
  const activeConversations = conversations.filter(conv => !conv.archived).length;
  const avgResponseTime = 45; // Mock value in minutes

  // Initialize WebSocket connection
  useEffect(() => {
    // TODO: Implement actual WebSocket connection
    const connectWebSocket = () => {
      setConnectionStatus('connecting');

      setTimeout(() => {
        setConnectionStatus('connected');
      }, 1000);
    };

    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  // Load initial data
  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  return {
    // Conversations
    conversations,
    currentConversation,
    isLoadingConversations,

    // Messages
    messages,
    isLoadingMessages,
    isSendingMessage,

    // Actions
    selectConversation,
    sendMessage,
    editMessage,
    deleteMessage,
    markAsRead,

    // File handling
    sendFile,

    // Conversation management
    createConversation,
    archiveConversation,
    deleteConversation,

    // Search and filters
    searchConversations,
    filterByStatus,

    // Real-time status
    isTyping,
    participantTyping,
    connectionStatus,

    // Quick actions
    quickReply,
    shareListing,
    requestDocuments,

    // Statistics
    totalUnreadMessages,
    activeConversations,
    avgResponseTime,
  };
};
