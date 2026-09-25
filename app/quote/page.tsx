import type { Metadata } from 'next';
import { LeadForm } from '@/components/forms/LeadForm';
import { SimplePage } from '@/components/ui/SimplePage';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Get a Quote',
  description: `Request a quote from ${site.name}.`,
};

export default function QuotePage() {
  return (
    <SimplePage title="Get a Quote">
      <p className="text-ink-muted mt-4 max-w-xl">
        Tell us about the material, the process, and what you need the system to do.
      </p>
      <LeadForm formType="quote" />
    </SimplePage>
  );
}
