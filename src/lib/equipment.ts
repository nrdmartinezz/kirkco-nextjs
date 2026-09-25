import { cache } from 'react';
import type { EquipmentPageContent } from '@/content/equipment/adhesives-sealants';
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

export const getEquipmentPage = cache(async (href: string) => {
  const { data, error } = await supabaseAnon().from('equipment_pages').select('*').eq('href', href).maybeSingle();
  if (error) throw new Error(error.message);
  return data ? toPage(data as EquipmentRow) : undefined;
});
