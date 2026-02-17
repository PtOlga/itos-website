'use client'
import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

const HowWeWork = () => {
  const t = useTranslations('howWeWork')
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      key: 'consultation',
      image: '/images/how-we-work/consultation.svg',
      number: '01'
    },
    {
      key: 'planning',
      image: '/images/how-we-work/planning.svg',
      number: '02'
    },
    {
      key: 'development',
      image: '/images/how-we-work/development.svg',
      number: '03'
    },
    {
      key: 'launch',
      image: '/images/how-we-work/launch.svg',
      number: '04'
    }
  ]

  // Auto-scroll through steps every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [steps.length])

  return (
    <section className='bg-AliceBlue dark:bg-darklight py-20'>
      <div className='container'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h2 className='text-secondary dark:text-white mb-4'>
            {t('title')}
          </h2>
          <p className='text-SlateBlue dark:text-darktext text-base font-normal max-w-2xl mx-auto'>
            {t('subtitle')}
          </p>
        </div>

        {/* Content */}
        <div className='grid lg:grid-cols-5 grid-cols-1 gap-10 items-center'>
          {/* Left side - Illustration (40% width = 2 columns out of 5) */}
          <div className='lg:col-span-2 col-span-1'>
            <div className='relative w-full aspect-square'>
              {steps.map((step, index) => (
                <div
                  key={step.key}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    activeStep === index ? 'opacity-100' : 'opacity-0'
                  }`}>
                  <div className='w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl flex items-center justify-center p-8'>
                    <div className='text-center'>
                      <div className='text-8xl font-bold text-primary/20 mb-4'>
                        {step.number}
                      </div>
                      <div className='text-6xl'>
                        {index === 0 && '💬'}
                        {index === 1 && '📋'}
                        {index === 2 && '⚙️'}
                        {index === 3 && '🚀'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Steps (60% width = 3 columns out of 5) */}
          <div className='lg:col-span-3 col-span-1'>
            <div className='flex flex-col gap-6'>
              {steps.map((step, index) => (
                <div
                  key={step.key}
                  onClick={() => setActiveStep(index)}
                  className={`cursor-pointer transition-all duration-300 p-6 rounded-2xl ${
                    activeStep === index
                      ? 'bg-white dark:bg-darkmode shadow-lg scale-105'
                      : 'bg-white/50 dark:bg-darkmode/50 hover:bg-white dark:hover:bg-darkmode'
                  }`}
                  data-aos='fade-left'
                  data-aos-delay={`${index * 100}`}
                  data-aos-duration='1000'>
                  <div className='flex items-start gap-4'>
                    {/* Step Number */}
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-colors ${
                        activeStep === index
                          ? 'bg-primary text-white'
                          : 'bg-primary/10 text-primary'
                      }`}>
                      {step.number}
                    </div>

                    {/* Step Content */}
                    <div className='flex-1'>
                      <h3
                        className={`text-xl font-bold mb-2 transition-colors ${
                          activeStep === index
                            ? 'text-secondary dark:text-white'
                            : 'text-secondary/70 dark:text-white/70'
                        }`}>
                        {t(`steps.${step.key}.title`)}
                      </h3>
                      <p
                        className={`text-base transition-colors ${
                          activeStep === index
                            ? 'text-SlateBlue dark:text-darktext'
                            : 'text-SlateBlue/70 dark:text-darktext/70'
                        }`}>
                        {t(`steps.${step.key}.description`)}
                      </p>
                    </div>

                    {/* Active Indicator */}
                    {activeStep === index && (
                      <div className='flex-shrink-0'>
                        <div className='w-2 h-2 rounded-full bg-primary animate-pulse'></div>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {activeStep === index && (
                    <div className='mt-4 h-1 bg-primary/10 rounded-full overflow-hidden'>
                      <div
                        className='h-full bg-primary rounded-full animate-progress'
                        style={{
                          animation: 'progress 5s linear'
                        }}></div>
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

