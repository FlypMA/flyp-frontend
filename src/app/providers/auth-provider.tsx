/**
 * 🔐 Auth Provider - flyp MVP
 * Combined authentication and modal management
 *
 * MVP APPROACH:
 * - Combined auth state + modal management
 * - Simple user authentication
 * - Basic modal handling
 * - No complex features
 */

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { authService } from '../../shared/services';
import { User } from '../../shared/types';

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

export type ModalType = 'signup' | 'login' | null;

interface PostAuthRedirect {
  url: string;
  state?: any;
}

interface AuthContextType {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Auth actions
  checkAuth: () => Promise<void>;
  setUser: (user: User | null) => void;

  // Modal state
  activeModal: ModalType;
  postAuthRedirect: PostAuthRedirect | null;

  // Modal actions
  openModal: (type: ModalType, redirectInfo?: PostAuthRedirect) => void;
  closeModal: () => void;
  clearRedirect: () => void;
}

// =============================================================================
// CONTEXT
// =============================================================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// =============================================================================
// PROVIDER COMPONENT
// =============================================================================

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // User state
  const [user, setUserState] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Modal state
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [postAuthRedirect, setPostAuthRedirect] = useState<PostAuthRedirect | null>(null);

  // =============================================================================
  // AUTH FUNCTIONS
  // =============================================================================

  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const authResult = await authService.checkAuthentication();
      if (authResult.isAuthenticated && authResult.user) {
        setUserState(authResult.user);
        setIsAuthenticated(true);
      } else {
        setUserState(null);
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error('AuthProvider: Auth check failed:', err);
      setUserState(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setUser = useCallback((user: User | null) => {
    setUserState(user);
    setIsAuthenticated(!!user);
  }, []);

  // =============================================================================
  // MODAL FUNCTIONS
  // =============================================================================

  const openModal = (type: ModalType, redirectInfo?: PostAuthRedirect) => {
    setActiveModal(type);
    setPostAuthRedirect(redirectInfo || null);
  };

  const closeModal = () => {
    setActiveModal(null);
    // Keep postAuthRedirect until authentication is complete
  };

  const clearRedirect = () => {
    setPostAuthRedirect(null);
  };

  // =============================================================================
  // EFFECTS
  // =============================================================================

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // =============================================================================
  // CONTEXT VALUE
  // =============================================================================

  const contextValue: AuthContextType = {
    // User state
    user,
    isAuthenticated,
    isLoading,

    // Auth actions
    checkAuth,
    setUser,

    // Modal state
    activeModal,
    postAuthRedirect,

    // Modal actions
    openModal,
    closeModal,
    clearRedirect,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
