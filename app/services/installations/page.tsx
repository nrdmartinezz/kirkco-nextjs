import type { Metadata } from 'next';
import { ServiceStub } from '@/components/ui/ServiceStub';

export const metadata: Metadata = { title: 'Installations' };

export default function Page() {
  return (
    <ServiceStub title="Installations" description="New systems, fitted and tested." />
  );
}
