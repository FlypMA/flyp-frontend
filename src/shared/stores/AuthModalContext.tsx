// 🔐 Auth Modal Context
// Location: src/shared/stores/AuthModalContext.tsx
// Purpose: Manage authentication modal states

import React, { createContext, useContext, ReactNode, useState } from 'react';

interface AuthModalContextType {
  isLoginOpen: boolean;
  isSignupOpen: boolean;
  isForgotPasswordOpen: boolean;
  openLogin: () => void;
  openSignup: () => void;
  openForgotPassword: () => void;
  closeAll: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | null>(null);

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('useAuthModal must be used within AuthModalProvider');
  }
  return context;
};

interface AuthModalProviderProps {
  children: ReactNode;
}

export const AuthModalProvider: React.FC<AuthModalProviderProps> = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsSignupOpen(false);
    setIsForgotPasswordOpen(false);
  };

  const openSignup = () => {
    setIsSignupOpen(true);
    setIsLoginOpen(false);
    setIsForgotPasswordOpen(false);
  };

  const openForgotPassword = () => {
    setIsForgotPasswordOpen(true);
    setIsLoginOpen(false);
    setIsSignupOpen(false);
  };

  const closeAll = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(false);
    setIsForgotPasswordOpen(false);
  };

  const value: AuthModalContextType = {
    isLoginOpen,
    isSignupOpen,
    isForgotPasswordOpen,
    openLogin,
    openSignup,
    openForgotPassword,
    closeAll,
  };

  return <AuthModalContext.Provider value={value}>{children}</AuthModalContext.Provider>;
};

export default AuthModalProvider;
