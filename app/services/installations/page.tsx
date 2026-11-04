import type { Metadata } from 'next';
import { ServiceStub } from '@/components/ui/ServiceStub';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Installations',
  description: 'Installation support from Kirkco Corporation.',
  path: '/services/installations',
  noindex: true,
});

export default function Page() {
  return (
    <ServiceStub title="Installations" description="New systems, fitted and tested." />
  );
}
