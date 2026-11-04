import type { Metadata } from 'next';
import { HomePage } from '@/components/home/HomePage';
import { site } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Meter Mix Dispensing | 1K & 2K Systems | Polyurethane Machines',
  description: site.description,
  titleExact: true,
  path: '/',
});

export default function Page() {
  return <HomePage />;
}
