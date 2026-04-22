import { DM_Sans } from 'next/font/google'
import { getLocale } from 'next-intl/server'
import './globals.css'
import { DENIED_ANALYTICS_CONSENT } from '@/utils/consent'

const dmsans = DM_Sans({ subsets: ['latin'] })
const AHREFS_ANALYTICS_KEY = 'TwtKVhhnWtH5kaegiFlDwg'
const CONSENT_DEFAULT_SCRIPT = `window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments);}window.gtag=window.gtag||gtag;window.gtag('consent','default',${JSON.stringify({ ...DENIED_ANALYTICS_CONSENT, wait_for_update: 500 })});`

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          id='google-consent-default'
          dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT_SCRIPT }}
        />
        <script
          async
          src='https://analytics.ahrefs.com/analytics.js'
          data-key={AHREFS_ANALYTICS_KEY}
        ></script>
      </head>
      <body className={dmsans.className}>{children}</body>
    </html>
  );
}
