import PriceCalculator from '@/components/Pricing/PriceCalculator'
import HeroSub from '@/components/SharedComponent/HeroSub'
import React from 'react'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('pricing')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

const Page = () => {
  const t = useTranslations('pricing')

  return (
    <>
        <HeroSub
            title={t('title')}
            description={t('description')}
        />
        <PriceCalculator/>
    </>
  )
}

export default Page