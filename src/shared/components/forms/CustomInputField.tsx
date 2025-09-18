// 📝 Custom Input Field - Clean HeroUI-styled input with floating label
// Location: src/shared/components/forms/CustomInputField.tsx
// Purpose: Reusable form input with HeroUI styling and floating label

import React, { useEffect, useRef, useState } from 'react';

interface CustomInputFieldProps {
  /**
   * Label for the input field
   */
  label: string;

  /**
   * Input type (text, email, password, etc.)
   */
  type?: string;

  /**
   * Placeholder text
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
}

const CustomInputField: React.FC<CustomInputFieldProps> = ({
  label,
  type = 'text',
  placeholder,
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
      {/* Input Wrapper */}
      <div
        className={`
          relative w-full inline-flex tap-highlight-transparent shadow-xs px-3 
          border-medium border-default-200 min-h-10 rounded-medium flex-col 
          items-start justify-center gap-0 transition-colors motion-reduce:transition-none 
          h-14 py-2
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text'}
          ${isFocused ? 'border-default-foreground' : ''}
          ${hasError ? 'border-danger' : ''}
          hover:border-default-400
        `}
        style={{ cursor: 'text' }}
      >
        {/* Floating Label */}
        <label
          htmlFor={inputId}
          className={`
            absolute z-10 pointer-events-none origin-top-left shrink-0 
            rtl:origin-top-right subpixel-antialiased block cursor-text
            will-change-auto transition-all duration-200 ease-out
            motion-reduce:transition-none pe-2 max-w-full text-ellipsis overflow-hidden
            ${
              isFilled
                ? 'text-default-600 pointer-events-auto scale-85 text-small -translate-y-[calc(50%+var(--heroui-font-size-small)/2-6px-var(--heroui-border-width-medium))]'
                : 'text-foreground-500 text-small'
            }
            ${required ? "after:content-['*'] after:text-danger after:ms-0.5" : ''}
          `}
          id={labelId}
        >
          {label}
        </label>

        {/* Inner Wrapper */}
        <div className="inline-flex w-full items-center h-full box-border group-data-[has-label=true]:items-end">
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
            aria-labelledby={labelId}
            className="w-full font-normal bg-transparent outline-solid placeholder:text-foreground-500 focus-visible:outline-solid outline-transparent data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 data-[type=color]:rounded-none file:cursor-pointer file:bg-transparent file:border-0 autofill:bg-transparent bg-clip-text text-small"
          />
        </div>
      </div>

      {/* Error Message */}
      {hasError && <span className="block text-sm text-red-600 mt-2 font-medium">{error}</span>}
    </div>
  );
};

export default CustomInputField;
