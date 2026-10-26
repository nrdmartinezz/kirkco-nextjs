import type { EquipmentSubcategoryContent } from '@/content/equipment/types';

export const pultrusionHref = '/equipment-options/composites/pultrusion';

export const pultrusion: EquipmentSubcategoryContent = {
  href: pultrusionHref,
  title: 'Pultrusion',
  description:
    'Pultrusion is a continuous, automated composite manufacturing process used to produce long, straight profiles with a uniform cross-section and exceptional longitudinal strength and rigidity.',
  parentHref: '/equipment-options/composites',
  parentLabel: 'Composites',
  breadcrumbLeaf: 'Pultrusion',
  overviewHeading:
    'Comprehensive Composite Manufacturing Solutions for Closed Mold, Filament Winding, Pultrusion, and Open Mold Processes',
  overview:
    'Pultrusion is a continuous, automated composite manufacturing process used to produce long, straight profiles with a uniform cross-section and exceptional longitudinal strength and rigidity. The word “pultrusion” combines pull and extrusion — reflecting how reinforcing fibers are pulled through resin and a heated die to form cured composite shapes.',
  overviewImage: '/images/equipment/pultrusion.jpg',
  overviewImageAlt: 'Orange pultruded composite cylinder with a black end hub in a factory',
  cta: {
    label: 'Contact us to find the right Pultrusion Equipment For You!',
    href: '/quote',
  },
  groups: [],
  contentBlocks: [
    {
      heading: 'Materials & Resin Systems',
      intro:
        'Pultrusion accommodates a variety of reinforcement and resin combinations to meet different performance requirements:',
      items: [
        {
          title: 'Reinforcements',
          body: 'Glass fiber is most common, with carbon and aramid options available for higher stiffness or specialized strength characteristics.',
        },
        {
          title: 'Resin Systems',
          body: 'Thermosetting resins such as polyester, vinyl ester, and epoxy provide excellent bonding, durability, and environmental resistance.',
        },
      ],
      closing:
        'This combination of fiber and resin delivers profiles with high strength-to-weight ratios, excellent dimensional stability, and tailored mechanical properties.',
    },
    {
      heading: 'Key Benefits of Pultrusion Technology',
      intro:
        'Pultrusion offers several advantages that make it a preferred production method for structural profiles.',
      items: [
        {
          title: 'Continuous, High-Volume Production',
          body: 'The automated nature of pultrusion enables efficient and consistent output for large runs.',
        },
        {
          title: 'Exceptional Mechanical Properties',
          body: 'High fiber content and uniform alignment result in profiles with excellent stiffness, strength, and durability.',
        },
        {
          title: 'Dimensional Precision',
          body: 'Consistent cross-section shapes are maintained throughout the length of the profile.',
        },
        {
          title: 'Cost-Efficiency',
          body: 'Continuous pultrusion reduces labor costs and material waste compared to some alternative composite processes.',
        },
        {
          title: 'Material Versatility',
          body: 'Suited for a wide range of resin and fiber combinations depending on performance requirements.',
        },
      ],
    },
  ],
};
