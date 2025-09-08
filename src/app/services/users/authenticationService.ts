import { API_CONFIG } from '../api/apiConfig';
import { UserProfile, PaymentMetadata, UserPreferences } from '../../../types/api';
import Cookies from 'universal-cookie';
import UrlGeneratorService from '../urlMapping/urlGeneratorService';
import { AuthCheckResponse, User, UserType } from '../../types/api/users/user';
// Import creditService to clear cache on login/registration
import { creditService } from '../billing/creditService';

interface AuthToken {
  exp: number;
  iat: number;
  user: UserProfile;
  [key: string]: unknown;
}

interface AuthResult {
  isAuthenticated: boolean;
  user?: UserProfile;
  token?: string;
}

interface RequestData {
  [key: string]: unknown;
}

class AuthenticationService {
  private cookies: Cookies;
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_CONFIG.NODE_BACKEND.baseURL;
    this.cookies = new Cookies();
  }

  private async sendRequest(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: RequestData,
    requireAuth = false
  ): Promise<unknown> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (requireAuth) {
      const token = this.cookies.get('access_token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const config: RequestInit = {
      method,
      headers,
      credentials: 'include',
    };

    if (data && (method === 'POST' || method === 'PUT')) {
      config.body = JSON.stringify(data);
    }

    try {
      console.log(`🌐 Making ${method} request to:`, url);
      const response = await fetch(url, config);

      console.log(`📡 Response status: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        let responseJson: unknown;
        try {
          responseJson = await response.json();
          console.log('❌ Error response JSON:', responseJson);
        } catch {
          const responseText = await response.text();
          console.log('❌ Error response text:', responseText);
          throw new Error(`HTTP ${response.status}: ${responseText}`);
        }

        throw new Error(`HTTP ${response.status}: ${JSON.stringify(responseJson)}`);
      }

      const responseData = await response.json();
      console.log(`✅ Success response from ${endpoint}:`, responseData);
      return responseData;
    } catch (error) {
      console.error(`🚨 Request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  async createAccount(
    email: string,
    password: string,
    name: string,
    role: string = 'buyer'
  ): Promise<{ success: boolean; user?: UserProfile; token?: string }> {
    try {
      console.log('🔧 Creating account:', { email, name: name || 'Anonymous User', role });
      const data = { email, password, name, role };

      const createResponse = (await this.sendRequest(
        API_CONFIG.NODE_BACKEND.endpoints.auth.register,
        'POST',
        data
      )) as {
        success: boolean;
        user?: UserProfile;
        token?: string;
      };
      console.log('🔧 Account creation response:', createResponse);

      if (createResponse.success && createResponse.user) {
        try {
          console.log('🔧 Account created successfully, attempting automatic login...');

          // Clear any cached data for fresh account
          try {
            console.log('🧹 Clearing cached data for new account...');
            creditService.clearCachedData();
          } catch (error) {
            console.warn('⚠️ Failed to clear cached data for new account:', error);
          }

          const loginResponse = await this.login(email, password);
          console.log('🔧 Automatic login successful:', loginResponse);
          return loginResponse;
        } catch (loginError) {
          console.log('🔧 Automatic login failed, returning creation response:', loginError);
          return createResponse;
        }
      }

      console.log('🔧 Account creation completed, returning response:', createResponse);
      return createResponse;
    } catch (error) {
      console.error('🔧 Account creation failed:', error);
      if (error instanceof Error && error.message.includes('400')) {
        throw new Error('Account creation failed: Invalid data provided');
      }
      throw error;
    }
  }

  async verifyEmail(token: string): Promise<{ success: boolean; message: string }> {
    try {
      return (await this.sendRequest(`/auth/verify?token=${token}`, 'GET')) as {
        success: boolean;
        message: string;
      };
    } catch {
      return (await this.sendRequest(`/users/verify?token=${token}`, 'GET')) as {
        success: boolean;
        message: string;
      };
    }
  }

  async resendVerificationEmail(email: string): Promise<{ success: boolean; message: string }> {
    try {
      return (await this.sendRequest('/auth/resend-verification', 'POST', { email })) as {
        success: boolean;
        message: string;
      };
    } catch {
      return (await this.sendRequest('/users/resendVerification', 'POST', { email })) as {
        success: boolean;
        message: string;
      };
    }
  }

  async sendPasswordResetEmail(email: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = (await this.sendRequest('/auth/forgot-password', 'POST', { email })) as {
        success: boolean;
        message: string;
      };
      return response;
    } catch {
      try {
        const response = (await this.sendRequest('/users/forgotPassword', 'POST', { email })) as {
          success: boolean;
          message: string;
        };
        return response;
      } catch (fallbackError) {
        throw fallbackError;
      }
    }
  }

  async refreshToken(): Promise<{ success: boolean; token?: string }> {
    try {
      const response = (await this.sendRequest(
        API_CONFIG.NODE_BACKEND.endpoints.auth.refresh,
        'POST',
        {},
        true
      )) as {
        success: boolean;
        token?: string;
      };
      if (response.success && response.token) {
        this.updateTokenCookies(response.token);
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  updateTokenCookies(accessToken: string): void {
    if (!this.cookies) return;

    const cookieOptions = {
      path: '/',
      secure: window.location.protocol === 'https:',
      sameSite: 'lax' as const,
      maxAge: 24 * 60 * 60, // 24 hours
    };

    this.cookies.set('access_token', accessToken, cookieOptions);
  }

  async uploadAvatar(file: File): Promise<{ success: boolean; avatarUrl?: string }> {
    const formData = new FormData();
    formData.append('avatar', file);

    const url = `${this.baseUrl}/api/user/avatar`;
    const token = this.cookies.get('access_token');

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      credentials: 'include',
    });

    return (await response.json()) as { success: boolean; avatarUrl?: string };
  }

  async updateUserProfile(profileData: {
    name?: string;
    email?: string;
    user_preferences?: UserPreferences;
  }): Promise<{ success: boolean; user?: UserProfile }> {
    try {
      const response = (await this.sendRequest('/auth/profile', 'PUT', profileData, true)) as {
        success: boolean;
        user?: UserProfile;
      };
      return response;
    } catch {
      const response = (await this.sendRequest('/api/user/profile', 'PUT', profileData, true)) as {
        success: boolean;
        user?: UserProfile;
      };
      return response;
    }
  }

  async getUserProfile(): Promise<{ success: boolean; user?: UserProfile }> {
    try {
      const url = '/auth/profile';
      const response = (await this.sendRequest(url, 'GET', undefined, true)) as {
        success: boolean;
        user?: UserProfile;
      };

      if (response.user?.avatar) {
        response.user.avatar = this.processAvatarUrl(response.user.avatar);
      }

      return response;
    } catch {
      const url = '/api/user/profile';
      const response = (await this.sendRequest(url, 'GET', undefined, true)) as {
        success: boolean;
        user?: UserProfile;
      };

      if (response.user?.avatar) {
        response.user.avatar = this.processAvatarUrl(response.user.avatar);
      }

      return response;
    }
  }

  private processAvatarUrl(avatar: string): string {
    if (avatar.startsWith('http')) {
      return avatar;
    }
    return `${this.baseUrl}${avatar.startsWith('/') ? '' : '/'}${avatar}`;
  }

  async updateUserType(
    userType: 'creator' | 'business'
  ): Promise<{ success: boolean; user?: UserProfile }> {
    const authResult = await this.checkAuthentication();

    if (!authResult.isAuthenticated || !authResult.user) {
      throw new Error('User not authenticated');
    }

    try {
      const profileData = { userType };
      const response = (await this.sendRequest('/auth/profile', 'PUT', profileData, true)) as {
        success: boolean;
        user?: UserProfile;
      };

      if (response.success) {
        return response;
      }

      throw new Error('Profile update failed');
    } catch (error) {
      try {
        const creatorResponse = (await this.sendRequest(
          '/api/user/creator-mode',
          'POST',
          { enabled: userType === 'creator' },
          true
        )) as { success: boolean; user?: UserProfile };
        return creatorResponse;
      } catch (creatorError) {
        if (userType === 'business') {
          const localUser = { ...authResult.user, userType: UserType.Business };
          this.updateTokenCookies(this.cookies.get('access_token'));
          return { success: true, user: localUser };
        }
        throw creatorError;
      }
    }
  }

  async toggleCreatorMode(enabled: boolean): Promise<{ success: boolean; user?: UserProfile }> {
    const authResult = await this.checkAuthentication();

    if (!authResult.isAuthenticated) {
      throw new Error('User not authenticated');
    }

    try {
      const response = (await this.sendRequest(
        '/api/user/creator-mode',
        'POST',
        { enabled },
        true
      )) as { success: boolean; user?: UserProfile };
      return response;
    } catch (error) {
      throw error;
    }
  }

  async login(
    email: string,
    password: string
  ): Promise<{ success: boolean; user?: UserProfile; token?: string }> {
    const data = { email, password };

    try {
      console.log('🔑 Login attempt:', { email, baseUrl: this.baseUrl });

      const response = (await this.sendRequest(
        API_CONFIG.NODE_BACKEND.endpoints.auth.login,
        'POST',
        data
      )) as {
        success?: boolean;
        user?: UserProfile;
        token?: string;
        access_token?: string;
        accessToken?: string;
        message?: string;
        error?: string;
        // Allow any additional fields from backend
        [key: string]: unknown;
      };

      console.log('🔍 Backend login response (full):', JSON.stringify(response, null, 2));
      console.log('🔍 Response keys:', Object.keys(response));
      console.log('🔍 Response success field:', response.success);
      console.log('🔍 Response token fields:', {
        token: response.token,
        access_token: response.access_token,
        accessToken: response.accessToken,
      });

      // Check for various token field names
      const token = response.token || response.access_token || response.accessToken;

      if (token) {
        console.log('✅ Token found:', token.substring(0, 20) + '...');
        this.updateTokenCookies(token);

        // Try to verify authentication immediately
        const authStatus = await this.checkAuthentication();

        if (authStatus.isAuthenticated && authStatus.user) {
          console.log('✅ Authentication verified successfully');

          // Clear cached credit data and initialize fresh account
          try {
            console.log('🧹 Clearing cached data and initializing fresh account...');
            await creditService.initializeFreshAccount();
          } catch (error) {
            console.warn('⚠️ Failed to initialize fresh account credits:', error);
          }

          return {
            success: true,
            user: authStatus.user,
            token,
          };
        } else {
          console.log('❌ Authentication verification failed');
        }
      }

      // Check if response indicates success (handle various formats)
      const isSuccess =
        response.success === true ||
        (response.success === undefined && token) ||
        (typeof response.success === 'string' && response.success === 'true');

      if (!isSuccess) {
        const errorMsg =
          response.error || response.message || `Backend returned success=${response.success}`;
        throw new Error(`Login failed: ${errorMsg}`);
      }

      if (!token) {
        throw new Error(
          `Login failed: No token received from backend. Response keys: ${Object.keys(response).join(', ')}`
        );
      }

      throw new Error('Login failed: Authentication verification failed after token received');
    } catch (error) {
      console.error('🚨 Login error details:', error);
      console.error('🚨 Error type:', typeof error);
      console.error('🚨 Error message:', error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.sendRequest(API_CONFIG.NODE_BACKEND.endpoints.auth.logout, 'POST', {}, true);
    } catch {
      // Continue with logout even if server request fails
    }

    // Clear cached credit data on logout
    try {
      console.log('🧹 Clearing cached data on logout...');
      creditService.clearCachedData();
    } catch (error) {
      console.warn('⚠️ Failed to clear cached data on logout:', error);
    }

    if (this.cookies) {
      this.cookies.remove('access_token', { path: '/' });
    }

    const homePageUrl = window.location.origin;
    window.location.href = homePageUrl;
  }

  setupAuthStateListener(): void {
    window.addEventListener('message', event => {
      if (event.data.type === 'AUTH_STATE_CHANGED') {
        const authStatus = this.checkAuthentication();
        // Handle auth state change
      }
    });
  }

  async checkAuthentication(): Promise<AuthResult> {
    console.log('🔐 checkAuthentication: Starting authentication check');

    // 🚨 DEVELOPMENT BYPASS: Check if dev bypass is enabled
    const DEV_BYPASS_AUTH = import.meta.env.VITE_DEV_BYPASS_AUTH === 'true';

    if (DEV_BYPASS_AUTH && process.env.NODE_ENV === 'development') {
      console.log('🚨 DEV MODE: Bypassing authentication check for development');
      const mockUser: UserProfile = {
        id: 'dev-user-123',
        _id: 'dev-user-123',
        email: 'dev@betweendeals.com',
        name: 'Development User',
        userType: UserType.Seller,
        password: 'mock_password', // Required by type but not used
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        rank: 1,
        userPreferences: {
          enableDataCollection: true,
          eventCollection: 'all events',
          tabOption: 'all tabs',
        },
      };

      return {
        isAuthenticated: true,
        user: mockUser,
        token: 'dev-mock-token',
      };
    }

    if (!this.cookies) {
      console.log('❌ checkAuthentication: No cookies available');
      return { isAuthenticated: false };
    }

    const authToken = this.cookies.get('access_token');

    if (!authToken) {
      console.log('❌ checkAuthentication: No access token found');
      return { isAuthenticated: false };
    }

    console.log('🎫 checkAuthentication: Token found, length:', authToken.length);

    try {
      const decoded = this.parseJWT(authToken) as any;

      if (!decoded) {
        console.log('💥 checkAuthentication: Failed to parse JWT token');
        return { isAuthenticated: false };
      }

      console.log('🔍 checkAuthentication: Decoded token:', decoded);

      if (!decoded.exp || decoded.exp * 1000 < Date.now()) {
        console.log('⏰ checkAuthentication: Token expired');
        return { isAuthenticated: false };
      }

      // Handle different token formats - either nested user object or direct fields
      let userFromToken = null;

      if (decoded.user) {
        // Token has nested user object
        console.log('👤 checkAuthentication: Found nested user in token');
        userFromToken = decoded.user;
      } else if (decoded.id || decoded.email) {
        // Token has user fields directly (current backend format)
        console.log('👤 checkAuthentication: Found user fields directly in token');
        userFromToken = {
          _id: decoded.id,
          email: decoded.email,
          name: decoded.name || 'Anonymous User',
          userType: decoded.role || 'creator',
          verified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }

      if (!userFromToken) {
        console.log('👤 checkAuthentication: No user data found in token');
        return { isAuthenticated: false };
      }

      console.log('✅ checkAuthentication: Token is valid, user data found:', userFromToken);

      // Try to get fresh profile data, but fall back to token data if profile endpoints fail
      try {
        const response = (await this.sendRequest(
          API_CONFIG.NODE_BACKEND.endpoints.auth.profile,
          'GET',
          undefined,
          true
        )) as {
          success: boolean;
          user?: UserProfile;
        };

        console.log('👤 checkAuthentication: Profile response:', response);

        if (response.success && response.user) {
          console.log('✅ checkAuthentication: Authentication successful with fresh profile');
          return {
            isAuthenticated: true,
            user: response.user,
            token: authToken,
          };
        }
      } catch (error) {
        console.log('❌ checkAuthentication: Profile request failed:', error);

        try {
          const fallbackResponse = (await this.sendRequest(
            '/api/user/profile',
            'GET',
            undefined,
            true
          )) as { success: boolean; user?: UserProfile };

          console.log('👤 checkAuthentication: Fallback profile response:', fallbackResponse);

          if (fallbackResponse.success && fallbackResponse.user) {
            console.log('✅ checkAuthentication: Authentication successful with fallback profile');
            return {
              isAuthenticated: true,
              user: fallbackResponse.user,
              token: authToken,
            };
          }
        } catch (fallbackError) {
          console.log('❌ checkAuthentication: Fallback profile request failed:', fallbackError);
        }
      }

      // If profile endpoints fail but we have valid user data from token, use it
      console.log('🔄 checkAuthentication: Profile endpoints failed, using token user data');

      return {
        isAuthenticated: true,
        user: userFromToken,
        token: authToken,
      };
    } catch (error) {
      console.log('💥 checkAuthentication: Error parsing/processing token:', error);
      return { isAuthenticated: false };
    }
  }

  async updatePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = (await this.sendRequest(
        '/auth/change-password',
        'POST',
        { currentPassword, newPassword },
        true
      )) as { success: boolean; message: string };
      return response;
    } catch {
      try {
        const response = (await this.sendRequest(
          '/users/changePassword',
          'POST',
          { currentPassword, newPassword },
          true
        )) as { success: boolean; message: string };
        return response;
      } catch (fallbackError) {
        throw fallbackError;
      }
    }
  }

  private parseJWT(token: string): Record<string, unknown> | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  }

  getApiConfig(): { baseUrl: string } {
    return { baseUrl: this.baseUrl };
  }

  getAuthenticatedUser(): string | null {
    // 🚨 DEMO MODE: Enable demo authentication for production showcase
    const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';
    const DEV_BYPASS_AUTH = import.meta.env.VITE_DEV_BYPASS_AUTH === 'true';

    if (DEMO_MODE || (DEV_BYPASS_AUTH && process.env.NODE_ENV === 'development')) {
      console.log('🎭 DEMO MODE: Authentication bypassed for demonstration');
      return 'demo-user-token-2024';
    }

    if (!this.cookies) return null;
    return this.cookies.get('access_token') || null;
  }
}

export const authService = new AuthenticationService();
export default authService;
