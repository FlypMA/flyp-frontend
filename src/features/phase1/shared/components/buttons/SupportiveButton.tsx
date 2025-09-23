// 🔘 Supportive Button - Calm Teal Actions
// Location: src/shared/components/buttons/SupportiveButton.tsx
// Purpose: Supportive action buttons with calm teal color

import * as React from 'react';
import type { ButtonProps } from '../types';
import { Button } from './Button';

export interface SupportiveButtonProps extends Omit<ButtonProps, 'variant'> {}

/**
 * Supportive Button Component
 *
 * Used for supportive actions that provide guidance and reassurance.
 * Features the calm teal color for a soothing, "we've got you" feeling.
 */
export const SupportiveButton: React.FC<SupportiveButtonProps> = props => {
  return <Button variant="supportive" {...props} />;
};

export default SupportiveButton;
