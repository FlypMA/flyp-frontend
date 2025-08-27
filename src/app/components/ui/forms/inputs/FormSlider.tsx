/**
 * FormSlider Component - Range Input Control
 * 
 * Professional slider component for selecting numeric values or ranges.
 * Supports currency formatting, custom marks, and accessibility features.
 * 
 * @author BetweenDeals Platform Team
 * @version 2.0.0
 */

import React, { useState } from 'react';
import { Slider as HeroSlider } from '@heroui/react';
import { cn } from '@heroui/react';
import { FormSliderProps } from '../types/FormTypes';
import { FormFieldWrapper } from '../layouts/FormFieldWrapper';

export const FormSlider: React.FC<FormSliderProps> = ({
  label,
  required,
  helpText,
  error,
  className,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onChange,
  formatOptions = { style: 'currency', currency: 'EUR' },
  showTooltip = true,
  marks,
  orientation = 'horizontal',
  isRange = false,
  id,
}) => {
  const [focused, setFocused] = useState(false);

  const handleValueChange = (newValue: number | number[]) => {
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
      <div className="form-slider-container px-2 py-4">
        <HeroSlider
          id={id}
          size="lg"
          step={step}
          minValue={min}
          maxValue={max}
          value={value as any}
          defaultValue={defaultValue as any}
          onChange={handleValueChange as any}
          orientation={orientation}
          formatOptions={formatOptions}
          showTooltip={showTooltip}
          marks={marks}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          classNames={{
            base: "w-full",
            track: cn(
              "form-slider-track",
              "h-2 rounded-full bg-gray-200",
              error && "bg-red-100"
            ),
            filler: cn(
              "form-slider-filler",
              "bg-black rounded-full",
              error && "bg-red-500"
            ),
            thumb: cn(
              "form-slider-thumb",
              "w-6 h-6 bg-white border-2 border-black shadow-lg",
              "hover:scale-110 transition-transform",
              "data-[focus-visible=true]:outline-offset-2",
              error && "border-red-500"
            ),
            mark: "bg-gray-300",
            label: "text-sm text-gray-600 font-medium"
          }}
        />
      </div>
    </FormFieldWrapper>
  );
};
