/**
 * 👤 User Profile Page
 *
 * Production-ready profile page with role-based design
 * Integrated with routing system and URL generator
 */

import { UnifiedProfilePage } from '@/features/phase1/profile';
import React from 'react';

// =============================================================================
// USER PROFILE PAGE COMPONENT
// =============================================================================

const UserProfileNew: React.FC = () => {
  return (
    <UnifiedProfilePage
      isOwnProfile={true}
      onProfileUpdate={() => {
        // Profile updated successfully
        // TODO: Add success notification
      }}
    />
  );
};

export default UserProfileNew;
