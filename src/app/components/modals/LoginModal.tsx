import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, ModalContent, ModalBody, Link as UILink, Button } from '@heroui/react';
import { Field, Form, FormRenderProps, FieldRenderProps } from 'react-final-form';
import { X } from 'lucide-react';
import Heading1 from '../main_UI/fonts/heading1';
import { authService } from '../../services/users/authenticationService';
import UrlGeneratorService from '../../services/urlMapping/urlGeneratorService';
import CustomInputField from '../main_UI/forms/customInputField';
import CustomPasswordInputField from '../main_UI/forms/customPasswordInputtField';
import { LuInfo } from 'react-icons/lu';
import { useAuthModal } from '../../contexts/AuthModalContext';
import { BetweendealsLogo } from '../common';
// Professional business background for M&A platform

interface LoginData {
  email: string;
  password: string;
}

const LoginModal: React.FC = () => {
  const { activeModal, closeModal, openModal, postAuthRedirect, clearRedirect } = useAuthModal();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isOpen = activeModal === 'login';

  // Debug modal state
  useEffect(() => {
    console.log('🎭 LoginModal: activeModal =', activeModal, 'isOpen =', isOpen);
    console.log('🎭 LoginModal: postAuthRedirect =', postAuthRedirect);
  }, [activeModal, isOpen, postAuthRedirect]);

  const handleLogin = async ({ email, password }: LoginData) => {
    console.log('LoginModal: Logging in...');

    if (!email || !password) {
      setErrorMessage('Both email and password are required.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      console.log('🔑 Attempting login...');
      const response = await authService.login(email, password);
      console.log('✅ Login successful:', response);

      // Dispatch auth change events for navigation state synchronization
      window.dispatchEvent(new CustomEvent('auth-change'));
      console.log('📡 Dispatched auth-change event');

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
      console.error('❌ Login failed in LoginModal:', error);
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
            errorMsg = 'Both fields (email, password) are required.';
            break;
          case 401:
            errorMsg = 'Invalid email or password.';
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
        // Show more specific error messages for debugging
        if (error.message.includes('401') || error.message.includes('invalid')) {
          errorMsg = 'Invalid email or password.';
        } else if (error.message.includes('400')) {
          errorMsg = 'Both fields (email, password) are required.';
        } else if (error.message.includes('422')) {
          errorMsg = 'Please enter a valid email address.';
        } else if (error.message.includes('500')) {
          errorMsg = 'A server error occurred. Please try again later.';
        } else if (error.message.includes('token')) {
          errorMsg = `Authentication error: ${error.message}`;
        } else if (error.message.includes('verification')) {
          errorMsg = `Login successful but verification failed: ${error.message}`;
        } else {
          // In development, show the actual error message for debugging
          if (import.meta.env.DEV) {
            errorMsg = `Debug: ${error.message}`;
          }
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
    console.log('🎭 LoginModal: Closing modal');
    setErrorMessage('');
    closeModal();
    // Scroll to top of viewport for clean user experience
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validate = (values: LoginData) => {
    const errors: Partial<LoginData> = {};
    if (!values.email) {
      errors.email = 'Fill in your email address to continue.';
    }
    if (!values.password) {
      errors.password = "Your password is the key to your account, don't forget it.";
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
            <Form<LoginData>
              onSubmit={handleLogin}
              validate={validate}
              render={({ handleSubmit, submitting, pristine }: FormRenderProps<LoginData>) => (
                <form data-page="login" onSubmit={handleSubmit} className="h-full">
                  <div className="grid md:grid-cols-2 min-h-screen">
                    {/* Left Side - Form */}
                    <div className="px-6 py-8 md:px-12 md:py-16 flex bg-white">
                      <div className="w-full max-w-sm mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                            Welcome back
                          </h1>
                          <p className="text-gray-600 text-sm">
                            Don't have an account?{' '}
                            <button
                              type="button"
                              onClick={() => {
                                console.log(
                                  '🔄 LoginModal: Sign up button clicked - opening signup modal'
                                );
                                openModal('signup');
                              }}
                              className="text-gray-900 font-medium hover:underline focus:outline-none focus:underline"
                            >
                              Sign up
                            </button>
                          </p>
                        </div>

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
                                  <p className="text-sm text-red-600 mt-1">{props.meta.error}</p>
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
                                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                      </svg>
                                    ) : (
                                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                      </svg>
                                    )}
                                  </button>
                                </div>
                                {props.meta.error && props.meta.touched && (
                                  <p className="text-sm text-red-600 mt-1">{props.meta.error}</p>
                                )}
                              </div>
                            )}
                          />

                          {/* Login Button */}
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
                            {isSubmitting ? 'Signing in...' : 'Continue'}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Clean Background */}
                    <div className="hidden md:block relative bg-gray-50">
                      <div className="absolute inset-0 flex items-center justify-center p-12">
                        <div className="text-center space-y-8">
                          <div className="max-w-md mx-auto">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                              Welcome to BetweenDeals
                            </h2>
                            <p className="text-gray-600 text-base leading-relaxed">
                              Connect with opportunities in the M&A marketplace. 
                              Find the perfect business match for your next venture.
                            </p>
                          </div>
                          
                          {/* Clean Abstract Icons */}
                          <div className="flex items-center justify-center space-x-8 pt-8">
                            <div className="w-16 h-16 rounded-xl bg-gray-200 flex items-center justify-center">
                              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            </div>
                            <div className="w-16 h-16 rounded-xl bg-gray-200 flex items-center justify-center">
                              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                              </svg>
                            </div>
                            <div className="w-16 h-16 rounded-xl bg-gray-200 flex items-center justify-center">
                              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
