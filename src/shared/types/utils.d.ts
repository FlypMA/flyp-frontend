/**
 * Make specific properties optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
/**
 * Make specific properties required
 */
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;
/**
 * Deep partial type
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
/**
 * Deep required type
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object | undefined ? DeepRequired<NonNullable<T[P]>> : T[P];
};
/**
 * Extract keys of type T that have values of type U
 */
export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];
/**
 * Omit properties that are never
 */
export type OmitNever<T> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K];
};
/**
 * Create a type with only the specified keys
 */
export type PickByValue<T, ValueType> = Pick<T, KeysOfType<T, ValueType>>;
/**
 * Create a union of all possible dot-notation paths in an object
 */
export type Paths<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}` | `${K}.${Paths<T[K]>}`
          : `${K}`
        : never;
    }[keyof T]
  : never;
/**
 * Get the type at a specific path
 */
export type PathValue<T, P extends Paths<T>> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? Rest extends Paths<T[K]>
      ? PathValue<T[K], Rest>
      : never
    : never
  : P extends keyof T
    ? T[P]
    : never;
/**
 * Create type from array element
 */
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
/**
 * Create a type that represents a value or a promise of that value
 */
export type MaybePromise<T> = T | Promise<T>;
/**
 * Create a type that represents a value that might be null or undefined
 */
export type Nullable<T> = T | null | undefined;
/**
 * Remove null and undefined from a type
 */
export type NonNullable<T> = T extends null | undefined ? never : T;
/**
 * Create a type that's either the value or an array of values
 */
export type OneOrMany<T> = T | T[];
/**
 * Function type helpers
 */
export type AnyFunction = (...args: any[]) => any;
export type AsyncFunction<T extends AnyFunction> = (
  ...args: Parameters<T>
) => Promise<ReturnType<T>>;
/**
 * JSON serializable types
 */
export type JsonPrimitive = string | number | boolean | null;
export type JsonObject = {
  [key: string]: JsonValue;
};
export type JsonArray = JsonValue[];
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;
/**
 * Create a type with string keys
 */
export type StringKeys<T> = {
  [K in keyof T as K extends string ? K : never]: T[K];
};
/**
 * Create a mapped type with transformed keys
 */
export type MapKeys<T, M extends Record<keyof T, string>> = {
  [K in keyof T as M[K]]: T[K];
};
/**
 * Create a type representing constructor parameters
 */
export type ConstructorParameters<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: infer P) => any ? P : never;
/**
 * Create a type representing constructor return type
 */
export type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (
  ...args: any
) => infer R
  ? R
  : any;
/**
 * Extract response data type from API response
 */
export type ApiResponseData<T> = T extends {
  data: infer D;
}
  ? D
  : never;
/**
 * Create request type from entity (omitting auto-generated fields)
 */
export type CreateRequest<T> = Omit<T, 'id' | 'created_at' | 'updated_at'>;
/**
 * Create update request type from entity (making all fields optional except id)
 */
export type UpdateRequest<T> = Partial<Omit<T, 'id' | 'created_at' | 'updated_at'>> & {
  id: string;
};
/**
 * Create filter type for entity searches
 */
export type FilterType<T> = {
  [K in keyof T]?: T[K] extends string
    ?
        | string
        | string[]
        | {
            contains?: string;
            startsWith?: string;
            endsWith?: string;
          }
    : T[K] extends number
      ?
          | number
          | {
              min?: number;
              max?: number;
              gte?: number;
              lte?: number;
            }
      : T[K] extends boolean
        ? boolean
        : T[K] extends Date
          ?
              | string
              | {
                  after?: string;
                  before?: string;
                  between?: [string, string];
                }
          : any;
};
/**
 * Create sort type for entity sorting
 */
export type SortType<T> = {
  [K in keyof T]?: 'ASC' | 'DESC';
};
/**
 * Database entity with timestamps
 */
export type WithTimestamps<T> = T & {
  created_at: string;
  updated_at: string;
};
/**
 * Database entity with ID and timestamps
 */
export type DatabaseRecord<T = {}> = WithTimestamps<
  T & {
    id: string;
  }
>;
/**
 * Create join type for relationships
 */
export type WithRelation<T, K extends string, R> = T & {
  [P in K]?: R;
};
/**
 * Create optional join type for relationships
 */
export type WithOptionalRelation<T, K extends string, R> = T & {
  [P in K]?: R | null;
};
/**
 * Repository query options
 */
export interface QueryOptions<T = any> {
  select?: (keyof T)[];
  where?: FilterType<T>;
  orderBy?: SortType<T>;
  limit?: number;
  offset?: number;
  include?: string[];
}
/**
 * Repository result type
 */
export interface QueryResult<T> {
  data: T[];
  total: number;
  hasMore: boolean;
}
/**
 * Form field state
 */
export interface FieldState<T = any> {
  value: T;
  error?: string;
  touched: boolean;
  dirty: boolean;
  valid: boolean;
}
/**
 * Form state
 */
export interface FormState<T extends Record<string, any>> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  dirty: boolean;
  valid: boolean;
  submitting: boolean;
  submitted: boolean;
}
/**
 * Async state for data fetching
 */
export interface AsyncState<T = any, E = Error> {
  data?: T;
  loading: boolean;
  error?: E;
  lastFetch?: Date;
}
/**
 * Pagination state
 */
export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}
/**
 * Sort state
 */
export interface SortState<T = any> {
  field?: keyof T;
  direction: 'ASC' | 'DESC';
}
/**
 * Filter state
 */
export interface FilterState<T = any> {
  filters: FilterType<T>;
  activeCount: number;
}
/**
 * Table state combining pagination, sort, and filter
 */
export interface TableState<T = any> {
  pagination: PaginationState;
  sort: SortState<T>;
  filters: FilterState<T>;
  selection: string[];
}
/**
 * Application error with context
 */
export interface AppError extends Error {
  code: string;
  statusCode?: number;
  context?: Record<string, any>;
  timestamp: Date;
}
/**
 * Validation error details
 */
export interface ValidationError {
  field: string;
  message: string;
  code: string;
  value?: any;
}
/**
 * API error response
 */
export interface ApiError {
  message: string;
  code: string;
  statusCode: number;
  details?: ValidationError[];
  timestamp: string;
  requestId?: string;
}
/**
 * Domain event base interface
 */
export interface DomainEvent<T = any> {
  id: string;
  type: string;
  version: number;
  timestamp: Date;
  aggregateId: string;
  aggregateType: string;
  data: T;
  metadata?: Record<string, any>;
}
/**
 * Event handler type
 */
export type EventHandler<T extends DomainEvent = DomainEvent> = (event: T) => MaybePromise<void>;
/**
 * Environment configuration
 */
export interface EnvironmentConfig {
  NODE_ENV: 'development' | 'staging' | 'production';
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  STRIPE_SECRET_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  REDIS_URL?: string;
  EMAIL_SERVICE_URL?: string;
  STORAGE_SERVICE_URL?: string;
}
/**
 * Feature flags
 */
export interface FeatureFlags {
  enableAnalytics: boolean;
  enableRealtime: boolean;
  enableFileUploads: boolean;
  enablePayments: boolean;
  enableNotifications: boolean;
  maintenanceMode: boolean;
}
/**
 * Application limits
 */
export interface ApplicationLimits {
  maxFileSize: number;
  maxFilesPerUpload: number;
  maxListingsPerUser: number;
  maxInquiriesPerDay: number;
  maxMessagesPerHour: number;
  sessionTimeout: number;
  rateLimitWindow: number;
  rateLimitRequests: number;
}
