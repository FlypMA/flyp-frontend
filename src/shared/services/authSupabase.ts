import { supabase } from './supabaseClient';
import { User, convertLegacyUser } from '../../../types/user.consolidated';

export class SupabaseAuthService {
  async signUp(email: string, password: string, metadata?: any) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });

    if (error) throw error;
    return data;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  async getCurrentUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  }

  async checkAuthentication(): Promise<{ isAuthenticated: boolean; user?: User; error?: string }> {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error('Supabase auth check error:', error);
        return { isAuthenticated: false, error: error.message };
      }

      if (session?.user) {
        // Create legacy user object first
        const legacyUser = {
          id: session.user.id,
          _id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name || session.user.email || 'Unknown User',
          avatar: session.user.user_metadata?.avatar_url,
          role: session.user.user_metadata?.role || 'buyer',
          userType: session.user.user_metadata?.userType || 'buyer',
          verified: session.user.email_confirmed_at !== null,
          createdAt: session.user.created_at ? new Date(session.user.created_at) : new Date(),
          updatedAt: session.user.updated_at ? new Date(session.user.updated_at) : new Date(),
          platformId: session.user.user_metadata?.platformId,
          country: session.user.user_metadata?.country || 'BE',
          email_verified: session.user.email_confirmed_at !== null,
          auth_provider: 'email',
          language_preference: 'en',
          created_at: session.user.created_at || new Date().toISOString(),
          updated_at: session.user.updated_at || new Date().toISOString(),
        };

        // Convert to consolidated User type
        const user: User = convertLegacyUser(legacyUser);

        return {
          isAuthenticated: true,
          user,
        };
      }

      return { isAuthenticated: false };
    } catch (error) {
      console.error('Supabase authentication check failed:', error);
      return {
        isAuthenticated: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
}

export const supabaseAuthService = new SupabaseAuthService();
