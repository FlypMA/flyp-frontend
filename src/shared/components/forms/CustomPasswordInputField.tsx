// 🔐 Custom Password Input Field - Password input with visibility toggle
// Location: src/shared/components/forms/CustomPasswordInputField.tsx
// Purpose: Password input with show/hide functionality and validation

import { Eye, EyeOff } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export interface CustomPasswordInputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (_e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (_e: React.FocusEvent<HTMLInputElement>) => void;
  name: string;
  className?: string;
  error?: string;
  touched?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  showPasswordStrength?: boolean;
}

const CustomPasswordInputField: React.FC<CustomPasswordInputFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  name,
  className = '',
  error,
  touched,
  inputRef,
  autoComplete = 'current-password',
  required = false,
  disabled = false,
  showPasswordStrength = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setHasContent(!!value);
  }, [value]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, text: '', color: '' };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const strengthMap = {
      0: { text: 'Very Weak', color: 'bg-red-500' },
      1: { text: 'Weak', color: 'bg-red-400' },
      2: { text: 'Fair', color: 'bg-yellow-500' },
      3: { text: 'Good', color: 'bg-yellow-400' },
      4: { text: 'Strong', color: 'bg-green-500' },
      5: { text: 'Very Strong', color: 'bg-green-600' },
    };

    return { strength, ...strengthMap[strength as keyof typeof strengthMap] };
  };

  const hasError = error && touched;
  const passwordStrength = showPasswordStrength ? getPasswordStrength(value) : null;

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
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            placeholder:text-transparent
          `}
          aria-label={label}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          name={name}
          autoComplete={autoComplete}
          required={required}
          disabled={disabled}
        />

        <label
          className={`
            absolute left-4 transition-all duration-200 pointer-events-none font-medium
            ${
              hasContent || isFocused || value
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
          disabled={disabled}
          className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-gray-900 transition-colors duration-200 p-1 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      {/* Password Strength Indicator */}
      {showPasswordStrength && value && (
        <div className="mt-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${passwordStrength?.color}`}
                style={{ width: `${((passwordStrength?.strength || 0) / 5) * 100}%` }}
              />
            </div>
            <span className="text-xs font-medium text-gray-600">{passwordStrength?.text}</span>
          </div>
          <div className="text-xs text-gray-500">
            Use 8+ characters with a mix of letters, numbers & symbols
          </div>
        </div>
      )}

      {hasError && <span className="block text-sm text-red-600 mt-2 font-medium">{error}</span>}
    </div>
  );
};

export default CustomPasswordInputField;
