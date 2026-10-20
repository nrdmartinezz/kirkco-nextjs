import Link from 'next/link';
import { Heading } from '@/components/ui/Heading';
import type { PublicPageSections } from '@/content/pillar/sections';
import { cn } from '@/lib/cn';

const cardClass = 'rounded-2xl border border-[#e4f0ff] bg-white p-6 shadow-[0_1px_3px_rgba(21,101,192,0.1)]';

export function EditorialSections({ page, className }: { page: PublicPageSections; className?: string }) {
  return (
    <div className={cn('mt-12 flex flex-col gap-12', className)}>
      {page.sections.map((section) => (
        <section key={section.sectionKey} id={section.sectionKey} className="scroll-mt-28">
          <Heading level={2} size="lg">
            {section.heading}
          </Heading>
          <ul className="mt-6 flex flex-col gap-4">
            {section.families.map((family) => (
              <li key={family.contentKey} className={cardClass}>
                <Heading level={3} size="md">
                  {family.title}
                </Heading>
                {family.detailHref && (
                  <Link href={family.detailHref} className="text-brand-700 mt-3 inline-flex font-semibold no-underline hover:text-brand-500">
                    View existing page
                  </Link>
                )}
                {family.models.length > 0 && (
                  <ul className="mt-4 flex flex-col gap-2">
                    {family.models.map((model) => (
                      <li key={model.name} className="text-ink-muted flex items-start gap-2 leading-relaxed">
                        <span aria-hidden className="bg-brand-500 mt-2 size-2 shrink-0 rounded-full" />
                        <span>{model.name}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
