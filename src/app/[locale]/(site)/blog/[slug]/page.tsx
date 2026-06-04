import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { locales, type Locale } from '@/i18n/config'
import { getLocalizedPath, getPathnameForLocale } from '@/utils/localePath'
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
    openGraph: post.coverImage
      ? {
          title: post.title,
          description: post.excerpt,
          images: [{ url: post.coverImage, width: 400, height: 400, alt: post.title }],
        }
      : undefined,
    twitter: post.coverImage
      ? {
          card: 'summary_large_image',
          title: post.title,
          description: post.excerpt,
          images: [post.coverImage],
        }
      : undefined,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params
  const typedLocale = locale as Locale
  const contactHref = getLocalizedPath('/contact', typedLocale)
  const [post, pageContent] = await Promise.all([
    getBlogPostBySlug(typedLocale, slug),
    getBlogPageContent(typedLocale),
  ])

  if (!post) {
    const requestedPath = `/blog/${slug}`
    const localizedPath = getPathnameForLocale(requestedPath, typedLocale)

    if (localizedPath !== requestedPath) {
      redirect(getLocalizedPath(localizedPath, typedLocale))
    }

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

        <article className='itos-card p-6 md:p-8'>
          <div className='mb-6'>
            <p className='text-sm text-SlateBlue dark:text-gray'>
              {pageContent.publishedLabel}: {formatPostDate(post.date, typedLocale)}
            </p>
            <div className='mt-4 mb-4 h-1 w-14 rounded-full bg-[#F07B2A]/65' />
            <h1 className='max-w-3xl text-primary dark:text-white'>
              {post.title}
            </h1>
            <p className='mt-6 max-w-3xl text-base font-normal leading-7 text-SlateBlue dark:text-darktext md:text-lg'>
              {post.excerpt}
            </p>
          </div>

          <div className='blog-details text-base font-normal leading-7 md:text-lg'>
            <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
          </div>

          <div className='mt-10 border-t border-BorderLine pt-8 dark:border-dark_border'>
            <Link
              href={contactHref}
              className='inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-darkprimary'
            >
              {pageContent.ctaLabel}
            </Link>
          </div>
        </article>
      </div>
    </section>
  )
}