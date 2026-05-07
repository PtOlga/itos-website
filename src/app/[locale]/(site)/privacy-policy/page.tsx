import HeroSub from '@/components/SharedComponent/HeroSub'
import LegalPageContent from '@/components/SharedComponent/LegalPageContent'
import { Metadata } from 'next'
import { getLegalPageContent } from '@/lib/content/legal'
import { type Locale } from '@/i18n/config'

type PrivacyPolicyPageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PrivacyPolicyPageProps): Promise<Metadata> {
  const { locale } = await params
  const content = await getLegalPageContent(locale as Locale, 'privacy-policy')
  return {
    title: content.hero.metaTitle,
    description: content.hero.metaDescription,
  }
}

export default async function PrivacyPolicyPage({ params }: PrivacyPolicyPageProps) {
  const { locale } = await params
  const content = await getLegalPageContent(locale as Locale, 'privacy-policy')

  return (
    <>
      <HeroSub title={content.hero.title} description={content.hero.description} />
      <LegalPageContent
        updatedLabel={content.updatedLabel}
        updatedDate={content.updatedDate}
        contactLabel={content.contactLabel}
        intro={content.intro}
        sections={content.sections}
        contactEmail={content.contactEmail}
      />
    </>
  )
}