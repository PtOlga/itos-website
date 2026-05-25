import React from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import Link from 'next/link'
import {
  Check,
  Wrench,
  Code2,
  Settings2,
  Bot,
  TrendingUp,
  Lightbulb,
} from 'lucide-react'
import CollapsibleCalculator from '@/components/Pricing/CollapsibleCalculator'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('pricing')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

// ── Static data (locale-agnostic) ────────────────────────────────────────────

const packagesMeta = [
  { id: 'landing',   priceEUR: '450',   priceSEK: '5 000',  popular: false, featureCount: 5 },
  { id: 'business',  priceEUR: '990',   priceSEK: '10 900', popular: true,  featureCount: 5 },
  { id: 'ecommerce', priceEUR: '1 490', priceSEK: '16 400', popular: false, featureCount: 6 },
] as const

const hourlyMeta = [
  { key: 's1', rate: '50', rateSEK: '550',  Icon: Wrench     },
  { key: 's2', rate: '60', rateSEK: '660',  Icon: Code2      },
  { key: 's3', rate: '75', rateSEK: '825',  Icon: Settings2  },
  { key: 's4', rate: '80', rateSEK: '880',  Icon: Bot        },
  { key: 's5', rate: '70', rateSEK: '770',  Icon: TrendingUp },
  { key: 's6', rate: '70', rateSEK: '770',  Icon: Lightbulb  },
] as const

const infoStripKeys = ['minimumOrder', 'timeTracking', 'payment', 'fixedPrice'] as const

// ── Page ─────────────────────────────────────────────────────────────────────

