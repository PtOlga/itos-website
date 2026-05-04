import FaqQuestion from "@/components/Home/faq";
import HeroSub from "@/components/SharedComponent/HeroSub";
import React from "react";
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('pages.faqs')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

const page = () => {
  const t = useTranslations('pages.faqs')

  return (
    <>
      <HeroSub title={t('title')} description={t('description')} />
      <FaqQuestion />
    </>
  );
};

export default page;
