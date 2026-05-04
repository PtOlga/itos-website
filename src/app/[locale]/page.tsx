import React from 'react'
import { Metadata } from "next";
import { getTranslations } from 'next-intl/server'
import Hero from '@/components/Home/Hero';
import BuildAmazing from '@/components/Home/Build-Amazing'
import HowWeWork from '@/components/Home/HowWeWork';
import Counter from '@/components/Home/Counter';
import FaqQuestion from '@/components/Home/faq';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('hero')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

export default function Home() {
  return (
    <main>
      <Hero/>
      <BuildAmazing isSpace={true} />
      <HowWeWork/>
      <Counter/>
      <FaqQuestion/>
    </main>
  )
}

