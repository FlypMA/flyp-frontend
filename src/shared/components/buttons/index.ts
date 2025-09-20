/**
 * Button Components Export - Caregiver Brand System
 *
 * Clean, modular button system with 5 main variants:
 * - Primary: Main CTA buttons
 * - Secondary: Secondary actions with white background
 * - Tertiary: Subtle actions with transparent background
 * - Link: Text-only buttons that look like links
 * - Success: Positive actions with green color
 */

// Main Button Component
export { Button, default as ButtonDefault } from './Button';

// Variant-Specific Button Components
export { default as Danger, DangerButton } from './DangerButton';
export { default as Link, LinkButton } from './LinkButton';
export { default as Primary, PrimaryButton } from './PrimaryButton';
export { default as Secondary, SecondaryButton } from './SecondaryButton';
export { default as Subtle, SubtleButton } from './SubtleButton';
export { default as Success, SuccessButton } from './SuccessButton';
export { default as Supportive, SupportiveButton } from './SupportiveButton';
export { default as Tertiary, TertiaryButton } from './TertiaryButton';

// Re-export types
export type { ButtonProps } from '../types';
