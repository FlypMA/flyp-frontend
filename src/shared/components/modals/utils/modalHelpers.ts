/**
 * 🛠️ Modal Helper Utilities
 * Location: src/shared/components/modals/utils/modalHelpers.ts
 * Purpose: Common utilities for modal components
 */

import React, { useEffect, useState } from 'react';

/**
 * Modal size configurations
 */
export const MODAL_SIZES = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  full: 'max-w-full',
} as const;

/**
 * Modal z-index layers
 */
export const MODAL_Z_INDEX = {
  backdrop: 'z-40',
  modal: 'z-50',
  dropdown: 'z-60',
  tooltip: 'z-70',
} as const;

/**
 * Hook to handle escape key press for modal closing
 */
export const useEscapeKey = (isOpen: boolean, onClose: () => void) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);
};

/**
 * Hook to handle body scroll lock when modal is open
 */
export const useBodyScrollLock = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);
};

/**
 * Hook to handle focus management for modals
 */
export const useFocusManagement = (isOpen: boolean, modalRef: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement?.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement?.focus();
              e.preventDefault();
            }
          }
        }
      };

      // Focus first element when modal opens
      firstElement?.focus();

      // Add tab key listener
      document.addEventListener('keydown', handleTabKey);

      return () => {
        document.removeEventListener('keydown', handleTabKey);
      };
    }
  }, [isOpen, modalRef]);
};

/**
 * Generate modal class names based on configuration
 */
export const generateModalClasses = (
  size: keyof typeof MODAL_SIZES = 'md',
  customClasses: string = ''
): string => {
  return `${MODAL_SIZES[size]} ${customClasses}`.trim();
};

/**
 * Modal animation variants for consistent transitions
 */
export const MODAL_ANIMATIONS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.3 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.2 },
  },
} as const;

/**
 * Common modal event handlers
 */
export const createModalHandlers = (onClose: () => void) => ({
  onBackdropClick: (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  },
  onEscapePress: (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  },
});

/**
 * Validate modal props for development
 */
export const validateModalProps = (props: Record<string, any>) => {
  if (process.env.NODE_ENV === 'development') {
    if (typeof props.isOpen !== 'boolean') {
      console.warn('Modal: isOpen prop should be a boolean');
    }
    if (typeof props.onClose !== 'function') {
      console.warn('Modal: onClose prop should be a function');
    }
  }
};

/**
 * Modal state management helpers
 */
export const createModalState = (initialOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const toggleModal = () => setIsOpen(prev => !prev);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  };
};
