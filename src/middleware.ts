import createMiddleware from 'next-intl/middleware'
import { defaultLocale, locales } from './i18n/config'

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
})

// Single catch-all matcher: skip static files, API routes, and Next.js internals.
// next-intl handles locale detection at runtime — no need to enumerate locales here.
// When adding a new locale, only update src/i18n/config.ts.
export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'
  ],
}
