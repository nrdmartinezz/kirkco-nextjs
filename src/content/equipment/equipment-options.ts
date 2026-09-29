export const equipmentOptionsDescription =
  'Kirkco engineers systems for handling, conditioning, metering, mixing, dispensing, automating, and validating production-critical materials. Explore technologies for adhesives and sealants, composites, lubrication, paint and coatings, process control, and polyurethane—then work with our team to configure them around your chemistry, throughput, application, and plant requirements.';

export type EquipmentFamily = {
  title: string;
  href: string;
  lines: string[];
};

export const equipmentFamilies: EquipmentFamily[] = [
  {
    title: 'Adhesives & Sealants',
    href: '/equipment-options/adhesives-sealants',
    lines: ['Single Component Systems · Two Component Systems · Putty & Paste · Tooling Paste · SMC / IMC Molding'],
  },
  {
    title: 'Composites',
    href: '/equipment-options/composites',
    lines: ['Closed Mold Technology · Filament Winding · Open Mold Technology · Pull Winding · Pultrusion'],
  },
  {
    title: 'Lubrication',
    href: '/equipment-options/lubrication',
    lines: [
      'Control: Metering · Pressure Control · Flow Regulation',
      'Delivery: Dispensing · Feeding & Supply',
    ],
  },
  {
    title: 'Paint & Coatings',
    href: '/equipment-options/paint-coatings',
    lines: ['Protective Coatings · Specialty Finishes · Spray Systems'],
  },
  {
    title: 'Process Control',
    href: '/equipment-options/process-control',
    lines: ['Process Control Computer · Monitoring & Analytics · Integration & Automation'],
  },
  {
    title: 'Polyurethane Processing',
    href: '/equipment-options/polyurethane-processing-equipment',
    lines: ['Storage · High/Low Pressure Metering · Pentane-Capable Metering · Mixing Guns'],
  },
  {
    title: 'Bulk Chemical Storage',
    href: '/bulk-chemical-storage',
    lines: ['Polyurethane · Epoxy · Adhesives · Resins · Coatings · Silicone · Lubricants'],
  },
];

export type EquipmentPlatform = {
  title: string;
  groups: { label?: string; links: { label: string; href: string }[] }[];
};

export const materialPlatforms: EquipmentPlatform[] = [
  {
    title: 'Adhesives & Sealants',
    groups: [
      {
        links: [
          { label: 'Single Component Systems', href: '/equipment-options/adhesives-sealants/single-component' },
          { label: 'Two Component Systems (2K)', href: '/equipment-options/adhesives-sealants/two-component' },
          { label: 'Putty & Paste', href: '/equipment-options/adhesives-sealants/putty-paste' },
          {
            label: 'Tooling Paste',
            href: '/equipment-options/adhesives-sealants/tooling-paste-seamless-modeling-paste',
          },
          { label: 'SMC / IMC Molding', href: '/equipment-options/adhesives-sealants/smc-imc-molding' },
        ],
      },
    ],
  },
  {
    title: 'Composites',
    groups: [
      {
        links: [
          { label: 'Closed Mold Technology', href: '/equipment-options/composites/closed-mold-technology' },
          { label: 'Open Mold Technology', href: '/equipment-options/composites/open-mold-technology' },
          { label: 'Filament Winding', href: '/equipment-options/composites/filament-winding' },
          { label: 'Pull Winding', href: '/equipment-options/composites/pull-winding' },
          { label: 'Pultrusion', href: '/equipment-options/composites/pultrusion' },
        ],
      },
    ],
  },
  {
    title: 'Lubrication',
    groups: [
      {
        label: 'Control',
        links: [
          { label: 'Metering', href: '/equipment-options/lubrication/metering' },
          { label: 'Pressure Control', href: '/equipment-options/lubrication/pressure-control' },
          { label: 'Flow Regulation', href: '/equipment-options/lubrication/flow-regulation' },
        ],
      },
      {
        label: 'Delivery',
        links: [
          { label: 'Dispensing', href: '/equipment-options/lubrication/dispensing' },
          { label: 'Feeding / Supply', href: '/equipment-options/lubrication/feeding-and-supply' },
        ],
      },
    ],
  },
  {
    title: 'Paint & Coatings',
    groups: [
      {
        links: [
          { label: 'Protective Coatings', href: '/equipment-options/paint-coatings/protective-coatings' },
          { label: 'Specialty Finishes', href: '/equipment-options/paint-coatings/specialty-finishes' },
          { label: 'Spray Systems', href: '/equipment-options/paint-coatings/spray-systems' },
        ],
      },
    ],
  },
  {
    title: 'Process Control',
    groups: [
      {
        links: [
          {
            label: 'Process Control Computer',
            href: '/equipment-options/process-control/process-control-computer',
          },
          { label: 'Monitoring & Analytics', href: '/equipment-options/process-control/monitoring-analytics' },
          { label: 'Integration & Automation', href: '/equipment-options/process-control/integration-automation' },
        ],
      },
    ],
  },
  {
    title: 'Polyurethane Processing Equipment',
    groups: [
      {
        links: [
          { label: 'Bulk Chemical Storage', href: '/bulk-chemical-storage' },
          { label: 'Fill Mix', href: '/fill-mix' },
          {
            label: 'High Pressure Metering',
            href: '/equipment-options/polyurethane-processing-equipment/high-pressure-metering',
          },
          {
            label: 'Low Pressure Metering',
            href: '/equipment-options/polyurethane-processing-equipment/low-pressure-metering',
          },
          {
            label: 'Pentane Capable Metering Machines',
            href: '/equipment-options/polyurethane-processing-equipment/pentane-capable-metering-machines',
          },
          {
            label: 'Urethane Foam Mixing Guns',
            href: '/equipment-options/polyurethane-processing-equipment/urethane-foam-mixing-guns',
          },
        ],
      },
    ],
  },
];

