import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { locales, type Locale } from '@/i18n/config'
import { getLocalizedPath } from '@/utils/localePath'
import { getBlogPageContent, getBlogPostBySlug, getBlogStaticSlugs } from '@/lib/content/blog'

type BlogPostPageProps = {
  params: Promise<{ locale: string; slug: string }>
}

function formatPostDate(date: string, locale: Locale) {
  return new Date(date).toLocaleDateString(locale === 'sv' ? 'sv-SE' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export async function generateStaticParams() {
  const localizedSlugs = await Promise.all(
    locales.map(async (locale) => ({
      locale,
      slugs: await getBlogStaticSlugs(locale),
    }))
  )

  return localizedSlugs.flatMap(({ locale, slugs }) =>
    slugs.map((slug) => ({ locale, slug }))
  )
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getBlogPostBySlug(locale as Locale, slug)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params
  const typedLocale = locale as Locale
  const [post, pageContent] = await Promise.all([
    getBlogPostBySlug(typedLocale, slug),
    getBlogPageContent(typedLocale),
  ])

  if (!post) {
    notFound()
  }

  return (
    <section className='bg-AliceBlue py-16 dark:bg-darkmode'>
      <div className='container max-w-4xl'>
        <Link
          href={getLocalizedPath('/blog', typedLocale)}
          className='mb-6 inline-flex text-sm font-medium text-primary hover:underline dark:text-LightApricot'
        >
          ← {pageContent.backLabel}
        </Link>

        <article className='rounded-[1.5rem] border border-BorderLine bg-white p-6 shadow-light-shadwo dark:border-dark_border dark:bg-darklight md:p-8'>
          <div className='mb-6'>
            <p className='text-sm text-SlateBlue dark:text-gray'>
              {pageContent.publishedLabel}: {formatPostDate(post.date, typedLocale)}
            </p>
            <h1 className='mt-3 text-3xl font-semibold text-secondary dark:text-white md:text-4xl'>
              {post.title}
            </h1>
            <p className='mt-4 text-base leading-7 text-SlateBlue dark:text-gray md:text-lg'>
              {post.excerpt}
            </p>
          </div>

          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              width={1200}
              height={630}
              className='mb-8 w-full rounded-3xl border border-BorderLine object-cover dark:border-dark_border'
              style={{ height: 'auto' }}
            />
          ) : null}

          <div
            className='space-y-5 text-sm leading-7 text-SlateBlue dark:text-gray md:text-base'
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>
      </div>
    </section>
  )
}