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
          <div className='grid gap-8 rounded-[1.5rem] border border-BorderLine bg-white p-6 shadow-light-shadwo dark:border-dark_border dark:bg-darklight lg:grid-cols-[380px_minmax(0,1fr)] lg:p-8'>
            <div className='overflow-hidden rounded-[1.5rem] border border-BorderLine bg-AliceBlue dark:border-dark_border dark:bg-secondary'>
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
    </>
  )
}

export default page