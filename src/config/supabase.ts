// 🔐 Supabase Client Configuration - DEPRECATED
// Location: src/config/supabase.ts  
// Purpose: Legacy Supabase client - NOW USING BACKEND API FOR SECURITY
// 
// ⚠️  SECURITY NOTICE: Direct Supabase access has been moved to backend
// ⚠️  Frontend now authenticates through backend API for enhanced security
// ⚠️  This file is kept for compatibility but should not be used for auth

import { createClient } from '@supabase/supabase-js';

// Function to safely get environment variables with fallbacks
const getSupabaseConfig = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  // Use placeholder values if environment variables are missing
  const finalUrl = supabaseUrl || 'https://placeholder.supabase.co';
  const finalKey = supabaseAnonKey || 'placeholder-anon-key';

  // Enhanced production error detection
  const isProduction = import.meta.env.PROD;
  const hasValidConfig = !!supabaseUrl && !!supabaseAnonKey;

  if (isProduction && !hasValidConfig) {
    console.error('🚨 CRITICAL: Supabase environment variables are missing in production!');
    console.error('Required: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
    console.error('Current URL:', finalUrl);
    console.error(
      'Available env vars:',
      Object.keys(import.meta.env).filter(key => key.startsWith('VITE_'))
    );

    // Show user-friendly error in production
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const message = `🚨 Configuration Error: Authentication service is not configured.\n\nMissing environment variables:\n- VITE_SUPABASE_URL\n- VITE_SUPABASE_ANON_KEY\n\nPlease contact your system administrator.`;
        alert(message);
      }, 1000);
    }
  }

  return {
    url: finalUrl,
    key: finalKey,
    isValid: hasValidConfig,
  };
};

// Get configuration
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

