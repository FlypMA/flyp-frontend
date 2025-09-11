import React, { useEffect, useState, forwardRef } from 'react';
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

  const {
    label,
    placeholder = ' ',
    className = '',
    required = false,
    disabled = false,
    description,
    minRows = 3,
    maxRows = 8,
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

  useEffect(() => {
    setHasContent(!!value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isReactFinalForm) {
      props.input.onChange(e);
    } else {
      props.onChange?.(e.target.value);
    }
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

  const hasError = !!error;

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
                ? 'border-danger-500 data-[hover=true]:border-danger-600'
                : 'border-default-200 data-[hover=true]:border-default-400 group-data-[focus=true]:border-default-foreground'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text'}
          `}
        style={{
          cursor: disabled ? 'not-allowed' : 'text',
          minHeight: `${minRows * 1.5 + 2}rem`,
        }}
        data-slot="input-wrapper"
        data-hover={isFocused}
        data-focus={isFocused}
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
                  ? 'text-default-600 pointer-events-auto scale-85 text-xs -translate-y-6 top-2'
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
          ref={ref}
          placeholder={placeholder}
          className={`
              w-full font-normal bg-transparent !outline-none resize-none
              placeholder:text-foreground-500 focus-visible:outline-none 
              autofill:bg-transparent bg-clip-text text-small pt-6 pb-2
              min-h-0
            `}
          style={{
            minHeight: `${minRows * 1.5}rem`,
            maxHeight: `${maxRows * 1.5}rem`,
          }}
          aria-label={label}
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          name={name}
          required={required}
          disabled={disabled}
          data-slot="input"
          id={name}
          rows={minRows}
        />
      </div>

      {/* Description */}
      {description && !error && <p className="text-xs text-foreground-400 mt-1.5">{description}</p>}

      {/* Error message */}
      {error && <p className="text-xs text-danger-500 mt-1.5">{error}</p>}
    </div>
  );
});

AnimatedTextarea.displayName = 'AnimatedTextarea';

export default AnimatedTextarea;
