'use client';

import { useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { BreadcrumbCrumb } from '@/lib/products';

export const EQUIPMENT_PATH_KEY = 'kirkco:equipment-page';

type Choice = {
  href: string;
  groupHref: string;
};

function matchingChoice(href: string, choices: Choice[]) {
  const exact = choices.findIndex((choice) => choice.href === href);
  if (exact >= 0) return exact;
  return choices.findIndex((choice) => choice.groupHref === href);
}

function pathFromReferrer(choices: Choice[]) {
  if (typeof document === 'undefined' || !document.referrer) return -1;
  try {
    const url = new URL(document.referrer);
    if (url.origin !== window.location.origin) return -1;
    return matchingChoice(url.pathname, choices);
  } catch {
    return -1;
  }
}

export function ProductBreadcrumb({ trails, choices }: { trails: BreadcrumbCrumb[][]; choices: Choice[] }) {
  const [index, setIndex] = useState(0);
  const trail = trails[index] ?? trails[0] ?? [];

  useLayoutEffect(() => {
    const fromReferrer = pathFromReferrer(choices);
    const saved = sessionStorage.getItem(EQUIPMENT_PATH_KEY);
    const fromSaved = saved ? matchingChoice(saved, choices) : -1;
    const next = fromReferrer >= 0 ? fromReferrer : fromSaved >= 0 ? fromSaved : 0;
    setIndex(next);
    const href = choices[next]?.href;
    if (href) sessionStorage.setItem(EQUIPMENT_PATH_KEY, href);
  }, [choices]);

  if (trail.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="w-full text-sm">
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-1">
        {trail.map((crumb, crumbIndex) => {
          const current = crumbIndex === trail.length - 1;
          return (
            <li key={`${crumb.name}-${crumbIndex}`} className="flex items-center gap-1">
              {crumbIndex > 0 && <ChevronRight aria-hidden className="text-ink-muted size-3 shrink-0" />}
              {crumb.href && !current ? (
                <Link href={crumb.href} className="text-brand-700 font-semibold no-underline hover:text-brand-500">
                  {crumb.name}
                </Link>
              ) : (
                <span className="text-brand-500 font-semibold" aria-current={current ? 'page' : undefined}>
                  {crumb.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function RememberEquipmentPage({ href }: { href: string }) {
  useLayoutEffect(() => {
    sessionStorage.setItem(EQUIPMENT_PATH_KEY, href);
  }, [href]);

  return null;
}
