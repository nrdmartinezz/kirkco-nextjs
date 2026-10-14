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
const manufacturerHref = 'https://www.walther-systemtechnik.com';

const facts = [
  { value: 'Official', label: 'U.S. Partner' },
  { value: 'Germany', label: 'Based in Germersheim' },
  { value: 'Technology', label: 'Metering, Lubrication, Supply & Application' },
  { value: 'NDA Supported', label: 'Application Engineering & System Integration' },
];

const technologies = [
  {
    title: 'Volumetric Metering',
    href: '/equipment-options/lubrication/metering',
    body: 'Walther volumetric metering valves apply oils, greases, adhesives, and other viscous media in a defined quantity. The portfolio includes chamber metering valves for repeatable dosing, including greases in the NLGI 0 to 3 range.',
  },
  {
    title: 'Component Lubrication',
    href: '/equipment-options/lubrication/dispensing',
    body: 'ReadyLube devices apply grease or oil to a specific component feature, either by contact or by spray. They support production and assembly stations that need a repeatable dose without depending on the operator.',
  },
  {
    title: 'Fluid Supply and Pump Systems',
    href: '/equipment-options/lubrication/feeding-and-supply',
    body: 'Supply systems move oils, greases, adhesives, and thermal paste from the source container to the metering or application point. Selection depends on viscosity, container size, pressure, flow, and how the material is conditioned.',
  },
  {
    title: 'Spray, Coating, and Potting',
    href: '/equipment-options/adhesives-sealants',
    body: 'Spray valves, film coating, and potting equipment apply liquid and pasty media across a surface or into a cavity. Kirkco can review the medium, pattern, and cycle rate before recommending a valve, a device, or a configured system.',
  },
];

const assistance = [
  {
    title: 'Get Application Assistance',
    body: 'Describe the medium, container, required dose or pattern, cycle rate, application method, automation level, and monitoring requirements. Kirkco can evaluate whether the application calls for a component, a configured package, or a complete integrated system.',
  },
  {
    title: 'Find a Genuine Walther Part',
    body: 'Send the Walther model, article or part number, equipment identification, requested quantity, and photographs. Kirkco will use the available information to help identify the appropriate replacement component and confirm current availability.',
  },
];

