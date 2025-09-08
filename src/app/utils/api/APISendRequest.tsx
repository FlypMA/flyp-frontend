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

    const fullUrl = this.appendQueryParams(`${this.baseUrl}${url}`, queryParams);
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

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error in sendRequest:', error);
      throw error; // Rethrow the error after logging
    }
  }
}

export default APISendRequest;
