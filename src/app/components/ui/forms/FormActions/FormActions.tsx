// =============================================================================
// FORM ACTIONS COMPONENT - BUTTON GROUP CONTAINER
// =============================================================================

import React from 'react';
import { cn } from '@heroui/react';
import { AlignmentType } from '../../types';

// =============================================================================
// COMPONENT INTERFACE
// =============================================================================

export interface FormActionsProps {
  /** Action buttons */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Alignment of buttons */
  align?: AlignmentType;
  /** Whether to stack buttons vertically on mobile */
  stackOnMobile?: boolean;
  /** Custom spacing between buttons */
  spacing?: 'sm' | 'md' | 'lg';
  /** Whether to reverse button order */
  reverse?: boolean;
}

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

export const FormActions: React.FC<FormActionsProps> = ({
  children,
  className,
  align = 'left',
  stackOnMobile = true,
  spacing = 'md',
  reverse = false,
}) => {
  return (
    <div
      className={cn(
        'form-actions',
        'flex pt-6',
        
        // Alignment variants
        {
          'justify-start': align === 'left',
          'justify-center': align === 'center',
          'justify-end': align === 'right',
          'justify-between': align === 'between',
          'justify-around': align === 'around',
        },
        
        // Spacing variants
        {
          'gap-2': spacing === 'sm',
          'gap-3': spacing === 'md',
          'gap-4': spacing === 'lg',
        },
        
        // Mobile stacking
        stackOnMobile && 'flex-col sm:flex-row',
        
        // Reverse order
        reverse && 'flex-row-reverse',
        
        className
      )}
    >
      {children}
    </div>
  );
};

export default FormActions;
