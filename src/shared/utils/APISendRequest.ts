// Temporarily removing complex types to fix build
// import { ApiClient, ApiResponse, ApiRequestConfig } from '@utils-types/api';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const request = async <T>(endpoint: string, config: RequestInit = {}): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${baseURL}${endpoint}`, {
      ...config,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

const apiClient: ApiClient = {
  get: async <T>(url: string, config: Omit<ApiRequestConfig, 'method'> = {}) => {
    return request<T>(url, { ...config, method: 'GET' });
  },
  post: async <T>(url: string, data?: any, config: Omit<ApiRequestConfig, 'method'> = {}) => {
    return request<T>(url, {
      ...config,
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  put: async <T>(url: string, data?: any, config: Omit<ApiRequestConfig, 'method'> = {}) => {
    return request<T>(url, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  delete: async <T>(url: string, config: Omit<ApiRequestConfig, 'method'> = {}) => {
    return request<T>(url, { ...config, method: 'DELETE' });
  },
  patch: async <T>(url: string, data?: any, config: Omit<ApiRequestConfig, 'method'> = {}) => {
    return request<T>(url, {
      ...config,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },
};

export default apiClient;
