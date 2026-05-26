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
                <article key={post.slug} className='overflow-hidden rounded-[1.5rem] border border-BorderLine bg-white shadow-light-shadwo dark:border-dark_border dark:bg-darklight'>
                  {post.coverImage ? (
                    <div className='relative h-56'>
                      <Image src={post.coverImage} alt={post.title} fill className='object-cover' />
                    </div>
                  ) : null}

                  <div className='p-6'>
                    <p className='text-sm text-SlateBlue dark:text-gray'>
                      {content.publishedLabel}: {formatPostDate(post.date, typedLocale)}
                    </p>
                    <h2 className='mt-3 text-xl font-semibold text-secondary dark:text-white'>
                      {post.title}
                    </h2>
                    <p className='mt-3 text-sm leading-7 text-SlateBlue dark:text-gray'>
                      {post.excerpt}
                    </p>
                    <Link
                      href={getLocalizedPath(`/blog/${post.slug}`, typedLocale)}
                      className='mt-5 inline-flex text-sm font-medium text-primary hover:underline dark:text-LightApricot'
                    >
                      {content.readMoreLabel} →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className='rounded-[1.5rem] border border-BorderLine bg-white p-8 text-center shadow-light-shadwo dark:border-dark_border dark:bg-darklight'>
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
