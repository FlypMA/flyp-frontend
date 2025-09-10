/**
 * betweendeals Logo Configuration
 * Centralized logo imports and exports for consistent usage across the platform
 */

// Import the main logo from public directory with cache busting
const betweendealsLogo = '/betweendeals_logo.svg?v=2024.2';

// Export logo configurations for different use cases
export const logos = {
  // Main logo for headers, navigation, and general use
  main: betweendealsLogo,

  // For dark backgrounds (same logo, different styling context)
  white: betweendealsLogo,

  // For light backgrounds (same logo, different styling context)
  black: betweendealsLogo,

  // For different sizes and contexts
  header: betweendealsLogo,
  footer: betweendealsLogo,
  sidebar: betweendealsLogo,

  // Favicon references (for documentation purposes)
  favicon: '/favicon.svg',
  favicon16: '/favicon-16x16.svg',
  favicon32: '/favicon-32x32.svg',
  appleTouchIcon: '/apple-touch-icon.svg',
};

// Export individual logo references for specific imports
export const mainLogo = betweendealsLogo;
export const headerLogo = betweendealsLogo;
export const footerLogo = betweendealsLogo;

// Logo configuration with sizing information
export const logoConfig = {
  // Standard header sizes - 48px professional logo
  header: {
    src: betweendealsLogo,
    width: 48,
    height: 48,
    alt: 'betweendeals - European SME M&A Platform',
  },

  // Footer sizes - 48px to match header
  footer: {
    src: betweendealsLogo,
    width: 48,
    height: 48,
    alt: 'betweendeals',
  },

  // Sidebar sizes
  sidebar: {
    src: betweendealsLogo,
    width: 40,
    height: 40,
    alt: 'betweendeals',
  },

  // Mobile header sizes - 48px for consistency
  mobile: {
    src: betweendealsLogo,
    width: 48,
    height: 48,
    alt: 'betweendeals',
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
