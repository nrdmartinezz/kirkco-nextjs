import type { EquipmentSubcategoryHero } from '@/content/equipment/types';

/**
 * Banner for each equipment page. To swap a photo, put the file in
 * public/images/equipment/ and change that page's heroImage (and heroAlt).
 * Each page is independent: a parent photo is not used by its children.
 */
export const equipmentHeroes: Record<string, EquipmentSubcategoryHero> = {
  // Adhesives & Sealants
  '/equipment-options/adhesives-sealants': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Adhesives and sealants equipment on a production line',
  },
  '/equipment-options/adhesives-sealants/single-component': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Single-component adhesive and sealant dispensing equipment',
  },
  '/equipment-options/adhesives-sealants/single-component/dispensing-valves': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Single-component dispensing valves',
  },
  '/equipment-options/adhesives-sealants/single-component/metering-valves': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Adhesive and sealant metering and dispensing equipment',
  },
  '/equipment-options/adhesives-sealants/single-component/pumps-and-packages': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Pumps and packages for single-component dispensing',
  },
  '/equipment-options/adhesives-sealants/two-component': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Two-component adhesive metering and mixing systems',
  },
  '/equipment-options/adhesives-sealants/two-component/gear-metering': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Gear metering equipment for two-component adhesives',
  },
  '/equipment-options/adhesives-sealants/two-component/gear-metering/conti-flow': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Conti-Flow gear metering equipment',
  },
  '/equipment-options/adhesives-sealants/two-component/lsr-processing-equipment': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'LSR processing equipment',
  },
  '/equipment-options/adhesives-sealants/two-component/mixing-valves': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Mixing valves for two-component adhesives',
  },
  '/equipment-options/adhesives-sealants/two-component/piston-metering': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Piston metering equipment for two-component adhesives',
  },
  '/equipment-options/adhesives-sealants/two-component/shot-metering': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Shot metering equipment for two-component adhesives',
  },
  '/equipment-options/adhesives-sealants/tooling-paste-seamless-modeling-paste': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Tooling paste and seamless modeling paste systems',
  },
  '/equipment-options/adhesives-sealants/smc-imc-molding': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'SMC molding and in-mold coating equipment',
  },
  '/equipment-options/adhesives-sealants/putty-paste': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'High-viscosity putty and paste dispensing systems',
  },

  // Composites
  '/equipment-options/composites': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Composites application systems on a production line',
  },
  '/equipment-options/composites/closed-mold-technology': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Closed mold composites equipment',
  },
  '/equipment-options/composites/closed-mold-technology/resin-injection-molding': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Resin injection molding equipment',
  },
  '/equipment-options/composites/closed-mold-technology/resin-transfer-molding': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Resin transfer molding equipment',
  },
  '/equipment-options/composites/closed-mold-technology/vacuum-infusion-molding': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Vacuum infusion molding equipment',
  },
  '/equipment-options/composites/filament-winding': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Filament winding equipment',
  },
  '/equipment-options/composites/open-mold-technology': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Open mold composites equipment',
  },
  '/equipment-options/composites/open-mold-technology/chopping-lamination': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Chopping and lamination equipment',
  },
  '/equipment-options/composites/open-mold-technology/gel-coat': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Gel coat equipment',
  },
  '/equipment-options/composites/pull-winding': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Pull winding equipment',
  },
  '/equipment-options/composites/pultrusion': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Pultrusion equipment',
  },

  // Lubrication
  '/equipment-options/lubrication': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Precision lubrication and grease metering systems',
  },
  '/equipment-options/lubrication/metering': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Lubrication system metering equipment',
  },
  '/equipment-options/lubrication/dispensing': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Industrial lubrication dispensing systems',
  },
  '/equipment-options/lubrication/feeding-and-supply': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Lubricant feeding and supply systems',
  },
  '/equipment-options/lubrication/pressure-control': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Lubrication pressure control equipment',
  },
  '/equipment-options/lubrication/flow-regulation': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Lubrication flow regulation equipment',
  },
  '/equipment-options/lubrication/degassing': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Advanced degassing station for grease and high-viscosity lubricants',
  },

  // Paint & Coatings
  '/equipment-options/paint-coatings': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Paint and coatings equipment on a production line',
  },
  '/equipment-options/paint-coatings/protective-coatings': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Protective coatings equipment',
  },
  '/equipment-options/paint-coatings/specialty-finishes': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Specialty finishes and coating materials',
  },
  '/equipment-options/paint-coatings/spray-systems': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Spray systems for paint and coatings',
  },
  '/equipment-options/paint-coatings/spray-systems/automatic-spray-applications': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Automatic spray application equipment',
  },
  '/equipment-options/paint-coatings/spray-systems/manual-spray-applications': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Manual spray application equipment',
  },

  // Process Control
  '/equipment-options/process-control': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Process control equipment on a production line',
  },
  '/equipment-options/process-control/integration-automation': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Integration and automation equipment',
  },
  '/equipment-options/process-control/monitoring-analytics': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Monitoring and analytics equipment',
  },
  '/equipment-options/process-control/process-control-computer': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Process control computer equipment',
  },

  // Polyurethane
  '/equipment-options/polyurethane-processing-equipment': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Industrial polyurethane processing equipment',
  },
  '/equipment-options/polyurethane-processing-equipment/high-pressure-metering': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'High-pressure polyurethane metering systems',
  },
  '/equipment-options/polyurethane-processing-equipment/low-pressure-metering': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Low-pressure polyurethane metering equipment',
  },
  '/equipment-options/polyurethane-processing-equipment/pentane-capable-metering-machines': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Pentane-capable polyurethane metering machines',
  },
  '/equipment-options/polyurethane-processing-equipment/urethane-foam-mixing-guns': {
    heroImage: '/images/equipment-hero.webp',
    heroAlt: 'Urethane foam mixing guns',
  },
};

/** Used when a page is not listed above. */
export const defaultEquipmentHero: EquipmentSubcategoryHero = {
  heroImage: '/images/equipment-hero.webp',
  heroAlt: 'Kirkco dispensing equipment on a production line',
};

/** Hero for one equipment page. Falls back to `fallback`, then the shared default. */
export function heroForEquipmentPage(href: string, fallback?: EquipmentSubcategoryHero): EquipmentSubcategoryHero {
  return equipmentHeroes[href] ?? fallback ?? defaultEquipmentHero;
}
