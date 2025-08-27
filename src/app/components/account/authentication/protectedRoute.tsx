// ProtectedRoute.tsx
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../../../services/users/authenticationService';
import UrlGeneratorService from '../../../services/urlMapping/urlGeneratorService';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

// 🚨 DEVELOPMENT ONLY: Set to true to bypass authentication
const DEV_BYPASS_AUTH = import.meta.env.VITE_DEV_BYPASS_AUTH === 'true';

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 🚨 DEVELOPMENT BYPASS: Skip authentication check
    if (DEV_BYPASS_AUTH && process.env.NODE_ENV === 'development') {
      console.log('🚨 DEV MODE: Bypassing authentication for development');
      setIsAuthenticated(true);
      setIsLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        console.log('🔐 ProtectedRoute: Checking authentication...');

        // First check if there's a token in cookies (quick check)
        const hasToken = authService.getAuthenticatedUser();

        if (!hasToken) {
          console.log('🔐 ProtectedRoute: No token found, redirecting to login');
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        // If there's a token, verify it with the server
        const authResult = await authService.checkAuthentication();
        console.log('🔐 ProtectedRoute: Auth result:', authResult);

        setIsAuthenticated(authResult.isAuthenticated);
      } catch (error) {
        console.error('🔐 ProtectedRoute: Authentication check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#1a1a1a',
          color: 'white',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div>
          <div style={{ marginBottom: '10px' }}>🔐 Checking authentication...</div>
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '3px solid #333',
              borderTop: '3px solid #007acc',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto',
            }}
          ></div>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return isAuthenticated ? element : <Navigate to={UrlGeneratorService.root()} replace />;
};

export default ProtectedRoute;
