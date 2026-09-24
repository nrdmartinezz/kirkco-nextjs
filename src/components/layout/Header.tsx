import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import { navigation } from '@/config/navigation';
import { site } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { MegaMenu } from './MegaMenu';
import { MobileNav } from './MobileNav';

export function Header() {
  return (
    <>
    <div className="bg-brand-900 text-[12px] text-white">
      <Container as="div" layout="bar" gap="none" className="justify-between gap-4 py-2">
        <p className="truncate text-white/90">{site.tagline}</p>
        <ul className="flex shrink-0 items-center gap-4">
          <li>
            <a href={`tel:${site.business.phoneHref}`} className="inline-flex items-center gap-1.5 no-underline hover:text-brand-100">
              <Phone className="size-3" aria-hidden="true" />
              {site.business.phone}
            </a>
          </li>
          <li className="hidden sm:block">
            <a href={`mailto:${site.business.email}`} className="inline-flex items-center gap-1.5 no-underline hover:text-brand-100">
              <Mail className="size-3" aria-hidden="true" />
              {site.business.email}
            </a>
          </li>
        </ul>
      </Container>
    </div>
    <header className="border-line-base bg-surface-base sticky top-0 z-50 w-full border-b shadow-sm">
      <Container as="div" layout="bar" gap="none" className="justify-between gap-4 py-3">
        <Link href="/" className="shrink-0 no-underline">
          <Image src="/images/logo.jpg" alt={site.name} width={150} height={50} priority className="h-12 w-auto" />
        </Link>

        <MegaMenu />

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.business.phoneHref}`}
            className="text-brand-700 hidden min-h-11 items-center gap-2 px-2 text-sm font-semibold no-underline xl:inline-flex"
          >
            <Phone className="size-4" aria-hidden="true" />
            {site.business.phone}
          </a>

          {navigation.cta && (
            <Button href={navigation.cta.href} size="sm" className="max-lg:hidden rounded-full px-5">
              {navigation.cta.label}
            </Button>
          )}

          <MobileNav />
        </div>
      </Container>
    </header>
    </>
  );
}
