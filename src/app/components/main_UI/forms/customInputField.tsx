import React, { useEffect, useState } from 'react';
import { FieldRenderProps } from 'react-final-form';

interface CustomInputFieldProps extends FieldRenderProps<string> {
  label: string;
  type: string;
  inputRef: React.RefObject<HTMLInputElement>;
  className: string;
  placeholder: string;
}

const CustomInputField: React.FC<CustomInputFieldProps> = ({
  input,
  meta,
  label,
  type,
  inputRef,
  className,
  placeholder,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  const updateStateBasedOnValue = () => {
    if (inputRef.current) {
      setHasContent(!!inputRef.current.value);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (input?.onChange) {
      input.onChange(e);
    }
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (input?.onBlur) {
      input.onBlur(e);
    }
    setIsFocused(false);
    updateStateBasedOnValue();
  };

  useEffect(() => {
    setHasContent(!!(input?.value || ''));
  }, [input?.value]);

  const hasError = meta?.error && meta?.touched;

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
          value={input?.value || ''}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          name={input?.name || ''}
        />
        <label
          className={`
            absolute left-4 transition-all duration-200 pointer-events-none font-medium
            ${hasContent || isFocused || input?.value 
              ? 'top-2 text-xs text-gray-700' 
              : 'top-1/2 -translate-y-1/2 text-sm text-gray-500'
            }
            ${hasError ? 'text-red-600' : ''}
          `}
        >
          {label}
        </label>
      </div>
      {hasError && (
        <span className="block text-sm text-red-600 mt-2 font-medium">
          {meta.error}
        </span>
      )}
    </div>
  );
};

export default CustomInputField;
