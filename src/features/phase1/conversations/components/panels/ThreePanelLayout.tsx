// 🎯 Three Panel Layout Component
// Location: src/features/phase1/conversations/components/panels/ThreePanelLayout.tsx
// Purpose: CSS Grid-based three-panel layout for messaging interface

import React, { useEffect, useRef } from 'react';
import {
  useBreakpointDetection,
  useContextPanel,
  usePanelLayout,
} from '../../hooks/useContextPanel';

// =============================================================================
// COMPONENT PROPS
// =============================================================================

interface ThreePanelLayoutProps {
  children: {
    leftPanel: React.ReactNode;
    middlePanel: React.ReactNode;
    rightPanel: React.ReactNode;
  };
  className?: string;
}

// =============================================================================
// THREE PANEL LAYOUT COMPONENT
// =============================================================================

const ThreePanelLayout: React.FC<ThreePanelLayoutProps> = ({ children, className = '' }) => {
  const { breakpoint, layoutConfig, isCollapsed } = usePanelLayout();
  const { handleResize } = useBreakpointDetection();
  const { togglePanel } = useContextPanel();
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle window resize for responsive design
  useEffect(() => {
    const handleWindowResize = () => {
      handleResize();
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [handleResize]);

  // Generate CSS Grid template based on layout config
  const getGridTemplate = () => {
    const { leftPanel, rightPanel } = layoutConfig;

    if (breakpoint === 'mobile') {
      return {
        gridTemplateColumns: '1fr',
        gridTemplateAreas: '"middle"',
      };
    }

    const leftWidth = leftPanel.visible ? `${leftPanel.width}px` : '0px';
    const rightWidth = rightPanel.visible ? `${rightPanel.width}px` : '0px';

    return {
      gridTemplateColumns: `${leftWidth} 1fr ${rightWidth}`,
      gridTemplateAreas: '"left middle right"',
    };
  };

  const gridStyle = getGridTemplate();

  return (
    <div
      ref={containerRef}
      className={`three-panel-layout ${className}`}
      style={{
        display: breakpoint === 'mobile' ? 'block' : 'grid',
        height: '100vh',
        width: '100vw',
        maxWidth: '100vw',
        overflow: 'hidden',
        position: 'relative',
        transition: breakpoint === 'mobile' ? 'none' : 'grid-template-columns 0.3s ease-in-out',
        ...(breakpoint === 'mobile' ? {} : gridStyle),
      }}
    >
      {/* Left Panel - Conversations */}
      {breakpoint === 'mobile' ? (
        // Mobile: Show as main view when visible, hide when not visible
        layoutConfig.leftPanel.visible ? (
          <div
            className="absolute inset-0 bg-white z-10 flex flex-col"
            style={{
              transform: 'translateX(0)',
              transition: 'transform 0.3s ease-in-out',
            }}
          >
            {children.leftPanel}
          </div>
        ) : null
      ) : (
        // Desktop: Grid item
        <div
          className="left-panel"
          style={{
            gridArea: 'left',
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          {children.leftPanel}
        </div>
      )}

      {/* Middle Panel - Chat */}
      {breakpoint === 'mobile' ? (
        // Mobile: Show only when left panel is hidden
        !layoutConfig.leftPanel.visible && (
          <div
            className="absolute inset-0 bg-white z-10 flex flex-col"
            style={{
              height: '100vh',
              width: '100%',
              overflow: 'hidden',
            }}
          >
            {children.middlePanel}
          </div>
        )
      ) : (
        // Desktop: Grid item
        <div
          className="middle-panel"
          style={{
            gridArea: 'middle',
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          {children.middlePanel}
        </div>
      )}

      {/* Right Panel - Context */}
      {breakpoint === 'mobile' ? (
        // Mobile: Fixed overlay (only when visible)
        layoutConfig.rightPanel.visible && (
          <div
            className="fixed inset-0 bg-white z-[1000] flex flex-col"
            style={{
              transform: 'translateX(0)',
              transition: 'transform 0.3s ease-in-out',
            }}
          >
            {children.rightPanel}
          </div>
        )
      ) : (
        // Desktop: Grid item
        <div
          className={`right-panel ${isCollapsed ? 'collapsed' : 'expanded'}`}
          style={{
            gridArea: 'right',
            height: '100vh',
            maxHeight: '100vh',
            overflow: 'hidden',
            transition: 'width 0.3s ease-in-out',
          }}
        >
          {children.rightPanel}
        </div>
      )}

      {/* Mobile Overlay - Shows when left or right panel is open */}
      {breakpoint === 'mobile' &&
        (layoutConfig.leftPanel.visible || layoutConfig.rightPanel.visible) && (
          <div
            className="mobile-overlay"
            onClick={() => {
              // Close whichever panel is open
              if (layoutConfig.leftPanel.visible) togglePanel('left');
              if (layoutConfig.rightPanel.visible) togglePanel('right');
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999,
              opacity: 1,
              transition: 'opacity 0.3s ease-in-out',
            }}
            aria-label="Close panel"
            role="button"
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
                if (layoutConfig.leftPanel.visible) togglePanel('left');
                if (layoutConfig.rightPanel.visible) togglePanel('right');
              }
            }}
          />
        )}
    </div>
  );
};

export default ThreePanelLayout;
