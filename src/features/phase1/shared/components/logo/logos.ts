/**
 * flyp Logo Configuration
 * Centralized logo imports and exports for consistent usage across the platform
 */

// Import the main logo from public directory with cache busting
const flypLogo = '/flyp_logo.svg?v=2024.2';

// Export logo configurations for different use cases
export const logos = {
  // Main logo for headers, navigation, and general use
  main: flypLogo,

  // For dark backgrounds (same logo, different styling context)
  white: flypLogo,

  // For light backgrounds (same logo, different styling context)
  black: flypLogo,

  // For different sizes and contexts
  header: flypLogo,
  footer: flypLogo,
  sidebar: flypLogo,

  // Favicon references (for documentation purposes)
  favicon: '/favicon.svg',
  favicon16: '/favicon-16x16.svg',
  favicon32: '/favicon-32x32.svg',
  appleTouchIcon: '/apple-touch-icon.svg',
};

// Export individual logo references for specific imports
export const mainLogo = flypLogo;
export const headerLogo = flypLogo;
export const footerLogo = flypLogo;

// Logo configuration with sizing information
export const logoConfig = {
  // Standard header sizes - 48px professional logo
  header: {
    src: flypLogo,
    width: 48,
    height: 48,
    alt: 'flyp - European SME M&A Platform',
  },

  // Footer sizes - 48px to match header
  footer: {
    src: flypLogo,
    width: 48,
    height: 48,
    alt: 'flyp',
  },

  // Sidebar sizes
  sidebar: {
    src: flypLogo,
    width: 40,
    height: 40,
    alt: 'flyp',
  },

  // Mobile header sizes - 48px for consistency
  mobile: {
    src: flypLogo,
    width: 48,
    height: 48,
    alt: 'flyp',
  },
};

// Helper function to get logo with specific styling
export const getLogo = (
  variant: 'main' | 'white' | 'black' | 'header' | 'footer' | 'sidebar' = 'main'
) => {
  return logos[variant];
};

// Helper function to get logo config for specific context
export const getLogoConfig = (context: 'header' | 'footer' | 'sidebar' | 'mobile' = 'header') => {
  return logoConfig[context];
};

export default logos;
