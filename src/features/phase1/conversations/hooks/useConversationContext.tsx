// 🎣 Conversation Context Hook
// Location: src/features/phase1/conversations/hooks/useConversationContext.ts
// Purpose: Hook for managing conversation context and transaction state

import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  Conversation,
  ConversationContext as ConversationContextType,
  ConversationMessage,
  TransactionProgress,
  TransactionStage,
  TransactionState,
} from '../types';

interface ConversationContextProviderType {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  messages: ConversationMessage[];
  selectConversation: (id: string) => void;
  addMessage: (message: ConversationMessage) => void;
  updateConversationContext: (
    conversationId: string,
    newContext: Partial<ConversationContextType>
  ) => void;
  performQuickAction: (conversationId: string, actionId: string) => void;
}

const ConversationContext = createContext<ConversationContextProviderType | undefined>(undefined);

interface ConversationProviderProps {
  children: ReactNode;
}

export const ConversationProvider: React.FC<ConversationProviderProps> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);

  const selectedConversation = conversations.find(c => c.id === selectedConversationId) || null;

  // Mock data initialization (replace with actual API calls)
  React.useEffect(() => {
    // Simulate fetching conversations and messages
    const mockConversations: Conversation[] = [
      {
        id: '1',
        participant: {
          id: 'buyer1',
          name: 'Michael Chen',
          avatar:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          role: 'buyer',
          company: 'Chen Investments',
          isOnline: true,
        },
        lastMessage: {
          content: "I'm very interested...",
          timestamp: new Date(),
          isRead: false,
          senderId: 'buyer1',
          type: 'text',
        },
        businessContext: {
          title: 'Premium Restaurant Chain',
          price: 2500000,
          currency: 'EUR',
          location: 'Brussels',
        },
        unreadCount: 2,
        isPinned: true,
        isArchived: false,
        status: 'negotiating',
        context: {
          id: 'ctx-1',
          listingId: 'listing-1',
          currentStage: 'offer',
          transactionState: {
            hasNDA: true,
            hasOffer: true,
            hasDueDiligence: false,
            hasTransaction: false,
            currentStage: 'offer',
            progress: 60,
          },
          quickActions: [
            {
              id: 'view_offer',
              label: 'View Offer',
              icon: '📄',
              action: () => {},
              available: true,
              urgency: 'medium',
            },
            {
              id: 'counter_offer',
              label: 'Counter Offer',
              icon: '✍️',
              action: () => {},
              available: true,
              urgency: 'high',
            },
            {
              id: 'request_dd',
              label: 'Request Due Diligence',
              icon: '📋',
              action: () => {},
              available: true,
              urgency: 'medium',
            },
          ],
          progress: {
            percentage: 40,
            description: 'Offer submitted, awaiting response.',
            currentStep: 'offer',
            estimatedCompletion: '2-3 weeks',
          },
          lastActivity: new Date().toISOString(),
          participants: [],
        },
      },
    ];
    setConversations(mockConversations);

    const mockMessages: ConversationMessage[] = [
      {
        id: 'msg-1',
        conversationId: '1',
        senderId: 'buyer1',
        recipientId: 'current',
        content: 'Hello!',
        sentAt: new Date().toISOString(),
        type: 'text',
        isRead: true,
      },
      {
        id: 'msg-2',
        conversationId: '1',
        senderId: 'current',
        recipientId: 'buyer1',
        content: 'Hi there!',
        sentAt: new Date().toISOString(),
        type: 'text',
        isRead: true,
      },
      {
        id: 'msg-3',
        conversationId: '1',
        senderId: 'buyer1',
        recipientId: 'current',
        content: "I'd like to make an offer.",
        sentAt: new Date().toISOString(),
        type: 'offer',
        isRead: false,
        offerDetails: {
          amount: 2200000,
          currency: 'EUR',
          terms: 'Subject to DD',
          status: 'pending',
          conditions: ['Condition 1'],
        },
      },
    ];
    setMessages(mockMessages);
  }, []);

  const selectConversation = useCallback((id: string) => {
    setSelectedConversationId(id);
    // In a real app, fetch messages for this conversation
    // setMessages(fetchedMessages);
  }, []);

  const addMessage = useCallback((newMessage: ConversationMessage) => {
    setMessages(prev => [...prev, newMessage]);
    // Update last message in conversation list
    setConversations(prev =>
      prev.map(conv =>
        conv.id === newMessage.conversationId
          ? {
              ...conv,
              lastMessage: {
                content: newMessage.content,
                timestamp: new Date(newMessage.sentAt),
                isRead: false,
                senderId: newMessage.senderId,
                type: newMessage.type,
              },
            }
          : conv
      )
    );
  }, []);

  const updateConversationContext = useCallback(
    (conversationId: string, newContext: Partial<ConversationContextType>) => {
      setConversations(prev =>
        prev.map(conv =>
          conv.id === conversationId
            ? { ...conv, context: { ...conv.context, ...newContext } }
            : conv
        )
      );
    },
    []
  );

  const performQuickAction = useCallback(
    (conversationId: string, actionId: string) => {
      // Perform action
      // Implement specific logic for each action
      const conversation = conversations.find(c => c.id === conversationId);
      if (conversation) {
        const action = conversation.context.quickActions.find(qa => qa.id === actionId);
        if (action && action.action) {
          action.action();
        }
      }
    },
    [conversations]
  );

  const value = React.useMemo(
    () => ({
      conversations,
      selectedConversation,
      messages: messages.filter(msg => msg.conversationId === selectedConversationId),
      selectConversation,
      addMessage,
      updateConversationContext,
      performQuickAction,
    }),
    [
      conversations,
      selectedConversation,
      messages,
      selectConversation,
      addMessage,
      updateConversationContext,
      performQuickAction,
      selectedConversationId,
    ]
  );

  return <ConversationContext.Provider value={value}>{children}</ConversationContext.Provider>;
};

