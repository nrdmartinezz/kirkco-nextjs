import type { Metadata } from 'next';
import { AbnoxPage } from '@/components/abnox/AbnoxPage';
import { buildMetadata } from '@/lib/seo';

const description =
  'Kirkco Corporation is an official U.S. distributor for ABNOX products, with a domestic path to product selection, application review, replacement parts, system integration, and support.';

export const metadata: Metadata = buildMetadata({
  title: 'ABNOX Products, Parts & U.S. Support | Kirkco',
  description,
  titleExact: true,
  path: '/abnox',
  image: '/images/abnox/hero.jpg',
  imageAlt: 'ABNOX metering valves dispensing onto a production fixture',
});

export default function Page() {
  return <AbnoxPage />;
}
