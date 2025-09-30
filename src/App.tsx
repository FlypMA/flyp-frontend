/**
 * 🏠 App Component - UpSwitch MVP
 *
 * This is the root component of the application that:
 * - Sets up the application shell (providers, routing, error boundaries)
 * - Provides global error handling and recovery
 * - Manages the overall application state and structure
 *
 * ARCHITECTURE:
 * - Uses the app shell from @app (providers, routing, layouts)
 * - Implements error boundaries for graceful error handling
 * - Provides loading states for better UX
 * - Follows MVP principles with essential features only
 */

import { Button } from '@/shared/components/buttons';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from 'react-router-dom';
import { AppProviders } from './app/providers';
import { router } from './app/routing';
import { logger } from './shared/utils/logger';

// 🚨 Error Fallback Component - MVP Version
const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => (
  <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50">
    <div className="max-w-md text-center">
      <div className="mb-6">
        <div className="mx-auto h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
          <svg
            className="h-8 w-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
      </div>

      <h2 className="mb-4 text-2xl font-bold text-gray-900">Something went wrong</h2>
      <p className="mb-6 text-sm text-gray-600">
        We encountered an unexpected error. Please try refreshing the page or contact support if the
        problem persists.
      </p>

      {import.meta.env.MODE === 'development' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-xs text-red-800 font-mono break-all">{error.message}</p>
        </div>
      )}

      <div className="space-y-3">
        <Button variant="primary" fullWidth onClick={resetErrorBoundary}>
          Try again
        </Button>

        <Button variant="secondary" fullWidth onClick={() => (window.location.href = '/')}>
          Go to Home
        </Button>
      </div>
    </div>
  </div>
);

// 🏠 Router Wrapper Component
// Location: src/App.tsx
// Purpose: Wraps RouterProvider with loading fallback

const RouterWrapper: React.FC = () => {
  return (
    <RouterProvider
      router={router}
      fallbackElement={
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600">Loading application...</p>
          </div>
        </div>
      }
    />
  );
};

// 🏠 Main App Component - MVP Version
// Location: src/App.tsx
// Purpose: Application root with error boundaries and provider composition

const App: React.FC = () => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(_error, _errorInfo) => {
        // Log error for debugging in development
        if (import.meta.env.MODE === 'development') {
          logger.error('Error occurred', _error);
        }

        // In production, you might want to send this to an error reporting service
        // Example: errorReportingService.captureException(error, { extra: errorInfo });
      }}
    >
      <AppProviders>
        <RouterWrapper />
      </AppProviders>
    </ErrorBoundary>
  );
};

export default App;
