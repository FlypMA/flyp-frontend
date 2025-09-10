/**
 * Modern Tab Component - Clean, Accessible, Performance-Optimized
 *
 * As designed by Senior CTO & Designer
 * - Zero dependencies on complex UI libraries
 * - Built-in accessibility (ARIA, keyboard navigation)
 * - Modern pill/segment design
 * - Responsive and mobile-friendly
 * - Lightweight and performant
 */

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  KeyboardEvent,
} from 'react';
import { cn } from '@heroui/react';

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

export interface TabItem {
  /** Unique identifier for the tab */
  id: string;
  /** Display label */
  label: string;
  /** Optional icon (React element) */
  icon?: React.ReactNode;
  /** Optional badge/counter */
  badge?: string | number;
  /** Whether tab is disabled */
  disabled?: boolean;
  /** Tooltip text */
  tooltip?: string;
}

export interface ModernTabsProps {
  /** Array of tab items */
  tabs: TabItem[];
  /** Currently active tab ID */
  activeTab?: string;
  /** Callback when tab changes */
  onTabChange?: (tabId: string) => void;
  /** Default active tab (uncontrolled mode) */
  defaultTab?: string;
  /** Visual variant */
  variant?: 'pills' | 'underline' | 'bordered';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Full width tabs */
  fullWidth?: boolean;
  /** Allow scrolling for many tabs */
  scrollable?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID */
  'data-testid'?: string;
  /** Tab content children */
  children?: React.ReactNode;
}

export interface ModernTabContentProps {
  /** Tab ID this content belongs to */
  tabId: string;
  /** Content to render */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

// =============================================================================
// CONTEXT
// =============================================================================

interface TabContextValue {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  tabs: TabItem[];
  variant: 'pills' | 'underline' | 'bordered';
  size: 'sm' | 'md' | 'lg';
}

const TabContext = createContext<TabContextValue | undefined>(undefined);

const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('Tab components must be used within ModernTabs');
  }
  return context;
};

// =============================================================================
// MAIN TABS COMPONENT
// =============================================================================

export const ModernTabs: React.FC<ModernTabsProps> = ({
  tabs,
  activeTab: controlledActiveTab,
  onTabChange,
  defaultTab,
  variant = 'pills',
  size = 'md',
  fullWidth = false,
  scrollable = true,
  className,
  'data-testid': testId,
  children,
}) => {
  // State management (controlled/uncontrolled)
  const [internalActiveTab, setInternalActiveTab] = useState(
    () => controlledActiveTab || defaultTab || tabs[0]?.id || ''
  );

  const activeTab = controlledActiveTab ?? internalActiveTab;

  const handleTabChange = useCallback(
    (tabId: string) => {
      if (controlledActiveTab === undefined) {
        setInternalActiveTab(tabId);
      }
      onTabChange?.(tabId);
    },
    [controlledActiveTab, onTabChange]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>, tabId: string) => {
      const currentIndex = tabs.findIndex(tab => tab.id === tabId);
      let nextIndex = currentIndex;

      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault();
          nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
          break;
        case 'Home':
          event.preventDefault();
          nextIndex = 0;
          break;
        case 'End':
          event.preventDefault();
          nextIndex = tabs.length - 1;
          break;
        default:
          return;
      }

      const nextTab = tabs[nextIndex];
      if (nextTab && !nextTab.disabled) {
        handleTabChange(nextTab.id);
        // Focus the next tab button
        const nextButton = event.currentTarget.parentElement?.children[
          nextIndex
        ] as HTMLButtonElement;
        nextButton?.focus();
      }
    },
    [tabs, handleTabChange]
  );

  // Context value
  const contextValue = useMemo(
    () => ({
      activeTab,
      setActiveTab: handleTabChange,
      tabs,
      variant,
      size,
    }),
    [activeTab, handleTabChange, tabs, variant, size]
  );

  // Style variants
  const containerStyles = cn(
    // Base styles
    'modern-tabs-container',
    'flex items-center',

    // Variant styles
    {
      // Pills variant - Modern segmented control style
      'p-1 bg-gray-100 rounded-2xl': variant === 'pills',
      // Underline variant - Classic tab style
      'border-b border-gray-200': variant === 'underline',
      // Bordered variant - Card-style tabs
      'border border-gray-200 rounded-xl bg-white': variant === 'bordered',
    },

    // Layout styles
    {
      'w-full': fullWidth,
      'overflow-x-auto': scrollable,
      'flex-nowrap': scrollable,
    },

    // Custom classes
    className
  );

  const tabListStyles = cn('flex', {
    'gap-1': variant === 'pills',
    'gap-0': variant !== 'pills',
    'w-full': fullWidth,
    'min-w-max': scrollable,
  });

  return (
    <TabContext.Provider value={contextValue}>
      <div className={containerStyles} data-testid={testId}>
        <div className={tabListStyles} role="tablist" aria-orientation="horizontal">
          {tabs.map(tab => (
            <ModernTabButton
              key={tab.id}
              tab={tab}
              onKeyDown={handleKeyDown}
              fullWidth={fullWidth}
            />
          ))}
        </div>
      </div>
      {/* Render children (ModernTabContent components) within context */}
      {children}
    </TabContext.Provider>
  );
};

