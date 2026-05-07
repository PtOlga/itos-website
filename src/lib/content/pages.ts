import type { Locale } from '@/i18n/config'
import type { AboutPageContent } from '@/types/content'
import { readContentJson } from './shared'

export async function getAboutPageContent(locale: Locale) {
  return readContentJson<AboutPageContent>('pages', locale, 'about.json')
}