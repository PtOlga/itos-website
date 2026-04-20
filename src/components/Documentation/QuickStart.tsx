"use client";
import { useTranslations } from "next-intl";

export const QuickStart = () => {
  const t = useTranslations('documentationPage.quickStart')
  return (
    <div className="pb-10 md:scroll-m-[130px] scroll-m-28" id="start">
      <h3 className=" text-black text-2xl font-semibold mt-8 dark:text-white">
        {t('title')}
      </h3>
      <div className="p-6 rounded-md border border-solid mt-6 border-BorderLine dark:border-dark_border ">
        <h6 className="dark:text-white text-lg font-medium">{t('requirementsTitle')}</h6>
        <p className="text-base font-medium text-SlateBlue dark:text-darktext">
          {t('requirementsText')}{" "}
          <a href="https://nodejs.org/" className="text-primary">
            node.js
          </a>
        </p>
        <h6 className="mt-4 mb-2 dark:text-white text-dark font-medium text-base">
          {t('recommendedEnvironment')}
        </h6>
        <ul className="list-disc ps-6">
          <li>node js 20+</li>
          <li>npm js 10+</li>
        </ul>
      </div>
      <div className="p-6 rounded-md border mt-6 border-BorderLine dark:border-dark_border border-solid">
        <h6 className="dark:text-white text-lg font-medium">{t('installTitle')}</h6>
        <p className="text-base font-medium text-SlateBlue dark:text-darktext">
          {t('installDescription')}
        </p>
        <h6 className="mt-4 mb-2 dark:text-white text-dark font-medium text-base">
          {t('installWithNpm')}
        </h6>
        <div className="py-4 px-3 rounded-md bg-black">
          <p className="text-sm text-BorderLine">
            <span className="text-yellow-500">cd</span> project-folder
          </p>
          <p className="text-sm text-BorderLine mt-2">npm install</p>
        </div>
        <h6 className="mt-4 mb-2 dark:text-white text-dark font-medium text-base">
          {t('installWithYarn')}
        </h6>
        <div className="py-4 px-3 rounded-md bg-black">
          <p className="text-sm text-BorderLine">
            <span className="text-yellow-500">cd</span> project-folder
          </p>
          <p className="text-sm text-BorderLine mt-2">yarn install</p>
        </div>
      </div>
      <div className="p-6 rounded-md border mt-6 border-BorderLine dark:border-dark_border border-solid">
        <h6 className="dark:text-white text-lg font-medium">{t('startTitle')}</h6>
        <p className="text-base font-medium text-SlateBlue dark:text-darktext mb-4">
          {t('startDescription')}
        </p>

        <div className="py-4 px-3 rounded-md bg-black">
          <p className="text-sm text-BorderLine">npm run dev or yarn run dev</p>
        </div>
        <p className="text-base font-medium text-SlateBlue dark:text-darktext my-4">
          {t('localServer')}{" "}
          <span className="dark:text-white">http://localhost:3000:</span>
        </p>
        <div className="py-4 px-3 rounded-md bg-black">
          <p className="text-sm text-BorderLine">
            {"> sustainable_project@1.0.1 dev"}
          </p>
          <p className="text-sm text-BorderLine mt-1">{"> next dev"}</p>
          <p className="text-sm text-BorderLine mt-6">{"-Next.js 15.1.1"}</p>
          <p className="text-sm text-BorderLine mt-1">
            {"-Local: http://localhost:3000"}
          </p>
        </div>
      </div>
      <div className="p-6 rounded-md border mt-6 border-BorderLine dark:border-dark_border border-solid">
        <h6 className="dark:text-white text-lg font-medium">
          {t('buildTitle')}
        </h6>
        <p className="text-base font-medium text-SlateBlue dark:text-darktext mb-4">
          {t('buildDescription')}
        </p>

        <div className="py-4 px-3 rounded-md bg-black">
          <p className="text-sm text-BorderLine">npm run build or yarn build</p>
        </div>
        <p className="text-base font-medium text-SlateBlue dark:text-darktext mt-6">
          {t('ready')}
        </p>
      </div>
    </div>
  );
};
