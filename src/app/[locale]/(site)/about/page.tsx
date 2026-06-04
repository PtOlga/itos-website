import HeroSub from '@/components/SharedComponent/HeroSub'
import Image from 'next/image'
import React from 'react'
import { Metadata } from "next";
import { type Locale } from '@/i18n/config'
import { getAboutPageContent } from '@/lib/content/pages'

type AboutPageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params
  const content = await getAboutPageContent(locale as Locale)
  return {
    title: content.hero.metaTitle,
    description: content.hero.metaDescription,
  }
}

const page = async ({ params }: AboutPageProps) => {
  const { locale } = await params
  const content = await getAboutPageContent(locale as Locale)
  const highlightedParagraphIndexes = new Set([2, content.paragraphs.length - 1])
  const accentParagraphClass = 'text-base font-semibold leading-7 text-secondary dark:text-white md:text-lg'

  return (
    <>
      <HeroSub
        title={content.hero.title}
        description={content.hero.description}
      />

      <section className='bg-AliceBlue py-16 dark:bg-darkmode'>
        <div className='container'>
          <div className='itos-card grid gap-8 p-6 lg:grid-cols-[380px_minmax(0,1fr)] lg:p-8'>
            <div className='itos-card overflow-hidden bg-AliceBlue shadow-none dark:bg-darklight dark:shadow-none'>
              <Image
                src={content.image.src}
                alt={content.image.alt}
                width={760}
                height={980}
                className='h-full w-full object-cover [transform:scaleX(-1)]'
                priority
              />
            </div>

            <div className='min-w-0'>
              <div className='space-y-5'>
                {content.paragraphs.map((paragraph, index) => (
                  <p
                    key={paragraph}
                    className={index === 0
                      ? accentParagraphClass
                      : highlightedParagraphIndexes.has(index)
                        ? accentParagraphClass
                        : 'text-base font-normal leading-7 text-SlateBlue dark:text-darktext'
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-AliceBlue py-16 dark:bg-darkmode'>
        <div className='container'>
          <h2
            className='mb-10 text-center text-2xl font-bold text-secondary dark:text-white md:text-3xl'
            data-aos='fade-up'
            data-aos-duration='1000'
          >
            {content.howIWork.title}
          </h2>
          <div className='grid grid-cols-1 gap-8'>
            {content.howIWork.steps.map((step, index) => (
              <div
                key={step.number}
                data-aos='fade-up'
                data-aos-delay={`${index * 150}`}
                data-aos-duration='1000'
                className='group flex items-stretch overflow-hidden rounded-xl border border-BorderLine bg-white shadow-light-shadwo transition-colors duration-300 hover:border-[#e07a2f] dark:border-dark_border dark:bg-darklight dark:shadow-darkmd dark:hover:border-[#e07a2f]'
              >
                {/* Step number */}
                <div className='flex min-w-[120px] items-center justify-center px-6 py-10'>
                  <span className='text-[72px] font-extrabold leading-none text-[#e07a2f]'>
                    {step.number}
                  </span>
                </div>

                {/* Vertical divider */}
                <div className='w-px self-stretch bg-BorderLine dark:bg-dark_border' />

                {/* Title + description */}
                <div className='flex flex-1 flex-col justify-center px-8 py-10'>
                  <h3 className='mb-3 text-xl font-medium text-secondary dark:text-white'>
                    {step.title}
                  </h3>
                  <p className='text-[15px] leading-relaxed text-SlateBlue dark:text-darktext'>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default page
