// CustomPasswordInputField component
import React, { useEffect, useState } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface CustomPasswordInputFieldProps extends FieldRenderProps<string> {
  label: string;
  inputRef: React.RefObject<HTMLInputElement>;
  className: string;
  placeholder: string;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
}

const CustomPasswordInputField: React.FC<CustomPasswordInputFieldProps> = ({
  input,
  meta,
  inputRef,
  label,
  className,
  placeholder,
  showPassword,
  togglePasswordVisibility,
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
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          className={`
            w-full h-14 px-4 pt-6 pb-2 pr-12 text-base text-black bg-white 
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
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-gray-900 transition-colors duration-200 p-1 rounded-lg hover:bg-gray-50"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible className="w-5 h-5" />
          ) : (
            <AiOutlineEye className="w-5 h-5" />
          )}
        </button>
      </div>
      {hasError && (
        <span className="block text-sm text-red-600 mt-2 font-medium">
          {meta.error}
        </span>
      )}
    </div>
  );
};

export default CustomPasswordInputField;
