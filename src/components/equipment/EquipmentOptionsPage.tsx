import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import { adhesivesSealants } from '@/content/equipment/adhesives-sealants';
import {
  equipmentFamilies,
  equipmentOptionsDescription,
  equipmentQuestions,
  materialPlatforms,
  processSteps,
  type EquipmentFamily,
} from '@/content/equipment/equipment-options';
import { site } from '@/config/site';
import type { ProductCategory } from '@/lib/products';
import { ArrowRight, Cylinder, Droplets, Gauge, Hexagon, Layers, Paintbrush, Warehouse } from 'lucide-react';

const helpLinks = [
  { label: 'In-Field Installation', href: '/in-field-installation' },
  { label: 'Training & Education', href: '/training-education' },
  { label: 'Repair & Rebuild', href: '/rebuild-repair' },
  { label: 'Resin Dispensing & Molding', href: '/resin-dispensing-molding' },
];

const familyIcons = [Hexagon, Layers, Droplets, Paintbrush, Gauge, Cylinder, Warehouse];

const cardClass = 'rounded-2xl border border-[#e4f0ff] bg-white p-6 shadow-[0_1px_3px_rgba(21,101,192,0.1)]';

function FamilyCard({ family, index }: { family: EquipmentFamily; index: number }) {
  const Icon = familyIcons[index] ?? Hexagon;
  return (
    <li>
      <Link
        href={family.href}
        className="group border-neutral-200 flex h-full flex-col rounded-2xl border bg-white p-6 no-underline shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand-500 hover:shadow-md"
      >
        <span className="bg-brand-50 text-brand-500 mb-5 inline-flex size-12 items-center justify-center rounded-xl">
          <Icon aria-hidden className="size-6" />
        </span>
        <span className="text-brand-700 text-xl font-bold">{family.title}</span>
        {family.lines.map((line) => (
          <span key={line} className="text-ink-muted mt-2 leading-relaxed">
            {line}
          </span>
        ))}
        <ArrowRight
          className="text-brand-500 mt-auto size-5 translate-y-1 opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100"
          aria-hidden
        />
      </Link>
    </li>
  );
}

function EquipmentOptionsJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
          { '@type': 'ListItem', position: 2, name: 'Equipment Options', item: `${site.url}/equipment-options` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: equipmentQuestions.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

export function EquipmentOptionsPage({ categories }: { categories: ProductCategory[] }) {
  const mainCategories = categories.filter((category) => category.name === category.group);

  return (
    <>
      <EquipmentOptionsJsonLd />
      <section className="relative isolate min-h-[400px] overflow-hidden bg-brand-500">
        <Image
          src={adhesivesSealants.heroImage}
          alt={adhesivesSealants.heroAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-700/35" />
        <Container className="relative flex min-h-[400px] justify-center py-8">
          <div className="w-full max-w-3xl rounded-2xl bg-[rgba(19,89,187,0.28)] p-6 backdrop-blur-md md:p-9">
            <nav aria-label="Breadcrumb" className="text-sm text-white">
              <ol className="flex flex-wrap items-center gap-x-1 gap-y-1">
                <li>
                  <Link href="/" className="font-semibold text-white no-underline hover:underline">
                    Home
                  </Link>
                </li>
                <li className="flex items-center gap-1">
                  <span aria-hidden>-</span>
                  <span className="font-semibold" aria-current="page">
                    Equipment Options
                  </span>
                </li>
              </ol>
            </nav>
            <Heading level={1} size="xl" className="mt-4 text-white">
              Equipment Options
            </Heading>
            <div className="mt-6">
              <Button href="/quote" className="rounded-full">
                Talk to an Engineer
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section spacing="none" className="pt-8 pb-section">
        <Container gap="lg">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
            <div className="min-w-0 flex-1">
              <div className={cardClass}>
                <p className="text-brand-700 flex items-center gap-2 text-[11px] font-semibold tracking-wide uppercase">
                  <span aria-hidden className="bg-brand-700 h-px w-5" />
                  Overview
                </p>
                <Heading level={2} size="md" className="mt-4">
                  Define the process. Select the technology. Integrate the complete production architecture.
                </Heading>
                <p className="text-ink-muted mt-4 leading-7">{equipmentOptionsDescription}</p>
              </div>

              <div className="mt-12">
                <p className="text-brand-500 flex items-center gap-3 text-sm font-semibold tracking-wide uppercase">
                  <span aria-hidden className="bg-brand-500 h-px w-6" />
                  Explore Kirkco System Families
                </p>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {equipmentFamilies.map((family, index) => (
                    <FamilyCard key={family.title} family={family} index={index} />
                  ))}
                </ul>
              </div>

              <div className="mt-12">
                <p className="text-brand-700 flex items-center gap-2 text-[11px] font-semibold tracking-wide uppercase">
                  <span aria-hidden className="bg-brand-700 h-px w-4" />
                  Material Specific Platforms
                </p>
                <ul className="mt-6 grid gap-4 md:grid-cols-2">
                  {materialPlatforms.map((platform) => (
                    <li key={platform.title} className={cardClass}>
                      <Heading level={2} size="md">
                        {platform.title}
                      </Heading>
                      <div className="mt-4 flex flex-col gap-5">
                        {platform.groups.map((group) => (
                          <div key={group.label ?? platform.title}>
                            {group.label && (
                              <Heading level={3} size="sm">
                                {group.label}
                              </Heading>
                            )}
                            <ul className={group.label ? 'mt-3 flex flex-col gap-3' : 'flex flex-col gap-3'}>
                              {group.links.map((link) => (
                                <li key={link.href}>
                                  <Link
                                    href={link.href}
                                    className="text-brand-700 flex items-center gap-2 rounded-md px-2 py-1.5 font-semibold no-underline transition duration-200 hover:-translate-y-[5px] hover:bg-brand-500 hover:text-white"
                                  >
                                    <ArrowRight aria-hidden className="size-4 shrink-0" />
                                    <span>{link.label}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 rounded-[10px] bg-[#0d2244] p-6 md:p-8">
                <p className="text-brand-500 text-sm font-semibold tracking-wide uppercase">Engineering Engagement</p>
                <Heading level={2} size="lg" className="mt-2 text-white">
                  Need a Custom Material Processing or Dispensing System?
                </Heading>
                <p className="mt-4 max-w-3xl leading-relaxed text-[#96a9c1]">
                  Kirkco supports confidential engineering discussions under NDA. Do not submit protected customer
                  drawings, formulations, or confidential machine details through a public form until an approved NDA
                  and secure information path are in place.
                </p>
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
                  Vendor Agnostic Approach
                </p>
                <Heading level={2} size="lg" className="mt-3">
                  Industrial Process Systems Framework
                </Heading>
                <ol className="mt-6 grid gap-4 md:grid-cols-2">
                  {processSteps.map((step) => (
                    <li key={step.title} className={cardClass}>
                      <Heading level={3} size="sm">
                        {step.title}
                      </Heading>
                      <p className="text-ink-muted mt-2 leading-relaxed">{step.body}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-12">
                <Heading level={2} size="lg">
                  Common Questions for System Design
                </Heading>
                <div className={`${cardClass} mt-6 flex flex-col gap-6`}>
                  {equipmentQuestions.map((item) => (
                    <div key={item.question}>
                      <Heading level={3} size="sm">
                        {item.question}
                      </Heading>
                      <p className="text-ink-muted mt-2 leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="border-neutral-200 w-full shrink-0 rounded-lg border p-5 lg:sticky lg:top-28 lg:w-72">
              <Heading level={2} size="sm">
                Main Categories
              </Heading>
              <ul className="mt-3 flex flex-col gap-1">
                {mainCategories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={category.href}
                      className="text-brand-700 font-semibold no-underline hover:text-brand-500"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
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
