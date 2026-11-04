import type { Metadata } from 'next';
import { SimplePage } from '@/components/ui/SimplePage';
import { site } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service',
  description: `Terms of service for ${site.legalName ?? site.name} and the kirkcocorp.com website.`,
  path: '/terms',
});

export default function TermsPage() {
  return (
    <SimplePage title="Terms of Service">
      <p className="text-ink-muted mt-4">
        Replace this page with the client terms. Linked from the footer legal list for {site.name}.
      </p>
    </SimplePage>
  );
}
