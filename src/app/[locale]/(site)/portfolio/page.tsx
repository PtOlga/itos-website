import HeroSub from "@/components/SharedComponent/HeroSub";
import PortfolioShowcase from '@/components/Portfolio/PortfolioShowcase'
import React from "react";
import { getTranslations } from 'next-intl/server'
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('portfolioPage.hero')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

const page = async ({
  params,
}: {
  params: Promise<{ locale: string }>
}) => {
  const t = await getTranslations('portfolioPage.hero')
  const { locale } = await params
  const contactHref = locale === 'en' ? '/en/contact' : '/contact'

  return (
    <>
      <HeroSub
        title={t('title')}
        description={t('description')}
      />
      <PortfolioShowcase contactHref={contactHref} />
    </>
  );
};

export default page;
