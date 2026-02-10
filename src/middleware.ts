import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/request';

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: 'sv',

  // Swedish (sv) without prefix, English (en) with prefix
  localePrefix: 'as-needed'
});

export const config = {
  // Match only internationalized pathnames
  // Skip all paths that should not be internationalized
  // Exclude /plasmic-host for Plasmic Studio integration
  matcher: ['/', '/(sv|en)/:path*', '/((?!api|_next|_vercel|plasmic-host|.*\\..*).*)']
};

