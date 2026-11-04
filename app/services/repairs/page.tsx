import type { Metadata } from 'next';
import { ServiceStub } from '@/components/ui/ServiceStub';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Repairs & Maintenance',
  description: 'Repair and maintenance support from Kirkco Corporation.',
  path: '/services/repairs',
  noindex: true,
});

export default function Page() {
  return (
    <ServiceStub
      title="Repairs & Maintenance"
      description="Fast turnaround on everyday problems."
    />
  );
}
