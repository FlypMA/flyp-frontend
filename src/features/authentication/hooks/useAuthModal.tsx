// 🎭 Auth Modal Hook - Enhanced modal management
// Location: src/features/authentication/hooks/useAuthModal.ts
// Purpose: Custom hook for managing authentication modals

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ModalType = 'signup' | 'login' | null;

export interface PostAuthRedirect {
  url: string;
  state?: any;
}

export interface AuthModalContextType {
  activeModal: ModalType;
  postAuthRedirect: PostAuthRedirect | null;
  openModal: (type: ModalType, redirectInfo?: PostAuthRedirect) => void;
  closeModal: () => void;
  clearRedirect: () => void;
}

export const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return context;
};

export const AuthModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [postAuthRedirect, setPostAuthRedirect] = useState<PostAuthRedirect | null>(null);

  const openModal = (type: ModalType, redirectInfo?: PostAuthRedirect) => {
    setActiveModal(type);
    if (redirectInfo) {
      setPostAuthRedirect(redirectInfo);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const clearRedirect = () => {
    setPostAuthRedirect(null);
  };

  const value: AuthModalContextType = {
    activeModal,
    postAuthRedirect,
    openModal,
    closeModal,
    clearRedirect,
  };

  return <AuthModalContext.Provider value={value}>{children}</AuthModalContext.Provider>;
};
