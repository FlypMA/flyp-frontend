// 💼 Buyers Landing Page
// Location: src/app/pages/landingPages/buyers/buyers.tsx
// Purpose: Landing page for business buyers

import React from 'react';
import { Link } from 'react-router-dom';

const BuyersPage: React.FC = () => {
  return (
    <div className="buyers-page">
      <div className="hero-section bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Find Your Next Business Opportunity</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Discover quality businesses for sale across Europe with comprehensive due diligence
            support and expert guidance throughout your acquisition journey.
          </p>
          <div className="space-x-4">
            <Link
              to="/auth/signup?role=buyer"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Searching
            </Link>
            <Link
              to="/marketplace"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Browse Listings
            </Link>
          </div>
        </div>
      </div>

      <div className="features-section py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Buyers Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card text-center p-6">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">Quality Listings</h3>
              <p className="text-gray-600">
                Vetted businesses with verified financial information.
              </p>
            </div>
            <div className="feature-card text-center p-6">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
              <p className="text-gray-600">AI-powered recommendations based on your criteria.</p>
            </div>
            <div className="feature-card text-center p-6">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">Professional guidance from deal sourcing to closing.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyersPage;
