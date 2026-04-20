import HeroSub from '@/components/SharedComponent/HeroSub'
import UnderConstruction from '@/components/SharedComponent/UnderConstruction'
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('pages.blog')
  return {
    title: t('title'),
  }
}

const BlogPage = () => {
  const t = useTranslations('pages.blog')

  return (
    <>
      <HeroSub
        title={t('title')}
        description={t('description')}
      />
      <UnderConstruction
        title={t('underConstructionTitle')}
        message={t('underConstructionMessage')}
      />
    </>
  )
}

export default BlogPage
