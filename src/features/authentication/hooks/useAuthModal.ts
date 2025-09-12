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

export interface AuthModalProviderProps {
  children: ReactNode;
}

export const AuthModalProvider: React.FC<AuthModalProviderProps> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [postAuthRedirect, setPostAuthRedirect] = useState<PostAuthRedirect | null>(null);

  const openModal = (type: ModalType, redirectInfo?: PostAuthRedirect) => {
    console.log('🎭 AuthModalContext: Opening modal:', type, 'with redirect info:', redirectInfo);
    setActiveModal(type);
    setPostAuthRedirect(redirectInfo || null);
  };

  const closeModal = () => {
    console.log('🎭 AuthModalContext: Closing modal, current modal was:', activeModal);
    setActiveModal(null);
    // Keep postAuthRedirect until authentication is complete
  };

  const clearRedirect = () => {
    console.log('🎭 AuthModalContext: Clearing postAuthRedirect');
    setPostAuthRedirect(null);
  };

  const value: AuthModalContextType = {
    activeModal,
    postAuthRedirect,
    openModal,
    closeModal,
    clearRedirect,
  };

  return React.createElement(AuthModalContext.Provider, { value }, children);
};

export default useAuthModal;
