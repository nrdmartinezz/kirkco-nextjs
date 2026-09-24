'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { navigation } from '@/config/navigation';
import { site } from '@/config/site';
import { isCurrentPath, panelLinks } from '@/lib/nav';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

const linkClass =
  'flex min-h-12 items-center gap-3 rounded-md px-2 text-base no-underline text-ink-base aria-[current=page]:text-ink-brand aria-[current=page]:font-medium';

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="inline-flex size-11 items-center justify-center rounded-md hover:bg-neutral-100 lg:hidden"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
      </button>

      {open && (
        <div
          id="mobile-nav"
          className="bg-surface-base fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto overscroll-contain lg:hidden"
        >
          <Container as="nav" gap="none" aria-label="Mobile" className="py-4 pb-[max(2rem,env(safe-area-inset-bottom))]">
            <ul className="flex w-full flex-col">
              {navigation.primary.map((item) => {
                const sublinks = panelLinks(item);

                if (sublinks.length === 0) {
                  return (
                    <li key={item.label} className="border-line-base border-b">
                      <Link
                        href={item.href ?? '/'}
                        aria-current={item.href && isCurrentPath(pathname, item.href) ? 'page' : undefined}
                        className={linkClass}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={item.label} className="border-line-base border-b">
                    {item.href && (
                      <Link
                        href={item.href}
                        aria-current={isCurrentPath(pathname, item.href) ? 'page' : undefined}
                        className={cn(linkClass, 'font-semibold')}
                      >
                        {item.label}
                      </Link>
                    )}
                    <ul className="pb-2">
                      {sublinks.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            aria-current={isCurrentPath(pathname, link.href) ? 'page' : undefined}
                            className={cn(linkClass, 'pl-6 text-sm')}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`tel:${site.business.phoneHref}`}
                className="text-ink-base inline-flex min-h-11 items-center font-medium no-underline"
              >
                {site.business.phone}
              </a>
              {navigation.cta && (
                <Button href={navigation.cta.href} className="w-full">
                  {navigation.cta.label}
                </Button>
              )}
            </div>
          </Container>
        </div>
      )}
    </>
  );
}
