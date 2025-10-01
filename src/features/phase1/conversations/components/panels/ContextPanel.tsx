// 🎯 Context Panel Component
// Location: src/features/phase1/conversations/components/panels/ContextPanel.tsx
// Purpose: Right panel wrapper for contextual information and actions - Airbnb Style

import { Button } from '@/shared/components/buttons';
import { X } from 'lucide-react';
import React, { Suspense } from 'react';
import { useContextPanel } from '../../hooks/useContextPanel';
import { Conversation } from '../../types';

// =============================================================================
// COMPONENT PROPS
// =============================================================================

interface ContextPanelProps {
  conversation: Conversation | null;
  onQuickAction: (_actionId: string) => void;
  className?: string;
}

// =============================================================================
// LAZY LOADED CONTEXT PANELS
// =============================================================================

const UnifiedDealPanel = React.lazy(() => import('./context-panels/UnifiedDealPanel'));

// =============================================================================
// CONTEXT PANEL COMPONENT
// =============================================================================

const ContextPanel: React.FC<ContextPanelProps> = ({
  conversation,
  onQuickAction,
  className = '',
}) => {
  const {
    isVisible,
    isLoading,
    error,
    toggleVisibility,
    currentBreakpoint,
    setMobileActivePanel,
    mobileActivePanel,
  } = useContextPanel();

  const isMobile = currentBreakpoint === 'mobile';

  // Handle back button on mobile
  const handleBack = () => {
    if (isMobile) {
      setMobileActivePanel('middle'); // Go back to chat
    } else {
      toggleVisibility(); // Close panel on desktop
    }
  };

  // Don't render if no conversation
  if (!conversation) {
    return null;
  }

  // On mobile, show only when active panel is 'right'
  // On desktop, show only when isVisible is true
  if (isMobile && mobileActivePanel !== 'right') {
    return null;
  }
  if (!isMobile && !isVisible) {
    return null;
  }

  // Render the unified deal panel
  const renderContextPanel = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-4 text-center">
          <div className="text-red-500 mb-2">⚠️</div>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <Button size="sm" variant="secondary" onPress={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      );
    }

    return <UnifiedDealPanel conversation={conversation} onQuickAction={onQuickAction} />;
  };

  return (
    <div
      className={`context-panel bg-white border-l border-gray-200 flex flex-col h-full ${className}`}
    >
      {/* Panel Header - Minimal & Functional */}
      <div className="px-4 py-6 border-b border-gray-200 bg-white flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold text-gray-900">Business Details</h3>
          </div>
          <Button
            isIconOnly
            variant="tertiary"
            size="sm"
            className="text-gray-500 hover:text-gray-700"
            onPress={handleBack}
            aria-label={isMobile ? 'Back to chat' : 'Close panel'}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-y-auto">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
            </div>
          }
        >
          {renderContextPanel()}
        </Suspense>
      </div>
    </div>
  );
};

export default ContextPanel;
