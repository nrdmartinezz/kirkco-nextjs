export type SingleComponentGroup = {
  title: string;
  intro: string;
  body: string;
  names: string[];
};

export type SingleComponentSection = {
  heading: string;
  paragraphs: string[];
};

export type SingleComponentPageContent = {
  href: string;
  title: string;
  description: string;
  overview: string;
  groups: SingleComponentGroup[];
  sections: SingleComponentSection[];
};

export const singleComponent: SingleComponentPageContent = {
  href: '/equipment-options/adhesives-sealants/single-component',
  title: 'Single-Component Adhesive & Sealant Dispensing Systems',
  description:
    'Precision single-component metering systems for hot or cold adhesives, silicones, polyurethane sealants, lubricants, greases, and high-viscosity structural materials.',
  overview:
    'At Kirkco Corporation, we specialize in engineering and building precision single-component metering systems tailored to the rigorous demands of industrial manufacturing. Whether your process requires dispensing hot or cold adhesives, silicones, polyurethane sealants, lubricants, greases, or high-viscosity structural materials, our systems deliver reliable, user-friendly, and precision-accurate solutions. We design every dispensing architecture not only to address your current production requirements but also to anticipate and solve future scalability challenges with equal success. Our single-component dispensing systems eliminate the variability introduced by manual application methods—stabilizing bond quality, improving cosmetic consistency, and significantly reducing rework rates across multiple product variants, shifts, and operators.',
  groups: [
    {
      title: 'Dispensing Valves',
      intro: 'Match the most suitable technology to your material viscosity, cycle rate, and bead geometry requirements.',
      body: 'Kirkco precision single-component dispensing valves are engineered for consistent, repeatable dosing of adhesives and sealants in demanding industrial applications. Available in multiple ranges and sizes, our valve selection allows you to match the most suitable technology to your material viscosity, cycle rate, and bead geometry requirements. Construction options include stainless steel wetted parts and hardened alloy needle seats for abrasive media compatibility.',
      names: [
        'Diaphragm Dispensing Valves',
        'Handheld Dispensing Valves',
        'High Speed Valves',
        'Needle Dispensing Valves',
        'Shot Valves',
      ],
    },
    {
      title: 'Metering Valves',
      intro: 'Metering valves operate on positive displacement principles to ensure exact volumetric delivery.',
      body: 'For applications where shot-to-shot accuracy is non-negotiable, Kirkco metering valves operate on positive displacement principles to ensure exact volumetric delivery regardless of temperature or viscosity fluctuations. Each cycle completely empties the defined chamber volume, providing high repetition accuracy and the flexibility to adjust output volume for different product configurations.',
      names: [
        'Chamber Metering Valve',
        'Handheld Dispensing Valves',
        'Positive Displacement',
        'Progressive Cavity Valves',
      ],
    },
    {
      title: 'Pumps & Packages',
      intro: 'Single-component pumps and packages maintain consistent pressure and flow.',
      body: 'A reliable material supply is the foundation of any high-performance dispensing system. Kirkco single-component pumps and packages maintain consistent pressure and flow, ensuring dependable material delivery directly from the original container—pail, drum, or tote—to the application point. Our systems support continuous circulation for multi-station supply and are available in carbon steel, chrome-plated steel, stainless steel, and specialty coatings to match your material chemistry requirements.',
      names: [
        'Air Operated Diaphragm Pumps',
        'Double Ram Pump',
        'Piston Pump',
        'Pressure Vessels',
        'Transfer Pump',
      ],
    },
  ],
  sections: [
    {
      heading: 'Executive Overview',
      paragraphs: [
        'Kirkco engineered an industrial adhesive dispensing architecture designed to deliver repeatable bonding and sealing performance across high-mix, high-volume manufacturing environments. The architecture supports consistent material application, controlled bead geometry, and stable production output across diverse industrial assemblies.',
      ],
    },
    {
      heading: 'Market & Performance Drivers',
      paragraphs: [
        'Industrial manufacturers require adhesive dispensing systems that can maintain quality across multiple product variants, shifts, and operators. Manual application introduces variability that impacts bond strength, cosmetic appearance, and rework rates. A controlled dispensing architecture is required to stabilize quality and throughput.',
      ],
    },
    {
      heading: 'Process Requirements',
      paragraphs: [
        'Applications require accurate volumetric dispensing of single- and multi-component adhesives with repeatable bead width, placement, and cure behavior. Processes may include component bonding, gasket forming, seam sealing, and surface coating in automated or semi-automated cells.',
      ],
    },
    {
      heading: 'System Architecture',
      paragraphs: [
        'The dispensing platform utilizes positive-displacement metering technologies, including piston, gear, or progressive cavity pumps, selected based on material viscosity and flow requirements. Static or dynamic mixing solutions are applied where multi-component materials are used, with application-specific valves ensuring clean cutoff and repeatable starts and stops.',
      ],
    },
    {
      heading: 'Controls & Validation',
      paragraphs: [
        'PLC-based controls manage dispense volume, ratio control, dispense speed, and process interlocks. Validation confirms repeatable adhesive output, consistent bead geometry, and reliable adhesion performance across production cycles.',
      ],
    },
    {
      heading: 'Adhesives & Sealants Quality Framework Alignment',
      paragraphs: [
        'This application is governed by Kirkco’s Adhesives & Sealants Quality Framework, which standardizes material handling, dispense accuracy, bead geometry control, and validation practices across industrial bonding and sealing systems. Reference: Adhesives & Sealants Quality Framework (Rev C).',
      ],
    },
    {
      heading: 'Operational Performance',
      paragraphs: [
        'Implementation reduces scrap, improves cosmetic consistency, and stabilizes production throughput by removing application variability as a failure mode.',
      ],
    },
    {
      heading: 'Lifecycle & Scalability',
      paragraphs: [
        'The architecture supports future automation, additional product variants, and evolving adhesive chemistries without redesign of the core dispensing platform.',
      ],
    },
  ],
};
