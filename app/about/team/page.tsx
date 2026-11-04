import type { Metadata } from 'next';
import { SimplePage } from '@/components/ui/SimplePage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'The Team',
  description: 'Team page placeholder for Kirkco Corporation.',
  path: '/about/team',
  noindex: true,
});

export default function TeamPage() {
  return (
    <SimplePage title="The Team">
      <p className="text-ink-muted mt-4">
        Add team members here. The company story is on the about page.
      </p>
    </SimplePage>
  );
}
