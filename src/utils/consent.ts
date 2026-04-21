export const CONSENT_STORAGE_KEY = 'itos-cookie-consent'
export const CONSENT_COOKIE_NAME = 'itos_cookie_consent'
export const OPEN_CONSENT_SETTINGS_EVENT = 'itos:open-cookie-settings'
export const CONSENT_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

export type ConsentChoice = 'accepted' | 'rejected'

export const GRANTED_ANALYTICS_CONSENT = {
  analytics_storage: 'granted',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
} as const

export const DENIED_ANALYTICS_CONSENT = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
} as const