// 📝 Custom Checkbox - Enhanced checkbox with consistent styling
// Location: src/shared/components/forms/CustomCheckbox.tsx
// Purpose: Reusable checkbox component with consistent design system

import React, { useRef } from 'react';

export interface CustomCheckboxProps {
  label: React.ReactNode;
  checked: boolean;
  onChange: () => void;
  onBlur?: () => void;
  name: string;
  className?: string;
  error?: string;
  touched?: boolean;
  checkboxRef?: React.RefObject<HTMLInputElement>;
  required?: boolean;
  disabled?: boolean;
  description?: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  checked,
  onChange,
  onBlur,
  name,
  className = '',
  error,
  touched,
  checkboxRef,
  required = false,
  disabled = false,
  description,
}) => {
  const internalRef = useRef<HTMLInputElement>(null);
  const ref = checkboxRef || internalRef;

  const hasError = error && touched;

  return (
    <div className={`mb-3 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="relative flex items-center">
          <input
            ref={ref}
            type="checkbox"
            id={`${name}-checkbox`}
            name={name}
            checked={checked}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            disabled={disabled}
            className={`
              w-5 h-5 text-gray-900 border-2 rounded
              focus:ring-2 focus:ring-gray-500 focus:ring-offset-0
              transition-all duration-200
              appearance-none
              -webkit-appearance-none
              -moz-appearance-none
              ${checked ? 'bg-primary-600 border-primary-600' : 'bg-white border-gray-300'}
              ${hasError ? 'border-red-400 focus:ring-red-500' : ''}
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
            style={{
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              backgroundImage: 'none',
            }}
            aria-describedby={description ? `${name}-description` : undefined}
            aria-invalid={hasError ? 'true' : 'false'}
          />
          {checked && (
            <svg
              className="absolute w-3 h-3 text-white pointer-events-none"
              style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>

        <div className="flex-1">
          <label
            htmlFor={`${name}-checkbox`}
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
            <p id={`${name}-description`} className="text-xs text-gray-500 mt-1">
              {description}
            </p>
          )}
        </div>
      </div>

      {hasError && <span className="block text-sm text-red-600 mt-2 font-medium">{error}</span>}
    </div>
  );
};

export default CustomCheckbox;
