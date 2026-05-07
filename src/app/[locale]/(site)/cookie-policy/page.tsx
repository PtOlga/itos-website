import HeroSub from '@/components/SharedComponent/HeroSub'
import LegalPageContent from '@/components/SharedComponent/LegalPageContent'
import { Metadata } from 'next'
import { getLegalPageContent } from '@/lib/content/legal'
import { type Locale } from '@/i18n/config'

type CookiePolicyPageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: CookiePolicyPageProps): Promise<Metadata> {
  const { locale } = await params
  const content = await getLegalPageContent(locale as Locale, 'cookie-policy')
  return {
    title: content.hero.metaTitle,
    description: content.hero.metaDescription,
  }
}

export default async function CookiePolicyPage({ params }: CookiePolicyPageProps) {
  const { locale } = await params
  const content = await getLegalPageContent(locale as Locale, 'cookie-policy')

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