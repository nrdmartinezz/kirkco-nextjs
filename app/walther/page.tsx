import type { Metadata } from 'next';
import { WaltherPage } from '@/components/walther/WaltherPage';
import { buildMetadata } from '@/lib/seo';

const description =
  'Kirkco Corporation is an official U.S. partner and distributor for Walther Systemtechnik products, with a domestic path to product selection, application review, replacement parts, system integration, and support.';

export const metadata: Metadata = buildMetadata({
  title: 'Walther Products, Parts & U.S. Support | Kirkco',
  description,
  titleExact: true,
  path: '/walther',
  image: '/images/walther/hero.jpg',
  imageAlt: 'Walther lubrication line with a linear axis, dosing valves, and safety guarding',
});

export default function Page() {
  return <WaltherPage />;
}
