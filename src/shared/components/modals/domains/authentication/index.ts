/**
 * 🔐 Authentication Domain - Modal Components
 * Location: src/shared/components/modals/domains/authentication/index.ts
 * Purpose: Export all authentication-related modal components
 */

// Main authentication modal
export { default as AuthenticationModal } from './AuthenticationModal';
export type { AuthenticationType } from './AuthenticationModal';

// Panel components
export { default as LoginPanel } from './panels/LoginPanel';
export { default as SignupPanel } from './panels/SignupPanel';
export { default as WelcomePanel } from './panels/WelcomePanel';

// Re-export for convenience (legacy compatibility)
export { default as LoginModal, default as SignupModal } from './AuthenticationModal';
