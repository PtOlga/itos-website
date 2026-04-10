import HeroSub from "@/components/SharedComponent/HeroSub";
import UnderConstruction from '@/components/SharedComponent/UnderConstruction'
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Portfolio",
};

const page = () => {
  return (
    <>
      <HeroSub title="Portfolio" description="" />
      <UnderConstruction
        title='Portfolio page is coming soon'
        message='We are updating our portfolio. The main portfolio page will be available soon.'
      />
    </>
  );
};

export default page;
