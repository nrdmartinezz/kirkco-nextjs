import { site } from '@/config/site';
import { absoluteUrl } from '@/lib/seo';

export interface BreadcrumbEntry {
  name: string;
  href?: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface ProductSchema {
  name: string;
  description?: string;
  image?: string;
  url: string;
}

type SchemaProps = {
  /** Layout emits the organization and website. Page scripts pass false so the entity is not repeated. */
  identity?: boolean;
  breadcrumbs?: BreadcrumbEntry[];
  faqs?: FaqEntry[];
  /** Canonical path for the FAQPage url and @id. Required when faqs are passed. */
  faqUrl?: string;
  service?: { name: string; description?: string; url?: string };
  product?: ProductSchema;
};

export function labeledCrumbs(
  crumbs: { label: string; href?: string }[],
  currentHref: string,
): BreadcrumbEntry[] {
  return crumbs.map((crumb, index) => ({
    name: crumb.label,
    href: crumb.href ?? (index === crumbs.length - 1 ? currentHref : undefined),
  }));
}

export function buildJsonLd({
  identity = true,
  breadcrumbs,
  faqs,
  faqUrl,
  service,
  product,
}: SchemaProps = {}) {
  const businessId = `${site.url}/#organization`;
  const graph: Record<string, unknown>[] = [];

  if (identity) {
    const contactPoint = [
      site.business.officePhoneHref
        ? {
            '@type': 'ContactPoint',
            telephone: site.business.officePhoneHref,
            contactType: 'customer service',
            email: site.business.email,
          }
        : undefined,
      {
        '@type': 'ContactPoint',
        telephone: site.business.phoneHref,
        contactType: 'sales',
        email: site.business.email,
      },
    ].filter(Boolean);

    graph.push(
      {
        '@type': 'Organization',
        '@id': businessId,
        name: site.name,
        legalName: site.legalName,
        description: site.description,
        url: site.url,
        logo: absoluteUrl(site.logo),
        ...(site.foundingDate ? { foundingDate: site.foundingDate } : {}),
        telephone: site.business.phoneHref,
        ...(site.business.faxHref ? { faxNumber: site.business.faxHref } : {}),
        email: site.business.email,
        ...(site.business.priceRange ? { priceRange: site.business.priceRange } : {}),
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.business.address.street,
          addressLocality: site.business.address.locality,
          addressRegion: site.business.address.region,
          postalCode: site.business.address.postalCode,
          addressCountry: site.business.address.country,
        },
        ...(site.business.geo && {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: site.business.geo.latitude,
            longitude: site.business.geo.longitude,
          },
        }),
        ...(site.business.hours.length ? { openingHours: site.business.hours } : {}),
        ...(contactPoint.length ? { contactPoint } : {}),
        ...(Object.values(site.social).some(Boolean)
          ? { sameAs: Object.values(site.social).filter(Boolean) }
          : {}),
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { '@id': businessId },
        inLanguage: site.locale,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${site.url}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    );
  }

  if (breadcrumbs?.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        ...(crumb.href ? { item: absoluteUrl(crumb.href) } : {}),
      })),
    });
  }

  if (faqs?.length) {
    const faqPageUrl = faqUrl ? absoluteUrl(faqUrl) : undefined;
    graph.push({
      '@type': 'FAQPage',
      ...(faqPageUrl ? { '@id': `${faqPageUrl}#faq`, url: faqPageUrl } : {}),
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    });
  }

  if (service) {
    graph.push({
      '@type': 'Service',
      name: service.name,
      description: service.description,
      ...(service.url ? { url: absoluteUrl(service.url) } : {}),
      provider: { '@id': businessId },
    });
  }

  if (product) {
    graph.push({
      '@type': 'Product',
      name: product.name,
      ...(product.description ? { description: product.description } : {}),
      ...(product.image ? { image: absoluteUrl(product.image) } : {}),
      url: absoluteUrl(product.url),
      brand: { '@type': 'Brand', name: site.name },
      manufacturer: { '@id': businessId },
    });
  }

  if (!graph.length) return null;
  return { '@context': 'https://schema.org', '@graph': graph };
}
