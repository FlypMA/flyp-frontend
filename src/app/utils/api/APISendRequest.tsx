import Cookies from 'universal-cookie';

// Environment configuration that uses Vite environment variables
const getApiConfig = () => {
  const environment = import.meta.env.VITE_ENVIRONMENT || 'production';
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiUrlDev = import.meta.env.VITE_API_URL_DEV;

  console.log('🔧 API Config Check:');
  console.log('  Environment:', environment);
  console.log('  API URL (prod):', apiUrl);
  console.log('  API URL (dev):', apiUrlDev);
  console.log('  All env vars:', {
    VITE_ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT,
    VITE_API_URL: import.meta.env.VITE_API_URL,
    VITE_API_URL_DEV: import.meta.env.VITE_API_URL_DEV,
    MODE: import.meta.env.MODE,
    PROD: import.meta.env.PROD,
    DEV: import.meta.env.DEV,
  });

  let baseUrl: string;

  if (environment === 'development') {
    baseUrl = apiUrlDev || 'https://web-production-2edf5.up.railway.app';
  } else {
    baseUrl = apiUrl || 'https://web-production-2edf5.up.railway.app';
  }

  // Ensure URL ends with slash for proper concatenation
  if (!baseUrl.endsWith('/')) {
    baseUrl += '/';
  }

  console.log('✅ Using API Base URL:', baseUrl);
  return baseUrl;
};

class APISendRequest {
  private baseUrl: string;
  private cookies: Cookies;

  constructor() {
    this.baseUrl = getApiConfig();
    this.cookies = new Cookies();
  }

  private appendQueryParams(url: string, queryParams?: Record<string, string>): string {
    if (!queryParams) {
      return url;
    }

    const query = new URLSearchParams(queryParams).toString();
    console.log(`Final URL with query parameters: ${url}?${query}`);
    return `${url}?${query}`;
  }

  public async sendRequest(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: Record<string, unknown> | FormData,
    queryParams?: Record<string, string>
  ): Promise<any> {
    const headers = new Headers();

    if (!(data instanceof FormData)) {
      headers.append('Content-Type', 'application/json'); // Set JSON header for non-FormData
    }

    const token = this.cookies.get('AUTHENTICATED_USER');
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }

    const requestOptions: RequestInit = {
      method,
      headers,
      credentials: 'include',
      body:
        method !== 'GET' && data ? (data instanceof FormData ? data : JSON.stringify(data)) : null,
    };

    // Remove leading slash from url if baseUrl ends with slash to avoid double slashes
    const cleanUrl = url.startsWith('/') && this.baseUrl.endsWith('/') ? url.substring(1) : url;
    const fullUrl = this.appendQueryParams(`${this.baseUrl}${cleanUrl}`, queryParams);
    console.log(`Sending request to ${fullUrl} with method: ${method}`);
    if (queryParams) {
      console.log(`Query parameters:`, queryParams);
    }
    if (method !== 'GET' && data) {
      console.log(`Request data:`, data);
    }
    console.log(`Sending request to ${fullUrl} with method: ${method} and data:`, data);

    try {
      const response = await fetch(fullUrl, requestOptions);

      console.log(`📡 Response status: ${response.status}`);

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`;
        let errorDetails = null;

        try {
          // Try to read error response body for better error information
          const errorText = await response.text();
          if (errorText) {
            try {
              errorDetails = JSON.parse(errorText);
              errorMessage = errorDetails.error || errorDetails.message || errorMessage;
            } catch {
              // If not JSON, use the text as error message
              errorMessage = errorText || errorMessage;
            }
          }
        } catch (bodyError) {
          console.warn('Could not read error response body:', bodyError);
        }

        console.error(`🚨 Request failed for ${url}:`, errorMessage);
        const error = new Error(errorMessage);
        (error as any).status = response.status;
        (error as any).details = errorDetails;
        throw error;
      }

      return await response.json();
    } catch (error) {
      console.error('Error in sendRequest:', error);
      throw error; // Rethrow the error after logging
    }
  }
}

export default APISendRequest;
