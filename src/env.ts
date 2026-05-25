/**
 * Centralised environment variable access.
 *
 * NEXT_PUBLIC_* vars are validated at build/dev start in next.config.mjs.
 * Import from here instead of reading process.env directly in components.
 *
 * Server-only vars (no NEXT_PUBLIC_ prefix) must only be accessed in
 * server components, API routes, or server actions — never on the client.
 */

// ─── Client-safe (NEXT_PUBLIC_*) ──────────────────────────────────────────────

export const emailjsEnv = {
  serviceId:  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? '',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '',
  publicKey:  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? '',
} as const

export const analyticsEnv = {
  googleTagId: process.env.NEXT_PUBLIC_GOOGLE_TAG_ID ?? '',
  ahrefsKey:   process.env.NEXT_PUBLIC_AHREFS_KEY    ?? '',
} as const

export const appEnv = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? '',
} as const

// ─── Server-only ──────────────────────────────────────────────────────────────
// These are undefined on the client — only import this section in server code.

export const serverEnv = {
  stripeSecretKey: process.env.STRIPE_SECRET_KEY ?? '',
} as const
