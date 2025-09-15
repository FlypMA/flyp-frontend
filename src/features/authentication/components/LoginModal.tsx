// 🔐 Enhanced Login Modal - MVP Version
// Location: src/features/authentication/components/LoginModal.tsx
// Purpose: Login modal with custom inputs and enhanced UX

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, ModalContent, ModalBody, Button } from '@heroui/react';
import { X, Info, Building2 } from 'lucide-react';
import { useAuthModal } from '../hooks/useAuthModal';
import { CustomInputField, CustomPasswordInputField } from './forms';

interface LoginData {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
}

const LoginModal: React.FC = () => {
  const { activeModal, closeModal, openModal, postAuthRedirect, clearRedirect } = useAuthModal();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState<LoginData>({ email: '', password: '' });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [touched, setTouched] = useState<Record<keyof LoginData, boolean>>({
    email: false,
    password: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [messageType, setMessageType] = useState<'error' | 'info'>('error');

  const isOpen = activeModal === 'login';

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({ email: '', password: '' });
      setErrors({});
      setTouched({ email: false, password: false });
      setErrorMessage('');
      setIsSubmitting(false);

      // Focus email input after modal animation
      setTimeout(() => {
        emailInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Form validation
  const validateField = (name: keyof LoginData, value: string): string | undefined => {
    switch (name) {
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
        return undefined;
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return undefined;
      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};

    Object.keys(formData).forEach(key => {
      const fieldKey = key as keyof LoginData;
      const error = validateField(fieldKey, formData[fieldKey]);
      if (error) {
        newErrors[fieldKey] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle field changes
  const handleFieldChange = (name: keyof LoginData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }

    // Clear general error message
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleFieldBlur = (name: keyof LoginData) => (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(prev => ({ ...prev, [name]: true }));

    const error = validateField(name, formData[name]);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  // Handle login submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setTouched({ email: true, password: true });
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      console.log('🔑 Attempting login with:', { email: formData.email });

      // TODO: Implement actual authentication service
      // const authResult = await authService.login(formData);

      // Mock successful login for now
      const mockSuccess =
        formData.email === 'test@example.com' && formData.password === 'password123';

      if (mockSuccess) {
        console.log('✅ Login successful');

        // Dispatch login event for navigation sync
        window.dispatchEvent(
          new CustomEvent('user-login', {
            detail: { email: formData.email, name: 'Test User', role: 'buyer' },
          })
        );

        handleCloseModal();

        // Handle post-auth redirect
        if (postAuthRedirect) {
          console.log('🎯 Redirecting to:', postAuthRedirect.url);
          clearRedirect();
          navigate(postAuthRedirect.url, {
            state: postAuthRedirect.state,
            replace: true,
          });
        } else {
          navigate('/dashboard');
        }
      } else {
        setMessageType('error');
        setErrorMessage('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('❌ Login failed:', error);
      setMessageType('error');
      setErrorMessage('Login failed. Please check your credentials and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    closeModal();
    setFormData({ email: '', password: '' });
    setErrors({});
    setTouched({ email: false, password: false });
    setErrorMessage('');
  };

  const switchToSignup = () => {
    openModal('signup', postAuthRedirect);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      size="2xl"
      classNames={{
        base: 'bg-transparent shadow-none',
        backdrop: 'bg-black/50 backdrop-blur-sm',
        wrapper: 'flex items-center justify-center p-4',
      }}
      hideCloseButton
    >
      <ModalContent className="bg-transparent shadow-none max-w-4xl w-full">
        <ModalBody className="p-0">
          <div className="flex bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh]">
            {/* Left Side - Background Image */}
            <div className="hidden md:flex md:w-1/2 relative">
              <img
                src="/src/assets/ad.jpg"
                alt="BetweenDeals Platform"
                className="w-full h-full object-cover"
                style={{ minHeight: '600px' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <h2 className="text-2xl font-bold mb-2">Welcome back to BetweenDeals</h2>
                <p className="text-lg opacity-90">
                  Continue your journey in the European M&A marketplace
                </p>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center relative">
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Logo */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">BetweenDeals</span>
              </div>

              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
                <p className="text-gray-600">Sign in to your account to continue</p>
              </div>

              {/* Error/Info Message */}
              {errorMessage && (
                <div
                  className={`mb-6 p-4 rounded-lg border flex items-start gap-3 ${
                    messageType === 'error'
                      ? 'bg-red-50 border-red-200 text-red-700'
                      : 'bg-blue-50 border-blue-200 text-blue-700'
                  }`}
                >
                  <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{errorMessage}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-6">
                <CustomInputField
                  label="Email Address"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleFieldChange('email')}
                  onBlur={handleFieldBlur('email')}
                  error={errors.email}
                  touched={touched.email}
                  inputRef={emailInputRef}
                  autoComplete="email"
                  required
                />

                <CustomPasswordInputField
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleFieldChange('password')}
                  onBlur={handleFieldBlur('password')}
                  error={errors.password}
                  touched={touched.password}
                  inputRef={passwordInputRef}
                  autoComplete="current-password"
                  required
                />

                {/* Forgot Password Link */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    onClick={() => {
                      // TODO: Implement forgot password
                      console.log('Forgot password clicked');
                    }}
                  >
                    Forgot your password?
                  </button>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-200"
                >
                  {isSubmitting ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              {/* Switch to Signup */}
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <button
                    onClick={switchToSignup}
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    Create one now
                  </button>
                </p>
              </div>

              {/* Terms */}
              <div className="mt-6 text-xs text-gray-500 text-center">
                By signing in, you agree to our{' '}
                <a href="/terms-conditions" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy-policy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
