export type ResourcePart = {
  text: string;
  href?: string;
};

export type ResourceListItem = {
  parts: ResourcePart[];
  children?: ResourceListItem[];
};

export type ResourceBlock =
  | { type: 'paragraph'; parts: ResourcePart[] }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: ResourceListItem[] };

export type ResourceColumn = {
  heading?: string;
  blocks: ResourceBlock[];
};

export type ResourceSection = {
  id?: string;
  heading?: string;
  image?: string;
  imageAlt?: string;
  blocks: ResourceBlock[];
  columns?: ResourceColumn[];
  cta?: { label: string; href: string };
};

export type ResourcePageContent = {
  href: string;
  title: string;
  metaTitle: string;
  description: string;
  heroImage: string;
  heroAlt: string;
  sections: ResourceSection[];
};

const part = (text: string, href?: string): ResourcePart => (href ? { text, href } : { text });

const paragraph = (...parts: ResourcePart[]): ResourceBlock => ({ type: 'paragraph', parts });

const item = (text: string, children?: string[]): ResourceListItem => ({
  parts: [part(text)],
  children: children?.map((child) => ({ parts: [part(child)] })),
});

const list = (items: ResourceListItem[]): ResourceBlock => ({ type: 'list', items });

const officePhone = part('704.289.7090', 'tel:+17042897090');
const officePhoneDash = part('704-289-7090.', 'tel:+17042897090');

