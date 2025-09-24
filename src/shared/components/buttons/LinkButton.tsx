// 🔘 Link Button - Text-Only Actions
// Location: src/shared/components/buttons/LinkButton.tsx
// Purpose: Text-only buttons that look like links

import * as React from 'react';
import type { ButtonProps } from '../types';
import { Button } from './Button';

export interface LinkButtonProps extends Omit<ButtonProps, 'variant'> {}

/**
 * Link Button Component
 *
 * Used for text-only actions that should look like links.
 * Features primary color text with hover underline effect.
 */
export const LinkButton: React.FC<LinkButtonProps> = props => {
  return <Button variant="link" {...props} />;
};

export default LinkButton;
