/**
 * FormRadioGroup Component - Single Selection Control
 * 
 * Professional radio button group with descriptions and consistent styling.
 * Supports horizontal/vertical layouts and accessibility features.
 * 
 * @author BetweenDeals Platform Team
 * @version 2.0.0
 */

import React from 'react';
import { RadioGroup, Radio } from '@heroui/react';
import { cn } from '@heroui/react';
import { FormRadioGroupProps } from '../types/FormTypes';
import { FormFieldWrapper } from '../layouts/FormFieldWrapper';

export const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
  label,
  required,
  helpText,
  error,
  className,
  options,
  value,
  defaultValue,
  onChange,
  orientation = 'vertical',
  id,
}) => {
  return (
    <FormFieldWrapper
      label={label}
      required={required}
      helpText={helpText}
      error={error}
      className={className}
    >
      <RadioGroup
        id={id}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onChange}
        orientation={orientation}
        classNames={{
          base: "form-radio-group",
          wrapper: cn(
            "gap-3",
            orientation === 'horizontal' && "flex-row flex-wrap"
          )
        }}
      >
        {options.map((option) => (
          <Radio
            key={option.value}
            value={option.value}
            isDisabled={option.disabled}
            classNames={{
              base: cn(
                "form-radio-base",
                "inline-flex items-start gap-3 p-3 rounded-xl border border-gray-200",
                "hover:border-gray-300 hover:bg-gray-50 cursor-pointer transition-all",
                "data-[selected=true]:border-black data-[selected=true]:bg-gray-50",
                option.disabled && "opacity-60 cursor-not-allowed"
              ),
              wrapper: cn(
                "form-radio-icon",
                "mt-0.5 border-2 border-gray-300",
                "before:bg-black",
                error && "border-red-500"
              ),
              labelWrapper: "flex-1",
              label: "text-base text-gray-900 font-medium"
            }}
          >
            <div className="flex flex-col">
              <span className="text-base font-medium text-gray-900">
                {option.label}
              </span>
              {option.description && (
                <span className="text-sm text-gray-500 mt-1">
                  {option.description}
                </span>
              )}
            </div>
          </Radio>
        ))}
      </RadioGroup>
    </FormFieldWrapper>
  );
};
