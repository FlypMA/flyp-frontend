// 🔘 Success Button - Positive Actions
// Location: src/shared/components/buttons/SuccessButton.tsx
// Purpose: Success/positive action buttons with green color

import * as React from 'react';
import type { ButtonProps } from '../types';
import { Button } from './Button';

export interface SuccessButtonProps extends Omit<ButtonProps, 'variant'> {}

/**
 * Success Button Component
 *
 * Used for positive actions like "Save", "Confirm", "Complete".
 * Features success green color for positive reinforcement.
 */
export const SuccessButton: React.FC<SuccessButtonProps> = props => {
  return <Button variant="success" {...props} />;
};

export default SuccessButton;
