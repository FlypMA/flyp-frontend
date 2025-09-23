// 🔘 Subtle Button - Reassuring Coral Actions
// Location: src/shared/components/buttons/SubtleButton.tsx
// Purpose: Subtle action buttons with reassuring coral color

import * as React from 'react';
import type { ButtonProps } from '../types';
import { Button } from './Button';

export interface SubtleButtonProps extends Omit<ButtonProps, 'variant'> {}

/**
 * Subtle Button Component
 *
 * Used for gentle emphasis and encouraging actions.
 * Features the reassuring coral color for friendly prompts.
 */
export const SubtleButton: React.FC<SubtleButtonProps> = props => {
  return <Button variant="subtle" {...props} />;
};

export default SubtleButton;
