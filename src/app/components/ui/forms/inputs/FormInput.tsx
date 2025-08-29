/**
 * FormInput Component - Professional Input Field
 * 
 * A clean, accessible input component following BetweenDeals design system.
 * Supports text, email, password, telephone, and number inputs with
 * consistent styling and behavior.
 * 
 * @author BetweenDeals Platform Team
 * @version 2.0.0
 */

import React, { forwardRef, useState } from 'react';
import { Input as HeroInput } from '@heroui/react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@heroui/react';
import { FormInputProps } from '../types/FormTypes';
import { FormFieldWrapper } from '../layouts/FormFieldWrapper';

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({
    label,
    required,
    helpText,
    error,
    className,
    type = 'text',
    placeholder,
    value,
    defaultValue,
    onChange,
    onBlur,
    onFocus,
    disabled,
    readOnly,
    maxLength,
    startIcon,
    endIcon,
    size = 'lg',
    id,
  }, ref) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleFocus = () => {
      setFocused(true);
      onFocus?.();
    };

    const handleBlur = () => {
      setFocused(false);
      onBlur?.();
    };

    const handleValueChange = (newValue: string) => {
      onChange?.(newValue);
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    // Determine the actual input type
    const actualType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

    // Determine end content
    let endContent = endIcon;
    if (type === 'password') {
      endContent = (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="btn-password-toggle"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      );
    }

    return (
      <FormFieldWrapper
        label={label}
        required={required}
        helpText={helpText}
        error={error}
        className={className}
        focused={focused}
      >
        <HeroInput
          ref={ref}
          id={id}
          type={actualType}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onValueChange={handleValueChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          isDisabled={disabled}
          isReadOnly={readOnly}
          maxLength={maxLength}
          size={size}
          variant="bordered"
          startContent={startIcon}
          endContent={endContent}
          classNames={{
            base: "w-full",
            mainWrapper: "w-full",
            inputWrapper: cn(
              "form-input-wrapper",
              "h-14 px-4 rounded-xl border-2",
              "bg-white border-gray-300 shadow-sm",
              "hover:border-gray-400 transition-all duration-200",
              "data-[focus=true]:border-black data-[focus=true]:shadow-sm",
              error && "border-red-500 hover:border-red-500 data-[focus=true]:border-red-500",
              disabled && "bg-gray-50 border-gray-200 cursor-not-allowed opacity-60"
            ),
            input: cn(
              "text-base placeholder:text-gray-500",
              "data-[has-start-content=true]:ps-0 data-[has-end-content=true]:pe-0"
            ),
            clearButton: "text-gray-400 hover:text-gray-600"
          }}
        />
      </FormFieldWrapper>
    );
  }
);

FormInput.displayName = 'FormInput';
