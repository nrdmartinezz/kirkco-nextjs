import type { Metadata } from 'next';
import { site } from '@/config/site';

const brandPattern = new RegExp(`\\b${site.name}\\b`, 'i');

/** Absolute titles skip the layout template, so the brand has to be in the string. */
function withBrand(title: string) {
  if (brandPattern.test(title)) return title;
  return `${title} | ${site.name}`;
}

export function pageTitle(title?: string, titleExact = false) {
  if (!title) return `${site.name} — ${site.tagline}`;
  return titleExact ? withBrand(title) : title;
}

/** Keep a meta description inside a snippet, ending on a sentence or a whole word. */
export function metaDescription(text: string, max = 155) {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;

  const window = clean.slice(0, max + 1);
  const sentenceEnd = window.search(/[.!?](?=\s|$)/);
  if (sentenceEnd >= 80) return clean.slice(0, sentenceEnd + 1).trim();

  const clipped = clean.slice(0, max);
  const lastSpace = clipped.lastIndexOf(' ');
  return (lastSpace > 80 ? clipped.slice(0, lastSpace) : clipped).replace(/[,:;–—-]+$/, '').trim();
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
  const resolvedDescription = metaDescription(description);
  const canonical = absoluteUrl(path);
  const ogImage = absoluteUrl(image);

  return {
    metadataBase: new URL(site.url),
    title: titleExact || !title ? { absolute: resolvedTitle } : resolvedTitle,
    description: resolvedDescription,
    alternates: { canonical },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, 'max-image-preview': 'large' },
    openGraph: {
      type,
      siteName: site.name,
      title: resolvedTitle,
      description: resolvedDescription,
      url: canonical,
      locale: site.locale.replace('-', '_'),
      images: [{ url: ogImage, alt: imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: resolvedDescription,
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
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: site.locale.replace('-', '_'),
    images: [{ url: absoluteUrl(site.defaultOgImage), alt: `${site.name} logo` }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [absoluteUrl(site.defaultOgImage)],
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
