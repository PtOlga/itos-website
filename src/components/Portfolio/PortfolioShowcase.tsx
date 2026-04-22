import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

type Project = {
  id: number
  title: string
  label: string
  href?: string
  description: string
  category: string
  group: ProjectGroupKey
  tags: string[]
  previewClass: string
  previewImage?: string
  previewDurationMs?: number
}

type ProjectGroupKey = 'websites' | 'webApps' | 'wpPlugins' | 'automation'

type ProjectKey =
  | 'interpolCheck'
  | 'statusLaw'
  | 'portfolio'
  | 'prados'
  | 'diskCatalog'
  | 'megaPdfCompressor'
  | 'gdprScanner'
  | 'planfixReminder'

type ProjectCopy = {
  title: string
  label: string
  description: string
  category: string
  tags: string[]
}

const projectOrder: ProjectKey[] = [
  'interpolCheck',
  'statusLaw',
  'portfolio',
  'prados',
  'diskCatalog',
  'megaPdfCompressor',
  'gdprScanner',
  'planfixReminder',
]

const projectVisuals: Record<ProjectKey, Omit<Project, 'id' | 'title' | 'label' | 'description' | 'category' | 'tags'>> = {
  interpolCheck: { group: 'websites', href: 'https://interpol-check.me', previewClass: 'from-[#0f2234] via-[#162b40] to-[#1d3248]', previewImage: '/images/portfolio-details/interpol-check-me.webp', previewDurationMs: 36000 },
  statusLaw: { group: 'websites', href: 'https://status.law', previewClass: 'from-[#13283d] via-[#1a3652] to-[#244867]', previewImage: '/images/portfolio-details/status-law.webp', previewDurationMs: 18000 },
  portfolio: { group: 'websites', href: 'https://ptolga.github.io', previewClass: 'from-[#11263d] via-[#163a5c] to-[#1d4f7d]', previewImage: '/images/portfolio-details/ptolga-github.webp', previewDurationMs: 36000 },
  prados: { group: 'websites', href: 'https://prados.org.ua', previewClass: 'from-[#1c2d58] via-[#22427f] to-[#2f58a8]', previewImage: '/images/portfolio-details/prados.webp', previewDurationMs: 22000 },
  diskCatalog: { group: 'webApps', href: 'https://disk-catalog-488612.web.app', previewClass: 'from-[#143041] via-[#1d4b5d] to-[#2a687a]', previewImage: '/images/portfolio-details/disk-catalog.webp', previewDurationMs: 20000 },
  megaPdfCompressor: { group: 'webApps', href: 'https://mega-pdf-compressor-en.up.railway.app', previewClass: 'from-[#1d2340] via-[#2d2f63] to-[#3e438b]', previewImage: '/images/portfolio-details/mega-pdf-compressor.webp', previewDurationMs: 21000 },
  gdprScanner: { group: 'wpPlugins', previewClass: 'from-[#23283a] via-[#31384f] to-[#48516d]' },
  planfixReminder: { group: 'automation', previewClass: 'from-[#182d2c] via-[#22504a] to-[#2e776d]' },
}

