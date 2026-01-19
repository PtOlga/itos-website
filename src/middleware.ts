import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/request';

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: 'en',

  // Always use locale prefix
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames
  // Skip all paths that should not be internationalized
  matcher: ['/', '/(sv|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};

