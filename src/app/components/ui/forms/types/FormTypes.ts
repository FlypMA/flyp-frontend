/**
 * Form System Types - BetweenDeals Platform
 * 
 * Centralized type definitions for the form component system.
 * Provides consistent interfaces for all form components.
 * 
 * @author BetweenDeals Platform Team
 * @version 2.0.0
 */

import React from 'react';

// =============================================================================
// BASE FORM INTERFACES
// =============================================================================

export interface BaseFormFieldProps {
  /** Unique identifier for the form field */
  id?: string;
  /** Field label text */
  label?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Helper text displayed below the field */
  helpText?: string;
  /** Error message to display */
  error?: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Whether the field is read-only */
  readOnly?: boolean;
}

export interface FormFieldInteractionProps {
  /** Callback when field gains focus */
  onFocus?: () => void;
  /** Callback when field loses focus */
  onBlur?: () => void;
  /** Callback when field value changes */
  onChange?: (value: string) => void;
}

// =============================================================================
// INPUT COMPONENT TYPES
// =============================================================================

export type InputType = 'text' | 'email' | 'password' | 'tel' | 'url' | 'number';
export type InputSize = 'sm' | 'md' | 'lg';

export interface FormInputProps extends BaseFormFieldProps, FormFieldInteractionProps {
  /** Input type */
  type?: InputType;
  /** Placeholder text */
  placeholder?: string;
  /** Current value */
  value?: string;
  /** Default value */
  defaultValue?: string;
  /** Maximum character length */
  maxLength?: number;
  /** Icon to display at the start of the input */
  startIcon?: React.ReactNode;
  /** Icon to display at the end of the input */
  endIcon?: React.ReactNode;
  /** Input size variant */
  size?: InputSize;
}

// =============================================================================
// TEXTAREA COMPONENT TYPES
// =============================================================================

export type TextareaResize = 'none' | 'both' | 'horizontal' | 'vertical';

export interface FormTextareaProps extends BaseFormFieldProps, FormFieldInteractionProps {
  /** Placeholder text */
  placeholder?: string;
  /** Current value */
  value?: string;
  /** Default value */
  defaultValue?: string;
  /** Maximum character length */
  maxLength?: number;
  /** Minimum number of rows */
  minRows?: number;
  /** Maximum number of rows */
  maxRows?: number;
  /** Resize behavior */
  resize?: TextareaResize;
}

// =============================================================================
// SELECT COMPONENT TYPES
// =============================================================================

export interface SelectOption {
  /** Option value */
  value: string;
  /** Option display label */
  label: string;
  /** Whether the option is disabled */
  disabled?: boolean;
}

export interface FormSelectProps extends BaseFormFieldProps {
  /** Placeholder text */
  placeholder?: string;
  /** Available options */
  options: SelectOption[];
  /** Current selected value */
  value?: string;
  /** Default selected value */
  defaultValue?: string;
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  /** Callback when field gains focus */
  onFocus?: () => void;
  /** Callback when field loses focus */
  onBlur?: () => void;
  /** Whether multiple selection is allowed */
  multiple?: boolean;
  /** Whether the select is searchable */
  searchable?: boolean;
}

// =============================================================================
// SLIDER COMPONENT TYPES
// =============================================================================

export interface FormSliderProps extends BaseFormFieldProps {
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Current value (single or range) */
  value?: number | number[];
  /** Default value */
  defaultValue?: number | number[];
  /** Callback when value changes */
  onChange?: (value: number | number[]) => void;
  /** Number formatting options */
  formatOptions?: Intl.NumberFormatOptions;
  /** Whether to show tooltip on hover */
  showTooltip?: boolean;
  /** Slider orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Whether this is a range slider */
  isRange?: boolean;
  /** Marks to display on the slider */
  marks?: Array<{ value: number; label: string }>;
}

// =============================================================================
// CHECKBOX COMPONENT TYPES
// =============================================================================

export interface FormCheckboxProps extends Omit<BaseFormFieldProps, 'label'> {
  /** Checkbox content (acts as label) */
  children: React.ReactNode;
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Default checked state */
  defaultChecked?: boolean;
  /** Callback when checked state changes */
  onChange?: (checked: boolean) => void;
  /** Checkbox size */
  size?: 'sm' | 'md' | 'lg';
}

// =============================================================================
// RADIO GROUP TYPES
// =============================================================================

export interface RadioOption {
  /** Option value */
  value: string;
  /** Option label */
  label: React.ReactNode;
  /** Option description */
  description?: string;
  /** Whether the option is disabled */
  disabled?: boolean;
}

export interface FormRadioGroupProps extends BaseFormFieldProps {
  /** Available radio options */
  options: RadioOption[];
  /** Current selected value */
  value?: string;
  /** Default selected value */
  defaultValue?: string;
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  /** Radio group orientation */
  orientation?: 'horizontal' | 'vertical';
}

// =============================================================================
// FORM LAYOUT TYPES
// =============================================================================

export interface FormActionsProps {
  /** Action buttons */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Button alignment */
  align?: 'left' | 'center' | 'right' | 'between' | 'around';
  /** Whether to stack buttons vertically on mobile */
  stack?: boolean;
}

// =============================================================================
// BUTTON COMPONENT TYPES
// =============================================================================

export interface BaseButtonProps {
  /** Button content */
  children: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button is in loading state */
  loading?: boolean;
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the button takes full width */
  fullWidth?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export type PrimaryButtonProps = BaseButtonProps;
export type SecondaryButtonProps = BaseButtonProps;

// =============================================================================
// VALIDATION TYPES
// =============================================================================

export interface ValidationRule {
  /** Validation function */
  validate: (value: string) => boolean | string;
  /** Error message to show when validation fails */
  message: string;
}

export interface FormValidationProps {
  /** Validation rules */
  rules?: ValidationRule[];
  /** Whether to validate on blur */
  validateOnBlur?: boolean;
  /** Whether to validate on change */
  validateOnChange?: boolean;
}

// =============================================================================
// FORM CONTEXT TYPES
// =============================================================================

export interface FormContextValue {
  /** Current form values */
  values: Record<string, any>;
  /** Current form errors */
  errors: Record<string, string>;
  /** Whether the form is submitting */
  isSubmitting: boolean;
  /** Update a field value */
  updateField: (name: string, value: any) => void;
  /** Set field error */
  setFieldError: (name: string, error: string) => void;
  /** Clear field error */
  clearFieldError: (name: string) => void;
}

// =============================================================================
// THEME TYPES
// =============================================================================

export interface FormTheme {
  /** Primary brand color */
  primary: string;
  /** Secondary color */
  secondary: string;
  /** Error color */
  error: string;
  /** Success color */
  success: string;
  /** Warning color */
  warning: string;
  /** Border radius */
  borderRadius: string;
  /** Input height */
  inputHeight: string;
  /** Font family */
  fontFamily: string;
}
