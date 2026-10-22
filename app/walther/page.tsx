import type { Metadata } from 'next';
import { WaltherPage } from '@/components/walther/WaltherPage';
import { buildMetadata } from '@/lib/seo';

const description =
  'Kirkco is the U.S. partner for Walther Systemtechnik GmbH of Germersheim: dosing technology that conveys, dispenses, and applies oils, greases, adhesives, and other industrial media, with domestic parts and application support.';

export const metadata: Metadata = buildMetadata({
  title: 'Walther Systemtechnik Products, Parts & U.S. Support | Kirkco',
  description,
  titleExact: true,
  path: '/walther',
  image: '/images/walther/hero.jpg',
  imageAlt: 'Walther Systemtechnik dosing cell with a linear axis, valves, and safety guarding',
});

export default function Page() {
  return <WaltherPage />;
}
