import Image from 'next/image'
import Link from 'next/link'
import type { CaseStudy, CaseStudyGroup, CasesPageContent } from '@/types/content'

type Project = {
  id: number
  slug: string
  title: string
  label: string
  href?: string
  description: string
  category: string
  group: CaseStudyGroup
  tags: string[]
  previewClass: string
  previewImage?: string
  previewDurationMs?: number
}

const filterOrder: CaseStudyGroup[] = ['websites', 'webApps', 'wpPlugins', 'automation']

const projectPreviewClasses: Record<string, string> = {
  'interpol-check': 'from-[#0f2234] via-[#162b40] to-[#1d3248]',
  'status-law': 'from-[#13283d] via-[#1a3652] to-[#244867]',
  portfolio: 'from-[#11263d] via-[#163a5c] to-[#1d4f7d]',
  prados: 'from-[#1c2d58] via-[#22427f] to-[#2f58a8]',
  'disk-catalog': 'from-[#143041] via-[#1d4b5d] to-[#2a687a]',
  'mega-pdf-compressor': 'from-[#1d2340] via-[#2d2f63] to-[#3e438b]',
  'gdpr-scanner': 'from-[#23283a] via-[#31384f] to-[#48516d]',
  'planfix-reminder': 'from-[#182d2c] via-[#22504a] to-[#2e776d]',
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
            <Image
              src={project.previewImage}
              alt={`${project.title} preview`}
              width={1280}
              height={800}
              className='block w-full h-auto'
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

function mapProjects(projects: CaseStudy[]): Project[] {
  return projects.map((project, index) => ({
    id: index + 1,
    ...project,
    previewClass: projectPreviewClasses[project.slug] ?? 'from-[#18304a] via-[#244867] to-[#2f58a8]',
  }))
}

export default function PortfolioShowcase({
  contactHref,
  content,
}: {
  contactHref: string
  content: CasesPageContent
}) {
  const projects = mapProjects(content.projects)

  const filters = filterOrder.map((id) => ({ id, label: content.filters[id] }))

  const projectsByGroup = filters.map((filter) => ({
    ...filter,
    projects: projects.filter((project) => project.group === filter.id),
  }))

  return (
    <section className='bg-AliceBlue py-16 dark:bg-darkmode'>
      <div className='container'>
        <div className='itos-card mb-8 grid gap-4 p-6 lg:grid-cols-[1fr_auto] lg:items-center'>
          <div className='max-w-720'>
            <span className='mb-3 inline-flex rounded-full bg-LightApricot/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-secondary dark:text-LightApricot'>
              {content.eyebrow}
            </span>
            <h2 className='mb-3 text-2xl font-semibold text-secondary dark:text-white md:text-3xl'>
              {content.title}
            </h2>
            <p className='text-sm leading-7 text-SlateBlue dark:text-gray md:text-base'>
              {content.description}
            </p>
          </div>

          <div className='grid gap-2 sm:grid-cols-2 lg:min-w-[320px]'>
            {filters.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className='rounded-2xl border border-BorderLine bg-AliceBlue px-4 py-3 text-sm font-medium text-secondary transition-colors hover:border-[#F07B2A]/60 hover:text-[#C85E10] dark:border-dark_border dark:bg-secondary dark:text-white dark:hover:border-[#F07B2A]/60 dark:hover:text-[#FFB16D]'
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
                  <article key={project.id} className='itos-card itos-card-interactive group grid gap-5 p-5 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start'>
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
                          <h3 className='text-xl font-semibold text-secondary transition-colors duration-300 group-hover:text-[#C85E10] dark:text-white dark:group-hover:text-[#FFB16D] md:text-2xl'>{project.title}</h3>
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
                            {content.actions.openProject}
                          </a>
                        ) : (
                          <span className='inline-flex items-center justify-center rounded-full bg-BorderLine px-4 py-2.5 text-sm font-medium text-secondary dark:bg-secondary dark:text-white'>
                            {content.actions.linkComingSoon}
                          </span>
                        )}

                        <Link href={contactHref} className='inline-flex items-center justify-center rounded-full border border-BorderLine px-4 py-2.5 text-sm font-medium text-secondary transition-colors hover:border-[#F07B2A]/60 hover:text-[#C85E10] dark:border-dark_border dark:text-white dark:hover:border-[#F07B2A]/60 dark:hover:text-[#FFB16D]'>
                          {content.actions.needSomethingSimilar}
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