// 🎯 Three Panel Messages Component
// Location: src/features/phase1/conversations/components/ThreePanelMessages.tsx
// Purpose: Main three-panel messaging interface with context awareness

import { authService } from '@/shared/services/auth';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User as UserType } from '../../../../types/user.consolidated';

// Import conversation components
import { ConversationProvider, useConversationContext } from '../hooks';
import { ConversationMessage } from '../types';
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
  const [user, setUser] = useState<UserType | null>(null);
  const [newMessage, setNewMessage] = useState('');

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

  // Use context panel hooks
  const { autoSwitchContext } = useContextPanel();

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

  // Auto-switch context when conversation changes
  useEffect(() => {
    if (selectedConversation) {
      autoSwitchContext(selectedConversation);
    }
  }, [selectedConversation, autoSwitchContext]);

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

  return (
    <div className="h-screen bg-gray-50">
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
              onNavigateToSearch={() => navigate('/search')}
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
const ThreePanelMessages: React.FC = () => {
  return (
    <ConversationProvider>
      <ThreePanelMessagesContent />
    </ConversationProvider>
  );
};

export default ThreePanelMessages;
