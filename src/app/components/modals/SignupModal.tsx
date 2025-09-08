import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, ModalContent, ModalBody, Button } from '@heroui/react';
import { Field, Form, FormRenderProps, FieldRenderProps } from 'react-final-form';
import { X, ArrowLeft } from 'lucide-react';
import { authService } from '../../services/users/authenticationService';
import UrlGeneratorService from '../../services/urlMapping/urlGeneratorService';
import CustomInputField from '../main_UI/forms/customInputField';
import CustomPasswordInputField from '../main_UI/forms/customPasswordInputtField';
import { LuInfo } from 'react-icons/lu';
import { useAuthModal } from '../../contexts/AuthModalContext';
import { BetweendealsLogo } from '../common';
import RoleSelectionCards from '../auth/RoleSelectionCards';
import { UserIntent } from '../../utils/contextDetection';
import backgroundImage from '../../../assets/background4.jpg';

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
  const [showRoleSelection, setShowRoleSelection] = useState(true);

  const isOpen = activeModal === 'signup';

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setErrorMessage('');
      setSelectedRole(null);
      setShowRoleSelection(true);
    }
  }, [isOpen]);

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
      const response = await authService.createAccount(email, password, email, roleForSignup);
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
              className="absolute top-6 right-6 z-50 p-2 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
            >
              <X className="w-5 h-5 text-slate-700" />
            </button>

            {/* Main Content */}
            <Form<SignupFormValues>
              onSubmit={handleSignup}
              validate={validate}
              render={({
                handleSubmit,
                submitting: _submitting,
                pristine: _pristine,
                values: _values,
                errors: _errors,
              }: FormRenderProps<SignupFormValues>) => {
                return (
                  <form data-page="signup" onSubmit={handleSubmit} className="h-full">
                    <div className="grid md:grid-cols-2 min-h-screen">
                      {/* Left Side - Role Selection or Form */}
                      <div className="p-8 flex items-center justify-center bg-white min-h-full">
                        <div className="max-w-md w-full">
                          {showRoleSelection ? (
                            /* Role Selection Mode */
                            <>
                              <div className="mb-8">
                                <h1 className="text-2xl font-semibold text-slate-900 text-left">
                                  Join BetweenDeals
                                </h1>
                                <p className="text-base text-slate-600 mt-2 text-left">
                                  Already have an account?{' '}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      console.log(
                                        '🔄 SignupModal: Login button clicked - opening login modal'
                                      );
                                      openModal('login');
                                    }}
                                    className="text-blue-600 hover:text-blue-700 underline underline-offset-1 transition-colors font-medium"
                                  >
                                    Sign in
                                  </button>
                                </p>
                              </div>
                              <RoleSelectionCards
                                onSelect={handleRoleSelect}
                                className="max-w-sm"
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
                                    className="flex items-center text-slate-600 hover:text-slate-900 transition-colors text-sm focus:outline-none focus:text-slate-900"
                                  >
                                    <ArrowLeft className="w-4 h-4 mr-1" />
                                    Back
                                  </button>
                                  {selectedRole && selectedRole !== 'neutral' && (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                      {selectedRole === 'buyer'
                                        ? 'Buyer Account'
                                        : 'Seller Account'}
                                    </span>
                                  )}
                                </div>

                                <h1 className="text-4xl font-bold text-slate-900">
                                  Create your account
                                </h1>
                                <p className="text-base text-slate-600 mt-2">
                                  Already have an account?{' '}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      console.log(
                                        '🔄 SignupModal: Login button clicked - opening login modal'
                                      );
                                      openModal('login');
                                    }}
                                    className="text-blue-600 hover:text-blue-700 underline underline-offset-1 transition-colors font-medium"
                                  >
                                    Log in
                                  </button>
                                </p>
                              </div>
                            </>
                          )}

                          {!showRoleSelection && (
                            <>
                              <div className="flex flex-col">
                                {errorMessage && (
                                  <div className="flex items-start mb-4 bg-red-600 border-l-4 border-red-600 text-red-700 p-4 rounded-xl">
                                    <p className="font-bold text-white text-lg mr-2 mt-0.5">
                                      <LuInfo />
                                    </p>
                                    <div className="font-normal text-white text-sm">
                                      {errorMessage}
                                    </div>
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

                                <section>
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
                                </section>

                                {/* Create Account Button */}
                                <Button
                                  type="submit"
                                  color="primary"
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
                          style={{ backgroundImage: `url(${backgroundImage})` }}
                        >
                          <div className="absolute inset-0 bg-black/20"></div>
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
