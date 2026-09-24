'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from '@/config/navigation';
import { isCurrentPath, panelLinks } from '@/lib/nav';
import { cn } from '@/lib/cn';

export function MegaMenu() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
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

        return (
          <div key={item.label} className="group relative">
            {item.href ? (
              <Link
                href={item.href}
                aria-current={current ? 'page' : undefined}
                className={cn(
                  'inline-flex min-h-11 items-center rounded-md px-3 font-medium no-underline',
                  current ? 'text-ink-brand' : 'text-ink-base hover:bg-neutral-100',
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-ink-base inline-flex min-h-11 items-center rounded-md px-3 font-medium">
                {item.label}
              </span>
            )}

            <div className="invisible absolute top-full left-0 z-50 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="border-line-base bg-surface-base min-w-64 rounded-lg border p-3 shadow-md">
                {item.panel?.kind === 'mega' ? (
                  <div className="flex gap-6">
                    {item.panel.columns.map((column) => (
                      <div key={column.heading ?? column.links[0]?.href} className="flex min-w-44 flex-col gap-1">
                        {column.heading && (
                          <p className="text-ink-muted px-2 text-xs font-semibold tracking-wide uppercase">
                            {column.heading}
                          </p>
                        )}
                        {column.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="hover:bg-neutral-100 rounded-md px-2 py-2 no-underline"
                          >
                            <span className="text-ink-base block font-medium">{link.label}</span>
                            {link.description && (
                              <span className="text-ink-muted block text-sm">{link.description}</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    ))}
                    {item.panel.featured && (
                      <div className="bg-surface-muted max-w-56 rounded-md p-4">
                        <p className="font-semibold">{item.panel.featured.title}</p>
                        <p className="text-ink-muted mt-1 text-sm">{item.panel.featured.body}</p>
                        <Link
                          href={item.panel.featured.href}
                          className="text-ink-brand mt-3 inline-flex font-medium no-underline"
                        >
                          {item.panel.featured.cta}
                        </Link>
                      </div>
                    )}
                  </div>
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
      })}
    </nav>
  );
}
