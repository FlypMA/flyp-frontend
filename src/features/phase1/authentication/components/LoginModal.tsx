// 🔐 Enhanced Login Modal - MVP Version
// Location: src/features/authentication/components/LoginModal.tsx
// Purpose: Login modal with custom inputs and enhanced UX

import { Button } from '@/shared/components/buttons';
import { CustomInputField, CustomPasswordInputField } from '@/shared/components/forms';
import { authService } from '@/shared/services/auth';
import { Modal, ModalBody, ModalContent } from '@heroui/react';
import { Info, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../app/providers/auth-provider';

interface LoginData {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
}

const LoginModal: React.FC = () => {
  const { activeModal, closeModal, openModal, postAuthRedirect, clearRedirect } = useAuth();
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

  const handleFieldBlur = (name: keyof LoginData) => () => {
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
      // console.log('🔑 Attempting login with:', { email: formData.email });

      const authResult = await authService.login(formData.email, formData.password);

      if (authResult.success && authResult.user) {
        // console.log('✅ Login successful');

        // Dispatch login event for navigation sync
        window.dispatchEvent(
          new CustomEvent('user-login', {
            detail: authResult.user,
          })
        );

        // Also dispatch general auth change event
        window.dispatchEvent(new CustomEvent('auth-change'));

        handleCloseModal();

        // Handle post-auth redirect
        if (postAuthRedirect) {
          // console.log('🎯 Redirecting to:', postAuthRedirect.url);
          clearRedirect();

          // Add autoOpenInquiry or autoOpenNda parameter if specified in state
          let redirectUrl = postAuthRedirect.url;
          if (postAuthRedirect.state?.autoOpenInquiry) {
            const url = new URL(postAuthRedirect.url, window.location.origin);
            url.searchParams.set('autoOpenInquiry', 'true');
            redirectUrl = url.pathname + url.search;
          } else if (postAuthRedirect.state?.autoOpenNda) {
            const url = new URL(postAuthRedirect.url, window.location.origin);
            url.searchParams.set('autoOpenNda', 'true');
            redirectUrl = url.pathname + url.search;
          }

          navigate(redirectUrl, {
            state: postAuthRedirect.state,
            replace: true,
          });
        } else {
          // Redirect based on user role
          const redirectUrl = authResult.user.role === 'seller' ? '/my-business' : '/listings';
          navigate(redirectUrl, { replace: true });
        }
      } else {
        setMessageType('error');
        setErrorMessage(authResult.error || 'Invalid email or password. Please try again.');
      }
    } catch {
      // Login failed
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
      size="full"
      backdrop="opaque"
      radius="none"
      shadow="lg"
      isDismissable={true}
      isKeyboardDismissDisabled={false}
      hideCloseButton={true}
      shouldBlockScroll={true}
      portalContainer={document.body}
      classNames={{
        wrapper: '!z-[100]',
        backdrop: '!z-[99] bg-black/80',
        base: '!z-[101] bg-white',
      }}
      motionProps={{
        variants: {
          enter: {
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: 'easeOut',
            },
          },
          exit: {
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: 'easeIn',
            },
          },
        },
      }}
    >
      <ModalContent className="bg-white m-0 rounded-none">
        <ModalBody className="p-0">
          <div className="relative min-h-screen">
            {/* Logo */}
            <div className="absolute top-6 left-6 z-50">
              <a
                href="/"
                onClick={e => {
                  e.preventDefault();
                  handleCloseModal();
                  navigate('/');
                }}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
              >
                <img
                  src="/flyp_logo.svg?v=2024.1"
                  alt="flyp - European SME M&A Platform"
                  width="32"
                  height="32"
                  className="logo-image transition-opacity hover:opacity-80 w-8 h-8"
                  loading="lazy"
                  style={{
                    height: '32px',
                    objectFit: 'contain',
                    opacity: 1,
                    visibility: 'visible',
                    display: 'block',
                  }}
                />
                <span className="text-xl font-bold text-gray-900 ml-2">flyp</span>
              </a>
            </div>

            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-6 right-6 z-50 p-2 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
            >
              <X className="w-5 h-5 text-slate-700" />
            </button>

            {/* Main Content */}
            <form onSubmit={handleLogin} className="h-full">
              <div className="grid md:grid-cols-2 min-h-screen">
                {/* Left Side - Form */}
                <div className="p-8 flex bg-white">
                  <div className="m-auto max-w-md w-full">
                    <h1 className="text-4xl font-bold text-slate-900">Welcome back</h1>
                    <p className="text-base text-slate-600 mt-2">
                      Don&apos;t have an account?{' '}
                      <button
                        type="button"
                        onClick={switchToSignup}
                        className="text-blue-600 hover:text-blue-700 underline underline-offset-1 transition-colors font-medium"
                      >
                        Sign up
                      </button>
                    </p>

                    <div className="flex flex-col mt-8">
                      {errorMessage && (
                        <div
                          className={`flex items-start mb-4 p-4 rounded-xl border-l-4 ${
                            messageType === 'info'
                              ? 'bg-blue-50 border-blue-600 text-blue-700'
                              : 'bg-red-600 border-red-600 text-red-700'
                          }`}
                        >
                          <p
                            className={`font-bold text-lg mr-2 mt-0.5 ${
                              messageType === 'info' ? 'text-blue-600' : 'text-white'
                            }`}
                          >
                            <Info className="w-5 h-5" />
                          </p>
                          <div
                            className={`font-normal text-sm ${
                              messageType === 'info' ? 'text-blue-800' : 'text-white'
                            }`}
                          >
                            {errorMessage}
                          </div>
                        </div>
                      )}

                      <section>
                        <CustomInputField
                          label="Your email address"
                          type="email"
                          name="email"
                          placeholder=" "
                          value={formData.email}
                          onChange={handleFieldChange('email')}
                          onBlur={handleFieldBlur('email')}
                          error={errors.email}
                          touched={touched.email}
                          inputRef={emailInputRef}
                          autoComplete="email"
                          required
                        />
                      </section>

                      <section className="mt-6">
                        <CustomPasswordInputField
                          label="Your password"
                          name="password"
                          placeholder=" "
                          value={formData.password}
                          onChange={handleFieldChange('password')}
                          onBlur={handleFieldBlur('password')}
                          error={errors.password}
                          touched={touched.password}
                          inputRef={passwordInputRef}
                          autoComplete="current-password"
                          required
                        />
                      </section>

                      {/* Forgot Password Link */}
                      <div className="text-left">
                        <button
                          type="button"
                          onClick={() => {
                            // console.log('Forgot password clicked');
                            handleCloseModal();
                            navigate('/password-reset');
                          }}
                          className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 underline underline-offset-2 transition-all duration-200 px-2 py-1 rounded-md"
                        >
                          Forgot your password?
                        </button>
                      </div>

                      {/* Login Button */}
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full mt-6"
                      >
                        {isSubmitting ? 'Logging in...' : 'Log in'}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Right Side - Image */}
                <div className="hidden md:block relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(/GroceryStore.jpg)` }}
                  >
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
