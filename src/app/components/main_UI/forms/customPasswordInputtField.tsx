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

  const inputErrorClass = meta?.error && meta?.touched ? 'error-ring' : '';

  return (
    <div className={`relative mt-6 ${className}`}>
      <div className="custom-input-group flex flex-col items-center border border-gray-900 bg-default-100 rounded-xl shadow-sm">
        <input
          ref={inputRef}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          className={`w-full h-16 px-4 text-white pb-0 text-md bg-transparent text-foreground-500 focus:outline-none focus-visible:outline-none border-none rounded-xl focus:ring-2 focus:ring-white custom-input ${
            hasContent || isFocused
              ? 'bg-filled text-md pt-4 pl-4'
              : 'bg-transparent text-md pt-3 pl-4'
          } ${inputErrorClass}`}
          style={{ paddingRight: '3rem' }}
          aria-label={label}
          value={input?.value || ''}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          name={input?.name || ''}
        />
        <label
          className={`absolute top-7 left-4 text-zinc-400 text-md transition-all duration-500 pointer-events-none custom-label ${
            hasContent || isFocused ? 'text-xs -translate-y-.5' : '-translate-y-1.5'
          }`}
        >
          {label}
        </label>
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute top-7 right-4 text-zinc-400 hover:text-zinc-300 -translate-y-1.5"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible className="w-5 h-5" />
          ) : (
            <AiOutlineEye className="w-5 h-5" />
          )}
        </button>
      </div>
      {meta?.error && meta?.touched && (
        <span className="text-xs text-zinc-500 mt-2">{meta.error}</span>
      )}
    </div>
  );
};

export default CustomPasswordInputField;
