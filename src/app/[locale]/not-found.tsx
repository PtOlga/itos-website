import HeroSub from '@/components/SharedComponent/HeroSub'
import NotFound from '../../../NotFound'
import { getLocale, getTranslations } from 'next-intl/server'

const LocalizedNotFoundPage = async () => {
  const t = await getTranslations('notFound')
  const locale = await getLocale()
  const homeHref = locale === 'en' ? '/en' : '/'

  return (
    <>
      <HeroSub title='404' description={t('heroDescription')} />
      <NotFound
        title={t('title')}
        text={t('text')}
        buttonLabel={t('button')}
        homeHref={homeHref}
      />
    </>
  )
}

export default LocalizedNotFoundPage