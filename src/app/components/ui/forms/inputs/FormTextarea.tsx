/**
 * FormTextarea Component - Multi-line Text Input
 * 
 * Professional textarea component with consistent styling and behavior.
 * Supports auto-resize, character limits, and accessibility features.
 * 
 * @author BetweenDeals Platform Team
 * @version 2.0.0
 */

import React, { forwardRef, useState } from 'react';
import { Textarea as HeroTextarea } from '@heroui/react';
import { cn } from '@heroui/react';
import { FormTextareaProps } from '../types/FormTypes';
import { FormFieldWrapper } from '../layouts/FormFieldWrapper';

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({
    label,
    required,
    helpText,
    error,
    className,
    placeholder,
    value,
    defaultValue,
    onChange,
    onBlur,
    onFocus,
    disabled,
    readOnly,
    maxLength,
    minRows = 4,
    maxRows = 8,
    resize = 'vertical',
    id,
  }, ref) => {
    const [focused, setFocused] = useState(false);

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

    return (
      <FormFieldWrapper
        label={label}
        required={required}
        helpText={helpText}
        error={error}
        className={className}
        focused={focused}
      >
        <HeroTextarea
          ref={ref}
          id={id}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onValueChange={handleValueChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          isDisabled={disabled}
          isReadOnly={readOnly}
          maxLength={maxLength}
          minRows={minRows}
          maxRows={maxRows}
          variant="bordered"
          classNames={{
            base: "w-full",
            inputWrapper: cn(
              "form-textarea-wrapper",
              "p-4 rounded-xl border-2",
              "bg-white border-gray-300",
              "hover:border-gray-400 transition-all duration-200",
              "data-[focus=true]:border-black data-[focus=true]:shadow-none",
              error && "border-red-500 hover:border-red-500 data-[focus=true]:border-red-500",
              disabled && "bg-gray-50 border-gray-200 cursor-not-allowed opacity-60",
              resize === 'none' && "resize-none",
              resize === 'vertical' && "resize-y",
              resize === 'horizontal' && "resize-x",
              resize === 'both' && "resize"
            ),
            input: "text-base placeholder:text-gray-500 min-h-[100px]"
          }}
        />
      </FormFieldWrapper>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';
