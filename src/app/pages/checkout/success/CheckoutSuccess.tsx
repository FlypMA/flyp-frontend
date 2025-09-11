// ✅ Checkout Success Page
// Location: src/app/pages/checkout/success/CheckoutSuccess.tsx
// Purpose: Successful checkout confirmation page

import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSuccess: React.FC = () => {
  return (
    <div className="checkout-success p-6 text-center">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <div className="text-6xl text-green-500 mb-4">✅</div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your account has been upgraded.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/dashboard"
            className="block w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/"
            className="block w-full border border-gray-300 py-2 px-4 rounded hover:bg-gray-50"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
