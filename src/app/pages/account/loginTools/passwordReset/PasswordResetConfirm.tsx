import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Field, Form, FormRenderProps, FieldRenderProps } from 'react-final-form';
import CustomPasswordInputField from '../../../../components/main_UI/forms/customPasswordInputtField';
import { authService } from '../../../../services/users/authenticationService';
import { Button } from '@heroui/react';
import { LuInfo, LuCircleCheck, LuCircleX } from 'react-icons/lu';
import { BetweendealsLogo } from '../../../../components/common';

interface PasswordResetConfirmFormValues {
  password: string;
  confirmPassword: string;
}

const PasswordResetConfirm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token. Please request a new password reset.');
      return;
    }

    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, [token]);

  const handleSubmit = async (values: PasswordResetConfirmFormValues) => {
    if (!token) {
      setError('Invalid or missing reset token. Please request a new password reset.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await authService.confirmPasswordReset(
        token,
        values.password,
        values.confirmPassword
      );

      if (response.success) {
        setSuccess(
          response.message ||
            'Password reset successful! You can now log in with your new password.'
        );

        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login', {
            replace: true,
            state: { message: 'Password reset successful! Please log in with your new password.' },
          });
        }, 3000);
      } else {
        setError('Failed to reset password. Please try again.');
      }
    } catch (error: any) {
      console.error('Password reset confirm error:', error);
      setError(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const validate = (values: PasswordResetConfirmFormValues) => {
    const errors: Partial<PasswordResetConfirmFormValues> = {};

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/.test(values.password)) {
      errors.password =
        'Password must contain at least one lowercase letter, one uppercase letter, and one number';
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  // If no token, show error state
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <BetweendealsLogo
              variant="header"
              width={64}
              height={64}
              className="mx-auto h-16 w-16"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Invalid Reset Link
            </h2>
            <div className="mt-4 rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <LuCircleX className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    This password reset link is invalid or has expired. Please request a new
                    password reset.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button
                color="primary"
                size="lg"
                onClick={() => navigate('/password-reset')}
                className="w-full"
              >
                Request New Reset Link
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <BetweendealsLogo variant="header" width={64} height={64} className="mx-auto h-16 w-16" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Set New Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">Enter your new password below</p>
        </div>

        <Form
          onSubmit={handleSubmit}
          validate={validate}
          render={({
            handleSubmit,
            submitting,
            pristine,
            errors,
            values,
          }: FormRenderProps<PasswordResetConfirmFormValues>) => (
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="space-y-4">
                <Field
                  name="password"
                  render={(props: FieldRenderProps<string>) => (
                    <CustomPasswordInputField
                      {...props}
                      label="New Password"
                      placeholder="Enter your new password"
                      inputRef={passwordInputRef}
                      className=""
                      showPassword={showPassword}
                      togglePasswordVisibility={() => setShowPassword(!showPassword)}
                    />
                  )}
                />

                <Field
                  name="confirmPassword"
                  render={(props: FieldRenderProps<string>) => (
                    <CustomPasswordInputField
                      {...props}
                      label="Confirm New Password"
                      placeholder="Confirm your new password"
                      className=""
                      inputRef={confirmPasswordInputRef}
                      showPassword={showConfirmPassword}
                      togglePasswordVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                  )}
                />
              </div>

              {/* Password Strength Indicator */}
              {values?.password && (
                <div className="mt-2">
                  <div className="text-sm text-gray-600 mb-2">Password Strength:</div>
                  <div className="flex space-x-1">
                    <div
                      className={`h-2 w-1/4 rounded ${
                        values.password.length >= 8 ? 'bg-green-400' : 'bg-gray-200'
                      }`}
                    />
                    <div
                      className={`h-2 w-1/4 rounded ${
                        /[a-z]/.test(values.password) ? 'bg-green-400' : 'bg-gray-200'
                      }`}
                    />
                    <div
                      className={`h-2 w-1/4 rounded ${
                        /[A-Z]/.test(values.password) ? 'bg-green-400' : 'bg-gray-200'
                      }`}
                    />
                    <div
                      className={`h-2 w-1/4 rounded ${
                        /\d/.test(values.password) ? 'bg-green-400' : 'bg-gray-200'
                      }`}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Password must be at least 8 characters with uppercase, lowercase, and number
                  </div>
                </div>
              )}

              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <LuCircleX className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {success && (
                <div className="rounded-md bg-green-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <LuCircleCheck className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700">{success}</p>
                      <p className="text-xs text-green-600 mt-1">Redirecting to login...</p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  disabled={
                    pristine || submitting || isSubmitting || Object.keys(errors || {}).length > 0
                  }
                  className="w-full"
                >
                  {isSubmitting ? 'Updating Password...' : 'Update Password'}
                </Button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-sm text-blue-600 hover:text-blue-700 underline"
                >
                  Back to Login
                </button>
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
};

export default PasswordResetConfirm;
