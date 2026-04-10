import HeroSub from '@/components/SharedComponent/HeroSub'
import UnderConstruction from '@/components/SharedComponent/UnderConstruction'
import React from 'react'
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "About",
};

const page = () => {
  return (
    <>
        <HeroSub
            title="About Us"
            description=""
        />
        <UnderConstruction
          title='About page is coming soon'
          message='We are preparing the About page content. Please check back soon.'
        />
    </>
  )
}

export default page