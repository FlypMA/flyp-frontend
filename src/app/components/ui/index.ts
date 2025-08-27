// =============================================================================
// UI COMPONENT LIBRARY - MAIN EXPORTS
// =============================================================================

// Design System
export * from './design-tokens';
export * from './types';

// Form Components
export { Input } from './forms/Input/Input';
export { Textarea } from './forms/Textarea/Textarea';
export { Select } from './forms/Select/Select';
export { FormFieldWrapper } from './forms/FormFieldWrapper/FormFieldWrapper';

// Button Components
export { 
  Button,
  PrimaryButton,
  SecondaryButton, 
  OutlineButton,
  GhostButton,
  DangerButton
} from './forms/Button/Button';

export { FormActions } from './forms/FormActions/FormActions';

// FAQ Components
export { FAQAccordion, FAQItem, FAQBadge, FAQCategory } from './FAQ';

// Clean Form Components (without wrappers)
export { CleanInput, CleanTextarea, CleanSelect } from './forms/CleanComponents';

// Component Types
export type { InputProps } from './forms/Input/Input';
export type { TextareaProps } from './forms/Textarea/Textarea';
export type { SelectProps } from './forms/Select/Select';
export type { ButtonProps } from './forms/Button/Button';
export type { FormActionsProps } from './forms/FormActions/FormActions';
export type { FormFieldWrapperProps } from './forms/FormFieldWrapper/FormFieldWrapper';

// FAQ Component Types
export type { 
  FAQ, 
  FAQCategoryType, 
  FAQBadgeProps, 
  FAQItemProps, 
  FAQAccordionProps, 
  FAQCategoryProps 
} from './FAQ';

// Clean Component Types
export type { 
  CleanInputProps, 
  CleanTextareaProps, 
  CleanSelectProps, 
  SelectOption 
} from './forms/CleanComponents';

// =============================================================================
// CONVENIENCE EXPORTS FOR COMMON PATTERNS
// =============================================================================

// Alias exports for backward compatibility
export { Input as UIInput } from './forms/Input/Input';
export { Textarea as UITextarea } from './forms/Textarea/Textarea';
export { Select as UISelect } from './forms/Select/Select';
export { PrimaryButton as UIPrimaryButton } from './forms/Button/Button';
export { SecondaryButton as UISecondaryButton } from './forms/Button/Button';
