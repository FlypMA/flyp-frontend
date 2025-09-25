// 🎯 Context Switcher Component
// Location: src/features/phase1/conversations/components/panels/ContextSwitcher.tsx
// Purpose: Dropdown for switching between different context panel types

import {
  Building2,
  ChevronDown,
  FileText,
  FolderOpen,
  Handshake,
  MessageSquare,
} from 'lucide-react';
import React from 'react';
import { ContextPanelType } from '../../types/context-panel.types';

// =============================================================================
// COMPONENT PROPS
// =============================================================================

interface ContextSwitcherProps {
  activeContext: ContextPanelType;
  onContextChange: (_context: ContextPanelType) => void;
  availableContexts: ContextPanelType[];
  className?: string;
}

// =============================================================================
// CONTEXT ICONS MAPPING
// =============================================================================

const contextIcons: Record<ContextPanelType, React.ReactNode> = {
  business_info: <Building2 className="w-4 h-4" />,
  due_diligence: <FileText className="w-4 h-4" />,
  transaction: <Handshake className="w-4 h-4" />,
  documents: <FolderOpen className="w-4 h-4" />,
  communication: <MessageSquare className="w-4 h-4" />,
};

// =============================================================================
// CONTEXT LABELS MAPPING
// =============================================================================

const contextLabels: Record<ContextPanelType, string> = {
  business_info: 'Business Info',
  due_diligence: 'Due Diligence',
  transaction: 'Transaction',
  documents: 'Documents',
  communication: 'Communication',
};

// =============================================================================
// CONTEXT SWITCHER COMPONENT
// =============================================================================

const ContextSwitcher: React.FC<ContextSwitcherProps> = ({
  activeContext,
  onContextChange,
  availableContexts,
  className = '',
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleContextSelect = (context: ContextPanelType) => {
    onContextChange(context);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Trigger Button - Airbnb Style */}
      <button
        type="button"
        className="inline-flex items-center justify-center transition-all duration-200 ease-in-out focus:outline-none focus:ring-3 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed border-0 outline-none cursor-pointer relative overflow-hidden bg-neutral-600 text-white font-medium hover:bg-neutral-700 focus:ring-neutral-500/30 shadow-sm hover:shadow-md active:scale-[0.98] px-4 py-2 text-sm h-9 rounded-lg w-full justify-between text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center justify-center opacity-100">
          <div className="flex items-center space-x-2">
            {contextIcons[activeContext]}
            <span>{contextLabels[activeContext]}</span>
          </div>
          <span className="ml-2">
            <ChevronDown className="w-4 h-4" />
          </span>
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="py-1">
            {availableContexts.map(context => (
              <button
                key={context}
                onClick={() => handleContextSelect(context)}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-sm text-left hover:bg-gray-50 transition-colors ${
                  context === activeContext ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                }`}
              >
                {contextIcons[context]}
                <span>{contextLabels[context]}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  );
};

export default ContextSwitcher;
