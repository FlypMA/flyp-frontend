import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, ModalContent, ModalBody, Link as UILink, Button } from '@heroui/react';
import { Field, Form, FormRenderProps, FieldRenderProps } from 'react-final-form';
import { X, ArrowLeft } from 'lucide-react';
import Heading1 from '../main_UI/fonts/heading1';
import { authService } from '../../services/users/authenticationService';
import UrlGeneratorService from '../../services/urlMapping/urlGeneratorService';
import CustomInputField from '../main_UI/forms/customInputField';
import CustomPasswordInputField from '../main_UI/forms/customPasswordInputtField';
import { LuInfo } from 'react-icons/lu';
import { useAuthModal } from '../../contexts/AuthModalContext';
import { BetweendealsLogo } from '../common';
import RoleSelectionCards from '../auth/RoleSelectionCards';
import { UserIntent } from '../../utils/contextDetection';
// Professional business background for M&A platform

interface SignupData {
  email: string;
  password: string;
}

interface SignupFormValues {
  email: string;
  password: string;
}

const SignupModal: React.FC = () => {
  const { activeModal, closeModal, openModal, postAuthRedirect, clearRedirect } = useAuthModal();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Role selection state
  const [selectedRole, setSelectedRole] = useState<UserIntent | null>(null);
  const [showRoleSelection, setShowRoleSelection] = useState(false);

  const isOpen = activeModal === 'signup';

  // Extract intent information from postAuthRedirect
  const detectedIntent = postAuthRedirect?.state?.detectedIntent as UserIntent | undefined;
  const confidence = postAuthRedirect?.state?.confidence as 'high' | 'medium' | 'low' | undefined;
  const intentFromParams = postAuthRedirect?.state?.intent as UserIntent | undefined;

  // Initialize role selection state based on detected intent
  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setErrorMessage('');
      setSelectedRole(null);

      // Determine if we should show role selection
      const shouldShowRoleSelection =
        intentFromParams === 'neutral' ||
        detectedIntent === 'neutral' ||
        confidence === 'low' ||
        (!detectedIntent && !intentFromParams);

      setShowRoleSelection(shouldShowRoleSelection);

      // If we have high confidence intent, pre-select it
      if (!shouldShowRoleSelection) {
        const roleToSelect = intentFromParams || detectedIntent;
        if (roleToSelect && (roleToSelect === 'buyer' || roleToSelect === 'seller')) {
          setSelectedRole(roleToSelect);
        }
      }

      console.log('🎭 SignupModal: Initialized with:', {
        detectedIntent,
        confidence,
        intentFromParams,
        shouldShowRoleSelection,
        selectedRole: intentFromParams || detectedIntent,
      });
    }
  }, [isOpen, detectedIntent, confidence, intentFromParams]);

  // Debug modal state
  useEffect(() => {
    console.log('🎭 SignupModal: activeModal =', activeModal, 'isOpen =', isOpen);
    console.log('🎭 SignupModal: postAuthRedirect =', postAuthRedirect);
  }, [activeModal, isOpen, postAuthRedirect]);

  // Handle role selection
  const handleRoleSelect = (role: UserIntent) => {
    console.log('🎯 Role selected:', role);
    setSelectedRole(role);
    setShowRoleSelection(false);
  };

  // Handle back to role selection
  const handleBackToRoleSelection = () => {
    setShowRoleSelection(true);
    setSelectedRole(null);
    setErrorMessage('');
  };

  const handleSignup = async ({ email, password }: SignupData) => {
    console.log('SignupModal: Signing up with role:', selectedRole);

    if (!email || !password) {
      setErrorMessage('Both email and password are required.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      console.log('🔑 Attempting signup with role:', selectedRole);
      // Use selected role or default to buyer
      const roleForSignup = selectedRole === 'neutral' ? 'buyer' : selectedRole || 'buyer';
      const response = await authService.createAccount(
        email,
        password,
        email.split('@')[0],
        roleForSignup
      );
      console.log('✅ Signup successful:', response);

      handleCloseModal();

      // Check if we have a redirect with preserved query
      if (postAuthRedirect) {
        console.log('🎯 Redirecting with preserved state:', postAuthRedirect);
        clearRedirect(); // Clear the redirect state
        navigate(postAuthRedirect.url, {
          state: postAuthRedirect.state,
          replace: true,
        });
      } else {
        // Default redirect to new report
        navigate(UrlGeneratorService.createNewReport());
      }
    } catch (error: any) {
      console.error('❌ Signup failed in SignupModal:', error);
      console.error('❌ Error type:', typeof error);
      console.error('❌ Error details:', {
        message: error.message,
        status: error.status,
        stack: error.stack,
      });

      let errorMsg = 'Something went wrong. Please try again later.';

      if (error.status) {
        switch (error.status) {
          case 400:
            errorMsg = 'Both email and password are required.';
            break;
          case 401:
            errorMsg = 'Invalid email or password.';
            break;
          case 409:
            errorMsg = 'An account with this email already exists.';
            break;
          case 422:
            errorMsg = 'Please enter a valid email address.';
            break;
          case 500:
            errorMsg = 'A server error occurred. Please try again later.';
            break;
          default:
            errorMsg = `An error occurred (${error.status}). Please try again.`;
            break;
        }
      } else {
        if (error.message.includes('409') || error.message.includes('already exists')) {
          errorMsg = 'An account with this email already exists.';
        } else if (error.message.includes('401') || error.message.includes('invalid')) {
          errorMsg = 'Invalid email or password.';
        } else if (error.message.includes('400')) {
          errorMsg = 'Both email and password are required.';
        } else if (error.message.includes('422')) {
          errorMsg = 'Please enter a valid email address.';
        } else if (error.message.includes('500')) {
          errorMsg = 'A server error occurred. Please try again later.';
        } else if (error.message.includes('Account creation failed')) {
          errorMsg = error.message;
        }
      }

      setErrorMessage(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isOpen && emailInputRef.current) {
      setTimeout(() => emailInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Clear error message when modal opens
  useEffect(() => {
    if (isOpen) {
      setErrorMessage('');
    }
  }, [isOpen]);

  // Custom close handler to clear error state
  const handleCloseModal = () => {
    console.log('🎭 SignupModal: Closing modal');
    setErrorMessage('');
    closeModal();
    // Scroll to top of viewport for clean user experience
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validate = (values: SignupData) => {
    const errors: Partial<SignupData> = {};
    if (!values.email) {
      errors.email = 'Email address is required.';
    }
    if (!values.password) {
      errors.password = 'Password is required.';
    }
    return errors;
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
              <button
                onClick={() => {
                  handleCloseModal();
                  navigate(UrlGeneratorService.root());
                }}
                className="hover:opacity-80 transition-opacity duration-200 p-2 rounded-lg hover:bg-slate-100"
              >
                <BetweendealsLogo variant="header" width={40} height={40} className="h-10 w-10" />
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white hover:bg-gray-50 border border-gray-200 transition-colors duration-200 shadow-sm"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            {/* Main Content */}
            <Form<SignupFormValues>
              onSubmit={handleSignup}
              validate={validate}
              render={({
                handleSubmit,
                submitting,
                pristine,
                values,
                errors,
              }: FormRenderProps<SignupFormValues>) => {
                return (
                  <form data-page="signup" onSubmit={handleSubmit} className="h-full">
                    <div className="grid md:grid-cols-2 min-h-screen">
                      {/* Left Side - Role Selection or Form */}
                      <div className="px-6 py-8 md:px-12 md:py-16 flex bg-white">
                        <div className="w-full max-w-sm mx-auto">
                          {showRoleSelection ? (
                            /* Role Selection Mode */
                            <>
                              <div className="mb-8">
                                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                                  Join BetweenDeals
                                </h1>
                                <p className="text-gray-600 text-sm">
                                  Already have an account?{' '}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      console.log(
                                        '🔄 SignupModal: Login button clicked - opening login modal'
                                      );
                                      openModal('login');
                                    }}
                                    className="text-gray-900 font-medium hover:underline focus:outline-none focus:underline"
                                  >
                                    Sign in
                                  </button>
                                </p>
                              </div>
                              <RoleSelectionCards
                                onSelect={handleRoleSelect}
                                detectedIntent={detectedIntent}
                                confidence={confidence}
                              />
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
                                    className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm focus:outline-none focus:text-gray-900"
                                  >
                                    <ArrowLeft className="w-4 h-4 mr-1" />
                                    Back
                                  </button>
                                  {selectedRole && selectedRole !== 'neutral' && (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                      {selectedRole === 'buyer'
                                        ? 'Buyer Account'
                                        : 'Seller Account'}
                                    </span>
                                  )}
                                </div>

                                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                                  Create your account
                                </h1>
                                <p className="text-gray-600 text-sm">
                                  Already have an account?{' '}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      console.log(
                                        '🔄 SignupModal: Login button clicked - opening login modal'
                                      );
                                      openModal('login');
                                    }}
                                    className="text-gray-900 font-medium hover:underline focus:outline-none focus:underline"
                                  >
                                    Sign in
                                  </button>
                                </p>
                              </div>
                            </>
                          )}

                          {!showRoleSelection && (
                            <>
                              {/* Error Message */}
                              {errorMessage && (
                                <div className="mb-6 p-4 border border-red-300 bg-red-50 rounded-lg">
                                  <div className="flex items-start">
                                    <LuInfo className="w-4 h-4 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                                    <p className="text-sm text-red-700">{errorMessage}</p>
                                  </div>
                                </div>
                              )}

                              {/* Form Fields */}
                              <div className="space-y-5">
                                <Field<string>
                                  name="email"
                                  render={(props: FieldRenderProps<string>) => (
                                    <div className="space-y-2">
                                      <label className="block text-sm font-medium text-gray-900">
                                        Email
                                      </label>
                                      <input
                                        ref={emailInputRef}
                                        type="email"
                                        className={`
                                          block w-full px-3 py-2.5 border rounded-lg text-gray-900 
                                          placeholder-gray-500 text-sm bg-white
                                          focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent
                                          transition-all duration-200
                                          ${
                                            props.meta.error && props.meta.touched
                                              ? 'border-red-300 focus:ring-red-500'
                                              : 'border-gray-300 hover:border-gray-400'
                                          }
                                        `}
                                        placeholder="Enter your email"
                                        value={props.input.value || ''}
                                        onChange={props.input.onChange}
                                        onBlur={props.input.onBlur}
                                        onFocus={props.input.onFocus}
                                        name={props.input.name}
                                      />
                                      {props.meta.error && props.meta.touched && (
                                        <p className="text-sm text-red-600 mt-1">
                                          {props.meta.error}
                                        </p>
                                      )}
                                    </div>
                                  )}
                                />

                                <Field<string>
                                  name="password"
                                  render={(props: FieldRenderProps<string>) => (
                                    <div className="space-y-2">
                                      <label className="block text-sm font-medium text-gray-900">
                                        Password
                                      </label>
                                      <div className="relative">
                                        <input
                                          ref={passwordInputRef}
                                          type={showPassword ? 'text' : 'password'}
                                          className={`
                                            block w-full px-3 py-2.5 pr-10 border rounded-lg text-gray-900 
                                            placeholder-gray-500 text-sm bg-white
                                            focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent
                                            transition-all duration-200
                                            ${
                                              props.meta.error && props.meta.touched
                                                ? 'border-red-300 focus:ring-red-500'
                                                : 'border-gray-300 hover:border-gray-400'
                                            }
                                          `}
                                          placeholder="Enter your password"
                                          value={props.input.value || ''}
                                          onChange={props.input.onChange}
                                          onBlur={props.input.onBlur}
                                          onFocus={props.input.onFocus}
                                          name={props.input.name}
                                        />
                                        <button
                                          type="button"
                                          onClick={togglePasswordVisibility}
                                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                                        >
                                          {showPassword ? (
                                            <svg
                                              className="h-4 w-4"
                                              fill="none"
                                              stroke="currentColor"
                                              viewBox="0 0 24 24"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                              />
                                            </svg>
                                          ) : (
                                            <svg
                                              className="h-4 w-4"
                                              fill="none"
                                              stroke="currentColor"
                                              viewBox="0 0 24 24"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                              />
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                              />
                                            </svg>
                                          )}
                                        </button>
                                      </div>
                                      {props.meta.error && props.meta.touched && (
                                        <p className="text-sm text-red-600 mt-1">
                                          {props.meta.error}
                                        </p>
                                      )}
                                    </div>
                                  )}
                                />

                                {/* Create Account Button */}
                                <button
                                  type="submit"
                                  disabled={isSubmitting}
                                  className="
                                    w-full flex justify-center py-2.5 px-4 border border-transparent 
                                    rounded-lg shadow-sm text-sm font-medium text-white bg-gray-900
                                    hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 
                                    focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed
                                    transition-colors duration-200
                                  "
                                >
                                  {isSubmitting ? 'Creating account...' : 'Continue'}
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Right Side - Clean Background */}
                      <div className="hidden md:block relative bg-gray-50">
                        <div className="absolute inset-0 flex items-center justify-center p-12">
                          <div className="text-center space-y-8">
                            <div className="max-w-md mx-auto">
                              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Start Your Journey
                              </h2>
                              <p className="text-gray-600 text-base leading-relaxed">
                                Join thousands of entrepreneurs and investors making successful
                                connections in the M&A marketplace.
                              </p>
                            </div>

                            {/* Clean Feature Icons */}
                            <div className="grid grid-cols-1 gap-6 pt-8 max-w-xs mx-auto">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                                  <svg
                                    className="w-4 h-4 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                </div>
                                <span className="text-sm text-gray-700">
                                  Verified opportunities
                                </span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                                  <svg
                                    className="w-4 h-4 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                  </svg>
                                </div>
                                <span className="text-sm text-gray-700">Secure transactions</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                                  <svg
                                    className="w-4 h-4 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                  </svg>
                                </div>
                                <span className="text-sm text-gray-700">Expert network</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                );
              }}
            />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SignupModal;
