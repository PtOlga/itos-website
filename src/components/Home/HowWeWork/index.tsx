'use client'
import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

const HowWeWork = () => {
  const t = useTranslations('howWeWork')
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]) // Массив видимых шагов

  const steps = [
    {
      key: 'consultation',
      number: '1',
      icon: '💬',
      animation: '/animations/girl-setting-favorite-button-in-website.json',
    },
    {
      key: 'planning',
      number: '2',
      icon: '⚙️',
      animation: '/animations/employee-getting-customer-requirements.json',
    },
    {
      key: 'development',
      number: '3',
      icon: '👥',
      animation: '/animations/work-from-home.json',
    },
    {
      key: 'launch',
      number: '4',
      icon: '🚀',
      animation: '/animations/target-evaluation.json',
    },
  ]

  // Последовательное появление карточек справа налево
  useEffect(() => {
    // Показываем первую карточку сразу
    setVisibleSteps([0])

    // 1.5 сек: карточки 1, 2
    const timer1 = setTimeout(() => {
      setVisibleSteps([0, 1])
    }, 1500)

    // 3 сек: карточки 1, 2, 3
    const timer2 = setTimeout(() => {
      setVisibleSteps([0, 1, 2])
    }, 3000)

    // 4.5 сек: карточки 1, 2, 3, 4
    const timer3 = setTimeout(() => {
      setVisibleSteps([0, 1, 2, 3])
    }, 4500)

    // 10 сек: сброс и начало заново
    const timer4 = setTimeout(() => {
      setVisibleSteps([])
      setTimeout(() => {
        setVisibleSteps([0])
      }, 100)
    }, 10000)

    // Повторяем цикл каждые 10.1 секунды
    const interval = setInterval(() => {
      setVisibleSteps([0])

      setTimeout(() => setVisibleSteps([0, 1]), 1500)
      setTimeout(() => setVisibleSteps([0, 1, 2]), 3000)
      setTimeout(() => setVisibleSteps([0, 1, 2, 3]), 4500)
      setTimeout(() => {
        setVisibleSteps([])
        setTimeout(() => setVisibleSteps([0]), 100)
      }, 10000)
    }, 10100)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearInterval(interval)
    }
  }, [])

  return (
    <section className='bg-gradient-to-br from-primary via-primary/90 to-secondary dark:from-darkmode dark:via-darkmode dark:to-darklight py-20'>
      <div className='container'>
        {/* Header */}
        <div className='text-center mb-16' data-aos='fade-up' data-aos-duration='1000'>
          <h2 className='text-white mb-4'>{t('title')}</h2>
          <p className='text-white/80 text-base font-normal max-w-2xl mx-auto'>
            {t('subtitle')}
          </p>
        </div>

        {/* Horizontal Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
          {steps.map((step, index) => {
            const isVisible = visibleSteps.includes(index)

            return (
              <div
                key={step.key}
                className={`transition-all duration-700 ease-out ${
                  isVisible
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-20'
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}>
                <div className='bg-white dark:bg-darkmode rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col'>
                  {/* Icon */}
                  <div className='flex justify-center mb-6'>
                    <div className='text-7xl'>
                      {step.icon}
                    </div>
                  </div>

                  {/* Number */}
                  <div className='text-center mb-4'>
                    <span className='text-sm font-bold text-primary'>
                      {step.number}.
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className='text-lg font-bold text-secondary dark:text-white text-center mb-3 min-h-[3.5rem] flex items-center justify-center'>
                    {t(`steps.${step.key}.title`)}
                  </h3>

                  {/* Description */}
                  <p className='text-sm text-SlateBlue dark:text-darktext text-center leading-relaxed'>
                    {t(`steps.${step.key}.description`)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowWeWork