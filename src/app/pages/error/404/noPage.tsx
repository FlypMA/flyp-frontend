// 🚫 404 Not Found Page
// Location: src/app/pages/error/404/noPage.tsx
// Purpose: 404 error page

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NoPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="no-page min-h-screen flex items-center justify-center p-6">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Page Not Found</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mr-4"
          >
            Go Back
          </button>
          <Link to="/" className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoPage;
