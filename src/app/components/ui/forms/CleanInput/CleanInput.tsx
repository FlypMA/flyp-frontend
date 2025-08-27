/**
 * Clean Input Component - Pure HTML Input without Wrappers
 * Removes all complex wrapper structures while maintaining functionality
 */

import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@heroui/react';

export interface CleanInputProps {
  /** Input ID */
  id?: string;
  /** Input name */
  name?: string;
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  /** Placeholder text */
  placeholder?: string;
  /** Current input value */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Change event handler */
  onChange?: (value: string) => void;
  /** Blur event handler */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Focus event handler */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is read-only */
  readOnly?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Maximum character length */
  maxLength?: number;
  /** Minimum character length */
  minLength?: number;
  /** Input pattern for validation */
  pattern?: string;
  /** Autocomplete attribute */
  autoComplete?: string;
  /** Whether to autofocus */
  autoFocus?: boolean;
  /** Label for the input */
  label?: string;
  /** Help text */
  helpText?: string;
  /** Error message */
  error?: string;
  /** Start icon element */
  startIcon?: React.ReactNode;
  /** End icon element */
  endIcon?: React.ReactNode;
  /** Input size */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
  /** Test ID */
  'data-testid'?: string;
}

export const CleanInput = forwardRef<HTMLInputElement, CleanInputProps>(({
  // Base props
  id,
  name,
  type = 'text',
  placeholder,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  disabled,
  readOnly,
  required,
  maxLength,
  minLength,
  pattern,
  autoComplete,
  autoFocus,
  
  // Field props
  label,
  helpText,
  error,
  
  // Icon props
  startIcon,
  endIcon,
  
  // Style props
  size = 'lg',
  className,
  'data-testid': testId,
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur?.(e);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  // Size classes
  const sizeClasses = {
    sm: 'h-10 px-3 text-sm',
    md: 'h-12 px-4 text-base', 
    lg: 'h-14 px-4 text-base'
  };

  // Icon size classes
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const finalEndIcon = type === 'password' ? (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="text-gray-500 hover:text-gray-700 focus:outline-none p-1"
      tabIndex={-1}
    >
      {showPassword ? (
        <EyeOff className={iconSizes[size]} />
      ) : (
        <Eye className={iconSizes[size]} />
      )}
    </button>
  ) : endIcon;

  return (
    <div className={cn('space-y-1', className)}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={id}
          className={cn(
            'block text-sm font-medium text-gray-700',
            required && "after:content-['*'] after:text-red-500 after:ml-1"
          )}
        >
          {label}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Start Icon */}
        {startIcon && (
          <div className={cn(
            'absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none',
            iconSizes[size]
          )}>
            {startIcon}
          </div>
        )}

        {/* Input */}
        <input
          ref={ref}
          id={id}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          data-testid={testId}
          className={cn(
            // Base styles
            'w-full rounded-xl border-2 transition-all duration-200',
            'text-gray-900 placeholder:text-gray-500',
            'focus:outline-none focus:ring-0',
            
            // Size
            sizeClasses[size],
            
            // Icon padding
            startIcon && 'pl-12',
            finalEndIcon && 'pr-12',
            
            // States
            focused && !error && 'border-black shadow-none',
            !focused && !error && 'border-gray-300 hover:border-gray-400',
            error && 'border-red-500 hover:border-red-500 focus:border-red-500',
            disabled && 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60',
            readOnly && 'bg-gray-50 cursor-default'
          )}
        />

        {/* End Icon */}
        {finalEndIcon && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            {finalEndIcon}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Help Text */}
      {helpText && !error && (
        <p className="text-sm text-gray-500">
          {helpText}
        </p>
      )}
    </div>
  );
});

CleanInput.displayName = 'CleanInput';

export default CleanInput;
