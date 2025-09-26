/**
 * ✅ Profile Validation Utilities
 *
 * Validation functions for profile data and form inputs
 */

import { FIELD_VALIDATION_RULES, PROFILE_FIELDS } from '../constants';
import { Profile, UserRole } from '../types/profile.types';

// =============================================================================
// VALIDATION TYPES
// =============================================================================

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  field?: string;
}

export interface ProfileValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  warnings: Record<string, string>;
}

// =============================================================================
// FIELD VALIDATION
// =============================================================================

/**
 * Validate individual profile field
 */
export const validateField = (
  fieldId: string,
  value: any,
  required: boolean = false
): ValidationResult => {
  const field = PROFILE_FIELDS.find(f => f.id === fieldId);

  if (!field) {
    return { isValid: false, error: 'Field not found', field: fieldId };
  }

  // Check required fields
  if (required && (!value || value === '')) {
    return { isValid: false, error: `${field.label} is required`, field: fieldId };
  }

  // Skip validation if value is empty and field is not required
  if (!value || value === '') {
    return { isValid: true, field: fieldId };
  }

  // Type-specific validation
  switch (field.type) {
    case 'email':
      return validateEmail(value, fieldId);

    case 'phone':
      return validatePhone(value, fieldId);

    case 'url':
      return validateUrl(value, fieldId);

    case 'text':
    case 'textarea':
      return validateText(value, fieldId, field.validation);

    case 'number':
      return validateNumber(value, fieldId, field.validation);

    case 'date':
      return validateDate(value, fieldId);

    case 'select':
    case 'multiselect':
      return validateSelect(value, fieldId, field.options);

    default:
      return { isValid: true, field: fieldId };
  }
};

/**
 * Validate email field
 */
export const validateEmail = (value: string, fieldId: string): ValidationResult => {
  if (!FIELD_VALIDATION_RULES.email.pattern.test(value)) {
    return { isValid: false, error: FIELD_VALIDATION_RULES.email.message, field: fieldId };
  }
  return { isValid: true, field: fieldId };
};

/**
 * Validate phone field
 */
export const validatePhone = (value: string, fieldId: string): ValidationResult => {
  if (!FIELD_VALIDATION_RULES.phone.pattern.test(value)) {
    return { isValid: false, error: FIELD_VALIDATION_RULES.phone.message, field: fieldId };
  }
  return { isValid: true, field: fieldId };
};

/**
 * Validate URL field
 */
export const validateUrl = (value: string, fieldId: string): ValidationResult => {
  if (!FIELD_VALIDATION_RULES.url.pattern.test(value)) {
    return { isValid: false, error: FIELD_VALIDATION_RULES.url.message, field: fieldId };
  }
  return { isValid: true, field: fieldId };
};

/**
 * Validate text field
 */
export const validateText = (
  value: string,
  fieldId: string,
  validation?: any
): ValidationResult => {
  if (validation?.minLength && value.length < validation.minLength) {
    return {
      isValid: false,
      error: `Must be at least ${validation.minLength} characters long`,
      field: fieldId,
    };
  }
  if (validation?.maxLength && value.length > validation.maxLength) {
    return {
      isValid: false,
      error: `Must be no more than ${validation.maxLength} characters long`,
      field: fieldId,
    };
  }
  return { isValid: true, field: fieldId };
};

/**
 * Validate number field
 */
export const validateNumber = (value: any, fieldId: string, validation?: any): ValidationResult => {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Must be a valid number', field: fieldId };
  }
  if (validation?.min && numValue < validation.min) {
    return { isValid: false, error: `Must be at least ${validation.min}`, field: fieldId };
  }
  if (validation?.max && numValue > validation.max) {
    return { isValid: false, error: `Must be no more than ${validation.max}`, field: fieldId };
  }
  return { isValid: true, field: fieldId };
};

/**
 * Validate date field
 */
export const validateDate = (value: string, fieldId: string): ValidationResult => {
  const dateValue = new Date(value);
  if (isNaN(dateValue.getTime())) {
    return { isValid: false, error: 'Must be a valid date', field: fieldId };
  }
  return { isValid: true, field: fieldId };
};

/**
 * Validate select field
 */
export const validateSelect = (value: any, fieldId: string, options?: any[]): ValidationResult => {
  if (!options) {
    return { isValid: true, field: fieldId };
  }

  const validValues = options.map(option => option.value);
  if (Array.isArray(value)) {
    // Multi-select validation
    const invalidValues = value.filter(v => !validValues.includes(v));
    if (invalidValues.length > 0) {
      return {
        isValid: false,
        error: `Invalid selection: ${invalidValues.join(', ')}`,
        field: fieldId,
      };
    }
  } else {
    // Single select validation
    if (!validValues.includes(value)) {
      return { isValid: false, error: 'Invalid selection', field: fieldId };
    }
  }

  return { isValid: true, field: fieldId };
};

// =============================================================================
// PROFILE VALIDATION
// =============================================================================

/**
 * Validate entire profile
 */
