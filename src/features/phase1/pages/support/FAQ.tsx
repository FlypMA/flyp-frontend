import { MainLayout } from '@/app/layouts';
import * as React from 'react';

const FAQ: React.FC = () => {
  return (
    <MainLayout showFooter={true}>
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>
            <p className="text-lg text-gray-600 mb-12">
              Find answers to common questions about flyp platform.
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How does flyp work?</h3>
              <p className="text-gray-700">
                flyp connects business buyers and sellers in a secure marketplace environment,
                facilitating the entire M&A process from initial discovery to closing.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How do I list my business?
              </h3>
              <p className="text-gray-700">
                Start by creating a business profile and getting a free valuation. Once ready, you
                can create a detailed listing with financial information and business highlights.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Is my information secure?
              </h3>
              <p className="text-gray-700">
                Yes, we use enterprise-grade security and data protection measures. All sensitive
                information is encrypted and only shared with verified, qualified buyers.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What fees does flyp charge?
              </h3>
              <p className="text-gray-700">
                Our fee structure is transparent and success-based. Contact us for detailed
                information about our pricing model for your specific situation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FAQ;
