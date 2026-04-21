import Link from 'next/link'

export type LegalSection = {
  title: string
  paragraphs?: string[]
  items?: string[]
}

type LegalPageContentProps = {
  updatedLabel: string
  updatedDate: string
  contactLabel: string
  intro: string[]
  sections: LegalSection[]
  contactEmail: string
}

export default function LegalPageContent({
  updatedLabel,
  updatedDate,
  contactLabel,
  intro,
  sections,
  contactEmail,
}: LegalPageContentProps) {
  return (
    <section className='bg-AliceBlue py-16 dark:bg-darkmode'>
      <div className='container max-w-4xl'>
        <div className='rounded-[1.5rem] border border-BorderLine bg-white p-6 shadow-light-shadwo dark:border-dark_border dark:bg-darklight md:p-8'>
          <div className='mb-8 rounded-2xl bg-AliceBlue p-5 dark:bg-secondary'>
            <p className='text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-LightApricot'>
              {updatedLabel}
            </p>
            <p className='mt-2 text-base font-medium text-secondary dark:text-white'>{updatedDate}</p>
            <p className='mt-3 text-sm leading-7 text-SlateBlue dark:text-gray'>
              <span className='font-medium text-secondary dark:text-white'>{contactLabel}: </span>
              <Link href={`mailto:${contactEmail}`} className='text-primary hover:underline dark:text-LightApricot'>
                {contactEmail}
              </Link>
            </p>
          </div>

          <div className='space-y-4'>
            {intro.map((paragraph) => (
              <p key={paragraph} className='text-sm leading-7 text-SlateBlue dark:text-gray md:text-base'>
                {paragraph}
              </p>
            ))}
          </div>

          <div className='mt-10 space-y-8'>
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className='text-2xl font-semibold text-secondary dark:text-white'>{section.title}</h2>

                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className='mt-3 text-sm leading-7 text-SlateBlue dark:text-gray md:text-base'>
                    {paragraph}
                  </p>
                ))}

                {section.items?.length ? (
                  <ul className='mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-SlateBlue dark:text-gray md:text-base'>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}