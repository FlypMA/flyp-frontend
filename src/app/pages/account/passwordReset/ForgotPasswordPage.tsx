import { useUI } from '@/app/providers/UIProvider';
import { Button } from '@/shared/components/buttons/Button';
import { Card } from '@/shared/components/cards/Card';
import { Input } from '@/shared/components/forms';
import { logger } from '@/shared/utils/logger';
import { ArrowLeft, Mail } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addNotification } = useUI();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      addNotification('error', 'Please enter your email address');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement password reset API call
      logger.info('Password reset requested for:', email);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsSubmitted(true);
      addNotification('success', 'Password reset email sent!');
    } catch (error) {
      logger.error("Error occurred", error);
      addNotification('error', 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card>
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
          <p className="text-gray-600 mb-6">We've sent password reset instructions to {email}</p>
          <div className="space-y-3">
            <p className="text-sm text-gray-500">
              Didn't receive the email? Check your spam folder or
            </p>
            <Button variant="tertiary" onClick={() => setIsSubmitted(false)} className="w-full">
              Try again
            </Button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/auth/login"
            className="inline-flex items-center text-primary-600 hover:text-primary-500"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to login
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Reset your password</h2>
        <p className="mt-2 text-gray-600">
          Enter your email address and we'll send you a link to reset your password
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          label="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoComplete="email"
          placeholder="Enter your email address"
          onBlur={() => {}}
          name="email"
        />

        <Button type="submit" variant="primary" size="md" loading={isLoading} className="w-full">
          Send Reset Link
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link
          to="/auth/login"
          className="inline-flex items-center text-primary-600 hover:text-primary-500"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to login
        </Link>
      </div>
    </Card>
  );
};

export default ForgotPasswordPage;

// Named export for compatibility
export { ForgotPasswordPage };
