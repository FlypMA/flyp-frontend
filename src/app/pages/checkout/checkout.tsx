// 💳 Checkout Page
// Location: src/app/pages/checkout/checkout.tsx
// Purpose: Checkout process page

import React from 'react';

const CheckoutPage: React.FC = () => {
  return (
    <div className="checkout-page p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="max-w-md mx-auto">
        <p className="text-gray-600 mb-4">Complete your purchase to access premium features.</p>
        <div className="space-y-4">
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Complete Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
