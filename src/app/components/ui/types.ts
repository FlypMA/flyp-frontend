// =============================================================================
// SHARED UI COMPONENT TYPES & INTERFACES
// =============================================================================

export interface BaseComponentProps {
  /** Unique identifier for the component */
  id?: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Test identifier for automated testing */
  'data-testid'?: string;
}

export interface FormFieldProps extends BaseComponentProps {
  /** Field label text */
  label?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Help text displayed below the field */
  helpText?: string;
  /** Error message to display */
  error?: string;
  /** Field name for form handling */
  name?: string;
}

export interface ValidationProps {
  /** Custom validation function */
  validate?: (value: any) => string | undefined;
  /** Whether to validate on blur */
  validateOnBlur?: boolean;
  /** Whether to validate on change */
  validateOnChange?: boolean;
}

export interface FocusProps {
  /** Callback fired when field gains focus */
  onFocus?: () => void;
  /** Callback fired when field loses focus */
  onBlur?: () => void;
}

export interface SizeProps {
  /** Component size variant */
  size?: 'sm' | 'md' | 'lg';
}

export interface VariantProps {
  /** Component style variant */
  variant?: 'default' | 'bordered' | 'flat' | 'underlined';
}

export interface IconProps {
  /** Icon displayed at the start of the component */
  startIcon?: React.ReactNode;
  /** Icon displayed at the end of the component */
  endIcon?: React.ReactNode;
}

export interface LoadingProps {
  /** Whether the component is in loading state */
  loading?: boolean;
  /** Loading text to display */
  loadingText?: string;
}

export interface OptionItem {
  /** Option value */
  value: string;
  /** Option display label */
  label: string;
  /** Whether option is disabled */
  disabled?: boolean;
  /** Optional description */
  description?: string;
}

export type ComponentSize = 'sm' | 'md' | 'lg';
export type ComponentVariant = 'default' | 'bordered' | 'flat' | 'underlined';
export type InputType = 'text' | 'email' | 'password' | 'tel' | 'url' | 'number' | 'search';
export type ButtonType = 'button' | 'submit' | 'reset';
export type AlignmentType = 'left' | 'center' | 'right' | 'between' | 'around';
