/**
 * Upswitch.com Brand Design System — Caregiver Adaptation
 * - Warm, calm, trustworthy UI for sellers & buyers
 * - Airbnb clarity + Acquire-style professionalism
 * - Accessibility-first, emotionally safe interactions
 */

export const BrandColors = {
  // Primary Brand (Trust Blue) — unchanged core identity
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // main action
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    DEFAULT: '#3b82f6',
  },

  // Support (Calm Teal) — caregiving, soothing, 'we've got you'
  calm: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4', // supportive CTA, tabs, info highlights
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
    DEFAULT: '#06b6d4',
  },

  // Accent (Reassuring Coral) — encouragement & positive prompts (not errors)
  accent: {
    50: '#fff5f3',
    100: '#ffe4e0',
    200: '#fec6c1',
    300: '#fda59e',
    400: '#fb7b71',
    500: '#f25f57', // gentle emphasis (secondary CTAs, empty-states)
    600: '#de5049',
    700: '#b83e38',
    800: '#8f302b',
    900: '#6f2622',
    DEFAULT: '#f25f57',
  },

  // Neutral — warmed slightly for comfort; keep strong contrast for text
  neutral: {
    50: '#ffffff', // base backgrounds (can use 100 for app canvas)
    100: '#fafaf9', // warm off-white
    200: '#f4f4f5',
    300: '#e7e5e4',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b', // main text on light
    950: '#0b0b0c',
    DEFAULT: '#18181b',
  },

  // Semantic
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    DEFAULT: '#22c55e',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    DEFAULT: '#f59e0b',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    DEFAULT: '#ef4444',
  },

  // M&A cues
  business: {
    trust: '#1e40af', // deep trust
    growth: '#059669', // growth
    premium: '#7c3aed', // premium
    secure: '#1f2937', // secure/dark
  },

  // Accessibility helpers
  focus: '#2563eb33', // translucent focus ring
  overlay: 'rgba(2, 6, 23, 0.55)', // modal scrim
} as const;

