// =============================================================================
// TEXTAREA COMPONENT - MODULAR, ENTERPRISE-GRADE TEXTAREA
// =============================================================================

import React, { forwardRef, useState } from 'react';
import { Textarea as HeroTextarea } from '@heroui/react';
import { cn } from '@heroui/react';
import { 
  BaseComponentProps, 
  FormFieldProps, 
  ValidationProps,
  FocusProps,
  SizeProps
} from '../../types';
import { FormFieldWrapper } from '../FormFieldWrapper/FormFieldWrapper';

// =============================================================================
// COMPONENT INTERFACE
// =============================================================================

export interface TextareaProps 
  extends BaseComponentProps, 
          FormFieldProps, 
          ValidationProps, 
          FocusProps, 
          SizeProps {
  /** Placeholder text */
  placeholder?: string;
  /** Current textarea value */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Change event handler */
  onChange?: (value: string) => void;
  /** Whether the textarea is read-only */
  readOnly?: boolean;
  /** Maximum character length */
  maxLength?: number;
  /** Minimum character length */
  minLength?: number;
  /** Minimum number of rows */
  minRows?: number;
  /** Maximum number of rows */
  maxRows?: number;
  /** Resize behavior */
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  /** Whether to autofocus */
  autoFocus?: boolean;
  /** Character count display */
  showCharCount?: boolean;
}

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
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
  
  // Textarea specific props
  placeholder,
  value,
  defaultValue,
  onChange,
  readOnly,
  maxLength,
  minLength,
  minRows = 4,
  maxRows = 8,
  resize = 'vertical',
  autoFocus,
  showCharCount = false,
}, ref) => {
  // ==========================================================================
  // COMPONENT STATE
  // ==========================================================================
  
  const [focused, setFocused] = useState(false);
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

  // ==========================================================================
  // COMPUTED VALUES
  // ==========================================================================
  
  const currentError = error || validationError;
  const currentLength = value?.length || 0;
  const isOverLimit = maxLength ? currentLength > maxLength : false;

  // ==========================================================================
  // RENDER HELPERS
  // ==========================================================================
  
  const renderCharacterCount = () => {
    if (!showCharCount && !maxLength) return null;
    
    return (
      <div className={cn(
        'character-count',
        'text-right text-xs mt-1',
        isOverLimit ? 'text-red-500' : 'text-gray-500'
      )}>
        {maxLength ? (
          <span>{currentLength}/{maxLength}</span>
        ) : (
          <span>{currentLength} characters</span>
        )}
      </div>
    );
  };

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
      <div className="textarea-container">
        <HeroTextarea
          ref={ref}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onValueChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          isDisabled={disabled}
          isReadOnly={readOnly}
          maxLength={maxLength}
          minRows={minRows}
          maxRows={maxRows}
          variant="bordered"
          autoFocus={autoFocus}
          data-testid={testId}
          classNames={{
            base: "w-full",
            inputWrapper: cn(
              "textarea-wrapper",
              "transition-all duration-200",
              "bg-white border-2 rounded-md shadow-sm",
              
              // Size variants
              {
                "p-3": size === 'sm',
                "p-4": size === 'md' || size === 'lg',
              },
              
              // State variants
              {
                "border-gray-200 hover:border-gray-300": !currentError && !focused,
                "border-black shadow-sm": focused && !currentError,
                "border-red-500 hover:border-red-500": currentError,
                "bg-gray-50 border-gray-200 cursor-not-allowed opacity-60": disabled,
              },
              
              // Resize variants
              {
                "resize-none": resize === 'none',
                "resize": resize === 'both',
                "resize-x": resize === 'horizontal',
                "resize-y": resize === 'vertical',
              },
              
              // Custom overrides
              "data-[focus=true]:border-black data-[focus=true]:shadow-none",
              currentError && "border-red-500 hover:border-red-500 data-[focus=true]:border-red-500"
            ),
            input: cn(
              "text-gray-900 placeholder:text-gray-500",
              "min-h-[100px]",
              {
                "text-sm": size === 'sm',
                "text-base": size === 'md' || size === 'lg',
              }
            )
          }}
        />
        
        {/* Character Count */}
        {renderCharacterCount()}
      </div>
    </FormFieldWrapper>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
