import HeroSub from '@/components/SharedComponent/HeroSub'
import LegalPageContent, { type LegalSection } from '@/components/SharedComponent/LegalPageContent'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('legal.privacy.hero')
  return { title: t('title') }
}

export default async function PrivacyPolicyPage() {
  const t = await getTranslations('legal.privacy')
  const intro = t.raw('intro') as string[]
  const sections = t.raw('sections') as LegalSection[]

  return (
    <>
      <HeroSub title={t('hero.title')} description={t('hero.description')} />
      <LegalPageContent
        updatedLabel={t('updatedLabel')}
        updatedDate={t('updatedDate')}
        contactLabel={t('contactLabel')}
        intro={intro}
        sections={sections}
        contactEmail='5441700@gmail.com'
      />
    </>
  )
}