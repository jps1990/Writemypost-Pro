/**
 * Environment configuration utility
 * Provides type-safe access to environment variables
 */

export interface EnvConfig {
  // App Configuration
  APP_ENV: 'development' | 'staging' | 'production';
  APP_NAME: string;
  APP_URL: string;
  APP_DESCRIPTION: string;
  APP_AUTHOR: string;
  APP_TWITTER_HANDLE: string;
  APP_DEBUG: boolean;

  // Social Media Preview
  OG_IMAGE_URL: string;
  OG_IMAGE_WIDTH: number;
  OG_IMAGE_HEIGHT: number;

  // API Keys
  OPENAI_API_KEY: string;
  OPENAI_ORG_ID?: string;

  // Feature Flags
  ENABLE_MOCK_API: boolean;
  ENABLE_DEBUG_TOOLS: boolean;
  ENABLE_ERROR_REPORTING: boolean;
  ENABLE_SERVICE_WORKER?: boolean;
  ENABLE_TEST_ACCOUNTS?: boolean;
  ENABLE_PERFORMANCE_MONITORING?: boolean;

  // Cache Configuration
  CACHE_TTL?: number;

  // Analytics & Tracking
  GA_TRACKING_ID?: string;
  HOTJAR_ID?: string;
}

function getEnvVar(key: string, defaultValue?: string): string {
  const value = import.meta.env[key.startsWith('VITE_') ? key : `VITE_${key}`];
  if (value === undefined && defaultValue === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value ?? defaultValue ?? '';
}

function getBooleanEnvVar(key: string, defaultValue: boolean): boolean {
  const value = getEnvVar(key, String(defaultValue));
  return value.toLowerCase() === 'true';
}

function getNumberEnvVar(key: string, defaultValue: number): number {
  const value = getEnvVar(key, String(defaultValue));
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}

export const env: EnvConfig = {
  // App Configuration
  APP_ENV: getEnvVar('VITE_APP_ENV', 'development') as EnvConfig['APP_ENV'],
  APP_NAME: getEnvVar('VITE_APP_NAME', 'WriteMyPost.pro'),
  APP_URL: getEnvVar('VITE_APP_URL', 'http://localhost:5173'),
  APP_DESCRIPTION: getEnvVar('VITE_APP_DESCRIPTION', 'AI-powered social media content creation'),
  APP_AUTHOR: getEnvVar('VITE_APP_AUTHOR', 'WriteMyPost.pro Team'),
  APP_TWITTER_HANDLE: getEnvVar('VITE_APP_TWITTER_HANDLE', '@writemypostpro'),
  APP_DEBUG: getBooleanEnvVar('VITE_APP_DEBUG', false),

  // Social Media Preview
  OG_IMAGE_URL: getEnvVar('VITE_OG_IMAGE_URL', 'https://writemypost.pro/social-preview.jpg'),
  OG_IMAGE_WIDTH: getNumberEnvVar('VITE_OG_IMAGE_WIDTH', 1200),
  OG_IMAGE_HEIGHT: getNumberEnvVar('VITE_OG_IMAGE_HEIGHT', 630),

  // API Keys
  OPENAI_API_KEY: getEnvVar('VITE_OPENAI_API_KEY', ''),
  OPENAI_ORG_ID: getEnvVar('VITE_OPENAI_ORG_ID', ''),

  // Feature Flags
  ENABLE_MOCK_API: getBooleanEnvVar('VITE_ENABLE_MOCK_API', false),
  ENABLE_DEBUG_TOOLS: getBooleanEnvVar('VITE_ENABLE_DEBUG_TOOLS', false),
  ENABLE_ERROR_REPORTING: getBooleanEnvVar('VITE_ENABLE_ERROR_REPORTING', true),
  ENABLE_SERVICE_WORKER: getBooleanEnvVar('VITE_ENABLE_SERVICE_WORKER', false),
  ENABLE_TEST_ACCOUNTS: getBooleanEnvVar('VITE_ENABLE_TEST_ACCOUNTS', false),
  ENABLE_PERFORMANCE_MONITORING: getBooleanEnvVar('VITE_ENABLE_PERFORMANCE_MONITORING', false),

  // Cache Configuration
  CACHE_TTL: getNumberEnvVar('VITE_CACHE_TTL', 3600),

  // Analytics & Tracking
  GA_TRACKING_ID: getEnvVar('VITE_GA_TRACKING_ID', ''),
  HOTJAR_ID: getEnvVar('VITE_HOTJAR_ID', '')
};

// Development-only validation
if (env.APP_ENV === 'development') {
  console.log('Environment Configuration:', env);
}