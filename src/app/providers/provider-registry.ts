// 📋 Provider Registry - Centralized provider management
// Registry for tracking and managing all Context providers

export interface ProviderInfo {
  name: string;
  layer: 1 | 2 | 3 | 4;
  description: string;
  dependencies: string[];
  status: 'active' | 'inactive' | 'deprecated';
  performance: 'low' | 'medium' | 'high';
}

/**
 * Provider Registry - Complete catalog of all Context providers
 */
export const PROVIDER_REGISTRY: Record<string, ProviderInfo> = {
  // Layer 1: Core System Providers
  ErrorBoundary: {
    name: 'ErrorBoundary',
    layer: 1,
    description: 'Global error boundary with fallback UI',
    dependencies: [],
    status: 'active',
    performance: 'low',
  },
  SecurityProvider: {
    name: 'SecurityProvider',
    layer: 1,
    description: 'CSP, XSS protection, threat detection',
    dependencies: [],
    status: 'active',
    performance: 'medium',
  },
  Suspense: {
    name: 'Suspense',
    layer: 1,
    description: 'Loading boundaries for lazy components',
    dependencies: [],
    status: 'active',
    performance: 'low',
  },

  // Layer 2: Authentication Providers
  SimpleAuthProvider: {
    name: 'SimpleAuthProvider',
    layer: 2,
    description: 'User authentication state management',
    dependencies: ['SecurityProvider'],
    status: 'active',
    performance: 'medium',
  },
  AuthModalProvider: {
    name: 'AuthModalProvider',
    layer: 2,
    description: 'Authentication modal state (login/signup)',
    dependencies: ['SimpleAuthProvider'],
    status: 'active',
    performance: 'low',
  },

  // Layer 3: Application Providers
  ScrollToTop: {
    name: 'ScrollToTop',
    layer: 3,
    description: 'Global scroll behavior on route changes',
    dependencies: [],
    status: 'active',
    performance: 'low',
  },

  // Layer 4: Feature Providers
  BusinessModalProvider: {
    name: 'BusinessModalProvider',
    layer: 4,
    description: 'Business listing modal flows',
    dependencies: ['SimpleAuthProvider'],
    status: 'active',
    performance: 'low',
  },
};

/**
 * Get providers by layer
 */
export const getProvidersByLayer = (layer: 1 | 2 | 3 | 4): ProviderInfo[] => {
  return Object.values(PROVIDER_REGISTRY).filter(provider => provider.layer === layer);
};

/**
 * Get provider dependencies
 */
export const getProviderDependencies = (providerName: string): string[] => {
  const provider = PROVIDER_REGISTRY[providerName];
  return provider ? provider.dependencies : [];
};

/**
 * Validate provider hierarchy
 */
export const validateProviderHierarchy = (): { valid: boolean; issues: string[] } => {
  const issues: string[] = [];

  Object.entries(PROVIDER_REGISTRY).forEach(([name, provider]) => {
    provider.dependencies.forEach(dep => {
      const dependency = PROVIDER_REGISTRY[dep];
      if (!dependency) {
        issues.push(`Provider ${name} depends on non-existent provider ${dep}`);
      } else if (dependency.layer >= provider.layer) {
        issues.push(
          `Provider ${name} (layer ${provider.layer}) depends on ${dep} (layer ${dependency.layer}) - invalid hierarchy`
        );
      }
    });
  });

  return {
    valid: issues.length === 0,
    issues,
  };
};

/**
 * Provider performance analysis
 */
export const getProviderPerformanceReport = () => {
  const providers = Object.values(PROVIDER_REGISTRY);

  return {
    total: providers.length,
    active: providers.filter(p => p.status === 'active').length,
    highPerformanceImpact: providers.filter(p => p.performance === 'high').length,
    mediumPerformanceImpact: providers.filter(p => p.performance === 'medium').length,
    lowPerformanceImpact: providers.filter(p => p.performance === 'low').length,
    byLayer: {
      layer1: getProvidersByLayer(1).length,
      layer2: getProvidersByLayer(2).length,
      layer3: getProvidersByLayer(3).length,
      layer4: getProvidersByLayer(4).length,
    },
  };
};
