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

  const inputErrorClass = meta?.error && meta?.touched ? 'error-ring' : '';

  return (
    <div className="relative">
      <div
        className={`custom-input-group flex flex-col items-center border-2 border-gray-300 bg-white rounded-xl shadow-sm hover:border-gray-400 focus-within:border-blue-500 focus-within:shadow-md transition-all duration-200  ${className}`}
      >
        <input
          ref={inputRef}
          type={type}
          placeholder=""
          className={`w-full h-16 px-4 text-black pb-2 text-md bg-transparent focus:outline-none focus-visible:outline-none border-none rounded-xl custom-input ${hasContent || isFocused ? 'pt-6' : 'pt-4'} ${inputErrorClass} placeholder:text-gray-400`}
          aria-label={label}
          value={input?.value || ''}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          name={input?.name || ''}
        />
        <label
          className={`absolute left-4 ${hasContent || isFocused ? 'text-blue-600 text-xs top-2' : 'text-gray-500 top-5 text-sm'} transition-all duration-300 pointer-events-none custom-label`}
        >
          {label}
        </label>
      </div>
      {meta?.error && meta?.touched && (
        <span className="text-xs text-zinc-500 mt-2">{meta.error}</span>
      )}
    </div>
  );
};

export default CustomInputField;
