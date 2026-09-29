import type { EquipmentLink } from '@/content/equipment/adhesives-sealants';

export type EquipmentSubcategoryGroup = {
  title: string;
  intro: string;
  body: string;
  names: string[];
};

export type EquipmentSubcategorySection = {
  heading: string;
  paragraphs: string[];
};

/** Subcategory equipment pages (Single Component pattern). */
export type EquipmentSubcategoryContent = {
  href: string;
  title: string;
  description: string;
  /** Parent group page (for hero image and sidebar context). */
  parentHref: string;
  parentLabel: string;
  breadcrumbLeaf: string;
  /** Category slug for extra catalog products not listed on the live page. */
  categorySlug?: string;
  overview: string;
  groups: EquipmentSubcategoryGroup[];
  /** Inline architecture cards when no applicationIds. */
  sections?: EquipmentSubcategorySection[];
  /** Application study cards (Adhesives parent pattern). */
  applicationIds?: string[];
};

export type EquipmentSubcategoryHero = {
  heroImage: string;
  heroAlt: string;
};

export function subcategoryBreadcrumb(page: EquipmentSubcategoryContent): EquipmentLink[] {
  return [
    { label: 'Home', href: '/' },
    { label: 'Equipment Options', href: '/equipment-options' },
    { label: page.parentLabel, href: page.parentHref },
    { label: page.breadcrumbLeaf },
  ];
}
