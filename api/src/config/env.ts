export const env = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 8000,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  COOKIE_DOMAIN: process.env.COOKIE_DOMAIN || '',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
  GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:8000/api/v1/auth/google/callback',
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || '',
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || '',
  GITHUB_REDIRECT_URI: process.env.GITHUB_REDIRECT_URI || 'http://localhost:8000/api/v1/integrations/github/callback',
  JWT_SECRET: process.env.JWT_SECRET || 'super_secret_default_key_change_in_production',
  GROQ_API_KEY: process.env.GROQ_API_KEY || '',
  WEBHOOK_SECRET: process.env.WEBHOOK_SECRET || 'codereview_webhook_secret_dev',
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:8000',
};

// Validation
if (env.IS_PRODUCTION && env.JWT_SECRET === 'super_secret_default_key_change_in_production') {
  throw new Error('JWT_SECRET must be set in production (configure it in Vercel Project Settings → Environment Variables).');
}
if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) {
  console.warn('GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET is missing from environment variables.');
}
if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
  console.warn('GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET is missing from environment variables.');
}
if (!env.GROQ_API_KEY) {
  console.warn('GROQ_API_KEY is missing from environment variables.');
}