export const processSteps = [
  {
    title: '01 — Define the Material and Production Objective',
    body: 'Establish what the material must do, how it behaves, the required production result, and the variables that can affect quality. This includes chemistry, viscosity, fillers, temperature sensitivity, working time, cure behavior, substrate, and application geometry.',
  },
  {
    title: '02 — Build a Stable Material-Supply Architecture',
    body: 'Select the source container, transfer method, conditioning, agitation, filtration, pressure generation, replenishment, and delivery path required to make material consistently available to the process.',
  },
  {
    title: '03 — Control Metering, Mixing, and Application',
    body: 'Configure the technology that determines dose, component ratio, mixing method, flow, bead or shot geometry, spray pattern, fill behavior, or infusion performance.',
  },
  {
    title: '04 — Integrate Automation and Verification',
    body: 'Coordinate PLC logic, operator interfaces, recipes, motion, sensors, interlocks, alarms, and process data according to the required level of automation and traceability.',
  },
  {
    title: '05 — Validate, Install, Train, and Support',
    body: 'Plan system testing, installation, commissioning, operator and maintenance training, documentation, troubleshooting, repair, rebuild, and future process changes as part of the architecture—not as afterthoughts.',
  },
];

export const equipmentQuestions = [
  {
    question: 'What is the difference between industrial equipment and an engineered system?',
    answer:
      'Industrial equipment performs a defined function, such as pumping, metering, mixing, dispensing, spraying, or controlling a process. An engineered system coordinates the required equipment, material path, controls, interfaces, validation, documentation, and support around a production objective.',
  },
  {
    question: 'Can Kirkco integrate equipment with an existing production line?',
    answer:
      'Kirkco’s process-control content describes interfaces with robots, conveyors, assembly systems, PLCs, and other upstream or downstream equipment. Final compatibility and scope should be determined through an application and controls review.',
  },
  {
    question: 'What information should I provide for a system review?',
    answer:
      'Provide the material name and technical data, viscosity or consistency, component ratio where applicable, source container, required dose or flow, application pattern, cycle rate, available utilities, automation level, production environment, and validation requirements. Photographs and existing equipment identifiers may also help, provided they are cleared for disclosure.',
  },
  {
    question: 'Can a Kirkco project combine technologies from multiple categories?',
    answer:
      'Yes. The categories represent process functions and technology families, not isolated project boundaries. A complete architecture may connect material storage, pumping, metering, mixing, dispensing, motion, controls, and validation across multiple categories.',
  },
  {
    question: 'Does Kirkco support custom or confidential applications?',
    answer:
      'Kirkco supports confidential engineering engagement under NDA. An initial discussion covers the process information needed while customer identities, drawings, formulations, production data, and project outcomes stay confidential.',
  },
  {
    question: 'Does Kirkco provide installation, training, and repair support?',
    answer:
      'Kirkco links its systems portfolio to in-field installation, training and education, and repair and rebuild services.',
  },
];
