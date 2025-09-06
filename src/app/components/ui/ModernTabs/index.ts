/**
 * Modern Tabs Component - Export Module
 * 
 * Clean, accessible, performance-optimized tab component
 * designed to replace complex legacy implementations.
 */

export { 
  ModernTabs as default,
  ModernTabs,
  ModernTabContent,
} from './ModernTabs';

export type {
  TabItem,
  ModernTabsProps,
  ModernTabContentProps,
} from './ModernTabs';

// Convenience re-exports for common usage patterns
export { ModernTabs as Tabs } from './ModernTabs';
export { ModernTabContent as TabContent } from './ModernTabs';

