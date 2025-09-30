/**
 * Upswitch Logo Configuration
 * Centralized logo imports and exports for consistent usage across the platform
 */

// Import the main logo from public directory with cache busting
const upswitchLogo = '/UpSwitch_logo_var1.svg?v=2024.4';

// Export logo configurations for different use cases
export const logos = {
  // Main logo for headers, navigation, and general use
  main: upswitchLogo,

  // For dark backgrounds (same logo, different styling context)
  white: upswitchLogo,

  // For light backgrounds (same logo, different styling context)
  black: upswitchLogo,

  // For different sizes and contexts
  header: upswitchLogo,
  footer: upswitchLogo,
  sidebar: upswitchLogo,

  // Favicon references (for documentation purposes)
  favicon: '/favicon.svg',
  favicon16: '/favicon-16x16.svg',
  favicon32: '/favicon-32x32.svg',
  appleTouchIcon: '/apple-touch-icon.svg',
};

// Export individual logo references for specific imports
export const mainLogo = upswitchLogo;
export const headerLogo = upswitchLogo;
export const footerLogo = upswitchLogo;

// Logo configuration with sizing information
export const logoConfig = {
  // Standard header sizes - 48px professional logo
  header: {
    src: upswitchLogo,
    width: 48,
    height: 48,
    alt: 'Upswitch - European SME M&A Platform',
  },

  // Footer sizes - 48px to match header
  footer: {
    src: upswitchLogo,
    width: 48,
    height: 48,
    alt: 'Upswitch',
  },

  // Sidebar sizes
  sidebar: {
    src: upswitchLogo,
    width: 40,
    height: 40,
    alt: 'Upswitch',
  },

  // Mobile header sizes - 48px for consistency
  mobile: {
    src: upswitchLogo,
    width: 48,
    height: 48,
    alt: 'Upswitch',
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
