'use client'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { getLocalizedPath } from '@/utils/localePath'
import type { Locale } from '@/i18n/config'

const tags = [
  { key: 'website',    href: '/portfolio' },
  { key: 'landing',    href: '/pricing'   },
  { key: 'ecommerce',  href: '/pricing'   },
  { key: 'crm',        href: '/portfolio' },
  { key: 'automation', href: '/portfolio' },
  { key: 'ai',         href: '/portfolio' },
  { key: 'tools',      href: '/portfolio' },
  { key: 'wordpress',  href: '/portfolio' },
] as const

export default function ServiceTags() {
  const t = useTranslations('serviceTags')
  const locale = useLocale() as Locale

  return (
    <section className='bg-white dark:bg-darkmode py-12'>
      <div className='container'>
        <div className='flex flex-wrap justify-center gap-3'>
          {tags.map(({ key, href }) => (
            <Link
              key={key}
              href={getLocalizedPath(href, locale)}
              className='inline-flex items-center rounded-full border border-[#F07B2A]/50 px-5 py-2.5 text-sm font-medium text-[#C85E10] transition-all duration-300 hover:border-[#F07B2A] hover:bg-[#F07B2A] hover:text-white dark:border-[#F07B2A]/40 dark:text-[#FFB16D] dark:hover:border-[#F07B2A] dark:hover:bg-[#F07B2A] dark:hover:text-white'
            >
              {t(key)}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
