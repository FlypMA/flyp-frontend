// 🔘 Button Component - Caregiver Brand Design System
// Location: src/shared/components/buttons/Button.tsx
// Purpose: Main button component with modular variant system

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
    'transition-all duration-200 ease-in-out', // Smoother transitions
    'focus:outline-none focus:ring-3 focus:ring-offset-0', // Brand focus ring
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'border-0 outline-none',
    'cursor-pointer',
    'relative overflow-hidden', // For loading states
  ].join(' ');

  // Get variant classes using exact brand colors
  const getVariantClasses = () => {
    const isDisabledState = disabled || isDisabled || loading || isLoading;

    switch (variant) {
      case 'primary':
        return [
          isDisabledState ? 'bg-primary-300' : 'bg-primary-500',
          'text-white',
          'font-semibold', // Brand: semibold for primary actions
          'hover:bg-primary-600',
          'focus:ring-primary-500/30', // Brand focus ring with opacity
          'shadow-sm hover:shadow-md',
          'active:scale-[0.98]', // Subtle press feedback
        ].join(' ');

      case 'secondary':
        return [
          isDisabledState
            ? 'bg-neutral-300 text-neutral-100 shadow-none'
            : 'bg-neutral-600 text-white',
          'font-medium', // Brand: medium weight for secondary
          'hover:bg-neutral-700',
          'focus:ring-neutral-500/30',
          'shadow-sm hover:shadow-md',
          'active:scale-[0.98]',
        ].join(' ');

      case 'tertiary':
        return [
          isDisabledState
            ? 'bg-neutral-100 text-neutral-400 shadow-none'
            : 'bg-white text-neutral-600',
          'font-medium',
          'hover:bg-neutral-50',
          'focus:ring-neutral-500/30',
          'shadow-sm hover:shadow-md',
          'active:scale-[0.98]',
          'border border-neutral-300',
        ].join(' ');

      case 'link':
        return [
          'bg-transparent',
          isDisabledState ? 'text-neutral-400' : 'text-neutral-700',
          'font-medium',
          'border border-transparent',
          'hover:text-primary-600',
          'focus:ring-primary-500/30',
          'transition-colors',
          'active:scale-[0.98]',
        ].join(' ');

      case 'success':
        return [
          isDisabledState ? 'bg-success-300' : 'bg-success-500',
          'text-white',
          'font-semibold',
          'hover:bg-success-600',
          'focus:ring-success-500/30',
          'shadow-sm hover:shadow-md',
          'active:scale-[0.98]',
        ].join(' ');

      case 'supportive':
        return [
          isDisabledState ? 'bg-primary-300' : 'bg-primary-500',
          'text-white',
          'font-semibold',
          'hover:bg-primary-600',
          'focus:ring-primary-500/30',
          'shadow-sm hover:shadow-md',
          'active:scale-[0.98]',
        ].join(' ');

      case 'subtle':
        return [
          'bg-transparent',
          isDisabledState ? 'text-accent-300' : 'text-accent-600',
          'font-medium',
          'border border-transparent',
          'hover:bg-accent-50 hover:text-accent-700',
          'focus:ring-accent-500/30',
          'active:scale-[0.98]',
        ].join(' ');

      case 'danger':
        return [
          isDisabledState ? 'bg-error-300' : 'bg-error-500',
          'text-white',
          'font-semibold',
          'hover:bg-error-600',
          'focus:ring-error-500/30',
          'shadow-sm hover:shadow-md',
          'active:scale-[0.98]',
        ].join(' ');

      default:
        return [
          'bg-primary-500',
          'text-white',
          'font-semibold',
          'hover:bg-primary-600',
          'focus:ring-primary-500/30',
          'shadow-sm hover:shadow-md',
        ].join(' ');
    }
  };

  // Get size classes with improved spacing (mobile-first with 44px touch targets)
  const getSizeClasses = () => {
    if (isIconOnly) {
      const iconSizes = {
        xs: 'min-w-[44px] min-h-[44px] sm:w-6 sm:h-6 p-1',
        sm: 'min-w-[44px] min-h-[44px] sm:w-8 sm:h-8 p-1.5',
        md: 'min-w-[44px] min-h-[44px] sm:w-10 sm:h-10 p-2',
        lg: 'w-12 h-12 p-2.5',
        xl: 'w-14 h-14 p-3',
      };
      return iconSizes[size];
    }

    const sizes = {
      xs: 'px-3 py-2.5 sm:py-1.5 text-xs min-h-[44px] sm:h-8', // Mobile: 44px, Desktop: 32px
      sm: 'px-4 py-3 sm:py-2 text-sm min-h-[44px] sm:h-9', // Mobile: 44px, Desktop: 36px
      md: 'px-5 py-3 sm:py-2.5 text-sm min-h-[44px] sm:h-10', // Mobile: 44px, Desktop: 40px
      lg: 'px-6 py-3 text-base h-12', // Already 48px ✅
      xl: 'px-8 py-4 text-lg h-14', // Already 56px ✅
    };
    return sizes[size];
  };

  // Get radius classes - Brand uses lg (12px) for buttons
  const getRadiusClasses = () => {
    if (radius) {
      return radius;
    }
    return 'rounded-lg'; // Brand: borderRadius.lg
  };

  const classes = [
    baseClasses,
    getVariantClasses(),
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

  // Enhanced loading spinner with brand colors
  const LoadingSpinner = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-inherit rounded-lg">
      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
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
    </div>
  );

  return (
    <button
      type={type}
      className={classes}
      disabled={isButtonDisabled}
      onClick={handleClick}
      {...props}
    >
      {/* Loading state overlay */}
      {(loading || isLoading) && <LoadingSpinner />}

      {/* Content with loading state opacity */}
      <span
        className={`flex items-center justify-center ${loading || isLoading ? 'opacity-0' : 'opacity-100'}`}
      >
        {/* Left icon or start content */}
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {startContent && <span className="mr-2">{startContent}</span>}

        {/* Button content */}
        {children}

        {/* Right icon or end content */}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
        {endContent && <span className="ml-2">{endContent}</span>}
      </span>
    </button>
  );
};

export default Button;
