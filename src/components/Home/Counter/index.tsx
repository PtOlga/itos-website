'use client'
import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const Counter = () => {
  const t = useTranslations('counter')
  const items = [
    { icon: '/images/counter/euro.svg', value: '€0', key: 'consultation' },
    { icon: '/images/counter/calendar.svg', value: '15+', key: 'experience' },
    { icon: '/images/counter/lightbulb.svg', value: '100+', key: 'ideas' },
    { icon: '/images/counter/coffee.svg', value: '∞', key: 'coffee' },
  ]

  return (
    <section className={`dark:bg-darkmode py-20`}>
      <div className='container'>
        <div className='flex flex-wrap items-center md:justify-between justify-center md:gap-0 gap-9'>
          {items.map((item, index) => (
            <div
              key={item.key}
              className='flex flex-col items-center gap-4'
              data-aos='fade-up'
              data-aos-delay={`${index * 200}`}
              data-aos-duration='1000'>
              <Image
                src={item.icon}
                alt='icon'
                width={60}
                height={60}
                unoptimized
              />
              <span className='text-5xl font-bold text-secondary dark:text-white'>
                {item.value}
              </span>
              <p className='text-20 text-SlateBlue font-normal text-center max-w-72 w-full dark:text-darktext'>
                {t(`items.${item.key}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Counter
