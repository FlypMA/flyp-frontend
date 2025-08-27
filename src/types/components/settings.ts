export interface SettingsFormValues {
  name: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface FieldRenderProps {
  input: any;
  meta: {
    touched: boolean;
    error?: string;
  };
  label: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}
