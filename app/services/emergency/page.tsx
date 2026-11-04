import type { Metadata } from 'next';
import { ServiceStub } from '@/components/ui/ServiceStub';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Emergency Callout',
  description: 'Emergency callout support from Kirkco Corporation.',
  path: '/services/emergency',
  noindex: true,
});

export default function Page() {
  return <ServiceStub title="Emergency Callout" description="Around-the-clock cover." />;
}
