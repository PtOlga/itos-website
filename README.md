# ITOS Website

Localized marketing website for IT consulting, web development, CRM, and automation services, built with Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui.

## Overview

This repository powers the public ITOS company website.

The application currently includes:

- localized pages in Swedish and English
- a content-driven About page
- a localized blog rendered from MDX files
- a portfolio/case studies page rendered from structured content files
- legal pages rendered from content JSON
- a Stripe-powered website pricing calculator
- a contact form powered by EmailJS
- an AI chat assistant (Claude) with locale-aware system prompt and inline lead capture
- Telegram and Zoho CRM notifications for captured leads
- a shadcn/ui demo page

## Current Features

- Next.js 15 App Router
- TypeScript + Tailwind CSS
- `next-intl` localization
- Swedish as the default locale
- English pages under `/en/...`
- dark mode via `next-themes`
- content layer for blog, cases, legal pages, and long-form page content
- localized MDX blog posts with per-locale static generation
- Stripe Checkout integration for pricing requests
- EmailJS-based contact form submission
- Anthropic Claude chat widget with plain-text output, language auto-detection, and close-and-reset control
- lead delivery to Telegram and Zoho CRM via `Promise.allSettled` so one channel failing does not block the other
- reusable UI components with shadcn/ui and Radix primitives
- AOS-based scroll animations
- Railway deployment configuration

## Content Model

The project now uses two separate content sources:

### `messages/*.json`

Use `messages/en.json` and `messages/sv.json` for short UI strings and interface copy, for example:

- navigation labels
- buttons
- form labels
- short hero text
- reusable UI strings

### `content/...`

Use `content` for long-form or structured page content:

- `content/blog/<locale>/*.mdx` — blog posts
- `content/blog/<locale>/index.json` — blog page copy
- `content/cases/<locale>.json` — portfolio/case studies content
- `content/legal/<locale>/*.json` — privacy and cookie pages
- `content/pages/<locale>/*.json` — content-driven static pages such as About

Content readers live in `src/lib/content`.

## Locale and Routing

Main routes live under `src/app/[locale]`.

### Locale behavior

- Swedish (`sv`) is the default locale and is served without a prefix
- English (`en`) is served with an `/en` prefix
- examples:
  - `/about`
  - `/en/about`
  - `/blog`
  - `/en/blog`

### Public pages

- `/` — home
- `/about` — content-driven About page
- `/blog` — localized blog index
- `/blog/[slug]` — localized blog post page
- `/contact`
- `/cookie-policy`
- `/documentation`
- `/faqs`
- `/portfolio` — content-driven portfolio page
- `/pricing`
- `/privacy-policy`
- `/demo`

### API routes

- `/api/checkout` — creates a Stripe Checkout session
- `/api/chat` — proxies user messages to Anthropic Claude, strips Markdown, parses inline `<lead>{…}</lead>` blocks, and triggers lead notifications
- `/api/lead` — thin HTTP wrapper around the shared notification helpers (Telegram + Zoho)

### Disabled routes

- `/signin` — intentionally returns `404`
- `/signup` — intentionally returns `404`

## Tech Stack

- **Framework:** Next.js 15.5.9
- **Language:** TypeScript
- **UI:** React 19, Tailwind CSS 3, shadcn/ui, Radix UI
- **i18n:** `next-intl`
- **Content:** MDX + JSON content files, `gray-matter`, `remark`, `remark-html`
- **Forms:** EmailJS
- **Payments:** Stripe Checkout
- **AI:** Anthropic Claude (`@anthropic-ai/sdk`, model `claude-haiku-4-5`)
- **Lead delivery:** Telegram Bot API, Zoho CRM REST API
- **Utilities:** `clsx`, `tailwind-merge`, `class-variance-authority`, `date-fns`, `aos`
- **Deployment:** Railway

## Getting Started

### Prerequisites

- Node.js 20+ (20 LTS recommended)
- npm

### Installation

```bash
git clone https://github.com/PtOlga/itos-website.git
cd itos-website
npm install
```

### Environment Variables

Start from the example file:

```bash
cp .env.example .env
```

The full set of supported variables lives in `.env.example`. Group by feature:

```env
# Contact form (EmailJS) — https://www.emailjs.com/
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=

# Analytics
NEXT_PUBLIC_GOOGLE_TAG_ID=
NEXT_PUBLIC_AHREFS_KEY=

# Stripe pricing calculator — https://stripe.com/
STRIPE_SECRET_KEY=

# Public app base URL (used for Stripe redirects; falls back to request origin if omitted)
NEXT_PUBLIC_BASE_URL=

# Claude AI chatbot — https://console.anthropic.com/
ANTHROPIC_API_KEY=

# Telegram lead notifications — create bot via @BotFather
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

# Zoho CRM lead creation — https://api-console.zoho.eu/
ZOHO_ACCESS_TOKEN=
ZOHO_DOMAIN=zohoapis.eu
```

