// 📝 Input Component - Design System
// Single source of truth for all input implementations

import React, { forwardRef } from 'react';
import type { InputProps } from '../types';

/**
 * Input Component - Unified input implementation
 *
 * ✅ Replaces ALL duplicate input components:
 * - src/app/components/ui/forms/Input/Input.tsx
 * - src/shared/components/ui/ui/forms/Input/Input.tsx
 * - src/app/components/ui/forms/CleanInput/CleanInput.tsx
 * - src/shared/components/ui/ui/forms/CleanInput/CleanInput.tsx
 * - src/app/components/forms/AnimatedInput.tsx
 * - src/shared/components/forms/forms/AnimatedInput.tsx
 * - src/app/components/ui/forms/inputs/FormInput.tsx
 * - src/shared/components/ui/ui/forms/inputs/FormInput.tsx
 * - src/app/components/main_UI/forms/customInputField.tsx
 * - And 20+ more input duplicates
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      placeholder,
      value,
      defaultValue,
      disabled = false,
      required = false,
      error,
      label,
      description,
      helperText,
      size = 'md',
      fullWidth = true,
      leftIcon,
      rightIcon,
      startContent,
      endContent,
      variant = 'bordered',
      color = 'default',
      radius,
      isDisabled = false,
      isRequired = false,
      isInvalid = false,
      isReadOnly = false,
      className = '',
      onChange,
      onBlur,
      onFocus,
      ...props
    },
    ref
  ) => {
    // Determine if input is disabled
    const isInputDisabled = disabled || isDisabled;
    const isInputRequired = required || isRequired;
    const isInputInvalid = !!error || isInvalid;
    const isInputReadOnly = isReadOnly;

    // Base classes
    const baseClasses = [
      'transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-1',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50',
      'read-only:bg-gray-50 read-only:cursor-default',
    ].join(' ');

    // Size classes
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-3 py-2 text-sm',
      lg: 'px-4 py-3 text-base',
    };

    // Variant classes
    const getVariantClasses = () => {
      const variants = {
        flat: 'bg-gray-100 border-0 focus:bg-white focus:ring-blue-500',
        bordered: 'border bg-white focus:ring-blue-500',
        underlined: 'border-0 border-b-2 rounded-none bg-transparent focus:ring-0',
        faded: 'bg-gray-50 border border-gray-200 focus:bg-white focus:ring-blue-500',
      };
      return variants[variant] || variants.bordered;
    };

    // Color classes
    const getColorClasses = () => {
      if (isInputInvalid) {
        return 'border-red-300 focus:border-red-500 focus:ring-red-500';
      }
      
      const colors = {
        default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
        primary: 'border-blue-300 focus:border-blue-500 focus:ring-blue-500',
        secondary: 'border-gray-300 focus:border-gray-500 focus:ring-gray-500',
        success: 'border-green-300 focus:border-green-500 focus:ring-green-500',
        warning: 'border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500',
        danger: 'border-red-300 focus:border-red-500 focus:ring-red-500',
      };
      return colors[color] || colors.default;
    };

    // Radius classes
    const getRadiusClasses = () => {
      if (variant === 'underlined') return 'rounded-none';
      
      const radiusMap = {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      };
      return radiusMap[radius || 'md'];
    };

    // Determine icons to use (support both old and new props)
    const leftIconContent = leftIcon || startContent;
    const rightIconContent = rightIcon || endContent;

    const inputClasses = [
      baseClasses,
      getVariantClasses(),
      getColorClasses(),
      getRadiusClasses(),
      sizeClasses[size],
      fullWidth ? 'w-full' : '',
      leftIconContent ? 'pl-10' : '',
      rightIconContent ? 'pr-10' : '',
      className,
    ].join(' ');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {isInputRequired && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIconContent && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">{leftIconContent}</span>
            </div>
          )}

          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            disabled={isInputDisabled}
            required={isInputRequired}
            readOnly={isInputReadOnly}
            className={inputClasses}
            onChange={handleChange}
            onBlur={onBlur}
            onFocus={onFocus}
            {...props}
          />

          {rightIconContent && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <span className="text-gray-400">{rightIconContent}</span>
            </div>
          )}
        </div>

        {/* Show description or helperText when no error */}
        {(description || helperText) && !error && (
          <p className="mt-1 text-sm text-gray-500">{description || helperText}</p>
        )}

        {/* Show error message */}
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
