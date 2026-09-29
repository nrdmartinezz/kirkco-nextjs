import type { Metadata } from 'next';
import { AboutUsPage } from '@/components/about/AboutUsPage';
import { buildMetadata } from '@/lib/seo';

const description =
  'Kirkco has engineered metering, mixing, and dispensing systems since 1985. We design vendor-agnostic, turnkey architectures and support them through installation, training, and lifecycle service.';

export const metadata: Metadata = buildMetadata({
  title: 'Kirkco Corporation | Systems Integrator & Process Engineering',
  description,
  titleExact: true,
  path: '/about-us',
  image: '/images/about/kirkco-about-us.jpg',
  imageAlt: 'Industrial robots assembling automotive body panels on a production line',
});

export default function Page() {
  return <AboutUsPage />;
}
