import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import type { Locale } from '@/i18n/config'
import type { BlogPageContent, BlogPost, BlogPostFrontmatter, BlogPostSummary } from '@/types/content'
import { listContentDirectory, pathExists, readContentFile, readContentJson } from './shared'

const BLOG_FALLBACK_LOCALE: Locale = 'en'
const BLOG_FILE_EXTENSIONS = ['.md', '.mdx']

function getSlugFromFilename(filename: string) {
  return filename.replace(/\.[^.]+$/, '')
}

async function resolveBlogLocale(locale: Locale) {
  const hasLocalePosts = (await listBlogFilenames(locale)).length > 0
  return hasLocalePosts ? locale : BLOG_FALLBACK_LOCALE
}

async function listBlogFilenames(locale: Locale) {
  const filenames = await listContentDirectory('blog', locale)

  return filenames.filter(
    (filename) => BLOG_FILE_EXTENSIONS.some((extension) => filename.endsWith(extension))
  )
}

async function readPostSource(locale: Locale, slug: string) {
  for (const extension of BLOG_FILE_EXTENSIONS) {
    if (await pathExists('blog', locale, `${slug}${extension}`)) {
      return readContentFile('blog', locale, `${slug}${extension}`)
    }
  }

  return null
}

function mapSummary(slug: string, frontmatter: BlogPostFrontmatter): BlogPostSummary {
  return { slug, ...frontmatter }
}

function sortPosts(posts: BlogPostSummary[]) {
  return [...posts].sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
}

export async function getBlogPageContent(locale: Locale) {
  return readContentJson<BlogPageContent>('blog', locale, 'index.json')
}

export async function getBlogPosts(locale: Locale) {
  const resolvedLocale = await resolveBlogLocale(locale)
  const filenames = await listBlogFilenames(resolvedLocale)

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const slug = getSlugFromFilename(filename)
      const source = await readContentFile('blog', resolvedLocale, filename)
      const { data } = matter(source)
      return mapSummary(slug, data as BlogPostFrontmatter)
    })
  )

  return sortPosts(posts)
}

export async function getBlogPostBySlug(locale: Locale, slug: string): Promise<BlogPost | null> {
  const source = (await readPostSource(locale, slug)) ?? (locale === BLOG_FALLBACK_LOCALE ? null : await readPostSource(BLOG_FALLBACK_LOCALE, slug))

  if (!source) {
    return null
  }

  const { data, content } = matter(source)
  const processedContent = await remark().use(html).process(content)

  return {
    ...mapSummary(slug, data as BlogPostFrontmatter),
    contentHtml: processedContent.toString(),
  }
}

export async function getBlogStaticSlugs() {
  const filenames = await listBlogFilenames(BLOG_FALLBACK_LOCALE)
  return filenames.map(getSlugFromFilename)
}