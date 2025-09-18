// 🎨 Brand Button Components - Caregiver Brand System
// Location: src/shared/components/buttons/BrandButton.tsx
// Purpose: Specialized button components following Caregiver brand psychology

import * as React from 'react';
import type { ButtonProps } from '../types';
import { Button } from './Button';

/**
 * Primary Action Button - Trust Blue
 * Use for main CTAs that drive users forward
 * Psychology: Builds confidence and trust
 */
export const PrimaryButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="primary" {...props} />
);

/**
 * Supportive Action Button - Calm Teal
 * Use for "we're here to help" messaging
 * Psychology: Reduces anxiety, feels supportive
 */
export const SupportiveButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="supportive" {...props} />
);

/**
 * Gentle Emphasis Button - Reassuring Coral
 * Use for secondary CTAs, gentle encouragement
 * Psychology: Encourages without being pushy
 */
export const SubtleButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="subtle" {...props} />
);

/**
 * Secondary Action Button - Neutral
 * Use for secondary actions, alternatives
 * Psychology: Professional, non-threatening
 */
export const SecondaryButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="secondary" {...props} />
);

/**
 * Exploratory Action Button - Outline
 * Use for exploratory actions, less prominent CTAs
 * Psychology: Inviting exploration without pressure
 */
export const OutlineButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="outline" {...props} />
);

/**
 * Low-Pressure Button - Ghost
 * Use for minimal actions, low-pressure prompts
 * Psychology: Subtle, non-intrusive
 */
export const GhostButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="ghost" {...props} />
);

/**
 * Destructive Action Button - Danger
 * Use ONLY for destructive actions
 * Psychology: Clear warning, use sparingly
 */
export const DangerButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="danger" {...props} />
);

// Export all brand buttons
export {
  DangerButton as Danger, GhostButton as Ghost, OutlineButton as Outline, PrimaryButton as Primary, SecondaryButton as Secondary, SubtleButton as Subtle, SupportiveButton as Supportive
};

