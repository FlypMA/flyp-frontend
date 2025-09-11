// 🔐 Auth Store - Centralized authentication state
// Eliminates scattered auth useState across components
import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { AuthState } from './store-types';
import { User } from '@shared/types/user.types';

interface AuthActions {
  // Authentication Actions
  setUser: (user: User | null) => void;
  setAuthenticating: (isLoading: boolean) => void;
  setToken: (token: string | null) => void;
  setAuthCheckComplete: (complete: boolean) => void;

  // Convenience Methods
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;

  // Auth Check
  checkAuthStatus: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
}

/**
 * Auth Store - Centralized authentication state management
 *
 * ✅ BEFORE: Every component had useState for:
 *    - user, setUser
 *    - isAuthenticated, setIsAuthenticated
 *    - isLoading, setIsLoading
 *    - hasToken, setHasToken
 *    - authCheckComplete, setAuthCheckComplete
 *
 * ✅ AFTER: Single source of truth for all auth state
 *    - Eliminates duplicate auth checks
 *    - Consistent authentication across app
 *    - Persisted authentication state
 *    - Automatic token refresh
 */
export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      subscribeWithSelector((set, get) => ({
        // Initial State
        user: null,
        isAuthenticated: false,
        isLoading: false,
        token: null,
        hasToken: false,
        authCheckComplete: false,
        lastAuthCheck: 0,
        userRole: null,
        permissions: [],

        // Basic Actions
        setUser: (user: User | null) => {
          set(
            {
              user,
              isAuthenticated: !!user,
              userRole: user?.role || null,
              permissions: user?.permissions || [],
            },
            false,
            'setUser'
          );
        },

        setAuthenticating: (isLoading: boolean) => {
          set({ isLoading }, false, 'setAuthenticating');
        },

        setToken: (token: string | null) => {
          set(
            {
              token,
              hasToken: !!token,
            },
            false,
            'setToken'
          );

          // Store token in localStorage for API calls
          if (token) {
            localStorage.setItem('authToken', token);
          } else {
            localStorage.removeItem('authToken');
          }
        },

        setAuthCheckComplete: (complete: boolean) => {
          set(
            {
              authCheckComplete: complete,
              lastAuthCheck: complete ? Date.now() : 0,
            },
            false,
            'setAuthCheckComplete'
          );
        },

        // Convenience Methods
        login: (user: User, token: string) => {
          set(
            {
              user,
              token,
              isAuthenticated: true,
              hasToken: true,
              authCheckComplete: true,
              lastAuthCheck: Date.now(),
              userRole: user.role,
              permissions: user.permissions || [],
              isLoading: false,
            },
            false,
            'login'
          );

          localStorage.setItem('authToken', token);
        },

        logout: () => {
          set(
            {
              user: null,
              token: null,
              isAuthenticated: false,
              hasToken: false,
              authCheckComplete: true,
              userRole: null,
              permissions: [],
              isLoading: false,
            },
            false,
            'logout'
          );

          localStorage.removeItem('authToken');
        },

        updateUser: (userData: Partial<User>) => {
          const currentUser = get().user;
          if (currentUser) {
            const updatedUser = { ...currentUser, ...userData };
            set(
              {
                user: updatedUser,
                userRole: updatedUser.role,
                permissions: updatedUser.permissions || [],
              },
              false,
              'updateUser'
            );
          }
        },

        // Auth Check Implementation
        checkAuthStatus: async () => {
          set({ isLoading: true }, false, 'checkAuthStatus:start');

          try {
            const token = localStorage.getItem('authToken');
            if (!token) {
              set(
                {
                  isLoading: false,
                  authCheckComplete: true,
                  lastAuthCheck: Date.now(),
                },
                false,
                'checkAuthStatus:noToken'
              );
              return;
            }

            // TODO: Replace with actual auth service call
            // const response = await authService.validateToken(token);

            // Mock implementation for now
            await new Promise(resolve => setTimeout(resolve, 500));

            set(
              {
                isLoading: false,
                authCheckComplete: true,
                lastAuthCheck: Date.now(),
                hasToken: true,
                token,
              },
              false,
              'checkAuthStatus:complete'
            );
          } catch (error) {
            console.error('Auth check failed:', error);
            get().logout();
          }
        },

        refreshToken: async () => {
          try {
            const currentToken = get().token;
            if (!currentToken) return false;

            // TODO: Implement actual token refresh
            // const response = await authService.refreshToken(currentToken);

            // Mock implementation
            await new Promise(resolve => setTimeout(resolve, 300));

            return true;
          } catch (error) {
            console.error('Token refresh failed:', error);
            get().logout();
            return false;
          }
        },
      })),
      {
        name: 'auth-storage',
        partialize: state => ({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
          userRole: state.userRole,
          permissions: state.permissions,
        }),
      }
    ),
    { name: 'auth-store' }
  )
);

// =============================================================================
// SELECTOR HOOKS - Performance optimized auth access
// =============================================================================

export const useAuth = () =>
  useAuthStore(state => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    authCheckComplete: state.authCheckComplete,
    login: state.login,
    logout: state.logout,
    checkAuthStatus: state.checkAuthStatus,
  }));

export const useUser = () =>
  useAuthStore(state => ({
    user: state.user,
    userRole: state.userRole,
    permissions: state.permissions,
    updateUser: state.updateUser,
  }));

export const useAuthToken = () =>
  useAuthStore(state => ({
    token: state.token,
    hasToken: state.hasToken,
    setToken: state.setToken,
    refreshToken: state.refreshToken,
  }));

export const usePermissions = () => useAuthStore(state => state.permissions);

export const useUserRole = () => useAuthStore(state => state.userRole);
