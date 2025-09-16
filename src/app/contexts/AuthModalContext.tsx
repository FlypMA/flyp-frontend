/**
 * AuthModalContext - Compatibility Layer
 * 
 * Re-exports the AuthModal context from the features directory
 * for backward compatibility with existing import paths.
 */

export {
  useAuthModal,
  AuthModalProvider,
  AuthModalContext,
  type ModalType,
  type PostAuthRedirect,
  type AuthModalContextType,
} from '../../features/authentication/hooks/useAuthModal';
