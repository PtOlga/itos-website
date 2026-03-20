# ITOS Website

Marketing website for IT services and web development, built with Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui.

## Overview

This repository contains the ITOS company website with localized routes, a blog powered by local Markdown content, a portfolio section, project documentation pages, and a Stripe-powered website price calculator.

## Features

- Next.js 15 App Router
- TypeScript + Tailwind CSS
- `next-intl` localization for English and Swedish
- Swedish as the default locale, English available via `/en/...`
- Stripe checkout for the pricing calculator
- Support for `card` and `klarna` payment methods in checkout
- Dark mode via `next-themes`
- Blog posts loaded from `markdown/Blog/*.mdx`
- Reusable UI components with shadcn/ui and Radix primitives
- AOS-based scroll animations
- Responsive marketing pages for services, portfolio, FAQs, and contact
- Interactive website cost calculator
- Railway-ready deployment

## Tech Stack

- **Framework:** Next.js 15.5.9
- **Language:** TypeScript
- **UI:** React 19, Tailwind CSS 3, shadcn/ui, Radix UI
- **i18n:** next-intl
- **Payments:** Stripe Checkout
- **Content:** gray-matter + remark + remark-html
- **Utilities:** clsx, tailwind-merge, class-variance-authority, date-fns
- **Deployment:** Railway

## Routes

Main site routes live under `src/app/[locale]`.

Notable pages:

- `/` — home
- `/about`
- `/blog`
- `/blog/[slug]`
- `/contact`
- `/documentation`
- `/faqs`
- `/portfolio`
- `/portfolio/[slug]`
- `/pricing`
- `/demo`

API routes:

- `/api/checkout` — creates a Stripe Checkout session

Authentication routes are currently disabled:

- `/signin` and `/signup` intentionally return `404`
- `/api/auth/[...nextauth]` is kept only as a disabled compatibility route

English pages are also available under `/en/...`, for example `/en/pricing`.

## Getting Started

### Prerequisites

- Node.js 22.x or higher
- npm

### Installation

```bash
git clone https://github.com/PtOlga/itos-website.git
cd itos-website
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Optional site metadata
SITE_NAME=ITOS
AUTHOR_NAME=ITOS
```

For local development and testing, Stripe test keys are recommended.

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

```bash
npm run dev
npm run build
npm start
npm run lint
```

## Project Structure

```text
itos-website/
├── markdown/Blog/                 # Local blog posts in .mdx format
├── messages/                      # next-intl translation files
├── public/                        # Static assets
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── (site)/            # Main localized pages
│   │   │   ├── demo/              # shadcn/ui demo page
│   │   │   ├── layout.tsx         # Main app layout
│   │   │   └── page.tsx           # Localized home page
│   │   ├── api/checkout/            # Stripe checkout session route
│   │   ├── api/auth/[...nextauth]/  # Disabled auth compatibility route
│   │   ├── context/               # App-level React context
│   │   ├── globals.css            # Global styles
│   │   └── not-found.tsx          # 404 page
│   ├── components/
│   │   ├── Blog/
│   │   ├── Contact/
│   │   ├── Documentation/
│   │   ├── Home/
│   │   ├── Layout/
│   │   ├── Pricing/
│   │   └── ui/
│   ├── i18n/                      # Locale configuration
│   ├── lib/
│   ├── middleware.ts              # Locale routing middleware
│   └── utils/                     # Markdown, AOS, validation helpers
├── components.json                # shadcn/ui configuration
├── railway.toml                   # Railway deployment config
└── tailwind.config.ts
```

## Blog Content

Blog posts are stored in `markdown/Blog` as `.mdx` files.

Minimum frontmatter example:

```md
---
title: "Your Post Title"
excerpt: "Short summary"
date: 2026-01-19
coverImage: /images/blog/your-image.jpg
author: your-name
authorImage: /images/blogdetail-page/author.png
---

Post content goes here.
```

Posts are read from the filesystem with `gray-matter` and converted to HTML with `remark`.

## Payments

The pricing calculator posts to `src/app/api/checkout/route.ts`.

Current checkout behavior:

- validates `amount` and `currency`
- normalizes the base URL for redirects
- truncates long notes and options before sending them to Stripe
- creates localized success and cancel URLs back to the pricing page
- supports `card` and `klarna`

## Authentication Status

Authentication is currently disabled in runtime:

- login and registration buttons were removed from the header
- `/signin` and `/signup` return `404`
- `/api/auth/[...nextauth]` no longer initializes active auth providers

There are still legacy auth-related files in the repository, but they are not part of the active user flow.

## UI Components

shadcn/ui is configured through `components.json`, with generated components in `src/components/ui`.

You can preview installed components on the demo page:

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
- shadcn/ui docs: https://ui.shadcn.com
- Tailwind CSS docs: https://tailwindcss.com/docs

## License

This project is private and proprietary.
