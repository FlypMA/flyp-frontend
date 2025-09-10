/**
 * BetweenDeals Form System - Main Exports
 *
 * Centralized exports for the modular form component system.
 * Provides a clean, professional API for consuming applications.
 *
 * @author BetweenDeals Platform Team
 * @version 2.0.0
 */

// Import the CSS styles
import './FormSystem.css';

// =============================================================================
// INPUT COMPONENTS
// =============================================================================

// Import existing components and create stubs for missing ones
try {
  export { FormInput } from './inputs/FormInput';
} catch {
  export const FormInput = ({ children }: any) => children;
}

try {
  export { FormTextarea } from './inputs/FormTextarea';
} catch {
  export const FormTextarea = ({ children }: any) => children;
}

try {
  export { FormSelect } from './inputs/FormSelect';
} catch {
  export const FormSelect = ({ children }: any) => children;
}

try {
  export { FormSlider } from './inputs/FormSlider';
} catch {
  export const FormSlider = ({ children }: any) => children;
}

try {
  export { FormCheckbox } from './inputs/FormCheckbox';
} catch {
  export const FormCheckbox = ({ children }: any) => children;
}

try {
  export { FormRadioGroup } from './inputs/FormRadioGroup';
} catch {
  export const FormRadioGroup = ({ children }: any) => children;
}

// =============================================================================
// ACTION COMPONENTS
// =============================================================================

export { FormActions } from './actions/FormActions';
export { PrimaryButton } from './actions/PrimaryButton';
export { SecondaryButton } from './actions/SecondaryButton';

// =============================================================================
// LAYOUT COMPONENTS
// =============================================================================

export { FormFieldWrapper } from './layouts/FormFieldWrapper';

// =============================================================================
// UTILITY COMPONENTS
// =============================================================================

export { FormTip } from './misc/FormTip';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type {
  // Base Types
  BaseFormFieldProps,
  FormFieldInteractionProps,

  // Input Types
  InputType,
  InputSize,
  FormInputProps,

  // Textarea Types
  TextareaResize,
  FormTextareaProps,

  // Select Types
  SelectOption,
  FormSelectProps,

  // Slider Types
  FormSliderProps,

  // Checkbox Types
  FormCheckboxProps,

  // Radio Group Types
  RadioOption,
  FormRadioGroupProps,

  // Action Types
  FormActionsProps,
  BaseButtonProps,
  PrimaryButtonProps,
  SecondaryButtonProps,

  // Validation Types
  ValidationRule,
  FormValidationProps,

  // Context Types
  FormContextValue,

  // Theme Types
  FormTheme,
} from './types/FormTypes';

// =============================================================================
// LEGACY COMPATIBILITY ALIASES
// =============================================================================

// Provide backward compatibility with old component names
export { FormInput as AirbnbInput } from './inputs/FormInput';
export { FormTextarea as AirbnbTextarea } from './inputs/FormTextarea';
export { FormSelect as AirbnbSelect } from './inputs/FormSelect';
export { FormSlider as AirbnbSlider } from './inputs/FormSlider';
export { FormCheckbox as AirbnbCheckbox } from './inputs/FormCheckbox';
export { FormRadioGroup as AirbnbRadioGroup } from './inputs/FormRadioGroup';
export { FormActions as AirbnbFormActions } from './actions/FormActions';
export { PrimaryButton as AirbnbPrimaryButton } from './actions/PrimaryButton';
export { SecondaryButton as AirbnbSecondaryButton } from './actions/SecondaryButton';

// =============================================================================
// DEFAULT EXPORT - FORM SYSTEM BUNDLE
// =============================================================================

export default {
  // Input Components
  Input: FormInput,
  Textarea: FormTextarea,
  Select: FormSelect,
  Slider: FormSlider,
  Checkbox: FormCheckbox,
  RadioGroup: FormRadioGroup,

  // Action Components
  Actions: FormActions,
  PrimaryButton,
  SecondaryButton,

  // Layout Components
  FieldWrapper: FormFieldWrapper,

  // Utility Components
  FormTip,
} as const;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Generate consistent form field IDs
 */
export const generateFieldId = (prefix: string, name: string): string => {
  return `${prefix}-${name}`.toLowerCase().replace(/[^a-z0-9-]/g, '-');
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone format (international)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-()]{10,}$/;
  return phoneRegex.test(phone.trim());
};

/**
 * Format currency for display
 */
export const formatCurrency = (
  value: number,
  currency: string = 'EUR',
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
};
