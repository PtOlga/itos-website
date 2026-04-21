import type { MetadataRoute } from 'next'

const BASE_URL = 'https://itos.nu'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/signin',
          '/signup',
          '/en/signin',
          '/en/signup',
          '/demo',
          '/en/demo',
          '/test-page',
          '/plasmic-example',
          '/en/plasmic-example',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}