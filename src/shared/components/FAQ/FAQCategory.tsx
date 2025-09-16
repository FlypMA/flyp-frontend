/**
 * FAQ Category Component
 * Groups related FAQs with category header and icon
 */

import * as React from 'react';
import { cn } from '@heroui/react';
import { FAQAccordion } from './FAQAccordion';
import type { FAQCategoryProps } from './types';

export const FAQCategory: React.FC<FAQCategoryProps> = ({
  category,
  allowMultiple = false,
  className,
}) => {
  // Color mapping for category badges
  const colorVariants: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    orange: 'bg-orange-50 text-orange-700 border-orange-200',
    pink: 'bg-pink-50 text-pink-700 border-pink-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    red: 'bg-red-50 text-red-700 border-red-200',
  };

  const badgeColor = colorVariants[category.color] || colorVariants.blue;

  return (
    <div className={cn('space-y-6', className)}>
      {/* Category Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Category Icon */}
          <div
            className={cn(
              'flex items-center justify-center w-12 h-12 rounded-xl',
              `bg-${category.color}-50 text-${category.color}-600`,
              'border border-opacity-20'
            )}
            style={{
              backgroundColor: `rgb(${
                category.color === 'blue'
                  ? '239, 246, 255'
                  : category.color === 'green'
                    ? '236, 253, 245'
                    : category.color === 'purple'
                      ? '250, 245, 255'
                      : category.color === 'orange'
                        ? '255, 247, 237'
                        : category.color === 'pink'
                          ? '253, 242, 248'
                          : category.color === 'indigo'
                            ? '238, 242, 255'
                            : category.color === 'yellow'
                              ? '254, 252, 232'
                              : '254, 242, 242'
              })`,
              color: `rgb(${
                category.color === 'blue'
                  ? '29, 78, 216'
                  : category.color === 'green'
                    ? '5, 150, 105'
                    : category.color === 'purple'
                      ? '126, 34, 206'
                      : category.color === 'orange'
                        ? '194, 65, 12'
                        : category.color === 'pink'
                          ? '190, 24, 93'
                          : category.color === 'indigo'
                            ? '79, 70, 229'
                            : category.color === 'yellow'
                              ? '161, 98, 7'
                              : '220, 38, 38'
              })`,
            }}
          >
            {category.icon}
          </div>

          {/* Category Title and Description */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>

              {/* Questions Count Badge */}
              <span
                className={cn(
                  'inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium border',
                  badgeColor
                )}
              >
                {category.faqs.length}{' '}
                {category.faqs.length === 1 ? 'question' : 'questions'}
              </span>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <FAQAccordion faqs={category.faqs} allowMultiple={allowMultiple} />
    </div>
  );
};

export default FAQCategory;
