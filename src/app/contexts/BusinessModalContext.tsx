import React, { createContext, useContext, useState, ReactNode } from 'react';

export type BusinessModalType = 'business-listing' | null;
export type BusinessModalStep = 'valuation-hook' | 'valuation-form' | 'valuation-result' | 'listing-pitch' | 'listing-form' | 'success';

interface PostBusinessAction {
  url?: string;
  state?: any;
  action?: 'redirect' | 'stay';
}

interface BusinessModalContextType {
  activeModal: BusinessModalType;
  modalStep: BusinessModalStep;
  postBusinessAction: PostBusinessAction | null;
  openBusinessModal: (type: BusinessModalType, step?: BusinessModalStep, postAction?: PostBusinessAction) => void;
  closeBusinessModal: () => void;
  setModalStep: (step: BusinessModalStep) => void;
  clearPostAction: () => void;
}

const BusinessModalContext = createContext<BusinessModalContextType | undefined>(undefined);

export const useBusinessModal = () => {
  const context = useContext(BusinessModalContext);
  if (!context) {
    throw new Error('useBusinessModal must be used within a BusinessModalProvider');
  }
  return context;
};

interface BusinessModalProviderProps {
  children: ReactNode;
}

export const BusinessModalProvider: React.FC<BusinessModalProviderProps> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<BusinessModalType>(null);
  const [modalStep, setModalStep] = useState<BusinessModalStep>('valuation-hook');
  const [postBusinessAction, setPostBusinessAction] = useState<PostBusinessAction | null>(null);

  const openBusinessModal = (
    type: BusinessModalType, 
    step: BusinessModalStep = 'valuation-hook', 
    postAction?: PostBusinessAction
  ) => {
    console.log('🏢 BusinessModalContext: Opening modal:', type, 'step:', step, 'postAction:', postAction);
    setActiveModal(type);
    setModalStep(step);
    setPostBusinessAction(postAction || null);
  };

  const closeBusinessModal = () => {
    console.log('🏢 BusinessModalContext: Closing modal, current modal was:', activeModal);
    setActiveModal(null);
    setModalStep('valuation-hook');
    // Keep postBusinessAction until action is complete
  };

  const clearPostAction = () => {
    console.log('🏢 BusinessModalContext: Clearing postBusinessAction');
    setPostBusinessAction(null);
  };

  return (
    <BusinessModalContext.Provider
      value={{ 
        activeModal, 
        modalStep,
        postBusinessAction, 
        openBusinessModal, 
        closeBusinessModal, 
        setModalStep,
        clearPostAction 
      }}
    >
      {children}
    </BusinessModalContext.Provider>
  );
};