export const resourcePages: ResourcePageContent[] = [
  {
    href: '/resin-dispensing-molding',
    title: 'Resin Dispensing & Molding Services',
    metaTitle: 'Resin Dispensing & Molding | Contract Manufacturing | Kirkco Corp',
    description:
      'Expert resin dispensing, molding, and prototyping services at Kirkco Corp. Reduce costs with our contract manufacturing and process development solutions.',
    heroImage: '/images/resources/resin-dispensing.jpg',
    heroAlt: 'Contract resin dispensing and molding services',
    sections: [
      {
        id: 'resin-dispensing-molding-scope',
        heading: 'Contract Resin Dispensing & Molding Services',
        blocks: [
          paragraph(
            part(
              'Welcome to Kirkco – Your Partner in Cost-Effective Contract Resin Dispensing & Molding Solutions!',
            ),
          ),
          paragraph(
            part(
              'At Kirkco, we specialize in providing comprehensive contract Resin Dispensing & Molding services, catering to your unique needs in prototyping development, pre-production runs, and manufacturing. Our facilities boast highly skilled workers, ensuring the delivery of top-notch services tailored for short production runs.',
            ),
          ),
          paragraph(
            part(
              'Step into our state-of-the-art manufacturing environment equipped with sophisticated dispensing equipment designed for efficiency in short production cycles. Kirkco empowers our clients to reduce capital expenses, financing burdens, and employee costs associated with new product and process development.',
            ),
          ),
        ],
        cta: { label: 'Contact Us For Repair Service', href: '/contact' },
      },
      {
        heading: 'Comprehensive Application and Process Development:',
        image: '/images/resources/resin-dispensing-lab.jpg',
        imageAlt: 'automated resin dispensing',
        blocks: [
          paragraph(
            part(
              'Kirkco Corporation’s premier demonstration lab facilities in the dispensing industry. Staffed with skilled technicians who understand our products, your applications, and their seamless integration, we offer:',
            ),
          ),
          list([
            item('Assistance in defining your production requirements'),
            item('Assurance of optimum material performance'),
            item('Development and testing of process conditions'),
            item('Thorough documentation of simulated production runs'),
          ]),
          paragraph(
            part(
              'Deliverables and Support: Every machine delivered is pretested for performance and includes a custom-written Operation and Service Manual. We go beyond delivery with comprehensive process development, operator training, and in-field start-up services readily available.',
            ),
          ),
          paragraph(
            part(
              'Choose Kirkco for excellence in contract resin dispensing services – where innovation meets efficiency!',
            ),
          ),
        ],
      },
    ],
  },
  {
    href: '/rebuild-repair',
    title: 'Rebuild & Repair',
    metaTitle: 'Industrial Equipment Repair & Rebuild | Kirkco Corp',
    description:
      "Restore your metering and mixing equipment to OEM standards with Kirkco's certified rebuild and repair services. Maximize efficiency and reduce downtime.",
    heroImage: '/images/resources/rebuild-repair.jpg',
    heroAlt: 'Repair and rebuild services',
    sections: [
      {
        id: 'rebuild-repair-scope',
        heading: 'Repair Service (In Our Facility)',
        blocks: [
          paragraph(
            part(
              'A one-hour evaluation charge is assessed for all standard component items received for repair. If the item is repairable, the evaluation charge is credited toward the repair. A two-hour evaluation charge is assessed for all systems received for repair.',
            ),
          ),
          paragraph(
            part(
              'Items determined repairable are invoiced on a time and material basis. We will provide estimates to the customer as appropriate and require customer authorization to proceed before we begin the actual work. Written service report provided on completion of system repairs to be returned with shipment and invoice.',
            ),
          ),
        ],
        cta: { label: 'Contact Us For Repair Service', href: '/contact' },
      },
      {
        heading: 'Rebuild Repair Program:',
        image: '/images/resources/rebuild-repair-shop.jpg',
        imageAlt: 'Kirkco repair and rebuild services',
        blocks: [
          list([
            item('Complete technical inspection of equipment’s overall condition'),
            item('All parts are disassembled, thoroughly cleaned and inspected for conformance to specifications'),
            item(
              'Detailed equipment cleaning including a complete flushing of the adhesive tank, hopper, pump, or pressure vessel',
            ),
            item(
              'All Soft Components are replaced: seals, gaskets, o-rings, v-packings. Sensors, heaters, and hoses replaced on evaluation',
            ),
            item('Hard Components not meeting current standards or tolerances are replaced'),
            item(
              'Qualified technicians assemble the parts and diagnostically test to ensure conformance to current specifications',
            ),
            item('Only Genuine Factory Parts Used'),
            item('Equipment is factory upgraded with the latest design improvements when requested'),
            item('Rebuild time and price are provided before work begins'),
          ]),
        ],
      },
      {
        heading: 'Certified Rebuild to OEM Standards Service',
        blocks: [],
        cta: { label: 'Contact Us for OEM Rebuild', href: '/contact' },
        columns: [
          {
            heading: 'Certified System Rebuild from ground up',
            blocks: [
              paragraph(
                part(
                  'With a KIRKCO Certified Rebuild you can recover all the performance and productivity of your old machine, and capture the benefits of the latest engineering updates. A KIRKCO Certified Rebuild strips down your entire machine to the frame, and then builds it all back up with brand new parts – for a second life at maximum value.',
                ),
              ),
              paragraph(
                part(
                  'KIRKCO’s Certified Rebuild Program offers a like-new machine with a like-new warranty and a new serial number. Depending on the program chosen we start with a complete machine inspection. Then the machine is completely disassembled and rebuilt from the ground up to include all product updates. We add the latest control system and user interface to our certified rebuilt equipment. This allows for upgrades that enhance the machine’s performance far beyond the equipment’s original configuration limits.',
                ),
              ),
            ],
          },
          {
            heading: 'Certified System Rebuild from ground up',
            blocks: [
              paragraph(
                part(
                  'Equipment reconditioning provides an easy, cost-effective means to keep your existing equipment performing reliably, or to acquire like new rebuilt equipment at a significant savings. When you send your equipment to Kirkco, you can have complete confidence when it’s installed your production it will run with increased efficiency and reduced downtime.',
                ),
              ),
              { type: 'heading', text: 'Component Cleaning and Repair' },
              paragraph(
                part(
                  'What this means is that whenever repaired or replacement components are installed on your equipment, they function and operated the same as when they were manufactured.',
                ),
              ),
              paragraph(
                part(
                  'Ensures the same high level of quality and function as a new component parts. Cost-effective solution for a like-new component operation at a fraction of the cost of buying new.',
                ),
              ),
            ],
          },
        ],
      },
    ],
  },
  {
    href: '/training-education',
    title: 'Training & Education',
    metaTitle: 'Kirkco Training & Education | Equipment Operation & Maintenance',
    description:
      'Enhance skills with Kirkco Corp’s training on equipment operation, maintenance, troubleshooting, and service seminars for operational success.',
    heroImage: '/images/resources/training.jpg',
    heroAlt: 'group of workers with trainer explaining how to use the machinery in the industrial area',
    sections: [
      {
        id: 'training-education-scope',
        heading: 'Training & Operation, Basic Maintenance and Troubleshooting Techniques.',
        blocks: [
          paragraph(
            part(
              'Technical training is available Monday through Friday, during normal Kirkco business hours, to train plant personnel in the proper operation and maintenance of the Kirkco equipment. Training is a very important aspect of the project’s success, and if the plant is to become self-sufficient in the operation, troubleshooting and maintenance of the equipment, this training needs to be conducted as soon as possible.',
            ),
          ),
          paragraph(
            part(
              'Technical Service Personnel are available to all customers on a charged basis. Contact Kirkco today to schedule a technician to train your staff.',
            ),
          ),
        ],
        cta: { label: 'Contact Us for Training & Education', href: '/contact' },
      },
      {
        heading: 'Service Training Seminars',
        image: '/images/resources/training-seminar.jpg',
        imageAlt: 'Kirkco industrial training services',
        blocks: [
          paragraph(
            part(
              'Kirkco Corporation’s service training seminar is a one-day program designed to train our customers in the use and service of the equipment and application systems we provide. It consists of a 3-4 hour session, and is tailored to facilitate the customer’s shift schedule.',
            ),
          ),
          paragraph(
            part(
              'We urge our customers to participate in this program and recommend that the first seminar be scheduled on-site, at the customer’s facility, within three to four weeks after initial installation.',
            ),
          ),
          paragraph(part('To schedule a Service Training Seminar for your machine, we will need the following information:')),
          list([item('Machine Type'), item('Machine Number'), item('Project Number')]),
          paragraph(part('The following is a brief outline of the items which will be covered during the seminar:')),
          list([
            item('General Introduction and Description of Equipment and Process'),
            item('Explanation of System Function', ['Feed Pumps', 'Metering Unit', 'Dispensing Valves']),
            item('Controller Operation', [
              'Technical Data',
              'Parameterization',
              'Security / Password Protection',
              'Service Information',
              'Input / Output Capabilities',
            ]),
            item('Supply Pump', ['Description', 'Control Panel', 'Loading / Un-Loading of Material']),
            item('Start-up', ['Set-up of System', 'Venting Machine', 'Setting Pressures']),
            item('Maintenance', ['Schedule', 'Inspections', 'Replacement Parts', 'Rebuild / Repair Facility']),
            item('Question and Answer Period'),
          ]),
          paragraph(part('Please call '), officePhone, part(' if you have any questions about this program.')),
        ],
      },
    ],
  },
  {
    href: '/in-field-installation',
    title: 'In-Field Installation',
    metaTitle: 'In-Field Installation & Supervision | Kirkco Corp',
    description:
      'Expert in-field installation and supervision for industrial equipment. Trust Kirkco for metering, dispensing, and process control system support.',
    heroImage: '/images/resources/installation.jpg',
    heroAlt: 'working setting up the staging area for the industrial machinery. workers overseeing on lifts',
    sections: [
      {
        id: 'installation-scope',
        heading: 'Start-Up and Installation Supervision',
        blocks: [
          paragraph(
            part(
              'Start-up supervision by our factory trained Service Engineer is a service offered to all customers on a charged basis. An installation date is established and our service representative is available for installation assistance.',
            ),
          ),
          paragraph(
            part(
              'Kirkco will charge a standard per day fee, plus expenses, for initial installations of new equipment purchased from Kirkco Corporation. Charges authorized become payable upon completion. We estimate the required time for this assistance based on the system that we are installing.',
            ),
          ),
          paragraph(
            part(
              'Customers are encouraged to be prepared for the installation when our Service Engineer arrives. Pre-installation information is in the equipment manual for machine and accessory mounting, electrical and pneumatic connection, etc. Should you have specific pre-installation questions please contact our office. ',
            ),
            officePhoneDash,
          ),
          paragraph(part('We will schedule all installations by specific appointment.')),
        ],
        cta: { label: 'Request an Installation Consult', href: '/contact' },
      },
      {
        image: '/images/resources/installation-crew.jpg',
        imageAlt: 'In-field installation of industrial machinery',
        blocks: [
          paragraph(
            part(
              'NOTE: If the customer is not ready at the scheduled time, Kirkco’s service personnel are available; then it is a chargeable weekday. We will invoice any subsequent installations at standard charges. A copy of our standard service rate is available for your review.',
            ),
          ),
          paragraph(
            part(
              'Multiple Installation Orders: We expect customers who require the installation of several machines for identical or similar installations to duplicate installations that Kirkco has previously supervised. However, installation assistance is always available if needed.',
            ),
          ),
        ],
      },
    ],
  },
];

const byHref = new Map(resourcePages.map((page) => [page.href, page]));

export function getResourcePage(href: string) {
  return byHref.get(href);
}
