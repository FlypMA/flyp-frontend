/**
 * betweendeals.com Brand Design System
 * Inspired by Airbnb's clean, trustworthy design principles
 * Optimized for professional M&A platform users
 */

export const BrandColors = {
  // Primary Brand Colors
  primary: {
    50: '#eff6ff', // Lightest blue
    100: '#dbeafe', // Very light blue
    200: '#bfdbfe', // Light blue
    300: '#93c5fd', // Medium light blue
    400: '#60a5fa', // Medium blue
    500: '#3b82f6', // Primary blue (main brand color)
    600: '#2563eb', // Darker blue
    700: '#1d4ed8', // Dark blue
    800: '#1e40af', // Very dark blue
    900: '#1e3a8a', // Darkest blue
    DEFAULT: '#3b82f6',
  },

  // Neutral Colors (White background, Black text)
  neutral: {
    50: '#ffffff', // Pure white (backgrounds)
    100: '#f9fafb', // Off white
    200: '#f3f4f6', // Light gray
    300: '#e5e7eb', // Medium light gray
    400: '#9ca3af', // Medium gray
    500: '#6b7280', // Text gray
    600: '#4b5563', // Dark gray
    700: '#374151', // Darker gray
    800: '#1f2937', // Very dark gray
    900: '#111827', // Almost black (main text)
    950: '#000000', // Pure black
    DEFAULT: '#111827',
  },

  // Success Colors
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e', // Success green
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    DEFAULT: '#22c55e',
  },

  // Warning Colors
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b', // Warning yellow
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    DEFAULT: '#f59e0b',
  },

  // Error Colors
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444', // Error red
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    DEFAULT: '#ef4444',
  },

  // M&A Specific Colors
  business: {
    trust: '#1e40af', // Deep blue for trust
    growth: '#059669', // Green for growth
    premium: '#7c3aed', // Purple for premium
    secure: '#1f2937', // Dark gray for security
  },
} as const;

export const Typography = {
  // Font Families (Airbnb-inspired)
  fontFamily: {
    sans: [
      'Inter',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'sans-serif',
    ],
    display: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
  },

  // Font Sizes
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],
    '7xl': ['4.5rem', { lineHeight: '1' }],
    '8xl': ['6rem', { lineHeight: '1' }],
    '9xl': ['8rem', { lineHeight: '1' }],
  },

  // Font Weights
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
} as const;

export const Spacing = {
  // Airbnb-inspired spacing scale
  spacing: {
    '0': '0px',
    '1': '0.25rem', // 4px
    '2': '0.5rem', // 8px
    '3': '0.75rem', // 12px
    '4': '1rem', // 16px
    '5': '1.25rem', // 20px
    '6': '1.5rem', // 24px
    '8': '2rem', // 32px
    '10': '2.5rem', // 40px
    '12': '3rem', // 48px
    '16': '4rem', // 64px
    '20': '5rem', // 80px
    '24': '6rem', // 96px
    '32': '8rem', // 128px
    '40': '10rem', // 160px
    '48': '12rem', // 192px
    '56': '14rem', // 224px
    '64': '16rem', // 256px
  },
} as const;

export const BorderRadius = {
  borderRadius: {
    none: '0',
    sm: '0.125rem', // 2px
    DEFAULT: '0.25rem', // 4px
    md: '0.375rem', // 6px
    lg: '0.5rem', // 8px
    xl: '0.75rem', // 12px
    '2xl': '1rem', // 16px
    '3xl': '1.5rem', // 24px
    full: '9999px',
  },
} as const;

export const BoxShadow = {
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: 'none',
  },
} as const;

// Component-specific design tokens
export const Components = {
  // Button styles (Airbnb-inspired)
  button: {
    primary: {
      backgroundColor: BrandColors.primary[500],
      color: BrandColors.neutral[50],
      borderRadius: BorderRadius.borderRadius.lg,
      fontWeight: Typography.fontWeight.semibold,
      boxShadow: BoxShadow.boxShadow.sm,
      hover: {
        backgroundColor: BrandColors.primary[600],
        boxShadow: BoxShadow.boxShadow.md,
      },
    },
    secondary: {
      backgroundColor: BrandColors.neutral[50],
      color: BrandColors.neutral[900],
      border: `1px solid ${BrandColors.neutral[300]}`,
      borderRadius: BorderRadius.borderRadius.lg,
      fontWeight: Typography.fontWeight.medium,
      hover: {
        backgroundColor: BrandColors.neutral[100],
        borderColor: BrandColors.neutral[400],
      },
    },
  },

  // Card styles
  card: {
    backgroundColor: BrandColors.neutral[50],
    borderRadius: BorderRadius.borderRadius.xl,
    boxShadow: BoxShadow.boxShadow.md,
    border: `1px solid ${BrandColors.neutral[200]}`,
    hover: {
      boxShadow: BoxShadow.boxShadow.lg,
      transform: 'translateY(-2px)',
    },
  },

  // Input styles
  input: {
    borderRadius: BorderRadius.borderRadius.lg,
    border: `1px solid ${BrandColors.neutral[300]}`,
    backgroundColor: BrandColors.neutral[50],
    color: BrandColors.neutral[900],
    fontSize: Typography.fontSize.base,
    padding: `${Spacing.spacing[3]} ${Spacing.spacing[4]}`,
    focus: {
      borderColor: BrandColors.primary[500],
      boxShadow: `0 0 0 3px ${BrandColors.primary[100]}`,
    },
  },
} as const;

// Usage Guidelines
export const DesignPrinciples = {
  // Airbnb-inspired principles for M&A platform
  principles: [
    'Trust First: Every design decision should build user confidence',
    'Clarity: Information hierarchy must be crystal clear',
    'Professional: Maintain business-appropriate sophistication',
    'Accessible: Ensure all users can navigate confidently',
    'Consistent: Maintain visual and interaction patterns',
    'Human: Make complex M&A processes feel approachable',
  ],

  // Color Usage Guidelines
  colorUsage: {
    primary: 'Use for primary actions, links, and key UI elements',
    neutral: 'Use for text, backgrounds, and subtle UI elements',
    success: 'Use for positive actions, confirmations, and success states',
    warning: 'Use for cautions, pending states, and important notices',
    error: 'Use for errors, deletions, and critical warnings',
    business: 'Use for M&A-specific features and trust indicators',
  },

  // Typography Guidelines
  typographyUsage: {
    display: 'Use for headlines, hero sections, and primary messaging',
    sans: 'Use for body text, UI elements, and general content',
    mono: 'Use for code, data, and technical information',
  },
} as const;

// Export default theme configuration
export const BetweendealsTheme = {
  colors: BrandColors,
  typography: Typography,
  spacing: Spacing,
  borderRadius: BorderRadius,
  boxShadow: BoxShadow,
  components: Components,
  principles: DesignPrinciples,
} as const;

export default BetweendealsTheme;
