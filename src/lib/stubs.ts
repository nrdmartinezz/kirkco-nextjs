import { navigation, type NavItem } from '@/config/navigation';
import { panelLinks } from '@/lib/nav';

const extras: Record<string, string> = {
  '/quote': 'Get a Quote',
  '/contact-us': 'Contact Us',
  '/equipment-options': 'Equipment Options',
  '/equipment-options/adhesives-sealants': 'Adhesives & Sealants',
  '/equipment-options/composites': 'Composites',
  '/equipment-options/lubrication': 'Lubrication',
  '/equipment-options/paint-coatings': 'Paint & Coatings',
  '/equipment-options/process-control': 'Process Control',
  '/equipment-options/polyurethane-processing-equipment': 'Polyurethane Processing Equipment',
};

function addItem(map: Record<string, string>, item: NavItem) {
  if (item.href) map[item.href] = item.label;
  if (item.panel?.kind === 'mega') {
    for (const column of item.panel.columns) {
      if (column.href && column.heading) map[column.href] = column.heading;
    }
  }
  for (const link of panelLinks(item)) {
    map[link.href] = link.label;
  }
}

export function stubTitles() {
  const map: Record<string, string> = { ...extras };
  for (const item of navigation.primary) addItem(map, item);
  for (const group of navigation.footer) {
    for (const link of group.links) map[link.href] = link.label;
  }
  return map;
}
