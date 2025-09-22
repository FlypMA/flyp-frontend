/**
 * 🔒 NDA Route Guard - flyp MVP
 * Protects private listing routes with NDA verification
 *
 * FEATURES:
 * - NDA status verification
 * - Automatic redirect to public listing if NDA not signed
 * - NDA expiration handling
 * - User authentication verification
 */

import { useAuth } from '@/app/providers/auth-provider';
import { Button } from '@/shared/components/buttons';
import NDAModal from '@/shared/components/modals/NDAModal';
import { Card, CardBody } from '@heroui/react';
import { AlertTriangle, Lock, Shield } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

interface NDARouteGuardProps {
  children: React.ReactNode;
}

interface NDAStatus {
  status: 'verified' | 'pending' | 'expired' | 'none';
  signedAt?: string;
  expiresAt?: string;
  listingId: string;
  userId: string;
}

const NDARouteGuard: React.FC<NDARouteGuardProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const { id: listingId } = useParams();
  const [ndaStatus, setNdaStatus] = useState<NDAStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setIsNdaModalOpen] = useState(false);

  const checkNdaStatus = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call to check NDA status
      // For now, simulate NDA verification
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock NDA status - in real implementation, this would come from API
      const mockNdaStatus: NDAStatus = {
        status: 'verified', // NDA is verified after signing
        signedAt: '2024-01-15T10:30:00Z',
        expiresAt: '2024-12-31T23:59:59Z',
        listingId: listingId || '',
        userId: user?.id || '',
      };

      setNdaStatus(mockNdaStatus);
    } catch {
      setNdaStatus({
        status: 'none',
        listingId: listingId || '',
        userId: user?.id || '',
      });
    } finally {
      setIsLoading(false);
    }
  }, [listingId, user?.id]);

  useEffect(() => {
    if (isAuthenticated && user && listingId) {
      checkNdaStatus();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, user, listingId, checkNdaStatus]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying NDA access...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  // Check NDA status
  if (!ndaStatus || ndaStatus.status === 'none') {
    return <NDAAccessDenied reason="no_nda" listingId={listingId} />;
  }

  if (ndaStatus.status === 'expired') {
    return <NDAAccessDenied reason="expired" listingId={listingId} />;
  }

  if (ndaStatus.status === 'pending') {
    return <NDAAccessDenied reason="pending" listingId={listingId} />;
  }

  // NDA is verified, render protected content
  return <>{children}</>;
};

interface NDAAccessDeniedProps {
  reason: 'no_nda' | 'expired' | 'pending';
  listingId?: string;
}

const NDAAccessDenied: React.FC<NDAAccessDeniedProps> = ({ reason, listingId }) => {
  const [isNdaModalOpen, setIsNdaModalOpen] = useState(false);

  const getContent = () => {
    switch (reason) {
      case 'no_nda':
        return {
          icon: Lock,
          title: 'NDA Required',
          description:
            'You need to sign a Non-Disclosure Agreement to access this private listing.',
          buttonText: 'Sign NDA to Access',
          buttonAction: () => {},
        };
      case 'expired':
        return {
          icon: AlertTriangle,
          title: 'NDA Expired',
          description:
            'Your Non-Disclosure Agreement has expired. Please sign a new NDA to continue accessing this listing.',
          buttonText: 'Renew NDA',
          buttonAction: () => {},
        };
      case 'pending':
        return {
          icon: Shield,
          title: 'NDA Pending',
          description:
            'Your NDA is being processed. Please wait for verification or contact support if this takes longer than expected.',
          buttonText: 'Check Status',
          buttonAction: () => (window.location.href = `/listings/${listingId}`),
        };
    }
  };

  const content = getContent();
  const IconComponent = content.icon;

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto p-6">
          <Card>
            <CardBody className="text-center p-8">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <IconComponent className="w-8 h-8 text-red-600" />
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-4">{content.title}</h1>

              <p className="text-gray-600 mb-8 leading-relaxed">{content.description}</p>

              <div className="space-y-3">
                <Button variant="primary" className="w-full" onPress={content.buttonAction}>
                  {content.buttonText}
                </Button>

                <Button
                  variant="secondary"
                  className="w-full"
                  onPress={() => (window.location.href = '/listings')}
                >
                  Browse Other Listings
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <NDAModal
        isOpen={isNdaModalOpen}
        onClose={() => setIsNdaModalOpen(false)}
        onAccept={() => {}}
        listingTitle="Premium Restaurant Chain - Brussels"
        sellerName="Business Owner"
        isLoading={false}
      />
    </>
  );
};

export default NDARouteGuard;
