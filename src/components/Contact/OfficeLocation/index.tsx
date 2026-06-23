'use client'

import React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const Location = () => {
  const t = useTranslations('contact')

  return (
    <section className='md:py-24 py-10 dark:bg-darkmode'>
      <div className='container'>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 border-b border-solid border-BorderLine dark:border-dark_border pb-11'>

          {/* Title */}
          <div>
            <h2 className='text-secondary dark:text-white sm:text-[40px] sm:leading-[3rem] text-[28px] leading-[2.25rem] font-bold'>
              {t('location.title')}
            </h2>
          </div>

          {/* Address */}
          <div>
            <p className='sm:text-2xl text-xl text-secondary dark:text-darktext font-normal leading-8'>
              {t('location.address')}
            </p>
          </div>

          {/* Email + Phone */}
          <div className='flex flex-col gap-3'>
            <span className='select-all sm:text-2xl text-xl text-secondary dark:text-darkprimary font-medium'>
              info@itos.nu
            </span>
            <Link
              href='tel:+46737686471'
              className='sm:text-2xl text-xl text-secondary dark:text-primary flex items-center gap-2 w-fit hover:text-primary dark:hover:text-white'>
              <span className='text-lightPrimary'>{t('location.phoneLabel')}: </span>
              +46 737 686 471
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Location