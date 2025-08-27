// =============================================================================
// FORM COMPONENTS - MAIN EXPORTS (Updated to use new UI system)
// =============================================================================

// Import the new UI system styles
import '../ui/ui-system.css';

// Export new modular UI components as primary exports
export {
  Input,
  Textarea,
  Select,
  Button,
  PrimaryButton,
  SecondaryButton,
  OutlineButton,
  GhostButton,
  DangerButton,
  FormActions,
  FormFieldWrapper,
  designTokens,
} from '../ui';

// Export types
export type {
  InputProps,
  TextareaProps,
  SelectProps,
  ButtonProps,
  FormActionsProps,
  FormFieldWrapperProps,
  BaseComponentProps,
  FormFieldProps,
  OptionItem,
} from '../ui';

// Legacy aliases for backward compatibility (deprecated - use direct imports)
export { Input as AirbnbInput } from '../ui';
export { Textarea as AirbnbTextarea } from '../ui';
export { Select as AirbnbSelect } from '../ui';
export { PrimaryButton as AirbnbPrimaryButton } from '../ui';
export { SecondaryButton as AirbnbSecondaryButton } from '../ui';
export { FormActions as AirbnbFormActions } from '../ui';

// Keep FormField for backward compatibility
export { default as FormField } from '../common/FormField';