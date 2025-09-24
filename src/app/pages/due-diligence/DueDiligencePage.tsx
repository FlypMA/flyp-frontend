/**
 * Due Diligence Page
 * Location: src/app/pages/due-diligence/DueDiligencePage.tsx
 * Purpose: Main page for due diligence process management
 */

import { useAuth } from '@/app/providers/auth-provider';
import { DueDiligenceDashboard } from '@/shared/components/due-diligence';
import { shouldBypassProtectedRoute } from '@/shared/utils/dev/devBypass';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DueDiligencePage: React.FC = () => {
  const { processId, listingId } = useParams<{ processId: string; listingId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<'buyer' | 'seller' | 'advisor'>('buyer');

  useEffect(() => {
    // Skip authentication check if dev bypass is enabled
    if (!shouldBypassProtectedRoute() && !user) {
      navigate('/login');
      return;
    }

    // Determine user role based on user data
    // TODO: Replace with actual role determination logic
    if (user && user.role === 'buyer') {
      setUserRole('buyer');
    } else if (user && user.role === 'seller') {
      setUserRole('seller');
    } else {
      // Default to buyer for dev bypass or unknown roles
      setUserRole('buyer');
    }
  }, [user, navigate]);

  if (!processId || !listingId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Due Diligence Process</h1>
          <p className="text-gray-600 mb-6">
            The due diligence process ID or listing ID is missing from the URL.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DueDiligenceDashboard processId={processId} listingId={listingId} userRole={userRole} />
      </div>
    </div>
  );
};

export default DueDiligencePage;
