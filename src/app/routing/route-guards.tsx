/**
 * 🛡️ Route Guards - UpSwitch MVP
 * Enhanced route protection with role-based access control
 *
 * FEATURES:
 * - Authentication protection
 * - Role-based authorization (buyer, seller, both, admin)
 * - Informative access denied pages
 * - Loading states
 * - Flexible redirect handling
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '../../shared/components/buttons';
import { UserRole, isAdminUser, isBuyerUser, isSellerUser } from '../../shared/types';
import { shouldBypassProtectedRoute } from '../../shared/utils/dev/devBypass';
import { useAuth } from '../providers/auth-provider';

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

interface BaseRouteProps {
  children: React.ReactNode;
}

interface ProtectedRouteProps extends BaseRouteProps {
  requireAuth?: boolean;
  redirectTo?: string;
}

interface RoleProtectedRouteProps extends BaseRouteProps {
  allowedRoles: UserRole[];
  redirectTo?: string;
  fallbackTo?: string;
}

// =============================================================================
// LOADING COMPONENT
// =============================================================================

const LoadingScreen: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => (
  <div className="flex min-h-screen items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent mx-auto mb-4"></div>
      <p className="text-gray-600">{message}</p>
    </div>
  </div>
);

// =============================================================================
// ACCESS DENIED COMPONENT
// =============================================================================

const AccessDeniedPage: React.FC<{
  user: { email: string; role: string } | null;
  allowedRoles: UserRole[];
  onGoBack?: () => void;
  onGoHome?: () => void;
}> = ({ user, allowedRoles, onGoBack, onGoHome }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div className="text-center max-w-md">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636 5.636 18.364"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
      <p className="text-gray-600 mb-6">
        You don't have permission to access this page. This area is restricted to{' '}
        <span className="font-medium">
          {allowedRoles.map(role => (role === 'both' ? 'buyer & seller' : role)).join(', ')}
        </span>{' '}
        accounts.
      </p>

      <div className="space-y-3 mb-6">
        <Button
          variant="primary"
          className="w-full"
          onPress={onGoBack || (() => window.history.back())}
        >
          Go Back
        </Button>

        <Button
          variant="secondary"
          className="w-full"
          onPress={onGoHome || (() => (window.location.href = '/'))}
        >
          Go to Home
        </Button>
      </div>

      {user && (
        <div className="bg-gray-100 rounded-lg p-4">
          <p className="text-sm text-gray-600">Currently logged in as:</p>
          <p className="text-sm font-medium text-gray-900">
            {user.email}
            <span className="ml-2 px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
              {user.role === 'both' ? 'Buyer & Seller' : user.role}
            </span>
          </p>
        </div>
      )}
    </div>
  </div>
);

// =============================================================================
// ROUTE GUARD COMPONENTS
// =============================================================================

/**
 * Basic protected route component
 * Redirects unauthenticated users to login
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  redirectTo = '/',
}) => {
  const { user, isLoading } = useAuth();

  // 🚨 DEVELOPMENT BYPASS: Check if dev bypass is enabled
  if (shouldBypassProtectedRoute()) {
    return <>{children}</>;
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return <LoadingScreen message="Verifying authentication..." />;
  }

  // Redirect if authentication required but user not authenticated
  if (requireAuth && !user) {
    return <Navigate to={redirectTo} replace />;
  }

  // Render protected content
  return <>{children}</>;
};

/**
 * Role-based protected route component
 * Checks both authentication and authorization
 */
export const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  children,
  allowedRoles,
  redirectTo = '/',
  fallbackTo,
}) => {
  const { user, isLoading } = useAuth();

  // 🚨 DEVELOPMENT BYPASS: Check if dev bypass is enabled
  if (shouldBypassProtectedRoute()) {
    return <>{children}</>;
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return <LoadingScreen message="Verifying access..." />;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check if user has required role
  const hasAccess = checkUserAccess(user, allowedRoles);

  // Show access denied if not authorized
  if (!hasAccess) {
    if (fallbackTo) {
      return <Navigate to={fallbackTo} replace />;
    }

    return (
      <AccessDeniedPage
        user={user}
        allowedRoles={allowedRoles}
        onGoHome={() => (window.location.href = '/')}
      />
    );
  }

  // Render protected content
  return <>{children}</>;
};

/**
 * Guest-only route component (for login/register pages)
 * Redirects authenticated users to appropriate dashboard
 */
export const GuestRoute: React.FC<ProtectedRouteProps> = ({ children, redirectTo }) => {
  const { user, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Redirect authenticated users to appropriate area
  if (user) {
    const targetRoute = redirectTo || getDefaultRouteForUser(user);
    return <Navigate to={targetRoute} replace />;
  }

  // Render guest-only content
  return <>{children}</>;
};

/**
 * Seller-only route component
 * Shorthand for seller role protection
 */
export const SellerRoute: React.FC<BaseRouteProps> = ({ children }) => (
  <RoleProtectedRoute allowedRoles={['seller', 'both', 'admin']}>{children}</RoleProtectedRoute>
);

/**
 * Buyer-accessible route component
 * Allows buyers and users with both roles
 */
export const BuyerRoute: React.FC<BaseRouteProps> = ({ children }) => (
  <RoleProtectedRoute allowedRoles={['buyer', 'both', 'admin']}>{children}</RoleProtectedRoute>
);

/**
 * Admin-only route component
 * Strictest protection for admin features
 */
export const AdminRoute: React.FC<BaseRouteProps> = ({ children }) => (
  <RoleProtectedRoute allowedRoles={['admin']}>{children}</RoleProtectedRoute>
);

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Check if user has access based on allowed roles
 */
const checkUserAccess = (user: { role: string } | null, allowedRoles: UserRole[]): boolean => {
  if (!user || !user.role) return false;

  // Admin has access to everything
  if (user.role === 'admin') return true;

  // Check if user role is in allowed roles
  if (allowedRoles.includes(user.role as UserRole)) return true;

  // Handle 'both' role - has access to buyer OR seller restricted areas
  if (user.role === 'both') {
    return allowedRoles.some(role => ['buyer', 'seller'].includes(role));
  }

  return false;
};

/**
 * Get default route for user based on their role
 */
const getDefaultRouteForUser = (user: { role: string } | null): string => {
  if (!user) return '/';

  switch (user.role) {
    case 'seller':
      return '/my-business';
    case 'both':
      return '/my-business'; // Prioritize business management for dual role
    case 'admin':
      return '/admin/dashboard';
    case 'buyer':
    default:
      return '/search'; // Buyers focus on browsing listings
  }
};

// =============================================================================
// HOOKS
// =============================================================================

/**
 * Hook for role-based access control in components
 */
export const useRoleGuard = (allowedRoles: UserRole[] = []) => {
  const { user, isLoading } = useAuth();

  const hasAccess = React.useMemo(() => {
    if (allowedRoles.length === 0) return true; // No restrictions
    if (!user) return false;

    return checkUserAccess(user, allowedRoles);
  }, [user, allowedRoles]);

  return {
    hasAccess,
    user,
    userRole: user?.role,
    isLoading,
    isSeller: isSellerUser(user),
    isBuyer: isBuyerUser(user),
    isAdmin: isAdminUser(user),
  };
};
