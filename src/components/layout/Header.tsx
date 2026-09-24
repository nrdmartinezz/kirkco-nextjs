import Link from 'next/link';
import { Hexagon, Phone } from 'lucide-react';
import { navigation } from '@/config/navigation';
import { site } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { MegaMenu } from './MegaMenu';
import { MobileNav } from './MobileNav';

export function Header() {
  return (
    <header className="border-line-base bg-surface-base sticky top-0 z-50 w-full border-b">
      <Container as="div" layout="bar" gap="none" className="justify-between gap-4 py-4">
        <Link href="/" className="text-ink-base flex items-center gap-2 font-semibold no-underline">
          <Hexagon className="text-brand-600 size-7" aria-hidden="true" />
          <span>{site.name}</span>
        </Link>

        <MegaMenu />

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.business.phoneHref}`}
            className="text-ink-base hidden min-h-11 items-center gap-2 px-2 font-medium no-underline lg:inline-flex"
          >
            <Phone className="size-4" aria-hidden="true" />
            {site.business.phone}
          </a>

          {navigation.cta && (
            <Button href={navigation.cta.href} size="sm" className="max-md:hidden">
              {navigation.cta.label}
            </Button>
          )}

          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
