/**
 * 🎭 Centered Modal Foundation
 * Location: src/shared/components/modals/foundations/CenteredModal.tsx
 * Purpose: Reusable centered modal component (like Airbnb style)
 *
 * @example
 * <CenteredModal
 *   isOpen={isOpen}
 *   onClose={onClose}
 *   title="Route Details"
 *   size="lg"
 *   showHeader={true}
 * >
 *   <MapContent />
 * </CenteredModal>
 */

import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import { X } from 'lucide-react';
import React from 'react';

interface CenteredModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Function to call when modal should close */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  /** Whether to show header */
  showHeader?: boolean;
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Custom header content */
  headerContent?: React.ReactNode;
  /** Modal content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Whether modal can be closed by clicking outside */
  isDismissable?: boolean;
  /** Custom close button aria label */
  closeButtonAriaLabel?: string;
  /** Footer content */
  footer?: React.ReactNode;
  /** Custom modal body padding */
  bodyPadding?: 'none' | 'sm' | 'md' | 'lg';
}

export const CenteredModal: React.FC<CenteredModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  showHeader = true,
  showCloseButton = true,
  headerContent,
  children,
  className = '',
  isDismissable = true,
  closeButtonAriaLabel = 'Close modal',
  footer,
  bodyPadding = 'md',
}) => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      hideCloseButton
      isDismissable={isDismissable}
      classNames={{
        base: 'max-h-[90vh] sm:max-h-[90vh]',
        wrapper: 'items-center justify-center p-0 sm:p-4',
        body: `${paddingClasses[bodyPadding]} overflow-y-auto max-h-[100vh] sm:max-h-[70vh]`,
      }}
      className={`m-0 sm:m-auto w-full h-full sm:w-auto sm:h-auto sm:rounded-lg ${className}`}
    >
      <ModalContent className="relative">
        {/* Header */}
        {showHeader && (
          <ModalHeader className="flex items-center justify-between pb-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              {title && <h2 className="text-xl font-semibold text-gray-900">{title}</h2>}
              {headerContent}
            </div>

            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 sm:p-2 min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center"
                aria-label={closeButtonAriaLabel}
              >
                <X className="w-6 h-6 sm:w-5 sm:h-5 text-gray-600" />
              </button>
            )}
          </ModalHeader>
        )}

        {/* Close button when no header */}
        {!showHeader && showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center"
            aria-label={closeButtonAriaLabel}
          >
            <X className="w-6 h-6 sm:w-5 sm:h-5 text-gray-600" />
          </button>
        )}

        {/* Content */}
        <ModalBody className={`${showHeader ? 'pt-6' : 'pt-0'} ${footer ? 'pb-0' : ''}`}>
          {children}
        </ModalBody>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">{footer}</div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CenteredModal;
