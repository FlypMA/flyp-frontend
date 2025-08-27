import { User, Listing, Inquiry, Conversation } from './entities';
import { UserRole, NotificationType } from './enums';
/**
 * Common props for UI components
 */
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  id?: string;
  testId?: string;
}
/**
 * Button component props
 */
export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}
/**
 * Input field props
 */
export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  label?: string;
  helperText?: string;
  icon?: React.ReactNode;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
}
/**
 * Modal component props
 */
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  footer?: React.ReactNode;
}
/**
 * Table component props
 */
export interface TableProps<T = any> extends BaseComponentProps {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  pagination?: PaginationProps;
  sorting?: SortingProps<T>;
  selection?: SelectionProps<T>;
  onRowClick?: (row: T) => void;
  emptyState?: React.ReactNode;
}
/**
 * Table column definition
 */
export interface TableColumn<T = any> {
  key: keyof T | string;
  title: string;
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  className?: string;
}
/**
 * Pagination props
 */
export interface PaginationProps {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: number, pageSize?: number) => void;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
}
/**
 * Sorting props
 */
export interface SortingProps<T = any> {
  field?: keyof T;
  direction: 'ASC' | 'DESC';
  onChange: (field: keyof T, direction: 'ASC' | 'DESC') => void;
}
/**
 * Selection props
 */
export interface SelectionProps<T = any> {
  selectedKeys: string[];
  onChange: (selectedKeys: string[]) => void;
  getRowKey: (row: T) => string;
  type?: 'checkbox' | 'radio';
}
/**
 * Form field configuration
 */
export interface FormField<T = any> {
  name: keyof T;
  label: string;
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'select'
    | 'textarea'
    | 'checkbox'
    | 'radio'
    | 'file'
    | 'date';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  options?: Array<{
    label: string;
    value: any;
  }>;
  validation?: {
    min?: number;
    max?: number;
    pattern?: RegExp;
    custom?: (value: any) => string | undefined;
  };
  helperText?: string;
  conditional?: (values: T) => boolean;
  grid?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
}
/**
 * Form configuration
 */
export interface FormConfig<T = any> {
  fields: FormField<T>[];
  initialValues?: Partial<T>;
  validationSchema?: any;
  onSubmit: (values: T) => Promise<void> | void;
  submitText?: string;
  resetText?: string;
  layout?: 'vertical' | 'horizontal' | 'inline';
  grid?: boolean;
}
/**
 * Form state management
 */
export interface FormState<T = any> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  dirty: boolean;
  valid: boolean;
  submitting: boolean;
  submitted: boolean;
}
/**
 * Navigation item
 */
export interface NavItem {
  id: string;
  label: string;
  path?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  children?: NavItem[];
  roles?: UserRole[];
  exact?: boolean;
  external?: boolean;
  disabled?: boolean;
}
/**
 * Breadcrumb item
 */
export interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: React.ReactNode;
}
/**
 * Menu item for dropdowns
 */
export interface MenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  onClick?: () => void;
  children?: MenuItem[];
}
/**
 * Layout configuration
 */
export interface LayoutConfig {
  header: {
    show: boolean;
    fixed: boolean;
    height?: number;
  };
  sidebar: {
    show: boolean;
    collapsible: boolean;
    collapsed?: boolean;
    width?: number;
    collapsedWidth?: number;
  };
  footer: {
    show: boolean;
    fixed: boolean;
    height?: number;
  };
  content: {
    padding?: number | string;
    maxWidth?: number | string;
  };
}
/**
 * Theme configuration
 */
export interface ThemeConfig {
  mode: 'light' | 'dark' | 'system';
  primaryColor: string;
  borderRadius: number;
  fontFamily: string;
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}
/**
 * Redux/Zustand store state
 */
export interface AppState {
  auth: AuthState;
  ui: UIState;
  listings: ListingsState;
  inquiries: InquiriesState;
  conversations: ConversationsState;
  notifications: NotificationsState;
}
/**
 * Authentication state
 */
