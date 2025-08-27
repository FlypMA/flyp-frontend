import { supabase } from './supabaseClient';
import { AuthCheckResponse, User, UserType, UserPreferences } from '../../types/api/users/user';

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

  async checkAuthentication(): Promise<AuthCheckResponse> {
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
        const defaultUserPreferences: UserPreferences = {
          enableDataCollection: true,
          eventCollection: 'all events',
          tabOption: 'all tabs',
        };

        const user: User = {
          _id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name || session.user.email || 'Unknown User',
          avatar: session.user.user_metadata?.avatar_url,
          password: '', // Not exposed from Supabase
          rank: session.user.user_metadata?.rank || 1,
          userPreferences: session.user.user_metadata?.userPreferences || defaultUserPreferences,
          userType: session.user.user_metadata?.userType || UserType.Default,
          verified: session.user.email_confirmed_at !== null,
          createdAt: session.user.created_at ? new Date(session.user.created_at) : new Date(),
          updatedAt: session.user.updated_at ? new Date(session.user.updated_at) : new Date(),
          platformId: session.user.user_metadata?.platformId,
        };

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
