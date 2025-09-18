// 👤 User Data Manager - MVP Version
// Location: src/shared/services/auth/utils/user-data-manager.ts
// Purpose: Handle user data operations with Supabase public.users table and Auth metadata
//
// Features:
// - User data retrieval from public.users table
// - User profile updates in both Supabase Auth and public.users
// - Business information management
// - User record creation and validation
// - Comprehensive error handling with retry logic
// - Data synchronization between Auth and public.users
// - Type-safe user data operations

import { User, UpdateProfileRequest } from '../../../types';
import { supabase } from '../../../../config';
import { AuthErrorHandler } from './error-handler';
import { RetryHandler } from './retry-handler';

// =============================================================================
// USER DATA MANAGER CLASS
// =============================================================================

export class UserDataManager {
  /**
   * Get user data from public.users table
   */
  static async getPublicUserData(userId: string): Promise<Partial<User> | null> {
    try {
      const result = await RetryHandler.executeWithRetry(async () => {
        const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();

        if (error) {
          throw error;
        }

        return data;
      }, `Get public user data for ${userId}`);

      return result;
    } catch (error) {
      console.warn('⚠️ Could not fetch public user data:', error);
      return null;
    }
  }

  /**
   * Create user record in public.users table
   */
  static async createPublicUserRecord(user: User): Promise<void> {
    try {
      await RetryHandler.executeWithRetry(async () => {
        const { error } = await supabase.from('users').insert({
          id: user.id,
          email: user.email,
          name: user.name,
          phone: user.phone,
          role: user.role,
          company_name: user.company_name,
          company_description: user.company_description,
          industry: user.industry,
          business_type: user.business_type,
          years_in_operation: user.years_in_operation,
          revenue_range: user.revenue_range,
          asking_price_range: user.asking_price_range,
          employee_count_range: user.employee_count_range,
          business_verified: user.business_verified,
          listing_status: user.listing_status,
          business_highlights: user.business_highlights,
          reason_for_selling: user.reason_for_selling,
          city: user.city,
          country: user.country,
          email_verified: user.email_verified,
          auth_provider: user.auth_provider,
          language_preference: user.language_preference,
          created_at: user.created_at,
          updated_at: user.updated_at,
        });

        if (error) {
          throw error;
        }
      }, `Create public user record for ${user.id}`);

      console.log('✅ Public user record created successfully');
    } catch (error) {
      console.error('❌ Error creating public user record:', error);
      throw error;
    }
  }

  /**
   * Update user profile in public.users table
   */
  static async updateUserProfile(userId: string, updates: UpdateProfileRequest): Promise<User> {
    try {
      const result = await RetryHandler.executeWithRetry(async () => {
        const { data, error } = await supabase
          .from('users')
          .update({
            name: updates.name,
            phone: updates.phone,
            city: updates.city,
            country: updates.country,
            language_preference: updates.language_preference,
            updated_at: new Date().toISOString(),
          })
          .eq('id', userId)
          .select()
          .single();

        if (error) {
          throw error;
        }

        return data;
      }, `Update user profile for ${userId}`);

      console.log('✅ Profile updated successfully');
      return result as User;
    } catch (error) {
      console.error('❌ Profile update failed:', error);
      throw error;
    }
  }

  /**
   * Update business information in public.users table
   */
  static async updateBusinessInfo(userId: string, businessData: Partial<User>): Promise<User> {
    try {
      const result = await RetryHandler.executeWithRetry(async () => {
        const { data, error } = await supabase
          .from('users')
          .update({
            company_name: businessData.company_name,
            company_description: businessData.company_description,
            industry: businessData.industry,
            business_type: businessData.business_type,
            years_in_operation: businessData.years_in_operation,
            revenue_range: businessData.revenue_range,
            asking_price_range: businessData.asking_price_range,
            employee_count_range: businessData.employee_count_range,
            business_highlights: businessData.business_highlights,
            reason_for_selling: businessData.reason_for_selling,
            updated_at: new Date().toISOString(),
          })
          .eq('id', userId)
          .select()
          .single();

        if (error) {
          throw error;
        }

        return data;
      }, `Update business info for ${userId}`);

      console.log('✅ Business info updated successfully');
      return result as User;
    } catch (error) {
      console.error('❌ Business info update failed:', error);
      throw error;
    }
  }

  /**
   * Update user in both Supabase Auth and public.users table
   */
  static async updateUserInBothTables(userId: string, updates: Partial<User>): Promise<User> {
    try {
      // Update public.users table
      const publicUserData = await this.updateUserProfile(userId, updates);

      // Update Supabase Auth user metadata
      try {
        const { convertUserToSupabaseMetadata } = await import('../../../types');
        const metadata = convertUserToSupabaseMetadata(updates);

        const { error: authError } = await supabase.auth.updateUser({
          data: metadata,
        });

        if (authError) {
          console.warn('⚠️ Auth metadata update failed:', authError);
        }
      } catch (authError) {
        console.warn('⚠️ Auth metadata update failed:', authError);
      }

      return publicUserData;
    } catch (error) {
      console.error('❌ Failed to update user in both tables:', error);
      throw error;
    }
  }

  /**
   * Delete user record from public.users table
   */
  static async deleteUserRecord(userId: string): Promise<void> {
    try {
      await RetryHandler.executeWithRetry(async () => {
        const { error } = await supabase.from('users').delete().eq('id', userId);

        if (error) {
          throw error;
        }
      }, `Delete user record for ${userId}`);

      console.log('✅ User record deleted successfully');
    } catch (error) {
      console.error('❌ Error deleting user record:', error);
      throw error;
    }
  }

  /**
   * Check if user exists in public.users table
   */
  static async userExists(userId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase.from('users').select('id').eq('id', userId).single();

      if (error) {
        return false;
      }

      return !!data;
    } catch (error) {
      console.warn('⚠️ Error checking if user exists:', error);
      return false;
    }
  }
}
