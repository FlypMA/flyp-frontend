// 🔧 Store Utilities - Helper functions for state management
// Utilities to eliminate common useState patterns

import { useCallback, useEffect } from 'react';
import { useUIStore, useAuthStore } from './index';

// =============================================================================
// LOADING STATE UTILITIES - Eliminates loading useState
// =============================================================================

/**
 * Hook for managing loading states without useState
 *
 * ✅ BEFORE: const [loading, setLoading] = useState(false);
 * ✅ AFTER: const { loading, setLoading } = useLoadingState('myOperation');
 */
export const useAsyncOperation = (operationKey: string) => {
  const { isLoading, setLoading, setError, clearError } = useUIStore(state => ({
    isLoading: state.isLoading(operationKey),
    setLoading: state.setLoading,
    setError: state.setError,
    clearError: state.clearError,
  }));

  const executeAsync = useCallback(
    async (
      operation: () => Promise<any>,
      options?: {
        onSuccess?: (result: any) => void;
        onError?: (error: Error) => void;
        clearErrorOnStart?: boolean;
      }
    ) => {
      const { onSuccess, onError, clearErrorOnStart = true } = options || {};

      if (clearErrorOnStart) clearError(operationKey);
      setLoading(operationKey, true);

      try {
        const result = await operation();
        onSuccess?.(result);
        return result;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Operation failed';
        setError(operationKey, errorMessage);
        onError?.(error as Error);
        throw error;
      } finally {
        setLoading(operationKey, false);
      }
    },
    [operationKey, setLoading, setError, clearError]
  );

  return {
    isLoading,
    execute: executeAsync,
    error: useUIStore(state => state.errors[operationKey]),
    clearError: () => clearError(operationKey),
  };
};

// =============================================================================
// FORM STATE UTILITIES - Eliminates form useState
// =============================================================================

/**
 * Hook for managing form state without useState
 *
 * ✅ BEFORE:
 *   const [formData, setFormData] = useState({});
 *   const [errors, setErrors] = useState({});
 *   const [touched, setTouched] = useState({});
 *
 * ✅ AFTER: const form = useFormState('myForm', initialData);
 */
export const useFormManager = <T extends Record<string, any>>(formId: string, initialData: T) => {
  const { formState, setFormState, clearFormState } = useUIStore(state => ({
    formState: state.getFormState(formId),
    setFormState: state.setFormState,
    clearFormState: state.clearFormState,
  }));

  // Initialize form if not exists
  useEffect(() => {
    if (!formState.data) {
      setFormState(formId, {
        data: initialData,
        errors: {},
        touched: {},
        isValid: true,
        isDirty: false,
      });
    }
  }, [formId, initialData, formState.data, setFormState]);

  const updateField = useCallback(
    (field: keyof T, value: any) => {
      setFormState(formId, {
        ...formState,
        data: { ...formState.data, [field]: value },
        touched: { ...formState.touched, [field]: true },
        isDirty: true,
      });
    },
    [formId, formState, setFormState]
  );

  const setFieldError = useCallback(
    (field: keyof T, error: string | null) => {
      setFormState(formId, {
        ...formState,
        errors: { ...formState.errors, [field]: error },
      });
    },
    [formId, formState, setFormState]
  );

  const reset = useCallback(() => {
    setFormState(formId, {
      data: initialData,
      errors: {},
      touched: {},
      isValid: true,
      isDirty: false,
    });
  }, [formId, initialData, setFormState]);

  return {
    data: formState.data || initialData,
    errors: formState.errors || {},
    touched: formState.touched || {},
    isValid: formState.isValid ?? true,
    isDirty: formState.isDirty ?? false,
    updateField,
    setFieldError,
    reset,
    clear: () => clearFormState(formId),
  };
};

// =============================================================================
// MODAL STATE UTILITIES - Eliminates modal useState
// =============================================================================

/**
 * Hook for managing modal state without useState
 *
 * ✅ BEFORE:
 *   const [isOpen, setIsOpen] = useState(false);
 *   const [modalData, setModalData] = useState(null);
 *
 * ✅ AFTER: const modal = useModal('myModal');
 */
