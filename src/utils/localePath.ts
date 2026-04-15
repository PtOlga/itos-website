import { defaultLocale, locales, type Locale } from '@/i18n/config'

const localePrefixPattern = new RegExp(`^/(${locales.join('|')})(?=/|$)`)

export function stripLocalePrefix(pathname: string | null | undefined) {
  const normalizedPath = pathname || '/'
  const withoutLocale = normalizedPath.replace(localePrefixPattern, '')
  return withoutLocale || '/'
}

export function getLocalizedPath(pathname: string | null | undefined, locale: Locale) {
  const basePath = stripLocalePrefix(pathname)

  if (locale === defaultLocale) {
    return basePath
  }

  return basePath === '/' ? `/${locale}` : `/${locale}${basePath}`
}

export function isPathActive(pathname: string | null | undefined, href: string) {
  const normalizedPath = stripLocalePrefix(pathname)

  if (href === '/') {
    return normalizedPath === '/'
  }

  return normalizedPath === href || normalizedPath.startsWith(`${href}/`)
}
