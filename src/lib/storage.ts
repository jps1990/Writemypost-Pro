import type { UserPreferences } from './types';

const STORAGE_KEYS = {
  PREFERENCES: 'user_preferences',
  BRAND_NAME: 'brand_name',
} as const;

export const storage = {
  getPreferences(): UserPreferences {
    const stored = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    return stored ? JSON.parse(stored) : { language: '' };
  },

  savePreferences(prefs: UserPreferences) {
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(prefs));
  },

  updatePreference<K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) {
    const prefs = this.getPreferences();
    prefs[key] = value;
    this.savePreferences(prefs);
  },

  getBrandName(): string {
    return localStorage.getItem(STORAGE_KEYS.BRAND_NAME) || '';
  },

  setBrandName(name: string) {
    localStorage.setItem(STORAGE_KEYS.BRAND_NAME, name);
  }
};