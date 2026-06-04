import HeroSub from '@/components/SharedComponent/HeroSub'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { getBlogPageContent, getBlogPosts } from '@/lib/content/blog'
import { type Locale } from '@/i18n/config'
import { getLocalizedPath } from '@/utils/localePath'

type BlogPageProps = {
  params: Promise<{ locale: string }>
}

function formatPostDate(date: string, locale: Locale) {
  return new Date(date).toLocaleDateString(locale === 'sv' ? 'sv-SE' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params
  const content = await getBlogPageContent(locale as Locale)
  return {
    title: content.metaTitle,
    description: content.metaDescription,
  }
}

const BlogPage = async ({ params }: BlogPageProps) => {
  const { locale } = await params
  const typedLocale = locale as Locale
  const [content, posts] = await Promise.all([
    getBlogPageContent(typedLocale),
    getBlogPosts(typedLocale),
  ])

  return (
    <>
      <HeroSub
        title={content.title}
        description={content.description}
      />
      <section className='bg-AliceBlue py-16 dark:bg-darkmode'>
        <div className='container'>
          {posts.length ? (
            <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
              {posts.map((post) => (
                <article key={post.slug} className='itos-card itos-card-interactive group'>
                  {post.coverImage ? (
                    <div className='relative h-56 overflow-hidden'>
                      <Image src={post.coverImage} alt={post.title} fill className='object-cover' />
                      <div className='absolute inset-0 bg-gradient-to-br from-[#F07B2A]/10 via-transparent to-[#F07B2A]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                    </div>
                  ) : null}

                  <div className='p-6'>
                    <p className='text-sm text-SlateBlue dark:text-gray'>
                      {content.publishedLabel}: {formatPostDate(post.date, typedLocale)}
                    </p>
                    <div className='mt-3 mb-3 h-1 w-14 rounded-full bg-[#F07B2A]/65 transition-all duration-300 group-hover:w-24 group-hover:bg-[#F07B2A]' />
                    <h2 className='text-xl font-semibold text-secondary transition-colors duration-300 group-hover:text-[#C85E10] dark:text-white dark:group-hover:text-[#FFB16D]'>
                      {post.title}
                    </h2>
                    <p className='mt-3 text-sm leading-7 text-SlateBlue dark:text-gray'>
                      {post.excerpt}
                    </p>
                    <Link
                      href={getLocalizedPath(`/blog/${post.slug}`, typedLocale)}
                      className='mt-5 inline-flex text-sm font-medium text-primary transition-colors duration-300 group-hover:text-[#F07B2A] dark:text-LightApricot'
                    >
                      {content.readMoreLabel} →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className='itos-card p-8 text-center'>
              <h2 className='text-2xl font-semibold text-secondary dark:text-white'>{content.emptyTitle}</h2>
              <p className='mt-3 text-base text-SlateBlue dark:text-gray'>{content.emptyMessage}</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default BlogPage
