import type { Metadata } from 'next';
import { LeadForm } from '@/components/forms/LeadForm';
import { SimplePage } from '@/components/ui/SimplePage';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Talk to an Engineer',
  description: `Discuss an application with a ${site.name} engineer.`,
};

export default function RequestQuotePage() {
  return (
    <SimplePage title="Talk to an Engineer">
      <p className="text-ink-muted mt-4 max-w-xl">
        Share the application requirements. An engineer will follow up from {site.business.email}.
      </p>
      <LeadForm formType="request-a-quote" />
    </SimplePage>
  );
}
