/**
 * Enhanced Type-Safe API Client for Flyp Frontend
 * Comprehensive API client with full type safety using shared types
 * Built by CTO for robust frontend-backend communication
 */

import {
  // Request Types
  LoginRequest,
  RegisterRequest,
  RefreshTokenRequest,
  ChangePasswordRequest,
  UpdateUserProfileRequest,
  CreateOrganizationRequest,
  UpdateOrganizationRequest,
  CreateListingRequest,
  UpdateListingRequest,
  ListingSearchRequest,
  CreateInquiryRequest,
  RespondToInquiryRequest,
  CreateConversationRequest,
  SendMessageRequest,
  UploadDocumentRequest,
  CreateSavedSearchRequest,
  UpdateBuyerProfileRequest,

  // Response Types
  AuthResponse,
  RefreshTokenResponse,
  ProfileResponse,
  UserListResponse,
  OrganizationResponse,
  OrganizationListResponse,
  ListingResponse,
  ListingListResponse,
  InquiryResponse,
  InquiryListResponse,
  ConversationResponse,
  ConversationListResponse,
  MessageResponse,
  MessageListResponse,
  DocumentResponse,
  DocumentListResponse,
  BuyerProfileResponse,
  SavedSearchResponse,
  SavedSearchListResponse,

  // Utility Types
  ApiResponse,
  ErrorResponse,
  PaginationParams,
  BaseQueryParams,

  // Error Types
  AuthenticationError,
  AuthorizationError,
  ValidationErrorResponse,
  RateLimitError,

  // Status Codes
  HttpStatusCode,
} from '@/types/shared';

// =============================================================================
// API CLIENT CONFIGURATION
// =============================================================================

interface ApiClientConfig {
  baseURL: string;
  timeout: number;
  retries: number;
  retryDelay: number;
  enableLogging: boolean;
}

const DEFAULT_CONFIG: ApiClientConfig = {
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  timeout: 30000, // 30 seconds
  retries: 3,
  retryDelay: 1000, // 1 second
  enableLogging: process.env.NODE_ENV === 'development',
};

// =============================================================================
// HTTP CLIENT CLASS
// =============================================================================

class HttpClient {
  private config: ApiClientConfig;
  private token: string | null = null;

  constructor(config: Partial<ApiClientConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.loadTokenFromStorage();
  }

  /**
   * Set authentication token
   */
  setAuthToken(token: string | null): void {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  /**
   * Load token from storage
   */
  private loadTokenFromStorage(): void {
    this.token = localStorage.getItem('auth_token');
  }

  /**
   * Get default headers
   */
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  /**
   * Log request/response for debugging
   */
  private log(message: string, data?: any): void {
    if (this.config.enableLogging) {
      console.log(`[API Client] ${message}`, data);
    }
  }

  /**
   * Handle API errors with proper typing
   */
  private handleError(response: Response, data: any): never {
    this.log(`API Error: ${response.status}`, data);

    // Type-safe error handling based on status codes
    switch (response.status) {
      case HttpStatusCode.UNAUTHORIZED:
        throw new Error(data.error || 'Authentication required');

      case HttpStatusCode.FORBIDDEN:
        throw new Error(data.error || 'Access denied');

      case HttpStatusCode.BAD_REQUEST:
        throw new Error(data.error || 'Invalid request');

      case HttpStatusCode.NOT_FOUND:
        throw new Error(data.error || 'Resource not found');

      case HttpStatusCode.CONFLICT:
        throw new Error(data.error || 'Resource conflict');

      case 429: // Rate limit
        throw new Error(data.error || 'Rate limit exceeded');

      default:
        throw new Error(data.error || 'An unexpected error occurred');
    }
  }

  /**
   * Make HTTP request with retry logic
   */
  private async makeRequest<T>(
    method: string,
    endpoint: string,
    body?: any,
    params?: Record<string, any>
  ): Promise<T> {
    const url = new URL(`${this.config.baseURL}${endpoint}`);

    // Add query parameters
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, String(params[key]));
        }
      });
    }

    const requestInit: RequestInit = {
      method,
      headers: this.getHeaders(),
      signal: AbortSignal.timeout(this.config.timeout),
    };

    if (body && method !== 'GET') {
      requestInit.body = JSON.stringify(body);
    }

    let lastError: Error;

    // Retry logic
    for (let attempt = 1; attempt <= this.config.retries; attempt++) {
      try {
        this.log(`${method} ${url.toString()} (attempt ${attempt})`);

        const response = await fetch(url.toString(), requestInit);
        const data = await response.json();

        if (!response.ok) {
          this.handleError(response, data);
        }

        this.log(`${method} ${url.toString()} - Success`, data);
        return data;
      } catch (error: any) {
        lastError = error;
        this.log(`${method} ${url.toString()} - Error (attempt ${attempt})`, error);

        // Don't retry on authentication or client errors
        if (error.status && error.status < 500) {
          throw error;
        }

        // Don't retry on last attempt
        if (attempt === this.config.retries) {
          break;
        }

        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, this.config.retryDelay * attempt));
      }
    }

    throw lastError!;
  }

  /**
   * HTTP method wrappers
   */
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    return this.makeRequest<T>('GET', endpoint, undefined, params);
  }

  async post<T>(endpoint: string, body?: any, params?: Record<string, any>): Promise<T> {
    return this.makeRequest<T>('POST', endpoint, body, params);
  }

  async put<T>(endpoint: string, body?: any, params?: Record<string, any>): Promise<T> {
    return this.makeRequest<T>('PUT', endpoint, body, params);
  }

  async delete<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    return this.makeRequest<T>('DELETE', endpoint, undefined, params);
  }

  async patch<T>(endpoint: string, body?: any, params?: Record<string, any>): Promise<T> {
    return this.makeRequest<T>('PATCH', endpoint, body, params);
  }
}

