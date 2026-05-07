export type BlogPageContent = {
  title: string
  metaTitle: string
  description: string
  metaDescription: string
  emptyTitle: string
  emptyMessage: string
  readMoreLabel: string
  backLabel: string
  publishedLabel: string
}

export type BlogPostFrontmatter = {
  title: string
  excerpt: string
  date: string
  coverImage?: string
  author?: string
  authorImage?: string
}

export type BlogPostSummary = BlogPostFrontmatter & {
  slug: string
}

export type BlogPost = BlogPostSummary & {
  contentHtml: string
}

export type CaseStudyGroup = 'websites' | 'webApps' | 'wpPlugins' | 'automation'

export type CaseStudy = {
  slug: string
  title: string
  label: string
  href?: string
  description: string
  category: string
  group: CaseStudyGroup
  tags: string[]
  previewImage?: string
  previewDurationMs?: number
}

export type CasesPageContent = {
  hero: {
    title: string
    metaTitle: string
    description: string
    metaDescription: string
  }
  eyebrow: string
  title: string
  description: string
  filters: Record<CaseStudyGroup, string>
  actions: {
    openProject: string
    linkComingSoon: string
    needSomethingSimilar: string
  }
  projects: CaseStudy[]
}

export type LegalSection = {
  title: string
  paragraphs?: string[]
  items?: string[]
}

export type LegalPageContent = {
  hero: {
    title: string
    metaTitle: string
    description: string
    metaDescription: string
  }
  updatedLabel: string
  updatedDate: string
  contactLabel: string
  contactEmail: string
  intro: string[]
  sections: LegalSection[]
}

export type AboutPageContent = {
  hero: {
    title: string
    metaTitle: string
    description: string
    metaDescription: string
  }
  image: {
    src: string
    alt: string
  }
  paragraphs: string[]
  howIWork: {
    title: string
    steps: Array<{
      number: string
      title: string
      description: string
    }>
  }
}