import React, { useEffect, useState, forwardRef } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface AnimatedInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  description?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
}

const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>((props, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    label,
    type = 'text',
    placeholder = ' ',
    className = '',
    required = false,
    disabled = false,
    description,
    startContent,
    endContent,
    value = '',
    onChange,
    onFocus,
    onBlur,
    name,
    error,
  } = props;

  useEffect(() => {
    setHasContent(!!value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;
  const isPasswordField = type === 'password';
  const hasError = !!error;

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
            relative w-full inline-flex tap-highlight-transparent shadow-sm px-3 
            border-medium transition-background !duration-150 transition-colors 
            motion-reduce:transition-none min-h-10 rounded-medium flex-col 
            items-start justify-center gap-0 h-14 py-2
            ${
              hasError
                ? 'border-danger-500 data-[hover=true]:border-danger-600'
                : 'border-default-200 data-[hover=true]:border-default-400 group-data-[focus=true]:border-default-foreground'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text'}
          `}
        style={{ cursor: disabled ? 'not-allowed' : 'text' }}
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
                  : 'text-foreground-500 text-small top-1/2 -translate-y-1/2'
              }
              ${required ? "after:content-['*'] after:text-danger after:ms-0.5" : ''}
            `}
          data-slot="label"
          htmlFor={name}
        >
          {label}
        </label>

        {/* Inner wrapper */}
        <div
          className="inline-flex w-full items-center h-full box-border group-data-[has-label=true]:items-end"
          data-slot="inner-wrapper"
        >
          {/* Start content */}
          {startContent && <div className="flex items-center">{startContent}</div>}

          {/* Input */}
          <input
            ref={ref}
            type={inputType}
            placeholder={placeholder}
            className={`
                w-full font-normal bg-transparent !outline-none 
                placeholder:text-foreground-500 focus-visible:outline-none 
                file:cursor-pointer file:bg-transparent file:border-0 
                autofill:bg-transparent bg-clip-text text-small
                ${startContent ? 'data-[has-start-content=true]:ps-1.5' : ''}
                ${endContent || isPasswordField ? 'data-[has-end-content=true]:pe-1.5' : ''}
              `}
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
          />

          {/* Password toggle */}
          {isPasswordField && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="flex items-center text-default-400 hover:text-default-600 transition-colors p-1"
              disabled={disabled}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="w-4 h-4" />
              ) : (
                <AiOutlineEye className="w-4 h-4" />
              )}
            </button>
          )}

          {/* End content */}
          {endContent && !isPasswordField && <div className="flex items-center">{endContent}</div>}
        </div>
      </div>

      {/* Description */}
      {description && !error && <p className="text-xs text-foreground-400 mt-1.5">{description}</p>}

      {/* Error message */}
      {error && <p className="text-xs text-danger-500 mt-1.5">{error}</p>}
    </div>
  );
});

AnimatedInput.displayName = 'AnimatedInput';

export default AnimatedInput;
