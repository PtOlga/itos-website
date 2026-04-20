import HeroSub from "@/components/SharedComponent/HeroSub";
import PortfolioShowcase from '@/components/Portfolio/PortfolioShowcase'
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
};

const page = async ({
  params,
}: {
  params: Promise<{ locale: string }>
}) => {
  const { locale } = await params
  const contactHref = locale === 'en' ? '/en/contact' : '/contact'

  return (
    <>
      <HeroSub
        title="Portfolio"
        description="Examples of websites, web apps, and automation projects presented in a simple client-friendly format."
      />
      <PortfolioShowcase contactHref={contactHref} />
    </>
  );
};

export default page;
