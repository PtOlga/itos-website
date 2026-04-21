import type { MetadataRoute } from 'next'
import { defaultLocale, locales, type Locale } from '@/i18n/config'

const BASE_URL = 'https://itos.nu'
const INDEXABLE_PATHS = [
  '/',
  '/about',
  '/portfolio',
  '/blog',
  '/contact',
  '/documentation',
  '/pricing',
  '/faqs',
  '/privacy-policy',
  '/cookie-policy',
] as const

function getLocalizedPath(pathname: string, locale: Locale) {
  if (locale === defaultLocale) {
    return pathname
  }

  return pathname === '/' ? `/${locale}` : `/${locale}${pathname}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return INDEXABLE_PATHS.flatMap((pathname) => {
    const languageUrls = Object.fromEntries(
      locales.map((locale) => [locale, `${BASE_URL}${getLocalizedPath(pathname, locale)}`])
    ) as Record<Locale, string>

    return locales.map((locale) => ({
      url: languageUrls[locale],
      lastModified,
      changeFrequency: pathname === '/' ? 'weekly' : 'monthly',
      priority: pathname === '/' ? 1 : 0.7,
      alternates: {
        languages: languageUrls,
      },
    }))
  })
}