// =============================================================================
// TAB BUTTON COMPONENT
// =============================================================================

interface ModernTabButtonProps {
  tab: TabItem;
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>, tabId: string) => void;
  fullWidth: boolean;
}

const ModernTabButton: React.FC<ModernTabButtonProps> = ({ tab, onKeyDown, fullWidth }) => {
  const { activeTab, setActiveTab, variant, size } = useTabContext();
  const isActive = activeTab === tab.id;

  const handleClick = () => {
    if (!tab.disabled) {
      setActiveTab(tab.id);
    }
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm h-8',
    md: 'px-4 py-2 text-sm h-10',
    lg: 'px-6 py-3 text-base h-12',
  };

  // Variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'pills':
        return cn('rounded-xl transition-all duration-200 font-medium', {
          'bg-white text-gray-900 shadow-sm': isActive && !tab.disabled,
          'text-gray-600 hover:text-gray-900': !isActive && !tab.disabled,
          'text-gray-400 cursor-not-allowed': tab.disabled,
        });

      case 'underline':
        return cn('border-b-2 transition-all duration-200 font-medium', {
          'border-blue-600 text-blue-600': isActive && !tab.disabled,
          'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300':
            !isActive && !tab.disabled,
          'text-gray-400 cursor-not-allowed border-transparent': tab.disabled,
        });

      case 'bordered':
        return cn('border-b-2 transition-all duration-200 font-medium', {
          'border-b-blue-600 text-blue-600 bg-blue-50': isActive && !tab.disabled,
          'border-b-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50':
            !isActive && !tab.disabled,
          'text-gray-400 cursor-not-allowed': tab.disabled,
        });

      default:
        return '';
    }
  };

  const buttonStyles = cn(
    // Base styles
    'relative flex items-center justify-center gap-2',
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    'transition-colors duration-200',

    // Size styles
    sizeStyles[size],

    // Layout styles
    {
      'flex-1': fullWidth,
      'min-w-0': fullWidth, // Allow text truncation
    },

    // Variant-specific styles
    getVariantStyles(),

    // Disabled state
    {
      'cursor-not-allowed opacity-50': tab.disabled,
      'cursor-pointer': !tab.disabled,
    }
  );

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-disabled={tab.disabled}
      tabIndex={isActive ? 0 : -1}
      onClick={handleClick}
      onKeyDown={e => onKeyDown(e as any, tab.id)}
      className={buttonStyles}
      title={tab.tooltip}
      disabled={tab.disabled}
    >
      {/* Icon */}
      {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}

      {/* Label */}
      <span className={cn('whitespace-nowrap', fullWidth && 'truncate')}>{tab.label}</span>

      {/* Badge */}
      {tab.badge && (
        <span
          className={cn(
            'inline-flex items-center justify-center min-w-[20px] h-5 px-1.5',
            'text-xs font-medium rounded-full',
            {
              'bg-blue-100 text-blue-800': isActive,
              'bg-gray-100 text-gray-600': !isActive,
            }
          )}
        >
          {tab.badge}
        </span>
      )}
    </button>
  );
};

// =============================================================================
// TAB CONTENT COMPONENT
// =============================================================================

export const ModernTabContent: React.FC<ModernTabContentProps> = ({
  tabId,
  children,
  className,
}) => {
  const { activeTab } = useTabContext();
  const isActive = activeTab === tabId;

  if (!isActive) return null;

  return (
    <div
      role="tabpanel"
      aria-labelledby={`tab-${tabId}`}
      className={cn('modern-tab-content', className)}
    >
      {children}
    </div>
  );
};

// =============================================================================
// COMPOUND COMPONENT EXPORTS
// =============================================================================

(ModernTabs as any).Content = ModernTabContent;
ModernTabs.displayName = 'ModernTabs';

export default ModernTabs;