const Page = () => {
  const t = useTranslations('pricing')
  const locale = useLocale()
  const isSEK = locale === 'sv'

  return (
    <main className="dark:bg-darkmode">

      {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white dark:bg-darkmode">
        <div className="container text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-SlateBlue dark:text-darktext mb-4">
            {t('page.label')}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-secondary dark:text-white mb-4">
            {t('page.heading')}
          </h1>
          <p className="text-xl text-SlateBlue dark:text-darktext">
            {t('page.subheading')}
          </p>
        </div>
      </section>

      {/* ── 2. Website Packages ─────────────────────────────────────────── */}
      <section className="pb-20 bg-white dark:bg-darkmode">
        <div className="container">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packagesMeta.map((pkg) => {
              // Build translated feature list explicitly to keep TS happy
              const features: string[] = pkg.id === 'landing'
                ? [
                    t('packages.landing.f1'),
                    t('packages.landing.f2'),
                    t('packages.landing.f3'),
                    t('packages.landing.f4'),
                    t('packages.landing.f5'),
                  ]
                : pkg.id === 'business'
                ? [
                    t('packages.business.f1'),
                    t('packages.business.f2'),
                    t('packages.business.f3'),
                    t('packages.business.f4'),
                    t('packages.business.f5'),
                  ]
                : [
                    t('packages.ecommerce.f1'),
                    t('packages.ecommerce.f2'),
                    t('packages.ecommerce.f3'),
                    t('packages.ecommerce.f4'),
                    t('packages.ecommerce.f5'),
                    t('packages.ecommerce.f6'),
                  ]

              const name = pkg.id === 'landing'
                ? t('packages.landing.name')
                : pkg.id === 'business'
                ? t('packages.business.name')
                : t('packages.ecommerce.name')

              return (
                <div
                  key={pkg.id}
                  className={`relative flex flex-col bg-white dark:bg-darklight rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow ${
                    pkg.popular
                      ? 'border-2 border-primary'
                      : 'border border-BorderLine dark:border-dark_border'
                  }`}
                >
                  {/* Most popular badge */}
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <span
                        className="inline-block text-white text-xs font-semibold px-4 py-1.5 rounded-full whitespace-nowrap"
                        style={{ backgroundColor: '#F07B2A' }}
                      >
                        {t('packages.mostPopular')}
                      </span>
                    </div>
                  )}

                  {/* Package name */}
                  <h3 className="text-xl font-bold text-secondary dark:text-white mb-3 mt-2">
                    {name}
                  </h3>

                  {/* Price */}
                  <div className="mb-6">
                    <p className="text-3xl font-bold text-primary leading-tight">
                      <span className="text-sm font-normal text-SlateBlue dark:text-darktext mr-1">
                        {t('packages.from')}
                      </span>
                      {pkg.priceEUR}&nbsp;€
                    </p>
                    {isSEK && (
                      <p className="text-sm text-SlateBlue dark:text-darktext mt-1">
                        / {pkg.priceSEK}&nbsp;kr
                      </p>
                    )}
                  </div>

                  {/* Feature list */}
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-SlateBlue dark:text-darktext"
                      >
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href="/contact"
                    className="btn block text-center py-3 rounded-lg font-semibold"
                  >
                    {t('packages.getStarted')}
                  </Link>
                </div>
              )
            })}
          </div>

          {/* Shared footnote */}
          <p className="mt-6 text-xs text-SlateBlue dark:text-darktext text-center">
            {t('packages.footnote')}
          </p>
        </div>
      </section>

      {/* ── 3. Collapsible Calculator ────────────────────────────────────── */}
      <CollapsibleCalculator />

      {/* ── 4. Hourly Services ──────────────────────────────────────────── */}
      <section className="py-16 bg-AliceBlue dark:bg-darklight">
        <div className="container">

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary dark:text-white mb-3">
              {t('hourly.title')}
            </h2>
            <p className="text-SlateBlue dark:text-darktext">
              {t('hourly.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {hourlyMeta.map(({ key, rate, rateSEK, Icon }) => {
              const name = key === 's1' ? t('hourly.s1.name')
                : key === 's2' ? t('hourly.s2.name')
                : key === 's3' ? t('hourly.s3.name')
                : key === 's4' ? t('hourly.s4.name')
                : key === 's5' ? t('hourly.s5.name')
                : t('hourly.s6.name')

              const desc = key === 's1' ? t('hourly.s1.desc')
                : key === 's2' ? t('hourly.s2.desc')
                : key === 's3' ? t('hourly.s3.desc')
                : key === 's4' ? t('hourly.s4.desc')
                : key === 's5' ? t('hourly.s5.desc')
                : t('hourly.s6.desc')

              return (
                <div
                  key={key}
                  className="flex gap-4 bg-white dark:bg-darkmode rounded-2xl p-5 border border-BorderLine dark:border-dark_border hover:shadow-md transition-shadow"
                >
                  {/* Icon */}
                  <div className="shrink-0 w-11 h-11 flex items-center justify-center rounded-xl bg-primary/10 dark:bg-primary/20">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <h3 className="font-bold text-secondary dark:text-white leading-tight">
                        {name}
                      </h3>
                      <div className="text-right shrink-0">
                        <span className="font-bold text-primary whitespace-nowrap">
                          {rate}&nbsp;€/h
                        </span>
                        {isSEK && (
                          <p className="text-xs text-SlateBlue dark:text-darktext mt-0.5 whitespace-nowrap">
                            {rateSEK}&nbsp;kr/h
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-SlateBlue dark:text-darktext leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 5. Info Strip ───────────────────────────────────────────────── */}
      <section className="py-10 bg-white dark:bg-darkmode border-t border-BorderLine dark:border-dark_border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {infoStripKeys.map((key) => {
              const label = key === 'minimumOrder' ? t('infoStrip.minimumOrder.label')
                : key === 'timeTracking' ? t('infoStrip.timeTracking.label')
                : key === 'payment' ? t('infoStrip.payment.label')
                : t('infoStrip.fixedPrice.label')

              const value = key === 'minimumOrder' ? t('infoStrip.minimumOrder.value')
                : key === 'timeTracking' ? t('infoStrip.timeTracking.value')
                : key === 'payment' ? t('infoStrip.payment.value')
                : t('infoStrip.fixedPrice.value')

              return (
                <div key={key}>
                  <p className="text-xs text-SlateBlue dark:text-darktext mb-1 uppercase tracking-wide">
                    {label}
                  </p>
                  <p className="font-bold text-secondary dark:text-white">
                    {value}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

    </main>
  )
}

export default Page
