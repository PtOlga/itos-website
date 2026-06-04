'use client'
import React, { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Github } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import type { Locale } from '@/i18n/config'
import { getLocalizedPath, stripLocalePrefix } from '@/utils/localePath'
import { OPEN_CONSENT_SETTINGS_EVENT } from '@/utils/consent'

const Footer: FC = () => {
  const pathname = stripLocalePrefix(usePathname())
  const locale = useLocale() as Locale
  const t = useTranslations('footer')
  const tLocation = useTranslations('contact.location')

  const openCookieSettings = () => {
    window.dispatchEvent(new Event(OPEN_CONSENT_SETTINGS_EVENT))
  }

  const companyLinks = [
    { name: t('links.about'), href: getLocalizedPath('/about', locale) },
    { name: t('links.portfolio'), href: getLocalizedPath('/portfolio', locale) },
    { name: t('links.blog'), href: getLocalizedPath('/blog', locale) },
    { name: t('links.faqs'), href: getLocalizedPath('/faqs', locale) },
    { name: t('links.contact'), href: getLocalizedPath('/contact', locale) },
  ]

  const serviceLinks = [
    { name: t('links.webDev'), href: getLocalizedPath('/portfolio', locale) },
    { name: t('links.ai'), href: getLocalizedPath('/portfolio', locale) },
    { name: t('links.crm'), href: getLocalizedPath('/portfolio', locale) },
    { name: t('links.tools'), href: getLocalizedPath('/portfolio', locale) },
    { name: t('links.pricing'), href: getLocalizedPath('/pricing', locale) },
  ]

  const legalLinks = [
    { name: t('privacyPolicy'), href: getLocalizedPath('/privacy-policy', locale) },
    { name: t('cookiePolicy'), href: getLocalizedPath('/cookie-policy', locale) },
  ]

  const linkClass = 'text-base font-normal text-SlateBlue leading-8 transition-colors duration-300 hover:text-LightApricot'
  const socialClass = 'flex h-10 w-10 items-center justify-center rounded-full bg-white/8 text-white/70 transition-all duration-300 hover:bg-LightApricot/20 hover:text-LightApricot'

  return (
    <footer
      className={`relative dark:bg-darkmode bg-[url('/images/footer/ftr-bg.webp')] bg-cover bg-no-repeat w-full h-full ${
        pathname === '/' ? 'pt-72 z-3' : 'pt-32'
      }`}>
      <div className='bg-secondary md:pb-20 pb-8'>
        <div className='container'>

          {/* Top row — logo + social */}
          <div className='flex items-center justify-between pb-16 border-b border-dark_border border-solid'>
            <Link href={getLocalizedPath('/', locale)}>
              <Image
                src='/images/footer/ftr-logo.svg'
                alt='ITOS Logo'
                width={160}
                height={50}
                style={{ width: 'auto', height: 'auto' }}
                quality={100}
              />
            </Link>
            <ul className='flex items-center gap-3'>
              {/* LinkedIn */}
              <li>
                <Link
                  href='https://www.linkedin.com/in/olga-petrovskaya/'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='LinkedIn'
                  className={socialClass}>
                  <svg viewBox='0 0 24 24' fill='currentColor' className='h-5 w-5'>
                    <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                  </svg>
                </Link>
              </li>
              {/* GitHub */}
              <li>
                <Link
                  href='https://github.com/PtOlga'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='GitHub'
                  className={socialClass}>
                  <Github className='h-5 w-5' />
                </Link>
              </li>
            </ul>
          </div>

          {/* Main grid — 3 columns */}
          <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 pt-10'>

            {/* Column 1 — Company */}
            <div>
              <p className='text-lg font-medium text-white pb-4'>
                {t('company')}
              </p>
              <ul>
                {companyLinks.map((item) => (
                  <li key={item.name} className={linkClass}>
                    <Link href={item.href}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 — Services */}
            <div>
              <p className='text-lg font-medium text-white pb-4'>
                {t('services')}
              </p>
              <ul>
                {serviceLinks.map((item) => (
                  <li key={item.name} className={linkClass}>
                    <Link href={item.href}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Contact */}
            <div>
              <p className='text-lg font-medium text-white pb-4'>
                {t('contactTitle')}
              </p>
              <ul className='flex flex-col gap-2'>
                <li className={linkClass}>
                  <span className='select-all'>5441700@gmail.com</span>
                </li>
                <li className={linkClass}>
                  <Link href='tel:+46737686471'>+46 737 686 471</Link>
                </li>
                <li className='text-base font-normal text-SlateBlue leading-8'>
                  {tLocation('address')}
                </li>
              </ul>
            </div>

          </div>

          {/* Copyright */}
          <div className='border-t border-dark_border border-solid mt-12 pt-6'>
            <div className='flex flex-col items-center gap-3 text-center'>
              <p className='text-base font-normal text-SlateBlue'>
                © Copyright 2025. {t('allRightsReserved')}{' '}
                <Link
                  href={getLocalizedPath('/', locale)}
                  className='transition-colors duration-300 hover:text-LightApricot'>
                  ITOS
                </Link>
              </p>
              <button
                type='button'
                onClick={openCookieSettings}
                className='text-sm font-medium text-SlateBlue underline-offset-4 transition-colors duration-300 hover:text-LightApricot hover:underline'
              >
                {t('cookieSettings')}
              </button>
              <div className='flex flex-wrap items-center justify-center gap-x-4 gap-y-2'>
                {legalLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className='text-sm font-medium text-SlateBlue underline-offset-4 transition-colors duration-300 hover:text-LightApricot hover:underline'
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
