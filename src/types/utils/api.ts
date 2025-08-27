export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string>;
}

export interface ApiClient {
  get: <T = any>(url: string, config?: Omit<ApiRequestConfig, 'method'>) => Promise<ApiResponse<T>>;
  post: <T = any>(
    url: string,
    data?: any,
    config?: Omit<ApiRequestConfig, 'method'>
  ) => Promise<ApiResponse<T>>;
  put: <T = any>(
    url: string,
    data?: any,
    config?: Omit<ApiRequestConfig, 'method'>
  ) => Promise<ApiResponse<T>>;
  delete: <T = any>(
    url: string,
    config?: Omit<ApiRequestConfig, 'method'>
  ) => Promise<ApiResponse<T>>;
  patch: <T = any>(
    url: string,
    data?: any,
    config?: Omit<ApiRequestConfig, 'method'>
  ) => Promise<ApiResponse<T>>;
}
