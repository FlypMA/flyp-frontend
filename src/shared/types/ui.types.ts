// 🎨 UI Type Definitions - TypeScript safety for UI components

import type { ComponentProps } from './utility.types';

/**
 * Common UI variant types
 */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Color = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
export type Variant = 'solid' | 'outline' | 'ghost' | 'light';

/**
 * Button component types
 */
export interface ButtonProps extends ComponentProps {
  variant?: Variant;
  color?: Color;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Input component types
 */
export interface InputProps extends ComponentProps {
  type?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  label?: string;
  description?: string;
  size?: Size;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

/**
 * Modal component types
 */
export interface ModalProps extends ComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: Size;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
}

/**
 * Notification types
 */
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface NotificationProps {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  label: string;
  onClick: () => void;
  variant?: Variant;
}

/**
 * Table types
 */
export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface TableProps<T> extends ComponentProps {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  empty?: React.ReactNode;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onSort?: (key: string, order: 'asc' | 'desc') => void;
  onRowClick?: (row: T) => void;
}

/**
 * Form types
 */
export interface FormFieldProps extends ComponentProps {
  name: string;
  label?: string;
  required?: boolean;
  error?: string;
  description?: string;
}

export interface FormProps extends ComponentProps {
  onSubmit: (data: Record<string, unknown>) => void | Promise<void>;
  loading?: boolean;
  disabled?: boolean;
}

/**
 * Navigation types
 */
export interface NavItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  children?: NavItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

/**
 * Loading states
 */
export interface LoadingSpinnerProps extends ComponentProps {
  size?: Size;
  color?: Color;
}

export interface SkeletonProps extends ComponentProps {
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'rectangular' | 'circular';
  animation?: 'pulse' | 'wave' | false;
}
