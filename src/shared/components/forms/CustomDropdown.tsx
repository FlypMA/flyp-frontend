// 📋 Custom Dropdown Component - Enhanced dropdown with floating label
// Location: src/shared/components/forms/CustomDropdown.tsx
// Purpose: Reusable dropdown component with HeroUI styling and floating label

import { ChevronDown } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface CustomDropdownProps {
  /**
   * Label for the dropdown
   */
  label: string;

  /**
   * Placeholder text when no option is selected
   */
  placeholder?: string;

  /**
   * Array of dropdown options
   */
  options: DropdownOption[];

  /**
   * Currently selected value
   */
  value?: string;

  /**
   * Callback when selection changes
   */
  onChange: (value: string) => void;

  /**
   * Whether the field is required
   */
  required?: boolean;

  /**
   * Whether the dropdown is disabled
   */
  disabled?: boolean;

  /**
   * Error message to display
   */
  error?: string;

  /**
   * Whether the field has been touched (for validation)
   */
  touched?: boolean;

  /**
   * Name attribute for the dropdown
   */
  name?: string;

  /**
   * Custom CSS classes
   */
  className?: string;

  /**
   * Reference to the dropdown element
   */
  dropdownRef?: React.RefObject<HTMLDivElement>;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  placeholder = 'Select an option',
  options,
  value,
  onChange,
  required = false,
  disabled = false,
  error,
  touched = false,
  name,
  className = '',
  dropdownRef,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const internalRef = useRef<HTMLDivElement>(null);
  const ref = dropdownRef || internalRef;

  // Find the selected option
  const selectedOption = options.find(option => option.value === value);
  const hasValue = !!selectedOption;
  const isFilled = hasValue || isFocused;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setIsFocused(!isOpen);
    }
  };

  const handleOptionSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setIsFocused(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className={`w-full flex flex-col ${className}`} ref={ref}>
      {/* Main Dropdown Button */}
      <button
        type="button"
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          // Delay to allow option selection
          setTimeout(() => setIsFocused(false), 150);
        }}
        disabled={disabled}
        name={name}
        className={`
          relative px-3 w-full inline-flex shadow-xs outline-solid outline-transparent 
          tap-highlight-transparent border-medium border-default-200 
          data-[hover=true]:border-default-400 data-[open=true]:border-default-foreground 
          data-[focus=true]:border-default-foreground rounded-medium flex-col items-start 
          justify-center gap-0 transition-colors motion-reduce:transition-none h-14 min-h-14 py-2
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${isOpen ? 'border-default-foreground' : ''}
          ${isFocused ? 'border-default-foreground' : ''}
          ${error && touched ? 'border-danger' : ''}
          hover:border-default-400
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={`${label}-label ${label}-value`}
      >
        {/* Floating Label */}
        <label
          className={`
            block absolute z-10 flex-shrink-0 subpixel-antialiased pointer-events-none 
            cursor-pointer will-change-auto origin-top-left transition-all duration-200 ease-out
            ${
              isFilled
                ? 'text-default-600 scale-85 -translate-y-[calc(50%+var(--heroui-font-size-small)/2-6px-var(--heroui-border-width-medium))]'
                : 'text-foreground-500 text-small'
            }
            ${required ? "after:content-['*'] after:text-danger after:ms-0.5" : ''}
            pe-2 max-w-full text-ellipsis overflow-hidden
          `}
          id={`${label}-label`}
        >
          {label}
        </label>

        {/* Inner Content */}
        <div className="inline-flex h-fit w-[calc(100%-theme(spacing.6))] min-h-4 items-center gap-1.5 box-border group-data-[has-label=true]:pt-4">
          <span
            className={`
              font-normal w-full text-start text-small truncate
              ${hasValue ? 'text-default-foreground' : 'text-foreground-500'}
            `}
            id={`${label}-value`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        {/* Dropdown Icon */}
        <ChevronDown
          className={`
            absolute end-3 w-4 h-4 transition-transform duration-150 ease
            ${isOpen ? 'rotate-180' : ''}
            ${disabled ? 'text-foreground-300' : 'text-foreground-500'}
          `}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="relative z-50 mt-1 w-full">
          <div className="absolute w-full bg-white border border-default-200 rounded-medium shadow-lg max-h-60 overflow-auto">
            {options.map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleOptionSelect(option.value)}
                disabled={option.disabled}
                className={`
                  w-full px-3 py-2 text-left text-small transition-colors
                  ${
                    option.disabled
                      ? 'text-foreground-300 cursor-not-allowed'
                      : 'text-default-foreground hover:bg-default-100 cursor-pointer'
                  }
                  ${option.value === value ? 'bg-primary-50 text-primary-600' : ''}
                `}
                role="option"
                aria-selected={option.value === value}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && touched && (
        <span className="block text-sm text-red-600 mt-2 font-medium">{error}</span>
      )}
    </div>
  );
};

export default CustomDropdown;
