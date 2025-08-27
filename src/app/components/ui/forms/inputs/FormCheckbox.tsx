/**
 * FormCheckbox Component - Boolean Input Control
 * 
 * Professional checkbox component with consistent styling and accessibility.
 * Supports custom content, help text, and error states.
 * 
 * @author BetweenDeals Platform Team
 * @version 2.0.0
 */

import React from 'react';
import { Checkbox } from '@heroui/react';
import { cn } from '@heroui/react';
import { FormCheckboxProps } from '../types/FormTypes';

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  children,
  required,
  helpText,
  error,
  className,
  checked,
  defaultChecked,
  onChange,
  disabled,
  size = 'md',
  id,
}) => {
  return (
    <div className={cn('form-checkbox-wrapper', className)}>
      <Checkbox
        id={id}
        isSelected={checked}
        defaultSelected={defaultChecked}
        onValueChange={onChange}
        isDisabled={disabled}
        size={size}
        classNames={{
          base: cn(
            "form-checkbox-base",
            "inline-flex items-start gap-3 p-0",
            "hover:opacity-80 cursor-pointer",
            disabled && "cursor-not-allowed opacity-60"
          ),
          wrapper: cn(
            "form-checkbox-icon",
            "mt-1 rounded border-2 border-gray-300",
            "before:rounded before:bg-black",
            "after:text-white after:font-medium",
            error && "border-red-500",
            disabled && "border-gray-200 opacity-60"
          ),
          label: cn(
            "form-checkbox-label",
            "text-base text-gray-900 leading-relaxed",
            disabled && "text-gray-400"
          )
        }}
      >
        <span className="flex-1">
          {children}
          {required && <span className="text-red-500 ml-1">*</span>}
        </span>
      </Checkbox>

      {error && (
        <div className="form-field-error-text mt-1 ml-7">
          {error}
        </div>
      )}

      {helpText && !error && (
        <div className="form-field-help-text mt-1 ml-7">
          {helpText}
        </div>
      )}
    </div>
  );
};
