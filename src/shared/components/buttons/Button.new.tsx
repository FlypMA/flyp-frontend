// 🔘 Button Component - Caregiver Brand Design System
// Location: src/shared/components/buttons/Button.tsx
// Purpose: Unified button implementation following the Caregiver brand archetype

import * as React from 'react';
import type { ButtonProps } from '../types';

/**
 * Button Component - Caregiver Brand Implementation
 * 
 * ✅ Follows the Caregiver brand archetype:
 * - Warm, trustworthy colors that reduce anxiety
 * - Softer radii for approachable feel
 * - Clear visual hierarchy that guides users gently
 * - Accessible contrast for all users
 * - Consistent with brand package design tokens
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  color,
  disabled = false,
  loading = false,
  isLoading = false,
  isDisabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  startContent,
  endContent,
  className = '',
  onClick,
  onPress,
  type = 'button',
  radius,
  isIconOnly = false,
  ...props
}) => {
  // Base button styles following Caregiver brand principles
  const baseClasses = [
    'inline-flex items-center justify-center',
    'font-semibold', // Caregiver brand uses semibold for buttons
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'border-0 outline-none',
  ].join(' ');

  // Get variant classes using brand colors
  const getVariantClasses = () => {
    const isDisabledState = disabled || isDisabled || loading || isLoading;
    
    switch (variant) {
      case 'primary':
        return [
          isDisabledState ? 'bg-primary-300' : 'bg-primary-500',
          'text-white',
          'hover:bg-primary-600',
          'focus:ring-primary-500',
          'shadow-sm hover:shadow-md',
        ].join(' ');

      case 'secondary':
        return [
          isDisabledState ? 'bg-neutral-200' : 'bg-white',
          isDisabledState ? 'text-neutral-100' : 'text-neutral-900',
          'border border-neutral-300',
          'hover:bg-neutral-100 hover:border-neutral-400',
          'focus:ring-neutral-500',
        ].join(' ');

      case 'supportive':
        return [
          isDisabledState ? 'bg-calm-300' : 'bg-calm-500',
          'text-white',
          'hover:bg-calm-600',
          'focus:ring-calm-500',
          'shadow-sm hover:shadow-md',
        ].join(' ');

      case 'subtle':
        return [
          'bg-transparent',
          isDisabledState ? 'text-accent-300' : 'text-accent-600',
          'border border-transparent',
          'hover:bg-accent-50',
          'focus:ring-accent-500',
        ].join(' ');

      case 'outline':
        return [
          'bg-transparent',
          isDisabledState ? 'text-neutral-400' : 'text-neutral-700',
          'border border-neutral-300',
          'hover:bg-neutral-50 hover:border-neutral-400',
          'focus:ring-neutral-500',
        ].join(' ');

      case 'ghost':
        return [
          'bg-transparent',
          isDisabledState ? 'text-neutral-400' : 'text-neutral-600',
          'hover:bg-neutral-100 hover:text-neutral-900',
          'focus:ring-neutral-500',
        ].join(' ');

      case 'danger':
        return [
          isDisabledState ? 'bg-error-300' : 'bg-error-500',
          'text-white',
          'hover:bg-error-600',
          'focus:ring-error-500',
          'shadow-sm hover:shadow-md',
        ].join(' ');

      case 'light':
        return [
          isDisabledState ? 'bg-neutral-200' : 'bg-neutral-100',
          isDisabledState ? 'text-neutral-400' : 'text-neutral-700',
          'hover:bg-neutral-200',
          'focus:ring-neutral-500',
        ].join(' ');

      case 'bordered':
        return [
          'bg-transparent',
          isDisabledState ? 'text-neutral-400' : 'text-neutral-700',
          'border border-neutral-300',
          'hover:bg-neutral-50 hover:border-neutral-400',
          'focus:ring-neutral-500',
        ].join(' ');

      case 'flat':
        return [
          isDisabledState ? 'bg-neutral-200' : 'bg-neutral-50',
          isDisabledState ? 'text-neutral-400' : 'text-neutral-700',
          'hover:bg-neutral-100',
          'focus:ring-neutral-500',
        ].join(' ');

      default:
        return [
          'bg-primary-500',
          'text-white',
          'hover:bg-primary-600',
          'focus:ring-primary-500',
        ].join(' ');
    }
  };

  // Get size classes
  const getSizeClasses = () => {
    if (isIconOnly) {
      const iconSizes = {
        xs: 'w-6 h-6 p-1',
        sm: 'w-8 h-8 p-1.5',
        md: 'w-10 h-10 p-2',
        lg: 'w-12 h-12 p-2.5',
        xl: 'w-14 h-14 p-3',
      };
      return iconSizes[size];
    }

    const sizes = {
      xs: 'px-2.5 py-1.5 text-xs',
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-4 py-2 text-base',
      xl: 'px-6 py-3 text-base',
    };
    return sizes[size];
  };

  // Get radius classes - Caregiver brand uses softer radii
  const getRadiusClasses = () => {
    if (radius) {
      const radiusClasses = {
        none: 'rounded-none',
        sm: 'rounded-lg',
        md: 'rounded-xl',
        lg: 'rounded-2xl',
        full: 'rounded-full',
      };
      return radiusClasses[radius];
    }
    return 'rounded-xl'; // Default - softer for Caregiver brand
  };

  // Handle color prop override - Caregiver brand colors
  const getColorClasses = () => {
    if (color) {
      const isDisabledState = disabled || isDisabled || loading || isLoading;
      
      const colorClasses = {
        primary: [
          isDisabledState ? 'bg-primary-300' : 'bg-primary-500',
          'text-white',
          'hover:bg-primary-600',
          'focus:ring-primary-500',
        ].join(' '),
        secondary: [
          isDisabledState ? 'bg-neutral-200' : 'bg-neutral-600',
          'text-white',
          'hover:bg-neutral-700',
          'focus:ring-neutral-500',
        ].join(' '),
        supportive: [
          isDisabledState ? 'bg-calm-300' : 'bg-calm-500',
          'text-white',
          'hover:bg-calm-600',
          'focus:ring-calm-500',
        ].join(' '),
        subtle: [
          'bg-transparent',
          isDisabledState ? 'text-accent-300' : 'text-accent-600',
          'hover:bg-accent-50',
          'focus:ring-accent-500',
        ].join(' '),
        success: [
          isDisabledState ? 'bg-success-300' : 'bg-success-500',
          'text-white',
          'hover:bg-success-600',
          'focus:ring-success-500',
        ].join(' '),
        warning: [
          isDisabledState ? 'bg-warning-300' : 'bg-warning-500',
          'text-white',
          'hover:bg-warning-600',
          'focus:ring-warning-500',
        ].join(' '),
        danger: [
          isDisabledState ? 'bg-error-300' : 'bg-error-500',
          'text-white',
          'hover:bg-error-600',
          'focus:ring-error-500',
        ].join(' '),
        default: [
          isDisabledState ? 'bg-neutral-200' : 'bg-neutral-100',
          isDisabledState ? 'text-neutral-400' : 'text-neutral-700',
          'hover:bg-neutral-200',
          'focus:ring-neutral-500',
        ].join(' '),
      };
      return colorClasses[color] || colorClasses.default;
    }
    return getVariantClasses();
  };

  const classes = [
    baseClasses,
    getColorClasses(),
    getSizeClasses(),
    getRadiusClasses(),
    fullWidth ? 'w-full' : '',
    className,
  ].join(' ');

  // Handle click events - support both onClick and onPress
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || isDisabled || loading || isLoading) {
      event.preventDefault();
      return;
    }
    
    if (onClick) {
      onClick(event);
    }
    if (onPress) {
      onPress();
    }
  };

  // Determine if button is disabled
  const isButtonDisabled = disabled || isDisabled || loading || isLoading;

  // Loading spinner component
  const LoadingSpinner = () => (
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <button
      type={type}
      className={classes}
      disabled={isButtonDisabled}
      onClick={handleClick}
      {...props}
    >
      {(loading || isLoading) && <LoadingSpinner />}
      
      {!(loading || isLoading) && (leftIcon || startContent) && (
        <span className={children ? 'mr-2' : ''}>{leftIcon || startContent}</span>
      )}
      
      {!isIconOnly && children}
      
      {!(loading || isLoading) && (rightIcon || endContent) && (
        <span className={children ? 'ml-2' : ''}>{rightIcon || endContent}</span>
      )}
    </button>
  );
};

// Export for use in other components
export default Button;
