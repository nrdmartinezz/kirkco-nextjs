import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import type { EquipmentPageContent } from '@/content/equipment/adhesives-sealants';
import { site } from '@/config/site';
import type { ApplicationStudy } from '@/lib/applications';
import type { ProductCategory } from '@/lib/products';
import { ArrowRight, Boxes, ChevronRight, Hexagon, LayoutGrid, Share2, Waves } from 'lucide-react';

const helpLinks = [
  { label: 'In-Field Installation', href: '/in-field-installation' },
  { label: 'Training & Education', href: '/training-education' },
  { label: 'Repair & Rebuild', href: '/rebuild-repair' },
  { label: 'Resin Dispensing & Molding', href: '/resin-dispensing-molding' },
];

const systemIcons: Record<string, typeof Hexagon> = {
  'single-component': Hexagon,
  'two-component': LayoutGrid,
  'tooling-paste': Share2,
  'smc-imc-molding': Boxes,
  'putty-paste': Waves,
};

export function EquipmentPage({
  page,
  categories,
  studies,
}: {
  page: EquipmentPageContent;
  categories: ProductCategory[];
  studies: ApplicationStudy[];
}) {
  const mainCategories = categories.filter((category) => category.name === category.group);

  return (
    <>
      <section className="relative isolate min-h-[400px] overflow-hidden bg-brand-500">
        <Image src={page.heroImage} alt={page.heroAlt} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-brand-700/35" />
        <Container className="relative flex min-h-[400px] justify-center py-8">
          <div className="w-full max-w-3xl rounded-2xl bg-[rgba(19,89,187,0.28)] p-6 backdrop-blur-md md:p-9">
            <nav aria-label="Breadcrumb" className="text-sm text-white">
              <ol className="flex flex-wrap items-center gap-x-1 gap-y-1">
                {page.breadcrumb.map((crumb, index) => {
                  const current = index === page.breadcrumb.length - 1;
                  return (
                    <li key={crumb.label} className="flex items-center gap-1">
                      {index > 0 && <span aria-hidden>-</span>}
                      {crumb.href && !current ? (
                        <Link href={crumb.href} className="font-semibold text-white no-underline hover:underline">
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className="font-semibold" aria-current="page">
                          {crumb.label}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
            <Heading level={1} size="xl" className="mt-4 text-white">
              {page.title}
            </Heading>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/request-a-quote" className="rounded-full">
                Talk to an Engineer
              </Button>
              <Link
                href="#system-options"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white px-6 font-medium text-white no-underline hover:bg-white/10"
              >
                Explore Systems
              </Link>
            </div>
          </div>
        </Container>
      </section>
      <Section spacing="none" className="pt-8 pb-section">
        <Container gap="lg">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-4 rounded-2xl border border-[#e4f0ff] bg-white p-6 shadow-[0_1px_3px_rgba(21,101,192,0.1)] md:flex-row md:items-center">
                <Image
                  src={page.overviewImage}
                  alt={page.overviewImageAlt}
                  width={300}
                  height={375}
                  className="h-auto w-full max-w-[300px] shrink-0 rounded-[10px] object-cover"
                />
                <div className="flex flex-col gap-4 md:p-2.5">
                  <p className="text-brand-700 flex items-center gap-2 text-[11px] font-semibold tracking-wide uppercase">
                    <span aria-hidden className="bg-brand-700 h-px w-5" />
                    Overview
                  </p>
                  <Heading level={2} size="md">
                    {page.overviewHeading}
                  </Heading>
                  {page.overview.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="text-ink-muted leading-7">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

            <div id="system-options" className="mt-12 scroll-mt-28">
              <p className="text-brand-500 flex items-center gap-3 text-sm font-semibold tracking-wide uppercase">
                <span aria-hidden className="bg-brand-500 h-px w-6" />
                System Options
              </p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {page.systems.map((system) => {
                  const Icon = systemIcons[system.categorySlug] ?? Hexagon;
                  return (
                    <li key={system.href}>
                      <Link
                        href={system.href}
                        className="group border-neutral-200 flex h-full flex-col rounded-2xl border bg-white p-6 no-underline shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand-500 hover:shadow-md"
                      >
                        <span className="bg-brand-50 text-brand-500 mb-5 inline-flex size-12 items-center justify-center rounded-xl">
                          <Icon aria-hidden className="size-6" />
                        </span>
                        <span className="text-brand-700 text-xl font-bold">{system.title}</span>
                        <span className="text-ink-muted mt-2 leading-relaxed">{system.description}</span>
                        <ArrowRight
                          className="text-brand-500 mt-auto size-5 translate-y-1 opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100"
                          aria-hidden
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-12 rounded-[10px] bg-[#0d2244] p-6 md:p-8">
              <p className="text-brand-500 text-sm font-semibold tracking-wide uppercase">Engineering Engagement</p>
              <Heading level={2} size="lg" className="mt-2 text-white">
                {page.engagementHeading}
              </Heading>
              <p className="mt-4 max-w-3xl leading-relaxed text-[#96a9c1]">{page.engagementBody}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/quote" className="rounded-full">
                  Request a quote
                </Button>
                <Button href={`tel:${site.business.phoneHref}`} variant="inverse" className="rounded-full">
                  Call us Today!
                </Button>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-brand-700 flex items-center gap-2 text-[11px] font-semibold tracking-wide uppercase">
                <span aria-hidden className="bg-brand-700 h-px w-4" />
                {page.platformsHeading}
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {page.platforms.map((platform) => (
                  <div
                    key={platform.heading}
                    className="rounded-2xl border border-[#e4f0ff] bg-white p-6 shadow-[0_1px_3px_rgba(21,101,192,0.1)]"
                  >
                    <Heading level={2} size="md">
                      {platform.heading}
                    </Heading>
                    <ul className="mt-4 flex flex-col gap-2">
                      {platform.items.map((item) => (
                        <li key={item} className="text-brand-700 flex items-start gap-2 hover:text-brand-500">
                          <span aria-hidden className="bg-current mt-1.5 size-2 shrink-0 rounded-full" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {page.architectures.map((architecture) => (
              <div key={architecture.heading} className="mt-12">
                <p className="text-brand-700 flex items-center gap-2 text-[11px] font-semibold tracking-wide uppercase">
                  <span aria-hidden className="bg-brand-700 h-px w-4" />
                  {architecture.heading}
                </p>
                <ul
                  className={`mt-6 grid gap-4 ${architecture.groups.length > 2 ? 'md:grid-cols-2 xl:grid-cols-3' : 'md:grid-cols-2'}`}
                >
                  {architecture.groups.map((group) => (
                    <li
                      key={group.title}
                      className="rounded-2xl border border-[#e4f0ff] bg-white p-6 shadow-[0_1px_3px_rgba(21,101,192,0.1)]"
                    >
                      <Heading level={3} size="md">
                        {group.title}
                      </Heading>
                      <ul className="mt-4 flex flex-col gap-3">
                        {group.links.map((link) => (
                          <li key={link.label}>
                            <Link
                              href={link.href ?? '#'}
                              className="text-brand-700 flex items-center gap-2 rounded-md px-2 py-1.5 font-semibold no-underline transition duration-200 hover:-translate-y-[5px] hover:bg-brand-500 hover:text-white"
                            >
                              <ArrowRight aria-hidden className="size-4 shrink-0" />
                              <span>{link.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="mt-12 flex flex-col gap-6">
              {studies.map((study) => {
                const midpoint = Math.ceil(study.sections.length / 2);
                const columns = [study.sections.slice(0, midpoint), study.sections.slice(midpoint)];
                return (
                  <article
                    key={study.id}
                    className="rounded-2xl border border-[#e4f0ff] bg-white p-6 shadow-[0_1px_3px_rgba(21,101,192,0.1)]"
                  >
                    <p className="text-brand-700 flex items-center gap-2 text-[11px] font-semibold tracking-wide uppercase">
                      <span aria-hidden className="bg-brand-700 h-px w-4" />
                      {study.nda ? 'NDA Protected Application' : 'Application Architecture'}
                    </p>
                    <Heading level={2} size="lg" className="mt-3">
                      {study.title}
                    </Heading>
                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                      {columns.map((column, columnIndex) => (
                        <div key={columnIndex} className="flex flex-col gap-5">
                          {column.map((section) => (
                            <div key={section.heading}>
                              <Heading level={3} size="sm">
                                {section.heading}
                              </Heading>
                              {section.paragraphs.map((paragraph) => (
                                <p key={paragraph.slice(0, 48)} className="text-ink-muted mt-2 leading-relaxed">
                                  {paragraph}
                                </p>
                              ))}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="border-brand-500 mt-12 border-t pt-8">
              <Heading level={2} size="lg">
                {page.closing}
              </Heading>
              <ul className="mt-4 flex flex-col gap-1">
                <li>
                  <a href={`tel:${site.business.phoneHref}`} className="text-brand-700 font-semibold no-underline hover:text-brand-500">
                    {site.business.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.business.email}`} className="text-brand-700 font-semibold no-underline hover:text-brand-500">
                    {site.business.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <aside className="border-neutral-200 w-full shrink-0 rounded-lg border p-5 lg:sticky lg:top-28 lg:w-72">
            <Heading level={2} size="sm">
              Main Categories
            </Heading>
            <ul className="mt-3 flex flex-col gap-1">
              {mainCategories.map((category) => {
                const active = page.href === category.href || page.href.startsWith(`${category.href}/`);
                return (
                  <li key={category.slug}>
                    <Link
                      href={category.href}
                      aria-current={active ? 'page' : undefined}
                      className="text-brand-700 flex items-center gap-1.5 font-semibold no-underline hover:text-brand-500 aria-[current=page]:text-brand-500"
                    >
                      {active && <ChevronRight aria-hidden className="size-4 shrink-0" />}
                      {category.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Heading level={2} size="sm" className="mt-8">
              We can also help with
            </Heading>
            <ul className="mt-3 flex flex-col gap-1">
              {helpLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-brand-700 font-semibold no-underline hover:text-brand-500">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Heading level={2} size="sm" className="mt-8">
              Contact Us!
            </Heading>
            <ul className="mt-3 flex flex-col gap-1">
              <li>
                <a href={`tel:${site.business.phoneHref}`} className="text-brand-700 font-semibold no-underline hover:text-brand-500">
                  Sales: {site.business.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.business.email}`} className="text-brand-700 font-semibold no-underline hover:text-brand-500">
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
