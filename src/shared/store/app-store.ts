// 🚀 App Store - Master application state coordinator
// Coordinates all stores and provides global app state
import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

interface AppState {
  // App Status
  isInitialized: boolean;
  version: string;
  environment: 'development' | 'staging' | 'production';

  // Feature Flags
  features: Record<string, boolean>;

  // App Settings
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;

  // Performance Metrics
  loadTime: number;
  lastActivity: number;
}

interface AppActions {
  // Initialization
  initialize: () => Promise<void>;
  setInitialized: (initialized: boolean) => void;

  // Feature Flags
  setFeature: (feature: string, enabled: boolean) => void;
  isFeatureEnabled: (feature: string) => boolean;

  // Settings
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLanguage: (language: string) => void;
  setTimezone: (timezone: string) => void;

  // Activity Tracking
  recordActivity: () => void;

  // Global Reset (for testing/logout)
  resetApp: () => void;
}

/**
 * App Store - Master coordinator for application state
 *
 * Manages global app state that doesn't fit into feature stores:
 * - App initialization and settings
 * - Feature flags and configuration
 * - Theme and user preferences
 * - Performance monitoring
 */
export const useAppStore = create<AppState & AppActions>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      // Initial State
      isInitialized: false,
      version: '2.0.0',
      environment: (import.meta.env.VITE_NODE_ENV || 'development') as any,
      features: {
        newMessaging: true,
        advancedSearch: true,
        dueDiligenceV2: false,
        aiValuation: false,
      },
      theme: 'system',
      language: 'en',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      loadTime: 0,
      lastActivity: Date.now(),

      // Initialization
      initialize: async () => {
        const startTime = Date.now();
        set({ isInitialized: false }, false, 'initialize:start');

        try {
          // Load app configuration, feature flags, etc.
          await new Promise(resolve => setTimeout(resolve, 100));

          set(
            {
              isInitialized: true,
              loadTime: Date.now() - startTime,
              lastActivity: Date.now(),
            },
            false,
            'initialize:complete'
          );
        } catch (error) {
          console.error('App initialization failed:', error);
        }
      },

      setInitialized: (initialized: boolean) => {
        set({ isInitialized: initialized }, false, 'setInitialized');
      },

      // Feature Flags
      setFeature: (feature: string, enabled: boolean) => {
        set(
          state => ({
            features: { ...state.features, [feature]: enabled },
          }),
          false,
          `setFeature:${feature}`
        );
      },

      isFeatureEnabled: (feature: string) => {
        return get().features[feature] || false;
      },

      // Settings
      setTheme: theme => {
        set({ theme }, false, 'setTheme');
        document.documentElement.setAttribute('data-theme', theme);
      },

      setLanguage: language => {
        set({ language }, false, 'setLanguage');
      },

      setTimezone: timezone => {
        set({ timezone }, false, 'setTimezone');
      },

      // Activity
      recordActivity: () => {
        set({ lastActivity: Date.now() }, false, 'recordActivity');
      },

      // Reset
      resetApp: () => {
        set(
          {
            isInitialized: false,
            lastActivity: Date.now(),
            loadTime: 0,
          },
          false,
          'resetApp'
        );
      },
    })),
    { name: 'app-store' }
  )
);

// Selector Hooks
export const useAppInitialization = () =>
  useAppStore(state => ({
    isInitialized: state.isInitialized,
    initialize: state.initialize,
    loadTime: state.loadTime,
  }));

export const useFeatureFlags = () =>
  useAppStore(state => ({
    features: state.features,
    isFeatureEnabled: state.isFeatureEnabled,
    setFeature: state.setFeature,
  }));

export const useAppSettings = () =>
  useAppStore(state => ({
    theme: state.theme,
    language: state.language,
    timezone: state.timezone,
    setTheme: state.setTheme,
    setLanguage: state.setLanguage,
    setTimezone: state.setTimezone,
  }));
