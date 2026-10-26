import type { EquipmentSubcategoryContent } from '@/content/equipment/types';

export const integrationAutomationHref = '/equipment-options/process-control/integration-automation';

const quote = '/quote';

export const integrationAutomation: EquipmentSubcategoryContent = {
  href: integrationAutomationHref,
  title: 'Integration / Automation',
  description:
    'Integration and automation connects Kirkco dispensing, metering, and monitoring equipment into coordinated manufacturing workflows.',
  parentHref: '/equipment-options/process-control',
  parentLabel: 'Process Control',
  breadcrumbLeaf: 'Integration / Automation',
  categorySlug: 'integration-automation',
  overviewHeading: 'Connecting dispensing systems to automated production environments',
  overview:
    'Integration & Automation represents the system layer that connects Kirkco dispensing, metering, and monitoring equipment into coordinated manufacturing workflows. This category focuses on how individual components—such as control computers, metering units, and sensors—interface with higher-level automation systems to enable synchronized, repeatable production.',
  overviewParagraphs: [
    'Integration & Automation represents the system layer that connects Kirkco dispensing, metering, and monitoring equipment into coordinated manufacturing workflows. This category focuses on how individual components—such as control computers, metering units, and sensors—interface with higher-level automation systems to enable synchronized, repeatable production.',
    'Rather than describing standalone devices, Integration & Automation abstracts how Kirkco equipment operates within automated cells, production lines, and factory control architectures. These systems support communication between dispensing hardware and external controls, allowing processes to be triggered, adjusted, and verified as part of broader manufacturing operations.',
  ],
  overviewImage: '/images/equipment/integration-automation.jpg',
  overviewImageAlt: 'Automated grease dispensing valves and hoses mounted on a machine',
  overviewImageWidth: 300,
  overviewImageHeight: 375,
  cta: {
    label: 'Contact Us To Discuss Integration / Automation!',
    href: quote,
  },
  engagementHeading: 'Ready to Engineer Your New System?',
  engagementBody:
    'Kirkco supports confidential engineering engagements under NDA. Discuss your application requirements with our team and receive a system architecture tailored to your process.',
  engagementImage: '/images/equipment/integration-workcell.jpg',
  engagementImageAlt: 'Robotic assembly cell with a safety enclosure, conveyor, and control cabinet',
  groups: [],
  contentBlocks: [
    {
      heading: 'Control & Interface Systems',
      subheading: 'Bridging dispensing equipment with factory automation',
      intro:
        'Control and interface systems provide the communication layer between dispensing components and higher-level automation platforms. These systems coordinate signals, execute programmed sequences, and allow dispensing processes to respond to external commands or system states.',
      cta: { label: 'Contact Us About Control & Interface System', href: quote },
    },
    {
      heading: 'Automated Metering & Dispensing Control',
      subheading: 'Program-driven control for synchronized dispensing operations',
      intro:
        'Automated metering and dispensing control systems manage electronically controlled dispensing functions as part of an automated process. These systems store and execute metering programs and ensure material delivery aligns with production timing and process requirements.',
      cta: { label: 'Contact Us About Metering & Dispensing Control', href: quote },
    },
    {
      heading: 'Sensor Integration & Feedback Loops',
      subheading: 'Real-time process feedback for automated control strategies',
      intro:
        'Sensor integration enables real-time process feedback by connecting monitoring devices—such as flow meters, pressure sensors, micro-flow sensors, and light barrier monitoring devices—into control and automation systems. This feedback supports verification, diagnostics, and closed-loop control strategies.',
      closing:
        'Rather than operating in isolation, these sensors contribute to automated decision-making within the dispensing process.',
      cta: { label: 'Contact Us About Sensors & Feedback Loops', href: quote },
    },
  ],
};
