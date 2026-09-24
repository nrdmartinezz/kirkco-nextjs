import type { Metadata } from 'next';
import { SimplePage } from '@/components/ui/SimplePage';
import { site } from '@/config/site';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <SimplePage title="Privacy Policy">
      <p className="text-ink-muted mt-4">
        Replace this page with the client policy. It is linked from{' '}
        <code className="text-ink-base">src/config/navigation.ts</code> and branded as {site.name}.
      </p>
    </SimplePage>
  );
}
