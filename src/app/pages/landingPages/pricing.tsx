// 💰 Pricing Page
// Location: src/app/pages/landingPages/pricing.tsx
// Purpose: Pricing and subscription plans page

import React from 'react';

const PricingPage: React.FC = () => {
  return (
    <div className="pricing-page p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600">Choose the plan that works best for your business</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Free Plan */}
          <div className="pricing-card border rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Free</h3>
            <div className="text-4xl font-bold mb-4">€0</div>
            <p className="text-gray-600 mb-6">Perfect for getting started</p>
            <ul className="text-left space-y-2 mb-8">
              <li className="flex items-center">✓ 1 Business Listing</li>
              <li className="flex items-center">✓ Basic Search</li>
              <li className="flex items-center">✓ Community Support</li>
            </ul>
            <button className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded">
              Get Started
            </button>
          </div>

          {/* Pro Plan */}
          <div className="pricing-card border border-blue-500 rounded-lg p-8 text-center relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold mb-2">Professional</h3>
            <div className="text-4xl font-bold mb-4">
              €99<span className="text-lg">/month</span>
            </div>
            <p className="text-gray-600 mb-6">For growing businesses</p>
            <ul className="text-left space-y-2 mb-8">
              <li className="flex items-center">✓ 10 Business Listings</li>
              <li className="flex items-center">✓ Advanced Search & Filters</li>
              <li className="flex items-center">✓ Priority Support</li>
              <li className="flex items-center">✓ Analytics Dashboard</li>
            </ul>
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Start Free Trial
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="pricing-card border rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
            <div className="text-4xl font-bold mb-4">Custom</div>
            <p className="text-gray-600 mb-6">For large organizations</p>
            <ul className="text-left space-y-2 mb-8">
              <li className="flex items-center">✓ Unlimited Listings</li>
              <li className="flex items-center">✓ White-label Solution</li>
              <li className="flex items-center">✓ Dedicated Account Manager</li>
              <li className="flex items-center">✓ Custom Integration</li>
            </ul>
            <button className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900">
              Contact Sales
            </button>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-800">
            🚧 Pricing details are being finalized. Contact us for current rates and custom
            packages.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
