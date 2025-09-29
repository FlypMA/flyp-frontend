/**
 * 🎣 useProfile Hook - Profile Management
 *
 * Custom React hook for managing profile state and operations
 */

import { useAuth } from '@/app/providers/auth-provider';
import { useCallback, useEffect, useState } from 'react';
import { mockProfileService } from '../services/mockProfileService';
import { profileService } from '../services/profileService';
import { CreateProfileRequest, Profile, UpdateProfileRequest } from '../types/profile.types';

// Use mock service for development/testing
const isDevelopment =
  import.meta.env.MODE === 'development' || import.meta.env.VITE_USE_MOCK === 'true';
const service = isDevelopment ? mockProfileService : profileService;

// =============================================================================
// HOOK INTERFACE
// =============================================================================

interface UseProfileReturn {
  // Profile Data
  profile: Profile | null;
  loading: boolean;
  error: string | null;

  // Profile Operations
  // eslint-disable-next-line no-unused-vars
  createProfile: (_data: CreateProfileRequest) => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  updateProfile: (_data: UpdateProfileRequest) => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  updateProfileSection: (_section: string, _data: Record<string, unknown>) => Promise<void>;
  deleteProfile: () => Promise<void>;

  // Profile Image Operations
  // eslint-disable-next-line no-unused-vars
  uploadProfileImage: (_file: File) => Promise<void>;
  deleteProfileImage: () => Promise<void>;

  // Profile Settings
  // eslint-disable-next-line no-unused-vars
  updateVisibility: (_visibility: string) => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  updateCommunicationPreferences: (_preferences: Record<string, unknown>) => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  updatePrivacySettings: (_settings: Record<string, unknown>) => Promise<void>;

  // Profile Status
  refreshProfile: () => Promise<void>;
  hasProfile: boolean;
  isProfileComplete: boolean;

  // Profile Search
  // eslint-disable-next-line no-unused-vars
  searchProfiles: (_filters: Record<string, unknown>) => Promise<Profile[]>;
  getProfileRecommendations: () => Promise<Profile[]>;

  // Profile Export
  // eslint-disable-next-line no-unused-vars
  exportProfileData: (_format: 'json' | 'pdf') => Promise<Blob>;
}

// =============================================================================
// USE PROFILE HOOK
// =============================================================================

