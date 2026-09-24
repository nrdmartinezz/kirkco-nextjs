/**
 * Per-project configuration. This and `navigation.ts` are the two files that
 * must be filled in for every new site. Blank optional values ship nothing —
 * an empty analytics ID means that vendor's script is never emitted.
 */

export type SchemaBusinessType =
  | 'LocalBusiness'
  | 'ProfessionalService'
  | 'HomeAndConstructionBusiness'
  | 'Plumber'
  | 'Electrician'
  | 'RoofingContractor'
  | 'GeneralContractor'
  | 'Dentist'
  | 'Physician'
  | 'Attorney'
  | 'AccountingService'
  | 'InsuranceAgency'
  | 'RealEstateAgent';

export interface SiteConfig {
  /** Absolute origin, no trailing slash. Used as Next.js metadataBase. */
  url: string;
  name: string;
  legalName?: string;
  tagline: string;
  description: string;
  locale: string;

  business: {
    schemaType: SchemaBusinessType;
    phone: string;
    /** Digits only, E.164 — used for tel: links. */
    phoneHref: string;
    email: string;
    address: {
      street: string;
      locality: string;
      region: string;
      postalCode: string;
      country: string;
    };
    /** Omit entirely for service-area businesses with no walk-in location. */
    geo?: { latitude: number; longitude: number };
    /** schema.org openingHours strings, e.g. 'Mo-Fr 08:00-17:00'. */
    hours: string[];
    priceRange?: string;
  };

  social: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    x?: string;
    youtube?: string;
    tiktok?: string;
  };

  /** Absolute or site-relative path to the fallback Open Graph image. */
  defaultOgImage: string;

  /** Site-relative path to the contact form action. Blank disables forms. */
  formEndpoint: string;

  /**
   * Google reCAPTCHA v3 site key (public). Blank skips the widget.
   * The matching secret stays server-side in the form route.
   */
  recaptchaSiteKey: string;

  analytics: {
    ga4: string;
    gtm: string;
    metaPixel: string;
    bingUet: string;
    clarity: string;
  };

  verification: {
    google: string;
    bing: string;
    meta: string;
  };

  /** 'none' is correct for US-only clients. Switch to 'banner' only when required. */
  consent: 'none' | 'banner';
}

export const site: SiteConfig = {
  url: 'https://kirkcocorp.com',
  name: 'Kirkco',
  legalName: 'Kirkco Corporation',
  tagline: 'Precision metering, mixing, controlling, and dispensing for all applications.',
  description:
    'Kirkco Corporation designs and integrates metering, mixing, and dispensing systems for polyurethane, epoxy, silicone, and lubrication manufacturing.',
  locale: 'en-US',

  business: {
    schemaType: 'LocalBusiness',
    phone: '800.828.7234',
    phoneHref: '+18008287234',
    email: 'sales@kirkcocorp.com',
    address: {
      street: 'P.O. Box 509',
      locality: 'Monroe',
      region: 'NC',
      postalCode: '28111',
      country: 'US',
    },
    hours: [],
  },

  social: {},

  defaultOgImage: '/og-default.png',

  formEndpoint: '',
  recaptchaSiteKey: '',

  analytics: {
    ga4: '',
    gtm: '',
    metaPixel: '',
    bingUet: '',
    clarity: '',
  },

  verification: {
    google: '',
    bing: '',
    meta: '',
  },

  consent: 'none',
};

export const formattedAddress = [
  site.business.address.street,
  `${site.business.address.locality}, ${site.business.address.region} ${site.business.address.postalCode}`,
].join(', ');

/** No configured ID means the analytics bundle is never mounted at all. */
export const hasAnalytics = Object.values(site.analytics).some(Boolean);
