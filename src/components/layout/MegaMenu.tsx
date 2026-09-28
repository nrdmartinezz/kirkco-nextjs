'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState, type FocusEvent, type MouseEvent } from 'react';
import { navigation, type MegaColumn, type NavItem } from '@/config/navigation';
import { isCurrentPath, matchingMegaColumn, megaColumnKey, panelLinks } from '@/lib/nav';
import { cn } from '@/lib/cn';

const productPanelId = 'products-systems-panel';

function ProductSystemsMenu({ columns, pathname }: { columns: MegaColumn[]; pathname: string }) {
  const matched = matchingMegaColumn(columns, pathname);
  const [activeKey, setActiveKey] = useState(() => megaColumnKey(matched));

  useEffect(() => {
    setActiveKey(megaColumnKey(matchingMegaColumn(columns, pathname)));
  }, [columns, pathname]);

  const active = columns.find((column) => megaColumnKey(column) === activeKey) ?? columns[0];

  return (
    <div className="grid grid-cols-[minmax(14rem,16rem)_minmax(0,1fr)]">
      <ul className="border-brand-100 flex flex-col border-r pr-2">
        {columns.map((column) => {
          const key = megaColumnKey(column);
          const selected = key === megaColumnKey(active);
          return (
            <li key={key}>
              {column.href ? (
                <Link
                  href={column.href}
                  aria-expanded={selected}
                  aria-controls={productPanelId}
                  aria-current={isCurrentPath(pathname, column.href) ? 'page' : undefined}
                  onMouseEnter={() => setActiveKey(key)}
                  onFocus={() => setActiveKey(key)}
                  className={cn(
                    'flex w-full items-center gap-1.5 rounded-md px-2 py-2 text-left font-semibold no-underline',
                    selected ? 'text-brand-500' : 'text-brand-700 hover:text-brand-500',
                  )}
                >
                  {selected && <ChevronRight aria-hidden className="size-4 shrink-0" />}
                  {column.heading}
                </Link>
              ) : (
                <button
                  type="button"
                  aria-expanded={selected}
                  aria-controls={productPanelId}
                  onMouseEnter={() => setActiveKey(key)}
                  onFocus={() => setActiveKey(key)}
                  className={cn(
                    'flex w-full items-center gap-1.5 rounded-md px-2 py-2 text-left font-semibold',
                    selected ? 'text-brand-500' : 'text-brand-700 hover:text-brand-500',
                  )}
                >
                  {selected && <ChevronRight aria-hidden className="size-4 shrink-0" />}
                  {column.heading}
                </button>
              )}
            </li>
          );
        })}
      </ul>
      <div id={productPanelId} className="pl-4">
        {active.href && active.heading && (
          <Link href={active.href} className="text-brand-700 px-2 font-semibold no-underline hover:text-brand-500">
            {active.heading}
          </Link>
        )}
        <ul className="mt-1 flex flex-col">
          {active.links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:bg-neutral-100 block rounded-md px-2 py-2 no-underline">
                <span className="text-ink-base block font-medium">{link.label}</span>
                {link.description && <span className="text-ink-muted block text-sm">{link.description}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function closeOnLink(event: MouseEvent, close: () => void) {
  if ((event.target as HTMLElement).closest('a')) close();
}

function NavDropdown({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false);
  const dismissed = useRef(false);
  const sublinks = panelLinks(item);
  const current = item.href ? isCurrentPath(pathname, item.href) : false;
  const mega = item.panel?.kind === 'mega';

  function show() {
    if (dismissed.current) return;
    setOpen(true);
  }

  function hide() {
    setOpen(false);
  }

  function dismiss() {
    dismissed.current = true;
    setOpen(false);
  }

  function onBlur(event: FocusEvent<HTMLDivElement>) {
    if (event.currentTarget.contains(event.relatedTarget)) return;
    dismissed.current = false;
    hide();
  }

  return (
    <div
      className="relative"
      onMouseEnter={show}
      onMouseLeave={() => {
        dismissed.current = false;
        hide();
      }}
      onFocus={show}
      onBlur={onBlur}
      onClick={(event) => closeOnLink(event, dismiss)}
    >
      {item.href ? (
        <Link
          href={item.href}
          aria-current={current ? 'page' : undefined}
          aria-expanded={open}
          className={cn(
            'inline-flex min-h-11 items-center rounded-md px-3 font-medium no-underline',
            current ? 'text-ink-brand' : 'text-ink-base hover:bg-neutral-100',
          )}
        >
          {item.label}
        </Link>
      ) : (
        <span className="text-ink-base inline-flex min-h-11 items-center rounded-md px-3 font-medium">{item.label}</span>
      )}

      <div
        className={cn(
          'absolute top-full z-50 pt-2 transition left-1/2 -translate-x-1/2',
          open ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      >
        <div
          className={cn(
            'border-line-base bg-surface-base max-h-[70vh] overflow-y-auto rounded-lg border p-3 shadow-lg',
            mega ? 'w-[min(42rem,calc(100vw-2rem))]' : 'min-w-64',
          )}
        >
          {item.panel?.kind === 'mega' ? (
            <ProductSystemsMenu columns={item.panel.columns} pathname={pathname} />
          ) : (
            <div className="flex flex-col">
              {sublinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:bg-neutral-100 rounded-md px-2 py-2 no-underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function MegaMenu() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
      {navigation.primary.map((item) => {
        const sublinks = panelLinks(item);
        const current = item.href ? isCurrentPath(pathname, item.href) : false;

        if (sublinks.length === 0) {
          return (
            <Link
              key={item.label}
              href={item.href ?? '/'}
              aria-current={current ? 'page' : undefined}
              className={cn(
                'inline-flex min-h-11 items-center rounded-md px-3 font-medium no-underline',
                current ? 'text-ink-brand' : 'text-ink-base hover:bg-neutral-100',
              )}
            >
              {item.label}
            </Link>
          );
        }

        return <NavDropdown key={item.label} item={item} pathname={pathname} />;
      })}
    </nav>
  );
}
