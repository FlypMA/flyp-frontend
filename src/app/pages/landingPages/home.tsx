// 🏠 Home Landing Page (Placeholder)
// Location: src/app/pages/landingPages/home.tsx
// Purpose: Main landing page

import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="hero-section bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Europe's Premier SME M&A Platform</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Connect buyers and sellers, streamline transactions, and accelerate business growth with
            our comprehensive M&A marketplace.
          </p>
          <div className="space-x-4">
            <Link
              to="/auth/signup"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started
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
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose BetweenDeals?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card text-center p-6">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Targeted Matching</h3>
              <p className="text-gray-600">
                Smart algorithms connect the right buyers with sellers.
              </p>
            </div>
            <div className="feature-card text-center p-6">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
              <p className="text-gray-600">End-to-end security for confidential deal management.</p>
            </div>
            <div className="feature-card text-center p-6">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">Professional guidance throughout your M&A journey.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
