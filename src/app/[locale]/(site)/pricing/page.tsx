import PriceCalculator from '@/components/Pricing/PriceCalculator'
import HeroSub from '@/components/SharedComponent/HeroSub'
import React from 'react'
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Pricing",
};

const page = () => {
  return (
    <>
        <HeroSub
            title="Website Cost Calculator"
            description="Use the calculator below to see the project price based on your requirements"
        />
        <PriceCalculator/>
    </>
  )
}

export default page