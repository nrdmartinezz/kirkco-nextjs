import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Boxes, Droplets, Gauge, Layers, Mail, Phone } from 'lucide-react';
import { site } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import { heroSystems, productBands, proofPoints, systemCards } from './content';
import { IndustriesCarousel } from './IndustriesCarousel';

const heroIcons = [Droplets, Layers, Gauge, Boxes];

export function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <Image src="/images/hero.jpg" alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-brand-900/70" />
        <Container className="relative py-section-lg" gap="lg">
          <div className="max-w-3xl">
            <Heading level={1} className="text-white">
              Precision Metering System for Accuracy in your Process
            </Heading>
            <Button href="/request-a-quote" className="mt-8 rounded-full">
              Talk to an Engineer
            </Button>
          </div>
          <ul className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {heroSystems.map((item, index) => {
              const Icon = heroIcons[index] ?? Droplets;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex h-full flex-col items-start gap-3 rounded-lg bg-brand-500 p-5 text-white no-underline hover:bg-brand-700"
                  >
                    <Icon className="size-8" aria-hidden="true" />
                    <span className="font-heading text-lg font-semibold">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <Section background="base">
        <Container layout="row" className="items-stretch" gap="lg">
          <div className="flex-1">
            <Heading level={2}>
              Precision Metering, Mixing, Controlling & Dispensing for All Applications
            </Heading>
            <p className="text-ink-muted mt-4 text-base leading-relaxed">
              Kirkco Corporation is a systems-level authority in engineered dispensing, metering, and material
              processing solutions for advanced manufacturing. We design and integrate complete material handling
              ecosystems for polyurethane, epoxy, silicone, and lubrication chemistries—engineering each system for
              performance, reliability, and throughput. Our work brings together automation, controls, and data
              visibility to deliver NDA-safe, application-specific architectures. From concept and factory acceptance
              testing to commissioning and long-term service, we own the entire process with zero guesswork.
            </p>
            <Button href="/contact-us" variant="secondary" className="mt-6 rounded-full">
              Start an Inquiry
            </Button>
          </div>
          <aside className="bg-brand-500 w-full rounded-lg p-6 text-white md:max-w-sm">
            <Heading level={2} size="lg" className="text-white">
              Let&apos;s Talk Systems
            </Heading>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a href={`tel:${site.business.phoneHref}`} className="inline-flex items-center gap-2 font-semibold no-underline">
                  <Phone className="size-4" aria-hidden="true" />
                  {site.business.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.business.email}`} className="inline-flex items-center gap-2 no-underline">
                  <Mail className="size-4" aria-hidden="true" />
                  {site.business.email}
                </a>
              </li>
            </ul>
            <Button href="/quote" variant="inverse" className="mt-6 rounded-full">
              Get a Quote
            </Button>
          </aside>
        </Container>
      </Section>

      <Section background="muted">
        <Container gap="md">
          <Heading level={2}>Industries We Supply</Heading>
          <IndustriesCarousel />
        </Container>
      </Section>

      <Section>
        <Container layout="row" className="items-start" gap="lg">
          <div className="flex-1">
            <Heading level={2}>Engineered for When Failure Is Not an Option</Heading>
            <p className="text-ink-muted mt-4 leading-relaxed">
              Kirkco operates with a systems-integrator mindset backed by manufacturer-level discipline. With over 40
              years of real-world process engineering experience, we design vendor-agnostic architectures built around
              best-fit technologies—not locked ecosystems. Our modular, scalable systems are engineered to support
              growth while maintaining control through rigorous documentation and revision management. Manufacturers
              trust Kirkco when downtime, variability, and guesswork are not acceptable.
            </p>
          </div>
          <ul className="grid w-full flex-1 gap-3">
            {proofPoints.map((point) => (
              <li key={point} className="bg-brand-100 text-brand-900 rounded-lg px-4 py-3 font-medium">
                {point}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section background="muted">
        <Container gap="md">
          <div className="max-w-3xl">
            <Heading level={2}>We Only Offer The Best Systems</Heading>
            <p className="text-ink-muted mt-4">
              Our equipment categories represent complete, production-ready system architectures—not standalone
              machines. Each category is organized around process control, material behavior, and integration
              requirements to help teams quickly identify the right solution for their application. Every system is
              engineered to scale with production demands and long-term operational goals.
            </p>
          </div>
          <ul className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-4">
            {systemCards.map((card) => (
              <li key={card.title}>
                <Link
                  href={card.href}
                  className="bg-surface-base border-line-base flex h-full flex-col gap-3 rounded-lg border p-5 no-underline shadow-sm"
                >
                  <p className="text-brand-500 text-sm font-semibold">{card.kicker}</p>
                  <h3 className="font-heading text-xl font-semibold">{card.title}</h3>
                  <ul className="text-ink-muted text-sm">
                    {card.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {productBands.map((band, index) => (
        <Section key={band.title} background={index % 2 === 0 ? 'base' : 'muted'}>
          <Container gap="lg">
            <div className={index % 2 === 1 ? 'flex flex-col gap-8 md:flex-row-reverse' : 'flex flex-col gap-8 md:flex-row'}>
              <div className="relative min-h-72 flex-1 overflow-hidden rounded-lg md:min-h-96">
                <Image src={band.image} alt={band.alt} fill className="object-cover" sizes="(min-width: 768px) 40vw, 100vw" />
              </div>
              <div className="flex flex-1 flex-col gap-4">
                <Heading level={2}>{band.title}</Heading>
                <p className="text-ink-muted leading-relaxed">{band.body}</p>
              </div>
            </div>
            <ul className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {band.cards.map((card) => (
                <li key={card.href}>
                  <Link
                    href={card.href}
                    className="group bg-surface-base border-line-base flex h-full flex-col gap-3 rounded-lg border p-5 no-underline shadow-sm hover:border-brand-500"
                  >
                    <span className="bg-brand-500 inline-flex size-10 items-center justify-center rounded-md text-white">
                      <Droplets className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-heading text-lg font-semibold">{card.title}</span>
                    <span className="text-brand-500 mt-auto inline-flex items-center gap-1 text-sm font-semibold">
                      View Products
                      <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ))}

      <Section background="brand">
        <Container gap="md">
          <div className="max-w-3xl">
            <Heading level={2} className="text-white">
              Let&apos;s Get Your Next Project Off The Ground
            </Heading>
            <p className="mt-4 text-brand-100">
              Have a process challenge that cannot be solved with off-the-shelf equipment?
            </p>
            <Button href="/request-a-quote" variant="inverse" className="mt-6 rounded-full">
              Talk to an Engineer
            </Button>
          </div>
          <ul className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-4">
            {systemCards.map((card) => (
              <li key={card.title}>
                <Link href={card.href} className="block h-full rounded-lg bg-white/10 p-5 text-white no-underline">
                  <p className="text-sm font-semibold text-brand-100">{card.kicker}</p>
                  <h3 className="font-heading mt-2 text-lg font-semibold">{card.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
