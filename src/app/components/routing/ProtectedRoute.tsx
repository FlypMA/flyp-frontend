// 🛡️ Protected Route Component
// Location: src/app/components/routing/ProtectedRoute.tsx
// Purpose: Wrapper component to protect routes that require authentication

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

/**
 * ProtectedRoute Component
 * - Redirects unauthenticated users to login
 * - Preserves the intended destination for post-login redirect
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAuth = true }) => {
  const location = useLocation();

  // TODO: Replace with actual auth state check
  const isAuthenticated = false; // Replace with actual auth logic

  if (requireAuth && !isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
