import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import { site } from '@/config/site';
import { navigation } from '@/config/navigation';

export default function HomePage() {
  const location = `${site.business.address.locality}, ${site.business.address.region}`;

  return (
    <>
      <Section background="muted">
        <Container width="narrow">
          <p className="text-ink-brand text-sm font-semibold tracking-wide uppercase">{location}</p>
          <Heading level={1} className="mt-3">
            {site.tagline}
          </Heading>
          <p className="text-ink-muted mt-4 text-lg">{site.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {navigation.cta && <Button href={navigation.cta.href}>{navigation.cta.label}</Button>}
            <Button href={`tel:${site.business.phoneHref}`} variant="secondary">
              {site.business.phone}
            </Button>
          </div>
        </Container>
      </Section>

      <Section>
        <Container width="narrow">
          <Heading level={2}>Visit or call</Heading>
          <p className="text-ink-muted mt-3">
            Every name, phone number, address, and hour on this site comes from{' '}
            <code className="text-ink-base">src/config/site.ts</code>. Change it there once.
          </p>
          <dl className="mt-8 grid gap-4">
            <div>
              <dt className="text-ink-muted text-sm">Phone</dt>
              <dd>
                <a href={`tel:${site.business.phoneHref}`} className="font-medium no-underline">
                  {site.business.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-ink-muted text-sm">Email</dt>
              <dd>
                <a href={`mailto:${site.business.email}`} className="font-medium no-underline">
                  {site.business.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-ink-muted text-sm">Address</dt>
              <dd>
                {site.business.address.street}
                <br />
                {site.business.address.locality}, {site.business.address.region}{' '}
                {site.business.address.postalCode}
              </dd>
            </div>
            <div>
              <dt className="text-ink-muted text-sm">Hours</dt>
              {site.business.hours.map((line) => (
                <dd key={line}>{line}</dd>
              ))}
            </div>
          </dl>
        </Container>
      </Section>
    </>
  );
}
