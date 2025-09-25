// 📁 Conversation Hooks Index
// Location: src/features/phase1/conversations/hooks/index.ts
// Purpose: Export all conversation-related hooks

export {
  useBreakpointDetection,
  useContextDetection,
  useContextPanel,
  usePanelLayout,
} from './useContextPanel';
export { ConversationProvider, useConversationContext } from './useConversationContext';
