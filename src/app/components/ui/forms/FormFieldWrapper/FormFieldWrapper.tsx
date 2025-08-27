// =============================================================================
// FORM FIELD WRAPPER - SHARED WRAPPER FOR ALL FORM COMPONENTS
// =============================================================================

import React from 'react';
import { cn } from '@heroui/react';
import { designTokens } from '../../design-tokens';

// =============================================================================
// COMPONENT INTERFACE
// =============================================================================

export interface FormFieldWrapperProps {
  /** Field label */
  label?: string;
  /** Whether field is required */
  required?: boolean;
  /** Help text displayed below field */
  helpText?: string;
  /** Error message to display */
  error?: string;
  /** Additional CSS classes */
  className?: string;
  /** Child form component */
  children: React.ReactNode;
  /** Whether the field is currently focused */
  focused?: boolean;
  /** Custom label element */
  labelElement?: React.ReactNode;
}

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

export const FormFieldWrapper: React.FC<FormFieldWrapperProps> = ({
  label,
  required = false,
  helpText,
  error,
  className = '',
  children,
  focused = false,
  labelElement,
}) => {
  return (
    <div className={cn('form-field', className)}>
      {/* Label */}
      {(label || labelElement) && (
        <div className="form-field-label-wrapper mb-2">
          {labelElement || (
            <label className={cn(
              'form-field-label',
              'block text-sm font-semibold leading-tight',
              'text-gray-900 transition-colors duration-200',
              focused && 'text-gray-900',
              error && 'text-red-600'
            )}>
              {label}
              {required && (
                <span 
                  className="form-field-required text-red-500 ml-1" 
                  aria-label="required"
                >
                  *
                </span>
              )}
            </label>
          )}
        </div>
      )}

      {/* Form Control */}
      <div className={cn(
        'form-field-control',
        'relative w-full',
        focused && 'form-field-focused',
        error && 'form-field-error'
      )}>
        {children}
      </div>

      {/* Error Message */}
      {error && (
        <div className={cn(
          'form-field-error-message',
          'mt-2 text-sm font-medium text-red-600',
          'animate-in fade-in duration-200'
        )}>
          {error}
        </div>
      )}

      {/* Help Text */}
      {helpText && !error && (
        <div className={cn(
          'form-field-help-text',
          'mt-2 text-sm text-gray-600 leading-relaxed'
        )}>
          {helpText}
        </div>
      )}
    </div>
  );
};

export default FormFieldWrapper;
