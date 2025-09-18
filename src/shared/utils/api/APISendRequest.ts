/**
 * 🔌 API Request Utility - Enhanced with Type Safety
 *
 * Centralized API request handling with proper TypeScript support
 */

import { ApiClient, ApiResponse, ApiRequestConfig } from '../../types/api';
import { getApiConfig, getAuthHeader, requiresAuth } from '../../../config/api';

const apiConfig = getApiConfig();
const baseURL = apiConfig.baseURL;

const request = async <T>(
  endpoint: string,
  config: ApiRequestConfig = {}
): Promise<ApiResponse<T>> => {
  try {
    // Add authentication headers if required
    const authHeaders = requiresAuth(endpoint) ? getAuthHeader() : {};

    // Prepare request configuration
    const requestConfig: RequestInit = {
      method: config.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
        ...config.headers,
      },
      body: config.body ? JSON.stringify(config.body) : undefined,
      credentials: config.credentials || 'include',
      cache: config.cache || 'default',
      signal: config.signal,
    };

    // Make the request
    const response = await fetch(`${baseURL}${endpoint}`, requestConfig);

    // Parse response
    const data = await response.json();

    // Return standardized response
    if (response.ok) {
      return {
        success: true,
        data,
        statusCode: response.status,
        timestamp: new Date().toISOString(),
      };
    } else {
      return {
        success: false,
        error: data.error || data.message || 'Request failed',
        statusCode: response.status,
        timestamp: new Date().toISOString(),
      };
    }
  } catch (error) {
    console.error('API request failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      timestamp: new Date().toISOString(),
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
