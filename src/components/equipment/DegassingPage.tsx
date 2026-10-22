import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { EquipmentProductSearch } from '@/components/equipment/EquipmentProductSearch';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import { site } from '@/config/site';
import {
  cabinetLegend,
  degassingBenefits,
  degassingChain,
  degassingControls,
  degassingFaq,
  degassingFit,
  degassingFlow,
  degassingHref,
  degassingMeta,
  degassingProblems,
  degassingReady,
  degassingServices,
  degassingSpecs,
  degassingStages,
  degassingStats,
} from '@/content/equipment/degassing';
import { heroForParent } from '@/content/equipment/parent-groups';
import type { Product, ProductCategory } from '@/lib/products';
import { toSearchProducts } from '@/lib/search';
import { ChevronRight } from 'lucide-react';

const helpLinks = [
  { label: 'In-Field Installation', href: '/in-field-installation' },
  { label: 'Training & Education', href: '/training-education' },
  { label: 'Repair & Rebuild', href: '/rebuild-repair' },
  { label: 'Resin Dispensing & Molding', href: '/resin-dispensing-molding' },
];

const cardClass = 'rounded-2xl border border-[#e4f0ff] bg-white p-6 shadow-[0_1px_3px_rgba(21,101,192,0.1)]';

const breadcrumb = [
  { label: 'Home', href: '/' },
  { label: 'Equipment Options', href: '/equipment-options' },
  { label: 'Lubrication', href: '/equipment-options/lubrication' },
  { label: 'Degassing' },
];

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="text-brand-700 flex items-center gap-2 text-[11px] font-semibold tracking-wide uppercase">
      <span aria-hidden className="bg-brand-700 h-px w-5" />
      {children}
    </p>
  );
}

