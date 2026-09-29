import type { EquipmentPageContent } from '@/content/equipment/adhesives-sealants';
import { adhesivesSealants } from '@/content/equipment/adhesives-sealants';
import groupPagesJson from '@/content/equipment/generated/group-pages.json';
import subcategoryPagesJson from '@/content/equipment/generated/subcategory-pages.json';
import { singleComponent } from '@/content/equipment/single-component';
import type { EquipmentSubcategoryContent } from '@/content/equipment/types';

const groupPages = groupPagesJson as Record<string, EquipmentPageContent>;
const generatedSubcategories = subcategoryPagesJson as Record<string, EquipmentSubcategoryContent>;

const subcategoryPages: Record<string, EquipmentSubcategoryContent> = {
  ...generatedSubcategories,
  [singleComponent.href]: {
    ...singleComponent,
    parentHref: '/equipment-options/adhesives-sealants',
    parentLabel: 'Adhesives & Sealants',
    breadcrumbLeaf: 'Single Component',
    categorySlug: 'single-component',
  },
};

export function getLocalEquipmentPage(href: string): EquipmentPageContent | undefined {
  if (href === adhesivesSealants.href) return adhesivesSealants;
  return groupPages[href];
}

export function getEquipmentSubcategoryPage(href: string): EquipmentSubcategoryContent | undefined {
  return subcategoryPages[href];
}

export function allEquipmentSubcategoryHrefs() {
  return Object.keys(subcategoryPages);
}
