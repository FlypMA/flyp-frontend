// 🔐 Authentication Providers - Auth context and modal management
// Location: src/app/providers/authentication-providers.tsx
// Purpose: Authentication-related providers for the application

import React from 'react';
import { AuthModalProvider } from '../../features/authentication/hooks/useAuthModal';

interface AuthenticationProvidersProps {
  children: React.ReactNode;
}

export const AuthenticationProviders: React.FC<AuthenticationProvidersProps> = ({ children }) => {
  return <AuthModalProvider>{children}</AuthModalProvider>;
};

export default AuthenticationProviders;
