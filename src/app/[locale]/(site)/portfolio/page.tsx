import HeroSub from "@/components/SharedComponent/HeroSub";
import PortfolioShowcase from '@/components/Portfolio/PortfolioShowcase'
import React from "react";
import { Metadata } from "next";
import { getCasesPageContent } from '@/lib/content/cases'
import { type Locale } from '@/i18n/config'

type PortfolioPageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PortfolioPageProps): Promise<Metadata> {
  const { locale } = await params
  const content = await getCasesPageContent(locale as Locale)
  return {
    title: content.hero.metaTitle,
    description: content.hero.metaDescription,
  }
}

const page = async ({
  params,
}: PortfolioPageProps) => {
  const { locale } = await params
  const content = await getCasesPageContent(locale as Locale)
  const contactHref = locale === 'en' ? '/en/contact' : '/contact'

  return (
    <>
      <HeroSub
        title={content.hero.title}
        description={content.hero.description}
      />
      <PortfolioShowcase contactHref={contactHref} content={content} />
    </>
  );
};

export default page;
