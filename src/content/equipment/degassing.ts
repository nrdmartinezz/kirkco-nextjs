export const degassingHref = '/equipment-options/lubrication/degassing';

export const degassingMeta = {
  title: 'Advanced Degassing Station',
  eyebrow: 'WADS',
  description:
    'Finds air and gas pockets in grease and high-viscosity lubricants, discharges only the contaminated slug, and keeps bubble-free material flowing to your dispense valve without stopping production.',
  image: '/images/equipment/wads-cabinet.webp',
  imageAlt:
    'Kirkco Advanced Degassing Station cabinet with touchscreen, main switch, and outlet pressure gauges',
  interiorImage: '/images/equipment/wads-interior.webp',
  interiorAlt:
    'Interior view of the degassing station showing the control cabinet, detection and discharge block, buffer container, booster pump, and collection bottle',
};

export const degassingStats = [
  { value: '1.3 mm', label: 'Smallest detectable bubble (0.051 in)' },
  { value: 'NLGI 3', label: 'Greases and oils up to NLGI grade 3' },
  { value: '150 bar', label: 'Maximum inlet pressure (2,175 psi)' },
  { value: '2,000 cm³', label: 'Internal buffer keeps supply running during discharges and drum changes' },
];

export const degassingProblems = [
  {
    title: 'Under-dosed parts',
    body: 'A bubble takes the place of material in the metered volume, so the part receives less lubricant than specified, and repeatability drops with it.',
  },
  {
    title: 'Contamination and mess',
    body: 'Compressed air expands at the nozzle and spits material onto the part and fixture, creating cleanup and rework.',
  },
  {
    title: 'Valve wear',
    body: 'Pressure spikes and dry cycling caused by entrained air damage dosing valves and shorten service intervals.',
  },
];

export const degassingStages = [
  {
    title: 'Pressure reduction',
    body: 'A regulator drops the incoming pressure so trapped gas expands and bubbles grow large enough to detect reliably.',
  },
  {
    title: 'Flow restriction',
    body: 'An orifice slows the stream so every bubble passes the sensor at a speed it can resolve.',
  },
  {
    title: 'Bubble detection',
    body: 'The detection module counts and sizes bubbles against limits you set, down to 1.3 mm at the highest sensitivity.',
  },
  {
    title: 'Targeted discharge',
    body: 'When gas is found, a valve diverts only that portion of material to the collection bottle. Good material stays in the line.',
  },
  {
    title: 'Buffer storage',
    body: 'A pressure-controlled container holds degassed material, so the outlet keeps feeding during discharges and supply-drum changes.',
  },
  {
    title: 'Pressure boost',
    body: 'An adjustable booster pump brings the material back to line pressure, or higher, up to 200 bar at the outlet.',
  },
];

export const degassingFlow = [
  { label: 'Supply', detail: '20–150 bar' },
  { label: 'Pressure reduction', detail: '1' },
  { label: 'Flow restriction', detail: '2' },
  { label: 'Bubble detection', detail: '3' },
  { label: 'Buffer container', detail: '5' },
  { label: 'Booster pump', detail: '6' },
  { label: 'To valve', detail: '0–200 bar' },
];

export const cabinetLegend = [
  { mark: 'A', label: 'Single plug for power, bus, I/O and air', position: 'left-[5%] top-1/2' },
  { mark: 'B', label: 'Control cabinet with touchscreen', position: 'left-[42%] top-[30%]' },
  { mark: 'C', label: 'Pressure reduction, flow restriction, bubble detection and discharge valve (stages 1–4)', position: 'left-[38%] top-[80%]' },
  { mark: 'D', label: 'Buffer container (stage 5)', position: 'left-[61%] top-[55%]' },
  { mark: 'E', label: 'Booster pump (stage 6)', position: 'left-[76%] top-[32%]' },
  { mark: 'F', label: 'Collection bottle for discharged material', position: 'left-[92%] top-[65%]' },
];

export const degassingBenefits = [
  {
    title: 'Higher process capability and OEE',
    body: 'Consistent bead and shot volume improve Cpk and reduce scrap and rework.',
  },
  {
    title: 'Minimal material loss',
    body: 'Only the contaminated portion is discharged, not a timed purge.',
  },
  {
    title: 'Continuous supply',
    body: 'The internal buffer feeds the application during discharges and container changes.',
  },
  {
    title: 'Retrofit or new build',
    body: 'A self-contained unit that fits into an existing supply line or is designed into a new system.',
  },
  {
    title: 'Built-in monitoring',
    body: 'Tracks bubble count and size, discharge time and buffer level, and alarms on any limit you define.',
  },
];

export const degassingControls = [
  { label: 'Local', value: 'Stand-alone operation from the built-in 4.3 in touchscreen; manual and automatic modes' },
  { label: 'Remote', value: 'Full control and parameter setting from your PLC over Ethernet (Modbus TCP)' },
  { label: 'Discrete I/O', value: '3 digital inputs, 3 + 3 digital outputs' },
  { label: 'Alarms', value: '4 freely configurable 24 VDC alarm outputs for high/low limits on monitored values' },
  { label: 'Connection', value: 'Single industrial plug carries power, bus, I/O and compressed air' },
  { label: 'Security', value: 'Password protection against unauthorized setting changes' },
  { label: 'Diagnostics', value: 'Fault log, empty-buffer stop, buffer-level monitoring' },
];

export type SpecRow = {
  parameter: string;
  metric: string;
  us?: string;
  span?: boolean;
};

