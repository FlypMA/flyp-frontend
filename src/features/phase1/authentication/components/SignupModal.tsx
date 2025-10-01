// ✍️ Enhanced Signup Modal - MVP Version
// Location: src/features/authentication/components/SignupModal.tsx
// Purpose: Signup modal with role selection and custom inputs

import { Button } from '@/shared/components/buttons';
import { CustomInputField, CustomPasswordInputField } from '@/shared/components/forms';
import { authService } from '@/shared/services/auth';
import { Modal, ModalBody, ModalContent } from '@heroui/react';
import { ArrowLeft, Building2, Info, Search, Sparkles, TrendingUp, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../app/providers/auth-provider';

type UserIntent = 'buyer' | 'seller' | 'both';

interface SignupData {
  email: string;
  password: string;
  role: UserIntent;
}

interface SignupFormErrors {
  email?: string;
  password?: string;
}

const SignupModal: React.FC = () => {
  const { activeModal, closeModal, openModal, postAuthRedirect, clearRedirect } = useAuth();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState<SignupData>({ email: '', password: '', role: 'buyer' });
  const [errors, setErrors] = useState<SignupFormErrors>({});
  const [touched, setTouched] = useState<Record<keyof SignupFormErrors, boolean>>({
    email: false,
    password: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Role selection state
  const [selectedRole, setSelectedRole] = useState<UserIntent>('buyer');
  const [showRoleSelection, setShowRoleSelection] = useState(true);

  const isOpen = activeModal === 'signup';

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({ email: '', password: '', role: 'buyer' });
      setErrors({});
      setTouched({ email: false, password: false });
      setErrorMessage('');
      setShowLoginPrompt(false);
      setIsSubmitting(false);
      setSelectedRole('buyer');
      setShowRoleSelection(true);
    }
  }, [isOpen]);

  // Form validation
  const validateField = (name: keyof SignupFormErrors, value: string): string | undefined => {
    switch (name) {
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
        return undefined;
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return 'Password must contain uppercase, lowercase, and number';
        }
        return undefined;
      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: SignupFormErrors = {};

    const emailError = validateField('email', formData.email);
    const passwordError = validateField('password', formData.password);

    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle field changes
  const handleFieldChange =
    (name: keyof SignupFormErrors) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData(prev => ({ ...prev, [name]: value }));

      // Clear error when user starts typing
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
      }

      // Clear general error message
      if (errorMessage) {
        setErrorMessage('');
        setShowLoginPrompt(false);
      }
    };

  const handleFieldBlur = (name: keyof SignupFormErrors) => () => {
    setTouched(prev => ({ ...prev, [name]: true }));

    const error = validateField(name, formData[name]);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  // Role selection
  const handleRoleSelect = (role: UserIntent) => {
    setSelectedRole(role);
    setFormData(prev => ({ ...prev, role }));
    setShowRoleSelection(false);

    // Focus email input after role selection
    setTimeout(() => {
      emailInputRef.current?.focus();
    }, 100);
  };

  const handleBackToRoleSelection = () => {
    setShowRoleSelection(true);
    setErrorMessage('');
    setShowLoginPrompt(false);
  };

  // Handle signup submission
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setTouched({ email: true, password: true });
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const authResult = await authService.createAccount(
        formData.email,
        formData.password,
        formData.email, // Using email as name for now
        formData.role
      );

      if (authResult.success && authResult.user) {
        // Dispatch signup event for navigation sync
        window.dispatchEvent(
          new CustomEvent('user-signup', {
            detail: authResult.user,
          })
        );

        // Also dispatch general auth change event
        window.dispatchEvent(new CustomEvent('auth-change'));

        handleCloseModal();

        // Handle post-auth redirect
        if (postAuthRedirect) {
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
          // Redirect based on role
          const redirectUrl = formData.role === 'seller' ? '/my-business' : '/search';
          navigate(redirectUrl, { replace: true });
        }
      } else {
        setErrorMessage(
          authResult.error || 'Signup failed. Please check your information and try again.'
        );

        // Check if user already exists
        if (authResult.error?.includes('already exists') || authResult.error?.includes('409')) {
          setShowLoginPrompt(true);
        }
      }
    } catch (error) {
      // Signup failed
      setErrorMessage('Signup failed. Please check your information and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    closeModal();
    setFormData({ email: '', password: '', role: 'buyer' });
    setErrors({});
    setTouched({ email: false, password: false });
    setErrorMessage('');
    setShowLoginPrompt(false);
    setSelectedRole('buyer');
    setShowRoleSelection(true);
  };

  const switchToLogin = () => {
    openModal('login', postAuthRedirect);
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
                className="flex items-center gap-1 hover:opacity-80 transition-opacity duration-200"
              >
                <img
                  src="/UpSwitch_logo_var1.svg?v=2024.4"
                  alt="Upswitch - European SME M&A Platform"
                  width="32"
                  height="32"
                  className="logo-image transition-opacity hover:opacity-80 w-8 h-8 flex-shrink-0"
                  loading="lazy"
                  style={{
                    height: '32px',
                    objectFit: 'contain',
                    opacity: 1,
                    visibility: 'visible',
                    display: 'block',
                  }}
                />
                <span className="font-display text-xl font-light text-primary-700 leading-none mt-0.5">
                  Upswitch
                </span>
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
            <form onSubmit={handleSignup} className="h-full">
              <div className="grid md:grid-cols-2 min-h-screen">
                {/* Left Side - Role Selection or Form */}
                <div className="p-8 flex items-center justify-center bg-white min-h-full">
                  <div className="max-w-md w-full">
                    {showRoleSelection ? (
                      /* Role Selection Mode */
                      <>
                        <div className="mb-8">
                          <h1 className="text-2xl font-semibold text-slate-900 text-left">
                            What brings you here today?
                          </h1>
                          <p className="text-base text-slate-600 mt-2 text-left">
                            Already have an account?{' '}
                            <button
                              type="button"
                              onClick={switchToLogin}
                              className="text-primary-600 hover:text-primary-700 underline underline-offset-1 transition-colors font-medium"
                            >
                              Sign in
                            </button>
                          </p>
                        </div>
                        <div className="space-y-4">
                          {/* Free Valuation - Top Priority (lowest friction entry) */}
                          <button
                            onClick={() => handleRoleSelect('seller')}
                            className="w-full p-6 border-2 border-success-300 bg-gradient-to-r from-success-50 to-primary-50 rounded-xl hover:border-success-500 hover:shadow-xl transition-all duration-300 text-left group transform hover:scale-[1.02] relative overflow-hidden"
                          >
                            {/* Sparkle badge */}
                            <div className="absolute top-3 right-3 px-2 py-1 bg-success-500 text-white text-xs font-bold rounded-full">
                              FREE
                            </div>
                            <div className="flex items-start gap-4">
                              <div className="p-3 bg-success-100 rounded-lg group-hover:bg-success-200 transition-all duration-300 shadow-sm">
                                <Sparkles className="w-6 h-6 text-success-600 group-hover:scale-110 transition-transform duration-300" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-success-700 transition-colors duration-300">
                                  Get Free Valuation
                                </h3>
                                <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-300">
                                  Discover your business value with our state-of-the-art valuation
                                  engine. No obligations, instant results
                                </p>
                              </div>
                            </div>
                          </button>

                          {/* Seller Path - Primary (70% priority, aligned with nav) */}
                          <button
                            onClick={() => handleRoleSelect('seller')}
                            className="w-full p-6 border-2 border-primary-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 hover:shadow-lg transition-all duration-300 text-left group transform hover:scale-[1.02]"
                          >
                            <div className="flex items-start gap-4">
                              <div className="p-3 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-all duration-300">
                                <TrendingUp className="w-6 h-6 text-primary-600 group-hover:scale-110 transition-transform duration-300" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary-700 transition-colors duration-300">
                                  I want to sell my business
                                </h3>
                                <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-300">
                                  Get a free valuation, optimize your value, and find the right
                                  buyer when you're ready
                                </p>
                              </div>
                            </div>
                          </button>

                          {/* Buyer Path - Secondary (30%, aligned with nav) */}
                          <button
                            onClick={() => handleRoleSelect('buyer')}
                            className="w-full p-6 border-2 border-calm-200 rounded-xl hover:border-calm-500 hover:bg-calm-50 hover:shadow-lg transition-all duration-300 text-left group transform hover:scale-[1.02]"
                          >
                            <div className="flex items-start gap-4">
                              <div className="p-3 bg-calm-100 rounded-lg group-hover:bg-calm-200 transition-all duration-300">
                                <Search className="w-6 h-6 text-calm-600 group-hover:scale-110 transition-transform duration-300" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-calm-700 transition-colors duration-300">
                                  I want to buy a business
                                </h3>
                                <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-300">
                                  Browse 2,400+ verified businesses across Europe and find your
                                  perfect opportunity
                                </p>
                              </div>
                            </div>
                          </button>

                          {/* Both - Exploratory */}
                          <button
                            onClick={() => handleRoleSelect('both')}
                            className="w-full p-6 border-2 border-accent-200 rounded-xl hover:border-accent-500 hover:bg-accent-50 hover:shadow-lg transition-all duration-300 text-left group transform hover:scale-[1.02]"
                          >
                            <div className="flex items-start gap-4">
                              <div className="p-3 bg-accent-100 rounded-lg group-hover:bg-accent-200 transition-all duration-300">
                                <Building2 className="w-6 h-6 text-accent-600 group-hover:scale-110 transition-transform duration-300" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-accent-700 transition-colors duration-300">
                                  I'm exploring my options
                                </h3>
                                <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-300">
                                  Not sure yet? Get full access to explore buying, selling, or both
                                  at your own pace
                                </p>
                              </div>
                            </div>
                          </button>
                        </div>
                      </>
                    ) : (
                      /* Signup Form Mode */
                      <>
                        {/* Header */}
                        <div className="mb-8">
                          <div className="flex items-center justify-between mb-4">
                            <button
                              type="button"
                              onClick={handleBackToRoleSelection}
                              className="flex items-center text-slate-600 hover:text-slate-900 transition-colors text-sm focus:outline-none focus:text-slate-900"
                            >
                              <ArrowLeft className="w-4 h-4 mr-1" />
                              Back
                            </button>
                            {selectedRole && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                {selectedRole === 'buyer'
                                  ? 'Buyer Account'
                                  : 'Business Owner Account'}
                              </span>
                            )}
                          </div>

                          <h1 className="text-4xl font-bold text-slate-900">Create your account</h1>
                        </div>

                        <div className="flex flex-col">
                          {errorMessage && (
                            <div
                              className={`flex items-start mb-4 border-l-4 p-4 rounded-xl ${
                                showLoginPrompt
                                  ? 'bg-primary-50 border-primary-400 text-primary-700'
                                  : 'bg-red-600 border-red-600 text-red-700'
                              }`}
                            >
                              <p
                                className={`font-bold text-lg mr-2 mt-0.5 ${
                                  showLoginPrompt ? 'text-primary-600' : 'text-white'
                                }`}
                              >
                                <Info className="w-5 h-5" />
                              </p>
                              <div
                                className={`font-normal text-sm ${
                                  showLoginPrompt ? 'text-primary-800' : 'text-white'
                                }`}
                              >
                                <div className="mb-2">{errorMessage}</div>
                                {showLoginPrompt && (
                                  <div className="mt-3">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setErrorMessage('');
                                        setShowLoginPrompt(false);
                                        openModal('login');
                                      }}
                                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary-600 bg-white border border-primary-300 rounded-lg hover:bg-primary-50 hover:border-primary-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                                    >
                                      Switch to Login
                                    </button>
                                    <span className="text-primary-600 text-sm ml-2">
                                      or try a different email address
                                    </span>
                                  </div>
                                )}
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
                              autoComplete="new-password"
                              required
                            />
                          </section>

                          {/* Create Account Button */}
                          <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            disabled={isSubmitting}
                            className="w-full mt-8"
                          >
                            {isSubmitting ? 'Creating account...' : 'Create account'}
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Right Side - Image */}
                <div className="hidden md:block relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(/RecordStore.jpg)` }}
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

export default SignupModal;