export const Typography = {
  fontFamily: {
    // Humanist, highly legible UI type
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
  // Comfortable reading rhythm
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1.125rem' }],
    sm: ['0.875rem', { lineHeight: '1.375rem' }],
    base: ['1rem', { lineHeight: '1.625rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.85rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.6rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    // keep large display sizes for marketing pages
    '6xl': ['3.75rem', { lineHeight: '1' }],
    '7xl': ['4.5rem', { lineHeight: '1' }],
    '8xl': ['6rem', { lineHeight: '1' }],
    '9xl': ['8rem', { lineHeight: '1' }],
  },
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500', // default body
    semibold: '600', // headings, buttons
    bold: '700',
    extrabold: '800',
    black: '900',
  },
} as const;

export const Spacing = {
  // Space to breathe (anxiety-reducing)
  spacing: {
    '0': '0px',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '8': '2rem',
    '10': '2.5rem',
    '12': '3rem',
    '16': '4rem',
    '20': '5rem',
    '24': '6rem',
    '32': '8rem',
    '40': '10rem',
    '48': '12rem',
    '56': '14rem',
    '64': '16rem',
  },
} as const;

export const BorderRadius = {
  // Softer corners = safer feel
  borderRadius: {
    none: '0',
    sm: '0.25rem', // 4px
    DEFAULT: '0.5rem', // 8px
    md: '0.625rem', // 10px
    lg: '0.75rem', // 12px
    xl: '1rem', // 16px
    '2xl': '1.25rem', // 20px
    '3xl': '1.5rem', // 24px
    full: '9999px',
  },
} as const;

export const BoxShadow = {
  // Soft, diffuse shadows to avoid harshness
  boxShadow: {
    sm: '0 1px 2px 0 rgb(2 6 23 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(2 6 23 / 0.08), 0 1px 2px -1px rgb(2 6 23 / 0.06)',
    md: '0 6px 12px -2px rgb(2 6 23 / 0.08), 0 2px 6px -2px rgb(2 6 23 / 0.06)',
    lg: '0 12px 20px -4px rgb(2 6 23 / 0.12), 0 6px 12px -6px rgb(2 6 23 / 0.08)',
    xl: '0 20px 28px -6px rgb(2 6 23 / 0.16), 0 10px 16px -8px rgb(2 6 23 / 0.10)',
    '2xl': '0 28px 56px -10px rgb(2 6 23 / 0.24)',
    inner: 'inset 0 2px 4px 0 rgb(2 6 23 / 0.04)',
    none: 'none',
  },
} as const;

// Component Tokens — caregiving patterns (guide, don't shout)
export const Components = {
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
      focus: {
        outline: `3px solid ${BrandColors.focus}`,
      },
      disabled: {
        backgroundColor: BrandColors.primary[300],
        color: BrandColors.neutral[100],
        boxShadow: BoxShadow.boxShadow.none,
        cursor: 'not-allowed',
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
      focus: { outline: `3px solid ${BrandColors.focus}` },
    },
    supportive: {
      // Caregiver: gentle nudge actions (e.g., "Talk to an advisor")
      backgroundColor: BrandColors.calm[500],
      color: BrandColors.neutral[50],
      borderRadius: BorderRadius.borderRadius.lg,
      fontWeight: Typography.fontWeight.semibold,
      hover: { backgroundColor: BrandColors.calm[600] },
      focus: { outline: `3px solid ${BrandColors.focus}` },
    },
    subtle: {
      // Link/tertiary — low-pressure prompts
      backgroundColor: 'transparent',
      color: BrandColors.accent[600],
      border: `1px solid transparent`,
      borderRadius: BorderRadius.borderRadius.lg,
      hover: { backgroundColor: BrandColors.accent[50] },
      focus: { outline: `3px solid ${BrandColors.focus}` },
    },
    danger: {
      backgroundColor: BrandColors.error[500],
      color: BrandColors.neutral[50],
      borderRadius: BorderRadius.borderRadius.lg,
      hover: { backgroundColor: BrandColors.error[600] },
      focus: { outline: `3px solid ${BrandColors.focus}` },
    },
  },

  card: {
    base: {
      backgroundColor: BrandColors.neutral[50],
      borderRadius: BorderRadius.borderRadius.xl,
      boxShadow: BoxShadow.boxShadow.md,
      border: `1px solid ${BrandColors.neutral[200]}`,
    },
    interactive: {
      hover: {
        boxShadow: BoxShadow.boxShadow.lg,
        transform: 'translateY(-2px)',
      },
      focus: {
        boxShadow: BoxShadow.boxShadow.xl,
        outline: `3px solid ${BrandColors.focus}`,
      },
    },
    info: {
      // calming info panels
      backgroundColor: BrandColors.calm[50],
      border: `1px solid ${BrandColors.calm[200]}`,
    },
    warning: {
      backgroundColor: BrandColors.warning[50],
      border: `1px solid ${BrandColors.warning[200]}`,
    },
    success: {
      backgroundColor: BrandColors.success[50],
      border: `1px solid ${BrandColors.success[200]}`,
    },
  },

  input: {
    base: {
      borderRadius: BorderRadius.borderRadius.lg,
      border: `1px solid ${BrandColors.neutral[300]}`,
      backgroundColor: BrandColors.neutral[50],
      color: BrandColors.neutral[900],
      fontSize: Typography.fontSize.base[0],
      padding: `${Spacing.spacing[3]} ${Spacing.spacing[4]}`,
      placeholderColor: BrandColors.neutral[400],
      focus: {
        borderColor: BrandColors.primary[500],
        boxShadow: `0 0 0 3px ${BrandColors.primary[100]}`,
      },
    },
    valid: {
      border: `1px solid ${BrandColors.success[400]}`,
    },
    invalid: {
      border: `1px solid ${BrandColors.error[400]}`,
      helpTextColor: BrandColors.error[600],
      helpTextBg: BrandColors.error[50],
    },
    disabled: {
      backgroundColor: BrandColors.neutral[200],
      color: BrandColors.neutral[500],
      cursor: 'not-allowed',
    },
  },

  // Badges (trust cues)
  badge: {
    verified: {
      backgroundColor: BrandColors.success[100],
      color: BrandColors.success[700],
      border: `1px solid ${BrandColors.success[300]}`,
      iconColor: BrandColors.success[600],
      borderRadius: BorderRadius.borderRadius.full,
      paddingX: Spacing.spacing[3],
      paddingY: Spacing.spacing[1],
    },
    secure: {
      backgroundColor: BrandColors.neutral[100],
      color: BrandColors.business.secure,
      border: `1px solid ${BrandColors.neutral[300]}`,
      iconColor: BrandColors.business.secure,
      borderRadius: BorderRadius.borderRadius.full,
    },
  },

  // Toasts & helpers
  toast: {
    info: {
      bg: BrandColors.calm[50],
      border: `1px solid ${BrandColors.calm[200]}`,
      color: BrandColors.calm[800],
    },
    success: {
      bg: BrandColors.success[50],
      border: `1px solid ${BrandColors.success[200]}`,
      color: BrandColors.success[800],
    },
    error: {
      bg: BrandColors.error[50],
      border: `1px solid ${BrandColors.error[200]}`,
      color: BrandColors.error[800],
    },
  },

  modal: {
    overlay: BrandColors.overlay,
    panel: {
      backgroundColor: BrandColors.neutral[50],
      borderRadius: BorderRadius.borderRadius.xl,
      boxShadow: BoxShadow.boxShadow['2xl'],
      border: `1px solid ${BrandColors.neutral[200]}`,
    },
  },

  tooltip: {
    backgroundColor: BrandColors.neutral[800],
    color: BrandColors.neutral[50],
    borderRadius: BorderRadius.borderRadius.md,
    shadow: BoxShadow.boxShadow.sm,
  },
} as const;

// Usage & UX principles tuned for Caregiver
export const DesignPrinciples = {
  principles: [
    'Trust First: remove uncertainty with transparency & consistency',
    'Calm by Design: whitespace, soft corners, gentle motion',
    'Clarity > Clever: plain language, clear hierarchy',
    'Guide the Journey: progressive steps, checklists, status',
    'Accessible Always: WCAG AA contrast, keyboard focus, ARIA',
    'Human Support: microcopy that reassures and explains',
  ],
  colorUsage: {
    primary: 'Primary actions, key nav, progress',
    calm: 'Supportive CTAs, tabs, informative accents',
    accent: 'Friendly prompts, empty-states, highlights (not errors)',
    neutral: 'Backgrounds, text, dividers',
    success: 'Confirmation states, positive badges',
    warning: 'Non-blocking cautions and pending states',
    error: 'Blocking errors, destructive actions',
    business: 'Trust/secure highlights, premium markers',
  },
  typographyUsage: {
    display: 'Hero headlines, section intros',
    sans: 'Body, forms, UI labels, components',
    mono: 'Data, code, numeric tables',
  },
} as const;

export const upswitchTheme = {
  colors: BrandColors,
  typography: Typography,
  spacing: Spacing,
  borderRadius: BorderRadius,
  boxShadow: BoxShadow,
  components: Components,
  principles: DesignPrinciples,
} as const;

// Legacy export for backward compatibility
export const BetweendealsTheme = upswitchTheme;
export const UpSwitchTheme = upswitchTheme; // Legacy support - deprecated

export default upswitchTheme;
