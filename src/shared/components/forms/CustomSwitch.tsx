// 📝 Custom Switch - Enhanced switch component with consistent styling
// Location: src/shared/components/forms/CustomSwitch.tsx
// Purpose: Reusable switch component with consistent design system

import React, { useRef } from 'react';

export interface CustomSwitchProps {
  label: string;
  checked: boolean;
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (_e: React.FocusEvent<HTMLInputElement>) => void;
  name: string;
  className?: string;
  error?: string;
  touched?: boolean;
  switchRef?: React.RefObject<HTMLInputElement>;
  required?: boolean;
  disabled?: boolean;
  description?: string;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  label,
  checked,
  onChange,
  onBlur,
  name,
  className = '',
  error,
  touched,
  switchRef,
  required = false,
  disabled = false,
  description,
}) => {
  const internalRef = useRef<HTMLInputElement>(null);
  const ref = switchRef || internalRef;

  const hasError = error && touched;

  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="relative flex items-center">
          <input
            ref={ref}
            type="checkbox"
            id={`${name}-switch`}
            name={name}
            checked={checked}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            disabled={disabled}
            className="sr-only"
            aria-describedby={description ? `${name}-description` : undefined}
            aria-invalid={hasError}
          />
          <label
            htmlFor={`${name}-switch`}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
              ${checked ? 'bg-gray-900' : 'bg-gray-300'}
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              ${hasError ? 'ring-2 ring-red-500 ring-offset-2' : ''}
            `}
          >
            <span
              className={`
                inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200
                ${checked ? 'translate-x-6' : 'translate-x-1'}
              `}
            />
          </label>
        </div>

        <div className="flex-1">
          <label
            htmlFor={`${name}-switch`}
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
              id={`${name}-description`}
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

export default CustomSwitch;
