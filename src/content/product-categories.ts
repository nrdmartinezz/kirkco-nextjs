export type ProductCategory = {
  slug: string;
  name: string;
  href: string;
  group: string;
};

/** Equipment groups from the nav. Product records store these slugs. Seed source for Supabase. */
export const productCategories: ProductCategory[] = [
  { slug: 'adhesives-sealants', name: 'Adhesives & Sealants', href: '/equipment-options/adhesives-sealants', group: 'Adhesives & Sealants' },
  { slug: 'single-component', name: 'Single Component', href: '/equipment-options/adhesives-sealants/single-component', group: 'Adhesives & Sealants' },
  { slug: 'two-component', name: 'Two Component Systems (2k)', href: '/equipment-options/adhesives-sealants/two-component', group: 'Adhesives & Sealants' },
  { slug: 'putty-paste', name: 'Putty & Paste', href: '/equipment-options/adhesives-sealants/putty-paste', group: 'Adhesives & Sealants' },
  { slug: 'smc-imc-molding', name: 'SMC / IMC Molding', href: '/equipment-options/adhesives-sealants/smc-imc-molding', group: 'Adhesives & Sealants' },
  { slug: 'tooling-paste', name: 'Tooling Paste & Seamless Modeling Paste', href: '/equipment-options/adhesives-sealants/tooling-paste-seamless-modeling-paste', group: 'Adhesives & Sealants' },
  { slug: 'composites', name: 'Composites', href: '/equipment-options/composites', group: 'Composites' },
  { slug: 'closed-mold-technology', name: 'Closed Mold Technology', href: '/equipment-options/composites/closed-mold-technology', group: 'Composites' },
  { slug: 'filament-winding', name: 'Filament Winding', href: '/equipment-options/composites/filament-winding', group: 'Composites' },
  { slug: 'open-mold-technology', name: 'Open Mold Technology', href: '/equipment-options/composites/open-mold-technology', group: 'Composites' },
  { slug: 'pull-winding', name: 'Pull Winding', href: '/equipment-options/composites/pull-winding', group: 'Composites' },
  { slug: 'lubrication', name: 'Lubrication', href: '/equipment-options/lubrication', group: 'Lubrication' },
  { slug: 'metering', name: 'Metering', href: '/equipment-options/lubrication/metering', group: 'Lubrication' },
  { slug: 'pressure-control', name: 'Pressure Control', href: '/equipment-options/lubrication/pressure-control', group: 'Lubrication' },
  { slug: 'flow-regulation', name: 'Flow Regulation', href: '/equipment-options/lubrication/flow-regulation', group: 'Lubrication' },
  { slug: 'dispensing', name: 'Dispensing', href: '/equipment-options/lubrication/dispensing', group: 'Lubrication' },
  { slug: 'feeding-and-supply', name: 'Feeding and Supply', href: '/equipment-options/lubrication/feeding-and-supply', group: 'Lubrication' },
  { slug: 'paint-coatings', name: 'Paint & Coatings', href: '/equipment-options/paint-coatings', group: 'Paint & Coatings' },
  { slug: 'protective-coatings', name: 'Protective Coatings', href: '/equipment-options/paint-coatings/protective-coatings', group: 'Paint & Coatings' },
  { slug: 'spray-systems', name: 'Spray Systems', href: '/equipment-options/paint-coatings/spray-systems', group: 'Paint & Coatings' },
  { slug: 'process-control', name: 'Process Control', href: '/equipment-options/process-control', group: 'Process Control' },
  { slug: 'integration-automation', name: 'Integration / Automation', href: '/equipment-options/process-control/integration-automation', group: 'Process Control' },
  { slug: 'monitoring-analytics', name: 'Monitoring / Analytics', href: '/equipment-options/process-control/monitoring-analytics', group: 'Process Control' },
  { slug: 'process-control-computer', name: 'Process Control Computer', href: '/equipment-options/process-control/process-control-computer', group: 'Process Control' },
  { slug: 'polyurethane', name: 'Polyurethane', href: '/equipment-options/polyurethane-processing-equipment', group: 'Polyurethane' },
  { slug: 'bulk-chemical-storage', name: 'Bulk Chemical Storage', href: '/bulk-chemical-storage', group: 'Polyurethane' },
  { slug: 'high-pressure-metering', name: 'High Pressure Metering', href: '/equipment-options/polyurethane-processing-equipment/high-pressure-metering', group: 'Polyurethane' },
  { slug: 'low-pressure-metering', name: 'Low Pressure Metering', href: '/equipment-options/polyurethane-processing-equipment/low-pressure-metering', group: 'Polyurethane' },
  { slug: 'pentane-capable-metering-machines', name: 'Pentane Capable Metering Machines', href: '/equipment-options/polyurethane-processing-equipment/pentane-capable-metering-machines', group: 'Polyurethane' },
  { slug: 'urethane-foam-mixing-guns', name: 'Urethane Foam Mixing Guns', href: '/equipment-options/polyurethane-processing-equipment/urethane-foam-mixing-guns', group: 'Polyurethane' },
];
