import type { Metadata } from 'next';
import { SimplePage } from '@/components/ui/SimplePage';
import { site } from '@/config/site';

export const metadata: Metadata = { title: 'Thank you' };

export default function ThankYouPage() {
  return (
    <SimplePage title="Thank you">
      <p className="text-ink-muted mt-4">
        We received your message and will get back to you from {site.business.email}.
      </p>
    </SimplePage>
  );
}
