// 🏢 Business Type Selection Page - Full Page Airbnb-Inspired
// Location: src/features/phase1/business/listing/components/BusinessTypeSelectionPage.tsx
// Purpose: Full-page business type selection with header and back button

import React from 'react';
import { BusinessTypeOption, BusinessTypeSelectionPageProps } from '../types/PreludeTypes';

const businessTypeOptions: BusinessTypeOption[] = [
  {
    id: 'catering',
    title: 'Catering',
    description: 'Event catering, corporate meals, party services',
    icon: '🍽️',
  },
  {
    id: 'photography',
    title: 'Photography',
    description: 'Wedding, portrait, event, commercial photography',
    icon: '📸',
  },
  {
    id: 'hairstyling',
    title: 'Hairstyling',
    description: 'Hair salons, barbershops, mobile hair services',
    icon: '💇‍♀️',
  },
  {
    id: 'chef',
    title: 'Chef Services',
    description: 'Private chef, cooking classes, meal preparation',
    icon: '👨‍🍳',
  },
  {
    id: 'meals',
    title: 'Meal Services',
    description: 'Meal delivery, meal prep, food subscription boxes',
    icon: '🍱',
  },
  {
    id: 'makeup',
    title: 'Make-up',
    description: 'Bridal makeup, special events, beauty services',
    icon: '💄',
  },
  {
    id: 'massage',
    title: 'Massage',
    description: 'Therapeutic massage, spa services, wellness treatments',
    icon: '💆‍♀️',
  },
  {
    id: 'nailcare',
    title: 'Nail Care',
    description: 'Manicures, pedicures, nail art, nail salons',
    icon: '💅',
  },
  {
    id: 'personaltraining',
    title: 'Personal Training',
    description: 'Fitness coaching, personal trainers, workout programs',
    icon: '💪',
  },
  {
    id: 'wellness',
    title: 'Wellness Treatments',
    description: 'Spa treatments, holistic therapies, wellness retreats',
    icon: '🧘‍♀️',
  },
  {
    id: 'cleaning',
    title: 'Cleaning Services',
    description: 'House cleaning, office cleaning, specialized cleaning',
    icon: '🧹',
  },
  {
    id: 'consulting',
    title: 'Business Consulting',
    description: 'Management consulting, strategy, business advisory',
    icon: '💼',
  },
];

const BusinessTypeSelectionPage: React.FC<BusinessTypeSelectionPageProps> = ({
  onBusinessTypeSelect,
  onBack,
  selectedBusinessType,
}) => {
  return (
    <div className="h-full bg-white">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            What kind of business do you have?
          </h1>
        </div>

        {/* Business Type Cards Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {businessTypeOptions.map(option => (
              <button
                key={option.id}
                onClick={() => onBusinessTypeSelect(option.id)}
                className={`
                  relative p-4 rounded-2xl border-2 transition-all duration-200 text-left
                  ${
                    selectedBusinessType === option.id
                      ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-100'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                {/* Icon */}
                <div className="text-3xl mb-3">{option.icon}</div>

                {/* Title */}
                <h3 className="font-semibold text-gray-900 mb-2 text-base">{option.title}</h3>

                {/* Description */}
                <p className="text-xs text-gray-600 leading-relaxed">{option.description}</p>

                {/* Selection Indicator */}
                {selectedBusinessType === option.id && (
                  <div className="absolute top-4 right-4">
                    <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="max-w-2xl mx-auto mt-12">
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Need help choosing?</h3>
                <p className="text-sm text-gray-600">
                  Don't worry if you're not sure which category fits best. You can always update
                  this later, and we'll help you create the perfect listing regardless of your
                  business type.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        {selectedBusinessType && (
          <div className="text-center mt-8">
            <button
              onClick={() => onBusinessTypeSelect(selectedBusinessType)}
              className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Continue
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default BusinessTypeSelectionPage;
