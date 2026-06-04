'use client'
import React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Code2, Bot, Settings2, TrendingUp } from 'lucide-react'

const BuildAmazing = ({ isSpace }: { isSpace: boolean }) => {
  const t = useTranslations('services')

  const serviceCardClass = 'itos-card itos-card-interactive h-full p-8 flex flex-col'
  const serviceTitleClass = 'relative z-[1] text-[22px] leading-[2rem] font-bold text-secondary dark:text-white max-w-200 mb-3 transition-colors duration-300 group-hover:text-[#C85E10] dark:group-hover:text-[#FFB16D]'
  const serviceTextClass = 'relative z-[1] flex-1 text-14 text-SlateBlue dark:text-darktext font-normal max-w-200 mb-5'
  const serviceLinkClass = 'relative z-[1] text-primary text-base font-normal flex items-center gap-3 transition-all duration-300 group-hover:text-[#F07B2A]'
  const serviceBarClass = 'relative z-[1] mt-auto mb-5 h-1 w-12 rounded-full bg-primary/20 transition-all duration-300 group-hover:w-20 group-hover:bg-[#F07B2A]'
  const serviceIconClass = 'relative z-[1] mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 transition-colors duration-300 group-hover:bg-[#F07B2A]/15 dark:bg-primary/20 dark:group-hover:bg-[#F07B2A]/20'

  return (
    <>
      <section className='bg-AliceBlue dark:bg-darkmode pt-40 pb-20'>
        <div className='container'>
          <div className='grid lg:grid-cols-2 grid-cols-1 items-center'>
            <div
              className='col-span-1 lg:pb-0 pb-7'
              data-aos='fade-right'
              data-aos-delay='200'
              data-aos-duration='1000'>
              <h2 className='text-secondary dark:text-white max-w-420 pb-8'>
                {t('title')}
              </h2>
              <p className='text-base font-normal text-SlateBlue dark:text-darktext max-w-408'>
                {t('subtitle')}
              </p>
              <div className='pt-6 flex flex-col gap-y-5'>
                <div className='flex items-center gap-2'>
                  <svg
                    width='25'
                    height='25'
                    viewBox='0 0 25 25'
                    fill='#F3FAFF'
                    className='dark:fill-primary/20 fill-primary/20'
                    xmlns='http://www.w3.org/2000/svg'>
                    <circle cx='12.5' cy='12.5' r='12.5' />
                    <g clipPath='url(#clip0_7_836)'>
                      <path
                        d='M17.7444 8.79787C17.4041 8.45708 16.8514 8.45729 16.5106 8.79787L10.9577 14.351L8.48961 11.883C8.14881 11.5422 7.59639 11.5422 7.2556 11.883C6.9148 12.2238 6.9148 12.7762 7.2556 13.117L10.3405 16.202C10.5108 16.3722 10.7341 16.4576 10.9574 16.4576C11.1807 16.4576 11.4042 16.3725 11.5745 16.202L17.7444 10.0319C18.0852 9.69131 18.0852 9.13865 17.7444 8.79787Z'
                        fill='#2F73F2'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_7_836'>
                        <rect
                          width='11'
                          height='11'
                          fill='white'
                          transform='translate(7 7)'
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className='text-base font-normal text-SlateBlue dark:text-darktext'>
                    {t('features.consultation')}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <svg
                    width='25'
                    height='25'
                    viewBox='0 0 25 25'
                    fill='#F3FAFF'
                    className='dark:fill-primary/20 fill-primary/20'
                    xmlns='http://www.w3.org/2000/svg'>
                    <circle cx='12.5' cy='12.5' r='12.5' />
                    <g clipPath='url(#clip0_7_836)'>
                      <path
                        d='M17.7444 8.79787C17.4041 8.45708 16.8514 8.45729 16.5106 8.79787L10.9577 14.351L8.48961 11.883C8.14881 11.5422 7.59639 11.5422 7.2556 11.883C6.9148 12.2238 6.9148 12.7762 7.2556 13.117L10.3405 16.202C10.5108 16.3722 10.7341 16.4576 10.9574 16.4576C11.1807 16.4576 11.4042 16.3725 11.5745 16.202L17.7444 10.0319C18.0852 9.69131 18.0852 9.13865 17.7444 8.79787Z'
                        fill='#2F73F2'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_7_836'>
                        <rect
                          width='11'
                          height='11'
                          fill='white'
                          transform='translate(7 7)'
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className='text-base font-normal text-SlateBlue dark:text-darktext'>
                    {t('features.pricing')}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <svg
                    width='25'
                    height='25'
                    viewBox='0 0 25 25'
                    fill='#F3FAFF'
                    className='dark:fill-primary/20 fill-primary/20'
                    xmlns='http://www.w3.org/2000/svg'>
                    <circle cx='12.5' cy='12.5' r='12.5' />
                    <g clipPath='url(#clip0_7_836)'>
                      <path
                        d='M17.7444 8.79787C17.4041 8.45708 16.8514 8.45729 16.5106 8.79787L10.9577 14.351L8.48961 11.883C8.14881 11.5422 7.59639 11.5422 7.2556 11.883C6.9148 12.2238 6.9148 12.7762 7.2556 13.117L10.3405 16.202C10.5108 16.3722 10.7341 16.4576 10.9574 16.4576C11.1807 16.4576 11.4042 16.3725 11.5745 16.202L17.7444 10.0319C18.0852 9.69131 18.0852 9.13865 17.7444 8.79787Z'
                        fill='#2F73F2'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_7_836'>
                        <rect
                          width='11'
                          height='11'
                          fill='white'
                          transform='translate(7 7)'
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className='text-base font-normal text-SlateBlue dark:text-darktext'>
                    {t('features.support')}
                  </span>
                </div>
              </div>
              <div className='mt-8'>
                <Link href='/contact' className='btn inline-flex items-center gap-3'>
                  {t('button')}
                  <i className="bg-[url('/images/build-amazing/right-arrow.svg')] bg-no-repeat bg-contain w-4 h-3 inline-block"></i>
                </Link>
              </div>
            </div>

            <div className='grid md:grid-cols-2 grid-cols-1 gap-7'>
              {/* Web Development */}
              <div
                className='group'
                data-aos='fade-up'
                data-aos-delay='200'
                data-aos-duration='1000'>
                <div className={serviceCardClass}>
                  <div className={serviceIconClass}>
                    <Code2 className='h-6 w-6 text-primary transition-colors duration-300 group-hover:text-[#F07B2A]' />
                  </div>
                  <h6 className={serviceTitleClass}>
                    {t('cards.webDev.title')}
                  </h6>
                  <p className={serviceTextClass}>
                    {t('cards.webDev.description')}
                  </p>
                  <div className={serviceBarClass} />
                  <Link href='/portfolio' className={serviceLinkClass}>
                    {t('cards.webDev.button')}
                    <i
                      className='bg-no-repeat bg-contain w-4 h-3 inline-block transform transition-transform duration-300 ease-in-out group-hover:translate-x-1'
                      style={{ backgroundImage: `url('/images/build-amazing/right-arrow-blue.svg')` }}></i>
                  </Link>
                </div>
              </div>

              {/* AI & Automation */}
              <div
                className='group'
                data-aos='fade-up'
                data-aos-delay='400'
                data-aos-duration='1000'>
                <div className={serviceCardClass}>
                  <div className={serviceIconClass}>
                    <Bot className='h-6 w-6 text-primary transition-colors duration-300 group-hover:text-[#F07B2A]' />
                  </div>
                  <h6 className={serviceTitleClass}>
                    {t('cards.ai.title')}
                  </h6>
                  <p className={serviceTextClass}>
                    {t('cards.ai.description')}
                  </p>
                  <div className={serviceBarClass} />
                  <Link href='/portfolio' className={serviceLinkClass}>
                    {t('cards.ai.button')}
                    <i
                      className='bg-no-repeat bg-contain w-4 h-3 inline-block transform transition-transform duration-300 ease-in-out group-hover:translate-x-1'
                      style={{ backgroundImage: `url('/images/build-amazing/right-arrow-blue.svg')` }}></i>
                  </Link>
                </div>
              </div>

              {/* Business Tools */}
              <div
                className='group'
                data-aos='fade-up'
                data-aos-delay='600'
                data-aos-duration='1000'>
                <div className={serviceCardClass}>
                  <div className={serviceIconClass}>
                    <Settings2 className='h-6 w-6 text-primary transition-colors duration-300 group-hover:text-[#F07B2A]' />
                  </div>
                  <h6 className={serviceTitleClass}>
                    {t('cards.tools.title')}
                  </h6>
                  <p className={serviceTextClass}>
                    {t('cards.tools.description')}
                  </p>
                  <div className={serviceBarClass} />
                  <Link href='/portfolio' className={serviceLinkClass}>
                    {t('cards.tools.button')}
                    <i
                      className='bg-no-repeat bg-contain w-4 h-3 inline-block transform transition-transform duration-300 ease-in-out group-hover:translate-x-1'
                      style={{ backgroundImage: `url('/images/build-amazing/right-arrow-blue.svg')` }}></i>
                  </Link>
                </div>
              </div>

              {/* CRM Solutions */}
              <div
                className='group'
                data-aos='fade-up'
                data-aos-delay='800'
                data-aos-duration='1000'>
                <div className={serviceCardClass}>
                  <div className={serviceIconClass}>
                    <TrendingUp className='h-6 w-6 text-primary transition-colors duration-300 group-hover:text-[#F07B2A]' />
                  </div>
                  <h6 className={serviceTitleClass}>
                    {t('cards.crm.title')}
                  </h6>
                  <p className={serviceTextClass}>
                    {t('cards.crm.description')}
                  </p>
                  <div className={serviceBarClass} />
                  <Link href='/contact' className={serviceLinkClass}>
                    {t('cards.crm.button')}
                    <i
                      className='bg-no-repeat bg-contain w-4 h-3 inline-block transform transition-transform duration-300 ease-in-out group-hover:translate-x-1'
                      style={{ backgroundImage: `url('/images/build-amazing/right-arrow-blue.svg')` }}></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default BuildAmazing
