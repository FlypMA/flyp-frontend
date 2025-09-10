// RoleProtectedRoute.tsx
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@heroui/react';
import { authService } from '../../../services/users/authenticationService';
import { UserRole, User, UserRoleString } from '../../../../types/user.consolidated';

interface RoleProtectedRouteProps {
  element: React.ReactElement;
  allowedRoles: UserRoleString[];
  redirectTo?: string;
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  element,
  allowedRoles,
  redirectTo = '/',
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthAndRole = async () => {
      try {
        console.log('🔐 RoleProtectedRoute: Checking authentication and role...');

        const authResult = await authService.checkAuthentication();
        console.log('🔐 RoleProtectedRoute: Auth result:', authResult);

        if (!authResult.isAuthenticated || !authResult.user) {
          console.log('🔐 RoleProtectedRoute: Not authenticated, redirecting to login');
          setIsAuthenticated(false);
          setIsAuthorized(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(authResult.user);

        // Check if user has required role
        const userRole = authResult.user.role;
        const hasAccess = allowedRoles.includes(userRole);

        console.log('🔐 RoleProtectedRoute: Role check:', {
          userRole,
          allowedRoles,
          hasAccess,
        });

        setIsAuthorized(hasAccess);
      } catch (error) {
        console.error('🔐 RoleProtectedRoute: Auth check failed:', error);
        setIsAuthenticated(false);
        setIsAuthorized(false);
      }
    };

    checkAuthAndRole();
  }, [allowedRoles]);

  // Loading state
  if (isAuthenticated === null || isAuthorized === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Not authorized (authenticated but wrong role)
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">🚫</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page. This area is restricted to{' '}
            {allowedRoles.join(', ').toLowerCase()} accounts.
          </p>
          <div className="space-y-3">
            <Button color="primary" onPress={() => window.history.back()}>
              Go Back
            </Button>
            <Button variant="bordered" onPress={() => (window.location.href = '/')}>
              Go to Home
            </Button>
          </div>
          {user && (
            <p className="text-sm text-gray-500 mt-4">
              Logged in as: {user.email} ({user.role})
            </p>
          )}
        </div>
      </div>
    );
  }

  // Authorized - show the protected content
  return element;
};

export default RoleProtectedRoute;
