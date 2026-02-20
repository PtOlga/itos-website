'use client'
import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'

// Динамический импорт Lottie для оптимизации
const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => (
    <div className='w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl flex items-center justify-center'>
      <div className='animate-pulse text-primary text-4xl'>⏳</div>
    </div>
  ),
})

const HowWeWork = () => {
  const t = useTranslations('howWeWork')
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]) // Массив видимых шагов
  const [animationsData, setAnimationsData] = useState<any[]>([]) // Данные всех анимаций

  const steps = [
    {
      key: 'consultation',
      number: '1',
      animation: '/animations/girl-setting-favorite-button-in-website.json',
    },
    {
      key: 'planning',
      number: '2',
      animation: '/animations/employee-getting-customer-requirements.json',
    },
    {
      key: 'development',
      number: '3',
      animation: '/animations/work-from-home.json',
    },
    {
      key: 'launch',
      number: '4',
      animation: '/animations/target-evaluation.json',
    },
  ]

  // Загрузка всех анимаций при монтировании компонента
  useEffect(() => {
    const loadAllAnimations = async () => {
      try {
        const loadedAnimations = await Promise.all(
          steps.map(async (step) => {
            const response = await fetch(step.animation)
            return await response.json()
          })
        )
        setAnimationsData(loadedAnimations)
      } catch (error) {
        console.error('Error loading animations:', error)
      }
    }

    loadAllAnimations()
  }, [])

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
            const isActive = visibleSteps[visibleSteps.length - 1] === index

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
                <div className={`bg-white dark:bg-darkmode rounded-3xl p-6 shadow-xl transition-all duration-300 h-full flex flex-col ${
                  isActive ? 'ring-4 ring-white/50 scale-105' : 'hover:shadow-2xl hover:-translate-y-2'
                }`}>
                  {/* Lottie Animation */}
                  <div className='flex justify-center mb-6'>
                    <div className='w-32 h-32'>
                      {animationsData[index] ? (
                        <Lottie
                          animationData={animationsData[index]}
                          loop={true}
                          autoplay={true}
                          style={{ width: '100%', height: '100%' }}
                        />
                      ) : (
                        <div className='w-full h-full bg-primary/10 rounded-2xl flex items-center justify-center'>
                          <div className='animate-pulse text-primary text-4xl'>⏳</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Number */}
                  <div className='text-center mb-4'>
                    <span className={`text-sm font-bold ${isActive ? 'text-primary' : 'text-primary/60'}`}>
                      {step.number}.
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`text-lg font-bold text-center mb-3 min-h-[3.5rem] flex items-center justify-center ${
                    isActive ? 'text-secondary dark:text-white' : 'text-secondary/70 dark:text-white/70'
                  }`}>
                    {t(`steps.${step.key}.title`)}
                  </h3>

                  {/* Description */}
                  <p className={`text-sm text-center leading-relaxed ${
                    isActive ? 'text-SlateBlue dark:text-darktext' : 'text-SlateBlue/70 dark:text-darktext/70'
                  }`}>
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