/**
 * Shared Component Types
 *
 * Centralized type definitions for all shared components
 */

import * as React from 'react';

// =============================================================================
// BUTTON TYPES
// =============================================================================

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant/color scheme
   */
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'danger'
    | 'light'
    | 'bordered'
    | 'flat';

  /**
   * Button size
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Button color (for HeroUI compatibility)
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default';

  /**
   * Whether the button is disabled
   */
  disabled?: boolean;

  /**
   * Whether the button is in loading state
   */
  loading?: boolean;

  /**
   * Whether the button is loading (HeroUI compatibility)
   */
  isLoading?: boolean;

  /**
   * Whether the button is disabled (HeroUI compatibility)
   */
  isDisabled?: boolean;

  /**
   * Whether the button should take full width
   */
  fullWidth?: boolean;

  /**
   * Icon to display on the left side
   */
  leftIcon?: React.ReactNode;

  /**
   * Icon to display on the right side
   */
  rightIcon?: React.ReactNode;

  /**
   * Start content (HeroUI compatibility)
   */
  startContent?: React.ReactNode;

  /**
   * End content (HeroUI compatibility)
   */
  endContent?: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Press handler (HeroUI compatibility)
   */
  onPress?: () => void;

  /**
   * Button type
   */
  type?: 'button' | 'submit' | 'reset';

  /**
   * Button radius (HeroUI compatibility)
   */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';

  /**
   * Whether the button is icon only (HeroUI compatibility)
   */
  isIconOnly?: boolean;
}

// =============================================================================
// INPUT TYPES
// =============================================================================

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /**
   * Input label
   */
  label?: string;

  /**
   * Error message to display
   */
  error?: string;

  /**
   * Helper text to display
   */
  helperText?: string;

  /**
   * Description text to display below the input
   */
  description?: string;

  /**
   * Input size (overrides HTML input size attribute)
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Whether the input should take full width
   */
  fullWidth?: boolean;

  /**
   * Icon to display on the left side
   */
  leftIcon?: React.ReactNode;

  /**
   * Icon to display on the right side
   */
  rightIcon?: React.ReactNode;

  /**
   * Start content (HeroUI compatibility)
   */
  startContent?: React.ReactNode;

  /**
   * End content (HeroUI compatibility)
   */
  endContent?: React.ReactNode;

  /**
   * Input variant (HeroUI compatibility)
   */
  variant?: 'flat' | 'bordered' | 'underlined' | 'faded';

  /**
   * Input color (HeroUI compatibility)
   */
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

  /**
   * Input radius (HeroUI compatibility)
   */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';

  /**
   * Whether the input is disabled (HeroUI compatibility)
   */
  isDisabled?: boolean;

  /**
   * Whether the input is required (HeroUI compatibility)
   */
  isRequired?: boolean;

  /**
   * Whether the input is invalid (HeroUI compatibility)
   */
  isInvalid?: boolean;

  /**
   * Whether the input is read-only (HeroUI compatibility)
   */
  isReadOnly?: boolean;

  /**
   * Custom onChange handler that receives the value directly or the event
   */
  onChange?: ((value: string) => void) | ((e: React.ChangeEvent<HTMLInputElement>) => void);

  /**
   * Additional CSS classes
   */
  className?: string;
}

// =============================================================================
// FORM FIELD TYPES
// =============================================================================

export interface FormFieldProps {
  /**
   * The form field label
   */
  label?: string;

  /**
   * Whether the field is required
   */
  required?: boolean;

  /**
   * Help text to display below the field
   */
  helpText?: string;

  /**
   * Error message to display
   */
  error?: string;

  /**
   * The form field component (Input, Select, Textarea, etc.)
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

// =============================================================================
// CARD TYPES
// =============================================================================

export interface CardProps {
  /**
   * Card content
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Whether to add padding
   */
  padding?: boolean;
}

// =============================================================================
// LOADING SPINNER TYPES
// =============================================================================

export interface LoadingSpinnerProps {
  /**
   * Spinner size
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Additional CSS classes
   */
  className?: string;
}

// =============================================================================
// TYPOGRAPHY TYPES
// =============================================================================

export interface TypographyProps {
  /**
   * Text content
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

// =============================================================================
// DISCLAIMER TYPES
// =============================================================================

export interface FinancialDisclaimerProps {
  /**
   * Type of disclaimer
   */
  type: 'valuation' | 'solvency' | 'liquidation' | 'general';

  /**
   * Display variant
   */
  variant?: 'banner' | 'modal' | 'sidebar';

  /**
   * Whether the disclaimer is collapsible
   */
  isCollapsible?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}

// =============================================================================
// FAQ TYPES
// =============================================================================

export interface FAQItem {
  /**
   * Unique identifier
   */
  id?: string;

  /**
   * FAQ question
   */
  question: string;

