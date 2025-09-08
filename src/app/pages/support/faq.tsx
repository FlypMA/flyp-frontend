import React from 'react';
import { MainLayout } from '../../components/layout';

const FAQ: React.FC = () => {
  return (
    <MainLayout showFooter={true}>
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>
            <p className="text-lg text-gray-600 mb-12">
              Find answers to common questions about BetweenDeals platform.
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How does BetweenDeals work?
              </h3>
              <p className="text-gray-600">
                BetweenDeals is Europe's premier SME M&A platform that connects business owners
                looking to sell with qualified buyers and investors.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Is the platform free to use?
              </h3>
              <p className="text-gray-600">
                Basic browsing is free. We offer various pricing tiers for sellers and buyers based
                on the services you need.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How do I list my business for sale?
              </h3>
              <p className="text-gray-600">
                Create an account, complete our seller onboarding process, and use our guided
                listing wizard to create a professional business listing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FAQ;
