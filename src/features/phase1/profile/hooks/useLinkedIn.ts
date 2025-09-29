/**
 * 🔗 LinkedIn Integration Hook
 *
 * Custom hook for managing LinkedIn profile integration
 */

import { useCallback, useState } from 'react';
import { LinkedInProfile, linkedinService } from '../services/linkedinService';
import { BusinessOwnerProfile, InvestorProfile, PersonalInfo } from '../types/profile.types';

interface UseLinkedInOptions {
  // eslint-disable-next-line no-unused-vars
  onSuccess?: (_data: LinkedInImportData) => void;
  // eslint-disable-next-line no-unused-vars
  onError?: (_error: Error) => void;
}

interface LinkedInImportData {
  personalInfo: Partial<PersonalInfo>;
  businessData?: Partial<BusinessOwnerProfile>;
  investorData?: Partial<InvestorProfile>;
}

interface UseLinkedInReturn {
  // State
  isLoading: boolean;
  isConnected: boolean;
  error: Error | null;
  profile: LinkedInProfile | null;

  // Actions
  connectLinkedIn: () => void;
  // eslint-disable-next-line no-unused-vars
  importProfile: (_accessToken: string) => Promise<LinkedInImportData>;
  disconnectLinkedIn: () => void;
  clearError: () => void;
}

export const useLinkedIn = (options: UseLinkedInOptions = {}): UseLinkedInReturn => {
  const { onSuccess, onError } = options;

  // =============================================================================
  // STATE
  // =============================================================================

  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [profile, setProfile] = useState<LinkedInProfile | null>(null);

  // =============================================================================
  // ACTIONS
  // =============================================================================

  /**
   * Connect to LinkedIn (redirect to authorization)
   */
  const connectLinkedIn = useCallback(() => {
    try {
      const authUrl = linkedinService.getAuthorizationUrl();
      window.location.href = authUrl;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to connect to LinkedIn');
      setError(error);
      onError?.(error);
    }
  }, [onError]);

  /**
   * Import profile data from LinkedIn
   */
  const importProfile = useCallback(
    async (_accessToken: string): Promise<LinkedInImportData> => {
      setIsLoading(true);
      setError(null);

      try {
        const importData = await linkedinService.importProfile(_accessToken);

        // Get full profile for display
        const fullProfile = await linkedinService.getProfile(_accessToken);
        setProfile(fullProfile);
        setIsConnected(true);

        onSuccess?.(importData as unknown as LinkedInImportData);
        return importData as unknown as LinkedInImportData;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to import LinkedIn profile');
        setError(error);
        onError?.(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [onSuccess, onError]
  );

  /**
   * Disconnect LinkedIn integration
   */
  const disconnectLinkedIn = useCallback(() => {
    setIsConnected(false);
    setProfile(null);
    setError(null);
  }, []);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // =============================================================================
  // RETURN
  // =============================================================================

  return {
    // State
    isLoading,
    isConnected,
    error,
    profile,

    // Actions
    connectLinkedIn,
    importProfile,
    disconnectLinkedIn,
    clearError,
  };
};

export default useLinkedIn;
