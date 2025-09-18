// ✍️ Enhanced Signup Modal - MVP Version
// Location: src/features/authentication/components/SignupModal.tsx
// Purpose: Signup modal with role selection and custom inputs

import { Button, Modal, ModalBody, ModalContent } from '@heroui/react';
import { ArrowLeft, Building2, Info, Search, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../app/providers/auth-provider';
import { CustomInputField, CustomPasswordInputField } from './forms';

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

  const handleFieldBlur =
    (name: keyof SignupFormErrors) => (e: React.FocusEvent<HTMLInputElement>) => {
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
      console.log('📝 Attempting signup with:', { email: formData.email, role: formData.role });

      // TODO: Implement actual authentication service
      // const authResult = await authService.signup(formData);

      // Mock successful signup for now
      const mockSuccess = formData.email && formData.password.length >= 8;

      if (mockSuccess) {
        console.log('✅ Signup successful');

        // Dispatch signup event for navigation sync
        window.dispatchEvent(
          new CustomEvent('user-signup', {
            detail: { email: formData.email, role: formData.role },
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
          // Redirect based on role
          const redirectUrl = formData.role === 'seller' ? '/my-business' : '/listings';
          navigate(redirectUrl);
        }
      } else {
        setErrorMessage('Signup failed. Please check your information and try again.');
      }
    } catch (error) {
      console.error('❌ Signup failed:', error);
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
      }}
    >
      <ModalContent className="bg-transparent shadow-none max-w-4xl w-full">
        <ModalBody className="p-0">
          <div className="flex bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh]">
            {/* Left Side - Background Image */}
            <div className="hidden md:flex md:w-1/2 relative">
              <img
                src="/src/assets/ad.jpg"
                alt="flyp Platform"
                className="w-full h-full object-cover"
                style={{ minHeight: '600px' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <h2 className="text-2xl font-bold mb-2">Join flyp</h2>
                <p className="text-lg opacity-90">
                  Start your journey in the European M&A marketplace
                </p>
              </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center relative">
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Back Button (when not in role selection) */}
              {!showRoleSelection && (
                <button
                  onClick={handleBackToRoleSelection}
                  className="absolute top-4 left-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                  aria-label="Back to role selection"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}

              {/* Logo */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">flyp</span>
              </div>

              {showRoleSelection ? (
                /* Role Selection View */
                <div>
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">How can we help you?</h1>
                    <p className="text-gray-600">Choose your primary goal to get started</p>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={() => handleRoleSelect('buyer')}
                      className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                          <Search className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            I'm looking to buy a business
                          </h3>
                          <p className="text-gray-600 text-sm">
                            Access our marketplace of verified businesses for sale across Europe
                          </p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleRoleSelect('seller')}
                      className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-200 text-left group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                          <Building2 className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            I'm looking to sell my business
                          </h3>
                          <p className="text-gray-600 text-sm">
                            Get your business valued and connect with qualified buyers
                          </p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleRoleSelect('both')}
                      className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 text-left group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                          <Building2 className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            Both - I'm exploring opportunities
                          </h3>
                          <p className="text-gray-600 text-sm">
                            Access the full platform to buy and sell businesses
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Login Link */}
                  <div className="mt-8 text-center">
                    <p className="text-gray-600">
                      Already have an account?{' '}
                      <button
                        onClick={switchToLogin}
                        className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                      >
                        Sign in here
                      </button>
                    </p>
                  </div>
                </div>
              ) : (
                /* Signup Form View */
                <div>
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
                    <p className="text-gray-600">
                      {selectedRole === 'buyer' && 'Start exploring businesses for sale'}
                      {selectedRole === 'seller' &&
                        'Get your business in front of qualified buyers'}
                      {selectedRole === 'both' && 'Access the full flyp platform'}
                    </p>
                  </div>

                  {/* Error/Info Message */}
                  {errorMessage && (
                    <div className="mb-6 p-4 rounded-lg border bg-red-50 border-red-200 text-red-700 flex items-start gap-3">
                      <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{errorMessage}</span>
                    </div>
                  )}

                  {/* Signup Form */}
                  <form onSubmit={handleSignup} className="space-y-6">
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
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleFieldChange('password')}
                      onBlur={handleFieldBlur('password')}
                      error={errors.password}
                      touched={touched.password}
                      inputRef={passwordInputRef}
                      autoComplete="new-password"
                      required
                      showPasswordStrength={true}
                    />

                    {/* Signup Button */}
                    <Button
                      type="submit"
                      isLoading={isSubmitting}
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-200"
                    >
                      {isSubmitting ? 'Creating account...' : 'Create Account'}
                    </Button>
                  </form>
                </div>
              )}

              {/* Switch to Login */}
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <button
                    onClick={switchToLogin}
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    Sign in
                  </button>
                </p>
              </div>

              {/* Terms */}
              <div className="mt-6 text-xs text-gray-500 text-center">
                By creating an account, you agree to our{' '}
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

export default SignupModal;
