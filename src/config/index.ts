// 🔧 Configuration - MVP Version
// Location: src/config/index.ts
// Purpose: Centralized exports for all configuration

// Main Configuration
export { default as config } from './config';
export {
  getConfig,
  isFeatureEnabled,
  getApiConfig,
  getAppSettings,
  getUIConfig,
  isDevelopment,
  isProduction,
  logConfig
} from './config';

// API Configuration
export {
  API_CONFIG,
  getApiUrl,
  getSupabaseConfig,
  isApiAvailable,
  getRequestHeaders,
  API_ERROR_CONFIG,
  logApiConfig
} from './api-config';

// Security Configuration
export {
  SECURITY_CONFIG,
  MONITORING_CONFIG
} from './security-config';

// Supabase Client
export { supabase } from './supabase';
export type { SupabaseClient } from './supabase';

// Re-export for convenience
export { default } from './config';