// =============================================================================
// API SERVICE CLASSES
// =============================================================================

/**
 * Authentication API service
 */
export class AuthApiService {
  constructor(private http: HttpClient) {}

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await this.http.post<AuthResponse>('/api/auth/login', credentials);

    // Store token automatically
    if (response.success && response.data?.token) {
      this.http.setAuthToken(response.data.token);
    }

    return response;
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await this.http.post<AuthResponse>('/api/auth/register', userData);

    // Store token automatically
    if (response.success && response.data?.token) {
      this.http.setAuthToken(response.data.token);
    }

    return response;
  }

  async logout(): Promise<ApiResponse> {
    const response = await this.http.post<ApiResponse>('/api/auth/logout');

    // Clear token
    this.http.setAuthToken(null);

    return response;
  }

  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    const response = await this.http.post<RefreshTokenResponse>('/api/auth/refresh', {
      refreshToken,
    });

    // Update token
    if (response.success && response.data?.token) {
      this.http.setAuthToken(response.data.token);
    }

    return response;
  }

  async changePassword(passwordData: ChangePasswordRequest): Promise<ApiResponse> {
    return this.http.post<ApiResponse>('/api/auth/change-password', passwordData);
  }
}

/**
 * User management API service
 */
export class UserApiService {
  constructor(private http: HttpClient) {}

  async getProfile(): Promise<ProfileResponse> {
    return this.http.get<ProfileResponse>('/api/users/profile');
  }

  async updateProfile(profileData: UpdateUserProfileRequest): Promise<ProfileResponse> {
    return this.http.put<ProfileResponse>('/api/users/profile', profileData);
  }

  async getOrganizations(): Promise<OrganizationListResponse> {
    return this.http.get<OrganizationListResponse>('/api/users/organizations');
  }

  async getBuyerProfile(): Promise<BuyerProfileResponse> {
    return this.http.get<BuyerProfileResponse>('/api/users/buyer-profile');
  }

  async updateBuyerProfile(profileData: UpdateBuyerProfileRequest): Promise<BuyerProfileResponse> {
    return this.http.put<BuyerProfileResponse>('/api/users/buyer-profile', profileData);
  }
}

/**
 * Organization API service
 */
export class OrganizationApiService {
  constructor(private http: HttpClient) {}

  async createOrganization(orgData: CreateOrganizationRequest): Promise<OrganizationResponse> {
    return this.http.post<OrganizationResponse>('/api/organizations', orgData);
  }

  async getOrganization(id: string): Promise<OrganizationResponse> {
    return this.http.get<OrganizationResponse>(`/api/organizations/${id}`);
  }

  async updateOrganization(
    id: string,
    orgData: UpdateOrganizationRequest
  ): Promise<OrganizationResponse> {
    return this.http.put<OrganizationResponse>(`/api/organizations/${id}`, orgData);
  }

  async listOrganizations(params?: BaseQueryParams): Promise<OrganizationListResponse> {
    return this.http.get<OrganizationListResponse>('/api/organizations', params);
  }
}

/**
 * Listing API service
 */
export class ListingApiService {
  constructor(private http: HttpClient) {}

  async createListing(listingData: CreateListingRequest): Promise<ListingResponse> {
    return this.http.post<ListingResponse>('/api/listings', listingData);
  }

  async getListing(id: string): Promise<ListingResponse> {
    return this.http.get<ListingResponse>(`/api/listings/${id}`);
  }

  async updateListing(id: string, listingData: UpdateListingRequest): Promise<ListingResponse> {
    return this.http.put<ListingResponse>(`/api/listings/${id}`, listingData);
  }

  async deleteListing(id: string): Promise<ApiResponse> {
    return this.http.delete<ApiResponse>(`/api/listings/${id}`);
  }

  async searchListings(searchParams: ListingSearchRequest): Promise<ListingListResponse> {
    return this.http.get<ListingListResponse>('/api/listings', searchParams);
  }

  async getMyListings(params?: BaseQueryParams): Promise<ListingListResponse> {
    return this.http.get<ListingListResponse>('/api/listings/my', params);
  }
}

/**
 * Inquiry API service
 */
export class InquiryApiService {
  constructor(private http: HttpClient) {}

  async createInquiry(inquiryData: CreateInquiryRequest): Promise<InquiryResponse> {
    return this.http.post<InquiryResponse>('/api/inquiries', inquiryData);
  }

