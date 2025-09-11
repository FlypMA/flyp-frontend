// 🏢 Sellers Landing Page
// Location: src/app/pages/landingPages/sellers/sellers.tsx
// Purpose: Landing page for business sellers

import React from 'react';
import { Link } from 'react-router-dom';

const SellersPage: React.FC = () => {
  return (
    <div className="sellers-page">
      <div className="hero-section bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Sell Your Business with Confidence</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Connect with serious buyers, get professional valuations, and maximize your business
            value with Europe's premier M&A platform.
          </p>
          <div className="space-x-4">
            <Link
              to="/auth/signup?role=seller"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              List Your Business
            </Link>
            <Link
              to="/valuation"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              Get Free Valuation
            </Link>
          </div>
        </div>
      </div>

      <div className="features-section py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Sellers Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card text-center p-6">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Maximum Value</h3>
              <p className="text-gray-600">Professional valuations and strategic buyer matching.</p>
            </div>
            <div className="feature-card text-center p-6">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-2">Confidential Process</h3>
              <p className="text-gray-600">
                Protect your business information throughout the sale.
              </p>
            </div>
            <div className="feature-card text-center p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Fast Execution</h3>
              <p className="text-gray-600">Streamlined process from listing to closing.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellersPage;
