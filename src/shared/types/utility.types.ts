// 🔧 Utility Types - Common TypeScript utilities

/**
 * Make all properties optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Make specific properties optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Make specific properties required
 */
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Extract non-function properties
 */
export type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * Loading states
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Form validation result
 */
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  warnings: Record<string, string>;
}

/**
 * Event handler types
 */
export type EventHandler<T = Event> = (event: T) => void;
export type AsyncEventHandler<T = Event> = (event: T) => Promise<void>;

/**
 * Component with children
 */
export interface WithChildren {
  children: React.ReactNode;
}

/**
 * Component with className
 */
export interface WithClassName {
  className?: string;
}

/**
 * Standard component props
 */
export type ComponentProps = WithChildren & WithClassName;

/**
 * ID types
 */
export type UserId = string;
export type BusinessId = string;
export type ListingId = string;
export type TransactionId = string;
export type MessageId = string;

/**
 * Currency and money types
 */
export type Currency = 'USD' | 'EUR' | 'GBP';
export interface MoneyAmount {
  amount: number;
  currency: Currency;
}