  /**
   * FAQ answer
   */
  answer: string;

  /**
   * Optional badge
   */
  badge?: 'new' | 'popular';
}

export interface FAQAccordionProps {
  /**
   * Array of FAQ items
   */
  faqs: FAQItem[];

  /**
   * Whether multiple items can be open at once
   */
  allowMultiple?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}

export interface FAQBadgeProps {
  /**
   * Badge type
   */
  type?: 'new' | 'popular';

  /**
   * Additional CSS classes
   */
  className?: string;
}

export interface FAQCategoryProps {
  /**
   * Category configuration
   */
  category: {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    color?: string;
    faqs: FAQItem[];
  };

  /**
   * Whether multiple items can be open at once
   */
  allowMultiple?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}

export interface FAQItemProps {
  /**
   * FAQ question
   */
  question: string;

  /**
   * FAQ answer
   */
  answer: string;

  /**
   * Whether this item is currently open
   */
  isOpen: boolean;

  /**
   * Toggle handler
   */
  onToggle: () => void;

  /**
   * Optional badge
   */
  badge?: 'new' | 'popular';
}

// =============================================================================
// TABS TYPES
// =============================================================================

export interface TabItem {
  /**
   * Unique identifier for the tab
   */
  id: string;

  /**
   * Display label
   */
  label: string;

  /**
   * Content to be rendered when this tab is active
   */
  content: React.ReactNode;

  /**
   * Optional icon to display next to the label
   */
  icon?: React.ReactNode;

  /**
   * Whether the tab is disabled
   */
  disabled?: boolean;
}

export interface TabsProps {
  /**
   * Array of tab items
   */
  items: TabItem[];

  /**
   * The ID of the initially active tab
   */
  initialActiveTab?: string;

  /**
   * Callback function when the active tab changes
   */
  onTabChange?: (activeTabId: string) => void;

  /**
   * Visual variant of the tabs
   */
  variant?: 'pill' | 'line' | 'segment';

  /**
   * Size of the tabs
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Whether the tabs should take full width
   */
  fullWidth?: boolean;

  /**
   * Additional CSS class for the tabs container
   */
  className?: string;

  /**
   * Additional CSS class for the tab list
   */
  tabListClassName?: string;

  /**
   * Additional CSS class for individual tab buttons
   */
  tabButtonClassName?: string;

  /**
   * Additional CSS class for the active tab button
   */
  activeTabButtonClassName?: string;

  /**
   * Additional CSS class for the tab panel
   */
  tabPanelClassName?: string;
}

// =============================================================================
// FILTER TYPES
// =============================================================================

export interface PriceRangeSliderProps {
  /**
   * Minimum value for the range
   */
  min?: number;

  /**
   * Maximum value for the range
   */
  max?: number;

  /**
   * Step size for the slider
   */
  step?: number;

  /**
   * Initial value range [min, max]
   */
  defaultValue?: [number, number];

  /**
   * Current value range [min, max]
   */
  value?: [number, number];

  /**
   * Callback when range changes
   */
  onChange?: (value: [number, number]) => void;

  /**
   * Callback when range change is complete
   */
  onChangeComplete?: (value: [number, number]) => void;

  /**
   * Custom class name for the container
   */
  className?: string;

  /**
   * Label for the slider
   */
  label?: string;

  /**
   * Currency symbol to display
   */
  currencySymbol?: string;

  /**
   * Whether to show input fields for min/max values
   */
  showInputs?: boolean;

  /**
   * Whether to disable the slider
   */
  disabled?: boolean;
}

// =============================================================================
// SEARCH TYPES
// =============================================================================

export interface SearchComponentProps {
  /**
   * Current search query value
   */
  value: string;

  /**
   * Callback when search value changes
   */
  onChange: (value: string) => void;

  /**
   * Callback when search is submitted
   */
  onSearch: () => void;

  /**
   * Placeholder text for the search input
   */
  placeholder?: string;

  /**
   * Size variant of the search component
   */
  size?: 'default' | 'large';

  /**
   * Whether to show loading state
   */
  isLoading?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Button text override
   */
  buttonText?: string;
}

// =============================================================================
// VALUATION TYPES
// =============================================================================

export interface BusinessValuationToolProps {
  /**
   * Initial business data
   */
  initialData?: {
    revenue?: number;
    ebitda?: number;
    employees?: number;
    age?: number;
    sector?: string;
  };

  /**
   * Callback when valuation is calculated
   */
  onValuationComplete?: (valuation: {
    min: number;
    max: number;
    average: number;
    factors: string[];
  }) => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}

// =============================================================================
// FORM FIELD TYPES
// =============================================================================
// DUPLICATE INTERFACES REMOVED - Already defined above
// =============================================================================

// =============================================================================
// SEARCH COMPONENT TYPES (PLACEHOLDER) - REMOVED DUPLICATE
// =============================================================================
