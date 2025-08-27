/**
 * SecondaryButton Component - Alternative Action Button
 * 
 * Secondary action button with outline styling and consistent behavior.
 * Used for cancel, back, or alternative actions in forms.
 * 
 * @author BetweenDeals Platform Team
 * @version 2.0.0
 */

import React from 'react';
import { Button } from '@heroui/react';
import { cn } from '@heroui/react';
import { SecondaryButtonProps } from '../types/FormTypes';

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled,
  loading,
  size = 'lg',
  fullWidth = false,
  className,
}) => {
  return (
    <Button
      type={type}
      onPress={onClick}
      isDisabled={disabled}
      isLoading={loading}
      size={size}
      variant="bordered"
      className={cn(
        'btn-secondary',
        'border-2 border-gray-300 text-gray-700',
        'hover:border-gray-400 hover:bg-gray-50',
        'font-semibold rounded-xl',
        'shadow-sm hover:shadow-md',
        'transition-all duration-200',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        fullWidth && 'w-full',
        className
      )}
    >
      {children}
    </Button>
  );
};
