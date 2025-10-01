/**
 * 🎭 Fullscreen Modal Foundation
 * Location: src/shared/components/modals/foundations/FullscreenModal.tsx
 * Purpose: Reusable fullscreen modal component for multi-step flows
 *
 * @example
 * <FullscreenModal
 *   isOpen={isOpen}
 *   onClose={onClose}
 *   title="Business Onboarding"
 *   currentStep={2}
 *   totalSteps={5}
 *   showProgress={true}
 * >
 *   <StepContent />
 * </FullscreenModal>
 */

import { Modal, ModalBody, ModalContent } from '@heroui/react';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { SecondaryButton } from '../../buttons';

interface FullscreenModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Function to call when modal should close */
  onClose: () => void;
  /** Modal title */
  title?: string | React.ReactNode;
  /** Current step number (for progress indication) */
  currentStep?: number;
  /** Total number of steps */
  totalSteps?: number;
  /** Whether to show progress bar */
  showProgress?: boolean;
  /** Whether to show back button */
  showBackButton?: boolean;
  /** Function to call when back button is clicked */
  onBack?: () => void;
  /** Custom header content */
  headerContent?: React.ReactNode;
  /** Whether to show the default header (default: true) */
  showHeader?: boolean;
  /** Modal content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Whether modal can be closed by clicking outside */
  isDismissable?: boolean;
  /** Custom close button aria label */
  closeButtonAriaLabel?: string;
}

export const FullscreenModal: React.FC<FullscreenModalProps> = ({
  isOpen,
  onClose,
  title,
  currentStep,
  totalSteps,
  showProgress = false,
  showBackButton = false,
  onBack,
  headerContent,
  showHeader = true,
  children,
  className = '',
  isDismissable = true,
  closeButtonAriaLabel = 'Close modal',
}) => {
  const progressPercentage = currentStep && totalSteps ? (currentStep / totalSteps) * 100 : 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      hideCloseButton
      isDismissable={isDismissable}
      classNames={{
        base: 'max-h-screen',
        wrapper: 'items-start justify-center p-0',
        body: 'p-0',
      }}
      className={className}
    >
      <ModalContent className="h-screen max-h-screen rounded-none">
        <ModalBody className="flex flex-col h-full p-0">
          {/* Header */}
          {showHeader && (
            <header className="flex-shrink-0 bg-white border-b border-gray-200 px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {showBackButton && onBack && (
                    <button
                      onClick={onBack}
                      className="p-2 min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center"
                      aria-label="Go back"
                    >
                      <ArrowLeft className="w-6 h-6 sm:w-5 sm:h-5 text-gray-600" />
                    </button>
                  )}

                  <div>
                    {title &&
                      (typeof title === 'string' ? (
                        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
                      ) : (
                        title
                      ))}
                    {showProgress && currentStep && totalSteps && (
                      <p className="text-sm text-gray-500 mt-1">
                        Step {currentStep} of {totalSteps}
                      </p>
                    )}
                  </div>
                </div>

                {headerContent && (
                  <div className="flex items-center space-x-4">{headerContent}</div>
                )}

                <SecondaryButton onClick={onClose} size="sm" aria-label={closeButtonAriaLabel}>
                  Back
                </SecondaryButton>
              </div>

              {/* Progress Bar */}
              {showProgress && (
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              )}
            </header>
          )}

          {/* Content */}
          <main className="flex-1 bg-gray-50 overflow-hidden">{children}</main>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FullscreenModal;
