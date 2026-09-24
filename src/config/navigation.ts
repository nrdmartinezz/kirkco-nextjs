/**
 * One nav tree, rendered two ways. Header reads it for the desktop nav;
 * MobileNav reads the same tree, so a menu change is made once.
 */

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  /** lucide-react icon name, e.g. 'Wrench'. */
  icon?: string;
}

export interface MegaColumn {
  heading?: string;
  href?: string;
  links: NavLink[];
}

export interface MegaPanel {
  kind: 'mega';
  columns: MegaColumn[];
  featured?: {
    title: string;
    body: string;
    href: string;
    cta: string;
  };
}

export interface LinkListPanel {
  kind: 'links';
  links: NavLink[];
}

export interface NavItem {
  label: string;
  /** Present when the top-level item is itself a destination. */
  href?: string;
  panel?: MegaPanel | LinkListPanel;
}

export interface NavigationConfig {
  primary: NavItem[];
  /** Right-hand call to action in the header. */
  cta?: { label: string; href: string };
  footer: { heading: string; links: NavLink[] }[];
  legal: NavLink[];
}

const adhesives: NavLink[] = [
  { label: 'Single Component', href: '/equipment-options/adhesives-sealants/single-component' },
  { label: 'Two Component Systems (2k)', href: '/equipment-options/adhesives-sealants/two-component' },
  { label: 'Putty & Paste', href: '/equipment-options/adhesives-sealants/putty-paste' },
  { label: 'SMC / IMC Molding', href: '/equipment-options/adhesives-sealants/smc-imc-molding' },
  {
    label: 'Tooling Paste & Seamless Modeling Paste',
    href: '/equipment-options/adhesives-sealants/tooling-paste-seamless-modeling-paste',
  },
];

const composites: NavLink[] = [
  { label: 'Closed Mold Technology', href: '/equipment-options/composites/closed-mold-technology' },
  { label: 'Filament Winding', href: '/equipment-options/composites/filament-winding' },
  { label: 'Open Mold Technology', href: '/equipment-options/composites/open-mold-technology' },
  { label: 'Pull Winding', href: '/equipment-options/composites/pull-winding' },
  { label: 'Pultrusion', href: '/equipment-options/composites/pultrusion' },
];

const lubrication: NavLink[] = [
  { label: 'Metering', href: '/equipment-options/lubrication/metering' },
  { label: 'Pressure Control', href: '/equipment-options/lubrication/pressure-control' },
  { label: 'Flow Regulation', href: '/equipment-options/lubrication/flow-regulation' },
  { label: 'Dispensing', href: '/equipment-options/lubrication/dispensing' },
  { label: 'Feeding and Supply', href: '/equipment-options/lubrication/feeding-and-supply' },
];

const paint: NavLink[] = [
  { label: 'Protective Coatings', href: '/equipment-options/paint-coatings/protective-coatings' },
  { label: 'Specialty Finishes', href: '/equipment-options/paint-coatings/specialty-finishes' },
  { label: 'Spray Systems', href: '/equipment-options/paint-coatings/spray-systems' },
];

const processControl: NavLink[] = [
  { label: 'Integration / Automation', href: '/equipment-options/process-control/integration-automation' },
  { label: 'Monitoring / Analytics', href: '/equipment-options/process-control/monitoring-analytics' },
  { label: 'Process Control Computer', href: '/equipment-options/process-control/process-control-computer' },
];

const polyurethane: NavLink[] = [
  { label: 'Bulk Chemical Storage', href: '/bulk-chemical-storage' },
  { label: 'Fill Mix', href: '/fill-mix' },
  { label: 'High Pressure Metering', href: '/equipment-options/polyurethane-processing-equipment/high-pressure-metering' },
  { label: 'Low Pressure Metering', href: '/equipment-options/polyurethane-processing-equipment/low-pressure-metering' },
  {
    label: 'Pentane Capable Metering Machines',
    href: '/equipment-options/polyurethane-processing-equipment/pentane-capable-metering-machines',
  },
  { label: 'Urethane Foam Mixing Guns', href: '/equipment-options/polyurethane-processing-equipment/urethane-foam-mixing-guns' },
];

