// 🎨 UI Store - Centralized UI state management
// Eliminates scattered UI useState across components
import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { UIState, Notification } from './store-types';

interface UIActions {
  // Modal Management - eliminates modal useState
  openModal: (modalName: string, props?: Record<string, any>) => void;
  closeModal: () => void;

  // Loading States - eliminates loading useState
  setLoading: (key: string, isLoading: boolean) => void;
  isLoading: (key: string) => boolean;
  clearAllLoading: () => void;

  // Error States - eliminates error useState
  setError: (key: string, error: string | null) => void;
  clearError: (key: string) => void;
  clearAllErrors: () => void;

  // Form States - eliminates form useState
  setFormState: (formId: string, state: any) => void;
  getFormState: (formId: string) => any;
  clearFormState: (formId: string) => void;

  // Navigation - eliminates navigation useState
  toggleMenu: () => void;
  setActiveTab: (tab: string) => void;

  // Notifications - eliminates notification useState
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  clearAllNotifications: () => void;
}

/**
 * UI Store - Centralized UI state management
 *
 * ✅ BEFORE: Every component had useState for:
 *    - Loading states (setIsLoading, setLoading, etc.)
 *    - Error states (setError, setHasError, etc.)
 *    - Modal states (setIsOpen, setShowModal, etc.)
 *    - Form states (setFormData, setFieldValue, etc.)
 *
 * ✅ AFTER: Single centralized store manages all UI state
 *    - Consistent loading/error patterns
 *    - Coordinated modal management
 *    - Shared form state across components
 *    - Performance optimized with selectors
 */
export const useUIStore = create<UIState & UIActions>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      // Initial State
      activeModal: null,
      modalProps: {},
      loadingStates: {},
      errors: {},
      formStates: {},
      isMenuOpen: false,
      activeTab: 'overview',
      notifications: [],

      // Modal Actions
      openModal: (modalName: string, props = {}) => {
        set(
          {
            activeModal: modalName,
            modalProps: props,
          },
          false,
          'openModal'
        );
      },

      closeModal: () => {
        set(
          {
            activeModal: null,
            modalProps: {},
          },
          false,
          'closeModal'
        );
      },

      // Loading Actions
      setLoading: (key: string, isLoading: boolean) => {
        set(
          state => ({
            loadingStates: {
              ...state.loadingStates,
              [key]: isLoading,
            },
          }),
          false,
          `setLoading:${key}`
        );
      },

      isLoading: (key: string) => {
        return get().loadingStates[key] || false;
      },

      clearAllLoading: () => {
        set({ loadingStates: {} }, false, 'clearAllLoading');
      },

      // Error Actions
      setError: (key: string, error: string | null) => {
        set(
          state => ({
            errors: {
              ...state.errors,
              [key]: error,
            },
          }),
          false,
          `setError:${key}`
        );
      },

      clearError: (key: string) => {
        set(
          state => {
            const { [key]: removed, ...rest } = state.errors;
            return { errors: rest };
          },
          false,
          `clearError:${key}`
        );
      },

      clearAllErrors: () => {
        set({ errors: {} }, false, 'clearAllErrors');
      },

      // Form Actions
      setFormState: (formId: string, formState: any) => {
        set(
          state => ({
            formStates: {
              ...state.formStates,
              [formId]: formState,
            },
          }),
          false,
          `setFormState:${formId}`
        );
      },

      getFormState: (formId: string) => {
        return get().formStates[formId] || {};
      },

      clearFormState: (formId: string) => {
        set(
          state => {
            const { [formId]: removed, ...rest } = state.formStates;
            return { formStates: rest };
          },
          false,
          `clearFormState:${formId}`
        );
      },

      // Navigation Actions
      toggleMenu: () => {
        set(
          state => ({
            isMenuOpen: !state.isMenuOpen,
          }),
          false,
          'toggleMenu'
        );
      },

      setActiveTab: (tab: string) => {
        set({ activeTab: tab }, false, 'setActiveTab');
      },

      // Notification Actions
      addNotification: notification => {
        const newNotification: Notification = {
          ...notification,
          id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date().toISOString(),
          read: false,
        };

        set(
          state => ({
            notifications: [newNotification, ...state.notifications].slice(0, 100), // Keep max 100
          }),
          false,
          'addNotification'
        );
      },

      removeNotification: (id: string) => {
        set(
          state => ({
            notifications: state.notifications.filter(n => n.id !== id),
          }),
          false,
          'removeNotification'
        );
      },

      markAsRead: (id: string) => {
        set(
          state => ({
            notifications: state.notifications.map(n => (n.id === id ? { ...n, read: true } : n)),
          }),
          false,
          'markAsRead'
        );
      },

      clearAllNotifications: () => {
        set({ notifications: [] }, false, 'clearAllNotifications');
      },
    })),
    { name: 'ui-store' }
  )
);

// =============================================================================
// SELECTOR HOOKS - Performance optimized state access
// =============================================================================

export const useModalState = () =>
  useUIStore(state => ({
    activeModal: state.activeModal,
    modalProps: state.modalProps,
    openModal: state.openModal,
    closeModal: state.closeModal,
  }));

export const useLoadingState = (key?: string) =>
  useUIStore(state => ({
    isLoading: key ? state.isLoading(key) : state.loadingStates,
    setLoading: state.setLoading,
    clearAllLoading: state.clearAllLoading,
  }));

export const useErrorState = (key?: string) =>
  useUIStore(state => ({
    error: key ? state.errors[key] : state.errors,
    setError: state.setError,
    clearError: state.clearError,
    clearAllErrors: state.clearAllErrors,
  }));

export const useFormState = (formId: string) =>
  useUIStore(state => ({
    formState: state.getFormState(formId),
    setFormState: (formState: any) => state.setFormState(formId, formState),
    clearFormState: () => state.clearFormState(formId),
  }));

export const useNavigationState = () =>
  useUIStore(state => ({
    isMenuOpen: state.isMenuOpen,
    activeTab: state.activeTab,
    toggleMenu: state.toggleMenu,
    setActiveTab: state.setActiveTab,
  }));

export const useNotifications = () =>
  useUIStore(state => ({
    notifications: state.notifications,
    unreadCount: state.notifications.filter(n => !n.read).length,
    addNotification: state.addNotification,
    removeNotification: state.removeNotification,
    markAsRead: state.markAsRead,
    clearAllNotifications: state.clearAllNotifications,
  }));
