import { defaultLocale, locales, type Locale } from '@/i18n/config'

const localePrefixPattern = new RegExp(`^/(${locales.join('|')})(?=/|$)`)

const localizedBlogSlugs: Record<string, Record<Locale, string>> = {
  websiteTypeGuide: {
    sv: 'vilken-webbplats-behover-du-och-behover-du-en-alls',
    en: 'what-kind-of-website-do-you-need-and-do-you-need-one-at-all',
  },
}

function getLocalizedBlogSlug(slug: string, locale: Locale) {
  for (const variants of Object.values(localizedBlogSlugs)) {
    if (Object.values(variants).includes(slug)) {
      return variants[locale]
    }
  }

  return slug
}

export function stripLocalePrefix(pathname: string | null | undefined) {
  const normalizedPath = pathname || '/'
  const withoutLocale = normalizedPath.replace(localePrefixPattern, '')
  return withoutLocale || '/'
}

export function getPathnameForLocale(pathname: string | null | undefined, locale: Locale) {
  const basePath = stripLocalePrefix(pathname)
  const blogPostMatch = basePath.match(/^\/blog\/([^/]+)$/)

  if (!blogPostMatch) {
    return basePath
  }

  const [, slug] = blogPostMatch
  return `/blog/${getLocalizedBlogSlug(slug, locale)}`
}

export function getLocalizedPath(pathname: string | null | undefined, locale: Locale) {
  const basePath = getPathnameForLocale(pathname, locale)

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
