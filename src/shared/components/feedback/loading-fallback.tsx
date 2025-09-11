// ⏳ Loading Fallback Component
import React from 'react';
// import { BetweendealsLoadingLogo } from '@shared/components/ui'; // TODO: Fix import

// Simple loading component
const BetweendealsLoadingLogo = () => (
  <div className="flex items-center space-x-2">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    <span className="text-blue-600 font-semibold">BetweenDeals</span>
  </div>
);

/**
 * Loading Fallback - Used by Suspense boundaries for lazy-loaded routes
 */
export const LoadingFallback: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <BetweendealsLoadingLogo size="lg" showText={true} text="Loading..." />
    </div>
  );
};
