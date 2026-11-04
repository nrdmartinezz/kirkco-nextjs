import type { Metadata } from 'next';
import { ServiceStub } from '@/components/ui/ServiceStub';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Service Contracts',
  description: 'Service contracts from Kirkco Corporation.',
  path: '/services/contracts',
  noindex: true,
});

export default function Page() {
  return (
    <ServiceStub
      title="Service Contracts"
      description="Scheduled upkeep with priority response."
    />
  );
}
