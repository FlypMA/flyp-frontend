// 🔐 Authentication Providers - User authentication layer
// Auth state, session management - Layer 2
import React from 'react';
import { SimpleAuthProvider } from '@auth/services/SimpleAuthContext';
import { AuthModalProvider } from '@auth/stores/AuthModalContext';

interface AuthenticationProvidersProps {
  children: React.ReactNode;
}

/**
 * Authentication Providers - User auth and modal management
 * Layer 2: Authentication state and auth-related modals
 *
 * Provider Hierarchy:
 * 1. SimpleAuthProvider - Core authentication state
 * 2. AuthModalProvider - Authentication UI modals (depends on auth state)
 */
export const AuthenticationProviders: React.FC<AuthenticationProvidersProps> = ({ children }) => {
  return (
    <SimpleAuthProvider>
      <AuthModalProvider>{children}</AuthModalProvider>
    </SimpleAuthProvider>
  );
};
