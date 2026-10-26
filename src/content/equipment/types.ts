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

export type EquipmentContentItem = {
  title: string;
  body: string;
};

/** Editorial blocks from a live process page: intro, labeled points, optional close. */
export type EquipmentContentBlock = {
  heading: string;
  subheading?: string;
  intro?: string;
  items?: EquipmentContentItem[];
  closing?: string;
  cta?: { label: string; href: string };
  image?: string;
  imageAlt?: string;
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
  /** Extra overview paragraphs when the live page has more than one. */
  overviewParagraphs?: string[];
  /** Subhead shown under the overview eyebrow when the live page leads with a long title. */
  overviewHeading?: string;
  overviewImage?: string;
  overviewImageAlt?: string;
  /** Primary in-content action, such as the live page quote button. */
  cta?: { label: string; href: string };
  /** Process copy that is not a product group. */
  contentBlocks?: EquipmentContentBlock[];
  /** Replaces the default engineering-engagement heading and body. */
  engagementHeading?: string;
  engagementBody?: string;
  engagementImage?: string;
  engagementImageAlt?: string;
  overviewImageWidth?: number;
  overviewImageHeight?: number;
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
