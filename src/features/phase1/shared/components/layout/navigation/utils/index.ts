// 🛠️ Navigation Utils - MVP Version
// Location: src/shared/components/navigation/utils/index.ts
// Purpose: Centralized exports for navigation utilities

export * from './navigation-config';
export * from './navigation-handlers';
export * from './role-utils';

// Re-export types for convenience
export type { NavItem, NavSection, DropdownMenuItem } from './navigation-config';

export type { NavigationHandler } from './navigation-handlers';
