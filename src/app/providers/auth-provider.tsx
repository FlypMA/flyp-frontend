/**
 * 🔐 Auth Provider - UpSwitch MVP
 * Combined authentication and modal management
 *
 * MVP APPROACH:
 * - Combined auth state + modal management
 * - Simple user authentication
 * - Basic modal handling
 * - No complex features
 */

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
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
  logout: () => void;

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

  // Track if we've already checked authentication to prevent repeated calls
  const hasCheckedAuth = useRef<boolean>(false);

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
      setUserState(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Optimized check that only runs once on mount
  const checkAuthOnce = useCallback(async () => {
    // Prevent multiple calls
    if (hasCheckedAuth.current) {
      return;
    }

    hasCheckedAuth.current = true;
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
      setUserState(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setUser = useCallback((user: User | null) => {
    setUserState(user);
    setIsAuthenticated(!!user);
    // Reset auth check flag when user changes
    hasCheckedAuth.current = false;
  }, []);

  const logout = useCallback(() => {
    // Clear user state
    setUserState(null);
    setIsAuthenticated(false);
    hasCheckedAuth.current = false;

    // Clear auth data from storage
    authService.logout();

    // Dispatch logout event
    window.dispatchEvent(new CustomEvent('auth-logout'));
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
    checkAuthOnce();
  }, [checkAuthOnce]);

  // Listen for authentication events from modals
  useEffect(() => {
    const handleUserLogin = (event: CustomEvent) => {
      if (event.detail) {
        setUserState(event.detail);
        setIsAuthenticated(true);
        hasCheckedAuth.current = false; // Reset flag for future checks
      }
    };

    const handleUserSignup = (event: CustomEvent) => {
      if (event.detail) {
        setUserState(event.detail);
        setIsAuthenticated(true);
        hasCheckedAuth.current = false; // Reset flag for future checks
      }
    };

    const handleAuthChange = () => {
      hasCheckedAuth.current = false; // Reset flag to allow recheck
      checkAuth();
    };

    const handleAuthLogout = () => {
      setUserState(null);
      setIsAuthenticated(false);
      hasCheckedAuth.current = false; // Reset flag for future checks
    };

    window.addEventListener('user-login', handleUserLogin as EventListener);
    window.addEventListener('user-signup', handleUserSignup as EventListener);
    window.addEventListener('auth-change', handleAuthChange);
    window.addEventListener('auth-logout', handleAuthLogout);

    return () => {
      window.removeEventListener('user-login', handleUserLogin as EventListener);
      window.removeEventListener('user-signup', handleUserSignup as EventListener);
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('auth-logout', handleAuthLogout);
    };
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
    logout,

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
