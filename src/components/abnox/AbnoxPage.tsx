import Image from 'next/image';
import Link from 'next/link';
import { LeadForm } from '@/components/forms/LeadForm';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import { site } from '@/config/site';
import { ArrowRight } from 'lucide-react';

const quoteHref = '#abnox-quote';

const facts = [
  { value: 'Official', label: 'U.S. Sales Partner' },
  { value: '1946', label: 'Founded in Switzerland' },
  { value: 'Technology', label: 'Metering, Supply, Lubrication & High-Pressure' },
  { value: 'NDA Supported', label: 'Application Engineering & System Integration' },
];

const technologies = [
  {
    title: 'ABNOX Metering Technology',
    href: '/equipment-options/lubrication/metering',
    body: 'ABNOX metering technology supports the repeatable application of low-viscosity oils, high-viscosity greases, and other industrial media. The portfolio includes volumetric metering valves, pulse valves, spray valves, outlet valves, dosage units, dosing systems, controls, accessories, and spare parts.',
  },
  {
    title: 'ABNOX Lubricant Supply Technology',
    href: '/equipment-options/lubrication/feeding-and-supply',
    body: 'Lubricant supply technology moves grease or oil from the source container to downstream metering and application equipment. ABNOX offers lubricant supply systems, pneumatic and electric pumps, material pressure tanks, pressure-control products, accessories, and spare parts for different viscosities and container sizes.',
  },
  {
    title: 'ABNOX Lubrication Technology',
    href: '/equipment-options/lubrication',
    body: 'ABNOX lubrication technology supports both industrial maintenance and automated machinery lubrication. The portfolio includes lubrication systems, manual and powered grease pumps, filling equipment, oil-level sight glasses, accessories, and spare parts.',
  },
  {
    title: 'ABNOX Clamping and High-Pressure Technology',
    href: '/equipment-options/lubrication/pressure-control',
    body: 'ABNOX’s public portfolio includes high-pressure pumps and inlet and outlet valves for hydraulic clamping processes. Kirkco can review the requested product and application to confirm whether it falls within the supported U.S. commercial scope.',
  },
];

const assistance = [
  {
    title: 'Get Application Assistance',
    body: 'Describe the lubricant, container, required dose or flow, cycle rate, application method, automation level, and monitoring requirements. Kirkco can evaluate whether the application calls for a component, a configured package, or a complete integrated system.',
  },
  {
    title: 'Find a Genuine ABNOX Part',
    body: 'Send the ABNOX model, article or part number, equipment identification, requested quantity, and photographs. Kirkco will use the available information to help identify the appropriate replacement component and confirm current availability.',
  },
];

