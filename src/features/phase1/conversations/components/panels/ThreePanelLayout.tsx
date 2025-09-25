// 🎯 Three Panel Layout Component
// Location: src/features/phase1/conversations/components/panels/ThreePanelLayout.tsx
// Purpose: CSS Grid-based three-panel layout for messaging interface

import React, { useEffect, useRef } from 'react';
import { useBreakpointDetection, usePanelLayout } from '../../hooks/useContextPanel';

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
        display: 'grid',
        height: '100vh',
        transition: 'grid-template-columns 0.3s ease-in-out',
        ...gridStyle,
      }}
    >
      {/* Left Panel - Conversations */}
      <div
        className={`left-panel ${layoutConfig.leftPanel.visible ? 'visible' : 'hidden'} ${
          layoutConfig.leftPanel.position === 'fixed' ? 'fixed' : 'relative'
        }`}
        style={{
          gridArea: 'left',
          position: layoutConfig.leftPanel.position,
          width: layoutConfig.leftPanel.width,
          height: '100vh',
          zIndex: layoutConfig.leftPanel.position === 'fixed' ? 1000 : 'auto',
          transform:
            layoutConfig.leftPanel.position === 'fixed' && !layoutConfig.leftPanel.visible
              ? 'translateX(-100%)'
              : 'translateX(0)',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        {children.leftPanel}
      </div>

      {/* Middle Panel - Chat */}
      <div
        className="middle-panel"
        style={{
          gridArea: 'middle',
          minWidth: 0, // Prevents grid item from overflowing
        }}
      >
        {children.middlePanel}
      </div>

      {/* Right Panel - Context */}
      <div
        className={`right-panel ${layoutConfig.rightPanel.visible ? 'visible' : 'hidden'} ${
          layoutConfig.rightPanel.position === 'fixed' ? 'fixed' : 'relative'
        } ${isCollapsed ? 'collapsed' : 'expanded'}`}
        style={{
          gridArea: 'right',
          position: layoutConfig.rightPanel.position,
          width: layoutConfig.rightPanel.width,
          height: '100vh',
          maxHeight: '100vh',
          overflow: 'hidden',
          zIndex: layoutConfig.rightPanel.position === 'fixed' ? 1000 : 'auto',
          transform:
            layoutConfig.rightPanel.position === 'fixed' && !layoutConfig.rightPanel.visible
              ? 'translateX(100%)'
              : 'translateX(0)',
          transition: 'transform 0.3s ease-in-out, width 0.3s ease-in-out',
        }}
      >
        {children.rightPanel}
      </div>

      {/* Mobile Overlay */}
      {breakpoint === 'mobile' &&
        layoutConfig.rightPanel.overlay &&
        layoutConfig.rightPanel.visible && (
          <div
            className="mobile-overlay"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999,
              opacity: layoutConfig.rightPanel.visible ? 1 : 0,
              visibility: layoutConfig.rightPanel.visible ? 'visible' : 'hidden',
              transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
            }}
          />
        )}
    </div>
  );
};

export default ThreePanelLayout;
