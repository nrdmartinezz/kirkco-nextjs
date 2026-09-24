import type { Metadata } from 'next';
import { HomePage } from '@/components/home/HomePage';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Meter Mix Dispensing | 1K & 2K Systems | Polyurethane Machines',
  description: site.description,
};

export default function Page() {
  return <HomePage />;
}
