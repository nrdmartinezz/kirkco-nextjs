import type { MegaColumn, NavItem, NavLink } from '@/config/navigation';

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
