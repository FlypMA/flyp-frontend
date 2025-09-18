// 📝 Custom Textarea - Clean HeroUI-styled textarea with floating label
// Location: src/shared/components/forms/CustomTextarea.tsx
// Purpose: Reusable textarea with HeroUI styling and floating label

import React, { useEffect, useRef, useState } from 'react';

interface CustomTextareaProps {
  /**
   * Label for the textarea
   */
  label: string;

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
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;

  /**
   * Blur handler
   */
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;

  /**
   * Focus handler
   */
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;

  /**
   * Textarea name attribute
   */
  name: string;

  /**
   * Textarea id attribute
   */
  id?: string;

  /**
   * Whether the field is required
   */
  required?: boolean;

  /**
   * Whether the textarea is disabled
   */
  disabled?: boolean;

  /**
   * Number of rows (height)
   */
  rows?: number;

  /**
   * Minimum height in pixels
   */
  minHeight?: number;

  /**
   * Maximum height in pixels
   */
  maxHeight?: number;

  /**
   * Whether to hide scrollbar
   */
  hideScroll?: boolean;

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
   * Reference to the textarea element
   */
  textareaRef?: React.RefObject<HTMLTextAreaElement>;
}

const CustomTextarea: React.FC<CustomTextareaProps> = ({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  name,
  id,
  required = false,
  disabled = false,
  rows = 4,
  minHeight = 130,
  maxHeight,
  hideScroll = true,
  error,
  touched = false,
  className = '',
  textareaRef,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const internalRef = useRef<HTMLTextAreaElement>(null);
  const ref = textareaRef || internalRef;

  // Generate unique IDs if not provided
  const textareaId = id || `${name}-textarea`;
  const labelId = `${name}-label`;

  useEffect(() => {
    setHasContent(!!value);
  }, [value]);

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const isFilled = hasContent || isFocused;
  const hasError = error && touched;

  // Calculate height based on content
  const textareaHeight = Math.max(minHeight, Math.min(maxHeight || minHeight * 2, minHeight));

  return (
    <div className={`w-full flex flex-col ${className}`}>
      {/* Textarea Wrapper */}
      <div
        className={`
          relative w-full inline-flex tap-highlight-transparent shadow-xs px-3 
          border-medium border-default-200 min-h-10 rounded-medium flex-col 
          items-start justify-center gap-0 transition-colors motion-reduce:transition-none 
          h-auto py-2
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text'}
          ${isFocused ? 'border-default-foreground' : ''}
          ${hasError ? 'border-danger' : ''}
          hover:border-default-400
        `}
        data-has-multiple-rows="true"
        style={{ cursor: 'text' }}
      >
        {/* Floating Label */}
        <label
          htmlFor={textareaId}
          className={`
            z-10 pointer-events-none origin-top-left shrink-0 
            rtl:origin-top-right subpixel-antialiased block cursor-text relative
            will-change-auto transition-all duration-200 ease-out
            motion-reduce:transition-none pb-0.5 pe-2 max-w-full text-ellipsis overflow-hidden
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
        <div className="inline-flex w-full h-full box-border items-start group-data-[has-label=true]:items-start">
          <textarea
            ref={ref}
            id={textareaId}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            rows={rows}
            aria-labelledby={labelId}
            data-hide-scroll={hideScroll}
            className={`
              w-full font-normal bg-transparent outline-solid placeholder:text-foreground-500 
              focus-visible:outline-solid outline-transparent data-[has-start-content=true]:ps-1.5 
              data-[has-end-content=true]:pe-1.5 data-[type=color]:rounded-none 
              file:cursor-pointer file:bg-transparent file:border-0 autofill:bg-transparent 
              bg-clip-text text-small resize-none transition-height duration-100 
              motion-reduce:transition-none pe-0
              ${hideScroll ? 'scrollbar-hide' : ''}
            `}
            style={{
              height: `${textareaHeight}px !important`,
              minHeight: `${minHeight}px`,
              maxHeight: maxHeight ? `${maxHeight}px` : 'none',
            }}
          />
        </div>
      </div>

      {/* Error Message */}
      {hasError && <span className="block text-sm text-red-600 mt-2 font-medium">{error}</span>}
    </div>
  );
};

export default CustomTextarea;
