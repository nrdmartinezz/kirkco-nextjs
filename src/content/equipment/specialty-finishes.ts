import type { EquipmentSubcategoryContent } from '@/content/equipment/types';

export const specialtyFinishesHref = '/equipment-options/paint-coatings/specialty-finishes';

const quote = '/quote';

export const specialtyFinishes: EquipmentSubcategoryContent = {
  href: specialtyFinishesHref,
  title: 'Specialty Finishes',
  description:
    'Kirkco partners with leading coating manufacturers to supply liquid paints, primers, and specialty finish materials for corrosion resistance, surface preparation, and decorative finishes.',
  parentHref: '/equipment-options/paint-coatings',
  parentLabel: 'Paint & Coatings',
  breadcrumbLeaf: 'Specialty Finishes',
  overviewHeading: 'High-Performance Protective Coating Systems',
  overview:
    'Kirkco partners with leading coating manufacturers to supply a broad range of liquid paints, primers, and specialty finish materials. These solutions support everything from corrosion resistance and surface preparation to high-end decorative and functional finishes.',
  overviewParagraphs: [
    'Kirkco partners with leading coating manufacturers to supply a broad range of liquid paints, primers, and specialty finish materials. These solutions support everything from corrosion resistance and surface preparation to high-end decorative and functional finishes.',
    'Available materials are compatible with manual spray, automated spray systems, and centralized paint kitchens, allowing seamless integration into existing production workflows.',
  ],
  cta: {
    label: 'Contact Us To Discuss Specialty Finishes!',
    href: quote,
  },
  groups: [],
  contentBlocks: [
    {
      heading: 'Epoxy Coatings',
      subheading: 'High-Performance Industrial Epoxy Finishes',
      intro:
        'Epoxy coatings are widely used for applications requiring exceptional chemical resistance, adhesion, and mechanical strength. These coatings create durable protective layers on metal and composite substrates, even in harsh environments.',
      cta: { label: 'Contact Us About Epoxy Coatings', href: quote },
    },
    {
      heading: 'Polyurethane Primers & Topcoats',
      subheading: 'Durable, High-Appearance Protective Finishes',
      intro:
        'Polyurethane primers and topcoats offer outstanding impact resistance, color retention, and surface gloss, making them ideal for applications where both durability and appearance matter.',
      cta: { label: 'Contact Us About Polyurethane Primers', href: quote },
    },
    {
      heading: 'Non-Isocyanate & Water-Borne Coatings',
      subheading: 'Low-VOC, Regulatory-Compliant Finishes',
      intro:
        'Non-isocyanate and water-borne coatings provide environmentally responsible alternatives while still delivering reliable performance. These coatings help facilities meet VOC and HAPS regulations without sacrificing finish quality.',
      cta: { label: 'Contact Us About Non-Isocyanate', href: quote },
    },
    {
      heading: 'Alkyd Enamels & Specialty Textured Finishes',
      subheading: 'Decorative & Functional Surface Coatings',
      intro:
        'Alkyd enamels and textured specialty finishes provide aesthetic appeal combined with functional surface properties. These coatings are often used where surface texture, grip, or visual distinction is required.',
      cta: { label: 'Contact Us About Alkyd Enamels', href: quote },
    },
    {
      heading: 'Lacquers & Custom Formulations',
      subheading: 'Tailored Surface Effects & Performance Coatings',
      intro:
        'Lacquers and custom-formulated finishes allow manufacturers to achieve specific visual effects or functional performance characteristics. These coatings are engineered to meet unique aesthetic, tactile, or application-specific requirements.',
      cta: { label: 'Contact Us About Lacquers & Custom Formulations', href: quote },
    },
  ],
};