const BrowserPreview = ({ project }: { project: Project }) => (
  <div className={`relative overflow-hidden rounded-[1.15rem] border border-white/10 bg-gradient-to-br ${project.previewClass} p-3 shadow-portfolio-box`}>
    <div className='mb-3 flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] text-white/70'>
      <div className='flex items-center gap-1.5'>
        <span className='h-2 w-2 rounded-full bg-[#ff6b6b]' />
        <span className='h-2 w-2 rounded-full bg-[#ffd166]' />
        <span className='h-2 w-2 rounded-full bg-[#06d6a0]' />
      </div>
      <span className='truncate'>{project.label}</span>
    </div>

    <div className={`${project.previewImage ? 'h-[220px]' : 'h-[144px]'} overflow-hidden rounded-[0.95rem] border border-white/10 bg-white/5 backdrop-blur-sm`}>
      {project.previewImage ? (
        <div className='relative h-full overflow-hidden bg-[#18304a]'>
          <div
            className='translate-y-0 transition-transform ease-linear group-hover:translate-y-[calc(220px-100%)]'
            style={{ transitionDuration: `${project.previewDurationMs ?? 22000}ms` }}
          >
            <img
              src={project.previewImage}
              alt={`${project.title} preview`}
              className='block w-full h-auto'
              loading='lazy'
            />
          </div>

          <div className='pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#17304f]/70 to-transparent' />
        </div>
      ) : (
        <div className='translate-y-0 p-4 transition-transform duration-1000 ease-out group-hover:-translate-y-10'>
          <div className='mb-4 space-y-2'>
            <div className='h-2 w-16 rounded-full bg-white/15' />
            <div className='h-6 w-4/5 rounded-full bg-white/90' />
            <div className='h-2 w-full rounded-full bg-white/12' />
            <div className='h-2 w-2/3 rounded-full bg-white/12' />
          </div>

          <div className='mb-4 rounded-2xl border border-white/10 bg-darkmode/15 p-3'>
            <div className='mb-2 flex items-center justify-between'>
              <div className='h-2 w-20 rounded-full bg-LightApricot/70' />
              <div className='h-2 w-10 rounded-full bg-white/15' />
            </div>
            <div className='grid grid-cols-2 gap-2'>
              <div className='h-14 rounded-xl bg-white/10' />
              <div className='space-y-2 rounded-xl bg-white/5 p-2'>
                <div className='h-2 rounded-full bg-white/15' />
                <div className='h-2 rounded-full bg-white/15' />
                <div className='h-2 w-3/4 rounded-full bg-[#3bd18c]/60' />
              </div>
            </div>
          </div>

          <div className='space-y-2 rounded-2xl border border-white/10 bg-white/5 p-3'>
            <div className='h-2 w-24 rounded-full bg-white/15' />
            <div className='h-2 rounded-full bg-white/10' />
            <div className='h-2 rounded-full bg-white/10' />
            <div className='h-2 w-4/5 rounded-full bg-white/10' />
            <div className='pt-2'>
              <div className='h-8 w-28 rounded-full bg-LightApricot/80' />
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
)

export default async function PortfolioShowcase({ contactHref }: { contactHref: string }) {
  const t = await getTranslations('portfolioPage')
  const projects: Project[] = projectOrder.map((key, index) => ({
    id: index + 1,
    ...(t.raw(`projects.${key}`) as ProjectCopy),
    ...projectVisuals[key],
  }))

  const filters = [
    { id: 'websites' as const, label: t('filters.websites') },
    { id: 'webApps' as const, label: t('filters.webApps') },
    { id: 'wpPlugins' as const, label: t('filters.wpPlugins') },
    { id: 'automation' as const, label: t('filters.automation') },
  ]

  const projectsByGroup = filters.map((filter) => ({
    ...filter,
    projects: projects.filter((project) => project.group === filter.id),
  }))

  return (
    <section className='bg-AliceBlue py-16 dark:bg-darkmode'>
      <div className='container'>
        <div className='mb-8 grid gap-4 rounded-[1.5rem] border border-BorderLine bg-white p-6 shadow-light-shadwo dark:border-dark_border dark:bg-darklight lg:grid-cols-[1fr_auto] lg:items-center'>
          <div className='max-w-720'>
            <span className='mb-3 inline-flex rounded-full bg-LightApricot/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-secondary dark:text-LightApricot'>
              {t('eyebrow')}
            </span>
            <h2 className='mb-3 text-2xl font-semibold text-secondary dark:text-white md:text-3xl'>
              {t('title')}
            </h2>
            <p className='text-sm leading-7 text-SlateBlue dark:text-gray md:text-base'>
              {t('description')}
            </p>
          </div>

          <div className='grid gap-2 sm:grid-cols-2 lg:min-w-[320px]'>
            {filters.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className='rounded-2xl border border-BorderLine bg-AliceBlue px-4 py-3 text-sm font-medium text-secondary transition-colors hover:border-primary hover:text-primary dark:border-dark_border dark:bg-secondary dark:text-white dark:hover:border-LightApricot dark:hover:text-LightApricot'
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className='space-y-12'>
          {projectsByGroup.map((group) => (
            <div key={group.id} id={group.id} className='scroll-mt-32'>
              <div className='mb-5 flex items-center gap-3'>
                <span className='rounded-full bg-LightApricot/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-secondary dark:text-LightApricot'>
                  {group.label}
                </span>
                <span className='text-sm text-SlateBlue dark:text-gray'>
                  {group.projects.length}
                </span>
              </div>

              <div className='grid gap-5 xl:grid-cols-2'>
                {group.projects.map((project) => (
                  <article key={project.id} className='group grid gap-5 rounded-[1.5rem] border border-BorderLine bg-white p-5 shadow-light-shadwo transition-transform duration-300 hover:-translate-y-1 dark:border-dark_border dark:bg-darklight lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start'>
                    <div>
                      <BrowserPreview project={project} />
                    </div>

                    <div className='min-w-0'>
                      <div className='mb-3 flex items-start justify-between gap-4'>
                        <div>
                          <div className='mb-2 flex items-center gap-2.5'>
                            <span className='inline-flex h-7 w-7 items-center justify-center rounded-full bg-LightApricot text-xs font-semibold text-darkmode'>
                              {project.id}
                            </span>
                            <span className='rounded-full border border-BorderLine px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-SlateBlue dark:border-dark_border dark:text-gray'>
                              {project.category}
                            </span>
                          </div>
                          <h3 className='text-xl font-semibold text-secondary dark:text-white md:text-2xl'>{project.title}</h3>
                          <p className='mt-1 text-sm text-primary dark:text-LightApricot'>{project.label}</p>
                        </div>
                      </div>

                      <p className='mb-4 text-sm leading-7 text-SlateBlue dark:text-gray md:text-base'>{project.description}</p>

                      <div className='mb-5 flex flex-wrap gap-2'>
                        {project.tags.map((tag) => (
                          <span key={tag} className='rounded-full bg-AliceBlue px-3 py-2 text-xs font-medium text-secondary dark:bg-secondary dark:text-white'>
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className='flex flex-wrap gap-3'>
                        {project.href ? (
                          <a href={project.href} target='_blank' rel='noopener noreferrer' className='inline-flex items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-darkprimary'>
                            {t('actions.openProject')}
                          </a>
                        ) : (
                          <span className='inline-flex items-center justify-center rounded-full bg-BorderLine px-4 py-2.5 text-sm font-medium text-secondary dark:bg-secondary dark:text-white'>
                            {t('actions.linkComingSoon')}
                          </span>
                        )}

                        <Link href={contactHref} className='inline-flex items-center justify-center rounded-full border border-BorderLine px-4 py-2.5 text-sm font-medium text-secondary transition-colors hover:border-primary hover:text-primary dark:border-dark_border dark:text-white dark:hover:border-LightApricot dark:hover:text-LightApricot'>
                          {t('actions.needSomethingSimilar')}
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}