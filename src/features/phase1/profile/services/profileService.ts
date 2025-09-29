/**
 * 🔧 Profile Service - API Integration
 *
 * Service for managing profile-related API operations
 */

import { UserRole } from '@/shared/types';
import {
    CreateProfileRequest,
    Profile,
    ProfileListResponse,
    ProfileResponse,
    UpdateProfileRequest,
} from '../types/profile.types';

// =============================================================================
// PROFILE SERVICE CLASS
// =============================================================================

class ProfileService {
  private baseUrl = '/api/users/profile';

  /**
   * Get current user's profile
   */
  async getProfile(): Promise<Profile> {
    const response = await fetch(this.baseUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getAuthToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.statusText}`);
    }

    const data: ProfileResponse = await response.json();
    return data.data;
  }

  /**
   * Get profile by ID (public profile)
   */
  async getProfileById(profileId: string): Promise<Profile> {
    const response = await fetch(`${this.baseUrl}/${profileId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.statusText}`);
    }

    const data: ProfileResponse = await response.json();
    return data.data;
  }

  /**
   * Create new profile
   */
  async createProfile(profileData: CreateProfileRequest): Promise<Profile> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getAuthToken()}`,
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create profile: ${response.statusText}`);
    }

    const data: ProfileResponse = await response.json();
    return data.data;
  }

  /**
   * Update profile
   */
  async updateProfile(profileData: UpdateProfileRequest): Promise<Profile> {
      const response = await fetch(this.baseUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.getAuthToken()}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.statusText}`);
      }

      const data: ProfileResponse = await response.json();
      return data.data;
  }

  /**
   * Update specific profile section
   */
  async updateProfileSection(section: string, data: any): Promise<Profile> {
      const response = await fetch(`${this.baseUrl}/section/${section}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.getAuthToken()}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to update profile section: ${response.statusText}`);
      }

      const result: ProfileResponse = await response.json();
      return result.data;
  }

  /**
   * Upload profile image
   */
  async uploadProfileImage(file: File): Promise<{ url: string; key: string }> {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${this.baseUrl}/upload-image`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.getAuthToken()}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload image: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
  }

  /**
   * Delete profile image
   */
  async deleteProfileImage(): Promise<void> {
      const response = await fetch(`${this.baseUrl}/delete-image`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${this.getAuthToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete image: ${response.statusText}`);
      }
  }

  /**
   * Search profiles
   */
  async searchProfiles(filters: ProfileSearchFilters): Promise<Profile[]> {
      const queryParams = new URLSearchParams();

      if (filters.role) queryParams.append('role', filters.role);
      if (filters.industry) queryParams.append('industry', filters.industry);
      if (filters.country) queryParams.append('country', filters.country);
      if (filters.city) queryParams.append('city', filters.city);
      if (filters.verified) queryParams.append('verified', filters.verified.toString());
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.page) queryParams.append('page', filters.page.toString());
      if (filters.limit) queryParams.append('limit', filters.limit.toString());

      const response = await fetch(`${this.baseUrl}/search?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to search profiles: ${response.statusText}`);
      }

      const data: ProfileListResponse = await response.json();
      return data.data;
  }

  /**
   * Get profile recommendations
   */
  async getProfileRecommendations(): Promise<Profile[]> {
      const response = await fetch(`${this.baseUrl}/recommendations`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.getAuthToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to get recommendations: ${response.statusText}`);
      }

      const data: ProfileListResponse = await response.json();
      return data.data;
  }

  /**
   * Update profile visibility
   */
  async updateProfileVisibility(visibility: string): Promise<Profile> {
      const response = await fetch(`${this.baseUrl}/visibility`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.getAuthToken()}`,
        },
        body: JSON.stringify({ visibility }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update visibility: ${response.statusText}`);
      }

      const data: ProfileResponse = await response.json();
      return data.data;
  }

  /**
   * Update communication preferences
   */
  async updateCommunicationPreferences(preferences: any): Promise<Profile> {
      const response = await fetch(`${this.baseUrl}/communication-preferences`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.getAuthToken()}`,
        },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) {
        throw new Error(`Failed to update communication preferences: ${response.statusText}`);
      }

      const data: ProfileResponse = await response.json();
      return data.data;
  }

  /**
   * Update privacy settings
   */
  async updatePrivacySettings(settings: any): Promise<Profile> {
      const response = await fetch(`${this.baseUrl}/privacy-settings`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.getAuthToken()}`,
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error(`Failed to update privacy settings: ${response.statusText}`);
      }

      const data: ProfileResponse = await response.json();
      return data.data;
  }


  /**
   * Get profile strength score
   */
  async getProfileStrength(): Promise<{ score: number; factors: any }> {
      const response = await fetch(`${this.baseUrl}/strength`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.getAuthToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to get strength score: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
  }

  /**
   * Delete profile
   */
  async deleteProfile(): Promise<void> {
      const response = await fetch(this.baseUrl, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${this.getAuthToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete profile: ${response.statusText}`);
      }
  }

  /**
   * Export profile data
   */
  async exportProfileData(format: 'json' | 'pdf' = 'json'): Promise<Blob> {
      const response = await fetch(`${this.baseUrl}/export?format=${format}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.getAuthToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to export profile: ${response.statusText}`);
      }

      return await response.blob();
  }

  /**
   * Get authentication token
   */
  private getAuthToken(): string {
    // This should be implemented based on your auth system
    // For now, returning empty string - implement based on your auth context
    return localStorage.getItem('authToken') || '';
  }
}

// =============================================================================
// PROFILE SEARCH FILTERS INTERFACE
// =============================================================================

export interface ProfileSearchFilters {
  role?: UserRole;
  industry?: string;
  country?: string;
  city?: string;
  verified?: boolean;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: 'relevance' | 'date' | 'name' | 'rating';
  sortOrder?: 'asc' | 'desc';
}

// =============================================================================
// EXPORT SERVICE INSTANCE
// =============================================================================

export const profileService = new ProfileService();
