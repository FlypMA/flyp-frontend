// 📝 Custom Input Field - Enhanced input with floating label
// Location: src/features/authentication/components/forms/CustomInputField.tsx
// Purpose: Reusable form input with smooth animations and validation states

import React, { useEffect, useState } from 'react';

export interface CustomInputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name: string;
  className?: string;
  error?: string;
  touched?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  autoComplete?: string;
  required?: boolean;
}

const CustomInputField: React.FC<CustomInputFieldProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  name,
  className = '',
  error,
  touched,
  inputRef,
  autoComplete,
  required = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  useEffect(() => {
    setHasContent(!!value);
  }, [value]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur(e);
  };

  const hasError = error && touched;

  return (
    <div className={`mb-6 ${className}`}>
      <div className="relative">
        <input
          ref={inputRef}
          type={type}
          placeholder={placeholder}
          className={`
            w-full h-14 px-4 pt-6 pb-2 text-base text-black bg-white 
            border border-gray-300 rounded-xl transition-all duration-200 
            focus:outline-none focus:border-gray-900 focus:ring-0
            hover:border-gray-500
            ${hasError ? 'border-red-400 focus:border-red-500' : ''}
            placeholder:text-transparent
          `}
          aria-label={label}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          name={name}
          autoComplete={autoComplete}
          required={required}
        />
        <label
          className={`
            absolute left-4 transition-all duration-200 pointer-events-none font-medium
            ${
              hasContent || isFocused || value
                ? 'top-2 text-xs text-gray-700'
                : 'top-4 text-base text-gray-500'
            }
            ${hasError ? 'text-red-500' : ''}
          `}
        >
          {label}
          {required && ' *'}
        </label>
      </div>

      {/* Error Message */}
      {hasError && (
        <div className="mt-2 text-sm text-red-500 flex items-center gap-1">
          <span className="w-4 h-4 text-red-500">⚠</span>
          {error}
        </div>
      )}

      {/* Helper Text */}
      {!hasError && type === 'email' && (
        <div className="mt-2 text-xs text-gray-500">
          We'll never share your email with anyone else.
        </div>
      )}
    </div>
  );
};

export default CustomInputField;
