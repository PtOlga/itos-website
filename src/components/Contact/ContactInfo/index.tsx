'use client'

import React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const ContactInfo = () => {
  const t = useTranslations('contact')

  return (
    <section className='dark:bg-darkmode py-20'>
      <div className='container'>
        <div className='flex md:flex-row flex-col items-stretch justify-start sm:gap-28 gap-8'>

          {/* Email */}
          <div className='flex sm:flex-row flex-col items-start sm:gap-8 gap-4'>
            <div className='bg-primary/20 dark:bg-darklight w-14 h-14 flex items-center justify-center rounded-full shrink-0'>
              <i className="bg-[url('/images/contact/email.svg')] bg-no-repeat bg-contain w-8 h-8 inline-block"></i>
            </div>
            <div>
              <span className='text-secondary dark:text-white text-xl font-bold'>
                {t('email.title')}
              </span>
              <p className='text-SlateBlue font-normal text-xl max-w-334 pt-3 pb-7 dark:text-darktext'>
                {t('email.description')}
              </p>
              <Link
                href='#contact-form'
                className='text-primary text-lg font-medium flex items-center gap-3 group hover:text-secondary dark:hover:text-white'>
                {t('email.link')}
                <i className="bg-[url('/images/contact/arrow.svg')] bg-no-repeat bg-contain inline-block w-6 h-4 group-hover:bg-[url('/images/contact/arrow-hover.svg')] dark:group-hover:bg-[url('/images/contact/arrow-hover-white.svg')]"></i>
              </Link>
            </div>
          </div>

          {/* Partnership */}
          <div className='flex sm:flex-row flex-col items-start sm:gap-8 gap-4'>
            <div className='bg-primary/20 dark:bg-darklight w-14 h-14 flex items-center justify-center rounded-full shrink-0'>
              <i className="bg-[url('/images/contact/Career.svg')] bg-no-repeat bg-contain w-8 h-8 inline-block"></i>
            </div>
            <div className='flex flex-col h-full justify-between'>
              <div>
                <span className='text-secondary dark:text-white text-xl font-bold'>
                  {t('partnership.title')}
                </span>
                <p className='text-SlateBlue font-normal text-xl max-w-334 pt-3 pb-7 dark:text-darktext'>
                  {t('partnership.description')}
                </p>
              </div>
              <Link
                href='#contact-form'
                className='text-primary text-lg font-medium flex items-center gap-3 group hover:text-secondary dark:hover:text-white'>
                {t('partnership.link')}
                <i className="bg-[url('/images/contact/arrow.svg')] bg-no-repeat bg-contain inline-block w-6 h-4 group-hover:bg-[url('/images/contact/arrow-hover.svg')] dark:group-hover:bg-[url('/images/contact/arrow-hover-white.svg')]"></i>
              </Link>
            </div>
          </div>

        </div>

        <div className='md:pt-16 pt-11'>
          <div className='border-b border-solid border-BorderLine dark:border-dark_border'></div>
        </div>
      </div>
    </section>
  )
}

export default ContactInfo