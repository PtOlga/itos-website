
import { Documentation } from "@/components/Documentation/Documentation";
import { Metadata } from "next";
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('pages.documentation')
    return { title: t('title') }
}

export default function Page() {
    return (
        <>
        <Documentation/>
        </>
    );
};
