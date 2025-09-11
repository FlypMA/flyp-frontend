// 🏢 Business Modal Context
// Location: src/app/contexts/BusinessModalContext.tsx
// Purpose: Manage business-related modal states

import React, { createContext, useContext, ReactNode, useState } from 'react';

interface BusinessModalContextType {
  isOpen: boolean;
  modalType: string | null;
  modalData: any;
  openModal: (type: string, data?: any) => void;
  closeModal: () => void;
}

const BusinessModalContext = createContext<BusinessModalContextType | null>(null);

export const useBusinessModal = () => {
  const context = useContext(BusinessModalContext);
  if (!context) {
    throw new Error('useBusinessModal must be used within BusinessModalProvider');
  }
  return context;
};

interface BusinessModalProviderProps {
  children: ReactNode;
}

export const BusinessModalProvider: React.FC<BusinessModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);
  const [modalData, setModalData] = useState<any>(null);

  const openModal = (type: string, data?: any) => {
    setModalType(type);
    setModalData(data);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalType(null);
    setModalData(null);
  };

  const value: BusinessModalContextType = {
    isOpen,
    modalType,
    modalData,
    openModal,
    closeModal,
  };

  return <BusinessModalContext.Provider value={value}>{children}</BusinessModalContext.Provider>;
};

export default BusinessModalProvider;
