import Link from 'next/link'

type Project = {
  id: number
  title: string
  label: string
  href?: string
  description: string
  category: string
  tags: string[]
  previewClass: string
}

const projects: Project[] = [
  { id: 1, title: 'Interpol Check', label: 'interpol-check.me', href: 'https://interpol-check.me', description: 'Landing page for Status Law focused on lead generation: INTERPOL database checks, EU/Asia regional pricing, and a clear client inquiry flow.', category: 'Website', tags: ['Legal services', 'Landing page', 'Lead generation'], previewClass: 'from-[#0f2234] via-[#162b40] to-[#1d3248]' },
  { id: 2, title: 'Status Law', label: 'status.law', href: 'https://status.law', description: 'Corporate website for a law firm with service presentation, trust-oriented structure, and straightforward contact paths for new clients.', category: 'Website', tags: ['Corporate site', 'Law firm', 'Trust-building'], previewClass: 'from-[#13283d] via-[#1a3652] to-[#244867]' },
  { id: 3, title: 'Portfolio', label: 'ptolga.github.io', href: 'https://ptolga.github.io', description: 'Personal bilingual portfolio with project filtering and PDF resume generation — designed to present services, skills, and completed work clearly.', category: 'Website', tags: ['Portfolio', 'Bilingual', 'PDF resume'], previewClass: 'from-[#11263d] via-[#163a5c] to-[#1d4f7d]' },
  { id: 4, title: 'PraDos', label: 'prados.org.ua', href: 'https://prados.org.ua', description: 'Website for a Ukrainian non-profit organization that provides legal help to Ukrainians living abroad.', category: 'Website', tags: ['Non-profit', 'Legal help', 'Information site'], previewClass: 'from-[#1c2d58] via-[#22427f] to-[#2f58a8]' },
  { id: 5, title: 'Disk Catalog', label: 'disk-catalog-488612.web.app', href: 'https://disk-catalog-488612.web.app', description: 'PWA catalog for DVD and audio collections with barcode scanning and mobile search across the library.', category: 'Web app', tags: ['PWA', 'Barcode scanning', 'Mobile-first'], previewClass: 'from-[#143041] via-[#1d4b5d] to-[#2a687a]' },
  { id: 6, title: 'MEGA PDF Compressor', label: 'mega-pdf-compressor-en.up.railway.app', href: 'https://mega-pdf-compressor-en.up.railway.app', description: 'Web app for batch PDF compression from local folders or MEGA cloud storage using the iLovePDF API.', category: 'Web app', tags: ['PDF tools', 'Cloud integration', 'Batch processing'], previewClass: 'from-[#1d2340] via-[#2d2f63] to-[#3e438b]' },
  { id: 7, title: 'GDPR Scanner', label: 'WordPress plugin', description: 'WordPress plugin concept for scanning websites for GDPR-related elements and helping with a quick privacy compliance review.', category: 'WP plugin', tags: ['WordPress', 'Privacy', 'Compliance'], previewClass: 'from-[#23283a] via-[#31384f] to-[#48516d]' },
  { id: 8, title: 'PlanFix Reminder', label: 'Desktop app', description: 'Desktop automation tool that sends task reminders from PlanFix to WhatsApp, reducing manual follow-up work.', category: 'CRM / Automation', tags: ['Automation', 'PlanFix', 'WhatsApp'], previewClass: 'from-[#182d2c] via-[#22504a] to-[#2e776d]' },
]