  async getInquiry(id: string): Promise<InquiryResponse> {
    return this.http.get<InquiryResponse>(`/api/inquiries/${id}`);
  }

  async respondToInquiry(id: string, response: RespondToInquiryRequest): Promise<InquiryResponse> {
    return this.http.put<InquiryResponse>(`/api/inquiries/${id}/respond`, response);
  }

  async getMyInquiries(params?: BaseQueryParams): Promise<InquiryListResponse> {
    return this.http.get<InquiryListResponse>('/api/inquiries/my', params);
  }

  async getReceivedInquiries(params?: BaseQueryParams): Promise<InquiryListResponse> {
    return this.http.get<InquiryListResponse>('/api/inquiries/received', params);
  }
}

/**
 * Conversation API service
 */
export class ConversationApiService {
  constructor(private http: HttpClient) {}

  async createConversation(
    conversationData: CreateConversationRequest
  ): Promise<ConversationResponse> {
    return this.http.post<ConversationResponse>('/api/conversations', conversationData);
  }

  async getConversation(id: string): Promise<ConversationResponse> {
    return this.http.get<ConversationResponse>(`/api/conversations/${id}`);
  }

  async getMyConversations(params?: BaseQueryParams): Promise<ConversationListResponse> {
    return this.http.get<ConversationListResponse>('/api/conversations', params);
  }

  async sendMessage(
    conversationId: string,
    messageData: SendMessageRequest
  ): Promise<MessageResponse> {
    return this.http.post<MessageResponse>(
      `/api/conversations/${conversationId}/messages`,
      messageData
    );
  }

  async getMessages(
    conversationId: string,
    params?: BaseQueryParams
  ): Promise<MessageListResponse> {
    return this.http.get<MessageListResponse>(
      `/api/conversations/${conversationId}/messages`,
      params
    );
  }
}

/**
 * Document API service
 */
export class DocumentApiService {
  constructor(private http: HttpClient) {}

  async uploadDocument(documentData: UploadDocumentRequest): Promise<DocumentResponse> {
    return this.http.post<DocumentResponse>('/api/documents/upload', documentData);
  }

  async getDocument(id: string): Promise<DocumentResponse> {
    return this.http.get<DocumentResponse>(`/api/documents/${id}`);
  }

  async getListingDocuments(
    listingId: string,
    params?: BaseQueryParams
  ): Promise<DocumentListResponse> {
    return this.http.get<DocumentListResponse>(`/api/documents/listing/${listingId}`, params);
  }

  async deleteDocument(id: string): Promise<ApiResponse> {
    return this.http.delete<ApiResponse>(`/api/documents/${id}`);
  }
}

/**
 * Search API service
 */
export class SearchApiService {
  constructor(private http: HttpClient) {}

  async createSavedSearch(searchData: CreateSavedSearchRequest): Promise<SavedSearchResponse> {
    return this.http.post<SavedSearchResponse>('/api/search/saved', searchData);
  }

  async getSavedSearches(params?: BaseQueryParams): Promise<SavedSearchListResponse> {
    return this.http.get<SavedSearchListResponse>('/api/search/saved', params);
  }

  async deleteSavedSearch(id: string): Promise<ApiResponse> {
    return this.http.delete<ApiResponse>(`/api/search/saved/${id}`);
  }
}

// =============================================================================
// MAIN API CLIENT
// =============================================================================

/**
 * Main API client that aggregates all services
 */
export class ApiClient {
  private http: HttpClient;

  // Service instances
  public auth: AuthApiService;
  public users: UserApiService;
  public organizations: OrganizationApiService;
  public listings: ListingApiService;
  public inquiries: InquiryApiService;
  public conversations: ConversationApiService;
  public documents: DocumentApiService;
  public search: SearchApiService;

  constructor(config?: Partial<ApiClientConfig>) {
    this.http = new HttpClient(config);

    // Initialize services
    this.auth = new AuthApiService(this.http);
    this.users = new UserApiService(this.http);
    this.organizations = new OrganizationApiService(this.http);
    this.listings = new ListingApiService(this.http);
    this.inquiries = new InquiryApiService(this.http);
    this.conversations = new ConversationApiService(this.http);
    this.documents = new DocumentApiService(this.http);
    this.search = new SearchApiService(this.http);
  }

  /**
   * Set authentication token for all requests
   */
  setAuthToken(token: string | null): void {
    this.http.setAuthToken(token);
  }

  /**
   * Health check endpoint
   */
  async healthCheck(): Promise<ApiResponse> {
    return this.http.get<ApiResponse>('/api/health');
  }
}

// =============================================================================
// SINGLETON INSTANCE
// =============================================================================

// Export singleton instance for use throughout the application
export const apiClient = new ApiClient();

// Export individual services for convenience
export const {
  auth: authApi,
  users: userApi,
  organizations: organizationApi,
  listings: listingApi,
  inquiries: inquiryApi,
  conversations: conversationApi,
  documents: documentApi,
  search: searchApi,
} = apiClient;

// Export the main client as default
export default apiClient;
