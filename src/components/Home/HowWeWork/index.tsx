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
  const [currentAnimation, setCurrentAnimation] = useState(0) // Индекс текущей анимации
  const [animationData, setAnimationData] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false) // Флаг перехода

  const steps = [
    {
      key: 'consultation',
      number: '01',
      animation: '/animations/girl-setting-favorite-button-in-website.json',
    },
    {
      key: 'planning',
      number: '02',
      animation: '/animations/employee-getting-customer-requirements.json',
    },
    {
      key: 'development',
      number: '03',
      animation: '/animations/work-from-home.json',
    },
    {
      key: 'launch',
      number: '04',
      animation: '/animations/target-evaluation.json',
    },
  ]

  // Загрузка анимации при изменении currentAnimation
  useEffect(() => {
    const loadAnimation = async () => {
      try {
        setIsTransitioning(true)

        // Ждём завершения fadeOut анимации (700ms)
        await new Promise(resolve => setTimeout(resolve, 700))

        const response = await fetch(steps[currentAnimation].animation)
        const data = await response.json()

        setAnimationData(data)

        // Небольшая задержка перед fadeIn
        setTimeout(() => {
          setIsTransitioning(false)
        }, 50)
      } catch (error) {
        console.error('Error loading animation:', error)
        setIsTransitioning(false)
      }
    }

    loadAnimation()
  }, [currentAnimation])

  // Обновление анимации при изменении видимых шагов
  useEffect(() => {
    if (visibleSteps.length > 0) {
      const latestStep = visibleSteps[visibleSteps.length - 1]
      setCurrentAnimation(latestStep)
    }
  }, [visibleSteps])

  // Последовательное появление пунктов
  useEffect(() => {
    // Показываем первый пункт сразу
    setVisibleSteps([0])

    // 2 сек: пункты 1, 2
    const timer1 = setTimeout(() => {
      setVisibleSteps([0, 1])
    }, 2000)

    // 4 сек: пункты 1, 2, 3
    const timer2 = setTimeout(() => {
      setVisibleSteps([0, 1, 2])
    }, 4000)

    // 6 сек: пункты 1, 2, 3, 4
    const timer3 = setTimeout(() => {
      setVisibleSteps([0, 1, 2, 3])
    }, 6000)

    // 11 сек (6 + 5 пауза): сброс и начало заново
    const timer4 = setTimeout(() => {
      setVisibleSteps([])
      setTimeout(() => {
        setVisibleSteps([0])
      }, 100)
    }, 11000)

    // Повторяем цикл каждые 11.1 секунды
    const interval = setInterval(() => {
      setVisibleSteps([0])

      setTimeout(() => setVisibleSteps([0, 1]), 2000)
      setTimeout(() => setVisibleSteps([0, 1, 2]), 4000)
      setTimeout(() => setVisibleSteps([0, 1, 2, 3]), 6000)
      setTimeout(() => {
        setVisibleSteps([])
        setTimeout(() => setVisibleSteps([0]), 100)
      }, 11000)
    }, 11100)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearInterval(interval)
    }
  }, [])

  return (
    <section className='bg-AliceBlue dark:bg-darklight py-20'>
      <div className='container'>
        {/* Header */}
        <div className='text-center mb-16' data-aos='fade-up' data-aos-duration='1000'>
          <h2 className='text-secondary dark:text-white mb-4'>{t('title')}</h2>
          <p className='text-SlateBlue dark:text-darktext text-base font-normal max-w-2xl mx-auto'>
            {t('subtitle')}
          </p>
        </div>

        {/* Content */}
        <div className='grid lg:grid-cols-5 grid-cols-1 gap-10 items-start'>
          {/* Left side - Lottie Animation (40% width = 2 columns out of 5) */}
          <div className='lg:col-span-2 col-span-1 lg:sticky lg:top-24' data-aos='fade-right' data-aos-duration='1000'>
            <div className='relative w-full aspect-square overflow-hidden'>
              <div className='w-full h-full flex items-center justify-center p-2'>
                {animationData ? (
                  <div className='w-full h-full transition-all duration-700 ease-in-out'
                    style={{
                      opacity: isTransitioning ? 0 : 1,
                      transform: isTransitioning ? 'scale(0.95)' : 'scale(1)'
                    }}>
                    <Lottie
                      animationData={animationData}
                      loop={true}
                      autoplay={true}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                ) : (
                  <div className='text-center'>
                    <div className='text-8xl font-bold text-primary/20 mb-4'>01</div>
                    <div className='text-6xl'>💬</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right side - Steps (60% width = 3 columns out of 5) */}
          <div className='lg:col-span-3 col-span-1'>
            <div className='flex flex-col gap-6'>
              {steps.map((step, index) => {
                const isVisible = visibleSteps.includes(index)
                const isLatest = visibleSteps[visibleSteps.length - 1] === index

                if (!isVisible) return null

                return (
                  <div
                    key={step.key}
                    className={`transition-all duration-500 ease-in-out p-6 rounded-2xl ${
                      isLatest
                        ? 'bg-white dark:bg-darkmode shadow-xl scale-[1.02]'
                        : 'bg-white/50 dark:bg-darkmode/50'
                    }`}
                    data-aos='fade-left'
                    data-aos-delay='200'
                    data-aos-duration='500'>
                    <div className='flex items-start gap-4'>
                      {/* Step Number */}
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                          isLatest
                            ? 'bg-primary text-white scale-110'
                            : 'bg-primary/10 text-primary'
                        }`}>
                        {step.number}
                      </div>

                      {/* Step Content */}
                      <div className='flex-1'>
                        <h3
                          className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                            isLatest
                              ? 'text-secondary dark:text-white'
                              : 'text-secondary/70 dark:text-white/70'
                          }`}>
                          {t(`steps.${step.key}.title`)}
                        </h3>
                        <p
                          className={`text-base transition-all duration-300 ${
                            isLatest
                              ? 'text-SlateBlue dark:text-darktext opacity-100'
                              : 'text-SlateBlue/70 dark:text-darktext/70 opacity-80'
                          }`}>
                          {t(`steps.${step.key}.description`)}
                        </p>
                      </div>

                      {/* Active Indicator */}
                      <div className='flex-shrink-0'>
                        <div
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            isLatest
                              ? 'bg-primary scale-100 animate-pulse'
                              : 'bg-transparent scale-0'
                          }`}></div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowWeWork