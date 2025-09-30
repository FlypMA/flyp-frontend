// 🏢 Business Confirmation Page - Business Card Prelude
// Location: src/features/phase1/business/card/prelude/components/BusinessConfirmationPage.tsx
// Purpose: Confirmation page with selected business type (Step 2 of prelude)

import React from 'react';
import { BusinessConfirmationPageProps, BusinessTypeOption } from '../types/PreludeTypes';

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

const BusinessConfirmationPage: React.FC<BusinessConfirmationPageProps> = ({
  selectedBusinessType,
  onGetStarted,
}) => {
  const selectedOption = businessTypeOptions.find(option => option.id === selectedBusinessType);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Main Content */}
      <main
        id="site-content"
        tabIndex={-1}
        aria-label="Create your business card"
        className="flex-1 overflow-y-auto"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Two Panel Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
            {/* Left Panel - Main Content */}
            <div className="flex flex-col justify-center">
              <h1 className="text-5xl font-bold text-gray-900 mb-6 text-left">
                Create your business card
              </h1>
              <p className="text-lg text-gray-600 text-left leading-relaxed">
                Tell us about your business and create your professional business profile. We'll
                help you showcase your business to potential buyers.
              </p>
            </div>

            {/* Right Panel - Selected Business Type Card */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-lg">
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-12 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="text-center">
                    <div className="text-8xl mb-6">{selectedOption?.icon}</div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      {selectedOption?.title}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {selectedOption?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer with Get Started Button */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-8xl mx-auto px-8 py-6">
          <div className="flex justify-end">
            <button
              onClick={onGetStarted}
              className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 min-w-[165px] h-12"
            >
              Get Started
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BusinessConfirmationPage;
