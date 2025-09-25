// Purpose: Enhanced messaging interface with three-panel layout
// Uses modular conversation components for better maintainability

import React from 'react';

// Import the new three-panel messaging component
import ThreePanelMessages from '@/features/phase1/conversations/components/ThreePanelMessages';

/**
 * Messages Page Component
 *
 * This component now uses the modular three-panel messaging interface
 * from the conversations feature. The three-panel layout includes:
 *
 * - Left Panel: Conversation list with search and filtering
 * - Middle Panel: Chat interface with message history
 * - Right Panel: Context-aware information panel
 *
 * The right panel automatically switches context based on conversation stage:
 * - Business Information: Initial inquiry and business details
 * - Due Diligence: Document requests and checklist management
 * - Transaction: Offer negotiation and closing process
 * - Documents: File sharing and document management
 * - Communication: Meeting notes and action items
 */
const Messages: React.FC = () => {
  return <ThreePanelMessages />;
};

export default Messages;