Notes:

- use Stripe test keys for local development
- all chatbot and notification credentials are optional; if `ANTHROPIC_API_KEY` is missing the chat returns an error, and if Telegram/Zoho variables are missing those channels silently skip
- `NEXT_PUBLIC_BASE_URL` is only consumed by the Stripe checkout flow; the chat and lead notifications call third-party APIs directly

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev
npm run typecheck
npm run build
npm start
npm run lint
```

Script notes:

- `npm run typecheck` runs TypeScript against `tsconfig.typecheck.json`
- `npm run build` performs a production build and type validation
- `npm run lint` currently uses legacy `next lint`; without a committed ESLint config it may start the interactive setup wizard instead of running a non-interactive lint pass

## Quality Checks

There is currently no automated test suite in the repository.

Recommended verification commands:

```bash
npm run typecheck
npm run build
```

## Project Structure

```text
itos-website/
├── .env.example
├── content/
│   ├── blog/
│   │   ├── en/
│   │   └── sv/
│   ├── cases/
│   ├── legal/
│   │   ├── en/
│   │   └── sv/
│   └── pages/
│       ├── en/
│       └── sv/
├── messages/                      # UI translations
├── public/                        # Static assets and images
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── (site)/            # Main localized pages
│   │   │   ├── demo/              # shadcn/ui demo page
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── api/
│   │   │   ├── chat/              # Anthropic Claude proxy + lead parser
│   │   │   ├── checkout/          # Stripe Checkout session
│   │   │   └── lead/              # HTTP wrapper around notification helpers
│   │   ├── globals.css
│   │   └── not-found.tsx
│   ├── components/
│   │   └── ChatWidget/            # Floating chat UI with close-and-reset
│   ├── i18n/
│   ├── lib/
│   │   ├── chatbot/               # System prompt builder for Claude
│   │   ├── content/               # Content readers for pages, blog, cases, legal
│   │   └── notifications/         # Telegram + Zoho lead delivery helpers
│   ├── middleware.ts
│   ├── types/
│   └── utils/
├── components.json
├── next.config.mjs
├── railway.toml
├── tsconfig.json
└── tsconfig.typecheck.json
```

## Payments

The pricing calculator submits to `src/app/api/checkout/route.ts`.

Current checkout behavior:

- validates `amount` and `currency`
- accepts `sek` and `eur`
- normalizes the base URL for redirects
- truncates long notes and selected options before sending them to Stripe
- builds locale-aware success and cancel URLs back to the pricing page
- supports `card` and `klarna`

## AI Chat and Lead Capture

The chat assistant lives in `src/components/ChatWidget` and talks to `/api/chat`.

Behavior:

- model: `claude-haiku-4-5` (Anthropic), invoked via `@anthropic-ai/sdk`
- system prompt is built per request in `src/lib/chatbot/systemPrompt.ts` and includes locale, owner identity (Olga Saether), service catalogue, and the rule to reply in plain text
- responses are passed through a server-side Markdown stripper so the UI never renders raw `**bold**`, headings, or backticks
- when the model returns a `<lead>{ name, contact, project, budget? }</lead>` block, the chat route parses it, removes the block from the visible reply, and dispatches notifications in parallel

Rate limiting: requests from a single IP are capped at 20 messages per hour (in-memory `Map`; resets on server restart).

Lead delivery (`src/lib/notifications/`):

- `sendLeadToTelegram(lead)` posts an HTML-formatted message via the Telegram Bot API; no-op if `TELEGRAM_BOT_TOKEN` or `TELEGRAM_CHAT_ID` is missing
- `createZohoLead(lead)` creates a record in Zoho CRM via REST; no-op if `ZOHO_ACCESS_TOKEN` is missing
- both helpers are called through `Promise.allSettled`, so one failing channel never blocks the other or the chat response
- `/api/lead` exposes the same helpers over HTTP for external integrations (for example, forms outside the chat flow)

## Authentication Status

Authentication is currently disabled at runtime:

- `/signin` and `/signup` intentionally return `404`

## UI Components

shadcn/ui is configured through `components.json`, with generated components in `src/components/ui`.

Preview routes:

- `/demo`
- `/en/demo`

## Deployment

The project includes `railway.toml` for Railway deployment.

Production commands:

```bash
npm run build
npm start
```

## Links

- Live site: https://itos.nu
- Repository: https://github.com/PtOlga/itos-website
- Next.js docs: https://nextjs.org/docs
- next-intl docs: https://next-intl.dev
- shadcn/ui docs: https://ui.shadcn.com
- Tailwind CSS docs: https://tailwindcss.com/docs

## License

This project is private and proprietary.
