import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import type { ResourceBlock, ResourceListItem, ResourcePageContent, ResourcePart } from '@/content/resources/pages';
import { resourcePages } from '@/content/resources/pages';
import { site } from '@/config/site';

const cardClass = 'rounded-2xl border border-[#e4f0ff] bg-white p-6 shadow-[0_1px_3px_rgba(21,101,192,0.1)]';

const relatedSystems = [
  {
    title: 'Composite Application',
    description: 'Closed/Open Mold',
    href: '/equipment-options/composites',
    links: [
      { label: 'Pultrusion', href: '/equipment-options/composites/pultrusion' },
      { label: 'Filament & Pull Winding', href: '/equipment-options/composites/pull-winding' },
      { label: 'Closed Mold', href: '/equipment-options/composites/closed-mold-technology' },
      { label: 'Open Mold', href: '/equipment-options/composites/open-mold-technology' },
    ],
  },
  {
    title: 'Lubrication Metering',
    description: 'Dispense & Regulate',
    href: '/equipment-options/lubrication',
    links: [
      { label: 'Feeding / Supply', href: '/equipment-options/lubrication/feeding-and-supply' },
      { label: 'Metering', href: '/equipment-options/lubrication/metering' },
      { label: 'Pressure & Flow Control', href: '/equipment-options/lubrication/pressure-control' },
    ],
  },
  {
    title: 'Adhesives & Sealants',
    description: '1K & 2K Systems',
    href: '/equipment-options/adhesives-sealants',
    links: [
      { label: 'Putty & Tooling Pastes', href: '/equipment-options/adhesives-sealants/putty-paste' },
      { label: 'Single-Component Systems', href: '/equipment-options/adhesives-sealants/single-component' },
      { label: 'Two-Component (2K) Mixing', href: '/equipment-options/adhesives-sealants/two-component' },
      { label: 'SMC / IMC Molding', href: '/equipment-options/adhesives-sealants/smc-imc-molding' },
    ],
  },
  {
    title: 'Process & Control',
    description: 'Compute & Automate',
    href: '/equipment-options/process-control',
    links: [
      { label: 'Process Control Computer', href: '/equipment-options/process-control/process-control-computer' },
      { label: 'Monitoring & Analytics', href: '/equipment-options/process-control/monitoring-analytics' },
      { label: 'Integration / Automation', href: '/equipment-options/process-control/integration-automation' },
    ],
  },
];

function Parts({ parts }: { parts: ResourcePart[] }) {
  return (
    <>
      {parts.map((piece, index) =>
        piece.href ? (
          <a key={index} href={piece.href} className="text-brand-700 font-semibold underline-offset-2 hover:underline">
            {piece.text}
          </a>
        ) : (
          <span key={index}>{piece.text}</span>
        ),
      )}
    </>
  );
}

function ListItems({ items, nested = false }: { items: ResourceListItem[]; nested?: boolean }) {
  return (
    <ul className={nested ? 'mt-2 flex flex-col gap-1.5 pl-5' : 'flex flex-col gap-2'}>
      {items.map((entry, index) => (
        <li key={index} className="text-ink-muted leading-7">
          <span className="flex items-start gap-2">
            <span aria-hidden className="bg-brand-500 mt-2.5 size-1.5 shrink-0 rounded-full" />
            <span>
              <Parts parts={entry.parts} />
            </span>
          </span>
          {entry.children && entry.children.length > 0 && <ListItems items={entry.children} nested />}
        </li>
      ))}
    </ul>
  );
}

function Blocks({ blocks }: { blocks: ResourceBlock[] }) {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {blocks.map((block, index) => {
        if (block.type === 'list') return <ListItems key={index} items={block.items} />;
        if (block.type === 'heading') {
          return (
            <Heading key={index} level={3} size="md" className="mt-2">
              {block.text}
            </Heading>
          );
        }
        return (
          <p key={index} className="text-ink-muted leading-7">
            <Parts parts={block.parts} />
          </p>
        );
      })}
    </div>
  );
}

