export interface LoginData {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
  userType: 'seller' | 'buyer';
}

export interface SettingsFormValues {
  name: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface PasswordResetFormValues {
  email: string;
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

export interface ErrorResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export interface CustomInputFieldProps {
  input: any;
  meta: any;
  label: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}

export interface CustomPasswordInputFieldProps {
  input: any;
  meta: any;
  label: string;
  placeholder?: string;
  disabled?: boolean;
}

export interface CustomTextareaFieldProps {
  input: any;
  meta: any;
  label: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
}
