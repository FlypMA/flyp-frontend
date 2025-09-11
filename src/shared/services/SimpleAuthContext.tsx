// 🔐 Simple Auth Context (Legacy Support)
// Location: src/shared/services/SimpleAuthContext.tsx
// Purpose: Basic authentication context for backward compatibility

import React, { createContext, useContext, ReactNode, useState } from 'react';

interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface SimpleAuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const SimpleAuthContext = createContext<SimpleAuthContextType | null>(null);

export const useSimpleAuth = () => {
  const context = useContext(SimpleAuthContext);
  if (!context) {
    throw new Error('useSimpleAuth must be used within SimpleAuthProvider');
  }
  return context;
};

interface SimpleAuthProviderProps {
  children: ReactNode;
}

export const SimpleAuthProvider: React.FC<SimpleAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // TODO: Implement actual login logic
      const mockUser: AuthUser = {
        id: '1',
        email,
        name: 'Test User',
        role: 'buyer',
      };
      setUser(mockUser);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value: SimpleAuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
  };

  return <SimpleAuthContext.Provider value={value}>{children}</SimpleAuthContext.Provider>;
};

export default SimpleAuthContext;
