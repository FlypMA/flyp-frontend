import { ComponentType, ReactNode } from 'react';

declare module 'react-final-form' {
  export interface FormRenderProps<FormValues = object> {
    handleSubmit: (event?: React.SyntheticEvent<HTMLFormElement>) => Promise<void>;
    submitting: boolean;
    pristine: boolean;
    invalid: boolean;
    values: FormValues;
    errors: Partial<Record<keyof FormValues, string>>;
  }

  export interface FieldRenderProps<FieldValue = any> {
    input: {
      name: string;
      value: FieldValue;
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
      onBlur: (event?: React.FocusEvent<HTMLElement>) => void;
      onFocus: (event?: React.FocusEvent<HTMLElement>) => void;
    };
    meta: {
      error?: string;
      touched?: boolean;
      active?: boolean;
      data?: object;
      dirty?: boolean;
      dirtySinceLastSubmit?: boolean;
      errorSinceLastSubmit?: boolean;
      initial?: FieldValue;
      invalid?: boolean;
      length?: number;
      modified?: boolean;
      modifiedSinceLastSubmit?: boolean;
      pristine?: boolean;
      submitError?: any;
      submitFailed?: boolean;
      submitSucceeded?: boolean;
      submitting?: boolean;
      touchedSinceLastSubmit?: boolean;
      valid?: boolean;
      validating?: boolean;
      visited?: boolean;
    };
  }

  export interface FormProps<FormValues = object> {
    onSubmit: (values: FormValues) => void | Promise<void>;
    validate?: (values: FormValues) => object | Promise<object>;
    render: (props: FormRenderProps<FormValues>) => ReactNode;
    initialValues?: Partial<FormValues>;
  }

  export function Form<FormValues = object>(props: FormProps<FormValues>): JSX.Element;
  export function Field<FieldValue = any>(props: {
    name: string;
    render: (props: FieldRenderProps<FieldValue>) => ReactNode;
  }): JSX.Element;
}