export const degassingSpecs: { group: string; rows: SpecRow[] }[] = [
  {
    group: 'Fluid',
    rows: [
      { parameter: 'Inlet pressure', metric: '20–150 bar', us: '290–2,175 psi' },
      { parameter: 'Outlet pressure (adjustable)', metric: '0–200 bar', us: '0–2,900 psi' },
      { parameter: 'Average volume flow', metric: 'max. 100 cm³/min', us: '6.1 in³/min' },
      { parameter: 'Short-term volume flow', metric: 'max. 1,500 cm³/min', us: '91.5 in³/min' },
      { parameter: 'Buffer storage volume', metric: '40–2,000 cm³', us: '2.4–122 in³' },
      { parameter: 'Buffer storage pressure', metric: 'max. 10 bar', us: '145 psi' },
      {
        parameter: 'Suitable media',
        metric: 'Non-abrasive oils and greases to NLGI 3; particle size < 150 µm',
        span: true,
      },
    ],
  },
  {
    group: 'Bubble detection',
    rows: [
      { parameter: 'Highest sensitivity', metric: '≥ 1.3 mm', us: '0.051 in' },
      { parameter: 'Lowest sensitivity', metric: '≥ 4 mm', us: '0.16 in' },
    ],
  },
  {
    group: 'Utilities',
    rows: [
      { parameter: 'Supply voltage', metric: '110 or 230 VAC', us: '16 A max. fuse' },
      { parameter: 'Control voltage (I/O)', metric: '24 VDC', us: '—' },
      { parameter: 'Compressed air', metric: '4–10 bar', us: '58–145 psi, clean, dry, oil-free' },
    ],
  },
  {
    group: 'Connections',
    rows: [
      { parameter: 'Material inlet', metric: '12L 24° cutting-ring tube fitting (12 mm tube)', span: true },
      { parameter: 'Material outlet', metric: 'G 1/2 (BSPP)', span: true },
    ],
  },
  {
    group: 'Physical',
    rows: [
      { parameter: 'Dimensions L × W × H', metric: '739 × 268 × 514 mm', us: '29.1 × 10.6 × 20.2 in' },
      { parameter: 'Weight', metric: '18 kg', us: '40 lb' },
      { parameter: 'Enclosure rating', metric: 'IP66', us: '—' },
      { parameter: 'Operating temperature', metric: '10–40 °C', us: '50–104 °F' },
      { parameter: 'Mounting', metric: 'Wall, frame or flat surface; 4 × M8 mounting points', span: true },
      {
        parameter: 'Wetted materials',
        metric: 'Stainless and carbon steels, PTFE, FKM, polyurethane, NBR',
        span: true,
      },
    ],
  },
];

export const degassingFit = {
  yes: [
    'Greases and high-viscosity oils up to NLGI 3',
    'Non-abrasive media with particles under 150 µm',
    'Automated grease metering on assembly lines (automotive, appliance, electromechanical components)',
    'Processes with short shots, spitting or rejects traced to air in the material',
    'Lines where drum changes introduce air into the supply',
  ],
  no: [
    'Abrasive or heavily filled media',
    'Acids, alkalis, cleaning agents and aggressive chemicals',
    'Polar solvents such as acetone, MEK or ethyl acetate',
    'Hazardous (explosive) atmosphere locations',
  ],
};

export const degassingChain = [
  { label: 'Drum or pail pump', href: '/equipment-options/lubrication/feeding-and-supply' },
  { label: 'Advanced Degassing Station' },
  { label: 'Pressure regulator', href: '/equipment-options/lubrication/pressure-control' },
  { label: 'Metering valve', href: '/equipment-options/lubrication/metering' },
  { label: 'Your part' },
];

export const degassingServices = [
  {
    title: 'Application engineering',
    body: 'We size supply, degassing and metering together from your material, shot size and cycle rate, and integrate the station with your PLC.',
    links: [{ href: '/quote', label: 'Talk to an engineer' }],
  },
  {
    title: 'Installation and training',
    body: 'In-field installation, commissioning and operator training from the team that designed the system.',
    links: [
      { href: '/in-field-installation', label: 'In-field installation' },
      { href: '/training-education', label: 'Training and education' },
    ],
  },
  {
    title: 'Service and repair',
    body: 'U.S.-based support, rebuild and repair for the full metering line, backed by nearly 40 years of grease metering experience.',
    links: [{ href: '/rebuild-repair', label: 'Rebuild and repair' }],
  },
];

export const degassingFaq = [
  {
    question: 'Can it be added to an existing grease system?',
    answer:
      'Yes. The station is self-contained and installs in the supply line between your pump and your metering equipment. Kirkco can review your current layout and recommend where it should go.',
  },
  {
    question: 'Does production stop when a bubble is discharged?',
    answer:
      'No. The internal buffer keeps feeding the outlet while the discharge valve diverts the contaminated material, and during supply-container changes.',
  },
  {
    question: 'How much material is wasted?',
    answer:
      'Only the portion of material that contains the detected gas is discharged. There is no timed purge of good material.',
  },
  {
    question: 'Can my PLC control it?',
    answer:
      'Yes. Every setting and process value is available over Modbus TCP, and digital I/O covers simpler start, stop and alarm wiring. It can also run stand-alone from its own touchscreen.',
  },
];

export const degassingReady = [
  'Material name, data sheet and NLGI grade',
  'Shot size or bead rate and cycle time',
  'Current supply pump and line pressure',
  'Metering valve or dispense equipment in use',
  'PLC platform, if remote control is needed',
  'What you see today: short shots, spitting, rejects',
];
