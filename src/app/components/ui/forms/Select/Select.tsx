// =============================================================================
// SELECT COMPONENT - MODULAR, ENTERPRISE-GRADE SELECT DROPDOWN
// =============================================================================

import React, { forwardRef, useState } from 'react';
import { Select as HeroSelect, SelectItem } from '@heroui/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@heroui/react';
import {
  BaseComponentProps,
  FormFieldProps,
  ValidationProps,
  FocusProps,
  SizeProps,
  OptionItem,
} from '../../types';
import { FormFieldWrapper } from '../FormFieldWrapper/FormFieldWrapper';

// =============================================================================
// COMPONENT INTERFACE
// =============================================================================

export interface SelectProps
  extends BaseComponentProps,
    FormFieldProps,
    ValidationProps,
    FocusProps,
    SizeProps {
  /** Placeholder text */
  placeholder?: string;
  /** Array of select options */
  options: OptionItem[];
  /** Current selected value */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Change event handler */
  onChange?: (value: string) => void;
  /** Whether to allow multiple selections */
  multiple?: boolean;
  /** Whether the select is searchable */
  searchable?: boolean;
  /** Whether to clear selection */
  clearable?: boolean;
  /** Whether to autofocus */
  autoFocus?: boolean;
  /** Custom render for option */
  renderOption?: (option: OptionItem) => React.ReactNode;
}

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      // Base props
      id,
      className,
      disabled,
      'data-testid': testId,

      // Form field props
      label,
      required,
      helpText,
      error,
      name,

      // Validation props
      validate,
      validateOnBlur,
      validateOnChange,

      // Focus props
      onFocus,
      onBlur,

      // Size props
      size = 'lg',

      // Select specific props
      placeholder,
      options,
      value,
      defaultValue,
      onChange,
      multiple = false,
      searchable = false,
      clearable = false,
      autoFocus,
      renderOption,
    },
    ref
  ) => {
    // ==========================================================================
    // COMPONENT STATE
    // ==========================================================================

    const [focused, setFocused] = useState(false);
    const [validationError, setValidationError] = useState<string | undefined>();

    // ==========================================================================
    // EVENT HANDLERS
    // ==========================================================================

    const handleFocus = () => {
      setFocused(true);
      onFocus?.();
    };

    const handleBlur = () => {
      setFocused(false);

      // Run validation on blur if enabled
      if (validateOnBlur && validate && value) {
        const error = validate(value);
        setValidationError(error);
      }

      onBlur?.();
    };

    const handleSelectionChange = (keys: any) => {
      const selectedValue = Array.from(keys)[0] as string;

      // Run validation on change if enabled
      if (validateOnChange && validate && selectedValue) {
        const error = validate(selectedValue);
        setValidationError(error);
      }

      onChange?.(selectedValue);
    };

    // ==========================================================================
    // COMPUTED VALUES
    // ==========================================================================

    const currentError = error || validationError;
    const selectedKeys = value ? [value] : defaultValue ? [defaultValue] : [];

    // ==========================================================================
    // RENDER HELPERS
    // ==========================================================================

    const renderSelectItem = (option: OptionItem) => {
      const content = renderOption ? (
        renderOption(option)
      ) : (
        <div className="select-option-content">
          <div className="select-option-label font-medium text-gray-900">{option.label}</div>
          {option.description && (
            <div className="select-option-description text-sm text-gray-500 mt-1">
              {option.description}
            </div>
          )}
        </div>
      );

      return (
        <SelectItem
          key={option.value}
          textValue={option.value}
          isDisabled={option.disabled}
          classNames={{
            base: cn(
              'select-item',
              'rounded-lg mx-1 my-0.5 px-3 py-2 cursor-pointer',
              'hover:bg-gray-100 data-[selectable=true]:focus:bg-gray-100',
              'data-[selected=true]:bg-black data-[selected=true]:text-white',
              'transition-colors duration-150',
              option.disabled && 'opacity-50 cursor-not-allowed'
            ),
          }}
        >
          {content}
        </SelectItem>
      );
    };

    // ==========================================================================
    // RENDER
    // ==========================================================================

    return (
      <FormFieldWrapper
        label={label}
        required={required}
        helpText={helpText}
        error={currentError}
        className={className}
        focused={focused}
      >
        <HeroSelect
          ref={ref}
          id={id}
          name={name}
          placeholder={placeholder}
          selectedKeys={selectedKeys}
          onSelectionChange={handleSelectionChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          isDisabled={disabled}
          variant="bordered"
          autoFocus={autoFocus}
          data-testid={testId}
          selectorIcon={<ChevronDown className="w-4 h-4 text-gray-500" />}
          classNames={{
            base: 'w-full',
            trigger: cn(
              'select-trigger',
              'transition-all duration-200',
              'bg-white border-2 rounded-md shadow-sm',

              // Size variants
              {
                'h-10 px-3': size === 'sm',
                'h-12 px-4': size === 'md',
                'h-14 px-4': size === 'lg',
              },

              // State variants
              {
                'border-gray-300 hover:border-gray-400': !currentError && !focused,
                'border-black shadow-sm': (focused || 'data-[open=true]') && !currentError,
                'border-red-500 hover:border-red-500': currentError,
                'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60': disabled,
              },

              // Custom overrides
              'data-[focus=true]:border-black data-[focus=true]:shadow-none',
              'data-[open=true]:border-black data-[open=true]:shadow-none',
              currentError &&
                'border-red-500 hover:border-red-500 data-[focus=true]:border-red-500 data-[open=true]:border-red-500'
            ),
            value: cn('text-gray-900', {
              'text-sm': size === 'sm',
              'text-base': size === 'md' || size === 'lg',
            }),
            selectorIcon: 'text-gray-500',
            popoverContent: cn(
              'select-popover',
              'rounded-xl border-2 border-gray-200 shadow-xl p-2',
              'max-h-64 overflow-auto'
            ),
            listbox: 'p-0',
          }}
        >
          {options.map(renderSelectItem)}
        </HeroSelect>
      </FormFieldWrapper>
    );
  }
);

Select.displayName = 'Select';

export default Select;
