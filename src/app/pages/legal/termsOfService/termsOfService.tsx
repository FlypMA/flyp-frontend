// 📜 Terms of Service Page
// Location: src/app/pages/legal/termsOfService/termsOfService.tsx
// Purpose: Terms of service page

import React from 'react';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="terms-of-service-page p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            <strong>Last updated:</strong> January 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing and using BetweenDeals, you accept and agree to be bound by the terms and
              provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
            <p className="text-gray-700 mb-4">
              Permission is granted to temporarily access the materials on BetweenDeals for
              personal, non-commercial transitory viewing only.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Disclaimer</h2>
            <p className="text-gray-700 mb-4">
              The materials on BetweenDeals are provided on an 'as is' basis. BetweenDeals makes no
              warranties, expressed or implied.
            </p>
          </section>

          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-sm text-gray-600">
              🚧 This is a placeholder terms of service document. The complete legal document is
              under review by our legal team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
