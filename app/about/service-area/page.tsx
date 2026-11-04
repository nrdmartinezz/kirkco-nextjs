import type { Metadata } from 'next';
import { SimplePage } from '@/components/ui/SimplePage';
import { site } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Service Area',
  description: `${site.name} is based in ${site.business.address.locality}, ${site.business.address.region}.`,
  path: '/about/service-area',
  noindex: true,
});

export default function ServiceAreaPage() {
  return (
    <SimplePage title="Service Area">
      <p className="text-ink-muted mt-4">
        {site.name} is based in {site.business.address.locality}, {site.business.address.region}.
      </p>
    </SimplePage>
  );
}
