import type { NavItem, NavLink } from '@/config/navigation';

export function panelLinks(item: NavItem): NavLink[] {
  if (!item.panel) return [];
  return item.panel.kind === 'mega'
    ? item.panel.columns.flatMap((column) => column.links)
    : item.panel.links;
}

export function isCurrentPath(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}
