"use client";
import { ColorConfiguration } from "./ColorConfiguraion";
import { LogoConfiguration } from "./LogoConfiguration";
import { TypographyConfiguration } from "./TypographyConfiguration";
import { useTranslations } from "next-intl";

export const Configuration = () => {
  const t = useTranslations('documentationPage.configuration')
  return (
    <>
      <div className="pb-10 md:scroll-m-[130px] scroll-m-28" id="configuration">
        <h3 className=" text-black text-2xl font-semibold mt-4 dark:text-white">
          {t('title')}
        </h3>
        <ColorConfiguration />
        <TypographyConfiguration />
        <LogoConfiguration />
      </div>
    </>
  );
};
