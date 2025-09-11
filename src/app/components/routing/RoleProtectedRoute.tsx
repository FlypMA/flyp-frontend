// 👥 Role Protected Route Component
// Location: src/app/components/routing/RoleProtectedRoute.tsx
// Purpose: Wrapper component to protect routes based on user roles

import React from 'react';
import { Navigate } from 'react-router-dom';

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  requireRole?: string;
}

/**
 * RoleProtectedRoute Component
 * - Restricts access based on user roles
 * - Redirects unauthorized users to appropriate page
 */
export const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  children,
  allowedRoles = [],
  requireRole,
}) => {
  // TODO: Replace with actual user role check
  const userRole = 'buyer'; // Replace with actual role logic

  const hasAccess = requireRole
    ? userRole === requireRole
    : allowedRoles.length === 0 || allowedRoles.includes(userRole);

  if (!hasAccess) {
    // Redirect to unauthorized page or dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default RoleProtectedRoute;
