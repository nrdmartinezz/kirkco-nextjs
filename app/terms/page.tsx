import type { Metadata } from 'next';
import { SimplePage } from '@/components/ui/SimplePage';
import { site } from '@/config/site';

export const metadata: Metadata = { title: 'Terms of Service' };

export default function TermsPage() {
  return (
    <SimplePage title="Terms of Service">
      <p className="text-ink-muted mt-4">
        Replace this page with the client terms. Linked from the footer legal list for {site.name}.
      </p>
    </SimplePage>
  );
}
