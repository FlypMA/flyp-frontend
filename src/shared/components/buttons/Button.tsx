// 🔘 Button Component - Design System
// Single source of truth for all button implementations

import * as React from 'react';
import type { ButtonProps } from '../types';

/**
 * Button Component - Unified button implementation
 *
 * ✅ Replaces ALL duplicate button components:
 * - src/app/components/ui/forms/Button/Button.tsx
 * - src/shared/components/ui/ui/forms/Button/Button.tsx
 * - src/app/components/ui/forms/actions/PrimaryButton.tsx
 * - src/shared/components/ui/ui/forms/actions/PrimaryButton.tsx
 * - And 10+ more button duplicates
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
  const baseClasses = [
    'inline-flex items-center justify-center',
    'font-semibold', // Caregiver brand uses semibold for buttons
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ].join(' ');

  const variantClasses = {
    // Primary - Trust Blue (main actions)
    primary:
      'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500 shadow-sm hover:shadow-md',

    // Secondary - Neutral (secondary actions)
    secondary:
      'bg-neutral-600 hover:bg-neutral-700 text-white focus:ring-neutral-500 shadow-sm hover:shadow-md',

    // Supportive - Calm Teal (supportive actions, "we've got you")
    supportive:
      'bg-calm-600 hover:bg-calm-700 text-white focus:ring-calm-500 shadow-sm hover:shadow-md',

    // Subtle - Reassuring Coral (gentle emphasis, secondary CTAs)
    subtle:
      'bg-accent-600 hover:bg-accent-700 text-white focus:ring-accent-500 shadow-sm hover:shadow-md',

    // Outline - Clean borders with proper contrast
    outline:
      'border-2 border-neutral-300 hover:border-neutral-400 text-neutral-700 bg-white hover:bg-neutral-50 focus:ring-neutral-500',

    // Ghost - Minimal, text-only with hover states
    ghost: 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 focus:ring-neutral-500',

    // Danger - Error states
    danger:
      'bg-error-600 hover:bg-error-700 text-white focus:ring-error-500 shadow-sm hover:shadow-md',

    // Light - Subtle background
    light: 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 focus:ring-neutral-500',

    // Bordered - Transparent with border
    bordered:
      'border-2 border-neutral-300 hover:border-neutral-400 text-neutral-700 bg-transparent hover:bg-neutral-50 focus:ring-neutral-500',

    // Flat - Minimal background
    flat: 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 focus:ring-neutral-500',
  };

  const sizeClasses = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-4 py-2 text-base',
    xl: 'px-6 py-3 text-base',
  };

  // Handle color prop override - Caregiver brand colors
  const getColorClasses = () => {
    if (color) {
      const colorClasses = {
        // Primary - Trust Blue (main actions)
        primary:
          'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500 shadow-sm hover:shadow-md',

        // Secondary - Neutral (secondary actions)
        secondary:
          'bg-neutral-600 hover:bg-neutral-700 text-white focus:ring-neutral-500 shadow-sm hover:shadow-md',

        // Supportive - Calm Teal (supportive actions, "we've got you")
        supportive:
          'bg-calm-600 hover:bg-calm-700 text-white focus:ring-calm-500 shadow-sm hover:shadow-md',

        // Subtle - Reassuring Coral (gentle emphasis, secondary CTAs)
        subtle:
          'bg-accent-600 hover:bg-accent-700 text-white focus:ring-accent-500 shadow-sm hover:shadow-md',

        // Success - Green (positive actions)
        success:
          'bg-success-600 hover:bg-success-700 text-white focus:ring-success-500 shadow-sm hover:shadow-md',

        // Warning - Amber (caution actions)
        warning:
          'bg-warning-600 hover:bg-warning-700 text-white focus:ring-warning-500 shadow-sm hover:shadow-md',

        // Danger - Red (destructive actions)
        danger:
          'bg-error-600 hover:bg-error-700 text-white focus:ring-error-500 shadow-sm hover:shadow-md',

        // Default - Neutral light
        default: 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 focus:ring-neutral-500',
      };
      return colorClasses[color] || colorClasses.default;
    }
    return variantClasses[variant];
  };

  // Handle radius prop - Caregiver brand uses softer radii
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
    return 'rounded-xl'; // default - softer for Caregiver brand
  };

  // Handle icon-only styling
  const getIconOnlyClasses = () => {
    if (isIconOnly) {
      const iconSizeClasses = {
        xs: 'w-6 h-6 p-1',
        sm: 'w-8 h-8 p-1.5',
        md: 'w-10 h-10 p-2',
        lg: 'w-12 h-12 p-2.5',
        xl: 'w-14 h-14 p-3',
      };
      return iconSizeClasses[size];
    }
    return '';
  };

  const classes = [
    baseClasses,
    getColorClasses(),
    !isIconOnly ? sizeClasses[size] : getIconOnlyClasses(),
    getRadiusClasses(),
    fullWidth ? 'w-full' : '',
    className,
  ].join(' ');

  // Handle click events - support both onClick and onPress
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }
    if (onPress) {
      onPress();
    }
  };

  // Determine if button is disabled
  const isButtonDisabled = disabled || isDisabled || loading || isLoading;

  return (
    <button
      type={type}
      className={classes}
      disabled={isButtonDisabled}
      onClick={handleClick}
      {...props}
    >
      {(loading || isLoading) && (
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
      )}
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
