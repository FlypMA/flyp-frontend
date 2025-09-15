// 🏠 App Shell - MVP Version
// Location: src/app/index.ts
// Purpose: Centralized exports for the entire app shell

// Providers
export * from './providers';

// Layouts
export * from './layouts';

// Routing
export * from './routing';

// Re-export main components for convenience
export { AppProviders } from './providers';
export { router } from './routing';
