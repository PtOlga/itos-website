'use client'
import React, { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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

  return (
    <footer
      className={`relative dark:bg-darkmode bg-[url('/images/footer/ftr-bg.png')] bg-cover bg-no-repeat w-full h-full ${
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
            <ul className='flex items-center gap-5'>
              {/* LinkedIn */}
              <li>
                <Link
                  href='https://www.linkedin.com/in/olga-petrovskaya/'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='LinkedIn'>
                  <svg
                    width='26'
                    height='28'
                    viewBox='0 0 26 28'
                    fill='#fff'
                    xmlns='http://www.w3.org/2000/svg'
                    className='hover:fill-LightApricot transition-colors'>
                    <path d='M5.8 3.2C5.8 4.9 4.5 6.2 2.9 6.2C1.3 6.2 0 4.9 0 3.2C0 1.5 1.3 0.2 2.9 0.2C4.5 0.2 5.8 1.5 5.8 3.2ZM5.8 8.8H0V27.8H5.8V8.8ZM15.1 8.8H9.4V27.8H15.1V17.9C15.1 12.4 22 12 22 17.9V27.8H27.8V16.1C27.8 6.5 17.1 6.9 15.1 11.6V8.8Z' />
                  </svg>
                </Link>
              </li>
              {/* GitHub */}
              <li>
                <Link
                  href='https://github.com/PtOlga'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='GitHub'>
                  <svg
                    width='26'
                    height='27'
                    viewBox='0 0 24 24'
                    fill='#fff'
                    xmlns='http://www.w3.org/2000/svg'
                    className='hover:fill-LightApricot transition-colors'>
                    <path d='M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C18.2072 22.5807 20.2772 21.0497 21.7437 19.0074C23.2101 16.965 23.9993 14.5143 24 12C24 5.37 18.63 0 12 0Z' />
                  </svg>
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
                  <li key={item.name} className='text-base font-normal text-SlateBlue leading-8 hover:text-white'>
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
                  <li key={item.name} className='text-base font-normal text-SlateBlue leading-8 hover:text-white'>
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
                <li className='text-base font-normal text-SlateBlue leading-8 hover:text-white'>
                  <Link href='mailto:5441700@gmail.com'>
                    5441700@gmail.com
                  </Link>
                </li>
                <li className='text-base font-normal text-SlateBlue leading-8 hover:text-white'>
                  <Link href='tel:+46737686471'>
                    +46 737 686 471
                  </Link>
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
                  className='hover:text-primary'>
                  ITOS
                </Link>
              </p>
              <button
                type='button'
                onClick={openCookieSettings}
                className='text-sm font-medium text-SlateBlue underline-offset-4 transition hover:text-white hover:underline'
              >
                {t('cookieSettings')}
              </button>
              <div className='flex flex-wrap items-center justify-center gap-x-4 gap-y-2'>
                {legalLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className='text-sm font-medium text-SlateBlue underline-offset-4 transition hover:text-white hover:underline'
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
