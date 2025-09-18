import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { FieldRenderProps } from 'react-final-form';

interface BaseAnimatedTextareaProps {
  label: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  description?: string;
  minRows?: number;
  maxRows?: number;
  autoResize?: boolean;
  characterLimit?: number;
}

// For use with react-final-form
interface ReactFinalFormProps extends BaseAnimatedTextareaProps, FieldRenderProps<string> {
  variant: 'react-final-form';
}

// For standalone use
interface StandaloneProps extends BaseAnimatedTextareaProps {
  variant?: 'standalone';
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  name?: string;
}

type AnimatedTextareaProps = ReactFinalFormProps | StandaloneProps;

const AnimatedTextarea = forwardRef<HTMLTextAreaElement, AnimatedTextareaProps>((props, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const internalRef = useRef<HTMLTextAreaElement>(null);
  const textareaRef = ref || internalRef;

  const {
    label,
    placeholder = '',
    className = '',
    required = false,
    disabled = false,
    description,
    minRows = 3,
    maxRows = 8,
    autoResize = true,
    characterLimit,
  } = props;

  // Extract values based on variant
  const isReactFinalForm = props.variant === 'react-final-form';
  const variant = props.variant || 'standalone';
  const value = isReactFinalForm ? props.input.value : props.value || '';
  const error = isReactFinalForm
    ? props.meta.error && props.meta.touched
      ? props.meta.error
      : undefined
    : props.error;
  const name = isReactFinalForm ? props.input.name : props.name;

  // Auto-resize functionality
  const adjustHeight = () => {
    if (autoResize && textareaRef && 'current' in textareaRef && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const minHeight = minRows * 24; // Approximate line height
      const maxHeight = maxRows * 24;
      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
      textarea.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    setHasContent(!!value);
    adjustHeight();
  }, [value, autoResize, minRows, maxRows]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;

    // Check character limit
    if (characterLimit && newValue.length > characterLimit) {
      return;
    }

    if (isReactFinalForm) {
      props.input.onChange(e);
    } else {
      props.onChange?.(newValue);
    }

    // Adjust height after value change
    setTimeout(adjustHeight, 0);
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    if (isReactFinalForm) {
      props.input.onFocus(e);
    } else {
      props.onFocus?.(e);
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    if (isReactFinalForm) {
      props.input.onBlur(e);
    } else {
      props.onBlur?.(e);
    }
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const hasError = !!error;

  const characterCount = value.length;
  const isOverLimit = characterLimit && characterCount > characterLimit;

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
            relative w-full inline-flex tap-highlight-transparent shadow-sm px-3 
            border-medium transition-background !duration-150 transition-colors 
            motion-reduce:transition-none rounded-medium flex-col 
            items-start justify-center gap-0 py-2
            ${
              hasError
                ? 'border-danger-500 hover:border-danger-600'
                : isFocused
                  ? 'border-primary-500 hover:border-primary-600'
                  : isHovered
                    ? 'border-default-400'
                    : 'border-default-200'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text'}
          `}
        style={{
          cursor: disabled ? 'not-allowed' : 'text',
          minHeight: `${minRows * 1.5 + 2}rem`,
        }}
        data-slot="input-wrapper"
        data-hover={isHovered}
        data-focus={isFocused}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Label */}
        <label
          className={`
              absolute z-10 pointer-events-none origin-top-left flex-shrink-0 
              rtl:origin-top-right subpixel-antialiased block cursor-text 
              will-change-auto !duration-200 !ease-out motion-reduce:transition-none 
              transition-[transform,color,left,opacity] pe-2 max-w-full text-ellipsis overflow-hidden
              ${
                hasContent || isFocused
                  ? hasError
                    ? 'text-danger-500 pointer-events-auto scale-85 text-xs -translate-y-6 top-2'
                    : 'text-primary-600 pointer-events-auto scale-85 text-xs -translate-y-6 top-2'
                  : 'text-foreground-500 text-small top-4'
              }
              ${required ? "after:content-['*'] after:text-danger after:ms-0.5" : ''}
            `}
          data-slot="label"
          htmlFor={name}
        >
          {label}
        </label>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          placeholder={isFocused || hasContent ? placeholder : ''}
          className={`
              w-full font-normal bg-transparent !outline-none resize-none
              placeholder:text-foreground-500 focus-visible:outline-none 
              autofill:bg-transparent bg-clip-text text-small pt-6 pb-2
              min-h-0
              ${hasError ? 'text-danger-foreground' : 'text-foreground'}
            `}
          style={{
            minHeight: autoResize ? `${minRows * 1.5}rem` : `${minRows * 1.5}rem`,
            maxHeight: autoResize ? `${maxRows * 1.5}rem` : undefined,
          }}
          aria-label={label}
          aria-describedby={
            error ? `${name}-error` : description ? `${name}-description` : undefined
          }
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          name={name}
          required={required}
          disabled={disabled}
          data-slot="input"
          id={name}
          rows={autoResize ? undefined : minRows}
        />
      </div>

      {/* Character counter */}
      {characterLimit && (
        <div className="flex justify-end mt-1">
          <span className={`text-xs ${isOverLimit ? 'text-danger-500' : 'text-foreground-400'}`}>
            {characterCount}/{characterLimit}
          </span>
        </div>
      )}

      {/* Description */}
      {description && !error && (
        <p className="text-xs text-foreground-400 mt-1.5" id={`${name}-description`}>
          {description}
        </p>
      )}

      {/* Error message */}
      {error && (
        <p className="text-xs text-danger-500 mt-1.5" id={`${name}-error`}>
          {error}
        </p>
      )}
    </div>
  );
});

AnimatedTextarea.displayName = 'AnimatedTextarea';

export default AnimatedTextarea;
