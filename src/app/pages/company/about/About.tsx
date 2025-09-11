// ℹ️ About Us Page (Placeholder)
// Location: src/app/pages/company/about/About.tsx
// Purpose: Company about page

import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">About Flyp</h1>

      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're revolutionizing the European SME M&A market by connecting the right buyers and
            sellers through intelligent matching and comprehensive transaction support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              To democratize access to M&A opportunities for small and medium enterprises across
              Europe, making business transactions more efficient, transparent, and successful.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-gray-600 mb-4">
              To become Europe's leading platform for SME transactions, fostering economic growth
              through strategic business combinations and partnerships.
            </p>
          </div>
        </div>

        <div className="text-center bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Key Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-blue-600">500+</div>
              <p className="text-gray-600">Successful Transactions</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">€2.5B+</div>
              <p className="text-gray-600">Total Transaction Value</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">15+</div>
              <p className="text-gray-600">European Countries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
