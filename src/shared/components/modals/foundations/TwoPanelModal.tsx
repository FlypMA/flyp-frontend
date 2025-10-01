/**
 * 🎭 Two-Panel Modal Foundation
 * Location: src/shared/components/modals/foundations/TwoPanelModal.tsx
 * Purpose: Reusable two-panel modal for authentication and feature onboarding
 *
 * @example
 * <TwoPanelModal
 *   isOpen={isOpen}
 *   onClose={onClose}
 *   leftPanel={<LoginForm />}
 *   rightPanel={<WelcomeContent />}
 *   leftPanelWidth="md"
 * />
 */

import { Modal, ModalBody, ModalContent } from '@heroui/react';
import { X } from 'lucide-react';
import React from 'react';

interface TwoPanelModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Function to call when modal should close */
  onClose: () => void;
  /** Content for the left panel */
  leftPanel: React.ReactNode;
  /** Content for the right panel */
  rightPanel: React.ReactNode;
  /** Width of the left panel */
  leftPanelWidth?: 'sm' | 'md' | 'lg';
  /** Background image for right panel */
  rightPanelBackground?: string;
  /** Whether modal can be closed by clicking outside */
  isDismissable?: boolean;
  /** Custom close button aria label */
  closeButtonAriaLabel?: string;
  /** Additional CSS classes */
  className?: string;
}

export const TwoPanelModal: React.FC<TwoPanelModalProps> = ({
  isOpen,
  onClose,
  leftPanel,
  rightPanel,
  leftPanelWidth = 'md',
  rightPanelBackground,
  isDismissable = true,
  closeButtonAriaLabel = 'Close modal',
  className = '',
}) => {
  const leftPanelWidthClasses = {
    sm: 'w-80', // 320px
    md: 'w-96', // 384px
    lg: 'w-[28rem]', // 448px
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      hideCloseButton
      isDismissable={isDismissable}
      classNames={{
        base: 'max-h-screen',
        wrapper: 'items-center justify-center p-0',
        body: 'p-0',
      }}
      className={className}
    >
      <ModalContent className="h-screen max-h-screen rounded-none max-w-none w-full">
        <ModalBody className="flex flex-col sm:flex-row h-full p-0">
          {/* Left Panel - Form Content */}
          <div
            className={`w-full sm:${leftPanelWidthClasses[leftPanelWidth]} flex-shrink-0 bg-white relative`}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center"
              aria-label={closeButtonAriaLabel}
            >
              <X className="w-6 h-6 sm:w-5 sm:h-5 text-gray-600" />
            </button>

            {/* Left Panel Content */}
            <div className="h-full overflow-y-auto">{leftPanel}</div>
          </div>

          {/* Right Panel - Visual Content */}
          <div
            className="hidden sm:flex flex-1 bg-gray-100 relative overflow-hidden"
            style={
              rightPanelBackground
                ? {
                    backgroundImage: `url(${rightPanelBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }
                : undefined
            }
          >
            {/* Overlay for better text readability when background image is used */}
            {rightPanelBackground && <div className="absolute inset-0 bg-black bg-opacity-20" />}

            {/* Right Panel Content */}
            <div className="relative z-10 h-full">{rightPanel}</div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TwoPanelModal;
