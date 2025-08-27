/**
 * FAQ Accordion Component
 * Main accordion container that manages state and FAQ items
 */

import React, { useState } from 'react';
import { cn } from '@heroui/react';
import { FAQItem } from './FAQItem';
import type { FAQAccordionProps } from './types';

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ 
  faqs, 
  allowMultiple = false, 
  className 
}) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    setOpenItems(prev => {
      const newOpenItems = new Set(prev);
      
      if (allowMultiple) {
        // Allow multiple items to be open
        if (newOpenItems.has(index)) {
          newOpenItems.delete(index);
        } else {
          newOpenItems.add(index);
        }
      } else {
        // Only allow one item to be open at a time
        if (newOpenItems.has(index)) {
          newOpenItems.clear();
        } else {
          newOpenItems.clear();
          newOpenItems.add(index);
        }
      }
      
      return newOpenItems;
    });
  };

  if (!faqs || faqs.length === 0) {
    return (
      <div className={cn('p-8 text-center text-gray-500', className)}>
        No FAQs available at the moment.
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {faqs.map((faq, index) => (
        <FAQItem
          key={index}
          faq={faq}
          isOpen={openItems.has(index)}
          onToggle={() => toggleItem(index)}
        />
      ))}
    </div>
  );
};

export default FAQAccordion;
