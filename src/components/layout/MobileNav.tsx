'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Menu, X } from 'lucide-react';
import { navigation, type NavLink } from '@/config/navigation';
import { site } from '@/config/site';
import { isCurrentPath, matchingMobileSection, megaColumnKey, nestLinks } from '@/lib/nav';
import { cn } from '@/lib/cn';
import { QuoteCta } from '@/components/quote/QuoteCta';
import { Container } from '@/components/ui/Container';

const linkClass =
  'flex min-h-12 items-center gap-3 rounded-md px-2 text-base no-underline text-ink-base aria-[current=page]:text-ink-brand aria-[current=page]:font-medium';

function sectionId(label: string) {
  return `mobile-section-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

function NestedLinks({
  link,
  children,
  pathname,
  expanded,
  onToggle,
}: {
  link: NavLink;
  children: NavLink[];
  pathname: string;
  expanded: boolean;
  onToggle: () => void;
}) {
  if (children.length === 0) {
    return (
      <li>
        <Link
          href={link.href}
          aria-current={isCurrentPath(pathname, link.href) ? 'page' : undefined}
          className={cn(linkClass, 'pl-6 text-sm')}
        >
          {link.label}
        </Link>
      </li>
    );
  }

  const panelId = `mobile-nested-${link.href.replace(/[^a-z0-9]+/gi, '-')}`;

  return (
    <li>
      <div className="flex items-center">
        <Link
          href={link.href}
          aria-current={isCurrentPath(pathname, link.href) ? 'page' : undefined}
          className={cn(linkClass, 'flex-1 pl-6 text-sm font-semibold', expanded && 'text-brand-500')}
        >
          {link.label}
        </Link>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={onToggle}
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-md"
        >
          <span className="sr-only">
            {expanded ? 'Hide' : 'Show'} {link.label}
          </span>
          <ChevronRight aria-hidden className={cn('size-4 transition', expanded && 'rotate-90 text-brand-500')} />
        </button>
      </div>
      {expanded && (
        <ul id={panelId} className="pb-2">
          {children.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                aria-current={isCurrentPath(pathname, child.href) ? 'page' : undefined}
                className={cn(linkClass, 'pl-10 text-sm')}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const match = matchingMobileSection(navigation.primary, pathname);
    setOpenSection(match?.label ?? null);
    setOpenGroup(match?.group ?? null);
  }, [open, pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  function toggleSection(label: string) {
    if (openSection === label) {
      setOpenSection(null);
      setOpenGroup(null);
      return;
    }
    const match = matchingMobileSection(navigation.primary, pathname);
    setOpenSection(label);
    setOpenGroup(match?.label === label ? match.group : null);
  }

  function toggleGroup(key: string) {
    setOpenGroup((current) => (current === key ? null : key));
  }

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
                const expanded = openSection === item.label;
                const panelId = sectionId(item.label);
                const sectionClass = cn(
                  'flex min-h-12 flex-1 items-center rounded-md px-2 text-left text-base font-semibold',
                  expanded ? 'text-brand-500' : 'text-brand-700',
                );

                return (
                  <li key={item.label} className="border-line-base border-b">
                    <div className="flex items-center">
                      {item.href ? (
                        <Link
                          href={item.href}
                          aria-current={isCurrentPath(pathname, item.href) ? 'page' : undefined}
                          className={cn(sectionClass, 'no-underline')}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <button
                          type="button"
                          aria-expanded={expanded}
                          aria-controls={panelId}
                          onClick={() => toggleSection(item.label)}
                          className={cn(sectionClass, 'justify-between')}
                        >
                          {item.label}
                          <ChevronRight
                            aria-hidden
                            className={cn('size-4 transition', expanded && 'rotate-90 text-brand-500')}
                          />
                        </button>
                      )}
                      {item.href && (
                        <button
                          type="button"
                          aria-expanded={expanded}
                          aria-controls={panelId}
                          onClick={() => toggleSection(item.label)}
                          className="inline-flex size-11 shrink-0 items-center justify-center rounded-md"
                        >
                          <span className="sr-only">
                            {expanded ? 'Hide' : 'Show'} {item.label}
                          </span>
                          <ChevronRight
                            aria-hidden
                            className={cn('size-4 transition', expanded && 'rotate-90 text-brand-500')}
                          />
                        </button>
                      )}
                    </div>

                    {expanded && item.panel?.kind === 'mega' && (
                      <ul id={panelId} className="pb-2">
                        {item.panel.columns.map((column) => {
                          const key = megaColumnKey(column);
                          const groupOpen = openGroup === key;
                          const groupId = `mobile-${key.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                          return (
                            <li key={key}>
                              <div className="flex items-center">
                                {column.href ? (
                                  <Link
                                    href={column.href}
                                    aria-current={isCurrentPath(pathname, column.href) ? 'page' : undefined}
                                    className={cn(
                                      'flex min-h-12 flex-1 items-center rounded-md px-2 pl-6 text-sm font-semibold no-underline',
                                      groupOpen ? 'text-brand-500' : 'text-brand-700',
                                    )}
                                  >
                                    {column.heading}
                                  </Link>
                                ) : (
                                  <span className={cn('flex-1 px-2 pl-6 text-sm font-semibold', groupOpen && 'text-brand-500')}>
                                    {column.heading}
                                  </span>
                                )}
                                <button
                                  type="button"
                                  aria-expanded={groupOpen}
                                  aria-controls={groupId}
                                  onClick={() => toggleGroup(key)}
                                  className="inline-flex size-11 shrink-0 items-center justify-center rounded-md"
                                >
                                  <span className="sr-only">
                                    {groupOpen ? 'Hide' : 'Show'} {column.heading}
                                  </span>
                                  <ChevronRight
                                    aria-hidden
                                    className={cn('size-4 transition', groupOpen && 'rotate-90 text-brand-500')}
                                  />
                                </button>
                              </div>
                              {groupOpen && (
                                <ul id={groupId} className="pb-2">
                                  {column.links.map((link) => (
                                    <li key={link.href}>
                                      <Link
                                        href={link.href}
                                        aria-current={isCurrentPath(pathname, link.href) ? 'page' : undefined}
                                        className={cn(linkClass, 'pl-10 text-sm')}
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
                    )}

                    {expanded && item.panel?.kind === 'links' && (
                      <ul id={panelId} className="pb-2">
                        {nestLinks(item.panel.links).map((node) => (
                          <NestedLinks
                            key={node.link.href}
                            link={node.link}
                            pathname={pathname}
                            expanded={openGroup === node.link.href}
                            onToggle={() => toggleGroup(node.link.href)}
                          >
                            {node.children}
                          </NestedLinks>
                        ))}
                      </ul>
                    )}
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
