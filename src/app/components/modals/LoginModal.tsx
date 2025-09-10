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
import backgroundImage from '../../../assets/background4.jpg';

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
        navigate(UrlGeneratorService.dashboard());
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
              className="absolute top-6 right-6 z-50 p-2 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
            >
              <X className="w-5 h-5 text-slate-700" />
            </button>

            {/* Main Content */}
            <Form<LoginData>
              onSubmit={handleLogin}
              validate={validate}
              render={({ handleSubmit, submitting, pristine }: FormRenderProps<LoginData>) => (
                <form data-page="login" onSubmit={handleSubmit} className="h-full">
                  <div className="grid md:grid-cols-2 min-h-screen">
                    {/* Left Side - Form */}
                    <div className="p-8 flex bg-white">
                      <div className="m-auto max-w-md w-full">
                        <Heading1 className="text-slate-900">Welcome back</Heading1>
                        <p className="text-base text-slate-600 mt-2">
                          Don't have an account?{' '}
                          <button
                            type="button"
                            onClick={() => {
                              console.log(
                                '🔄 LoginModal: Sign up button clicked - opening signup modal'
                              );
                              openModal('signup');
                            }}
                            className="text-blue-600 hover:text-blue-700 underline underline-offset-1 transition-colors font-medium"
                          >
                            Sign up
                          </button>
                        </p>

                        <div className="flex flex-col mt-8">
                          {errorMessage && (
                            <div className="flex items-start mb-4 bg-red-600 border-l-4 border-red-600 text-red-700 p-4 rounded-xl">
                              <p className="font-bold text-white text-lg mr-2 mt-0.5">
                                <LuInfo />
                              </p>
                              <div className="font-normal text-white text-sm">{errorMessage}</div>
                            </div>
                          )}

                          <section>
                            <Field<string>
                              name="email"
                              render={(props: FieldRenderProps<string>) => (
                                <CustomInputField
                                  {...props}
                                  label="Your email address"
                                  type="email"
                                  placeholder=" "
                                  inputRef={emailInputRef}
                                  className=""
                                />
                              )}
                            />
                          </section>

                          <Field<string>
                            name="password"
                            render={(props: FieldRenderProps<string>) => (
                              <CustomPasswordInputField
                                {...props}
                                label="Your password"
                                inputRef={passwordInputRef}
                                className=""
                                placeholder=" "
                                showPassword={showPassword}
                                togglePasswordVisibility={togglePasswordVisibility}
                              />
                            )}
                          />

                          {/* Forgot Password Link */}
                          <div className="text-right mt-2">
                            <button
                              type="button"
                              onClick={() => {
                                console.log(
                                  '🔄 LoginModal: Forgot password clicked - navigating to reset'
                                );
                                handleCloseModal();
                                navigate('/password-reset');
                              }}
                              className="text-sm text-blue-600 hover:text-blue-700 underline underline-offset-1 transition-colors"
                            >
                              Forgot your password?
                            </button>
                          </div>

                          {/* Login Button */}
                          <Button
                            type="submit"
                            color="primary"
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
                        style={{ backgroundImage: `url(${backgroundImage})` }}
                      >
                        <div className="absolute inset-0 bg-black/20"></div>
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