const industries: NavLink[] = [
  { label: 'Aerospace', href: '/industry/aerospace' },
  { label: 'Automation / Assembly Platforms', href: '/industry/automation-assembly-platforms' },
  { label: 'Automotive', href: '/industry/automotive' },
  { label: 'Automotive Lighting', href: '/industry/automotive/automotive-lighting' },
  { label: 'Commercial Automotive Vehicle Industry', href: '/industry/automotive/commercial-automotive-vehicle-industry' },
  { label: 'Personal Automotive Vehicle Industry', href: '/industry/automotive/personal-automotive-vehicle-industry' },
  { label: 'Composites', href: '/industry/composites' },
  { label: 'Construction', href: '/industry/construction' },
  { label: 'Structural Panels', href: '/industry/construction/structural-panels' },
  { label: 'Windows & Doors Manufacturing Solutions', href: '/industry/construction/windows-doors-manufacturing-solutions' },
  { label: 'Consumer Goods', href: '/industry/consumer-goods' },
  { label: 'Electrical', href: '/industry/electrical' },
  { label: 'Fenestration', href: '/industry/fenestration' },
  { label: 'Filters & Membranes', href: '/industry/filters-membranes' },
  { label: 'General Industrial', href: '/industry/general-industrial' },
  { label: 'Lamination and Packaging', href: '/industry/lamination-and-packaging' },
  { label: 'Marine', href: '/industry/marine' },
  { label: 'Military Armor', href: '/industry/military-armor' },
  { label: 'Non-Woven Materials Manufacturing', href: '/industry/non-woven-materials-manufacturing' },
  { label: 'Paper Packing and Bookbinding', href: '/industry/paper-packing-and-bookbinding' },
];

const resources: NavLink[] = [
  { label: 'Resin Dispensing & Molding', href: '/resin-dispensing-molding' },
  { label: 'Rebuild & Repair', href: '/rebuild-repair' },
  { label: 'Training & Education', href: '/training-education' },
  { label: 'In-Field Installation', href: '/in-field-installation' },
  { label: 'Request a Quote', href: '/request-a-quote' },
];

export const navigation: NavigationConfig = {
  primary: [
    {
      label: 'About Us',
      panel: {
        kind: 'links',
        links: [
          { label: 'ABNOX Partner & Supplier', href: '/abnox' },
          { label: 'About Us', href: '/about-us' },
        ],
      },
    },
    {
      label: 'Products & Systems',
      href: '/equipment-options',
      panel: {
        kind: 'mega',
        columns: [
          { heading: 'Adhesives & Sealants', href: '/equipment-options/adhesives-sealants', links: adhesives },
          { heading: 'Composites', href: '/equipment-options/composites', links: composites },
          { heading: 'Lubrication', href: '/equipment-options/lubrication', links: lubrication },
          { heading: 'Paint & Coatings', href: '/equipment-options/paint-coatings', links: paint },
          { heading: 'Process Control', href: '/equipment-options/process-control', links: processControl },
          {
            heading: 'Polyurethane',
            href: '/equipment-options/polyurethane-processing-equipment',
            links: polyurethane,
          },
        ],
      },
    },
    {
      label: 'Industries',
      panel: {
        kind: 'links',
        links: industries,
      },
    },
    {
      label: 'Resources',
      panel: {
        kind: 'links',
        links: resources,
      },
    },
    {
      label: 'Support',
      panel: {
        kind: 'links',
        links: [
          { label: 'ABNOX Products & Parts', href: '/abnox' },
          { label: 'Contact Us', href: '/contact-us' },
          { label: 'Request a Quote', href: '/request-a-quote' },
        ],
      },
    },
  ],

  cta: { label: 'Get a Quote', href: '/quote' },

  footer: [
    { heading: 'Adhesives & Sealants', links: adhesives },
    { heading: 'Composites', links: composites },
    { heading: 'Polyurethane', links: polyurethane },
    { heading: 'Lubrication', links: lubrication },
    { heading: 'Resources', links: resources },
  ],

  legal: [],
};
