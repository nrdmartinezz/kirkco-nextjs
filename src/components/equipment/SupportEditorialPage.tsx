import { EditorialSections } from '@/components/equipment/EditorialSections';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import type { PublicPageSections } from '@/content/pillar/sections';
import { site } from '@/config/site';

export function SupportEditorialPage({ title, page }: { title: string; page: PublicPageSections }) {
  return (
    <Section spacing="none" className="pt-8 pb-section">
      <Container gap="lg">
        <Heading level={1} size="xl">
          {title}
        </Heading>
        <EditorialSections page={page} className="mt-0" />
        <div className="rounded-[10px] bg-[#0d2244] p-6 md:p-8">
          <p className="text-brand-500 text-sm font-semibold tracking-wide uppercase">Engineering Engagement</p>
          <Heading level={2} size="lg" className="mt-2 text-white">
            Talk to an Engineer
          </Heading>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/quote" className="rounded-full">
              Request a quote
            </Button>
            <Button href={`tel:${site.business.phoneHref}`} variant="inverse" className="rounded-full">
              Call us Today!
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
