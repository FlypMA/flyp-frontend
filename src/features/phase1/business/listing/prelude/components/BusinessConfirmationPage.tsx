import React from 'react';
import { BusinessConfirmationPageProps, BusinessTypeOption } from '../types/PreludeTypes';

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

const BusinessConfirmationPage: React.FC<BusinessConfirmationPageProps> = ({
  selectedBusinessType,
  onBack,
  onGetStarted,
}) => {
  const selectedOption = businessTypeOptions.find(option => option.id === selectedBusinessType);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Main Content */}
      <main
        id="site-content"
        tabIndex={-1}
        aria-label="Create your listing"
        className="flex-1 overflow-y-auto"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Two Panel Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
            {/* Left Panel - Main Content */}
            <div className="flex flex-col justify-center">
              <h1 className="text-5xl font-bold text-gray-900 mb-6 text-left">
                Create your listing
              </h1>
              <p className="text-lg text-gray-600 text-left leading-relaxed">
                Tell us about yourself and the service you offer. We'll check if your listing meets
                our requirements.
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
