/**
 * Transaction Completion Page
 * Location: src/app/pages/transaction-completion/TransactionCompletionPage.tsx
 * Purpose: Main page for transaction completion and closing
 */

import { useAuth } from '@/app/providers/auth-provider';
import { TransactionCompletionDashboard } from '@/shared/components/transaction-completion';
import { shouldBypassProtectedRoute } from '@/shared/utils/dev/devBypass';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TransactionCompletionPage: React.FC = () => {
  const { transactionId } = useParams<{ transactionId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<'buyer' | 'seller' | 'advisor'>('buyer');

  useEffect(() => {
    // Skip authentication check if dev bypass is enabled
    if (!shouldBypassProtectedRoute() && !user) {
      navigate('/login');
      return;
    }

    if (!transactionId) {
      navigate('/offers');
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
  }, [user, navigate, transactionId]);

  // Skip loading state if dev bypass is enabled
  if (!shouldBypassProtectedRoute() && !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h1>
          <p className="text-gray-600 mb-6">
            Please log in to access the transaction completion system.
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

  if (!transactionId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Transaction Not Found</h1>
          <p className="text-gray-600 mb-6">
            No transaction ID provided. Please access this page from a valid transaction.
          </p>
          <button
            onClick={() => navigate('/offers')}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            View Offers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TransactionCompletionDashboard
          transactionId={transactionId}
          userRole={userRole}
          userId={user?.id || 'dev-user-123'}
        />
      </div>
    </div>
  );
};

export default TransactionCompletionPage;
