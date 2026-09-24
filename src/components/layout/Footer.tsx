import Link from 'next/link';
import { ExternalLink, Hexagon, Mail, MapPin, Phone } from 'lucide-react';
import { navigation } from '@/config/navigation';
import { formattedAddress, site } from '@/config/site';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

const socials = Object.entries(site.social).filter(([, href]) => Boolean(href)) as [
  string,
  string,
][];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <Section as="footer" background="inverse" spacing="md">
      <Container gap="lg">
        <div className="grid w-full gap-10 md:grid-cols-4">
          <div className="flex flex-col gap-3 md:col-span-2">
            <Link href="/" className="text-ink-inverse flex items-center gap-2 font-semibold no-underline">
              <Hexagon className="size-7" aria-hidden="true" />
              <span>{site.name}</span>
            </Link>
            <p className="max-w-reading text-neutral-300">{site.tagline}</p>

            <address className="mt-2 flex flex-col gap-2 text-neutral-300 not-italic">
              <a
                href={`tel:${site.business.phoneHref}`}
                className="text-ink-inverse inline-flex min-h-11 items-center gap-2 no-underline"
              >
                <Phone className="size-4" aria-hidden="true" />
                {site.business.phone}
              </a>
              <a
                href={`mailto:${site.business.email}`}
                className="text-ink-inverse inline-flex min-h-11 items-center gap-2 no-underline"
              >
                <Mail className="size-4" aria-hidden="true" />
                {site.business.email}
              </a>
              <span className="flex items-start gap-2">
                <MapPin className="mt-1 size-4 shrink-0" aria-hidden="true" />
                {formattedAddress}
              </span>
            </address>

            <dl className="mt-2 text-neutral-300">
              <dt className="sr-only">Opening hours</dt>
              {site.business.hours.map((line) => (
                <dd key={line}>{line}</dd>
              ))}
            </dl>
          </div>

          {navigation.footer.map((group) => (
            <nav key={group.heading} aria-label={group.heading} className="flex flex-col gap-3">
              <h2 className="text-sm font-semibold tracking-wide text-neutral-400 uppercase">
                {group.heading}
              </h2>
              <ul className="flex flex-col gap-1">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-ink-inverse inline-flex min-h-11 items-center text-neutral-300 no-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {socials.length > 0 && (
          <ul className="flex gap-2">
            {socials.map(([platform, href]) => (
              <li key={platform}>
                <a
                  href={href}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="hover:text-ink-inverse inline-flex size-11 items-center justify-center rounded-md text-neutral-300 no-underline hover:bg-neutral-800"
                >
                  <span className="sr-only">{platform}</span>
                  <ExternalLink className="size-5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="flex w-full flex-col gap-3 border-t border-neutral-800 pt-6 text-sm text-neutral-400 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year} {site.legalName ?? site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-4">
            {navigation.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-ink-inverse text-neutral-400 no-underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
