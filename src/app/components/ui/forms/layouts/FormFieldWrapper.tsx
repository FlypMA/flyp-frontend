/**
 * FormFieldWrapper Component - Consistent Field Layout
 * 
 * Provides consistent layout and styling wrapper for all form fields.
 * Handles label positioning, error states, help text, and accessibility.
 * 
 * @author BetweenDeals Platform Team
 * @version 2.0.0
 */

import React from 'react';
import { cn } from '@heroui/react';

interface FormFieldWrapperProps {
  /** Field label */
  label?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Help text displayed below the field */
  helpText?: string;
  /** Error message to display */
  error?: string;
  /** Additional CSS classes */
  className?: string;
  /** Form field content */
  children: React.ReactNode;
  /** Whether the field is currently focused */
  focused?: boolean;
}

export const FormFieldWrapper: React.FC<FormFieldWrapperProps> = ({
  label,
  required,
  helpText,
  error,
  className = '',
  children,
  focused = false,
}) => {
  return (
    <div className={cn('form-field', className)}>
      {label && (
        <label className="form-field-label">
          {label}
          {required && <span className="form-field-required">*</span>}
        </label>
      )}
      
      <div className={cn(
        'form-field-input',
        focused && 'form-field-focused',
        error && 'form-field-error'
      )}>
        {children}
      </div>

      {error && (
        <div className="form-field-error-text">
          {error}
        </div>
      )}

      {helpText && !error && (
        <div className="form-field-help-text">
          {helpText}
        </div>
      )}
    </div>
  );
};
