// 🛡️ Core System Providers - Foundation layer
// Security, Error Boundary, Theme - Always needed first
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { SecurityProvider } from '@shared/components/security/SecurityProvider';
import { LoadingFallback } from '@shared/components/feedback/loading-fallback';

interface CoreProvidersProps {
  children: React.ReactNode;
}

/**
 * Core Error Fallback Component
 */
const ErrorFallback: React.FC<{ error: Error; resetErrorBoundary: () => void }> = ({
  error,
  resetErrorBoundary,
}) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="flex-shrink-0">
          <svg
            className="h-8 w-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h1 className="text-lg font-medium text-gray-900">Something went wrong</h1>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        {error.message || 'An unexpected error occurred'}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Try again
      </button>
    </div>
  </div>
);

/**
 * Core Providers - Security, Error Boundaries, Suspense
 * Layer 1: Foundation layer that should wrap everything
 */
export const CoreProviders: React.FC<CoreProvidersProps> = ({ children }) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        // Log to error reporting service
        console.error('🚨 Application Error:', error, errorInfo);
      }}
      onReset={() => {
        // Clear any cached data, reset app state
        window.location.reload();
      }}
    >
      <SecurityProvider>
        <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
      </SecurityProvider>
    </ErrorBoundary>
  );
};
