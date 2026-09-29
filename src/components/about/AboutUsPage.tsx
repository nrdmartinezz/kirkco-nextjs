import Image from 'next/image';
import Link from 'next/link';
import { Factory, GraduationCap, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import { site } from '@/config/site';

const stats = [
  { value: '1985', label: 'Established' },
  { value: '40+', label: 'Years of Process Engineering' },
  { value: 'Best-Fit', label: 'Vendor-Agnostic Architecture' },
  { value: 'Turnkey', label: 'Engineering & Integration' },
  { value: 'Lifecycle', label: 'Installation, Training & Support' },
];

const disciplines = [
  {
    number: '01',
    title: 'Material Feeding & Conditioning',
    body: 'Supply the process from drums, pails, tanks, or bulk storage while managing pressure, temperature, filtration, agitation, and material readiness.',
  },
  {
    number: '02',
    title: 'Precision Metering & Ratio Control',
    body: 'Select and integrate piston, gear, progressive-cavity, valve-based, or other technologies around material and output requirements.',
  },
  {
    number: '03',
    title: 'Mixing & Dispensing',
    body: 'Configure static or dynamic mixing and application-specific dispensing for beads, dots, shots, fills, coatings, and sprays.',
  },
  {
    number: '04',
    title: 'Process Control & Automation',
    body: 'Coordinate recipes, sensors, interlocks, motion, robotics, production data, and operator interfaces through one control architecture.',
  },
  {
    number: '05',
    title: 'System Integration & Validation',
    body: 'Unify mechanical, electrical, controls, documentation, testing, installation, and commissioning in one execution path.',
  },
  {
    number: '06',
    title: 'Lifecycle Support',
    body: 'Support the installed architecture through training, troubleshooting, repair, rebuild, optimization, and evolving production needs.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Define the Process',
    body: 'Material, production objective, quality requirements, operating environment, and constraints.',
  },
  {
    number: '02',
    title: 'Develop the Architecture',
    body: 'Best-fit pumping, metering, mixing, dispensing, controls, and automation technologies.',
  },
  {
    number: '03',
    title: 'Integrate & Document',
    body: 'Mechanical, electrical, controls, guarding, interfaces, and process documentation.',
  },
  {
    number: '04',
    title: 'Test & Validate',
    body: 'Evaluation against agreed operating requirements before deployment.',
  },
  {
    number: '05',
    title: 'Install & Commission',
    body: 'In-field startup and coordination with the customer’s production environment.',
  },
  {
    number: '06',
    title: 'Train & Support',
    body: 'Operator training, maintenance support, repair, rebuild, and system evolution.',
  },
];

const history = [
  {
    year: '1985',
    body: 'Established in Monroe, North Carolina, specializing in metering and dispensing equipment.',
  },
  {
    year: '1990s',
    body: 'Expanded into application-specific integration, connecting equipment to real industrial processes.',
  },
  {
    year: '2000s',
    body: 'Grew capabilities across polyurethane processing, composites, structural panels, and material handling.',
  },
  {
    year: '2010s',
    body: 'Integrated controls, automation, robotic dispensing, and process monitoring into system architectures.',
  },
  {
    year: 'Today',
    body: 'Application engineering, vendor-agnostic technology selection, turnkey integration, and lifecycle support.',
  },
];

const services = [
  { label: 'In-Field Installation Support', href: '/in-field-installation', icon: Factory },
  { label: 'Training & Education', href: '/training-education', icon: GraduationCap },
  { label: 'Repair & Rebuild', href: '/rebuild-repair', icon: Wrench },
];

const differentiators = [
  {
    title: 'Vendor-Agnostic Selection',
    body: 'We are not locked to a single product line. We evaluate piston pumps, gear pumps, progressive cavity pumps, and servo-driven platforms to select the technology that best fits your chemistry, viscosity, and throughput requirements.',
  },
  {
    title: 'Complete System Integration',
    body: 'We engineer complete production architectures — not standalone machines. From bulk chemical storage and material conditioning through metering, mixing, dispensing, and PLC-controlled validation, we own the entire process.',
  },
  {
    title: 'Ratio Accuracy to ±1%',
    body: 'Structural adhesives, polyurethane systems, and encapsulation compounds demand precise mix ratios. Our metering architectures are engineered and validated to maintain ±1% ratio accuracy or better across the full production cycle.',
  },
  {
    title: 'Documentation-Driven Execution',
    body: 'A structured authority doctrine with strict revision control governs every Kirkco system. From process specifications and FAT protocols to commissioning records and operator training materials, nothing is left undocumented.',
  },
  {
    title: 'Modular & Scalable Architecture',
    body: 'Production demands change. Our systems are designed with modular expansion in mind, allowing new automation cells, higher-throughput modules, or additional material streams to be integrated without rebuilding the entire line.',
  },
  {
    title: 'Lifecycle Partnership',
    body: 'Our relationship does not end at commissioning. Kirkco provides in-field installation support, operator training, rebuild and repair services, and long-term technical support to ensure your system performs at specification for its full operational life.',
  },
];

const cardClass =
  'rounded-2xl border border-[#e4f0ff] bg-white p-6 shadow-[0_1px_3px_rgba(21,101,192,0.1)]';

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="text-brand-500 flex items-center gap-2 text-base">
      <span aria-hidden className="bg-brand-700 h-0.5 w-5 rounded-full" />
      {children}
    </p>
  );
}

