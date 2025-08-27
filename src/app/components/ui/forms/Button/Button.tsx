// =============================================================================
// BUTTON COMPONENT - MODULAR, ENTERPRISE-GRADE BUTTONS
// =============================================================================

import React, { forwardRef } from 'react';
import { Button as HeroButton } from '@heroui/react';
import { cn } from '@heroui/react';
import { 
  BaseComponentProps, 
  SizeProps,
  LoadingProps,
  ButtonType
} from '../../types';

// =============================================================================
// COMPONENT INTERFACE
// =============================================================================

export interface ButtonProps 
  extends BaseComponentProps, 
          SizeProps,
          LoadingProps {
  /** Button content */
  children: React.ReactNode;
  /** Button type */
  type?: ButtonType;
  /** Click event handler */
  onClick?: () => void;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /** Whether button takes full width */
  fullWidth?: boolean;
  /** Icon to display at start of button */
  startIcon?: React.ReactNode;
  /** Icon to display at end of button */
  endIcon?: React.ReactNode;
  /** Whether button is in loading state */
  isLoading?: boolean;
  /** Custom loading spinner */
  loadingSpinner?: React.ReactNode;
}

// =============================================================================
// VARIANT STYLES
// =============================================================================

const getVariantStyles = (variant: ButtonProps['variant'], disabled?: boolean) => {
  const baseStyles = "font-semibold rounded-md transition-all duration-200 shadow-sm hover:shadow-md";
  
  if (disabled) {
    return cn(baseStyles, "opacity-60 cursor-not-allowed transform-none");
  }
  
  switch (variant) {
    case 'primary':
      return cn(
        baseStyles,
        "bg-gradient-to-r from-pink-500 to-red-500",
        "hover:from-pink-600 hover:to-red-600",
        "text-white shadow-lg hover:shadow-xl",
        "transform hover:scale-[1.02] active:scale-[0.98]"
      );
      
    case 'secondary':
      return cn(
        baseStyles,
        "bg-gray-100 hover:bg-gray-200",
        "text-gray-900 border border-gray-200",
        "hover:border-gray-300"
      );
      
    case 'outline':
      return cn(
        baseStyles,
        "bg-white hover:bg-gray-50",
        "text-gray-700 border-2 border-gray-300",
        "hover:border-gray-400"
      );
      
    case 'ghost':
      return cn(
        baseStyles,
        "bg-transparent hover:bg-gray-100",
        "text-gray-700 shadow-none",
        "hover:shadow-sm"
      );
      
    case 'danger':
      return cn(
        baseStyles,
        "bg-red-600 hover:bg-red-700",
        "text-white shadow-lg hover:shadow-xl",
        "transform hover:scale-[1.02] active:scale-[0.98]"
      );
      
    default:
      return cn(
        baseStyles,
        "bg-gray-100 hover:bg-gray-200",
        "text-gray-900 border border-gray-200"
      );
  }
};

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  // Base props
  id,
  className,
  disabled,
  'data-testid': testId,
  
  // Size props
  size = 'md',
  
  // Loading props
  loading,
  loadingText,
  
  // Button specific props
  children,
  type = 'button',
  onClick,
  variant = 'secondary',
  fullWidth = false,
  startIcon,
  endIcon,
  isLoading,
  loadingSpinner,
}, ref) => {
  // ==========================================================================
  // COMPUTED VALUES
  // ==========================================================================
  
  const isInLoadingState = loading || isLoading;
  const isDisabled = disabled || isInLoadingState;
  
  const buttonContent = isInLoadingState ? (
    <>
      {loadingSpinner}
      {loadingText || children}
    </>
  ) : (
    <>
      {startIcon}
      {children}
      {endIcon}
    </>
  );

  // ==========================================================================
  // RENDER
  // ==========================================================================
  
  return (
    <HeroButton
      ref={ref}
      id={id}
      type={type}
      onPress={onClick}
      isDisabled={isDisabled}
      isLoading={isInLoadingState}
      size={size}
      data-testid={testId}
      startContent={!isInLoadingState ? startIcon : undefined}
      endContent={!isInLoadingState ? endIcon : undefined}
      className={cn(
        'button-component',
        getVariantStyles(variant, isDisabled),
        fullWidth && 'w-full',
        className
      )}
    >
      {isInLoadingState ? (loadingText || children) : children}
    </HeroButton>
  );
});

Button.displayName = 'Button';

// =============================================================================
// VARIANT COMPONENTS
// =============================================================================

export const PrimaryButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="primary" {...props} />
);

export const SecondaryButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="secondary" {...props} />
);

export const OutlineButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="outline" {...props} />
);

export const GhostButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="ghost" {...props} />
);

export const DangerButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="danger" {...props} />
);

PrimaryButton.displayName = 'PrimaryButton';
SecondaryButton.displayName = 'SecondaryButton';
OutlineButton.displayName = 'OutlineButton';
GhostButton.displayName = 'GhostButton';
DangerButton.displayName = 'DangerButton';

export default Button;
