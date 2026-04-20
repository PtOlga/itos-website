import HeroSub from '@/components/SharedComponent/HeroSub'
import UnderConstruction from '@/components/SharedComponent/UnderConstruction'
import React from 'react'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('pages.about')
  return { title: t('title') }
}

const page = () => {
  const t = useTranslations('pages.about')

  return (
    <>
        <HeroSub
            title={t('title')}
            description={t('description')}
        />
        <UnderConstruction
          title={t('underConstructionTitle')}
          message={t('underConstructionMessage')}
        />
    </>
  )
}

export default page