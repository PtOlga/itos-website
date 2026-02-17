import React from 'react'
import { Metadata } from "next";
import Hero from '@/components/Home/Hero';
import BuildAmazing from '@/components/Home/Build-Amazing'
import HowWeWork from '@/components/Home/HowWeWork';
import Counter from '@/components/Home/Counter';
import FaqQuestion from '@/components/Home/faq';

export const metadata: Metadata = {
  title: "ITOS",
};

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

