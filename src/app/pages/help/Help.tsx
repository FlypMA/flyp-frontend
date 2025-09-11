// 🆘 Help Page (Placeholder)
// Location: src/app/pages/help/Help.tsx
// Purpose: Help and FAQ page

import React from 'react';

const HelpPage: React.FC = () => {
  return (
    <div className="help-page p-6">
      <h1 className="text-3xl font-bold mb-6">Help & Support</h1>

      <div className="max-w-4xl">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div className="faq-item border rounded-lg p-4">
              <h3 className="font-semibold mb-2">How do I create a business listing?</h3>
              <p className="text-gray-600">
                Navigate to your dashboard and click "Create Listing" to start the process.
              </p>
            </div>

            <div className="faq-item border rounded-lg p-4">
              <h3 className="font-semibold mb-2">How does the matching algorithm work?</h3>
              <p className="text-gray-600">
                Our AI-powered system matches buyers and sellers based on industry, size, location,
                and other criteria.
              </p>
            </div>

            <div className="faq-item border rounded-lg p-4">
              <h3 className="font-semibold mb-2">What are the fees?</h3>
              <p className="text-gray-600">
                We operate on a success-fee model. View our pricing page for detailed information.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-800 mb-2">Need More Help?</h3>
          <p className="text-blue-700 mb-4">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
