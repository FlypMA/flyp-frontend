/**
 * Clean Select Component - Pure HTML Select without Wrappers
 * Removes all complex wrapper structures while maintaining functionality
 */

import React, { forwardRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@heroui/react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface CleanSelectProps {
  /** Select ID */
  id?: string;
  /** Select name */
  name?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Current select value */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Change event handler */
  onChange?: (value: string) => void;
  /** Blur event handler */
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  /** Focus event handler */
  onFocus?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Whether to autofocus */
  autoFocus?: boolean;
  /** Label for the select */
  label?: string;
  /** Help text */
  helpText?: string;
  /** Error message */
  error?: string;
  /** Select options */
  options?: SelectOption[];
  /** Select size */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
  /** Test ID */
  'data-testid'?: string;
  /** Children (option elements) */
  children?: React.ReactNode;
}

export const CleanSelect = forwardRef<HTMLSelectElement, CleanSelectProps>(({
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
  required,
  autoFocus,
  
  // Field props
  label,
  helpText,
  error,
  options,
  children,
  
  // Style props
  size = 'lg',
  className,
  'data-testid': testId,
}, ref) => {
  const [focused, setFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };

  const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    setFocused(false);
    onBlur?.(e);
  };

  // Size classes
  const sizeClasses = {
    sm: 'h-10 px-3 text-sm',
    md: 'h-12 px-4 text-base', 
    lg: 'h-14 px-4 text-base'
  };

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

      {/* Select Container */}
      <div className="relative">
        <select
          ref={ref}
          id={id}
          name={name}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          autoFocus={autoFocus}
          data-testid={testId}
          className={cn(
            // Base styles
            'w-full rounded-xl border-2 transition-all duration-200',
            'text-gray-900 appearance-none cursor-pointer',
            'focus:outline-none focus:ring-0 pr-10',
            
            // Size
            sizeClasses[size],
            
            // States
            focused && !error && 'border-black shadow-none',
            !focused && !error && 'border-gray-300 hover:border-gray-400',
            error && 'border-red-500 hover:border-red-500 focus:border-red-500',
            disabled && 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
          )}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          
          {options ? (
            options.map((option) => (
              <option 
                key={option.value} 
                value={option.value} 
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))
          ) : (
            children
          )}
        </select>

        {/* Dropdown Arrow */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
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

CleanSelect.displayName = 'CleanSelect';

export default CleanSelect;
