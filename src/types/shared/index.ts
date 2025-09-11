// 🔗 Shared Types Index
// Location: src/types/shared/index.ts
// Purpose: Export all shared type definitions

// API Response Types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  errors?: string[];
}

export interface ErrorResponse {
  message: string;
  errors?: string[];
  code?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Authentication Types
export interface AuthResponse {
  token: string;
  refreshToken?: string;
  user: User;
  expiresAt: string;
}

export interface AuthCheckResponse {
  authenticated: boolean;
  user?: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: 'buyer' | 'seller';
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  token: string;
  expiresAt: string;
}

export interface PasswordResetRequest {
  email: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'buyer' | 'seller' | 'admin';
  phone?: string;
  company?: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserListResponse {
  users: User[];
  total: number;
}

// Error Types
export interface AuthenticationError extends Error {
  code: 'AUTHENTICATION_FAILED';
}

export interface AuthorizationError extends Error {
  code: 'AUTHORIZATION_FAILED';
}

export interface ValidationErrorResponse extends ErrorResponse {
  code: 'VALIDATION_ERROR';
  field?: string;
}

export interface RateLimitError extends Error {
  code: 'RATE_LIMIT_EXCEEDED';
  retryAfter?: number;
}

// HTTP Types
export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
}

// Pagination Types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

// Generic Utility Types
export interface ApiRequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

export interface ApiClient {
  get<T>(url: string, config?: Omit<ApiRequestConfig, 'method'>): Promise<ApiResponse<T>>;
  post<T>(
    url: string,
    data?: any,
    config?: Omit<ApiRequestConfig, 'method'>
  ): Promise<ApiResponse<T>>;
  put<T>(
    url: string,
    data?: any,
    config?: Omit<ApiRequestConfig, 'method'>
  ): Promise<ApiResponse<T>>;
  delete<T>(url: string, config?: Omit<ApiRequestConfig, 'method'>): Promise<ApiResponse<T>>;
  patch<T>(
    url: string,
    data?: any,
    config?: Omit<ApiRequestConfig, 'method'>
  ): Promise<ApiResponse<T>>;
}
