// 🎯 Navigation Handlers - MVP Version
// Location: src/shared/components/navigation/utils/navigation-handlers.ts
// Purpose: Centralized navigation action handlers

import { NavigateFunction } from 'react-router-dom';
import { AuthenticationService } from '../../../../services/auth/Auth';

/**
 * Navigation Handler Class
 * Handles all navigation actions including logout, menu clicks, etc.
 */
export class NavigationHandler {
  private navigate: NavigateFunction;
  private authService: AuthenticationService;

  constructor(navigate: NavigateFunction, authService: AuthenticationService) {
    this.navigate = navigate;
    this.authService = authService;
  }

  /**
   * Handle logout - Exact copy from legacy user_avatar_dropdown.tsx
   */
  async handleLogout(): Promise<void> {
    try {
      console.log('🔓 Starting logout process...');
      
      // Set logout flag to prevent auth recheck during logout
      sessionStorage.setItem('user_logged_out', 'true');

      // Call backend logout
      await this.authService.logout();

      // Clear access_token cookie directly (like legacy)
      document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      console.log('🍪 Cleared access_token cookie');

      // Dispatch events for navigation state synchronization (like legacy)
      window.dispatchEvent(new CustomEvent('auth-logout'));
      window.dispatchEvent(new CustomEvent('auth-change'));

      console.log('✅ Logout successful, navigating to home');
      this.navigate('/');
    } catch (error) {
      console.error('❌ Logout failed:', error);
      // Ensure logout flag is still set on error
      sessionStorage.setItem('user_logged_out', 'true');
      // Fallback: force navigation even if logout fails (like legacy)
      this.navigate('/');
    }
  }

  /**
   * Handle dropdown menu clicks - Based on legacy user_avatar_dropdown.tsx
   */
  handleMenuClick(action: string): void {
    switch (action) {
      // Buyer navigation (SIMPLIFIED CTO MODEL)
      case 'browse-listings':
        this.navigate('/listings');
        break;
      case 'saved':
        this.navigate('/users/saved'); // Saved items in user profile
        break;

      // Business Owner navigation (AIRBNB MODEL - /my-business/*)
      case 'business-dashboard':
        this.navigate('/my-business'); // Navigate to business overview
        break;
      case 'my-business':
        this.navigate('/my-business'); // Navigate to business overview
        break;
      case 'my-listings':
        this.navigate('/my-business/listings');
        break;
      case 'valuation':
        this.navigate('/my-business/valuations');
        break;
      case 'performance':
        this.navigate('/my-business/performance');
        break;
      case 'documents':
        this.navigate('/my-business/documents');
        break;

      // Common navigation
      case 'messages':
        this.navigate('/messages');
        break;
      case 'profile-settings':
        this.navigate('/users/settings');
        break;
      case 'billing':
        this.navigate('/users/billing');
        break;
      case 'help-center':
        this.navigate('/help');
        break;
      case 'create-listing':
        this.navigate('/my-business/listings/new');
        break;
      case 'logout':
        this.handleLogout();
        break;
      default:
        console.warn('Unknown navigation action:', action);
    }
  }

  /**
   * Handle navigation with delay for mobile (like legacy MobileNavigation)
   */
  handleNavigationWithDelay(href: string, onClose?: () => void): void {
    if (onClose) {
      onClose();
    }
    setTimeout(() => {
      this.navigate(href);
    }, 250);
  }

  /**
   * Handle authentication actions
   */
  handleLogin(): void {
    this.navigate('/login');
  }

  handleSignup(): void {
    this.navigate('/register');
  }

  handleSellBusiness(user?: any): void {
    if (user) {
      this.navigate('/my-business/listings/new');
    } else {
      this.navigate('/register');
    }
  }
}

/**
 * Create navigation handler instance
 */
export const createNavigationHandler = (
  navigate: NavigateFunction,
  authService: AuthenticationService
): NavigationHandler => {
  return new NavigationHandler(navigate, authService);
};
