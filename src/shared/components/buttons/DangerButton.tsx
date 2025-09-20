// 🔘 Danger Button - Destructive Actions
// Location: src/shared/components/buttons/DangerButton.tsx
// Purpose: Destructive action buttons with error red color

import * as React from 'react';
import type { ButtonProps } from '../types';
import { Button } from './Button';

export interface DangerButtonProps extends Omit<ButtonProps, 'variant'> {}

/**
 * Danger Button Component
 * 
 * Used for destructive actions like delete, remove, or cancel.
 * Features the error red color for clear warning.
 */
export const DangerButton: React.FC<DangerButtonProps> = (props) => {
  return <Button variant="danger" {...props} />;
};

export default DangerButton;
