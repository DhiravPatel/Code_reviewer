export const env = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 8000,
  SUPABASE_URL: process.env.SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || '',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
};

// Simple validation
if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
  console.warn('⚠️ SUPABASE_URL or SUPABASE_ANON_KEY is missing from environment variables.');
}
