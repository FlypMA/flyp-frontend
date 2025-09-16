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
    'font-medium rounded-md',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ].join(' ');

  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
    outline:
      'border-2 border-gray-300 hover:border-gray-400 text-gray-700 bg-white focus:ring-gray-500',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    light: 'bg-gray-100 hover:bg-gray-200 text-gray-700 focus:ring-gray-500',
    bordered: 'border-2 border-gray-300 hover:border-gray-400 text-gray-700 bg-transparent focus:ring-gray-500',
    flat: 'bg-gray-50 hover:bg-gray-100 text-gray-700 focus:ring-gray-500',
  };

  const sizeClasses = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-4 py-2 text-base',
    xl: 'px-6 py-3 text-base',
  };

  // Handle color prop override
  const getColorClasses = () => {
    if (color) {
      const colorClasses = {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
        secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
        success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
        warning: 'bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500',
        danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
        default: 'bg-gray-100 hover:bg-gray-200 text-gray-700 focus:ring-gray-500',
      };
      return colorClasses[color] || colorClasses.default;
    }
    return variantClasses[variant];
  };

  // Handle radius prop
  const getRadiusClasses = () => {
    if (radius) {
      const radiusClasses = {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      };
      return radiusClasses[radius];
    }
    return 'rounded-md'; // default
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
