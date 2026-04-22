'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Script from 'next/script'
import { useLocale, useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import type { Locale } from '@/i18n/config'
import { getLocalizedPath } from '@/utils/localePath'
import {
  CONSENT_COOKIE_MAX_AGE,
  CONSENT_COOKIE_NAME,
  CONSENT_STORAGE_KEY,
  DENIED_ANALYTICS_CONSENT,
  GRANTED_ANALYTICS_CONSENT,
  OPEN_CONSENT_SETTINGS_EVENT,
  type ConsentChoice,
} from '@/utils/consent'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const persistConsent = (value: ConsentChoice) => {
  localStorage.setItem(CONSENT_STORAGE_KEY, value)
  document.cookie = `${CONSENT_COOKIE_NAME}=${value}; path=/; max-age=${CONSENT_COOKIE_MAX_AGE}; samesite=lax`
}

export default function ConsentManager({ googleTagId }: { googleTagId: string }) {
  const locale = useLocale() as Locale
  const t = useTranslations('consent')
  const [consent, setConsent] = useState<ConsentChoice | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [isBannerOpen, setIsBannerOpen] = useState(false)

  useEffect(() => {
    const storedValue = localStorage.getItem(CONSENT_STORAGE_KEY)
    const storedConsent = storedValue === 'accepted' || storedValue === 'rejected' ? storedValue : null

    setConsent(storedConsent)
    setIsBannerOpen(!storedConsent)
    setIsReady(true)
  }, [])

  useEffect(() => {
    const openBanner = () => setIsBannerOpen(true)

    window.addEventListener(OPEN_CONSENT_SETTINGS_EVENT, openBanner)
    return () => window.removeEventListener(OPEN_CONSENT_SETTINGS_EVENT, openBanner)
  }, [])

  useEffect(() => {
    if (!isReady || !window.gtag) {
      return
    }

    window.gtag('consent', 'update', consent === 'accepted' ? GRANTED_ANALYTICS_CONSENT : DENIED_ANALYTICS_CONSENT)
  }, [consent, isReady])

  const handleConsent = (value: ConsentChoice) => {
    const shouldReload = consent === 'accepted' && value === 'rejected'

    persistConsent(value)
    setConsent(value)
    setIsBannerOpen(false)

    if (shouldReload) {
      window.setTimeout(() => window.location.reload(), 120)
    }
  }

  return (
    <>
      {consent === 'accepted' && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`} strategy='afterInteractive' />
          <Script id='google-tag-config' strategy='afterInteractive'>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              window.gtag = window.gtag || gtag;
              window.gtag('js', new Date());
              window.gtag('config', '${googleTagId}');
            `}
          </Script>
        </>
      )}

      {isReady && isBannerOpen && (
        <div className='fixed inset-x-0 bottom-0 z-[90] p-4'>
          <div className='mx-auto max-w-4xl rounded-[1.5rem] border border-BorderLine bg-white/95 p-5 shadow-2xl backdrop-blur dark:border-dark_border dark:bg-darklight/95'>
            <div className='flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
              <div className='max-w-2xl'>
                <h2 className='text-lg font-semibold text-secondary dark:text-white'>{t('title')}</h2>
                <p className='mt-2 text-sm leading-6 text-SlateBlue dark:text-gray'>{t('description')}</p>
                <div className='mt-3 flex flex-wrap gap-4 text-sm'>
                  <Link href={getLocalizedPath('/privacy-policy', locale)} className='text-primary underline-offset-4 hover:underline dark:text-LightApricot'>
                    {t('privacyLink')}
                  </Link>
                  <Link href={getLocalizedPath('/cookie-policy', locale)} className='text-primary underline-offset-4 hover:underline dark:text-LightApricot'>
                    {t('cookieLink')}
                  </Link>
                </div>
                {consent && (
                  <p className='mt-2 text-xs font-medium uppercase tracking-[0.16em] text-primary dark:text-LightApricot'>
                    {consent === 'accepted' ? t('statusAccepted') : t('statusRejected')}
                  </p>
                )}
              </div>

              <div className='flex flex-col gap-2 sm:flex-row'>
                <Button type='button' variant='outline' onClick={() => handleConsent('rejected')}>
                  {t('reject')}
                </Button>
                <Button type='button' className='bg-primary text-white hover:bg-darkprimary' onClick={() => handleConsent('accepted')}>
                  {t('accept')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}