/**
 * FAQ Component Types
 * 
 * Type definitions for FAQ-related components
 */

import * as React from 'react';

// =============================================================================
// FAQ TYPES
// =============================================================================

export interface FAQItem {
  /**
   * Unique identifier
   */
  id?: string;
  
  /**
   * FAQ question
   */
  question: string;
  
  /**
   * FAQ answer
   */
  answer: React.ReactNode;
  
  /**
   * Optional badge
   */
  badge?: 'new' | 'popular';
  
  /**
   * Whether this item is new
   */
  isNew?: boolean;
  
  /**
   * Whether this item is popular
   */
  isPopular?: boolean;
  
  /**
   * Optional tags
   */
  tags?: string[];
}

export interface FAQAccordionProps {
  /**
   * Array of FAQ items
   */
  faqs: FAQItem[];
  
  /**
   * Whether multiple items can be open at once
   */
  allowMultiple?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export interface FAQBadgeProps {
  /**
   * Badge type
   */
  type?: 'new' | 'popular';
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export interface FAQCategoryProps {
  /**
   * Category configuration
   */
  category: {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    color?: string;
    faqs: FAQItem[];
  };
  
  /**
   * Whether multiple items can be open at once
   */
  allowMultiple?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export interface FAQItemProps {
  /**
   * FAQ item data
   */
  faq: FAQItem;
  
  /**
   * Whether this item is currently open
   */
  isOpen: boolean;
  
  /**
   * Toggle handler
   */
  onToggle: () => void;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}