export function ResourcePage({ page }: { page: ResourcePageContent }) {
  return (
    <>
      <section className="relative isolate min-h-[400px] overflow-hidden bg-brand-500">
        <Image src={page.heroImage} alt={page.heroAlt} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-brand-700/45" />
        <Container className="relative flex min-h-[400px] justify-center py-8">
          <div className="w-full max-w-3xl rounded-2xl bg-[rgba(19,89,187,0.28)] p-6 text-white backdrop-blur-md md:p-9">
            <nav aria-label="Breadcrumb" className="text-sm">
              <ol className="flex flex-wrap items-center gap-x-1 gap-y-1">
                <li>
                  <Link href="/" className="font-semibold text-white no-underline hover:underline">
                    Home
                  </Link>
                </li>
                <li className="flex items-center gap-1">
                  <span aria-hidden>-</span>
                  <span>Resources</span>
                </li>
                <li className="flex items-center gap-1">
                  <span aria-hidden>-</span>
                  <span className="font-semibold" aria-current="page">
                    {page.title}
                  </span>
                </li>
              </ol>
            </nav>
            <Heading level={1} size="xl" className="mt-4 text-white">
              {page.title}
            </Heading>
            <p className="mt-4 leading-7 text-white/95">{page.description}</p>
            <Button href="/contact" className="mt-6 rounded-full">
              Talk to an Engineer
            </Button>
          </div>
        </Container>
      </section>

      <Section spacing="none" className="pt-8 pb-section">
        <Container gap="lg">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
            <div className="min-w-0 flex-1">
              {page.sections.map((section, index) => (
                <article
                  key={`${section.heading ?? 'section'}-${index}`}
                  id={section.id}
                  className={`${cardClass} scroll-mt-28 ${index > 0 ? 'mt-8' : ''}`}
                >
                  <div className={section.image ? 'flex flex-col gap-6 md:flex-row md:items-start' : undefined}>
                    {section.image && (
                      <div
                        className={`relative aspect-[4/5] w-full max-w-[280px] shrink-0 overflow-hidden rounded-[10px] ${index % 2 === 0 ? 'md:order-2' : ''}`}
                      >
                        <Image
                          src={section.image}
                          alt={section.imageAlt ?? ''}
                          fill
                          className="object-cover"
                          sizes="280px"
                        />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      {section.heading && (
                        <Heading level={2} size="lg">
                          {section.heading}
                        </Heading>
                      )}
                      {section.blocks.length > 0 && <Blocks blocks={section.blocks} />}
                      {section.cta && (
                        <Button href={section.cta.href} className="mt-6 rounded-full">
                          {section.cta.label}
                        </Button>
                      )}
                      {section.columns && section.columns.length > 0 && (
                        <div className="mt-8 grid gap-6 border-t border-[#e4f0ff] pt-8 md:grid-cols-2">
                          {section.columns.map((column, columnIndex) => (
                            <div key={columnIndex}>
                              {column.heading && (
                                <Heading level={3} size="md">
                                  {column.heading}
                                </Heading>
                              )}
                              <Blocks blocks={column.blocks} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}

              <div className="mt-12">
                <Heading level={2} size="lg">
                  Let&apos;s Get Your Next Project Off The Ground
                </Heading>
                <p className="text-ink-muted mt-3 leading-7">
                  Have a process challenge that cannot be solved with off-the-shelf equipment?
                </p>
                <Button href="/contact" className="mt-6 rounded-full">
                  Talk to an Engineer
                </Button>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {relatedSystems.map((group) => (
                    <li key={group.href} className={cardClass}>
                      <Heading level={3} size="md">
                        <Link href={group.href} className="text-ink-base no-underline hover:text-brand-700">
                          {group.title}
                        </Link>
                      </Heading>
                      <p className="text-ink-muted mt-2">{group.description}</p>
                      <ul className="mt-4 flex flex-col gap-2">
                        {group.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="text-brand-700 font-semibold no-underline hover:text-brand-500"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 rounded-[10px] bg-[#0d2244] p-6 md:p-8">
                <p className="text-brand-500 text-sm font-semibold tracking-wide uppercase">Engineering Engagement</p>
                <Heading level={2} size="lg" className="mt-2 text-white">
                  Talk to an Engineer
                </Heading>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href="/quote" className="rounded-full">
                    Request a quote
                  </Button>
                  <Button href={`tel:${site.business.phoneHref}`} variant="inverse" className="rounded-full">
                    Call us Today!
                  </Button>
                </div>
              </div>
            </div>

            <aside className="border-neutral-200 w-full shrink-0 rounded-lg border p-5 lg:sticky lg:top-28 lg:w-72">
              <Heading level={2} size="sm">
                Resources
              </Heading>
              <ul className="mt-3 flex flex-col gap-1">
                {resourcePages.map((entry) => {
                  const active = entry.href === page.href;
                  return (
                    <li key={entry.href}>
                      <Link
                        href={entry.href}
                        aria-current={active ? 'page' : undefined}
                        className="text-brand-700 flex items-center gap-1.5 font-semibold no-underline hover:text-brand-500 aria-[current=page]:text-brand-500"
                      >
                        {active && <ChevronRight aria-hidden className="size-4 shrink-0" />}
                        {entry.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <Heading level={2} size="sm" className="mt-8">
                Let&apos;s Talk Systems
              </Heading>
              <ul className="mt-3 flex flex-col gap-1">
                <li>
                  <a
                    href={`tel:${site.business.phoneHref}`}
                    className="text-brand-700 font-semibold no-underline hover:text-brand-500"
                  >
                    {site.business.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${site.business.email}`}
                    className="text-brand-700 font-semibold no-underline hover:text-brand-500"
                  >
                    {site.business.email}
                  </a>
                </li>
                <li>
                  <Link href="/quote" className="text-brand-700 font-semibold no-underline hover:text-brand-500">
                    Get a Quote
                  </Link>
                </li>
              </ul>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
