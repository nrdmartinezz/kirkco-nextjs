import type { Metadata } from 'next';
import { SimplePage } from '@/components/ui/SimplePage';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: 'About',
  description: site.description,
};

export default function AboutPage() {
  return (
    <SimplePage title={`About ${site.name}`}>
      <p className="text-ink-muted mt-4">{site.description}</p>
    </SimplePage>
  );
}
