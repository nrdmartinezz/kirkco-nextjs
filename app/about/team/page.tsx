import type { Metadata } from 'next';
import { SimplePage } from '@/components/ui/SimplePage';
import { site } from '@/config/site';

export const metadata: Metadata = { title: 'The Team' };

export default function TeamPage() {
  return (
    <SimplePage title="The Team">
      <p className="text-ink-muted mt-4">
        Add team members here. The business identity still lives in{' '}
        <code className="text-ink-base">src/config/site.ts</code> ({site.name}).
      </p>
    </SimplePage>
  );
}
