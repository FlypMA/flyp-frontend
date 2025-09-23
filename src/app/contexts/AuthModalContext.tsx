/**
 * AuthModalContext - Compatibility Layer
 *
 * Re-exports the AuthModal context from the features directory
 * for backward compatibility with existing import paths.
 */

export {
  AuthModalContext,
  AuthModalProvider,
  useAuthModal,
  type AuthModalContextType,
  type ModalType,
  type PostAuthRedirect,
} from '../../features/phase1/authentication/hooks/useAuthModal';