const applications = [
  {
    title: 'Precision Grease and Oil Metering',
    body: 'ABNOX metering valves, dosage units, and controls support processes that require lubricant application at a defined location. Depending on the requirement, a system may combine source-container supply, pressure regulation, volumetric or pressure-time metering, an application nozzle, and cycle monitoring.',
  },
  {
    title: 'Automated Lubrication in Production Equipment',
    body: 'Automated systems can distribute oil or grease to bearings, pivots, guides, rotary joints, and other moving elements. The system is configured around the number of lubrication points, required quantity, operating frequency, load, speed, environment, and available machine controls.',
  },
  {
    title: 'Lubricant Supply From Pails and Drums',
    body: 'Pumps and supply stations move lubricant from the original container to downstream metering or dispensing equipment. Selection depends on lubricant consistency, container size, required pressure and flow, supply distance, duty cycle, and the need to limit air inclusion or contamination.',
  },
  {
    title: 'Industrial Maintenance and Service',
    body: 'Manual lubrication equipment supports routine machinery service where controlled application, high-pressure capability, clean filling, and durable tools are important. Product selection depends on the lubricant, access to the application point, pressure requirement, cartridge or bulk-fill preference, and service frequency.',
  },
  {
    title: 'OEM Machinery and Integrated Production Systems',
    body: 'Machine builders and manufacturers can integrate ABNOX components into production equipment that coordinates pumping, pressure regulation, metering, application, and monitoring. Kirkco can support component selection and broader system integration when the process requires more than a standalone product.',
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

export function AbnoxPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'ABNOX Products, Parts & U.S. Support', item: `${site.url}/abnox` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative isolate min-h-[400px] overflow-hidden bg-brand-500">
        <Image
          src="/images/abnox/hero.jpg"
          alt="ABNOX metering valves dispensing onto a production fixture"
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
                    ABNOX Products, Parts & U.S. Support
                  </span>
                </li>
              </ol>
            </nav>
            <Heading level={1} size="xl" className="mt-4 text-white">
              ABNOX Products, Parts & U.S. Support
            </Heading>
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
            <Eyebrow>Start With What You Need</Eyebrow>
            <div className={`${cardClass} mt-6 flex flex-col gap-6 md:flex-row md:items-center`}>
            <Image
              src="/images/abnox/metering.jpg"
              alt="Close view of an ABNOX metering valve made in Switzerland"
              width={500}
              height={500}
              className="h-auto w-full max-w-[280px] shrink-0 rounded-[10px] object-cover"
            />
            <div>
              <Eyebrow>Systems-Level Engineering</Eyebrow>
              <Heading level={2} size="md" className="mt-4">
                Request an ABNOX Product Quote
              </Heading>
              <p className="text-ink-muted mt-4 leading-7">
                Kirkco Corporation is an official U.S. distributor for ABNOX products. ABNOX lists Kirkco as a United
                States sales partner, giving manufacturers a domestic path to product selection, application review,
                replacement parts, system integration, and support for existing equipment.
              </p>
              <p className="text-ink-muted mt-4 leading-7">
                Whether you need an individual ABNOX component or a complete lubrication and metering system, Kirkco
                can help define the application, identify the appropriate technology, and connect the product to the
                full material-handling and control architecture.
              </p>
              <div className="mt-6">
                <Button href={quoteHref} className="rounded-full">
                  Request an ABNOX Quote
                </Button>
              </div>
            </div>
            </div>
          </div>

          <div>
            <Eyebrow>Explore ABNOX Technology Through Kirkco</Eyebrow>
            <p className="text-ink-muted mt-4 max-w-3xl leading-7">
              ABNOX organizes its portfolio into four principal areas: Metering Technology, Lubricant Supply
              Technology, Lubrication Technology, and Clamping Technology. Accessories and spare parts support these
              product families.
            </p>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {technologies.map((item) => (
                <li key={item.href}>
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
                    Request an ABNOX Quote
                    <ArrowRight aria-hidden className="size-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className={`${cardClass} flex flex-col gap-6 md:flex-row md:items-center`}>
            <Image
              src="/images/abnox/partner.jpg"
              alt="ABNOX lubricant supply station with pumps and a control panel"
              width={500}
              height={625}
              className="h-auto w-full max-w-[280px] shrink-0 rounded-[10px] object-cover"
            />
            <div>
              <Heading level={2} size="md">
                Swiss Technology With a U.S.-Based Engineering Path
              </Heading>
              <p className="text-ink-muted mt-4 leading-7">
                ABNOX has developed lubrication, metering, and high-pressure technology since 1946. Its product
                portfolio covers individual components and coordinated systems for conveying, regulating, metering,
                applying, and monitoring industrial lubricants and related media.
              </p>
              <p className="text-ink-muted mt-4 leading-7">
                Kirkco adds a U.S.-based technical and commercial interface. Our team can help evaluate the material,
                container source, operating pressure, required quantity, application geometry, production rate,
                controls, and service requirements before selecting equipment.
              </p>
              <p className="text-ink-muted mt-4 leading-7">
                For customers who need more than a single product, Kirkco can integrate ABNOX technology into a broader
                process that includes material supply, pressure control, metering, dispensing, sensors, automation,
                installation, and lifecycle support.
              </p>
              <div className="mt-6">
                <Button href={quoteHref} className="rounded-full">
                  Request an ABNOX Quote
                </Button>
              </div>
            </div>
          </div>

          <div>
            <Heading level={2} size="lg">
              ABNOX Applications Supported by Kirkco
            </Heading>
            <p className="text-ink-muted mt-4 max-w-3xl leading-7">
              Kirkco provides a U.S. inquiry path for customers seeking genuine ABNOX replacement parts, accessories,
              and service components. This includes support for an active production system, a maintenance requirement,
              or an older installation that must be identified before parts or replacement options can be evaluated.
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

          <div id="abnox-quote" className={`${cardClass} scroll-mt-28`}>
            <Heading level={2} size="lg">
              Request ABNOX Quote
            </Heading>
            <p className="text-ink-muted mt-4 max-w-3xl leading-7">
              Include the ABNOX model or part number, quantity, and a short description of the lubricant, container,
              and application. Kirkco will follow up from {site.business.email}.
            </p>
            <LeadForm formType="request-a-quote" />
          </div>
        </Container>
      </Section>
    </>
  );
}
