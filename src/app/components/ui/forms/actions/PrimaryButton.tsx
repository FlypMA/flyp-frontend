/**
 * PrimaryButton Component - Main Action Button
 * 
 * Primary action button with BetweenDeals brand gradient and consistent styling.
 * Features loading states, full-width option, and accessibility support.
 * 
 * @author BetweenDeals Platform Team
 * @version 2.0.0
 */

import React from 'react';
import { Button } from '@heroui/react';
import { cn } from '@heroui/react';
import { PrimaryButtonProps } from '../types/FormTypes';

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
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
      className={cn(
        'btn-primary',
        'bg-gradient-to-r from-pink-500 to-red-500',
        'hover:from-pink-600 hover:to-red-600',
        'text-white font-semibold rounded-xl',
        'shadow-lg hover:shadow-xl',
        'transform hover:scale-[1.02] active:scale-[0.98]',
        'transition-all duration-200',
        'disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none',
        fullWidth && 'w-full',
        className
      )}
    >
      {children}
    </Button>
  );
};
