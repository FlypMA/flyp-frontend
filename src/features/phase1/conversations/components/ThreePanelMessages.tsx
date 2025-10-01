// 🎯 Three Panel Messages Component
// Location: src/features/phase1/conversations/components/ThreePanelMessages.tsx
// Purpose: Main three-panel messaging interface with context awareness

import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User as UserType } from '../../../../types/user.consolidated';

// Import conversation components
import { Conversation, ConversationMessage } from '../types';
import { DocumentSharingModal, DueDiligenceRequestModal, OfferCreationModal } from './modals';

// Import three-panel components
import ChatPanel from './panels/ChatPanel';
import ContextPanel from './panels/ContextPanel';
import EnhancedConversationPanel from './panels/EnhancedConversationPanel';
import ThreePanelLayout from './panels/ThreePanelLayout';

// Import context panel hooks
import { useContextPanel } from '../hooks/useContextPanel';

// =============================================================================
// THREE PANEL MESSAGES COMPONENT
// =============================================================================

// Internal component that uses the conversation context
const ThreePanelMessagesContent: React.FC = () => {
  const navigate = useNavigate();
  // Mock user data for demonstration
  const [user] = useState<UserType | null>({
    id: 'user-2',
    email: 'sarah@techstartup.com',
    name: 'Sarah Johnson',
    role: 'seller',
    company_name: 'TechStartup Inc',
    country: 'US',
    email_verified: true,
    auth_provider: 'email',
    language_preference: 'en',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
  const [newMessage, setNewMessage] = useState('');

  // Prevent body scroll and horizontal overflow on messages page
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.maxWidth = '100vw';
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.maxWidth = '100vw';

    return () => {
      document.body.style.overflow = '';
      document.body.style.maxWidth = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.maxWidth = '';
    };
  }, []);

  // Modal states
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showDDModal, setShowDDModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);

  // Use conversation context hook
  // Mock conversation data for demonstration
  const mockConversations: Conversation[] = [
    {
      id: 'conv-1',
      participant: {
        id: 'user-1',
        name: 'Michael Chen',
        role: 'buyer',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        company: 'Chen Investments',
        isOnline: true,
      },
      lastMessage: {
        content:
          "I'm very interested in your business. Can we schedule a call to discuss the details?",
        timestamp: new Date(),
        isRead: false,
        senderId: 'user-1',
        type: 'text',
      },
      businessContext: {
        title: 'TechStartup Inc - SaaS Platform',
        price: 2500000,
        currency: 'USD',
        location: 'San Francisco, CA',
        photos: [
          {
            id: 'photo-1',
            url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
            caption: 'Modern office space with collaborative work areas',
          },
          {
            id: 'photo-2',
            url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
            caption: 'Team meeting room with state-of-the-art technology',
          },
          {
            id: 'photo-3',
            url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
            caption: 'Reception area and company branding',
          },
        ],
      } as any,
      unreadCount: 1,
      isPinned: false,
      isArchived: false,
      status: 'active',
      context: {
        id: 'conv-1',
        listingId: 'biz-1',
        currentStage: 'inquiry',
        transactionState: 'active' as any,
        quickActions: [],
        progress: {
          percentage: 25,
          description: 'Initial inquiry stage',
          currentStep: 'inquiry',
          nextStep: 'Schedule call',
        },
        lastActivity: new Date().toISOString(),
        participants: [
          {
            id: 'user-1',
            name: 'Michael Chen',
            role: 'buyer',
            company: 'Chen Investments',
            avatar:
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            isOnline: true,
          },
          {
            id: 'user-2',
            name: 'Sarah Johnson',
            role: 'seller',
            company: 'TechStartup Inc',
            avatar:
              'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
            isOnline: false,
          },
        ],
        businessContext: {
          title: 'TechStartup Inc - SaaS Platform',
          price: 2500000,
          currency: 'USD',
          location: 'San Francisco, CA',
          sector: 'Technology',
          photos: [
            {
              id: 'photo-1',
              url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
              caption: 'Modern office space with collaborative work areas',
            },
            {
              id: 'photo-2',
              url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
              caption: 'Team meeting room with state-of-the-art technology',
            },
            {
              id: 'photo-3',
              url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
              caption: 'Reception area and company branding',
            },
          ],
        } as any,
      },
    },
  ];

  const mockMessages: ConversationMessage[] = [
    {
      id: 'msg-1',
      conversationId: 'conv-1',
      senderId: 'user-1',
      recipientId: 'user-2',
      content:
        "I'm very interested in your business. Can we schedule a call to discuss the details?",
      sentAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      readAt: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
      isRead: true,
      type: 'text',
    },
    {
      id: 'msg-2',
      conversationId: 'conv-1',
      senderId: 'user-2',
      recipientId: 'user-1',
      content:
        "Absolutely! I'd love to discuss the opportunity. I'm available tomorrow at 2 PM PST. Does that work for you?",
      sentAt: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
      readAt: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
      isRead: true,
      type: 'text',
    },
    {
      id: 'msg-3',
      conversationId: 'conv-1',
      senderId: 'user-1',
      recipientId: 'user-2',
      content:
        "Perfect! 2 PM PST works great. I'll send you a calendar invite. Looking forward to learning more about your business.",
      sentAt: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
      readAt: undefined,
      isRead: false,
      type: 'text',
    },
  ];

  // Local state for conversations and messages
  const [conversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(
    mockConversations[0]
  );
  const [messages, setMessages] = useState<ConversationMessage[]>(mockMessages);

  // Conversation management functions
  const selectConversation = useCallback(
    (conversationId: string) => {
      const conversation = conversations.find(c => c.id === conversationId);
      setSelectedConversation(conversation || null);
    },
    [conversations]
  );

  const addMessage = useCallback((message: ConversationMessage) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const performQuickAction = useCallback((actionId: string) => {
    // Handle quick actions
    // TODO: Implement quick action handling
    void actionId;
  }, []);

  // Use context panel hooks
  const { autoSwitchContext, currentBreakpoint, togglePanel, closeMobileMenu } = useContextPanel();

  // Auto-select first conversation on mount (only on desktop)
  useEffect(() => {
    if (conversations.length > 0 && !selectedConversation && currentBreakpoint !== 'mobile') {
      selectConversation(conversations[0].id);
    }
  }, [conversations, selectedConversation, selectConversation, currentBreakpoint]);

  // Auto-switch context when conversation changes
  useEffect(() => {
    if (selectedConversation) {
      autoSwitchContext(selectedConversation);

      // On mobile: when conversation is selected, close the left panel to show chat
      if (currentBreakpoint === 'mobile') {
        togglePanel('left'); // Close conversation list
      }
    }
  }, [selectedConversation, autoSwitchContext, currentBreakpoint, togglePanel]);

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
        performQuickAction(actionId);
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

  return (
    <div className="h-screen w-screen max-w-full overflow-hidden bg-gray-50">
      <ThreePanelLayout>
        {{
          leftPanel: (
            <EnhancedConversationPanel
              conversations={conversations}
              selectedConversationId={selectedConversation?.id || null}
              onConversationSelect={selectConversation}
              onNavigateToSearch={() => navigate('/search')}
            />
          ),
          middlePanel: (
            <ChatPanel
              conversation={selectedConversation}
              messages={messages}
              newMessage={newMessage}
              currentUserId={user?.id || 'current-user'}
              onMessageChange={setNewMessage}
              onSendMessage={handleSendMessage}
              onQuickAction={handleQuickAction}
              onNavigateToBusiness={() => navigate('/my-business/overview')}
            />
          ),
          rightPanel: (
            <ContextPanel conversation={selectedConversation} onQuickAction={handleQuickAction} />
          ),
        }}
      </ThreePanelLayout>

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

// Main component that provides the conversation context
export default ThreePanelMessagesContent;
