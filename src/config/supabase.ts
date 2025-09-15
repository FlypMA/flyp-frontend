// 🔐 Supabase Client - MVP Version
// Location: src/config/Supabase.ts
// Purpose: Supabase client configuration for MVP frontend

import { createClient } from '@supabase/supabase-js';
import { getSupabaseConfig } from './api-config';

// Get configuration from centralized config
const config = getSupabaseConfig();

// Create Supabase client with error handling
let supabase: any = null;

try {
  supabase = createClient(config.url, config.key, {
    auth: {
      autoRefreshToken: config.isValid,
      persistSession: config.isValid,
      detectSessionInUrl: config.isValid,
    },
  });
  
  console.log('✅ Supabase client initialized successfully');
} catch (error) {
  console.warn('⚠️ Supabase client creation failed, using mock client:', error);
  
  // Create a mock client that won't crash the app
  supabase = {
    auth: {
      signUp: () => Promise.reject(new Error('Supabase not configured')),
      signInWithPassword: () => Promise.reject(new Error('Supabase not configured')),
      signOut: () => Promise.reject(new Error('Supabase not configured')),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      updateUser: () => Promise.reject(new Error('Supabase not configured')),
      resetPasswordForEmail: () => Promise.reject(new Error('Supabase not configured')),
      refreshSession: () => Promise.reject(new Error('Supabase not configured')),
    },
    from: () => ({
      select: () => Promise.reject(new Error('Supabase not configured')),
      insert: () => Promise.reject(new Error('Supabase not configured')),
      update: () => Promise.reject(new Error('Supabase not configured')),
      delete: () => Promise.reject(new Error('Supabase not configured')),
      eq: () => Promise.reject(new Error('Supabase not configured')),
      single: () => Promise.reject(new Error('Supabase not configured')),
    }),
  };
}

export { supabase };

// Export types for use in other files
export type { SupabaseClient } from '@supabase/supabase-js';
