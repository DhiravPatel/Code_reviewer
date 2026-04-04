import { createClient } from '@supabase/supabase-js';
import { env } from './env';

// Client for public/anonymous operations
export const supabase = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: false,
    },
  }
);

// Admin client for operations that bypass Row Level Security (RLS)
export const supabaseAdmin = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
);
