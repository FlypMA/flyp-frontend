// 📜 Terms and Conditions Page
// Location: src/app/pages/legal/termsAndConditions/TermsAndConditions.tsx
// Purpose: Terms and conditions page

import React from 'react';

const TermsAndConditionsPage: React.FC = () => {
  return (
    <div className="terms-and-conditions-page p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            <strong>Last updated:</strong> January 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-4">
              These Terms and Conditions govern your use of the Flyp platform and services. By using
              our platform, you agree to comply with these terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
            <p className="text-gray-700 mb-4">
              You are responsible for maintaining the confidentiality of your account credentials
              and for all activities that occur under your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibent mb-4">3. Platform Use</h2>
            <p className="text-gray-700 mb-4">
              You may use our platform for legitimate business purposes in accordance with
              applicable laws and regulations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Prohibited Activities</h2>
            <ul className="text-gray-700 mb-4 list-disc list-inside space-y-2">
              <li>Fraudulent or misleading business listings</li>
              <li>Harassment or inappropriate communication</li>
              <li>Violation of applicable laws or regulations</li>
              <li>Attempt to circumvent platform security measures</li>
            </ul>
          </section>

          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-sm text-gray-600">
              🚧 This is a placeholder terms and conditions document. The complete legal document is
              under review by our legal team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
