// 📝 Standard Input - Unified form input with consistent styling
// Location: src/shared/components/forms/StandardInput.tsx
// Purpose: Standardized input component with floating label and consistent design

import React, { useEffect, useRef, useState } from 'react';

interface StandardInputProps {
  /**
   * Label for the input field
   */
  label: string;

  /**
   * Input type (text, email, password, etc.)
   */
  type?: string;

  /**
   * Placeholder text (should be a space for floating label effect)
   */
  placeholder?: string;

  /**
   * Current value
   */
  value: string;

  /**
   * Change handler
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Blur handler
   */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * Focus handler
   */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * Input name attribute
   */
  name: string;

  /**
   * Input id attribute
   */
  id?: string;

  /**
   * Whether the field is required
   */
  required?: boolean;

  /**
   * Whether the input is disabled
   */
  disabled?: boolean;

  /**
   * Auto complete attribute
   */
  autoComplete?: string;

  /**
   * Error message to display
   */
  error?: string;

  /**
   * Whether the field has been touched (for validation)
   */
  touched?: boolean;

  /**
   * Custom CSS classes
   */
  className?: string;

  /**
   * Reference to the input element
   */
  inputRef?: React.RefObject<HTMLInputElement>;

  /**
   * Aria label for accessibility
   */
  ariaLabel?: string;
}

const StandardInput: React.FC<StandardInputProps> = ({
  label,
  type = 'text',
  placeholder = ' ',
  value,
  onChange,
  onBlur,
  onFocus,
  name,
  id,
  required = false,
  disabled = false,
  autoComplete,
  error,
  touched = false,
  className = '',
  inputRef,
  ariaLabel,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const internalRef = useRef<HTMLInputElement>(null);
  const ref = inputRef || internalRef;

  // Generate unique IDs if not provided
  const inputId = id || `${name}-input`;
  const labelId = `${name}-label`;

  useEffect(() => {
    setHasContent(!!value);
  }, [value]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const isFilled = hasContent || isFocused;
  const hasError = error && touched;

  return (
    <div className={`w-full flex flex-col ${className}`}>
      {/* Input Container */}
      <div className="relative w-full">
        {/* Input Element */}
        <input
          ref={ref}
          type={type}
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          aria-label={ariaLabel || label}
          aria-labelledby={labelId}
          className={`
            w-full h-14 px-4 pt-6 pb-2 text-base text-black bg-white 
            border border-gray-300 rounded-xl transition-all duration-200 
            focus:outline-none focus:border-gray-900 focus:ring-0
            hover:border-gray-500
            placeholder:text-transparent
            ${hasError ? 'border-red-400 focus:border-red-500' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'cursor-text'}
          `}
        />

        {/* Floating Label */}
        <label
          htmlFor={inputId}
          className={`
            absolute left-4 transition-all duration-200 ease-out pointer-events-none
            ${isFilled ? 'top-2 text-xs text-gray-600' : 'top-4 text-base text-gray-500'}
            ${hasError ? 'text-red-500' : ''}
            ${required ? "after:content-['*'] after:text-red-500 after:ml-1" : ''}
          `}
          id={labelId}
        >
          {label}
        </label>
      </div>

      {/* Error Message */}
      {hasError && <span className="block text-sm text-red-600 mt-2 font-medium">{error}</span>}
    </div>
  );
};

export default StandardInput;
