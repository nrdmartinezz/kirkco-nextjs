import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Get a Quote',
  description: `Request a quote from ${site.name}.`,
};

export default function RequestQuotePage() {
  redirect('/quote');
}
