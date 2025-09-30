// 🏢 Business Type Selection Page - Business Card Prelude
// Location: src/features/phase1/business/card/prelude/components/BusinessTypeSelectionPage.tsx
// Purpose: Full-page business type selection (Step 1 of prelude)

import React from 'react';
import { BusinessTypeOption, BusinessTypeSelectionPageProps } from '../types/PreludeTypes';

const businessTypeOptions: BusinessTypeOption[] = [
  // 🍽️ Food & Beverage Services
  {
    id: 'catering',
    title: 'Catering',
    description: 'Event catering, corporate meals, party services',
    icon: '🍽️',
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
    id: 'restaurant',
    title: 'Restaurant',
    description: 'Dining establishments, cafes, food service businesses',
    icon: '🍴',
  },

  // 💅 Beauty & Wellness Services
  {
    id: 'hairstyling',
    title: 'Hairstyling',
    description: 'Hair salons, barbershops, mobile hair services',
    icon: '💇‍♀️',
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
    id: 'wellness',
    title: 'Wellness Treatments',
    description: 'Spa treatments, holistic therapies, wellness retreats',
    icon: '🧘‍♀️',
  },

  // 💪 Fitness & Health
  {
    id: 'personaltraining',
    title: 'Personal Training',
    description: 'Fitness coaching, personal trainers, workout programs',
    icon: '💪',
  },
  {
    id: 'gym',
    title: 'Gym & Fitness',
    description: 'Fitness centers, gyms, yoga studios, sports facilities',
    icon: '🏋️',
  },
  {
    id: 'healthcare',
    title: 'Healthcare Services',
    description: 'Medical practices, clinics, therapy services',
    icon: '⚕️',
  },

  // 📸 Creative & Media
  {
    id: 'photography',
    title: 'Photography',
    description: 'Wedding, portrait, event, commercial photography',
    icon: '📸',
  },
  {
    id: 'videography',
    title: 'Videography',
    description: 'Video production, editing, content creation',
    icon: '🎥',
  },
  {
    id: 'design',
    title: 'Design Services',
    description: 'Graphic design, web design, branding, creative services',
    icon: '🎨',
  },
  {
    id: 'marketing',
    title: 'Marketing Agency',
    description: 'Digital marketing, SEO, social media, advertising',
    icon: '📱',
  },

  // 💻 Tech & Digital
  {
    id: 'saas',
    title: 'SaaS',
    description: 'Software as a Service, cloud platforms, B2B tech',
    icon: '💻',
  },
  {
    id: 'software',
    title: 'Software Development',
    description: 'Custom software, app development, tech solutions',
    icon: '⚙️',
  },
  {
    id: 'webdev',
    title: 'Web Development',
    description: 'Website development, e-commerce builds, web apps',
    icon: '🌐',
  },
  {
    id: 'itsupport',
    title: 'IT Support',
    description: 'Managed IT services, tech support, infrastructure',
    icon: '🖥️',
  },

  // 🛒 E-commerce & Retail
  {
    id: 'ecommerce',
    title: 'E-commerce',
    description: 'Online stores, digital retail, dropshipping',
    icon: '🛒',
  },
  {
    id: 'retail',
    title: 'Retail Store',
    description: 'Physical retail, boutiques, specialty shops',
    icon: '🏪',
  },
  {
    id: 'subscription',
    title: 'Subscription Box',
    description: 'Recurring product boxes, membership commerce',
    icon: '📦',
  },

  // 🏠 Home & Property Services
  {
    id: 'cleaning',
    title: 'Cleaning Services',
    description: 'House cleaning, office cleaning, specialized cleaning',
    icon: '🧹',
  },
  {
    id: 'realestate',
    title: 'Real Estate',
    description: 'Property management, real estate agency, rentals',
    icon: '🏡',
  },
  {
    id: 'construction',
    title: 'Construction',
    description: 'Building, renovation, contracting services',
    icon: '🔨',
  },
  {
    id: 'landscaping',
    title: 'Landscaping',
    description: 'Garden maintenance, outdoor design, lawn care',
    icon: '🌳',
  },

  // 💼 Professional Services
  {
    id: 'consulting',
    title: 'Business Consulting',
    description: 'Management consulting, strategy, business advisory',
    icon: '💼',
  },
  {
    id: 'legal',
    title: 'Legal Services',
    description: 'Law firms, legal consulting, compliance services',
    icon: '⚖️',
  },
  {
    id: 'accounting',
    title: 'Accounting & Finance',
    description: 'Bookkeeping, tax services, financial advisory',
    icon: '📊',
  },
  {
    id: 'hr',
    title: 'HR & Recruitment',
    description: 'Staffing agencies, recruitment, HR consulting',
    icon: '👥',
  },

  // 📚 Education & Training
  {
    id: 'education',
    title: 'Education & Training',
    description: 'Online courses, tutoring, professional training',
    icon: '📚',
  },
  {
    id: 'coaching',
    title: 'Coaching',
    description: 'Life coaching, career coaching, business mentoring',
    icon: '🎯',
  },

  // 🚗 Transportation & Logistics
  {
    id: 'logistics',
    title: 'Logistics & Delivery',
    description: 'Shipping, courier services, supply chain',
    icon: '🚚',
  },
  {
    id: 'automotive',
    title: 'Automotive Services',
    description: 'Car repair, detailing, auto maintenance',
    icon: '🚗',
  },

  // 🎉 Events & Entertainment
  {
    id: 'events',
    title: 'Event Planning',
    description: 'Event management, wedding planning, conferences',
    icon: '🎉',
  },
  {
    id: 'entertainment',
    title: 'Entertainment',
    description: 'DJ services, performers, event entertainment',
    icon: '🎭',
  },
];

const BusinessTypeSelectionPage: React.FC<BusinessTypeSelectionPageProps> = ({
  onBusinessTypeSelect,
  selectedBusinessType,
}) => {
  return (
    <div className="h-full bg-white flex flex-col">
      {/* Fixed Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            What kind of business do you have?
          </h1>
          <p className="text-gray-600">Select the category that best describes your business</p>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <main className="max-w-7xl mx-auto px-8 py-8">
          {/* Business Type Cards Grid - 4 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
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

          {/* Help Section */}
          <div className="max-w-2xl mx-auto mb-8">
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
                    this later as you complete your business profile.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Fixed Footer with Continue Button */}
      {selectedBusinessType && (
        <div className="flex-shrink-0 bg-white border-t border-gray-200 px-8 py-4">
          <div className="max-w-7xl mx-auto flex justify-end">
            <button
              onClick={() => onBusinessTypeSelect(selectedBusinessType)}
              className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessTypeSelectionPage;
