// ⏳ Loading Fallback Component
import React from 'react';
import { BetweendealsLoadingLogo } from '@shared/components/ui';

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
