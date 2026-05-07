import createMiddleware from 'next-intl/middleware'
import { defaultLocale, locales } from './i18n/config'

export default createMiddleware({
  locales: locales,
  defaultLocale,
  localePrefix: 'as-needed'
})

// matcher must be static — keep locale list in sync with src/i18n/config.ts
export const config = {
  matcher: ['/', '/(sv|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
}
