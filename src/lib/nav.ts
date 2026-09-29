import type { MegaColumn, NavItem, NavLink } from '@/config/navigation';

export type NestedLink = {
  link: NavLink;
  children: NavLink[];
};

/** Group links whose href is a longer path under another link in the same list. */
export function nestLinks(links: NavLink[]): NestedLink[] {
  const hrefs = links.map((link) => link.href);

  function parentHref(href: string) {
    return hrefs
      .filter((candidate) => candidate !== href && href.startsWith(`${candidate}/`))
      .sort((a, b) => b.length - a.length)[0];
  }

  return links
    .filter((link) => !parentHref(link.href))
    .map((link) => ({
      link,
      children: links.filter((other) => parentHref(other.href) === link.href),
    }));
}

/** The open mobile section for this URL, and the nested group inside it when one matches. */
export function matchingMobileSection(items: NavItem[], pathname: string) {
  for (const item of items) {
    if (!item.panel) continue;

    if (item.panel.kind === 'mega') {
      const column = item.panel.columns.find(
        (entry) =>
          (entry.href ? isCurrentPath(pathname, entry.href) : false) ||
          entry.links.some((link) => isCurrentPath(pathname, link.href)),
      );
      if (column) return { label: item.label, group: megaColumnKey(column) };
      if (item.href && isCurrentPath(pathname, item.href)) return { label: item.label, group: null };
      continue;
    }

    const nested = nestLinks(item.panel.links);
    const parent = nested.find((node) => node.children.some((child) => isCurrentPath(pathname, child.href)));
    if (parent) return { label: item.label, group: parent.link.href };
    if (item.panel.links.some((link) => isCurrentPath(pathname, link.href))) {
      return { label: item.label, group: null };
    }
  }

  return null;
}

export function panelLinks(item: NavItem): NavLink[] {
  if (!item.panel) return [];
  return item.panel.kind === 'mega'
    ? item.panel.columns.flatMap((column) => column.links)
    : item.panel.links;
}

export function isCurrentPath(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

export function megaColumnKey(column: MegaColumn) {
  return column.heading ?? column.href ?? column.links[0]?.href ?? 'group';
}

/** The equipment group for this URL, or the first group when the path is elsewhere. */
export function matchingMegaColumn(columns: MegaColumn[], pathname: string) {
  return (
    columns.find(
      (column) =>
        (column.href ? isCurrentPath(pathname, column.href) : false) ||
        column.links.some((link) => isCurrentPath(pathname, link.href)),
    ) ?? columns[0]
  );
}
