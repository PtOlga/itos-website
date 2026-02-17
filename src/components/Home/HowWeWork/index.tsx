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
  const [activeStep, setActiveStep] = useState(0)
  const [animationData, setAnimationData] = useState(null)

  const steps = [
    {
      key: 'consultation',
      number: '01',
    },
    {
      key: 'planning',
      number: '02',
    },
    {
      key: 'development',
      number: '03',
    },
    {
      key: 'launch',
      number: '04',
    },
  ]

  // Загрузка JSON анимации
  useEffect(() => {
    fetch('/animations/consultation.json')
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error('Error loading animation:', error))
  }, [])

  // Auto-scroll через шаги каждые 4 секунды
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [steps.length])

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
        <div className='grid lg:grid-cols-5 grid-cols-1 gap-10 items-center'>
          {/* Left side - Lottie Animation (40% width = 2 columns out of 5) */}
          <div className='lg:col-span-2 col-span-1' data-aos='fade-right' data-aos-duration='1000'>
            <div className='relative w-full aspect-square'>
              <div className='w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl flex items-center justify-center p-8 overflow-hidden'>
                {animationData ? (
                  <div className='w-full h-full'>
                    <Lottie
                      animationData={animationData}
                      loop={true}
                      autoplay={true}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                ) : (
                  <div className='text-center'>
                    <div className='text-8xl font-bold text-primary/20 mb-4'>
                      {steps[activeStep].number}
                    </div>
                    <div className='text-6xl'>
                      {activeStep === 0 && '💬'}
                      {activeStep === 1 && '📋'}
                      {activeStep === 2 && '⚙️'}
                      {activeStep === 3 && '🚀'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right side - Steps (60% width = 3 columns out of 5) */}
          <div className='lg:col-span-3 col-span-1'>
            <div className='flex flex-col gap-6'>
              {steps.map((step, index) => (
                <div
                  key={step.key}
                  className={`transition-all duration-500 ease-in-out p-6 rounded-2xl ${
                    activeStep === index
                      ? 'bg-white dark:bg-darkmode shadow-xl scale-[1.02]'
                      : 'bg-white/50 dark:bg-darkmode/50'
                  }`}
                  data-aos='fade-left'
                  data-aos-delay={`${index * 100}`}
                  data-aos-duration='1000'>
                  <div className='flex items-start gap-4'>
                    {/* Step Number */}
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                        activeStep === index
                          ? 'bg-primary text-white scale-110'
                          : 'bg-primary/10 text-primary'
                      }`}>
                      {step.number}
                    </div>

                    {/* Step Content */}
                    <div className='flex-1'>
                      <h3
                        className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                          activeStep === index
                            ? 'text-secondary dark:text-white'
                            : 'text-secondary/70 dark:text-white/70'
                        }`}>
                        {t(`steps.${step.key}.title`)}
                      </h3>
                      <p
                        className={`text-base transition-all duration-300 ${
                          activeStep === index
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
                          activeStep === index
                            ? 'bg-primary scale-100 animate-pulse'
                            : 'bg-transparent scale-0'
                        }`}></div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {activeStep === index && (
                    <div className='mt-4 h-1 bg-primary/10 rounded-full overflow-hidden'>
                      <div
                        key={`progress-${index}`}
                        className='h-full bg-primary rounded-full animate-progress'></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowWeWork