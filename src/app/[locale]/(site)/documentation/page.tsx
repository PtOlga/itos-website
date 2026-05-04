
import { Documentation } from "@/components/Documentation/Documentation";
import { Metadata } from "next";
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('pages.documentation')
    return {
        title: t('metaTitle'),
        description: t('metaDescription')
    }
}

export default async function Page() {
    const t = await getTranslations('pages.documentation')
    return (
        <>
        <Documentation title={t('title')} description={t('metaDescription')} />
        </>
    );
};