export const useModal = (modalName: string) => {
  const { activeModal, modalProps, openModal, closeModal } = useUIStore(state => ({
    activeModal: state.activeModal,
    modalProps: state.modalProps,
    openModal: state.openModal,
    closeModal: state.closeModal,
  }));

  const isOpen = activeModal === modalName;
  const props = isOpen ? modalProps : {};

  const open = useCallback(
    (props?: Record<string, any>) => {
      openModal(modalName, props);
    },
    [modalName, openModal]
  );

  return {
    isOpen,
    props,
    open,
    close: closeModal,
  };
};

// =============================================================================
// AUTHENTICATION UTILITIES - Eliminates auth useState
// =============================================================================

/**
 * Hook for role-based access without useState
 *
 * ✅ BEFORE:
 *   const [userRole, setUserRole] = useState(null);
 *   const [hasAccess, setHasAccess] = useState(false);
 *
 * ✅ AFTER: const hasAccess = useRoleAccess(['seller', 'admin']);
 */
export const useRoleAccess = (allowedRoles: string[]): boolean => {
  return useAuthStore(state => {
    if (!state.isAuthenticated || !state.userRole) return false;
    return allowedRoles.includes(state.userRole);
  });
};

/**
 * Hook for permission-based access without useState
 */
export const usePermissionAccess = (requiredPermission: string): boolean => {
  return useAuthStore(state => {
    if (!state.isAuthenticated) return false;
    return state.permissions.includes(requiredPermission);
  });
};

// =============================================================================
// NOTIFICATION UTILITIES - Eliminates notification useState
// =============================================================================

/**
 * Hook for showing notifications without useState
 *
 * ✅ BEFORE:
 *   const [notifications, setNotifications] = useState([]);
 *   const [showSuccess, setShowSuccess] = useState(false);
 *
 * ✅ AFTER: const notify = useNotify();
 *           notify.success('Operation completed');
 */
export const useNotify = () => {
  const addNotification = useUIStore(state => state.addNotification);

  return {
    success: (message: string, title = 'Success') => {
      addNotification({ type: 'success', title, message });
    },
    error: (message: string, title = 'Error') => {
      addNotification({ type: 'error', title, message });
    },
    info: (message: string, title = 'Info') => {
      addNotification({ type: 'info', title, message });
    },
    warning: (message: string, title = 'Warning') => {
      addNotification({ type: 'warning', title, message });
    },
  };
};

// =============================================================================
// PERFORMANCE UTILITIES
// =============================================================================

/**
 * Hook for tracking component performance without useState
 */
export const useComponentTracker = (componentName: string) => {
  const recordActivity = useAuthStore(state => state.recordActivity);

  useEffect(() => {
    const startTime = Date.now();
    recordActivity();

    return () => {
      const renderTime = Date.now() - startTime;
      if (renderTime > 100) {
        console.warn(`[Performance] ${componentName} took ${renderTime}ms to render`);
      }
    };
  }, [componentName, recordActivity]);
};

// =============================================================================
// STORE COORDINATION UTILITIES
// =============================================================================

/**
 * Reset all stores (useful for logout, testing)
 */
export const resetAllStores = () => {
  useAuthStore.getState().logout();
  useUIStore.getState().clearAllLoading();
  useUIStore.getState().clearAllErrors();
  useUIStore.getState().clearAllNotifications();
};

/**
 * Get current app state summary
 */
export const getAppStateSummary = () => {
  const auth = useAuthStore.getState();
  const ui = useUIStore.getState();

  return {
    isAuthenticated: auth.isAuthenticated,
    user: auth.user?.email || 'anonymous',
    activeModal: ui.activeModal,
    loadingOperations: Object.keys(ui.loadingStates).filter(key => ui.loadingStates[key]),
    errorCount: Object.keys(ui.errors).length,
    notificationCount: ui.notifications.length,
  };
};
