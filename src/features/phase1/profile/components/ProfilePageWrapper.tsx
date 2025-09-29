/**
 * 👤 Profile Page Wrapper
 *
 * Wrapper component that fetches profile data and renders the RoleBasedProfilePage
 * This handles the data fetching logic and provides proper loading/error states
 */

import React, { useEffect } from 'react';
import { useProfile } from '../hooks/useProfile';
import { RoleBasedProfilePage } from './RoleBasedProfilePage';

// =============================================================================
// COMPONENT INTERFACE
// =============================================================================

interface ProfilePageWrapperProps {
  isOwnProfile?: boolean;
  onProfileUpdate?: () => void;
  _onProfileDelete?: () => void;
  className?: string;
}

// =============================================================================
// PROFILE PAGE WRAPPER COMPONENT
// =============================================================================

export const ProfilePageWrapper: React.FC<ProfilePageWrapperProps> = ({
  isOwnProfile = false,
  onProfileUpdate,
  _onProfileDelete,
  className = '',
}) => {
  const { profile, loading: profileLoading, error: profileError, refreshProfile } = useProfile();

  // =============================================================================
  // EFFECTS
  // =============================================================================

  useEffect(() => {
    if (isOwnProfile) {
      refreshProfile();
    }
  }, [isOwnProfile, refreshProfile]);

  // =============================================================================
  // EVENT HANDLERS
  // =============================================================================

  const handleProfileUpdate = async () => {
    try {
      onProfileUpdate?.();
    } catch (error) {
      // TODO: Add error notification
      // Error handling for profile update
    }
  };

  // Profile deletion handler (currently unused but kept for future implementation)
  // const handleProfileDelete = async () => {
  //   try {
  //     onProfileDelete?.();
  //   } catch (error) {
  //     // TODO: Add error notification
  //     // Error handling for profile deletion
  //   }
  // };

  // =============================================================================
  // LOADING AND ERROR STATES
  // =============================================================================

  if (profileLoading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${className}`}>
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">
            <i className="fas fa-exclamation-triangle" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 mb-4">{profileError}</p>
          <button
            onClick={refreshProfile}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${className}`}>
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">
            <i className="fas fa-user" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Profile Found</h2>
          <p className="text-gray-600">This profile could not be found or is not accessible.</p>
        </div>
      </div>
    );
  }

  // =============================================================================
  // MAIN RENDER
  // =============================================================================

        return (
          <RoleBasedProfilePage
            profile={profile}
            isOwnProfile={isOwnProfile}
            onProfileUpdate={handleProfileUpdate}
            className={className}
          />
        );
};

export default ProfilePageWrapper;
