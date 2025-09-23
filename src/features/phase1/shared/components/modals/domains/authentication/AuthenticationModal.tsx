/**
 * 🔐 Authentication Modal - Enterprise Implementation
 * Location: src/shared/components/modals/domains/authentication/AuthenticationModal.tsx
 * Purpose: Unified authentication modal using TwoPanelModal foundation
 *
 * @example
 * <AuthenticationModal
 *   type="login"
 *   isOpen={isOpen}
 *   onClose={onClose}
 *   onSuccess={handleAuthSuccess}
 * />
 */

import React from 'react';
import { TwoPanelModal } from '../../foundations';
import { LoginPanel } from './panels/LoginPanel';
import { SignupPanel } from './panels/SignupPanel';
import { WelcomePanel } from './panels/WelcomePanel';

export type AuthenticationType = 'login' | 'signup';

interface AuthenticationModalProps {
  /** Type of authentication flow */
  type: AuthenticationType;
  /** Whether the modal is open */
  isOpen: boolean;
  /** Function to call when modal should close */
  onClose: () => void;
  /** Function to call on successful authentication */
  onSuccess?: (user: any) => void;
  /** Function to switch between login/signup */
  onSwitchType?: (type: AuthenticationType) => void;
  /** Initial redirect path after authentication */
  redirectPath?: string;
}

export const AuthenticationModal: React.FC<AuthenticationModalProps> = ({
  type,
  isOpen,
  onClose,
  onSuccess,
  onSwitchType,
  redirectPath,
}) => {
  const renderLeftPanel = () => {
    switch (type) {
      case 'login':
        return (
          <LoginPanel
            onClose={onClose}
            onSuccess={onSuccess}
            onSwitchToSignup={() => onSwitchType?.('signup')}
            redirectPath={redirectPath}
          />
        );
      case 'signup':
        return (
          <SignupPanel
            onClose={onClose}
            onSuccess={onSuccess}
            onSwitchToLogin={() => onSwitchType?.('login')}
            redirectPath={redirectPath}
          />
        );
      default:
        return null;
    }
  };

  const renderRightPanel = () => {
    return <WelcomePanel type={type} onSwitchType={onSwitchType} />;
  };

  return (
    <TwoPanelModal
      isOpen={isOpen}
      onClose={onClose}
      leftPanel={renderLeftPanel()}
      rightPanel={renderRightPanel()}
      leftPanelWidth="md"
      rightPanelBackground="/images/auth-background.jpg"
      closeButtonAriaLabel={`Close ${type} modal`}
    />
  );
};

export default AuthenticationModal;