export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
/**
 * UI state
 */
export interface UIState {
  theme: ThemeConfig;
  layout: LayoutConfig;
  modals: Record<string, boolean>;
  loading: Record<string, boolean>;
  errors: Record<string, string>;
  notifications: UINotification[];
}
/**
 * Listings state
 */
export interface ListingsState {
  items: Listing[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    total: number;
    limit: number;
  };
  filters: Record<string, any>;
  selectedListing: Listing | null;
}
/**
 * Inquiries state
 */
export interface InquiriesState {
  items: Inquiry[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    total: number;
    limit: number;
  };
}
/**
 * Conversations state
 */
export interface ConversationsState {
  items: Conversation[];
  activeConversation: Conversation | null;
  loading: boolean;
  error: string | null;
  unreadCount: number;
}
/**
 * Notifications state
 */
export interface NotificationsState {
  items: UINotification[];
  unreadCount: number;
  loading: boolean;
}
/**
 * Notification for UI display
 */
export interface UINotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
  persistent?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  timestamp: Date;
}
/**
 * Loading state for UI components
 */
export interface LoadingState {
  loading: boolean;
  message?: string;
  progress?: number;
}
/**
 * Error state for UI components
 */
export interface ErrorState {
  error: boolean;
  message: string;
  code?: string;
  retry?: () => void;
}
/**
 * Empty state for UI components
 */
export interface EmptyState {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}
/**
 * Dashboard widget configuration
 */
export interface DashboardWidget {
  id: string;
  type: 'chart' | 'stat' | 'table' | 'list' | 'custom';
  title: string;
  span: number;
  height?: number;
  data?: any;
  config?: Record<string, any>;
  permissions?: UserRole[];
}
/**
 * Dashboard layout
 */
export interface DashboardLayout {
  id: string;
  name: string;
  widgets: DashboardWidget[];
  columns: number;
  gap: number;
  user_id: string;
  is_default: boolean;
}
/**
 * Chart configuration
 */
export interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'area';
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string;
      borderWidth?: number;
    }>;
  };
  options?: {
    responsive?: boolean;
    maintainAspectRatio?: boolean;
    plugins?: {
      legend?: {
        display?: boolean;
        position?: 'top' | 'bottom' | 'left' | 'right';
      };
      tooltip?: {
        enabled?: boolean;
      };
    };
    scales?: {
      x?: {
        display?: boolean;
        title?: {
          display?: boolean;
          text?: string;
        };
      };
      y?: {
        display?: boolean;
        beginAtZero?: boolean;
        title?: {
          display?: boolean;
          text?: string;
        };
      };
    };
  };
}
/**
 * Search configuration
 */
export interface SearchConfig {
  placeholder: string;
  fields: string[];
  fuzzy?: boolean;
  debounce?: number;
  minLength?: number;
  suggestions?: boolean;
}
/**
 * Filter configuration
 */
export interface FilterConfig<T = any> {
  field: keyof T;
  label: string;
  type: 'text' | 'select' | 'range' | 'date' | 'boolean';
  options?: Array<{
    label: string;
    value: any;
  }>;
  multiple?: boolean;
  placeholder?: string;
}
/**
 * Advanced search criteria
 */
export interface AdvancedSearchConfig<T = any> {
  fields: FilterConfig<T>[];
  operators: Array<{
    value: string;
    label: string;
    types: string[];
  }>;
  logic: 'AND' | 'OR';
  groups?: boolean;
}
/**
 * WebSocket connection state
 */
export interface WebSocketState {
  connected: boolean;
  connecting: boolean;
  error: string | null;
  lastConnected: Date | null;
  reconnectAttempts: number;
}
/**
 * Real-time event
 */
export interface RealtimeEvent<T = any> {
  type: string;
  channel: string;
  data: T;
  timestamp: Date;
  userId?: string;
}
/**
 * Real-time subscription
 */
export interface RealtimeSubscription {
  id: string;
  channel: string;
  event: string;
  callback: (data: any) => void;
  active: boolean;
}
