// 📝 Custom Radio - Enhanced radio button with consistent styling
// Location: src/shared/components/forms/CustomRadio.tsx
// Purpose: Reusable radio button component with consistent design system

import React, { useRef } from 'react';

export interface CustomRadioProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (_e: React.FocusEvent<HTMLInputElement>) => void;
  name: string;
  className?: string;
  error?: string;
  touched?: boolean;
  radioRef?: React.RefObject<HTMLInputElement>;
  required?: boolean;
  disabled?: boolean;
  description?: string;
}

const CustomRadio: React.FC<CustomRadioProps> = ({
  label,
  value,
  checked,
  onChange,
  onBlur,
  name,
  className = '',
  error,
  touched,
  radioRef,
  required = false,
  disabled = false,
  description,
}) => {
  const internalRef = useRef<HTMLInputElement>(null);
  const ref = radioRef || internalRef;

  const hasError = error && touched;

  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="relative flex items-center">
          <input
            ref={ref}
            type="radio"
            id={`${name}-${value}`}
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            disabled={disabled}
            className={`
              w-5 h-5 text-gray-900 bg-white border-2 border-gray-300
              focus:ring-2 focus:ring-gray-500 focus:ring-offset-0
              transition-all duration-200
              ${hasError ? 'border-red-400 focus:ring-red-500' : ''}
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
            aria-describedby={description ? `${name}-${value}-description` : undefined}
            aria-invalid={hasError}
          />
          {checked && (
            <div
              className="absolute w-2 h-2 bg-gray-900 rounded-full pointer-events-none"
              style={{ top: '6px', left: '6px' }}
            />
          )}
        </div>

        <div className="flex-1">
          <label
            htmlFor={`${name}-${value}`}
            className={`
              text-sm font-medium cursor-pointer select-none
              ${hasError ? 'text-red-600' : 'text-gray-900'}
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>

          {description && (
            <p
              id={`${name}-${value}-description`}
              className="text-xs text-gray-500 mt-1"
            >
              {description}
            </p>
          )}
        </div>
      </div>

      {hasError && (
        <span className="block text-sm text-red-600 mt-2 font-medium">
          {error}
        </span>
      )}
    </div>
  );
};

export default CustomRadio;