export function DegassingPage({
  categories,
  products,
}: {
  categories: ProductCategory[];
  products: Product[];
}) {
  const hero = heroForParent('/equipment-options/lubrication');
  const searchProducts = toSearchProducts(products);
  const mainCategories = categories.filter((category) => category.name === category.group);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-brand-500">
        <Image src={hero.heroImage} alt={hero.heroAlt} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-brand-700/35" />
        <Container className="relative flex min-h-[400px] justify-center py-8">
          <div className="w-full max-w-3xl rounded-2xl bg-[rgba(19,89,187,0.28)] p-6 backdrop-blur-md md:p-9">
              <nav aria-label="Breadcrumb" className="text-sm text-white">
                <ol className="flex flex-wrap items-center gap-x-1 gap-y-1">
                  {breadcrumb.map((crumb, index) => {
                    const current = index === breadcrumb.length - 1;
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
              <p className="mt-4 text-sm font-semibold tracking-[0.14em] text-white/80 uppercase">{degassingMeta.eyebrow}</p>
              <Heading level={1} size="xl" className="mt-2 text-white">
                {degassingMeta.title}
              </Heading>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/90">{degassingMeta.description}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button href="/quote" className="rounded-full">
                  Talk to an Engineer
                </Button>
                <Button href={`tel:${site.business.phoneHref}`} variant="inverse" className="rounded-full">
                  {site.business.phone}
                </Button>
                <Link
                  href="#how-it-works"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white px-6 font-medium text-white no-underline hover:bg-white/10"
                >
                  How it works
                </Link>
              </div>
          </div>
        </Container>
      </section>

      <Section spacing="none" className="pt-8 pb-section">
        <Container gap="lg">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
            <div className="min-w-0 flex-1">
              <div className={cardClass}>
                <Eyebrow>Why degas</Eyebrow>
                <Heading level={2} size="lg" className="mt-3">
                  Air in the material is air in the part.
                </Heading>
                <p className="text-ink-muted mt-4 leading-7">
                  Gas inclusions get into grease during drum changes, pump priming and line maintenance. Once they
                  reach a metering valve, every shot that carries a bubble is a short shot.
                </p>
                <div className="mt-6 grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                  <div className="overflow-hidden rounded-xl bg-neutral-50">
                    <Image
                      src={degassingMeta.image}
                      alt={degassingMeta.imageAlt}
                      width={500}
                      height={400}
                      className="h-auto w-full object-contain"
                    />
                  </div>
                  <dl className="grid grid-cols-2 gap-3">
                    {degassingStats.map((stat) => (
                      <div key={stat.value} className="border-brand-100 rounded-xl border bg-brand-50 px-4 py-3">
                        <dt className="text-brand-700 text-lg font-semibold">{stat.value}</dt>
                        <dd className="text-ink-muted mt-1 text-sm leading-snug">{stat.label}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <ul className="mt-6 grid gap-4 md:grid-cols-3">
                  {degassingProblems.map((problem) => (
                    <li key={problem.title} className="border-brand-500 border-t-2 pt-3">
                      <Heading level={3} size="sm">
                        {problem.title}
                      </Heading>
                      <p className="text-ink-muted mt-2 text-sm leading-relaxed">{problem.body}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div id="how-it-works" className="mt-12 scroll-mt-28">
                <Eyebrow>How it works</Eyebrow>
                <Heading level={2} size="lg" className="mt-3">
                  Scan the stream, reject the bubble, restore the pressure.
                </Heading>
                <p className="text-ink-muted mt-4 max-w-3xl leading-7">
                  The station sits in the supply line between your pump and your application equipment. Material
                  passes through six stages inside one wall-mountable cabinet.
                </p>
                <div
                  className="mt-6 overflow-x-auto rounded-2xl border border-[#e4f0ff] bg-white p-4 shadow-[0_1px_3px_rgba(21,101,192,0.1)]"
                  role="img"
                  aria-label="Flow diagram: supply pump to pressure reduction, flow restriction, bubble detection, buffer container, booster pump and outlet to the application. Material with bubbles is diverted from the detection stage through a discharge valve to a collection bottle."
                >
                  <p className="text-ink-muted text-xs font-semibold tracking-wide uppercase">Degassing station cabinet</p>
                  <ol className="mt-4 flex min-w-[52rem] items-stretch gap-2">
                    {degassingFlow.map((step, index) => (
                      <li key={step.label} className="flex min-w-0 flex-1 items-center gap-2">
                        <div
                          className={
                            index === 0 || index === degassingFlow.length - 1
                              ? 'bg-brand-700 flex h-full min-h-24 flex-1 flex-col justify-center rounded-lg px-3 py-3 text-white'
                              : 'border-brand-500 bg-brand-50 flex h-full min-h-24 flex-1 flex-col justify-center rounded-lg border px-3 py-3'
                          }
                        >
                          <span className={index === 0 || index === degassingFlow.length - 1 ? 'text-xs text-white/70' : 'text-brand-500 text-xs font-semibold'}>
                            {step.detail}
                          </span>
                          <span className="mt-1 text-sm font-semibold">{step.label}</span>
                        </div>
                        {index < degassingFlow.length - 1 && (
                          <span aria-hidden className="text-brand-500 text-lg">
                            →
                          </span>
                        )}
                      </li>
                    ))}
                  </ol>
                  <p className="text-ink-muted mt-4 text-sm leading-relaxed">
                    Bubble-free material continues to the valve. When gas is detected at stage 3, stage 4 diverts only
                    that slug to the collection bottle.
                  </p>
                </div>
                <ol className="mt-6 grid gap-4 sm:grid-cols-2">
                  {degassingStages.map((stage, index) => (
                    <li key={stage.title} className={cardClass}>
                      <p className="text-brand-500 text-sm font-semibold">{index + 1}</p>
                      <Heading level={3} size="sm" className="mt-2">
                        {stage.title}
                      </Heading>
                      <p className="text-ink-muted mt-2 text-sm leading-relaxed">{stage.body}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <figure className={`${cardClass} mt-12`}>
                <Eyebrow>Inside the cabinet</Eyebrow>
                <div className="relative mt-4 overflow-hidden rounded-xl bg-white">
                  <Image
                    src={degassingMeta.interiorImage}
                    alt={degassingMeta.interiorAlt}
                    width={1266}
                    height={720}
                    className="h-auto w-full object-contain"
                  />
                  {cabinetLegend.map((item) => (
                    <span
                      key={item.mark}
                      aria-hidden
                      className={`bg-brand-500 absolute grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-sm font-semibold text-white shadow-[0_0_0_3px_white] ${item.position}`}
                    >
                      {item.mark}
                    </span>
                  ))}
                </div>
                <figcaption>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {cabinetLegend.map((item) => (
                      <li key={item.mark} className="text-ink-muted text-sm leading-relaxed">
                        <span className="text-brand-500 mr-2 font-semibold">{item.mark}</span>
                        {item.label}
                      </li>
                    ))}
                  </ul>
                </figcaption>
              </figure>

              <div className="mt-12 grid gap-4 lg:grid-cols-2">
                <div className={cardClass}>
                  <Eyebrow>Benefits</Eyebrow>
                  <Heading level={2} size="md" className="mt-3">
                    More stable process, fewer rejects.
                  </Heading>
                  <ul className="mt-5 flex flex-col gap-4">
                    {degassingBenefits.map((benefit) => (
                      <li key={benefit.title}>
                        <p className="font-semibold">{benefit.title}</p>
                        <p className="text-ink-muted mt-1 text-sm leading-relaxed">{benefit.body}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={cardClass}>
                  <Heading level={2} size="md">
                    Control and integration
                  </Heading>
                  <dl className="mt-5 flex flex-col gap-4">
                    {degassingControls.map((item) => (
                      <div key={item.label}>
                        <dt className="text-brand-700 text-sm font-semibold">{item.label}</dt>
                        <dd className="text-ink-muted mt-1 text-sm leading-relaxed">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <div id="specs" className="mt-12 scroll-mt-28">
                <Eyebrow>Technical data</Eyebrow>
                <Heading level={2} size="lg" className="mt-3">
                  Specifications
                </Heading>
                <div className="mt-6 overflow-x-auto rounded-2xl border border-[#e4f0ff] bg-white shadow-[0_1px_3px_rgba(21,101,192,0.1)]">
                  <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#e4f0ff]">
                        <th className="text-ink-muted px-4 py-3 font-semibold tracking-wide uppercase">Parameter</th>
                        <th className="text-ink-muted px-4 py-3 font-semibold tracking-wide uppercase">Metric</th>
                        <th className="text-ink-muted px-4 py-3 font-semibold tracking-wide uppercase">U.S.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {degassingSpecs.map((group) => (
                        <Fragment key={group.group}>
                          <tr>
                            <td colSpan={3} className="bg-brand-50 text-ink-muted px-4 py-2 text-xs font-semibold tracking-wide uppercase">
                              {group.group}
                            </td>
                          </tr>
                          {group.rows.map((row) => (
                            <tr key={row.parameter} className="border-t border-[#e4f0ff]">
                              <td className="px-4 py-3 align-top">{row.parameter}</td>
                              <td className="px-4 py-3 align-top font-medium" colSpan={row.span ? 2 : undefined}>
                                {row.metric}
                              </td>
                              {!row.span && <td className="text-ink-muted px-4 py-3 align-top">{row.us}</td>}
                            </tr>
                          ))}
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-ink-muted mt-3 text-sm">
                  U.S. values are converted and rounded. Contact Kirkco for the full data sheet and installation drawing.
                </p>
              </div>

              <div className="mt-12">
                <Eyebrow>Application fit</Eyebrow>
                <Heading level={2} size="lg" className="mt-3">
                  Is your material a candidate?
                </Heading>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className={cardClass}>
                    <Heading level={3} size="sm">
                      Good fit <span className="bg-brand-50 text-brand-700 ml-2 rounded px-2 py-0.5 text-xs font-semibold tracking-wide uppercase">Yes</span>
                    </Heading>
                    <ul className="mt-4 list-disc space-y-2 pl-5">
                      {degassingFit.yes.map((item) => (
                        <li key={item} className="text-ink-muted text-sm leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={cardClass}>
                    <Heading level={3} size="sm">
                      Not suitable <span className="ml-2 rounded bg-[#fff6e0] px-2 py-0.5 text-xs font-semibold tracking-wide text-[#c8641a] uppercase">No</span>
                    </Heading>
                    <ul className="mt-4 list-disc space-y-2 pl-5">
                      {degassingFit.no.map((item) => (
                        <li key={item} className="text-ink-muted text-sm leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="text-ink-muted mt-4 text-sm">
                      Not sure? Send us the product data sheet for your material and we will review it.
                    </p>
                  </div>
                </div>
              </div>

              <div className={`${cardClass} mt-12`}>
                <Eyebrow>Delivered by Kirkco</Eyebrow>
                <Heading level={2} size="lg" className="mt-3">
                  Part of a complete lubrication system, not a box on the floor.
                </Heading>
                <p className="text-ink-muted mt-4 leading-7">
                  Degassing only pays off when the supply in front of it and the metering after it are matched to your
                  material and cycle. Kirkco engineers the whole line and stands behind it.
                </p>
                <ol aria-label="Typical system layout" className="mt-6 flex flex-wrap items-center gap-2">
                  {degassingChain.map((step, index) => (
                    <li key={step.label} className="flex items-center gap-2">
                      {index > 0 && (
                        <span aria-hidden className="text-ink-muted">
                          →
                        </span>
                      )}
                      {step.href ? (
                        <Link
                          href={step.href}
                          className="border-line-base text-brand-700 rounded-md border bg-white px-3 py-2 text-sm font-semibold no-underline hover:border-brand-500"
                        >
                          {step.label}
                        </Link>
                      ) : (
                        <span
                          className={
                            step.label === 'Advanced Degassing Station'
                              ? 'border-brand-500 bg-brand-50 text-brand-700 rounded-md border px-3 py-2 text-sm font-semibold'
                              : 'border-line-base rounded-md border px-3 py-2 text-sm font-semibold'
                          }
                        >
                          {step.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
                <ul className="mt-6 grid gap-4 md:grid-cols-3">
                  {degassingServices.map((service) => (
                    <li key={service.title} className="border-brand-100 border-t-2 pt-3">
                      <Heading level={3} size="sm">
                        {service.title}
                      </Heading>
                      <p className="text-ink-muted mt-2 text-sm leading-relaxed">{service.body}</p>
                      <p className="mt-3 flex flex-col gap-1">
                        {service.links.map((link) => (
                          <Link key={link.href} href={link.href} className="text-brand-700 text-sm font-semibold no-underline hover:underline">
                            {link.label}
                          </Link>
                        ))}
                      </p>
                    </li>
                  ))}
                </ul>
                <p className="text-ink-muted mt-6 text-sm leading-relaxed">
                  Kirkco supplies this station through its precision dispensing partnerships, including{' '}
                  <Link href="/abnox" className="text-brand-700 font-semibold no-underline hover:underline">
                    ABNOX
                  </Link>{' '}
                  and{' '}
                  <Link href="/walther" className="text-brand-700 font-semibold no-underline hover:underline">
                    Walther Systemtechnik
                  </Link>
                  .
                </p>
              </div>

              <div className="mt-12">
                <Eyebrow>Common questions</Eyebrow>
                <Heading level={2} size="lg" className="mt-3">
                  FAQ
                </Heading>
                <div className="mt-4">
                  {degassingFaq.map((item) => (
                    <details key={item.question} className="border-line-base border-b py-4 first:border-t">
                      <summary className="cursor-pointer text-lg font-semibold">{item.question}</summary>
                      <p className="text-ink-muted mt-2 max-w-3xl leading-relaxed">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </div>

              <div className="mt-12 grid gap-8 rounded-[10px] bg-[#0d2244] p-6 md:grid-cols-2 md:p-8">
                <div>
                  <p className="text-brand-500 text-sm font-semibold tracking-wide uppercase">Let us help you select what you need</p>
                  <Heading level={2} size="lg" className="mt-2 text-white">
                    Talk to a Kirkco engineer about air in your process.
                  </Heading>
                  <p className="mt-4 leading-relaxed text-[#c9d6e2]">
                    Tell us about your material and application and we will recommend the right degassing, supply and
                    metering setup.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button href="/quote" className="rounded-full">
                      Talk to an Engineer
                    </Button>
                    <Button href={`tel:${site.business.phoneHref}`} variant="inverse" className="rounded-full">
                      {site.business.phone}
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="text-brand-500 text-sm font-semibold tracking-wide uppercase">Helpful to have ready</p>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-[#c9d6e2]">
                    {degassingReady.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <aside className="border-neutral-200 w-full shrink-0 rounded-lg border p-5 lg:sticky lg:top-28 lg:w-72">
              <EquipmentProductSearch products={searchProducts} from={degassingHref} />
              <Heading level={2} size="sm">
                Main Categories
              </Heading>
              <ul className="mt-3 flex flex-col gap-1">
                {mainCategories.map((category) => {
                  const active = degassingHref.startsWith(`${category.href}/`);
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
