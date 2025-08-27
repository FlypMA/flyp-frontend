// =============================================================================
// FRONTEND LOCAL STORE TYPES
// =============================================================================
// State management types for frontend use
// Independent from shared types for production reliability
// =============================================================================

import { User } from './entities';

/**
 * Main application state interface
 */
export interface AppState {
  // Authentication state
  user: User | null;
  isAuthenticated: boolean;

  // Loading and error states
  loading: boolean;
  error?: string;

  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | undefined) => void;
  logout: () => void;
  clearUser: () => void;
}

/**
 * Authentication state slice
 */
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token?: string;
  refreshToken?: string;
  loading: boolean;
  error?: string;
}

/**
 * UI state slice
 */
export interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: Notification[];
}

/**
 * Notification interface
 */
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  timestamp: string;
  read: boolean;
  actions?: NotificationAction[];
}

/**
 * Notification action interface
 */
export interface NotificationAction {
  label: string;
  action: () => void;
  type?: 'primary' | 'secondary';
}

/**
 * Form state interface
 */
export interface FormState<T = any> {
  data: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isValid: boolean;
  isSubmitting: boolean;
  isDirty: boolean;
}

/**
 * Async state interface for data fetching
 */
export interface AsyncState<T = any> {
  data?: T;
  loading: boolean;
  error?: string;
  lastFetch?: string;
}

/**
 * Pagination state
 */
export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_more: boolean;
}

/**
 * Filter state interface
 */
export interface FilterState {
  [key: string]: any;
}

/**
 * Sort state interface
 */
export interface SortState {
  field: string;
  direction: 'asc' | 'desc';
}

/**
 * Search state interface
 */
export interface SearchState {
  query: string;
  filters: FilterState;
  sort: SortState;
  pagination: PaginationState;
}

/**
 * Modal state interface
 */
export interface ModalState {
  isOpen: boolean;
  type?: string;
  data?: any;
  onClose?: () => void;
  onConfirm?: () => void;
}

/**
 * Toast state interface
 */
export interface ToastState {
  toasts: Toast[];
}

/**
 * Toast interface
 */
export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  persistent?: boolean;
  actions?: ToastAction[];
}

/**
 * Toast action interface
 */
export interface ToastAction {
  label: string;
  action: () => void;
}

/**
 * Cache state interface
 */
export interface CacheState {
  [key: string]: {
    data: any;
    timestamp: string;
    expiry?: string;
  };
}
