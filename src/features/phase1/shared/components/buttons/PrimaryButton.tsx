// 🔘 Primary Button - Main CTA Actions
// Location: src/shared/components/buttons/PrimaryButton.tsx
// Purpose: Primary action buttons for main CTAs

import * as React from 'react';
import type { ButtonProps } from '../types';
import { Button } from './Button';

export interface PrimaryButtonProps extends Omit<ButtonProps, 'variant'> {}

/**
 * Primary Button Component
 *
 * Used for main call-to-action buttons throughout the platform.
 * Features the primary brand color (Trust Blue) for maximum visibility.
 */
export const PrimaryButton: React.FC<PrimaryButtonProps> = props => {
  return <Button variant="primary" {...props} />;
};

export default PrimaryButton;
