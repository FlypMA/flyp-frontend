/**
 * 🎨 UI Provider - BetweenDeals MVP
 * Basic UI state management
 * 
 * MVP APPROACH:
 * - Simple UI state only
 * - Sidebar, notifications, loading
 * - No complex features
 * - Essential functionality only
 */

import React, { createContext, useContext, useState } from 'react';

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

interface UIContextType {
  // Sidebar state
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  
  // Loading state
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  
  // Notifications
  notifications: Notification[];
  addNotification: (type: 'success' | 'error' | 'warning' | 'info', message: string) => void;
  removeNotification: (id: string) => void;
}

// =============================================================================
// CONTEXT
// =============================================================================

const UIContext = createContext<UIContextType | undefined>(undefined);

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};

// =============================================================================
// PROVIDER COMPONENT
// =============================================================================

interface UIProviderProps {
  children: React.ReactNode;
}

export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  // State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // =============================================================================
  // FUNCTIONS
  // =============================================================================

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const addNotification = (type: 'success' | 'error' | 'warning' | 'info', message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    const notification: Notification = { id, type, message };
    
    setNotifications(prev => [...prev, notification]);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // =============================================================================
  // CONTEXT VALUE
  // =============================================================================

  const contextValue: UIContextType = {
    // Sidebar state
    isSidebarOpen,
    toggleSidebar,
    
    // Loading state
    isLoading,
    setIsLoading,
    
    // Notifications
    notifications,
    addNotification,
    removeNotification,
  };

  return (
    <UIContext.Provider value={contextValue}>
      {children}
    </UIContext.Provider>
  );
};
