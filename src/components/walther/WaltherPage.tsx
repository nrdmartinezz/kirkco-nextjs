import Image from 'next/image';
import Link from 'next/link';
import { LeadForm } from '@/components/forms/LeadForm';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import { site } from '@/config/site';
import { ArrowRight } from 'lucide-react';

const quoteHref = '#walther-quote';
const manufacturerHref = 'https://www.walther-systemtechnik.com/en/';

const facts = [
  { value: '50+ years', label: 'Serving customers since 1973' },
  { value: 'Made in Germany', label: 'Development & manufacturing' },
  { value: 'Individual solutions', label: 'Systems & machines' },
  { value: 'Competent service', label: 'From planning to maintenance' },
];

const technologies = [
  {
    title: 'Convey & Provide',
    href: '/equipment-options/lubrication/feeding-and-supply',
    body: 'Pump systems, pressure vessels, small-quantity feeders, and single pumps move oils, greases, and pastes from the original container. WPS Professional adds homogenization and media storage. WDBS pressure vessels deliver liquid media without pulsation.',
  },
  {
    title: 'Forward & Condition',
    href: '/equipment-options/lubrication/pressure-control',
    body: 'Material pressure regulators, filters, media storage, pressure intensifiers, distributors, flow limiters, fittings, and hoses complete the fluid path. WFSD watches inlet and outlet pressure. WADS removes gas inclusions before the medium reaches the valve.',
  },
  {
    title: 'Process & Apply',
    href: '/equipment-options/lubrication/dispensing',
    body: 'Spray, chamber, outlet, and pulse valves apply greases, oils, adhesives, and coatings. ReadyLube lubricates a specific feature by contact or spray. RotoStream doses and sprays on the progressive-cavity principle, with flow that follows the axis motion.',
  },
  {
    title: 'Measure, Control & Regulate',
    href: '/equipment-options/lubrication/metering',
    body: 'WVC Professional and the related sensors control valve timing, pressure, and volume flow. Kirkco can connect that layer to the machine signal, cycle monitoring, and the rest of the production equipment.',
  },
];

const assistance = [
  {
    title: 'Get Application Assistance',
    body: 'Describe the medium, container, required dose or pattern, cycle rate, application method, automation level, and monitoring requirements. Kirkco can evaluate whether the Walther Systemtechnik application calls for a component, a configured package, or a complete integrated system.',
  },
  {
    title: 'Find a Genuine Walther Systemtechnik Part',
    body: 'Send the Walther Systemtechnik model, article or part number, equipment identification, requested quantity, and photographs. Kirkco will use that information to identify the replacement component and confirm current availability.',
  },
];

const applications = [
  {
    title: 'Precision Grease and Oil Metering',
    body: 'Volumetric valves and dosing controls place lubricant at a defined location and quantity. A system may combine container supply, pressure regulation, metering, an application nozzle, and cycle monitoring.',
  },
  {
    title: 'Automated Component Lubrication',
    body: 'ReadyLube contact and spray devices lubricate gears, joints, seals, bores, and other features during production or assembly. The setup follows the lubricant, the part geometry, the dose, and whether the station runs by hand or from a machine signal.',
  },
  {
    title: 'Adhesive and Viscous-Media Dosing',
    body: 'The same dosing architecture applies adhesives, silicones, and other viscous media where a bead, dot, or cavity fill must stay repeatable. Kirkco can connect the dosing unit to material supply, controls, and the surrounding production equipment.',
  },
  {
    title: 'Spray, Coating, and Potting',
    body: 'Spray and coating valves cover a surface or edge. Potting and cavity-fill applications place a measured volume into a component. Selection depends on viscosity, pattern, open time, and how the part is presented to the valve.',
  },
  {
    title: 'OEM Machinery and Integrated Production Systems',
    body: 'Machine builders can combine Walther Systemtechnik supply, metering, and application components in equipment that coordinates pumping, dosing, and monitoring. Kirkco can support component selection and broader system integration when the process needs more than a standalone product.',
  },
];

