// PHASE 3: Simple AuthContext - gradually replace individual auth checks
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/users/authenticationService';
import { User } from '../../types/user.consolidated';

interface SimpleAuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
  setUser: (user: User | null) => void;
}

const SimpleAuthContext = createContext<SimpleAuthContextType | undefined>(undefined);

export const SimpleAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
      console.error('SimpleAuthContext: Auth check failed:', err);
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

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <SimpleAuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        checkAuth,
        setUser,
      }}
    >
      {children}
    </SimpleAuthContext.Provider>
  );
};

export const useSimpleAuth = () => {
  const context = useContext(SimpleAuthContext);
  if (context === undefined) {
    throw new Error('useSimpleAuth must be used within a SimpleAuthProvider');
  }
  return context;
};
