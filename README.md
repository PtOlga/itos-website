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
- `/api/auth/[...nextauth]` — disabled compatibility endpoint returning `404`

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

At minimum, configure the Stripe-related values for the pricing flow:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
STRIPE_SECRET_KEY=replace-with-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=replace-with-stripe-publishable-key

# Optional site metadata
SITE_NAME=ITOS
AUTHOR_NAME=ITOS
```

Notes:

- use Stripe test keys for local development
- `.env.example` still contains legacy NextAuth-related variables; authentication is currently disabled at runtime
- the contact form currently uses EmailJS identifiers defined in `src/components/Contact/Form/index.tsx`

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
│   │   │   ├── auth/[...nextauth]/
│   │   │   └── checkout/
│   │   ├── globals.css
│   │   └── not-found.tsx
│   ├── components/
│   ├── i18n/
│   ├── lib/
│   │   └── content/               # Content readers for pages, blog, cases, legal
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

## Authentication Status

Authentication is currently disabled at runtime:

- `/signin` and `/signup` intentionally return `404`
- `/api/auth/[...nextauth]` returns a disabled JSON response with `404`
- legacy auth-related environment variables remain in `.env.example` for compatibility/history, but they are not part of the active flow

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
