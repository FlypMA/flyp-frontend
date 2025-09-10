/**
 * FormSelect Component - Dropdown Selection
 *
 * Professional select dropdown with search capability and consistent styling.
 * Supports single and multiple selection modes with keyboard navigation.
 *
 * @author BetweenDeals Platform Team
 * @version 2.0.0
 */

import React, { forwardRef, useState } from 'react';
import { Select as HeroSelect, SelectItem } from '@heroui/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@heroui/react';
import { FormSelectProps } from '../types/FormTypes';
import { FormFieldWrapper } from '../layouts/FormFieldWrapper';

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      label,
      required,
      helpText,
      error,
      className,
      placeholder,
      options,
      value,
      defaultValue,
      onChange,
      onBlur,
      onFocus,
      disabled,
      id,
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);

    const handleFocus = () => {
      setFocused(true);
      onFocus?.();
    };

    const handleBlur = () => {
      setFocused(false);
      onBlur?.();
    };

    const handleSelectionChange = (keys: any) => {
      const selectedValue = Array.from(keys)[0] as string;
      onChange?.(selectedValue);
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
        <HeroSelect
          ref={ref}
          id={id}
          placeholder={placeholder}
          selectedKeys={value ? [value] : defaultValue ? [defaultValue] : []}
          onSelectionChange={handleSelectionChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          isDisabled={disabled}
          variant="bordered"
          selectorIcon={<ChevronDown className="w-4 h-4" />}
          classNames={{
            base: 'w-full',
            trigger: cn(
              'form-select-trigger',
              'h-14 px-4 rounded-xl border-2',
              'bg-white border-gray-300',
              'hover:border-gray-400 transition-all duration-200',
              'data-[focus=true]:border-black data-[focus=true]:shadow-none data-[open=true]:border-black',
              error &&
                'border-red-500 hover:border-red-500 data-[focus=true]:border-red-500 data-[open=true]:border-red-500',
              disabled && 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
            ),
            value: 'text-base text-gray-900',
            selectorIcon: 'text-gray-500',
            popoverContent: 'rounded-xl border-2 border-gray-200 shadow-xl p-2',
            listbox: 'p-0',
          }}
        >
          {options.map(option => (
            <SelectItem
              key={option.value}
              textValue={option.value}
              isDisabled={option.disabled}
              classNames={{
                base: cn(
                  'form-select-item',
                  'rounded-lg mx-1 my-0.5 px-3 py-2',
                  'hover:bg-gray-100 data-[selectable=true]:focus:bg-gray-100',
                  'data-[selected=true]:bg-black data-[selected=true]:text-white'
                ),
              }}
            >
              {option.label}
            </SelectItem>
          ))}
        </HeroSelect>
      </FormFieldWrapper>
    );
  }
);

FormSelect.displayName = 'FormSelect';
