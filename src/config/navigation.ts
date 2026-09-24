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

export const navigation: NavigationConfig = {
  primary: [
    { label: 'Home', href: '/' },
    {
      label: 'Services',
      href: '/services',
      panel: {
        kind: 'mega',
        columns: [
          {
            heading: 'Residential',
            links: [
              {
                label: 'Repairs & Maintenance',
                href: '/services/repairs',
                description: 'Fast turnaround on everyday problems.',
                icon: 'Wrench',
              },
              {
                label: 'Installations',
                href: '/services/installations',
                description: 'New systems, fitted and tested.',
                icon: 'Hammer',
              },
            ],
          },
          {
            heading: 'Commercial',
            links: [
              {
                label: 'Service Contracts',
                href: '/services/contracts',
                description: 'Scheduled upkeep with priority response.',
                icon: 'ClipboardCheck',
              },
              {
                label: 'Emergency Callout',
                href: '/services/emergency',
                description: 'Around-the-clock cover.',
                icon: 'Siren',
              },
            ],
          },
        ],
        featured: {
          title: 'Not sure what you need?',
          body: 'Tell us what is going on and we will point you at the right service.',
          href: '/contact',
          cta: 'Talk to us',
        },
      },
    },
    {
      label: 'About',
      panel: {
        kind: 'links',
        links: [
          { label: 'Our Story', href: '/about' },
          { label: 'The Team', href: '/about/team' },
          { label: 'Service Area', href: '/about/service-area' },
        ],
      },
    },
    { label: 'Contact', href: '/contact' },
  ],

  cta: { label: 'Request a Quote', href: '/contact' },

  footer: [
    {
      heading: 'Services',
      links: [
        { label: 'Repairs & Maintenance', href: '/services/repairs' },
        { label: 'Installations', href: '/services/installations' },
        { label: 'Service Contracts', href: '/services/contracts' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ],
    },
  ],

  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};
