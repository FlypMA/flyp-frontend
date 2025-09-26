/**
 * 👤 User Profile Page
 *
 * Production-ready profile page with role-based design
 * Integrated with routing system and URL generator
 */

import { ProfilePage } from '@/features/phase1/profile';
import React from 'react';

// =============================================================================
// USER PROFILE PAGE COMPONENT
// =============================================================================

const UserProfileNew: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfilePage
          isOwnProfile={true}
          onProfileUpdate={() => {
            // Profile updated successfully
            // TODO: Add success notification
          }}
          onProfileDelete={() => {
            // Profile deleted successfully
            // TODO: Add success notification
          }}
        />
      </div>
    </div>
  );
};

export default UserProfileNew;
