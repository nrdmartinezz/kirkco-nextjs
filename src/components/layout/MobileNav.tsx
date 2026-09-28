'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Menu, X } from 'lucide-react';
import { navigation } from '@/config/navigation';
import { site } from '@/config/site';
import { isCurrentPath, matchingMegaColumn, megaColumnKey, panelLinks } from '@/lib/nav';
import { cn } from '@/lib/cn';
import { QuoteCta } from '@/components/quote/QuoteCta';
import { Container } from '@/components/ui/Container';

const linkClass =
  'flex min-h-12 items-center gap-3 rounded-md px-2 text-base no-underline text-ink-base aria-[current=page]:text-ink-brand aria-[current=page]:font-medium';

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const products = navigation.primary.find((item) => item.panel?.kind === 'mega');
    const panel = products?.panel;
    if (!panel || panel.kind !== 'mega') return;
    const matched = matchingMegaColumn(panel.columns, pathname);
    const onGroup =
      (matched.href ? isCurrentPath(pathname, matched.href) : false) ||
      matched.links.some((link) => isCurrentPath(pathname, link.href));
    setOpenGroup(onGroup ? megaColumnKey(matched) : null);
  }, [open, pathname]);

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
          <Container
            as="nav"
            gap="none"
            aria-label="Mobile"
            className="py-4 pb-[max(2rem,env(safe-area-inset-bottom))]"
            onClick={(event) => {
              if ((event.target as HTMLElement).closest('a')) setOpen(false);
            }}
          >
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

                if (item.panel?.kind === 'mega') {
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
                        {item.panel.columns.map((column) => {
                          const key = megaColumnKey(column);
                          const expanded = openGroup === key;
                          const panelId = `mobile-${key}`;
                          return (
                            <li key={key}>
                              <div className="flex items-center">
                                {column.href ? (
                                  <Link
                                    href={column.href}
                                    aria-current={isCurrentPath(pathname, column.href) ? 'page' : undefined}
                                    className={cn(
                                      'flex min-h-12 flex-1 items-center gap-1.5 rounded-md px-2 text-base font-semibold no-underline',
                                      expanded ? 'text-brand-500' : 'text-brand-700',
                                    )}
                                  >
                                    {column.heading}
                                  </Link>
                                ) : (
                                  <span className={cn('flex-1 px-2 font-semibold', expanded && 'text-brand-500')}>
                                    {column.heading}
                                  </span>
                                )}
                                <button
                                  type="button"
                                  aria-expanded={expanded}
                                  aria-controls={panelId}
                                  onClick={() => setOpenGroup(expanded ? null : key)}
                                  className="inline-flex size-11 shrink-0 items-center justify-center rounded-md"
                                >
                                  <span className="sr-only">
                                    {expanded ? 'Hide' : 'Show'} {column.heading}
                                  </span>
                                  <ChevronRight
                                    aria-hidden
                                    className={cn('size-4 transition', expanded && 'rotate-90 text-brand-500')}
                                  />
                                </button>
                              </div>
                              {expanded && (
                                <ul id={panelId} className="pb-2">
                                  {column.links.map((link) => (
                                    <li key={link.href}>
                                      <Link
                                        href={link.href}
                                        aria-current={isCurrentPath(pathname, link.href) ? 'page' : undefined}
                                        className={cn(linkClass, 'pl-8 text-sm')}
                                      >
                                        {link.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          );
                        })}
                      </ul>
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
              {navigation.cta && <QuoteCta className="w-full" />}
            </div>
          </Container>
        </div>
      )}
    </>
  );
}
