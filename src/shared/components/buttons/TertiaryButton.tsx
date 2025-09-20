// 🔘 Tertiary Button - Subtle Actions
// Location: src/shared/components/buttons/TertiaryButton.tsx
// Purpose: Subtle action buttons with transparent background and border

import * as React from 'react';
import type { ButtonProps } from '../types';
import { Button } from './Button';

export interface TertiaryButtonProps extends Omit<ButtonProps, 'variant'> {}

/**
 * Tertiary Button Component
 * 
 * Used for subtle actions that are less prominent.
 * Features transparent background with border for minimal visual weight.
 */
export const TertiaryButton: React.FC<TertiaryButtonProps> = (props) => {
  return <Button variant="tertiary" {...props} />;
};

export default TertiaryButton;
