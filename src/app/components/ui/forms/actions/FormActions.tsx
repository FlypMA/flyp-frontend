/**
 * FormActions Component - Action Button Container
 * 
 * Consistent container for form action buttons with flexible alignment
 * and responsive behavior for mobile devices.
 * 
 * @author BetweenDeals Platform Team
 * @version 2.0.0
 */

import React from 'react';
import { cn } from '@heroui/react';
import { FormActionsProps } from '../types/FormTypes';

export const FormActions: React.FC<FormActionsProps> = ({
  children,
  className,
  align = 'left',
  stack = false,
}) => {
  return (
    <div
      className={cn(
        'form-actions',
        'flex gap-3 pt-6',
        stack ? 'flex-col' : 'flex-row',
        {
          'justify-start': align === 'left',
          'justify-center': align === 'center',
          'justify-end': align === 'right',
          'justify-between': align === 'between',
          'justify-around': align === 'around',
        },
        className
      )}
    >
      {children}
    </div>
  );
};