export const useProfile = (): UseProfileReturn => {
  const { user, isAuthenticated } = useAuth();

  // State
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // =============================================================================
  // PROFILE OPERATIONS
  // =============================================================================

  /**
   * Create new profile
   */
  const createProfile = useCallback(
    async (_data: CreateProfileRequest): Promise<void> => {
      if (!isAuthenticated) {
        throw new Error('User must be authenticated to create profile');
      }

      setLoading(true);
      setError(null);

      try {
        const newProfile = await service.createProfile(_data);
        setProfile(newProfile);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to create profile';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated]
  );

  /**
   * Update profile
   */
  const updateProfile = useCallback(
    async (_data: UpdateProfileRequest): Promise<void> => {
      if (!profile) {
        throw new Error('No profile to update');
      }

      setLoading(true);
      setError(null);

      try {
        const updatedProfile = await service.updateProfile(_data);
        setProfile(updatedProfile);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [profile]
  );

  /**
   * Update specific profile section
   */
  const updateProfileSection = useCallback(
    async (_section: string, _data: Record<string, unknown>): Promise<void> => {
      if (!profile) {
        throw new Error('No profile to update');
      }

      setLoading(true);
      setError(null);

      try {
        const updatedProfile = await service.updateProfileSection(_section, _data);
        setProfile(updatedProfile);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to update profile section';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [profile]
  );

  /**
   * Delete profile
   */
  const deleteProfile = useCallback(async (): Promise<void> => {
    if (!profile) {
      throw new Error('No profile to delete');
    }

    setLoading(true);
    setError(null);

    try {
      await service.deleteProfile();
      setProfile(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete profile';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [profile]);

  // =============================================================================
  // PROFILE IMAGE OPERATIONS
  // =============================================================================

  /**
   * Upload profile image
   */
  const uploadProfileImage = useCallback(
    async (_file: File): Promise<void> => {
      if (!profile) {
        throw new Error('No profile to update');
      }

      setLoading(true);
      setError(null);

      try {
        const result = await service.uploadProfileImage(_file);

        // Update profile with new image URL
        setProfile(prev =>
          prev
            ? {
                ...prev,
                personalInfo: {
                  ...prev.personalInfo,
                  avatarUrl: 'imageUrl' in result ? result.imageUrl : result.url,
                },
              }
            : null
        );
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to upload profile image';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [profile]
  );

  /**
   * Delete profile image
   */
  const deleteProfileImage = useCallback(async (): Promise<void> => {
    if (!profile) {
      throw new Error('No profile to update');
    }

    setLoading(true);
    setError(null);

    try {
      await service.deleteProfileImage();

      // Update profile to remove image
      setProfile(prev =>
        prev
          ? {
              ...prev,
              personalInfo: {
                ...prev.personalInfo,
                avatar: undefined,
                avatarUrl: undefined,
              },
            }
          : null
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete profile image';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [profile]);

  // =============================================================================
  // PROFILE SETTINGS OPERATIONS
  // =============================================================================

  /**
   * Update profile visibility
   */
  const updateVisibility = useCallback(
    async (_visibility: string): Promise<void> => {
      if (!profile) {
        throw new Error('No profile to update');
      }

      setLoading(true);
      setError(null);

      try {
        const updatedProfile = await service.updateProfileVisibility(_visibility);
        setProfile(updatedProfile);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to update visibility';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [profile]
  );

  /**
   * Update communication preferences
   */
  const updateCommunicationPreferences = useCallback(
    async (_preferences: Record<string, unknown>): Promise<void> => {
      if (!profile) {
        throw new Error('No profile to update');
      }

      setLoading(true);
      setError(null);

      try {
        const updatedProfile = await service.updateCommunicationPreferences(_preferences);
        setProfile(updatedProfile);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to update communication preferences';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [profile]
  );

  /**
   * Update privacy settings
   */
  const updatePrivacySettings = useCallback(
    async (_settings: Record<string, unknown>): Promise<void> => {
      if (!profile) {
        throw new Error('No profile to update');
      }

      setLoading(true);
      setError(null);

      try {
        const updatedProfile = await service.updatePrivacySettings(_settings);
        setProfile(updatedProfile);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to update privacy settings';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [profile]
  );

  // =============================================================================
  // PROFILE STATUS OPERATIONS
  // =============================================================================

  /**
   * Refresh profile data
   */
  const refreshProfile = useCallback(async (): Promise<void> => {
    if (!isAuthenticated) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const profileData = await service.getProfile();
      setProfile(profileData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch profile';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // =============================================================================
  // PROFILE SEARCH OPERATIONS
  // =============================================================================

  /**
   * Search profiles
   */
  const searchProfiles = useCallback(
    async (_filters: Record<string, unknown>): Promise<Profile[]> => {
      try {
        // Handle different service signatures
        const result = isDevelopment
          ? await (service as any).searchProfiles('', _filters)
          : await (service as any).searchProfiles(_filters);
        return Array.isArray(result) ? result : result.data;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to search profiles';
        setError(errorMessage);
        throw err;
      }
    },
    []
  );

  /**
   * Get profile recommendations
   */
  const getProfileRecommendations = useCallback(async (): Promise<Profile[]> => {
    try {
      return await service.getProfileRecommendations();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get recommendations';
      setError(errorMessage);
      throw err;
    }
  }, []);

  // =============================================================================
  // PROFILE EXPORT OPERATIONS
  // =============================================================================

  /**
   * Export profile data
   */
  const exportProfileData = useCallback(
    async (_format: 'json' | 'pdf'): Promise<Blob> => {
      if (!profile) {
        throw new Error('No profile to export');
      }

      try {
        return await service.exportProfileData(_format);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to export profile';
        setError(errorMessage);
        throw err;
      }
    },
    [profile]
  );

  // =============================================================================
  // COMPUTED VALUES
  // =============================================================================

  const hasProfile = Boolean(profile);
  const isProfileComplete = profile ? true : false; // Simplified - always complete if profile exists

  // =============================================================================
  // EFFECTS
  // =============================================================================

  /**
   * Load profile on mount and when user changes
   */
  useEffect(() => {
    if (isAuthenticated && user) {
      refreshProfile();
    } else {
      setProfile(null);
      setError(null);
    }
  }, [isAuthenticated, user, refreshProfile]);

  // =============================================================================
  // RETURN HOOK INTERFACE
  // =============================================================================

  return {
    // Profile Data
    profile,
    loading,
    error,

    // Profile Operations
    createProfile,
    updateProfile,
    updateProfileSection,
    deleteProfile,

    // Profile Image Operations
    uploadProfileImage,
    deleteProfileImage,

    // Profile Settings
    updateVisibility,
    updateCommunicationPreferences,
    updatePrivacySettings,

    // Profile Status
    refreshProfile,
    hasProfile,
    isProfileComplete,

    // Profile Search
    searchProfiles,
    getProfileRecommendations,

    // Profile Export
    exportProfileData,
  };
};
