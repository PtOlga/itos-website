'use client'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const Hero = () => {
  const t = useTranslations('hero')

  return (
    <>
      <section className="relative overflow-x-clip top-0 bg-primary circalanimat before:content-[''] before:absolute before:bg-[url('/images/work-grow/work-line.png')] before:bg-no-repeat before:bg-contain before:w-44 before:h-20 before:bottom-40 lg:before:inline-block before:hidden">
        <div className='banner-shap it-wrapper'>
          <div className='container py-20'>
            <div className='flex flex-wrap items-center'>
              <div
                className='pb-3 sm:pb-0 md:w-1/2 w-full relative z-1'
                data-aos='fade-right'
                data-aos-delay='200'
                data-aos-duration='1000'>
                <h1 className='text-white relative max-w-473'>
                  {t('title')}
                </h1>
                <button className='bg-white text-base font-normal text-primary py-3 px-12 rounded-lg mb-16 mt-8 transition-all duration-0.4s hover:bg-secondary hover:text-white'>
                  {t('startProject')}
                </button>
                <div className='flex items-center mb-8'>
                  <svg
                    className='w-4 h-4 text-LightApricot ms-1'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 22 20'>
                    <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                  </svg>
                  <svg
                    className='w-4 h-4 text-LightApricot ms-1'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 22 20'>
                    <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                  </svg>
                  <svg
                    className='w-4 h-4 text-LightApricot ms-1'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 22 20'>
                    <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                  </svg>
                  <svg
                    className='w-4 h-4 text-LightApricot ms-1'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 22 20'>
                    <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                  </svg>
                  <svg
                    className='w-4 h-4 ms-1 text-LightApricot'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 22 20'>
                    <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                  </svg>
                </div>
                <p className='text-base font-normal text-white leading-7 pb-11 max-w-408'>
                  It’s easy to set up and the support experience is the best and
                  unparalleled comparatively.
                </p>
                <div className='flex items-center gap-6'>
                  <div>
                    <Image
                      src='/images/hero/wise_white.png'
                      alt='logo'
                      width={0}
                      height={0}
                      quality={100}
                      layout='responsive'
                      sizes='100vh'
                      className='w-20! h-5!'
                    />
                  </div>
                  <div>
                    <Image
                      src='/images/hero/google_white.png'
                      alt='logo'
                      width={0}
                      height={0}
                      quality={100}
                      layout='responsive'
                      sizes='100vh'
                      className=' h-5!'
                    />
                  </div>
                  <div>
                    <Image
                      src='/images/hero/pay_white.png'
                      alt='logo'
                      width={0}
                      height={0}
                      quality={100}
                      layout='responsive'
                      sizes='100vh'
                      className=' h-5!'
                    />
                  </div>
                  <div>
                    <Image
                      src='/images/hero/stripe_white.png'
                      alt='logo'
                      width={0}
                      height={0}
                      quality={100}
                      layout='responsive'
                      sizes='100vh'
                      className='w-14! h-5!'
                    />
                  </div>
                </div>
              </div>
              <div
                className="md:w-1/2 w-full relative z-1 flex justify-center items-center before:absolute before:content-[''] before:bg-[url('/images/hero/grid-line.png')] before:bg-no-repeat before:w-24 before:h-24 before:-top-32 before:-right-16 lg:before:inline-block before:hidden after:content-[''] after:absolute after:bg-[url('/images/hero/circal.png')] after:bg-no-repeat after:w-[2.625rem] after:h-[2.625rem] after:top-10 after:-left-[8.25rem] xl:after:inline-block after:hidden"
                data-aos='fade-left'
                data-aos-delay='200'
                data-aos-duration='1000'>
                <div style={{ width: '900px', maxWidth: '100%' }}>
                  <Image
                    src='/images/hero/hero-image.png'
                    alt='Hero illustration'
                    width={900}
                    height={900}
                    quality={100}
                    style={{ width: '100%', height: 'auto' }}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
