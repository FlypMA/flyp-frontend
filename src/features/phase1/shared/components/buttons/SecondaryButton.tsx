// 🔘 Secondary Button - Secondary Actions
// Location: src/shared/components/buttons/SecondaryButton.tsx
// Purpose: Secondary action buttons with white background and border

import * as React from 'react';
import type { ButtonProps } from '../types';
import { Button } from './Button';

export interface SecondaryButtonProps extends Omit<ButtonProps, 'variant'> {}

/**
 * Secondary Button Component
 *
 * Used for secondary actions that are important but not the primary CTA.
 * Features white background with neutral border for clear hierarchy.
 */
export const SecondaryButton: React.FC<SecondaryButtonProps> = props => {
  return <Button variant="secondary" {...props} />;
};

export default SecondaryButton;
