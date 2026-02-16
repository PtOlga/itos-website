'use client'
import React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const BuildAmazing = ({ isSpace }: { isSpace: boolean }) => {
  const t = useTranslations('services')

  return (
    <>
      <section className={`${isSpace ? '' : ''} dark:bg-darkmode pt-40 pb-20`}>
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
                <div className='shadow-light_shadwo dark:shadow-darkmd p-8 rounded-14 group-hover:cursor-pointer'>
                  <i
                    className='bg-no-repeat w-10 h-10 inline-block'
                    style={{ backgroundImage: `url('/images/build-amazing/beautiful-design.svg')` }}></i>
                  <h6 className='text-[22px] leading-[2rem] font-bold text-secondary dark:text-white max-w-200 pt-3'>
                    {t('cards.webDev.title')}
                  </h6>
                  <p className='text-14 text-SlateBlue dark:text-darktext font-normal max-w-200 pt-3 pb-7'>
                    {t('cards.webDev.description')}
                  </p>
                  <Link
                    href='/portfolio'
                    className='text-primary text-base font-normal flex items-center gap-3 transition-all group'>
                    {t('cards.webDev.button')}
                    <i
                      className='bg-no-repeat bg-contain w-4 h-3 inline-block transform transition-transform duration-300 ease-in-out group-hover:translate-x-1'
                      style={{
                        backgroundImage: `url('/images/build-amazing/right-arrow-blue.svg')`,
                      }}></i>
                  </Link>
                </div>
              </div>

              {/* AI & Automation */}
              <div
                className='group'
                data-aos='fade-up'
                data-aos-delay='400'
                data-aos-duration='1000'>
                <div className='shadow-light_shadwo dark:shadow-darkmd p-8 rounded-14 group-hover:cursor-pointer'>
                  <i
                    className='bg-no-repeat w-10 h-10 inline-block'
                    style={{ backgroundImage: `url('/images/build-amazing/coded.svg')` }}></i>
                  <h6 className='text-[22px] leading-[2rem] font-bold text-secondary dark:text-white max-w-200 pt-3'>
                    {t('cards.ai.title')}
                  </h6>
                  <p className='text-14 text-SlateBlue dark:text-darktext font-normal max-w-200 pt-3 pb-7'>
                    {t('cards.ai.description')}
                  </p>
                  <Link
                    href='/portfolio'
                    className='text-primary text-base font-normal flex items-center gap-3 transition-all group'>
                    {t('cards.ai.button')}
                    <i
                      className='bg-no-repeat bg-contain w-4 h-3 inline-block transform transition-transform duration-300 ease-in-out group-hover:translate-x-1'
                      style={{
                        backgroundImage: `url('/images/build-amazing/right-arrow-blue.svg')`,
                      }}></i>
                  </Link>
                </div>
              </div>

              {/* Business Tools */}
              <div
                className='group'
                data-aos='fade-up'
                data-aos-delay='600'
                data-aos-duration='1000'>
                <div className='shadow-light_shadwo dark:shadow-darkmd p-8 rounded-14 group-hover:cursor-pointer'>
                  <i
                    className='bg-no-repeat w-10 h-10 inline-block'
                    style={{ backgroundImage: `url('/images/build-amazing/amazing.svg')` }}></i>
                  <h6 className='text-[22px] leading-[2rem] font-bold text-secondary dark:text-white max-w-200 pt-3'>
                    {t('cards.tools.title')}
                  </h6>
                  <p className='text-14 text-SlateBlue dark:text-darktext font-normal max-w-200 pt-3 pb-7'>
                    {t('cards.tools.description')}
                  </p>
                  <Link
                    href='/portfolio'
                    className='text-primary text-base font-normal flex items-center gap-3 transition-all group'>
                    {t('cards.tools.button')}
                    <i
                      className='bg-no-repeat bg-contain w-4 h-3 inline-block transform transition-transform duration-300 ease-in-out group-hover:translate-x-1'
                      style={{
                        backgroundImage: `url('/images/build-amazing/right-arrow-blue.svg')`,
                      }}></i>
                  </Link>
                </div>
              </div>

              {/* CRM Solutions */}
              <div
                className='group'
                data-aos='fade-up'
                data-aos-delay='800'
                data-aos-duration='1000'>
                <div className='shadow-light_shadwo dark:shadow-darkmd p-8 rounded-14 group-hover:cursor-pointer'>
                  <i
                    className='bg-no-repeat w-10 h-10 inline-block'
                    style={{ backgroundImage: `url('/images/build-amazing/beautiful-design.svg')` }}></i>
                  <h6 className='text-[22px] leading-[2rem] font-bold text-secondary dark:text-white max-w-200 pt-3'>
                    {t('cards.crm.title')}
                  </h6>
                  <p className='text-14 text-SlateBlue dark:text-darktext font-normal max-w-200 pt-3 pb-7'>
                    {t('cards.crm.description')}
                  </p>
                  <Link
                    href='/contact'
                    className='text-primary text-base font-normal flex items-center gap-3 transition-all group'>
                    {t('cards.crm.button')}
                    <i
                      className='bg-no-repeat bg-contain w-4 h-3 inline-block transform transition-transform duration-300 ease-in-out group-hover:translate-x-1'
                      style={{
                        backgroundImage: `url('/images/build-amazing/right-arrow-blue.svg')`,
                      }}></i>
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
