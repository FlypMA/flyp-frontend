// 🔘 Button Group Component - Caregiver Brand System
// Location: src/shared/components/buttons/ButtonGroup.tsx
// Purpose: Common button patterns following Caregiver brand psychology

import * as React from 'react';
import type { ButtonProps } from '../types';
import { GhostButton, OutlineButton, PrimaryButton, SupportiveButton } from './BrandButton';

interface ButtonGroupProps {
  /**
   * Button group layout
   */
  layout?: 'horizontal' | 'vertical' | 'stacked';
  
  /**
   * Spacing between buttons
   */
  spacing?: 'tight' | 'normal' | 'loose';
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Button group content
   */
  children: React.ReactNode;
}

/**
 * Button Group - Common button patterns
 * 
 * Provides consistent spacing and layout for button combinations
 * following Caregiver brand principles
 */
export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  layout = 'horizontal',
  spacing = 'normal',
  className = '',
  children,
}) => {
  const layoutClasses = {
    horizontal: 'flex flex-row',
    vertical: 'flex flex-col',
    stacked: 'flex flex-col space-y-2',
  };

  const spacingClasses = {
    tight: 'gap-2',
    normal: 'gap-3',
    loose: 'gap-4',
  };

  const classes = [
    layoutClasses[layout],
    spacingClasses[spacing],
    className,
  ].join(' ');

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

/**
 * Form Action Buttons - Common form button pattern
 * 
 * Primary action on the right, secondary on the left
 * Following Caregiver brand hierarchy
 */
interface FormActionsProps {
  /**
   * Primary action button props
   */
  primary: ButtonProps & { label: string };
  
  /**
   * Secondary action button props (optional)
   */
  secondary?: ButtonProps & { label: string };
  
  /**
   * Whether buttons should be full width
   */
  fullWidth?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const FormActions: React.FC<FormActionsProps> = ({
  primary,
  secondary,
  fullWidth = false,
  className = '',
}) => {
  const { label: primaryLabel, ...primaryProps } = primary;
  const { label: secondaryLabel, ...secondaryProps } = secondary || {};

  return (
    <ButtonGroup 
      layout="horizontal" 
      spacing="normal"
      className={`${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {secondary && (
        <OutlineButton 
          {...secondaryProps}
          className={fullWidth ? 'flex-1' : ''}
        >
          {secondaryLabel}
        </OutlineButton>
      )}
      <PrimaryButton 
        {...primaryProps}
        className={fullWidth ? 'flex-1' : ''}
      >
        {primaryLabel}
      </PrimaryButton>
    </ButtonGroup>
  );
};

/**
 * Call-to-Action Buttons - Landing page pattern
 * 
 * Primary CTA with supportive secondary action
 * Following Caregiver brand psychology
 */
interface CTAActionsProps {
  /**
   * Primary CTA button props
   */
  primary: ButtonProps & { label: string };
  
  /**
   * Supportive action button props (optional)
   */
  supportive?: ButtonProps & { label: string };
  
  /**
   * Whether buttons should be full width
   */
  fullWidth?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const CTAActions: React.FC<CTAActionsProps> = ({
  primary,
  supportive,
  fullWidth = false,
  className = '',
}) => {
  const { label: primaryLabel, ...primaryProps } = primary;
  const { label: supportiveLabel, ...supportiveProps } = supportive || {};

  return (
    <ButtonGroup 
      layout="horizontal" 
      spacing="normal"
      className={`${fullWidth ? 'w-full' : ''} ${className}`}
    >
      <PrimaryButton 
        {...primaryProps}
        size="lg"
        className={fullWidth ? 'flex-1' : ''}
      >
        {primaryLabel}
      </PrimaryButton>
      {supportive && (
        <SupportiveButton 
          {...supportiveProps}
          size="lg"
          className={fullWidth ? 'flex-1' : ''}
        >
          {supportiveLabel}
        </SupportiveButton>
      )}
    </ButtonGroup>
  );
};

/**
 * Navigation Buttons - Page navigation pattern
 * 
 * Continue/Back button combination
 * Following Caregiver brand flow
 */
interface NavigationActionsProps {
  /**
   * Continue/Next button props
   */
  continue: ButtonProps & { label: string };
  
  /**
   * Back button props (optional)
   */
  back?: ButtonProps & { label: string };
  
  /**
   * Whether buttons should be full width
   */
  fullWidth?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const NavigationActions: React.FC<NavigationActionsProps> = ({
  continue: continueProps,
  back,
  fullWidth = false,
  className = '',
}) => {
  const { label: continueLabel, ...continueButtonProps } = continueProps;
  const { label: backLabel, ...backProps } = back || {};

  return (
    <ButtonGroup 
      layout="horizontal" 
      spacing="normal"
      className={`${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {back && (
        <GhostButton 
          {...backProps}
          className={fullWidth ? 'flex-1' : ''}
        >
          {backLabel}
        </GhostButton>
      )}
      <PrimaryButton 
        {...continueButtonProps}
        className={fullWidth ? 'flex-1' : ''}
      >
        {continueLabel}
      </PrimaryButton>
    </ButtonGroup>
  );
};

// Components are already exported above
