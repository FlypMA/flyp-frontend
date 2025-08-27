/**
 * FAQ Components - Main Export
 * Clean, modular FAQ system for enterprise applications
 */

export { FAQAccordion } from './FAQAccordion';
export { FAQItem } from './FAQItem';
export { FAQBadge } from './FAQBadge';
export { FAQCategory } from './FAQCategory';

export type {
  FAQ,
  FAQCategory as FAQCategoryType,
  FAQBadgeProps,
  FAQItemProps,
  FAQAccordionProps,
  FAQCategoryProps
} from './types';

// Default export for convenience
export { FAQAccordion as default } from './FAQAccordion';
