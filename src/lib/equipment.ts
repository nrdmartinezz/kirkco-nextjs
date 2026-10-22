import { cache } from 'react';
import type { EquipmentPageContent } from '@/content/equipment/adhesives-sealants';
import { subcategoryBreadcrumb } from '@/content/equipment/types';
import { getEquipmentSubcategoryPage, getLocalEquipmentPage } from '@/lib/equipment-content';
import type { BreadcrumbCrumb } from '@/lib/products';
import { supabaseAnon } from '@/lib/supabase';

type EquipmentRow = {
  href: string;
  title: string;
  description: string;
  breadcrumb: EquipmentPageContent['breadcrumb'];
  hero_image: string;
  hero_alt: string;
  overview_image: string;
  overview_image_alt: string;
  overview_heading: string;
  overview: string[];
  systems: EquipmentPageContent['systems'];
  engagement_heading: string;
  engagement_body: string;
  platforms_heading: string;
  platforms: EquipmentPageContent['platforms'];
  architectures: EquipmentPageContent['architectures'];
  application_ids: string[];
  closing: string;
};

function toPage(row: EquipmentRow): EquipmentPageContent {
  return {
    href: row.href,
    title: row.title,
    description: row.description,
    breadcrumb: row.breadcrumb,
    heroImage: row.hero_image,
    heroAlt: row.hero_alt,
    overviewImage: row.overview_image,
    overviewImageAlt: row.overview_image_alt,
    overviewHeading: row.overview_heading,
    overview: row.overview,
    systems: row.systems,
    engagementHeading: row.engagement_heading,
    engagementBody: row.engagement_body,
    platformsHeading: row.platforms_heading,
    platforms: row.platforms,
    architectures: row.architectures,
    applicationIds: row.application_ids,
    closing: row.closing,
  };
}

function toCrumbs(links: { label: string; href?: string }[], pageHref: string): BreadcrumbCrumb[] {
  return links.map((link, index) => ({
    name: link.label,
    href: link.href ?? (index === links.length - 1 ? pageHref : undefined),
  }));
}

/** Crumbs for a known equipment or subcategory page. Unknown hrefs are ignored. */
export async function equipmentOriginTrail(href: string): Promise<BreadcrumbCrumb[] | undefined> {
  const subcategory = getEquipmentSubcategoryPage(href);
  if (subcategory) return toCrumbs(subcategoryBreadcrumb(subcategory), subcategory.href);

  const equipment = await getEquipmentPage(href);
  if (!equipment) return undefined;
  return toCrumbs(equipment.breadcrumb, equipment.href);
}

export const getEquipmentPage = cache(async (href: string) => {
  const local = getLocalEquipmentPage(href);
  if (local) return local;
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) return undefined;

  const { data, error } = await supabaseAnon().from('equipment_pages').select('*').eq('href', href).maybeSingle();
  if (error) throw new Error(error.message);
  return data ? toPage(data as EquipmentRow) : undefined;
});