export const useConversationContext = () => {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error('useConversationContext must be used within a ConversationProvider');
  }
  return context;
};

// Legacy hook interface - kept for backward compatibility if needed
// The new provider-based approach is recommended

interface UseConversationContextProps {
  conversationId: string;
  listingId?: string;
  currentUserId: string;
  userRole: 'buyer' | 'seller' | 'advisor';
}

export const useConversationContextLegacy = ({
  conversationId,
  listingId,
  currentUserId: _currentUserId,
  userRole,
}: UseConversationContextProps) => {
  const [context, setContext] = useState<ConversationContextType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with actual API calls
  const mockContext: ConversationContextType = {
    id: conversationId,
    listingId: listingId || 'listing-123',
    currentStage: 'offer' as TransactionStage,
    transactionState: {
      hasNDA: true,
      hasOffer: true,
      hasDueDiligence: false,
      hasTransaction: false,
      currentStage: 'offer',
      progress: 60,
    },
    quickActions: [
      {
        id: 'create_offer',
        label: 'Make an Offer',
        icon: '💰',
        action: () => {},
        available: userRole === 'buyer' && !context?.transactionState.hasOffer,
        urgency: 'high',
        description: 'Submit a formal offer for this business',
      },
      {
        id: 'request_due_diligence',
        label: 'Request Due Diligence',
        icon: '📋',
        action: () => {},
        available: userRole === 'buyer' && context?.transactionState.hasNDA,
        urgency: 'medium',
        description: 'Request specific documents and information',
      },
      {
        id: 'share_documents',
        label: 'Share Documents',
        icon: '📄',
        action: () => {},
        available: userRole === 'seller',
        urgency: 'low',
        description: 'Upload and share business documents',
      },
      {
        id: 'schedule_call',
        label: 'Schedule Call',
        icon: '📞',
        action: () => {},
        available: true,
        urgency: 'low',
        description: 'Schedule a video or phone call',
      },
    ],
    progress: {
      percentage: 60,
      description: 'Offer submitted, awaiting response',
      currentStep: 'Offer Review',
      nextStep: 'Due Diligence',
      estimatedCompletion: '2-3 weeks',
    },
    lastActivity: new Date().toISOString(),
    participants: [
      {
        id: 'buyer-1',
        name: 'Michael Chen',
        role: 'buyer',
        company: 'Chen Investments',
        isOnline: true,
      },
      {
        id: 'seller-1',
        name: 'John Smith',
        role: 'seller',
        company: 'Smith Enterprises',
        isOnline: false,
        lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
    ],
    businessContext: {
      title: 'Premium Restaurant Chain - Brussels',
      price: 2500000,
      currency: 'EUR',
      location: 'Brussels, Belgium',
      sector: 'Food & Beverage',
    },
  };

  const loadContext = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await conversationService.getContext(conversationId);
      // setContext(response.data);

      // Mock delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setContext(mockContext);
    } catch (error) {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  }, [conversationId, mockContext]);

  const updateTransactionState = useCallback((updates: Partial<TransactionState>) => {
    setContext(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        transactionState: {
          ...prev.transactionState,
          ...updates,
        },
      };
    });
  }, []);

  const updateProgress = useCallback((updates: Partial<TransactionProgress>) => {
    setContext(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        progress: {
          ...prev.progress,
          ...updates,
        },
      };
    });
  }, []);

  const updateStage = useCallback((newStage: TransactionStage) => {
    setContext(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        currentStage: newStage,
        transactionState: {
          ...prev.transactionState,
          currentStage: newStage,
        },
      };
    });
  }, []);

  const executeQuickAction = useCallback(
    (actionId: string) => {
      const action = context?.quickActions.find(a => a.id === actionId);
      if (action && action.available) {
        action.action();
      }
    },
    [context?.quickActions]
  );

  const refreshContext = useCallback(() => {
    loadContext();
  }, [loadContext]);

  useEffect(() => {
    loadContext();
  }, [loadContext]);

  return {
    context,
    isLoading,
    updateTransactionState,
    updateProgress,
    updateStage,
    executeQuickAction,
    refreshContext,
  };
};
