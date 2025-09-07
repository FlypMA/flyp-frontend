import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Field, Form, FormRenderProps, FieldRenderProps } from 'react-final-form';
import CustomInputField from '../../../../components/main_UI/forms/customInputField';
import { authService } from '../../../../services/users/authenticationService';
import { Button } from '@heroui/react';
import { LuInfo } from 'react-icons/lu';

interface PasswordResetFormValues {
  email: string;
}

const PasswordReset: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (values: PasswordResetFormValues) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await authService.sendPasswordResetEmail(values.email);
      if (response.success) {
        setSuccess(response.message || 'Password reset email sent successfully!');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(response.message || 'Failed to send password reset email');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const validate = (values: PasswordResetFormValues) => {
    const errors: Partial<PasswordResetFormValues> = {};
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    return errors;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email address and we'll send you instructions to reset your password.
          </p>
        </div>

        <Form
          onSubmit={handleSubmit}
          validate={validate}
          render={({
            handleSubmit,
            submitting,
            pristine,
          }: FormRenderProps<PasswordResetFormValues>) => (
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <Field
                  name="email"
                  render={(props: FieldRenderProps<string>) => (
                    <CustomInputField
                      {...props}
                      type="email"
                      label="Email address"
                      placeholder="Enter your email"
                      inputRef={emailInputRef}
                      className=""
                    />
                  )}
                />
              </div>

              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              )}

              {success && (
                <div className="rounded-md bg-green-50 p-4">
                  <div className="text-sm text-green-700">{success}</div>
                </div>
              )}

              <div>
                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  disabled={pristine || submitting || isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Sending...' : 'Send reset instructions'}
                </Button>
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
};

export default PasswordReset;
