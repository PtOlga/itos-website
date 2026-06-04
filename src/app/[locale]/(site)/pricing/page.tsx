import React from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Check,
  Wrench,
  Code2,
  Settings2,
  Bot,
  TrendingUp,
  Lightbulb,
} from 'lucide-react'
import HeroSub from '@/components/SharedComponent/HeroSub'
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
      <HeroSub
        title={t('page.heroTitle')}
        description={t('page.subheading')}
      />

      {/* ── 2. Process steps ────────────────────────────────────────────── */}
      <section className="py-16 bg-white dark:bg-darkmode">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-5">
            {([1, 2, 3, 4, 5] as const).map((step, index) => (
              <div key={step} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
                  {step}
                </div>
                <h3 className="mb-2 text-lg font-bold text-secondary dark:text-white">
                  {step === 1 ? t('steps.step1Title')
                   : step === 2 ? t('steps.step2Title')
                   : step === 3 ? t('steps.step3Title')
                   : step === 4 ? t('steps.step4Title')
                   : t('steps.step5Title')}
                </h3>
                <p className="text-sm text-SlateBlue dark:text-darktext">
                  {step === 1 ? t('steps.step1Desc')
                   : step === 2 ? t('steps.step2Desc')
                   : step === 3 ? t('steps.step3Desc')
                   : step === 4 ? t('steps.step4Desc')
                   : t('steps.step5Desc')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Website Packages ─────────────────────────────────────────── */}
      <section className="pb-20 bg-white dark:bg-darkmode">
        <div className="container">

          <h2 className="text-3xl font-bold text-secondary dark:text-white text-center mb-10">
            {t('page.heading')}
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {packagesMeta.map((pkg, index) => {
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
                  data-aos="fade-up"
                  data-aos-delay={`${120 + index * 120}`}
                  data-aos-duration="800"
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(240,123,42,0.18)] dark:bg-darklight ${
                    pkg.popular
                      ? 'border-2 border-primary hover:border-[#F07B2A]'
                      : 'border border-BorderLine hover:border-[#F07B2A]/60 dark:border-dark_border dark:hover:border-[#F07B2A]/60'
                  }`}
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#F07B2A]/0 via-transparent to-[#F07B2A]/0 opacity-0 transition-opacity duration-300 group-hover:from-[#F07B2A]/10 group-hover:to-[#F07B2A]/5 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#F07B2A]/12 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative z-[1] flex h-full flex-col">
                    <div className="mb-5 h-1 w-14 rounded-full bg-[#F07B2A]/65 transition-all duration-300 group-hover:w-24 group-hover:bg-[#F07B2A]" />

                  {/* Package name */}
                  <h3 className="mb-3 mt-2 text-xl font-bold text-secondary transition-colors duration-300 group-hover:text-[#C85E10] dark:text-white dark:group-hover:text-[#FFB16D]">
                    {name}
                  </h3>

                  {/* Price */}
                  <div className="mb-6">
                    <p className="text-3xl font-bold leading-tight text-primary transition-transform duration-300 group-hover:translate-x-1">
                      <span className="text-sm font-normal text-SlateBlue dark:text-darktext mr-1">
                        {t('packages.from')}
                      </span>
                      {isSEK ? <>{pkg.priceSEK}&nbsp;kr</> : <>{pkg.priceEUR}&nbsp;€</>}
                    </p>
                  </div>

                  {/* Feature list */}
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-SlateBlue transition-transform duration-300 group-hover:translate-x-1 dark:text-darktext"
                      >
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href="/contact"
                    className="btn mt-auto block rounded-lg py-3 text-center font-semibold transition-all duration-300 group-hover:shadow-[0_12px_25px_rgba(240,123,42,0.18)]"
                  >
                    <span className="inline-flex items-center gap-2">
                      {t('packages.getStarted')}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                  </div>
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

      {/* ── 4. Collapsible Calculator ────────────────────────────────────── */}
      <CollapsibleCalculator />

      {/* ── 5. Hourly Services ──────────────────────────────────────────── */}
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

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {hourlyMeta.map(({ key, rate, rateSEK, Icon }, index) => {
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
                  data-aos="fade-up"
                  data-aos-delay={`${120 + index * 90}`}
                  data-aos-duration="750"
                  className="itos-card itos-card-interactive group flex h-full flex-col p-5 dark:bg-darkmode"
                >
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 transition-colors duration-300 group-hover:bg-[#F07B2A]/15 dark:bg-primary/20 dark:group-hover:bg-[#F07B2A]/20">
                      <Icon className="h-6 w-6 text-primary transition-colors duration-300 group-hover:text-[#F07B2A]" />
                    </div>

                    <div className="shrink-0 rounded-full bg-[#FFF2E8] px-3 py-1 text-right dark:bg-[#F07B2A]/15">
                      <span className="whitespace-nowrap text-sm font-bold text-[#C85E10] dark:text-[#FFB16D]">
                        {isSEK ? <>{rateSEK}&nbsp;kr/h</> : <>{rate}&nbsp;€/h</>}
                      </span>
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="mb-3">
                      <h3 className="text-lg font-bold leading-tight text-secondary transition-colors duration-300 group-hover:text-[#C85E10] dark:text-white dark:group-hover:text-[#FFB16D]">
                        {name}
                      </h3>
                    </div>
                    <p className="flex-1 text-sm leading-relaxed text-SlateBlue dark:text-darktext">
                      {desc}
                    </p>

                    <div className="mt-5 h-1 w-12 rounded-full bg-primary/20 transition-all duration-300 group-hover:w-20 group-hover:bg-[#F07B2A]" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 6. Info Strip ───────────────────────────────────────────────── */}
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
