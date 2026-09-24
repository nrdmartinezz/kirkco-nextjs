import type { Metadata } from 'next';
import { site } from '@/config/site';

export function pageTitle(title?: string, titleExact = false) {
  if (!title) return `${site.name} — ${site.tagline}`;
  return titleExact ? title : `${title} | ${site.name}`;
}

export function absoluteUrl(path: string) {
  return new URL(path, site.url).href;
}

type PageMeta = {
  title?: string;
  description?: string;
  titleExact?: boolean;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  path?: string;
};

export function buildMetadata({
  title,
  description = site.description,
  titleExact = false,
  image = site.defaultOgImage,
  imageAlt,
  type = 'website',
  noindex = false,
  path = '/',
}: PageMeta = {}): Metadata {
  const resolvedTitle = pageTitle(title, titleExact);
  const canonical = absoluteUrl(path);
  const ogImage = absoluteUrl(image);

  return {
    metadataBase: new URL(site.url),
    title: resolvedTitle,
    description,
    alternates: { canonical },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, 'max-image-preview': 'large' },
    openGraph: {
      type,
      siteName: site.name,
      title: resolvedTitle,
      description,
      url: canonical,
      locale: site.locale.replace('-', '_'),
      images: [{ url: ogImage, alt: imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description,
      images: [ogImage],
    },
    verification: {
      google: site.verification.google || undefined,
      other: {
        ...(site.verification.bing ? { 'msvalidate.01': site.verification.bing } : {}),
        ...(site.verification.meta
          ? { 'facebook-domain-verification': site.verification.meta }
          : {}),
      },
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: site.locale.replace('-', '_'),
    images: [absoluteUrl(site.defaultOgImage)],
  },
  twitter: {
    card: 'summary_large_image',
  },
  verification: {
    google: site.verification.google || undefined,
    other: {
      ...(site.verification.bing ? { 'msvalidate.01': site.verification.bing } : {}),
      ...(site.verification.meta
        ? { 'facebook-domain-verification': site.verification.meta }
        : {}),
    },
  },
};
