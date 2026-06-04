'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

const FaqQuestion = () => {
  const t = useTranslations('faq')
  const items = t.raw('items') as { question: string; answer: string }[]
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className='bg-AliceBlue dark:bg-darkmode pt-40 pb-20'>
      <div className='container'>
        <div className='flex flex-col gap-y-8'>
          <h2 className='text-secondary dark:text-white text-center'>
            {t('title')}
          </h2>
          <div className='itos-card overflow-hidden relative z-10 lg:w-770 w-full m-auto rounded-2xl dark:shadow-none'>

            {items.map((item, index) => (
              <div
                key={item.question}
                className={`accordion__item transition-colors duration-300 hover:bg-[#FFF7EF] dark:hover:bg-[#F07B2A]/10 ${
                  activeIndex === index ? 'accordion__item--active' : ''
                }`}>
                <button
                  className='accordion__btn flex justify-between items-center w-full text-xl font-bold text-left cursor-pointer p-8 border-none outline-hidden bg-transparent text-secondary dark:text-white hover:text-[#C85E10] dark:hover:text-[#FFB16D] transition-colors duration-300 group'
                  onClick={() => toggleAccordion(index)}>
                  <span className='text-20 font-bold'>{item.question}</span>
                  <span className='rounded-full rotate-0 group-active:rotate-180 transition-width opacity-90'>
                    {activeIndex === index ? (
                      <svg width='14' height='2' viewBox='0 0 14 2' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M14 1.99799H0V-0.00201416H14V1.99799Z' className='icon-fill' />
                      </svg>
                    ) : (
                      <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M14 7.99805H8V13.998H6V7.99805H0V5.99805H6V-0.00195312H8V5.99805H14V7.99805Z' className='icon-fill' />
                      </svg>
                    )}
                  </span>
                </button>

                <div className='accordion__content font-light max-h-0 opacity-0 overflow-hidden translate-x-4 bg-[#FFF7EF]/50 dark:bg-[#F07B2A]/5'>
                  <p className='text-SlateBlue dark:text-darktext font-normal text-base px-7 py-4'>
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}

            <div className='accordion__item accordion__item--static text-center bg-white dark:bg-darklight py-8'>
              <p className='text-secondary dark:text-white font-normal text-base text-center pb-2'>
                {t('contactText')}
              </p>
              <Link
                href='/contact'
                className='text-primary dark:text-darkprimary text-base font-normal transition-colors duration-300 hover:text-[#C85E10] dark:hover:text-[#FFB16D]'>
                {t('contactLink')}
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default FaqQuestion
