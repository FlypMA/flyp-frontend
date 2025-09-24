// 🏠 App Configuration - MVP Version
// Location: src/config/config.ts
// Purpose: Main application configuration

import { API_CONFIG } from './api-config';

// =============================================================================
// APP CONFIGURATION INTERFACE
// =============================================================================

interface AppConfig {
  // Basic App Info
  appName: string;
  version: string;
  environment: 'development' | 'staging' | 'production';

  // API Configuration
  api: typeof API_CONFIG;

  // App Settings
  settings: {
    defaultLanguage: string;
    defaultCountry: string;
    maxFileSize: number;
    supportedLanguages: string[];
    supportedCountries: string[];
  };

  // Feature Flags
  features: {
    enableAnalytics: boolean;
    enableMessaging: boolean;
    enableFileUpload: boolean;
    enableNotifications: boolean;
    enableDarkMode: boolean;
  };

  // UI Configuration
  ui: {
    theme: 'light' | 'dark' | 'system';
    sidebarCollapsed: boolean;
    animationsEnabled: boolean;
    compactMode: boolean;
  };
}

// =============================================================================
// MAIN CONFIGURATION
// =============================================================================

const config: AppConfig = {
  // Basic App Info
  appName: 'flyp MVP',
  version: '1.0.0',
  environment: ((import.meta as any).env?.MODE as AppConfig['environment']) || 'development',

  // API Configuration
  api: API_CONFIG,

  // App Settings
  settings: {
    defaultLanguage: 'en',
    defaultCountry: 'BE',
    maxFileSize: 10 * 1024 * 1024, // 10MB
    supportedLanguages: ['en', 'nl', 'fr'],
    supportedCountries: ['BE', 'NL', 'FR', 'DE', 'US'],
  },

  // Feature Flags
  features: {
    enableAnalytics: (import.meta as any).env?.VITE_ENABLE_ANALYTICS === 'true',
    enableMessaging: (import.meta as any).env?.VITE_ENABLE_MESSAGING === 'true',
    enableFileUpload: (import.meta as any).env?.VITE_ENABLE_FILE_UPLOAD === 'true',
    enableNotifications: (import.meta as any).env?.VITE_ENABLE_NOTIFICATIONS === 'true',
    enableDarkMode: (import.meta as any).env?.VITE_ENABLE_DARK_MODE === 'true',
  },

  // UI Configuration
  ui: {
    theme:
      ((import.meta as any).env?.VITE_DEFAULT_THEME as 'light' | 'dark' | 'system') || 'system',
    sidebarCollapsed: (import.meta as any).env?.VITE_SIDEBAR_COLLAPSED === 'true',
    animationsEnabled: (import.meta as any).env?.VITE_ANIMATIONS_ENABLED !== 'false',
    compactMode: (import.meta as any).env?.VITE_COMPACT_MODE === 'true',
  },
};

// =============================================================================
// CONFIGURATION UTILITIES
// =============================================================================

/**
 * Get configuration value by path
 */
export const getConfig = (path: string): any => {
  return path.split('.').reduce((obj: any, key) => obj?.[key], config);
};

/**
 * Check if feature is enabled
 */
export const isFeatureEnabled = (feature: keyof AppConfig['features']): boolean => {
  return config.features[feature];
};

/**
 * Get API configuration
 */
export const getApiConfig = () => config.api;

/**
 * Get app settings
 */
export const getAppSettings = () => config.settings;

/**
 * Get UI configuration
 */
export const getUIConfig = () => config.ui;

/**
 * Check if running in development
 */
export const isDevelopment = config.environment === 'development';

/**
 * Check if running in production
 */
export const isProduction = config.environment === 'production';

/**
 * Log configuration in development
 */
export const logConfig = () => {
  if (isDevelopment) {
    // Configuration logging removed for production
  }
};

// Log configuration on import in development
if (isDevelopment) {
  logConfig();
}

export default config;