const applications = [
  {
    title: 'Precision Grease and Oil Metering',
    body: 'Volumetric valves and dosing controls support lubricant application at a defined location and quantity. A system may combine container supply, pressure regulation, metering, an application nozzle, and cycle monitoring.',
  },
  {
    title: 'Automated Component Lubrication',
    body: 'ReadyLube contact and spray devices lubricate gears, joints, seals, bores, and other features during production or assembly. The setup follows the lubricant, the part geometry, the dose, and whether the station runs by hand or from a machine signal.',
  },
  {
    title: 'Adhesive and Viscous-Media Dosing',
    body: 'The same dosing architecture applies adhesives, silicones, and other viscous media where bead, dot, or cavity fill must stay repeatable. Kirkco can connect the dosing unit to material supply, controls, and the surrounding production equipment.',
  },
  {
    title: 'Spray, Coating, and Potting',
    body: 'Spray and coating valves cover a surface or edge. Potting and cavity-fill applications place a measured volume into a component. Selection depends on viscosity, pattern, open time, and how the part is presented to the valve.',
  },
  {
    title: 'OEM Machinery and Integrated Production Systems',
    body: 'Machine builders can combine Walther supply, metering, and application components in equipment that coordinates pumping, dosing, and monitoring. Kirkco can support component selection and broader system integration when the process needs more than a standalone product.',
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
        name: 'Walther Products, Parts & U.S. Support',
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
          alt="Walther lubrication line with a linear axis, dosing valves, and safety guarding"
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
                    Walther Products, Parts & U.S. Support
                  </span>
                </li>
              </ol>
            </nav>
            <Heading level={1} size="xl" className="mt-4 text-white">
              Walther Products, Parts & U.S. Support
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
                src="/images/walther/grease.jpg"
                alt="Grease applied to the teeth of a gear during automated lubrication"
                width={500}
                height={500}
                className="h-auto w-full max-w-[280px] shrink-0 rounded-[10px] object-cover"
              />
              <div>
                <Eyebrow>Systems-Level Engineering</Eyebrow>
                <Heading level={2} size="md" className="mt-4">
                  Request a Walther Product Quote
                </Heading>
                {/* Client confirmation required before this partnership claim is treated as final. */}
                <p className="text-ink-muted mt-4 leading-7">
                  Kirkco Corporation is an official U.S. partner and distributor for Walther Systemtechnik products,
                  giving manufacturers a domestic path to product selection, application review, replacement parts,
                  system integration, and support for existing equipment.
                </p>
                <p className="text-ink-muted mt-4 leading-7">
                  Walther Systemtechnik, at{' '}
                  <a href={manufacturerHref} className="text-brand-700 font-semibold underline">
                    walther-systemtechnik.com
                  </a>
                  , builds dosing and application systems for oils, greases, adhesives, silicones, and other liquid or
                  pasty media. Whether you need an individual component or a complete dosing system, Kirkco can help
                  define the application, identify the appropriate technology, and connect the product to the full
                  material-handling and control architecture.
                </p>
                <div className="mt-6">
                  <Button href={quoteHref} className="rounded-full">
                    Request a Walther Quote
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Eyebrow>Explore Walther Technology Through Kirkco</Eyebrow>
            <p className="text-ink-muted mt-4 max-w-3xl leading-7">
              Walther organizes dosing equipment around metering, component lubrication, material supply, and spray or
              potting application. Accessories and spare parts support these product families.
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
                    Request a Walther Quote
                    <ArrowRight aria-hidden className="size-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className={`${cardClass} flex flex-col gap-6 md:flex-row md:items-center`}>
            <Image
              src="/images/walther/thermal-paste.jpg"
              alt="Walther pump systems feeding material from drums, marked with the WS logo"
              width={500}
              height={625}
              className="h-auto w-full max-w-[280px] shrink-0 rounded-[10px] object-cover"
            />
            <div>
              <Heading level={2} size="md">
                German Dosing Technology With a U.S.-Based Engineering Path
              </Heading>
              <p className="text-ink-muted mt-4 leading-7">
                Walther Systemtechnik develops dosing and application systems in Germersheim, Germany. Its portfolio
                covers components and coordinated systems for conveying, metering, and applying oils, greases,
                adhesives, silicones, thermal paste, and related media.
              </p>
              <p className="text-ink-muted mt-4 leading-7">
                Kirkco adds a U.S.-based technical and commercial interface. Our team can help evaluate the material,
                container source, operating pressure, required quantity, application geometry, production rate,
                controls, and service requirements before selecting equipment.
              </p>
              <p className="text-ink-muted mt-4 leading-7">
                For customers who need more than a single product, Kirkco can integrate Walther technology into a
                broader process that includes material supply, pressure control, metering, dispensing, sensors,
                automation, installation, and lifecycle support.
              </p>
              <div className="mt-6">
                <Button href={quoteHref} className="rounded-full">
                  Request a Walther Quote
                </Button>
              </div>
            </div>
          </div>

          <div>
            <Heading level={2} size="lg">
              Walther Applications Supported by Kirkco
            </Heading>
            <p className="text-ink-muted mt-4 max-w-3xl leading-7">
              Kirkco provides a U.S. inquiry path for customers seeking genuine Walther replacement parts, accessories,
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

          <div id="walther-quote" className={`${cardClass} scroll-mt-28`}>
            <Heading level={2} size="lg">
              Request Walther Quote
            </Heading>
            <p className="text-ink-muted mt-4 max-w-3xl leading-7">
              Include the Walther model or part number, quantity, and a short description of the medium, container, and
              application. Kirkco will follow up from {site.business.email}.
            </p>
            <LeadForm formType="request-a-quote" />
          </div>
        </Container>
      </Section>
    </>
  );
}
