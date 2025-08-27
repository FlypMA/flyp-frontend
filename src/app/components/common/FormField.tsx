import React from 'react';

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
 *     variant="bordered"
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
    <div className={`form-field-wrapper ${className}`}>
      {label && (
        <label className="form-field-label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="form-field-input">{children}</div>

      {error && <div className="form-field-error">{error}</div>}

      {helpText && !error && <div className="form-field-help">{helpText}</div>}
    </div>
  );
};

export default FormField;
