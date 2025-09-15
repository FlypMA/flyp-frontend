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
      size = 'md',
      fullWidth = true,
      leftIcon,
      rightIcon,
      className = '',
      onChange,
      onBlur,
      onFocus,
      ...props
    },
    ref
  ) => {
    const baseClasses = [
      'border rounded-md',
      'transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-1',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50',
    ].join(' ');

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-3 py-2 text-sm',
      lg: 'px-4 py-3 text-base',
    };

    const stateClasses = error
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';

    const inputClasses = [
      baseClasses,
      sizeClasses[size],
      stateClasses,
      fullWidth ? 'w-full' : '',
      leftIcon ? 'pl-10' : '',
      rightIcon ? 'pr-10' : '',
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
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">{leftIcon}</span>
            </div>
          )}

          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            required={required}
            className={inputClasses}
            onChange={handleChange}
            onBlur={onBlur}
            onFocus={onFocus}
            {...props}
          />

          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <span className="text-gray-400">{rightIcon}</span>
            </div>
          )}
        </div>

        {description && !error && <p className="mt-1 text-sm text-gray-500">{description}</p>}

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
