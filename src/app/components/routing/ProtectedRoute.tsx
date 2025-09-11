// 🛡️ Protected Route Component (Placeholder)
// Location: src/app/components/routing/ProtectedRoute.tsx
// Purpose: Basic authentication protection

import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = '/auth/login',
}) => {
  // TODO: Implement actual authentication checking
  const isAuthenticated = true; // Placeholder

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
