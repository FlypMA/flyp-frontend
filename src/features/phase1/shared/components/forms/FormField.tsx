import * as React from 'react';

interface FormFieldProps {
  /**
   * The form field label
   */
  label?: string;

  /**
   * Whether the field is required
   */
  required?: boolean;

  /**
   * Help text to display below the field
   */
  helpText?: string;

  /**
   * Error message to display
   */
  error?: string;

  /**
   * The form field component (Input, Select, Textarea, etc.)
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * FormField Component
 *
 * A wrapper component that provides consistent layout and styling for form fields.
 * Ensures proper label positioning, spacing, and error handling.
 *
 * @example
 * ```tsx
 * <FormField label="Business Name" required error={errors.name}>
 *   <Input
 *     placeholder="Enter your business name"
 *     value={formData.name}
 *     onValueChange={setValue}
 *     variant="tertiary"
 *   />
 * </FormField>
 * ```
 */
const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  helpText,
  error,
  children,
  className = '',
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="form-field-input">{children}</div>

      {error && <div className="text-sm text-red-600 mt-2 font-medium">{error}</div>}

      {helpText && !error && <div className="text-sm text-gray-500 mt-2">{helpText}</div>}
    </div>
  );
};

export default FormField;