export function AboutUsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'About Us', item: `${site.url}/about-us` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative isolate min-h-[400px] overflow-hidden bg-brand-900 text-white">
        <Image
          src="/images/equipment-hero.webp"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-700/65" />
        <Container className="relative flex min-h-[400px] justify-center py-9">
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
                    About Us
                  </span>
                </li>
              </ol>
            </nav>
            <p className="mt-4 text-sm font-medium text-white/70">Systems Integration Since 1985</p>
            <Heading level={1} className="mt-3 text-white">
              Precision systems. Engineered around your process.
            </Heading>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/contact-us" className="rounded-full">
                Talk to an Engineer
              </Button>
              <Button
                href="/equipment-options"
                variant="secondary"
                className="rounded-full !border-white/80 !bg-transparent !text-white hover:!border-white hover:!bg-white/10 hover:!text-white"
              >
                Explore Systems
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-brand-900 text-white">
        <Container>
          <ul className="grid gap-8 py-8 sm:grid-cols-2 lg:grid-cols-5">
            {stats.map((stat) => (
              <li key={stat.label}>
                <p className="text-2xl font-bold text-white md:text-3xl">{stat.value}</p>
                <p className="mt-1 text-sm text-white/80">{stat.label}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Section>
        <Container layout="row" className="items-center" gap="lg">
          <div className="min-w-0 flex-1">
            <Eyebrow>Who We Are</Eyebrow>
            <Heading level={2} size="xl" className="mt-4 !font-extrabold">
              Built on process engineering. Focused on the complete system.
            </Heading>
            <div className="text-ink-muted mt-6 space-y-4 text-sm leading-7">
              <p>
                Kirkco began in 1985 as a specialist in adhesive, sealant, and lubricant metering, mixing, and
                dispensing equipment.
              </p>
              <p>
                Over four decades, the company expanded from equipment supply into application engineering and
                full-system integration. Today, Kirkco connects pumps, material conditioning, precision metering,
                mixing, dispensing, controls, automation, monitoring, and support in one application-specific
                architecture.
              </p>
              <p>
                Our role is not simply to select a machine. It is to understand the material and production process,
                identify the variables that govern performance, and integrate the equipment required to control them.
              </p>
              <p>
                Today, Kirkco designs and integrates complete material handling ecosystems for polyurethane, epoxy,
                silicone, and lubrication chemistries. Our work brings together automation, controls, and data
                visibility to deliver application-specific architectures engineered for performance, reliability, and
                long-term throughput.
              </p>
            </div>
            <Link href="#disciplines" className="text-brand-500 mt-6 inline-flex font-semibold no-underline hover:underline">
              Explore our engineering disciplines
            </Link>
          </div>
          <div className="relative aspect-square w-full max-w-[400px] shrink-0 overflow-hidden rounded-[10px] shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
            <Image
              src="/images/about/kirkco-about-us.jpg"
              alt="Industrial robots assembling automotive body panels on a production line"
              fill
              className="object-cover"
              sizes="400px"
            />
          </div>
        </Container>
      </Section>

      <Section id="disciplines" background="muted" className="scroll-mt-28">
        <Container gap="lg">
          <div className="max-w-3xl">
            <Eyebrow>Systems-Level Engineering</Eyebrow>
            <Heading level={2} size="xl" className="mt-4 !font-extrabold">
              Authority across critical industrial process disciplines.
            </Heading>
            <p className="text-ink-muted mt-4 text-sm leading-7">
              A reliable material-handling system is created by coordinating the full process—not by optimizing one
              component in isolation.
            </p>
          </div>
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {disciplines.map((item) => (
              <li key={item.number}>
                <Link
                  href="/equipment-options"
                  className={`${cardClass} group flex h-full flex-col no-underline transition duration-200 hover:-translate-y-0.5 hover:border-brand-500`}
                >
                  <p className="text-brand-500 text-sm font-semibold">{item.number}</p>
                  <Heading level={3} size="md" className="mt-2">
                    {item.title}
                  </Heading>
                  <p className="text-ink-muted mt-3 text-sm leading-7">{item.body}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container gap="lg">
          <div className="max-w-3xl">
            <Eyebrow>How We Work</Eyebrow>
            <Heading level={2} size="xl" className="mt-4 !font-extrabold">
              How Kirkco engineers a system.
            </Heading>
            <p className="text-ink-muted mt-4 text-sm leading-7">
              One application-first execution path—from process definition through long-term support.
            </p>
          </div>
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((item) => (
              <li key={item.number} className={cardClass}>
                <p className="text-brand-500 text-sm font-semibold">{item.number}</p>
                <Heading level={3} size="md" className="mt-2">
                  {item.title}
                </Heading>
                <p className="text-ink-muted mt-3 text-sm leading-7">{item.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section background="muted">
        <Container gap="lg">
          <div className="max-w-3xl">
            <Eyebrow>Our History</Eyebrow>
            <Heading level={2} size="xl" className="mt-4 !font-extrabold">
              Four decades of application and systems-integration experience.
            </Heading>
            <p className="text-ink-muted mt-4 text-sm leading-7">
              From specialist equipment supply to complete process ownership.
            </p>
          </div>
          <ol className="border-brand-200 relative space-y-8 border-l pl-8">
            {history.map((item) => (
              <li key={item.year} className="relative">
                <span
                  aria-hidden
                  className="bg-brand-500 ring-surface-muted absolute top-1.5 -left-[39px] size-3 rounded-full ring-4"
                />
                <Heading level={3} size="md">
                  {item.year}
                </Heading>
                <p className="text-ink-muted mt-2 max-w-3xl text-sm leading-7">{item.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container layout="row" className="items-center" gap="lg">
          <div className="relative aspect-[4/3] w-full max-w-[480px] shrink-0 overflow-hidden rounded-[10px] shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
            <Image
              src="/images/adhesive-bonding.jpg"
              alt="Precision dispensing nozzle applying adhesive to a molded component"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 480px, 100vw"
            />
          </div>
          <div className="min-w-0 flex-1">
            <Eyebrow>Lifecycle Support</Eyebrow>
            <Heading level={2} size="xl" className="mt-4 !font-extrabold">
              Engineering support across the system lifecycle.
            </Heading>
            <div className="text-ink-muted mt-4 space-y-4 text-sm leading-7">
              <p>
                A system’s value depends on how well it is installed, operated, maintained, and adapted over time.
                Kirkco’s support extends beyond the initial equipment build.
              </p>
              <p>Click on the services listed to see how we can support you!</p>
            </div>
            <ul className="mt-6 flex flex-col gap-3">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      className="border-brand-100 bg-brand-50 text-ink-base hover:bg-brand-500 inline-flex items-center gap-3 rounded-lg border px-4 py-3 font-semibold no-underline transition duration-200 hover:-translate-y-0.5 hover:text-white"
                    >
                      <Icon className="size-5 shrink-0" aria-hidden />
                      {service.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </Section>

      <Section background="muted">
        <Container gap="lg">
          <div className="max-w-3xl">
            <Eyebrow>What Sets Us Apart</Eyebrow>
            <Heading level={2} size="xl" className="mt-4 !font-extrabold">
              Engineered for When Failure Is Not an Option
            </Heading>
            <p className="text-ink-muted mt-4 text-sm leading-7">
              In an industry served by manufacturers like DOPAG, Graco, and Nordson, Kirkco distinguishes itself
              through complete process ownership, vendor-agnostic engineering, and a depth of application knowledge
              that goes far beyond the equipment itself.
            </p>
          </div>
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((item) => (
              <li key={item.title} className={cardClass}>
                <Heading level={3} size="md">
                  {item.title}
                </Heading>
                <p className="text-ink-muted mt-3 text-sm leading-7">{item.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
