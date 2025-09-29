/**
 * 🎯 Unified Profile Page
 *
 * Single component that renders the profile card interface
 * Clean, minimalistic profile page with Airbnb-inspired design
 */

import React from 'react';
import { ProfilePageWrapper } from './ProfilePageWrapper';

// =============================================================================
// COMPONENT INTERFACE
// =============================================================================

interface UnifiedProfilePageProps {
  isOwnProfile?: boolean;
  onProfileUpdate?: () => void;
  className?: string;
}

// =============================================================================
// UNIFIED PROFILE PAGE COMPONENT
// =============================================================================

export const UnifiedProfilePage: React.FC<UnifiedProfilePageProps> = ({
  isOwnProfile = false,
  onProfileUpdate,
  className = '',
}) => {
  // =============================================================================
  // MAIN RENDER
  // =============================================================================

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfilePageWrapper
          isOwnProfile={isOwnProfile}
          onProfileUpdate={onProfileUpdate}
        />
      </div>
    </div>
  );
};

export default UnifiedProfilePage;
