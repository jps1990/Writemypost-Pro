/**
 * Environment configuration utility
 * Provides type-safe access to environment variables
 */

export interface EnvConfig {
  // App Configuration
  APP_ENV: 'development' | 'production' | 'test';
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
  OG_IMAGE_ALT: string;

  // API Keys
  OPENAI_API_KEY: string;
  OPENAI_API_URL: string;
  OPENAI_MODEL: string;
  OPENAI_ORG_ID?: string;

  // Feature Flags
  ENABLE_MOCK_API: boolean;
  ENABLE_DEBUG_TOOLS: boolean;
  ENABLE_ERROR_REPORTING: boolean;
  ENABLE_SERVICE_WORKER: boolean;
  ENABLE_TEST_ACCOUNTS: boolean;
  ENABLE_PERFORMANCE_MONITORING: boolean;

  // Cache Configuration
  CACHE_TTL: number;

  // Analytics & Tracking
  GA_TRACKING_ID: string;
  HOTJAR_ID: string;
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

// Valeurs par défaut pour le développement
const defaultConfig: EnvConfig = {
  APP_ENV: 'development',
  ENABLE_MOCK_API: true,
  ENABLE_DEBUG_TOOLS: true,
  ENABLE_ERROR_REPORTING: true,
  ENABLE_SERVICE_WORKER: false,
  ENABLE_TEST_ACCOUNTS: true,
  ENABLE_PERFORMANCE_MONITORING: false,
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY || '',
  OPENAI_API_URL: 'https://api.openai.com/v1/chat/completions',
  OPENAI_MODEL: 'gpt-4o-mini',
  OPENAI_ORG_ID: import.meta.env.VITE_OPENAI_ORG_ID || '',
  APP_NAME: 'WriteMyPost.pro',
  APP_URL: 'https://writemypost.pro',
  APP_DESCRIPTION: 'AI-Powered Social Media Content Creation',
  APP_AUTHOR: 'WriteMyPost.pro Team',
  APP_TWITTER_HANDLE: '@writemypostpro',
  APP_DEBUG: import.meta.env.MODE === 'development',
  OG_IMAGE_URL: 'https://writemypost.pro/social-preview.jpg',
  OG_IMAGE_WIDTH: 1200,
  OG_IMAGE_HEIGHT: 630,
  OG_IMAGE_ALT: 'WriteMyPost.pro - AI-Powered Social Media Content Creation',
  CACHE_TTL: 3600,
  GA_TRACKING_ID: '',
  HOTJAR_ID: ''
};

// Fusionner avec les variables d'environnement
export const env: EnvConfig = {
  ...defaultConfig,
  ...import.meta.env,
  // Convertir les strings en booléens
  ENABLE_MOCK_API: import.meta.env.VITE_ENABLE_MOCK_API === 'true' || defaultConfig.ENABLE_MOCK_API,
  ENABLE_DEBUG_TOOLS: import.meta.env.VITE_ENABLE_DEBUG_TOOLS === 'true' || defaultConfig.ENABLE_DEBUG_TOOLS,
  ENABLE_ERROR_REPORTING: import.meta.env.VITE_ENABLE_ERROR_REPORTING === 'true' || defaultConfig.ENABLE_ERROR_REPORTING,
  ENABLE_SERVICE_WORKER: import.meta.env.VITE_ENABLE_SERVICE_WORKER === 'true' || defaultConfig.ENABLE_SERVICE_WORKER,
  ENABLE_TEST_ACCOUNTS: import.meta.env.VITE_ENABLE_TEST_ACCOUNTS === 'true' || defaultConfig.ENABLE_TEST_ACCOUNTS,
  ENABLE_PERFORMANCE_MONITORING: import.meta.env.VITE_ENABLE_PERFORMANCE_MONITORING === 'true' || defaultConfig.ENABLE_PERFORMANCE_MONITORING,
  APP_DEBUG: import.meta.env.VITE_APP_DEBUG === 'true' || defaultConfig.APP_DEBUG,
  // Convertir les strings en nombres
  OG_IMAGE_WIDTH: Number(import.meta.env.VITE_OG_IMAGE_WIDTH) || defaultConfig.OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT: Number(import.meta.env.VITE_OG_IMAGE_HEIGHT) || defaultConfig.OG_IMAGE_HEIGHT,
  CACHE_TTL: Number(import.meta.env.VITE_CACHE_TTL) || defaultConfig.CACHE_TTL
};

// Development-only validation
if (env.APP_ENV === 'development') {
  console.log('Environment Configuration:', env);
}