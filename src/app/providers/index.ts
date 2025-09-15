// 🔧 App Providers - MVP Version
// Location: src/app/providers/index.ts
// Purpose: Centralized exports for all app providers

// Main provider composition
export { AppProviders } from './providers';

// Individual providers
export { AuthProvider, useAuth, type ModalType } from './auth-provider';
export { UIProvider, useUI } from './ui-provider';

// Re-export for convenience
export { AppProviders as default } from './providers';
