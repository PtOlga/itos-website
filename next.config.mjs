import createNextIntlPlugin from 'next-intl/plugin';

// ─── Env validation ───────────────────────────────────────────────────────────
// Warn early (dev start / build) if critical vars are missing.
// Stripe and analytics vars are optional — they have graceful fallbacks.
const REQUIRED_ENV = [
  'NEXT_PUBLIC_EMAILJS_SERVICE_ID',
  'NEXT_PUBLIC_EMAILJS_TEMPLATE_ID',
  'NEXT_PUBLIC_EMAILJS_PUBLIC_KEY',
]
const missing = REQUIRED_ENV.filter((key) => !process.env[key])
if (missing.length > 0) {
  console.warn(
    '\n⚠️  Missing required environment variables:\n' +
    missing.map((k) => `   • ${k}`).join('\n') +
    '\n   Copy .env.example → .env.local and fill in the values.\n'
  )
}
// ─────────────────────────────────────────────────────────────────────────────

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/sitemap_index.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
    ]
  },
  typescript: {
    tsconfigPath: './tsconfig.typecheck.json',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default withNextIntl(nextConfig);
