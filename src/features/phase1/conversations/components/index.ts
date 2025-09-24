// 📁 Conversation Components Index
// Location: src/features/phase1/conversations/components/index.ts
// Purpose: Export all conversation components

export { default as Messages } from './Messages';
export { default as TransactionContextPanel } from './TransactionContextPanel';

// Re-export message components
export { default as TransactionMessage } from './messages/TransactionMessage';

// Re-export modal components
export { default as DocumentSharingModal } from './modals/DocumentSharingModal';
export { default as DueDiligenceRequestModal } from './modals/DueDiligenceRequestModal';
export { default as OfferCreationModal } from './modals/OfferCreationModal';
