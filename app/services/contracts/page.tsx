import type { Metadata } from 'next';
import { ServiceStub } from '@/components/ui/ServiceStub';

export const metadata: Metadata = { title: 'Service Contracts' };

export default function Page() {
  return (
    <ServiceStub
      title="Service Contracts"
      description="Scheduled upkeep with priority response."
    />
  );
}