export const validateProfile = (profile: Profile): ProfileValidationResult => {
  const errors: Record<string, string> = {};
  const warnings: Record<string, string> = {};
  let isValid = true;

  // Validate personal info
  Object.entries(profile.personalInfo).forEach(([key, value]) => {
    const field = PROFILE_FIELDS.find(f => f.id === key);
    const required = field?.required || false;
    const validation = validateField(key, value, required);

    if (!validation.isValid && validation.error) {
      errors[key] = validation.error;
      isValid = false;
    }
  });

  // Validate business owner data
  if (profile.businessOwnerData) {
    Object.entries(profile.businessOwnerData).forEach(([key, value]) => {
      const field = PROFILE_FIELDS.find(f => f.id === key);
      const required = field?.required || false;
      const validation = validateField(key, value, required);

      if (!validation.isValid && validation.error) {
        errors[`businessOwnerData.${key}`] = validation.error;
        isValid = false;
      }
    });
  }

  // Validate investor data
  if (profile.investorData) {
    Object.entries(profile.investorData).forEach(([key, value]) => {
      const field = PROFILE_FIELDS.find(f => f.id === key);
      const required = field?.required || false;
      const validation = validateField(key, value, required);

      if (!validation.isValid && validation.error) {
        errors[`investorData.${key}`] = validation.error;
        isValid = false;
      }
    });
  }

  // Validate shared data
  Object.entries(profile.sharedData).forEach(([key, value]) => {
    const field = PROFILE_FIELDS.find(f => f.id === key);
    const required = field?.required || false;
    const validation = validateField(key, value, required);

    if (!validation.isValid && validation.error) {
      errors[`sharedData.${key}`] = validation.error;
      isValid = false;
    }
  });

  // Add warnings for incomplete profiles
  if (profile.completion.overallPercentage < 50) {
    warnings.completion = 'Profile is less than 50% complete. Consider adding more information.';
  }

  if (!profile.personalInfo.avatar && !profile.personalInfo.avatarUrl) {
    warnings.avatar = 'Adding a professional photo can increase trust and engagement.';
  }

  if (!profile.personalInfo.bio || profile.personalInfo.bio.length < 50) {
    warnings.bio = 'A detailed bio helps others understand your background and expertise.';
  }

  return { isValid, errors, warnings };
};

// =============================================================================
// FORM VALIDATION
// =============================================================================

/**
 * Validate form data
 */
export const validateFormData = (
  formData: Record<string, any>,
  requiredFields: string[]
): ProfileValidationResult => {
  const errors: Record<string, string> = {};
  const warnings: Record<string, string> = {};
  let isValid = true;

  // Validate required fields
  requiredFields.forEach(fieldId => {
    const value = formData[fieldId];
    const field = PROFILE_FIELDS.find(f => f.id === fieldId);
    const required = field?.required || false;
    const validation = validateField(fieldId, value, required);

    if (!validation.isValid && validation.error) {
      errors[fieldId] = validation.error;
      isValid = false;
    }
  });

  // Validate all form fields
  Object.entries(formData).forEach(([key, value]) => {
    const field = PROFILE_FIELDS.find(f => f.id === key);
    if (field) {
      const required = field.required || false;
      const validation = validateField(key, value, required);

      if (!validation.isValid && validation.error) {
        errors[key] = validation.error;
        isValid = false;
      }
    }
  });

  return { isValid, errors, warnings };
};

// =============================================================================
// VALIDATION HELPERS
// =============================================================================

/**
 * Check if field is required for role
 */
export const isFieldRequiredForRole = (fieldId: string, role: UserRole): boolean => {
  const requiredFields: Record<UserRole, string[]> = {
    buyer: [
      'firstName',
      'lastName',
      'email',
      'industry',
      'country',
      'investmentCapacityMin',
      'investmentCapacityMax',
      'investmentFocus',
    ],
    seller: [
      'firstName',
      'lastName',
      'email',
      'industry',
      'country',
      'businessName',
      'businessType',
      'yearsInBusiness',
    ],
    both: [
      'firstName',
      'lastName',
      'email',
      'industry',
      'country',
      'businessName',
      'businessType',
      'yearsInBusiness',
      'investmentCapacityMin',
      'investmentCapacityMax',
      'investmentFocus',
    ],
    admin: ['firstName', 'lastName', 'email', 'country'],
  };

  return requiredFields[role]?.includes(fieldId) || false;
};

/**
 * Get validation rules for field
 */
export const getValidationRules = (fieldId: string): any => {
  const field = PROFILE_FIELDS.find(f => f.id === fieldId);
  return field?.validation || {};
};

/**
 * Get field error message
 */
export const getFieldErrorMessage = (fieldId: string, error: string): string => {
  const field = PROFILE_FIELDS.find(f => f.id === fieldId);
  const fieldName = field?.label || fieldId;
  return `${fieldName}: ${error}`;
};

/**
 * Check if value is empty
 */
export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) {
    return true;
  }
  if (typeof value === 'string') {
    return value.trim() === '';
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }
  return false;
};

/**
 * Sanitize input value
 */
export const sanitizeInput = (value: any, type: string): any => {
  if (typeof value === 'string') {
    // Remove leading/trailing whitespace
    value = value.trim();

    // Type-specific sanitization
    switch (type) {
      case 'email':
        return value.toLowerCase();
      case 'phone':
        return value.replace(/[^\d+\-\s()]/g, '');
      case 'url':
        return value.toLowerCase();
      default:
        return value;
    }
  }

  return value;
};

// =============================================================================
// VALIDATION CONSTANTS
// =============================================================================

export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  INVALID_URL: 'Please enter a valid URL',
  INVALID_NUMBER: 'Please enter a valid number',
  INVALID_DATE: 'Please enter a valid date',
  MIN_LENGTH: 'Must be at least {min} characters long',
  MAX_LENGTH: 'Must be no more than {max} characters long',
  MIN_VALUE: 'Must be at least {min}',
  MAX_VALUE: 'Must be no more than {max}',
  INVALID_SELECTION: 'Please select a valid option',
};

export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[1-9]\d{1,14}$/,
  URL: /^https?:\/\/.+/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  ALPHABETIC: /^[a-zA-Z\s]+$/,
  NUMERIC: /^\d+$/,
};
