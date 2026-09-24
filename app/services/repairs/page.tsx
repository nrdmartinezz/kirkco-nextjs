import type { Metadata } from 'next';
import { ServiceStub } from '@/components/ui/ServiceStub';

export const metadata: Metadata = { title: 'Repairs & Maintenance' };

export default function Page() {
  return (
    <ServiceStub
      title="Repairs & Maintenance"
      description="Fast turnaround on everyday problems."
    />
  );
}
