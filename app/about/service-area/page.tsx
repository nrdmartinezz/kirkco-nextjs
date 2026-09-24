import type { Metadata } from 'next';
import { SimplePage } from '@/components/ui/SimplePage';
import { site } from '@/config/site';

export const metadata: Metadata = { title: 'Service Area' };

export default function ServiceAreaPage() {
  return (
    <SimplePage title="Service Area">
      <p className="text-ink-muted mt-4">
        {site.name} is based in {site.business.address.locality}, {site.business.address.region}.
      </p>
    </SimplePage>
  );
}