const cardClass = 'rounded-2xl border border-[#e4f0ff] bg-white p-6 shadow-[0_1px_3px_rgba(21,101,192,0.1)]';

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="text-brand-700 flex items-center gap-2 text-[11px] font-semibold tracking-wide uppercase">
      <span aria-hidden className="bg-brand-700 h-px w-5" />
      {children}
    </p>
  );
}

export function WaltherPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Walther Systemtechnik',
        item: `${site.url}/walther`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative isolate min-h-[400px] overflow-hidden bg-brand-500">
        <Image
          src="/images/walther/hero.jpg"
          alt="Walther Systemtechnik dosing cell with a linear axis, valves, and safety guarding"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-700/35" />
        <Container className="relative flex min-h-[400px] justify-center py-8">
          <div className="w-full max-w-3xl rounded-2xl bg-[rgba(19,89,187,0.28)] p-6 backdrop-blur-md md:p-9">
            <img
              src="/images/walther/ws-mark-white.svg"
              alt=""
              width={56}
              height={56}
              className="mb-4 size-14"
            />
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
                    Walther Systemtechnik
                  </span>
                </li>
              </ol>
            </nav>
            <Heading level={1} size="xl" className="mt-4 text-white">
              Walther Systemtechnik
            </Heading>
            <p className="mt-2 text-lg text-white/90">Products, parts, and U.S. support</p>
            <p className="mt-3 text-base font-semibold text-white">Convey. Dispense. Apply.</p>
            <div className="mt-6">
              <Button href="/contact-us" className="rounded-full">
                Talk to an Engineer
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#0d2244]">
        <Container>
          <ul className="grid gap-8 py-8 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <li key={fact.label}>
                <p className="text-2xl font-bold text-white md:text-3xl">{fact.value}</p>
                <p className="text-brand-500 mt-1 text-sm font-semibold">{fact.label}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Section spacing="none" className="pt-8 pb-section">
        <Container gap="lg">
          <div>
            <Eyebrow>Walther Systemtechnik GmbH</Eyebrow>
            <div className={`${cardClass} mt-6 flex flex-col gap-6 md:flex-row md:items-center`}>
              <Image
                src="/images/walther/grease.jpg"
                alt="Grease applied to the teeth of a gear during automated lubrication"
                width={500}
                height={500}
                className="h-auto w-full max-w-[280px] shrink-0 rounded-[10px] object-cover"
              />
              <div>
                <Eyebrow>Germersheim dosing technology</Eyebrow>
                <Heading level={2} size="md" className="mt-4">
                  U.S. support for Walther Systemtechnik
                </Heading>
                {/* Client confirmation required before this partnership claim is treated as final. */}
                <p className="text-ink-muted mt-4 leading-7">
                  Kirkco Corporation is an official U.S. partner and distributor for{' '}
                  <a href={manufacturerHref} className="text-brand-700 font-semibold underline">
                    Walther Systemtechnik GmbH
                  </a>
                  . This page covers that company only: industrial dosing technology designed and built in
                  Germersheim, Germany, and identified by the WS mark. It is not a catalog for other manufacturers
                  that use the Walther name.
                </p>
                <p className="text-ink-muted mt-4 leading-7">
                  Walther Systemtechnik supplies components, dosing systems, and special machines for bonding,
                  sealing, and lubricating. The media include oils, greases, adhesives, silicones, waxes, and other
                  liquid or pasty materials. Kirkco gives U.S. manufacturers a domestic path to product selection,
                  application review, genuine parts, system integration, and support for equipment already in
                  production.
                </p>
                <div className="mt-6">
                  <Button href={quoteHref} className="rounded-full">
                    Request a Walther Systemtechnik Quote
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Eyebrow>The dosing process chain</Eyebrow>
            <Heading level={2} size="lg" className="mt-4">
              Convey, condition, apply, and control
            </Heading>
            <p className="text-ink-muted mt-4 max-w-3xl leading-7">
              Walther Systemtechnik organizes the range the way a dosing line is built: convey and provide the
              medium, forward and condition it, process and apply it, then measure, control, and regulate the result.
            </p>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {technologies.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="group border-neutral-200 flex h-full flex-col rounded-2xl border bg-white p-6 no-underline shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand-500 hover:shadow-md"
                  >
                    <Heading level={2} size="md">
                      {item.title}
                    </Heading>
                    <p className="text-ink-muted mt-3 leading-relaxed">{item.body}</p>
                    <ArrowRight
                      className="text-brand-500 mt-auto size-5 translate-y-1 opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <ul className="grid gap-4 md:grid-cols-2">
            {assistance.map((item) => (
              <li key={item.title}>
                <Link href={quoteHref} className={`${cardClass} group flex h-full flex-col no-underline`}>
                  <Heading level={2} size="md">
                    {item.title}
                  </Heading>
                  <p className="text-ink-muted mt-3 leading-relaxed">{item.body}</p>
                  <span className="text-brand-500 mt-4 inline-flex items-center gap-2 font-semibold">
                    Request a Walther Systemtechnik Quote
                    <ArrowRight aria-hidden className="size-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className={`${cardClass} flex flex-col gap-6 md:flex-row md:items-center`}>
            <Image
              src="/images/walther/thermal-paste.jpg"
              alt="Walther Systemtechnik pump systems feeding material from drums, marked with the WS logo"
              width={500}
              height={625}
              className="h-auto w-full max-w-[280px] shrink-0 rounded-[10px] object-cover"
            />
            <div>
              <Heading level={2} size="md">
                German dosing technology with a U.S. engineering path
              </Heading>
              <p className="text-ink-muted mt-4 leading-7">
                Walther Systemtechnik develops and manufactures dosing and application systems in Germersheim. The
                portfolio runs from a single valve or pump to a coordinated system for conveying, metering, and
                applying the medium, including special machines when the process needs its own cell.
              </p>
              <p className="text-ink-muted mt-4 leading-7">
                Kirkco is the U.S. technical and commercial interface for this manufacturer. The team can review the
                material, container, operating pressure, required quantity, application geometry, production rate,
                controls, and service requirements before selecting equipment.
              </p>
              <p className="text-ink-muted mt-4 leading-7">
                When the job is larger than one product, Kirkco can integrate Walther Systemtechnik technology into
                material supply, pressure control, metering, dispensing, sensors, automation, installation, and
                lifecycle support.
              </p>
              <div className="mt-6">
                <Button href={quoteHref} className="rounded-full">
                  Request a Walther Systemtechnik Quote
                </Button>
              </div>
            </div>
          </div>

          <div>
            <Heading level={2} size="lg">
              Walther Systemtechnik applications supported by Kirkco
            </Heading>
            <p className="text-ink-muted mt-4 max-w-3xl leading-7">
              Kirkco provides a U.S. inquiry path for genuine Walther Systemtechnik replacement parts, accessories,
              and service components. That includes an active production system, a maintenance requirement, or an
              older installation that has to be identified before parts can be quoted.
            </p>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {applications.map((item) => (
                <li key={item.title} className={cardClass}>
                  <Heading level={3} size="sm">
                    {item.title}
                  </Heading>
                  <p className="text-ink-muted mt-3 leading-relaxed">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <div id="walther-quote" className={`${cardClass} scroll-mt-28`}>
            <Heading level={2} size="lg">
              Request a Walther Systemtechnik quote
            </Heading>
            <p className="text-ink-muted mt-4 max-w-3xl leading-7">
              Include the Walther Systemtechnik model or part number, quantity, and a short description of the
              medium, container, and application. If the equipment is from a different Walther-named manufacturer,
              say so in the message. Kirkco will follow up from {site.business.email}.
            </p>
            <LeadForm formType="request-a-quote" />
          </div>
        </Container>
      </Section>
    </>
  );
}
