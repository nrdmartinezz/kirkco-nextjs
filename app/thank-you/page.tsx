import type { Metadata } from 'next';
import { SimplePage } from '@/components/ui/SimplePage';
import { site } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Thank you',
  description: `Kirkco Corporation received your message and will reply from ${site.business.email}.`,
  path: '/thank-you',
  noindex: true,
});

export default function ThankYouPage() {
  return (
    <SimplePage title="Thank you">
      <p className="text-ink-muted mt-4">
        We received your message and will get back to you from {site.business.email}.
      </p>
    </SimplePage>
  );
}
