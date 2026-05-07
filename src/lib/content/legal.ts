import type { Locale } from '@/i18n/config'
import type { LegalPageContent } from '@/types/content'
import { readContentJson } from './shared'

export type LegalPageKey = 'privacy-policy' | 'cookie-policy'

export async function getLegalPageContent(locale: Locale, page: LegalPageKey) {
  return readContentJson<LegalPageContent>('legal', locale, `${page}.json`)
}