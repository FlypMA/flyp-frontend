/**
 * Form Components Export
 *
 * Centralized exports for all form-related components
 * All components follow the consistent design system with floating labels
 */

// Core form components
export { default as CustomDropdown } from './CustomDropdown';
export { default as CustomInputField } from './CustomInputField';
export { default as CustomNumberInputField } from './CustomNumberInputField';
export { default as CustomPasswordInputField } from './CustomPasswordInputField';
export { default as CustomTextarea } from './CustomTextarea';

// Backward compatibility aliases
export { default as Input } from './CustomInputField';
export { default as AnimatedTextarea } from './CustomTextarea';

// Input components
export { default as CustomCheckbox } from './CustomCheckbox';
export { default as CustomFileInput } from './CustomFileInput';
export { default as CustomRadio } from './CustomRadio';
export { default as CustomSwitch } from './CustomSwitch';

// Utility components
export { default as FormField } from './FormField';
export { AutoSaveIndicator, default as FormRecovery } from './FormRecovery';

// Type exports
export type { CustomCheckboxProps } from './CustomCheckbox';
export type { CustomFileInputProps } from './CustomFileInput';
export type { CustomInputFieldProps } from './CustomInputField';
export type { CustomNumberInputFieldProps } from './CustomNumberInputField';
export type { CustomPasswordInputFieldProps } from './CustomPasswordInputField';
export type { CustomRadioProps } from './CustomRadio';
export type { CustomSwitchProps } from './CustomSwitch';
export type { CustomTextareaProps } from './CustomTextarea';
