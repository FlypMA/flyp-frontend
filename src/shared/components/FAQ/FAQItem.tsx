/**
 * FAQ Item Component
 * Individual accordion item with smooth animations and accessibility
 */

import React, { useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@heroui/react';
import { FAQBadge } from './FAQBadge';
import type { FAQItemProps } from './types';

export const FAQItem: React.FC<FAQItemProps> = ({ faq, isOpen, onToggle, className }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = React.useState<number | undefined>();

  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      setContentHeight(isOpen ? height : 0);
    }
  }, [isOpen, faq.answer]);

  return (
    <div
      className={cn(
        'bg-white border border-gray-200 rounded-xl shadow-sm',
        'hover:shadow-md transition-all duration-300',
        'focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-opacity-20',
        className
      )}
    >
      {/* FAQ Header Button */}
      <button
        onClick={onToggle}
        className={cn(
          'w-full px-6 py-4 text-left',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset focus:ring-opacity-50',
          'rounded-xl transition-colors duration-200',
          'hover:bg-gray-50'
        )}
        aria-expanded={isOpen}
        aria-controls={`faq-content-${faq.question.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Question and Badges */}
          <div className="flex-1 flex items-center gap-3">
            <h3 className="font-semibold text-gray-900 text-left">{faq.question}</h3>

            {/* Badges */}
            <div className="flex gap-2">
              {faq.isNew && <FAQBadge type="new" />}
              {faq.isPopular && <FAQBadge type="popular" />}
            </div>
          </div>

          {/* Expand/Collapse Icon */}
          <ChevronDown
            className={cn(
              'w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0',
              isOpen && 'rotate-180'
            )}
            aria-hidden="true"
          />
        </div>
      </button>

      {/* FAQ Content */}
      <div
        style={{
          height: contentHeight,
          overflow: 'hidden',
          transition: 'height 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div
          ref={contentRef}
          id={`faq-content-${faq.question.replace(/\s+/g, '-').toLowerCase()}`}
          className="px-6 pb-6"
        >
          {/* Answer */}
          <div className="text-gray-700 leading-relaxed mb-4">{faq.answer}</div>

          {/* Tags */}
          {faq.tags && faq.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {faq.tags.map((tag, index) => (
                <span
                  key={index}
                  className={cn(
                    'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
                    'bg-primary-50 text-primary-700 border border-primary-200',
                    'transition-colors duration-200 hover:bg-primary-100'
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
