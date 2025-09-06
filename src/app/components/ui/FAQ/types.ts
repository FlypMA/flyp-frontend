/**
 * FAQ Component Types
 * Enterprise-grade type definitions for the FAQ system
 */

export interface FAQ {
  question: string;
  answer: string;
  tags?: string[];
  isNew?: boolean;
  isPopular?: boolean;
}

export interface FAQCategory {
  id: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  questions: FAQ[];
}

export interface FAQBadgeProps {
  type: 'new' | 'popular';
  className?: string;
}

export interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export interface FAQAccordionProps {
  faqs: FAQ[];
  allowMultiple?: boolean;
  className?: string;
}

export interface FAQCategoryProps {
  category: FAQCategory;
  allowMultiple?: boolean;
  className?: string;
}

