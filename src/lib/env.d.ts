/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENAI_API_KEY: string;
  readonly VITE_OPENAI_ORG_ID: string;
  readonly VITE_OPENAI_MODEL: string;
  readonly VITE_APP_ENV: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_URL: string;
  readonly VITE_APP_DESCRIPTION: string;
  readonly VITE_APP_AUTHOR: string;
  readonly VITE_APP_TWITTER_HANDLE: string;
  readonly VITE_APP_DEBUG: string;
  readonly VITE_ENABLE_MOCK_API: string;
  readonly VITE_ENABLE_DEBUG_TOOLS: string;
  readonly VITE_ENABLE_ERROR_REPORTING: string;
  readonly VITE_ENABLE_SERVICE_WORKER: string;
  readonly VITE_ENABLE_TEST_ACCOUNTS: string;
  readonly VITE_ENABLE_PERFORMANCE_MONITORING: string;
  readonly VITE_OG_IMAGE_URL: string;
  readonly VITE_OG_IMAGE_WIDTH: string;
  readonly VITE_OG_IMAGE_HEIGHT: string;
  readonly VITE_CACHE_TTL: string;
  readonly VITE_GA_TRACKING_ID: string;
  readonly VITE_HOTJAR_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}