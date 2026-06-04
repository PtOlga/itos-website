'use client'

import React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Mail, Handshake } from 'lucide-react'

const ContactInfo = () => {
  const t = useTranslations('contact')

  const cardClass = 'itos-card itos-card-interactive group flex flex-col p-8 flex-1'

  return (
    <section className='bg-AliceBlue dark:bg-darkmode py-20'>
      <div className='container'>
        <div className='flex md:flex-row flex-col gap-6'>

          {/* Email */}
          <div className={cardClass}>
            <div className='relative z-[1] mb-5 h-1 w-14 rounded-full bg-[#F07B2A]/65 transition-all duration-300 group-hover:w-24 group-hover:bg-[#F07B2A]' />
            <div className='relative z-[1] mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors duration-300 group-hover:bg-[#F07B2A]/15 dark:bg-primary/20 dark:group-hover:bg-[#F07B2A]/20'>
              <Mail className='h-6 w-6 text-primary transition-colors duration-300 group-hover:text-[#F07B2A]' />
            </div>
            <span className='relative z-[1] text-secondary dark:text-white text-xl font-bold transition-colors duration-300 group-hover:text-[#C85E10] dark:group-hover:text-[#FFB16D]'>
              {t('email.title')}
            </span>
            <p className='relative z-[1] text-SlateBlue font-normal text-base max-w-334 pt-3 pb-7 dark:text-darktext flex-1'>
              {t('email.description')}
            </p>
            <Link
              href='#contact-form'
              className='relative z-[1] text-primary text-base font-medium flex items-center gap-3 transition-colors duration-300 group-hover:text-[#F07B2A]'>
              {t('email.link')} →
            </Link>
          </div>

          {/* Partnership */}
          <div className={cardClass}>
            <div className='relative z-[1] mb-5 h-1 w-14 rounded-full bg-[#F07B2A]/65 transition-all duration-300 group-hover:w-24 group-hover:bg-[#F07B2A]' />
            <div className='relative z-[1] mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors duration-300 group-hover:bg-[#F07B2A]/15 dark:bg-primary/20 dark:group-hover:bg-[#F07B2A]/20'>
              <Handshake className='h-6 w-6 text-primary transition-colors duration-300 group-hover:text-[#F07B2A]' />
            </div>
            <span className='relative z-[1] text-secondary dark:text-white text-xl font-bold transition-colors duration-300 group-hover:text-[#C85E10] dark:group-hover:text-[#FFB16D]'>
              {t('partnership.title')}
            </span>
            <p className='relative z-[1] text-SlateBlue font-normal text-base max-w-334 pt-3 pb-7 dark:text-darktext flex-1'>
              {t('partnership.description')}
            </p>
            <Link
              href='#contact-form'
              className='relative z-[1] text-primary text-base font-medium flex items-center gap-3 transition-colors duration-300 group-hover:text-[#F07B2A]'>
              {t('partnership.link')} →
            </Link>
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
