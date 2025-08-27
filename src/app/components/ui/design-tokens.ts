// =============================================================================
// DESIGN TOKENS - CONSISTENT DESIGN SYSTEM VALUES
// =============================================================================

/**
 * Design tokens following enterprise design system principles
 * Based on modern design standards with professional aesthetics
 */

export const designTokens = {
  // ==========================================================================
  // COLORS
  // ==========================================================================
  colors: {
    // Primary brand colors
    primary: {
      50: '#fdf2f8',
      100: '#fce7f3', 
      200: '#fbcfe8',
      300: '#f9a8d4',
      400: '#f472b6',
      500: '#ec4899', // Primary
      600: '#db2777',
      700: '#be185d',
      800: '#9d174d',
      900: '#831843',
    },
    
    // Neutral grays
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db', // Default border
      400: '#9ca3af', // Placeholder text
      500: '#6b7280', // Secondary text
      600: '#4b5563', // Body text
      700: '#374151', // Heading text
      800: '#1f2937',
      900: '#111827', // Primary text
    },
    
    // Semantic colors
    semantic: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    
    // Special colors
    white: '#ffffff',
    black: '#000000',
    transparent: 'transparent',
  },

  // ==========================================================================
  // TYPOGRAPHY
  // ==========================================================================
  typography: {
    fontSizes: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
    },
    
    fontWeights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    
    lineHeights: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
    
    letterSpacing: {
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
    },
  },

  // ==========================================================================
  // SPACING
  // ==========================================================================
  spacing: {
    0: '0',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px',
    32: '128px',
  },

  // ==========================================================================
  // BORDERS & RADIUS
  // ==========================================================================
  borders: {
    width: {
      0: '0',
      1: '1px',
      2: '2px',
      4: '4px',
    },
    
    radius: {
      none: '0',
      sm: '4px',
      default: '8px',
      md: '12px', // Primary radius
      lg: '16px',
      xl: '20px',
      full: '9999px',
    },
  },

  // ==========================================================================
  // SHADOWS
  // ==========================================================================
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },

  // ==========================================================================
  // TRANSITIONS
  // ==========================================================================
  transitions: {
    duration: {
      fast: '150ms',
      normal: '200ms',
      slow: '300ms',
    },
    
    timing: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  // ==========================================================================
  // COMPONENT SPECIFIC TOKENS
  // ==========================================================================
  components: {
    input: {
      height: {
        sm: '40px',
        md: '48px',
        lg: '56px', // Primary height
      },
      
      padding: {
        sm: '12px',
        md: '14px',
        lg: '16px', // Primary padding
      },
      
      fontSize: {
        sm: '14px',
        md: '15px',
        lg: '16px', // Primary size
      },
    },
    
    button: {
      height: {
        sm: '36px',
        md: '44px',
        lg: '52px',
      },
      
      padding: {
        sm: '12px 16px',
        md: '14px 20px',
        lg: '16px 24px',
      },
    },
  },

  // ==========================================================================
  // BREAKPOINTS
  // ==========================================================================
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // ==========================================================================
  // Z-INDEX
  // ==========================================================================
  zIndex: {
    hide: '-1',
    auto: 'auto',
    base: '0',
    docked: '10',
    dropdown: '1000',
    sticky: '1100',
    banner: '1200',
    overlay: '1300',
    modal: '1400',
    popover: '1500',
    skipLink: '1600',
    toast: '1700',
    tooltip: '1800',
  },
} as const;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get color value with optional opacity
 */
export const getColor = (path: string, opacity?: number): string => {
  const keys = path.split('.');
  let value: any = designTokens.colors;
  
  for (const key of keys) {
    value = value?.[key];
  }
  
  if (typeof value !== 'string') {
    console.warn(`Color not found: ${path}`);
    return designTokens.colors.gray[500];
  }
  
  if (opacity !== undefined && opacity < 1) {
    // Convert hex to rgb with opacity
    const hex = value.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  
  return value;
};

/**
 * Get spacing value
 */
export const getSpacing = (size: keyof typeof designTokens.spacing): string => {
  return designTokens.spacing[size] || designTokens.spacing[4];
};

/**
 * Get font size value
 */
export const getFontSize = (size: keyof typeof designTokens.typography.fontSizes): string => {
  return designTokens.typography.fontSizes[size] || designTokens.typography.fontSizes.base;
};

/**
 * Type definitions for design tokens
 */
export type ColorToken = keyof typeof designTokens.colors;
export type SpacingToken = keyof typeof designTokens.spacing;
export type FontSizeToken = keyof typeof designTokens.typography.fontSizes;
export type FontWeightToken = keyof typeof designTokens.typography.fontWeights;
