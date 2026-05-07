import type { Locale } from '@/i18n/config'
import type { CasesPageContent } from '@/types/content'
import { readContentJson } from './shared'

export async function getCasesPageContent(locale: Locale) {
  return readContentJson<CasesPageContent>('cases', `${locale}.json`)
}