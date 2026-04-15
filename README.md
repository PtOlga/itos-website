# ITOS Website

Localized marketing website for IT consulting and web development services, built with Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui.

## Overview

This repository powers the ITOS company website. The current application includes:

- localized marketing pages in Swedish and English
- a Stripe-powered website pricing calculator
- a contact form powered by EmailJS
- a shadcn/ui demo page
- placeholder pages for sections that are not yet publicly launched

## Current Features

- Next.js 15 App Router
- TypeScript + Tailwind CSS
- `next-intl` localization
- Swedish as the default locale
- English pages under `/en/...`
- dark mode via `next-themes`
- Stripe Checkout integration for pricing requests
- EmailJS-based contact form submission
- reusable UI components with shadcn/ui and Radix primitives
- AOS-based scroll animations
- Railway deployment configuration

## Locale and Routing

Main routes live under `src/app/[locale]`.

### Locale behavior

- Swedish (`sv`) is the default locale and is served without a prefix
- English (`en`) is served with an `/en` prefix
- examples:
  - `/pricing`
  - `/en/pricing`
  - `/contact`
  - `/en/contact`

### Public pages

- `/` — home
- `/about`
- `/blog`
- `/contact`
- `/documentation`
- `/faqs`
- `/portfolio`
- `/pricing`
- `/demo`

### API routes

- `/api/checkout` — creates a Stripe Checkout session
- `/api/auth/[...nextauth]` — disabled compatibility endpoint returning `404`

### Current placeholder / disabled routes

- `/about` — placeholder content
- `/blog` — placeholder content
- `/portfolio` — placeholder content
- `/signin` — intentionally returns `404`
- `/signup` — intentionally returns `404`

### Content drafts

Draft blog content currently exists in `markdown/Blog/*.mdx`, but the public blog route is not wired to render those MDX files yet.

## Tech Stack

- **Framework:** Next.js 15.5.9
- **Language:** TypeScript
- **UI:** React 19, Tailwind CSS 3, shadcn/ui, Radix UI
- **i18n:** `next-intl`
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
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Optional site metadata
SITE_NAME=ITOS
AUTHOR_NAME=ITOS
```

Notes:

- use Stripe test keys for local development
- `.env.example` still contains legacy NextAuth variables; auth is currently disabled at runtime
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
- `npm run lint` currently uses legacy `next lint`; without a committed ESLint config it will start the interactive setup wizard instead of running a non-interactive lint pass

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
├── markdown/Blog/                 # Draft MDX blog content
├── messages/                      # Translation files
├── public/                        # Static assets and animations
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
│   │   ├── Contact/
│   │   ├── Documentation/
│   │   ├── Home/
│   │   ├── Layout/
│   │   ├── Pricing/
│   │   └── ui/
│   ├── i18n/
│   │   ├── config.ts
│   │   └── request.ts
│   ├── lib/
│   ├── middleware.ts
│   └── utils/
│       ├── aos.tsx
│       ├── localePath.ts
│       └── validateEmail.ts
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

Authentication is currently disabled in runtime:

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
