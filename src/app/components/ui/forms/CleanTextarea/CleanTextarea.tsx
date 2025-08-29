/**
 * Clean Textarea Component - Pure HTML Textarea without Wrappers
 * Removes all complex wrapper structures while maintaining functionality
 */

import React, { forwardRef, useState } from 'react';
import { cn } from '@heroui/react';

export interface CleanTextareaProps {
  /** Textarea ID */
  id?: string;
  /** Textarea name */
  name?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Current textarea value */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Change event handler */
  onChange?: (value: string) => void;
  /** Blur event handler */
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  /** Focus event handler */
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  /** Whether the textarea is disabled */
  disabled?: boolean;
  /** Whether the textarea is read-only */
  readOnly?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Maximum character length */
  maxLength?: number;
  /** Minimum character length */
  minLength?: number;
  /** Number of rows */
  rows?: number;
  /** Minimum rows */
  minRows?: number;
  /** Maximum rows */
  maxRows?: number;
  /** Whether to autofocus */
  autoFocus?: boolean;
  /** Label for the textarea */
  label?: string;
  /** Help text */
  helpText?: string;
  /** Error message */
  error?: string;
  /** Whether to show character count */
  showCharCount?: boolean;
  /** Textarea size */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
  /** Test ID */
  'data-testid'?: string;
}

export const CleanTextarea = forwardRef<HTMLTextAreaElement, CleanTextareaProps>(({
  // Base props
  id,
  name,
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
  rows = 4,
  minRows,
  maxRows,
  autoFocus,
  
  // Field props
  label,
  helpText,
  error,
  showCharCount,
  
  // Style props
  size = 'lg',
  className,
  'data-testid': testId,
}, ref) => {
  const [focused, setFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setFocused(false);
    onBlur?.(e);
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base', 
    lg: 'px-4 py-3 text-base'
  };

  const charCount = value?.length || 0;
  const showCount = showCharCount && maxLength;
  
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

      {/* Textarea Container */}
      <div className="relative">
        <textarea
          ref={ref}
          id={id}
          name={name}
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
          rows={rows}
          autoFocus={autoFocus}
          data-testid={testId}
          className={cn(
            // Base styles
            'w-full rounded-xl border-2 transition-all duration-200 resize-y',
            'text-gray-900 placeholder:text-gray-500',
            'focus:outline-none focus:ring-0 min-h-[100px]',
            'bg-white shadow-sm', // Added white bg and subtle shadow for visibility
            
            // Size
            sizeClasses[size],
            
            // States - Enhanced visibility on white backgrounds
            focused && !error && 'border-black shadow-sm',
            !focused && !error && 'border-gray-300 hover:border-gray-400',
            error && 'border-red-500 hover:border-red-500 focus:border-red-500',
            disabled && 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60',
            readOnly && 'bg-gray-50 cursor-default'
          )}
        />

        {/* Character Count */}
        {showCount && (
          <div className="absolute bottom-2 right-3 text-xs text-gray-500">
            {charCount}/{maxLength}
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

CleanTextarea.displayName = 'CleanTextarea';

export default CleanTextarea;
