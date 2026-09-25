export type EquipmentLink = {
  label: string;
  href?: string;
};

export type EquipmentSystem = {
  title: string;
  description: string;
  href: string;
  categorySlug: string;
};

export type EquipmentPageContent = {
  href: string;
  title: string;
  description: string;
  breadcrumb: EquipmentLink[];
  heroImage: string;
  heroAlt: string;
  overviewImage: string;
  overviewImageAlt: string;
  overviewHeading: string;
  overview: string[];
  systems: EquipmentSystem[];
  engagementHeading: string;
  engagementBody: string;
  platformsHeading: string;
  platforms: { heading: string; items: string[] }[];
  architectures: { heading: string; groups: { title: string; links: EquipmentLink[] }[] }[];
  applicationIds: string[];
  closing: string;
};

export const adhesivesSealants: EquipmentPageContent = {
  href: '/equipment-options/adhesives-sealants',
  title: 'Adhesives & Sealants',
  description:
    'Precision metering, mixing, dispensing, and validation of advanced bonding materials for industrial manufacturing.',
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'Equipment Options', href: '/equipment-options' },
    { label: 'Adhesives & Sealants' },
  ],
  heroImage: '/images/equipment-hero.webp',
  heroAlt: 'Adhesive dispensing equipment on a production line',
  overviewImage: '/images/adhesive-bonding.jpg',
  overviewImageAlt: 'Adhesive bonding on a manufactured assembly',
  overviewHeading: 'Precision Metering, Mixing, and Structural Bonding Automation',
  overview: [
    'Adhesives and sealant systems are critical to modern manufacturing, where mechanical fastening alone cannot meet structural, environmental, or weight requirements. These systems govern the precision metering, mixing, dispensing, and validation of advanced bonding materials, ensuring structural integrity, repeatability, and process reliability across high-performance production environments.',
    'Our engineered systems support single-component and multi-component adhesive platforms, integrating material conditioning, robotic dispensing, and automated inspection into fully controlled production processes. From aerospace composite bonding to automotive glazing systems, precision adhesive application is fundamental to product performance.',
  ],
  systems: [
    {
      title: 'Single Component Systems',
      description: 'Dispensing valves, metering valves, pump & pressure packages for 1K adhesives',
      href: '/equipment-options/adhesives-sealants/single-component',
      categorySlug: 'single-component',
    },
    {
      title: 'Two Component Systems (2K)',
      description: 'Gear metering, piston metering, shot metering, mixing valves, LSR processing',
      href: '/equipment-options/adhesives-sealants/two-component',
      categorySlug: 'two-component',
    },
    {
      title: 'Tooling Paste & Seamless Molding',
      description: 'Eldo-Mix 401T, GP 401 TPD for precision tooling and modeling applications',
      href: '/equipment-options/adhesives-sealants/tooling-paste-seamless-modeling-paste',
      categorySlug: 'tooling-paste',
    },
    {
      title: 'SMC/IMC Molding',
      description: 'IMC Coatec metering systems for sheet molding and in-mold coating applications',
      href: '/equipment-options/adhesives-sealants/smc-imc-molding',
      categorySlug: 'smc-imc-molding',
    },
    {
      title: 'Putty & Paste Systems',
      description: 'GP 401 APD, CF Versa, and GP 401 TPD for high-viscosity paste dispensing',
      href: '/equipment-options/adhesives-sealants/putty-paste',
      categorySlug: 'putty-paste',
    },
  ],
  engagementHeading: 'Ready to Engineer Your Adhesive System?',
  engagementBody:
    'Kirkco supports confidential engineering engagements under NDA. Discuss your application requirements with our team and receive a system architecture tailored to your process.',
  platformsHeading: 'Technical Platforms',
  platforms: [
    {
      heading: 'Adhesive Chemistry Platforms',
      items: [
        'Two-component epoxy structural adhesives',
        'Polyurethane structural adhesives',
        'Silicone sealants and gasketing materials',
        'Methacrylate adhesives (MMA)',
        'Liquid Silicone Rubber (LSR) processing systems',
        'Filled and spacer-loaded structural adhesives',
      ],
    },
    {
      heading: 'Metering & Mixing Technology',
      items: [
        'Servo-driven piston metering systems',
        'Precision gear metering assemblies',
        'Progressive cavity pumps for high-filler systems',
        'Static mixing tubes',
        'Dynamic mixing heads',
        'High-pressure impingement mixing (specialized applications)',
      ],
    },
  ],
  architectures: [
    {
      heading: 'Single-Component & Multi-Component System Architecture',
      groups: [
        {
          title: 'Single-Component Systems',
          links: [
            { label: 'Dispensing Valves', href: '/equipment-options/adhesives-sealants/single-component' },
            { label: 'Metering Valves', href: '/equipment-options/adhesives-sealants/single-component' },
            { label: 'Pumps & Packages', href: '/equipment-options/adhesives-sealants/single-component' },
          ],
        },
        {
          title: 'Multi-Component Systems',
          links: [
            { label: 'Gear Metering', href: '/equipment-options/adhesives-sealants/two-component' },
            { label: 'LSR Processing Equipment', href: '/equipment-options/adhesives-sealants/two-component' },
            { label: 'Shot Metering', href: '/equipment-options/adhesives-sealants/two-component' },
            { label: 'Mixing Valves', href: '/equipment-options/adhesives-sealants/two-component' },
            { label: 'Piston Metering', href: '/equipment-options/adhesives-sealants/two-component' },
            { label: 'Progressive Cavity Metering', href: '/equipment-options/adhesives-sealants/two-component' },
          ],
        },
      ],
    },
    {
      heading: 'Chemistry System Architecture',
      groups: [
        {
          title: 'Tooling Paste',
          links: [
            { label: 'Eldo-Mix 401T & Tooling Mix', href: '/equipment-options/adhesives-sealants/tooling-paste-seamless-modeling-paste' },
            { label: 'GP 401 TPD', href: '/equipment-options/adhesives-sealants/tooling-paste-seamless-modeling-paste' },
          ],
        },
        {
          title: 'SMC / IMC Molding',
          links: [{ label: 'IMC Coatec Metering', href: '/equipment-options/adhesives-sealants/smc-imc-molding' }],
        },
        {
          title: 'Putty & Paste',
          links: [
            { label: 'GP 401 APD & CF Versa', href: '/equipment-options/adhesives-sealants/putty-paste' },
            { label: 'GP 401 TPD', href: '/equipment-options/adhesives-sealants/putty-paste' },
          ],
        },
      ],
    },
  ],
  applicationIds: ['adhesives-quality-framework', 'industrial-adhesive-dispensing'],
  closing: 'Precision Metering System for Accuracy in your Process',
};
