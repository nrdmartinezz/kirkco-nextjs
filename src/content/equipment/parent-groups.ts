import type { EquipmentSubcategoryHero } from '@/content/equipment/types';
import { adhesivesSealants } from '@/content/equipment/adhesives-sealants';

/** Shared factory hero until group-specific photography is added. */
const defaultHero: EquipmentSubcategoryHero = {
  heroImage: adhesivesSealants.heroImage,
  heroAlt: adhesivesSealants.heroAlt,
};

export const equipmentParentGroups: Record<
  string,
  EquipmentSubcategoryHero & { label: string }
> = {
  '/equipment-options/adhesives-sealants': { label: 'Adhesives & Sealants', ...defaultHero },
  '/equipment-options/composites': { label: 'Composites', ...defaultHero },
  '/equipment-options/lubrication': { label: 'Lubrication', ...defaultHero },
  '/equipment-options/paint-coatings': { label: 'Paint & Coatings', ...defaultHero },
  '/equipment-options/process-control': { label: 'Process Control', ...defaultHero },
  '/equipment-options/polyurethane-processing-equipment': { label: 'Polyurethane', ...defaultHero },
};

export function heroForParent(parentHref: string): EquipmentSubcategoryHero & { label: string } {
  return equipmentParentGroups[parentHref] ?? { label: 'Equipment Options', ...defaultHero };
}
