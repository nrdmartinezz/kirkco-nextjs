import type { Metadata } from 'next';
import { SimplePage } from '@/components/ui/SimplePage';
import { site } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description: site.description,
  path: '/about',
  noindex: true,
});

export default function AboutPage() {
  return (
    <SimplePage title={`About ${site.name}`}>
      <p className="text-ink-muted mt-4">{site.description}</p>
    </SimplePage>
  );
}
