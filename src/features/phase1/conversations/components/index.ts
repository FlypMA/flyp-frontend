// 📁 Conversation Components Index
// Location: src/features/phase1/conversations/components/index.ts
// Purpose: Export all conversation components

export { default as ThreePanelMessages } from './ThreePanelMessages';

// Re-export message components
export { default as TransactionMessage } from './messages/TransactionMessage';

// Re-export modal components
export { default as DocumentSharingModal } from './modals/DocumentSharingModal';
export { default as DueDiligenceRequestModal } from './modals/DueDiligenceRequestModal';
export { default as OfferCreationModal } from './modals/OfferCreationModal';

// Re-export panel components
export { default as ChatPanel } from './panels/ChatPanel';
export { default as ContextPanel } from './panels/ContextPanel';
export { default as EnhancedConversationPanel } from './panels/EnhancedConversationPanel';
export { default as ThreePanelLayout } from './panels/ThreePanelLayout';

// Re-export header components
export { default as MessagesHeader } from './MessagesHeader';
