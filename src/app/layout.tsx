import { DM_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { DENIED_ANALYTICS_CONSENT } from '@/utils/consent'

const dmsans = DM_Sans({ subsets: ['latin'] })
const AHREFS_ANALYTICS_KEY = 'TwtKVhhnWtH5kaegiFIDwg'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='sv' suppressHydrationWarning>
      <head>
        <script
          async
          src='https://analytics.ahrefs.com/analytics.js'
          data-key={AHREFS_ANALYTICS_KEY}
        ></script>
        <Script id='google-consent-default' strategy='beforeInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            window.gtag = window.gtag || gtag;
            window.gtag('consent', 'default', ${JSON.stringify({ ...DENIED_ANALYTICS_CONSENT, wait_for_update: 500 })});
          `}
        </Script>
      </head>
      <body className={dmsans.className}>{children}</body>
    </html>
  );
}