const BrowserPreview = ({ project }: { project: Project }) => (
  <div className={`relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-gradient-to-br ${project.previewClass} p-4 shadow-portfolio-box`}>
    <div className='mb-4 flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] text-white/70'>
      <div className='flex items-center gap-2'>
        <span className='h-2.5 w-2.5 rounded-full bg-[#ff6b6b]' />
        <span className='h-2.5 w-2.5 rounded-full bg-[#ffd166]' />
        <span className='h-2.5 w-2.5 rounded-full bg-[#06d6a0]' />
      </div>
      <span className='truncate'>{project.label}</span>
    </div>

    <div className='rounded-[1rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm'>
      <div className='mb-4 flex items-center justify-between gap-3'>
        <span className='rounded-full bg-LightApricot/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-darkmode'>
          {project.category}
        </span>
        <span className='text-[11px] uppercase tracking-[0.24em] text-white/55'>Preview</span>
      </div>

      <div className='mb-6 space-y-3'>
        <div className='h-3 w-24 rounded-full bg-white/15' />
        <div className='h-8 w-3/4 rounded-full bg-white/90' />
        <div className='h-3 w-full rounded-full bg-white/12' />
        <div className='h-3 w-5/6 rounded-full bg-white/12' />
      </div>

      <div className='grid grid-cols-2 gap-3'>
        <div className='rounded-2xl border border-white/10 bg-white/5 p-4'>
          <div className='mb-3 h-2 w-16 rounded-full bg-white/15' />
          <div className='h-16 rounded-2xl bg-white/10' />
        </div>
        <div className='rounded-2xl border border-white/10 bg-darkmode/20 p-4'>
          <div className='mb-3 h-2 w-20 rounded-full bg-LightApricot/70' />
          <div className='space-y-2'>
            <div className='h-2 rounded-full bg-white/15' />
            <div className='h-2 rounded-full bg-white/15' />
            <div className='h-2 w-3/4 rounded-full bg-[#3bd18c]/60' />
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default function PortfolioShowcase({ contactHref }: { contactHref: string }) {
  return (
    <section className='bg-AliceBlue py-20 dark:bg-darkmode'>
      <div className='container'>
        <div className='mb-10 grid gap-6 rounded-[1.75rem] border border-BorderLine bg-white p-8 shadow-light-shadwo dark:border-dark_border dark:bg-darklight lg:grid-cols-[1.2fr_0.8fr]'>
          <div>
            <span className='mb-4 inline-flex rounded-full bg-LightApricot/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-secondary dark:text-LightApricot'>
              Selected work
            </span>
            <h2 className='mb-4 text-3xl font-semibold text-secondary dark:text-white md:text-4xl'>
              Websites, web apps, and automation projects built for real business tasks
            </h2>
            <p className='max-w-720 text-base leading-8 text-SlateBlue dark:text-gray'>
              This page is structured as a client-facing portfolio: clear project types, quick descriptions, preview blocks, and direct links to live work. Text and screenshots are placeholders for now, so the focus is on the layout and presentation style.
            </p>
          </div>

          <div className='grid gap-3 sm:grid-cols-2'>
            {['Websites', 'Web apps', 'WP plugins', 'Automation'].map((item) => (
              <div key={item} className='rounded-2xl border border-BorderLine bg-AliceBlue px-4 py-5 text-sm font-medium text-secondary dark:border-dark_border dark:bg-secondary dark:text-white'>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className='grid gap-8 xl:grid-cols-2'>
          {projects.map((project) => (
            <article key={project.id} className='overflow-hidden rounded-[1.75rem] border border-BorderLine bg-white shadow-light-shadwo transition-transform duration-300 hover:-translate-y-1 dark:border-dark_border dark:bg-darklight'>
              <div className='p-5 sm:p-6'>
                <BrowserPreview project={project} />
              </div>

              <div className='border-t border-BorderLine px-5 py-6 dark:border-dark_border sm:px-6'>
                <div className='mb-4 flex items-start justify-between gap-4'>
                  <div>
                    <div className='mb-2 flex items-center gap-3'>
                      <span className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-LightApricot text-sm font-semibold text-darkmode'>
                        {project.id}
                      </span>
                      <span className='rounded-full border border-BorderLine px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-SlateBlue dark:border-dark_border dark:text-gray'>
                        {project.category}
                      </span>
                    </div>
                    <h3 className='text-2xl font-semibold text-secondary dark:text-white'>{project.title}</h3>
                    <p className='mt-1 text-sm text-primary dark:text-LightApricot'>{project.label}</p>
                  </div>
                </div>

                <p className='mb-5 text-base leading-8 text-SlateBlue dark:text-gray'>{project.description}</p>

                <div className='mb-6 flex flex-wrap gap-2'>
                  {project.tags.map((tag) => (
                    <span key={tag} className='rounded-full bg-AliceBlue px-3 py-2 text-xs font-medium text-secondary dark:bg-secondary dark:text-white'>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className='flex flex-wrap gap-3'>
                  {project.href ? (
                    <a href={project.href} target='_blank' rel='noopener noreferrer' className='inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-darkprimary'>
                      Open project
                    </a>
                  ) : (
                    <span className='inline-flex items-center justify-center rounded-full bg-BorderLine px-5 py-3 text-sm font-medium text-secondary dark:bg-secondary dark:text-white'>
                      Link coming soon
                    </span>
                  )}

                  <Link href={contactHref} className='inline-flex items-center justify-center rounded-full border border-BorderLine px-5 py-3 text-sm font-medium text-secondary transition-colors hover:border-primary hover:text-primary dark:border-dark_border dark:text-white dark:hover:border-LightApricot dark:hover:text-LightApricot'>
                    Need something similar?
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}