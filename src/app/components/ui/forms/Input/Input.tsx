// =============================================================================
// INPUT COMPONENT - MODULAR, ENTERPRISE-GRADE TEXT INPUT
// =============================================================================

import React, { forwardRef, useState } from 'react';
import { Input as HeroInput } from '@heroui/react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@heroui/react';
import { 
  BaseComponentProps, 
  FormFieldProps, 
  ValidationProps,
  FocusProps,
  SizeProps,
  IconProps,
  InputType
} from '../../types';
import { designTokens } from '../../design-tokens';
import { FormFieldWrapper } from '../FormFieldWrapper/FormFieldWrapper';

// =============================================================================
// COMPONENT INTERFACE
// =============================================================================

export interface InputProps 
  extends BaseComponentProps, 
          FormFieldProps, 
          ValidationProps, 
          FocusProps, 
          SizeProps, 
          IconProps {
  /** Input type */
  type?: InputType;
  /** Placeholder text */
  placeholder?: string;
  /** Current input value */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Change event handler */
  onChange?: (value: string) => void;
  /** Whether the input is read-only */
  readOnly?: boolean;
  /** Maximum character length */
  maxLength?: number;
  /** Minimum character length */
  minLength?: number;
  /** Input pattern for validation */
  pattern?: string;
  /** Whether to autocomplete */
  autoComplete?: string;
  /** Whether to autofocus */
  autoFocus?: boolean;
}

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  // Base props
  id,
  className,
  disabled,
  'data-testid': testId,
  
  // Form field props
  label,
  required,
  helpText,
  error,
  name,
  
  // Validation props
  validate,
  validateOnBlur,
  validateOnChange,
  
  // Focus props
  onFocus,
  onBlur,
  
  // Size props
  size = 'lg',
  
  // Icon props
  startIcon,
  endIcon,
  
  // Input specific props
  type = 'text',
  placeholder,
  value,
  defaultValue,
  onChange,
  readOnly,
  maxLength,
  minLength,
  pattern,
  autoComplete,
  autoFocus,
}, ref) => {
  // ==========================================================================
  // COMPONENT STATE
  // ==========================================================================
  
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | undefined>();

  // ==========================================================================
  // EVENT HANDLERS
  // ==========================================================================
  
  const handleFocus = () => {
    setFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setFocused(false);
    
    // Run validation on blur if enabled
    if (validateOnBlur && validate && value) {
      const error = validate(value);
      setValidationError(error);
    }
    
    onBlur?.();
  };

  const handleChange = (newValue: string) => {
    // Run validation on change if enabled
    if (validateOnChange && validate) {
      const error = validate(newValue);
      setValidationError(error);
    }
    
    onChange?.(newValue);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // ==========================================================================
  // COMPUTED VALUES
  // ==========================================================================
  
  const currentError = error || validationError;
  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;
  
  const finalEndIcon = type === 'password' ? (
    <button
      type="button"
      onClick={togglePasswordVisibility}
      className="input-password-toggle"
      aria-label={showPassword ? 'Hide password' : 'Show password'}
      tabIndex={-1}
    >
      {showPassword ? (
        <EyeOff className="w-4 h-4 text-gray-500 hover:text-gray-700" />
      ) : (
        <Eye className="w-4 h-4 text-gray-500 hover:text-gray-700" />
      )}
    </button>
  ) : endIcon;

  // ==========================================================================
  // RENDER
  // ==========================================================================
  
  return (
    <FormFieldWrapper
      label={label}
      required={required}
      helpText={helpText}
      error={currentError}
      className={className}
      focused={focused}
    >
      <HeroInput
        ref={ref}
        id={id}
        name={name}
        type={inputType}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onValueChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        isDisabled={disabled}
        isReadOnly={readOnly}
        maxLength={maxLength}
        size={size}
        variant="bordered"
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        pattern={pattern}
        startContent={startIcon}
        endContent={finalEndIcon}
        data-testid={testId}
        classNames={{
          base: "w-full",
          mainWrapper: "w-full",
          inputWrapper: cn(
            "input-wrapper",
            "transition-all duration-200",
            "bg-white border-2 rounded-md",
            
            // Size variants
            {
              "h-10 px-3": size === 'sm',
              "h-12 px-4": size === 'md', 
              "h-14 px-4": size === 'lg',
            },
            
            // State variants
            {
              "border-gray-300 hover:border-gray-400": !currentError && !focused,
              "border-black shadow-none": focused && !currentError,
              "border-red-500 hover:border-red-500": currentError,
              "bg-gray-50 border-gray-200 cursor-not-allowed opacity-60": disabled,
            },
            
            // Custom overrides
            "data-[focus=true]:border-black data-[focus=true]:shadow-none",
            currentError && "border-red-500 hover:border-red-500 data-[focus=true]:border-red-500"
          ),
          input: cn(
            "text-gray-900 placeholder:text-gray-500",
            "data-[has-start-content=true]:ps-0 data-[has-end-content=true]:pe-0",
            {
              "text-sm": size === 'sm',
              "text-base": size === 'md' || size === 'lg',
            }
          ),
          clearButton: "text-gray-400 hover:text-gray-600"
        }}
      />
    </FormFieldWrapper>
  );
});

Input.displayName = 'Input';

export default Input;
