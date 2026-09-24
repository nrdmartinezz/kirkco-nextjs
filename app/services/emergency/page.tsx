import type { Metadata } from 'next';
import { ServiceStub } from '@/components/ui/ServiceStub';

export const metadata: Metadata = { title: 'Emergency Callout' };

export default function Page() {
  return <ServiceStub title="Emergency Callout" description="Around-the-clock cover." />;
}
